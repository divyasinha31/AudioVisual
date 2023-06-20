# AudioVisual
UI Project for Acceldata

## Initial plan
1. Make a drag and drop file upload container
2. Use Web audio API by JS to visualize the audio
3. Handle errors
4. Beautify canvas to make the visulaizations aesthetic

---

## Project Details
1. view.html - This file includes the view seen on the browser with all the elements.
- The "container" div is responsible for uploading file and displaying errors if any.
- The "canvas" tag is responsible for displaying the visualization post the audio file is uploaded.
- The "audio" tag is responsible for controlling the uploaded audio file for various actions.

2. style.css - This file has all the styles added to the UI elements.
- It includes styles for ids and classes.

3. script.js - This file holds the functionality to the UI elements.
- The class "CanvasCreator" is responsible for creating the canvas on the browser.
- The class "ErrorHandler" is responsible for displaying error messages for different errors.
- An "onchange" event is added to the file upload input.
- Event listeners are added to the "container" div for adding styles and checking when the file has been dropped.