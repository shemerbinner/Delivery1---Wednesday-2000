'use strict'

var keywords = {
    funny: {
        clicks: 0,
        prevSize: 1,
    },
    dog: {
        clicks: 0,
        prevSize: 1,
    },
    cat: {
        clicks: 0,
        prevSize: 1,
    },
    baby: {
        clicks: 0,
        prevSize: 1,
    }
}

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
   <a href="index.html"><img src="img/logo.png" class="logo header-logo" alt=""></a>

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
    <form class="tags-form" action="/action_page.php" method="get">
               <input type="text" name="tags" id="tags" list="tags-list" placeholder="Search"">
               <datalist id="tags-list">
               <option value="All"></option>
               <option value="Sweet"></option>
               <option value="Dog"></option>
               <option value="Cat"></option>
               <option value="Man"></option>
               <option value="Funny"></option>
             </datalist>
             <button class="tags-btn" onclick="onFilter(event)" for="tags">Filter</button>
             </form>
                </div>

            <div class="key-words flex space-between grow">
            <span onclick="resizeKeyWord(this, this.innerText)" class="key-word">funny</span>
            <span onclick="resizeKeyWord(this, this.innerText)" class="key-word">dog</span>
            <span onclick="resizeKeyWord(this, this.innerText)" class="key-word">cat</span>
            <span onclick="resizeKeyWord(this, this.innerText)" class="key-word">baby</span>
            <span onclick="resizeKeyWord(this, this.innerText)" class="search-more-btn">more...</span>
            </div>`

    document.querySelector('.search-bar').innerHTML = strHtml;
}

function resizeKeyWord(el, keyWord) {
    keywords[keyWord].clicks++
    var prevSize = keywords[keyWord].prevSize;

    el.style.fontSize = `${prevSize + 0.1}rem`
    keywords[keyWord].prevSize = prevSize + 0.1;

    onFilter('', keyWord);
}

function toggleMenu() {
    document.body.classList.toggle('open-menu');
}