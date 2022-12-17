'use strict'

function getNHighestValsInObj(obj, n = 1) {
    const keysOfHighestVals = []
    if (n > Object.keys(obj).length) return false
    Object.keys(obj).sort((a, b) => obj[b] - obj[a]).forEach((key, idx) => {
        if (idx < n) {
            keysOfHighestVals.push({
                keyword: key,
                searchCount: obj[key],
                nHighest: idx
            })
        }
    })
    const shuffledKeys = shuffle(keysOfHighestVals)
    return shuffledKeys
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




