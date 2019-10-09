console.log('starting the app!');

const closePopup = () => {
  var popup = document.querySelector('#onstart-popup');
  var outer = document.querySelector('#outer-popup');
  popup.style.display = 'none';
  outer.style.display = 'none';
};

//creating a canvas
const createCanvas = () => {
  const canvasDiv = document.querySelector('#canvasDiv');
  const canvas = document.createElement('canvas');
  const clearBtn = document.getElementById('clear');
  const eraseBtn = document.getElementById('erase');
  const saveBtn = document.getElementById('save');
  let canvasHeight = window.innerHeight - 100;
  let canvasWidth = window.innerWidth - 100;
  var clickX = new Array();
  var clickY = new Array();
  var clickDrag = new Array();
  var paint;
  var eraser = false;
  var clickColor = new Array();
  var strokeColor = '#000';

  clearBtn.addEventListener('click', function(e) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    clickX = [];
    clickY = [];
    clickDrag = [];
    paint = false;
  });

  canvas.setAttribute('id', 'canvas');
  canvas.setAttribute('width', canvasWidth);
  canvas.setAttribute('height', canvasHeight);
  canvas.setAttribute('class', 'border');
  canvas.setAttribute('background-color', '#cb3594');
  canvasDiv.appendChild(canvas);

  if (typeof G_vmlCanvasManager != 'undefined') {
    canvas = G_vmlCanvasManager.initElement(canvas);
  }
  context = canvas.getContext('2d');
  context.fillStyle = '#fff';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    if (eraser) {
      clickColor.push('white');
    } else {
      clickColor.push(strokeColor);
    }
  }

  function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    context.strokeStyle = '#000';
    context.lineJoin = 'round';
    context.lineWidth = 5;

    for (var i = 0; i < clickX.length; i++) {
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1], clickY[i - 1]);
      } else {
        context.moveTo(clickX[i] - 1, clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();
      context.strokeStyle = clickColor[i];
      context.stroke();
    }
  }

  saveBtn.addEventListener('click', () => {
    var dataURL = canvas.toDataURL('image/jpeg', 1.0);
    let savedImg = document.getElementById('savedImg');
    savedImg.setAttribute('src', dataURL);
  });

  eraseBtn.addEventListener('click', () => {
    eraser = !eraser;
  });

  canvas.addEventListener('mousedown', function(e) {
    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
  });

  canvas.addEventListener('mousemove', function(e) {
    if (paint) {
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw();
    }
  });

  canvas.addEventListener('mouseup', function(e) {
    paint = false;
    redraw();
  });
};

createCanvas();
