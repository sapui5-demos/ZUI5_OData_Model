sap.ui.controller("sap.training.view.Relations", {

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

		oNewProduct.ReleaseDate = new Date(oNewProduct.ReleaseDate);
		oNewProduct.DiscontinuedDate = new Date(oNewProduct.DiscontinuedDate);

		// Add supplier & category associations
		["Supplier", "Category"].forEach(function(sRelation) {

			var oComboBox = this.getView().byId("idCBox" + sRelation);
			var aItems = oComboBox.getItems();
			var sId = oComboBox.getSelectedItemId();
			var oSelectedItem;

			for (var i = 0; i < aItems.length; i++) {
				if (sId === aItems[i].getId()) {
					oSelectedItem = aItems[i];
					break;
				}
			}

			var sPath = oSelectedItem.getBindingContext().getPath();
			oNewProduct[sRelation] = {
				__metadata: {
					uri: sPath
				}
			};
		}, this);

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
	}

});