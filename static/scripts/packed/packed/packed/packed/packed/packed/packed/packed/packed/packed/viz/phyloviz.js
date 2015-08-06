define(["libs/d3","viz/visualization","mvc/data","mvc/ui/icon-button"],function(a,b,c,d){function e(){function b(a,c,d,e){var f=a.children,g=0,l=a.dist||j;return l=l>1?1:l,a.dist=l,a.y0=null!==e?e.y0+l*h:k,f?(f.forEach(function(e){e.parent=a,g+=b(e,c,d,a)}),a.x0=g/f.length):(a.x0=i*d,i+=1),a.x=a.x0,a.y=a.y0,a.x0}var c=this,d=a.layout.hierarchy().sort(null).value(null),e=360,f="Linear",g=18,h=200,i=0,j=.5,k=50;return c.leafHeight=function(a){return"undefined"==typeof a?g:(g=a,c)},c.layoutMode=function(a){return"undefined"==typeof a?f:(f=a,c)},c.layoutAngle=function(a){return"undefined"==typeof a?e:isNaN(a)||0>a||a>360?c:(e=a,c)},c.separation=function(a){return"undefined"==typeof a?h:(h=a,c)},c.links=function(b){return a.layout.tree().links(b)},c.nodes=function(a,h){"[object Array]"===toString.call(a)&&(a=a[0]);var j=d.call(c,a,h),k=[],l=0,m=0;return window._d=a,window._nodes=j,j.forEach(function(a){l=a.depth>l?a.depth:l,k.push(a)}),k.forEach(function(a){a.children||(m+=1,a.depth=l)}),g="Circular"===f?e/m:g,i=0,b(k[0],l,g,null),k},c}var f=Backbone.View.extend({className:"UserMenuBase",isAcceptableValue:function(a,b,c){function d(a){return!isNaN(parseFloat(a))&&isFinite(a)}var e=a.val(),f=a.attr("displayLabel")||a.attr("id").replace("phyloViz","");return d(e)?e>c?(alert(f+" is too large."),!1):b>e?(alert(f+" is too small."),!1):!0:(alert(f+" is not a number!"),!1)},hasIllegalJsonCharacters:function(a){return-1!==a.val().search(/"|'|\\/)?(alert("Named fields cannot contain these illegal characters: double quote(\"), single guote('), or back slash(\\). "),!0):!1}}),g=b.Visualization.extend({defaults:{layout:"Linear",separation:250,leafHeight:18,type:"phyloviz",title:"Title",scaleFactor:1,translate:[0,0],fontSize:12,selectedNode:null,nodeAttrChangedTime:0},initialize:function(a){this.set("dataset",new c.Dataset({id:a.dataset_id}))},root:{},toggle:function(a){"undefined"!=typeof a&&(a.children?(a._children=a.children,a.children=null):(a.children=a._children,a._children=null))},toggleAll:function(a){a.children&&0!==a.children.length&&(a.children.forEach(this.toggleAll),toggle(a))},getData:function(){return this.root},save:function(){function a(b){delete b.parent,b._selected&&delete b._selected,b.children&&b.children.forEach(a),b._children&&b._children.forEach(a)}var b=this.root;a(b);var c=jQuery.extend(!0,{},this.attributes);return c.selectedNode=null,show_message("Saving to Galaxy","progress"),$.ajax({url:this.url(),type:"POST",dataType:"json",data:{config:JSON.stringify(c),type:"phyloviz"},success:function(){hide_modal()}})}}),h=Backbone.View.extend({defaults:{nodeRadius:4.5},stdInit:function(a){var b=this;b.model.on("change:separation change:leafHeight change:fontSize change:nodeAttrChangedTime",b.updateAndRender,b),b.vis=a.vis,b.i=0,b.maxDepth=-1,b.width=a.width,b.height=a.height},updateAndRender:function(b){var c=(a.select(".vis"),this);b=b||c.model.root,c.renderNodes(b),c.renderLinks(b),c.addTooltips()},renderLinks:function(){var a=this,b=(a.diagonal,a.duration,a.layoutMode,a.vis.selectAll("g.completeLink").data(a.tree.links(a.nodes),function(a){return a.target.id})),c=function(a){a.pos0=a.source.y0+" "+a.source.x0,a.pos1=a.source.y0+" "+a.target.x0,a.pos2=a.target.y0+" "+a.target.x0},d=b.enter().insert("svg:g","g.node").attr("class","completeLink");d.append("svg:path").attr("class","link").attr("d",function(a){return c(a),"M "+a.pos0+" L "+a.pos1});var e=b.transition().duration(500);e.select("path.link").attr("d",function(a){return c(a),"M "+a.pos0+" L "+a.pos1+" L "+a.pos2});b.exit().remove()},selectNode:function(b){var c=this;a.selectAll("g.node").classed("selectedHighlight",function(a){return b.id===a.id?b._selected?(delete b._selected,!1):(b._selected=!0,!0):!1}),c.model.set("selectedNode",b),$("#phyloVizSelectedNodeName").val(b.name),$("#phyloVizSelectedNodeDist").val(b.dist),$("#phyloVizSelectedNodeAnnotation").val(b.annotation||"")},addTooltips:function(){$(".tooltip").remove(),$(".node").attr("data-original-title",function(){var a=this.__data__,b=a.annotation||"None";return a?(a.name?a.name+"<br/>":"")+"Dist: "+a.dist+" <br/>Annotation: "+b:""}).tooltip({placement:"top",trigger:"hover"})}}),i=h.extend({initialize:function(a){var b=this;b.margins=a.margins,b.layoutMode="Linear",b.stdInit(a),b.layout(),b.updateAndRender(b.model.root)},layout:function(){var b=this;b.tree=(new e).layoutMode("Linear"),b.diagonal=a.svg.diagonal().projection(function(a){return[a.y,a.x]})},renderNodes:function(b){var c=this,d=c.model.get("fontSize")+"px";c.tree.separation(c.model.get("separation")).leafHeight(c.model.get("leafHeight"));var e=500,f=c.tree.separation(c.model.get("separation")).nodes(c.model.root),g=c.vis.selectAll("g.node").data(f,function(a){return a.name+a.id||(a.id=++c.i)});c.nodes=f,c.duration=e;var h=g.enter().append("svg:g").attr("class","node").on("dblclick",function(){a.event.stopPropagation()}).on("click",function(b){if(a.event.altKey)c.selectNode(b);else{if(b.children&&0===b.children.length)return;c.model.toggle(b),c.updateAndRender(b)}});"[object Array]"===toString.call(b)&&(b=b[0]),h.attr("transform",function(){return"translate("+b.y0+","+b.x0+")"}),h.append("svg:circle").attr("r",1e-6).style("fill",function(a){return a._children?"lightsteelblue":"#fff"}),h.append("svg:text").attr("class","nodeLabel").attr("x",function(a){return a.children||a._children?-10:10}).attr("dy",".35em").attr("text-anchor",function(a){return a.children||a._children?"end":"start"}).style("fill-opacity",1e-6);var i=g.transition().duration(e);i.attr("transform",function(a){return"translate("+a.y+","+a.x+")"}),i.select("circle").attr("r",c.defaults.nodeRadius).style("fill",function(a){return a._children?"lightsteelblue":"#fff"}),i.select("text").style("fill-opacity",1).style("font-size",d).text(function(a){return a.name});var j=g.exit().transition().duration(e).remove();j.select("circle").attr("r",1e-6),j.select("text").style("fill-opacity",1e-6),f.forEach(function(a){a.x0=a.x,a.y0=a.y})}}),j=Backbone.View.extend({className:"phyloviz",initialize:function(b){var c=this;c.MIN_SCALE=.05,c.MAX_SCALE=5,c.MAX_DISPLACEMENT=500,c.margins=[10,60,10,80],c.width=$("#PhyloViz").width(),c.height=$("#PhyloViz").height(),c.radius=c.width,c.data=b.data,$(window).resize(function(){c.width=$("#PhyloViz").width(),c.height=$("#PhyloViz").height(),c.render()}),c.phyloTree=new g(b.config),c.phyloTree.root=c.data,c.zoomFunc=a.behavior.zoom().scaleExtent([c.MIN_SCALE,c.MAX_SCALE]),c.zoomFunc.translate(c.phyloTree.get("translate")),c.zoomFunc.scale(c.phyloTree.get("scaleFactor")),c.navMenu=new k(c),c.settingsMenu=new l({phyloTree:c.phyloTree}),c.nodeSelectionView=new m({phyloTree:c.phyloTree}),c.search=new n,setTimeout(function(){c.zoomAndPan()},1e3)},render:function(){var b=this;$("#PhyloViz").empty(),b.mainSVG=a.select("#PhyloViz").append("svg:svg").attr("width",b.width).attr("height",b.height).attr("pointer-events","all").call(b.zoomFunc.on("zoom",function(){b.zoomAndPan()})),b.boundingRect=b.mainSVG.append("svg:rect").attr("class","boundingRect").attr("width",b.width).attr("height",b.height).attr("stroke","black").attr("fill","white"),b.vis=b.mainSVG.append("svg:g").attr("class","vis"),b.layoutOptions={model:b.phyloTree,width:b.width,height:b.height,vis:b.vis,margins:b.margins},$("#title").text("Phylogenetic Tree from "+b.phyloTree.get("title")+":");new i(b.layoutOptions)},zoomAndPan:function(b){var c,d;"undefined"!=typeof b&&(c=b.zoom,d=b.translate);var e=this,f=e.zoomFunc.scale(),g=e.zoomFunc.translate(),h="",i="";switch(c){case"reset":f=1,g=[0,0];break;case"+":f*=1.1;break;case"-":f*=.9;break;default:"number"==typeof c?f=c:null!==a.event&&(f=a.event.scale)}if(!(f<e.MIN_SCALE||f>e.MAX_SCALE)){if(e.zoomFunc.scale(f),h="translate("+e.margins[3]+","+e.margins[0]+") scale("+f+")",null!==a.event)i="translate("+a.event.translate+")";else{if("undefined"!=typeof d){var j=d.split(",")[0],k=d.split(",")[1];isNaN(j)||isNaN(k)||(g=[g[0]+parseFloat(j),g[1]+parseFloat(k)])}e.zoomFunc.translate(g),i="translate("+g+")"}e.phyloTree.set("scaleFactor",f),e.phyloTree.set("translate",g),e.vis.attr("transform",i+h)}},reloadViz:function(){var a=this,b=$("#phylovizNexSelector :selected").val();$.getJSON(a.phyloTree.get("dataset").url(),{tree_index:b,data_type:"raw_data"},function(b){a.data=b.data,a.config=b,a.render()})}}),k=Backbone.View.extend({initialize:function(a){var b=this;b.phylovizView=a,$("#panelHeaderRightBtns").empty(),$("#phyloVizNavBtns").empty(),$("#phylovizNexSelector").off(),b.initNavBtns(),b.initRightHeaderBtns(),$("#phylovizNexSelector").off().on("change",function(){b.phylovizView.reloadViz()})},initRightHeaderBtns:function(){var a=this;rightMenu=d.create_icon_buttons_menu([{icon_class:"gear",title:"PhyloViz Settings",on_click:function(){$("#SettingsMenu").show(),a.settingsMenu.updateUI()}},{icon_class:"disk",title:"Save visualization",on_click:function(){var b=$("#phylovizNexSelector option:selected").text();b&&a.phylovizView.phyloTree.set("title",b),a.phylovizView.phyloTree.save()}},{icon_class:"chevron-expand",title:"Search / Edit Nodes",on_click:function(){$("#nodeSelectionView").show()}},{icon_class:"information",title:"Phyloviz Help",on_click:function(){window.open("https://wiki.galaxyproject.org/Learn/Visualization/PhylogeneticTree")}}],{tooltip_config:{placement:"bottom"}}),$("#panelHeaderRightBtns").append(rightMenu.$el)},initNavBtns:function(){var a=this,b=d.create_icon_buttons_menu([{icon_class:"zoom-in",title:"Zoom in",on_click:function(){a.phylovizView.zoomAndPan({zoom:"+"})}},{icon_class:"zoom-out",title:"Zoom out",on_click:function(){a.phylovizView.zoomAndPan({zoom:"-"})}},{icon_class:"arrow-circle",title:"Reset Zoom/Pan",on_click:function(){a.phylovizView.zoomAndPan({zoom:"reset"})}}],{tooltip_config:{placement:"bottom"}});$("#phyloVizNavBtns").append(b.$el)}}),l=f.extend({className:"Settings",initialize:function(a){var b=this;b.phyloTree=a.phyloTree,b.el=$("#SettingsMenu"),b.inputs={separation:$("#phyloVizTreeSeparation"),leafHeight:$("#phyloVizTreeLeafHeight"),fontSize:$("#phyloVizTreeFontSize")},$("#settingsCloseBtn").off().on("click",function(){b.el.hide()}),$("#phylovizResetSettingsBtn").off().on("click",function(){b.resetToDefaults()}),$("#phylovizApplySettingsBtn").off().on("click",function(){b.apply()})},apply:function(){var a=this;a.isAcceptableValue(a.inputs.separation,50,2500)&&a.isAcceptableValue(a.inputs.leafHeight,5,30)&&a.isAcceptableValue(a.inputs.fontSize,5,20)&&$.each(a.inputs,function(b,c){a.phyloTree.set(b,c.val())})},updateUI:function(){var a=this;$.each(a.inputs,function(b,c){c.val(a.phyloTree.get(b))})},resetToDefaults:function(){$(".tooltip").remove();var a=this;$.each(a.phyloTree.defaults,function(b,c){a.phyloTree.set(b,c)}),a.updateUI()},render:function(){}}),m=f.extend({className:"Settings",initialize:function(a){var b=this;b.el=$("#nodeSelectionView"),b.phyloTree=a.phyloTree,b.UI={enableEdit:$("#phylovizEditNodesCheck"),saveChanges:$("#phylovizNodeSaveChanges"),cancelChanges:$("#phylovizNodeCancelChanges"),name:$("#phyloVizSelectedNodeName"),dist:$("#phyloVizSelectedNodeDist"),annotation:$("#phyloVizSelectedNodeAnnotation")},b.valuesOfConcern={name:null,dist:null,annotation:null},$("#nodeSelCloseBtn").off().on("click",function(){b.el.hide()}),b.UI.saveChanges.off().on("click",function(){b.updateNodes()}),b.UI.cancelChanges.off().on("click",function(){b.cancelChanges()}),function(a){a.fn.enable=function(b){return a(this).each(function(){b?a(this).removeAttr("disabled"):a(this).attr("disabled","disabled")})}}(jQuery),b.UI.enableEdit.off().on("click",function(){b.toggleUI()})},toggleUI:function(){var a=this,b=a.UI.enableEdit.is(":checked");b||a.cancelChanges(),$.each(a.valuesOfConcern,function(c){a.UI[c].enable(b)}),b?(a.UI.saveChanges.show(),a.UI.cancelChanges.show()):(a.UI.saveChanges.hide(),a.UI.cancelChanges.hide())},cancelChanges:function(){var a=this,b=a.phyloTree.get("selectedNode");b&&$.each(a.valuesOfConcern,function(c){a.UI[c].val(b[c])})},updateNodes:function(){var a=this,b=a.phyloTree.get("selectedNode");if(b){if(!a.isAcceptableValue(a.UI.dist,0,1)||a.hasIllegalJsonCharacters(a.UI.name)||a.hasIllegalJsonCharacters(a.UI.annotation))return;$.each(a.valuesOfConcern,function(c){b[c]=a.UI[c].val()}),a.phyloTree.set("nodeAttrChangedTime",new Date)}else alert("No node selected")}}),n=f.extend({initialize:function(){var a=this;$("#phyloVizSearchBtn").on("click",function(){var b=$("#phyloVizSearchTerm"),c=$("#phyloVizSearchCondition").val().split("-"),d=c[0],e=c[1];a.hasIllegalJsonCharacters(b),"dist"===d&&a.isAcceptableValue(b,0,1),a.searchTree(d,e,b.val())})},searchTree:function(b,c,d){a.selectAll("g.node").classed("searchHighlight",function(a){var e=a[b];if("undefined"!=typeof e&&null!==e)if("dist"===b)switch(c){case"greaterEqual":return e>=+d;case"lesserEqual":return+d>=e;default:return}else if("name"===b||"annotation"===b)return-1!==e.toLowerCase().indexOf(d.toLowerCase())})}});return{PhylovizView:j}});
//# sourceMappingURL=../../maps/viz/phyloviz.js.map