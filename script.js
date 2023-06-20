// Fetching elements from the view
let uploadBtn = document.getElementById("upload-btn");
let container = document.querySelector(".container");
let error = document.getElementById("error");
let canvas = document.getElementById("visual");
let audio = document.getElementById("audio");

// Class to create the visual for the audio file
class CanvasCreator {
	createCanvas(audioFile) {
		audio.src = URL.createObjectURL(audioFile);	// Setting the source to the audio controller

		const audioContext = new AudioContext();
		const audioAnalyser = audioContext.createAnalyser();
		const audioSource = audioContext.createMediaElementSource(audio);
		audioSource.connect(audioAnalyser);
		audioAnalyser.connect(audioContext.destination);

		const bufferLength = audioAnalyser.frequencyBinCount;
		const dataArr = new Uint8Array(bufferLength);

		// Removing the file upload container and displaying the canvas
		container.style.display = "none";
		canvas.style.display = "block";

		// Function to render canvas with colourful bars
		function renderCanvas() {
			const canvasContext = canvas.getContext("2d");
			const canvasWidth = canvas.width;
			const canvasHeight = canvas.height;

			const barWidth = (canvasWidth / bufferLength) * 10;

			let barHeight;
			let x = 0;

			requestAnimationFrame(renderCanvas); // Method to get an updated animation before the next one.

			audioAnalyser.getByteFrequencyData(dataArr);

			canvasContext.fillStyle = "#00122e";
			canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

			let r, g, b;
			let bars = 80 // Number of bars to be displayed per frame

			// Setting colours to the bars
			for (let i = 0; i < bars; i++) {
				barHeight = (dataArr[i] * 2.5);
		
				if (dataArr[i] > 210){ // Pink
					r = 250;
					g = 0;
					b = 255;
				} else if (dataArr[i] > 200){ // Yellow
					r = 250;
					g = 255;
					b = 0;
				} else if (dataArr[i] > 190){ // Green
					r = 205;
					g = 255;
					b = 0;
				} else if (dataArr[i] > 180){ // Cyan
					r = 0;
					g = 219;
					b = 130;
				} else { // Blue
					r = 0;
					g = 200;
					b = 255;
				}
		
				canvasContext.fillStyle = `rgb(${r},${g},${b})`;
				canvasContext.fillRect(x, (500 - barHeight), barWidth, barHeight);
		
				x += barWidth + 10;
			}
		}

		audio.play();
		renderCanvas();
	}
}

// Class to handle possible errors during uploading of file
class ErrorHandler {
	multipleFileError() {
		error.innerText = "Please upload a single audio file."
	}

	fileMismatchError() {
		error.innerText = "Please upload a file of an audio format."
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
		const files = e.dataTransfer.files;

		if (files.length > 1) {
			const errorHandler = new ErrorHandler();
			errorHandler.multipleFileError();
		} else if (files[0].type.split("/")[0] !== "audio") {
			const errorHandler = new ErrorHandler();
			errorHandler.fileMismatchError();
		} else {
			const audioFile = files[0];
			const creator = new CanvasCreator();
			creator.createCanvas(audioFile);
		}
  },
  false
);

window.onload = () => {
  error.innerText = "";
	canvas.style.display = "none";
};
