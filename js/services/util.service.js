'use strict';

var count = 1;
function getInitBook() {
    var initBooks = [
        { name: 'Your Life In Pictures', imgUrl: 'https://www.historic-newspapers.co.uk/app/uploads/2018/03/Your-Life-in-Pictures-Cover.jpg' },
        { name: 'The Doors Of Eden', imgUrl: 'https://ik.imagekit.io/panmac/tr:q-75,di-placeholder_portrait_aMjPtD9YZ.jpg,w-350,pr-true,bl/edition/9781509865888.jpg' },
        { name: 'Into The Forest', imgUrl: 'https://www.penguin.co.uk/content/dam/prh/books/312/312580/9780241377598.jpg.transform/PRHDesktopWide_small/image.jpg' }
    ];
    for (var i = 0; i < count; i++) {
        var book = initBooks[i];
    }
    count++
    if (count > 3) count = 1;
    // console.log(book)
    return book
}

function makeId(length = 2) {
    const possible = '0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function makeLorem(wordCount = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (wordCount > 0) {
        wordCount--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}