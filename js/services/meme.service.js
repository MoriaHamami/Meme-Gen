'use strict'

let gMeme

// Add new line
function setLine() {
    gMeme.lines.push({
        pos: { x: null, y: null },
        txt: '',
        size: 40,
        align: 'center',
        color: 'white',
        font: 'impact',
        stroke: 'black',
        isDrag: false,
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function getMeme() {
    return gMeme
}

function setNewMeme(meme) {
    gMeme = meme
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setImg(imgId, imgURL = null) {
    // Notice that image one is in index 0
    if (!imgURL) imgURL = gImgs[imgId - 1].url

    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        url: imgURL,
        lines: [
            {
                pos: { x: null, y: null },
                txt: '',
                size: 40,
                align: 'center',
                color: 'white',
                stroke: 'black',
                font: 'impact',
                isDrag: false,
            }
        ],
        img: null
    }
}

function setSelectedLine(newLine) {
    if (newLine === null) {
        gMeme.selectedLineIdx = null
        return
    }
    const selectedIdx = gMeme.lines.findIndex(line => line === newLine)
    gMeme.selectedLineIdx = selectedIdx
}

function setPositionX(posX) {
    getCurrLine().pos.x = posX
}

function setLineTxt(text) {
    getCurrLine().txt = text.toUpperCase()
}

function setAlignment(alignment) {
    getCurrLine().align = alignment
}

function setTxtSize(sign) {
    getCurrLine().size += 2 * sign
}

function setTxtColor(txtColor) {
    getCurrLine().color = txtColor
}

function setTxtColorOutline(outlineColor) {
    getCurrLine().stroke = outlineColor
}

function setMemeDrag(isDrag) {
    getCurrLine().isDrag = isDrag
}

function setFont(txtFont) {
    getCurrLine().font = txtFont
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

//Check if the click is inside the text box 
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
        var height = line.size * 1.286 / 2

        if (yDistance <= height && xDistance <= width) {
            currClickedLine = line
            setSelectedLine(line)
        }
    })

    return currClickedLine
}

// Move the Meme in a diff from the pervious pos
function moveText(dx, dy) {
    getCurrLine().pos.x += dx
    getCurrLine().pos.y += dy
}


