const wrapper = document.querySelector('.wrapper')
musicImg = wrapper.querySelector('.img-area img')
musicName = wrapper.querySelector('.song-details .name')
musicArtist = wrapper.querySelector('.song-details .artist')
mainAudio = wrapper.querySelector('#main-audio')
playPauseBtn = wrapper.querySelector('.play-pause')
backBtn = wrapper.querySelector('.fa-backward')
toBtn = wrapper.querySelector('.fa-forward')
progressBar = wrapper.querySelector('.progress-bar')
progressArea = wrapper.querySelector('.progress-area')




let musicIndex = 2;

window.addEventListener("load",()=>{
    loadMusic(musicIndex)
})

function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb -1].name;
    musicArtist.innerText = allMusic[indexNumb -1].artist;
    musicImg.src = './Assets/Img/'+allMusic[indexNumb -1].img +'.jpg';
    mainAudio.src = './Assets/Music/'+allMusic[indexNumb -1].src +'.mp3';
}
function playMusic(){
    wrapper.classList.add("paused")
    playPauseBtn.querySelector('i').classList = 'fas fa-pause'
    mainAudio.play();
}
function pauseMusic(){
    wrapper.classList.remove("paused")
    playPauseBtn.querySelector('i').classList = 'fas fa-play'
    mainAudio.pause();
}


playPauseBtn.addEventListener("click",()=>{
    const isMusicPaused = wrapper.classList.contains("paused")
    isMusicPaused ? pauseMusic() : playMusic();
})

function nextMusic(){
    musicIndex++;
    musicIndex>allMusic.length ? musicIndex = 1: musicIndex = musicIndex
    loadMusic(musicIndex);
    playMusic();
}
function downMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic();
}
toBtn.addEventListener('click',()=>{
    nextMusic();
})
backBtn.addEventListener('click',()=>{
    downMusic();
})


mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    let musicCurrentTime = wrapper.querySelector(".current")
    let musicDuration = wrapper.querySelector(".duration")
    mainAudio.addEventListener("loadeddata",()=>{
        
        let audioDuration = mainAudio.duration;
            totalMin = Math.floor(audioDuration/60)
            totalSec = Math.floor(audioDuration%60)
        if(totalSec < 10){
            totalSec =`0${totalSec}`
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;   
    }) 
    let currentMin = Math.floor(currentTime/60)
        currentSec = Math.floor(currentTime%60)
    if(currentSec < 10){
        currentSec =`0${currentSec}`
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
})




progressArea.addEventListener("click",(e)=>{
    let progressWidthval = progressArea.clientWidth
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration
    mainAudio.currentTime = (clickedOffSetX / progressWidthval)*songDuration
    playMusic()
})


const repeatBtn = wrapper.querySelector('.fa-redo-alt')
 repeatBtn.addEventListener("click", ()=>{
    let getText = repeatBtn.innerText
    switch(getText){
        case "repeat":
            repeatBtn.innerText = "repeat_one"
    }
 })