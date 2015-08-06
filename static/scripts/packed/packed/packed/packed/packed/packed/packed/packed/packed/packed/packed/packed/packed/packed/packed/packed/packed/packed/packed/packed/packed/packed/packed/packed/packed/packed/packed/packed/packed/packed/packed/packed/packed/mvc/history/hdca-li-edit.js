define(["mvc/history/hdca-li","mvc/collection/collection-panel-edit","ui/fa-icon-button","utils/localization"],function(a,b,c,d){var e=a.HDCAListItemView,f=e.extend({_getFoldoutPanelClass:function(){switch(this.model.get("collection_type")){case"list":return b.ListCollectionPanelEdit;case"paired":return b.PairCollectionPanelEdit;case"list:paired":return b.ListOfPairsCollectionPanelEdit}throw new TypeError("Uknown collection_type: "+this.model.get("collection_type"))},_renderPrimaryActions:function(){return this.log(this+"._renderPrimaryActions"),e.prototype._renderPrimaryActions.call(this).concat([this._renderDeleteButton()])},_renderDeleteButton:function(){var a=this,b=this.model.get("deleted");return c({title:d(b?"Dataset collection is already deleted":"Delete"),classes:"delete-btn",faIcon:"fa-times",disabled:b,onclick:function(){a.$el.find(".icon-btn.delete-btn").trigger("mouseout"),a.model.delete()}})},toString:function(){var a=this.model?this.model+"":"(no model)";return"HDCAListItemEdit("+a+")"}});return{HDCAListItemEdit:f}});
//# sourceMappingURL=../../../maps/mvc/history/hdca-li-edit.js.map