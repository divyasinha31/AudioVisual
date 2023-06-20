// Fetching elements from the view
let uploadBtn = document.getElementById("upload-btn");
let container = document.querySelector(".container");
let error = document.getElementById("error");
let canvas = document.getElementById("visual");
let audio = document.getElementById("audio");

class CanvasCreator {
	createCanvas(audioFile) {
		audio.src = URL.createObjectURL(audioFile);

		const audioContext = new AudioContext();
		const audioAnalyser = audioContext.createAnalyser();
		const audioSource = audioContext.createMediaElementSource(audio);
		audioSource.connect(audioAnalyser);
		audioAnalyser.connect(audioContext.destination);

		const bufferLength = audioAnalyser.frequencyBinCount;
		const dataArr = new Uint8Array(bufferLength);

		container.style.display = "none";
		canvas.style.display = "block";

		function renderFrame() {
			const canvasContext = canvas.getContext("2d");
			const canvasWidth = canvas.width;
			const canvasHeight = canvas.height;

			const barWidth = (canvasWidth / bufferLength) * 13;

			let barHeight;
			let x = 0;

			requestAnimationFrame(renderFrame);

			audioAnalyser.getByteFrequencyData(dataArr);

			canvasContext.fillStyle = "#00122e";
			canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

			let r, g, b;
			let bars = 80 // Number of bars to be displayed per frame

			for (let i = 0; i < bars; i++) {
				barHeight = (dataArr[i] * 2.5);
		
				if (dataArr[i] > 210){ // Pink
					r = 250
					g = 0
					b = 255
				} else if (dataArr[i] > 200){ // Yellow
					r = 250
					g = 255
					b = 0
				} else if (dataArr[i] > 190){ // Green
					r = 204
					g = 255
					b = 0
				} else if (dataArr[i] > 180){ // Cyan
					r = 0
					g = 219
					b = 131
				} else { // Blue
					r = 0
					g = 199
					b = 255
				}
		
				canvasContext.fillStyle = `rgb(${r},${g},${b})`;
				canvasContext.fillRect(x, (500 - barHeight), barWidth, barHeight);
		
				x += barWidth + 10
			}
		}

		audio.play();
		renderFrame();
	}
}

// Upload button
uploadBtn.onchange =  () => {
	const audioFile = uploadBtn.files[0];
	const creator = new CanvasCreator();
	creator.createCanvas(audioFile);
};

container.addEventListener(
  "dragenter",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.add("active");
  },
  false
);

container.addEventListener(
  "dragover",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.add("active");
  },
  false
);

container.addEventListener(
  "dragleave",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.remove("active");
  },
  false
);

container.addEventListener(
  "drop",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.remove("active");
		const audioFile = e.dataTransfer.files[0];
		const creator = new CanvasCreator();
		creator.createCanvas(audioFile);
  },
  false
);

window.onload = () => {
  error.innerText = "";
	canvas.style.display = "none";
	// Handle file type error
	// Handle multiple file error
};

