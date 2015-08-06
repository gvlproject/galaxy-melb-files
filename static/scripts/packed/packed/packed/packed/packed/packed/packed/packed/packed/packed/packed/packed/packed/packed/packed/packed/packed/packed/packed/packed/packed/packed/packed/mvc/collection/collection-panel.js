define(["mvc/list/list-panel","mvc/collection/collection-model","mvc/collection/collection-li","mvc/base-mvc","utils/localization"],function(a,b,c,d,e){var f=a.ModelListPanel,g=f.extend({className:f.prototype.className+" dataset-collection-panel",DatasetDCEViewClass:c.DatasetDCEListItemView,NestedDCDCEViewClass:c.NestedDCDCEListItemView,modelCollectionKey:"elements",initialize:function(a){f.prototype.initialize.call(this,a),this.linkTarget=a.linkTarget||"_blank",this.hasUser=a.hasUser,this.panelStack=[],this.parentName=a.parentName,this.foldoutStyle=a.foldoutStyle||"foldout"},_filterCollection:function(){return this.model.getVisibleContents()},_getItemViewClass:function(a){switch(a.get("element_type")){case"hda":return this.DatasetDCEViewClass;case"dataset_collection":return this.NestedDCDCEViewClass}throw new TypeError("Unknown element type:",a.get("element_type"))},_getItemViewOptions:function(a){var b=f.prototype._getItemViewOptions.call(this,a);return _.extend(b,{linkTarget:this.linkTarget,hasUser:this.hasUser,foldoutStyle:this.foldoutStyle})},_setUpItemViewListeners:function(a){var b=this;return f.prototype._setUpItemViewListeners.call(b,a),a.on("expanded:drilldown",function(a,b){this._expandDrilldownPanel(b)},this),a.on("collapsed:drilldown",function(a,b){this._collapseDrilldownPanel(b)},this),this},_expandDrilldownPanel:function(a){this.panelStack.push(a),this.$("> .controls").add(this.$list()).hide(),a.parentName=this.model.get("name"),this.$el.append(a.render().$el)},_collapseDrilldownPanel:function(){this.panelStack.pop(),this.render()},events:{"click .navigation .back":"close"},close:function(){this.$el.remove(),this.trigger("close")},toString:function(){return"CollectionPanel("+(this.model?this.model.get("name"):"")+")"}});g.prototype.templates=function(){var a=d.wrapTemplate(['<div class="controls">','<div class="navigation">','<a class="back" href="javascript:void(0)">','<span class="fa fa-icon fa-angle-left"></span>',e("Back to "),"<%- view.parentName %>","</a>","</div>",'<div class="title">','<div class="name"><%- collection.name || collection.element_identifier %></div>','<div class="subtitle">','<% if( collection.collection_type === "list" ){ %>',e("a list of datasets"),'<% } else if( collection.collection_type === "paired" ){ %>',e("a pair of datasets"),'<% } else if( collection.collection_type === "list:paired" ){ %>',e("a list of paired datasets"),"<% } %>","</div>","</div>","</div>"],"collection");return _.extend(_.clone(f.prototype.templates),{controls:a})}();var h=g.extend({DatasetDCEViewClass:c.DatasetDCEListItemView,toString:function(){return"ListCollectionPanel("+(this.model?this.model.get("name"):"")+")"}}),i=h.extend({toString:function(){return"PairCollectionPanel("+(this.model?this.model.get("name"):"")+")"}}),j=g.extend({NestedDCDCEViewClass:c.NestedDCDCEListItemView.extend({foldoutPanelClass:i}),toString:function(){return"ListOfPairsCollectionPanel("+(this.model?this.model.get("name"):"")+")"}});return{CollectionPanel:g,ListCollectionPanel:h,PairCollectionPanel:i,ListOfPairsCollectionPanel:j}});
//# sourceMappingURL=../../../maps/mvc/collection/collection-panel.js.map