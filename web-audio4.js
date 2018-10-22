let context = new (window.AudioContext || window.webkitAudioContext)();
let button = document.getElementById('button');
let button2 = document.getElementById('button2');
let sound = new Sound('comp.mp3');

button.addEventListener('click', e => {
  
  sound.init();
  console.log(sound.source);
  sound.play();
  console.log(sound.source);
})

button2.addEventListener('click', e => {
  console.log(sound.source);
  sound.play();
})
