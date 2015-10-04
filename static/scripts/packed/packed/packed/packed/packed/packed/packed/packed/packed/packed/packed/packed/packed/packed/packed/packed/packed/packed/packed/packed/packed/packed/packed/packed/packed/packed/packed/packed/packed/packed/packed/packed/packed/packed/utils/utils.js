define(["libs/underscore"],function(a){function b(a,c){for(var d in a){var e=a[d];e&&"object"==typeof e&&(c(e),b(e,c))}}function c(a){return/^[\],:{}\s]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))}function d(a){return $("<div/>").text(a).html()}function e(a){if(a instanceof Array||(a=[a]),0===a.length)return!1;for(var b in a)if(["__null__","__undefined__",null,void 0].indexOf(a[b])>-1)return!1;return!0}function f(a){var a=a.toString();if(a){a=a.replace(/,/g,", ");var b=a.lastIndexOf(", ");return-1!=b&&(a=a.substr(0,b)+" or "+a.substr(b+1)),a}return""}function g(a){top.__utils__get__=top.__utils__get__||{},a.cache&&top.__utils__get__[a.url]?(a.success&&a.success(top.__utils__get__[a.url]),console.debug("utils.js::get() - Fetching from cache ["+a.url+"].")):h({url:a.url,data:a.data,success:function(b){top.__utils__get__[a.url]=b,a.success&&a.success(b)},error:function(b){a.error&&a.error(b)}})}function h(a){var b={contentType:"application/json",type:a.type||"GET",data:a.data||{},url:a.url};"GET"==b.type||"DELETE"==b.type?(b.url+=-1==b.url.indexOf("?")?"?":"&",b.url=b.url+$.param(b.data,!0),b.data=null):(b.dataType="json",b.url=b.url,b.data=JSON.stringify(b.data)),$.ajax(b).done(function(b){if("string"==typeof b)try{b=b.replace("Infinity,",'"Infinity",'),b=jQuery.parseJSON(b)}catch(c){console.debug(c)}a.success&&a.success(b)}).fail(function(b){var c=null;try{c=jQuery.parseJSON(b.responseText)}catch(d){c=b.responseText}a.error&&a.error(c,b)})}function i(a,b){var c=$('<div class="'+a+'"></div>');c.appendTo(":eq(0)");var d=c.css(b);return c.remove(),d}function j(a){$('link[href^="'+a+'"]').length||$('<link href="'+galaxy_config.root+a+'" rel="stylesheet">').appendTo("head")}function k(b,c){return b?a.defaults(b,c):c}function l(a,b){var c="";if(a>=1e11)a/=1e11,c="TB";else if(a>=1e8)a/=1e8,c="GB";else if(a>=1e5)a/=1e5,c="MB";else if(a>=100)a/=100,c="KB";else{if(!(a>0))return"<strong>-</strong>";a=10*a,c="b"}var d=Math.round(a)/10;return b?d+" "+c:"<strong>"+d+"</strong> "+c}function m(){return top.__utils__uid__=top.__utils__uid__||0,"uid-"+top.__utils__uid__++}function n(){var a=new Date,b=(a.getHours()<10?"0":"")+a.getHours(),c=(a.getMinutes()<10?"0":"")+a.getMinutes(),d=a.getDate()+"/"+(a.getMonth()+1)+"/"+a.getFullYear()+", "+b+":"+c;return d}return{cssLoadFile:j,cssGetAttribute:i,get:g,merge:k,bytesToString:l,uid:m,time:n,request:h,sanitize:d,textify:f,validate:e,deepeach:b,isJSON:c}});
//# sourceMappingURL=../../maps/utils/utils.js.map