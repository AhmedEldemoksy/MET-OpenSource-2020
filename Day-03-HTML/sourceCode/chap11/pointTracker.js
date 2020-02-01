/*******************************************************
* pointTracker.js
* John Dean
*
* This file implements a Point class.
* It stores Point objects for the locations of the two
* most recent mouse clicks.
*******************************************************/

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    if (Point.count == undefined) {
      Point.count = 1;
    }
    else if (Point.count == 1) {
      Point.count = 2;
    }
  } // end constructor

  //***************************************************

  // Return the point in the format "(x, y)"

  value() {
    return "(" + this.x + ", " + this.y + ")";
  } // end value

  //***************************************************

  // Return a count for the number of Point objects

  static getCount() {
    return (Point.count == undefined) ? 0 : Point.count;
  } // end getCount

  //***************************************************

  // Return the distance between the two points or null if one
  // or more of the points is missing.

  static distance(pt1, pt2) {
    var xDist, yDist; // distances apart in the 2 dimensions
    var distance;     // distance apart with direct connection

    if (Point.count == 2) {
      xDist = pt1.x - pt2.x;
      yDist = pt1.y - pt2.y;
      distance = Math.sqrt(xDist * xDist + yDist * yDist);
    }
    else {
      distance = null;
    }

    return distance;
  } // end distance

  //***************************************************

  // After removing a point, call this method to reduce the count.

  static reduceCount() {
    if (Point.count == 1) {
      Point.count = undefined;
    }
    else if (Point.count == 2) {
      Point.count = 1;
    }
  } // end reduceCount
} // end class Point

//***************************************************

var point1, point2;  // the most recently clicked points

// To implement delete key functionality, remove the html element's
// onclick event handler and use the following instead.
// document.addEventListener("click", captureClick);
// document.addEventListener("keydown", removePoint);

// This function stores a user's click location as a point.

function captureClick(e) {
  if (Point.getCount() == 0) {
    point1 = new Point(e.clientX, e.clientY);
    document.getElementById("pt1").innerHTML = point1.value();
  }
  else if (Point.getCount() == 1) {
    point2 = new Point(e.clientX, e.clientY);
    document.getElementById("pt2").innerHTML = point2.value();
  }
  else {
    point1 = point2;
    point2 = new Point(e.clientX, e.clientY);
    document.getElementById("pt1").innerHTML = point1.value();
    document.getElementById("pt2").innerHTML = point2.value();
  }
} // end captureClick

//***************************************************

// This function calculates and returns the distance between 2 points.

function displayDistance(e) {
  var distance;     // distance apart with direct connection
  var message;      // message with distance or a warning

  e.stopPropagation(); // prevent the button from creating a new point
  distance = Point.distance(point1, point2);
  if (distance == null) {
    message = "To calculate a distance, you must first create two points!";
  }
  else {
    message =
      "The two points are " + distance.toFixed(1) + " pixels apart.";
  }

  document.getElementById("message").innerHTML = message;
} // end displayDistance

//***************************************************

// This function removes the most recently created point

function removePoint(e) {
  if (e.key == "Delete") {
    if (Point.getCount() == 1) {
      document.getElementById("pt1").innerHTML = "";
      Point.reduceCount();
    }
    else if (Point.getCount() == 2) {
      document.getElementById("pt2").innerHTML = "";
      Point.reduceCount();
    }
  } // end if key == "Delete"
} // end removePoint