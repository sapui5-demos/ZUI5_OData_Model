sap.ui.controller("sap.training.view.Accessing_Data_From_Model", {

	onInit: function() {

		var sUrl = "/destinations/ODATA_ORG/V2/OData/OData.svc/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(sUrl);
		this.getView().setModel(oModel);
	},

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