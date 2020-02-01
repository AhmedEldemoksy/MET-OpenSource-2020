/***********************************************************************
* solarAngles.js
* John Dean
*
* This file contains functions supporting solarShadowing.html
***********************************************************************/

var image;                    // image of one row of PV solar collectors
var form;                     // html input form
var spacing;                  // pixel distance between array bases 
var slope;                    // radians up from horizontal facing south
var canvas;                   // active display
var context;                  // nature of active display
var length = 0.5 * 160;       // 80 pixels for 160 cm panel height
var X0 = 50;                  // left side of arrays
var Y0;                       // bottom of north array
var dyP;                      // panel bottom-to-top horizontal projection
var altitude;                 // solar altitude angle above horizon
var azimuth;                  // solar azimuth angle from south
var cosIncidenceAngle;        // angle between sun and normal to panel
var timer;                    // timer controlling dispaly dynamics

// This function is called when the Install Collectors button is clicked.

function setup(solarForm) {
  image = document.getElementById("pvArray");
  form = solarForm;
  spacing = length * parseFloat(form.elements["spacing"].value);
  slope = form.elements["panelSlope"].value * Math.PI/180;
  canvas = document.getElementById("topView");
  context = canvas.getContext("2d");
  canvas.style.backgroundColor = "lightgray";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "black";
  context.font = "1em Tahoma";
  context.fillText("(North)", 324, 20);
  if (slope < 0) {          // north-facing panels
    Y0 = 0.5 * (canvas.height - spacing - length);
    dyP = + length * Math.cos(slope);  // south end higher
  }
  else {                    // south-facing panels
    Y0 = 0.5 * (canvas.height - spacing + length);
    dyP = - length * Math.cos(slope);  // north end higher
  }
  drawOneArray(Y0);
  drawOneArray(Y0 + spacing);
} // end setup

function drawOneArray(y0) {
  var scaleFac;   // horizontal projection of sloping surface
  var width;      // image width

  scaleFac = Math.cos(slope);
  width = image.width;
  // Scale vertically to represent top view of sloping panels
  context.scale(1.0, scaleFac);
  if (slope >= 0) {y0 -= length * scaleFac;}
  context.drawImage(image, 50, y0 / scaleFac);
  context.scale(1.0, 1.0 / scaleFac);
  // Apply white line to brighten sunlit higher end
  context.strokeStyle = "white";
  context.lineWidth = 3;    
  context.beginPath();
  if (slope < 0) {y0 += length * scaleFac;}
  context.moveTo(X0, y0);
  context.lineTo(X0 + width, y0);
  context.stroke();
} // end drawOneArray

// This function is called when the Show Behavior button is clicked.

function showBehavior() {
  var degradation;                                // shadowing effect
  var output;                                     // electrical output %
  var direct;                                     // direct solar

  computeAngles();
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (altitude > 0) {                             // daytime
    canvas.style.backgroundColor = "lightgray";
    showOneShadow(X0, Y0);                        // from north panel
    showOneShadow(X0, Y0 + spacing);              // from south panel
    drawOneArray(Y0);
    drawOneArray(Y0 + spacing);
    degradation = Math.pow(getObscuration(X0, Y0), 0.38);
    degradation += Math.pow(getObscuration(X0, Y0 + spacing), 0.38);
    form.elements["azimuth"].value = Math.round(azimuth * 180/Math.PI);
    form.elements["altitude"].value = Math.round(altitude * 180/Math.PI);
    direct = 0.86 * cosIncidenceAngle * (1.0 - 0.5 * degradation);
    // Using 1985 ASHRAE Fundamentals Guide, Chapter 27, Diffuse Solar:
    output = parseInt(100 * (direct + 0.14 * Math.sin(altitude)));
  }
  else {                                          // nighttime
    canvas.style.backgroundColor = "midnightblue";
    form.elements["azimuth"].value = "";
    form.elements["altitude"].value = "";
    output = 0;
  }
  context.fillStyle = "black";
  context.font = "1em Tahoma";  
  context.fillText("Electrical Output: " + output + " %", 10, 25);
  context.fillText("(North)", 324, 20);
} // showBehavior

function computeAngles() {
  var latitude;         // earth latitude
  var month;            // month number (1 = Jan, 2 = Feb, ...)
  var hour;             // hour of day
  // Using 1985 ASHRAE Fundamentals Guide, Chapter 27, Table 1, and
  // approximating earth's elliptical orbit as a circle:
  var solarDeclination; // solar altitude angle at north pole
  var hourAngle;        // angle after noon in radians
  var cosAzimuth;       // horizontal solar angle from south in radians
  // Using 1985 ASHRAE Fundamentals Guide, Chapter 27, equation (3):
  var sinAltitude;      // solar altitude in radians

  latitude = form.elements["latitude"].value * Math.PI/180;
  month = form.elements["month"].value;
  hour = form.elements["hour"].value;
  solarDeclination = (-23.45 * Math.PI/180)
    * Math.cos(month * Math.PI/6);
  hourAngle = Math.abs((hour - 12) * Math.PI/12);
  cosAzimuth = 0;
  sinAltitude =  Math.cos(hourAngle) *
    Math.cos(latitude) * Math.cos(solarDeclination)
     + Math.sin(latitude) * Math.sin(solarDeclination);
  altitude = Math.asin(sinAltitude * 0.999999);
  if (altitude > 0) {
    // Using 1985 ASHRAE Fundamentals Guide, Chapter 27, equation (4):
    cosAzimuth = 
      (Math.sin(solarDeclination) - sinAltitude * Math.sin(latitude))
      / (Math.cos(altitude) * Math.cos(latitude));
    azimuth = Math.acos(cosAzimuth * 0.999999);
    azimuth = (hour <= 12) ? azimuth : 2 * Math.PI - azimuth;
    cosIncidenceAngle = sinAltitude * Math.cos(slope)
      - cosAzimuth * Math.cos(altitude) * Math.sin(slope);
    if (cosIncidenceAngle < 0) {cosIncidenceAngle = 0.0;}
  } // end if altitude > 0
} // end computeAngles

function showOneShadow(x0, y0) {
  var xB;       // horizontal position of bottom-left shadow corner
  var yB;       // vertical position of bottom-left shadow corner
  var xT;       // horizontal position of top-left shadow corner
  var yT;       // vertical position of top-left shadow corner
  var clearance;   // distance from roof to lower edge of panels
  var totalHeight; // distance from roof to upper edge of panels
  var botDxS;      // bottom-left horizontal shadow offset
  var botDyS;      // bottom-left vertical shadow offset
  var topDxS;      // top-left horizontal shadow offset
  var topDyS;      // top-left vertical shadow offset
  var width;       // image width (598 pixels)

  clearance = length * parseFloat(form.elements["clearance"].value);
  totalHeight = clearance + length * Math.abs(Math.sin(slope));
  botDxS = - Math.sin(azimuth) * clearance / Math.tan(altitude);
  botDyS = Math.cos(azimuth) * clearance / Math.tan(altitude);
  topDxS = - Math.sin(azimuth) * totalHeight / Math.tan(altitude);
  topDyS = Math.cos(azimuth) * totalHeight / Math.tan(altitude);
  width = image.width;
  xB = x0 + botDxS;  
  yB = y0 + botDyS;
  xT = x0 + topDxS;
  yT = y0 + dyP + topDyS; 
  context.beginPath();
  context.moveTo(xB, yB);
  context.lineTo(xT, yT);
  context.lineTo(xT + width, yT);
  context.lineTo(xB + width, yB);
  context.fillStyle = "gray";
  context.fill();
} // end showOneShadow

function getObscuration(x0, y0) {
  var latitude;        // earth latitude
  var projLength;      // north-south horizontal projection
  var width;           // east-west width of panel array
  var tanShadeAngle;   // tan(shade angle)
  var shadeLength;     // upward in panel plane
  var offset;          // east-west shadow offset 
  var obscuredWidth;   // east-west inter-panel shadow extent  
  var obscuration = 0; // fractional inter-panel shadowing

  latitude = form.elements["latitude"].value * Math.PI/180;
  projLength = image.height * Math.cos(slope);
  width = image.width;
  context.globalAlpha = 0.4;          // shadow opacity
  context.fillStyle = "black";

  // Sun behind panels
  if (cosIncidenceAngle <= 0) {
    // cover bottom edge but keep top edge white
    if (slope > 0) {y0 = y0 + 2 - projLength;}
    context.fillRect(x0, y0 - 1, width, projLength);   
  } // end if

  // Inter-panel shading
  else if (Math.cos(azimuth) * (y0 - 0.5 * canvas.height) > 0 &&
    latitude * slope > 0) {
    tanShadeAngle = Math.tan(altitude) / Math.cos(azimuth - Math.PI);
    shadeLength = length 
      - spacing / (Math.cos(slope) + Math.sin(slope) / tanShadeAngle);
    if (shadeLength < 0) {shadeLength = 0;} // no obscuration
    projLength = shadeLength * Math.cos(slope);
    offset = Math.abs(Math.tan(azimuth) *
      (spacing + projLength - length * Math.cos(slope)));
    if (slope > 0) {y0 += 1;}          // cover image bottom
    else { projLength = - projLength; }
    if (Math.sin(azimuth) < 0) {    
      context.fillRect(x0 + offset, y0, width - offset, - projLength);}
    else {context.fillRect(x0, y0, width - offset, - projLength);}
    obscuration = (shadeLength * (width - offset)) / (length * width);
    if (obscuration < 0) {obscuration = 0;}
  } // end else if
  context.globalAlpha = 1.0;
  return obscuration;
} // end getObscuration

function runClock() {
  timer = window.setInterval(updateDisplay, 200);  // 200 ms intervals
  form.elements["run"].disabled = "disabled";
  form.elements["stop"].disabled = "";
} // end runClock

function updateDisplay() {    // after each interval
  var mo;     // month number 
  var hr;     // hour number
  var nextHr; // next hour as fraction of day 

  mo = parseInt(form.elements["month"].value);
  hr = parseInt(form.elements["hour"].value);
  nextHr = (hr + 1) % 24;
  if (nextHr < hr) {
    nextHr = 0;
    mo += 1;
    if (mo > 12) {
      stopClock(form);
      mo = 1;
    }
    form.elements["month"].value = mo;
  }
  form.elements["hour"].value = nextHr;
  showBehavior(form);
} // end updateDisplay

function stopClock() {
  window.clearInterval(timer);
  form.elements["stop"].disabled = "disabled";
  form.elements["run"].disabled = "";
} // end stopClock