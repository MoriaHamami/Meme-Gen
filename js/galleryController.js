'use strict'

function onInitGallery() {
    renderGallery()
}

function renderGallery() {
    const imgs = getImgs()

    let strHtmls = imgs.map(img => `
        <img class="gallery-img" src="${img.url}" onclick="onImgSelect(${img.id})">
    `
    )

    document.querySelector('.gallery').innerHTML = strHtmls.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    // renderMeme()
    const elHomePage = document.querySelector('.home-page')
    const elEditorPage = document.querySelector('.editor-page')
    elHomePage.hidden = true
    elEditorPage.hidden = false
    onInitEditor()
}