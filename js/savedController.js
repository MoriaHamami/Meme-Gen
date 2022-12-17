'use strict'

function onInitSaved() {
    renderSavedGallery()
}

function renderSavedGallery() {
    const savedImgs = loadFromStorage(MEME_STORAGE_KEY)

    let countIdx = 0
    let strHtmls = savedImgs.map(meme => `
        <img class="gallery-img" src="${meme.img}" onclick="onSavedImgSelect('${countIdx++}')">
    `
    )
    document.querySelector('.saved-page .gallery').innerHTML = strHtmls.join('')
}

function onSavedImgSelect(memeIdx) {
    const savedImgs = loadFromStorage(MEME_STORAGE_KEY)
    const meme = savedImgs[memeIdx]
    // Show selected page in header 
    offActiveGallery()
    offActiveSaved()
    // Reveal wanted page and hide the other
    const elSavedPage = document.querySelector('.saved-page')
    const elEditorPage = document.querySelector('.editor-page')
    elSavedPage.hidden = true
    elEditorPage.hidden = false
    onInitEditor(meme)
}