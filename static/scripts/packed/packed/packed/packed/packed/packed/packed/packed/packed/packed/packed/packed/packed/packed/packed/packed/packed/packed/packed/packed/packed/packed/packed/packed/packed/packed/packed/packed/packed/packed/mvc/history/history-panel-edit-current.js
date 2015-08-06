define(["mvc/history/history-model","mvc/history/history-panel-edit","mvc/collection/collection-panel","mvc/base-mvc","utils/localization"],function(a,b,c,d,e){var f=d.SessionStorageModel.extend({defaults:{tagsEditorShown:!1,annotationEditorShown:!1,scrollPosition:0},toString:function(){return"HistoryPanelPrefs("+JSON.stringify(this.toJSON())+")"}});f.storageKey=function(){return"history-panel"};var g=b.HistoryPanelEdit,h=g.extend({className:g.prototype.className+" current-history-panel",emptyMsg:e("This history is empty. Click 'Get Data' on the left tool menu to start"),noneFoundMsg:e("No matching datasets found"),HDCAViewClass:g.prototype.HDCAViewClass.extend({foldoutStyle:"drilldown"}),initialize:function(a){a=a||{},this.preferences=new f(_.extend({id:f.storageKey()},_.pick(a,_.keys(f.prototype.defaults)))),g.prototype.initialize.call(this,a),this.panelStack=[],this.currentContentId=a.currentContentId||null},_setUpListeners:function(){g.prototype._setUpListeners.call(this);var a=this;this.$scrollContainer().on("scroll",function(){a.$el.is(":visible")&&a.preferences.set("scrollPosition",$(this).scrollTop())}),this.on("new-model",function(){a.preferences.set("scrollPosition",0)})},loadCurrentHistory:function(a){this.debug(this+".loadCurrentHistory");var b=this;return this.loadHistoryWithDetails("current",a).then(function(){b.trigger("current-history",b)})},switchToHistory:function(a,b){var c=this,d=function(){return jQuery.getJSON(galaxy_config.root+"history/set_as_current?id="+a)};return this.loadHistoryWithDetails(a,b,d).then(function(){c.trigger("switched-history",c)})},createNewHistory:function(a){if(!Galaxy||!Galaxy.currUser||Galaxy.currUser.isAnonymous())return this.displayMessage("error",e("You must be logged in to create histories")),$.when();var b=this,c=function(){return jQuery.getJSON(galaxy_config.root+"history/create_new_current")};return this.loadHistory(void 0,a,c).then(function(){b.trigger("new-history",b)})},setModel:function(a,b,c){return g.prototype.setModel.call(this,a,b,c),this.model&&(this.log("checking for updates"),this.model.checkForUpdates()),this},_setUpCollectionListeners:function(){g.prototype._setUpCollectionListeners.call(this),this.collection.on("state:ready",function(a){a.get("visible")||this.storage.get("show_hidden")||this.removeItemView(a)},this)},_setUpModelListeners:function(){g.prototype._setUpModelListeners.call(this),Galaxy&&Galaxy.quotaMeter&&this.listenTo(this.model,"change:nice_size",function(){Galaxy.quotaMeter.update()})},_buildNewRender:function(){if(!this.model)return $();var a=g.prototype._buildNewRender.call(this);return a.find(".search").prependTo(a.find(".controls")),this._renderQuotaMessage(a),a},_renderQuotaMessage:function(a){return a=a||this.$el,$(this.templates.quotaMsg({},this)).prependTo(a.find(".messages"))},_renderEmptyMessage:function(a){var b=this,c=b.$emptyMessage(a),d=$(".toolMenuContainer");return _.isEmpty(b.views)&&!b.searchFor&&Galaxy&&Galaxy.upload&&d.size()?(c.empty(),c.html([e("This history is empty"),". ",e("You can "),'<a class="uploader-link" href="javascript:void(0)">',e("load your own data"),"</a>",e(" or "),'<a class="get-data-link" href="javascript:void(0)">',e("get data from an external source"),"</a>"].join("")),c.find(".uploader-link").click(function(a){Galaxy.upload.show(a)}),c.find(".get-data-link").click(function(){d.parent().scrollTop(0),d.find('span:contains("Get Data")').click()}),c.show()):g.prototype._renderEmptyMessage.call(this,a)},_renderTags:function(a){var b=this;g.prototype._renderTags.call(this,a),this.preferences.get("tagsEditorShown")&&this.tagsEditor.toggle(!0),this.tagsEditor.on("hiddenUntilActivated:shown hiddenUntilActivated:hidden",function(a){b.preferences.set("tagsEditorShown",a.hidden)})},_renderAnnotation:function(a){var b=this;g.prototype._renderAnnotation.call(this,a),this.preferences.get("annotationEditorShown")&&this.annotationEditor.toggle(!0),this.annotationEditor.on("hiddenUntilActivated:shown hiddenUntilActivated:hidden",function(a){b.preferences.set("annotationEditorShown",a.hidden)})},_swapNewRender:function(a){g.prototype._swapNewRender.call(this,a);var b=this;return _.delay(function(){var a=b.preferences.get("scrollPosition");a&&b.scrollTo(a)},10),this},_attachItems:function(a){g.prototype._attachItems.call(this,a);var b=this;return b.currentContentId&&b._setCurrentContentById(b.currentContentId),this},addItemView:function(a,b,c){var d=g.prototype.addItemView.call(this,a,b,c);return d&&this.panelStack.length?this._collapseDrilldownPanel():d},_setUpItemViewListeners:function(a){var b=this;return g.prototype._setUpItemViewListeners.call(b,a),a.on("expanded:drilldown",function(a,b){this._expandDrilldownPanel(b)},this),a.on("collapsed:drilldown",function(a,b){this._collapseDrilldownPanel(b)},this),this},setCurrentContent:function(a){this.$(".history-content.current-content").removeClass("current-content"),a?(a.$el.addClass("current-content"),this.currentContentId=a.model.id):this.currentContentId=null},_setCurrentContentById:function(a){var b=this.viewFromModelId(a)||null;this.setCurrentContent(b)},_expandDrilldownPanel:function(a){this.panelStack.push(a),this.$("> .controls").add(this.$list()).hide(),a.parentName=this.model.get("name"),this.$el.append(a.render().$el)},_collapseDrilldownPanel:function(){this.panelStack.pop(),this.render()},listenToGalaxy:function(a){a.on("galaxy_main:load",function(a){var b=a.fullpath,c={display:/datasets\/([a-f0-9]+)\/display/,edit:/datasets\/([a-f0-9]+)\/edit/,report_error:/dataset\/errors\?id=([a-f0-9]+)/,rerun:/tool_runner\/rerun\?id=([a-f0-9]+)/,show_params:/datasets\/([a-f0-9]+)\/show_params/},d=null,e=null;_.find(c,function(a,c){var f=b.match(a);return f&&2==f.length?(d=f[1],e=c,!0):!1}),d="dataset-"+d,this._setCurrentContentById(d)},this)},connectToQuotaMeter:function(a){return a?(this.listenTo(a,"quota:over",this.showQuotaMessage),this.listenTo(a,"quota:under",this.hideQuotaMessage),this.on("rendered rendered:initial",function(){a&&a.isOverQuota()&&this.showQuotaMessage()}),this):this},clearMessages:function(a){var b=_.isUndefined(a)?this.$messages().children('[class$="message"]'):$(a.currentTarget);return b=b.not(".quota-message"),b.fadeOut(this.fxSpeed,function(){$(this).remove()}),this},showQuotaMessage:function(){var a=this.$(".quota-message");a.is(":hidden")&&a.slideDown(this.fxSpeed)},hideQuotaMessage:function(){var a=this.$(".quota-message");a.is(":hidden")||a.slideUp(this.fxSpeed)},toString:function(){return"CurrentHistoryPanel("+(this.model?this.model.get("name"):"")+")"}});return h.prototype.templates=function(){var a=d.wrapTemplate(['<div class="quota-message errormessage">',e("You are over your disk quota"),". ",e("Tool execution is on hold until your disk usage drops below your allocated quota"),".","</div>"],"history");return _.extend(_.clone(g.prototype.templates),{quotaMsg:a})}(),{CurrentHistoryPanel:h}});
//# sourceMappingURL=../../../maps/mvc/history/history-panel-edit-current.js.map