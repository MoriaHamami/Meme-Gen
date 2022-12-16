'use strict'

function onInitGallery() {
    renderGallery()
    // renderKeyWords()
}

function renderGallery() {
    const imgs = getImgs()

    let strHtmls = imgs.map(img => `
        <img class="gallery-img img-${img.id}" src="${img.url}" onclick="onImgSelect(${img.id})">
    `
    )

    document.querySelector('.gallery').innerHTML = strHtmls.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    // renderMeme()
    offActiveGallery()
    offActiveSaved()
    const elHomePage = document.querySelector('.home-page')
    const elEditorPage = document.querySelector('.editor-page')
    elHomePage.hidden = true
    elEditorPage.hidden = false
    onInitEditor()
}

function onKeyUpSearch() {
    // setTimeout(() => {
        const searchStr = document.querySelector('.home-page .search-field').value
        // console.log(':', )
        setImgFilter(searchStr)
        renderGallery()
        // document.querySelector('input[name="search"]').value = searchStr
    // }, 1500)

    
    // renderKeyWords()
}

// function renderKeyWords() {
//     const likableWords = getMostSearchedKeys(5)
//     let strHtmls = likableWords.map(word => `
//         <span class="word-${word.name}" style="font-size: ${word.fontSize};">${word.name}</span>
//     `)

//     document.querySelector('.key-words').innerHTML = strHtmls.join('')
    
// }

