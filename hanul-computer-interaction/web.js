let cam;
let poseNet;
let poses = [];
let currentMillis, previousMillis;
let interval = 1000;
let currentPose;

// let mySound;
let input;
// let analyzer;

const params = {
  frame_rate: 0,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  frameRate(30);

  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(cam, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function (results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  cam.hide();
  currentMillis = millis();
  previousMillis = millis();

  // input = new p5.AudioIn();
  //
  // input.start();

  // const buffer = new Float32Array(44100);
  //
  // fft = new p5.FFT(0, 64);
  // fft.setInput(mySound);
  //
  // analyzer = new p5.Amplitude();
  // analyzer.setInput(mySound);
  //
  // let wavelength = 44100 / random(100, 6000);
  // for (let i = 0; i < 44100; i++) {
  //   if (i % 5000 === 0) {
  //     wavelength = 44100 / random(200, 600);
  //   }
  //   buffer[i] = cos((i / wavelength) * 2 * PI);
  // }
  //
  // mySound = new p5.SoundFile();
  // mySound.setBuffer([buffer]);
  //
  // const startButton = createButton('play');
  // startButton.mousePressed(start);
  //
  // const stopButton = createButton('stop');
  // stopButton.mousePressed(stop);
}

function modelReady() {
  print("Model Loaded");
}

function mousePressed() {
  if (
    mouseX > 0 &&
    mouseX < windowWidth &&
    mouseY > 0 &&
    mouseY < windowHeight
  ) {
    let fs = fullscreen();
    fullscreen(!fs);
    // background(random(0, 255), random(0, 255), random(0, 255));
  }
}

function keyTyped() {
  if (key === "s" || key === "S") {
    saveCanvas("myCanvas", "jpg");
    print("saving image");
  }
  return false;
}

// function start() {
//   mySound.loop(1, 0.8, 1);
// }
//
// function stop() {
//   mySound.pause();
// }

function draw() {
  // createCanvas(windowWidth, windowHeight);
  // image(cam, 0, 0, width, height);
  // background(frameCount);
  background(0, 0, 0, 50);

  //move image by the width of image to the left
  translate(cam.width, 0);
  //then scale it by -1 in the x-axis
  //to flip the image
  scale(-1, 1);

  // clear();
  noFill();

  if (currentPose) {
    fill(random(0, 255), random(0, 255), random(0, 255), random(0, 5));
    fuzzy_ellipse(currentPose.nose.x, currentPose.nose.y, 50, 75, 100);
  }

  params.frame_rate = frameRate();

  if (poses.length > 0) {
    currentPose = poses[0].pose;
  }

  // We can call both functions to draw all keypoints and the skeletons

  // drawKeypoints();

  drawSkeleton();
}

function fuzzy_ellipse(x, y, w, h, fuzz = 100) {
  for (let i = 0; i < 1000; i++) {
    const xx = random(-fuzz, fuzz);
    const yy = random(-fuzz, fuzz);
    if (dist(0, 0, xx, yy) > fuzz) continue;
    noStroke();
    ellipse(x + xx, y + yy, w, h);
  }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(random(155, 255), random(155, 255), random(155, 255));
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      for (let k = 0; k < 1000; k++) {
        const aa = random(-30, 30);
        const bb = random(-30, 30);
        if (dist(0, 0, aa, bb) > 100) continue;
        strokeWeight(1);
        // stroke(random(0, 255), random(0, 255), random(0, 255), random(0, 10));
        stroke(random(200, 255), random(200, 255), random(200, 255), random(0,5));
        // ellipse(partA.position.x + aa, partB.position.y + bb, 50, 50);
        line(
          partA.position.x + aa,
          partA.position.y + bb,
          partB.position.x + aa,
          partB.position.y + bb
        );
      }
    }
  }
}
