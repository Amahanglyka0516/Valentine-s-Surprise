let cameraStream;

const video = document.getElementById('camera');
const captureBtn = document.getElementById('capture-btn');
const retakeBtn = document.getElementById('retake-btn');
const previewBtn = document.getElementById('preview-btn');
const shutterSound = document.getElementById('shutter-sound');
const countdownEl = document.getElementById('countdown');

const photoFrames = [
  document.getElementById('photo1'),
  document.getElementById('photo2'),
  document.getElementById('photo3'),
  document.getElementById('photo4'),
  document.getElementById('photo5'),
  document.getElementById('photo6')
];

let photoIndex = 0;

// Start camera
async function startCamera() {
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = cameraStream;
  } catch (error) {
    alert('Camera access denied or not available.');
    console.error(error);
  }
}

// Countdown
function startCountdown(callback) {
  let count = 3;
  countdownEl.style.opacity = 1;
  countdownEl.textContent = count;

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownEl.textContent = count;
    } else {
      clearInterval(interval);
      countdownEl.style.opacity = 0;
      callback();
    }
  }, 800);
}

// Capture Photo
captureBtn.addEventListener('click', () => {
  if (!cameraStream) return;

  startCountdown(() => {
    video.classList.add('flash');
    setTimeout(() => video.classList.remove('flash'), 600);

    shutterSound.currentTime = 0;
    shutterSound.play();

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');

    // Mirror image
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/png');

    if (photoIndex < photoFrames.length) {
      const frame = photoFrames[photoIndex];
      frame.style.backgroundImage = `url(${imageData})`;
      frame.classList.add('captured');
      photoIndex++;
    } else {
      alert('All photo frames are filled!');
    }
  });
});

retakeBtn.addEventListener('click', () => {
  if (photoIndex > 0) {
    photoIndex--;
    const frame = photoFrames[photoIndex];

    // Add removal animation
    frame.classList.add('removing');

    // Wait for animation end, then reset
    frame.addEventListener('animationend', () => {
      frame.classList.remove('removing', 'captured');
      frame.style.backgroundImage = '';
    }, { once: true });

  } else {
    alert('No photos to retake yet!');
  }
});

startCamera();
