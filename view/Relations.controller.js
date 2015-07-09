sap.ui.controller("sap.training.view.Relations", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf sap.training.view.CRUD
	 */
	onInit: function() {

		var sUrl = "/destinations/ODATA_ORG/V2/(S(5bvlqi3vwckp2c2pz5edfcgb))/OData/OData.svc/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(sUrl);
		
		this.getView().setModel(oModel);

		this.getView().setModel(new sap.ui.model.json.JSONModel(), "newProduct");
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf sap.training.view.CRUD
	 */
	//	onBeforeRendering: function() {
	//
	//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf sap.training.view.CRUD
	 */
	//	onAfterRendering: function() {
	//
	//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf sap.training.view.CRUD
	 */
	//	onExit: function() {
	//
	//	}

	onCreateProduct: function(oEvent) {
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
				if (sId == aItems[i].getId()) {
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