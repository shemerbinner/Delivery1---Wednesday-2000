'use strict'

var gElCanvas;
var gCtx;
var gFontColor;
var gStrokeColor;
var gFontSize = 21;
var gCurrLine = 0;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function renderEditController() {
    const strHtml =
        `<div class="main-container flex around align-center">

    <div class="canvas-container">
    <canvas id="my-canvas" width="310px" height="320px" style="cursor: crosshair;"></canvas>
    </div>

    <div class="editor-controllers flex column align-center space-between">
    <input type="text" class="input-controller" placeholder="write something" name="meme-txt" ">

    <div class="line-controllers">
    <button class="switch-line btn" onclick="setCurrLine()">⇅</button>
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

    <div class="stickers-controllers"></div>
    
    <button class="share-btn">Share</button>
    </div>

    </div>`


    document.querySelector('.editor-container').innerHTML = strHtml;

    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
    addListeners()
    renderMeme()
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
    meme.lines[gCurrLine].color = color;
    renderMeme()
}

function onSetStrokeColor(color) {
    const meme = getMemes();
    meme.lines[gCurrLine].strokeC = color;
    renderMeme()
}

function onAddLine() {
    console.log('hi');
    var input = document.querySelector('input[name=meme-txt]').value;
    var linePos = {
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 2
    };

    if (!input) return
    const meme = getMemes();

    if (meme.lines.length >= 3) {
        meme.lines[gCurrLine].txt = input;
        renderMeme()
        return
    }
    creatMemeLine(input, linePos);

    gCurrLine = meme.selectedLineIdx;

    drawText(input, linePos.x, linePos.y);
    document.querySelector('input[name=meme-txt]').value = '';
    renderMeme()
    console.log(gCurrLine)
}

function onDeleteLine() {
    // console.log('hi');
    deleteLine(gCurrLine)
    renderMeme()
}

function setCurrLine() {
    // console.log(gCurrLine)
    const meme = getMemes();
    const lines = meme.lines.length;
    gCurrLine++

    if (gCurrLine >= lines) {
        gCurrLine = 0;
        console.log(gCurrLine)
        return
    }
    console.log(gCurrLine)
    // console.log(gCurrLine)
}

function renderMeme() {
    // onImgInput(ev)
    const memeImg = getMemeImg();
    // console.log(memeImg)
    const memeObj = getMemes();
    // console.log(memeObj)
    renderImg(memeImg, memeObj)
}

function renderImg(memeImg, memeObj) {
    var img = new Image();
    // console.log(memeImg.url)
    img.src = memeImg.url;
    // console.log(img)

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        memeObj.lines.forEach(line => {
            console.log(line)
            drawText(line.txt, line.pos.x, line.pos.y, line.size,
                line.color, line.strokeC, line.align);
            // gCtx.measureText(line.txt)
            // console.log(gCtx.measureText(line.txt));
            line.width = gCtx.measureText(line.txt).width;
            // console.log(memeObj);
        });
    };
}

function drawText(text, x, y, size, color, stroke, align) {
    gCtx.lineWidth = 2;
    gCtx.textAlign = align;
    gCtx.strokeStyle = stroke;
    gCtx.fillStyle = color;
    gCtx.font = `${size}px Arial`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function onDown(ev) {
    const pos = getEvPos(ev)
    console.log('onDown()');
    console.log(isLineClicked(pos));
    if (!isLineClicked(pos, gCtx)) return
    setCircleDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    console.log('onMove()');
    const circle = getCircle();
    if (circle.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveCircle(dx, dy)
        gStartPos = pos
        renderCanvas()
    }
}

function onUp() {
    console.log('onUp()');
    setCircleDrag(false)
    document.body.style.cursor = 'grab'
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
    // addMouseListeners()
    // addTouchListeners()
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