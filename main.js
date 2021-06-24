const artistNameInput = document.getElementById('artist');
const songNameInput = document.getElementById('song');
const submitButton = document.getElementById('submitButton');
const lyricsSection = document.querySelector('.lyrics');


const createLyricsSection = (text, lyricsSection) => {
  let p = document.createElement('p');
  p.innerText = text;
  
  lyricsSection.innerHTML = '';
  lyricsSection.appendChild(p);
  lyricsSection.style.display = 'inline-flex';
}

let artistInputHasValue = false;
let songNameInputHasValue = false;

artistNameInput.addEventListener('keyup', function(event) {
  if (artistNameInput.value) {
    artistInputHasValue = true;
  } else {
    artistInputHasValue = false;
    submitButton.style.backgroundColor = '#B5DDFF';
  }
})

songNameInput.addEventListener('keyup', function(event) {
  if (songNameInput.value) {
    songNameInputHasValue = true;
  } else {
    songNameInputHasValue = false;
    submitButton.style.backgroundColor = '#B5DDFF';
  }
  if (artistInputHasValue && songNameInputHasValue) {
    submitButton.style.backgroundColor = 'dodgerblue';
  } else {
    submitButton.style.backgroundColor = '#B5DDFF';
  }
})

submitButton.addEventListener('mouseover', function(event) {
  if (artistInputHasValue && songNameInputHasValue) {
    event.target.style.cursor = 'pointer';
    event.target.style.backgroundColor = 'royalblue';
  }
})

submitButton.addEventListener('mouseout', function(event) {
  if (artistInputHasValue && songNameInputHasValue) {
    event.target.style.backgroundColor = 'dodgerblue';
  }
})

submitButton.addEventListener('click', async function(event) {
  event.preventDefault();

  const artist = artistNameInput.value;
  const songName = songNameInput.value;
  
  if (artist.length && songName.length) {
    const response = await fetch(`http://ianertson.com:3500/${artist}/${songName}`);
    const data = await response.json();
    const firstValue = data[0];
    const lyrics = firstValue.lyrics;
    
    createLyricsSection(lyrics, lyricsSection);
    
  } else if (!artist.length && songName.length) {
    createLyricsSection('Please enter artist name', lyricsSection);

  } else if (artist.length && !songName.length) {
    createLyricsSection('Please enter song title', lyricsSection);
  }
})