(()=>{"use strict";var t={560:(t,e,n)=>{n.d(e,{Z:()=>i});var r=n(81),o=n.n(r),a=n(645),s=n.n(a)()(o());s.push([t.id,"html{box-sizing:border-box;scroll-behavior:smooth}*,*::before,*::after{box-sizing:inherit}.body{min-height:100vh;margin:0;display:flex;flex-direction:column;justify-content:space-between;color:#313131;font-family:Roboto,sans-serif;font-weight:500;letter-spacing:1.25px}.main{padding:1rem 0;background-color:#a5cbe4;min-height:calc(100vh - 100px)}.line{border-bottom:3px solid #e68a17}.form{display:flex;justify-content:left;gap:5px}.input-text{width:150px;height:32px;padding:0 6px;border:1px solid #f9d8b0;border-radius:5px;font-size:14px;font-weight:600;color:#f9bb6d;background-color:#f9d8b0;box-shadow:1px 1px -20px -2px rgba(230,138,23,.6) inset;transition:.5s;cursor:pointer}.input-text-create{width:250px}.input-text:hover{border:1px solid #166293}.input-text:focus{color:#fff;font-weight:600;background-color:#6bb4e4}.input-color{width:32px;height:32px;border:1px solid #f9d8b0;border-radius:5px;font-size:14px;font-weight:600;color:#166293;cursor:pointer;background-color:#f9d8b0;box-shadow:-1px -1px 20px 2px rgba(230,138,23,.6) inset;transition:.5s}.input-color:hover{background-color:#e68a17}.container-car-name{padding:5px}.container-buttons{padding:5px}.button{width:70px;height:32px;border:0;border-radius:5px;font-size:14px;font-weight:600;color:#166293;cursor:pointer;background-color:#f9d8b0;box-shadow:-1px -1px 20px 2px rgba(230,138,23,.6) inset;transition:.5s}.container-setting .button{width:120px}.button:hover{background-color:#f9bb6d}.button:active{transform:scale(0.97);transition:.1s}.button:disabled{box-shadow:0}.header{height:100px;display:flex;justify-content:space-around;align-items:center;background-color:#f9bb6d}.header-title-container{display:flex;justify-content:center}.header-title_text{font-size:32px;font-weight:600;color:#6d3e03}.header-menu{display:flex;justify-content:center;gap:30px;padding:0}.header-menu_item{list-style:none;text-transform:capitalize;font-size:18px;font-weight:600;color:#166293;cursor:pointer;transition:.3s}.header-menu_item:hover{color:#032b46}.garage{height:100%;min-height:calc(100vh - 100px - 20px);display:flex;flex-direction:column;justify-content:space-between}.container-setting{margin:1rem 0;display:flex;justify-content:center;gap:1.5rem}.container-forms{margin:1rem 0;display:flex;justify-content:center;gap:1.5rem}.container-tracks{margin:.2rem .2rem;flex-grow:1}.container-pangination{margin:.75rem 0 0;display:flex;justify-content:center;gap:1.5rem}.container-track{padding:1rem 0 0}.container-buttons{display:flex;justify-content:left;gap:.52rem}.container-svg{width:75px;height:32px}.container-road{padding:.5rem;background-color:#000}.container-title{display:flex;justify-content:center;gap:.25rem}.tracks-title_text{font-weight:600;color:#032b46}.footer{height:0px;display:flex;justify-content:space-around;align-items:center;background-color:#8f6c3f}",""]);const i=s},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",r=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),r&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),r&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,r,o,a){"string"==typeof t&&(t=[[null,t,void 0]]);var s={};if(r)for(var i=0;i<this.length;i++){var c=this[i][0];null!=c&&(s[c]=!0)}for(var l=0;l<t.length;l++){var u=[].concat(t[l]);r&&s[u[0]]||(void 0!==a&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=a),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),o&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=o):u[4]="".concat(o)),e.push(u))}},e}},81:t=>{t.exports=function(t){return t[1]}},823:(t,e,n)=>{n.r(e),n.d(e,{default:()=>v});var r=n(379),o=n.n(r),a=n(795),s=n.n(a),i=n(569),c=n.n(i),l=n(565),u=n.n(l),d=n(216),h=n.n(d),g=n(589),p=n.n(g),m=n(560),f={};f.styleTagTransform=p(),f.setAttributes=u(),f.insert=c().bind(null,"head"),f.domAPI=s(),f.insertStyleElement=h(),o()(m.Z,f);const v=m.Z&&m.Z.locals?m.Z.locals:void 0},379:t=>{var e=[];function n(t){for(var n=-1,r=0;r<e.length;r++)if(e[r].identifier===t){n=r;break}return n}function r(t,r){for(var a={},s=[],i=0;i<t.length;i++){var c=t[i],l=r.base?c[0]+r.base:c[0],u=a[l]||0,d="".concat(l," ").concat(u);a[l]=u+1;var h=n(d),g={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==h)e[h].references++,e[h].updater(g);else{var p=o(g,r);r.byIndex=i,e.splice(i,0,{identifier:d,updater:p,references:1})}s.push(d)}return s}function o(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,o){var a=r(t=t||[],o=o||{});return function(t){t=t||[];for(var s=0;s<a.length;s++){var i=n(a[s]);e[i].references--}for(var c=r(t,o),l=0;l<a.length;l++){var u=n(a[l]);0===e[u].references&&(e[u].updater(),e.splice(u,1))}a=c}}},569:t=>{var e={};t.exports=function(t,n){var r=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{t.exports=function(t){var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(r,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}},717:function(t,e,n){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),n(823);const o=r(n(113));e.default=class{constructor(){this.view=new o.default}start(){this.view.render()}}},130:function(t,e,n){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=r(n(576)),a=r(n(778));class s extends a.default{constructor(t,e){super(),this.name=t,this.id=e||"",this.model=new o.default;const n={generate:()=>this.model.generate100Cars(),prev:()=>this.model.prev(),next:()=>this.model.next(),delete:t=>this.model.delete(t)};this.modelSubmitMethod=n[this.name]}submit(t){console.log(t),this.modelSubmitMethod(this.id)}}e.default=s},421:function(t,e,n){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=r(n(576)),a=r(n(778));class s extends a.default{constructor(t,e){super(),this.name=t,this.model=new o.default,this.id=e||""}input(t){const e={create:t=>this.model.setInputCreate(t),update:t=>this.model.setInputUpdate(t)};e[this.name](t)}submit(t){const e={create:t=>this.model.createCar(t),update:t=>this.model.updateCar(t)};e[this.name](t)}getFormDataFromStorage(){return this.model.formsData}getFormData(){({create:()=>this.model.getInputCreate(),update:()=>this.model.getInputUpdate()})[this.name]()}}e.default=s},392:function(t,e,n){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=r(n(778)),a=r(n(576));class s extends o.default{constructor(){super(),this.model=new a.default}click(t){this.model.setPage(t)}}e.default=s},778:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(){this.subscribers=[]}subscribe(t){this.subscribers.push(t)}broadcast(t){this.subscribers.forEach((e=>{e(t)}))}}},153:function(t,e,n){var r=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(o,a){function s(t){try{c(r.next(t))}catch(t){a(t)}}function i(t){try{c(r.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,i)}c((r=r.apply(t,e||[])).next())}))},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=o(n(576)),s=o(n(981));e.default=class{constructor(){this.model=new a.default,this.api=new s.default}getCarsCurrentPage(){return r(this,void 0,void 0,(function*(){return yield this.model.getCarsPageFromLocalStorage()}))}getCarsCount(){return r(this,void 0,void 0,(function*(){const t=yield this.model.getCarsCount();return console.log("# TRACK contr: getCarsCount() = ",t),t}))}getCars(t){return r(this,void 0,void 0,(function*(){return yield this.model.getCars(t)}))}createCar(t){return this.model.createCar(t)}}},981:function(t,e){var n=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(o,a){function s(t){try{c(r.next(t))}catch(t){a(t)}}function i(t){try{c(r.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,i)}c((r=r.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(){this.serverUrl="http://127.0.0.1:3000",this.paths={garage:`${this.serverUrl}/garage`,winners:`${this.serverUrl}/winners`,engine:`${this.serverUrl}/engine`},this.carsOnPage=7}getCarsCount(){return n(this,void 0,void 0,(function*(){const t=yield this.getCars(0);return null==t?void 0:t.count}))}getCars(t){return n(this,void 0,void 0,(function*(){try{const e=yield fetch(`${this.paths.garage}?_page=${t}&_limit=${this.carsOnPage}`);return 200===e.status?{count:e.headers.get("X-Total-Count"),data:yield e.json()}:null}catch(t){throw new Error(t)}}))}createCar(t){return n(this,void 0,void 0,(function*(){try{const e=yield fetch(`${this.paths.garage}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});201===e.status?console.log("Success: car was created! Code: 201"):500===e.status&&console.log("Unsuccess: car was not created... Code: 500")}catch(t){throw new Error(t)}}))}updateCar(t){return n(this,void 0,void 0,(function*(){console.log("# updateCar: carData =",t);const e=t.id||0,n={name:t.name,color:t.color};try{const t=yield fetch(`${this.paths.garage}/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});200===t.status?(console.log("Success: car was updated! Code: 200"),console.log("response.json() =",t.json())):404===t.status&&console.log("Unsuccess: car was not updated... Code: 404")}catch(t){throw new Error(t)}}))}deleteCar(t){return n(this,void 0,void 0,(function*(){try{const e=yield fetch(`${this.paths.garage}/${t}`,{method:"DELETE"});201===e.status?console.log("Success: car was deleted! Code: 201"):500===e.status&&console.log("Unsuccess: car was not deleted... Code: 500 ")}catch(t){throw new Error(t)}}))}}},576:function(t,e,n){var r=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(o,a){function s(t){try{c(r.next(t))}catch(t){a(t)}}function i(t){try{c(r.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,i)}c((r=r.apply(t,e||[])).next())}))},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=o(n(981));e.default=class{constructor(){this.api=new a.default,this.carCount=0,this.nextId=this.carCount,this.formsData=this.getFormsDataFromLocalStorage(),this.inputCreateData={name:"",color:"#000000"},this.inputUpdateData={name:"",color:"#000000"},this.HTMLpage="garage",this.rerenderCallback=()=>null}setRerenderCallback(t){this.rerenderCallback=t}getCarsCount(){return r(this,void 0,void 0,(function*(){const t=yield this.api.getCarsCount(),e=t?+t:1;return console.log("getCarsCount() = ",e),e}))}getCars(t){return r(this,void 0,void 0,(function*(){const e=yield this.api.getCars(t);return console.log(t,"getCars =",e),e}))}setFormsDataToLocalStorage(t){localStorage.setItem("formsData",JSON.stringify(t))}getFormsDataFromLocalStorage(){const t=localStorage.getItem("formsData")?JSON.parse(localStorage.getItem("formsData")):{create:{text:"",color:"#000000"},update:{text:"",color:"#000000"}};return this.formsData=t,t}setPage(t){console.log("### Model.setPage",t)}getPage(){return console.log("### Model.getPage",this.HTMLpage),this.HTMLpage}setInputCreate(t){const{update:e}=this.getFormsDataFromLocalStorage();this.setFormsDataToLocalStorage({create:t,update:e})}getInputCreate(){return this.inputUpdateData=this.getFormsDataFromLocalStorage().create,this.inputCreateData}setInputUpdate(t){const{create:e}=this.getFormsDataFromLocalStorage();this.setFormsDataToLocalStorage({update:t,create:e}),this.inputUpdateData=t}getInputUpdate(){return this.inputUpdateData=this.getFormsDataFromLocalStorage().update,this.inputUpdateData}getNextIdFromLocalStorage(){let t;return localStorage.getItem("nextId")?t=+localStorage.getItem("nextId"):(this.getCarsCount(),t=this.carCount+1,this.setCarsPageToLocalStorage(t)),t}createCar(t){const e=+this.getNextIdFromLocalStorage();console.log("# createCar: this.nextId => ",this.nextId),this.api.createCar(Object.assign(Object.assign({},t),{name:t.name,id:this.nextId})),this.nextId=e+1,localStorage.setItem("nextId",this.nextId.toString()),console.log("### Model.createCar = ",Object.assign(Object.assign({},t),{name:t.name,id:this.nextId}))}updateCar(t){return r(this,void 0,void 0,(function*(){yield this.api.updateCar(t);const e=+localStorage.getItem("carsPage");this.rerenderCallback(e),console.log("### Model.updateCar = ",t,this.rerenderCallback)}))}generate100Cars(){return r(this,void 0,void 0,(function*(){const t=yield this.getNewCars(100);null==t||t.forEach((t=>{const e=`${t.Make} ${t.Model}`,n=this.getRandomColor();this.createCar({name:e,color:n})}));const e=yield this.getCarsPageFromLocalStorage();this.rerenderCallback(e),console.log("### Model.generate100Cars",this.rerenderCallback)}))}getNewCars(t){return r(this,void 0,void 0,(function*(){const e=yield fetch(`https://parseapi.back4app.com/classes/Car_Model_List?limit=${t}`,{headers:{"X-Parse-Application-Id":"hlhoNKjOvEhqzcVAJ1lxjicJLZNVv36GdbboZj3Z","X-Parse-Master-Key":"SNMJJF0CZZhTPhLDIqGhTlUNV9r60M2Z5spyWfXW"}}),n=yield e.json();return n.results?n.results:[]}))}getRandomColor(){let t=((1<<24)*Math.random()|0).toString(16);return t.length<6&&(t+="f"),`#${t}`}race(t){console.log("### Model.race",t)}reset(t){console.log("### Model.reset",t)}garage(t){console.log("### Model.garage",t)}winners(t){console.log("### Model.winners",t)}setCarsPageToLocalStorage(t){localStorage.setItem("carsPage",t.toString())}getCarsPageFromLocalStorage(){var t;return r(this,void 0,void 0,(function*(){let e;if(console.log("localStorage.getItem(carsPage) (from Storage) = ",null===(t=localStorage.getItem("carsPage"))||void 0===t?void 0:t.length,NaN!==+localStorage.getItem("carsPage")),void 0!==localStorage.getItem("carsPage")){e=+localStorage.getItem("carsPage"),console.log("carsPage (from Storage) = ",e);const t=yield this.getCarsCount(),n=Math.ceil(t/7);e>n&&(console.log("maxPage = ",n),e=n,this.setCarsPageToLocalStorage(e))}else console.log("Was Nan -> else carsPage = 1"),e=1,this.setCarsPageToLocalStorage(e);return+e}))}prev(){return r(this,void 0,void 0,(function*(){const t=yield this.getCarsPageFromLocalStorage();if(1!=+t){const e=+t-1;this.setCarsPageToLocalStorage(e),this.rerenderCallback(e)}console.log("### Model.prev","carsPage = ",t,this.rerenderCallback)}))}next(){return r(this,void 0,void 0,(function*(){const t=yield this.getCarsPageFromLocalStorage(),e=yield this.getCarsCount();if(console.log("NEXT count =",e,"| storageCount =",t,Math.ceil(e/7)),t<Math.ceil(e/7)){const e=t+1;this.setCarsPageToLocalStorage(e);const n=+localStorage.getItem("carsPage");console.log("carsPage (CHECK from Storage) = ",n,this.rerenderCallback),this.rerenderCallback(e)}}))}start(t,e){console.log("### Model.start",e,t)}stop(t,e){console.log("### Model.stop",e,t)}delete(t){t&&this.api.deleteCar(+t);const e=+localStorage.getItem("carsPage");this.rerenderCallback(e),console.log("### Model.delete",t,this.rerenderCallback)}}},263:function(t,e,n){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=r(n(130));e.default=class{constructor(t,e){this.name=t,this.id=e||"",this.controller=new o.default(t,this.id),this.button=this.getHTMLButtonElement(),this.callback=()=>null}init(t){this.setListeners(),t.append(this.button)}setCallback(t){this.callback=t}setListeners(){this.button.onclick=()=>{this.controller.submit(this.name),this.controller.broadcast(this.name)}}getHTMLButtonElement(){const t=document.createElement("button");return t.className=`button button-${this.name}`,t.setAttribute("type","button"),t.setAttribute("id",this.id),t.textContent=this.name,t}}},786:function(t,e,n){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=r(n(421));e.default=class{constructor(t,e){this.name=t,this.id=e||"",this.controller=new o.default(this.name),this.formsData=this.controller.getFormDataFromStorage(),this.callback=()=>null,this.data={name:"",color:""},this.inputText=this.getHTMLInputTextElement(),this.inputColor=this.getHTMLInputColorElement(),this.labelColor=this.getHTMLLabelColorElement(),this.button=this.getHTMLButtonElement(),this.form=this.getHTMLFormElement()}init(t){this.setListeners(),t.append(this.form)}setCallback(t){this.callback=t}setListeners(){this.inputText.oninput=()=>{this.controller.input(this.getData())},this.inputColor.oninput=()=>{this.controller.input(this.getData())},this.button.onclick=()=>{this.controller.submit(this.getData()),this.controller.broadcast(this.getData())}}getData(){return{name:this.inputText.value,color:this.inputColor.value,id:+this.id}}setData(t){this.data=Object.assign(Object.assign({},this.data),t),this.inputText.value=this.data.name,this.inputColor.value=this.data.color,this.button.textContent=this.name}getFormDataFromStorage(){return this.controller.getFormDataFromStorage()}getHTMLFormElement(){const t=document.createElement("div");return t.className="form form-create",t.append(this.inputText),t.append(this.inputColor),t.append(this.labelColor),t.append(this.button),t}getHTMLInputTextElement(){const t=document.createElement("input");return t.className=`input input-text input-text-${this.name}`,t.setAttribute("type","text"),t}getHTMLInputColorElement(){const t=document.createElement("input");return t.className=`input input-color input-color-${this.name}`,t.setAttribute("type","color"),t.setAttribute("name","color"),t}getHTMLLabelColorElement(){const t=document.createElement("label");return t.className=`label label-color label-${this.name}`,t.setAttribute("for","color"),t}getHTMLButtonElement(){const t=document.createElement("button");return t.className=`button button-form button-${this.name}`,t.setAttribute("type","button"),t.textContent=this.name,this.id&&t.setAttribute("id",this.id),t}}},377:function(t,e,n){var r=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(o,a){function s(t){try{c(r.next(t))}catch(t){a(t)}}function i(t){try{c(r.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,i)}c((r=r.apply(t,e||[])).next())}))},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=o(n(263)),s=o(n(786)),i=o(n(792));e.default=class{constructor(){this.garage=this.getHTMLElement("div","garage"),this.inputFormElements={},this.buttonElements={},this.tracksElement=new i.default,this.panginationElements={}}render(t){return r(this,void 0,void 0,(function*(){this.renderForms(),this.renderButtons(),this.renderPangination(),yield this.renderTracks(),this.subscribeEvents(),t.append(this.garage)}))}renderForms(){const t=this.createContainer("forms");["create"].forEach((e=>{this.inputFormElements[e]=this.renderChildElement(e,s.default,t)}))}renderButtons(){const t=this.createContainer("setting");["race","reset","generate"].forEach((e=>{this.buttonElements[e]=this.renderChildElement(e,a.default,t)}))}renderTracks(){return r(this,void 0,void 0,(function*(){const t=this.createContainer("tracks"),e=this.tracksElement;yield e.init(t)}))}renderPangination(){const t=this.createContainer("pangination");["prev","next"].forEach((e=>{this.panginationElements[e]=this.renderChildElement(e,a.default,t)}))}subscribeEvents(){const t=t=>r(this,void 0,void 0,(function*(){const e=this.tracksElement.element.parentElement;console.log("$$$ currenrPage =",t),e&&(yield this.tracksElement.rerender(e,t))}));this.inputFormElements.create.controller.model.setRerenderCallback(t),this.tracksElement.controller.model.setRerenderCallback(t),this.buttonElements.generate.controller.model.setRerenderCallback(t),this.panginationElements.prev.controller.model.setRerenderCallback(t),this.panginationElements.next.controller.model.setRerenderCallback(t)}renderChildElement(t,e,n){const r=new e(t);return r instanceof s.default&&r.setData(r.getFormDataFromStorage()[t]),r.init(n),r}createContainer(t){const e=document.createElement("div");return e.className=`container container-${t}`,this.garage.append(e),e}getHTMLElement(t,e){const n=document.createElement(t);return n.className=`${e}`,n}clear(){this.garage.innerHTML=""}}},850:function(t,e,n){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=r(n(576)),a=r(n(377)),s=r(n(183));e.default=class{constructor(){this.model=new o.default,this.pageName=this.model.getPage(),this.main=this.getHTMLElement("main"),this.winners=new s.default,this.garage=new a.default}render(){this.clear(),console.log("# this.pageName = ",this.pageName),"garage"===this.pageName.toLowerCase()?this.garage.render(this.main):"winners"===this.pageName.toLowerCase()&&this.winners.render(this.main),document.body.append(this.main)}setData(t){this.pageName=t}getHTMLElement(t){const e=document.createElement(t);return e.className=`${t}`,e}clear(){this.winners&&this.winners.clear(),this.garage&&this.garage.clear()}}},684:function(t,e,n){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=r(n(392));e.default=class{constructor(){this.controller=new o.default;const t=this.getHTMLElement("header","header");this.header=t;const e=this.getHTMLTitle("Acyns Race");this.title=e;const n=this.getHTMLElement("div","menu-container"),r=this.getHTMLElement("ul","header-menu"),a=this.getHTMLElement("li","header-menu_item menu-garage");a.innerText="garage",this.garage=a;const s=this.getHTMLElement("li","header-menu_item menu-winners");s.innerText="winners",this.winners=s,this.navItems=[this.garage,this.winners],r.append(a),r.append(s),n.append(r),t.append(e),t.append(n)}showBanner(){const t=this.getHTMLElement("div","header-banner");return t.innerHTML='\n        <div style="display: flex; justify-content: center; color: white; background: green; height: 120px;">\n\t<div style="margin: auto 0; font-size: 22px; text-align: center;">\n\t\tПожалуйста, <span style="font-weight: 700; font-size: 26px;">проверьте мою работу в четверг после 17:00 (МСК)</span>, если это возможно. <br>\n\t\tДело движется к завершению. Сделаю все, чтобы в четверг вам проверять было легко. <br>Огромное спасибо вам за то, идете навстречу с этим непростым таском!\n\t</div>\n</div>\n        ',t}render(){document.body.append(this.showBanner()),document.body.append(this.header),this.setListeners()}setListeners(){this.navItems.forEach((t=>t.onclick=()=>{this.controller.click(t.innerText),this.controller.broadcast(t.innerText)}))}getHTMLTitle(t){const e=this.getHTMLElement("div","header-title-container"),n=this.getHTMLElement("h1","header-title_text");return n.innerText=t,e.append(n),e}getHTMLElement(t,e){const n=document.createElement(t);return n.className=`${e}`,n}}},957:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(){this.width="75px",this.height="32px"}getSportcar(t){return`<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 1000 600" height="${this.height}" id="Shape_1_6_" overflow="visible" version="1.1" viewBox="0 0 1000 600" width="${this.width}" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Shape_1"><g><path d="M287.55,389.163v23.572c6.893-1.17,13.26-3.882,18.737-7.767l-16.667-16.668    C288.946,388.62,288.257,388.91,287.55,389.163z M279.837,360.746c-3.792,0-6.866,3.074-6.866,6.866s3.074,6.866,6.866,6.866    s6.866-3.074,6.866-6.866S283.629,360.746,279.837,360.746z M279.837,380.23c-1.607,0-2.911,1.303-2.911,2.91    s1.303,2.91,2.911,2.91c1.607,0,2.91-1.303,2.91-2.91S281.444,380.23,279.837,380.23z M300.528,377.396l16.667,16.667    c3.886-5.477,6.596-11.846,7.766-18.739h-23.574C301.133,376.031,300.848,376.724,300.528,377.396z M300.526,357.829    c0.319,0.673,0.608,1.363,0.861,2.07h23.573c-1.17-6.893-3.882-13.261-7.767-18.738L300.526,357.829z M270.056,346.924    c0.673-0.319,1.362-0.609,2.07-0.862v-23.572c-6.893,1.17-13.26,3.882-18.738,7.767L270.056,346.924z M258.287,375.324h-23.573    c1.17,6.894,3.881,13.262,7.766,18.738l16.668-16.668C258.829,376.722,258.54,376.031,258.287,375.324z M292.456,367.611    c0,1.607,1.303,2.91,2.91,2.91s2.91-1.303,2.91-2.91s-1.303-2.91-2.91-2.91S292.456,366.004,292.456,367.611z M306.288,330.255    c-5.478-3.885-11.845-6.596-18.738-7.766v23.572c0.707,0.253,1.397,0.542,2.07,0.86L306.288,330.255z M279.837,354.992    c1.607,0,2.91-1.303,2.91-2.91s-1.303-2.91-2.91-2.91c-1.607,0-2.911,1.303-2.911,2.91S278.23,354.992,279.837,354.992z     M279.837,292.661c-41.394,0-74.951,33.557-74.951,74.951s33.557,74.951,74.951,74.951s74.951-33.557,74.951-74.951    S321.231,292.661,279.837,292.661z M279.837,421.148c-29.567,0-53.537-23.969-53.537-53.536s23.969-53.536,53.537-53.536    c29.567,0,53.536,23.969,53.536,53.536S309.404,421.148,279.837,421.148z M253.386,404.97c5.477,3.885,11.846,6.596,18.739,7.766    v-23.572c-0.708-0.253-1.398-0.542-2.072-0.861L253.386,404.97z M259.146,357.827l-16.667-16.667    c-3.886,5.478-6.596,11.847-7.766,18.739h23.575C258.542,359.192,258.827,358.501,259.146,357.827z M267.218,367.611    c0-1.607-1.303-2.91-2.91-2.91c-1.607,0-2.91,1.303-2.91,2.91s1.303,2.91,2.91,2.91    C265.916,370.521,267.218,369.219,267.218,367.611z M728.181,357.827l-16.667-16.667c-3.887,5.478-6.597,11.847-7.767,18.739    h23.575C727.576,359.192,727.861,358.501,728.181,357.827z M769.563,377.396l16.667,16.667c3.886-5.477,6.596-11.846,7.766-18.739    h-23.574C770.167,376.031,769.882,376.724,769.563,377.396z M769.561,357.829c0.319,0.673,0.608,1.363,0.861,2.07h23.573    c-1.17-6.893-3.882-13.261-7.767-18.738L769.561,357.829z M756.584,389.163v23.572c6.893-1.17,13.26-3.882,18.737-7.767    l-16.668-16.668C757.98,388.62,757.291,388.91,756.584,389.163z M748.871,360.746c-3.792,0-6.866,3.074-6.866,6.866    s3.074,6.866,6.866,6.866s6.866-3.074,6.866-6.866S752.663,360.746,748.871,360.746z M748.871,292.661    c-41.394,0-74.95,33.557-74.95,74.951s33.557,74.951,74.95,74.951c41.395,0,74.951-33.557,74.951-74.951    S790.266,292.661,748.871,292.661z M748.871,421.148c-29.567,0-53.536-23.969-53.536-53.536s23.969-53.536,53.536-53.536    s53.536,23.969,53.536,53.536S778.438,421.148,748.871,421.148z M937.635,346.594c1.578,1.175-15.13-18.556-25.573-26    c-16.99-12.11-155.921-68.603-256.158-80.555c6.725,0.802-17.57-0.149-23.868-4.688c-4.812-3.468-8.588-8.741-13.213-12.36    c-14.177-11.093-59.156-48.183-82.261-61.376c-2.465-1.407-6.54-1.828-8.95-2.558c-1.324-0.4-11.122-0.132-8.524,0    c-44.285-2.256-106.493-1.794-152.587,10.656c-4.209,1.137-30.368,8.089-48.589,15.344c-5.724,2.278-12.226,4.007-19.18,6.819    c-20.012,8.093-38.345,15.188-57.54,23.868c-11.419,5.165-30.696,14.476-28.13,14.065c-1.611,0.257-3.312-2.109-5.967-1.278    c-5.653,1.768-11.529,6.517-16.623,8.098c-4.053,1.259-25.214,0.021-31.54-7.246c-6.711-7.708-8.796-3.008-20.033-4.688    c9.422,1.408-66.962-4.819-69.474-3.41c-7.891-1.1-3.403,4.299-3.41,5.114c2.299,2.393,3.725,5.662,6.393,7.672    c9.392,7.075,35.363,33.205,37.082,34.95c3.051,3.1,5.275,7.363,8.95,9.804c-0.142,0.426-0.284,0.852-0.426,1.278    c-5.36,1.6-8.503,7.122-12.786,9.803c-8.165,5.111-14.437,12.33-17.049,23.016c0,6.251,0,12.504,0,18.754    c-7.517,0.259-15.208,2.511-21.737,4.263c-4.043,1.084-7.959-0.34-8.098,4.688c-1.802,3.203-0.459,19.141-0.426,24.294    c6.73,4.299,14.264,8.488,21.737,12.36c20.915,10.838,14.065,21.312,14.065,21.312h109.806V363    c0-40.017,32.44-72.457,72.458-72.457h7.107c40.017,0,72.458,32.44,72.458,72.457v35.593h316.817V363    c0-40.017,32.44-72.457,72.458-72.457h8.384c40.018,0,72.458,32.44,72.458,72.457v35.593h37.381c0,0,46.533-0.426,69.9-0.427    c2.136-1.928,6.301-4.372-1.279-11.508c3.559,3.35,5.498-17.201,4.688-30.262c0.284,0,0.568,0,0.853,0    C943.264,352.759,943.868,351.235,937.635,346.594z M388.168,247.711c-0.261,0-0.521,0-0.783,0    c-0.896,0.57-4.825,0.413-4.552,0.416c-24.338-0.919-69.602,2.784-101.15-5.957c-0.821-1.008-1.016-3.081-0.853-3.41    c1.89-7.701,14.557-10.835,21.737-14.491c8.349-4.251,54.001-22.514,68.195-24.721    C377.049,215.943,387.186,245.746,388.168,247.711c0.023,0,0.047,0,0.069,0C388.261,247.852,388.235,247.846,388.168,247.711z     M530.595,248.563c0,0.142,0,0.426,0,0.426H398.893c0,0-12.664-38.209-18.327-50.294c0.753-0.409,0.717-0.536,1.705-0.853    c31.656-14.891,97.021-12.814,119.768-11.934c7.472,13.752,13.626,28.483,20.032,43.048c2.401,5.46,8.331,13.33,8.951,19.606    C530.879,248.563,530.737,248.563,530.595,248.563z M580.463,248.776c-18.3,0-29.133-0.139-43.901-0.213    c-11.222-26.264-24.004-48.287-28.13-61.376c0.658-1.125,1.651-0.93,3.409-0.853c0.641-0.288,2.163-0.012,3.836,0    c8.798,0.062,10.622,6.462,16.197,10.655c6.241,4.695,11.165,10.716,16.622,16.196c9.058,9.099,16.826,16.37,25.999,26.426    c2.14,2.345,3.659,5.085,5.968,7.246C580.463,247.284,580.463,248.35,580.463,248.776z M621.38,242.596    c-3.147,0.942-6.108,0.679-8.951,1.705c-0.562-5.606-5.075-16.551-10.229-17.049c-1.076-0.786-14.896-1.694-16.623-0.853    c-1.051,0.52-0.657,0.754-1.705,1.279c2.474,3.117-9.226-5.693-45.605-47.737c-0.716-0.827-3.147-2.229-2.131-3.409    c1.079-2.12,6.87-4.115,9.803-4.263c48.404,34.093,66.753,50.191,86.097,66.917C628.61,239.973,624.676,241.609,621.38,242.596z     M382.833,248.127c0.095,0.004,0.196,0.006,0.29,0.01C382.95,248.13,382.866,248.128,382.833,248.127z M727.32,375.324h-23.572    c1.169,6.894,3.881,13.262,7.766,18.738l16.668-16.668C727.862,376.722,727.573,376.031,727.32,375.324z M748.871,354.992    c1.607,0,2.91-1.303,2.91-2.91s-1.303-2.91-2.91-2.91s-2.91,1.303-2.91,2.91S747.264,354.992,748.871,354.992z M775.321,330.255    c-5.477-3.885-11.845-6.596-18.737-7.766v23.572c0.707,0.253,1.397,0.542,2.07,0.86L775.321,330.255z M761.49,367.611    c0,1.607,1.303,2.91,2.91,2.91s2.91-1.303,2.91-2.91s-1.303-2.91-2.91-2.91S761.49,366.004,761.49,367.611z M736.252,367.611    c0-1.607-1.303-2.91-2.91-2.91c-1.606,0-2.91,1.303-2.91,2.91s1.304,2.91,2.91,2.91    C734.949,370.521,736.252,369.219,736.252,367.611z M739.09,346.924c0.673-0.319,1.362-0.609,2.069-0.862v-23.572    c-6.893,1.17-13.26,3.882-18.737,7.767L739.09,346.924z M748.871,380.23c-1.607,0-2.91,1.303-2.91,2.91s1.303,2.91,2.91,2.91    s2.91-1.303,2.91-2.91S750.479,380.23,748.871,380.23z M722.42,404.97c5.478,3.885,11.846,6.596,18.739,7.766v-23.572    c-0.707-0.253-1.398-0.542-2.071-0.861L722.42,404.97z" fill="${t}"/></g></g></svg>`}}},846:function(t,e,n){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=r(n(263)),a=r(n(786)),s=r(n(957));e.default=class{constructor(t){this.carData=t;const{name:e,color:n,id:r}=t;this.name=e,this.color=n,this.id=r.toString(),this.startButton=new o.default("start",this.id),this.stopButton=new o.default("stop",this.id),this.deleteButton=new o.default("delete",this.id),this.updateForm=new a.default("update",this.id),this.cars=new s.default}getTrackContainer(){const t=document.createElement("div");return t.className="container-track",t.setAttribute("id",this.id),t.append(this.getCarNameContainer()),t.append(this.getCarButtons()),t.append(this.getRaceContainer()),t.append(this.getRoadContainer()),t}getRaceContainer(){const t=document.createElement("div");t.className="container-car-race";const e=document.createElement("div");return e.className="car-race",t.append(e),t}getCarNameContainer(){const t=document.createElement("div");t.className="container-car-name";const e=document.createElement("div");return e.className="car-name_title",e.innerText=`#${this.id} - Model: ${this.name}, Color: ${this.color}`,t.append(e),t}getCarButtons(){const t=document.createElement("div");return t.className="container-buttons",this.updateForm.setData(this.carData),this.startButton.init(t),this.stopButton.init(t),this.deleteButton.init(t),this.updateForm.init(t),t}getRoadContainer(){const t=this.getHTMLElement("div","container-road"),e=this.getLine(),n=this.getHTMLElement("div","container-svg");return n.innerHTML=this.cars.getSportcar(this.color),t.append(n),t.append(e),t}getLine(){return this.getHTMLElement("div","line")}getHTMLElement(t,e){const n=document.createElement(t);return n.className=`${e}`,n}}},792:function(t,e,n){var r=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(o,a){function s(t){try{c(r.next(t))}catch(t){a(t)}}function i(t){try{c(r.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,i)}c((r=r.apply(t,e||[])).next())}))},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=o(n(153)),s=o(n(846));e.default=class{constructor(){this.controller=new a.default,this.trackElements=[],this.rerenderCallback=()=>null,this.element=this.getContainer()}setRerenderCallback(t){this.rerenderCallback=t}init(t){return r(this,void 0,void 0,(function*(){this.element.innerHTML="";const e=yield this.controller.getCarsCount(),n=yield this.controller.getCarsCurrentPage();console.log("## TRacks init()",n);const r=this.getTitle(`Garage contains ${e} cars. Box: ${n}.`);this.element.append(r);const o=yield this.getCars(yield this.getCarsCurrentPage()),a=this.createTrackElements(o);this.renderCars(a),t.append(this.element)}))}getContainer(){return this.getHTMLElement("div","tracks")}getTitle(t){const e=this.getHTMLElement("div","container-title"),n=this.getHTMLElement("h2","tracks-title_text");return n.innerText=t,e.append(n),e}renderCars(t){t.forEach((t=>{this.element.append(t)}))}createTrackElements(t){const e=[];return null==t||t.data.forEach((t=>{const n=new s.default(t),r=n.getTrackContainer();n.deleteButton.controller.subscribe(this.rerenderCallback),n.updateForm.controller.subscribe(this.rerenderCallback),e.push(r)})),this.trackElements=e,e}rerender(t,e){return r(this,void 0,void 0,(function*(){0!==e&&(yield this.getCars(e),this.element.outerHTML="",this.element=this.getContainer(),this.init(t))}))}getCars(t){return r(this,void 0,void 0,(function*(){return yield this.controller.getCars(t)}))}getCarsCurrentPage(){return r(this,void 0,void 0,(function*(){return yield this.controller.getCarsCurrentPage()}))}getHTMLElement(t,e){const n=document.createElement(t);return n.className=`${e}`,n}}},113:function(t,e,n){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=r(n(684)),a=r(n(850));e.default=class{constructor(){this.nav=new o.default,this.main=new a.default,this.subscribeMainToNav()}render(){this.nav.render(),this.main.render()}subscribeMainToNav(){this.nav.controller.subscribe((t=>this.main.setData(t))),this.nav.controller.subscribe((()=>this.main.render()))}}},183:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(){const t=document.createElement("div");this.winners=t}render(t){const e=this.getHTMLElement("div","winners");e.innerText="Winners!",this.winners.append(e),t.append(this.winners)}getHTMLElement(t,e){const n=document.createElement(t);return n.className=`${e}`,n}clear(){this.winners.innerHTML=""}}},607:function(t,e,n){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),(new(r(n(717)).default)).start()}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var a=e[r]={id:r,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.nc=void 0,n(607)})();