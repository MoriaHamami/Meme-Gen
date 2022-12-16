'use strict'

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            pos: {x: null, y:null},
            txt: '',
            size: 40,
            align: 'center',
            color: 'white',
            font: 'impact',
            isDrag: false,
        }
    ]
}

function getMeme(){
    return gMeme
}

function getCurrLine(){
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setImg(imgId){
    gMeme.selectedImgId = imgId
}

function setSelectedLine(newLine){
    const selectedIdx = gMeme.lines.findIndex(line => line===newLine)
    gMeme.selectedLineIdx = selectedIdx
}

function setPosition(position) {
    getCurrLine().pos = position
}

function setLineTxt(text){
    getCurrLine().txt = text.toUpperCase()
}

function setAlignment(alignment){
    getCurrLine().align = alignment
}

function setTxtSize(sign) {
    getCurrLine().size += 2 * sign
    
}

function setTxtColor(txtColor){
    getCurrLine().color = txtColor
}


// Add new line
function setLine() {
    gMeme.lines.push({
        pos: {x: null, y: null},
        txt: '',
        size: 40,
        align: 'center',
        color: 'white',
        font: 'impact'
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}
// let gCircle

// function createCircle(pos) {
//     gCircle = {
//         pos,
//         size: 60,
//         color: 'blue',
//         isDrag: false
//     }
// }

// function getCircle() {
//     return gCircle
// }

//Check if the click is inside the circle 
function isTextClicked(clickedPos) {
    let currClickedLine = null
    gMeme.lines.forEach(line => {

        // const currLine = getCurrLine()
        const pos = line.pos
        // Calc the distance between two dots
        const yDistance = Math.abs(pos.y - clickedPos.y)
        const xDistance = Math.abs(pos.x - clickedPos.x)
        // Get variables
        var width = gCtx.measureText(line.txt).width
        var height = line.size * 1.286
        if(yDistance <= height && xDistance <= width) {
            currClickedLine = line
            setSelectedLine(line)
        }
    })
    
    return currClickedLine
    // const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    // Check if distance is smaller than the box around text
    // const txtBoxHeight = 
    // const txtBoxWidth = 

    // Add to width the width size wanted for inline padding of box
    // width += gElCanvas.width / 8

    return yDistance <= height && xDistance <= width
    // return distance <= getCurrLine().size * getCurrLine().txt.length
}


function setMemeDrag(isDrag) {
    getCurrLine().isDrag = isDrag
}

// Move the Meme in a diff from the pervious pos
function moveText(dx, dy) {
    getCurrLine().pos.x += dx
    getCurrLine().pos.y += dy
}

function setFont(txtFont){
    getCurrLine().font = txtFont
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}
