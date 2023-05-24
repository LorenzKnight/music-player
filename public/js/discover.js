// Get elements
const playerBtns = document.getElementById('player-btns');
const playingNow = document.getElementById('playing-now');
const artistList = document.getElementById('artist-list');
const volumeSlider = document.getElementById('volume-slider');
const volumeValue = document.getElementById('volume-value');
const searchField = document.getElementById('search-field');
const songList = document.getElementById('song-list');
const artistHeading = document.getElementById('song-list-artist-heading')
const equalizer = document.getElementById('equalizer');
const footerBtn = document.getElementById('footer-btn');

// Eventliseners
playerBtns.addEventListener('click', playerFunc);

//Global variables
let soundPlaying = false;
let songPlayingNow = ''
let lastPlayed = ''
let fetchedData;
let volumeNumber = 0.5;
let songQueue = [];
let activeSongQueueIndex;
let isFooterToggled = false;
let isHeaderNavToggled = false;

function renderSongList(e, arrToRender) {
    songQueue = []
    if (arrToRender) {
        for (let i = 0; i < arrToRender.length; i++) {
            const { songName, fileName } = arrToRender[i];
            song = { songName, fileName, queueIndex: i }
    
            songQueue.push(song)
    
            const listElement = document.createElement("li");
            const titleElement = document.createElement("h3");
    
            titleElement.innerText = song.songName;
            titleElement.dataset.fileName = song.fileName;
            titleElement.dataset.queueIndex = i;
            listElement.appendChild(titleElement)
            song.fileName ? listElement.addEventListener('click', changeSong) : null;
            songList.appendChild(listElement);
        }
    } else if (!arrToRender) {
        const artistId = e.target.dataset.artistID
        const artist = fetchedData[artistId].artist;
    
        artistHeading.innerText = artist;
        songList.innerHTML = '';
  
        for (let i = 0; i < fetchedData[artistId].songs.length; i++) {
            const { songName, fileName } = fetchedData[artistId].songs[i];
            song = { songName, fileName, queueIndex: i }
            songQueue.push(song)
    
            const listElement = document.createElement("li");
            const titleElement = document.createElement("h3");
            titleElement.innerText = fetchedData[artistId].songs[i].songName;
            titleElement.dataset.fileName = fetchedData[artistId].songs[i].fileName;
            titleElement.dataset.queueIndex = i;
            console.log('here' + i)
            console.log(e)
    
            titleElement.dataset.queueIndex = i;
            listElement.appendChild(titleElement)
            listElement.addEventListener('click', changeSong)
            songList.appendChild(listElement);
        }
    }
  
  
}

function changeSong(e, songToPlay, queueIndex) {
    // equalizer.classList.remove('hidden')
    if (songToPlay) {
      console.log(songToPlay.songName)
      sound.pause();
      sound.currentTime = 0;
      sound = new Audio(`../audio/${songToPlay.fileName}`);
      activeSongQueueIndex = queueIndex;
      sound.volume = volumeNumber;
      sound.play();
      soundPlaying = true;
      playingNow.innerText = `Spelar nu: ${songToPlay.songName}`
    }
  
    else if (!soundPlaying) {
      songPlayingNow = e.target.innerText;
      sound = new Audio(`../audio/${e.target.dataset.fileName}`);
      activeSongQueueIndex = e.target.dataset.queueIndex;
      sound.volume = volumeNumber;
      sound.play();
      soundPlaying = true;
      playingNow.innerText = `Spelar nu: ${songPlayingNow}`
    } else if (soundPlaying) {
      sound.pause();
      sound.currentTime = 0;
      sound = new Audio(`../audio/${e.target.dataset.fileName}`);
      activeSongQueueIndex = e.target.dataset.queueIndex;
      sound.volume = volumeNumber;
      sound.play();
      soundPlaying = true;
      playingNow.innerText = `Spelar nu: ${songPlayingNow}`
    }
}
  
function playerFunc(e) {
    console.log(songList)
    console.log(e.target.dataset.btn)
    if (soundPlaying) {
        switch (e.target.dataset.btn) {
        case "play":
            sound.play();
            playingNow.innerText = `Spelar nu: ${songPlayingNow}`
            equalizer.classList.remove('hidden')
            break;
        case "pause":
            sound.pause();
            playingNow.innerText = `Pausad: ${songPlayingNow}`
            equalizer.classList.add('hidden')
            break;
        case "stop":
            sound.pause();
            playingNow.innerText = `Stoppad: ${songPlayingNow}`
            sound.currentTime = 0;
            equalizer.classList.add('hidden')
            break;
        case "backward":
            if (activeSongQueueIndex > 0) {
            activeSongQueueIndex--;
            changeSong(e, songQueue[activeSongQueueIndex], activeSongQueueIndex)
            } else {
            return
            }
            break;
        case "forward":
            if (activeSongQueueIndex < songQueue.length - 1) {
            activeSongQueueIndex++;
            changeSong(e, songQueue[activeSongQueueIndex], activeSongQueueIndex)
            } else {
            return
            }
            break;
        }
    } else {
        return
    }
}

volumeSlider.oninput = function () {
    console.log(this.value);
    const volume = this.value * 0.01;
    console.log(volume)
    if (soundPlaying) {
      sound.volume = volume;
      volumeValue.innerText = Math.floor(volume * 100);
    } else {
      volumeValue.innerText = Math.floor(volume * 100);
      volumeNumber = volume;
      return;
    }
}