document.createElement("canvas").getContext||!function(){function a(){return this.context_||(this.context_=new u(this))}function b(a,b){var c=O.call(arguments,2);return function(){return a.apply(b,c.concat(O.call(arguments)))}}function c(a){return String(a).replace(/&/g,"&amp;").replace(/"/g,"&quot;")}function d(a,b,c){a.namespaces[b]||a.namespaces.add(b,c,"#default#VML")}function e(a){if(d(a,"g_vml_","urn:schemas-microsoft-com:vml"),d(a,"g_o_","urn:schemas-microsoft-com:office:office"),!a.styleSheets.ex_canvas_){var b=a.createStyleSheet();b.owningElement.id="ex_canvas_",b.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}"}}function f(a){var b=a.srcElement;switch(a.propertyName){case"width":b.getContext().clearRect(),b.style.width=b.attributes.width.nodeValue+"px",b.firstChild.style.width=b.clientWidth+"px";break;case"height":b.getContext().clearRect(),b.style.height=b.attributes.height.nodeValue+"px",b.firstChild.style.height=b.clientHeight+"px"}}function g(a){var b=a.srcElement;b.firstChild&&(b.firstChild.style.width=b.clientWidth+"px",b.firstChild.style.height=b.clientHeight+"px")}function h(){return[[1,0,0],[0,1,0],[0,0,1]]}function i(a,b){for(var c=h(),d=0;3>d;d++)for(var e=0;3>e;e++){for(var f=0,g=0;3>g;g++)f+=a[d][g]*b[g][e];c[d][e]=f}return c}function j(a,b){b.fillStyle=a.fillStyle,b.lineCap=a.lineCap,b.lineJoin=a.lineJoin,b.lineWidth=a.lineWidth,b.miterLimit=a.miterLimit,b.shadowBlur=a.shadowBlur,b.shadowColor=a.shadowColor,b.shadowOffsetX=a.shadowOffsetX,b.shadowOffsetY=a.shadowOffsetY,b.strokeStyle=a.strokeStyle,b.globalAlpha=a.globalAlpha,b.font=a.font,b.textAlign=a.textAlign,b.textBaseline=a.textBaseline,b.arcScaleX_=a.arcScaleX_,b.arcScaleY_=a.arcScaleY_,b.lineScale_=a.lineScale_}function k(a){var b=a.indexOf("(",3),c=a.indexOf(")",b+1),d=a.substring(b+1,c).split(",");return(4!=d.length||"a"!=a.charAt(3))&&(d[3]=1),d}function l(a){return parseFloat(a)/100}function m(a,b,c){return Math.min(c,Math.max(b,a))}function n(a){var b,c,d,e,f,g;if(e=parseFloat(a[0])/360%360,0>e&&e++,f=m(l(a[1]),0,1),g=m(l(a[2]),0,1),0==f)b=c=d=g;else{var h=.5>g?g*(1+f):g+f-g*f,i=2*g-h;b=o(i,h,e+1/3),c=o(i,h,e),d=o(i,h,e-1/3)}return"#"+Q[Math.floor(255*b)]+Q[Math.floor(255*c)]+Q[Math.floor(255*d)]}function o(a,b,c){return 0>c&&c++,c>1&&c--,1>6*c?a+6*(b-a)*c:1>2*c?b:2>3*c?a+(b-a)*(2/3-c)*6:a}function p(a){if(a in U)return U[a];var b,c=1;if(a=String(a),"#"==a.charAt(0))b=a;else if(/^rgb/.test(a)){for(var d,e=k(a),b="#",f=0;3>f;f++)d=-1!=e[f].indexOf("%")?Math.floor(255*l(e[f])):+e[f],b+=Q[m(d,0,255)];c=+e[3]}else if(/^hsl/.test(a)){var e=k(a);b=n(e),c=e[3]}else b=T[a]||a;return U[a]={color:b,alpha:c}}function q(a){if(W[a])return W[a];var b=document.createElement("div"),c=b.style;try{c.font=a}catch(d){}return W[a]={style:c.fontStyle||V.style,variant:c.fontVariant||V.variant,weight:c.fontWeight||V.weight,size:c.fontSize||V.size,family:c.fontFamily||V.family}}function r(a,b){var c={};for(var d in a)c[d]=a[d];var e=parseFloat(b.currentStyle.fontSize),f=parseFloat(a.size);return c.size="number"==typeof a.size?a.size:-1!=a.size.indexOf("px")?f:-1!=a.size.indexOf("em")?e*f:-1!=a.size.indexOf("%")?e/100*f:-1!=a.size.indexOf("pt")?f/.75:e,c.size*=.981,c}function s(a){return a.style+" "+a.variant+" "+a.weight+" "+a.size+"px "+a.family}function t(a){return X[a]||"square"}function u(a){this.m_=h(),this.mStack_=[],this.aStack_=[],this.currentPath_=[],this.strokeStyle="#000",this.fillStyle="#000",this.lineWidth=1,this.lineJoin="miter",this.lineCap="butt",this.miterLimit=1*M,this.globalAlpha=1,this.font="10px sans-serif",this.textAlign="left",this.textBaseline="alphabetic",this.canvas=a;var b="width:"+a.clientWidth+"px;height:"+a.clientHeight+"px;overflow:hidden;position:absolute",c=a.ownerDocument.createElement("div");c.style.cssText=b,a.appendChild(c);var d=c.cloneNode(!1);d.style.backgroundColor="red",d.style.filter="alpha(opacity=0)",a.appendChild(d),this.element_=c,this.arcScaleX_=1,this.arcScaleY_=1,this.lineScale_=1}function v(a,b,c,d){a.currentPath_.push({type:"bezierCurveTo",cp1x:b.x,cp1y:b.y,cp2x:c.x,cp2y:c.y,x:d.x,y:d.y}),a.currentX_=d.x,a.currentY_=d.y}function w(a,b){var c=p(a.strokeStyle),d=c.color,e=c.alpha*a.globalAlpha,f=a.lineScale_*a.lineWidth;1>f&&(e*=f),b.push("<g_vml_:stroke",' opacity="',e,'"',' joinstyle="',a.lineJoin,'"',' miterlimit="',a.miterLimit,'"',' endcap="',t(a.lineCap),'"',' weight="',f,'px"',' color="',d,'" />')}function x(a,b,c,d){var e=a.fillStyle,f=a.arcScaleX_,g=a.arcScaleY_,h=d.x-c.x,i=d.y-c.y;if(e instanceof B){var j=0,k={x:0,y:0},l=0,m=1;if("gradient"==e.type_){var n=e.x0_/f,o=e.y0_/g,q=e.x1_/f,r=e.y1_/g,s=y(a,n,o),t=y(a,q,r),u=t.x-s.x,v=t.y-s.y;j=180*Math.atan2(u,v)/Math.PI,0>j&&(j+=360),1e-6>j&&(j=0)}else{var s=y(a,e.x0_,e.y0_);k={x:(s.x-c.x)/h,y:(s.y-c.y)/i},h/=f*M,i/=g*M;var w=G.max(h,i);l=2*e.r0_/w,m=2*e.r1_/w-l}var x=e.colors_;x.sort(function(a,b){return a.offset-b.offset});for(var z=x.length,A=x[0].color,D=x[z-1].color,E=x[0].alpha*a.globalAlpha,F=x[z-1].alpha*a.globalAlpha,H=[],I=0;z>I;I++){var J=x[I];H.push(J.offset*m+l+" "+J.color)}b.push('<g_vml_:fill type="',e.type_,'"',' method="none" focus="100%"',' color="',A,'"',' color2="',D,'"',' colors="',H.join(","),'"',' opacity="',F,'"',' g_o_:opacity2="',E,'"',' angle="',j,'"',' focusposition="',k.x,",",k.y,'" />')}else if(e instanceof C){if(h&&i){var K=-c.x,L=-c.y;b.push("<g_vml_:fill",' position="',K/h*f*f,",",L/i*g*g,'"',' type="tile"',' src="',e.src_,'" />')}}else{var N=p(a.fillStyle),O=N.color,P=N.alpha*a.globalAlpha;b.push('<g_vml_:fill color="',O,'" opacity="',P,'" />')}}function y(a,b,c){var d=a.m_;return{x:M*(b*d[0][0]+c*d[1][0]+d[2][0])-N,y:M*(b*d[0][1]+c*d[1][1]+d[2][1])-N}}function z(a){return isFinite(a[0][0])&&isFinite(a[0][1])&&isFinite(a[1][0])&&isFinite(a[1][1])&&isFinite(a[2][0])&&isFinite(a[2][1])}function A(a,b,c){if(z(b)&&(a.m_=b,c)){var d=b[0][0]*b[1][1]-b[0][1]*b[1][0];a.lineScale_=L(K(d))}}function B(a){this.type_=a,this.x0_=0,this.y0_=0,this.r0_=0,this.x1_=0,this.y1_=0,this.r1_=0,this.colors_=[]}function C(a,b){switch(E(a),b){case"repeat":case null:case"":this.repetition_="repeat";break;case"repeat-x":case"repeat-y":case"no-repeat":this.repetition_=b;break;default:D("SYNTAX_ERR")}this.src_=a.src,this.width_=a.width,this.height_=a.height}function D(a){throw new F(a)}function E(a){a&&1==a.nodeType&&"IMG"==a.tagName||D("TYPE_MISMATCH_ERR"),"complete"!=a.readyState&&D("INVALID_STATE_ERR")}function F(a){this.code=this[a],this.message=a+": DOM Exception "+this.code}var G=Math,H=G.round,I=G.sin,J=G.cos,K=G.abs,L=G.sqrt,M=10,N=M/2,O=(+navigator.userAgent.match(/MSIE ([\d.]+)?/)[1],Array.prototype.slice);e(document);var P={init:function(a){var c=a||document;c.createElement("canvas"),c.attachEvent("onreadystatechange",b(this.init_,this,c))},init_:function(a){for(var b=a.getElementsByTagName("canvas"),c=0;c<b.length;c++)this.initElement(b[c])},initElement:function(b){if(!b.getContext){b.getContext=a,e(b.ownerDocument),b.innerHTML="",b.attachEvent("onpropertychange",f),b.attachEvent("onresize",g);var c=b.attributes;c.width&&c.width.specified?b.style.width=c.width.nodeValue+"px":b.width=b.clientWidth,c.height&&c.height.specified?b.style.height=c.height.nodeValue+"px":b.height=b.clientHeight}return b}};P.init();for(var Q=[],R=0;16>R;R++)for(var S=0;16>S;S++)Q[16*R+S]=R.toString(16)+S.toString(16);var T={aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",darkgreen:"#006400",darkgrey:"#A9A9A9",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",darkviolet:"#9400D3",deeppink:"#FF1493",deepskyblue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",grey:"#808080",greenyellow:"#ADFF2F",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",lightgreen:"#90EE90",lightgrey:"#D3D3D3",lightpink:"#FFB6C1",lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",mediumaquamarine:"#66CDAA",mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",oldlace:"#FDF5E6",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",whitesmoke:"#F5F5F5",yellowgreen:"#9ACD32"},U={},V={style:"normal",variant:"normal",weight:"normal",size:10,family:"sans-serif"},W={},X={butt:"flat",round:"round"},Y=u.prototype;Y.clearRect=function(){this.textMeasureEl_&&(this.textMeasureEl_.removeNode(!0),this.textMeasureEl_=null),this.element_.innerHTML=""},Y.beginPath=function(){this.currentPath_=[]},Y.moveTo=function(a,b){var c=y(this,a,b);this.currentPath_.push({type:"moveTo",x:c.x,y:c.y}),this.currentX_=c.x,this.currentY_=c.y},Y.lineTo=function(a,b){var c=y(this,a,b);this.currentPath_.push({type:"lineTo",x:c.x,y:c.y}),this.currentX_=c.x,this.currentY_=c.y},Y.bezierCurveTo=function(a,b,c,d,e,f){var g=y(this,e,f),h=y(this,a,b),i=y(this,c,d);v(this,h,i,g)},Y.quadraticCurveTo=function(a,b,c,d){var e=y(this,a,b),f=y(this,c,d),g={x:this.currentX_+2/3*(e.x-this.currentX_),y:this.currentY_+2/3*(e.y-this.currentY_)},h={x:g.x+(f.x-this.currentX_)/3,y:g.y+(f.y-this.currentY_)/3};v(this,g,h,f)},Y.arc=function(a,b,c,d,e,f){c*=M;var g=f?"at":"wa",h=a+J(d)*c-N,i=b+I(d)*c-N,j=a+J(e)*c-N,k=b+I(e)*c-N;h!=j||f||(h+=.125);var l=y(this,a,b),m=y(this,h,i),n=y(this,j,k);this.currentPath_.push({type:g,x:l.x,y:l.y,radius:c,xStart:m.x,yStart:m.y,xEnd:n.x,yEnd:n.y})},Y.rect=function(a,b,c,d){this.moveTo(a,b),this.lineTo(a+c,b),this.lineTo(a+c,b+d),this.lineTo(a,b+d),this.closePath()},Y.strokeRect=function(a,b,c,d){var e=this.currentPath_;this.beginPath(),this.moveTo(a,b),this.lineTo(a+c,b),this.lineTo(a+c,b+d),this.lineTo(a,b+d),this.closePath(),this.stroke(),this.currentPath_=e},Y.fillRect=function(a,b,c,d){var e=this.currentPath_;this.beginPath(),this.moveTo(a,b),this.lineTo(a+c,b),this.lineTo(a+c,b+d),this.lineTo(a,b+d),this.closePath(),this.fill(),this.currentPath_=e},Y.createLinearGradient=function(a,b,c,d){var e=new B("gradient");return e.x0_=a,e.y0_=b,e.x1_=c,e.y1_=d,e},Y.createRadialGradient=function(a,b,c,d,e,f){var g=new B("gradientradial");return g.x0_=a,g.y0_=b,g.r0_=c,g.x1_=d,g.y1_=e,g.r1_=f,g},Y.drawImage=function(a){var b,c,d,e,f,g,h,i,j=a.runtimeStyle.width,k=a.runtimeStyle.height;a.runtimeStyle.width="auto",a.runtimeStyle.height="auto";var l=a.width,m=a.height;if(a.runtimeStyle.width=j,a.runtimeStyle.height=k,3==arguments.length)b=arguments[1],c=arguments[2],f=g=0,h=d=l,i=e=m;else if(5==arguments.length)b=arguments[1],c=arguments[2],d=arguments[3],e=arguments[4],f=g=0,h=l,i=m;else{if(9!=arguments.length)throw Error("Invalid number of arguments");f=arguments[1],g=arguments[2],h=arguments[3],i=arguments[4],b=arguments[5],c=arguments[6],d=arguments[7],e=arguments[8]}var n=y(this,b,c),o=[],p=10,q=10;if(o.push(" <g_vml_:group",' coordsize="',M*p,",",M*q,'"',' coordorigin="0,0"',' style="width:',p,"px;height:",q,"px;position:absolute;"),1!=this.m_[0][0]||this.m_[0][1]||1!=this.m_[1][1]||this.m_[1][0]){var r=[];r.push("M11=",this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",H(n.x/M),",","Dy=",H(n.y/M),"");var s=n,t=y(this,b+d,c),u=y(this,b,c+e),v=y(this,b+d,c+e);s.x=G.max(s.x,t.x,u.x,v.x),s.y=G.max(s.y,t.y,u.y,v.y),o.push("padding:0 ",H(s.x/M),"px ",H(s.y/M),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",r.join(""),", sizingmethod='clip');")}else o.push("top:",H(n.y/M),"px;left:",H(n.x/M),"px;");o.push(' ">','<g_vml_:image src="',a.src,'"',' style="width:',M*d,"px;"," height:",M*e,'px"',' cropleft="',f/l,'"',' croptop="',g/m,'"',' cropright="',(l-f-h)/l,'"',' cropbottom="',(m-g-i)/m,'"'," />","</g_vml_:group>"),this.element_.insertAdjacentHTML("BeforeEnd",o.join(""))},Y.stroke=function(a){var b=[],c=10,d=10;b.push("<g_vml_:shape",' filled="',!!a,'"',' style="position:absolute;width:',c,"px;height:",d,'px;"',' coordorigin="0,0"',' coordsize="',M*c,",",M*d,'"',' stroked="',!a,'"',' path="');for(var e={x:null,y:null},f={x:null,y:null},g=0;g<this.currentPath_.length;g++){var h,i=this.currentPath_[g];switch(i.type){case"moveTo":h=i,b.push(" m ",H(i.x),",",H(i.y));break;case"lineTo":b.push(" l ",H(i.x),",",H(i.y));break;case"close":b.push(" x "),i=null;break;case"bezierCurveTo":b.push(" c ",H(i.cp1x),",",H(i.cp1y),",",H(i.cp2x),",",H(i.cp2y),",",H(i.x),",",H(i.y));break;case"at":case"wa":b.push(" ",i.type," ",H(i.x-this.arcScaleX_*i.radius),",",H(i.y-this.arcScaleY_*i.radius)," ",H(i.x+this.arcScaleX_*i.radius),",",H(i.y+this.arcScaleY_*i.radius)," ",H(i.xStart),",",H(i.yStart)," ",H(i.xEnd),",",H(i.yEnd))}i&&((null==e.x||i.x<e.x)&&(e.x=i.x),(null==f.x||i.x>f.x)&&(f.x=i.x),(null==e.y||i.y<e.y)&&(e.y=i.y),(null==f.y||i.y>f.y)&&(f.y=i.y))}b.push(' ">'),a?x(this,b,e,f):w(this,b),b.push("</g_vml_:shape>"),this.element_.insertAdjacentHTML("beforeEnd",b.join(""))},Y.fill=function(){this.stroke(!0)},Y.closePath=function(){this.currentPath_.push({type:"close"})},Y.save=function(){var a={};j(this,a),this.aStack_.push(a),this.mStack_.push(this.m_),this.m_=i(h(),this.m_)},Y.restore=function(){this.aStack_.length&&(j(this.aStack_.pop(),this),this.m_=this.mStack_.pop())},Y.translate=function(a,b){var c=[[1,0,0],[0,1,0],[a,b,1]];A(this,i(c,this.m_),!1)},Y.rotate=function(a){var b=J(a),c=I(a),d=[[b,c,0],[-c,b,0],[0,0,1]];A(this,i(d,this.m_),!1)},Y.scale=function(a,b){this.arcScaleX_*=a,this.arcScaleY_*=b;var c=[[a,0,0],[0,b,0],[0,0,1]];A(this,i(c,this.m_),!0)},Y.transform=function(a,b,c,d,e,f){var g=[[a,b,0],[c,d,0],[e,f,1]];A(this,i(g,this.m_),!0)},Y.setTransform=function(a,b,c,d,e,f){var g=[[a,b,0],[c,d,0],[e,f,1]];A(this,g,!0)},Y.drawText_=function(a,b,d,e,f){var g=this.m_,h=1e3,i=0,j=h,k={x:0,y:0},l=[],m=r(q(this.font),this.element_),n=s(m),o=this.element_.currentStyle,p=this.textAlign.toLowerCase();switch(p){case"left":case"center":case"right":break;case"end":p="ltr"==o.direction?"right":"left";break;case"start":p="rtl"==o.direction?"right":"left";break;default:p="left"}switch(this.textBaseline){case"hanging":case"top":k.y=m.size/1.75;break;case"middle":break;default:case null:case"alphabetic":case"ideographic":case"bottom":k.y=-m.size/2.25}switch(p){case"right":i=h,j=.05;break;case"center":i=j=h/2}var t=y(this,b+k.x,d+k.y);l.push('<g_vml_:line from="',-i,' 0" to="',j,' 0.05" ',' coordsize="100 100" coordorigin="0 0"',' filled="',!f,'" stroked="',!!f,'" style="position:absolute;width:1px;height:1px;">'),f?w(this,l):x(this,l,{x:-i,y:0},{x:j,y:m.size});var u=g[0][0].toFixed(3)+","+g[1][0].toFixed(3)+","+g[0][1].toFixed(3)+","+g[1][1].toFixed(3)+",0,0",v=H(t.x/M)+","+H(t.y/M);l.push('<g_vml_:skew on="t" matrix="',u,'" ',' offset="',v,'" origin="',i,' 0" />','<g_vml_:path textpathok="true" />','<g_vml_:textpath on="true" string="',c(a),'" style="v-text-align:',p,";font:",c(n),'" /></g_vml_:line>'),this.element_.insertAdjacentHTML("beforeEnd",l.join(""))},Y.fillText=function(a,b,c,d){this.drawText_(a,b,c,d,!1)},Y.strokeText=function(a,b,c,d){this.drawText_(a,b,c,d,!0)},Y.measureText=function(a){if(!this.textMeasureEl_){var b='<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>';this.element_.insertAdjacentHTML("beforeEnd",b),this.textMeasureEl_=this.element_.lastChild}var c=this.element_.ownerDocument;return this.textMeasureEl_.innerHTML="",this.textMeasureEl_.style.font=this.font,this.textMeasureEl_.appendChild(c.createTextNode(a)),{width:this.textMeasureEl_.offsetWidth}},Y.clip=function(){},Y.arcTo=function(){},Y.createPattern=function(a,b){return new C(a,b)},B.prototype.addColorStop=function(a,b){b=p(b),this.colors_.push({offset:a,color:b.color,alpha:b.alpha})};var Z=F.prototype=new Error;Z.INDEX_SIZE_ERR=1,Z.DOMSTRING_SIZE_ERR=2,Z.HIERARCHY_REQUEST_ERR=3,Z.WRONG_DOCUMENT_ERR=4,Z.INVALID_CHARACTER_ERR=5,Z.NO_DATA_ALLOWED_ERR=6,Z.NO_MODIFICATION_ALLOWED_ERR=7,Z.NOT_FOUND_ERR=8,Z.NOT_SUPPORTED_ERR=9,Z.INUSE_ATTRIBUTE_ERR=10,Z.INVALID_STATE_ERR=11,Z.SYNTAX_ERR=12,Z.INVALID_MODIFICATION_ERR=13,Z.NAMESPACE_ERR=14,Z.INVALID_ACCESS_ERR=15,Z.VALIDATION_ERR=16,Z.TYPE_MISMATCH_ERR=17,G_vmlCanvasManager=P,CanvasRenderingContext2D=u,CanvasGradient=B,CanvasPattern=C,DOMException=F}();
//# sourceMappingURL=../../../maps/libs/IE/excanvas.js.map