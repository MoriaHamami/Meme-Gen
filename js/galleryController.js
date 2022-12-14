'use strict'

function renderGallery(){

}

function onImgSelect(){
    setImg()
    renderMeme()
    const elHomePage = document.querySelector('.home-page')
    const elEditorPage = document.querySelector('.editor-page')
    elHomePage.hidden = true
    elEditorPage.hidden = false
}