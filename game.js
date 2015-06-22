'use strict';

var domById = function(id) {
  return document.getElementById(id);
};

var thisLevel = 0;
var lives = 1;
var score = 0;
var lifeCredits = 0;
var chasingGhosts = false;
var monitorRunning = false;

var disabledFlags = {
  move: false,
  player: false,
  enemy1: false,
  enemy2: false,
  enemy3: false,
  enemy4: false,
  enemy5: false,
  enemy6: false
};

var killGhostCount = 100;
var thisLevelSet = 0;
var lifeCreditFrequency = 15000;
var controlSelection = 0;
var optionCount = 0;
var chaseDecreaseNum = 2;
var disableBlackPiece = false;

var endGameMsgs = [
  'Created By: ',
  'Created By: <a href=\'#\' onClick=\'goToFreewebs();\'>Andrew Morris</a>',
  'Special Thanks: ',
  'Special Thanks: <a href=\'#\' onClick=\'goToDefLogic();\'>Brent Silby</a>',
  'Special Thanks: Merryll-Anne Morris'
];

var endGameMsgCount = 0;
var pauseDisabled = false;

var scoreMultiplier = 1;

function goToFreewebs() {
  window.open('http://www.freewebs.com/javascriptmania');
}

function goToDefLogic() {
  window.open('http://www.def-logic.com/');
}

function setOption(num) {
  if (optionCount === 0) {
    optionCount++;
    controlSelection = num;
    domById('option1').src = 'easyImg.gif';
    domById('option2').src = 'mediumImg.gif';
    domById('option3').src = 'hardImg.gif';
    domById('optionText').innerHTML = 'Select Difficulty Level';
    domById('optionText').style.left = 175;
    domById('scoreNote').style.left = 0;
    domById('scoreNote').style.top = 500;
  } else if (optionCount === 1) {
    domById('scoreNote').style.left = -760;
    domById('optionText').style.left = -760;
    domById('keys0').style.left = -760;
    domById('keys1').style.left = -760;
    domById('keys2').style.left = -760;
    domById('chaseBar').style.left = 230;
    domById('chaseBarFill').style.left = 230;
    lifeCreditFrequency = 6300 * (num + 1);
    scoreMultiplier = num + 1;
    chaseDecreaseNum = num + 3;

    domById('blackTrans').innerHTML = '<img src=\'getReady.gif\'>';
    moveBlackPiece(function() { setUpLevel(0); });
  }
}

var upButtons = [38, 73, 87];
var downButtons = [40, 75, 83];
var leftButtons = [37, 74, 65];
var rightButtons = [39, 76, 68];

var playerTopLeft = null;
var playerNum = 0;

var playerImgArray = [1, 2, 3, 4, 5, 4, 3, 2];

var playerImgCount = 0;

var imageSRCs = [
  'Graphics/blank.gif',
  'Graphics/Dots/smallDot.gif',
  'Graphics/Dots/bigDot.gif',
  'Graphics/Structure/basicH.gif',
  'Graphics/Structure/basicV.gif',
  'Graphics/Structure/cornerTopLeft.gif',
  'Graphics/Structure/cornerTopRight.gif',
  'Graphics/Structure/cornerBottomRight.gif',
  'Graphics/Structure/cornerBottomLeft.gif',
  'Graphics/Structure/tTop.gif',
  'Graphics/Structure/tBottom.gif',
  'Graphics/Structure/tLeft.gif',
  'Graphics/Structure/tRight.gif',
  'Graphics/Structure/cross.gif',
  'Graphics/Structure/endPieceLeft.gif',
  'Graphics/Structure/endPieceRight.gif',
  'Graphics/Structure/endPieceTop.gif',
  'Graphics/Structure/endPieceBottom.gif',
  'Graphics/Structure/independent.gif'
];

var moreImages = [
  'getReady.gif',
  'loading.gif',
  'startUp.gif',
  'congratulations.gif',
  'easyImg.gif',
  'mediumImg.gif',
  'hardImg.gif',
  'coverPiece.gif',
  'coverPiece2.gif',
  'keys0img.gif',
  'keys1img.gif',
  'keys2img.gif',
  'startButton1.gif',
  'startButton2.gif',
  'Graphics/Player/player1left.gif',
  'Graphics/Player/player2left.gif',
  'Graphics/Player/player3left.gif',
  'Graphics/Player/player4left.gif',
  'Graphics/Player/player5left.gif',
  'Graphics/Player/player1right.gif',
  'Graphics/Player/player2right.gif',
  'Graphics/Player/player3right.gif',
  'Graphics/Player/player4right.gif',
  'Graphics/Player/player5right.gif',
  'Graphics/Enemy/enemy1left.gif',
  'Graphics/Enemy/enemy2left.gif',
  'Graphics/Enemy/enemy3left.gif',
  'Graphics/Enemy/enemyRunLeft.gif',
  'Graphics/Enemy/enemy1right.gif',
  'Graphics/Enemy/enemy2right.gif',
  'Graphics/Enemy/enemy3right.gif',
  'Graphics/Enemy/enemyCaptured1.gif',
  'Graphics/Enemy/enemyCaptured2.gif',
  'Graphics/Dots/smallDot.gif',
  'Graphics/Dots/bigDot.gif',
  'Graphics/Scores/100.gif',
  'Graphics/Scores/200.gif',
  'Graphics/Scores/400.gif',
  'Graphics/Scores/800.gif',
  'Graphics/Scores/1600.gif',
  'Graphics/Scores/3200.gif',
  'Graphics/blank.gif'
];

var preloadImages = imageSRCs.concat(moreImages);

for (var n = 0; n < preloadImages.length; n++) {
  document.write(
    '<img src=\'' + preloadImages[n] + '\' galleryimg=\'no\' id=\'temp' + n + '\' ' +
    'style=\'position: absolute; z-index:1; visibility: visible; width:2; height:2; ' +
    'top:-5;left:-5\'>'
  );
}

var imagePosAdders = [
  [0, 0],
  [15, 15],
  [10, 10],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0]
];

var levels = [
  [
    [
      [5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6],
      [4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4],
      [4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4],
      [4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4],
      [4, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 4],
      [4, 1, 0, 1, 0, 14, 3, 3, 3, 3, 3, 3, 3, 15, 0, 1, 0, 1, 4],
      [4, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 4],
      [4, 1, 0, 1, 0, 14, 3, 3, 3, 3, 3, 3, 3, 15, 0, 1, 0, 1, 4],
      [4, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 4],
      [4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4],
      [4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4],
      [4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4],
      [8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
      [[3, 10], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6]]
    ],
    [
      [5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6],
      [4, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 4],
      [4, 1, 5, 6, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 5, 6, 1, 4],
      [4, 1, 8, 7, 1, 0, 0, 0, 1, 16, 1, 0, 0, 0, 1, 8, 7, 1, 4],
      [4, 1, 1, 1, 1, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 1, 1, 4],
      [4, 0, 0, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 0, 0, 4],
      [4, 0, 1, 14, 3, 3, 3, 3, 3, 13, 3, 3, 3, 3, 3, 15, 1, 0, 4],
      [4, 0, 0, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 0, 0, 4],
      [4, 1, 1, 1, 1, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 1, 1, 4],
      [4, 1, 5, 6, 1, 0, 0, 0, 1, 17, 1, 0, 0, 0, 1, 5, 6, 1, 4],
      [4, 1, 8, 7, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 8, 7, 1, 4],
      [4, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 4],
      [8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
      [[6, 11], [1, 1], [17, 1], [7, 3], [11, 3], [7, 1], [11, 1]]
    ],
    [
      [5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6],
      [4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4],
      [4, 1, 5, 10, 10, 10, 10, 10, 6, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4],
      [4, 1, 12, 13, 13, 13, 13, 13, 11, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4],
      [4, 1, 12, 13, 13, 13, 13, 13, 11, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4],
      [4, 1, 8, 9, 9, 9, 9, 9, 7, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 5, 10, 10, 10, 10, 10, 6, 1, 4],
      [4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 12, 13, 13, 13, 13, 13, 11, 1, 4],
      [4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 12, 13, 13, 13, 13, 13, 11, 1, 4],
      [4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 8, 9, 9, 9, 9, 9, 7, 1, 4],
      [4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4],
      [8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
      [[2, 10], [9, 2], [9, 5], [15, 2], [15, 5], [12, 3], [12, 4]]
    ],
    [
      [0, 0, 0, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6, 0, 0, 0],
      [0, 0, 0, 4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 0, 0, 0],
      [0, 0, 0, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 0, 0, 0],
      [5, 3, 3, 7, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 8, 3, 3, 6],
      [4, 1, 1, 1, 1, 0, 0, 1, 16, 1, 16, 1, 0, 0, 1, 1, 1, 2, 4],
      [4, 1, 0, 0, 0, 0, 1, 14, 7, 1, 8, 15, 1, 0, 0, 0, 0, 1, 4],
      [4, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 4],
      [4, 1, 0, 0, 0, 0, 1, 14, 6, 1, 5, 15, 1, 0, 0, 0, 0, 1, 4],
      [4, 2, 1, 1, 1, 0, 0, 1, 17, 1, 17, 1, 0, 0, 1, 1, 1, 1, 4],
      [8, 3, 3, 6, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 5, 3, 3, 7],
      [0, 0, 0, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 0, 0, 0],
      [0, 0, 0, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 0, 0, 0],
      [0, 0, 0, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 0, 0, 0],
      [[3, 6], [12, 3], [12, 6], [12, 9], [16, 5], [16, 6], [16, 7]]
    ],
    [
      [5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6],
      [4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4],
      [4, 1, 5, 3, 3, 3, 6, 1, 0, 0, 0, 1, 5, 3, 3, 3, 6, 1, 4],
      [4, 1, 4, 0, 0, 0, 4, 1, 0, 0, 0, 1, 4, 0, 0, 0, 4, 1, 4],
      [4, 1, 8, 3, 3, 3, 7, 1, 0, 0, 0, 1, 8, 3, 3, 3, 7, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 5, 3, 3, 3, 6, 1, 0, 0, 0, 1, 5, 3, 3, 3, 6, 1, 4],
      [4, 1, 4, 0, 0, 0, 4, 1, 0, 0, 0, 1, 4, 0, 0, 0, 4, 1, 4],
      [4, 1, 8, 3, 3, 3, 7, 1, 0, 0, 0, 1, 8, 3, 3, 3, 7, 1, 4],
      [4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4],
      [8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
      [[4, 11], [8, 2], [8, 10], [10, 2], [10, 10], [13, 6], [16, 6]]
    ],
    [
      [5, 3, 3, 3, 3, 10, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6],
      [4, 2, 1, 0, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 0, 0, 0, 4, 1, 1, 0, 0, 0, 1, 1, 1, 1, 16, 1, 1, 4],
      [4, 0, 0, 0, 0, 17, 1, 0, 0, 0, 0, 0, 1, 1, 14, 13, 15, 1, 4],
      [4, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 17, 1, 1, 4],
      [12, 3, 3, 15, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 14, 3, 3, 11],
      [4, 1, 1, 16, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 4],
      [4, 1, 14, 13, 15, 1, 1, 0, 0, 0, 0, 0, 1, 16, 0, 0, 0, 0, 4],
      [4, 1, 1, 17, 1, 1, 1, 1, 0, 0, 0, 1, 1, 4, 0, 0, 0, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 0, 1, 2, 4],
      [8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 9, 3, 3, 3, 3, 7],
      [[9, 3], [6, 7], [7, 8], [8, 9], [10, 9], [11, 8], [12, 7]]
    ],
    [
      [5, 10, 10, 10, 10, 3, 3, 3, 3, 3, 3, 3, 3, 3, 10, 10, 10, 10, 6],
      [12, 13, 13, 13, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 13, 13, 13, 11],
      [12, 13, 13, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 13, 13, 11],
      [12, 13, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 13, 11],
      [12, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 11],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 14, 3, 3, 3, 3, 3, 15, 2, 14, 3, 3, 3, 3, 3, 15, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [12, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 11],
      [12, 13, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 13, 11],
      [12, 13, 13, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 13, 13, 11],
      [12, 13, 13, 13, 6, 2, 1, 1, 1, 1, 1, 1, 1, 2, 5, 13, 13, 13, 11],
      [8, 9, 9, 9, 9, 3, 3, 3, 3, 3, 3, 3, 3, 3, 9, 9, 9, 9, 7],
      [[9, 11], [3, 3], [15, 3], [9, 3], [13, 1], [9, 1], [5, 1]]
    ],
    [
      [5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6],
      [4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 5, 3, 3, 3, 3, 15, 0, 0, 14, 3, 3, 3, 6, 1, 1, 4],
      [4, 1, 1, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 1, 4],
      [4, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 17, 1, 1, 4],
      [4, 1, 1, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 1, 1, 4],
      [4, 1, 1, 16, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 4],
      [4, 1, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 1, 1, 4],
      [4, 1, 1, 8, 3, 3, 3, 15, 0, 0, 14, 3, 3, 3, 3, 7, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4],
      [8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
      [[1, 11], [14, 4], [9, 4], [4, 4], [16, 2], [9, 2], [2, 2]]
    ],
    [
      [5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4],
      [4, 1, 14, 3, 3, 3, 3, 3, 15, 1, 14, 3, 3, 3, 3, 3, 15, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 14, 3, 3, 3, 3, 3, 15, 1, 14, 3, 3, 3, 3, 3, 15, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 14, 3, 3, 3, 3, 3, 15, 2, 14, 3, 3, 3, 3, 3, 15, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 14, 3, 3, 3, 3, 3, 15, 1, 14, 3, 3, 3, 3, 3, 15, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 14, 3, 3, 3, 3, 3, 15, 1, 14, 3, 3, 3, 3, 3, 15, 1, 4],
      [4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
      [[3, 9], [15, 3], [15, 5], [3, 3], [3, 5], [3, 1], [15, 1]]
    ],
    [
      [5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6],
      [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4],
      [4, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4],
      [4, 0, 1, 1, 1, 1, 5, 3, 3, 3, 3, 3, 15, 1, 1, 1, 1, 0, 4],
      [4, 0, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4],
      [4, 0, 1, 1, 1, 1, 4, 1, 5, 3, 3, 3, 6, 1, 1, 1, 1, 0, 4],
      [4, 0, 1, 1, 1, 1, 4, 1, 4, 2, 1, 1, 4, 1, 1, 1, 1, 0, 4],
      [4, 0, 1, 1, 1, 1, 4, 1, 8, 3, 15, 1, 4, 1, 1, 1, 1, 0, 4],
      [4, 0, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 0, 4],
      [4, 0, 1, 1, 1, 1, 8, 3, 3, 3, 3, 3, 7, 1, 1, 1, 1, 0, 4],
      [4, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4],
      [4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
      [8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
      [[4, 11], [17, 5], [1, 5], [17, 3], [1, 3], [17, 1], [1, 1]]
    ],
    [
      [5, 3, 3, 3, 3, 3, 3, 3, 6, 0, 5, 3, 3, 3, 3, 3, 3, 3, 6],
      [4, 0, 1, 1, 1, 1, 1, 0, 4, 0, 4, 0, 1, 1, 1, 1, 1, 0, 4],
      [4, 1, 1, 0, 0, 0, 1, 1, 4, 0, 4, 1, 1, 0, 0, 0, 1, 1, 4],
      [4, 1, 0, 0, 0, 0, 0, 1, 4, 0, 4, 0, 0, 0, 0, 0, 0, 1, 4],
      [4, 1, 1, 1, 1, 0, 0, 1, 8, 3, 7, 1, 0, 0, 1, 1, 1, 1, 4],
      [8, 3, 3, 6, 1, 0, 0, 1, 1, 2, 1, 1, 0, 0, 1, 5, 3, 3, 7],
      [0, 0, 0, 4, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 4, 0, 0, 0],
      [5, 3, 3, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 3, 3, 6],
      [4, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 4],
      [4, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 4],
      [4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4],
      [4, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 4],
      [8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
      [[9, 11], [1, 11], [7, 1], [17, 11], [17, 1], [11, 1], [1, 1]]
    ],
    [
      [5, 3, 3, 3, 3, 3, 3, 3, 3, 10, 3, 3, 3, 3, 3, 3, 3, 3, 6],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 2, 4],
      [4, 1, 0, 0, 1, 1, 1, 0, 0, 4, 0, 0, 1, 1, 1, 0, 0, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 0, 0, 1, 1, 1, 0, 0, 17, 0, 0, 1, 1, 1, 0, 0, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [12, 3, 3, 3, 3, 3, 3, 15, 0, 2, 0, 14, 3, 3, 3, 3, 3, 3, 11],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 0, 0, 1, 1, 1, 0, 0, 16, 0, 0, 1, 1, 1, 0, 0, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 0, 0, 1, 1, 1, 0, 0, 4, 0, 0, 1, 1, 1, 0, 0, 1, 4],
      [4, 2, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [8, 3, 3, 3, 3, 3, 3, 3, 3, 9, 3, 3, 3, 3, 3, 3, 3, 3, 7],
      [[2, 10], [11, 4], [7, 4], [11, 8], [2, 2], [16, 10], [16, 2]]
    ],
    [
      [5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4],
      [4, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 4],
      [4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4],
      [4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4],
      [4, 1, 17, 1, 17, 1, 4, 1, 17, 1, 17, 1, 4, 1, 17, 1, 17, 1, 4],
      [4, 1, 0, 1, 0, 1, 4, 1, 0, 2, 0, 1, 4, 1, 0, 1, 0, 1, 4],
      [4, 1, 16, 1, 16, 1, 4, 1, 16, 1, 16, 1, 4, 1, 16, 1, 16, 1, 4],
      [4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4],
      [4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4],
      [4, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 4],
      [4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
      [[1, 11], [7, 1], [9, 1], [11, 1], [13, 1], [15, 1], [17, 1]]
    ],
    [
      [5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 18, 1, 16, 1, 14, 3, 3, 3, 3, 3, 15, 1, 16, 1, 18, 1, 4],
      [4, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 4],
      [4, 1, 14, 3, 13, 3, 15, 1, 0, 1, 0, 1, 14, 3, 13, 3, 15, 1, 4],
      [4, 1, 1, 1, 4, 1, 1, 0, 1, 16, 1, 0, 1, 1, 4, 1, 1, 1, 4],
      [4, 1, 18, 1, 4, 1, 0, 1, 14, 13, 15, 1, 0, 1, 4, 1, 18, 1, 4],
      [4, 1, 1, 1, 4, 1, 1, 0, 1, 17, 1, 0, 1, 1, 4, 1, 1, 1, 4],
      [4, 1, 14, 3, 13, 3, 15, 1, 0, 1, 0, 1, 14, 3, 13, 3, 15, 1, 4],
      [4, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 4],
      [4, 1, 18, 1, 17, 1, 14, 3, 3, 3, 3, 3, 15, 1, 17, 1, 18, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
      [[1, 11], [11, 5], [7, 5], [10, 4], [8, 4], [15, 2], [3, 2]]
    ],
    [
      [0, 0, 0, 0, 0, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6],
      [0, 0, 5, 3, 3, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4],
      [0, 0, 4, 1, 1, 4, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 4],
      [0, 0, 4, 1, 1, 4, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 4],
      [5, 3, 7, 1, 1, 17, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 0, 1, 14, 3, 3, 3, 3, 3, 3, 3, 3, 11],
      [4, 2, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4],
      [4, 1, 1, 1, 1, 1, 1, 0, 1, 14, 3, 3, 3, 3, 3, 3, 3, 3, 11],
      [8, 3, 6, 1, 1, 16, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [0, 0, 4, 1, 1, 4, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 4],
      [0, 0, 4, 1, 1, 4, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 4],
      [0, 0, 8, 3, 3, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4],
      [0, 0, 0, 0, 0, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
      [[2, 6], [14, 6], [14, 3], [16, 9], [16, 3], [14, 9], [16, 6]]
    ],
    [
      [5, 3, 3, 3, 10, 3, 3, 3, 3, 3, 3, 3, 3, 3, 10, 3, 3, 3, 6],
      [4, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 2, 4],
      [4, 1, 1, 1, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 4],
      [12, 3, 15, 1, 18, 1, 0, 1, 1, 1, 1, 1, 0, 1, 18, 1, 14, 3, 11],
      [4, 1, 0, 1, 1, 1, 0, 1, 18, 1, 18, 1, 0, 1, 1, 1, 0, 1, 4],
      [4, 1, 0, 0, 0, 0, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0, 0, 1, 4],
      [4, 1, 0, 1, 1, 1, 0, 1, 18, 1, 18, 1, 0, 1, 1, 1, 0, 1, 4],
      [12, 3, 15, 1, 18, 1, 0, 1, 1, 1, 1, 1, 0, 1, 18, 1, 14, 3, 11],
      [4, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 1, 1, 1, 4],
      [4, 2, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 4],
      [8, 3, 3, 3, 9, 3, 3, 3, 3, 3, 3, 3, 3, 3, 9, 3, 3, 3, 7],
      [[2, 6], [12, 5], [11, 2], [13, 2], [16, 5], [14, 5], [9, 2]]
    ],
    [
      [5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4],
      [4, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 18, 1, 18, 1, 18, 1, 18, 2, 18, 1, 18, 1, 18, 1, 18, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 4],
      [4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
      [[3, 11], [13, 5], [15, 5], [11, 5], [15, 3], [11, 3], [13, 3]]
    ],
    [
      [5, 3, 3, 3, 3, 3, 10, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6],
      [4, 0, 0, 0, 0, 0, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [12, 3, 3, 3, 3, 3, 7, 1, 14, 3, 3, 3, 3, 3, 3, 3, 6, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4],
      [4, 1, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6, 1, 4, 1, 4],
      [4, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4, 1, 4],
      [4, 1, 4, 1, 5, 3, 3, 3, 3, 3, 3, 3, 15, 1, 4, 1, 4, 1, 4],
      [4, 1, 4, 1, 4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4, 1, 4],
      [4, 1, 4, 1, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 1, 4, 1, 4],
      [4, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4],
      [4, 1, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
      [[1, 5], [5, 7], [5, 1], [4, 1], [3, 1], [2, 1], [1, 1]]
    ],
    [
      [5, 3, 3, 3, 3, 3, 3, 3, 3, 10, 3, 3, 3, 3, 3, 3, 3, 3, 6],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 17, 1, 1, 1, 1, 1, 1, 1, 2, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [12, 3, 3, 3, 3, 3, 3, 15, 1, 18, 1, 14, 3, 3, 3, 3, 3, 3, 11],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [12, 3, 3, 3, 3, 3, 3, 15, 2, 18, 1, 14, 3, 3, 3, 3, 3, 3, 11],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [12, 3, 3, 3, 3, 3, 3, 15, 1, 18, 1, 14, 3, 3, 3, 3, 3, 3, 11],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 2, 1, 1, 1, 1, 1, 1, 1, 16, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [8, 3, 3, 3, 3, 3, 3, 3, 3, 9, 3, 3, 3, 3, 3, 3, 3, 3, 7],
      [[4, 11], [16, 7], [2, 7], [16, 4], [2, 4], [16, 1], [2, 1]]
    ],
    [
      [5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
      [[1, 11], [11, 7], [7, 7], [14, 4], [4, 4], [17, 1], [1, 1]]
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 3, 3, 3, 6, 5, 3, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 0, 0, 0, 4, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 0, 0, 0, 4, 8, 3, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 8, 3, 3, 3, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [[7, 2], [4, 3], [3, 3], [2, 3], [4, 2], [3, 2], [2, 2]]
    ]
  ]
];

var loop = 0;

while (loop < 13) {
  var loop2 = 0;

  while (loop2 < 19) {
    document.write('<span id=\'cell_' + loop + '_' + loop2 + '\' style=\'position:absolute;left:' + (loop2 * 40) + ';top:' + (loop * 40 + 20) + ';\'></span>');
    loop2++;
  }

  loop++;
}

function setUpLevel(levelNum) {
  levelEdit(levelNum + 1);
  domById('titleDisplayer').style.left = -760;
  if (levelNum === 0) domById('guard').style.left = -760;
  if (levelNum === 20) domById('guard').style.left = 0;

  var loop = 0;
  var pickUpNum = 0;

  while (loop < 13) {
    var loop2 = 0;

    while (loop2 < 19) {
      if (
        levels[thisLevelSet][levelNum][loop][loop2] === 1 ||
        levels[thisLevelSet][levelNum][loop][loop2] === 2
      ) {
        pickUpNum++;
      }

      var cell = domById('cell_' + loop + '_' + loop2);

      cell.innerHTML = (
        '<img src=\'' + imageSRCs[levels[thisLevelSet][levelNum][loop][loop2]] + '\'>'
      );

      cell.style.top = (
        loop * 40 + 20 + imagePosAdders[levels[thisLevelSet][levelNum][loop][loop2]][0]
      );

      cell.style.left = loop2 * 40 + imagePosAdders[levels[thisLevelSet][levelNum][loop][loop2]][1];

      loop2++;
    }

    loop++;
  }

  var fig1 = levels[thisLevelSet][levelNum][13][0];

  player.setLeft(fig1[0]);
  player.setTop(fig1[1]);

  fig1 = levels[thisLevelSet][levelNum][13][1];

  enemy1.setLeft(fig1[0]);
  enemy1.setTop(fig1[1]);

  fig1 = levels[thisLevelSet][levelNum][13][2];

  enemy2.setLeft(fig1[0]);
  enemy2.setTop(fig1[1]);

  fig1 = levels[thisLevelSet][levelNum][13][3];

  enemy3.setLeft(fig1[0]);
  enemy3.setTop(fig1[1]);

  fig1 = levels[thisLevelSet][levelNum][13][4];

  enemy4.setLeft(fig1[0]);
  enemy4.setTop(fig1[1]);

  fig1 = levels[thisLevelSet][levelNum][13][5];

  enemy5.setLeft(fig1[0]);
  enemy5.setTop(fig1[1]);

  fig1 = levels[thisLevelSet][levelNum][13][6];

  enemy6.setLeft(fig1[0]);
  enemy6.setTop(fig1[1]);

  disabledFlags.enemy1 = false;
  disabledFlags.enemy2 = false;
  disabledFlags.enemy3 = false;
  disabledFlags.enemy4 = false;
  disabledFlags.enemy5 = false;
  disabledFlags.enemy6 = false;

  enemy1.setImage('Graphics/Enemy/enemy1right.gif');
  enemy2.setImage('Graphics/Enemy/enemy2left.gif');
  enemy3.setImage('Graphics/Enemy/enemy3right.gif');
  enemy4.setImage('Graphics/Enemy/enemy1left.gif');
  enemy5.setImage('Graphics/Enemy/enemy2right.gif');
  enemy6.setImage('Graphics/Enemy/enemy3left.gif');

  editPickUps(pickUpNum);
  if (levelNum === 0) monitorRunning = true;
}

var gameStarted = false;
var gameFinished = false;

document.onkeydown = keyDown;
document.onkeyup = keyUp;

var leftKeyDown = false;
var upKeyDown = false;
var rightKeyDown = false;
var downKeyDown = false;
var rKeyDown = false;
var eKeyDown = false;

function keyDown() {
  if (event.keyCode === 82) rKeyDown = true;
  if (event.keyCode === 69) eKeyDown = true;
  if (event.keyCode === 80) {
    if (!pauseDisabled) {
      window.alert('-- Pause --\n\nTip: ' + randomTip());
      leftKeyDown = false;
      upKeyDown = false;
      rightKeyDown = false;
      downKeyDown = false;
      rKeyDown = false;
      eKeyDown = false;
      pauseDisabled = true;

      setTimeout(function() {
        pauseDisabled = false;
      }, 100);
    }
  }
  if (event.keyCode === leftButtons[controlSelection]) {
    goLeft();
    leftKeyDown = true;
  }
  if (event.keyCode === upButtons[controlSelection]) {
    goUp();
    upKeyDown = true;
  }
  if (event.keyCode === rightButtons[controlSelection]) {
    goRight();
    rightKeyDown = true;
  }
  if (event.keyCode === downButtons[controlSelection]) {
    goDown();
    downKeyDown = true;
  }

  if (!gameStarted && eKeyDown && rKeyDown) {
    window.alert('You are not allowed to reset the game before\nit has started.');
    leftKeyDown = false;
    upKeyDown = false;
    rightKeyDown = false;
    downKeyDown = false;
    rKeyDown = false;
    eKeyDown = false;
  } else if (gameStarted && eKeyDown && rKeyDown) {
    disableBlackPiece = true;

    setTimeout(function() {
      disableBlackPiece = false;
    }, 500);

    resetGame();
    eKeyDown = false;
    rKeyDown = false;
  }
}

var tips = [
  'Use the \'P\' key to pause your game.',
  (
    'A harder difficulty will give you a better score,\n' +
    'but no score counts unless the game is finished.'
  ),
  (
    'The ghosts only follow you, and don\'t register obstacles.\n' +
    'Control the ghosts, make them go where you want them to\n' +
    'go.'
  ),
  'You can cluster ghosts by moving around 2 or more of them.',
  (
    'The large dots in this game are essential, make sure\n' +
    'you only use them to eat the ghosts for points when\n' +
    'you can manage to collect the rest of the dots.'
  ),
  (
    'Because of a technical difficulty, you need to press\n' +
    'your directional key again AFTER the pause box is\n' +
    'closed.'
  ),
  (
    'For more great games, visit:\n' +
    'JavascriptMania - http://www.freewebs.com/JavascriptMania\n' +
    'OR\n' +
    'Def-Logic Videogames - http://www.def-logic.com',
    'This is a rather complex game, if the game is running\n' +
    'slow, try closing some other open applications and\n' +
    'check that all other user accounts are logged off.'
  ),
  (
    'If you wish to restart the game press E+R instead\n' +
    'of refreshing the browser as this can result in extensive\n' +
    'loading times especially if you are playing the game via the\n' +
    'internet.'
  ),
  'You can use pause to plot strategies for levels.'
];

function randomTip() {
  var ranNum = Math.floor(Math.random() * tips.length);
  return tips[ranNum];
}

function keyUp() {
  if (event.keyCode === 82) rKeyDown = false;
  if (event.keyCode === 69) eKeyDown = false;
  if (event.keyCode === leftButtons[controlSelection]) {
    leftKeyDown = false;
  }
  if (event.keyCode === upButtons[controlSelection]) {
    upKeyDown = false;
  }
  if (event.keyCode === rightButtons[controlSelection]) {
    rightKeyDown = false;
  }
  if (event.keyCode === downButtons[controlSelection]) {
    downKeyDown = false;
  }
}

function checkInteger(num) {
  num = parseFloat(num);
  return (num !== (Math.round(num))) ? false : true;
}

function goUp() {
  if (gameStarted === true && gameFinished === false) {
    if (checkInteger(player.theLeft)) {
      if (!testBlocked(player.theLeft, parseFloat(player.theTop) - 1)) {
        playerNum = -1;
        playerTopLeft = false;
        player.moveTop(-1);
      }
    }
  }
}

function goDown() {
  if (gameStarted === true && gameFinished === false) {
    if (checkInteger(player.theLeft)) {
      if (!testBlocked(player.theLeft, parseFloat(player.theTop) + 1)) {
        playerNum = 1;
        playerTopLeft = false;
        player.moveTop(1);
      }
    }
  }
}

function goLeft() {
  if (gameStarted === true && gameFinished === false) {
    var playerNum = player.imageRef.charAt(22);

    player.setImage('Graphics/Player/Player' + playerNum + 'left.gif');

    if (checkInteger(player.theTop)) {
      if (!testBlocked(parseFloat(player.theLeft) - 1, player.theTop)) {
        playerNum = -1;
        playerTopLeft = true;
        player.moveLeft(-1);
      }
    }
  }
}

function goRight() {
  if (gameStarted === true && gameFinished === false) {
    var playerNum = player.imageRef.charAt(22);

    player.setImage('Graphics/Player/Player' + playerNum + 'right.gif');

    if (checkInteger(player.theTop)) {
      if (!testBlocked(parseFloat(player.theLeft) + 1, player.theTop)) {
        playerNum = 1;
        playerTopLeft = true;
        player.moveLeft(1);
      }
    }
  }
}

function gameEndWin() {
  disabledFlags.move = true;
  gameFinished = true;
  domById('titleDisplayer').style.left = 0;
  domById('titleDisplayer').innerHTML = '<img src=\'congratulations.gif\'>';

  displayCredits();
}

var creditTimeout = 0;
clearTimeout(creditTimeout);

function displayCredits() {
  endGameMsgCount = (endGameMsgCount === endGameMsgs.length) ? 0 : endGameMsgCount;
  domById('creditSpan').style.left = 0;
  domById('creditSpan').innerHTML = endGameMsgs[endGameMsgCount];
  endGameMsgCount++;

  creditTimeout = setTimeout(displayCredits, 2000);
}

function gameEndLose() {
  disableBlackPiece = true;
  disabledFlags.move = true;

  resetGame();
}

function resetGame() {
  domById('creditSpan').innerHTML = '';
  domById('titleDisplayer').innerHTML = '<img src=\'startUp.gif\'>';

  clearTimeout(creditTimeout);

  domById('chaseBarFill').style.width = 0;

  setUpLevel(20);

  levelEdit(1);

  var fig1 = domById('titleBar').innerHTML.split('SCORE: ');
  var fig2 = fig1[1].split('</center>');

  fig2[0] = 0;
  fig2 = fig2.join('');

  domById('titleBar').innerHTML = fig1[0] + 'SCORE: ' + fig2;

  fig1 = domById('titleBar').innerHTML.split('LIVES: ');
  fig2 = fig1[1].split('</center>');
  fig2[0] = 1;
  var fig3 = fig2[0];
  fig2 = fig2.join('');

  domById('titleBar').innerHTML = fig1[0] + 'LIVES: ' + fig2;

  fig1 = domById('titleBar').innerHTML.split('PICK-UPS LEFT: ');
  fig2 = fig1[1].split('</center>');
  fig2[0] = 0;
  fig3 = fig2[0];
  fig2 = fig2.join('');

  domById('titleBar').innerHTML = fig1[0] + 'PICK-UPS LEFT: ' + fig2;

  thisLevel = 0;
  lives = 1;
  score = 0;
  lifeCredits = 0;
  chasingGhosts = false;
  monitorRunning = false;
  killGhostCount = 100;
  thisLevelSet = 0;
  lifeCreditFrequency = 15000;
  controlSelection = 0;
  optionCount = 0;
  chaseDecreaseNum = 2;
  disableBlackPiece = false;
  endGameMsgCount = 0;

  domById('keys0').style.left = 18;
  domById('keys1').style.left = 263;
  domById('keys2').style.left = 508;

  disabledFlags = {
    move: false,
    player: false,
    enemy1: false,
    enemy2: false,
    enemy3: false,
    enemy4: false,
    enemy5: false,
    enemy6: false
  };

  domById('titleDisplayer').style.left = 0;
  domById('keys0').style.left = 18;
  domById('keys1').style.left = 263;
  domById('keys2').style.left = 508;
  domById('option1').src = 'keys0img.gif';
  domById('option2').src = 'keys1img.gif';
  domById('option3').src = 'keys2img.gif';
  domById('optionText').innerHTML = 'Select Your Keys';
  domById('optionText').style.left = 238;
  domById('startButton').style.left = 301;

  gameStarted = false;
  gameFinished = false;
}

function setPlayerImg() {
  playerImgCount = (playerImgCount === playerImgArray.length) ? 0 : playerImgCount;

  var adder = (domById('playerImg').src.indexOf('right') !== -1) ? 'right' : 'left';

  domById('playerImg').src = (
    'Graphics/Player/player' + playerImgArray[playerImgCount] + adder + '.gif'
  );

  player.imageRef = 'Graphics/Player/player' + playerImgArray[playerImgCount] + adder + '.gif';
  playerImgCount++;

  setTimeout(setPlayerImg, 100);
}

var movingPieceMap = {};

function movingPiece(
  objName,
  theLeft,
  theTop,
  XOffSet,
  YOffSet,
  speed,
  spanId,
  imageRef,
  imageId,
  moveEndCommand
) {
  theLeft = parseFloat(theLeft);
  theTop = parseFloat(theTop);
  speed = parseFloat(speed);

  document.write(
    '<span ' +
    'id=\'' + spanId + '\' ' +
    'style=\'position:absolute;' +
    'left:' + (theLeft * 40 + XOffSet) +
    ';top:' + (theTop * 40 + 20 + YOffSet) + ';\'>' +
    '<img id=\'' + imageId + '\' src=\'' + imageRef + '\'>' +
    '</span>'
  );

  this.objName = objName;
  this.theLeft = theLeft;
  this.theTop = theTop;
  this.XOffSet = XOffSet;
  this.YOffSet = YOffSet;
  this.speed = speed;
  this.spanId = spanId;
  this.imageRef = imageRef;
  this.imageId = imageId;
  this.moveEndCommand = moveEndCommand;

  this.setLeft = setLeft;
  this.setTop = setTop;
  this.moveLeft = moveLeft;
  this.moveTop = moveTop;
  this.setImage = setImage;

  movingPieceMap[objName] = this;
}

function setImage(imageRef) {
  this.imageRef = imageRef;
  domById(this.imageId).setAttribute('src', imageRef);
}

function setLeft(theLeft) {
  this.theLeft = theLeft;
  domById(this.spanId).style.left = (theLeft * 40 + this.XOffSet);
}

function setTop(theTop) {
  this.theTop = theTop;
  domById(this.spanId).style.top = (theTop * 40 + 20 + this.YOffSet);
}

function moveLeft(theLeft) {
  if (checkInteger(this.theLeft) && checkInteger(this.theTop)) {
    var speed = (theLeft > 0) ? this.speed : 0 - this.speed;
    moveLeftReal((parseFloat(this.theLeft) + parseFloat(theLeft)), this.objName, speed);
  }
}

function moveTop(theTop) {
  if (checkInteger(this.theTop) && checkInteger(this.theLeft)) {
    var speed = (theTop > 0) ? this.speed : 0 - this.speed;
    moveTopReal((parseFloat(this.theTop) + parseFloat(theTop)), this.objName, speed);
  }
}

var moveTimeouts = {
  player: 0,
  enemy1: 0,
  enemy2: 0,
  enemy3: 0,
  enemy4: 0,
  enemy5: 0,
  enemy6: 0
};

function moveLeftReal(goingTo, objName, speed) {
  if (!disabledFlags.move && !disabledFlags[objName]) {
    var obj = movingPieceMap[objName];
    obj.setLeft(obj.theLeft + speed / 40);

    if (speed > 0) {
      if (obj.theLeft < goingTo) {
        moveTimeouts[objName] = setTimeout(function() {
          moveLeftReal(goingTo, objName, speed);
        }, 10);
      } else {
        obj.setLeft(goingTo);
        obj.moveEndCommand();
      }
    } else {
      if (obj.theLeft > goingTo) {
        moveTimeouts[objName] = setTimeout(function() {
          moveLeftReal(goingTo, objName, speed);
        }, 10);
      } else {
        obj.setLeft(goingTo);
        obj.moveEndCommand();
      }
    }
  }
}

function moveTopReal(goingTo, objName, speed) {
  if (!disabledFlags.move && !disabledFlags[objName]) {
    var obj = movingPieceMap[objName];
    obj.setTop(obj.theTop + speed / 40);

    if (speed > 0) {
      if (obj.theTop < goingTo) {
        moveTimeouts[objName] = setTimeout(function() {
          moveTopReal(goingTo, objName, speed);
        }, 10);
      } else {
        obj.setTop(goingTo);
        obj.moveEndCommand();
      }
    } else {
      if (obj.theTop > goingTo) {
        moveTimeouts[objName] = setTimeout(function() {
          moveTopReal(goingTo, objName, speed);
        }, 10);
      } else {
        obj.setTop(goingTo);
        obj.moveEndCommand();
      }
    }
  }
}

function playerMoveEnd() {
  playerTopLeft = null;
  testOnOrb();

  if (leftKeyDown) {
    goLeft();
  }

  if (upKeyDown) {
    goUp();
  }

  if (rightKeyDown) {
    goRight();
  }

  if (downKeyDown) {
    goDown();
  }
}

var player = new movingPiece('player', -1, -1, 3, 3, 3, 'playerSpan', 'Graphics/Player/player1right.gif', 'playerImg', playerMoveEnd);

function testOnOrb() {
  if (checkInteger(player.theLeft) && checkInteger(player.theTop)) {
    var cell = domById('cell_' + player.theTop + '_' + player.theLeft);

    if (cell.innerHTML.indexOf('Dot.gif') !== -1) {
      if (cell.innerHTML.indexOf('bigDot.gif') !== -1) {
        pickUpBigOrb();
      }

      var blankString = '<img src=\'Graphics/blank.gif\'>';
      cell.innerHTML = blankString;
      scoreCredit(25);
      editPickUps(-1);
    }
  } else {
    return false;
  }
}

var chasingTimeout = 0;

function pickUpBigOrb() {
  clearTimeout(emptyChaseBarTimeout);
  domById('chaseBarFill').style.width = 300;
  emptyChaseBar();

  clearTimeout(chasingTimeout);
  chasingGhosts = true;
}

var emptyChaseBarTimeout = 0;

function emptyChaseBar() {
  if (parseInt(domById('chaseBarFill').style.width) !== 0) {
    domById('chaseBarFill').style.width = (
      parseInt(domById('chaseBarFill').style.width) - chaseDecreaseNum
    );

    emptyChaseBarTimeout = setTimeout(emptyChaseBar, 100);
  } else {
    chasingGhosts = false;
    changeGhostImages();
    killGhostCount = 100;
  }
}

function changeGhostImages() {
  if (disabledFlags.enemy1) {
    disabledFlags.enemy1 = false;
    setTimeout(function() {
      moveEnemy('enemy1');
    }, 500);
  }

  if (disabledFlags.enemy2) {
    disabledFlags.enemy2 = false;
    setTimeout(function() {
      moveEnemy('enemy2');
    }, 500);
  }

  if (disabledFlags.enemy3) {
    disabledFlags.enemy3 = false;
    setTimeout(function() {
      moveEnemy('enemy3');
    }, 500);
  }

  if (disabledFlags.enemy4) {
    disabledFlags.enemy4 = false;
    setTimeout(function() {
      moveEnemy('enemy4');
    }, 500);
  }

  if (disabledFlags.enemy5) {
    disabledFlags.enemy5 = false;
    setTimeout(function() {
      moveEnemy('enemy5');
    }, 500);
  }

  if (disabledFlags.enemy6) {
    disabledFlags.enemy6 = false;
    setTimeout(function() {
      moveEnemy('enemy6');
    }, 500);
  }

  if (enemy1.imageRef.indexOf('Captured') === -1) enemy1.setImage('Graphics/Enemy/enemy1left.gif');
  if (enemy2.imageRef.indexOf('Captured') === -1) enemy2.setImage('Graphics/Enemy/enemy2right.gif');
  if (enemy3.imageRef.indexOf('Captured') === -1) enemy3.setImage('Graphics/Enemy/enemy3left.gif');
  if (enemy4.imageRef.indexOf('Captured') === -1) enemy4.setImage('Graphics/Enemy/enemy1right.gif');
  if (enemy5.imageRef.indexOf('Captured') === -1) enemy5.setImage('Graphics/Enemy/enemy2left.gif');
  if (enemy6.imageRef.indexOf('Captured') === -1) enemy6.setImage('Graphics/Enemy/enemy3right.gif');
}

function testBlocked(theLeft, theTop) {
  if (checkInteger(theLeft) && checkInteger(theTop)) {

    var thisCellData = domById('cell_' + theTop + '_' + theLeft).innerHTML.split('/');
    thisCellData = thisCellData[thisCellData.length - 1].split('.');
    thisCellData = thisCellData[0];

    if (thisCellData === 'smallDot' || thisCellData === 'bigDot' || thisCellData === 'blank') {
      return false;
      window.alert(thisCellData + '|| False returned');
    } else {
      return true;
      window.alert(thisCellData + '|| True returned');
    }
  } else {
    return true;
  }
}

function replace(string, ridOf, replaceWith) {
  string = string.split(ridOf);
  string = string.join(replaceWith);

  return string;
}

function levelEdit(num) {
  var fig1 = domById('titleBar').innerHTML.split('LEVEL: ');
  var fig2 = fig1[1].split('</center>');

  fig2[0] = num;
  fig2 = fig2.join('');

  domById('titleBar').innerHTML = fig1[0] + 'LEVEL: ' + fig2;
}

function scoreCredit(num) {
  score += num;

  if (lifeCredits < Math.floor(score / lifeCreditFrequency)) {
    lives += Math.floor(score / lifeCreditFrequency) - lifeCredits;
    editLife(Math.floor(score / lifeCreditFrequency) - lifeCredits);
    lifeCredits += Math.floor(score / lifeCreditFrequency) - lifeCredits;
  }

  var fig1 = domById('titleBar').innerHTML.split('SCORE: ');
  var fig2 = fig1[1].split('</center>');

  fig2[0] = score * scoreMultiplier;
  var fig2 = fig2.join('');

  domById('titleBar').innerHTML = fig1[0] + 'SCORE: ' + fig2;
}

function editLife(num) {
  var fig1 = domById('titleBar').innerHTML.split('LIVES: ');
  var fig2 = fig1[1].split('</center>');
  fig2[0] = parseFloat(fig2[0]) + num;
  var fig3 = fig2[0];
  fig2 = fig2.join('');

  domById('titleBar').innerHTML = fig1[0] + 'LIVES: ' + fig2;

  if (fig3 === 0) {
    gameEndLose();
  }
}

function editPickUps(num) {
  var fig1 = domById('titleBar').innerHTML.split('PICK-UPS LEFT: ');
  var fig2 = fig1[1].split('</center>');
  fig2[0] = parseFloat(fig2[0]) + num;
  var fig3 = fig2[0];
  var fig2 = fig2.join('');

  domById('titleBar').innerHTML = fig1[0] + 'PICK-UPS LEFT: ' + fig2;

  if (fig3 === 0) {
    goNextLevel();
  }
}

function goNextLevel() {
  thisLevel++;

  if (thisLevel === levels[thisLevelSet].length) {
    window.alert();
    gameEndWin();
  } else {
    disabledFlags.move = true;
    domById('blackTrans').innerHTML = '<img src=\'coverPiece2.gif\'>';
    moveBlackPiece(function() { setUpLevel(thisLevel); });
  }
}

var enemy1 = new movingPiece('enemy1', -1, -1, 9, 3, 2, 'enemy1Span', 'Graphics/Enemy/enemy1left.gif', 'enemy1Img', function() { moveEnemy('enemy1'); });
var enemy2 = new movingPiece('enemy2', -1, -1, 9, 3, 2, 'enemy2Span', 'Graphics/Enemy/enemy2left.gif', 'enemy2Img', function() { moveEnemy('enemy2'); });
var enemy3 = new movingPiece('enemy3', -1, -1, 9, 3, 2, 'enemy3Span', 'Graphics/Enemy/enemy3left.gif', 'enemy3Img', function() { moveEnemy('enemy3'); });
var enemy4 = new movingPiece('enemy4', -1, -1, 9, 3, 2, 'enemy4Span', 'Graphics/Enemy/enemy1left.gif', 'enemy4Img', function() { moveEnemy('enemy4'); });
var enemy5 = new movingPiece('enemy5', -1, -1, 9, 3, 2, 'enemy5Span', 'Graphics/Enemy/enemy2left.gif', 'enemy5Img', function() { moveEnemy('enemy5'); });
var enemy6 = new movingPiece('enemy6', -1, -1, 9, 3, 2, 'enemy6Span', 'Graphics/Enemy/enemy3left.gif', 'enemy6Img', function() { moveEnemy('enemy6'); });

function moveEnemy(enemyName) {
  var thisOb = movingPieceMap[enemyName];
  var theLeft = thisOb.theLeft;
  var theTop = thisOb.theTop;

  var playerLeft = player.theLeft;
  var playerTop = player.theTop;

  var predictFig = fixNegative(player.theLeft - theLeft) + fixNegative(player.theTop - theTop);
  var multiplier = (predictFig > 6) ? 6 : predictFig;

  if (playerTopLeft !== null) {
    if (playerTopLeft) playerLeft = playerLeft + (playerNum * multiplier);
    if (!playerTopLeft) playerTop = playerTop + (playerNum * multiplier);
  }

  var leftDif = fixNegative(player.theLeft - theLeft);
  var leftNum = (fixNegative(player.theLeft - theLeft) === player.theLeft - theLeft) ? 1 : -1;
  var topDif = fixNegative(player.theTop - theTop);
  var topNum = (fixNegative(player.theTop - theTop) === player.theTop - theTop) ? 1 : -1;

  var prior1, prior2, prior3, prior4;

  if (leftDif > topDif) {
    prior1 = function() { thisOb.moveLeft(leftNum); };
    prior2 = function() { thisOb.moveTop(topNum); };
    prior3 = function() { thisOb.moveTop(0 - topNum); };
    prior4 = function() { thisOb.moveLeft(0 - leftNum); };

    if (chasingGhosts) {
      if (!testBlocked(parseFloat(theLeft) - leftNum, theTop)) {
        prior4();
        turnEnemy(enemyName, 0 - leftNum);
      } else if (!testBlocked(theLeft, parseFloat(theTop) - topNum)) prior3();
      else if (!testBlocked(theLeft, parseFloat(theTop) + topNum)) prior2();
      else if (!testBlocked(parseFloat(theLeft) + leftNum, theTop)) {
        prior1();
        turnEnemy(enemyName, leftNum);
      } else setTimeout(function() { moveEnemy(enemyName); }, 500);
    } else {
      if (!testBlocked(parseFloat(theLeft) + leftNum, theTop)) {
        prior1();
        turnEnemy(enemyName, leftNum);
      } else if (!testBlocked(theLeft, parseFloat(theTop) + topNum)) prior2();
      else if (!testBlocked(theLeft, parseFloat(theTop) - topNum)) prior3();
      else if (!testBlocked(parseFloat(theLeft) - leftNum, theTop)) {
        prior4();
        turnEnemy(enemyName, 0 - leftNum);
      } else setTimeout(function() { moveEnemy(enemyName); }, 500);
    }
  } else {
    prior1 = function() { thisOb.moveTop(topNum); };
    prior2 = function() { thisOb.moveLeft(leftNum); };
    prior3 = function() { thisOb.moveLeft(0 - leftNum); };
    prior4 = function() { thisOb.moveTop(0 - topNum); };

    if (chasingGhosts) {
      if (!testBlocked(theLeft, parseFloat(theTop) - topNum)) prior4();
      else if (!testBlocked(parseFloat(theLeft) - leftNum, theTop)) {
        prior3();
        turnEnemy(enemyName, 0 - leftNum);
      } else if (!testBlocked(parseFloat(theLeft) + leftNum, theTop)) {
        prior2();
        turnEnemy(enemyName, leftNum);
      } else if (!testBlocked(theLeft, parseFloat(theTop) + topNum)) prior1();
      else setTimeout(function() { moveEnemy(enemyName); }, 500);
    } else {
      if (!testBlocked(theLeft, parseFloat(theTop) + topNum)) prior1();
      else if (!testBlocked(parseFloat(theLeft) + leftNum, theTop)) {
        prior2();
        turnEnemy(enemyName, leftNum);
      } else if (!testBlocked(parseFloat(theLeft) - leftNum, theTop)) {
        prior3();
        turnEnemy(enemyName, 0 - leftNum);
      } else if (!testBlocked(theLeft, parseFloat(theTop) - topNum)) prior4();
      else setTimeout(function() { moveEnemy(enemyName); }, 500);
    }
  }

  if (chasingGhosts) changeEnemyImage(enemyName);
}

function turnEnemy(enemyName, leftNum) {
  var direction = (leftNum === 1) ? 'right' : 'left';
  var enemy = movingPieceMap[enemyName];
  enemy.setImage(fixEnemyName(enemyName) + direction + '.gif');
}

function changeEnemyImage(enemyName) {
  var thisOb = movingPieceMap[enemyName];
  var thisImg = thisOb.imageRef;

  if (thisImg.indexOf('Run') === -1) {
    if (thisImg.indexOf('Captured') === -1) {
      thisImg = thisImg.split(thisImg.charAt(20));
      thisImg = thisImg.join('Run');
    } else {
      thisImg = thisImg.split('Captured' + thisImg.charAt(thisImg.length - 1));
      var adder = (Math.ceil(Math.random * 2) === 1) ? 'Left' : 'Right';
      thisImg = thisImg.join('Run' + adder);
    }

    thisOb.setImage(thisImg);
  }
}

function fixEnemyName(theName) {
  var num = parseFloat(theName.charAt(theName.length - 1));
  if (num > 3) {
    num = num - 3;
  }
  return 'Graphics/Enemy/enemy' + num;
}

function fixNegative(num) {
  num = num + '';
  num = replace(num, '-', '');

  return parseFloat(num);
}

function loseLife() {
  disabledFlags.move = true;
  domById('blackTrans').innerHTML = '<img src=\'coverPiece.gif\'>';
  moveBlackPiece(loseLifeReal);
}

function loseLifeReal() {
  var fig1 = levels[thisLevelSet][thisLevel][13][0];

  player.setLeft(fig1[0]);
  player.setTop(fig1[1]);

  fig1 = levels[thisLevelSet][thisLevel][13][1];

  enemy1.setLeft(fig1[0]);
  enemy1.setTop(fig1[1]);

  fig1 = levels[thisLevelSet][thisLevel][13][2];

  enemy2.setLeft(fig1[0]);
  enemy2.setTop(fig1[1]);

  fig1 = levels[thisLevelSet][thisLevel][13][3];

  enemy3.setLeft(fig1[0]);
  enemy3.setTop(fig1[1]);

  fig1 = levels[thisLevelSet][thisLevel][13][4];

  enemy4.setLeft(fig1[0]);
  enemy4.setTop(fig1[1]);

  fig1 = levels[thisLevelSet][thisLevel][13][5];

  enemy5.setLeft(fig1[0]);
  enemy5.setTop(fig1[1]);

  fig1 = levels[thisLevelSet][thisLevel][13][6];

  enemy6.setLeft(fig1[0]);
  enemy6.setTop(fig1[1]);

  if (lives !== 1) pickUpBigOrb();

  editLife(-1);
}

function ghostCollisionCheck() {
  var playerSpan = domById('playerSpan');
  var enemy1Span = domById('enemy1Span');
  var enemy2Span = domById('enemy2Span');
  var enemy3Span = domById('enemy3Span');
  var enemy4Span = domById('enemy4Span');
  var enemy5Span = domById('enemy5Span');
  var enemy6Span = domById('enemy6Span');

  var px = parseInt(playerSpan.style.left);
  var py = parseInt(playerSpan.style.top);

  var ex = parseInt(enemy1Span.style.left);
  var ey = parseInt(enemy1Span.style.top);

  if ((px + 34 > ex) && (px < ex + 22) && (py + 34 > ey) && (py < ey + 34)) {
    if (!disabledFlags.enemy1) {
      if (chasingGhosts) {
        killEnemy('enemy1');
      } else {
        loseLife();
        monitorRunning = false;
      }
    }
  } else {
    ex = parseInt(enemy2Span.style.left);
    ey = parseInt(enemy2Span.style.top);

    if ((px + 34 > ex) && (px < ex + 22) && (py + 34 > ey) && (py < ey + 34)) {
      if (!disabledFlags.enemy2) {
        if (chasingGhosts) {
          killEnemy('enemy2');
        } else {
          loseLife();
          monitorRunning = false;
        }
      }
    } else {
      ex = parseInt(enemy3Span.style.left);
      ey = parseInt(enemy3Span.style.top);

      if ((px + 34 > ex) && (px < ex + 22) && (py + 34 > ey) && (py < ey + 34)) {
        if (!disabledFlags.enemy3) {
          if (chasingGhosts) {
            killEnemy('enemy3');
          } else {
            loseLife();
            monitorRunning = false;
          }
        }
      } else {
        ex = parseInt(enemy4Span.style.left);
        ey = parseInt(enemy4Span.style.top);

        if ((px + 34 > ex) && (px < ex + 22) && (py + 34 > ey) && (py < ey + 34)) {
          if (!disabledFlags.enemy4) {
            if (chasingGhosts) {
              killEnemy('enemy4');
            } else {
              loseLife();
              monitorRunning = false;
            }
          }
        } else {
          ex = parseInt(enemy5Span.style.left);
          ey = parseInt(enemy5Span.style.top);

          if ((px + 34 > ex) && (px < ex + 22) && (py + 34 > ey) && (py < ey + 34)) {
            if (!disabledFlags.enemy5) {
              if (chasingGhosts) {
                killEnemy('enemy5');
              } else {
                loseLife();
                monitorRunning = false;
              }
            }
          } else {
            ex = parseInt(enemy6Span.style.left);
            ey = parseInt(enemy6Span.style.top);

            if ((px + 34 > ex) && (px < ex + 22) && (py + 34 > ey) && (py < ey + 34)) {
              if (!disabledFlags.enemy6) {
                if (chasingGhosts) {
                  killEnemy('enemy6');
                } else {
                  loseLife();
                  monitorRunning = false;
                }
              }
            }
          }
        }
      }
    }
  }
}

function killEnemy(enemyName) {
  if (thisLevel < levels[thisLevelSet].length) {
    var enemy = movingPieceMap[enemyName];
    disabledFlags[enemyName] = true;
    var fig1 = levels[thisLevelSet][thisLevel][13][parseFloat(enemyName.charAt(enemyName.length - 1))];
    var fig2 = fig1[0];
    var fig3 = fig1[1];
    enemy.setLeft(fig2);
    enemy.setTop(fig3);
    var ranNum = Math.ceil(Math.random() * 2);

    enemy.setImage('Graphics/Enemy/enemyCaptured' + ranNum + '.gif');

    domById('scoreDisplayer' + killGhostCount).style.left = (player.theLeft * 40 + 10);
    domById('scoreDisplayer' + killGhostCount).style.top = (player.theTop * 40 + 10);

    scoreCredit(killGhostCount);

    setTimeout(function() {
      domById('scoreDisplayer' + killGhostCount).style.left = -100;
      domById('scoreDisplayer' + killGhostCount).style.top = -100;
    }, 750);

    killGhostCount = killGhostCount * 2;
    killGhostCount = (killGhostCount === 6400) ? 3200 : killGhostCount;
  }
}

function monitorCollisions() {
  if (monitorRunning) ghostCollisionCheck();
  setTimeout(monitorCollisions, 100);
}

function moveBlackPiece(coverCommand) {
  if (!disableBlackPiece) {
    disabledFlags.move = true;
    var blackTrans = domById('blackTrans');
    if (parseInt(blackTrans.style.left) === 0) coverCommand();
    blackTrans.style.left = parseInt(blackTrans.style.left) + 5;
    if (parseInt(blackTrans.style.left) < 760) setTimeout(function() { moveBlackPiece(coverCommand); }, 10);
    else {
      blackTrans.style.left = -760;
      monitorRunning = true;
      disabledFlags.move = false;

      if (parseInt(domById('titleDisplayer').style.left) !== 0) {
        gameStarted = true;
        domById('guard').style.left = -760;
        moveEnemy('enemy1');
        moveEnemy('enemy2');
        moveEnemy('enemy3');
        moveEnemy('enemy4');
        moveEnemy('enemy5');
        moveEnemy('enemy6');
      }
    }
  }
}
