var canvas;
var myTurtle;

// resizing window allows the window to refresh and recreate the graphics,
// but it gets buggy and laggy on mobile so i got rid of it.
// also the static positioning of the tree works well on web.
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');

  noFill();
  stroke(155, 212, 252);
  noLoop();
  myTurtle = new Turtle();
}

function draw() {

  background(245, 251, 255, 1);
  myTurtle.penUp();
  myTurtle.moveTo(windowWidth / 2, windowHeight);
  myTurtle.turnTo(-80);
  myTurtle.penDown();
  drawBranch(100);

}


function drawBranch(length) {

  if (length < 4) {
    return;
  }

  // draw this branch
  strokeWeight(length / 20);
  myTurtle.moveForward(length * .2);
  myTurtle.turnLeft(4);
  myTurtle.moveForward(length * .2);
  myTurtle.turnLeft(4);
  myTurtle.moveForward(length * .7);

  // left child
  myTurtle.pushState();
  myTurtle.turnLeft(random(4, 22));
  drawBranch(length * 0.75);
  drawBranch(length * random(.4, .8));
  myTurtle.popState();

  // right child
  myTurtle.pushState();
  myTurtle.turnRight(random(4, 42));
  drawBranch(length * 0.75);
  drawBranch(length * random(.4, .8));
  myTurtle.popState();

}
