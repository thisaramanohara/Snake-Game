document.addEventListener('DOMContentLoaded',()=>{
    const border = document.querySelector('.border')
    //const snakeHead = document.createElement('div')
    const snakeBody = document.createElement('div')

    //const food = document.createElement('div')

    let start=250
    let upTimerId,rightTimerId,leftTimerId,downTimerId,foodTimerId
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

    let bodyDivArray = []

    //initially creating the snake
    bodyIndex.forEach(p=>{
        let cell = document.createElement('div')
        cell.classList.add('snakeBody')
        cell.style.left = p[0]+'px'
        cell.style.bottom = p[1]+'px'
        bodyDivArray.push(cell)
        border.appendChild(cell)
    })

    const createAnotherCell = (left,bottom)=>{
        bodyDivArray[bodyDivArray.length-1].remove()
        bodyDivArray.pop()
        bodyIndex.pop()

        let cell = document.createElement('div')
        cell.classList.add('snakeBody')
        cell.style.left = left+'px'
        cell.style.bottom = bottom+'px'
        bodyDivArray.unshift(cell)
        bodyIndex.unshift([left,bottom])
        border.appendChild(cell)

    }


    /*
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
*/
/*
    const createBody = ()=>{
        bodyIndex.forEach(cell=>{
            let newCell = new BodyCell(cell[0],cell[1])
        })

        border.appendChild(snakeBody)
    }
    */

    let foodX,foodY

    var food

    let foodRangeX = []
    let foodRangeY = []
    let foodTime = 9000
    let tempX=[]
    let tempY=[]
    let ate = false

    const foodScatter = ()=>{
        
            

            food = document.createElement('div')

            foodX = parseInt(Math.random()*498)
            foodY = parseInt(Math.random()*498)

            for(let i=foodX;i<foodX+20;i++){
                foodRangeX.push(i)
            }

            for(let i=foodY;i<foodY+20;i++){
                foodRangeY.push(i)
            }

            food.classList.add('food')
            food.style.bottom = foodY+'px'
            food.style.left = foodX+'px'
            
            border.appendChild(food)
        
    }

    
let timeNewFood
//checkFood()
    const sendFood = ()=>{
        timeNewFood = setInterval(()=>{
            food.remove()
            foodRangeX = []
            foodRangeY = []
            foodScatter()
        },9000)
    }

    sendFood()



    const moveDown = ()=>{
        movingDown = true

        clearInterval(rightTimerId)
        clearInterval(leftTimerId)
        clearInterval(upTimerId)

        //////
        //foodScatter()
        /////


        downTimerId = setInterval(()=>{
            lastLeft = bodyIndex[bodyIndex.length-1][0]
                lastBottom = bodyIndex[bodyIndex.length-1][1]

                newLeft = bodyIndex[0][0]
                newBottom = bodyIndex[0][1] - 10
                /*
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
            */
           createAnotherCell(newLeft,newBottom)

            

            /////////   
            if(foodRangeX.includes(bodyIndex[0][0]) && foodRangeY.includes(bodyIndex[0][1])){
                foodRangeX = []
                foodRangeY = []
                console.log('ate')
                ate = true
                food.remove()
                foodTime = 120

                /////
                clearInterval(timeNewFood)
                sendFood()
                ////


                //lengthen
                bodyIndex.unshift([bodyIndex[0][0],bodyIndex[0][1]-10])
                let ll = document.createElement('div')
                ll.classList.add('snakeBody')
                ll.style.left = bodyIndex[0][0]+'px'
                ll.style.bottom = bodyIndex[0][1]-10+'px'
                bodyDivArray.unshift(ll)



                //foodScatter()
            }
            ////////

        },100)
    }

    

    const moveUp = ()=>{
        movingUp = true

        clearInterval(rightTimerId)
        clearInterval(leftTimerId)
        clearInterval(downTimerId)

        //////
        //foodScatter()
        /////

        upTimerId = setInterval(()=>{
            lastLeft = bodyIndex[bodyIndex.length-1][0]
                lastBottom = bodyIndex[bodyIndex.length-1][1]

                newLeft = bodyIndex[0][0]
                newBottom = bodyIndex[0][1] + 10
                /*
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
            */
           createAnotherCell(newLeft,newBottom)


            /////////   
            if(foodRangeX.includes(bodyIndex[0][0]) && foodRangeY.includes(bodyIndex[0][1])){
                ate = true
                foodRangeX = []
                foodRangeY = []
                console.log('ate')
                food.remove()
                foodTime = 120

                /////
                clearInterval(timeNewFood)
                sendFood()
                ////
                //foodScatter()

                //lengthen
                bodyIndex.unshift([bodyIndex[0][0],bodyIndex[0][1]+10])
                let ll = document.createElement('div')
                ll.classList.add('snakeBody')
                ll.style.left = bodyIndex[0][0]+'px'
                ll.style.bottom = bodyIndex[0][1]+10+'px'
                bodyDivArray.unshift(ll)

            }
            ////////



        },100)
    }




    const moveRight = ()=>{
        movingRight = true
        clearInterval(downTimerId)
        clearInterval(upTimerId)
        clearInterval(leftTimerId)
 
        rightTimerId = setInterval(()=>{


            lastLeft = bodyIndex[bodyIndex.length-1][0]
            lastBottom = bodyIndex[bodyIndex.length-1][1]

            newLeft = bodyIndex[0][0] + 10
            newBottom = bodyIndex[0][1]

            /*
            bodyIndex.forEach(cell=>{
                currentLeft = cell[0]
                currentBottom = cell[1]

                cell[0] = newLeft
                cell[1] = newBottom

                newLeft = currentLeft
                newBottom = currentBottom
            })
            */
            /*
            let fillCell = new FillCell(lastLeft,lastBottom)

            bodyIndex.forEach(cell=>{
                let newCell = new BodyCell(cell[0],cell[1])
            })  
            border.appendChild(snakeBody)
            */
           createAnotherCell(newLeft,newBottom)

            /////////   
            if(foodRangeX.includes(bodyIndex[0][0]) && foodRangeY.includes(bodyIndex[0][1])){
                ate = true
                foodRangeX = []
                foodRangeY = []
                console.log('ate')
                food.remove()
                foodTime = 120
                //foodScatter()
                /////
                clearInterval(timeNewFood)
                sendFood()
                ////

                //lengthen
                bodyIndex.unshift([bodyIndex[0][0]+10,bodyIndex[0][1]])
                let ll = document.createElement('div')
                ll.classList.add('snakeBody')
                ll.style.left = bodyIndex[0][0]+10+'px'
                ll.style.bottom = bodyIndex[0][1]+'px'
                bodyDivArray.unshift(ll)

            }
            ////////

        },100)
    }



    const moveLeft = ()=>{
        movingLeft=true
        clearInterval(downTimerId)
        //movingRight=false
        clearInterval(upTimerId)
        clearInterval(rightTimerId)

        leftTimerId = setInterval(()=>{

            lastLeft = bodyIndex[bodyIndex.length-1][0]
            lastBottom = bodyIndex[bodyIndex.length-1][1]

            newLeft = bodyIndex[0][0] - 10
            newBottom = bodyIndex[0][1]
            /*
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
            */

            createAnotherCell(newLeft,newBottom)

            /////////   
            if(foodRangeX.includes(bodyIndex[0][0]) && foodRangeY.includes(bodyIndex[0][1])){
                ate = true
                foodRangeX = []
                foodRangeY = []
                console.log('ate')
                food.remove()
                foodTime = 120
                //foodScatter()
                /////
                clearInterval(timeNewFood)
                sendFood()
                ////

                //lengthen
                bodyIndex.unshift([bodyIndex[0][0]-10,bodyIndex[0][1]])
                let ll = document.createElement('div')
                ll.classList.add('snakeBody')
                ll.style.left = bodyIndex[0][0]-10+'px'
                ll.style.bottom = bodyIndex[0][1]+'px'
                bodyDivArray.unshift(ll)

            }
            ////////


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





    
    const startSnake = ()=>{
        //createBody()
        foodScatter()
        //foodMaker()
        //checkFood()
        //refresh()
        document.addEventListener('keyup',control)
        
    }

    startSnake()
    //checkAte()
    

})