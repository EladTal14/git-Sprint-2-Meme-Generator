'use strict'
var gCanvas;
var gCtx;

function init() {
  gCanvas = document.querySelector('#my-canvas');
  gCtx = gCanvas.getContext('2d');
}

function drawImg(id) {
  openWorkSpace()
  var text = document.querySelector('.text').value;
  var imgFromBack = getImg(id);
  var img = new Image();
  img.src = imgFromBack.url;
  console.log(img);
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawText(text, 100, 100);
  }
}

function drawText(text, x = 100, y = 100) {
  gCtx.strokeStyle = 'red';
  gCtx.font = 'italic small-caps 900 40px serif';
  gCtx.textAlign = 'center';
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function openGallery() {
  var workSpace = document.querySelector('.working-space');
  workSpace.hidden = true;
  var gallery = document.querySelector('.gallery');
  console.log(gallery);
  gallery.hidden = false;
  renderPictures()
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

function openWorkSpace() {
  var workSpace = document.querySelector('.working-space');
  workSpace.hidden = false;
  var gallery = document.querySelector('.gallery');
  console.log(gallery);
  gallery.hidden = true;
}