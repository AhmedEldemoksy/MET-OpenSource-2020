/***************************************************
* face2.js
* John Dean
*
* This file handles drawing a face and having it move.
***************************************************/

// x and y coordinates for the face's center point.
const CENTER_X = 250;
const CENTER_Y = 250;
const RADIUS = 150;        // face's radius
const TITLE_BASELINE = 75; // y value for title's baseline
const EYE_WIDTH = 8;
const EYE_HEIGHT = 6;

var canvas; // the canvas element
var ctx;    // the canvas object's context

//*************************************************

// This function draws the title and the initial face.

function initialize() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  // for the heading:
  ctx.textAlign = "center";
  ctx.font = "75px Arial, sans-serif";

  // for the face:
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;

  drawHeading();
  drawFace();
} // end initialize

//*************************************************

// This function draws the Hello heading.

function drawHeading() {
  ctx.save();  // enable restoration so face can be redrawn

  // reset to original coordinate system
  ctx.setTransform(1, 0, 0, 1, 0, 0); 
  ctx.fillStyle = "blue";
  ctx.fillText("Hello", CENTER_X, TITLE_BASELINE);
  ctx.restore();
} // end drawHeading

//*************************************************

// This function draws the face.

function drawFace() {
  ctx.fillStyle = "yellow";

  // draw circle
  ctx.beginPath();
  ctx.arc(CENTER_X, CENTER_Y, RADIUS, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  // draw eyes
  ctx.strokeRect(CENTER_X - RADIUS / 3,
    CENTER_Y - RADIUS / 3, EYE_WIDTH, EYE_HEIGHT);
  ctx.strokeRect(CENTER_X + RADIUS / 3 - EYE_WIDTH + 1,
    CENTER_Y - RADIUS / 3, EYE_WIDTH, EYE_HEIGHT);

  // draw mouth
  ctx.beginPath();
  ctx.moveTo(CENTER_X - RADIUS / 3, CENTER_Y + RADIUS / 3);
  ctx.lineTo(CENTER_X + RADIUS / 3, CENTER_Y + RADIUS / 3);
  ctx.stroke();
} // end drawFace

//**************************************

// This function rotates the face by 45 degrees clockwise.

function rotateClockwise() {
  ctx.translate(CENTER_X, CENTER_Y);
  ctx.rotate(Math.PI / 4);
  ctx.translate(-CENTER_X, -CENTER_Y);
  drawFace();
} // end rotateClockwise

//**************************************

// This function moves the face up by radius / 3.

function moveUp() {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0); // original coordinate system
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  drawHeading();
  ctx.translate(0, -(RADIUS / 3));
  drawFace();
} // end moveUp