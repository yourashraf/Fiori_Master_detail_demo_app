sap.ui.define(
  [
    "DemoApp/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/core/Fragment'
  ],
  function (BaseController, Filter, FilterOperator , Fragment) {
    "use strict";
    return BaseController.extend("DemoApp.controller.View1", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.getRoute("superman").attachMatched(this.anupam , this);
      },
      anupam : function (oEvent) {
        var fruitId = oEvent.getParameter("arguments").fruitId;
        var sPath = '/fruits/' + fruitId;
      var oList = this.getView().byId("idList");
      var aItems = oList.getItems();
      for (let i = 0; i < aItems.length; i++) {
        const element = aItems[i];
        if(element.getBindingContextPath() === sPath){
          var oItemObject = element;
          break;
        }
        
      }
oList.setSelectedItem(oItemObject);


      },
      onNext: function (myFruitId) {
        // var oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.navTo("superman" , {
          fruitId : myFruitId
        });
      
    

        // var oCurrentView = this.getView();
        // var oAppCon = oCurrentView.getParent();
        // oAppCon.to("idView2");
      },
      oFrag : null,
      opFrag : function(){
        var that = this;
        if (!this.oFrag){
          Fragment.load({
            name: 'DemoApp.fragments.opFrag'
         }).then(function(oFragment){
          that.oFrag = oFragment;
           
           that.oFrag.open();
         });
        } else {
            that.oFrag.open();
         }
        },
       
        
      
      onSearch: function (oEvent) {
        // todo : searching

        //s-1 : what are the values user is trying to search on the screen
        var sVal = oEvent.getParameter("query");
        if (!sVal) {
          sVal = oEvent.getParameter("newValue");
        }
        //s-2: create a filter object
        var oFilter1 = new Filter("name", FilterOperator.Contains, sVal);
        var oFilter2 = new Filter("type", FilterOperator.Contains, sVal);
        var aFilter = [oFilter1, oFilter2];
        var oFilter = new sap.ui.model.Filter({
          filters: aFilter,
          and: false,
        });

        //s-3 : get items of list control and filter all the items
        this.getView().byId("idList").getBinding("items").filter(oFilter);
      },
      onItemDelete: function (oEvent) {
        var aList = this.getView().byId("idList");
        var oSelectedItems = aList.getSelectedItems();
        oSelectedItems.forEach(element => {
          aList.removeItem(element);
        });
      },
      onItemPress: function (oEvent) {
        var sPath = oEvent.getParameter("listItem").getBindingContextPath();

        //  var oAppCon = this.getView().getParent();
        //  var oV2 = oAppCon.getPages()[1];
 
        // var oV2 = this.getView()
        //   .getParent()
        //   .getParent()
        //   .getDetailPage("idView2");

        // oV2.bindElement(sPath);
        
        var myId = sPath.split("/")[sPath.split("/").length - 1];

        this.onNext(myId);
      },
      onItemRemove: function () {
        var oList = this.getView().byId("idList");
        var aSelectedItems = oList.getSelectedItems();
        aSelectedItems.forEach((element) => {
          oList.removeItem(element);
        });
      },
    });
  }
);
