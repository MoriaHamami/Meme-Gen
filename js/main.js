'use strict'

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function toggleModal() {
    document.body.classList.toggle('modal-open')
}

function onSavedPageSelected() {
    offActiveGallery()
    onActiveSaved()
    const elHomePage = document.querySelector('.home-page')
    const elEditorPage = document.querySelector('.editor-page')
    const elSavedPage = document.querySelector('.saved-page')
    elHomePage.hidden = true
    elEditorPage.hidden = true
    elSavedPage.hidden = false
    onInitSaved()
}

function onGalleryPageSelected() {
    onActiveGallery()
    offActiveSaved()
    const elHomePage = document.querySelector('.home-page')
    const elEditorPage = document.querySelector('.editor-page')
    const elSavedPage = document.querySelector('.saved-page')
    elSavedPage.hidden = true
    elEditorPage.hidden = true
    elHomePage.hidden = false
    onInitGallery()
}

function onActiveGallery() {
    const elGalleryBtn = document.querySelector('.gallery-btn')
    if (elGalleryBtn.classList.contains('active')) return
    elGalleryBtn.classList.add('active')
}

function offActiveGallery() {
    const elGalleryBtn = document.querySelector('.gallery-btn')
    if (!elGalleryBtn.classList.contains('active')) return
    elGalleryBtn.classList.remove('active')
}

function onActiveSaved() {
    const elSavedBtn = document.querySelector('.saved-btn')
    if (elSavedBtn.classList.contains('active')) return
    elSavedBtn.classList.add('active')
}

function offActiveSaved() {
    const elSavedBtn = document.querySelector('.saved-btn')
    if (!elSavedBtn.classList.contains('active')) return
    elSavedBtn.classList.remove('active')
}






