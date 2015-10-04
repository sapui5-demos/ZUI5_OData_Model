sap.ui.controller("sap.training.view.C_R_D", {

	onInit: function() {

		var sUrl = "/destinations/ODATA_ORG/V2/(S(5bvlqi3vwckp2c2pz5edfcgb))/OData/OData.svc/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(sUrl);
		this.getView().setModel(oModel);

		this.getView().setModel(new sap.ui.model.json.JSONModel(), "newProduct");
	},

	onCreateProduct: function() {
		var oNewProduct = this.getView().getModel("newProduct").getData();

		//Values for property 'Price' of type 'decimal' must be quoted in the payload
		oNewProduct.Price = oNewProduct.Price + "";

		// Send OData Create request
		var oModel = this.getView().getModel();
		oModel.create("/Products", oNewProduct, {
			success: function(oData, response) {
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show("Product created");
			},
			error: function(oError) {
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show(oError.message);
			}
		});

	},

	onDeleteProduct: function(oEvent) {
		var productId = oEvent.getSource().data("id");

		// Send OData Delete request
		var oModel = this.getView().getModel();
		oModel.remove("/Products(" + productId + ")", {
			success: function(oData, response) {
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show("Product deleted");
			},
			error: function(oError) {
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show(oError.message);
			}
		});

	},

	onGetHighestId: function() {

		this.getView().getModel().read("/Products", {
			urlParameters: {
				"$top": 1,
				"$orderby": "ID desc",
				"$select": "ID"
			},
			success: function(oData, response) {
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show("Highest Id: " + oData.results[0].ID);
			},
			error: function(oError) {
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show(oError.message);
			}
		});
	}

});