!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){function b(a){if(a.disabled&&"array"!==jQuery.type(a.disabled))throw new Error('"disabled" must be defined as an array of indeces: '+JSON.stringify(a));if(a.multiselect&&a.selected&&"array"!==jQuery.type(a.selected))throw new Error('Mulitselect rows need an array for "selected": '+JSON.stringify(a));if(!a.label||!a.id)throw new Error("Peek controls need a label and id for each control row: "+JSON.stringify(a));if(a.disabled&&-1!==a.disabled.indexOf(a.selected))throw new Error("Selected column is in the list of disabled columns: "+JSON.stringify(a));return a}function c(b){return a("<div/>").addClass(s).text(b.label)}function d(b,d){var e=a("<td/>").html(c(b,d)).attr("data-"+u,d);return b.disabled&&-1!==b.disabled.indexOf(d)&&e.addClass(r),e}function e(a,b){var c=a.children("."+s);c.html(a.hasClass(q)?void 0!==b.selectedText?b.selectedText:b.label:void 0!==b.unselectedText?b.unselectedText:b.label)}function f(b,c){var f=d(b,c);return b.selected===c&&f.addClass(q),e(f,b,c),f.hasClass(r)||f.click(function(){var d=a(this);if(!d.hasClass(q)){var f=d.parent().children("."+q).removeClass(q);f.each(function(){e(a(this),b,c)}),d.addClass(q),e(d,b,c);var g={},h=d.parent().attr("id"),i=d.data(u);g[h]=i,d.parents(".peek").trigger(m,g)}}),f}function g(b,c){var f=d(b,c);return b.selected&&-1!==b.selected.indexOf(c)&&f.addClass(q),e(f,b,c),f.hasClass(r)||f.click(function(){var d=a(this);d.toggleClass(q),e(d,b,c);var f=d.parent().find("."+q).map(function(b,c){return a(c).data(u)}),g={},h=d.parent().attr("id"),i=jQuery.makeArray(f);g[h]=i,d.parents(".peek").trigger(m,g)}),f}function h(a,b){for(var c=[],d=0;a>d;d+=1)c.push(b.multiselect?g(b,d):f(b,d));return c}function i(b,c,d){var e=a("<tr/>").attr("id",c.id).addClass(o);if(d){var f=a("<td/>").addClass(p).text(c.label+":");e.append(f)}return e.append(h(b,c)),e}function j(c){c=jQuery.extend(!0,{},k,c);var d=a(this).addClass(l),e=d.find("table"),f=e.find("th").size(),g=e.find("tr").size(),h=e.find("td[colspan]").map(function(){var b=a(this);return b.text()&&b.text().match(new RegExp("^"+c.commentChar))?a(this).css("color","grey").parent().get(0):null});if(c.hideCommentRows&&(h.hide(),g-=h.size()),c.includePrompts){var j=a("<th/>").addClass("top-left").text(c.topLeftContent).attr("rowspan",g);e.find("tr").first().prepend(j)}var m=e.find("th:not(.top-left)").each(function(b){var d=a(this),e=d.text().replace(/^\d+\.*/,""),f=c.columnNames[b]||e;d.attr("data-"+v,f).text(b+1+(f?"."+f:""))});return c.renameColumns&&m.addClass(t).click(function(){var b=a(this),d=b.index()+(c.includePrompts?0:1),e=b.data(v),f=prompt("New column name:",e);if(null!==f&&f!==e){b.text(d+(f?"."+f:"")).data(v,f).attr("data-",v,f);var g=jQuery.makeArray(b.parent().children("th:not(.top-left)").map(function(){return a(this).data(v)}));b.parents(".peek").trigger(n,g)}}),c.controls.forEach(function(a){b(a);var d=i(f,a,c.includePrompts);e.find("tbody").append(d)}),this}var k={renameColumns:!1,columnNames:[],commentChar:"#",hideCommentRows:!1,includePrompts:!0,topLeftContent:"Columns:"},l="peek-column-selector",m="peek-column-selector.change",n="peek-column-selector.rename",o="control",p="control-prompt",q="selected",r="disabled",s="button",t="renamable-header",u="column-index",v="column-name";jQuery.fn.extend({peekColumnSelector:function(a){return this.map(function(){return j.call(this,a)})}})});
//# sourceMappingURL=../../maps/ui/peek-column-selector.js.map