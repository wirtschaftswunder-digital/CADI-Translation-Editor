(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{296:function(t,n,e){var content=e(302);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(136).default)("5ad73b00",content,!0,{sourceMap:!1})},300:function(t,n,e){"use strict";e.d(n,"b",(function(){return c})),e.d(n,"d",(function(){return l})),e.d(n,"a",(function(){return d})),e.d(n,"c",(function(){return f}));var r=e(14),o=e(22);e(82),e(15),e(32),e(206),e(40);function c(){return["de","en"]}function l(t){t}function d(t){var n={},e=function t(e,path){var c=Object(o.a)(e,2),l=c[0],d=c[1],p=""===path?l:"".concat(path,".").concat(l);d&&"object"===Object(r.a)(d)?Object.entries(d).forEach((function(n){return t(n,p)})):n[p]=d};return Object.entries(t).forEach((function(t){return e(t,"")})),n}function f(data){if(Array.isArray(data)||Object(data)!==data)return data;for(var t,n,e,r,o,c={},l=0,d=Object.keys(data);l<d.length;l++){var p=d[l];t=c,n="",r=0;do{e=p.indexOf(".",r),o=p.substring(r,-1!==e?e:void 0),t[n]||(t[n]=isNaN(parseInt(o))?{}:[]),t=t[n],n=o,r=e+1}while(e>=0);t[n]=data[p]}return c[""]}},301:function(t,n,e){"use strict";e(296)},302:function(t,n,e){var r=e(135)((function(i){return i[1]}));r.push([t.i,'.parent-key{font-weight:700}.translation-row{--line-color:var(--light-text);cursor:pointer;position:relative}.translation-row.parent-key{cursor:default}#edit-table th,.translation-row td{padding:1rem .5rem}.translation-row:not(.depth-0) td:first-child:before{border-bottom:1px solid var(--line-color);border-left:1px solid var(--line-color);content:"";display:block;height:100%;left:var(--depth-in-px);position:absolute;top:0;transform:translateY(-50%);transform-origin:center;width:17px}.translation-row:nth-child(odd){background:hsla(0,0%,86%,.188)}.translation-row:hover{background:rgba(0,106,255,.122)}.depth-line{border-left:1px solid var(--line-color);content:"";height:100%;left:var(--depth-in-px-2);position:absolute;top:0}',""]),r.locals={},t.exports=r},310:function(t,n,e){"use strict";e.r(n);var main=e(300),r={props:["translationKey","isParent","path","value"],emits:["input","open-edit"],data:function(){return{languages:Object(main.b)(),pxPerDepth:20}},computed:{paddingLeft:function(){return"".concat(this.depth*this.pxPerDepth,"px")},depth:function(){return this.path.split(".").length-1}}},o=(e(301),e(46)),component=Object(o.a)(r,(function(){var t=this,n=t._self._c;return n("tr",{staticClass:"translation-row",class:{"parent-key":t.isParent,"depth-0":0===t.depth},style:{"--depth-in-px":"".concat((t.depth-1)*t.pxPerDepth,"px")},on:{click:function(n){return t.$emit("open-edit")}}},[n("td",{staticClass:"translation-key",class:{"parent-key":t.isParent}},[n("span",{style:{"padding-left":t.paddingLeft}},[t._v("\n      "+t._s(t.translationKey)+"\n    ")])]),t._v(" "),t._l(t.languages,(function(e){return t.isParent?n("td",{key:e}):t._e()})),t._v(" "),t._t("default")],2)}),[],!1,null,null,null);n.default=component.exports}}]);