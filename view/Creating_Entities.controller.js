sap.ui.controller("sap.training.view.Creating_Entities", {

	onInit: function() {
		var sUrl = "/destinations/ODATA_ORG/V2/(S(5ewsfhze3qrhi4qifgvsxlu5))/OData/OData.svc/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(sUrl);
		oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
		this.getView().setModel(oModel);

		oModel.attachMetadataLoaded(function() {
			var oContext = oModel.createEntry("/Products");
			var oSimpleForm = this.getView().byId("NewProductSF");
			oSimpleForm.setBindingContext(oContext);
		}, this);
	},

	onSaveProduct: function() {
		var oModel = this.getView().getModel();
		oModel.submitChanges();
	}

});