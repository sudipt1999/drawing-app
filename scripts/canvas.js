const canvasDiv = document.querySelector("#canvasDiv");
const canvas = document.createElement("canvas");
const clearBtn = document.getElementById("clear");
const saveBtn = document.getElementById("save");

let canvasHeight = window.innerHeight - 100;
let canvasWidth = window.innerWidth - 100;
let clickX = [];
let clickY = [];
let clickDrag = [];
let paint;

clearBtn.addEventListener("click", function(e) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  clickX = [];
  clickY = [];
  clickDrag = [];
  paint = false;
});

canvas.setAttribute("id", "canvas");
canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight);
canvas.setAttribute("class", "border");
canvas.setAttribute("background-color", "#cb3594");
canvasDiv.appendChild(canvas);

if (typeof G_vmlCanvasManager != "undefined") {
  canvas = G_vmlCanvasManager.initElement(canvas);
}
let context = canvas.getContext("2d");
context.fillStyle = "#fff";
context.fillRect(0, 0, context.canvas.width, context.canvas.height);

function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  context.fillStyle = "#fff";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  context.strokeStyle = "#000";
  context.lineJoin = "round";
  context.lineWidth = 5;

  for (let i = 0; i < clickX.length; i++) {
    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      context.moveTo(clickX[i] - 1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.stroke();
  }
}

saveBtn.addEventListener("click", () => {
  const dataURL = canvas.toDataURL("image/jpeg", 1.0);
  const savedImg = document.getElementById("savedImg");
  savedImg.setAttribute("src", dataURL);
});

canvas.addEventListener("mousedown", function(e) {
  const mouseX = e.pageX - this.offsetLeft;
  const mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(mouseX, mouseY);
  redraw();
});

canvas.addEventListener("mousemove", function(e) {
  if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

canvas.addEventListener("mouseup", function(e) {
  paint = false;
});
