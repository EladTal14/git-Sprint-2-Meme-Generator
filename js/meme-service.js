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

var gMeme;

function _createMeme() {
  var canvas = getCanvas()
  gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
      position: {
        x: canvas.width / 2,
        y: 30
      }
    }]
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

function changeLineProp(txt, size, align, color) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
  gMeme.lines[gMeme.selectedLineIdx].size = size
  gMeme.lines[gMeme.selectedLineIdx].align = align
  gMeme.lines[gMeme.selectedLineIdx].color = color


}


function addMemeLine(txt, size, align, color) {
  var canvas = getCanvas()
  gMeme.selectedLineIdx = gMeme.lines.length
  if (gMeme.lines.length === 1) {
    gMeme.lines.push({
      txt,
      size,
      align,
      color,
      position: {
        x: canvas.width / 2,
        y: canvas.height - 50
      }
    })
  } else {
    gMeme.lines.push({
      txt,
      size,
      align,
      color,
      position: {
        x: canvas.width / 2,
        y: canvas.height / 2
      }
    })
  }

}

function changeLines() {
  var num
  if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0
  } else if (gMeme.selectedLineIdx >= 0) {
    num = 1
    gMeme.selectedLineIdx += num
  }
}

function clickedOnLine(lineClicked) {
  gMeme.selectedLineIdx = gMeme.lines.findIndex(line => {
    return line.position.x === lineClicked.position.x && line.position.y === lineClicked.position.y
  })
}

function removeLine() {

  if (gMeme.lines.length === 0) return -1
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  if (gMeme.selectedLineIdx === 0 && gMeme.lines.length > 0) return gMeme.selectedLineIdx = gMeme.lines.length - 1;
  if (gMeme.selectedLineIdx > 0) return gMeme.selectedLineIdx--;

}