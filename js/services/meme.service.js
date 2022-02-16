'use strict'

var gSelectedImg;

var gImgs = [
    { id: 1, url: '/img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: '/img/2.jpg', keywords: ['sweet', 'dog'] },
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
        }
    ]
}

function getMemeImg(){
    return gSelectedImg
}

function setImg(imgId){
   const img = gImgs.find(img => img.id === imgId);
   gSelectedImg = img;
    // console.log(gSelectedImg)
    gMeme.selectedImgId = imgId;
    gMeme
    // console.log(gMeme)
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
    // console.log(gMeme.lines[gMeme.selectedLineIdx].txt)
}

function getMeme() {
    // console.log(img)
    return gMeme
}

function getMemeImgs(){
    return gImgs
}

