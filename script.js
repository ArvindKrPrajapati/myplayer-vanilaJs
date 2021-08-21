




const songs=[
  {
    name:"bachpan ka pyar",
    link:"https://pagalfree.com/musics/128-Bachpan%20Ka%20Pyaar%20-%20Badshah%20128%20Kbps.mp3",
    img:"https://pagalfree.com/images/128Bachpan%20Ka%20Pyaar%20-%20Badshah%20128%20Kbps.jpg",
    artist:"Badshah,Astha gill"
    
  },
  {
    name:"Bewafa tera masoom chehra",
    link:"https://pagalfree.com/musics/128-Bewafa%20Tera%20Masoom%20Chehra%20-%20Jubin%20Nautiyal%20-%20128%20Kbps.mp3",
    img:"https://pagalfree.com/images/128Bewafa%20Tera%20Masoom%20Chehra%20-%20Jubin%20Nautiyal%20-%20128%20Kbps.jpg",
    artist:"Jubin Nautiyal"
  },
  {
    name:"man Bharryaa 2.0",
    link:"https://pagalfree.com/musics/128-Mann%20Bharryaa%202.0%20-%20Shershaah%20128%20Kbps.mp3",
    img:"https://pagalfree.com/images/128Mann%20Bharryaa%202.0%20-%20Shershaah%20128%20Kbps.jpg",
    artist:"B Parak"
  },
  {
    name:"Filhaal 2 Mohabat",
    link:"https://pagalfree.com/musics/128-Filhaal2%20Mohabbat%20-%20B%20Praak%20128%20Kbps.mp3",
    img:"https://pagalfree.com/images/128Filhaal2%20Mohabbat%20-%20B%20Praak%20128%20Kbps.jpg",
    artist:"B Parak"
  },
  {
    name:"Raatan Lambiyan",
    link:"https://pagalfree.com/musics/128-Raataan%20Lambiyan%20-%20Shershaah%20128%20Kbps.mp3",
    img:"https://pagalfree.com/images/128Raataan%20Lambiyan%20-%20Shershaah%20128%20Kbps.jpg",
    artist:"Tanishk Bagchi, Jubin Nautiyal, Asees Kaur"
  }
];


 let listLength=songs.length;
 
  let songIndex=getRecentSong();
  if(!songIndex){
     songIndex=0;
     setRecentSong(0);
  }else{
     songIndex=parseInt(songIndex);
  }
  
  
  let previous=document.querySelector(".previous");
  let current=document.querySelector(".current");
  let nextSong=document.querySelector(".nextSong");
  setSongsView();
  
 
 let audio=document.querySelector("#song");
 let progress=document.querySelector(".progress div");
 let name=document.querySelector(".song-name small");
 let songimg=document.querySelector(".songimg");
 let bg=document.querySelector("main");
 bg.style.backgroundImage="linear-gradient(rgba(0,0,0,.6),black), url("+songs[songIndex].img+")";
 songimg.src=songs[songIndex].img;
 name.innerHTML=songs[songIndex].name;
 audio.src=songs[songIndex].link;
 audio.load();
 
 audio.addEventListener("timeupdate",()=>{
   let dur=audio.duration ? audio.duration : 0;
   let ct=audio.currentTime;
   let abc=((ct+.25)/dur*100+'%').toString();
   progress.style.width=abc;
   document.querySelector("#ct").innerHTML=formatTime(ct);
   document.querySelector("#dur").innerHTML=formatTime(dur);
 });
 
 audio.onended=()=>{
   next();
 }
  
 
 //calculate time
 function formatTime( time ) {
  let minutes = Math.floor( time / 60 )
  let timeForSeconds = time - ( minutes * 60 ) // seconds without counted minutes 
  let seconds = Math.floor( timeForSeconds )
  let secondsReadable = seconds > 9 ? seconds : `0${seconds}` // To change 2:2 into 2:02
  return `${minutes}:${secondsReadable}`
}


  //getRecentSong
function getRecentSong(){
   return localStorage.getItem("recentSong");
 }
 
 //save current song index
 function setRecentSong(song){
   localStorage.setItem("recentSong",song);
 }
 
 
 function play(){
    audio.play();
    document.querySelector(".current tag").style.display="block";
    document.querySelector(".play").style.display="none";
    document.querySelector(".pause").style.display="inline-block";
 }
 
function pause(){
    audio.pause();
    document.querySelector(".current tag").style.display="none";
    document.querySelector(".play").style.display="inline-block";
    document.querySelector(".pause").style.display="none";
 }
 
 function pre(){
   if(songIndex!=0){
     songIndex--;
     setRecentSong(songIndex);
   }
   changeSong(songIndex);
 }
 
 function next(){
   if(songIndex<=listLength-2){
     songIndex++;
   }
   changeSong(songIndex);
  }
  
  function changeSong(index){
   hideMenu();
   songIndex=index;
   setRecentSong(songIndex);
   name.innerHTML=songs[index].name;
   audio.src=songs[index].link;
   songimg.src=songs[index].img;
   bg.style.backgroundImage="linear-gradient(rgba(0,0,0,.6),black), url("+songs[index].img+")";
   setSongsView();
   audio.load();
   play();
  }

function template(name,artist){
  let temp=`
      <td width="30px">
       <div class="musicSymbol">&#9835;</div>
      </td>
      <td>
        <h3>${name}</h3>
       <small>${artist}</small>
      </td>
      <td width="40px">
      <tag>
       <article></article>
       <article></article>
       <article></article>
       </tag>
      </td>
  `;
  return temp;
  }
 
 function setSongsView(){
   if(songIndex===0){
     previous.innerHTML="";
   }else{
     previous.innerHTML=template(songs[songIndex-1].name,songs[songIndex-1].artist);
   }
   current.innerHTML=template(songs[songIndex].name,songs[songIndex].artist);
   if(songIndex===listLength-1){
     nextSong.innerHTML="";
   }else{
     nextSong.innerHTML=template(songs[songIndex+1].name,songs[songIndex+1].artist);
   }
 }

function showMenu(){
  document.querySelector(".menu").style.transform="translateY(0vh)";
}

function hideMenu(){
  //document.querySelector(".menu").style.transform="translateY(70vh)";
}
 
 
function musicList(index){
   const html=`
   <div class="music-list" onclick="changeSong(${index})">
     <div class="icon">
        &#9835; 
     </div>
     <div>
       <b> ${songs[index].name}</b><br>
       <small>${songs[index].artist}</small>
     </div>
   </div>`;
  return html;
   }
   
   
 function displaySongList(){
    for(let i=0; i<listLength; i++){
      document.write(musicList(i));
    }
   }
 

 
 function backward(){
   document.querySelector(".backward").classList.add("ripple");
   audio.currentTime-=10;
   setTimeout(function() {
   document.querySelector(".backward").classList.remove("ripple");
   }, 10);
 }
 function forward(){
   document.querySelector(".forward").classList.add("ripple");
   audio.currentTime+=10;
   setTimeout(function() {
   document.querySelector(".forward").classList.remove("ripple");
   }, 10);
 }