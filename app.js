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

    /*
    const foodMaker = ()=>{

        

        //clearInterval(rightTimerId)
        //clearInterval(leftTimerId)
        //clearInterval(upTimerId)
        //clearInterval(downTimerId)

        

        foodTimerId = setInterval(()=>{
            
            //if(foodTime!=120){
            food.remove()
            //}
            
            food = document.createElement('div')

            foodX = parseInt(Math.random()*498)
            foodY = parseInt(Math.random()*498)

            
            for(let i=foodX;i<foodX+20;i++){
                foodRangeX.push(i)
            }

            for(let i=foodY;i<foodY+20;i++){
                foodRangeY.push(i)
            }

            tempX = []
            tempY = []
            //let tempX = foodRangeX.slice()
            //let tempY = foodRangeY.slice()
            tempX = [...foodRangeX]
            tempY = [...foodRangeY]
            

            //console.log(foodTime)

            food.classList.add('food')
            food.style.bottom = foodY+'px'
            food.style.left = foodX+'px'
            
            border.appendChild(food)

            

            //console.log(bodyIndex[0][0])
            //console.log(bodyIndex[0][1])
            //console.log(foodRangeX)
            //console.log(foodRangeY)
            /*
            if(tempX.includes(bodyIndex[0][0]) && tempY.includes(bodyIndex[0][1])){
                console.log('ate')
                food.remove()
                foodTime = 120
            }else{
                foodTime = 9000
            }
            */

            //let stop = setTimeout(foodTime)
            //clearTimeout(stop)



            /*
            setInterval(()=>{
                if(tempX.includes(bodyIndex[0][0]) && tempY.includes(bodyIndex[0][1])){
                    console.log('ate')
                    foodTime = 1
                }else{
                    foodTime = 9000
                }
            },1)
            */
            
            //setTimeout(4000)

            
            /*

        },foodTime)
    }
    */
/*
    const checkAte = ()=>{
        let cc=setInterval(()=>{
            if(tempX.includes(bodyIndex[0][0]) && tempY.includes(bodyIndex[0][1])){
                console.log('ate')
                food.remove()
                //food.remove()
                foodTime = 9000
            }else{
                //food.remove()
                foodTime = 9000
            }

        },1)
    }

    */
    


/*
    const checkFood = ()=>{
        setInterval(()=>{

            foodX = parseInt(Math.random()*498)
            foodY = parseInt(Math.random()*498)

            for(let i=foodX;i<foodX+20;i++){
                foodRangeX.push(i)
            }

            for(let i=foodY;i<foodY+20;i++){
                foodRangeY.push(i)
            }

            tempX = []
            tempY = []
            //let tempX = foodRangeX.slice()
            //let tempY = foodRangeY.slice()
            tempX = [...foodRangeX]
            tempY = [...foodRangeY]


            if(tempX.includes(bodyIndex[0][0]) && tempY.includes(bodyIndex[0][1])){
                console.log('ate')
                tempX = []
                tempY = []
                
                //clearInterval(foodTimerId)
                food.remove()
                clearInterval(rightTimerId)
                clearInterval(leftTimerId)
                clearInterval(upTimerId)
                clearInterval(downTimerId)
                clearInterval(foodTimerId)
                foodMaker()
                foodTime = 1

            }else{
                foodTime = 9000

            }
        },1)
    }

    */

//checkFood()
    const sendFood = ()=>{
        setInterval(()=>{
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


            

            /////////   
            if(foodRangeX.includes(bodyIndex[0][0]) && foodRangeY.includes(bodyIndex[0][1])){
                foodRangeX = []
                foodRangeY = []
                console.log('ate')
                ate = true
                food.remove()
                foodTime = 120

                //lengthen
                bodyIndex.unshift([bodyIndex[0][0],bodyIndex[0][1]-10])


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


            /////////   
            if(foodRangeX.includes(bodyIndex[0][0]) && foodRangeY.includes(bodyIndex[0][1])){
                ate = true
                foodRangeX = []
                foodRangeY = []
                console.log('ate')
                food.remove()
                foodTime = 120
                //foodScatter()

                //lengthen
                bodyIndex.unshift([bodyIndex[0][0],bodyIndex[0][1]+10])

            }
            ////////



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

        //////
        //foodScatter()
        /////
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


            /////////   
            if(foodRangeX.includes(bodyIndex[0][0]) && foodRangeY.includes(bodyIndex[0][1])){
                ate = true
                foodRangeX = []
                foodRangeY = []
                console.log('ate')
                food.remove()
                foodTime = 120
                //foodScatter()

                //lengthen
                bodyIndex.unshift([bodyIndex[0][0]+10,bodyIndex[0][1]])

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

        //////
        //foodScatter()
        /////

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


            /////////   
            if(foodRangeX.includes(bodyIndex[0][0]) && foodRangeY.includes(bodyIndex[0][1])){
                ate = true
                foodRangeX = []
                foodRangeY = []
                console.log('ate')
                food.remove()
                foodTime = 120
                //foodScatter()

                //lengthen
                bodyIndex.unshift([bodyIndex[0][0]-10,bodyIndex[0][1]])

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
        createBody()
        foodScatter()
        //foodMaker()
        //checkFood()
        //refresh()
        document.addEventListener('keyup',control)
    }

    startSnake()
    //checkAte()
    

})