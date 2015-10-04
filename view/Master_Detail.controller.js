sap.ui.controller("sap.training.view.Master_Detail", {

	onInit: function() {
		var sUrl = "/sap/opu/odata/sap/ZWDE360_BP_SO_SRV/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(sUrl);
		this.getView().setModel(oModel);
	},

	onBPChange: function(oEvent) {
		// get the binding context of the selected row
		var selectedRowContext = oEvent.getParameter("rowContext");

		var oTable = this.getView().byId("SOTable");

		oTable.bindRows(selectedRowContext + "/SalesOrderSet");
	}

});