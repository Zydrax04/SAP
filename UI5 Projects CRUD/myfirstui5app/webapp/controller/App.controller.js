sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
 ], function (Controller, MessageToast, JSONModel,ResourceModel) {
    "use strict";
    return Controller.extend("Quickstart.controller.App", {
        
        onInit : function () {
            // set data model on view
            
        },
        onOpenDialog : function () {
			this.getOwnerComponent().openHelloDialog();
		}
    });
});