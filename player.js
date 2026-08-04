const audio=document.getElementById("audio");

const title=document.getElementById("title");

const play=document.getElementById("play");

const next=document.getElementById("next");

const prev=document.getElementById("prev");

const volume=document.getElementById("volume");

const shuffle=document.getElementById("shuffle");

let playlist=[];

let current=0;

fetch("playlist.json")

.then(r=>r.json())

.then(data=>{

playlist=data;

loadSong(0);

});

function loadSong(i){

current=i;

audio.src=playlist[current].file;

title.innerHTML=playlist[current].title;

audio.volume=volume.value/100;

audio.play();

play.innerHTML="⏸ Pause";

}

play.onclick=function(){

if(audio.paused){

audio.play();

play.innerHTML="⏸ Pause";

}else{

audio.pause();

play.innerHTML="▶ Play";

}

}

next.onclick=function(){

if(shuffle.checked){

current=Math.floor(Math.random()*playlist.length);

}else{

current++;

if(current>=playlist.length)current=0;

}

loadSong(current);

}

prev.onclick=function(){

current--;

if(current<0)current=playlist.length-1;

loadSong(current);

}

audio.onended=function(){

next.click();

}

volume.oninput=function(){

audio.volume=this.value/100;

localStorage.setItem("volume",this.value);

}

window.onload=function(){

const v=localStorage.getItem("volume");

if(v){

volume.value=v;

audio.volume=v/100;

}

}

setInterval(()=>{

if(audio.paused){

audio.play();

}

},5000);

document.addEventListener("visibilitychange",()=>{

if(audio.paused){

audio.play();

}

});