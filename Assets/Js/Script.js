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
musicList = wrapper.querySelector('.music-list')
showMoreBtn = wrapper.querySelector('.fa-list-ul')
hideMoreBtn = musicList.querySelector('.fa-times')




let musicIndex = Math.floor((Math.random()*allMusic.length)+1);

window.addEventListener("load",()=>{
    loadMusic(musicIndex)
    playingNow()
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
    playingNow()
})

function nextMusic(){
    musicIndex++;
    musicIndex>allMusic.length ? musicIndex = 1: musicIndex = musicIndex
    loadMusic(musicIndex);
    playMusic();
    playingNow()

}
function downMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic();
    playingNow()

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
    let getText = repeatBtn.classList
    if(getText == 'fas fa-redo-alt'){
        repeatBtn.classList ='fas fa-undo'
    }
    else if(getText == 'fas fa-undo'){
        repeatBtn.classList = 'fas fa-redo-alt'
    }
 })


//  sau khi bài hát kết thúc

mainAudio.addEventListener("ended",()=>{
    let getText = repeatBtn.classList
    if(getText == 'fas fa-redo-alt'){
        nextMusic();
    }
    else if(getText == 'fas fa-undo'){
        mainAudio.currentTime = 0
        loadMusic(musicIndex)
        playMusic()
    }
})

showMoreBtn.addEventListener("click",()=>{
    musicList.classList.toggle("show")
})
hideMoreBtn.addEventListener("click",()=>{
    musicList.classList.remove("show")
})



const ulTag = wrapper.querySelector('ul')
for(let i = 0 ; i <allMusic.length; i++){
    let liTag= `<li li-index="${i + 1}">
                <div class="row">
                    <span>${allMusic[i].name}</span>
                    <p>${allMusic[i].artist}</p>
                </div>
                <audio class="${allMusic[i].src}" src="./Assets/Music/${allMusic[i].src}.mp3"></audio>
                <span id ="${allMusic[i].src}" class="audio-duration">3:40</span>
                </li>`;

    ulTag.insertAdjacentHTML("beforeend",liTag);

    let liAudioDuaration = ulTag.querySelector(`#${allMusic[i].src}`)
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`)

    liAudioTag.addEventListener("loadeddata",()=>{
        let audioDuration = liAudioTag.duration;
            totalMin = Math.floor(audioDuration / 60)
            totalSec = Math.floor(audioDuration % 60)
        if(totalSec < 10){
            totalSec =`0${totalSec}`
        }
        liAudioDuaration.innerText = `${totalMin}:${totalSec}`;   
        liAudioDuaration.setAttribute("t-duration", `${totalMin}:${totalSec}`)
    })
}


const allLiTags = ulTag.querySelectorAll("li")

 function playingNow(){
    for(let j = 0; j< allLiTags.length; j++){
        let audioTag = allLiTags[j].querySelector(".audio-duration")
        if(allLiTags[j].classList.contains("playing")){
            allLiTags[j].classList.remove("playing")
            let adDuration = audioTag.getAttribute("t-duration")
            audioTag.innerText = adDuration
        }
        if(allLiTags[j].getAttribute("li-index") == musicIndex){
           allLiTags[j].classList.add("playing")
           audioTag.innerText = "Playing"
        }
        allLiTags[j].setAttribute("onclick", "clicked(this)")
    }
 }

 function clicked(element){
     let getliIndex = element.getAttribute("li-index")
     musicIndex = getliIndex
     loadMusic(musicIndex)
     playMusic()
     playingNow()
 }
