sap.ui.controller("sap.training.view.U_OneWay", {

	onInit: function() {

		var sUrl = "/destinations/ODATA_ORG/V2/(S(5bvlqi3vwckp2c2pz5edfcgb))/OData/OData.svc/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(sUrl);
		this.getView().setModel(oModel);

		this.getView().setModel(new sap.ui.model.json.JSONModel(), "updatedProductData");
	},

	onUpdateProduct: function() {

		var oUpdatedProductData = this.getView().getModel("updatedProductData").getData();

		//Values for property 'Price' of type 'decimal' must be quoted in the payload
		oUpdatedProductData.Price = oUpdatedProductData.Price + "";

		// Send OData Update request
		var oModel = this.getView().getModel();

		oModel.update("/Products(" + oUpdatedProductData.ID + ")", oUpdatedProductData, {
			success: function() {
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show("Product updated");
			},
			error: function(oError) {
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show(oError.message);
			}
		});

	}

});