sap.ui.define([
    'DemoApp/controller/BaseController',
    'sap/ui/core/routing/History'
],function(BaseController ,History){
    'use strict';
return BaseController.extend("DemoApp.controller.View3" , {
onInit : function(){
    // alert('welcome to fiori');
    this.oRouter = this.getOwnerComponent().getRouter();
    this.oRouter.getRoute("batman").attachMatched(this.anupam , this);
},
anupam : function(oEvent){
var suppId = oEvent.getParameter("arguments").suppId;
var sPath = '/suppliers/' + suppId;
this.getView().bindElement(sPath);
},
onBack : function(){
    const oHistory = History.getInstance();
    const sPreviousHash = oHistory.getPreviousHash();

    if (sPreviousHash !== undefined) {
        window.history.go(-1);
    } else {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("superman", {}, true);
    }
}

});
});