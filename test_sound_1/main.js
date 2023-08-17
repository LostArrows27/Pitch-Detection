let pitch;
let audioContext;
let mic;
let modelUrl =
  "https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/";
let micElement = document.querySelector("#mic");

// set up when first time enter page
function setup() {
  audioContext = getAudioContext();
  mic = new p5.AudioIn(notSupportedBrower);

  micElement.onclick = async (e) => {
    mic.start(startPitch); // start your microphone
    // mic.connect(); // listen to your voice directly with a bit delay
    const microphoneArr = await getAllMicSources();
    microphoneArr.forEach((device) => {
      console.log(device.label);
    });
  };
}

function startPitch() {
  pitch = ml5.pitchDetection(modelUrl, audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
  console.log("model loaded");
  document.querySelector("#off").onclick = (e) => {
    mic.stop();
    // mic.disconnect();
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

function notSupportedBrower() {
  throw new Error("not supported !");
}

async function getAllMicSources() {
  return mic.getSources();
}
