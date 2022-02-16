'use strict'

function onInit(){
    renderGallery()
}

function renderGallery() {
    var imgs = getMemeImgs();

    const strHtml = imgs.map(img => {
        return `<img src="${img.url}" alt="" onclick="onImgSelect(${img.id})">`
    })
    document.querySelector('.grid').innerHTML = strHtml.join('');
}

function onImgSelect(imgId) {
    console.log('hi')
    setImg(imgId);
    document.querySelector('.gallery-container').style.display = 'none';
    renderEditController()
    renderMeme()
}