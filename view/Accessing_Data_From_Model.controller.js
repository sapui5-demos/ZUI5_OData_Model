sap.ui.controller("sap.training.view.Accessing_Data_From_Model", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf sap.training.view.Accessing_Data_From_Model
	 */
	onInit: function() {

		var sUrl = "/destinations/ODATA_ORG/V2/(S(f5be01a2zy2silbgtw3pqwiq))/OData/OData.svc/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(sUrl);

		this.getView().setModel(oModel);

	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf sap.training.view.Accessing_Data_From_Model
	 */
	//	onBeforeRendering: function() {
	//
	//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf sap.training.view.Accessing_Data_From_Model
	 */
	//	onAfterRendering: function() {
	//
	//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf sap.training.view.Accessing_Data_From_Model
	 */
	//	onExit: function() {
	//
	//	}

	onRowChange: function(oEvent) {

		// get the binding context of the selected row
		var selectedRowContext = oEvent.getParameter("rowContext");
		var sPath = selectedRowContext.getPath();

		var oModel = this.getView().getModel();

		var oEntity = oModel.getProperty(sPath);

		jQuery.sap.require("sap.m.MessageToast");
		sap.m.MessageToast.show("Id: " + oEntity.ID);
	}

});