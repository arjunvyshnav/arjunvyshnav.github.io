// Selectors
const title = document.querySelector("#title");
const strikeText = document.querySelector(".strike-text");
const newText = document.querySelector("#newText");
const canvas = document.querySelector("#background");
const context = canvas.getContext("2d");

let speed = 80;

// Primary Text
function displayText() {
  let welcomeString = `Hey there!^ You People on the Internet,^Its Velan here :)`,
    i = 0;
  window.setInterval(function() {
    if (welcomeString.charAt(i) == "^") {
      title.innerHTML += "<br>";
      i++;
    }
    if (welcomeString.length == i) {
      doneShowing();
    }
    title.innerHTML += welcomeString.charAt(i);
    i++;
  }, speed);
}

// Callback text
function doneShowing() {
  let string = "things",
    i = 0;
  strikeText.setAttribute("style", "text-decoration:line-through");
  window.setInterval(function() {
    newText.innerHTML += string.charAt(i);
    i++;
  }, speed);
}

displayText();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ballons = [];
let colors = ["#152659", "#3671BF", "#F28F79", "#F24444", "#F25E5E"];
let NUM = 60;
let swing = 5;

const Balloon = function(x, y, dx, dy, r, col, length) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.r = r;
  this.degree = 0;
  this.color = col;
  this.length = length;
  this.draw = function() {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    context.fill();
    context.moveTo(this.x, this.y + this.r);
    context.lineTo(
      this.x + Math.cos(this.degree) * -swing,
      this.y + this.length
    );
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();
  };
  this.update = function() {
    this.x += Math.cos(this.degree) * 1.6;
    if (this.y < -this.r - this.length) this.y = canvas.height + r;
    this.y -= this.dy;
    this.degree += 0.04;
    this.draw();
  };
};

function init() {
  for (i = 0; i < NUM; i++) {
    let dy = Math.random() * 2 + 1;
    let r = dy > 3 ? 20 : dy > 2 ? 10 : 8;
    let l = dy > 3 ? 50 : dy > 2 ? 30 : 20;
    let c = colors[Math.floor(Math.random() * colors.length)];
    ballons.push(
      new Balloon(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        1,
        dy,
        r,
        c,
        l
      )
    );
  }
  ballons.sort(function(a, b) {
    return a.r - b.r;
  });
  console.log(ballons);
  animate();
}

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  ballons.forEach(val => {
    val.update();
  });
  requestAnimationFrame(animate);
}

window.onload = init();
