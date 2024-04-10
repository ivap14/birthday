const params = new URLSearchParams(window.location.search);
    const friendName = params.get('name');
    const friendAge = params.get('age');

    document.getElementById('friendName').textContent = friendName;
    document.getElementById('friendAge').textContent = friendAge;

window.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton');
  
  startButton.addEventListener('click', () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const microphone = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        
        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        microphone.connect(analyser);
        
        // Start analyzing audio input
        const detectBlow = () => {
          analyser.getByteTimeDomainData(dataArray);

          const maxAmplitude = Math.max(...dataArray);
          if (maxAmplitude > 200) {
            console.log('Blow detected!');
            extinguishCandle();
          }
          requestAnimationFrame(detectBlow);
        };
        detectBlow();
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  });
});

function extinguishCandle() {
  const flame = document.querySelector('.flame');
  if (flame) {
    flame.style.display = 'none';
  }
}