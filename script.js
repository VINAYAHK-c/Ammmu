let current = 1;
let typingDone = false;
let musicStarted = false;

/* START */
function startExperience(){
  const music = document.getElementById("music");
  music.play().catch(()=>{});
  musicStarted = true;

  showScreen(2);
  current = 2;
}

/* NAVIGATION */
function goNext(){
  if(current === 2 && !typingDone) return;

  current++;
  showScreen(current);
}

/* SHOW SCREEN */
function showScreen(num){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("screen"+num).classList.add("active");

  if(num === 2){
    typeSequence();
  }

  // shock jump
  if(num === 5){
    setTimeout(()=> {
      current = 6;
      showScreen(6);
    },1000);
  }
}

/* TYPING */
const messages = [
  "Ammu… the day I met you…",
  "my life started changing ❤️",
  "you became my happiness 💫",
  "you became my everything ❤️"
];

let msgIndex = 0;

function typeSequence(){
  if(msgIndex >= messages.length){
    typingDone = true;
    return;
  }

  let text = messages[msgIndex];
  let i = 0;
  let el = document.getElementById("typing");
  el.innerHTML = "";

  function type(){
    if(i < text.length){
      el.innerHTML += text[i];
      i++;
      setTimeout(type, 35);
    } else {
      msgIndex++;
      setTimeout(typeSequence, 1200);
    }
  }

  type();
}

/* SECRET */
function unlockSecret(){
  document.getElementById("secretText").innerText =
  "No matter what happens, I will always choose you ❤️";
}

/* YES */
function yesClicked(){
  current = 7;
  showScreen(7);
  startConfetti();
}

/* NO ESCAPE */
function moveNo(){
  const btn = document.querySelector(".no");
  btn.style.position = "absolute";
  btn.style.top = Math.random()*80+"%";
  btn.style.left = Math.random()*80+"%";
}

/* CONFETTI */
function startConfetti(){
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  let pieces = [];

  for(let i=0;i<120;i++){
    pieces.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      dy:Math.random()*5+2
    });
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    pieces.forEach(p=>{
      ctx.fillStyle=["#ff4d6d","#ff99c8","#ffc2d1"][Math.floor(Math.random()*3)];
      ctx.fillRect(p.x,p.y,5,5);
      p.y+=p.dy;
      if(p.y>canvas.height) p.y=0;
    });

    requestAnimationFrame(draw);
  }

  draw();
}