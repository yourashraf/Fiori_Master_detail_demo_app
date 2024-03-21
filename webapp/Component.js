sap.ui.define(['sap/ui/core/UIComponent'],
    function (UIComponent){
return UIComponent.extend("DemoApp.Component" , {


    metadata : {
manifest : "json"
    },
init : function (){
UIComponent.prototype.init.apply(this);
var oRouter = this.getRouter();
oRouter.initialize();
},
// createContent : function (){
// var oView = new sap.ui.view("idRootView",{
//     viewName : 'DemoApp.view.App',
//     type : 'XML'
// });

// var oView1 = new sap.ui.view("idView1",{
//     viewName : 'DemoApp.view.View1',
//     type : 'XML'
// });
// var oView2 = new sap.ui.view("idView2",{
//     viewName : 'DemoApp.view.View2',
//     type : 'XML'
// });

// var oAppCon = oView.byId("idAppCon");
// oAppCon.addMasterPage(oView1).addDetailPage(oView2);
// return oView;
// },
destroy : function(){

}
});
});
