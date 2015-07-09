sap.ui.controller("sap.training.view.U_TwoWay", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf sap.training.view.CRUD
	 */

	onInit: function() {

		var sUrl = "/destinations/ODATA_ORG/V2/(S(5bvlqi3vwckp2c2pz5edfcgb))/OData/OData.svc/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(sUrl);

		oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);

		this.getView().setModel(oModel);
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

	onProductChange: function(oEvent) {

		var oModel = this.getView().getModel();

		//Ändern eines neuen Produkts soll nur möglich sein, wenn gegebenenfalls vorgenommene Änderungen am 
		//aktuellen Produkt zuvor gespeichert oder verworfen werden
		if (oModel.hasPendingChanges()) {
			jQuery.sap.require("sap.m.MessageToast");
			sap.m.MessageToast.show("Please save or reset your pending changes!");
		} else {
			// get the binding context of the selected row
			var selectedRowContext = oEvent.getParameter("rowContext");
			var oForm = this.getView().byId("ProductForm");
			oForm.bindElement(selectedRowContext.getPath());
		}

		//Über das V2-Model können aber auch mehrere Entities simultan geändert werden. Um dies auf dem UI zu erlauben,
		//wird in der nachfolgenden Implementierung keine Abfrage auf pending Changes vorgenommen

		// get the binding context of the selected row
		// 		var selectedRowContext = oEvent.getParameter("rowContext");
		// 		var oForm = this.getView().byId("ProductForm");
		// 		oForm.bindElement(selectedRowContext.getPath());

	},

	onSaveProduct: function(oEvent) {

		var oModel = this.getView().getModel();

		oModel.submitChanges({
			success: function(oData) {
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show("Changes are saved!");
			},
			error: function(oError) {
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show(oError.message);
			}
		});
	},

	onResetProduct: function(oEvent) {
		var oModel = this.getView().getModel();
		oModel.resetChanges();
	}

});