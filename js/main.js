'use strict'
var gCanvas;
var gCtx;
var gImg;

function init() {
  gCanvas = document.querySelector('#my-canvas');
  gCtx = gCanvas.getContext('2d');
  createKeywords();
  onSetFilter();
  addEventsToInput();
  resetGctx();
  createMeme(gCanvas.width);
  document.querySelector('.gallery-btn').classList.add('gallery-on')

}

function toggleMenu() {
  if (window.innerWidth > 800) return
  var mainMenu = document.getElementById('mainMenu');
  mainMenu.classList.toggle('open');
}



function onSetFilter(filterBy) {
  var keywords = setFilter(filterBy);
  var elAInList = document.querySelectorAll('.ul-words li a');
  elAInList.forEach(elA => {
    if (+keywords[elA.text.toLowerCase()] < 15) elA.style.fontSize = `${+keywords[elA.text.toLowerCase()]+20}px`
  })
  renderPictures();
}

function renderPictures() {
  var images = getImgsforDisplay();
  var strHTMLs = images.map(img => {
    return `<img src="${img.url}" onclick="drawImg(${img.id})"/>`
  })
  var elGallery = document.querySelector('.gallery-main');
  elGallery.innerHTML = strHTMLs.join('');
}

function openGallery() {
  var workSpace = document.querySelector('.working-space');
  workSpace.classList.remove('flex');
  var gallery = document.querySelector('.gallery');
  gallery.hidden = false;
  var elGalleryBtn = document.querySelector('.gallery-btn')
  if (!gallery.hidden) elGalleryBtn.classList.add('gallery-on')
  renderPictures();
  resetGctx();
}

function openWorkSpace() {
  var workSpace = document.querySelector('.working-space');
  workSpace.classList.add('flex');
  var gallery = document.querySelector('.gallery');
  gallery.hidden = true;
  var elGalleryBtn = document.querySelector('.gallery-btn')
  elGalleryBtn.classList.remove('gallery-on')
  createMeme(gCanvas.width);
  document.querySelector('.text').value = 'Enter Text'
}


function drawImg(id) {
  openWorkSpace();
  var text = document.querySelector('.text');
  text.value = '';
  var imgFromBack = getImg(id);
  var img = new Image();
  img.src = imgFromBack.url;
  gImg = img;
  gImg.onload = () => {
    drawMeme();
  }

}

function addEventsToInput() {
  var text = document.querySelector('.text');
  text.addEventListener('input', drawMeme);
}


function drawMeme() {
  gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height);
  var text = document.querySelector('.text').value;
  text = text.toUpperCase();
  changeLineProp(text, getFontSize(), gCtx.textAlign, gCtx.fillStyle);
  var meme = getMeme();
  for (var line in meme.lines) {
    wrapText(meme.lines[line].txt, meme.lines[line].position.x, meme.lines[line].position.y, meme.lines[line].size, meme.lines[line].color, meme.lines[line].align);
  }
}

function wrapText(text, x, y, fontSize, fontColor, txtAlign, lineHeight = 20) {
  gCtx.font = `${fontSize}px impact`;
  gCtx.fillStyle = fontColor;
  gCtx.textAlign = txtAlign;
  var lines = [];
  var line = '';
  var words = text.split(' ');
  for (var n = 0; n < words.length; n++) {
    var testLine = line + ' ' + words[n];
    var metrics = gCtx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > gCanvas.width - 30) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  for (var k in lines) {
    gCtx.strokeText(lines[k], x, y + lineHeight * k);
    gCtx.fillText(lines[k], x, y + lineHeight * k);
  }
}

function addLine() {
  var elText = document.querySelector('.text');
  addMemeLine(elText.value, getFontSize(), gCtx.textAlign, gCtx.strokeStyle, gCanvas.width, gCanvas.height);
  document.querySelector('.text').value = 'Enter Text';
  elText.focus()
  var meme = getMeme();
  focusLine(meme.lines[meme.lines.length - 1]);
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
  return res
}

function changeColor(val) {
  gCtx.fillStyle = `${val}`
  var elBtn = document.querySelector('.color-btn')
  elBtn.style.backgroundColor = `${val}`
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
  drawMeme();
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
  createMeme();
}

function pressLine(ev) {
  var {
    offsetX,
    offsetY
  } = ev;
  var meme = getMeme();
  var clickedLine = meme.lines.find(line => {
    var text = line.txt;
    var lineHeight = line.size;
    var lineWidth = gCtx.measureText(text).width;
    return offsetX >= line.position.x - (lineWidth / 2) - 2 && offsetX <= line.position.x + (lineWidth / 2) + 2 &&
      offsetY >= line.position.y - (lineHeight * 0.1) && offsetY <= line.position.y + (lineHeight)
  })
  if (clickedLine) {
    focusLine(clickedLine);
    gCanvas.addEventListener('touchmove', gCanvas.dragT = function dragT(event) {
      event.preventDefault()
      clickedLine.position.x = event.offsetX;
      clickedLine.position.y = event.offsetY;
      drawMeme()
    }, false)

    gCanvas.addEventListener('mousemove', gCanvas.drag = function drag(event) {
      clickedLine.position.x = event.offsetX;
      clickedLine.position.y = event.offsetY;
      drawMeme()
    }, false)
  } else {
    drawMeme()
  }
}

function onChangeLines() {
  changeLines();
  var meme = getMeme();
  document.querySelector('.text').value = meme.lines[meme.selectedLineIdx].txt.toLowerCase();
  document.querySelector('.text').focus();
}

function focusLine(clickedLine) {
  drawMeme();
  gCtx.beginPath();
  gCtx.strokeStyle = 'black';
  gCtx.rect(clickedLine.position.x - (gCtx.measureText(clickedLine.txt).width / 2) - (clickedLine.size / 2), clickedLine.position.y - (clickedLine.size / 2), gCtx.measureText(clickedLine.txt).width * 1.2 + 15, clickedLine.size * 1.2 + 15);
  gCtx.stroke();
  clickedOnLine(clickedLine);
  document.querySelector('.text').value = clickedLine.txt.toLowerCase();
}

function onRemoveLine() {

  if (!removeLine()) {
    addLine()
    document.querySelector('.text').value = '';
  }
  document.querySelector('.text').focus();

  var meme = getMeme();
  if (meme.lines.length === 0) return
  gCtx.beginPath();
  gCtx.strokeStyle = 'black';
  gCtx.rect(meme.lines[meme.selectedLineIdx].position.x - (gCtx.measureText(meme.lines[meme.selectedLineIdx].txt).width / 2) - (meme.lines[meme.selectedLineIdx].size / 2), meme.lines[meme.selectedLineIdx].position.y - (meme.lines[meme.selectedLineIdx].size / 2), gCtx.measureText(meme.lines[meme.selectedLineIdx].txt).width * 1.2 + 15, meme.lines[meme.selectedLineIdx].size * 1.2 + 15);
  gCtx.stroke();
  document.querySelector('.text').value = meme.lines[meme.selectedLineIdx].txt.toLowerCase();
  drawMeme();

}

function keepPosition(ev) {
  var {
    offsetX,
    offsetY
  } = ev;
  gCanvas.removeEventListener('mousemove', gCanvas.drag, false);
  gCanvas.removeEventListener('touchmove', gCanvas.dragT, false);
}

function logoBounce() {
  var logo = document.querySelector('.logo')
  logo.classList.add('animate__animated', 'animate__bounce')
  setTimeout(() => {
    logo.classList.remove('animate__animated', 'animate__bounce')
  }, 2000);
}

function downloadImg(elLink) {
  var imgContent = gCanvas.toDataURL('image/jpeg');
  elLink.href = imgContent
}

function openModal() {
  var elModal = document.querySelector(".modal");
  elModal.style.display = "block";
}

function closeModal() {
  var elModal = document.querySelector(".modal");
  elModal.style.display = "none";

}

window.onclick = function (event) {
  var elModal = document.querySelector('.modal');
  if (event.target === elModal) {
    elModal.style.display = 'none';
  }
}