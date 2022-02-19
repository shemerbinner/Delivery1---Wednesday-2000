'use strict';

function makeId(length = 2) {
    const possible = '0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function makeRandLines(gCtx, canvasWidth) {//the width of the canvas
    const words = ['The', 'above', 'port', 'was', 'color', 'television', 'tuned', 'to', 'dead', 'All', 'this', 'more', 'less', 'I', 'had'];
    const fonts = ['Ariel', 'mR', 'quickR', 'shizuru'];
    const numLines = getRandomIntInclusive(1, 2);
    const lines = [];
    var longestWord = '';

    words.forEach(word => {
        if (word.length > longestWord.length) longestWord = word;
    })

    const longestWordLength = longestWord.length;

    for (let i = 0; i < numLines; i++) {
        var randFont = fonts[getRandomIntInclusive(0, 3)];
        var txt = '';
        var txtWidth = gCtx.measureText(txt).width;

        while (txtWidth < (canvasWidth - (longestWordLength)) / 2) {
            var randWordIdx = getRandomIntInclusive(0, 14);
            txt += (words[randWordIdx] + ' ');
            txtWidth = gCtx.measureText(txt).width;
        }

        var line = {
            txt: txt,
            size: getRandomIntInclusive(12, 20),
            align: 'left',
            color: getRandomColor(),
            strokeC: getRandomColor(),
            font: randFont,
            pos: {
                x: getRandomIntInclusive(40, 70),
                y: getRandomIntInclusive(25, 270)
            }
        }
        lines.push(line);
    }
    return lines;
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