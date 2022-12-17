'use strict'

function getNHighestValsInObj(obj, n = 1) {
    const keysOfHighestVals = []
    if (n > Object.keys(obj).length) return false
    let arrIdx = 0
    Object.keys(obj).sort((a, b) => obj[b] - obj[a]).forEach((key, idx) => {
        if (idx < n) {
            keysOfHighestVals[arrIdx++] = key
        }
    })
    const shuffledKeys = shuffle(keysOfHighestVals)
    return shuffledKeys
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => {
        el.classList.remove('open')
    }, 3000)
}

function shuffle(items) {
    var randIdx, keep
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length)
        keep = items[i]
        items[i] = items[randIdx]
        items[randIdx] = keep
    }
    return items
}

// function makeId(length = 6) {
//     const possible = '0123456789'
//     var txt = ''
//     for (var i = 0; i < length; i++) {
//         txt += possible.charAt(Math.floor(Math.random() * possible.length))
//     }
//     return txt
// }

// function makeLorem(wordCount = 30) {
//     const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
//     var txt = ''
//     while (wordCount > 0) {
//         wordCount--
//         txt += words[Math.floor(Math.random() * words.length)] + ' '
//     }
//     return txt
// }


