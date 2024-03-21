sap.ui.define(['sap/ui/core/mvc/Controller',
"DemoApp/util/formatter"],
    function(Controller,formatter){
return Controller.extend("DemoApp.controller.BaseController" , {
formatter : formatter,
onOpenDialog() {
    // create dialog lazily
    this.pDialog ??= this.loadFragment({
        name: "DemoApp.fragments.first"
    });

    this.pDialog.then((oDialog) => oDialog.open());
},
onCloseDialog() {
    // note: We don't need to chain to the pDialog promise, since this event handler
    // is only called from within the loaded dialog itself.
    this.byId("helloDialog").close();
}
});
    });