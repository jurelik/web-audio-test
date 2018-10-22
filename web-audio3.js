let context = new (window.AudioContext || window.webkitAudioContext)();
let xhr = new XMLHttpRequest();
let compBuffer = context.createBufferSource();
let button = document.getElementById('button');

xhr.open('GET', 'comp.mp3', true);
xhr.responseType = 'arraybuffer';
xhr.onload = function() {
  if (xhr.status == 200) {
    let transcodedFile = xhr.response;
    context.decodeAudioData(transcodedFile, function(decodedData) {
      compBuffer.buffer = decodedData;
    });
  }
}
xhr.send();
console.log(compBuffer);

function playSound(buffer) {
  let source = context.createBufferSource();
  source.buffer = buffer;
  console.log(source);
  source.connect(context.destination);
  source.start();
}

// console.log(audioSource);
button.onclick = function() {
  playSound(compBuffer.buffer);
}