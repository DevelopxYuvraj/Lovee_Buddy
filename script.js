const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];

window.addEventListener("load",()=>setTimeout(()=>$("#loader").classList.add("hidden"),650));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
$$(".reveal").forEach(el=>observer.observe(el));

const heroArt=$("#heroArt"), heroCard=$("#heroCard");
if(matchMedia("(pointer:fine)").matches){
  heroArt.addEventListener("mousemove",e=>{
    const r=heroArt.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    heroCard.style.transform=`rotateY(${x*8}deg) rotateX(${-y*8}deg) translate(${x*10}px,${y*10}px)`;
    $$(".float-symbol,.float-note,.orb",heroArt).forEach((el,i)=>el.style.translate=`${x*(i+1)*7}px ${y*(i+1)*7}px`);
  });
  heroArt.addEventListener("mouseleave",()=>heroCard.style.transform="");
}

const cursorDot=$(".cursor-dot"),cursorRing=$(".cursor-ring");
if(cursorDot){
  window.addEventListener("mousemove",e=>{cursorDot.style.left=e.clientX+"px";cursorDot.style.top=e.clientY+"px";cursorRing.animate({left:e.clientX+"px",top:e.clientY+"px"},{duration:100,fill:"forwards"})});
  $$("button,a").forEach(el=>{el.addEventListener("mouseenter",()=>{cursorRing.style.width="42px";cursorRing.style.height="42px"});el.addEventListener("mouseleave",()=>{cursorRing.style.width="28px";cursorRing.style.height="28px"})});
}

const modals={surprise:$("#surpriseModal"),note:$("#noteModal"),lightbox:$("#lightbox")};
function openModal(m){m.classList.add("open");m.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeModal(m){m.classList.remove("open");m.setAttribute("aria-hidden","true");document.body.style.overflow=""}
$$("[data-surprise]").forEach(b=>b.addEventListener("click",()=>openModal(modals.surprise)));
$$("[data-close]").forEach(b=>b.addEventListener("click",()=>closeModal(b.closest(".modal-backdrop"))));
$$(".modal-backdrop").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModal(m)}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")$$(".modal-backdrop.open").forEach(closeModal)});

const notes={
 smile:["♡","OPEN WHEN","you're smiling","Good. Keep that energy. You have no idea how much brighter a room can feel when you bring that smile with you."],
 motivation:["✦","OPEN WHEN","you need motivation","One step at a time. You don't need to have everything figured out today. Just keep going — you're doing better than you think."],
 memories:["✧","OPEN WHEN","you miss good memories","Some moments don't need a reason to stay with us. Keep the good ones close, and remember there are still plenty of beautiful days ahead."],
 because:["☼","OPEN","just because","This is your completely unnecessary reminder that you are appreciated, thought of, and worth celebrating. Just because."]
};
$$(".envelope").forEach(b=>b.addEventListener("click",()=>{const n=notes[b.dataset.note];$("#noteIcon").textContent=n[0];$("#noteEyebrow").textContent=n[1];$("#noteTitle").textContent=n[2];$("#noteMessage").textContent=n[3];openModal(modals.note)}));

$("#sparkleBtn").addEventListener("click",()=>{document.body.classList.remove("sparkle");void document.body.offsetWidth;document.body.classList.add("sparkle");setTimeout(()=>document.body.classList.remove("sparkle"),2500)});

$$(".memory").forEach(card=>card.addEventListener("click",()=>{
 const src=card.dataset.img, caption=card.dataset.caption;
 $("#lightboxCaption").textContent=caption;
 const box=$("#lightboxImage");
 box.innerHTML=src?`<img src="${src}" alt="${caption}">`:`<div class="photo-placeholder" style="width:min(500px,80vw);height:500px"><span>${caption}</span></div>`;
 openModal(modals.lightbox);
}));

const special=$("#specialDate"), countdown=$(".countdown"), dateValue=countdown?.dataset.date;
if(!dateValue){special.style.display="none"}else{
 const tick=()=>{let d=new Date(dateValue)-Date.now();if(d<=0){countdown.innerHTML="<p>The special day is here. ♡</p>";return}$("#days").textContent=Math.floor(d/86400000);d%=86400000;$("#hours").textContent=Math.floor(d/3600000);d%=3600000;$("#minutes").textContent=Math.floor(d/60000);$("#seconds").textContent=Math.floor(d/1000)%60};tick();setInterval(tick,1000);
}

$("#heartbeatBtn").addEventListener("click",e=>{e.currentTarget.classList.remove("active");void e.currentTarget.offsetWidth;e.currentTarget.classList.add("active");$("#heartbeatText").textContent="You make ordinary moments feel a little more special. ♡"});

$("#finalSurprise").addEventListener("click",()=>{
 const m=$("#surpriseModal");$("#modalTitle").textContent="Okay, one last thing...";
 $("#noteMessage").textContent="";const p=m.querySelector("p:not(.eyebrow)");p.textContent="You deserve more good days, more laughter, more memories and a lot more reasons to smile.";
 $("#sparkleBtn").textContent="Never forget that. ♡";openModal(m);
});

let clicks=0,timer;$("#secretLogo").addEventListener("click",()=>{clicks++;clearTimeout(timer);timer=setTimeout(()=>clicks=0,1500);if(clicks===5){$("#toast").classList.add("show");setTimeout(()=>$("#toast").classList.remove("show"),2500);clicks=0}});

const music=$("#music"),musicBtn=$("#musicBtn");
musicBtn.addEventListener("click",async()=>{if(!music.querySelector("source").getAttribute("src")){alert("Add your music file in assets/music/ and set its path in index.html.");return}if(music.paused){await music.play();musicBtn.textContent="Ⅱ";musicBtn.classList.add("playing")}else{music.pause();musicBtn.textContent="♫";musicBtn.classList.remove("playing")}});

document.addEventListener("visibilitychange",()=>{if(document.hidden&& !music.paused)music.pause()});