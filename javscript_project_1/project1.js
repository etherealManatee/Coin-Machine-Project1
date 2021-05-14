//function to show instructions and close start screen
function showInstructions(){
    let instructionPage = document.querySelector("#instructions")
    let openingScreen = document.querySelector("#openingScreen")
    instructionPage.style.display = "flex"
    openingScreen.style.display = "none"
}
//eventlistener to show instructions when clicked
document.querySelector("#instructionsBtn").addEventListener('click', showInstructions)
//function to go back to openingscreen and close instruction page
function closeButton(){
    let instructionPage = document.querySelector("#instructions")
    let openingScreen = document.querySelector("#openingScreen")
    instructionPage.style.display = "none"
    openingScreen.style.display = "flex"
}
//close instructions and go back to initial screen when clicked
document.querySelector("#closeBtn1").addEventListener('click',closeButton)

//function to enter game screen and close opening screen
function showGameScreen(){
    let gamePage = document.querySelector("#gameScreen")
    let openingScreen = document.querySelector("#openingScreen")
    let startModal = document.querySelector('#modalStartGame')
    gamePage.style.display = "grid"
    openingScreen.style.display = "none"
    startModal.style.display = "block"
}
//event listener to enter game screen and close openingscreen
document.querySelector("#enterGame").addEventListener('click',showGameScreen)

//function for closing the game screen and going back to start screen
function closeButton2(){
    let gamePage = document.querySelector('#gameScreen')
    let openingScreen = document.querySelector("#openingScreen")
    gamePage.style.display = "none"
    openingScreen.style.display = "flex"
}
//close game screen and open start screen when clicked
document.querySelector("#closeBtn2").addEventListener('click',closeButton2)

let state = {
    score: 0,
    lives: 3,
    level: 1
}
//function for the game
function gameStart(){
    //function to close modal
    closeModal()
    function closeModal(){
        document.querySelector('#modalStartGame').style.display = 'none'
        document.querySelector('#modalGameOver').style.display = 'none'
    }
    //function for the generation of coins and for the mouseover event to deduct lives
    function coinGen(){
        let randNum = Math.floor((Math.random() * 10) + 1)
        if (randNum === 1){
            let randomNum = Math.floor((Math.random() * 7) + 1)
            let positionContainer = document.querySelector("#coin" + randomNum) //this is where you will spawn the coin
            let divContainer = document.createElement('div') //this is the container for the coin
            let imgTag = document.createElement('img') //this is for the image inside
            imgTag.setAttribute('src', "images/bonuscoin.png") //setting image to the created img element
            divContainer.classList.add("bonusCoin1") //setting class to the created div element
            divContainer.appendChild(imgTag)
            positionContainer.insertAdjacentElement('afterbegin', divContainer)
            divContainer.style.position = 'absolute'
            divContainer.style.top = "0px";
            fallingCoin(divContainer)
            document.querySelectorAll(".bonusCoin1").forEach(function (e) {
                e.addEventListener('mouseenter', bonusCoin1)
            })
        } else {
            let randomNum = Math.floor((Math.random() * 7) + 1)
            let positionContainer = document.querySelector("#coin" + randomNum) //this is where you will spawn the coin
            let divContainer = document.createElement('div') //this is the container for the coin
            let imgTag = document.createElement('img') //this is for the image inside
            imgTag.setAttribute('src', "images/dogcoin.png") //setting image to the created img element
            divContainer.classList.add("dogCoin") //setting class to the created div element
            divContainer.appendChild(imgTag)
            positionContainer.insertAdjacentElement('afterbegin', divContainer)
            divContainer.style.position = 'absolute'
            divContainer.style.top = "0px";
            fallingCoin(divContainer)
            document.querySelectorAll(".dogCoin").forEach(function (e) {
                e.addEventListener('mouseenter', minusLife)
            })
        }
    }
    //function used in coinGen for making the coin move
    function fallingCoin(coin, pos= 0){
        coin.style.position = "absolute"
        setInterval(()=> {
            pos = pos + 1
            coin.style.top = pos+"px"
        },2)
    }
    //function for bonusCoin1
    function bonusCoin1(e){
        document.querySelector('#audioBonus').play()
        console.log('whoa')
        state.score += 10
        e.target.remove()
    }

    //function used in coinGen for deducting life
    function minusLife(){
        document.querySelector("#audioLoseLife").play()
        console.log('-1 life')
        state.lives -= 1
        console.log(state.lives)
        document.querySelector('#lives').textContent = state.lives
    }

    //score tracking and removal of that particular element-coin
    function coinRemovalAndScoring(){
        let coin = document.querySelectorAll(".dogCoin") //selecting of the coins from the class dogCoin
        coin.forEach(function(e){
            let coinTop = parseInt(window.getComputedStyle(e).getPropertyValue("top"))
            if (coinTop > 380){ //if coinTop more we add one to score and we remove the coin entirely
                state.score += 1
                document.querySelector('#score').textContent = state.score
                e.remove()
            }
        })
        let coin1 = document.querySelectorAll(".bonusCoin1") //selecting of the coins from the class dogCoin
        coin1.forEach(function(e){
            let coinTop = parseInt(window.getComputedStyle(e).getPropertyValue("top"))
            if (coinTop > 380){ //if coinTop more we add one to score and we remove the coin entirely
                state.score += 1
                document.querySelector('#score').textContent = state.score
                e.remove()
            }
        })
    }

    //function for when lives become zero
    function zeroLives(){
        if (state.lives < 1){
            clearInterval(coinRemoveAndScoring)
            clearInterval(coinGen1)
            let coin = document.querySelectorAll(".dogCoin")
            coin.forEach(function(e) {
                e.remove()
            })
            let gameOver = document.querySelector('#modalGameOver') //modal opens when game ends
            gameOver.style.display = "block"
        }
    }
    // setInterval(coinRemovalAndScoring,1)
    // setInterval(coinGen,500)
    let coinRemoveAndScoring = setInterval(coinRemovalAndScoring,1)
    let coinGen1 = setInterval(coinGen,300)
    setInterval(zeroLives,1)
}

//event listener to start game from start game modal
document.querySelector('#startGame').addEventListener('click', gameStart)
document.querySelector('#playAgain').addEventListener('click', playAgain)

//function to reset the state
function resetState(){
    state.score = 0
    state.lives = 3
    state.level = 1
    document.querySelector('#score').textContent = state.score
    document.querySelector('#lives').textContent = state.lives
    document.querySelector('#level').textContent = state.level
}
//function to combine resetState and gameStart
function playAgain(){
    resetState()
    gameStart()
}

//for background music

//function for deducting life when mouse hits the dropping coin
// function minusLife(){
//     console.log('-1 life')
//     state.lives -= 1
//     console.log(state.lives)
//     document.querySelector('#lives').textContent = state.lives
// }

//function for the generation of coins we do not want to collect
// function coinGen(){
//     let randomNum = Math.floor((Math.random() * 7) + 1)
//     let positionContainer = document.querySelector("#coin" + randomNum) //this is where you will spawn the coin
//     let divContainer = document.createElement('div') //this is the container for the coin
//     let imgTag = document.createElement('img') //this is for the image inside
//     imgTag.setAttribute('src', "images/dogcoin.png") //setting image to the created img element
//     divContainer.classList.add("dogCoin") //setting class to the created div element
//     divContainer.appendChild(imgTag)
//     positionContainer.insertAdjacentElement('afterbegin', divContainer)
//     divContainer.style.position = 'absolute'
//     divContainer.style.top = "0px";
//     fallingCoin(divContainer)
//     document.querySelectorAll(".dogCoin").forEach(function (e) {
//         e.addEventListener('mouseenter', minusLife)
//     })
// }

// //point tracking and removal of that particular element-coin
// function coinRemovalAndScoring(){
//     let coin = document.querySelectorAll(".dogCoin") //selecting of the coins from the class dogCoin
//     coin.forEach(function(e){
//         let coinTop = parseInt(window.getComputedStyle(e).getPropertyValue("top"))
//         if (coinTop > 380){ //if coinTop more we add one to score and we remove the coin entirely
//             state.score += 1
//             document.querySelector('#score').textContent = state.score
//             e.remove()
//         }
//     })
// }
// //setting the setInterval to check for when the coin has reached the bottom
// let scoreAndCoin = setInterval(coinRemovalAndScoring,1)
//
// // function to drop a random coin, let's try every half second
// let coinGeneration = setInterval(coinGen,500)

// function fallingCoin(coin, pos= 0){
//     coin.style.position = "absolute"
//     setInterval(()=> {
//         pos = pos + 1
//         coin.style.top = pos+"px"
//     },5)
// }


//function for when lives become zero
// function zeroLives(){
//     if (state.lives < 1){
//         clearInterval(coinRemoveAndScoring)
//         clearInterval(coinGen1)
//         let coin = document.querySelectorAll(".dogCoin")
//         coin.forEach(function(e) {
//             e.remove()
//         })
//         let modal = document.querySelector('#modalGameOver') //modal opens when game ends
//         modal.style.display = "block"
//     }
// }
//interval for when lives become zero
// setInterval(function(){
//     if(state.lives < 1){
//         scoreAndCoin = null
//         coinGeneration = null
//         let coin = document.querySelectorAll(".dogCoin")
//         coin.forEach(function(e) {
//             e.remove()
//         })
//         let modal = document.querySelector('#modalGameOver') //modal opens when game ends
//         modal.style.display = "block"
//     }
// }, 1)


// Get the <span> element that closes the modal
// let span = document.querySelector('.playAgain');
// let modal = document.querySelector('#modalGameOver')

// When the user clicks on the button, open the modal

// When the user clicks on <span> (Play Again?), close the modal and restart game
// span.onclick = function() {
//     modal.style.display = "none";
//     state.scores = 0
//     state.lives = 3
//     document.querySelector('#score').textContent = state.score
//     document.querySelector('#lives').textContent = state.lives
//     gameStart()
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }