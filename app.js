const app = () => {
const song = document.querySelector(".song");
const play = document.querySelector('.play');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.vid-container video');

// Sounds
const sounds = document.querySelectorAll('.sound-picker button');
// Time display

const timeDisplay = document.querySelector('.time-display');
const timeSelect = document.querySelectorAll('.time-select button')
const outlineLenght = outline.getTotalLength()

// duration
let fakeDuration = 600;



outline.style.strokeDasharray = outlineLenght;
outline.style.strokeDashoffset = outlineLenght
// pick diffrent sounds
sounds.forEach(sound=>
    sound.addEventListener('click',function(){
        song.src= this.getAttribute('data-sound')
       video.src= this.getAttribute('data-video')
       checkPlaying(song)

    }))



//  play sound
play.addEventListener('click', ()=>{
    
    checkPlaying(song);
    video.loop = true
});

// select sound
timeSelect.forEach(option =>{
    option.addEventListener('click',function() {
        fakeDuration = this.getAttribute('data-time')
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}: ${Math.floor (
            fakeDuration % 60)}`

    })
})



//  Stop and play the sound
const checkPlaying = song =>
{
    if(song.paused){
        song.play();
        video.play();
        play.src = './svg/pause.svg'
    }else{
        song.pause();
        video.pause();
        play.src = './svg/play.svg'
    }
}
// circle animation

song.ontimeupdate = function() {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    timeDisplay.textContent = `${minutes}:${seconds}`;
    let progress = outlineLenght - (currentTime / fakeDuration) * outlineLenght;
    outline.style.strokeDashoffset = progress;
  
    if(currentTime>= fakeDuration){
        song.pause();
        song.currentTime = 0;
        play.src = './svg/play.svg';
        video.pause();
    }
}

}

app()