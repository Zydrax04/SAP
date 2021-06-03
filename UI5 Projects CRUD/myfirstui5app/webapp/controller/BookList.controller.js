sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatterBook",
	"sap/m/MessageToast"
], function (Controller, JSONModel, formatter, MessageToast) {
	"use strict";
	return Controller.extend("Quickstart.controller.BookList", {
		formatter: formatter,
		handleDelete : function(oEvent){
	        var sBookPath = oEvent.getParameter('listItem').getBindingContext().getPath();
	        this.getView().getModel().remove(sBookPath, {
                succes: function(){
                    MessageToast.show(oResourceBundle.getText("deleted"));
                }
	        });
		},
		onCreateBook: function(oEvent){
		 var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                    const isbn = parseInt(this.getView().byId("isbn").getValue()) || 0;
                    const author = this.getView().byId("author").getValue();
                    const title = this.getView().byId("title").getValue();
                    const language = this.getView().byId("language").getValue();
                    const datePublish = this.getView().byId("inputDatePublish").getDateValue();
                    const total = parseInt(this.getView().byId("total").getValue()) || 0;
                    const available = parseInt(this.getView().byId("available").getValue()) || 0;

                     if(isbn == 0 || author.length == 0 || title.length == 0 || language.length == 0){
                        MessageToast.show(oResourceBundle.getText("fillOutForm"));
                        return;
                     }

                    var oEntry = { };
                    oEntry.BookId = isbn;
                    oEntry.Autor = author;
                    oEntry.Title = title;
                    //oEntry.publish_date = "2021-05-07T00:00:00";
                    oEntry.publish_date = datePublish;
                    oEntry.langueage = language;
                    oEntry.nr_available = available;
                    oEntry.total_number = total;

                    var odataModel = new sap.ui.model.odata.ODataModel("http://localhost:9555/sap/opu/odata/SAP/Z801_BOOKS_RAMO_SRV/");

                    odataModel.create("/BooksSet",oEntry, null, function() {
                        MessageToast.show(oResourceBundle.getText("created"));
                    }, function(){
                        alert(oResourceBundle.getText("error"));
                    });

                    location.reload();
                },
                onUpdateBook: function(oEvent){
                    MessageToast.show("Update");
                    const isbn = parseInt(this.getView().byId("isbn").getValue()) || 0;
                    const author = this.getView().byId("author").getValue();
                    const title = this.getView().byId("title").getValue();
                    const language = this.getView().byId("language").getValue();
                    const total = parseInt(this.getView().byId("total").getValue()) || 0;
                    const available = parseInt(this.getView().byId("available").getValue()) || 0;
                    const datePublish = this.getView().byId("inputDatePublish").getDateValue();

                    if(isbn == 0 || author.length == 0 || title.length == 0 || language.length == 0){
                           MessageToast.show("Please fill out form correctly");
                           return;
                    }

                    var oEntry = { };
                    oEntry.BookId = isbn;
                    oEntry.Autor = author;
                    oEntry.Title = title;
                    oEntry.publish_date = datePublish;
                    oEntry.langueage = language;
                    oEntry.nr_available = available;
                    oEntry.total_number = total;

                    var odataModel = new sap.ui.model.odata.ODataModel("http://localhost:9555/sap/opu/odata/SAP/Z801_BOOKS_RAMO_SRV/");

                    odataModel.update("/BooksSet('"+isbn+"')", oEntry, null, function(){
                        MessageToast.show(oResourceBundle.getText("updated"));
                    }, function(){
                        alert(oResourceBundle.getText("error"));
                    });
                    location.reload();
                 },
                 onPress: function(oEvent){
                    //var oBook = oEvent.getParameter("listItem").getBindingContext().getObject();
                    var item = oEvent.oSource.getBindingContext().getObject();
                    this.getView().byId("isbn").setValue(item.BookId);
                    this.getView().byId("author").setValue(item.Autor);
                    this.getView().byId("title").setValue(item.Title);
                    this.getView().byId("language").setValue(item.langueage);
                    this.getView().byId("total").setValue(item.total_number);
                    this.getView().byId("available").setValue(item.nr_available);
                    this.getView().byId("inputDatePublish").setValue(item.publish_date);

                 }

	});
});