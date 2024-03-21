sap.ui.define([], function () {
  "use strict";
  return {
    getstatus: function (status) {
      switch (status) {
        case "Available": 
          return "Success";
        break ;
        case "Out of stock": 
          return "Warning";
        break;
        case "Discontinued": 
          return "Error";
        break;
        default : 
        break;
      }
    }
  }
});
