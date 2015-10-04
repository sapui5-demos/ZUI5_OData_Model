sap.ui.controller("sap.training.view.Binding-Specific_Parameters", {

	onInit: function() {
		var sUrl = "/destinations/ODATA_ORG/V2/OData/OData.svc/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(sUrl);
		this.getView().setModel(oModel);
	}

});