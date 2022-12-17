'use strict'

let gImgUploaded = null

function onInitGallery() {
    renderGallery()
    displayKeywords()
    // renderKeyWords()
}

function renderGallery() {
    const imgs = getImgs()

    let strHtmls = imgs.map(img => `
        <img class="gallery-img img-${img.id}" src="${img.url}" onclick="onImgSelect(${img.id})">
    `
    )

    // strHtmls.unshift('<input type="file" name="image" class="gallery-img upload flex justify-content" style="background-color:var(--clr1)" onchange="uploadImg(event)"></input>')
    // strHtmls.unshift('<label for="file-input" class="gallery-img upload flex justify-content" style="background-color:var(--clr1)"></label>')
    // strHtmls.unshift('<input type="file" id="file-input btn" name="image" onchange="uploadImg(event)" />')
    strHtmls.unshift('<label class="gallery-img upload flex justify-content" style="background-color:var(--clr1)"><input type="file" id="file-input btn" name="image" onchange="uploadImg(event)" style="position: absolute;visibility: hidden;"/></label>')

    // style="position: absolute;visibility: hidden;"
    document.querySelector('.home-page .gallery').innerHTML = strHtmls.join('')
}

function onImgSelect(imgId) {
    const imgs = getImgs()
    // Notice that image one is in index 0
    const imgURL = imgs[imgId - 1].url
    setImg(imgId, imgURL)
    // renderMeme()
    offActiveGallery()
    offActiveSaved()
    const elHomePage = document.querySelector('.home-page')
    const elEditorPage = document.querySelector('.editor-page')
    elHomePage.hidden = true
    elEditorPage.hidden = false
    onInitEditor()
}

function displayKeywords() {
    const words = getNHighestValsInObj(getKeywordMap(), 5)
    // console.log('words:', words)
    // console.log('getKeywordMap():', getKeywordMap())
    words.map((word, idx) => {
        // console.log('idx:', idx)
        const elWord = document.querySelector(`.word-${idx+1}`)
        // console.log('elWord:', elWord)
        elWord.innerText = word
        elWord.dataset['word'] = word

        // Get the appearence amount and show text size accordingly
        
        // el.dataset.someDataAttr = 'mydata';
    })
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

// function uploadImg(){

// }

// function renderKeyWords() {
//     const likableWords = getMostSearchedKeys(5)
//     let strHtmls = likableWords.map(word => `
//         <span class="word-${word.name}" style="font-size: ${word.fontSize};">${word.name}</span>
//     `)

//     document.querySelector('.key-words').innerHTML = strHtmls.join('')

// }

// // The next 2 functions handle IMAGE UPLOADING to img tag from file system:
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
        // Run the callBack func, To render the img on the canvas
        img.onload = () => onImageReady(img)
    }

    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}


function addImgToGallery(img) {
    // SAVE TO STORAGE
    // const keyWords 
    //save img source
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

    // Show gallery after changes
    renderGallery()

    // Flash successful msg to user
    flashMsg('Image Uploaded!')
}



