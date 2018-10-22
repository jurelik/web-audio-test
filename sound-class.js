class Sound {
  constructor(url) {
    this.url = url;
    this.source;
  }

  init() {
    this.source = context.createBufferSource();
    let xhr = new XMLHttpRequest();
    let self = this;
    xhr.open('GET', this.url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
      context.decodeAudioData(xhr.response, function(decoded) {
        self.source.buffer = decoded;
        self.source.connect(context.destination);
        // console.log(self.source);
      });
    };
    xhr.send();
    // console.log(this.source);
  }

  play() {
    // this.init();
    this.source.start();
  }

  stop() {
    this.source.stop();
  }
}