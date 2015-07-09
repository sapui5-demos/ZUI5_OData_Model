sap.ui.controller("sap.training.view.Creating_Entities", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf sap.training.view.Creating_Entities
	 */
	onInit: function() {
		var sUrl = "/destinations/ODATA_ORG/V2/(S(5ewsfhze3qrhi4qifgvsxlu5))/OData/OData.svc/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(sUrl);
		oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
		this.getView().setModel(oModel);

		oModel.attachMetadataLoaded(function() {
			var oModel = this.getView().getModel();

			var oContext = oModel.createEntry("/Products");
			var oSimpleForm = this.getView().byId("NewProductSF");
			oSimpleForm.setBindingContext(oContext);

		}, this);
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf sap.training.view.Creating_Entities
	 */
	//	onBeforeRendering: function() {
	//
	//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf sap.training.view.Creating_Entities
	 */
	// 	onAfterRendering: function() {
	//
	// 	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf sap.training.view.Creating_Entities
	 */
	//	onExit: function() {
	//
	//	}

	onSaveProduct: function(oEvent) {
		var oModel = this.getView().getModel();
		oModel.submitChanges();
	}

});