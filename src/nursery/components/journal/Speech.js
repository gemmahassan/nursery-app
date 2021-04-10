//get speech api
const synth = speechSynthesis;

// Speak
export const Speak = (speech) => {

  // Check if speaking
  if (synth.speaking) {
    console.error('Already speaking...');
    return;
  }

  // get voices
  const voices = synth.getVoices();

  // Get speak text
  const speakText = new SpeechSynthesisUtterance(speech);

  // Speak end
  speakText.onend = e => {
    console.log('Done speaking...');
  };

  // Speak error
  speakText.onerror = e => {
    console.error('Something went wrong');
  };

  // Loop through voices
  voices.forEach(voice => {
    if (voice.name === 'Google UK English Female') {
      speakText.voice = voice;
    }
  });

  // Set pitch and rate
  speakText.rate = 1;
  speakText.pitch = 1;
  // Speak
  synth.speak(speakText);
}

