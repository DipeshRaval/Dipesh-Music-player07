console.log("Hello JS");

// intialize a variable
let songIndex = 0;
let audioEle = new Audio("Songs/Ae_Dil_Hai_Muskil.mp3");

let Songs = [
  { songName:"Ae_Dil_Hai_Muskil", filepath: "Songs/Ae_Dil_Hai_Muskil.mp3", time : "4 : 29" },
  { songName:"Pasoori", filepath: "Songs/Pasoori.mp3", time : "4 : 36" },
  { songName:"jaan_hai_meri", filepath: "Songs/jaan_hai_meri.mp3", time : "3 : 35" },
  { songName:"Lost_Without_You", filepath: "Songs/Lost_Without_You.mp3", time : "5 : 46" },
  { songName:"Dilbara - Arijit Singh", filepath: "Songs/Dilbara.mp3", time : "3 : 47" },
  { songName:"Kaise_Hua", filepath: "Songs/Kaise_Hua.mp3", time : "4 : 14" },
  { songName:"Tere_Naal - Darshan Raval", filepath: "Songs/Tere_Naal.mp3", time : "3 : 22" },
  { songName:"Manjha", filepath: "Songs/Manjha.mp3", time : "3 : 57" },
  { songName:"Tera_Ban_Jaunga", filepath: "Songs/Tera_Ban_Jaunga.mp3", time : "4 : 16" },
  { songName:"Jab_bhi_teri_yaad", filepath: "Songs/jab_bhi_teri_yaad.mp3", time : "4 : 28" }
]

let masterPlay = document.querySelector("#MasterPLay");
let gift = document.querySelector("#gif")
let ProgressBar = document.getElementById("ProgressBar")
let progress;
let songList = Array.from(document.getElementsByClassName("songitem"));
let masterSongName = document.getElementById("masterSongName");
let soundRange = document.getElementById("soundRange");
let soundIcone = document.getElementById("soundIcone");
let currentMusicTime = document.querySelector(".currentMusicTime");
let totalDurationOfMusic = document.querySelector(".totalDurationOfMusic");


// previous and next function
const nextFunc = ()=>{
  if(songIndex >= 9)
  {
    songIndex = 0;
  }
  else
  {
    songIndex+=1;
  }
  masterSongName.innerHTML = Songs[songIndex].songName;
  audioEle.src = `Songs/${Songs[songIndex].songName}.mp3`;
  audioEle.currentTime = 0;
  masterPlay.classList.remove("fa-circle-play")
  masterPlay.classList.add("fa-circle-pause")
  audioEle.play();
  setAllPlay();
  document.getElementById(songIndex + "").classList.remove("fa-circle-play")
  document.getElementById(songIndex + "").classList.add("fa-circle-pause")
}

const perivousFunc = ()=>{
  if(songIndex <= 0)
  {
    songIndex = 9;
  }
  else
  {
    songIndex-=1;
  }
  masterSongName.innerHTML = Songs[songIndex].songName;
  audioEle.src = `Songs/${Songs[songIndex].songName}.mp3`;
  audioEle.currentTime = 0;
  masterPlay.classList.remove("fa-circle-play")
  masterPlay.classList.add("fa-circle-pause")
  audioEle.play();
  setAllPlay();
  document.getElementById(songIndex + "").classList.remove("fa-circle-play")
  document.getElementById(songIndex + "").classList.add("fa-circle-pause")
}

// set a song name and time
songList.forEach((element,i)=>{
  element.getElementsByClassName("SongName")[0].innerHTML = Songs[i].songName
  element.getElementsByClassName("time")[0].innerHTML = Songs[i].time
})

// play Button click
masterPlay.addEventListener("click", ()=>{
  if(audioEle.paused || audioEle.currentTime <= 0)
  {
    audioEle.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gift.style.opacity = 1;
    setAllPlay();
    document.getElementById(songIndex + "").classList.remove("fa-circle-play")
    document.getElementById(songIndex + "").classList.add("fa-circle-pause")
  }
  else{
    audioEle.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gift.style.opacity = 0;
    setAllPlay();
  }
})

// space key press event
document.addEventListener("keypress" , (e)=>{
  if(e.key == " ")
  {
    if(audioEle.paused){
      audioEle.play();
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      gift.style.opacity = 1;
      document.getElementById(songIndex + "").classList.remove("fa-circle-play")
      document.getElementById(songIndex + "").classList.add("fa-circle-pause")
    }
    else{
      audioEle.pause();
      masterPlay.classList.remove("fa-circle-pause");
      masterPlay.classList.add("fa-circle-play");
      gift.style.opacity = 0;
      document.getElementById(songIndex + "").classList.remove("fa-circle-pause")
      document.getElementById(songIndex + "").classList.add("fa-circle-play")
    }
  }
})

// left and right key press event

document.addEventListener("keydown",(e)=> {
  if(e.key === "ArrowLeft")
  {
    perivousFunc()
  }
  if(e.key === "ArrowRight")
  {
    nextFunc()
  }
})

audioEle.addEventListener("timeupdate",(event)=>{
  progress = parseInt((audioEle.currentTime/audioEle.duration)*100)
  ProgressBar.value = progress;

  let min_duration = Math.floor(audioEle.duration / 60)
  let sec_duration = Math.floor(audioEle.duration % 60)

  let durationOfMusic
  let currentTimeOfMusic

  // set the total time of music
  if(sec_duration < 10)
  {
    sec_time = `0${sec_duration}`
    durationOfMusic = `${min_duration} : ${sec_time}`
  }
  else{
    durationOfMusic = `${min_duration} : ${sec_duration}`
  }
  totalDurationOfMusic.innerText = durationOfMusic


  // set current time of the music
  let min_currentTime = Math.floor(audioEle.currentTime / 60)
  let sec_currentTime = Math.floor(audioEle.currentTime % 60)

  if(sec_currentTime < 10)
  {
    sec_time = `0${sec_currentTime}`
    currentTimeOfMusic = `${min_currentTime} : ${sec_time}`
  }
  else{
    currentTimeOfMusic = `${min_currentTime} : ${sec_currentTime}`
  }
  currentMusicTime.innerText = currentTimeOfMusic

  audioEle.addEventListener('ended',nextFunc);
})


ProgressBar.addEventListener("change",()=>{
  audioEle.currentTime = (ProgressBar.value*audioEle.duration)/100;
})

let setAllPlay = ()=>{
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((e)=>{
      e.classList.remove("fa-circle-pause")
      e.classList.add("fa-circle-play")
  })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
  element.addEventListener("click",(e)=> {
    setAllPlay();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove("fa-circle-play")
    e.target.classList.add("fa-circle-pause")
    masterPlay.classList.remove("fa-circle-play")
    masterPlay.classList.add("fa-circle-pause")
    gift.style.opacity = 1;
    masterSongName.innerHTML = Songs[songIndex].songName;
    audioEle.src = `Songs/${Songs[songIndex].songName}.mp3`;
    audioEle.currentTime = 0;
    audioEle.play();
  })
})



document.getElementById("next").addEventListener("click",nextFunc)
document.getElementById("perivous").addEventListener("click",perivousFunc)


soundRange.addEventListener("change", ()=>{
  val = soundRange.value;

  if(val == 0)
  {
    soundIcone.classList.remove("fa-volume-high")
    soundIcone.classList.remove("fa-volume-low")
    soundIcone.classList.add("fa-volume-off")
  }
  else if(val>1 && val<=5)
  {
    soundIcone.classList.remove("fa-volume-high")
    soundIcone.classList.remove("fa-volume-off")
    soundIcone.classList.add("fa-volume-low")
  }
  else if(val>5)
  {
    soundIcone.classList.remove("fa-volume-off")
    soundIcone.classList.remove("fa-volume-low")
    soundIcone.classList.add("fa-volume-high")
  }

  audioEle.volume = (val/10);
})
