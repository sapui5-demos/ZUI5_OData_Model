sap.ui.controller("sap.training.view.Binding_Path_Syntax", {

	onInit: function() {
		var sUrl = "/destinations/ODATA_ORG/V2/OData/OData.svc/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(sUrl);
		this.getView().setModel(oModel);
	},

	onCategoryChange: function(oEvent) {

		// get the binding context of the selected row
		var selectedItem = oEvent.getParameter("selectedItem");
		var sPath = selectedItem.getBindingContext().getPath();

		var oListBox = this.getView().byId("ProductsLB");
		oListBox.bindElement(sPath);
	}

});