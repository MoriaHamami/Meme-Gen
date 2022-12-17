'use strict'

let gImgUploaded = null

function onInitGallery() {
    renderGallery()
    displayKeywords()
}

function renderGallery() {
    const imgs = getImgs()
    let strHtmls = imgs.map(img => `
        <img class="gallery-img img-${img.id}" src="${img.url}" onclick="onImgSelect(${img.id})">
    `
    )
    strHtmls.unshift('<label class="gallery-img upload flex justify-content" style="background-color:var(--clr1)"><input type="file" id="file-input btn" name="image" onchange="uploadImg(event)" style="position: absolute;visibility: hidden;"/></label>')
    document.querySelector('.home-page .gallery').innerHTML = strHtmls.join('')
}

function displayKeywords() {
    const words = getNHighestValsInObj(getKeywordMap(), getKeywordsToShowNum())
    words.map((word, idx) => {
        const elWord = document.querySelector(`.word-${idx + 1}`)
        elWord.innerText = word.keyword
        elWord.dataset['word'] = word.keyword
        // Change the size of keyword according to appearances
        elWord.style.fontSize = (5 - word.nHighest + 1) / 3 + 'rem'
    })
}

function onChangeKeywordsToShow(change) {
    renderKeywordLines(change)
    changeKeywordsToShow(change)
    displayKeywords()
}

function renderKeywordLines(change) {
    const keywordLines = getKeywordsToShowNum() / 5
    const elLine2 = document.querySelectorAll('.words-2')
    const elLine3 = document.querySelectorAll('.words-3')

    switch (keywordLines) {
        case 3:
            if (+change === 1) break
            elLine3.forEach(el => {
                el.hidden = true
            })
            break
        case 2:
            if (+change === 1) {
                elLine3.forEach(el => {
                    el.hidden = false
                })
            } else {
                elLine2.forEach(el => {
                    el.hidden = true
                })
            }
            break
        case 1:
            if (+change === -1) break
            elLine2.forEach(el => {
                el.hidden = false
            })
            break
    }
}

function onKeyUpSearch(searchVal = null) {
    if (searchVal === null) {
        // If the search came from search box, get search value
        searchVal = document.querySelector('.home-page .search-field').value
    } else {
        // If the search came from keyword press, update keyword map
        updateKeywordCountFromKeywordBox(searchVal)
    }

    setImgFilter(searchVal)
    renderGallery()

    // Update keyword box
    displayKeywords()
}

function onImgSelect(imgId) {
    setImg(imgId)
    offActiveGallery()
    offActiveSaved()
    const elHomePage = document.querySelector('.home-page')
    const elEditorPage = document.querySelector('.editor-page')
    elHomePage.hidden = true
    elEditorPage.hidden = false
    onInitEditor()
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system:
function uploadImg(ev) {
    loadImageFromInput(ev, addImgToGallery)
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = (event) => {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, to render the img
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

// The next 2 functions handle getting keywords for image and saving it in gallery
function addImgToGallery(img) {
    gImgUploaded = img.src
    // Get keywords, and when submitted image is saved 
    toggleModal()
}

function onSubmitWords() {
    // Get value
    let val = document.querySelector('#words').value
    // Get words as array
    if (!val) keywords = []
    else {
        const regex = /\b\w{1,}\b/g
        var keywords = val.match(regex)
    }
    // Add and save img to gallery
    addImg(gImgUploaded, keywords)
    saveImgs()
    // Remove last used input value, for next use
    val = ''
    // Remove last search made to show whole gallery
    document.querySelector('.home-page .search-field').value = ''
    onKeyUpSearch()
    // Show gallery after changes
    renderGallery()
    // Flash successful msg to user
    flashMsg('Image Uploaded!')
}




