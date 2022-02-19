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
    document.querySelector('.card-container').style.display = 'none';
    document.querySelector('.editor-container').style.display = 'block';
    document.querySelector('.main-footer').style.height = '150px';

    renderNavBar()
    renderEditController()
    renderMeme()
}

function onCreateRandomMeme() {
    // console.log('hi')

    createRandomMeme(getRandomIntInclusive(1, 9))

    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.card-container').style.display = 'none';
    document.querySelector('.editor-container').style.display = 'block';
    document.querySelector('.main-footer').style.height = '150px';

    renderNavBar()
    renderEditController()
    renderMeme()
}

function renderNavBar() {
    const strHtml = `<div class="nav-container">
<nav class="main-nav flex space-between main-layout">
   <a href="index.html"><img src="/img/logo.png" class="logo header-logo" alt=""></a>

    <div class="links-container">
        <a href="index.html">Gallery</a>
        <span style="color: #8a8a8a;">|</span>
        <a href="">About</a>
    </div>
</nav>`

    document.querySelector('.main-header').classList.add('editor-mode');
    document.querySelector('.main-header').innerHTML = strHtml;

}

function renderSearchBar() {
    const strHtml = `
    <div class="search-container">
    <input class="search-input" id="search-input" type="search" placeholder="Enter search keyword">
    <label for="search-input" class="search-label"><i class="fa-solid fa-magnifying-glass"></i></label>            
    
                </div>
            <div class="key-words flex space-between grow">
            <span class="key-word">funny</span>
            <span class="key-word">dog</span>
            <span class="key-word">cat</span>
            <span class="key-word">baby</span>
            <span class="search-more-btn">more...</span>
            </div>`

    document.querySelector('.search-bar').innerHTML = strHtml;
}

function toggleMenu() {
    document.body.classList.toggle('open-menu');
}