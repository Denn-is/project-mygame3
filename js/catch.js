class Catch {
    constructor(game) {
        this.game = game;
        this.width = game.width/50;
        this.minHeight = 20;
        this.maxHeight = game.height-50;
        this.height = Math.floor(Math.random() * (this.maxHeight - this.minHeight + 1) + this.minHeight);
        this.color = "green";
        this.x = game.width;
        this.y = Math.floor((Math.random() * this.height)-this.minHeight);
        this.speedX = 1;
        this.myCatches = [];
    }

    draw() {
        this.game.context.fillStyle = this.color;
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
    }
  
    updateCatches() {
        for (let i = 0; i < this.myObstacles.length; i++) {
          this.myCatches[i].x += -1;
          this.myCatches[i].this.draw();
        }
    }
    newPos() {
      this.x -= this.speedX;
    }

    left() {
      return this.x;
    }
    right() {
      return ;
    }
    top() {
      return this.y;
    }
    bottom() {
      return this.y + this.height;
    }
}

// todo: 
// - connect catches into game (words changed: catches, myCatches)