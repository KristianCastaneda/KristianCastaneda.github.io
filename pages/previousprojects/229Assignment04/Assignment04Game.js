// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";



// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/mole.png";

// Game objects
var monster = {};
var monstersCaught = 0;

// mouse move event
if (browser=="Netscape") document.captureEvents(Event.MOUSEMOVE)
document.onmousemove = mouseMove;

//mouse events
addEventListener("mousedown", mouseDown, false);
addEventListener("mouseup", mouseUp, false);

});
// Reset the game when the player catches a monster
var reset = function () {
    // Throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 96));
};

// Update game objects
var update = function (modifier) {
    // Are they touching?

    if (
		onmousedown == (monster.x + 32)
		&& monster.x == (onmousedown + 32)
		&& onmousedown == (monster.y + 32)
		&& monster.y == (canvas.y + 32)
	) {
        ++monstersCaught;
        reset();
    }
};

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Moles caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;
};

// Let's play this game!
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible
