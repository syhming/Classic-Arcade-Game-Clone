//movement: game size 505px x 498px
var tileHeight = 83;
var tileWidth = 101;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-princess-girl.png';
    this.x = 0;
    //spawn enemy location
    if (this.x = 0){
      this.y = Math.floor(Math.random() * 4) * tileHeight;
      if (this.y <= 83){
        this.y += 83;
      }
    }
    //randomize the individual enemy speed
    this.speed = Math.floor(Math.random() * 400) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;

//setting enemy movement
    if (this.x > 505){
      this.x = 0;
      this.y = Math.floor(Math.random() * 4) * tileHeight;
      if (this.y <= 83){
        this.y += 83;
      }
      this.speed = Math.floor(Math.random() * 400) + 100;
    }

    var collision = Math.abs(player.x - this.x);
    if (collision < 51.5 && this.y === player.y){
      //resets player location when running into enemy
      player.x = tileWidth * 2;
      player.y = tileHeight * 5;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function(){
  this.sprite = 'images/char-boy.png';
  //player sprite spawn location; middle of tile, middle bottom of board
  this.x = tileWidth * 2;
  this.y = tileHeight * 5;
  this.score = 0;
};

player.prototype.update = function(dt){};

player.prototype.render= function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.handleInput = function(keyPress){
  switch(keyPress){
    case "up": if(this.y > tileHeight){
      this.y -= tileHeight;
    }
      //when player crosses last row of stone tiles
      else if(this.y < (tileHeight * 2)){
      this.x = tileWidth * 2;
      this.y = tileHeight * 5;
      //trying to add a score counter and clear it with each update
      this.score += 1;
      //try 'appending' data to the end of the canvas in the same location
      //or try adding a second canvas just for the score
      ctx.clearRect(1, 590, 505, 20);
      ctx.font = '20px Arial';
      ctx.fillText('Score: ' + this.score, 5, 606);
    }
    break;
    case "down": if(this.y < tileHeight * 5){
      this.y += tileHeight;
    }
    break;
    case "left": if(this.x > 0){
      this.x -= tileWidth;
    }
    break;
    case "right": if(this.x < (tileWidth * 4)){
      this.x += tileWidth;
    }
    break;
  }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [];
var createEnemy = function(number){
  enemyNumber = number
  for (var i = 0; i < enemyNumber; i++){
    allEnemies.push(new Enemy);
  }
}(3);

player = new player();
//draw score in top right of canvas on the 'water' tiles


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
