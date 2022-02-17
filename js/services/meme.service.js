'use strict'

const STORAGE_KEY = 'meme';
var gSelectedImg;
// var gSelectedLine;

_creatMeme()

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat', 'famous', 'president'] },
    { id: 2, url: 'img/2.jpg', keywords: ['sweet', 'dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['sweet', 'dog', 'baby'] },
    { id: 4, url: 'img/4.jpg', keywords: ['sweet', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'man', 'science'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'man'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby'] },
    // { id: 10, url: '/img/10.jpg', keywords: ['funny', 'man', 'president', 'famous'] },
    // { id: 11, url: '/img/11.jpg', keywords: ['funny', 'man'] },
    // { id: 12, url: '/img/12.jpg', keywords: ['funny', 'man', 'israel'] },
    // { id: 13, url: '/img/13.jpg', keywords: ['funny', 'man', 'famous', 'movie'] },
    // { id: 14, url: '/img/14.jpg', keywords: ['funny', 'man', 'movie'] },
    // { id: 15, url: '/img/15.jpg', keywords: ['funny', 'man', 'movie', 'game of thrones'] },
    // { id: 16, url: '/img/16.jpg', keywords: ['funny', 'man', 'movie'] },
    // { id: 17, url: '/img/17.jpg', keywords: ['funny', 'man', 'famous', 'president'] },
    // { id: 18, url: '/img/18.jpg', keywords: ['funny', 'animation', 'movie', 'kids'] },
];

var gMeme;

function isLineClicked(pos, gCtx) {
    const res = gMeme.lines.forEach(line => {
        const x = line.pos.x;
        const y = line.pos.y;
        console.log(line.txt)
        const lineWidth = gCtx.measureText(line.txt);
        const lineHeight = line.size;

        return (pos.x >= x && pos.x <= x + lineWidth.width &&
            pos.y >= y - lineHeight && pos.y <= lineHeight)
    })

    return res
}

function getMemeImg() {
    return gSelectedImg
}

function setImg(imgId) {
    const img = gImgs.find(img => img.id === imgId);
    gSelectedImg = img;
    // console.log(gSelectedImg)
    gMeme.selectedImgId = imgId;
    gMeme
    // console.log(gMeme)
    _saveMemeToStorage()
}

function creatMemeLine(line, pos, width) {
    gMeme.lines.push({
        txt: line,
        size: 21,
        align: 'left',
        color: 'blue',
        width: null,
        pos: pos
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    console.log(gMeme)
    _saveMemeToStorage()
}

function deleteLine(idx) {
    // const gMeme.lines.find((line, index) => index === idx);
    gMeme.lines.splice(idx, 1)
    _saveMemeToStorage()
}

function setLineTxt(txt, txtIdx) {

    gMeme.lines[txtIdx].txt = txt;
    // console.log(gMeme.lines[gMeme.selectedLineIdx].txt)
}

function getMemes() {
    // console.log(img)
    return gMeme
}

function _creatMeme() {
    gMeme = loadFromStorage(STORAGE_KEY);
    if (!gMeme);
    gMeme = {
        selectedImgId: null,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I sometimes eat Bamya',
                size: 21,
                align: 'center',
                color: 'black',
                strokeC: '',
                width: null,
                pos: {
                    x: 135,
                    y: 25
                }
            },
            {
                txt: 'I love ice cream',
                size: 21,
                align: 'center',
                color: 'black',
                width: null,
                pos: {
                    x: 135,
                    y: 250
                }
            },

        ]
    }
    _saveMemeToStorage()
}

function getMemeImgs() {
    return gImgs
}

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gMeme)
}

