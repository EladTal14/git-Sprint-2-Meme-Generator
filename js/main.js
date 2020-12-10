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

function getCanvas() {
  return gCanvas
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


function drawMeme() {

  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height);

  var text = document.querySelector('.text').value;
  text = text.toUpperCase();
  changeLineProp(text, getFontSize(), gCtx.textAlign, gCtx.fillStyle);
  var meme = getMeme()
  for (var line in meme.lines) {
    // console.log(meme.lines[line].txt, meme.lines[line].position.x, meme.lines[line].position.y, meme.lines[line].size);
    wrapText(meme.lines[line].txt, meme.lines[line].position.x, meme.lines[line].position.y, meme.lines[line].size);
  }
}

function wrapText(text, x, y, lineHeight) {
  var lines = [];
  var y = y;
  var line = '';
  var words = text.split(' ');

  for (var n = 0; n < words.length; n++) {
    var testLine = line + ' ' + words[n];
    var metrics = gCtx.measureText(testLine);
    // console.log(metrics);
    var testWidth = metrics.width;

    if (testWidth > gCanvas.width - 30) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  // console.log(lines);
  for (var k in lines) {
    gCtx.strokeText(lines[k], x, y + lineHeight * k);
    gCtx.fillText(lines[k], x, y + lineHeight * k);
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

function getFontFamily() {
  var digitReg = /( )\w+/g;
  var res = (gCtx.font).toString().match(digitReg);
  var res = res.join(' ')
  console.log(res);
  return res
}

function changeColor(val) {
  gCtx.fillStyle = `${val}`
  drawMeme()
}

function changeFontSize(op) {
  var addToFontSize = 2;
  var fontSize = getFontSize();
  var fontFamily = getFontFamily()
  if (fontSize === 0) return;
  if (op === '+') {
    gCtx.font = `${fontSize+addToFontSize}px ${fontFamily}`;
    drawMeme();
  } else {
    drawMeme();
    gCtx.font = `${fontSize-addToFontSize}px ${fontFamily}`;
  }
}

function changeFontFamily(val) {
  console.log(val);
  gCtx.font = `${getFontSize()}px ${val}`
  drawMeme();
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
  gCtx.strokeStyle = 'black';
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

function onChangeLines() {
  changeLines()
  document.querySelector('.text').value = '';

}