
const game_body = document.getElementById("game-body");
const $lives = document.getElementById("lives");
const max_lives = 3;
var seconds = document.getElementById("timer").textContent;
var lives = document.getElementById("life").textContent;

var zombie_id = 0;
const img = [  "zombie-1.png",  "zombie-2.png", "zombie-3.png", "zombie-4.png",  "zombie-5.png",  "zombie-6.png",];

const shoot_audio = new Audio(
  "./assets/shotgun.mp3"
);
shoot_audio.volume = 0.2;
game_body.onclick = () => {
  shoot_audio.pause();
  shoot_audio.currentTime = 0;
  shoot_audio.play();
};

const backgroundSound = new Audio("./assets/bgm.mp3");
backgroundSound.play();
backgroundSound.loop = true;


function check_collide(zombie) {
  if (zombie.getBoundingClientRect().top <= 0) {
    lives--;
    document.getElementById("lives").innerHTML = lives;
    return true;
  }
  return false;
}


function zombie_destroy(zombie) {
  zombie.style.display = "none";
  zombie_id++;
  make_zombie();
}
 
function make_zombie() {
  randomImage = img[getRandomInt(0, img.length)];
  game_body.innerHTML += `<img src="./assets/${randomImage}" class="zombie-image" id="zombie${zombie_id}">`;
  let zombie = document.getElementById("zombie" + zombie_id);
  zombie.style.transform = `translateX(${getRandomInt(20, 80)}vw)`;
  zombie.style.animationDuration = `${getRandomInt(2, 6)}s`;
  zombie.onclick = () => {
    zombie_destroy(zombie);
  };
}

var timer = setInterval(function () {
  seconds--;
  document.getElementById("timer").textContent = seconds;
  let zombie = document.getElementById("zombie" + zombie_id);
  if (check_collide(zombie) == true) {
    zombie_destroy(zombie);
    if (lives == 0) {
      clearInterval(timer);
      location.href = "./game-over.html";
    }
  }
  if (seconds == 0) {
    clearInterval(timer);
    location.href = "./win.html";
  }
}, 1000);


make_zombie(zombie_id);


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}