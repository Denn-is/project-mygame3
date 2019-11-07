class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.context = this.canvas.getContext("2d");
    this.player = new Player (this);
    this.catch = new Catch (this);
    this.catches = new Catch (this);
    this.controls = new Controls(this);
    this.controls.setControls();
    this.myObstacles = [];
    this.toCatches = [];
    this.catchScore = 0;
    this.obstacleTimer = 0;
    this.speed = 3000;
    this.loop;
    this.scoreObstaclesCounter = 0;
    this.points = 0;
  }

  start () {
    this.animation()
  }

  animation(timestamp) {
    //console.log(this.scoreObstaclesCounter)
    //this.scoreObstaclesCounter = 0;
    // this.updateEverything(timestamp)
    this.loop = window.requestAnimationFrame((timestamp) => this.animation(timestamp));
    this.updateEverything(timestamp);
    // console.log("timestamp",Math.round(timestamp,2) )
    // console.log("this.scoreObstaclesCounter", this.scoreObstaclesCounter)
    // console.log("this.scoreObstaclesCounter + timestamp",this.scoreObstaclesCounter + Math.round(timestamp,2))
    // this.scoreObstaclesCounter = this.scoreObstaclesCounter + parseInt((timestamp/1000).value);
    //console.log("this.scoreObstaclesCounter",typeof this.scoreObstaclesCounter, this.scoreObstaclesCounter)
    this.drawEverything();
  }

  drawEverything() {
    this.clear();
    this.scorePassedObstacles2();
    this.scoreCharger();
    this.player.draw();
    for (let i = 0; i < this.myObstacles.length; i++) {
      this.myObstacles[i].draw();
    }
    
  }

  updateEverything(timestamp) {
    this.player.newPos();

    if(this.obstacleTimer < timestamp - this.speed){
      this.myObstacles.push(new Obstacle(this));
      this.obstacleTimer = timestamp;
    }

    for (let i = 0; i < this.myObstacles.length; i++) {
      this.myObstacles[i].newPos();
    }

    this.checkCrash();
    
    this.scorePassedObstacles2();
    
    // this.catches.updateCatches();
    // // update the catch array
  
    // check if the game should stop
    // this.checkGameOver();
    // // check if players hoovers over scoreArea
    // this.checkHoover();
    // // update and draw the score
    // this.scoreTime();
    // this.scoreCatches();
  }

  clear () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  stop () {
    this.reset();
  }

  reset () {
    cancelAnimationFrame(this.loop)
  }

  checkCrash() {
    for(let i = 0; i<this.myObstacles.length; i++) {
      const obstacle = this.myObstacles[i];
      if (
          this.player.bottom() < obstacle.y ||
          this.player.top() > (obstacle.y + obstacle.height) ||
          this.player.right() < obstacle.x ||
          this.player.left() > (obstacle.x + obstacle.width)
      ) {
        // this.updateEverything()
      } else {
        this.stop()
      }
    }
  }
  
  scorePassedObstacles2 () {
    for(let i = 0; i<this.myObstacles.length; i++) {
      if (0 === (this.myObstacles[i].x)
      ) {
        this.points = this.points + 1/2;
        console.log(this.points);
      } 
    }
    this.context.font = "18px serif";
    this.context.fillStyle = "black";
    this.context.fillText("Score by obstacle: " + this.points, this.width/20, this.height*1/3);
    // console.log("scoring!")
    }
  
  scoreCharger() {
      console.log("i am counting charges")
    };
}






  // checkHoover() {
  //   var scored = this.toCatches.some(function(toCatch) {
  //     return player.crashWith(toCatch);
  //   });

  //   if (scored) {
  //     myGameArea.scoredCatch();
  //   }
  // }  

  // scoredCatch () {
  //   this.catchScore = this.catchScore + 1;
  // }



  // scoreCatches () {
  //   var points = this.catchScore/100;
  //   this.context.font = "18px serif";
  //   this.context.fillStyle = "black";
  //   this.context.fillText("Score by catches: " + points, this.canvas.width/20, this.canvas.height*1/5);
  // }
// }


// scorePassedObstacles () {
//   var points = Math.floor((this.frames / 120)-15);
//   this.context.font = "18px serif";
//   this.context.fillStyle = "black";
//   this.context.fillText("Score by obstacle: " + points, this.canvas.width/20, this.canvas.height*1/3);
// }