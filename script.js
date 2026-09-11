let current = 1;
let typingDone = false;
let canGoNext = true;
const params = new URLSearchParams(window.location.search);
let herName = params.get("name") || "Ammu ❤️";

/* START */
function startExperience() {
  const music = document.getElementById("music");

  music.currentTime = 0;
  music.volume = 1;

  music.play()
    .then(() => {
      console.log("music started");
    })
    .catch(err => {
      console.log("play blocked", err);
    });

  current = 2;
  showScreen(2);
}

/* TAP CONTROL */
document.body.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") return;
  if (current === 2 && !typingDone) return;

  if (canGoNext && current < 9) {
    canGoNext = false;
    current++;
    showScreen(current);

    setTimeout(() => canGoNext = true, 800);
  }
});

/* BUTTON NEXT */
function goNext(e) {
  if (e) e.stopPropagation();
  if (!typingDone && current === 2) return;

  if (current < 9) {
    current++;
    showScreen(current);
  }
}

/* SCREEN SWITCH */
function showScreen(num) {
  const currentScreen = document.querySelector(".screen.active");
  const nextScreen = document.getElementById("screen"+num);

  currentScreen.classList.add("exit");

  setTimeout(()=>{
    currentScreen.classList.remove("active","exit");
    nextScreen.classList.add("active");
  },400);

  /* progress bar */
  const bar = document.getElementById("progressBar");
  bar.style.width = "0%";
  setTimeout(()=> bar.style.width="100%",50);

  /* typing */
  if(num===2){
    msgIndex = 0;
    typingDone = false;
    document.getElementById("nextBtn").style.display = "none";
    typeSequence();
  }

  /* memory burst */
  if(num===7){
    memoryBurst();
  }
}

/* TYPING */
const messages = [
  `${herName}… the day I met you…`,
  "I didn’t know my life was about to change ❤️",
  "slowly… you became my happiness 💫",
  "and now… you are my everything ❤️"
];

let msgIndex = 0;

function typeSequence() {
  typingDone = false;

  if (msgIndex >= messages.length) {
    typingDone = true;
    document.getElementById("nextBtn").style.display = "block";
    return;
  }

  let text = messages[msgIndex];
  let i = 0;
  const typingEl = document.getElementById("typing");
  typingEl.innerHTML = "";

  function type() {
    if (i < text.length) {
      typingEl.innerHTML += text[i];
      i++;

      // 🔥 smoother + slightly faster
      setTimeout(type, 25);

    } else {
      msgIndex++;

      // ⏱️ better pause before next line
      setTimeout(typeSequence, 1000);
    }
  }

  type();
}
/* SECRET */
function unlockSecret(e){
  if (e) e.stopPropagation();
  document.getElementById("secretText").innerText =
  "No matter what happens, I will always choose you ❤️";
}

/* PROPOSAL */
function yesClicked(e){
  if (e) e.stopPropagation();
  showScreen(9);
  startConfetti();
}

/* NO BUTTON */
function moveNo(){
  const btn = document.querySelector(".no");
  btn.style.position = "absolute";
  btn.style.top = Math.random()*80+"%";
  btn.style.left = Math.random()*80+"%";
}

/* BURST */
function memoryBurst(){
  for(let i=0;i<30;i++){
    const el=document.createElement("div");
    el.innerText="💖";
    el.style.position="absolute";
    el.style.left=Math.random()*100+"vw";
    el.style.top=Math.random()*100+"vh";
    el.style.fontSize="20px";
    el.style.animation="explode 2s forwards";
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),2000);
  }
}

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

document.getElementById("nameText").innerText = herName;