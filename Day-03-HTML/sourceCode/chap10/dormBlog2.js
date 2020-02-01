/*******************************************************
* dormBlog2.js
* John Dean
*
* This file contains a function that supports the
* dorm blog web page.
*******************************************************/

// This function posts a new comment in the community textarea.

function addComment(form) {
  var dorm;          // select control for dorm
  var newComment;    // textarea for the new comment
  var allComments;   // textarea for combined comments
  var addedVerbiage; // text to add to blog
  var dorms;         // for multiple selections

  dorm = form.elements["dorm"];
  newComment = form.elements["newComment"];
  allComments = form.elements["allComments"];

  if (!form.checkValidity()) {
    document.getElementById("error").style.display = "block";
  }
  else {
    document.getElementById("error").style.display = "none";
    dorms = "";
    for (let option of dorm.selectedOptions) {
      if (dorms != "") {
        dorms += ", ";
      }
      dorms += option.value;
    } // end for

    if (allComments.value == "") {
      allComments.value = dorms + ":\n" + newComment.value;
    }
    else {
      allComments.value = dorms + ":\n" + newComment.value +
        "\n\n" + allComments.value;
    }
    dorm.selectedIndex = -1;
    newComment.value = "";
  } // end else
} // end addComment