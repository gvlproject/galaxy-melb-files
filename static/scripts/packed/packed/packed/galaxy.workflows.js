function reset(){workflow&&workflow.remove_all(),workflow=new Workflow($("#canvas-container"))}function scroll_to_nodes(){var a,b,c=$("#canvas-viewport"),d=$("#canvas-container");b=d.width()<c.width()?(c.width()-d.width())/2:0,a=d.height()<c.height()?(c.height()-d.height())/2:0,d.css({left:b,top:a})}function add_node_for_tool(a,b){node=add_node("tool",b,a),$.ajax({url:get_new_module_info_url,data:{type:"tool",tool_id:a,_:"true"},global:!1,dataType:"json",success:function(a){node.init_field_data(a)},error:function(a){var b="error loading field data";0===a.status&&(b+=", server unavailable"),node.error(b)}})}function add_node_for_module(a,b){node=add_node(a,b),$.ajax({url:get_new_module_info_url,data:{type:a,_:"true"},dataType:"json",success:function(a){node.init_field_data(a)},error:function(a){var b="error loading field data";0==a.status&&(b+=", server unavailable"),node.error(b)}})}function display_pja(a,b){$("#pja_container").append(get_pja_form(a,b)),$("#pja_container>.toolForm:last>.toolFormTitle>.buttons").click(function(){action_to_rem=$(this).closest(".toolForm",".action_tag").children(".action_tag:first").text(),$(this).closest(".toolForm").remove(),delete workflow.active_node.post_job_actions[action_to_rem],workflow.active_form_has_changes=!0})}function display_pja_list(){return pja_list}function display_file_list(a){addlist="<select id='node_data_list' name='node_data_list'>";for(var b in a.output_terminals)addlist+="<option value='"+b+"'>"+b+"</option>";return addlist+="</select>",addlist}function new_pja(a,b,c){if(void 0===c.post_job_actions&&(c.post_job_actions={}),void 0===c.post_job_actions[a+b]){var d={};return d.action_type=a,d.output_name=b,c.post_job_actions[a+b]=null,c.post_job_actions[a+b]=d,display_pja(d,c),workflow.active_form_has_changes=!0,!0}return!1}function show_workflow_parameters(){var a=/\$\{.+?\}/g,b=[],c=$("#workflow-parameters-container"),d=$("#workflow-parameters-box"),e="",f=[];$.each(workflow.nodes,function(c,d){var e=d.form_html.match(a);e&&(f=f.concat(e)),d.post_job_actions&&($.each(d.post_job_actions,function(b,c){c.action_arguments&&$.each(c.action_arguments,function(b,c){var d=c.match(a);d&&(f=f.concat(d))})}),f&&$.each(f,function(a,c){-1===$.inArray(c,b)&&b.push(c)}))}),b&&0!==b.length?($.each(b,function(a,b){e+="<div>"+b.substring(2,b.length-1)+"</div>"}),c.html(e),d.show()):(c.html(e),d.hide())}function show_form_for_tool(a,b){if($(".right-content").hide(),$("#right-content").show().html(a),b&&$("#right-content").find(".toolForm:first").after("<p><div class='metadataForm'>             <div class='metadataFormTitle'>Edit Step Attributes</div>             <div class='form-row'>             <label>Annotation / Notes:</label>                     <div style='margin-right: 10px;'>                     <textarea name='annotation' rows='3' style='width: 100%'>"+b.annotation+"</textarea>                         <div class='toolParamHelp'>Add an annotation or notes to this step; annotations are available when a workflow is viewed.</div>                     </div>             </div>             </div>"),b&&"tool"==b.type){pjastr="<p><div class='metadataForm'><div class='metadataFormTitle'>Edit Step Actions</div><div class='form-row'>             "+display_pja_list()+" <br/> "+display_file_list(b)+" <div class='action-button' style='border:1px solid black;display:inline;' id='add_pja'>Create</div>            </div><div class='form-row'>            <div style='margin-right: 10px;'><span id='pja_container'></span>",pjastr+="<div class='toolParamHelp'>Add actions to this step; actions are applied when this workflow step completes.</div></div></div></div>",$("#right-content").find(".toolForm").after(pjastr);for(var c in b.post_job_actions)"undefined"!=c&&display_pja(b.post_job_actions[c],b);$("#add_pja").click(function(){new_pja($("#new_pja_list").val(),$("#node_data_list").val(),b)})}$("#right-content").find("form").ajaxForm({type:"POST",dataType:"json",success:function(a){workflow.active_form_has_changes=!1,b.update_field_data(a),show_workflow_parameters()},beforeSubmit:function(a){a.push({name:"tool_state",value:b.tool_state}),a.push({name:"_",value:"true"})}}).each(function(){var a=this;$(this).find("select[refresh_on_change='true']").change(function(){$(a).submit()}),$(this).find("input[refresh_on_change='true']").change(function(){$(a).submit()}),$(this).find(".popupmenu").each(function(){var b=$(this).parents("div.form-row").attr("id"),c=$('<a class="popup-arrow" id="popup-arrow-for-'+b+'">&#9660;</a>'),d={};$(this).find("button").each(function(){var b=$(this).attr("name"),c=$(this).attr("value");d[$(this).text()]=function(){$(a).append("<input type='hidden' name='"+b+"' value='"+c+"' />").submit()}}),c.insertAfter(this),$(this).remove(),make_popupmenu(c,d)}),$(this).find("input,textarea,select").each(function(){$(this).bind("focus click",function(){workflow.active_form_has_changes=!0})})})}$(function(){function a(){workflow.layout(),workflow.fit_canvas_to_nodes(),scroll_to_nodes(),canvas_manager.draw_overview()}function b(){workflow.clear_active_node(),$(".right-content").hide(),$("#edit-attributes").show()}function c(){$.jStorage.set("overview-off",!1),$("#overview-border").css("right","0px"),$("#close-viewport").css("background-position","0px 0px")}function d(){$.jStorage.set("overview-off",!0),$("#overview-border").css("right","20000px"),$("#close-viewport").css("background-position","12px 0px")}if(window.lt_ie_7)return void show_modal("Browser not supported","Sorry, the workflow editor is not supported for IE6 and below.");$("#tool-search-query").click(function(){$(this).focus(),$(this).select()}).keyup(function(){if($(this).css("font-style","normal"),this.value.length<3)reset_tool_search(!1);else if(this.value!=this.lastValue){$(this).addClass("search_active");var a=this.value;this.timer&&clearTimeout(this.timer),$("#search-spinner").show();var b=galaxy_config.root+"api/tools";this.timer=setTimeout(function(){$.get(b,{q:a},function(a){if($("#search-no-results").hide(),$(".toolSectionWrapper").hide(),$(".toolSectionWrapper").find(".toolTitle").hide(),0!=a.length){var b=$.map(a,function(a){return"link-"+a});$(b).each(function(a,b){$("[id='"+b+"']").parent().addClass("search_match"),$("[id='"+b+"']").parent().show().parent().parent().show().parent().show()}),$(".toolPanelLabel").each(function(){for(var a=$(this),b=a.next(),c=!0;0!==b.length&&b.hasClass("toolTitle");){if(b.is(":visible")){c=!1;break}b=b.next()}c&&a.hide()})}else $("#search-no-results").show();$("#search-spinner").hide()},"json")},400)}this.lastValue=this.value}),canvas_manager=new CanvasManager($("#canvas-viewport"),$("#overview")),reset(),$.ajax({url:get_datatypes_url,dataType:"json",cache:!1,success:function(a){populate_datatype_info(a),$.ajax({url:load_workflow_url,data:{id:workflow_id,_:"true"},dataType:"json",cache:!1,success:function(a){reset(),workflow.from_simple(a),workflow.has_changes=!1,workflow.fit_canvas_to_nodes(),scroll_to_nodes(),canvas_manager.draw_overview(),upgrade_message="",$.each(a.upgrade_messages,function(a,b){upgrade_message+="<li>Step "+(parseInt(a,10)+1)+": "+workflow.nodes[a].name+"<ul>",$.each(b,function(a,b){upgrade_message+="<li>"+b+"</li>"}),upgrade_message+="</ul></li>"}),upgrade_message?show_modal("Workflow loaded with changes","Problems were encountered loading this workflow (possibly a result of tool upgrades). Please review the following parameters and then save.<ul>"+upgrade_message+"</ul>",{Continue:hide_modal}):hide_modal(),show_workflow_parameters()},beforeSubmit:function(){show_message("Loading workflow","progress")}})}}),$(document).ajaxStart(function(){active_ajax_call=!0,$(document).bind("ajaxStop.global",function(){active_ajax_call=!1})}),$(document).ajaxError(function(a,b){var c=b.responseText||b.statusText||"Could not connect to server";return show_modal("Server error",c,{"Ignore error":hide_modal}),!1}),make_popupmenu($("#workflow-options-button"),{Save:save_current_workflow,Run:function(){window.location=run_workflow_url},"Edit Attributes":b,"Auto Re-layout":a,Close:close_editor}),overview_size=$.jStorage.get("overview-size"),void 0!==overview_size&&$("#overview-border").css({width:overview_size,height:overview_size}),$.jStorage.get("overview-off")?d():c(),$("#overview-border").bind("dragend",function(a,b){var c=$(this).offsetParent(),d=c.offset(),e=Math.max(c.width()-(b.offsetX-d.left),c.height()-(b.offsetY-d.top));$.jStorage.set("overview-size",e+"px")}),$("#close-viewport").click(function(){"0px"===$("#overview-border").css("right")?d():c()}),window.onbeforeunload=function(){return workflow&&workflow.has_changes?"There are unsaved changes to your workflow which will be lost.":void 0},$("div.toolSectionBody").hide(),$("div.toolSectionTitle > span").wrap("<a href='#'></a>");var e=null;$("div.toolSectionTitle").each(function(){var a=$(this).next("div.toolSectionBody");$(this).click(function(){a.is(":hidden")?(e&&e.slideUp("fast"),e=a,a.slideDown("fast")):(a.slideUp("fast"),e=null)})}),async_save_text("workflow-name","workflow-name",rename_async_url,"new_name"),$("#workflow-tag").click(function(){return $(".tag-area").click(),!1}),async_save_text("workflow-annotation","workflow-annotation",annotate_async_url,"new_annotation",25,!0,4)});var close_editor=function(){workflow.check_changes_in_active_form(),workflow&&workflow.has_changes?(do_close=function(){window.onbeforeunload=void 0,window.document.location=workflow_index_url},show_modal("Close workflow editor","There are unsaved changes to your workflow which will be lost.",{Cancel:hide_modal,"Save Changes":function(){save_current_workflow(null,do_close)}},{"Don't Save":do_close})):window.document.location=workflow_index_url},save_current_workflow=function(a,b){if(show_message("Saving workflow","progress"),workflow.check_changes_in_active_form(),!workflow.has_changes)return hide_modal(),void(b&&b());workflow.rectify_workflow_outputs();var c=function(a){$.ajax({url:save_workflow_url,type:"POST",data:{id:workflow_id,workflow_data:function(){return JSON.stringify(workflow.to_simple())},_:"true"},dataType:"json",success:function(b){var c=$("<div></div>").text(b.message);if(b.errors){c.addClass("warningmark");var d=$("<ul/>");$.each(b.errors,function(a,b){$("<li></li>").text(b).appendTo(d)}),c.append(d)}else c.addClass("donemark");workflow.name=b.name,workflow.has_changes=!1,workflow.stored=!0,show_workflow_parameters(),b.errors?show_modal("Saving workflow",c,{Ok:hide_modal}):(a&&a(),hide_modal())}})};active_ajax_call?$(document).bind("ajaxStop.save_workflow",function(){$(document).unbind("ajaxStop.save_workflow"),c(),$(document).unbind("ajaxStop.save_workflow"),active_ajax_call=!1}):c(b)};
//# sourceMappingURL=../maps/galaxy.workflows.js.map