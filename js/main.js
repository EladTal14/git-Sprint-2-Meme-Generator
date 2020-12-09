'use strict'
var gCanvas;
var gCtx;
var gImg

function init() {
  gCanvas = document.querySelector('#my-canvas');
  gCtx = gCanvas.getContext('2d');
  onSetFilter()

}



// function drawText(text, x = 100, y = 100) {
//   if (!text) updateTxtMeme('')
//   gCtx.strokeStyle = 'red';
//   gCtx.font = 'small-caps 700 40px impact';
//   gCtx.textAlign = 'center';
//   gCtx.fillText(text, x, y);
//   gCtx.strokeText(text, x, y);
// }



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
  workSpace.hidden = true;
  var gallery = document.querySelector('.gallery');
  gallery.hidden = false;
  renderPictures()
}

function openWorkSpace() {
  var workSpace = document.querySelector('.working-space');
  workSpace.hidden = false;
  var gallery = document.querySelector('.gallery');
  gallery.hidden = true;
}


function drawImg(id) {
  openWorkSpace()
  var text = document.querySelector('.text');
  text.value = ''
  var imgFromBack = getImg(id);
  var img = new Image();
  img.src = imgFromBack.url;
  var meme = getMeme();
  gImg = img
  // console.log(img);
  gImg.onload = () => {
    drawMeme()

    // gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    // drawText(meme.lines[0].txt, 250, 100);
    // drawText(meme.lines[1].txt, 250, 400);
  }

}

function addEventsToInput() {
  var topText = document.querySelector('.text')
  topText.addEventListener('keydown', drawMeme)
  topText.addEventListener('keyup', drawMeme)
  topText.addEventListener('change', drawMeme)
}

function drawMeme() {
  addEventsToInput()
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);

  gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height);

  gCtx.lineWidth = 4;
  gCtx.font = '40px impact';
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = 'white';
  gCtx.textAlign = 'center';
  gCtx.textBaseline = 'top';

  var text = document.querySelector('.text').value;
  text = text.toUpperCase();
  var x = gCanvas.width / 2;
  var y = 0;
  wrapText(gCtx, text, x, y, 300, 28, false);
  // ctx.textBaseline = 'bottom';
  // var text2 = document.getElementById('bottom-text').value;
  // text2 = text2.toUpperCase();
  // y = memeSize;

}

function wrapText(context, text, x, y, maxWidth, lineHeight, fromBottom) {

  var pushMethod = (fromBottom) ? 'unshift' : 'push';

  lineHeight = (fromBottom) ? -lineHeight : lineHeight;

  var lines = [];
  var y = y;
  var line = '';
  var words = text.split(' ');

  for (var n = 0; n < words.length; n++) {
    var testLine = line + ' ' + words[n];
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;

    if (testWidth > maxWidth) {
      lines[pushMethod](line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines[pushMethod](line);

  for (var k in lines) {
    context.strokeText(lines[k], x, y + lineHeight * k);
    context.fillText(lines[k], x, y + lineHeight * k);
  }


}