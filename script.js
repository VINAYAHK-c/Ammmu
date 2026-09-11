let current = 1;
let musicStarted = false;

/* START */
function startExperience() {
  showScreen(2);
  current = 2;

  if (!musicStarted) {
    document.getElementById("music").play().catch(()=>{});
    musicStarted = true;
  }

  typeSequence();
}

/* NEXT */
function goNext(e) {
  e.stopPropagation();
  current++;
  showScreen(current);
}

/* SHOW SCREEN */
function showScreen(num) {
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("screen"+num).classList.add("active");
}

/* TYPING */
const messages = [
  "The day I met you… ❤️",
  "everything changed… 💫",
  "you became my happiness 💖",
  "you are my everything ❤️"
];

let msgIndex = 0;

function typeSequence() {
  if (msgIndex >= messages.length) return;

  let text = messages[msgIndex];
  let i = 0;
  let el = document.getElementById("typing");
  el.innerHTML = "";

  function type() {
    if (i < text.length) {
      el.innerHTML += text[i];
      i++;
      setTimeout(type, 40);
    } else {
      msgIndex++;
      setTimeout(typeSequence, 1000);
    }
  }

  type();
}

/* SECRET */
function unlockSecret(e){
  e.stopPropagation();
  document.getElementById("secretText").innerText =
    "No matter what happens, I will always choose you ❤️";
}

/* YES */
function yesClicked(e){
  e.stopPropagation();
  showScreen(6);
  startConfetti();
}

/* NO ESCAPE */
function moveNo(){
  const btn = document.querySelector(".no");
  btn.style.position = "absolute";
  btn.style.top = Math.random()*80+"%";
  btn.style.left = Math.random()*80+"%";
}

/* HEARTS */
setInterval(()=>{
  const h=document.createElement("div");
  h.className="heart";
  h.innerText="❤";
  h.style.left=Math.random()*100+"vw";
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),6000);
},300);

/* CONFETTI */
function startConfetti(){
  const canvas=document.getElementById("confetti");
  const ctx=canvas.getContext("2d");
  canvas.width=innerWidth;
  canvas.height=innerHeight;

  let pieces=[];
  for(let i=0;i<100;i++){
    pieces.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      dy:Math.random()*5+2
    });
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      ctx.fillStyle="pink";
      ctx.fillRect(p.x,p.y,5,5);
      p.y+=p.dy;
      if(p.y>canvas.height)p.y=0;
    });
    requestAnimationFrame(draw);
  }

  draw();
}