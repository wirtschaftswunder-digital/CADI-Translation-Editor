(window.webpackJsonp=window.webpackJsonp||[]).push([[5,2,3,4],{293:function(t,n,e){"use strict";var r=e(2),o=e(207).trim;r({target:"String",proto:!0,forced:e(295)("trim")},{trim:function(){return o(this)}})},294:function(t,n,e){"use strict";e(293);n.a={wasEdited:function(){return this.customTranslation&&this.customTranslation.trim().length>0&&this.customTranslation!=this.originalTranslation},currentTranslation:function(){return this.wasEdited?this.customTranslation:this.originalTranslation}}},295:function(t,n,e){var r=e(83).PROPER,o=e(3),l=e(208);t.exports=function(t){return o((function(){return!!l[t]()||"​᠎"!=="​᠎"[t]()||r&&l[t].name!==t}))}},296:function(t,n,e){var content=e(302);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(136).default)("5ad73b00",content,!0,{sourceMap:!1})},297:function(t,n,e){var content=e(304);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(136).default)("8a59016c",content,!0,{sourceMap:!1})},298:function(t,n,e){var content=e(306);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(136).default)("443c0afc",content,!0,{sourceMap:!1})},299:function(t,n,e){var content=e(308);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(136).default)("5ae7e192",content,!0,{sourceMap:!1})},300:function(t,n,e){"use strict";e.d(n,"b",(function(){return l})),e.d(n,"d",(function(){return c})),e.d(n,"a",(function(){return d})),e.d(n,"c",(function(){return f}));var r=e(14),o=e(22);e(82),e(15),e(32),e(206),e(40);function l(){return["de","en"]}function c(t){t}function d(t){var n={},e=function t(e,path){var l=Object(o.a)(e,2),c=l[0],d=l[1],p=""===path?c:"".concat(path,".").concat(c);d&&"object"===Object(r.a)(d)?Object.entries(d).forEach((function(n){return t(n,p)})):n[p]=d};return Object.entries(t).forEach((function(t){return e(t,"")})),n}function f(data){if(Array.isArray(data)||Object(data)!==data)return data;for(var t,n,e,r,o,l={},c=0,d=Object.keys(data);c<d.length;c++){var p=d[c];t=l,n="",r=0;do{e=p.indexOf(".",r),o=p.substring(r,-1!==e?e:void 0),t[n]||(t[n]=isNaN(parseInt(o))?{}:[]),t=t[n],n=o,r=e+1}while(e>=0);t[n]=data[p]}return l[""]}},301:function(t,n,e){"use strict";e(296)},302:function(t,n,e){var r=e(135)((function(i){return i[1]}));r.push([t.i,'.parent-key{font-weight:700}.translation-row{--line-color:var(--light-text);cursor:pointer;position:relative}.translation-row.parent-key{cursor:default}#edit-table th,.translation-row td{padding:1rem .5rem}.translation-row:not(.depth-0) td:first-child:before{border-bottom:1px solid var(--line-color);border-left:1px solid var(--line-color);content:"";display:block;height:100%;left:var(--depth-in-px);position:absolute;top:0;transform:translateY(-50%);transform-origin:center;width:17px}.translation-row:nth-child(odd){background:hsla(0,0%,86%,.188)}.translation-row:hover{background:rgba(0,106,255,.122)}.depth-line{border-left:1px solid var(--line-color);content:"";height:100%;left:var(--depth-in-px-2);position:absolute;top:0}',""]),r.locals={},t.exports=r},303:function(t,n,e){"use strict";e(297)},304:function(t,n,e){var r=e(135)((function(i){return i[1]}));r.push([t.i,".current-word-translation{border-radius:5px;padding:1px 2px}.current-word-translation.edited{background:rgba(255,181,22,.52)}",""]),r.locals={},t.exports=r},305:function(t,n,e){"use strict";e(298)},306:function(t,n,e){var r=e(135)((function(i){return i[1]}));r.push([t.i,".translation-word-grid{grid-gap:1rem;display:grid;gap:1rem}.translation-word td.iso{vertical-align:top;width:3rem}.translation-word:first-child td{padding-top:0}.translation-word:last-child td{padding-bottom:3rem}.translation-word td{padding-top:3rem}",""]),r.locals={},t.exports=r},307:function(t,n,e){"use strict";e(299)},308:function(t,n,e){var r=e(135)((function(i){return i[1]}));r.push([t.i,"label[data-v-2a220a18]{grid-gap:.2rem;display:grid;gap:.2rem}.iso[data-v-2a220a18],label>b[data-v-2a220a18]{color:#000}.translation-word .original-translation[data-v-2a220a18]{background:none;padding:0;resize:none}",""]),r.locals={},t.exports=r},309:function(t,n,e){var content=e(314);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(136).default)("ce40c456",content,!0,{sourceMap:!1})},310:function(t,n,e){"use strict";e.r(n);var main=e(300),r={props:["translationKey","isParent","path","value"],emits:["input","open-edit"],data:function(){return{languages:Object(main.b)(),pxPerDepth:20}},computed:{paddingLeft:function(){return"".concat(this.depth*this.pxPerDepth,"px")},depth:function(){return this.path.split(".").length-1}}},o=(e(301),e(46)),component=Object(o.a)(r,(function(){var t=this,n=t._self._c;return n("tr",{staticClass:"translation-row",class:{"parent-key":t.isParent,"depth-0":0===t.depth},style:{"--depth-in-px":"".concat((t.depth-1)*t.pxPerDepth,"px")},on:{click:function(n){return t.$emit("open-edit")}}},[n("td",{staticClass:"translation-key",class:{"parent-key":t.isParent}},[n("span",{style:{"padding-left":t.paddingLeft}},[t._v("\n      "+t._s(t.translationKey)+"\n    ")])]),t._v(" "),t._l(t.languages,(function(e){return t.isParent?n("td",{key:e}):t._e()})),t._v(" "),t._t("default")],2)}),[],!1,null,null,null);n.default=component.exports},311:function(t,n,e){"use strict";e.r(n);var r=e(294),o={props:["originalTranslation","customTranslation"],computed:{wasEdited:r.a.wasEdited,currentTranslation:r.a.currentTranslation}},l=(e(303),e(46)),component=Object(l.a)(o,(function(){var t=this;return(0,t._self._c)("span",{staticClass:"current-word-translation",class:{edited:t.wasEdited}},[t._v("\n  "+t._s(t.currentTranslation)+"\n")])}),[],!1,null,null,null);n.default=component.exports},312:function(t,n,e){"use strict";e.r(n);var r=e(294),o={props:["originalTranslation","customTranslation","iso"],computed:{wasEdited:r.a.wasEdited,currentTranslation:r.a.currentTranslation}},l=(e(305),e(307),e(46)),component=Object(l.a)(o,(function(){var t=this,n=t._self._c;return n("tr",{staticClass:"translation-word"},[n("td",{staticClass:"iso"},[n("b",{staticClass:"iso"},[t._v(t._s(t.iso))])]),t._v(" "),n("td",[n("div",{staticClass:"translation-word-grid"},[n("label",[n("b",[t._v("Original translation:")]),t._v(" "),n("span",{staticClass:"original-translation"},[t._v(t._s(t.originalTranslation))])]),t._v(" "),n("label",[n("b",[t._v("Your translation:")]),t._v(" "),t._t("default")],2)])])])}),[],!1,null,"2a220a18",null);n.default=component.exports},313:function(t,n,e){"use strict";e(309)},314:function(t,n,e){var r=e(135)((function(i){return i[1]}));r.push([t.i,'html{font-size:14px}body{--accent:#0084ff;--light-text:#8c8c8c;--medium-text:#495057;--input-bg:#f3f3f3;color:#8c8c8c;color:var(--light-text);font-family:Roboto,system-ui,-apple-system,Segoe UI,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,"Segoe UI",Oxygen,"Open Sans","Helvetica Neue";padding:1rem}h1,h2,h3,h4,h5,h6{color:#000}.btn{background:#000;border:none;border-radius:.2rem;color:#fff;cursor:pointer;font-weight:700;height:40px;padding:8px 12px}.iso{text-transform:uppercase}.translation-group{margin-left:24px}#edit-word-window-wrapper{-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);background:rgba(0,0,0,.4);height:100%;left:0;position:fixed;top:0;width:100%}#edit-word-window-container{align-content:center;align-items:center;display:flex;height:100%;justify-content:center;left:0;pointer-events:none;position:absolute;top:0;width:100%}#edit-word-window-container>div{background:#fff;border-radius:.25rem;margin-left:5vmin;margin-right:5vmin;max-width:640px;padding:1rem 2.5rem;pointer-events:all}#edit-table{color:var(--medium-text)}#edit-table thead th{text-align:left}.original-translation,textarea{background:#f3f3f3;border:none;border-radius:.25rem;color:var(--medium-text);font-size:1rem;font-weight:400;line-height:1.5;overflow:auto;padding:.375rem .75rem;resize:vertical}',""]),r.locals={},t.exports=r},315:function(t,n,e){"use strict";e.r(n);e(82);var r=e(27),o=e(12),l=e(22),c=e(14);e(64),e(15),e(32),e(206),e(293),e(47),e(34),e(35),e(40),e(33),e(41),e(65),e(66);var main=e(300);e(310);function d(object,t){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),n.push.apply(n,e)}return n}var f={data:function(){return{customTranslations:{},languages:Object(main.b)(),translationKeys:null,defaultTranslations:null,defaultTranslationsFlat:{},editWordPath:null}},created:function(){this.loadDefaultTranslations()},mounted:function(){var t=this;document.getElementById("fileInput").addEventListener("change",(function(){if(0!==this.files.length){var n=new FileReader;n.onload=function(){var e=n.result,r=JSON.parse(e);r&&"object"===Object(c.a)(r)&&(t.loadedCustomTranslations=Object(main.a)(r),t.customTranslations=Object(main.a)(r),console.log(t.customTranslations),t.setTranslationKeys())},n.readAsText(this.files[0])}else console.log("No file selected.")}))},methods:{downloadResult:function(){var t=this,n={};Object.entries(this.customTranslations).forEach((function(e){var r=Object(l.a)(e,2),o=r[0],c=r[1],d=String(c||"").trim();d.length>0&&o in t.defaultTranslationsFlat&&d!=t.defaultTranslationsFlat[o]&&(n[o]=d)}));var e,r,o,c,d=Object(main.c)(n);e=d,r="translations",o="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e,null,2)),(c=document.createElement("a")).setAttribute("href",o),c.setAttribute("download",r+".json"),document.body.appendChild(c),c.click(),c.remove()},loadDefaultTranslations:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var e,r,o,l;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.setDefaultTranslations(null),"https://main.d1u2qdrqduf5v6.amplifyapp.com/translations/",e=t.languages.map((function(t){return"".concat("https://main.d1u2qdrqduf5v6.amplifyapp.com/translations/").concat(t,"/translations.json")})),r=e.map((function(n){return t.$axios.get(n)})),n.next=6,Promise.all(r);case 6:o=n.sent,l={},t.languages.forEach((function(t,n){var e=o[n].data,data="string"==typeof e?JSON.parse(data):e;l[t]=data})),t.setDefaultTranslations(l),t.setTranslationKeys();case 11:case"end":return n.stop()}}),n)})))()},openEdit:function(path){this.editWordPath=path},closeEdit:function(){this.editWordPath=null},setDefaultTranslations:function(t){Object(main.d)(t),this.defaultTranslationsFlat=Object(main.a)(t||{}),this.defaultTranslations=t},setTranslationKeys:function(){var t=this,n=function(t,n){var r=Object(l.a)(t,2),o=r[0],d=r[1],path=""===n?o:"".concat(n,".").concat(o),f={key:o,children:null,path:path};return d&&"object"===Object(c.a)(d)?f.children=e(d,path):f.original=d,f},e=function(t,path){return Object.entries(t).map((function(t){return n(t,path)}))},r=null;if(this.defaultTranslations){r=[],this.translationKeys=e(this.defaultTranslations.de,"");this.translationKeys.forEach((function t(n){var e={key:n.key,path:n.path,isParent:!1};n.children?(e.isParent=!0,r.push(e),n.children.forEach(t)):(e.original=n.original,r.push(e))})),this.languages.forEach((function(n){r.forEach((function(e){var r=e.isParent,path=e.path;if(!r){var o="".concat(n,".").concat(path);t.customTranslations[o]=t.customTranslations[o]||""}}))}))}else this.translationKeys=null;this.translationRows=r},updateTranslation:function(t,path,n){this.customTranslations["".concat(t,".").concat(path)]=n.target.value,this.customTranslations=function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(n){Object(r.a)(t,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(source,n))}))}return t}({},this.customTranslations)}},computed:{isLoading:function(){return null===this.defaultTranslations}}},h=f,v=(e(313),e(46)),component=Object(v.a)(h,(function(){var t=this,n=t._self._c;return n("div",[n("h1",[t._v("CADI Translation Editor")]),t._v(" "),t.isLoading?n("p",[t._v("Loading...")]):t._e(),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}],staticStyle:{display:"grid",gap:"5rem"}},[t._m(0),t._v(" "),t.translationKeys&&t.translationRows?n("table",{attrs:{id:"edit-table"}},[n("thead",[n("th",[t._v("Key")]),t._v(" "),t._l(t.languages,(function(e){return n("th",{key:e,staticClass:"iso"},[t._v(t._s(e))])}))],2),t._v(" "),n("tbody",t._l(t.translationRows,(function(e){var r=e.key,o=e.isParent,path=e.path;return n("translationRow",{key:path,attrs:{isParent:o,translationKey:r,path:path},on:{"open-edit":function(n){!o&&t.openEdit(path)}}},t._l(t.languages,(function(e){return o?t._e():n("td",{key:e},[n("current-word-translation",{attrs:{originalTranslation:t.defaultTranslationsFlat["".concat(e,".").concat(path)],customTranslation:t.customTranslations["".concat(e,".").concat(path)]}})],1)})),0)})),1)]):t._e(),t._v(" "),t.editWordPath?n("div",{attrs:{id:"edit-word-window-wrapper"}},[n("div",{staticStyle:{display:"absolut",left:"0",top:"0",width:"100%",height:"100%"},on:{click:t.closeEdit}}),t._v(" "),n("div",{attrs:{id:"edit-word-window-container"}},[n("div",[n("table",t._l(t.languages,(function(e){return n("translation-word",{key:e,attrs:{iso:e,originalTranslation:t.defaultTranslationsFlat["".concat(e,".").concat(t.editWordPath)],customTranslation:t.customTranslations["".concat(e,".").concat(t.editWordPath)]}},[n("textarea",{staticStyle:{"min-width":"200px"},attrs:{rows:"5",cols:"16"},domProps:{value:t.customTranslations["".concat(e,".").concat(t.editWordPath)]},on:{input:function(n){return t.updateTranslation(e,t.editWordPath,n)}}})])})),1),t._v(" "),n("div",{staticStyle:{display:"flex","justify-content":"space-between","align-items":"center"}},[n("span",{staticStyle:{"margin-right":"2rem","font-size":"small"}},[t._v("Changes get automatically saved")]),t._v(" "),n("button",{staticClass:"btn",on:{click:t.closeEdit}},[t._v("Ok")])])])])]):t._e(),t._v(" "),n("div",[n("button",{staticClass:"btn",on:{click:t.downloadResult}},[t._v("Download")])])])])}),[function(){var t=this,n=t._self._c;return n("label",[n("span",[t._v("Load project")]),t._v(" "),n("input",{attrs:{type:"file",id:"fileInput",accept:".json"}})])}],!1,null,null,null);n.default=component.exports;installComponents(component,{CurrentWordTranslation:e(311).default,TranslationWord:e(312).default})}}]);