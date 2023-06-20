// Fetching elements from the view
let uploadBtn = document.getElementById("upload-btn");
let container = document.querySelector(".container");
let error = document.getElementById("error");

// Upload button
uploadBtn.addEventListener("change", () => {
	console.log('---- Name ----', uploadBtn.files[0].name)
});

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
  "dragover",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.add("active");
  },
  false
);

container.addEventListener(
  "drop",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.remove("active");
  },
  false
);

window.onload = () => {
  error.innerText = "";
	// Handle file type error
	// Handle multiple file error
};
