// global variables 
let currentlyPlaying = true; 
let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
const startButton = document.getElementById('start');
let openDoor1;
let openDoor2;
let openDoor3;
const currentStreak = document.getElementById('currentstreak');
const bestStreak = document.getElementById('beststreak');

   // doorpaths
const botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
const beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
const spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
const closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

let numClosedDoors = 3; 
let score = 0; 

// check to see if choreBot has appeared
const isBot = door => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false; 
  };
};

// checking if the door is already opened
const isClicked = door => {
  if (door.src === closedDoorPath) {
    return false;
  } else {
    return true; 
  }
};

// determine when the game is over
const playDoor = door => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver('win');
  } else if (isBot(door) === true) {
    gameOver();
  }
};

// generate chorebot to random doors
const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor2 = botDoorPath;
    openDoor1 = spaceDoorPath; 
    openDoor3 = beachDoorPath;
  } else if (choreDoor === 2) {
    openDoor3 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath; 
  }
};

// opening the doors upon click 

doorImage1.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage1)) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
};

doorImage2.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
};

doorImage3.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
};

// start new round and reset variables
const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = 'Good luck!'
  currentlyPlaying = true; 
  randomChoreDoorGenerator();
}

//ensuring that new round is started only if we are not currently playing 
startButton.onclick = () => {
  if (!currentlyPlaying) {
    startRound();
  };
};

// game over results 
const gameOver = status => {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
    score++;
    currentStreak.innerHTML = score;
    bestStreak.innerHTML = score; 
  } else {
    startButton.innerHTML = 'Game over! Play again?';
    score = 0;
    currentStreak.innerHTML = score;
  }
  currentlyPlaying = false; 
};

//initiate game
startRound();
