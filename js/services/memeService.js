'use strict'

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'center',
            color: 'red'
        }
    ]
}

function getMeme(){
    
}

function setLineTxt(){

}

function setImg(){

}

let gCircle

function createCircle(pos) {
    gCircle = {
        pos,
        size: 60,
        color: 'blue',
        isDrag: false
    }
}

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
