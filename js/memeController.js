'use strict'

let gElCanvas
let gCtx
// let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInitEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()

    addListeners()
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    // gElCanvas.height = elContainer.offsetHeight

    // const currImgId = getMeme().selectedImgId
    // const elImg = document.querySelector(`.img-${currImgId}`)
    // const IW = elImg.width
    // const IH = elImg.height
    // const CH = gElCanvas.height
    // gElCanvas.width = (IW * CH) / IH
    gElCanvas.width = elContainer.offsetWidth

    const currImgId = getMeme().selectedImgId
    const elImg = document.querySelector(`.img-${currImgId}`)
    const IW = elImg.width
    const IH = elImg.height
    const CW = gElCanvas.width
    gElCanvas.height = (IH * CW) / IW
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
    const currMemeId = getMeme().selectedImgId
    const elImg = new Image() // Create a new html img element
    elImg.src = `img/${currMemeId}.jpg` // Send a network req to get that image, define the img src

    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 6 }
        // drawText('', center.x, center.y)
        renderText()
    }
}

function onChangeText(txt) {
    setLineTxt(txt)
    renderMeme()
}

function renderText() {
    const meme = getMeme()
    var idxCount=-1
    meme.lines.forEach(line => {
        idxCount++
        if(line.pos.x===null || line.pos.y===null) {
            const idx = idxCount
            line.pos.x = gElCanvas.width / 2
            if(idx===0) {
                line.pos.y = gElCanvas.height / 6
            } else if(idx===1){
                line.pos.y = gElCanvas.height / 6 * 3
            }else {
                line.pos.y = gElCanvas.height / 6 * 5
            }
        }
        drawText(
            line.txt, 
            line.pos.x,
            line.pos.y, 
            line.size, 
            line.color,
            line.font,
            line.textAlign
            )
        // drawText(line.txt, line.x, line.y)
    })
    //Get the props we need from the meme
    // const { pos, color, size } = getMeme()
    // //Draw the meme
    // drawText(pos.x, pos.y, size, color)
}

function drawText(text, x, y, size, color, font, txtAlign) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

//Handle the listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
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

function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) return

    setMemeDrag(true)
    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { isDrag } = getMeme()

    if (!isDrag) return

    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveMeme(dx, dy)
    // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderCanvas()
}

function onUp() {
    setMemeDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
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

function onSetColor(val){
    setTxtColor(val)
    renderMeme()
}

function onResizeFont(sign){
    setTxtSize(sign)
    renderMeme()
}

function onAddLine(){
    const currLine = getMeme().lines[getMeme().selectedLineIdx]
    if(!currLine.txt) return
    document.querySelector('.editor-page .search-field').value = ''
    setLine()
}