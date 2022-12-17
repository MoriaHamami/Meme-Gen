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

    // countIdx = 0
    // savedImgs.map(meme => {
    //     document.querySelector(`.img-${countIdx++}`).onclick = onSavedImgSelect(meme)
    // })
    // img-${countIdx}
}

function onSavedImgSelect(memeIdx) {
    const savedImgs = loadFromStorage(MEME_STORAGE_KEY)
    const meme = savedImgs[memeIdx]

    offActiveGallery()
    offActiveSaved()
    const elSavedPage = document.querySelector('.saved-page')
    const elEditorPage = document.querySelector('.editor-page')
    elSavedPage.hidden = true
    elEditorPage.hidden = false
    console.log('elSavedPage.hidden:', elSavedPage.hidden)
    // const memeObj = JSON.parse(memeString)
    onInitEditor(meme)
    // onInitEditor(memeObj)
}