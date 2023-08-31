// RULES RELATED
let rules=document.getElementsByClassName('rules')[0]
let gameRules=document.getElementsByClassName('game-rules')[0]
let cancelBtn=document.getElementsByClassName('cancel-btn')[0]

// getting user entered value
let choiceBtn=document.getElementsByClassName('choiceBtn')[0]

// next button
let nextBtn=document.getElementsByClassName('next')[0]

// Playing area
let playArea=document.getElementsByClassName('play-area')[0]

// After selection by user
let afterPlay=document.getElementsByClassName('after-play')[0]
let userWin=document.getElementsByClassName('user-choice')[0]
let pcWin=document.getElementsByClassName('pc-choice')[0]
let statusText=document.getElementsByClassName('status')[0]
let userSelection=document.getElementsByClassName('userBtn')[0]
let pcSelection=document.getElementsByClassName('pcBtn')[0]

let userClassList=document.querySelector('.user-choice .choiceBtn-container')
let pcClassList=document.querySelector('.pc-choice .choiceBtn-container')

// Play again button from screen 1
let playAgainBtn=document.getElementsByClassName('playAgain')[0]

// DISPLAY SCORE
let computerScore=document.getElementsByClassName('computer-score')[0]
let userScore=document.getElementsByClassName('user-score')[0]


// Display current score at start
function updateScore(){
    let u=Number(localStorage.getItem('score1'))
    let pc=Number(localStorage.getItem('score2'))
    if(u=='NaN'){
        userScore.innerText=0
    }else{
        userScore.innerText=u
    }
    if(pc=='NaN'){
        computerScore.innerText=0
    }else{
        computerScore.innerText=pc
    }
}
updateScore()

// RULES BUTTON FUNCTION
rules.addEventListener('click', function(){
    gameRules.style.display='block';
});

cancelBtn.addEventListener('click', function(){
    gameRules.style.display='none';
})



function winnerWho(x){
    let computerChoice=parseInt(3*Math.random())
    let arr=['rock', 'scissor', 'paper']
    console.log(computerChoice, x)
    if(x=='rock'){
        if(computerChoice==0){
            return ['tie', computerChoice]
        }
        else if(computerChoice==1){
            return ['user', computerChoice]
        }else{
            return ['pc', computerChoice]
        }
    }
    if(x=='scissor'){
        if(computerChoice==0){
            return ['pc', computerChoice]
        }
        else if(computerChoice==1){
            return ['tie', computerChoice]
        }
        else{
            return ['user', computerChoice]
        }
    }
    if(x=='paper'){
        if(computerChoice==0){
            return ['user', computerChoice]
        }
        else if(computerChoice==1){
            return ['pc', computerChoice]
        }
        else{
            return ['tie', computerChoice]
        }
    }
}


function play(x){
    let a=Number(localStorage.getItem('score1'))
    let b=Number(localStorage.getItem('score2'))

    let [winner,computerChoice]=winnerWho(x)
    let icons=['rock', 'scissor', 'paper']
    
    playArea.style.display='none'
    afterPlay.style.display='flex'
    playAgainBtn.style.display='block'
    userSelection.innerHTML=`<img src="./assets/${x}.png">`
    userClassList.classList.add(x)
    pcSelection.innerHTML=`<img src="./assets/${icons[computerChoice]}.png">`
    pcClassList.classList.add(icons[computerChoice])

    if(winner=='user'){
        nextBtn.style.display='block'
        // Used to display ::after content
        // userWin.style.setProperty('--displayValue',  'block')
        //              OR
        // Display shadow by adding 'shadow' class
        userWin.classList.add('winnerShadow')
        statusText.innerHTML=`<h1>YOU WIN</h1><p>AGAINST PC</p>`
        a=1+Number(localStorage.getItem('score1'))
    }
    else if(winner=='pc'){
        nextBtn.style.display='none'
        // Used to display ::after content
        // pcWin.style.setProperty('--displayValue', 'block')
        //              OR
        // display shadow by adding 'shadow' class
        pcWin.classList.add('winnerShadow')
        statusText.innerHTML=`<h1>YOU LOST</h1><p>AGAINST PC</p>`
        b=1+Number(localStorage.getItem('score2'))
    }
    else if(winner=='tie'){
        statusText.innerHTML=`<h1>TIE UP</h1>`
        playAgainBtn.innerText='REPLAY'
    }
    
    localStorage.setItem('score1', a)
    localStorage.setItem('score2', b)
    let p=parseInt(localStorage.getItem('score1'))
    let q=parseInt(localStorage.getItem('score2'))
    userScore.innerText=p
    computerScore.innerText=q
    // console.log(a,b, p, q)
    updateScore()
}


function replay(){
    console.log('hey')
    playArea.style.display='flex'
    afterPlay.style.display='none'
    playAgainBtn.style.display='none'
    userClassList.setAttribute('class','choiceBtn-container')
    pcClassList.setAttribute('class', 'choiceBtn-container')
    // On replay remove shadow style class
    userWin.classList.remove('winnerShadow')
    pcWin.classList.remove('winnerShadow')
    nextBtn.style.display='none'
    //              OR
    // On replay remove the shadow,  ::after
    // userWin.style.setProperty('--displayValue',  'none')
    // pcWin.style.setProperty('--displayValue', 'none')
    playAgainBtn.innerHTML='PLAY AGAIN'
}

