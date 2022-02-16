'use strict'

var gSelectedImg;

var gImgs = [
    { id: 1, url: '/img/1.jpg', keywords: ['funny', 'cat', 'famous', 'president'] },
    { id: 2, url: '/img/2.jpg', keywords: ['sweet', 'dog'] },
    { id: 3, url: '/img/3.jpg', keywords: ['sweet', 'dog', 'baby'] },
    { id: 4, url: '/img/4.jpg', keywords: ['sweet', 'cat'] },
    { id: 5, url: '/img/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: '/img/6.jpg', keywords: ['funny', 'man', 'science'] },
    { id: 7, url: '/img/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: '/img/8.jpg', keywords: ['funny', 'man'] },
    { id: 9, url: '/img/9.jpg', keywords: ['funny', 'baby'] },
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

var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Bamya',
            size: 20,
            align: 'left',
            color: 'red'
        },
        {
            txt: 'I love ice cream',
            size: 20,
            align: 'left',
            color: 'blue'
        },

    ]
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
}

function setLineTxt(txt, txtIdx) {

    gMeme.lines[txtIdx].txt = txt;
    // console.log(gMeme.lines[gMeme.selectedLineIdx].txt)
}

function getMemes() {
    // console.log(img)
    return gMeme
}

function getMemeImgs() {
    return gImgs
}

