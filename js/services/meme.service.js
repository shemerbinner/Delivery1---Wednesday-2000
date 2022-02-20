'use strict'

const STORAGE_MEME = 'meme';
const STORAGE_IMG = 'imgs';
var gSelectedImg;
var gSelectedLine = null;
var gIsFiltered = false;

_creatMeme()

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'famous', 'president', 'man'] },
    { id: 2, url: 'img/2.jpg', keywords: ['sweet', 'dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['sweet', 'dog', 'baby'] },
    { id: 4, url: 'img/4.jpg', keywords: ['sweet', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'man', 'science'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'man'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby'] },
];

var gMeme;

function changeLineFont(font) {
    gMeme.lines[gSelectedLine].font = font;
}

function realTimeChangeText(txt) {
    console.log(txt)
    gMeme.lines[gSelectedLine].txt = txt;
}

function filterMemes(filterBy) {
    if (filterBy === 'all' && gIsFiltered) {
        gIsFiltered = false;
        gImgs = loadFromStorage(STORAGE_IMG)
        return
    }

    gImgs = loadFromStorage(STORAGE_IMG)
    gIsFiltered = true;
    gImgs = gImgs.filter(img => {
        if (img.keywords.some(keyWord => keyWord === filterBy)) {
            return img;
        };
    })
}

function getCurrLine() {
    return gSelectedLine;
}

function moveLine(dx, dy, line) {
    line.pos.x += dx;
    line.pos.y += dy;
}

function removeAllFocus() {
    gMeme.lines.forEach(line => line.isFocused = false)
}

function drawFocusOnLine(gCtx, line) {
    var pos = line.pos;
    const measures = gCtx.measureText(line.txt);
    const width = measures.width + 10;
    const height = measures.actualBoundingBoxAscent + measures.actualBoundingBoxDescent + 10;

    const startX = pos.x - 5;
    const startY = pos.y - height + 6;

    drawRect(gCtx, startX, startY, width, height)
}

function drawRect(gCtx, startX, startY, width, height) {
    gCtx.beginPath();
    gCtx.lineWidth = 0.5;
    gCtx.rect(startX, startY, width, height);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function setTextDrag(isDrag) {
    gMeme.lines[gSelectedLine].isDrag = isDrag
}

function isLineClicked(clickPos, gCtx) {

    return gMeme.lines.some(line => {
        var pos = line.pos;
        const measures = gCtx.measureText(line.txt);
        const width = measures.width;
        const height = measures.actualBoundingBoxAscent + measures.actualBoundingBoxDescent;

        if (clickPos.x >= pos.x && clickPos.x <= (pos.x + width) &&
            clickPos.y >= (pos.y - height) && clickPos.y <= pos.y) {

            gSelectedLine = gMeme.lines.findIndex(currLine => currLine === line);
            console.log(gSelectedLine)
            line.isFocused = true;
            return true
        }
        return false
    })
}

function getMemeImg() {
    return gSelectedImg
}

function setImg(imgId) {
    const img = gImgs.find(img => img.id === imgId);
    gSelectedImg = img;
    gMeme.selectedImgId = imgId;
    gMeme
    _saveMemeToStorage(STORAGE_MEME, gMeme)
}

function creatMemeLine(line, pos) {
    gMeme.lines.push({
        txt: line,
        size: 21,
        align: 'left',
        color: 'blue',
        font: 'Ariel',
        pos: pos,
        isDrag: false,
        isFocused: false
    })
    gSelectedLine = gMeme.lines.length - 1;
    console.log(gMeme)
    _saveMemeToStorage(STORAGE_MEME, gMeme)
}

function deleteLine(idx) {
    gMeme.lines.splice(idx, 1)
    _saveMemeToStorage(STORAGE_MEME, gMeme)
}

function setLineTxt(txt, txtIdx) {
    gMeme.lines[txtIdx].txt = txt;
}

function getMemes() {
    return gMeme
}

function getRandMeme(gCtx, canvasWidth) {
    gMeme = {
        selectedImgId: gSelectedImg,
        selectedLineIdx: 0,
        lines: makeRandLines(gCtx, canvasWidth),
        isDrag: false,
        isFocused: false
    }
    _saveMemeToStorage(STORAGE_MEME, gMeme)
    return gMeme;
}

function _creatMeme() {
    gMeme = loadFromStorage(STORAGE_MEME);
    if (!gMeme);
    gMeme = {
        selectedImgId: null,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I sometimes eat Bamya',
                size: 21,
                align: 'left',
                color: 'black',
                strokeC: '',
                font: 'Ariel',
                pos: {
                    x: 60,
                    y: 25
                },
                isDrag: false,
                isFocused: false
            },
            {
                txt: 'I love ice cream',
                size: 21,
                align: 'left',
                color: 'black',
                font: 'Ariel',
                pos: {
                    x: 90,
                    y: 270
                },
                isDrag: false,
                isFocused: false
            },
        ]
    }
    _saveMemeToStorage(STORAGE_MEME, gMeme)
}

function getMemeImgs() {
    if (!gIsFiltered) _saveMemeToStorage(STORAGE_IMG, gImgs);
    return gImgs
}

function _saveMemeToStorage(key, data) {
    saveToStorage(key, data)
}

function shareMeme(gElCanvas) {
    uploadImg(gElCanvas)
}


