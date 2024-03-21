sap.ui.define(
  [
    "DemoApp/controller/BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    'sap/ui/model/FilterOperator'
  ],
  function (BaseController, MessageBox, MessageToast, Fragment , Filter , FilterOperator) {
    "use strict";
    return BaseController.extend("DemoApp.controller.View2", {
      
      onInit : function (){
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.getRoute("superman").attachMatched(this.anupam , this);
      },
      anupam : function (oEvent) {
        var fruitId = oEvent.getParameter("arguments").fruitId;
        var sPath = '/fruits/' + fruitId;
        this.getView().bindElement(sPath);
      },
      onBack: function () {
        this.getView().getParent().to("idView1");
      },
      onSave: function () {
        MessageBox.confirm("Do you want to save ?", {
          title: "Confirmation",
          onClose: function (status) {
            if (status === "OK") {
              MessageToast.show("your data is saved");
            } else {
              MessageBox.error("your data is unsaved");
            }
          },
        });
      },
      onCancel: function () {
        MessageBox.error("Action Cancelled");
      },
      oPopupSupplier: null,
      onFIlter: function () {
        var that = this;
        if (!this.oPopupSupplier) {
          Fragment.load({
            name: "DemoApp.fragments.popup",
            id: "Suppliers",
            controller: this,
          }).then(function (oFragment) {
            that.oPopupSupplier = oFragment;
            that.oPopupSupplier.setTitle("Supplier");

            that.getView().addDependent(that.oPopupSupplier);

            that.oPopupSupplier.bindAggregation("items", {
              path: "/suppliers",
              template: new sap.m.ObjectListItem({
                title: "{name}",
                intro: "{sinceWhen}",
                number: "{contactNo}",
              }),
            });
            that.oPopupSupplier.open();
          });
        } else {
          that.oPopupSupplier.open();
        }
      },
      oValueHelp: null,
      oField : null,

      onF4Help: function (oEvent) {
        this.oField = oEvent.getSource();
        var that = this;
        if (!this.oValueHelp) {
          Fragment.load({
            name: "DemoApp.fragments.popup",
            id: "city",
            controller: this,
          }).then(function (oFragment) {
            that.oValueHelp = oFragment;
            that.oValueHelp.setTitle("Cities");

that.oValueHelp.setMultiSelect(false);
            that.getView().addDependent(that.oValueHelp);

            that.oValueHelp.bindAggregation("items", {
              path: "/cities",
              template: new sap.m.ObjectListItem({
                title: "{name}",
                intro: "{famousFor}",
                number: "{otherName}",
              }),
            });
            that.oValueHelp.open();
          });
        } else {
          that.oValueHelp.open();
        }
      },

      onConfirm : function (oEvent){
        var sId = oEvent.getSource().getId();
        if (sId.indexOf("city")!= -1){

            var oSelectedItemObject = oEvent.getParameter("selectedItem");
            var sText = oSelectedItemObject.getTitle();
            this.oField.setValue(sText);

        }
        else{
          var aFilter = [];
           var aItems = oEvent.getParameter("selectedItems");
           for (let i = 0; i < aItems.length; i++) {
            const element = aItems[i];
            var sTitle = element.getTitle();
            var oFilter = new Filter("name" , FilterOperator.EQ , sTitle);
            aFilter.push(oFilter); 
           }
           var oFinalFilter = new Filter({
            filters : aFilter,
            and : false
           });
           this.getView().byId("idTable").getBinding("items").filter(oFinalFilter);
        }

      },
      
        onSeachfrag : function(oEvent){
          //s-1 : get the value entered by the user in the search field
          var sValue = oEvent.getParameter("value");
          //s-2 : construct a Filter from the value 
          var oFilter = new Filter("name" , FilterOperator.Contains , sValue);
          //s-3 : get the object of the select dialog control
          var oSlectDialogue = oEvent.getSource();
          //s-4 : Inject filter for binding of objects 
          oSlectDialogue.getBinding("items").filter(oFilter);

        },
        onItemPresstb : function(oEvent){
          var sPath = oEvent.getParameter("listItem").getBindingContextPath();
          var sIndex = sPath.split("/")[sPath.split("/").length -1];

         this.oRouter.navTo("batman" , {
          suppId : sIndex
         });
        }
   
    });
  }
);
