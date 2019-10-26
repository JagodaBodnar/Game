'use strict';

let params = {
 playerName: '',
 computerScore: 0,
 playerScore: 0,
 roundsNumber: 0,
 roundNumber: 0,
 playerMove: '',
 computerMove: '',
 roundWinner: '',
 gameResult: '',
 progress: []
};


let result = document.getElementById('result');
let output = document.getElementById('output');
let results = document.getElementById('score');
    
function clear() {
output.innerHTML = '';
result.innerHTML = '';
results.innerHTML = '';
document.getElementById('round-number').innerHTML = '';
}

const log = function (text) {
output.innerHTML = `${text} <br> ${output.innerHTML}`;
};


function score() {
params.roundsNumber--;
if(params.roundsNumber === 0){
  createTable();
  if (params.playerScore > params.computerScore) {
  result.innerHTML ='You won the entire game!';
  }
  else if(params.playerScore < params.computerScore){
   result.innerHTML ='You lost. Try luck again!';
  }
  else {
  result.innerHTML ='Draw!';
  }
}
else {
results.innerHTML = `SCORE: player ${params.playerScore} : ${params.computerScore} computer <br> ${results.innerHTML}`;
}
};

function random() {
 let randomNumber = (Math.round(Math.random() * (2))) + 1;
  switch(randomNumber){
    case 1:
      return 'rock';
    case 2:
      return 'paper';
    case 3:
      return 'scissors';
    default:
      console.log('error');
      return null;
  }
};


const buttonMove = document.querySelectorAll('.player-move');
for(let element of buttonMove){
element.addEventListener('click', function playerMove(){
  if(params.roundsNumber <= 0 ){
return ;
}
const chooseNumber = random();
const x = element.getAttribute('data-move');
clear();
if (chooseNumber === x) {
x === 'rock' ? log(`DRAW: you played ROCK, computer played ROCK`) : '';
x === 'paper' ? log(`DRAW: you played PAPER, computer played PAPER`) : '';
x === 'scissors' ? log(`DRAW: you played SCISSORS, computer played SCISSORS`) : '';
 params.roundWinner = 'Draw';
}
else if (chooseNumber !== x){
if (x ==='rock' && chooseNumber === 'scissors') {
log(`WON: you played ROCK, computer played SCISSORS`);
params.playerScore += 1;
params.roundWinner = 'Player';
}
else if (x ==='paper' && chooseNumber === 'rock') {
log(`WON: you played PAPER, computer played ROCK`);
params.playerScore += 1
params.roundWinner = 'Player'; 
}
else if (x ==='scissors' && chooseNumber === 'paper') {
log(`WON: you played SCISSORS, computer played PAPER`);
params.playerScore += 1
params.roundWinner = 'Player';
}
else if (x ==='rock' && chooseNumber === 'paper') {
log('YOU LOST: you played ROCK, computer played PAPER');
params.computerScore += 1;
params.roundWinner = 'Computer';
}
else if (x ==='paper' && chooseNumber === 'scissors') {
log('YOU LOST: you played PAPER, computer played SCISSORS');
params.computerScore += 1;
params.roundWinner = 'Computer';
}
else {
log('YOU LOST: you played SCISSORS, computer played ROCK');
params.computerScore += 1;
params.roundWinner = 'Computer';
}
}
else {
log('ERROR');
}
params.roundNumber++;
params.computerMove = chooseNumber;
params.playerMove = x;
 
params.progress.push({
  roundNumber: params.roundNumber,
  playerMove: params.playerMove,
  computerMove: params.computerMove,
  roundWinner: params.roundWinner,
  gameResult: `${params.playerScore} : ${params.computerScore}`
});
score();
});
};

let nGameButton = document.getElementById('start');

nGameButton.addEventListener('click', function() {
  const validator = document.getElementById('rounds').value;
  if(validator >= 1 && validator%1 ===0){
    params.roundsNumber = document.getElementById('rounds').value;
    params.computerScore = 0;
    params.playerScore = 0;
    params.playerName = document.getElementById('name').value;
    clear();
    let roundInformation = document.getElementById('round-number');
    roundInformation.insertAdjacentHTML('beforeEnd', `Hello ${params.playerName}! We play ${params.roundsNumber} rounds.       Good luck!`);
    clearTable();
    document.getElementById('table').style.display ="block";
  }
  else{
    output.innerText='The number has to be a whole number greater than zero. Please try again.';
    result.innerText='The number has to be a whole number greater than zero. Please try again.';
    document.getElementById('table').style.display ="none";
  }

});

function createTable() {
    const tbody = document.getElementById('tbody');
    for (let element of params.progress) {

        let row = document.createElement('tr');

        let result = document.createElement('td');
        result.innerText = element.roundNumber;
   
        let playerMove = document.createElement('td');
        playerMove.innerText = element.playerMove;
     
        let computerMove = document.createElement('td');
        computerMove.innerText = element.computerMove;
      
        let roundWinner = document.createElement('td');
        roundWinner.innerText = element.roundWinner;
      
        let gameresult = document.createElement('td');
        gameresult.innerText = element.gameResult;
      
        row.appendChild(result);
        row.appendChild(playerMove);
        row.appendChild(computerMove);
        row.appendChild(roundWinner);
        row.appendChild(gameresult);
        tbody.appendChild(row);
    }
};

function clearTable(){
  params.progress = [];
  params.roundNumber = 0;
  let body = document.querySelector('tbody');
  while (body.firstChild) {
  body.removeChild(body.firstChild);
  }
};

	let showModal = function(event){
		event.preventDefault();
    if(params.roundsNumber === 0){
       const modalAll = document.querySelectorAll('.modal');
    for (let element of modalAll){
      element.classList.remove('show');
    }; 
    let modalName = event.target.getAttribute('class');
    let modalWindow = document.getElementById(modalName);
    modalWindow.className += " show";  
    document.querySelector('#overlay').classList.add('show');
    }
    else{
    }
  };
const hideModal = function(event){
		event.preventDefault();
		document.querySelector('#overlay').classList.remove('show');
	};
  
	
    const modalLinks = document.querySelectorAll('.player-move');
	  for(let element of modalLinks){
      element.addEventListener('click', showModal);
    }

	const closeButtons = document.querySelectorAll('.modal .close');

	for(let element of closeButtons){
		element.addEventListener('click', hideModal);
	}

	document.querySelector('#overlay').addEventListener('click', hideModal);

	const modals = document.querySelectorAll('.modal');
	
	for(let element of modals){
		element.addEventListener('click', function(event){
			event.stopPropagation();
		});
	};

const buttonNewGame = document.querySelectorAll('.new-game-button');
	for(let element of buttonNewGame){
		element.addEventListener('click', showModal);
   
	};


