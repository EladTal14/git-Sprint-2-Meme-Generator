'use strict'
var gKeywords = {
  'happy': 12,
  'funny': 1
}

var gImgs = [{
  id: 1,
  url: 'images/1.jpg',
  keywords: ['happy', 'funny', 'man']
}];

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [{
    txt: 'I never eat Falafel',
  }]
};
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