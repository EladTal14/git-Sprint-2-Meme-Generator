'use strict'
var gCanvas;
var gCtx;
var gImg

function init() {
  gCanvas = document.querySelector('#my-canvas');
  gCtx = gCanvas.getContext('2d');
  onSetFilter();
  addEventsToInput();
  resetGctx();
  _createMeme();
}


function onSetFilter(filterBy) {
  setFilter(filterBy);
  renderPictures();
}

function renderPictures() {
  var images = getImgsforDisplay();
  var strHTMLs = images.map(img => {
    return `<img src="${img.url}" onclick="drawImg(${img.id})"/>`
  })
  var gallery = document.querySelector('.gallery-main');
  gallery.innerHTML = strHTMLs.join('');
}

function openGallery() {
  var workSpace = document.querySelector('.working-space');
  workSpace.classList.remove('flex');
  var gallery = document.querySelector('.gallery');
  gallery.hidden = false;
  renderPictures();
  resetGctx();
}

function openWorkSpace() {
  var workSpace = document.querySelector('.working-space');
  workSpace.classList.add('flex');
  var gallery = document.querySelector('.gallery');
  gallery.hidden = true;
}


function drawImg(id) {
  openWorkSpace();
  var text = document.querySelector('.text');
  text.value = ''
  var imgFromBack = getImg(id);
  var img = new Image();
  img.src = imgFromBack.url;
  gImg = img
  gImg.onload = () => {
    drawMeme()
  }

}

function addEventsToInput() {
  var text = document.querySelector('.text')
  text.addEventListener('keydown', drawMeme)
  text.addEventListener('keyup', drawMeme)
  text.addEventListener('change', drawMeme)
}

function getCanvas() {
  return gCanvas
}

function drawMeme() {
  var fontFamily = document.querySelector('#fontChange').value
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height);
  gCtx.strokeStyle = 'black';
  gCtx.textBaseline = 'top';
  var text = document.querySelector('.text').value;
  changeLineProp(text, getFontSize(), gCtx.textAlign, gCtx.fillStyle);
  var meme = getMeme()
  text = text.toUpperCase();
  for (var line in meme.lines) {
    wrapText(gCtx, meme.lines[line].txt, meme.lines[line].position.x, meme.lines[line].position.y, getFontSize());
  }
}

function wrapText(context, text, x, y, lineHeight, fromBottom) {

  // var pushMethod = (fromBottom) ? 'unshift' : 'push';
  var pushMethod = 'push'
  // lineHeight = (fromBottom) ? -lineHeight : lineHeight;

  var lines = [];
  var y = y;
  var line = '';
  var words = text.split(' ');

  for (var n = 0; n < words.length; n++) {
    var testLine = line + ' ' + words[n];
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;

    if (testWidth > gCanvas.width - 30) {
      lines[pushMethod](line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  for (var k in lines) {
    context.strokeText(lines[k], x, y + lineHeight * k);
    context.fillText(lines[k], x, y + lineHeight * k);
  }
}

function addLine() {
  var text = document.querySelector('.text').value
  addMemeLine(text, getFontSize(), gCtx.textAlign, gCtx.strokeStyle)
  document.querySelector('.text').value = ''
}

// to util
function getFontSize() {
  var digitReg = /([0-9])\d?/g;
  var res = (gCtx.font).toString().match(digitReg);
  return +res
}

function changeColor(val) {
  gCtx.fillStyle = `${val}`
  drawMeme()
}

function changeFontSize(op) {
  var addToFontSize = 2;
  var res = getFontSize()
  if (op === '+') {
    gCtx.font = `${res+addToFontSize}px impact`;
    drawMeme();
  } else {
    if (res === 0) return
    drawMeme();
    gCtx.font = `${res-addToFontSize}px impact`;
  }
}

function changeAlign(val) {
  gCtx.textAlign = `${val}`;
  drawMeme()
}

function resetGctx() {
  gCtx.font = '20px impact'
  gCtx.textAlign = 'center'
  gCtx.lineWidth = 4;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = 'white';
  gCtx.textBaseline = 'top';
  _createMeme()
}


function pressCanvas(ev) {
  var {
    offsetX,
    offsetY
  } = ev
  console.log(offsetX, offsetY);
}