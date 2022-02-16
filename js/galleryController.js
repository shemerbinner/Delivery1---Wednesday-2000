'use strict'

function onInit() {
    renderGallery();
    renderSearchBar();
}

function renderGallery() {
    var imgs = getMemeImgs();

    const strHtml = imgs.map(img => {
        return `<img src="${img.url}" alt="" onclick="onImgSelect(${img.id})">`
    })
    document.querySelector('.grid').innerHTML = strHtml.join('');
}

function onImgSelect(imgId) {
    // console.log('hi')
    setImg(imgId);
    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.editor-container').style.display = 'block';

    renderEditController()
    renderMeme()
}

function renderSearchBar() {
    const strHtml = `
    <div class="search-container">
    <input class="search-input" id="search-input" type="search" placeholder="Enter search keyword">
    <label for="search-input" class="search-label"><i class="fa-solid fa-magnifying-glass"></i></label>            
    
                </div>
            <div class="key-words flex space-between grow">
            <span>funny</span>
            <span>dog</span>
            <span>cat</span>
            <span>baby</span>
            <span class="search-more-btn">more...</span>
            </div>`

    document.querySelector('.search-bar').innerHTML = strHtml;
}