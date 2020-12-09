'use strict'
var gKeywords = {
  'happy': 12,
  'funny': 1
}

var gImgs = [{
  id: 1,
  url: 'images/1.jpg',
  keywords: ['happy', 'funny', 'man']
}, {
  id: 2,
  url: 'images/2.jpg',
  keywords: ['alone', 'sad']
}, {
  id: 3,
  url: 'images/3.jpg',
  keywords: ['happy', 'funny', 'man']
}, {
  id: 4,
  url: 'images/4.jpg',
  keywords: ['alone', 'sad']
}, {
  id: 5,
  url: 'images/5.jpg',
  keywords: ['happy', 'funny', 'man']
}, {
  id: 6,
  url: 'images/6.jpg',
  keywords: ['alone', 'sad']
}, {
  id: 7,
  url: 'images/7.jpg',
  keywords: ['happy', 'funny', 'man']
}, {
  id: 8,
  url: 'images/8.jpg',
  keywords: ['alone', 'sad']
}, {
  id: 9,
  url: 'images/9.jpg',
  keywords: ['happy', 'funny', 'man']
}, {
  id: 10,
  url: 'images/10.jpg',
  keywords: ['alone', 'sad']
}, {
  id: 11,
  url: 'images/11.jpg',
  keywords: ['happy', 'funny', 'man']
}, {
  id: 12,
  url: 'images/12.jpg',
  keywords: ['alone', 'sad']
}, {
  id: 13,
  url: 'images/13.jpg',
  keywords: ['happy', 'funny', 'man']
}, {
  id: 14,
  url: 'images/14.jpg',
  keywords: ['alone', 'sad']
}, {
  id: 15,
  url: 'images/15.jpg',
  keywords: ['happy', 'funny', 'man']
}, {
  id: 16,
  url: 'images/16.jpg',
  keywords: ['alone', 'sad']
}];

var gMeme

function _createMeme() {
  gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
  };
}


function updateTxtMeme(text) {
  gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function getMeme() {
  return gMeme;
}
var gFilterBy;

function getImg(idx) {
  var choosenImg = gImgs.find(img => {
    return img.id === idx;
  })

  return choosenImg
};

function setFilter(filterBy) {
  gFilterBy = filterBy;
};

function getImgsforDisplay() {
  if (!gFilterBy) return gImgs;
  var images = gImgs.filter(img => {
    return img.keywords.find(keyword => {
      return keyword.includes(gFilterBy)
    });

  });

  return images;

}

function addMemeLine(txt, size, align, color) {
  gMeme.lines.push({
    txt,
    size,
    align,
    color
  })
}