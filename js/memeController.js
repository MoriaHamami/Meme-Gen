'use strict'

const MEME_STORAGE_KEY = 'saved'
let gElCanvas
let gCtx
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInitEditor(savedMeme = null) {
    if(savedMeme) setNewMeme(savedMeme)
    // if(savedMeme) getMeme() = JSON.parse(savedMeme)

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()

    addListeners()
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    // if(window.innerWidth < 970) {
    gElCanvas.width = elContainer.offsetWidth
    const currImgId = getMeme().selectedImgId
    const elImg = document.querySelector(`.img-${currImgId}`)
    const IW = elImg.width
    const IH = elImg.height
    const CW = gElCanvas.width
    gElCanvas.height = (IH * CW) / IW
    // } else {
    //     gElCanvas.height = elContainer.offsetHeight
    //     const currImgId = getMeme().selectedImgId
    //     const elImg = document.querySelector(`.img-${currImgId}`)
    //     const IW = elImg.width
    //     const IH = elImg.height
    //     const CH = gElCanvas.height
    //     gElCanvas.width = (IW * CH) / IH
    // }

    // gElCanvas.width = elContainer.offsetWidth
    // const currImgId = getMeme().selectedImgId
    // const elImg = document.querySelector(`.img-${currImgId}`)
    // const IW = elImg.width
    // const IH = elImg.height
    // const CW = gElCanvas.width
    // gElCanvas.height = (IH * CW) / IW
}

//Renders an image on the canvas and a line of text on top
function renderMeme() {
    // const currMemeId = getMeme().selectedImgId
    const elImg = new Image() // Create a new html img element
    // elImg.src = `img/${currMemeId}.jpg` // Send a network req to get that image, define the img src
    elImg.src = getMeme().url // Send a network req to get that image, define the img src

    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 6 }
        // drawText('', center.x, center.y)
        renderText()
    }
}

function onChangeText(txt) {
    if (gMeme.selectedLineIdx === null) setLine()
    setLineTxt(txt)
    renderMeme()
}

function renderText() {
    const meme = getMeme()
    var idxCount = -1
    meme.lines.forEach(line => {
        idxCount++
        if (line.pos.x === null || line.pos.y === null) {
            const idx = idxCount
            line.pos.x = gElCanvas.width / 2
            if (idx === 0) {
                line.pos.y = gElCanvas.height / 6
            } else if (idx === 1) {
                line.pos.y = gElCanvas.height / 6 * 3
            } else {
                line.pos.y = gElCanvas.height / 6 * 5
            }
        }
        // Draw text box before drawing text, so it would appear behind it
        if (getCurrLine() === line) drawTextBox()
        drawText(
            line.txt,
            line.pos.x,
            line.pos.y,
            line.size,
            line.color,
            line.font,
            line.align,
            line.stroke
        )

        // drawText(line.txt, line.x, line.y)
    })
    //Get the props we need from the meme
    // const { pos, color, size } = getMeme()
    // //Draw the meme
    // drawText(pos.x, pos.y, size, color)
}

function drawText(text, x, y, size, color, font, txtAlign, strokeColor) {
    // gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    // gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = txtAlign
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function drawTextBox() {
    // Get variables
    const currLine = getCurrLine()
    var width = gCtx.measureText(currLine.txt).width
    var height = currLine.size * 1.286;
    let x = currLine.pos.x
    const y = currLine.pos.y

    // Add to width the width size wanted for inline padding of box
    width += gElCanvas.width / 8
    const singleSidedPaddingWidth = gElCanvas.width / 8 / 2

    var coordY = y - height / 2

    // Choose box starting coord according to text coords placement
    if (currLine.align === 'left') {
        var coordX = x - singleSidedPaddingWidth
    } else if (currLine.align === 'right') {
        var coordX = x - width + singleSidedPaddingWidth
    } else {
        // Get the center coordinates of the box
        var coordX = x - width / 2
    }

    // Draw a round rectangle for text box
    gCtx.lineWidth = 1
    gCtx.strokeStyle = '#bbc4d1'
    gCtx.beginPath()
    // gCtx.ellipse(x, y, height, width, Math.PI / 4, 0, 2 * Math.PI)
    // gCtx.strokeRect(x, y, width, height)
    gCtx.roundRect(coordX, coordY, width, height, [50])

    gCtx.stroke()

    gCtx.fillStyle = 'rgba(255,255,255, 0.42)'
    gCtx.fill()

    // Render text again so it will appear above text box
    // renderText()

}

//Handle the listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    addKeyBoardListeners()
    //Listen for resize ev
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function addKeyBoardListeners() {
    document.querySelector('.editor-page .search-field').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            onAddLine()
        }
    })
}

function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    // Check if a line was selected and if so, mark it as selected line
    if (!isTextClicked(pos)) {
        // If no line was selected, remove text box and text in input
        setSelectedLine(null)
        document.querySelector('.editor-page .search-field').value = ''
        renderMeme()
        return
    }
    // drawTextBox()

    setMemeDrag(true)
    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

    // Render meme to show selcted line with text box
    renderMeme()

    // Update input appearing in text input bar
    document.querySelector('.editor-page .search-field').value = getCurrLine().txt


}

function onMove(ev) {
    if (getMeme().selectedLineIdx === null) return

    const { isDrag } = getCurrLine()

    if (!isDrag) return
    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(dx, dy)
    // Save the last pos , to remember where we`ve been and move accordingly
    gStartPos = pos
    // Render canvas after every move
    renderMeme()
}

function onUp() {
    if (getMeme().selectedLineIdx === null) return
    setMemeDrag(false)
    // renderMeme()
    // gElCanvas.style.cursor = 'grab'
}

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        // to not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onSetColor(val) {
    if (getMeme().selectedLineIdx === null) return

    setTxtColor(val)
    renderMeme()
}

function onSetColorOutline(val) {
    if (getMeme().selectedLineIdx === null) return

    setTxtColorOutline(val)
    renderMeme()
}

function onResizeFont(sign) {
    if (getMeme().selectedLineIdx === null) return

    setTxtSize(sign)
    renderMeme()
}

function onAddLine() {
    const currLine = getCurrLine()
    if (!currLine.txt) return
    document.querySelector('.editor-page .search-field').value = ''
    setLine()
    renderMeme()
}

function onChangeFont(font) {
    setFont(font)
    renderMeme()
}

function onRemove() {
    if (getMeme().selectedLineIdx === null) return

    removeLine()
    renderMeme()
    document.querySelector('.editor-page .search-field').value = ''
    setLine()
}

function onShareImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    console.log('formData:', formData)
    // Send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(url => {
            onSuccess(url)
        })
}

// Make it work without the text bubble
function downloadMeme(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function onAlign(alignment) {

    if (getMeme().selectedLineIdx === null) return

    switch (alignment) {
        case 'l':
            setAlignment('left')
            // Position chosen according to text box alignment
            setPositionX(gElCanvas.width / 16 + 5)
            break
        case 'r':
            setAlignment('right')
            setPositionX(gElCanvas.width - gElCanvas.width / 16 - 5)
            break
        case 'c':
            setAlignment('center')
            setPositionX(gElCanvas.width / 2)
            break
    }
    renderMeme()
}

function onSaveMeme() {
    let saves = loadFromStorage(MEME_STORAGE_KEY) 
    if(!saves) saves = []

    // Add to meme object image of canvas
    const imgURL = gElCanvas.toDataURL('image/jpeg')
    getMeme().img = imgURL
    saves.push(getMeme())

    saveToStorage(MEME_STORAGE_KEY, saves)

    flashMsg('Meme Saved!')
}

// function onDraw(x, y, prevPosX, prevPosY) {
//     let colorLine = gDraw.color
//     let x =
//     gCtx.beginPath()
//     gCtx.lineWidth = '2'
//     gCtx.moveTo(prevPosX, prevPosY) // Moves the starting point of a new path to the (x, y) coordinates.
//     gCtx.lineTo(x, y) // Connects the last point in the current path to the specified (x, y) coordinates with a straight line.
//     gCtx.strokeStyle = colorLine
//     gCtx.stroke()
//     updatePrevPos({ x, y })

// }

// function getDraw() {
//     return gDraw
// }

// function updatePrevPos(prevPos) {
//     gDraw.prevPos = prevPos
// }

// let gCurrMode = gDraw
// let gDraw = {
//     name: 'draw',
//     pos: null,
//     prevPos: null,
//     size: 60,
//     color: 'green',
//     isDrag: false
// }

// function renderShape() {
//     const shape = getShape().name
//     const color = getColors()
//     const { pos, size, prevPos } = getShape()
//     switch (shape) {
//         case 'square':
//             drawSquare(pos.x, pos.y, size, color.line)
//             break
//         case 'draw':
//             drawDraw(pos.x, pos.y, prevPos.x, prevPos.y, color.line)
//             break
//         case 'circle':
//             drawCircle(pos.x, pos.y, size, color.line)
//             break
//     }
// }

/* <a href="#" class="btn" onclick="downloadImg(this)" download="my-img.jpg">SAVE</a> */
