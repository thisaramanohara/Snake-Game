document.addEventListener('DOMContentLoaded',()=>{
    const border = document.querySelector('.border')
    //const snakeHead = document.createElement('div')
    const snakeBody = document.createElement('div')

    let start=250
    let upTimerId,rightTimerId,leftTimerId
    let movingUp=false
    let movingLeft=false
    let movingRight=false

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

    const moveUp = ()=>{
        movingUp = true
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
            }


            

            
            let fillCell = new FillCell(lastLeft,lastBottom)

            bodyIndex.forEach(cell=>{
                let newCell = new BodyCell(cell[0],cell[1])
            })  
            border.appendChild(snakeBody)
        },100)
    }


    const moveRight = ()=>{
        movingLeft=false
        movingRight=true
        clearInterval(upTimerId)
        clearInterval(leftTimerId)
        rightTimerId = setInterval(()=>{
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
        movingRight=false
        clearInterval(upTimerId)
        clearInterval(rightTimerId)
        leftTimerId = setInterval(()=>{
            lastLeft = bodyIndex[0][0]
            lastBottom = bodyIndex[0][1]

            newLeft = bodyIndex[bodyIndex.length-1][0] - 10
            newBottom = bodyIndex[bodyIndex.length-1][1]
            bodyIndex.slice().reverse().forEach(cell=>{
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