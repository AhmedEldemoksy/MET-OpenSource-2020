/*******************************************************
* dormBlog.js
* John Dean
*
* This file contains a function that supports the dorm blog web page.
*******************************************************/

// This function posts a new comment in the community textarea.

function addComment(form) {
  var dorm;          // select control for dorm
  var newComment;    // textarea for the new comment
  var allComments;   // textarea for combined comments
  var addedVerbiage; // text to add to blog

  dorm = form.elements["dorm"];
  newComment = form.elements["newComment"];
  allComments = form.elements["allComments"];

  if (!form.checkValidity()) {
    document.getElementById("error").style.display = "block";
  }
  else {
    document.getElementById("error").style.display = "none";
    if (allComments.value == "") {
      addedVerbiage = dorm.value + ":\n" + newComment.value;
    }
    else {
      addedVerbiage = dorm.value + ":\n" + newComment.value + "\n\n";
    }
    allComments.value = addedVerbiage + allComments.value;
    dorm.selectedIndex = 0;
    newComment.value = "";
  } // end else
} // end addComment