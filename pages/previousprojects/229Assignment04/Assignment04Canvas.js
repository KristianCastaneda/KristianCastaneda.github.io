//canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.id = "renderCanvas";
canvas.width = 850;
canvas.height = 550;
document.getElementById("gameCanvas").appendChild(canvas);

//background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";

//cursor image
var cursImgWidth = 20;
var cursHitBoxLess = 15;

var cursorImage = new Image();
cursorImage.src = "images/bluecrosshair.png";


var cursorDnImage = new Image();
cursorDnImage.src = "images/redcrosshair.png";

//bubble pop image
var popDelay = 150; 
var popImage = new Array();
popImage[0] = new Image();
popImage[0].src = "images/splash.png"

var popDelay = Math.round(750 / (popImage.length));

//bubble image
var bubbleImgWidth = 100;

var bubbles = new Array();
bubbles[0] = new Image();
bubbles[0].src = "images/bubble.png";


var phrase = "";

// Game objectS
var bubbleMvsp = 2000 
var mvspMod = 0.99; 
var bubbleImgLoop = 0;

var bubble = {};
var bubbleType = 0;
var bubblesHit = 0;
var cursor = {};
var mouseHold = false;

var thenPop = 0;
var thenMonMove = 0;
var now = 0;

var browser = navigator.appName;
// mouse move event
if (browser == "Netscape") document.captureEvents(Event.MOUSEMOVE)
document.onmousemove = mouseMove;

//mouse events
addEventListener("mousedown", mouseDown, false);
addEventListener("mouseup", mouseUp, false);


var rect = canvas.getBoundingClientRect();

//reset function
var reset = function () {
    bubble.x = 32 + (Math.random() * (canvas.width - bubbleImgWidth - 64));
    bubble.y = 32 + (Math.random() * (canvas.height - bubbleImgWidth - 64));
};


var popMax = 10;
var popList = new Array();
for (i = 0; i < popMax; i++) {
    popList[i] = {};
}
var popCount = 0;

//hit check
var hitCheck = function () {
    ctx.drawImage(cursorDnImage, cursor.x, cursor.y);
    if (
        cursor.x + cursHitBoxLess <= (bubble.x + bubbleImgWidth)
        && bubble.x <= (cursor.x + cursImgWidth - cursHitBoxLess)
        && cursor.y + cursHitBoxLess <= (bubble.y + bubbleImgWidth)
        && bubble.y <= (cursor.y + cursImgWidth - cursHitBoxLess)
        ) {


        if (popCount > popMax - 1) popCount = 0;
        popList[popCount].x = bubble.x;
        popList[popCount].y = bubble.y;
        popList[popCount].size = bubbleImgWidth;
        popList[popCount].count = 0;
        popCount++;

        ++bubblesHit;
        bubbleMvsp *= mvspMod;
        reset();
    }
};

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(bubbles[bubbleType], bubble.x, bubble.y, bubbleImgWidth, bubbleImgWidth);
    ctx.fillText(phrase, bubble.x + (bubbleImgWidth / 2), bubble.y + bubbleImgWidth);
    if (mouseHold) {
        ctx.drawImage(cursorDnImage, cursor.x, cursor.y);
    }
    else {
        ctx.drawImage(cursorImage, cursor.x, cursor.y);
    }

    // Score
    document.getElementById("hit").innerHTML = bubblesHit;
    document.getElementById("speed").innerHTML = Math.round(bubbleMvsp);


    
    now = new Date().getTime();
    
    if (now - thenPop > popDelay - 1) {
        thenPop = now;
        for (i = 0; i < popList.length; i++) {
            popObj = popList[i];
            if (popObj.count < popImage.length) {
                popObj.count++; 
            }
        }
    }

    
    for (i = 0; i < popList.length; i++) {
        popObj = popList[i];
        if (popObj.count < popImage.length) {
            ctx.drawImage(popImage[popObj.count], popObj.x - popObj.size, popObj.y - popObj.size, popObj.size * 2, popObj.size * 2);
        }
    }
};

// The main game loop
var main = function () {
    render();
    now = new Date().getTime();
    if (now - thenMonMove > bubbleMvsp) {
        reset();
        thenMonMove = now;
    }
    else { }
    if (bubbleMvsp < 100) {
        
        alert("Congratulations! You are the new Bubble Sniper King");
        bubbleMvsp = 2000;
        main();
    }
    else {
        setTimeout(function () { main() }, popDelay);
    }
};

// Get Cursor Position
function mouseMove(e) {
    if (browser == "Opera") { 
        tempX = e.pageX - rect.left
        tempY = e.pageY - rect.top
    } else if (browser == "Netscape") {  
        tempX = e.pageX - rect.left
        tempY = e.pageY - rect.top
    }
    else { 
        tempX = event.clientX + document.documentElement.scrollLeft - rect.left
        tempY = event.clientY + document.documentElement.scrollTop - rect.top
    }
    
    if (tempX < 0) { tempX = 0 }
    else if (tempX > canvas.width - cursImgWidth) {
        tempX = canvas.width - cursImgWidth;
    }
    if (tempY < 0) { tempY = 0 }
    else if (tempY > canvas.height - cursImgWidth) {
        tempY = canvas.height - cursImgWidth;
    }
   
   
    cursor.x = tempX
    cursor.y = tempY

    render();

    return true;
}

function mouseDown(e) {
    hitCheck();
    mouseHold = true;
}
function mouseUp(e) {
    mouseHold = false;
}


function start() {
    thenPop = new Date().getTime();
    thenMonMove = new Date().getTime();

    ctx.fillStyle = "rgb(255, 255, 0)";
    ctx.font = "italic 16px Helvetica ";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.shadowBlur = 2;
    ctx.shadowColor = "black"
    reset();
    main();
}
start();
