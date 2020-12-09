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
}];

var gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [{
      txt: 'enter text'
    },
    {
      txt: 'enter text',
    }
  ]
};

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