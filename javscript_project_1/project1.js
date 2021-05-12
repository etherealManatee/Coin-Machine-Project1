//function to show instructions and close start screen
function showInstructions(){
    let instructionPage = document.querySelector("#instructions")
    let startScreen = document.querySelector("#startScreen")
    instructionPage.style.display = "flex"
    startScreen.style.display = "none"
}
//show instructions when clicked
document.querySelector("#instructionsBtn").addEventListener('click', showInstructions)

//function to close instruction page and go back to start screen
function closeButton(){
    let instructionPage = document.querySelector("#instructions")
    let startScreen = document.querySelector("#startScreen")
    instructionPage.style.display = "none"
    startScreen.style.display = "flex"
}
//close instructions and go back to start screen when clicked
document.querySelector("#closeBtn1").addEventListener('click',closeButton)

//function to close start screen and enter game screen
function showGameScreen(){
    let gamePage = document.querySelector("#gameScreen")
    let startScreen = document.querySelector("#startScreen")
    gamePage.style.display = "grid"
    startScreen.style.display = "none"
}
//close start screen and open game screen when clicked
document.querySelector("#startGame").addEventListener('click',showGameScreen)

//function for closing the game screen and going back to start screen
function closeButton2(){
    let gamePage = document.querySelector('#gameScreen')
    let startScreen = document.querySelector("#startScreen")
    gamePage.style.display = "none"
    startScreen.style.display = "flex"
}
//close game screen and open start screen when clicked
document.querySelector("#closeBtn2").addEventListener('click',closeButton2)

//where the score, lives and level are stored
let state = {
    score: 0,
    lives: 3,
    level: 1
}

//function for deducting life when mouse hits the dropping coin
function dead(){
    console.log('-1 life')
    let randomNum = Math.floor((Math.random()*7)+1)
    console.log(randomNum)
}

//
document.querySelectorAll(".dogCoin").forEach(function(e){
    e.addEventListener('mouseover',dead)
})

//point tracking
setInterval(function(){
    let coin = document.querySelectorAll(".dogCoin")
    let binT = document.querySelector("#binsRow")
    coin.forEach(function(e){
        let coinBottom = parseInt(window.getComputedStyle(e).getPropertyValue("bottom"))
        //console.log(window.getComputedStyle(binT).getPropertyValue("top"))
        let binTop = parseInt(window.getComputedStyle(binT).getPropertyValue("top"))
        if(binTop>coinBottom){
            state.score += 1
            document.querySelector('#score').textContent = state.score
        }
    })
},1000)