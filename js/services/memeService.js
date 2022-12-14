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
            font: 'impact'
        }
    ]
}

function getMeme(){
    return gMeme
}

function setImg(imgId){
    gMeme.selectedImgId = imgId
}

function setSelectedLine(pos){
    const selectedIdx = gMeme.lines.findIndex(line => line.pos===pos)
    gMeme.selectedLineIdx = selectedIdx
}

function setPosition(position) {
    gMeme.lines[gMeme.selectedLineIdx].pos = position
}

function setLineTxt(text){
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function setAlignment(alignment){
    gMeme.lines[gMeme.selectedLineIdx].align = alignment
}

function setTxtSize(txtSize) {
    gMeme.lines[gMeme.selectedLineIdx].size = txtSize
    
}

function setTxtColor(txtColor){
    gMeme.lines[gMeme.selectedLineIdx].color = txtColor
}

function setLine() {
    gMeme.lines.push({
        pos: {x: null, y:null},
        txt: '',
        size: 40,
        align: 'center',
        color: 'white',
        font: 'impact'
    })
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

// //Check if the click is inside the circle 
// function isCircleClicked(clickedPos) {
//     const { pos } = gCircle
//     // Calc the distance between two dots
//     const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
//     //If its smaller then the radius of the circle we are inside
//     return distance <= gCircle.size
// }


// function setCircleDrag(isDrag) {
//     gCircle.isDrag = isDrag
// }

// // Move the circle in a delta, diff from the pervious pos
// function moveCircle(dx, dy) {
//     gCircle.pos.x += dx
//     gCircle.pos.y += dy

// }
