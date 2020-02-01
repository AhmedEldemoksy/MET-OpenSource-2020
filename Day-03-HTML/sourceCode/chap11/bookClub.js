/**********************************************
* bookClub.js
* John Dean
*
* This file implements a BookMeeting class, a list of
* BookMeeting objects, and a function which adds
* BookMeeting objects to the list.
**********************************************/

class BookMeeting {
  constructor(author, title, date) {
    this.author = author;  // book author
    this.title = title;    // book title
    this.date = date;      // date of meeting to discuss book
  } // end constructor

  //*************************************************

  // Return book meeting information as a table row

  bookMtgEntry() {
    return "<div class='row'>" +
      "<span>" + this.date.toDateString() + ":</span>" +
      "<span>" + this.author + ", <cite>" + this.title + "</cite></span>" +
      "</div>";
  } // end bookMtgEntry
} // end class BookMeeting

//*********************************************

var bookMtgList = new Array();

// Add a book club meeting to the list.

function addMtg(form) {
  var author;  // book author
  var title;   // book title
  var date;    // book club meeting date

  if (!form.checkValidity()) {
    document.getElementById("error").style.display = "block";
  }
  else {
    document.getElementById("error").style.display = "none";
    document.getElementById("mtgHeader").style.display = "block";
    author = form.elements["author"].value;
    title = form.elements["title"].value;

    // The following is more elegant, but browser support is spotty.
    // date = form.elements["date"].valueAsDate;

    date = new Date(form.elements["date"].value);

    // The following was necessary for a 2017 Chrome Date control bug
    date.setDate(date.getDate() + 1);

    bookMtgList.push(new BookMeeting(author, title, date));
    bookMtgList.sort(
      function (a, b) {
        return (a.date < b.date) ? -1 : (a.date > b.date) ? 1 : 0;
      });
    displayList();
  } // end else
} // end addMtg

//*********************************************

// Display the list of book club meetings.

function displayList() {
  var listContent = ""; // The contents of the list of book meetings

  for (let i=0; i<bookMtgList.length; i++) {
    listContent += bookMtgList[i].bookMtgEntry();
  }
  document.getElementById("list").innerHTML = listContent;
} // end displayList