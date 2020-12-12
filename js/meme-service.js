'use strict'
var gKeywords

function _createKeywords() {
  gKeywords = {
    'happy': 12,
    'funny': 1,
    'sad': 10,
    'men': 6,
    'awesome': 7
  }
}
var gImgs = [{
  id: 1,
  url: 'images/1.jpg',
  keywords: ['happy', 'funny', 'men']
}, {
  id: 2,
  url: 'images/2.jpg',
  keywords: ['awesome', 'sad']
}, {
  id: 3,
  url: 'images/3.jpg',
  keywords: ['happy', 'funny', 'men']
}, {
  id: 4,
  url: 'images/4.jpg',
  keywords: ['awesome', 'sad']
}, {
  id: 5,
  url: 'images/5.jpg',
  keywords: ['happy', 'funny', 'man']
}, {
  id: 6,
  url: 'images/6.jpg',
  keywords: ['awesome', 'sad']
}, {
  id: 7,
  url: 'images/7.jpg',
  keywords: ['happy', 'funny', 'men']
}, {
  id: 8,
  url: 'images/8.jpg',
  keywords: ['awesome', 'sad']
}, {
  id: 9,
  url: 'images/9.jpg',
  keywords: ['happy', 'funny', 'men']
}, {
  id: 10,
  url: 'images/10.jpg',
  keywords: ['awesome', 'sad']
}, {
  id: 11,
  url: 'images/11.jpg',
  keywords: ['happy', 'funny', 'men']
}, {
  id: 12,
  url: 'images/12.jpg',
  keywords: ['awesome', 'sad']
}, {
  id: 13,
  url: 'images/13.jpg',
  keywords: ['happy', 'funny', 'man']
}, {
  id: 14,
  url: 'images/14.jpg',
  keywords: ['awesome', 'sad']
}, {
  id: 15,
  url: 'images/15.jpg',
  keywords: ['happy', 'funny', 'men']
}, {
  id: 16,
  url: 'images/16.jpg',
  keywords: ['awesome', 'sad']
}];

var gMeme;
var gFilterBy;

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


function getImg(idx) {
  var choosenImg = gImgs.find(img => {
    return img.id === idx;
  })

  return choosenImg
};

function setFilter(filterBy) {
  if (!filterBy) {
    gFilterBy = ''
    return gKeywords
  }
  gFilterBy = filterBy.toLowerCase();
  Object.keys(gKeywords).forEach(word => {
    if (word === gFilterBy) {
      gKeywords[word]++;
    }
  });
  return gKeywords
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