/*******************************************************
* petRegistry.js
* John Dean
*
* This file implements a Pet class hierarchy.
*******************************************************/

class Pet {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  } // end constructor

  //*************************************************

  // Return confirmation message data

  confirm() {
    return this.name + " has been successfully registered as a " +
      this.constructor.name.toLowerCase() + " - " + this.sound;
  } // end confirm
} // end class Pet

//***************************************************

class Dog extends Pet {
  constructor(name, trick) {
    super(name, "Woof! Woof!");
    this.trick = trick;
  } // end constructor

  //*************************************************

  // Return confirmation message data

  confirm() {
    return super.confirm() +
      "<br>Favorite trick: " + this.trick;
  } // end confirm
} // end class Dog

//***************************************************

class Hedgehog extends Pet {
  constructor(name) {
    super(name, "snuffle, click, purr");
  } // end constructor
} // end class Hedgehog

//***************************************************

// This function reveals or hides supplemental input controls.

function adjustForm(form) {
  if (form.elements["petType"].value == "dog") {
    document.getElementById("dog-more-info").style.display =
      "table-cell";
  }
  else {
    document.getElementById("dog-more-info").style.display = "none";
  }
} // end adjustForm

//***************************************************

// This function registers a pet.

function register(form) {
  var name;  // pet's name
  var trick; // dog's favorite trick
  var pet;   // an object that's a subclass of Pet

  if (!form.checkValidity()) {
    document.getElementById("message").innerHTML =
      "You must enter values for all fields";
  }
  else {
    name = form.elements["name"].value;
    if (form.elements["petType"].value == "dog") {
      trick = form.elements["trick"].value;
      pet = new Dog(name, trick);
    }
    else {
      pet = new Hedgehog(name);
    }
/*
    switch (form.elements["petType"].value) {
      case "dog":
        trick = form.elements["trick"].value;
        pet = new Dog(name, trick);
        break;
      case "hedgehog":
        pet = new Hedgehog(name);
    } // end switch
*/
    document.getElementById("message").innerHTML = pet.confirm();
  } // end else
} // end register