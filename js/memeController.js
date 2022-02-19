'use strict'

var gElCanvas;
var gCtx;
var gFontSize = 21;
var gCurrLine;
var gStartPos;
var gIsRandom = false;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function renderEditController() {
    const strHtml =
        `<div class="main-container flex around align-center">

    <div class="canvas-container">
    <canvas id="my-canvas" width="310px" height="320px" style="cursor: grab;"></canvas>
    </div>

    <div class="editor-controllers flex column align-center space-between">
    <input type="text" class="input-controller" placeholder="write something" name="meme-txt" ">

    <div class="line-controllers">
    <button class="edit-line btn" onclick="onEditLine()"><i class="fa-solid fa-pencil"></i></button>
    <button class="add-line btn" onclick="onAddLine()"><i class="fa-solid fa-plus"></i></button>
    <button class="delete-line btn" onclick="onDeleteLine()"><i class="fa-solid fa-trash-can"></i></button>
    
    </div>

    <div class="align-controllers">
    <button class="increas size-btn  btn" onclick="increasFontSize()">🗚</button>
    <button class="decreas size-btn btn" onclick="decreasFontSize()">🗛</button>
    </div>

    <div class="font-controllers flex around">
    <label for="font-color"><i class="fa-solid fa-a"></i></label>
    <input id="font-color" type="color" class="font-color" onchange="onSetFontColor(value)">
    <label for="stroke-color"><i class="fa-solid fa-palette"></i></label>
    <input id="stroke-color" type="color" class="stroke-color" onchange="onSetStrokeColor(value)">
    </div>

    <div class="stickers-controllers flex space-between">
    <div><i class="fa-solid fa-chevron-left"></i></div>
    
    <div class="sticker" onclick="onAddLine('🎉')">🎉</div>
    <div class="sticker" onclick="onAddLine('👑')">👑</div>
    <div class="sticker" onclick="onAddLine('🤿')">🤿</div>
    
    <div><i class="fa-solid fa-chevron-right"></i></div>
    </div>
    
    <button class="share-btn" onclick="onShareMeme()">Share</button>
    </div>

    </div>`

    document.querySelector('.editor-container').innerHTML = strHtml;

    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    gCurrLine = getCurrLine();
    resizeCanvas();
    addListeners()
}

function onShareMeme() {
    shareMeme(gElCanvas)
}

function onFilter(ev, keyWord) {
    console.log(ev)

    if (!ev) {
        if (!keyWord) return;
        filterMemes(keyWord);
    }
    else {
        ev.preventDefault()
        const filterBy = document.querySelector('input[name="tags"]').value;
        if (!filterBy) return;
        filterMemes(filterBy.toLowerCase())
    }
    renderGallery();
}

function createRandomMeme(imgId) {
    gIsRandom = true;
    setImg(imgId);

}

function increasFontSize() {
    const meme = getMemes();
    meme.lines[gCurrLine].size++
    renderMeme()
}

function decreasFontSize() {
    const meme = getMemes();
    meme.lines[gCurrLine].size--
    renderMeme()
}

function onSetFontColor(color) {
    const meme = getMemes();
    console.log(gCurrLine)
    meme.lines[gCurrLine].color = color;
    renderMeme()
}

function onSetStrokeColor(color) {
    const meme = getMemes();
    meme.lines[gCurrLine].strokeC = color;
    renderMeme()
}

function onEditLine() {
    var input = document.querySelector('input[name=meme-txt]').value;

    if (!input) return;

    const meme = getMemes();
    meme.lines[gCurrLine].txt = input;
    meme.lines[gCurrLine].isFocused = true;
    renderMeme()
    document.querySelector('input[name=meme-txt]').value = '';
}

function onAddLine(sticker) {
    var input = document.querySelector('input[name=meme-txt]').value;
    var linePos = {
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 2
    };

    if (!input && !sticker) return;
    const meme = getMemes();
    if (sticker) {
        creatMemeLine(sticker, linePos);
        var newLineIdx = meme.lines.length - 1;
        meme.lines[newLineIdx].txt = sticker;
    }
    else {
        creatMemeLine(input, linePos);
        newLineIdx = meme.lines.length - 1;
        meme.lines[newLineIdx].txt = input;
    }

    gCurrLine = newLineIdx;
    meme.lines[gCurrLine].isFocused = true;
    renderMeme()
    document.querySelector('input[name=meme-txt]').value = '';
}

function onDeleteLine() {
    document.querySelector('input[name=meme-txt]').value = '';
    deleteLine(gCurrLine)
    renderMeme()
}

function renderMeme() {
    var memeObj;
    const memeImg = getMemeImg();

    if (gIsRandom) {
        const canvasWidth = gElCanvas.width;
        memeObj = getRandMeme(gCtx, canvasWidth);
        gIsRandom = false;
    }
    else memeObj = getMemes();

    renderImg(memeImg, memeObj)
}

function renderImg(memeImg, memeObj) {
    var img = new Image();
    img.src = memeImg.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);

        memeObj.lines.forEach(line => {
            drawText(line.txt, line.pos.x, line.pos.y, line.size,
                line.color, line.strokeC, line.align);

            if (line.isFocused) drawFocusOnLine(gCtx, line);

            line.width = gCtx.measureText(line.txt).width;
        });
    };
}

function drawText(text, x, y, size, color, stroke, align) {
    gCtx.lineWidth = 1;
    gCtx.textAlign = align;
    gCtx.strokeStyle = stroke;
    gCtx.fillStyle = color;
    gCtx.font = `${size}px Arial`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function onDown(ev) {
    const pos = getEvPos(ev);
    removeAllFocus();
    if (!isLineClicked(pos, gCtx)) return;
    renderMeme();
    setTextDrag(true);
    gStartPos = pos;
    gCurrLine = getCurrLine();
    document.querySelector('canvas').style.cursor = 'grabbing';
}

function onMove(ev) {
    const memes = getMemes();
    const line = memes.lines[gCurrLine];
    if (line.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy, line)
        gStartPos = pos
        renderMeme()
    }
}

function onUp() {
    setTextDrag(false, gCurrLine);
    document.querySelector('canvas').style.cursor = 'grab';
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}