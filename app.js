var X = 30
var Y = 30
var grid = new Array(31)
var newGrid = new Array(31)
var gridIndex = 0
var table = document.getElementById('table')
var speedText = document.getElementById('speedText')
var speedButton = document.getElementById('speedBtn')
var speedSuccess = document.getElementById('speedSuccess')
var funcBreak = false
var funcPaused = false
var funcResume = false
var gameRunning = false
var speedOfGame = 180
for(let i=0;i<31;i++){
    grid[i] = new Array(31)
    newGrid[i] = new Array(31)
}


for(let i=0;i<X;i++){
    let row = document.createElement("tr")
    row.id = 'rows'
    for(let j=0;j<Y;j++){
        let col = document.createElement('td')
        let conText = document.createTextNode('')
        col.appendChild(conText)
        col.id = 'cols' + gridIndex.toString()
        col.className = 'cols'
        row.appendChild(col)
        gridIndex++
        grid[i][j]=0
        let buttonClick = 0
        col.addEventListener('click', () => {
            buttonClick++
            if(buttonClick == 1) {
                col.style.backgroundColor = 'black'
                grid[i][j] = 1
            }
            if(buttonClick == 2) {
                col.style.backgroundColor = 'white'
                grid[i][j] = 0
                buttonClick = 0
            }
        })
    }
    table.appendChild(row)
}

const reset = () => {
    document.querySelector('.btn2').innerHTML = 'Run'
    document.querySelector('.btn3').disabled = false
    speedButton.style.display = 'block'
    speedOfGame = 180
    let counter = 0
    funcBreak = true
    for(let i = 0; i < 30; i++){
        for(let j = 0; j< 30; j++){
            grid[i][j] = 0
            newGrid[i][j] = 0
            document.getElementById('cols' + counter.toString())
            .style.backgroundColor = 'white'
            counter++
        }
    }
}

const update = () => {
    let counter = 0
    for(let i = 0; i < 30;i++) {
         for(let j = 0 ;j < 30;j++) {
            let color = ''
            if(grid[i][j]) color = 'green'; 
            else  color = 'white';
            document.getElementById('cols' + counter.toString())
            .style.backgroundColor = color
            counter++
        }
    }

}

const neighbours = (n, m) =>{
    let counter = 0
    let a1,b1,c1 = 0
    if(n-1<0)       {  a1=29 ; b1=n;c1=n+1;  }
    else if(n+1>29) {  a1=n-1;b1=n;c1=0;    }
    else if(29>n>0) {  a1=n-1;b1=n;c1=n+1;  }

    let a2,b2,c2 = 0

    if(m-1<0)       {  a2=29; b2=m;c2=m+1;  }
    else if(m+1>29) {  a2=m-1;b2=m;c2=0;    }
    else if(29>m>0) {  a2=m-1;b2=m;c2=m+1;  }
    
    if(newGrid[a1][a2] == 1) { counter++ }
    if(newGrid[a1][b2] == 1) { counter++ }
    if(newGrid[a1][c2] == 1) { counter++ }

    if(newGrid[b1][a2] == 1) { counter++ }
    if(newGrid[b1][c2] == 1) { counter++ }

    if(newGrid[c1][a2] == 1) { counter++ }
    if(newGrid[c1][b2] == 1) { counter++ }
    if(newGrid[c1][c2] == 1) { counter++ }
    return counter
    
    
}
const getGrid = () => {
    for(let i = 0; i< 31;i++) {
        for(let j =0;j<31;j++){
            newGrid[i][j] = grid[i][j]
        }
    }
}
const mutationCell = () =>{
    for(let i=0;i<31;i++){
        for(let j=0;j<31;j++){
        let counter = neighbours(i,j)
        if(counter < 2 || counter>3) grid[i][j] = 0
        else if(counter == 3) grid[i][j] = 1
        }
    }
}
const run = () => {
    if(!gameRunning) {
    speedButton.style.display = 'none'
    document.querySelector('.btn2').innerHTML = 'Resume'
    document.querySelector('.btn3').disabled = false
    funcBreak = false
    funcPaused = false
    funcResume = true
    gameRunning = true
    var fastest = setInterval(progress,speedOfGame)
    function progress(){
        if(funcPaused) {
            let nonprogress = setTimeout(frame,20000);
            function frame(){
            getGrid()
            mutationCell()
            update()
            }
            if(funcBreak) {
                clearInterval(fastest)
            }
            if(funcResume) {
                clearTimeout(nonprogress)
            }
        }
        else {
            getGrid()
            mutationCell()
            update()
        }
        
    }
    if(funcBreak) {
            clearInterval(fastest)
            funcBreak = false
        }
    }
}

const pause = () => {
    funcPaused = true
    funcBreak = true
    gameRunning = false
    document.querySelector('.btn3').disabled = true
    speedButton.style.display = 'block'
}

speedButton.addEventListener('click',()=>{
    speedOfGame = speedText.value
    speedSuccess.innerHTML = 'Speed changed!'
    speedSuccess.style.display = 'block'
    setTimeout(()=>{
        speedSuccess.style.display = 'none'
    },5000)
})