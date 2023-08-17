var message = document.querySelector("#message");

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

var grammar = "#JSGF V1.0;";

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = "ja-JP";
// set cac ket qua lien tuc
recognition.interimResults = true;
// ghi am lien tuc hay khong
recognition.continuous = true;

recognition.onresult = function (event) {
  var lastResult = event.results.length - 1;
  var content = event.results[lastResult][0].transcript;
  console.log(content);
  message.textContent = "Voice Input: " + content + ".";
};

recognition.onspeechend = function () {
  recognition.stop();
};

recognition.onerror = function (event) {
  message.textContent = "Error occurred in recognition: " + event.error;
};

document.querySelector("#btnTalk").addEventListener("click", function () {
  recognition.start();
});
