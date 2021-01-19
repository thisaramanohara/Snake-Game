document.addEventListener('DOMContentLoaded',()=>{
    const border = document.querySelector('.border')
    //const snakeHead = document.createElement('div')
    const snakeBody = document.createElement('div')

    let start=250
    let upTimerId,rightTimerId,leftTimerId,downTimerId
    let movingUp=false
    let movingLeft=false
    let movingRight=false
    let movingDown=false

    let bodyIndex = [
        [start,start],
        [start-10,start],
        [start-20,start],
        [start-30,start],
        [start-40,start],
    ]

    /*
    const createSnake = ()=>{
        border.appendChild(snakeHead)
        snakeHead.classList.add('snakeHead')
        snakeHead.style.left = bodyIndex[0][0]+'px'
        snakeHead.style.bottom = bodyIndex[0][1]+'px'
    }
    createSnake()
    */
    class BodyCell {
        constructor(left,bottom) {
            this.left = left
            this.bottom = bottom
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('snakeBody')
            visual.style.left = this.left+'px'
            visual.style.bottom = this.bottom+'px'

            snakeBody.appendChild(visual)
        }
    }


    class FillCell {
        constructor(left,bottom) {
            this.left = left
            this.bottom = bottom
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('fillCell')
            visual.style.left = this.left+'px'
            visual.style.bottom = this.bottom+'px'

            snakeBody.appendChild(visual)
        }
    }


    const createBody = ()=>{
        bodyIndex.forEach(cell=>{
            let newCell = new BodyCell(cell[0],cell[1])
        })

        border.appendChild(snakeBody)
    }


    const moveDown = ()=>{
        movingDown = true

        clearInterval(rightTimerId)
        clearInterval(leftTimerId)
        clearInterval(upTimerId)



        downTimerId = setInterval(()=>{
            lastLeft = bodyIndex[bodyIndex.length-1][0]
                lastBottom = bodyIndex[bodyIndex.length-1][1]

                newLeft = bodyIndex[0][0]
                newBottom = bodyIndex[0][1] - 10
                bodyIndex.forEach(cell=>{
                    currentLeft = cell[0]
                    currentBottom = cell[1]

                    cell[0] = newLeft
                    cell[1] = newBottom

                    newLeft = currentLeft
                    newBottom = currentBottom
                })

            let fillCell = new FillCell(lastLeft,lastBottom)

            bodyIndex.forEach(cell=>{
                let newCell = new BodyCell(cell[0],cell[1])
            })  
            border.appendChild(snakeBody)
        },100)
    }

    const moveUp = ()=>{
        movingUp = true

        clearInterval(rightTimerId)
        clearInterval(leftTimerId)
        clearInterval(downTimerId)


        upTimerId = setInterval(()=>{
            lastLeft = bodyIndex[bodyIndex.length-1][0]
                lastBottom = bodyIndex[bodyIndex.length-1][1]

                newLeft = bodyIndex[0][0]
                newBottom = bodyIndex[0][1] + 10
                bodyIndex.forEach(cell=>{
                    currentLeft = cell[0]
                    currentBottom = cell[1]

                    cell[0] = newLeft
                    cell[1] = newBottom

                    newLeft = currentLeft
                    newBottom = currentBottom
                })

            let fillCell = new FillCell(lastLeft,lastBottom)

            bodyIndex.forEach(cell=>{
                let newCell = new BodyCell(cell[0],cell[1])
            })  
            border.appendChild(snakeBody)
        },100)
    }

/*    const moveUp = ()=>{
        movingUp = true
        //movingLeft = false
        //movingRight = false
        clearInterval(rightTimerId)
        clearInterval(leftTimerId)
        upTimerId = setInterval(()=>{

            if(movingRight){
                lastLeft = bodyIndex[bodyIndex.length-1][0]
                lastBottom = bodyIndex[bodyIndex.length-1][1]

                newLeft = bodyIndex[0][0]
                newBottom = bodyIndex[0][1] + 10
                bodyIndex.forEach(cell=>{
                    currentLeft = cell[0]
                    currentBottom = cell[1]

                    cell[0] = newLeft
                    cell[1] = newBottom

                    newLeft = currentLeft
                    newBottom = currentBottom
                })
            }else if(movingLeft){
                lastLeft = bodyIndex[0][0]
                lastBottom = bodyIndex[0][1]

                newLeft = bodyIndex[bodyIndex.length-1][0]
                newBottom = bodyIndex[bodyIndex.length-1][1] + 10
                bodyIndex.slice().reverse().forEach(cell=>{
                    currentLeft = cell[0]
                    currentBottom = cell[1]

                    cell[0] = newLeft
                    cell[1] = newBottom

                    newLeft = currentLeft
                    newBottom = currentBottom
                })
            }else if(movingUp && !movingLeft && !movingRight){
                lastLeft = bodyIndex[bodyIndex.length-1][0]
                lastBottom = bodyIndex[bodyIndex.length-1][1]

                newLeft = bodyIndex[0][0]
                newBottom = bodyIndex[0][1] + 10
                bodyIndex.forEach(cell=>{
                    currentLeft = cell[0]
                    currentBottom = cell[1]

                    cell[0] = newLeft
                    cell[1] = newBottom

                    newLeft = currentLeft
                    newBottom = currentBottom
                })
            }


            

            
            let fillCell = new FillCell(lastLeft,lastBottom)

            bodyIndex.forEach(cell=>{
                let newCell = new BodyCell(cell[0],cell[1])
            })  
            border.appendChild(snakeBody)
        },100)
    }

    */


    const moveRight = ()=>{
        movingRight = true
        clearInterval(downTimerId)
        clearInterval(upTimerId)
        clearInterval(leftTimerId)
/*
        if(movingLeft){
            movingLeft = false
            bodyIndex = bodyIndex.slice().reverse()
        }
  */      
        rightTimerId = setInterval(()=>{
            /*
            if(movingLeft){
                movingLeft = false
                bodyIndex = bodyIndex.slice().reverse()
            }
            */

            lastLeft = bodyIndex[bodyIndex.length-1][0]
            lastBottom = bodyIndex[bodyIndex.length-1][1]

            newLeft = bodyIndex[0][0] + 10
            newBottom = bodyIndex[0][1]
            bodyIndex.forEach(cell=>{
                currentLeft = cell[0]
                currentBottom = cell[1]

                cell[0] = newLeft
                cell[1] = newBottom

                newLeft = currentLeft
                newBottom = currentBottom
            })
            
            let fillCell = new FillCell(lastLeft,lastBottom)

            bodyIndex.forEach(cell=>{
                let newCell = new BodyCell(cell[0],cell[1])
            })  
            border.appendChild(snakeBody)

        },100)
    }



    const moveLeft = ()=>{
        movingLeft=true
        clearInterval(downTimerId)
        //movingRight=false
        clearInterval(upTimerId)
        clearInterval(rightTimerId)
        //if((movingRight && movingLeft) || (!movingUp && movingRight)){
/*
        if((!movingRight && movingLeft) || (!movingUp && movingRight)){
            movingRight = false
            bodyIndex = bodyIndex.slice().reverse()
        }
        */
        leftTimerId = setInterval(()=>{
            /*
            if(!movingRight){
                movingRight = false
                bodyIndex = bodyIndex.slice().reverse()
            }
            */
            lastLeft = bodyIndex[bodyIndex.length-1][0]
            lastBottom = bodyIndex[bodyIndex.length-1][1]

            newLeft = bodyIndex[0][0] - 10
            newBottom = bodyIndex[0][1]
            bodyIndex.forEach(cell=>{
                currentLeft = cell[0]
                currentBottom = cell[1]

                cell[0] = newLeft
                cell[1] = newBottom

                newLeft = currentLeft
                newBottom = currentBottom
            })
            let fillCell = new FillCell(lastLeft,lastBottom)

            bodyIndex.forEach(cell=>{
                let newCell = new BodyCell(cell[0],cell[1])
            })  
            border.appendChild(snakeBody)
        },100)
    }


    

    

    const control=(e)=>{
        if(e.key==='ArrowLeft'){
            moveLeft()
        }else if(e.key==='ArrowRight'){
            moveRight()
        }else if(e.key==='ArrowUp'){
            moveUp()
        }else if(e.key==='ArrowDown'){
            moveDown()
        }
    }

    /*
    const refresh = ()=>{
        refreshTimerId = setInterval(()=>{
            bodyIndex.forEach(cell=>{
                let newCell = new BodyCell(cell[0],cell[1])
            })  
            border.appendChild(snakeBody)
        },40)
    }
    */

    //createBody()
    
    const startSnake = ()=>{
        createBody()
        //refresh()
        document.addEventListener('keyup',control)
    }

    startSnake()
    

})