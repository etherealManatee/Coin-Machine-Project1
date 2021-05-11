function showInstructions(){
    let instructionPage = document.querySelector("#instructions")
    let startScreen = document.querySelector("#startScreen")
    instructionPage.style.display = "flex"
    startScreen.style.display = "none"
}

document.querySelector("#instructionsBtn").addEventListener('click', showInstructions)

function closeButton(){
    let instructionPage = document.querySelector("#instructions")
    let startScreen = document.querySelector("#startScreen")
    instructionPage.style.display = "none"
    startScreen.style.display = "flex"
}
document.querySelector("#closeBtn1").addEventListener('click',closeButton)