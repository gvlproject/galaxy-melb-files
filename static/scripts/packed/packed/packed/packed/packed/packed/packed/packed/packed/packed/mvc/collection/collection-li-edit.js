define(["mvc/collection/collection-li","mvc/dataset/dataset-li-edit","mvc/base-mvc","utils/localization"],function(a,b){var c=a.DCListItemView,d=c.extend({initialize:function(a){c.prototype.initialize.call(this,a)},toString:function(){var a=this.model?this.model+"":"(no model)";return"DCListItemEdit("+a+")"}}),e=a.DCEListItemView,f=e.extend({initialize:function(a){e.prototype.initialize.call(this,a)},toString:function(){var a=this.model?this.model+"":"(no model)";return"DCEListItemEdit("+a+")"}}),g=b.DatasetListItemEdit.extend({initialize:function(a){b.DatasetListItemEdit.prototype.initialize.call(this,a)},toString:function(){var a=this.model?this.model+"":"(no model)";return"DatasetDCEListItemEdit("+a+")"}});g.prototype.templates=function(){return _.extend({},b.DatasetListItemEdit.prototype.templates,{titleBar:a.DatasetDCEListItemView.prototype.templates.titleBar})}();var h=a.NestedDCDCEListItemView.extend({toString:function(){var a=this.model?this.model+"":"(no model)";return"NestedDCDCEListItemEdit("+a+")"}});return{DCListItemEdit:d,DCEListItemEdit:f,DatasetDCEListItemEdit:g,NestedDCDCEListItemEdit:h}});
//# sourceMappingURL=../../../maps/mvc/collection/collection-li-edit.js.map