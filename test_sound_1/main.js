let pitch;
let audioContext;
let mic;
let modelUrl =
  "https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/";
let micElement = document.querySelector("#mic");

// set up when first time enter page
function setup() {
  console.log("set up");
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  console.log(mic);
  micElement.onclick = (e) => {
    mic.start(startPitch);
  };
}

function startPitch() {
  pitch = ml5.pitchDetection(modelUrl, audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
  document.querySelector("#off").onclick = (e) => {
    mic.stop();
  };
  getPitch();
}

function getPitch() {
  pitch.getPitch((err, frequency) => {
    if (err) {
      throw new Error("smth happened!");
    }
    if (frequency) {
      console.log(frequency);
    }
    getPitch();
  });
}
