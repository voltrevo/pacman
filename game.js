thisLevel = 0;
lives = 1;
score = 0;
lifeCredits = 0;
chasingGhosts = false;
monitorRunning = false;
moveDisabled = false;
playerDisabled = false;
enemy1Disabled = false;
enemy2Disabled = false;
enemy3Disabled = false;
enemy4Disabled = false;
enemy5Disabled = false;
enemy6Disabled = false;
killGhostCount = 100;
thisLevelSet = 0;
lifeCreditFrequency = 15000;
controlSelection = 0;
optionCount = 0;
chaseDecreaseNum = 2;
disableBlackPiece = false;
endGameMsgs = new Array;
endGameMsgs[0] = "Created By: ";
endGameMsgs[1] = "Created By: <a href='#' onClick='goToFreewebs();'>Andrew Morris</a>";
endGameMsgs[2] = "Special Thanks: ";
endGameMsgs[3] = "Special Thanks: <a href='#' onClick='goToDefLogic();'>Brent Silby</a>";
endGameMsgs[4] = "Special Thanks: Merryll-Anne Morris";
endGameMsgCount = 0;
pauseDisabled = false;

function goToFreewebs() {

  window.open("http://www.freewebs.com/javascriptmania");

}

function goToDefLogic() {

  window.open("http://www.def-logic.com/");


}

function setOption(num) {
  if (optionCount == 0) {

    optionCount++;
    controlSelection = num;
    document.option1.src = "easyImg.gif";
    document.option2.src = "mediumImg.gif";
    document.option3.src = "hardImg.gif";
    optionText.innerHTML = "Select Difficulty Level";
    optionText.style.left = 175;
    scoreNote.style.left = 0;
    scoreNote.style.top = 500;

  } else if (optionCount == 1) {

    scoreNote.style.left = -760;
    optionText.style.left = -760;
    keys0.style.left = -760;
    keys1.style.left = -760;
    keys2.style.left = -760;
    chaseBar.style.left = 230;
    chaseBarFill.style.left = 230;
    lifeCreditFrequency = 6300 * (num + 1);
    scoreMultiplier = num + 1;
    chaseDecreaseNum = num + 3;

    blackTrans.innerHTML = "<img src='getReady.gif'>";
    moveBlackPiece("setUpLevel(0);");

  }
}

upButtons = new Array;

upButtons[0] = 38;
upButtons[1] = 73;
upButtons[2] = 87;

downButtons = new Array;

downButtons[0] = 40;
downButtons[1] = 75;
downButtons[2] = 83;

leftButtons = new Array;

leftButtons[0] = 37;
leftButtons[1] = 74;
leftButtons[2] = 65;

rightButtons = new Array;

rightButtons[0] = 39;
rightButtons[1] = 76;
rightButtons[2] = 68;

playerTopLeft = null;
playerNum = 0;

playerImgArray = new Array(1, 2, 3, 4, 5, 4, 3, 2);

playerImgCount = 0;

var imageSRCs = new Array;

imageSRCs[0] = "Graphics/blank.gif";
imageSRCs[1] = "Graphics/Dots/smallDot.gif";
imageSRCs[2] = "Graphics/Dots/bigDot.gif";
imageSRCs[3] = "Graphics/Structure/basicH.gif";
imageSRCs[4] = "Graphics/Structure/basicV.gif";
imageSRCs[5] = "Graphics/Structure/cornerTopLeft.gif";
imageSRCs[6] = "Graphics/Structure/cornerTopRight.gif";
imageSRCs[7] = "Graphics/Structure/cornerBottomRight.gif";
imageSRCs[8] = "Graphics/Structure/cornerBottomLeft.gif";
imageSRCs[9] = "Graphics/Structure/tTop.gif";
imageSRCs[10] = "Graphics/Structure/tBottom.gif";
imageSRCs[11] = "Graphics/Structure/tLeft.gif";
imageSRCs[12] = "Graphics/Structure/tRight.gif";
imageSRCs[13] = "Graphics/Structure/cross.gif";
imageSRCs[14] = "Graphics/Structure/endPieceLeft.gif";
imageSRCs[15] = "Graphics/Structure/endPieceRight.gif";
imageSRCs[16] = "Graphics/Structure/endPieceTop.gif";
imageSRCs[17] = "Graphics/Structure/endPieceBottom.gif";
imageSRCs[18] = "Graphics/Structure/independent.gif";

myImagesArray = "getReady.gif,loading.gif,startUp.gif,congratulations.gif,easyImg.gif,mediumImg.gif,hardImg.gif,coverPiece.gif,coverPiece2.gif,keys0.gif,keys1.gif,keys2.gif,startButton1.gif,startButton2.gif,Graphics/Player/player1left.gif,Graphics/Player/player2left.gif,Graphics/Player/player3left.gif,Graphics/Player/player4left.gif,Graphics/Player/player5left.gif,Graphics/Player/player1right.gif,Graphics/Player/player2right.gif,Graphics/Player/player3right.gif,Graphics/Player/player4right.gif,Graphics/Player/player5right.gif," + imageSRCs.join(",") + ",Graphics/Enemy/enemy1left.gif,Graphics/Enemy/enemy2left.gif,Graphics/Enemy/enemy3left.gif,Graphics/Enemy/enemyRunLeft.gif,Graphics/Enemy/enemy1right.gif,Graphics/Enemy/enemy2right.gif,Graphics/Enemy/enemy3right.gif,Graphics/Enemy/enemyCaptured1.gif,Graphics/Enemy/enemyCaptured2.gif,Graphics/Dots/smallDot.gif,Graphics/Dots/bigDot.gif,Graphics/Scores/100.gif,Graphics/Scores/200.gif,Graphics/Scores/400.gif,Graphics/Scores/800.gif,Graphics/Scores/1600.gif,Graphics/Scores/3200.gif,Graphics/blank.gif";
myImagesArray = myImagesArray.split(",");

for (var n = 0; n < myImagesArray.length; n++) {
  document.write("<img src='" + myImagesArray[n] + "' galleryimg='no' id='temp" + n + "' style='position: absolute; z-index:1; visibility: visible; width:2; height:2; top:-5;left:-5'>");
}

var imagePosAdders = new Array;

imagePosAdders[0] = "0,0".split(",");
imagePosAdders[1] = "15,15".split(",");
imagePosAdders[2] = "10,10".split(",");
imagePosAdders[3] = "0,0".split(",");
imagePosAdders[4] = "0,0".split(",");
imagePosAdders[5] = "0,0".split(",");
imagePosAdders[6] = "0,0".split(",");
imagePosAdders[7] = "0,0".split(",");
imagePosAdders[8] = "0,0".split(",");
imagePosAdders[9] = "0,0".split(",");
imagePosAdders[10] = "0,0".split(",");
imagePosAdders[11] = "0,0".split(",");
imagePosAdders[12] = "0,0".split(",");
imagePosAdders[13] = "0,0".split(",");
imagePosAdders[14] = "0,0".split(",");
imagePosAdders[15] = "0,0".split(",");
imagePosAdders[16] = "0,0".split(",");
imagePosAdders[17] = "0,0".split(",");
imagePosAdders[18] = "0,0".split(",");

var levels = new Array;

levels[0] = new Array;
levels[1] = new Array;
levels[2] = new Array;
levels[3] = new Array;
levels[4] = new Array;



levels[0][0] = new Array;

levels[0][0][0] = "5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6".split(",");
levels[0][0][1] = "4,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4".split(",");
levels[0][0][2] = "4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4".split(",");
levels[0][0][3] = "4,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,4".split(",");
levels[0][0][4] = "4,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,4".split(",");
levels[0][0][5] = "4,1,0,1,0,14,3,3,3,3,3,3,3,15,0,1,0,1,4".split(",");
levels[0][0][6] = "4,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,4".split(",");
levels[0][0][7] = "4,1,0,1,0,14,3,3,3,3,3,3,3,15,0,1,0,1,4".split(",");
levels[0][0][8] = "4,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,4".split(",");
levels[0][0][9] = "4,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,4".split(",");
levels[0][0][10] = "4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4".split(",");
levels[0][0][11] = "4,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4".split(",");
levels[0][0][12] = "8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7".split(",");
levels[0][0][13] = "3-10,6-6,7-6,8-6,9-6,10-6,11-6".split(",");

levels[0][1] = new Array;

levels[0][1][0] = '5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6'.split(",");
levels[0][1][1] = '4,2,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,2,4'.split(",");
levels[0][1][2] = '4,1,5,6,1,0,0,0,0,1,0,0,0,0,1,5,6,1,4'.split(",");
levels[0][1][3] = '4,1,8,7,1,0,0,0,1,16,1,0,0,0,1,8,7,1,4'.split(",");
levels[0][1][4] = '4,1,1,1,1,0,0,0,1,4,1,0,0,0,1,1,1,1,4'.split(",");
levels[0][1][5] = '4,0,0,1,1,1,1,1,1,4,1,1,1,1,1,1,0,0,4'.split(",");
levels[0][1][6] = '4,0,1,14,3,3,3,3,3,13,3,3,3,3,3,15,1,0,4'.split(",");
levels[0][1][7] = '4,0,0,1,1,1,1,1,1,4,1,1,1,1,1,1,0,0,4'.split(",");
levels[0][1][8] = '4,1,1,1,1,0,0,0,1,4,1,0,0,0,1,1,1,1,4'.split(",");
levels[0][1][9] = '4,1,5,6,1,0,0,0,1,17,1,0,0,0,1,5,6,1,4'.split(",");
levels[0][1][10] = '4,1,8,7,1,0,0,0,0,1,0,0,0,0,1,8,7,1,4'.split(",");
levels[0][1][11] = '4,2,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,2,4'.split(",");
levels[0][1][12] = '8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7'.split(",");
levels[0][1][13] = '6-11,1-1,17-1,7-3,11-3,7-1,11-1'.split(",");

levels[0][2] = new Array;

levels[0][2][0] = '5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6'.split(",");
levels[0][2][1] = '4,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4'.split(",");
levels[0][2][2] = '4,1,5,10,10,10,10,10,6,1,0,0,0,0,0,0,0,1,4'.split(",");
levels[0][2][3] = '4,1,12,13,13,13,13,13,11,1,0,0,0,0,0,0,0,1,4'.split(",");
levels[0][2][4] = '4,1,12,13,13,13,13,13,11,1,0,0,0,0,0,0,0,1,4'.split(",");
levels[0][2][5] = '4,1,8,9,9,9,9,9,7,1,0,0,0,0,0,0,0,1,4'.split(",");
levels[0][2][6] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][2][7] = '4,1,0,0,0,0,0,0,0,1,5,10,10,10,10,10,6,1,4'.split(",");
levels[0][2][8] = '4,1,0,0,0,0,0,0,0,1,12,13,13,13,13,13,11,1,4'.split(",");
levels[0][2][9] = '4,1,0,0,0,0,0,0,0,1,12,13,13,13,13,13,11,1,4'.split(",");
levels[0][2][10] = '4,1,0,0,0,0,0,0,0,1,8,9,9,9,9,9,7,1,4'.split(",");
levels[0][2][11] = '4,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4'.split(",");
levels[0][2][12] = '8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7'.split(",");
levels[0][2][13] = '2-10,9-2,9-5,15-2,15-5,12-3,12-4'.split(",");

levels[0][3] = new Array;

levels[0][3][0] = '0,0,0,5,3,3,3,3,3,3,3,3,3,3,3,6,0,0,0'.split(",");
levels[0][3][1] = '0,0,0,4,2,1,1,1,1,1,1,1,1,1,1,4,0,0,0'.split(",");
levels[0][3][2] = '0,0,0,4,1,0,0,0,0,0,0,0,0,0,1,4,0,0,0'.split(",");
levels[0][3][3] = '5,3,3,7,1,0,0,0,1,0,1,0,0,0,1,8,3,3,6'.split(",");
levels[0][3][4] = '4,1,1,1,1,0,0,1,16,1,16,1,0,0,1,1,1,2,4'.split(",");
levels[0][3][5] = '4,1,0,0,0,0,1,14,7,1,8,15,1,0,0,0,0,1,4'.split(",");
levels[0][3][6] = '4,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,4'.split(",");
levels[0][3][7] = '4,1,0,0,0,0,1,14,6,1,5,15,1,0,0,0,0,1,4'.split(",");
levels[0][3][8] = '4,2,1,1,1,0,0,1,17,1,17,1,0,0,1,1,1,1,4'.split(",");
levels[0][3][9] = '8,3,3,6,1,0,0,0,1,0,1,0,0,0,1,5,3,3,7'.split(",");
levels[0][3][10] = '0,0,0,4,1,0,0,0,0,0,0,0,0,0,1,4,0,0,0'.split(",");
levels[0][3][11] = '0,0,0,4,1,1,1,1,1,1,1,1,1,1,2,4,0,0,0'.split(",");
levels[0][3][12] = '0,0,0,8,3,3,3,3,3,3,3,3,3,3,3,7,0,0,0'.split(",");
levels[0][3][13] = '3-6,12-3,12-6,12-9,16-5,16-6,16-7'.split(",");

levels[0][4] = new Array;

levels[0][4][0] = '5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6'.split(",");
levels[0][4][1] = '4,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4'.split(",");
levels[0][4][2] = '4,1,5,3,3,3,6,1,0,0,0,1,5,3,3,3,6,1,4'.split(",");
levels[0][4][3] = '4,1,4,0,0,0,4,1,0,0,0,1,4,0,0,0,4,1,4'.split(",");
levels[0][4][4] = '4,1,8,3,3,3,7,1,0,0,0,1,8,3,3,3,7,1,4'.split(",");
levels[0][4][5] = '4,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,4'.split(",");
levels[0][4][6] = '4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4'.split(",");
levels[0][4][7] = '4,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,4'.split(",");
levels[0][4][8] = '4,1,5,3,3,3,6,1,0,0,0,1,5,3,3,3,6,1,4'.split(",");
levels[0][4][9] = '4,1,4,0,0,0,4,1,0,0,0,1,4,0,0,0,4,1,4'.split(",");
levels[0][4][10] = '4,1,8,3,3,3,7,1,0,0,0,1,8,3,3,3,7,1,4'.split(",");
levels[0][4][11] = '4,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4'.split(",");
levels[0][4][12] = '8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7'.split(",");
levels[0][4][13] = '4-11,8-2,8-10,10-2,10-10,13-6,16-6'.split(",");

levels[0][5] = new Array;

levels[0][5][0] = '5,3,3,3,3,10,3,3,3,3,3,3,3,3,3,3,3,3,6'.split(",");
levels[0][5][1] = '4,2,1,0,1,4,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][5][2] = '4,1,0,0,0,4,1,1,0,0,0,1,1,1,1,16,1,1,4'.split(",");
levels[0][5][3] = '4,0,0,0,0,17,1,0,0,0,0,0,1,1,14,13,15,1,4'.split(",");
levels[0][5][4] = '4,1,0,0,0,0,0,0,1,0,1,0,0,1,1,17,1,1,4'.split(",");
levels[0][5][5] = '12,3,3,15,0,0,0,1,0,1,0,1,0,0,1,1,1,1,4'.split(",");
levels[0][5][6] = '4,1,1,1,0,0,0,0,1,2,1,0,0,0,0,1,1,1,4'.split(",");
levels[0][5][7] = '4,1,1,1,1,0,0,1,0,1,0,1,0,0,0,14,3,3,11'.split(",");
levels[0][5][8] = '4,1,1,16,1,1,0,0,1,0,1,0,0,0,0,0,0,1,4'.split(",");
levels[0][5][9] = '4,1,14,13,15,1,1,0,0,0,0,0,1,16,0,0,0,0,4'.split(",");
levels[0][5][10] = '4,1,1,17,1,1,1,1,0,0,0,1,1,4,0,0,0,1,4'.split(",");
levels[0][5][11] = '4,1,1,1,1,1,1,1,1,1,1,1,1,4,1,0,1,2,4'.split(",");
levels[0][5][12] = '8,3,3,3,3,3,3,3,3,3,3,3,3,9,3,3,3,3,7'.split(",");
levels[0][5][13] = '9-3,6-7,7-8,8-9,10-9,11-8,12-7'.split(",");

levels[0][6] = new Array;

levels[0][6][0] = '5,10,10,10,10,3,3,3,3,3,3,3,3,3,10,10,10,10,6'.split(",");
levels[0][6][1] = '12,13,13,13,7,1,1,1,1,1,1,1,1,1,8,13,13,13,11'.split(",");
levels[0][6][2] = '12,13,13,7,1,1,1,1,1,1,1,1,1,1,1,8,13,13,11'.split(",");
levels[0][6][3] = '12,13,7,1,1,1,1,1,1,1,1,1,1,1,1,1,8,13,11'.split(",");
levels[0][6][4] = '12,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,11'.split(",");
levels[0][6][5] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][6][6] = '4,1,14,3,3,3,3,3,15,2,14,3,3,3,3,3,15,1,4'.split(",");
levels[0][6][7] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][6][8] = '12,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,11'.split(",");
levels[0][6][9] = '12,13,6,1,1,1,1,1,1,1,1,1,1,1,1,1,5,13,11'.split(",");
levels[0][6][10] = '12,13,13,6,1,1,1,1,1,1,1,1,1,1,1,5,13,13,11'.split(",");
levels[0][6][11] = '12,13,13,13,6,2,1,1,1,1,1,1,1,2,5,13,13,13,11'.split(",");
levels[0][6][12] = '8,9,9,9,9,3,3,3,3,3,3,3,3,3,9,9,9,9,7'.split(",");
levels[0][6][13] = '9-11,3-3,15-3,9-3,13-1,9-1,5-1'.split(",");

levels[0][7] = new Array;

levels[0][7][0] = '5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6'.split(",");
levels[0][7][1] = '4,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][7][2] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][7][3] = '4,1,1,5,3,3,3,3,15,0,0,14,3,3,3,6,1,1,4'.split(",");
levels[0][7][4] = '4,1,1,17,0,0,0,0,0,0,0,0,0,0,0,4,1,1,4'.split(",");
levels[0][7][5] = '4,1,1,0,0,0,0,0,1,1,1,0,0,0,0,17,1,1,4'.split(",");
levels[0][7][6] = '4,1,1,0,0,0,0,0,1,2,1,0,0,0,0,0,1,1,4'.split(",");
levels[0][7][7] = '4,1,1,16,0,0,0,0,1,1,1,0,0,0,0,0,1,1,4'.split(",");
levels[0][7][8] = '4,1,1,4,0,0,0,0,0,0,0,0,0,0,0,16,1,1,4'.split(",");
levels[0][7][9] = '4,1,1,8,3,3,3,15,0,0,14,3,3,3,3,7,1,1,4'.split(",");
levels[0][7][10] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][7][11] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4'.split(",");
levels[0][7][12] = '8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7'.split(",");
levels[0][7][13] = '1-11,14-4,9-4,4-4,16-2,9-2,2-2'.split(",");

levels[0][8] = new Array;

levels[0][8][0] = '5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6'.split(",");
levels[0][8][1] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4'.split(",");
levels[0][8][2] = '4,1,14,3,3,3,3,3,15,1,14,3,3,3,3,3,15,1,4'.split(",");
levels[0][8][3] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][8][4] = '4,1,14,3,3,3,3,3,15,1,14,3,3,3,3,3,15,1,4'.split(",");
levels[0][8][5] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][8][6] = '4,1,14,3,3,3,3,3,15,2,14,3,3,3,3,3,15,1,4'.split(",");
levels[0][8][7] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][8][8] = '4,1,14,3,3,3,3,3,15,1,14,3,3,3,3,3,15,1,4'.split(",");
levels[0][8][9] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][8][10] = '4,1,14,3,3,3,3,3,15,1,14,3,3,3,3,3,15,1,4'.split(",");
levels[0][8][11] = '4,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][8][12] = '8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7'.split(",");
levels[0][8][13] = '3-9,15-3,15-5,3-3,3-5,3-1,15-1'.split(",");

levels[0][9] = new Array;

levels[0][9][0] = '5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6'.split(",");
levels[0][9][1] = '4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4'.split(",");
levels[0][9][2] = '4,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,4'.split(",");
levels[0][9][3] = '4,0,1,1,1,1,5,3,3,3,3,3,15,1,1,1,1,0,4'.split(",");
levels[0][9][4] = '4,0,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,0,4'.split(",");
levels[0][9][5] = '4,0,1,1,1,1,4,1,5,3,3,3,6,1,1,1,1,0,4'.split(",");
levels[0][9][6] = '4,0,1,1,1,1,4,1,4,2,1,1,4,1,1,1,1,0,4'.split(",");
levels[0][9][7] = '4,0,1,1,1,1,4,1,8,3,15,1,4,1,1,1,1,0,4'.split(",");
levels[0][9][8] = '4,0,1,1,1,1,4,1,1,1,1,1,4,1,1,1,1,0,4'.split(",");
levels[0][9][9] = '4,0,1,1,1,1,8,3,3,3,3,3,7,1,1,1,1,0,4'.split(",");
levels[0][9][10] = '4,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,4'.split(",");
levels[0][9][11] = '4,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4'.split(",");
levels[0][9][12] = '8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7'.split(",");
levels[0][9][13] = '4-11,17-5,1-5,17-3,1-3,17-1,1-1'.split(",");

levels[0][10] = new Array;

levels[0][10][0] = '5,3,3,3,3,3,3,3,6,0,5,3,3,3,3,3,3,3,6'.split(",");
levels[0][10][1] = '4,0,1,1,1,1,1,0,4,0,4,0,1,1,1,1,1,0,4'.split(",");
levels[0][10][2] = '4,1,1,0,0,0,1,1,4,0,4,1,1,0,0,0,1,1,4'.split(",");
levels[0][10][3] = '4,1,0,0,0,0,0,1,4,0,4,0,0,0,0,0,0,1,4'.split(",");
levels[0][10][4] = '4,1,1,1,1,0,0,1,8,3,7,1,0,0,1,1,1,1,4'.split(",");
levels[0][10][5] = '8,3,3,6,1,0,0,1,1,2,1,1,0,0,1,5,3,3,7'.split(",");
levels[0][10][6] = '0,0,0,4,2,0,0,0,0,1,0,0,0,0,2,4,0,0,0'.split(",");
levels[0][10][7] = '5,3,3,7,1,1,1,1,1,1,1,1,1,1,1,8,3,3,6'.split(",");
levels[0][10][8] = '4,1,1,1,1,0,0,1,0,1,0,1,0,0,1,1,1,1,4'.split(",");
levels[0][10][9] = '4,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,4'.split(",");
levels[0][10][10] = '4,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,4'.split(",");
levels[0][10][11] = '4,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,4'.split(",");
levels[0][10][12] = '8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7'.split(",");
levels[0][10][13] = '9-11,1-11,7-1,17-11,17-1,11-1,1-1'.split(",");

levels[0][11] = new Array;

levels[0][11][0] = '5,3,3,3,3,3,3,3,3,10,3,3,3,3,3,3,3,3,6'.split(",");
levels[0][11][1] = '4,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1,2,4'.split(",");
levels[0][11][2] = '4,1,0,0,1,1,1,0,0,4,0,0,1,1,1,0,0,1,4'.split(",");
levels[0][11][3] = '4,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][11][4] = '4,1,0,0,1,1,1,0,0,17,0,0,1,1,1,0,0,1,4'.split(",");
levels[0][11][5] = '4,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][11][6] = '12,3,3,3,3,3,3,15,0,2,0,14,3,3,3,3,3,3,11'.split(",");
levels[0][11][7] = '4,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][11][8] = '4,1,0,0,1,1,1,0,0,16,0,0,1,1,1,0,0,1,4'.split(",");
levels[0][11][9] = '4,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][11][10] = '4,1,0,0,1,1,1,0,0,4,0,0,1,1,1,0,0,1,4'.split(",");
levels[0][11][11] = '4,2,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][11][12] = '8,3,3,3,3,3,3,3,3,9,3,3,3,3,3,3,3,3,7'.split(",");
levels[0][11][13] = '2-10,11-4,7-4,11-8,2-2,16-10,16-2'.split(",");

levels[0][12] = new Array;

levels[0][12][0] = '5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6'.split(",");
levels[0][12][1] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4'.split(",");
levels[0][12][2] = '4,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,4'.split(",");
levels[0][12][3] = '4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4'.split(",");
levels[0][12][4] = '4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4'.split(",");
levels[0][12][5] = '4,1,17,1,17,1,4,1,17,1,17,1,4,1,17,1,17,1,4'.split(",");
levels[0][12][6] = '4,1,0,1,0,1,4,1,0,2,0,1,4,1,0,1,0,1,4'.split(",");
levels[0][12][7] = '4,1,16,1,16,1,4,1,16,1,16,1,4,1,16,1,16,1,4'.split(",");
levels[0][12][8] = '4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4'.split(",");
levels[0][12][9] = '4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4'.split(",");
levels[0][12][10] = '4,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,4'.split(",");
levels[0][12][11] = '4,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][12][12] = '8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7'.split(",");
levels[0][12][13] = '1-11,7-1,9-1,11-1,13-1,15-1,17-1'.split(",");

levels[0][13] = new Array;

levels[0][13][0] = '5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6'.split(",");
levels[0][13][1] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][13][2] = '4,1,18,1,16,1,14,3,3,3,3,3,15,1,16,1,18,1,4'.split(",");
levels[0][13][3] = '4,1,1,1,4,1,1,1,1,1,1,1,1,1,4,1,1,1,4'.split(",");
levels[0][13][4] = '4,1,14,3,13,3,15,1,0,1,0,1,14,3,13,3,15,1,4'.split(",");
levels[0][13][5] = '4,1,1,1,4,1,1,0,1,16,1,0,1,1,4,1,1,1,4'.split(",");
levels[0][13][6] = '4,1,18,1,4,1,0,1,14,13,15,1,0,1,4,1,18,1,4'.split(",");
levels[0][13][7] = '4,1,1,1,4,1,1,0,1,17,1,0,1,1,4,1,1,1,4'.split(",");
levels[0][13][8] = '4,1,14,3,13,3,15,1,0,1,0,1,14,3,13,3,15,1,4'.split(",");
levels[0][13][9] = '4,1,1,1,4,1,1,1,1,1,1,1,1,1,4,1,1,1,4'.split(",");
levels[0][13][10] = '4,1,18,1,17,1,14,3,3,3,3,3,15,1,17,1,18,1,4'.split(",");
levels[0][13][11] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][13][12] = '8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7'.split(",");
levels[0][13][13] = '1-11,11-5,7-5,10-4,8-4,15-2,3-2'.split(",");

levels[0][14] = new Array;

levels[0][14][0] = '0,0,0,0,0,5,3,3,3,3,3,3,3,3,3,3,3,3,6'.split(",");
levels[0][14][1] = '0,0,5,3,3,11,1,1,1,1,1,1,1,1,1,1,1,2,4'.split(",");
levels[0][14][2] = '0,0,4,1,1,4,1,0,1,0,1,0,1,0,1,0,1,1,4'.split(",");
levels[0][14][3] = '0,0,4,1,1,4,1,1,0,1,0,1,0,1,0,1,0,1,4'.split(",");
levels[0][14][4] = '5,3,7,1,1,17,1,0,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][14][5] = '4,1,1,1,1,1,1,0,1,14,3,3,3,3,3,3,3,3,11'.split(",");
levels[0][14][6] = '4,2,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,2,4'.split(",");
levels[0][14][7] = '4,1,1,1,1,1,1,0,1,14,3,3,3,3,3,3,3,3,11'.split(",");
levels[0][14][8] = '8,3,6,1,1,16,1,0,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][14][9] = '0,0,4,1,1,4,1,1,0,1,0,1,0,1,0,1,0,1,4'.split(",");
levels[0][14][10] = '0,0,4,1,1,4,1,0,1,0,1,0,1,0,1,0,1,1,4'.split(",");
levels[0][14][11] = '0,0,8,3,3,11,1,1,1,1,1,1,1,1,1,1,1,2,4'.split(",");
levels[0][14][12] = '0,0,0,0,0,8,3,3,3,3,3,3,3,3,3,3,3,3,7'.split(",");
levels[0][14][13] = '2-6,14-6,14-3,16-9,16-3,14-9,16-6'.split(",");

levels[0][15] = new Array;

levels[0][15][0] = '5,3,3,3,10,3,3,3,3,3,3,3,3,3,10,3,3,3,6'.split(",");
levels[0][15][1] = '4,1,1,1,4,1,1,1,1,1,1,1,1,1,4,1,1,2,4'.split(",");
levels[0][15][2] = '4,1,1,1,17,0,0,0,0,0,0,0,0,0,17,1,1,1,4'.split(",");
levels[0][15][3] = '4,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,4'.split(",");
levels[0][15][4] = '12,3,15,1,18,1,0,1,1,1,1,1,0,1,18,1,14,3,11'.split(",");
levels[0][15][5] = '4,1,0,1,1,1,0,1,18,1,18,1,0,1,1,1,0,1,4'.split(",");
levels[0][15][6] = '4,1,0,0,0,0,1,1,1,2,1,1,1,0,0,0,0,1,4'.split(",");
levels[0][15][7] = '4,1,0,1,1,1,0,1,18,1,18,1,0,1,1,1,0,1,4'.split(",");
levels[0][15][8] = '12,3,15,1,18,1,0,1,1,1,1,1,0,1,18,1,14,3,11'.split(",");
levels[0][15][9] = '4,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,4'.split(",");
levels[0][15][10] = '4,1,1,1,16,0,0,0,0,0,0,0,0,0,16,1,1,1,4'.split(",");
levels[0][15][11] = '4,2,1,1,4,1,1,1,1,1,1,1,1,1,4,1,1,1,4'.split(",");
levels[0][15][12] = '8,3,3,3,9,3,3,3,3,3,3,3,3,3,9,3,3,3,7'.split(",");
levels[0][15][13] = '2-6,12-5,11-2,13-2,16-5,14-5,9-2'.split(",");

levels[0][16] = new Array;

levels[0][16][0] = '5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6'.split(",");
levels[0][16][1] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4'.split(",");
levels[0][16][2] = '4,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,4'.split(",");
levels[0][16][3] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][16][4] = '4,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,4'.split(",");
levels[0][16][5] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][16][6] = '4,1,18,1,18,1,18,1,18,2,18,1,18,1,18,1,18,1,4'.split(",");
levels[0][16][7] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][16][8] = '4,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,4'.split(",");
levels[0][16][9] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][16][10] = '4,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,4'.split(",");
levels[0][16][11] = '4,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][16][12] = '8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7'.split(",");
levels[0][16][13] = '3-11,13-5,15-5,11-5,15-3,11-3,13-3'.split(",");

levels[0][17] = new Array;

levels[0][17][0] = '5,3,3,3,3,3,10,3,3,3,3,3,3,3,3,3,3,3,6'.split(",");
levels[0][17][1] = '4,0,0,0,0,0,4,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][17][2] = '12,3,3,3,3,3,7,1,14,3,3,3,3,3,3,3,6,1,4'.split(",");
levels[0][17][3] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1,4'.split(",");
levels[0][17][4] = '4,1,5,3,3,3,3,3,3,3,3,3,3,3,6,1,4,1,4'.split(",");
levels[0][17][5] = '4,1,4,1,1,1,1,1,1,1,1,1,1,1,4,1,4,1,4'.split(",");
levels[0][17][6] = '4,1,4,1,5,3,3,3,3,3,3,3,15,1,4,1,4,1,4'.split(",");
levels[0][17][7] = '4,1,4,1,4,2,1,1,1,1,1,1,1,1,4,1,4,1,4'.split(",");
levels[0][17][8] = '4,1,4,1,8,3,3,3,3,3,3,3,3,3,7,1,4,1,4'.split(",");
levels[0][17][9] = '4,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1,4'.split(",");
levels[0][17][10] = '4,1,8,3,3,3,3,3,3,3,3,3,3,3,3,3,7,1,4'.split(",");
levels[0][17][11] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][17][12] = '8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7'.split(",");
levels[0][17][13] = '1-5,5-7,5-1,4-1,3-1,2-1,1-1'.split(",");

levels[0][18] = new Array;

levels[0][18][0] = '5,3,3,3,3,3,3,3,3,10,3,3,3,3,3,3,3,3,6'.split(",");
levels[0][18][1] = '4,1,1,1,1,1,1,1,1,17,1,1,1,1,1,1,1,2,4'.split(",");
levels[0][18][2] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][18][3] = '12,3,3,3,3,3,3,15,1,18,1,14,3,3,3,3,3,3,11'.split(",");
levels[0][18][4] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][18][5] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][18][6] = '12,3,3,3,3,3,3,15,2,18,1,14,3,3,3,3,3,3,11'.split(",");
levels[0][18][7] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][18][8] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][18][9] = '12,3,3,3,3,3,3,15,1,18,1,14,3,3,3,3,3,3,11'.split(",");
levels[0][18][10] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][18][11] = '4,2,1,1,1,1,1,1,1,16,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][18][12] = '8,3,3,3,3,3,3,3,3,9,3,3,3,3,3,3,3,3,7'.split(",");
levels[0][18][13] = '4-11,16-7,2-7,16-4,2-4,16-1,2-1'.split(",");

levels[0][19] = new Array;

levels[0][19][0] = '5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6'.split(",");
levels[0][19][1] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][19][2] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][19][3] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][19][4] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][19][5] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][19][6] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][19][7] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][19][8] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][19][9] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][19][10] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][19][11] = '4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4'.split(",");
levels[0][19][12] = '8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7'.split(",");
levels[0][19][13] = '1-11,11-7,7-7,14-4,4-4,17-1,1-1'.split(",");

levels[0][20] = new Array;

levels[0][20][0] = '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'.split(",");
levels[0][20][1] = '0,5,3,3,3,6,5,3,6,0,0,0,0,0,0,0,0,0,0'.split(",");
levels[0][20][2] = '0,4,0,0,0,4,4,0,4,0,0,0,0,0,0,0,0,0,0'.split(",");
levels[0][20][3] = '0,4,0,0,0,4,8,3,7,0,0,0,0,0,0,0,0,0,0'.split(",");
levels[0][20][4] = '0,8,3,3,3,7,0,0,0,0,0,0,0,0,0,0,0,0,0'.split(",");
levels[0][20][5] = '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'.split(",");
levels[0][20][6] = '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'.split(",");
levels[0][20][7] = '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'.split(",");
levels[0][20][8] = '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'.split(",");
levels[0][20][9] = '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'.split(",");
levels[0][20][10] = '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'.split(",");
levels[0][20][11] = '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'.split(",");
levels[0][20][12] = '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'.split(",");
levels[0][20][13] = '7-2,4-3,3-3,2-3,4-2,3-2,2-2'.split(",");

var loop = 0;

while (loop < 13) {
  var loop2 = 0;

  while (loop2 < 19) {
    document.write("<span id='cell_" + loop + "_" + loop2 + "' style='position:absolute;left:" + (loop2 * 40) + ";top:" + (loop * 40 + 20) + ";'></span>");

    loop2++;
  }

  loop++;
}

function setUpLevel(levelNum) {
  levelEdit(levelNum + 1);
  titleDisplayer.style.left = -760;
  if (levelNum == 0) guard.style.left = -760;
  if (levelNum == 20) guard.style.left = 0;

  var loop = 0;
  var pickUpNum = 0;

  while (loop < 13) {
    var loop2 = 0;

    while (loop2 < 19) {
      if (levels[thisLevelSet][levelNum][loop][loop2] == "1" || levels[thisLevelSet][levelNum][loop][loop2] == "2") {
        pickUpNum++;
      }
      eval("cell_" + loop + "_" + loop2 + ".innerHTML='<img src=\"" + imageSRCs[levels[thisLevelSet][levelNum][loop][loop2]] + "\">';");

      eval("cell_" + loop + "_" + loop2 + ".style.top=loop*40+20+" + imagePosAdders[levels[thisLevelSet][levelNum][loop][loop2]][0] + ";");
      eval("cell_" + loop + "_" + loop2 + ".style.left=loop2*40+" + imagePosAdders[levels[thisLevelSet][levelNum][loop][loop2]][1] + ";");

      loop2++;
    }

    loop++;

  }

  var fig1 = levels[thisLevelSet][levelNum][13][0].split("-");

  player.setLeft(fig1[0]);
  player.setTop(fig1[1]);

  var fig1 = levels[thisLevelSet][levelNum][13][1].split("-");

  enemy1.setLeft(fig1[0]);
  enemy1.setTop(fig1[1]);

  var fig1 = levels[thisLevelSet][levelNum][13][2].split("-");

  enemy2.setLeft(fig1[0]);
  enemy2.setTop(fig1[1]);

  var fig1 = levels[thisLevelSet][levelNum][13][3].split("-");

  enemy3.setLeft(fig1[0]);
  enemy3.setTop(fig1[1]);

  var fig1 = levels[thisLevelSet][levelNum][13][4].split("-");

  enemy4.setLeft(fig1[0]);
  enemy4.setTop(fig1[1]);

  var fig1 = levels[thisLevelSet][levelNum][13][5].split("-");

  enemy5.setLeft(fig1[0]);
  enemy5.setTop(fig1[1]);

  var fig1 = levels[thisLevelSet][levelNum][13][6].split("-");

  enemy6.setLeft(fig1[0]);
  enemy6.setTop(fig1[1]);

  enemy1Disabled = false;
  enemy2Disabled = false;
  enemy3Disabled = false;
  enemy4Disabled = false;
  enemy5Disabled = false;
  enemy6Disabled = false;

  enemy1.setImage('Graphics/Enemy/enemy1right.gif');
  enemy2.setImage('Graphics/Enemy/enemy2left.gif');
  enemy3.setImage('Graphics/Enemy/enemy3right.gif');
  enemy4.setImage('Graphics/Enemy/enemy1left.gif');
  enemy5.setImage('Graphics/Enemy/enemy2right.gif');
  enemy6.setImage('Graphics/Enemy/enemy3left.gif');

  editPickUps(pickUpNum);
  if (levelNum == 0) monitorRunning = true;

}

gameStarted = false;
gameFinished = false;

document.onkeydown = keyDown;
document.onkeyup = keyUp;

leftKeyDown = false;
upKeyDown = false;
rightKeyDown = false;
downKeyDown = false;
rKeyDown = false;
eKeyDown = false;

function keyDown() {

  if (event.keyCode == 82) rKeyDown = true;
  if (event.keyCode == 69) eKeyDown = true;
  if (event.keyCode == 80) {
    if (!pauseDisabled) {
      alert("-- Pause --\n\nTip: " + randomTip());
      leftKeyDown = false;
      upKeyDown = false;
      rightKeyDown = false;
      downKeyDown = false;
      rKeyDown = false;
      eKeyDown = false;
      pauseDisabled = true;
      setTimeout("pauseDisabled=false;", 100);
    }
  }
  if (event.keyCode == leftButtons[controlSelection]) {
    goLeft();
    leftKeyDown = true;
  }
  if (event.keyCode == upButtons[controlSelection]) {
    goUp();
    upKeyDown = true;
  }
  if (event.keyCode == rightButtons[controlSelection]) {
    goRight();
    rightKeyDown = true;
  }
  if (event.keyCode == downButtons[controlSelection]) {
    goDown();
    downKeyDown = true;
  }

  if (!gameStarted && eKeyDown && rKeyDown) {
    alert("You are not allowed to reset the game before\nit has started.");
    leftKeyDown = false;
    upKeyDown = false;
    rightKeyDown = false;
    downKeyDown = false;
    rKeyDown = false;
    eKeyDown = false;
  } else if (gameStarted && eKeyDown && rKeyDown) {
    disableBlackPiece = true;
    setTimeout("disableBlackPiece=false;", 500);
    resetGame();
    eKeyDown = false;
    rKeyDown = false;
  }

}

tips = new Array;

tips[0] = "Use the 'P' key to pause your game.";
tips[1] = "A harder difficulty will give you a better score,\nbut no score counts unless the game is finished.";
tips[2] = "The ghosts only follow you, and don't register obstacles.\nControl the ghosts, make them go where you want them to\ngo.";
tips[3] = "You can cluster ghosts by moving around 2 or more of them.";
tips[4] = "The large dots in this game are essential, make sure\nyou only use them to eat the ghosts for points when\nyou can manage to collect the rest of the dots.";
tips[5] = "Because of a technical difficulty, you need to press\nyour directional key again AFTER the pause box is\nclosed.";
tips[6] = "For more great games, visit:\nJavascriptMania - http://www.freewebs.com/JavascriptMania\nOR\nDef-Logic Videogames - http://www.def-logic.com";
tips[7] = "This is a rather complex game, if the game is running\nslow, try closing some other open applications and\ncheck that all other user accounts are logged off.";
tips[8] = "If you wish to restart the game press E+R instead\nof refreshing the browser as this can result in extensive\nloading times especially if you are playing the game via the\ninternet.";
tips[9] = "You can use pause to plot strategies for levels.";

function randomTip() {
  var ranNum = Math.floor(Math.random() * tips.length);
  return tips[ranNum];
}

function keyUp() {

  if (event.keyCode == 82) rKeyDown = false;
  if (event.keyCode == 69) eKeyDown = false;
  if (event.keyCode == leftButtons[controlSelection]) {
    leftKeyDown = false;
  }
  if (event.keyCode == upButtons[controlSelection]) {
    upKeyDown = false;
  }
  if (event.keyCode == rightButtons[controlSelection]) {
    rightKeyDown = false;
  }
  if (event.keyCode == downButtons[controlSelection]) {
    downKeyDown = false;
  }

}

function checkInteger(num) {
  var num = eval(num);

  return (num != (Math.round(num))) ? false : true;

}

function goUp() {
  if (gameStarted == true && gameFinished == false) {

    if (checkInteger(player.theLeft)) {
      if (!testBlocked(player.theLeft, eval(player.theTop) - 1)) {
        playerNum = -1;
        playerTopLeft = false;
        player.moveTop(-1);
      }
    }

  }
}

function goDown() {
  if (gameStarted == true && gameFinished == false) {

    if (checkInteger(player.theLeft)) {
      if (!testBlocked(player.theLeft, eval(player.theTop) + 1)) {
        playerNum = 1;
        playerTopLeft = false;
        player.moveTop(1);
      }
    }

  }
}

function goLeft() {
  if (gameStarted == true && gameFinished == false) {

    var playerNum = player.imageRef.charAt(22);

    player.setImage("Graphics/Player/Player" + playerNum + "left.gif");

    if (checkInteger(player.theTop)) {
      if (!testBlocked(eval(player.theLeft) - 1, player.theTop)) {
        playerNum = -1;
        playerTopLeft = true;
        player.moveLeft(-1);
      }
    }

  }
}

function goRight() {
  if (gameStarted == true && gameFinished == false) {

    var playerNum = player.imageRef.charAt(22);

    player.setImage("Graphics/Player/Player" + playerNum + "right.gif");

    if (checkInteger(player.theTop)) {
      if (!testBlocked(eval(player.theLeft) + 1, player.theTop)) {
        playerNum = 1;
        playerTopLeft = true;
        player.moveLeft(1);
      }
    }

  }
}

function gameEndWin() {
  moveDisabled = true;
  gameFinished = true;
  titleDisplayer.style.left = 0;
  titleDisplayer.innerHTML = "<img src='congratulations.gif'>";

  displayCredits();

}

creditTimeout = setTimeout("", 10);
clearTimeout(creditTimeout);

function displayCredits() {

  endGameMsgCount = (endGameMsgCount == endGameMsgs.length) ? 0 : endGameMsgCount;
  creditSpan.style.left = 0;
  creditSpan.innerHTML = endGameMsgs[endGameMsgCount];
  endGameMsgCount++;

  creditTimeout = setTimeout("displayCredits();", 2000);
}

function gameEndLose() {

  disableBlackPiece = true;
  moveDisabled = true;

  resetGame();

}

function resetGame() {

  creditSpan.innerHTML = "";

  titleDisplayer.innerHTML = "<img src='startUp.gif'>";

  clearTimeout(creditTimeout);

  chaseBarFill.style.width = 0;

  setUpLevel(20);

  levelEdit(1);

  var fig1 = titleBar.innerHTML.split("SCORE: ");
  var fig2 = fig1[1].split("</CENTER>");

  fig2[0] = 0;
  var fig2 = fig2.join("");

  titleBar.innerHTML = fig1[0] + "SCORE: " + fig2;

  var fig1 = titleBar.innerHTML.split("LIVES: ");
  var fig2 = fig1[1].split("</CENTER>");
  fig2[0] = 1;
  var fig3 = fig2[0];
  var fig2 = fig2.join("");

  titleBar.innerHTML = fig1[0] + "LIVES: " + fig2;

  var fig1 = titleBar.innerHTML.split("PICK-UPS LEFT: ");
  var fig2 = fig1[1].split("</CENTER>");
  fig2[0] = 0;
  var fig3 = fig2[0];
  var fig2 = fig2.join("");

  titleBar.innerHTML = fig1[0] + "PICK-UPS LEFT: " + fig2;

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

  keys0.style.left = 18;
  keys1.style.left = 263;
  keys2.style.left = 508;

  moveDisabled = false;
  playerDisabled = false;
  enemy1Disabled = false;
  enemy2Disabled = false;
  enemy3Disabled = false;
  enemy4Disabled = false;
  enemy5Disabled = false;
  enemy6Disabled = false;

  titleDisplayer.style.left = 0;
  keys0.style.left = 18;
  keys1.style.left = 263;
  keys2.style.left = 508;
  document.option1.src = "keys0img.gif";
  document.option2.src = "keys1img.gif";
  document.option3.src = "keys2img.gif";
  optionText.innerHTML = "Select Your Keys";
  optionText.style.left = 238;
  startButton.style.left = 301;

  gameStarted = false;
  gameFinished = false;

}

function setPlayerImg() {
  playerImgCount = (playerImgCount == playerImgArray.length) ? 0 : playerImgCount;

  var adder = (document.playerImg.src.indexOf("right") != -1) ? "right" : "left";
  document.playerImg.src = "Graphics/Player/player" + playerImgArray[playerImgCount] + adder + ".gif";
  player.imageRef = "Graphics/Player/player" + playerImgArray[playerImgCount] + adder + ".gif";

  playerImgCount++;

  setTimeout("setPlayerImg();", 100);
}

function movingPiece(objName, theLeft, theTop, XOffSet, YOffSet, speed, theId, imageRef, imageName, moveEndCommand) {

  var theLeft = eval(theLeft);
  var theTop = eval(theTop);
  var speed = eval(speed);

  document.write("<span id='" + theId + "' style='position:absolute;left:" + (theLeft * 40 + XOffSet) + ";top:" + (theTop * 40 + 20 + YOffSet) + ";'><img src='" + imageRef + "' name='" + imageName + "'></span>");

  this.objName = objName;
  this.theLeft = theLeft;
  this.theTop = theTop;
  this.XOffSet = XOffSet;
  this.YOffSet = YOffSet;
  this.speed = speed;
  this.theId = theId;
  this.imageRef = imageRef;
  this.imageName = imageName;
  this.moveEndCommand = moveEndCommand;

  this.setLeft = setLeft;
  this.setTop = setTop;
  this.moveLeft = moveLeft;
  this.moveTop = moveTop;
  this.setImage = setImage;
}

function setImage(imageRef) {

  this.imageRef = imageRef;

  eval(this.imageName + ".src='" + imageRef + "';");

}

function setLeft(theLeft) {

  this.theLeft = theLeft;

  eval(this.theId + ".style.left=" + (theLeft * 40 + this.XOffSet) + ";");
}

function setTop(theTop) {

  this.theTop = theTop;

  eval(this.theId + ".style.top=" + (theTop * 40 + 20 + this.YOffSet) + ";");

}

function moveLeft(theLeft) {

  if (checkInteger(this.theLeft) && checkInteger(this.theTop)) {
    var speed = (theLeft > 0) ? this.speed : 0 - this.speed;
    moveLeftReal((eval(this.theLeft) + eval(theLeft)), this.objName, speed);

  }
}

function moveTop(theTop) {


  if (checkInteger(this.theTop) && checkInteger(this.theLeft)) {
    var speed = (theTop > 0) ? this.speed : 0 - this.speed;
    moveTopReal((eval(this.theTop) + eval(theTop)), this.objName, speed);

  }
}


playerMoveTimeout = setTimeout("", 10);
enemy1MoveTimeout = setTimeout("", 10);
enemy2MoveTimeout = setTimeout("", 10);
enemy3MoveTimeout = setTimeout("", 10);
enemy4MoveTimeout = setTimeout("", 10);
enemy5MoveTimeout = setTimeout("", 10);
enemy6MoveTimeout = setTimeout("", 10);


function moveLeftReal(goingTo, objName, speed) {
  if (!moveDisabled && !eval(objName + "Disabled")) {

    eval(objName + ".setLeft(eval(" + objName + ".theLeft)+(" + speed + "/40));");

    if (speed > 0) {

      if (eval(objName + ".theLeft") < goingTo) {
        var evalString = "moveLeftReal(" + goingTo + ",'" + objName + "'," + speed + ");";
        eval(objName + "MoveTimeout=setTimeout(\"" + evalString + "\", 10);");
      } else {
        eval(objName + ".setLeft(" + goingTo + ");");
        eval(eval(objName + ".moveEndCommand"));
      }

    } else {

      if (eval(objName + ".theLeft") > goingTo) {
        var evalString = "moveLeftReal(" + goingTo + ",'" + objName + "'," + speed + ");";
        eval(objName + "MoveTimeout=setTimeout(\"" + evalString + "\", 10);");
      } else {
        eval(objName + ".setLeft(" + goingTo + ");");
        eval(eval(objName + ".moveEndCommand"));
      }

    }

  }
}

function moveTopReal(goingTo, objName, speed) {
  if (!moveDisabled && !eval(objName + "Disabled")) {

    eval(objName + ".setTop(eval(" + objName + ".theTop)+(" + speed + "/40));");

    if (speed > 0) {

      if (eval(objName + ".theTop") < goingTo) {
        var evalString = "moveTopReal(" + goingTo + ",'" + objName + "'," + speed + ");";
        eval(objName + "MoveTimeout=setTimeout(\"" + evalString + "\", 10);");
      } else {
        eval(objName + ".setTop(" + goingTo + ");");
        eval(eval(objName + ".moveEndCommand"));
      }

    } else {

      if (eval(objName + ".theTop") > goingTo) {
        var evalString = "moveTopReal(" + goingTo + ",'" + objName + "'," + speed + ");";
        eval(objName + "MoveTimeout=setTimeout(\"" + evalString + "\", 10);");
      } else {
        eval(objName + ".setTop(" + goingTo + ");");
        eval(eval(objName + ".moveEndCommand"));
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

player = new movingPiece("player", -1, -1, 3, 3, 3, "playerSpan", "Graphics/Player/player1right.gif", "playerImg", "playerMoveEnd();");

function testOnOrb() {
  if (checkInteger(player.theLeft) && checkInteger(player.theTop)) {

    var cellNameOn = "cell_" + player.theTop + "_" + player.theLeft;
    if (eval(cellNameOn + ".innerHTML.indexOf('Dot.gif');") != -1) {
      if (eval(cellNameOn + ".innerHTML.indexOf('bigDot.gif');") != -1) {
        pickUpBigOrb();
      }
      var blankString = "<img src='Graphics/blank.gif'>";
      eval(cellNameOn + ".innerHTML=blankString;");
      scoreCredit(25);
      editPickUps(-1);
    }

  } else {
    return false;
  }
}

chasingTimeout = setTimeout("", 10);

function pickUpBigOrb() {
  clearTimeout(emptyChaseBarTimeout);
  chaseBarFill.style.width = 300;
  emptyChaseBar();

  clearTimeout(chasingTimeout);
  chasingGhosts = true;
}

emptyChaseBarTimeout = setTimeout("", 10);

function emptyChaseBar() {
  if (parseInt(chaseBarFill.style.width) != 0) {
    chaseBarFill.style.width = parseInt(chaseBarFill.style.width) - chaseDecreaseNum;
    emptyChaseBarTimeout = setTimeout("emptyChaseBar();", 100);
  } else {
    chasingGhosts = false;
    changeGhostImages();
    killGhostCount = 100;
  }
}

function changeGhostImages() {

  if (enemy1Disabled) {
    enemy1Disabled = false;
    setTimeout("moveEnemy('enemy1');", 500);
  }
  if (enemy2Disabled) {
    enemy2Disabled = false;
    setTimeout("moveEnemy('enemy2');", 500);
  }
  if (enemy3Disabled) {
    enemy3Disabled = false;
    setTimeout("moveEnemy('enemy3');", 500);
  }
  if (enemy4Disabled) {
    enemy4Disabled = false;
    setTimeout("moveEnemy('enemy4');", 500);
  }
  if (enemy5Disabled) {
    enemy5Disabled = false;
    setTimeout("moveEnemy('enemy5');", 500);
  }
  if (enemy6Disabled) {
    enemy6Disabled = false;
    setTimeout("moveEnemy('enemy6');", 500);
  }

  if (enemy1.imageRef.indexOf("Captured") == -1) enemy1.setImage('Graphics/Enemy/enemy1left.gif');
  if (enemy2.imageRef.indexOf("Captured") == -1) enemy2.setImage('Graphics/Enemy/enemy2right.gif');
  if (enemy3.imageRef.indexOf("Captured") == -1) enemy3.setImage('Graphics/Enemy/enemy3left.gif');
  if (enemy4.imageRef.indexOf("Captured") == -1) enemy4.setImage('Graphics/Enemy/enemy1right.gif');
  if (enemy5.imageRef.indexOf("Captured") == -1) enemy5.setImage('Graphics/Enemy/enemy2left.gif');
  if (enemy6.imageRef.indexOf("Captured") == -1) enemy6.setImage('Graphics/Enemy/enemy3right.gif');

}

function testBlocked(theLeft, theTop) {
  if (checkInteger(theLeft) && checkInteger(theTop)) {

    var thisCellData = eval("cell_" + theTop + "_" + theLeft + ".innerHTML.split('/');");
    var thisCellData = thisCellData[thisCellData.length - 1].split(".");
    var thisCellData = thisCellData[0];

    if (thisCellData == "smallDot" || thisCellData == "bigDot" || thisCellData == "blank") {
      return false;
      alert(thisCellData + "|| False returned");
    } else {
      return true;
      alert(thisCellData + "|| True returned");
    }

  } else {
    return true;
  }
}

function replace(string, ridOf, replaceWith) {

  var string = string.split(ridOf);
  var string = string.join(replaceWith);

  return string;
}

function levelEdit(num) {

  var fig1 = titleBar.innerHTML.split("LEVEL: ");
  var fig2 = fig1[1].split("</CENTER>");

  fig2[0] = num;
  var fig2 = fig2.join("");

  titleBar.innerHTML = fig1[0] + "LEVEL: " + fig2;

}

function scoreCredit(num) {

  score += num;

  if (lifeCredits < Math.floor(score / lifeCreditFrequency)) {
    lives += Math.floor(score / lifeCreditFrequency) - lifeCredits;
    editLife(Math.floor(score / lifeCreditFrequency) - lifeCredits);
    lifeCredits += Math.floor(score / lifeCreditFrequency) - lifeCredits;
  }

  var fig1 = titleBar.innerHTML.split("SCORE: ");
  var fig2 = fig1[1].split("</CENTER>");

  fig2[0] = score * scoreMultiplier;
  var fig2 = fig2.join("");

  titleBar.innerHTML = fig1[0] + "SCORE: " + fig2;

}

function editLife(num) {

  var fig1 = titleBar.innerHTML.split("LIVES: ");
  var fig2 = fig1[1].split("</CENTER>");
  fig2[0] = eval(fig2[0]) + num;
  var fig3 = fig2[0];
  var fig2 = fig2.join("");

  titleBar.innerHTML = fig1[0] + "LIVES: " + fig2;

  if (fig3 == 0) {
    gameEndLose();
  }
}

function editPickUps(num) {

  var fig1 = titleBar.innerHTML.split("PICK-UPS LEFT: ");
  var fig2 = fig1[1].split("</CENTER>");
  fig2[0] = eval(fig2[0]) + num;
  var fig3 = fig2[0];
  var fig2 = fig2.join("");

  titleBar.innerHTML = fig1[0] + "PICK-UPS LEFT: " + fig2;

  if (fig3 == 0) {
    goNextLevel();
  }

}

function goNextLevel() {
  thisLevel++;

  if (thisLevel == levels[thisLevelSet].length) {
    alert();
    gameEndWin();
  } else {

    moveDisabled = true;
    blackTrans.innerHTML = "<img src='coverPiece2.gif'>";
    moveBlackPiece("setUpLevel(" + thisLevel + ");");

  }
}

enemy1 = new movingPiece("enemy1", -1, -1, 9, 3, 2, "enemy1Span", "Graphics/Enemy/enemy1left.gif", "enemy1Img", "moveEnemy('enemy1');");
enemy2 = new movingPiece("enemy2", -1, -1, 9, 3, 2, "enemy2Span", "Graphics/Enemy/enemy2left.gif", "enemy2Img", "moveEnemy('enemy2');");
enemy3 = new movingPiece("enemy3", -1, -1, 9, 3, 2, "enemy3Span", "Graphics/Enemy/enemy3left.gif", "enemy3Img", "moveEnemy('enemy3');");
enemy4 = new movingPiece("enemy4", -1, -1, 9, 3, 2, "enemy4Span", "Graphics/Enemy/enemy1left.gif", "enemy4Img", "moveEnemy('enemy4');");
enemy5 = new movingPiece("enemy5", -1, -1, 9, 3, 2, "enemy5Span", "Graphics/Enemy/enemy2left.gif", "enemy5Img", "moveEnemy('enemy5');");
enemy6 = new movingPiece("enemy6", -1, -1, 9, 3, 2, "enemy6Span", "Graphics/Enemy/enemy3left.gif", "enemy6Img", "moveEnemy('enemy6');");

function moveEnemy(enemyName) {

  var thisOb = eval(enemyName);
  var theLeft = thisOb.theLeft;
  var theTop = thisOb.theTop;

  var playerLeft = player.theLeft;
  var playerTop = player.theTop;

  var predictFig = fixNegative(player.theLeft - theLeft) + fixNegative(player.theTop - theTop);
  var multiplier = (predictFig > 6) ? 6 : predictFig;

  if (playerTopLeft != null) {

    if (playerTopLeft) var playerLeft = playerLeft + (playerNum * multiplier);
    if (!playerTopLeft) var playerTop = playerTop + (playerNum * multiplier);

  }

  var leftDif = fixNegative(player.theLeft - theLeft);
  var leftNum = (fixNegative(player.theLeft - theLeft) == player.theLeft - theLeft) ? 1 : -1;
  var topDif = fixNegative(player.theTop - theTop);
  var topNum = (fixNegative(player.theTop - theTop) == player.theTop - theTop) ? 1 : -1;

  if (leftDif > topDif) {
    var prior1 = "thisOb.moveLeft(" + leftNum + ");";
    var prior2 = "thisOb.moveTop(" + topNum + ");";
    var prior3 = "thisOb.moveTop(" + (0 - topNum) + ");";
    var prior4 = "thisOb.moveLeft(" + (0 - leftNum) + ");";

    if (chasingGhosts) {
      if (!testBlocked(eval(theLeft) - leftNum, theTop)) {
        eval(prior4);
        turnEnemy(enemyName, 0 - leftNum);
      } else if (!testBlocked(theLeft, eval(theTop) - topNum)) eval(prior3);
      else if (!testBlocked(theLeft, eval(theTop) + topNum)) eval(prior2);
      else if (!testBlocked(eval(theLeft) + leftNum, theTop)) {
        eval(prior1);
        turnEnemy(enemyName, leftNum);
      } else setTimeout("moveEnemy('" + enemyName + "');", 500);
    } else {
      if (!testBlocked(eval(theLeft) + leftNum, theTop)) {
        eval(prior1);
        turnEnemy(enemyName, leftNum);
      } else if (!testBlocked(theLeft, eval(theTop) + topNum)) eval(prior2);
      else if (!testBlocked(theLeft, eval(theTop) - topNum)) eval(prior3);
      else if (!testBlocked(eval(theLeft) - leftNum, theTop)) {
        eval(prior4);
        turnEnemy(enemyName, 0 - leftNum);
      } else setTimeout("moveEnemy('" + enemyName + "');", 500);
    }

  } else {
    var prior1 = "thisOb.moveTop(" + topNum + ");";
    var prior2 = "thisOb.moveLeft(" + leftNum + ");";
    var prior3 = "thisOb.moveLeft(" + (0 - leftNum) + ");";
    var prior4 = "thisOb.moveTop(" + (0 - topNum) + ");";

    if (chasingGhosts) {
      if (!testBlocked(theLeft, eval(theTop) - topNum)) eval(prior4);
      else if (!testBlocked(eval(theLeft) - leftNum, theTop)) {
        eval(prior3);
        turnEnemy(enemyName, 0 - leftNum);
      } else if (!testBlocked(eval(theLeft) + leftNum, theTop)) {
        eval(prior2);
        turnEnemy(enemyName, leftNum);
      } else if (!testBlocked(theLeft, eval(theTop) + topNum)) eval(prior1);
      else setTimeout("moveEnemy('" + enemyName + "');", 500);
    } else {
      if (!testBlocked(theLeft, eval(theTop) + topNum)) eval(prior1);
      else if (!testBlocked(eval(theLeft) + leftNum, theTop)) {
        eval(prior2);
        turnEnemy(enemyName, leftNum);
      } else if (!testBlocked(eval(theLeft) - leftNum, theTop)) {
        eval(prior3);
        turnEnemy(enemyName, 0 - leftNum);
      } else if (!testBlocked(theLeft, eval(theTop) - topNum)) eval(prior4);
      else setTimeout("moveEnemy('" + enemyName + "');", 500);
    }

  }

  if (chasingGhosts) changeEnemyImage(enemyName);

}

function turnEnemy(enemyName, leftNum) {

  var direction = (leftNum == 1) ? "right" : "left";
  eval(enemyName + ".setImage('" + fixEnemyName(enemyName) + direction + ".gif');");

}

function changeEnemyImage(enemyName) {

  var thisOb = eval(enemyName);
  var thisImg = thisOb.imageRef;

  var thisEnemyNum = enemyName.charAt(enemyName.length - 1);

  if (thisImg.indexOf("Run") == -1) {

    if (thisImg.indexOf("Captured") == -1) {

      var thisImg = thisImg.split(thisImg.charAt(20));
      var thisImg = thisImg.join("Run");

    } else {

      var thisImg = thisImg.split("Captured" + thisImg.charAt(thisImg.length - 1));

      var adder = (Math.ceil(Math.random * 2) == 1) ? "Left" : "Right";

      var thisImg = thisImg.join("Run" + adder);

    }

    thisOb.setImage(thisImg);

  }
}

function fixEnemyName(theName) {

  var num = eval(theName.charAt(theName.length - 1));
  if (num > 3) {
    var num = num - 3;
  }
  return "Graphics/Enemy/enemy" + num;

}

function fixNegative(num) {

  var num = num + "";
  var num = replace(num, "-", "");

  return eval(num);
}

function loseLife() {
  moveDisabled = true;
  blackTrans.innerHTML = "<img src='coverPiece.gif'>";
  moveBlackPiece("loseLifeReal();");

}

function loseLifeReal() {

  var fig1 = levels[thisLevelSet][thisLevel][13][0].split("-");

  player.setLeft(fig1[0]);
  player.setTop(fig1[1]);

  var fig1 = levels[thisLevelSet][thisLevel][13][1].split("-");

  enemy1.setLeft(fig1[0]);
  enemy1.setTop(fig1[1]);

  var fig1 = levels[thisLevelSet][thisLevel][13][2].split("-");

  enemy2.setLeft(fig1[0]);
  enemy2.setTop(fig1[1]);

  var fig1 = levels[thisLevelSet][thisLevel][13][3].split("-");

  enemy3.setLeft(fig1[0]);
  enemy3.setTop(fig1[1]);

  var fig1 = levels[thisLevelSet][thisLevel][13][4].split("-");

  enemy4.setLeft(fig1[0]);
  enemy4.setTop(fig1[1]);

  var fig1 = levels[thisLevelSet][thisLevel][13][5].split("-");

  enemy5.setLeft(fig1[0]);
  enemy5.setTop(fig1[1]);

  var fig1 = levels[thisLevelSet][thisLevel][13][6].split("-");

  enemy6.setLeft(fig1[0]);
  enemy6.setTop(fig1[1]);

  if (lives != 1) pickUpBigOrb();

  editLife(-1);

}

function ghostCollisionCheck() {

  px = parseInt(playerSpan.style.left);
  py = parseInt(playerSpan.style.top);

  ex = parseInt(enemy1Span.style.left);
  ey = parseInt(enemy1Span.style.top);

  if ((px + 34 > ex) && (px < ex + 22) && (py + 34 > ey) && (py < ey + 34)) {
    if (!enemy1Disabled) {
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
      if (!enemy2Disabled) {
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
        if (!enemy3Disabled) {
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
          if (!enemy4Disabled) {
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
            if (!enemy5Disabled) {
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
              if (!enemy6Disabled) {
                if (chasingGhosts) {
                  killEnemy('enemy6');
                } else {
                  loseLife();
                  monitorRunning = false;
                }
              }
            } else {

            }
          }
        }
      }
    }
  }
}

function killEnemy(enemyName) {
  if (thisLevel < levels[thisLevelSet].length) {
    eval(enemyName + "Disabled=true;");
    var fig1 = levels[thisLevelSet][thisLevel][13][eval(enemyName.charAt(enemyName.length - 1))].split("-");
    var fig2 = fig1[0];
    var fig3 = fig1[1];
    eval(enemyName + ".setLeft(" + fig2 + ");");
    eval(enemyName + ".setTop(" + fig3 + ");");
    var ranNum = Math.ceil(Math.random() * 2);

    eval(enemyName + ".setImage('Graphics/Enemy/enemyCaptured" + ranNum + ".gif');");

    eval("scoreDisplayer" + killGhostCount + ".style.left=" + (player.theLeft * 40 + 10) + ";");
    eval("scoreDisplayer" + killGhostCount + ".style.top=" + (player.theTop * 40 + 10) + ";");

    scoreCredit(killGhostCount);

    setTimeout("scoreDisplayer" + killGhostCount + ".style.left=-100;", 750);
    setTimeout("scoreDisplayer" + killGhostCount + ".style.top=-100;", 750);

    killGhostCount = killGhostCount * 2;
    killGhostCount = (killGhostCount == 6400) ? 3200 : killGhostCount;

  }
}

monitorTimeout = setTimeout("", 10);

collisionMonitorCount = 0;

function monitorCollisions() {
  if (monitorRunning) ghostCollisionCheck();
  setTimeout("monitorCollisions();", 100);
}

function moveBlackPiece(coverCommand) {
  if (!disableBlackPiece) {
    moveDisabled = true;
    if (parseInt(blackTrans.style.left) == 0) eval(coverCommand);
    blackTrans.style.left = parseInt(blackTrans.style.left) + 5;
    if (parseInt(blackTrans.style.left) < 760) setTimeout("moveBlackPiece('" + coverCommand + "');", 10);
    else {
      blackTrans.style.left = -760;
      monitorRunning = true;
      moveDisabled = false;

      if (parseInt(titleDisplayer.style.left) != 0) {
        gameStarted = true;
        guard.style.left = -760;
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