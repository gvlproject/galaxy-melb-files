define(["libs/toastr","mvc/library/library-model","mvc/ui/ui-select"],function(a,b,c){var d=Backbone.View.extend({el:"#center",model:null,options:{},events:{"click .toolbtn_modify_dataset":"enableModification","click .toolbtn_cancel_modifications":"render","click .toolbtn-download-dataset":"downloadDataset","click .toolbtn-import-dataset":"importIntoHistory","click .toolbtn-share-dataset":"shareDataset","click .btn-copy-link-to-clipboard":"copyToClipboard","click .btn-make-private":"makeDatasetPrivate","click .btn-remove-restrictions":"removeDatasetRestrictions","click .toolbtn_save_permissions":"savePermissions","click .toolbtn_save_modifications":"comingSoon"},initialize:function(a){this.options=_.extend(this.options,a),this.options.id&&this.fetchDataset()},fetchDataset:function(c){this.options=_.extend(this.options,c),this.model=new b.Item({id:this.options.id});var d=this;this.model.fetch({success:function(){d.options.show_permissions?d.showPermissions():d.options.show_version?d.fetchVersion():d.render()},error:function(b,c){"undefined"!=typeof c.responseJSON?a.error(c.responseJSON.err_msg+" Click this to go back.","",{onclick:function(){Galaxy.libraries.library_router.back()}}):a.error("An error ocurred. Click this to go back.","",{onclick:function(){Galaxy.libraries.library_router.back()}})}})},render:function(a){this.options=_.extend(this.options,a),$(".tooltip").remove();var b=this.templateDataset();this.$el.html(b({item:this.model})),$(".peek").html(this.model.get("peek")),$("#center [data-toggle]").tooltip()},fetchVersion:function(c){this.options=_.extend(this.options,c),that=this,this.options.ldda_id?(this.ldda=new b.Ldda({id:this.options.ldda_id}),this.ldda.url=this.ldda.urlRoot+this.model.id+"/versions/"+this.ldda.id,this.ldda.fetch({success:function(){that.renderVersion()},error:function(b,c){a.error("undefined"!=typeof c.responseJSON?c.responseJSON.err_msg:"An error ocurred.")}})):(this.render(),a.error("Library dataset version requested but no id provided."))},renderVersion:function(){$(".tooltip").remove();var a=this.templateVersion();this.$el.html(a({item:this.model,ldda:this.ldda})),$(".peek").html(this.ldda.get("peek"))},enableModification:function(){$(".tooltip").remove();var a=this.templateModifyDataset();this.$el.html(a({item:this.model})),$(".peek").html(this.model.get("peek")),$("#center [data-toggle]").tooltip()},downloadDataset:function(){var a=(window.galaxy_config?galaxy_config.root:"/")+"api/libraries/datasets/download/uncompressed",b={ld_ids:this.id};this.processDownload(a,b)},processDownload:function(b,c,d){if(b&&c){c="string"==typeof c?c:$.param(c);var e="";$.each(c.split("&"),function(){var a=this.split("=");e+='<input type="hidden" name="'+a[0]+'" value="'+a[1]+'" />'}),$('<form action="'+b+'" method="'+(d||"post")+'">'+e+"</form>").appendTo("body").submit().remove(),a.info("Your download will begin soon.")}},importIntoHistory:function(){this.refreshUserHistoriesList(function(a){var b=a.templateBulkImportInModal();a.modal=Galaxy.modal,a.modal.show({closing_events:!0,title:"Import into History",body:b({histories:a.histories.models}),buttons:{Import:function(){a.importCurrentIntoHistory()},Close:function(){Galaxy.modal.hide()}}})})},refreshUserHistoriesList:function(c){var d=this;this.histories=new b.GalaxyHistories,this.histories.fetch({success:function(b){0===b.length?a.warning("You have to create history first. Click this to do so.","",{onclick:function(){window.location="/"}}):c(d)},error:function(b,c){a.error("undefined"!=typeof c.responseJSON?c.responseJSON.err_msg:"An error ocurred.")}})},importCurrentIntoHistory:function(){var c=$(this.modal.elMain).find("select[name=dataset_import_single] option:selected").val(),d=new b.HistoryItem;d.url=d.urlRoot+c+"/contents",jQuery.getJSON(galaxy_config.root+"history/set_as_current?id="+c),d.save({content:this.id,source:"library"},{success:function(){Galaxy.modal.hide(),a.success("Dataset imported. Click this to start analysing it.","",{onclick:function(){window.location="/"}})},error:function(b,c){a.error("undefined"!=typeof c.responseJSON?"Dataset not imported. "+c.responseJSON.err_msg:"An error occured. Dataset not imported. Please try again.")}})},shareDataset:function(){a.info("Feature coming soon.")},goBack:function(){Galaxy.libraries.library_router.back()},showPermissions:function(b){this.options=_.extend(this.options,b),$(".tooltip").remove(),void 0!==this.options.fetched_permissions&&this.model.set(0===this.options.fetched_permissions.access_dataset_roles.length?{is_unrestricted:!0}:{is_unrestricted:!1});var c=!1;Galaxy.currUser&&(c=Galaxy.currUser.isAdmin());var d=this.templateDatasetPermissions();this.$el.html(d({item:this.model,is_admin:c}));var e=this;void 0===this.options.fetched_permissions?$.get((window.galaxy_config?galaxy_config.root:"/")+"api/libraries/datasets/"+e.id+"/permissions?scope=current").done(function(a){e.prepareSelectBoxes({fetched_permissions:a,is_admin:c})}).fail(function(){a.error("An error occurred while attempting to fetch dataset permissions.")}):this.prepareSelectBoxes({is_admin:c}),$("#center [data-toggle]").tooltip(),$("#center").css("overflow","auto")},prepareSelectBoxes:function(b){this.options=_.extend(this.options,b);for(var d=this.options.fetched_permissions,e=this.options.is_admin,f=this,g=[],h=0;h<d.access_dataset_roles.length;h++)g.push(d.access_dataset_roles[h]+":"+d.access_dataset_roles[h]);for(var i=[],h=0;h<d.modify_item_roles.length;h++)i.push(d.modify_item_roles[h]+":"+d.modify_item_roles[h]);for(var j=[],h=0;h<d.manage_dataset_roles.length;h++)j.push(d.manage_dataset_roles[h]+":"+d.manage_dataset_roles[h]);if(e){var k={minimumInputLength:0,css:"access_perm",multiple:!0,placeholder:"Click to select a role",container:f.$el.find("#access_perm"),ajax:{url:(window.galaxy_config?galaxy_config.root:"/")+"api/libraries/datasets/"+f.id+"/permissions?scope=available",dataType:"json",quietMillis:100,data:function(a,b){return{q:a,page_limit:10,page:b}},results:function(a,b){var c=10*b<a.total;return{results:a.roles,more:c}}},formatResult:function(a){return a.name+" type: "+a.type},formatSelection:function(a){return a.name},initSelection:function(a,b){var c=[];$(a.val().split(",")).each(function(){var a=this.split(":");c.push({id:a[1],name:a[1]})}),b(c)},initialData:g.join(","),dropdownCssClass:"bigdrop"},l={minimumInputLength:0,css:"modify_perm",multiple:!0,placeholder:"Click to select a role",container:f.$el.find("#modify_perm"),ajax:{url:(window.galaxy_config?galaxy_config.root:"/")+"api/libraries/datasets/"+f.id+"/permissions?scope=available",dataType:"json",quietMillis:100,data:function(a,b){return{q:a,page_limit:10,page:b}},results:function(a,b){var c=10*b<a.total;return{results:a.roles,more:c}}},formatResult:function(a){return a.name+" type: "+a.type},formatSelection:function(a){return a.name},initSelection:function(a,b){var c=[];$(a.val().split(",")).each(function(){var a=this.split(":");c.push({id:a[1],name:a[1]})}),b(c)},initialData:i.join(","),dropdownCssClass:"bigdrop"},m={minimumInputLength:0,css:"manage_perm",multiple:!0,placeholder:"Click to select a role",container:f.$el.find("#manage_perm"),ajax:{url:(window.galaxy_config?galaxy_config.root:"/")+"api/libraries/datasets/"+f.id+"/permissions?scope=available",dataType:"json",quietMillis:100,data:function(a,b){return{q:a,page_limit:10,page:b}},results:function(a,b){var c=10*b<a.total;return{results:a.roles,more:c}}},formatResult:function(a){return a.name+" type: "+a.type},formatSelection:function(a){return a.name},initSelection:function(a,b){var c=[];$(a.val().split(",")).each(function(){var a=this.split(":");c.push({id:a[1],name:a[1]})}),b(c)},initialData:j.join(","),dropdownCssClass:"bigdrop"};f.accessSelectObject=new c.View(k),f.modifySelectObject=new c.View(l),f.manageSelectObject=new c.View(m)}else{var n=f.templateAccessSelect();$.get((window.galaxy_config?galaxy_config.root:"/")+"api/libraries/datasets/"+f.id+"/permissions?scope=available",function(a){$(".access_perm").html(n({options:a.roles})),f.accessSelectObject=$("#access_select").select2()}).fail(function(){a.error("An error occurred while attempting to fetch dataset permissions.")})}},comingSoon:function(){a.warning("Feature coming soon.")},copyToClipboard:function(){var a=Backbone.history.location.href;-1!==a.lastIndexOf("/permissions")&&(a=a.substr(0,a.lastIndexOf("/permissions"))),window.prompt("Copy to clipboard: Ctrl+C, Enter",a)},makeDatasetPrivate:function(){var b=this;$.post((window.galaxy_config?galaxy_config.root:"/")+"api/libraries/datasets/"+b.id+"/permissions?action=make_private").done(function(c){b.model.set({is_unrestricted:!1}),b.showPermissions({fetched_permissions:c}),a.success("The dataset is now private to you.")}).fail(function(){a.error("An error occurred while attempting to make dataset private.")})},removeDatasetRestrictions:function(){var b=this;$.post((window.galaxy_config?galaxy_config.root:"/")+"api/libraries/datasets/"+b.id+"/permissions?action=remove_restrictions").done(function(c){b.model.set({is_unrestricted:!0}),b.showPermissions({fetched_permissions:c}),a.success("Access to this dataset is now unrestricted.")}).fail(function(){a.error("An error occurred while attempting to make dataset unrestricted.")})},savePermissions:function(){for(var b=this,c=this.accessSelectObject.$el.select2("data"),d=this.manageSelectObject.$el.select2("data"),e=this.modifySelectObject.$el.select2("data"),f=[],g=[],h=[],i=c.length-1;i>=0;i--)f.push(c[i].id);for(var i=d.length-1;i>=0;i--)g.push(d[i].id);for(var i=e.length-1;i>=0;i--)h.push(e[i].id);$.post((window.galaxy_config?galaxy_config.root:"/")+"api/libraries/datasets/"+b.id+"/permissions?action=set_permissions",{"access_ids[]":f,"manage_ids[]":g,"modify_ids[]":h}).done(function(c){b.showPermissions({fetched_permissions:c}),a.success("Permissions saved.")}).fail(function(){a.error("An error occurred while attempting to set dataset permissions.")})},templateDataset:function(){var a=[];return a.push('<div class="library_style_container">'),a.push('  <div id="library_toolbar">'),a.push('   <button data-toggle="tooltip" data-placement="top" title="Download dataset" class="btn btn-default toolbtn-download-dataset primary-button" type="button"><span class="fa fa-download"></span> Download</span></button>'),a.push('   <button data-toggle="tooltip" data-placement="top" title="Import dataset into history" class="btn btn-default toolbtn-import-dataset primary-button" type="button"><span class="fa fa-book"></span> to History</span></button>'),a.push('   <% if (item.get("can_user_modify")) { %>'),a.push('   <button data-toggle="tooltip" data-placement="top" title="Modify library item" class="btn btn-default toolbtn_modify_dataset primary-button" type="button"><span class="fa fa-pencil"></span> Modify</span></button>'),a.push("   <% } %>"),a.push('   <% if (item.get("can_user_manage")) { %>'),a.push('   <a href="#folders/<%- item.get("folder_id") %>/datasets/<%- item.id %>/permissions"><button data-toggle="tooltip" data-placement="top" title="Manage permissions" class="btn btn-default toolbtn_change_permissions primary-button" type="button"><span class="fa fa-group"></span> Permissions</span></button></a>'),a.push("   <% } %>"),a.push("  </div>"),a.push('<ol class="breadcrumb">'),a.push('   <li><a title="Return to the list of libraries" href="#">Libraries</a></li>'),a.push('   <% _.each(item.get("full_path"), function(path_item) { %>'),a.push("   <% if (path_item[0] != item.id) { %>"),a.push('   <li><a title="Return to this folder" href="#/folders/<%- path_item[0] %>"><%- path_item[1] %></a> </li> '),a.push("<% } else { %>"),a.push('   <li class="active"><span title="You are here"><%- path_item[1] %></span></li>'),a.push("   <% } %>"),a.push("   <% }); %>"),a.push("</ol>"),a.push('<% if (item.get("is_unrestricted")) { %>'),a.push('  <div class="alert alert-info">'),a.push("  This dataset is unrestricted so everybody can access it. Just share the URL of this page. "),a.push('  <button data-toggle="tooltip" data-placement="top" title="Copy to clipboard" class="btn btn-default btn-copy-link-to-clipboard primary-button" type="button"><span class="fa fa-clipboard"></span> To Clipboard</span></button> '),a.push("  </div>"),a.push("<% } %>"),a.push('<div class="dataset_table">'),a.push('   <table class="grid table table-striped table-condensed">'),a.push("       <tr>"),a.push('           <th scope="row" id="id_row" data-id="<%= _.escape(item.get("ldda_id")) %>">Name</th>'),a.push('           <td><%= _.escape(item.get("name")) %></td>'),a.push("       </tr>"),a.push('   <% if (item.get("file_ext")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Data type</th>'),a.push('           <td><%= _.escape(item.get("file_ext")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (item.get("genome_build")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Genome build</th>'),a.push('           <td><%= _.escape(item.get("genome_build")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (item.get("file_size")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Size</th>'),a.push('           <td><%= _.escape(item.get("file_size")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (item.get("date_uploaded")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Date uploaded (UTC)</th>'),a.push('           <td><%= _.escape(item.get("date_uploaded")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (item.get("uploaded_by")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Uploaded by</th>'),a.push('           <td><%= _.escape(item.get("uploaded_by")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (item.get("metadata_data_lines")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Data Lines</th>'),a.push('           <td scope="row"><%= _.escape(item.get("metadata_data_lines")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (item.get("metadata_comment_lines")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Comment Lines</th>'),a.push('           <td scope="row"><%= _.escape(item.get("metadata_comment_lines")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (item.get("metadata_columns")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Number of Columns</th>'),a.push('           <td scope="row"><%= _.escape(item.get("metadata_columns")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (item.get("metadata_column_types")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Column Types</th>'),a.push('           <td scope="row"><%= _.escape(item.get("metadata_column_types")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (item.get("message")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Message</th>'),a.push('           <td scope="row"><%= _.escape(item.get("message")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (item.get("misc_blurb")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Miscellaneous blurb</th>'),a.push('           <td scope="row"><%= _.escape(item.get("misc_blurb")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (item.get("misc_info")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Miscellaneous information</th>'),a.push('           <td scope="row"><%= _.escape(item.get("misc_info")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push("    </table>"),a.push("    <div>"),a.push('        <pre class="peek">'),a.push("        </pre>"),a.push("    </div>"),a.push('   <% if (item.get("has_versions")) { %>'),a.push("      <div>"),a.push("      <h3>Expired versions:</h3>"),a.push("      <ul>"),a.push('      <% _.each(item.get("expired_versions"), function(version) { %>'),a.push('        <li><a title="See details of this version" href="#folders/<%- item.get("folder_id") %>/datasets/<%- item.id %>/versions/<%- version[0] %>"><%- version[1] %></a></li>'),a.push("      <% }) %>"),a.push("      <ul>"),a.push("      </div>"),a.push("   <% } %>"),a.push("</div>"),a.push("</div>"),_.template(a.join(""))},templateVersion:function(){var a=[];return a.push('<div class="library_style_container">'),a.push('  <div id="library_toolbar">'),a.push('   <a href="#folders/<%- item.get("folder_id") %>/datasets/<%- item.id %>"><button data-toggle="tooltip" data-placement="top" title="Go to latest dataset" class="btn btn-default primary-button" type="button"><span class="fa fa-caret-left fa-lg"></span> Latest dataset</span></button><a>'),a.push("  </div>"),a.push('<ol class="breadcrumb">'),a.push('   <li><a title="Return to the list of libraries" href="#">Libraries</a></li>'),a.push('   <% _.each(item.get("full_path"), function(path_item) { %>'),a.push("   <% if (path_item[0] != item.id) { %>"),a.push('   <li><a title="Return to this folder" href="#/folders/<%- path_item[0] %>"><%- path_item[1] %></a> </li> '),a.push("<% } else { %>"),a.push('   <li class="active"><span title="You are here"><%- path_item[1] %></span></li>'),a.push("   <% } %>"),a.push("   <% }); %>"),a.push("</ol>"),a.push('  <div class="alert alert-warning">This is an expired version of the library dataset: <%= _.escape(item.get("name")) %></div>'),a.push('<div class="dataset_table">'),a.push('   <table class="grid table table-striped table-condensed">'),a.push("       <tr>"),a.push('           <th scope="row" id="id_row" data-id="<%= _.escape(ldda.id) %>">Name</th>'),a.push('           <td><%= _.escape(ldda.get("name")) %></td>'),a.push("       </tr>"),a.push('   <% if (ldda.get("file_ext")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Data type</th>'),a.push('           <td><%= _.escape(ldda.get("file_ext")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (ldda.get("genome_build")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Genome build</th>'),a.push('           <td><%= _.escape(ldda.get("genome_build")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (ldda.get("file_size")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Size</th>'),a.push('           <td><%= _.escape(ldda.get("file_size")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (ldda.get("date_uploaded")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Date uploaded (UTC)</th>'),a.push('           <td><%= _.escape(ldda.get("date_uploaded")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (ldda.get("uploaded_by")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Uploaded by</th>'),a.push('           <td><%= _.escape(ldda.get("uploaded_by")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (ldda.get("metadata_data_lines")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Data Lines</th>'),a.push('           <td scope="row"><%= _.escape(ldda.get("metadata_data_lines")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (ldda.get("metadata_comment_lines")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Comment Lines</th>'),a.push('           <td scope="row"><%= _.escape(ldda.get("metadata_comment_lines")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (ldda.get("metadata_columns")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Number of Columns</th>'),a.push('           <td scope="row"><%= _.escape(ldda.get("metadata_columns")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (ldda.get("metadata_column_types")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Column Types</th>'),a.push('           <td scope="row"><%= _.escape(ldda.get("metadata_column_types")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (ldda.get("message")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Message</th>'),a.push('           <td scope="row"><%= _.escape(ldda.get("message")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (ldda.get("misc_blurb")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Miscellaneous blurb</th>'),a.push('           <td scope="row"><%= _.escape(ldda.get("misc_blurb")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (ldda.get("misc_info")) { %>'),a.push("       <tr>"),a.push('           <th scope="row">Miscellaneous information</th>'),a.push('           <td scope="row"><%= _.escape(ldda.get("misc_info")) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push("    </table>"),a.push("    <div>"),a.push('        <pre class="peek">'),a.push("        </pre>"),a.push("    </div>"),a.push("</div>"),a.push("</div>"),_.template(a.join(""))},templateModifyDataset:function(){var a=[];return a.push('<div class="library_style_container">'),a.push('  <div id="library_toolbar">'),a.push('   <button data-toggle="tooltip" data-placement="top" title="Cancel modifications" class="btn btn-default toolbtn_cancel_modifications primary-button" type="button"><span class="fa fa-times"></span> Cancel</span></button>'),a.push('   <button data-toggle="tooltip" data-placement="top" title="Save modifications" class="btn btn-default toolbtn_save_modifications primary-button" type="button"><span class="fa fa-floppy-o"></span> Save</span></button>'),a.push("  </div>"),a.push('<ol class="breadcrumb">'),a.push('   <li><a title="Return to the list of libraries" href="#">Libraries</a></li>'),a.push('   <% _.each(item.get("full_path"), function(path_item) { %>'),a.push("   <% if (path_item[0] != item.id) { %>"),a.push('   <li><a title="Return to this folder" href="#/folders/<%- path_item[0] %>"><%- path_item[1] %></a> </li> '),a.push("<% } else { %>"),a.push('   <li class="active"><span title="You are here"><%- path_item[1] %></span></li>'),a.push("   <% } %>"),a.push("   <% }); %>"),a.push("</ol>"),a.push('<div class="dataset_table">'),a.push('<p>For more editing options please import the dataset to history and use "Edit attributes" on it.</p>'),a.push('   <table class="grid table table-striped table-condensed">'),a.push("       <tr>"),a.push('           <th scope="row" id="id_row" data-id="<%= _.escape(item.get("ldda_id")) %>">Name</th>'),a.push('           <td><input class="input_dataset_name form-control" type="text" placeholder="name" value="<%= _.escape(item.get("name")) %>"></td>'),a.push("       </tr>"),a.push("       <tr>"),a.push('           <th scope="row">Data type</th>'),a.push('           <td><%= _.escape(item.get("file_ext")) %></td>'),a.push("       </tr>"),a.push("       <tr>"),a.push('           <th scope="row">Genome build</th>'),a.push('           <td><%= _.escape(item.get("genome_build")) %></td>'),a.push("       </tr>"),a.push("       <tr>"),a.push('           <th scope="row">Size</th>'),a.push('           <td><%= _.escape(item.get("file_size")) %></td>'),a.push("       </tr>"),a.push("       <tr>"),a.push('           <th scope="row">Date uploaded (UTC)</th>'),a.push('           <td><%= _.escape(item.get("date_uploaded")) %></td>'),a.push("       </tr>"),a.push("       <tr>"),a.push('           <th scope="row">Uploaded by</th>'),a.push('           <td><%= _.escape(item.get("uploaded_by")) %></td>'),a.push("       </tr>"),a.push('           <tr scope="row">'),a.push('           <th scope="row">Data Lines</th>'),a.push('           <td scope="row"><%= _.escape(item.get("metadata_data_lines")) %></td>'),a.push("       </tr>"),a.push('       <th scope="row">Comment Lines</th>'),a.push('           <% if (item.get("metadata_comment_lines") === "") { %>'),a.push('               <td scope="row"><%= _.escape(item.get("metadata_comment_lines")) %></td>'),a.push("           <% } else { %>"),a.push('               <td scope="row">unknown</td>'),a.push("           <% } %>"),a.push("       </tr>"),a.push("       <tr>"),a.push('           <th scope="row">Number of Columns</th>'),a.push('           <td scope="row"><%= _.escape(item.get("metadata_columns")) %></td>'),a.push("       </tr>"),a.push("       <tr>"),a.push('           <th scope="row">Column Types</th>'),a.push('           <td scope="row"><%= _.escape(item.get("metadata_column_types")) %></td>'),a.push("       </tr>"),a.push("       <tr>"),a.push('           <th scope="row">Message</th>'),a.push('           <td scope="row"><%= _.escape(item.get("message")) %></td>'),a.push("       </tr>"),a.push("       <tr>"),a.push('           <th scope="row">Miscellaneous information</th>'),a.push('           <td scope="row"><%= _.escape(item.get("misc_info")) %></td>'),a.push("       </tr>"),a.push("       <tr>"),a.push('           <th scope="row">Miscellaneous blurb</th>'),a.push('           <td scope="row"><%= _.escape(item.get("misc_blurb")) %></td>'),a.push("       </tr>"),a.push("   </table>"),a.push("<div>"),a.push('   <pre class="peek">'),a.push("   </pre>"),a.push("</div>"),a.push("</div>"),a.push("</div>"),_.template(a.join(""))},templateDatasetPermissions:function(){var a=[];return a.push('<div class="library_style_container">'),a.push('  <div id="library_toolbar">'),a.push('   <a href="#folders/<%- item.get("folder_id") %>"><button data-toggle="tooltip" data-placement="top" title="Go back to containing folder" class="btn btn-default primary-button" type="button"><span class="fa fa-folder-open-o"></span> Containing Folder</span></button></a>'),a.push('   <a href="#folders/<%- item.get("folder_id") %>/datasets/<%- item.id %>"><button data-toggle="tooltip" data-placement="top" title="Go back to dataset" class="btn btn-default primary-button" type="button"><span class="fa fa-file-o"></span> Dataset Details</span></button><a>'),a.push("  </div>"),a.push('<ol class="breadcrumb">'),a.push('   <li><a title="Return to the list of libraries" href="#">Libraries</a></li>'),a.push('   <% _.each(item.get("full_path"), function(path_item) { %>'),a.push("   <% if (path_item[0] != item.id) { %>"),a.push('   <li><a title="Return to this folder" href="#/folders/<%- path_item[0] %>"><%- path_item[1] %></a> </li> '),a.push("<% } else { %>"),a.push('   <li class="active"><span title="You are here"><%- path_item[1] %></span></li>'),a.push("   <% } %>"),a.push("   <% }); %>"),a.push("</ol>"),a.push('<h1>Dataset: <%= _.escape(item.get("name")) %></h1>'),a.push('<div class="alert alert-warning">'),a.push("<% if (is_admin) { %>"),a.push("You are logged in as an <strong>administrator</strong> therefore you can manage any dataset on this Galaxy instance. Please make sure you understand the consequences."),a.push("<% } else { %>"),a.push("You can assign any number of roles to any of the following permission types. However please read carefully the implications of such actions."),a.push("<% } %>"),a.push("</div>"),a.push('<div class="dataset_table">'),a.push("<h2>Library-related permissions</h2>"),a.push("<h4>Roles that can modify the library item</h4>"),a.push('<div id="modify_perm" class="modify_perm roles-selection"></div>'),a.push('<div class="alert alert-info roles-selection">User with <strong>any</strong> of these roles can modify name, metadata, and other information about this library item.</div>'),a.push("<hr/>"),a.push("<h2>Dataset-related permissions</h2>"),a.push('<div class="alert alert-warning">Changes made below will affect <strong>every</strong> library item that was created from this dataset and also every history this dataset is part of.</div>'),a.push('<% if (!item.get("is_unrestricted")) { %>'),a.push(" <p>You can remove all access restrictions on this dataset. "),a.push(' <button data-toggle="tooltip" data-placement="top" title="Everybody will be able to access the dataset." class="btn btn-default btn-remove-restrictions primary-button" type="button">'),a.push(' <span class="fa fa-globe"> Remove restrictions</span>'),a.push(" </button>"),a.push(" </p>"),a.push("<% } else { %>"),a.push("  This dataset is unrestricted so everybody can access it. Just share the URL of this page."),a.push('  <button data-toggle="tooltip" data-placement="top" title="Copy to clipboard" class="btn btn-default btn-copy-link-to-clipboard primary-button" type="button"><span class="fa fa-clipboard"> To Clipboard</span></button> '),a.push("  <p>You can make this dataset private to you. "),a.push(' <button data-toggle="tooltip" data-placement="top" title="Only you will be able to access the dataset." class="btn btn-default btn-make-private primary-button" type="button"><span class="fa fa-key"> Make Private</span></button>'),a.push(" </p>"),a.push("<% } %>"),a.push("<h4>Roles that can access the dataset</h4>"),a.push('<div id="access_perm" class="access_perm roles-selection"></div>'),a.push('<div class="alert alert-info roles-selection">User has to have <strong>all these roles</strong> in order to access this dataset. Users without access permission <strong>cannot</strong> have other permissions on this dataset. If there are no access roles set on the dataset it is considered <strong>unrestricted</strong>.</div>'),a.push("<h4>Roles that can manage permissions on the dataset</h4>"),a.push('<div id="manage_perm" class="manage_perm roles-selection"></div>'),a.push('<div class="alert alert-info roles-selection">User with <strong>any</strong> of these roles can manage permissions of this dataset. If you remove yourself you will loose the ability manage this dataset unless you are an admin.</div>'),a.push('<button data-toggle="tooltip" data-placement="top" title="Save modifications made on this page" class="btn btn-default toolbtn_save_permissions primary-button" type="button"><span class="fa fa-floppy-o"></span> Save</span></button>'),a.push("</div>"),a.push("</div>"),_.template(a.join(""))},templateBulkImportInModal:function(){var a=[];return a.push('<span id="history_modal_combo_bulk" style="width:90%; margin-left: 1em; margin-right: 1em; ">'),a.push("Select history: "),a.push('<select id="dataset_import_single" name="dataset_import_single" style="width:50%; margin-bottom: 1em; "> '),a.push("   <% _.each(histories, function(history) { %>"),a.push('       <option value="<%= _.escape(history.get("id")) %>"><%= _.escape(history.get("name")) %></option>'),a.push("   <% }); %>"),a.push("</select>"),a.push("</span>"),_.template(a.join(""))},templateAccessSelect:function(){var a=[];return a.push('<select id="access_select" multiple>'),a.push("   <% _.each(options, function(option) { %>"),a.push('       <option value="<%- option.name %>"><%- option.name %></option>'),a.push("   <% }); %>"),a.push("</select>"),_.template(a.join(""))}});return{LibraryDatasetView:d}});
//# sourceMappingURL=../../../maps/mvc/library/library-dataset-view.js.map