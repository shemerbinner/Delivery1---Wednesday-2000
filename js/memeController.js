'use strict'

var gElCanvas;
var gCtx;
var gFontColor;
var gStrokeColor;
var gFontSize = 21;

function renderEditController() {
    const strHtml =
        `<header class="header">header</header>

        <div class="main-container flex space-between align-center">

    <div class="canvas-container">
    <canvas id="my-canvas" width="270px" height="275px" style="cursor: crosshair;"></canvas>
    </div>

    <div class="editor-controllers">
    <input type="text" placeholder="write something" name="meme-txt">

    <div class="line-controllers"></div>
    <div class="align-controllers">
    <button class="increas-font-size" onclick="increasFontSize()">🗚</button>
    <button class="decreas-font-size" onclick="decreasFontSize()">🗛</button>
    </div>

    <div class="font-controllers">
    <label for="font-color"><i class="fa-solid fa-a"></i></label>
    <input id="font-color" type="color" class="font-color" onchange="onSetFontColor(value)">
    <label for="stroke-color"><i class="fa-solid fa-palette"></i></label>
    <input id="stroke-color" type="color" class="stroke-color" onchange="onSetStrokeColor(value)">
    </div>

    <div class="stickers-controllers"></div>
    
    <button class="share-btn">Share</button>
    </div>

    </div>
    <footer class="footer">footer</footer>`
    document.querySelector('.editor-container').innerHTML = strHtml;

    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    // resizeCanvas();
    addListeners()
    onSetText()
}

function increasFontSize() {
    console.log('+')
    gFontSize += 2;
    renderMeme()
}
function decreasFontSize() {
    console.log('-')
    gFontSize -= 2;
    renderMeme()
}

function onSetFontColor(color) {
    gFontColor = color;
    renderMeme()
}

function onSetStrokeColor(color) {
    gStrokeColor = color;
    renderMeme()
}

function onSetText() {
    const input = document.querySelector('input[name=meme-txt]')
    // console.log(input.value)
    input.oninput = (e) => {
        setLineTxt(e.target.value)
        renderMeme()
    }
}

function renderMeme() {
    // onImgInput(ev)
    const memeImg = getMemeImg();
    // console.log(memeImg)
    const memeObj = getMeme();
    // console.log(memeObj)
    renderImg(memeImg, memeObj)
}

function renderImg(memeImg, memeObj) {
    var img = new Image();
    img.src = memeImg.url;
    // console.log(img)
    const line = memeObj.lines[memeObj.selectedLineIdx].txt;

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText(line, 150, 100)
    };
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = gStrokeColor;
    gCtx.fillStyle = gFontColor;
    gCtx.font = `${gFontSize}px Arial`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function addListeners() {
    // addMouseListeners()
    // addTouchListeners()
    window.addEventListener('resize', () => {
        // resizeCanvas()
    })
}

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     gElCanvas.width = elContainer.offsetWidth - 20;
//     // gElCanvas.height = elContainer.offsetHeight;
// }