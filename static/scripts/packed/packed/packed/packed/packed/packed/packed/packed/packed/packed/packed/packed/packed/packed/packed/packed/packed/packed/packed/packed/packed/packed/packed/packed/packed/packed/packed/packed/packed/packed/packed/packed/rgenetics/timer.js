function Timer(){return this.obj=arguments.length?arguments[0]:window,this}Timer.prototype.setInterval=function(a,b){var c=Timer.getNew(),d=Timer.buildCall(this.obj,c,arguments);return Timer.set[c].timer=window.setInterval(d,b),c},Timer.prototype.setTimeout=function(a,b){var c=Timer.getNew();return Timer.buildCall(this.obj,c,arguments),Timer.set[c].timer=window.setTimeout("Timer.callOnce("+c+");",b),c},Timer.prototype.clearInterval=function(a){Timer.set[a]&&(window.clearInterval(Timer.set[a].timer),Timer.set[a]=null)},Timer.prototype.clearTimeout=function(a){Timer.set[a]&&(window.clearTimeout(Timer.set[a].timer),Timer.set[a]=null)},Timer.set=new Array,Timer.buildCall=function(a,b,c){var d="";if(Timer.set[b]=new Array,a!=window&&(Timer.set[b].obj=a,d="Timer.set["+b+"].obj."),d+=c[0]+"(",c.length>2){Timer.set[b][0]=c[2],d+="Timer.set["+b+"][0]";for(var e=1;e+2<c.length;e++)Timer.set[b][e]=c[e+2],d+=", Timer.set["+b+"]["+e+"]"}return d+=");",Timer.set[b].call=d,d},Timer.callOnce=function(i){Timer.set[i]&&(eval(Timer.set[i].call),Timer.set[i]=null)},Timer.getNew=function(){for(var a=0;Timer.set[a];)a++;return a};
//# sourceMappingURL=../../maps/rgenetics/timer.js.map