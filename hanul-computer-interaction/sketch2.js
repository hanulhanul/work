let video;
let poseNet;
let poses = [];
let currentMillis, previousMillis;
let interval = 1000;
let currentPose;

let mySound;

const params = {
  frame_rate: 0,
};

function setup() {
  createCanvas(1280, 800);
  frameRate(30);

  video = createCapture(VIDEO);
  video.size(1280, 800);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function (results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
  currentMillis = millis();
  previousMillis = millis();

  const buffer = new Float32Array(44100);

  fft = new p5.FFT(0, 64);
  fft.setInput(mySound);

  analyzer = new p5.Amplitude();
  analyzer.setInput(mySound);

  let wavelength = 44100 / random(100, 6000);
  for (let i = 0; i < 44100; i++) {
    if (i % 5000 === 0) {
      wavelength = 44100 / random(200, 600);
    }
    buffer[i] = cos((i / wavelength) * 2 * PI);
  }

  mySound = new p5.SoundFile();
  mySound.setBuffer([buffer]);

  const startButton = createButton("play");
  startButton.mousePressed(start);

  const stopButton = createButton("stop");
  stopButton.mousePressed(stop);
}

function start() {
  mySound.loop(1, 0.8, 1);
}

function stop() {
  mySound.pause();
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
  }
}

function keyTyped() {
  if (key === "s" || key === "S") {
    saveCanvas("myCanvas", "jpg");
    print("saving image");
  }
  return false;
}

function draw() {
  createCanvas(1280, 800);
  background(0, 0, 0);
  // image(video, 0, 0, width, height);

  //move image by the width of image to the left
  translate(video.width, 0);
  //then scale it by -1 in the x-axis
  //to flip the image
  scale(-1, 1);

  clear();
  noFill();

  //     // Get the overall volume (between 0 and 1.0)
  //   let volume = input.getLevel();

  //   // If the volume > 0.1,  change the background color.
  //   let threshold = 0.5;
  //   if (volume > threshold) {
  //     noStroke();
  //     fill(255);
  //     rect(random(windowWidth), random(windowHeight), volume * 50, volume * 50);
  //     // background(random(0, 155));
  //     // createCanvas(windowWidth, windowHeight);
  //   }

  if (currentPose) {
    morphing_circle(currentPose.nose.x, currentPose.nose.y);
  }

  params.frame_rate = frameRate();

  if (poses.length > 0) {
    currentPose = poses[0].pose;
  }

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

function morphing_circle(x, y) {
  clear();
  noFill();

  let centerX = width / 2;
  let centerY = height / 2;
  // let waveform = fft.waveform();
  let data = fft.analyze();

  for (j = 0; j < 50; j++) {
    radius1 = noise(j * 0.001) * 20 + j * 2;
    stroke((radius1 * 3) % 255, 180, 255, 100);
    strokeWeight(3);

    beginShape();

    for (let i = 0; i < 60; i++) {
      let angle = map(i - 30, -30, 30, 0, 2 * PI) + PI;
      let radius2 = radius1 + map(data[abs(i - 30)], 0, 175, 10, 175);
      vertex(
        sin(angle) * radius2 + centerX - 50,
        cos(angle) * radius2 + centerY
      );
    }
    endShape(CLOSE);
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
        fill(random(0, 255), random(0, 255), random(0, 255));
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
      stroke(random(0, 255), random(0, 255), random(0, 255));
      strokeWeight(10);
      line(
        partA.position.x,
        partA.position.y,
        partB.position.x,
        partB.position.y
      );
    }
  }
}
