/****************************************************************
* property.js
* John Dean
*
* An object representing one real-estate property.
* It processes replace and delete operations for the selected
* property within the properties table.
****************************************************************/

class Property {
  constructor(row) {
    this.row = row;               // table's row element and
    this.rowIndex = row.rowIndex; // last selected index
    for (let i=0; i<5; i++) {
      form.elements[i].value = row.childNodes[i].innerHTML;
    }
    property = this;
  } // end constructor

  //***************************************************************    

  // Update arrays and displayed table

  replace() {
    for (let i=0; i<5; i++) {
      properties[this.rowIndex-1][i] = form.elements[i].value;
    }
    fillTable(); // resort and repopulate in case address changed
    cancel();
  } // end replace

  // Remove current property from properties array and from table

  deleteProperty() {
    table.deleteRow(this.rowIndex);
    properties.splice(this.rowIndex-1,1);
    cancel();
  } // end deleteProperty
} // end class Property