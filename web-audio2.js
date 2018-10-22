let context = new (window.AudioContext || window.webkitAudioContext)();
let source;

let button = document.getElementById('button');

function getData() {
  source = context.createBufferSource();
  let request = new XMLHttpRequest();

  request.open('GET', 'comp.mp3', true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    let audioData = request.response;

    context.decodeAudioData(audioData, function(buffer) {
      source.buffer = buffer;
      source.connect(context.destination);
      source.loop = false;
    });
  }
  request.send();
}

button.onclick = function() {
  getData();
  source.start();
}