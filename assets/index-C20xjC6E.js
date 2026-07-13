var Ow=Object.defineProperty;var Vw=(n,t,e)=>t in n?Ow(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var j=(n,t,e)=>Vw(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();var _f={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fm=function(n){const t=[];let e=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Nw=function(n){const t=[];let e=0,i=0;for(;e<n.length;){const s=n[e++];if(s<128)t[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[e++];t[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[e++],a=n[e++],o=n[e++],l=((s&7)<<18|(r&63)<<12|(a&63)<<6|o&63)-65536;t[i++]=String.fromCharCode(55296+(l>>10)),t[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[e++],a=n[e++];t[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|a&63)}}return t.join("")},Bm={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],a=s+1<n.length,o=a?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,d=r>>2,h=(r&3)<<4|o>>4;let f=(o&15)<<2|c>>6,g=c&63;l||(g=64,a||(f=64)),i.push(e[d],e[h],e[f],e[g])}return i.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Fm(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Nw(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=e[n.charAt(s++)],o=s<n.length?e[n.charAt(s)]:0;++s;const c=s<n.length?e[n.charAt(s)]:64;++s;const h=s<n.length?e[n.charAt(s)]:64;if(++s,r==null||o==null||c==null||h==null)throw new Lw;const f=r<<2|o>>4;if(i.push(f),c!==64){const g=o<<4&240|c>>2;if(i.push(g),h!==64){const y=c<<6&192|h;i.push(y)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Lw extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Fw=function(n){const t=Fm(n);return Bm.encodeByteArray(t,!0)},Mo=function(n){return Fw(n).replace(/\./g,"")},Um=function(n){try{return Bm.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bw(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uw=()=>Bw().__FIREBASE_DEFAULTS__,jw=()=>{if(typeof process>"u"||typeof _f>"u")return;const n=_f.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},zw=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&Um(n[1]);return t&&JSON.parse(t)},ul=()=>{try{return Uw()||jw()||zw()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},jm=n=>{var t,e;return(e=(t=ul())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[n]},zm=n=>{const t=jm(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const i=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),i]:[t.substring(0,e),i]},$m=()=>{var n;return(n=ul())===null||n===void 0?void 0:n.config},Hm=n=>{var t;return(t=ul())===null||t===void 0?void 0:t[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $w{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,i)=>{e?this.reject(e):this.resolve(i),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hw(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},i=t||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Mo(JSON.stringify(e)),Mo(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function qw(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(zt())}function Ww(){var n;const t=(n=ul())===null||n===void 0?void 0:n.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Kw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Gw(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Yw(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Qw(){const n=zt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function qm(){return!Ww()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ju(){try{return typeof indexedDB=="object"}catch{return!1}}function Wm(){return new Promise((n,t)=>{try{let e=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var r;t(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(e){t(e)}})}function Jw(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xw="FirebaseError";class Be extends Error{constructor(t,e,i){super(e),this.code=t,this.customData=i,this.name=Xw,Object.setPrototypeOf(this,Be.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Fi.prototype.create)}}class Fi{constructor(t,e,i){this.service=t,this.serviceName=e,this.errors=i}create(t,...e){const i=e[0]||{},s=`${this.service}/${t}`,r=this.errors[t],a=r?Zw(r,i):"Error",o=`${this.serviceName}: ${a} (${s}).`;return new Be(s,o,i)}}function Zw(n,t){return n.replace(tI,(e,i)=>{const s=t[i];return s!=null?String(s):`<${i}?>`})}const tI=/\{\$([^}]+)}/g;function eI(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}function Oo(n,t){if(n===t)return!0;const e=Object.keys(n),i=Object.keys(t);for(const s of e){if(!i.includes(s))return!1;const r=n[s],a=t[s];if(bf(r)&&bf(a)){if(!Oo(r,a))return!1}else if(r!==a)return!1}for(const s of i)if(!e.includes(s))return!1;return!0}function bf(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ra(n){const t=[];for(const[e,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(s))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(i));return t.length?"&"+t.join("&"):""}function cr(n){const t={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[s,r]=i.split("=");t[decodeURIComponent(s)]=decodeURIComponent(r)}}),t}function ur(n){const t=n.indexOf("?");if(!t)return"";const e=n.indexOf("#",t);return n.substring(t,e>0?e:void 0)}function nI(n,t){const e=new iI(n,t);return e.subscribe.bind(e)}class iI{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(i=>{this.error(i)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,i){let s;if(t===void 0&&e===void 0&&i===void 0)throw new Error("Missing Observer.");sI(t,["next","error","complete"])?s=t:s={next:t,error:e,complete:i},s.next===void 0&&(s.next=gc),s.error===void 0&&(s.error=gc),s.complete===void 0&&(s.complete=gc);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function sI(n,t){if(typeof n!="object"||n===null)return!1;for(const e of t)if(e in n&&typeof n[e]=="function")return!0;return!1}function gc(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(n){return n&&n._delegate?n._delegate:n}class Ae{constructor(t,e,i){this.name=t,this.instanceFactory=e,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ci="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const i=new $w;if(this.instancesDeferred.set(e,i),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const i=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(e=t==null?void 0:t.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(oI(t))try{this.getOrInitializeService({instanceIdentifier:ci})}catch{}for(const[e,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(t=ci){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=ci){return this.instances.has(t)}getOptions(t=ci){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,i=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:e});for(const[r,a]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(r);i===o&&a.resolve(s)}return s}onInit(t,e){var i;const s=this.normalizeInstanceIdentifier(e),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(t),this.onInitCallbacks.set(s,r);const a=this.instances.get(s);return a&&t(a,s),()=>{r.delete(t)}}invokeOnInitCallbacks(t,e){const i=this.onInitCallbacks.get(e);if(i)for(const s of i)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let i=this.instances.get(t);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:aI(t),options:e}),this.instances.set(t,i),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(i,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,i)}catch{}return i||null}normalizeInstanceIdentifier(t=ci){return this.component?this.component.multipleInstances?t:ci:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function aI(n){return n===ci?void 0:n}function oI(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lI{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new rI(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var st;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(st||(st={}));const cI={debug:st.DEBUG,verbose:st.VERBOSE,info:st.INFO,warn:st.WARN,error:st.ERROR,silent:st.SILENT},uI=st.INFO,dI={[st.DEBUG]:"log",[st.VERBOSE]:"log",[st.INFO]:"info",[st.WARN]:"warn",[st.ERROR]:"error"},hI=(n,t,...e)=>{if(t<n.logLevel)return;const i=new Date().toISOString(),s=dI[t];if(s)console[s](`[${i}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class zu{constructor(t){this.name=t,this._logLevel=uI,this._logHandler=hI,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in st))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?cI[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,st.DEBUG,...t),this._logHandler(this,st.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,st.VERBOSE,...t),this._logHandler(this,st.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,st.INFO,...t),this._logHandler(this,st.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,st.WARN,...t),this._logHandler(this,st.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,st.ERROR,...t),this._logHandler(this,st.ERROR,...t)}}const fI=(n,t)=>t.some(e=>n instanceof e);let vf,wf;function pI(){return vf||(vf=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function gI(){return wf||(wf=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Km=new WeakMap,Kc=new WeakMap,Gm=new WeakMap,mc=new WeakMap,$u=new WeakMap;function mI(n){const t=new Promise((e,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",a)},r=()=>{e(pn(n.result)),s()},a=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&Km.set(e,n)}).catch(()=>{}),$u.set(t,n),t}function yI(n){if(Kc.has(n))return;const t=new Promise((e,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",a),n.removeEventListener("abort",a)},r=()=>{e(),s()},a=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",a),n.addEventListener("abort",a)});Kc.set(n,t)}let Gc={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Kc.get(n);if(t==="objectStoreNames")return n.objectStoreNames||Gm.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return pn(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function _I(n){Gc=n(Gc)}function bI(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const i=n.call(yc(this),t,...e);return Gm.set(i,t.sort?t.sort():[t]),pn(i)}:gI().includes(n)?function(...t){return n.apply(yc(this),t),pn(Km.get(this))}:function(...t){return pn(n.apply(yc(this),t))}}function vI(n){return typeof n=="function"?bI(n):(n instanceof IDBTransaction&&yI(n),fI(n,pI())?new Proxy(n,Gc):n)}function pn(n){if(n instanceof IDBRequest)return mI(n);if(mc.has(n))return mc.get(n);const t=vI(n);return t!==n&&(mc.set(n,t),$u.set(t,n)),t}const yc=n=>$u.get(n);function dl(n,t,{blocked:e,upgrade:i,blocking:s,terminated:r}={}){const a=indexedDB.open(n,t),o=pn(a);return i&&a.addEventListener("upgradeneeded",l=>{i(pn(a.result),l.oldVersion,l.newVersion,pn(a.transaction),l)}),e&&a.addEventListener("blocked",l=>e(l.oldVersion,l.newVersion,l)),o.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),o}function _c(n,{blocked:t}={}){const e=indexedDB.deleteDatabase(n);return t&&e.addEventListener("blocked",i=>t(i.oldVersion,i)),pn(e).then(()=>{})}const wI=["get","getKey","getAll","getAllKeys","count"],II=["put","add","delete","clear"],bc=new Map;function If(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(bc.get(t))return bc.get(t);const e=t.replace(/FromIndex$/,""),i=t!==e,s=II.includes(e);if(!(e in(i?IDBIndex:IDBObjectStore).prototype)||!(s||wI.includes(e)))return;const r=async function(a,...o){const l=this.transaction(a,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(o.shift())),(await Promise.all([c[e](...o),s&&l.done]))[0]};return bc.set(t,r),r}_I(n=>({...n,get:(t,e,i)=>If(t,e)||n.get(t,e,i),has:(t,e)=>!!If(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TI{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(EI(e)){const i=e.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(e=>e).join(" ")}}function EI(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Yc="@firebase/app",Tf="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yn=new zu("@firebase/app"),xI="@firebase/app-compat",kI="@firebase/analytics-compat",AI="@firebase/analytics",SI="@firebase/app-check-compat",PI="@firebase/app-check",RI="@firebase/auth",CI="@firebase/auth-compat",DI="@firebase/database",MI="@firebase/data-connect",OI="@firebase/database-compat",VI="@firebase/functions",NI="@firebase/functions-compat",LI="@firebase/installations",FI="@firebase/installations-compat",BI="@firebase/messaging",UI="@firebase/messaging-compat",jI="@firebase/performance",zI="@firebase/performance-compat",$I="@firebase/remote-config",HI="@firebase/remote-config-compat",qI="@firebase/storage",WI="@firebase/storage-compat",KI="@firebase/firestore",GI="@firebase/vertexai-preview",YI="@firebase/firestore-compat",QI="firebase",JI="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qc="[DEFAULT]",XI={[Yc]:"fire-core",[xI]:"fire-core-compat",[AI]:"fire-analytics",[kI]:"fire-analytics-compat",[PI]:"fire-app-check",[SI]:"fire-app-check-compat",[RI]:"fire-auth",[CI]:"fire-auth-compat",[DI]:"fire-rtdb",[MI]:"fire-data-connect",[OI]:"fire-rtdb-compat",[VI]:"fire-fn",[NI]:"fire-fn-compat",[LI]:"fire-iid",[FI]:"fire-iid-compat",[BI]:"fire-fcm",[UI]:"fire-fcm-compat",[jI]:"fire-perf",[zI]:"fire-perf-compat",[$I]:"fire-rc",[HI]:"fire-rc-compat",[qI]:"fire-gcs",[WI]:"fire-gcs-compat",[KI]:"fire-fst",[YI]:"fire-fst-compat",[GI]:"fire-vertex","fire-js":"fire-js",[QI]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo=new Map,ZI=new Map,Jc=new Map;function Ef(n,t){try{n.container.addComponent(t)}catch(e){yn.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Ne(n){const t=n.name;if(Jc.has(t))return yn.debug(`There were multiple attempts to register component ${t}.`),!1;Jc.set(t,n);for(const e of Vo.values())Ef(e,n);for(const e of ZI.values())Ef(e,n);return!0}function Bi(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function ze(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tT={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},jn=new Fi("app","Firebase",tT);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eT{constructor(t,e,i){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Ae("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw jn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs=JI;function Hu(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const i=Object.assign({name:Qc,automaticDataCollectionEnabled:!1},t),s=i.name;if(typeof s!="string"||!s)throw jn.create("bad-app-name",{appName:String(s)});if(e||(e=$m()),!e)throw jn.create("no-options");const r=Vo.get(s);if(r){if(Oo(e,r.options)&&Oo(i,r.config))return r;throw jn.create("duplicate-app",{appName:s})}const a=new lI(s);for(const l of Jc.values())a.addComponent(l);const o=new eT(e,i,a);return Vo.set(s,o),o}function hl(n=Qc){const t=Vo.get(n);if(!t&&n===Qc&&$m())return Hu();if(!t)throw jn.create("no-app",{appName:n});return t}function ye(n,t,e){var i;let s=(i=XI[n])!==null&&i!==void 0?i:n;e&&(s+=`-${e}`);const r=s.match(/\s|\//),a=t.match(/\s|\//);if(r||a){const o=[`Unable to register library "${s}" with version "${t}":`];r&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&a&&o.push("and"),a&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),yn.warn(o.join(" "));return}Ne(new Ae(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nT="firebase-heartbeat-database",iT=1,Or="firebase-heartbeat-store";let vc=null;function Ym(){return vc||(vc=dl(nT,iT,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Or)}catch(e){console.warn(e)}}}}).catch(n=>{throw jn.create("idb-open",{originalErrorMessage:n.message})})),vc}async function sT(n){try{const e=(await Ym()).transaction(Or),i=await e.objectStore(Or).get(Qm(n));return await e.done,i}catch(t){if(t instanceof Be)yn.warn(t.message);else{const e=jn.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});yn.warn(e.message)}}}async function xf(n,t){try{const i=(await Ym()).transaction(Or,"readwrite");await i.objectStore(Or).put(t,Qm(n)),await i.done}catch(e){if(e instanceof Be)yn.warn(e.message);else{const i=jn.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});yn.warn(i.message)}}}function Qm(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rT=1024,aT=30*24*60*60*1e3;class oT{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new cT(e),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=kf();return((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(a=>a.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const o=new Date(a.date).valueOf();return Date.now()-o<=aT}),this._storage.overwrite(this._heartbeatsCache))}catch(i){yn.warn(i)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=kf(),{heartbeatsToSend:i,unsentEntries:s}=lT(this._heartbeatsCache.heartbeats),r=Mo(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return yn.warn(e),""}}}function kf(){return new Date().toISOString().substring(0,10)}function lT(n,t=rT){const e=[];let i=n.slice();for(const s of n){const r=e.find(a=>a.agent===s.agent);if(r){if(r.dates.push(s.date),Af(e)>t){r.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),Af(e)>t){e.pop();break}i=i.slice(1)}return{heartbeatsToSend:e,unsentEntries:i}}class cT{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ju()?Wm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await sT(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return xf(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return xf(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function Af(n){return Mo(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uT(n){Ne(new Ae("platform-logger",t=>new TI(t),"PRIVATE")),Ne(new Ae("heartbeat",t=>new oT(t),"PRIVATE")),ye(Yc,Tf,n),ye(Yc,Tf,"esm2017"),ye("fire-js","")}uT("");var dT="firebase",hT="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ye(dT,hT,"app");function qu(n,t){var e={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&t.indexOf(i)<0&&(e[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(n);s<i.length;s++)t.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(n,i[s])&&(e[i[s]]=n[i[s]]);return e}function Jm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const fT=Jm,Xm=new Fi("auth","Firebase",Jm());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const No=new zu("@firebase/auth");function pT(n,...t){No.logLevel<=st.WARN&&No.warn(`Auth (${Rs}): ${n}`,...t)}function co(n,...t){No.logLevel<=st.ERROR&&No.error(`Auth (${Rs}): ${n}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Le(n,...t){throw Wu(n,...t)}function qe(n,...t){return Wu(n,...t)}function Zm(n,t,e){const i=Object.assign(Object.assign({},fT()),{[t]:e});return new Fi("auth","Firebase",i).create(t,{appName:n.name})}function gn(n){return Zm(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Wu(n,...t){if(typeof n!="string"){const e=t[0],i=[...t.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(e,...i)}return Xm.create(n,...t)}function Y(n,t,...e){if(!n)throw Wu(t,...e)}function an(n){const t="INTERNAL ASSERTION FAILED: "+n;throw co(t),new Error(t)}function _n(n,t){n||an(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function gT(){return Sf()==="http:"||Sf()==="https:"}function Sf(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mT(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(gT()||Gw()||"connection"in navigator)?navigator.onLine:!0}function yT(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(t,e){this.shortDelay=t,this.longDelay=e,_n(e>t,"Short delay should be less than long delay!"),this.isMobile=qw()||Yw()}get(){return mT()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ku(n,t){_n(n.emulator,"Emulator should always be set here");const{url:e}=n.emulator;return t?`${e}${t.startsWith("/")?t.slice(1):t}`:e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ty{static initialize(t,e,i){this.fetchImpl=t,e&&(this.headersImpl=e),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;an("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;an("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;an("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _T={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bT=new aa(3e4,6e4);function Qn(n,t){return n.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:n.tenantId}):t}async function vn(n,t,e,i,s={}){return ey(n,s,async()=>{let r={},a={};i&&(t==="GET"?a=i:r={body:JSON.stringify(i)});const o=ra(Object.assign({key:n.config.apiKey},a)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const c=Object.assign({method:t,headers:l},r);return Kw()||(c.referrerPolicy="no-referrer"),ty.fetch()(ny(n,n.config.apiHost,e,o),c)})}async function ey(n,t,e){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},_T),t);try{const s=new wT(n),r=await Promise.race([e(),s.promise]);s.clearNetworkTimeout();const a=await r.json();if("needConfirmation"in a)throw za(n,"account-exists-with-different-credential",a);if(r.ok&&!("errorMessage"in a))return a;{const o=r.ok?a.errorMessage:a.error.message,[l,c]=o.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw za(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw za(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw za(n,"user-disabled",a);const d=i[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Zm(n,d,c);Le(n,d)}}catch(s){if(s instanceof Be)throw s;Le(n,"network-request-failed",{message:String(s)})}}async function oa(n,t,e,i,s={}){const r=await vn(n,t,e,i,s);return"mfaPendingCredential"in r&&Le(n,"multi-factor-auth-required",{_serverResponse:r}),r}function ny(n,t,e,i){const s=`${t}${e}?${i}`;return n.config.emulator?Ku(n.config,s):`${n.config.apiScheme}://${s}`}function vT(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class wT{constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((e,i)=>{this.timer=setTimeout(()=>i(qe(this.auth,"network-request-failed")),bT.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function za(n,t,e){const i={appName:n.name};e.email&&(i.email=e.email),e.phoneNumber&&(i.phoneNumber=e.phoneNumber);const s=qe(n,t,i);return s.customData._tokenResponse=e,s}function Pf(n){return n!==void 0&&n.enterprise!==void 0}class IT{constructor(t){if(this.siteKey="",this.recaptchaEnforcementState=[],t.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=t.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=t.recaptchaEnforcementState}getProviderEnforcementState(t){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const e of this.recaptchaEnforcementState)if(e.provider&&e.provider===t)return vT(e.enforcementState);return null}isProviderEnabled(t){return this.getProviderEnforcementState(t)==="ENFORCE"||this.getProviderEnforcementState(t)==="AUDIT"}}async function TT(n,t){return vn(n,"GET","/v2/recaptchaConfig",Qn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ET(n,t){return vn(n,"POST","/v1/accounts:delete",t)}async function iy(n,t){return vn(n,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wr(n){if(n)try{const t=new Date(Number(n));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function xT(n,t=!1){const e=yt(n),i=await e.getIdToken(t),s=Gu(i);Y(s&&s.exp&&s.auth_time&&s.iat,e.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,a=r==null?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:wr(wc(s.auth_time)),issuedAtTime:wr(wc(s.iat)),expirationTime:wr(wc(s.exp)),signInProvider:a||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function wc(n){return Number(n)*1e3}function Gu(n){const[t,e,i]=n.split(".");if(t===void 0||e===void 0||i===void 0)return co("JWT malformed, contained fewer than 3 sections"),null;try{const s=Um(e);return s?JSON.parse(s):(co("Failed to decode base64 JWT payload"),null)}catch(s){return co("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Rf(n){const t=Gu(n);return Y(t,"internal-error"),Y(typeof t.exp<"u","internal-error"),Y(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ys(n,t,e=!1){if(e)return t;try{return await t}catch(i){throw i instanceof Be&&kT(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function kT({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AT{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){var e;if(t){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((e=this.user.stsTokenManager.expirationTime)!==null&&e!==void 0?e:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=wr(this.lastLoginAt),this.creationTime=wr(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lo(n){var t;const e=n.auth,i=await n.getIdToken(),s=await ys(n,iy(e,{idToken:i}));Y(s==null?void 0:s.users.length,e,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const a=!((t=r.providerUserInfo)===null||t===void 0)&&t.length?sy(r.providerUserInfo):[],o=PT(n.providerData,a),l=n.isAnonymous,c=!(n.email&&r.passwordHash)&&!(o!=null&&o.length),d=l?c:!1,h={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new Zc(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(n,h)}async function ST(n){const t=yt(n);await Lo(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function PT(n,t){return[...n.filter(i=>!t.some(s=>s.providerId===i.providerId)),...t]}function sy(n){return n.map(t=>{var{providerId:e}=t,i=qu(t,["providerId"]);return{providerId:e,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RT(n,t){const e=await ey(n,{},async()=>{const i=ra({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,a=ny(n,s,"/v1/token",`key=${r}`),o=await n._getAdditionalHeaders();return o["Content-Type"]="application/x-www-form-urlencoded",ty.fetch()(a,{method:"POST",headers:o,body:i})});return{accessToken:e.access_token,expiresIn:e.expires_in,refreshToken:e.refresh_token}}async function CT(n,t){return vn(n,"POST","/v2/accounts:revokeToken",Qn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){Y(t.idToken,"internal-error"),Y(typeof t.idToken<"u","internal-error"),Y(typeof t.refreshToken<"u","internal-error");const e="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):Rf(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,e)}updateFromIdToken(t){Y(t.length!==0,"internal-error");const e=Rf(t);this.updateTokensAndExpiration(t,null,e)}async getToken(t,e=!1){return!e&&this.accessToken&&!this.isExpired?this.accessToken:(Y(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,e){const{accessToken:i,refreshToken:s,expiresIn:r}=await RT(t,e);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(t,e,i){this.refreshToken=e||null,this.accessToken=t||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(t,e){const{refreshToken:i,accessToken:s,expirationTime:r}=e,a=new us;return i&&(Y(typeof i=="string","internal-error",{appName:t}),a.refreshToken=i),s&&(Y(typeof s=="string","internal-error",{appName:t}),a.accessToken=s),r&&(Y(typeof r=="number","internal-error",{appName:t}),a.expirationTime=r),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new us,this.toJSON())}_performRefresh(){return an("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kn(n,t){Y(typeof n=="string"||typeof n>"u","internal-error",{appName:t})}class on{constructor(t){var{uid:e,auth:i,stsTokenManager:s}=t,r=qu(t,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new AT(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Zc(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(t){const e=await ys(this,this.stsTokenManager.getToken(this.auth,t));return Y(e,this.auth,"internal-error"),this.accessToken!==e&&(this.accessToken=e,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),e}getIdTokenResult(t){return xT(this,t)}reload(){return ST(this)}_assign(t){this!==t&&(Y(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(e=>Object.assign({},e)),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const e=new on(Object.assign(Object.assign({},this),{auth:t,stsTokenManager:this.stsTokenManager._clone()}));return e.metadata._copy(this.metadata),e}_onReload(t){Y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,e=!1){let i=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),i=!0),e&&await Lo(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ze(this.auth.app))return Promise.reject(gn(this.auth));const t=await this.getIdToken();return await ys(this,ET(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>Object.assign({},t)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,e){var i,s,r,a,o,l,c,d;const h=(i=e.displayName)!==null&&i!==void 0?i:void 0,f=(s=e.email)!==null&&s!==void 0?s:void 0,g=(r=e.phoneNumber)!==null&&r!==void 0?r:void 0,y=(a=e.photoURL)!==null&&a!==void 0?a:void 0,v=(o=e.tenantId)!==null&&o!==void 0?o:void 0,w=(l=e._redirectEventId)!==null&&l!==void 0?l:void 0,A=(c=e.createdAt)!==null&&c!==void 0?c:void 0,S=(d=e.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:P,emailVerified:D,isAnonymous:M,providerData:C,stsTokenManager:I}=e;Y(P&&I,t,"internal-error");const _=us.fromJSON(this.name,I);Y(typeof P=="string",t,"internal-error"),kn(h,t.name),kn(f,t.name),Y(typeof D=="boolean",t,"internal-error"),Y(typeof M=="boolean",t,"internal-error"),kn(g,t.name),kn(y,t.name),kn(v,t.name),kn(w,t.name),kn(A,t.name),kn(S,t.name);const b=new on({uid:P,auth:t,email:f,emailVerified:D,displayName:h,isAnonymous:M,photoURL:y,phoneNumber:g,tenantId:v,stsTokenManager:_,createdAt:A,lastLoginAt:S});return C&&Array.isArray(C)&&(b.providerData=C.map(E=>Object.assign({},E))),w&&(b._redirectEventId=w),b}static async _fromIdTokenResponse(t,e,i=!1){const s=new us;s.updateFromServerResponse(e);const r=new on({uid:e.localId,auth:t,stsTokenManager:s,isAnonymous:i});return await Lo(r),r}static async _fromGetAccountInfoResponse(t,e,i){const s=e.users[0];Y(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?sy(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),o=new us;o.updateFromIdToken(i);const l=new on({uid:s.localId,auth:t,stsTokenManager:o,isAnonymous:a}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Zc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(l,c),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cf=new Map;function ln(n){_n(n instanceof Function,"Expected a class definition");let t=Cf.get(n);return t?(_n(t instanceof n,"Instance stored in cache mismatched with class"),t):(t=new n,Cf.set(n,t),t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ry{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return e===void 0?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}}ry.type="NONE";const Df=ry;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uo(n,t,e){return`firebase:${n}:${t}:${e}`}class ds{constructor(t,e,i){this.persistence=t,this.auth=e,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=uo(this.userKey,s.apiKey,r),this.fullPersistenceKey=uo("persistence",s.apiKey,r),this.boundEventHandler=e._onStorageEvent.bind(e),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);return t?on._fromJSON(this.auth,t):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const e=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,e)return this.setCurrentUser(e)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,e,i="authUser"){if(!e.length)return new ds(ln(Df),t,i);const s=(await Promise.all(e.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=s[0]||ln(Df);const a=uo(i,t.config.apiKey,t.name);let o=null;for(const c of e)try{const d=await c._get(a);if(d){const h=on._fromJSON(t,d);c!==r&&(o=h),r=c;break}}catch{}const l=s.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new ds(r,t,i):(r=l[0],o&&await r._set(a,o.toJSON()),await Promise.all(e.map(async c=>{if(c!==r)try{await c._remove(a)}catch{}})),new ds(r,t,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mf(n){const t=n.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(cy(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(ay(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(dy(t))return"Blackberry";if(hy(t))return"Webos";if(oy(t))return"Safari";if((t.includes("chrome/")||ly(t))&&!t.includes("edge/"))return"Chrome";if(uy(t))return"Android";{const e=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(e);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function ay(n=zt()){return/firefox\//i.test(n)}function oy(n=zt()){const t=n.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function ly(n=zt()){return/crios\//i.test(n)}function cy(n=zt()){return/iemobile/i.test(n)}function uy(n=zt()){return/android/i.test(n)}function dy(n=zt()){return/blackberry/i.test(n)}function hy(n=zt()){return/webos/i.test(n)}function Yu(n=zt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function DT(n=zt()){var t;return Yu(n)&&!!(!((t=window.navigator)===null||t===void 0)&&t.standalone)}function MT(){return Qw()&&document.documentMode===10}function fy(n=zt()){return Yu(n)||uy(n)||hy(n)||dy(n)||/windows phone/i.test(n)||cy(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function py(n,t=[]){let e;switch(n){case"Browser":e=Mf(zt());break;case"Worker":e=`${Mf(zt())}-${n}`;break;default:e=n}const i=t.length?t.join(","):"FirebaseCore-web";return`${e}/JsCore/${Rs}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OT{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,e){const i=r=>new Promise((a,o)=>{try{const l=t(r);a(l)}catch(l){o(l)}});i.onAbort=e,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const e=[];try{for(const i of this.queue)await i(t),i.onAbort&&e.push(i.onAbort)}catch(i){e.reverse();for(const s of e)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VT(n,t={}){return vn(n,"GET","/v2/passwordPolicy",Qn(n,t))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NT=6;class LT{constructor(t){var e,i,s,r;const a=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(e=a.minPasswordLength)!==null&&e!==void 0?e:NT,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=t.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(r=t.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=t.schemaVersion}validatePassword(t){var e,i,s,r,a,o;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,l),this.validatePasswordCharacterOptions(t,l),l.isValid&&(l.isValid=(e=l.meetsMinPasswordLength)!==null&&e!==void 0?e:!0),l.isValid&&(l.isValid=(i=l.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(r=l.containsUppercaseLetter)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(a=l.containsNumericCharacter)!==null&&a!==void 0?a:!0),l.isValid&&(l.isValid=(o=l.containsNonAlphanumericCharacter)!==null&&o!==void 0?o:!0),l}validatePasswordLengthOptions(t,e){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(e.meetsMinPasswordLength=t.length>=i),s&&(e.meetsMaxPasswordLength=t.length<=s)}validatePasswordCharacterOptions(t,e){this.updatePasswordCharacterOptionsStatuses(e,!1,!1,!1,!1);let i;for(let s=0;s<t.length;s++)i=t.charAt(s),this.updatePasswordCharacterOptionsStatuses(e,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(t,e,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=e)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FT{constructor(t,e,i,s){this.app=t,this.heartbeatServiceProvider=e,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Of(this),this.idTokenSubscription=new Of(this),this.beforeStateQueue=new OT(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Xm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=ln(e)),this._initializationPromise=this.queue(async()=>{var i,s;if(!this._deleted&&(this.persistenceManager=await ds.create(this,t),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(e),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const e=await iy(this,{idToken:t}),i=await on._fromGetAccountInfoResponse(this,e,t);await this.directlySetCurrentUser(i)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var e;if(ze(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(o,o))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,r=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(e=this.redirectUser)===null||e===void 0?void 0:e._redirectEventId,o=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(t);(!a||a===o)&&(l!=null&&l.user)&&(s=l.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await Lo(t)}catch(e){if((e==null?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=yT()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(ze(this.app))return Promise.reject(gn(this));const e=t?yt(t):null;return e&&Y(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t,e=!1){if(!this._deleted)return t&&Y(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),e||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return ze(this.app)?Promise.reject(gn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return ze(this.app)?Promise.reject(gn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ln(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const e=this._getPasswordPolicyInternal();return e.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):e.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await VT(this),e=new LT(t);this.tenantId===null?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(t){this._errorFactory=new Fi("auth","Firebase",t())}onAuthStateChanged(t,e,i){return this.registerStateListener(this.authStateSubscription,t,e,i)}beforeAuthStateChanged(t,e){return this.beforeStateQueue.pushCallback(t,e)}onIdTokenChanged(t,e,i){return this.registerStateListener(this.idTokenSubscription,t,e,i)}authStateReady(){return new Promise((t,e)=>{if(this.currentUser)t();else{const i=this.onAuthStateChanged(()=>{i(),t()},e)}})}async revokeAccessToken(t){if(this.currentUser){const e=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:e};this.tenantId!=null&&(i.tenantId=this.tenantId),await CT(this,i)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)===null||t===void 0?void 0:t.toJSON()}}async _setRedirectUser(t,e){const i=await this.getOrInitRedirectPersistenceManager(e);return t===null?i.removeCurrentUser():i.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&ln(t)||this._popupRedirectResolver;Y(e,this,"argument-error"),this.redirectPersistenceManager=await ds.create(this,[ln(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var e,i;return this._isInitialized&&await this.queue(async()=>{}),((e=this._currentUser)===null||e===void 0?void 0:e._redirectEventId)===t?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t,e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(e=(t=this.currentUser)===null||t===void 0?void 0:t.uid)!==null&&e!==void 0?e:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,i,s){if(this._deleted)return()=>{};const r=typeof e=="function"?e:e.next.bind(e);let a=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(Y(o,this,"internal-error"),o.then(()=>{a||r(this.currentUser)}),typeof e=="function"){const l=t.addObserver(e,i,s);return()=>{a=!0,l()}}else{const l=t.addObserver(e);return()=>{a=!0,l()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return Y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=py(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var t;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const i=await((t=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||t===void 0?void 0:t.getHeartbeatsHeader());i&&(e["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var t;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||t===void 0?void 0:t.getToken());return e!=null&&e.error&&pT(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Ui(n){return yt(n)}class Of{constructor(t){this.auth=t,this.observer=null,this.addObserver=nI(e=>this.observer=e)}get next(){return Y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function BT(n){fl=n}function gy(n){return fl.loadJS(n)}function UT(){return fl.recaptchaEnterpriseScript}function jT(){return fl.gapiScript}function zT(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const $T="recaptcha-enterprise",HT="NO_RECAPTCHA";class qT{constructor(t){this.type=$T,this.auth=Ui(t)}async verify(t="verify",e=!1){async function i(r){if(!e){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(a,o)=>{TT(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)o(new Error("recaptcha Enterprise site key undefined"));else{const c=new IT(l);return r.tenantId==null?r._agentRecaptchaConfig=c:r._tenantRecaptchaConfigs[r.tenantId]=c,a(c.siteKey)}}).catch(l=>{o(l)})})}function s(r,a,o){const l=window.grecaptcha;Pf(l)?l.enterprise.ready(()=>{l.enterprise.execute(r,{action:t}).then(c=>{a(c)}).catch(()=>{a(HT)})}):o(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((r,a)=>{i(this.auth).then(o=>{if(!e&&Pf(window.grecaptcha))s(o,r,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let l=UT();l.length!==0&&(l+=o),gy(l).then(()=>{s(o,r,a)}).catch(c=>{a(c)})}}).catch(o=>{a(o)})})}}async function Vf(n,t,e,i=!1){const s=new qT(n);let r;try{r=await s.verify(e)}catch{r=await s.verify(e,!0)}const a=Object.assign({},t);return i?Object.assign(a,{captchaResp:r}):Object.assign(a,{captchaResponse:r}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function tu(n,t,e,i){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const r=await Vf(n,t,e,e==="getOobCode");return i(n,r)}else return i(n,t).catch(async r=>{if(r.code==="auth/missing-recaptcha-token"){console.log(`${e} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await Vf(n,t,e,e==="getOobCode");return i(n,a)}else return Promise.reject(r)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WT(n,t){const e=Bi(n,"auth");if(e.isInitialized()){const s=e.getImmediate(),r=e.getOptions();if(Oo(r,t??{}))return s;Le(s,"already-initialized")}return e.initialize({options:t})}function KT(n,t){const e=(t==null?void 0:t.persistence)||[],i=(Array.isArray(e)?e:[e]).map(ln);t!=null&&t.errorMap&&n._updateErrorMap(t.errorMap),n._initializeWithPersistence(i,t==null?void 0:t.popupRedirectResolver)}function GT(n,t,e){const i=Ui(n);Y(i._canInitEmulator,i,"emulator-config-failed"),Y(/^https?:\/\//.test(t),i,"invalid-emulator-scheme");const s=!1,r=my(t),{host:a,port:o}=YT(t),l=o===null?"":`:${o}`;i.config.emulator={url:`${r}//${a}${l}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:a,port:o,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})}),QT()}function my(n){const t=n.indexOf(":");return t<0?"":n.substr(0,t+1)}function YT(n){const t=my(n),e=/(\/\/)?([^?#/]+)/.exec(n.substr(t.length));if(!e)return{host:"",port:null};const i=e[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:Nf(i.substr(r.length+1))}}else{const[r,a]=i.split(":");return{host:r,port:Nf(a)}}}function Nf(n){if(!n)return null;const t=Number(n);return isNaN(t)?null:t}function QT(){function n(){const t=document.createElement("p"),e=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",e.position="fixed",e.width="100%",e.backgroundColor="#ffffff",e.border=".1em solid #000000",e.color="#b50000",e.bottom="0px",e.left="0px",e.margin="0px",e.zIndex="10000",e.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(t,e){this.providerId=t,this.signInMethod=e}toJSON(){return an("not implemented")}_getIdTokenResponse(t){return an("not implemented")}_linkToIdToken(t,e){return an("not implemented")}_getReauthenticationResolver(t){return an("not implemented")}}async function JT(n,t){return vn(n,"POST","/v1/accounts:update",t)}async function XT(n,t){return vn(n,"POST","/v1/accounts:signUp",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ZT(n,t){return oa(n,"POST","/v1/accounts:signInWithPassword",Qn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function t0(n,t){return oa(n,"POST","/v1/accounts:signInWithEmailLink",Qn(n,t))}async function e0(n,t){return oa(n,"POST","/v1/accounts:signInWithEmailLink",Qn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr extends Qu{constructor(t,e,i,s=null){super("password",i),this._email=t,this._password=e,this._tenantId=s}static _fromEmailAndPassword(t,e){return new Vr(t,e,"password")}static _fromEmailAndCode(t,e,i=null){return new Vr(t,e,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t;if(e!=null&&e.email&&(e!=null&&e.password)){if(e.signInMethod==="password")return this._fromEmailAndPassword(e.email,e.password);if(e.signInMethod==="emailLink")return this._fromEmailAndCode(e.email,e.password,e.tenantId)}return null}async _getIdTokenResponse(t){switch(this.signInMethod){case"password":const e={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return tu(t,e,"signInWithPassword",ZT);case"emailLink":return t0(t,{email:this._email,oobCode:this._password});default:Le(t,"internal-error")}}async _linkToIdToken(t,e){switch(this.signInMethod){case"password":const i={idToken:e,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return tu(t,i,"signUpPassword",XT);case"emailLink":return e0(t,{idToken:e,email:this._email,oobCode:this._password});default:Le(t,"internal-error")}}_getReauthenticationResolver(t){return this._getIdTokenResponse(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hs(n,t){return oa(n,"POST","/v1/accounts:signInWithIdp",Qn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n0="http://localhost";class Ii extends Qu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const e=new Ii(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(e.idToken=t.idToken),t.accessToken&&(e.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(e.nonce=t.nonce),t.pendingToken&&(e.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(e.accessToken=t.oauthToken,e.secret=t.oauthTokenSecret):Le("argument-error"),e}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t,{providerId:i,signInMethod:s}=e,r=qu(e,["providerId","signInMethod"]);if(!i||!s)return null;const a=new Ii(i,s);return a.idToken=r.idToken||void 0,a.accessToken=r.accessToken||void 0,a.secret=r.secret,a.nonce=r.nonce,a.pendingToken=r.pendingToken||null,a}_getIdTokenResponse(t){const e=this.buildRequest();return hs(t,e)}_linkToIdToken(t,e){const i=this.buildRequest();return i.idToken=e,hs(t,i)}_getReauthenticationResolver(t){const e=this.buildRequest();return e.autoCreate=!1,hs(t,e)}buildRequest(){const t={requestUri:n0,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const e={};this.idToken&&(e.id_token=this.idToken),this.accessToken&&(e.access_token=this.accessToken),this.secret&&(e.oauth_token_secret=this.secret),e.providerId=this.providerId,this.nonce&&!this.pendingToken&&(e.nonce=this.nonce),t.postBody=ra(e)}return t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function i0(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function s0(n){const t=cr(ur(n)).link,e=t?cr(ur(t)).deep_link_id:null,i=cr(ur(n)).deep_link_id;return(i?cr(ur(i)).link:null)||i||e||t||n}class Ju{constructor(t){var e,i,s,r,a,o;const l=cr(ur(t)),c=(e=l.apiKey)!==null&&e!==void 0?e:null,d=(i=l.oobCode)!==null&&i!==void 0?i:null,h=i0((s=l.mode)!==null&&s!==void 0?s:null);Y(c&&d&&h,"argument-error"),this.apiKey=c,this.operation=h,this.code=d,this.continueUrl=(r=l.continueUrl)!==null&&r!==void 0?r:null,this.languageCode=(a=l.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(o=l.tenantId)!==null&&o!==void 0?o:null}static parseLink(t){const e=s0(t);try{return new Ju(e)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(){this.providerId=ji.PROVIDER_ID}static credential(t,e){return Vr._fromEmailAndPassword(t,e)}static credentialWithLink(t,e){const i=Ju.parseLink(e);return Y(i,"argument-error"),Vr._fromEmailAndCode(t,i.code,i.tenantId)}}ji.PROVIDER_ID="password";ji.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ji.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yy{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la extends yy{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn extends la{constructor(){super("facebook.com")}static credential(t){return Ii._fromParams({providerId:Pn.PROVIDER_ID,signInMethod:Pn.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Pn.credentialFromTaggedObject(t)}static credentialFromError(t){return Pn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Pn.credential(t.oauthAccessToken)}catch{return null}}}Pn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Pn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn extends la{constructor(){super("google.com"),this.addScope("profile")}static credential(t,e){return Ii._fromParams({providerId:Rn.PROVIDER_ID,signInMethod:Rn.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:e})}static credentialFromResult(t){return Rn.credentialFromTaggedObject(t)}static credentialFromError(t){return Rn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:e,oauthAccessToken:i}=t;if(!e&&!i)return null;try{return Rn.credential(e,i)}catch{return null}}}Rn.GOOGLE_SIGN_IN_METHOD="google.com";Rn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn extends la{constructor(){super("github.com")}static credential(t){return Ii._fromParams({providerId:Cn.PROVIDER_ID,signInMethod:Cn.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Cn.credentialFromTaggedObject(t)}static credentialFromError(t){return Cn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Cn.credential(t.oauthAccessToken)}catch{return null}}}Cn.GITHUB_SIGN_IN_METHOD="github.com";Cn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn extends la{constructor(){super("twitter.com")}static credential(t,e){return Ii._fromParams({providerId:Dn.PROVIDER_ID,signInMethod:Dn.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:e})}static credentialFromResult(t){return Dn.credentialFromTaggedObject(t)}static credentialFromError(t){return Dn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:e,oauthTokenSecret:i}=t;if(!e||!i)return null;try{return Dn.credential(e,i)}catch{return null}}}Dn.TWITTER_SIGN_IN_METHOD="twitter.com";Dn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function r0(n,t){return oa(n,"POST","/v1/accounts:signUp",Qn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,e,i,s=!1){const r=await on._fromIdTokenResponse(t,i,s),a=Lf(i);return new Ti({user:r,providerId:a,_tokenResponse:i,operationType:e})}static async _forOperation(t,e,i){await t._updateTokensIfNecessary(i,!0);const s=Lf(i);return new Ti({user:t,providerId:s,_tokenResponse:i,operationType:e})}}function Lf(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fo extends Be{constructor(t,e,i,s){var r;super(e.code,e.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Fo.prototype),this.customData={appName:t.name,tenantId:(r=t.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:e.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(t,e,i,s){return new Fo(t,e,i,s)}}function _y(n,t,e,i){return(t==="reauthenticate"?e._getReauthenticationResolver(n):e._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Fo._fromErrorAndOperation(n,r,t,i):r})}async function a0(n,t,e=!1){const i=await ys(n,t._linkToIdToken(n.auth,await n.getIdToken()),e);return Ti._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function by(n,t,e=!1){const{auth:i}=n;if(ze(i.app))return Promise.reject(gn(i));const s="reauthenticate";try{const r=await ys(n,_y(i,s,t,n),e);Y(r.idToken,i,"internal-error");const a=Gu(r.idToken);Y(a,i,"internal-error");const{sub:o}=a;return Y(n.uid===o,i,"user-mismatch"),Ti._forOperation(n,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&Le(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vy(n,t,e=!1){if(ze(n.app))return Promise.reject(gn(n));const i="signIn",s=await _y(n,i,t),r=await Ti._fromIdTokenResponse(n,i,s);return e||await n._updateCurrentUser(r.user),r}async function o0(n,t){return vy(Ui(n),t)}async function l0(n,t){return by(yt(n),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wy(n){const t=Ui(n);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function c0(n,t,e){if(ze(n.app))return Promise.reject(gn(n));const i=Ui(n),a=await tu(i,{returnSecureToken:!0,email:t,password:e,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",r0).catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&wy(n),l}),o=await Ti._fromIdTokenResponse(i,"signIn",a);return await i._updateCurrentUser(o.user),o}function u0(n,t,e){return ze(n.app)?Promise.reject(gn(n)):o0(yt(n),ji.credential(t,e)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&wy(n),i})}function d0(n,t){return h0(yt(n),null,t)}async function h0(n,t,e){const{auth:i}=n,r={idToken:await n.getIdToken(),returnSecureToken:!0};e&&(r.password=e);const a=await ys(n,JT(i,r));await n._updateTokensIfNecessary(a,!0)}function f0(n,t,e,i){return yt(n).onIdTokenChanged(t,e,i)}function p0(n,t,e){return yt(n).beforeAuthStateChanged(t,e)}function g0(n,t,e,i){return yt(n).onAuthStateChanged(t,e,i)}function Iy(n){return yt(n).signOut()}const Bo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ty{constructor(t,e){this.storageRetriever=t,this.type=e}_isAvailable(){try{return this.storage?(this.storage.setItem(Bo,"1"),this.storage.removeItem(Bo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,e){return this.storage.setItem(t,JSON.stringify(e)),Promise.resolve()}_get(t){const e=this.storage.getItem(t);return Promise.resolve(e?JSON.parse(e):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m0=1e3,y0=10;class Ey extends Ty{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,e)=>this.onStorageEvent(t,e),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=fy(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const e of Object.keys(this.listeners)){const i=this.storage.getItem(e),s=this.localCache[e];i!==s&&t(e,s,i)}}onStorageEvent(t,e=!1){if(!t.key){this.forAllChangedKeys((a,o,l)=>{this.notifyListeners(a,l)});return}const i=t.key;e?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(i);!e&&this.localCache[i]===a||this.notifyListeners(i,a)},r=this.storage.getItem(i);MT()&&r!==t.newValue&&t.newValue!==t.oldValue?setTimeout(s,y0):s()}notifyListeners(t,e){this.localCache[t]=e;const i=this.listeners[t];if(i)for(const s of Array.from(i))s(e&&JSON.parse(e))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,e,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:e,newValue:i}),!0)})},m0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,e){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,e){await super._set(t,e),this.localCache[t]=JSON.stringify(e)}async _get(t){const e=await super._get(t);return this.localCache[t]=JSON.stringify(e),e}async _remove(t){await super._remove(t),delete this.localCache[t]}}Ey.type="LOCAL";const _0=Ey;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xy extends Ty{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,e){}_removeListener(t,e){}}xy.type="SESSION";const ky=xy;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b0(n){return Promise.all(n.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(e){return{fulfilled:!1,reason:e}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pl{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const e=this.receivers.find(s=>s.isListeningto(t));if(e)return e;const i=new pl(t);return this.receivers.push(i),i}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const e=t,{eventId:i,eventType:s,data:r}=e.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;e.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const o=Array.from(a).map(async c=>c(e.origin,r)),l=await b0(o);e.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:l})}_subscribe(t,e){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(e)}_unsubscribe(t,e){this.handlersMap[t]&&e&&this.handlersMap[t].delete(e),(!e||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}pl.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xu(n="",t=10){let e="";for(let i=0;i<t;i++)e+=Math.floor(Math.random()*10);return n+e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v0{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,a;return new Promise((o,l)=>{const c=Xu("",20);s.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},i);a={messageChannel:s,onMessage(h){const f=h;if(f.data.eventId===c)switch(f.data.status){case"ack":clearTimeout(d),r=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),o(f.data.response);break;default:clearTimeout(d),clearTimeout(r),l(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:t,eventId:c,data:e},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function We(){return window}function w0(n){We().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ay(){return typeof We().WorkerGlobalScope<"u"&&typeof We().importScripts=="function"}async function I0(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function T0(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function E0(){return Ay()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sy="firebaseLocalStorageDb",x0=1,Uo="firebaseLocalStorage",Py="fbase_key";class ca{constructor(t){this.request=t}toPromise(){return new Promise((t,e)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{e(this.request.error)})})}}function gl(n,t){return n.transaction([Uo],t?"readwrite":"readonly").objectStore(Uo)}function k0(){const n=indexedDB.deleteDatabase(Sy);return new ca(n).toPromise()}function eu(){const n=indexedDB.open(Sy,x0);return new Promise((t,e)=>{n.addEventListener("error",()=>{e(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(Uo,{keyPath:Py})}catch(s){e(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(Uo)?t(i):(i.close(),await k0(),t(await eu()))})})}async function Ff(n,t,e){const i=gl(n,!0).put({[Py]:t,value:e});return new ca(i).toPromise()}async function A0(n,t){const e=gl(n,!1).get(t),i=await new ca(e).toPromise();return i===void 0?null:i.value}function Bf(n,t){const e=gl(n,!0).delete(t);return new ca(e).toPromise()}const S0=800,P0=3;class Ry{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await eu(),this.db)}async _withRetries(t){let e=0;for(;;)try{const i=await this._openDb();return await t(i)}catch(i){if(e++>P0)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ay()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=pl._getInstance(E0()),this.receiver._subscribe("keyChanged",async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)})),this.receiver._subscribe("ping",async(t,e)=>["keyChanged"])}async initializeSender(){var t,e;if(this.activeServiceWorker=await I0(),!this.activeServiceWorker)return;this.sender=new v0(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((t=i[0])===null||t===void 0)&&t.fulfilled&&!((e=i[0])===null||e===void 0)&&e.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||T0()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await eu();return await Ff(t,Bo,"1"),await Bf(t,Bo),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite(async()=>(await this._withRetries(i=>Ff(i,t,e)),this.localCache[t]=e,this.notifyServiceWorker(t)))}async _get(t){const e=await this._withRetries(i=>A0(i,t));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(e=>Bf(e,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(s=>{const r=gl(s,!1).getAll();return new ca(r).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const e=[],i=new Set;if(t.length!==0)for(const{fbase_key:s,value:r}of t)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),e.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),e.push(s));return e}notifyListeners(t,e){this.localCache[t]=e;const i=this.listeners[t];if(i)for(const s of Array.from(i))s(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),S0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ry.type="LOCAL";const R0=Ry;new aa(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C0(n,t){return t?ln(t):(Y(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zu extends Qu{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return hs(t,this._buildIdpRequest())}_linkToIdToken(t,e){return hs(t,this._buildIdpRequest(e))}_getReauthenticationResolver(t){return hs(t,this._buildIdpRequest())}_buildIdpRequest(t){const e={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(e.idToken=t),e}}function D0(n){return vy(n.auth,new Zu(n),n.bypassAuthState)}function M0(n){const{auth:t,user:e}=n;return Y(e,t,"internal-error"),by(e,new Zu(n),n.bypassAuthState)}async function O0(n){const{auth:t,user:e}=n;return Y(e,t,"internal-error"),a0(e,new Zu(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cy{constructor(t,e,i,s,r=!1){this.auth=t,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(e)?e:[e]}execute(){return new Promise(async(t,e)=>{this.pendingPromise={resolve:t,reject:e};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(t){const{urlResponse:e,sessionId:i,postBody:s,tenantId:r,error:a,type:o}=t;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:e,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(l))}catch(c){this.reject(c)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return D0;case"linkViaPopup":case"linkViaRedirect":return O0;case"reauthViaPopup":case"reauthViaRedirect":return M0;default:Le(this.auth,"internal-error")}}resolve(t){_n(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){_n(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V0=new aa(2e3,1e4);class ls extends Cy{constructor(t,e,i,s,r){super(t,e,s,r),this.provider=i,this.authWindow=null,this.pollId=null,ls.currentPopupAction&&ls.currentPopupAction.cancel(),ls.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return Y(t,this.auth,"internal-error"),t}async onExecution(){_n(this.filter.length===1,"Popup operations only handle one event");const t=Xu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(qe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var t;return((t=this.authWindow)===null||t===void 0?void 0:t.associatedEvent)||null}cancel(){this.reject(qe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ls.currentPopupAction=null}pollUserCancellation(){const t=()=>{var e,i;if(!((i=(e=this.authWindow)===null||e===void 0?void 0:e.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(qe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,V0.get())};t()}}ls.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N0="pendingRedirect",ho=new Map;class L0 extends Cy{constructor(t,e,i=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],e,void 0,i),this.eventId=null}async execute(){let t=ho.get(this.auth._key());if(!t){try{const i=await F0(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(i)}catch(e){t=()=>Promise.reject(e)}ho.set(this.auth._key(),t)}return this.bypassAuthState||ho.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const e=await this.auth._redirectUserForId(t.eventId);if(e)return this.user=e,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function F0(n,t){const e=j0(t),i=U0(n);if(!await i._isAvailable())return!1;const s=await i._get(e)==="true";return await i._remove(e),s}function B0(n,t){ho.set(n._key(),t)}function U0(n){return ln(n._redirectPersistence)}function j0(n){return uo(N0,n.config.apiKey,n.name)}async function z0(n,t,e=!1){if(ze(n.app))return Promise.reject(gn(n));const i=Ui(n),s=C0(i,t),a=await new L0(i,s,e).execute();return a&&!e&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,t)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $0=10*60*1e3;class H0{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let e=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(t,i)&&(e=!0,this.sendToConsumer(t,i),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!q0(t)||(this.hasHandledPotentialRedirect=!0,e||(this.queuedRedirectEvent=t,e=!0)),e}sendToConsumer(t,e){var i;if(t.error&&!Dy(t)){const s=((i=t.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";e.onError(qe(this.auth,s))}else e.onAuthEvent(t)}isEventForConsumer(t,e){const i=e.eventId===null||!!t.eventId&&t.eventId===e.eventId;return e.filter.includes(t.type)&&i}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=$0&&this.cachedEventUids.clear(),this.cachedEventUids.has(Uf(t))}saveEventToCache(t){this.cachedEventUids.add(Uf(t)),this.lastProcessedEventTime=Date.now()}}function Uf(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(t=>t).join("-")}function Dy({type:n,error:t}){return n==="unknown"&&(t==null?void 0:t.code)==="auth/no-auth-event"}function q0(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Dy(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function W0(n,t={}){return vn(n,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K0=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,G0=/^https?/;async function Y0(n){if(n.config.emulator)return;const{authorizedDomains:t}=await W0(n);for(const e of t)try{if(Q0(e))return}catch{}Le(n,"unauthorized-domain")}function Q0(n){const t=Xc(),{protocol:e,hostname:i}=new URL(t);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&i===""?e==="chrome-extension:"&&n.replace("chrome-extension://","")===t.replace("chrome-extension://",""):e==="chrome-extension:"&&a.hostname===i}if(!G0.test(e))return!1;if(K0.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J0=new aa(3e4,6e4);function jf(){const n=We().___jsl;if(n!=null&&n.H){for(const t of Object.keys(n.H))if(n.H[t].r=n.H[t].r||[],n.H[t].L=n.H[t].L||[],n.H[t].r=[...n.H[t].L],n.CP)for(let e=0;e<n.CP.length;e++)n.CP[e]=null}}function X0(n){return new Promise((t,e)=>{var i,s,r;function a(){jf(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{jf(),e(qe(n,"network-request-failed"))},timeout:J0.get()})}if(!((s=(i=We().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)t(gapi.iframes.getContext());else if(!((r=We().gapi)===null||r===void 0)&&r.load)a();else{const o=zT("iframefcb");return We()[o]=()=>{gapi.load?a():e(qe(n,"network-request-failed"))},gy(`${jT()}?onload=${o}`).catch(l=>e(l))}}).catch(t=>{throw fo=null,t})}let fo=null;function Z0(n){return fo=fo||X0(n),fo}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tE=new aa(5e3,15e3),eE="__/auth/iframe",nE="emulator/auth/iframe",iE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},sE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function rE(n){const t=n.config;Y(t.authDomain,n,"auth-domain-config-required");const e=t.emulator?Ku(t,nE):`https://${n.config.authDomain}/${eE}`,i={apiKey:t.apiKey,appName:n.name,v:Rs},s=sE.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${e}?${ra(i).slice(1)}`}async function aE(n){const t=await Z0(n),e=We().gapi;return Y(e,n,"internal-error"),t.open({where:document.body,url:rE(n),messageHandlersFilter:e.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:iE,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const a=qe(n,"network-request-failed"),o=We().setTimeout(()=>{r(a)},tE.get());function l(){We().clearTimeout(o),s(i)}i.ping(l).then(l,()=>{r(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},lE=500,cE=600,uE="_blank",dE="http://localhost";class zf{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function hE(n,t,e,i=lE,s=cE){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-i)/2,0).toString();let o="";const l=Object.assign(Object.assign({},oE),{width:i.toString(),height:s.toString(),top:r,left:a}),c=zt().toLowerCase();e&&(o=ly(c)?uE:e),ay(c)&&(t=t||dE,l.scrollbars="yes");const d=Object.entries(l).reduce((f,[g,y])=>`${f}${g}=${y},`,"");if(DT(c)&&o!=="_self")return fE(t||"",o),new zf(null);const h=window.open(t||"",o,d);Y(h,n,"popup-blocked");try{h.focus()}catch{}return new zf(h)}function fE(n,t){const e=document.createElement("a");e.href=n,e.target=t;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),e.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pE="__/auth/handler",gE="emulator/auth/handler",mE=encodeURIComponent("fac");async function $f(n,t,e,i,s,r){Y(n.config.authDomain,n,"auth-domain-config-required"),Y(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:e,redirectUrl:i,v:Rs,eventId:s};if(t instanceof yy){t.setDefaultLanguage(n.languageCode),a.providerId=t.providerId||"",eI(t.getCustomParameters())||(a.customParameters=JSON.stringify(t.getCustomParameters()));for(const[d,h]of Object.entries({}))a[d]=h}if(t instanceof la){const d=t.getScopes().filter(h=>h!=="");d.length>0&&(a.scopes=d.join(","))}n.tenantId&&(a.tid=n.tenantId);const o=a;for(const d of Object.keys(o))o[d]===void 0&&delete o[d];const l=await n._getAppCheckToken(),c=l?`#${mE}=${encodeURIComponent(l)}`:"";return`${yE(n)}?${ra(o).slice(1)}${c}`}function yE({config:n}){return n.emulator?Ku(n,gE):`https://${n.authDomain}/${pE}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ic="webStorageSupport";class _E{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ky,this._completeRedirectFn=z0,this._overrideRedirectResult=B0}async _openPopup(t,e,i,s){var r;_n((r=this.eventManagers[t._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const a=await $f(t,e,i,Xc(),s);return hE(t,a,Xu())}async _openRedirect(t,e,i,s){await this._originValidation(t);const r=await $f(t,e,i,Xc(),s);return w0(r),new Promise(()=>{})}_initialize(t){const e=t._key();if(this.eventManagers[e]){const{manager:s,promise:r}=this.eventManagers[e];return s?Promise.resolve(s):(_n(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(t);return this.eventManagers[e]={promise:i},i.catch(()=>{delete this.eventManagers[e]}),i}async initAndGetManager(t){const e=await aE(t),i=new H0(t);return e.register("authEvent",s=>(Y(s==null?void 0:s.authEvent,t,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:i},this.iframes[t._key()]=e,i}_isIframeWebStorageSupported(t,e){this.iframes[t._key()].send(Ic,{type:Ic},s=>{var r;const a=(r=s==null?void 0:s[0])===null||r===void 0?void 0:r[Ic];a!==void 0&&e(!!a),Le(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const e=t._key();return this.originValidationPromises[e]||(this.originValidationPromises[e]=Y0(t)),this.originValidationPromises[e]}get _shouldInitProactively(){return fy()||oy()||Yu()}}const bE=_E;var Hf="@firebase/auth",qf="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vE{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)===null||t===void 0?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged(i=>{t((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){Y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function IE(n){Ne(new Ae("auth",(t,{options:e})=>{const i=t.getProvider("app").getImmediate(),s=t.getProvider("heartbeat"),r=t.getProvider("app-check-internal"),{apiKey:a,authDomain:o}=i.options;Y(a&&!a.includes(":"),"invalid-api-key",{appName:i.name});const l={apiKey:a,authDomain:o,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:py(n)},c=new FT(i,s,r,l);return KT(c,e),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,i)=>{t.getProvider("auth-internal").initialize()})),Ne(new Ae("auth-internal",t=>{const e=Ui(t.getProvider("auth").getImmediate());return(i=>new vE(i))(e)},"PRIVATE").setInstantiationMode("EXPLICIT")),ye(Hf,qf,wE(n)),ye(Hf,qf,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TE=5*60,EE=Hm("authIdTokenMaxAge")||TE;let Wf=null;const xE=n=>async t=>{const e=t&&await t.getIdTokenResult(),i=e&&(new Date().getTime()-Date.parse(e.issuedAtTime))/1e3;if(i&&i>EE)return;const s=e==null?void 0:e.token;Wf!==s&&(Wf=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function My(n=hl()){const t=Bi(n,"auth");if(t.isInitialized())return t.getImmediate();const e=WT(n,{popupRedirectResolver:bE,persistence:[R0,_0,ky]}),i=Hm("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const a=xE(r.toString());p0(e,a,()=>a(e.currentUser)),f0(e,o=>a(o))}}const s=jm("auth");return s&&GT(e,`http://${s}`),e}function kE(){var n,t;return(t=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&t!==void 0?t:document}BT({loadJS(n){return new Promise((t,e)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=t,i.onerror=s=>{const r=qe("internal-error");r.customData=s,e(r)},i.type="text/javascript",i.charset="UTF-8",kE().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});IE("Browser");var Kf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var bi,Oy;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(I,_){function b(){}b.prototype=_.prototype,I.D=_.prototype,I.prototype=new b,I.prototype.constructor=I,I.C=function(E,k,R){for(var x=Array(arguments.length-2),$=2;$<arguments.length;$++)x[$-2]=arguments[$];return _.prototype[k].apply(E,x)}}function e(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(i,e),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,_,b){b||(b=0);var E=Array(16);if(typeof _=="string")for(var k=0;16>k;++k)E[k]=_.charCodeAt(b++)|_.charCodeAt(b++)<<8|_.charCodeAt(b++)<<16|_.charCodeAt(b++)<<24;else for(k=0;16>k;++k)E[k]=_[b++]|_[b++]<<8|_[b++]<<16|_[b++]<<24;_=I.g[0],b=I.g[1],k=I.g[2];var R=I.g[3],x=_+(R^b&(k^R))+E[0]+3614090360&4294967295;_=b+(x<<7&4294967295|x>>>25),x=R+(k^_&(b^k))+E[1]+3905402710&4294967295,R=_+(x<<12&4294967295|x>>>20),x=k+(b^R&(_^b))+E[2]+606105819&4294967295,k=R+(x<<17&4294967295|x>>>15),x=b+(_^k&(R^_))+E[3]+3250441966&4294967295,b=k+(x<<22&4294967295|x>>>10),x=_+(R^b&(k^R))+E[4]+4118548399&4294967295,_=b+(x<<7&4294967295|x>>>25),x=R+(k^_&(b^k))+E[5]+1200080426&4294967295,R=_+(x<<12&4294967295|x>>>20),x=k+(b^R&(_^b))+E[6]+2821735955&4294967295,k=R+(x<<17&4294967295|x>>>15),x=b+(_^k&(R^_))+E[7]+4249261313&4294967295,b=k+(x<<22&4294967295|x>>>10),x=_+(R^b&(k^R))+E[8]+1770035416&4294967295,_=b+(x<<7&4294967295|x>>>25),x=R+(k^_&(b^k))+E[9]+2336552879&4294967295,R=_+(x<<12&4294967295|x>>>20),x=k+(b^R&(_^b))+E[10]+4294925233&4294967295,k=R+(x<<17&4294967295|x>>>15),x=b+(_^k&(R^_))+E[11]+2304563134&4294967295,b=k+(x<<22&4294967295|x>>>10),x=_+(R^b&(k^R))+E[12]+1804603682&4294967295,_=b+(x<<7&4294967295|x>>>25),x=R+(k^_&(b^k))+E[13]+4254626195&4294967295,R=_+(x<<12&4294967295|x>>>20),x=k+(b^R&(_^b))+E[14]+2792965006&4294967295,k=R+(x<<17&4294967295|x>>>15),x=b+(_^k&(R^_))+E[15]+1236535329&4294967295,b=k+(x<<22&4294967295|x>>>10),x=_+(k^R&(b^k))+E[1]+4129170786&4294967295,_=b+(x<<5&4294967295|x>>>27),x=R+(b^k&(_^b))+E[6]+3225465664&4294967295,R=_+(x<<9&4294967295|x>>>23),x=k+(_^b&(R^_))+E[11]+643717713&4294967295,k=R+(x<<14&4294967295|x>>>18),x=b+(R^_&(k^R))+E[0]+3921069994&4294967295,b=k+(x<<20&4294967295|x>>>12),x=_+(k^R&(b^k))+E[5]+3593408605&4294967295,_=b+(x<<5&4294967295|x>>>27),x=R+(b^k&(_^b))+E[10]+38016083&4294967295,R=_+(x<<9&4294967295|x>>>23),x=k+(_^b&(R^_))+E[15]+3634488961&4294967295,k=R+(x<<14&4294967295|x>>>18),x=b+(R^_&(k^R))+E[4]+3889429448&4294967295,b=k+(x<<20&4294967295|x>>>12),x=_+(k^R&(b^k))+E[9]+568446438&4294967295,_=b+(x<<5&4294967295|x>>>27),x=R+(b^k&(_^b))+E[14]+3275163606&4294967295,R=_+(x<<9&4294967295|x>>>23),x=k+(_^b&(R^_))+E[3]+4107603335&4294967295,k=R+(x<<14&4294967295|x>>>18),x=b+(R^_&(k^R))+E[8]+1163531501&4294967295,b=k+(x<<20&4294967295|x>>>12),x=_+(k^R&(b^k))+E[13]+2850285829&4294967295,_=b+(x<<5&4294967295|x>>>27),x=R+(b^k&(_^b))+E[2]+4243563512&4294967295,R=_+(x<<9&4294967295|x>>>23),x=k+(_^b&(R^_))+E[7]+1735328473&4294967295,k=R+(x<<14&4294967295|x>>>18),x=b+(R^_&(k^R))+E[12]+2368359562&4294967295,b=k+(x<<20&4294967295|x>>>12),x=_+(b^k^R)+E[5]+4294588738&4294967295,_=b+(x<<4&4294967295|x>>>28),x=R+(_^b^k)+E[8]+2272392833&4294967295,R=_+(x<<11&4294967295|x>>>21),x=k+(R^_^b)+E[11]+1839030562&4294967295,k=R+(x<<16&4294967295|x>>>16),x=b+(k^R^_)+E[14]+4259657740&4294967295,b=k+(x<<23&4294967295|x>>>9),x=_+(b^k^R)+E[1]+2763975236&4294967295,_=b+(x<<4&4294967295|x>>>28),x=R+(_^b^k)+E[4]+1272893353&4294967295,R=_+(x<<11&4294967295|x>>>21),x=k+(R^_^b)+E[7]+4139469664&4294967295,k=R+(x<<16&4294967295|x>>>16),x=b+(k^R^_)+E[10]+3200236656&4294967295,b=k+(x<<23&4294967295|x>>>9),x=_+(b^k^R)+E[13]+681279174&4294967295,_=b+(x<<4&4294967295|x>>>28),x=R+(_^b^k)+E[0]+3936430074&4294967295,R=_+(x<<11&4294967295|x>>>21),x=k+(R^_^b)+E[3]+3572445317&4294967295,k=R+(x<<16&4294967295|x>>>16),x=b+(k^R^_)+E[6]+76029189&4294967295,b=k+(x<<23&4294967295|x>>>9),x=_+(b^k^R)+E[9]+3654602809&4294967295,_=b+(x<<4&4294967295|x>>>28),x=R+(_^b^k)+E[12]+3873151461&4294967295,R=_+(x<<11&4294967295|x>>>21),x=k+(R^_^b)+E[15]+530742520&4294967295,k=R+(x<<16&4294967295|x>>>16),x=b+(k^R^_)+E[2]+3299628645&4294967295,b=k+(x<<23&4294967295|x>>>9),x=_+(k^(b|~R))+E[0]+4096336452&4294967295,_=b+(x<<6&4294967295|x>>>26),x=R+(b^(_|~k))+E[7]+1126891415&4294967295,R=_+(x<<10&4294967295|x>>>22),x=k+(_^(R|~b))+E[14]+2878612391&4294967295,k=R+(x<<15&4294967295|x>>>17),x=b+(R^(k|~_))+E[5]+4237533241&4294967295,b=k+(x<<21&4294967295|x>>>11),x=_+(k^(b|~R))+E[12]+1700485571&4294967295,_=b+(x<<6&4294967295|x>>>26),x=R+(b^(_|~k))+E[3]+2399980690&4294967295,R=_+(x<<10&4294967295|x>>>22),x=k+(_^(R|~b))+E[10]+4293915773&4294967295,k=R+(x<<15&4294967295|x>>>17),x=b+(R^(k|~_))+E[1]+2240044497&4294967295,b=k+(x<<21&4294967295|x>>>11),x=_+(k^(b|~R))+E[8]+1873313359&4294967295,_=b+(x<<6&4294967295|x>>>26),x=R+(b^(_|~k))+E[15]+4264355552&4294967295,R=_+(x<<10&4294967295|x>>>22),x=k+(_^(R|~b))+E[6]+2734768916&4294967295,k=R+(x<<15&4294967295|x>>>17),x=b+(R^(k|~_))+E[13]+1309151649&4294967295,b=k+(x<<21&4294967295|x>>>11),x=_+(k^(b|~R))+E[4]+4149444226&4294967295,_=b+(x<<6&4294967295|x>>>26),x=R+(b^(_|~k))+E[11]+3174756917&4294967295,R=_+(x<<10&4294967295|x>>>22),x=k+(_^(R|~b))+E[2]+718787259&4294967295,k=R+(x<<15&4294967295|x>>>17),x=b+(R^(k|~_))+E[9]+3951481745&4294967295,I.g[0]=I.g[0]+_&4294967295,I.g[1]=I.g[1]+(k+(x<<21&4294967295|x>>>11))&4294967295,I.g[2]=I.g[2]+k&4294967295,I.g[3]=I.g[3]+R&4294967295}i.prototype.u=function(I,_){_===void 0&&(_=I.length);for(var b=_-this.blockSize,E=this.B,k=this.h,R=0;R<_;){if(k==0)for(;R<=b;)s(this,I,R),R+=this.blockSize;if(typeof I=="string"){for(;R<_;)if(E[k++]=I.charCodeAt(R++),k==this.blockSize){s(this,E),k=0;break}}else for(;R<_;)if(E[k++]=I[R++],k==this.blockSize){s(this,E),k=0;break}}this.h=k,this.o+=_},i.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var _=1;_<I.length-8;++_)I[_]=0;var b=8*this.o;for(_=I.length-8;_<I.length;++_)I[_]=b&255,b/=256;for(this.u(I),I=Array(16),_=b=0;4>_;++_)for(var E=0;32>E;E+=8)I[b++]=this.g[_]>>>E&255;return I};function r(I,_){var b=o;return Object.prototype.hasOwnProperty.call(b,I)?b[I]:b[I]=_(I)}function a(I,_){this.h=_;for(var b=[],E=!0,k=I.length-1;0<=k;k--){var R=I[k]|0;E&&R==_||(b[k]=R,E=!1)}this.g=b}var o={};function l(I){return-128<=I&&128>I?r(I,function(_){return new a([_|0],0>_?-1:0)}):new a([I|0],0>I?-1:0)}function c(I){if(isNaN(I)||!isFinite(I))return h;if(0>I)return w(c(-I));for(var _=[],b=1,E=0;I>=b;E++)_[E]=I/b|0,b*=4294967296;return new a(_,0)}function d(I,_){if(I.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(I.charAt(0)=="-")return w(d(I.substring(1),_));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var b=c(Math.pow(_,8)),E=h,k=0;k<I.length;k+=8){var R=Math.min(8,I.length-k),x=parseInt(I.substring(k,k+R),_);8>R?(R=c(Math.pow(_,R)),E=E.j(R).add(c(x))):(E=E.j(b),E=E.add(c(x)))}return E}var h=l(0),f=l(1),g=l(16777216);n=a.prototype,n.m=function(){if(v(this))return-w(this).m();for(var I=0,_=1,b=0;b<this.g.length;b++){var E=this.i(b);I+=(0<=E?E:4294967296+E)*_,_*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(y(this))return"0";if(v(this))return"-"+w(this).toString(I);for(var _=c(Math.pow(I,6)),b=this,E="";;){var k=D(b,_).g;b=A(b,k.j(_));var R=((0<b.g.length?b.g[0]:b.h)>>>0).toString(I);if(b=k,y(b))return R+E;for(;6>R.length;)R="0"+R;E=R+E}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function y(I){if(I.h!=0)return!1;for(var _=0;_<I.g.length;_++)if(I.g[_]!=0)return!1;return!0}function v(I){return I.h==-1}n.l=function(I){return I=A(this,I),v(I)?-1:y(I)?0:1};function w(I){for(var _=I.g.length,b=[],E=0;E<_;E++)b[E]=~I.g[E];return new a(b,~I.h).add(f)}n.abs=function(){return v(this)?w(this):this},n.add=function(I){for(var _=Math.max(this.g.length,I.g.length),b=[],E=0,k=0;k<=_;k++){var R=E+(this.i(k)&65535)+(I.i(k)&65535),x=(R>>>16)+(this.i(k)>>>16)+(I.i(k)>>>16);E=x>>>16,R&=65535,x&=65535,b[k]=x<<16|R}return new a(b,b[b.length-1]&-2147483648?-1:0)};function A(I,_){return I.add(w(_))}n.j=function(I){if(y(this)||y(I))return h;if(v(this))return v(I)?w(this).j(w(I)):w(w(this).j(I));if(v(I))return w(this.j(w(I)));if(0>this.l(g)&&0>I.l(g))return c(this.m()*I.m());for(var _=this.g.length+I.g.length,b=[],E=0;E<2*_;E++)b[E]=0;for(E=0;E<this.g.length;E++)for(var k=0;k<I.g.length;k++){var R=this.i(E)>>>16,x=this.i(E)&65535,$=I.i(k)>>>16,G=I.i(k)&65535;b[2*E+2*k]+=x*G,S(b,2*E+2*k),b[2*E+2*k+1]+=R*G,S(b,2*E+2*k+1),b[2*E+2*k+1]+=x*$,S(b,2*E+2*k+1),b[2*E+2*k+2]+=R*$,S(b,2*E+2*k+2)}for(E=0;E<_;E++)b[E]=b[2*E+1]<<16|b[2*E];for(E=_;E<2*_;E++)b[E]=0;return new a(b,0)};function S(I,_){for(;(I[_]&65535)!=I[_];)I[_+1]+=I[_]>>>16,I[_]&=65535,_++}function P(I,_){this.g=I,this.h=_}function D(I,_){if(y(_))throw Error("division by zero");if(y(I))return new P(h,h);if(v(I))return _=D(w(I),_),new P(w(_.g),w(_.h));if(v(_))return _=D(I,w(_)),new P(w(_.g),_.h);if(30<I.g.length){if(v(I)||v(_))throw Error("slowDivide_ only works with positive integers.");for(var b=f,E=_;0>=E.l(I);)b=M(b),E=M(E);var k=C(b,1),R=C(E,1);for(E=C(E,2),b=C(b,2);!y(E);){var x=R.add(E);0>=x.l(I)&&(k=k.add(b),R=x),E=C(E,1),b=C(b,1)}return _=A(I,k.j(_)),new P(k,_)}for(k=h;0<=I.l(_);){for(b=Math.max(1,Math.floor(I.m()/_.m())),E=Math.ceil(Math.log(b)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),R=c(b),x=R.j(_);v(x)||0<x.l(I);)b-=E,R=c(b),x=R.j(_);y(R)&&(R=f),k=k.add(R),I=A(I,x)}return new P(k,I)}n.A=function(I){return D(this,I).h},n.and=function(I){for(var _=Math.max(this.g.length,I.g.length),b=[],E=0;E<_;E++)b[E]=this.i(E)&I.i(E);return new a(b,this.h&I.h)},n.or=function(I){for(var _=Math.max(this.g.length,I.g.length),b=[],E=0;E<_;E++)b[E]=this.i(E)|I.i(E);return new a(b,this.h|I.h)},n.xor=function(I){for(var _=Math.max(this.g.length,I.g.length),b=[],E=0;E<_;E++)b[E]=this.i(E)^I.i(E);return new a(b,this.h^I.h)};function M(I){for(var _=I.g.length+1,b=[],E=0;E<_;E++)b[E]=I.i(E)<<1|I.i(E-1)>>>31;return new a(b,I.h)}function C(I,_){var b=_>>5;_%=32;for(var E=I.g.length-b,k=[],R=0;R<E;R++)k[R]=0<_?I.i(R+b)>>>_|I.i(R+b+1)<<32-_:I.i(R+b);return new a(k,I.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,Oy=i,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=c,a.fromString=d,bi=a}).apply(typeof Kf<"u"?Kf:typeof self<"u"?self:typeof window<"u"?window:{});var $a=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Vy,dr,Ny,po,nu,Ly,Fy,By;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(u,p,m){return u==Array.prototype||u==Object.prototype||(u[p]=m.value),u};function e(u){u=[typeof globalThis=="object"&&globalThis,u,typeof window=="object"&&window,typeof self=="object"&&self,typeof $a=="object"&&$a];for(var p=0;p<u.length;++p){var m=u[p];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var i=e(this);function s(u,p){if(p)t:{var m=i;u=u.split(".");for(var T=0;T<u.length-1;T++){var O=u[T];if(!(O in m))break t;m=m[O]}u=u[u.length-1],T=m[u],p=p(T),p!=T&&p!=null&&t(m,u,{configurable:!0,writable:!0,value:p})}}function r(u,p){u instanceof String&&(u+="");var m=0,T=!1,O={next:function(){if(!T&&m<u.length){var N=m++;return{value:p(N,u[N]),done:!1}}return T=!0,{done:!0,value:void 0}}};return O[Symbol.iterator]=function(){return O},O}s("Array.prototype.values",function(u){return u||function(){return r(this,function(p,m){return m})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},o=this||self;function l(u){var p=typeof u;return p=p!="object"?p:u?Array.isArray(u)?"array":p:"null",p=="array"||p=="object"&&typeof u.length=="number"}function c(u){var p=typeof u;return p=="object"&&u!=null||p=="function"}function d(u,p,m){return u.call.apply(u.bind,arguments)}function h(u,p,m){if(!u)throw Error();if(2<arguments.length){var T=Array.prototype.slice.call(arguments,2);return function(){var O=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(O,T),u.apply(p,O)}}return function(){return u.apply(p,arguments)}}function f(u,p,m){return f=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:h,f.apply(null,arguments)}function g(u,p){var m=Array.prototype.slice.call(arguments,1);return function(){var T=m.slice();return T.push.apply(T,arguments),u.apply(this,T)}}function y(u,p){function m(){}m.prototype=p.prototype,u.aa=p.prototype,u.prototype=new m,u.prototype.constructor=u,u.Qb=function(T,O,N){for(var U=Array(arguments.length-2),_t=2;_t<arguments.length;_t++)U[_t-2]=arguments[_t];return p.prototype[O].apply(T,U)}}function v(u){const p=u.length;if(0<p){const m=Array(p);for(let T=0;T<p;T++)m[T]=u[T];return m}return[]}function w(u,p){for(let m=1;m<arguments.length;m++){const T=arguments[m];if(l(T)){const O=u.length||0,N=T.length||0;u.length=O+N;for(let U=0;U<N;U++)u[O+U]=T[U]}else u.push(T)}}class A{constructor(p,m){this.i=p,this.j=m,this.h=0,this.g=null}get(){let p;return 0<this.h?(this.h--,p=this.g,this.g=p.next,p.next=null):p=this.i(),p}}function S(u){return/^[\s\xa0]*$/.test(u)}function P(){var u=o.navigator;return u&&(u=u.userAgent)?u:""}function D(u){return D[" "](u),u}D[" "]=function(){};var M=P().indexOf("Gecko")!=-1&&!(P().toLowerCase().indexOf("webkit")!=-1&&P().indexOf("Edge")==-1)&&!(P().indexOf("Trident")!=-1||P().indexOf("MSIE")!=-1)&&P().indexOf("Edge")==-1;function C(u,p,m){for(const T in u)p.call(m,u[T],T,u)}function I(u,p){for(const m in u)p.call(void 0,u[m],m,u)}function _(u){const p={};for(const m in u)p[m]=u[m];return p}const b="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(u,p){let m,T;for(let O=1;O<arguments.length;O++){T=arguments[O];for(m in T)u[m]=T[m];for(let N=0;N<b.length;N++)m=b[N],Object.prototype.hasOwnProperty.call(T,m)&&(u[m]=T[m])}}function k(u){var p=1;u=u.split(":");const m=[];for(;0<p&&u.length;)m.push(u.shift()),p--;return u.length&&m.push(u.join(":")),m}function R(u){o.setTimeout(()=>{throw u},0)}function x(){var u=ft;let p=null;return u.g&&(p=u.g,u.g=u.g.next,u.g||(u.h=null),p.next=null),p}class ${constructor(){this.h=this.g=null}add(p,m){const T=G.get();T.set(p,m),this.h?this.h.next=T:this.g=T,this.h=T}}var G=new A(()=>new X,u=>u.reset());class X{constructor(){this.next=this.g=this.h=null}set(p,m){this.h=p,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let Q,it=!1,ft=new $,_e=()=>{const u=o.Promise.resolve(void 0);Q=()=>{u.then(Wi)}};var Wi=()=>{for(var u;u=x();){try{u.h.call(u.g)}catch(m){R(m)}var p=G;p.j(u),100>p.h&&(p.h++,u.next=p.g,p.g=u)}it=!1};function oe(){this.s=this.s,this.C=this.C}oe.prototype.s=!1,oe.prototype.ma=function(){this.s||(this.s=!0,this.N())},oe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ct(u,p){this.type=u,this.g=this.target=p,this.defaultPrevented=!1}Ct.prototype.h=function(){this.defaultPrevented=!0};var Qe=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var u=!1,p=Object.defineProperty({},"passive",{get:function(){u=!0}});try{const m=()=>{};o.addEventListener("test",m,p),o.removeEventListener("test",m,p)}catch{}return u}();function Pe(u,p){if(Ct.call(this,u?u.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,u){var m=this.type=u.type,T=u.changedTouches&&u.changedTouches.length?u.changedTouches[0]:null;if(this.target=u.target||u.srcElement,this.g=p,p=u.relatedTarget){if(M){t:{try{D(p.nodeName);var O=!0;break t}catch{}O=!1}O||(p=null)}}else m=="mouseover"?p=u.fromElement:m=="mouseout"&&(p=u.toElement);this.relatedTarget=p,T?(this.clientX=T.clientX!==void 0?T.clientX:T.pageX,this.clientY=T.clientY!==void 0?T.clientY:T.pageY,this.screenX=T.screenX||0,this.screenY=T.screenY||0):(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0),this.button=u.button,this.key=u.key||"",this.ctrlKey=u.ctrlKey,this.altKey=u.altKey,this.shiftKey=u.shiftKey,this.metaKey=u.metaKey,this.pointerId=u.pointerId||0,this.pointerType=typeof u.pointerType=="string"?u.pointerType:Je[u.pointerType]||"",this.state=u.state,this.i=u,u.defaultPrevented&&Pe.aa.h.call(this)}}y(Pe,Ct);var Je={2:"touch",3:"pen",4:"mouse"};Pe.prototype.h=function(){Pe.aa.h.call(this);var u=this.i;u.preventDefault?u.preventDefault():u.returnValue=!1};var Ta="closure_listenable_"+(1e6*Math.random()|0),iw=0;function sw(u,p,m,T,O){this.listener=u,this.proxy=null,this.src=p,this.type=m,this.capture=!!T,this.ha=O,this.key=++iw,this.da=this.fa=!1}function Ea(u){u.da=!0,u.listener=null,u.proxy=null,u.src=null,u.ha=null}function xa(u){this.src=u,this.g={},this.h=0}xa.prototype.add=function(u,p,m,T,O){var N=u.toString();u=this.g[N],u||(u=this.g[N]=[],this.h++);var U=Kl(u,p,T,O);return-1<U?(p=u[U],m||(p.fa=!1)):(p=new sw(p,this.src,N,!!T,O),p.fa=m,u.push(p)),p};function Wl(u,p){var m=p.type;if(m in u.g){var T=u.g[m],O=Array.prototype.indexOf.call(T,p,void 0),N;(N=0<=O)&&Array.prototype.splice.call(T,O,1),N&&(Ea(p),u.g[m].length==0&&(delete u.g[m],u.h--))}}function Kl(u,p,m,T){for(var O=0;O<u.length;++O){var N=u[O];if(!N.da&&N.listener==p&&N.capture==!!m&&N.ha==T)return O}return-1}var Gl="closure_lm_"+(1e6*Math.random()|0),Yl={};function _h(u,p,m,T,O){if(Array.isArray(p)){for(var N=0;N<p.length;N++)_h(u,p[N],m,T,O);return null}return m=wh(m),u&&u[Ta]?u.K(p,m,c(T)?!!T.capture:!1,O):rw(u,p,m,!1,T,O)}function rw(u,p,m,T,O,N){if(!p)throw Error("Invalid event type");var U=c(O)?!!O.capture:!!O,_t=Jl(u);if(_t||(u[Gl]=_t=new xa(u)),m=_t.add(p,m,T,U,N),m.proxy)return m;if(T=aw(),m.proxy=T,T.src=u,T.listener=m,u.addEventListener)Qe||(O=U),O===void 0&&(O=!1),u.addEventListener(p.toString(),T,O);else if(u.attachEvent)u.attachEvent(vh(p.toString()),T);else if(u.addListener&&u.removeListener)u.addListener(T);else throw Error("addEventListener and attachEvent are unavailable.");return m}function aw(){function u(m){return p.call(u.src,u.listener,m)}const p=ow;return u}function bh(u,p,m,T,O){if(Array.isArray(p))for(var N=0;N<p.length;N++)bh(u,p[N],m,T,O);else T=c(T)?!!T.capture:!!T,m=wh(m),u&&u[Ta]?(u=u.i,p=String(p).toString(),p in u.g&&(N=u.g[p],m=Kl(N,m,T,O),-1<m&&(Ea(N[m]),Array.prototype.splice.call(N,m,1),N.length==0&&(delete u.g[p],u.h--)))):u&&(u=Jl(u))&&(p=u.g[p.toString()],u=-1,p&&(u=Kl(p,m,T,O)),(m=-1<u?p[u]:null)&&Ql(m))}function Ql(u){if(typeof u!="number"&&u&&!u.da){var p=u.src;if(p&&p[Ta])Wl(p.i,u);else{var m=u.type,T=u.proxy;p.removeEventListener?p.removeEventListener(m,T,u.capture):p.detachEvent?p.detachEvent(vh(m),T):p.addListener&&p.removeListener&&p.removeListener(T),(m=Jl(p))?(Wl(m,u),m.h==0&&(m.src=null,p[Gl]=null)):Ea(u)}}}function vh(u){return u in Yl?Yl[u]:Yl[u]="on"+u}function ow(u,p){if(u.da)u=!0;else{p=new Pe(p,this);var m=u.listener,T=u.ha||u.src;u.fa&&Ql(u),u=m.call(T,p)}return u}function Jl(u){return u=u[Gl],u instanceof xa?u:null}var Xl="__closure_events_fn_"+(1e9*Math.random()>>>0);function wh(u){return typeof u=="function"?u:(u[Xl]||(u[Xl]=function(p){return u.handleEvent(p)}),u[Xl])}function Zt(){oe.call(this),this.i=new xa(this),this.M=this,this.F=null}y(Zt,oe),Zt.prototype[Ta]=!0,Zt.prototype.removeEventListener=function(u,p,m,T){bh(this,u,p,m,T)};function le(u,p){var m,T=u.F;if(T)for(m=[];T;T=T.F)m.push(T);if(u=u.M,T=p.type||p,typeof p=="string")p=new Ct(p,u);else if(p instanceof Ct)p.target=p.target||u;else{var O=p;p=new Ct(T,u),E(p,O)}if(O=!0,m)for(var N=m.length-1;0<=N;N--){var U=p.g=m[N];O=ka(U,T,!0,p)&&O}if(U=p.g=u,O=ka(U,T,!0,p)&&O,O=ka(U,T,!1,p)&&O,m)for(N=0;N<m.length;N++)U=p.g=m[N],O=ka(U,T,!1,p)&&O}Zt.prototype.N=function(){if(Zt.aa.N.call(this),this.i){var u=this.i,p;for(p in u.g){for(var m=u.g[p],T=0;T<m.length;T++)Ea(m[T]);delete u.g[p],u.h--}}this.F=null},Zt.prototype.K=function(u,p,m,T){return this.i.add(String(u),p,!1,m,T)},Zt.prototype.L=function(u,p,m,T){return this.i.add(String(u),p,!0,m,T)};function ka(u,p,m,T){if(p=u.i.g[String(p)],!p)return!0;p=p.concat();for(var O=!0,N=0;N<p.length;++N){var U=p[N];if(U&&!U.da&&U.capture==m){var _t=U.listener,Kt=U.ha||U.src;U.fa&&Wl(u.i,U),O=_t.call(Kt,T)!==!1&&O}}return O&&!T.defaultPrevented}function Ih(u,p,m){if(typeof u=="function")m&&(u=f(u,m));else if(u&&typeof u.handleEvent=="function")u=f(u.handleEvent,u);else throw Error("Invalid listener argument");return 2147483647<Number(p)?-1:o.setTimeout(u,p||0)}function Th(u){u.g=Ih(()=>{u.g=null,u.i&&(u.i=!1,Th(u))},u.l);const p=u.h;u.h=null,u.m.apply(null,p)}class lw extends oe{constructor(p,m){super(),this.m=p,this.l=m,this.h=null,this.i=!1,this.g=null}j(p){this.h=arguments,this.g?this.i=!0:Th(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Us(u){oe.call(this),this.h=u,this.g={}}y(Us,oe);var Eh=[];function xh(u){C(u.g,function(p,m){this.g.hasOwnProperty(m)&&Ql(p)},u),u.g={}}Us.prototype.N=function(){Us.aa.N.call(this),xh(this)},Us.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Zl=o.JSON.stringify,cw=o.JSON.parse,uw=class{stringify(u){return o.JSON.stringify(u,void 0)}parse(u){return o.JSON.parse(u,void 0)}};function tc(){}tc.prototype.h=null;function kh(u){return u.h||(u.h=u.i())}function Ah(){}var js={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ec(){Ct.call(this,"d")}y(ec,Ct);function nc(){Ct.call(this,"c")}y(nc,Ct);var ti={},Sh=null;function Aa(){return Sh=Sh||new Zt}ti.La="serverreachability";function Ph(u){Ct.call(this,ti.La,u)}y(Ph,Ct);function zs(u){const p=Aa();le(p,new Ph(p))}ti.STAT_EVENT="statevent";function Rh(u,p){Ct.call(this,ti.STAT_EVENT,u),this.stat=p}y(Rh,Ct);function ce(u){const p=Aa();le(p,new Rh(p,u))}ti.Ma="timingevent";function Ch(u,p){Ct.call(this,ti.Ma,u),this.size=p}y(Ch,Ct);function $s(u,p){if(typeof u!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){u()},p)}function Hs(){this.g=!0}Hs.prototype.xa=function(){this.g=!1};function dw(u,p,m,T,O,N){u.info(function(){if(u.g)if(N)for(var U="",_t=N.split("&"),Kt=0;Kt<_t.length;Kt++){var ut=_t[Kt].split("=");if(1<ut.length){var te=ut[0];ut=ut[1];var ee=te.split("_");U=2<=ee.length&&ee[1]=="type"?U+(te+"="+ut+"&"):U+(te+"=redacted&")}}else U=null;else U=N;return"XMLHTTP REQ ("+T+") [attempt "+O+"]: "+p+`
`+m+`
`+U})}function hw(u,p,m,T,O,N,U){u.info(function(){return"XMLHTTP RESP ("+T+") [ attempt "+O+"]: "+p+`
`+m+`
`+N+" "+U})}function Ki(u,p,m,T){u.info(function(){return"XMLHTTP TEXT ("+p+"): "+pw(u,m)+(T?" "+T:"")})}function fw(u,p){u.info(function(){return"TIMEOUT: "+p})}Hs.prototype.info=function(){};function pw(u,p){if(!u.g)return p;if(!p)return null;try{var m=JSON.parse(p);if(m){for(u=0;u<m.length;u++)if(Array.isArray(m[u])){var T=m[u];if(!(2>T.length)){var O=T[1];if(Array.isArray(O)&&!(1>O.length)){var N=O[0];if(N!="noop"&&N!="stop"&&N!="close")for(var U=1;U<O.length;U++)O[U]=""}}}}return Zl(m)}catch{return p}}var Sa={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Dh={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ic;function Pa(){}y(Pa,tc),Pa.prototype.g=function(){return new XMLHttpRequest},Pa.prototype.i=function(){return{}},ic=new Pa;function Tn(u,p,m,T){this.j=u,this.i=p,this.l=m,this.R=T||1,this.U=new Us(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Mh}function Mh(){this.i=null,this.g="",this.h=!1}var Oh={},sc={};function rc(u,p,m){u.L=1,u.v=Ma(Xe(p)),u.m=m,u.P=!0,Vh(u,null)}function Vh(u,p){u.F=Date.now(),Ra(u),u.A=Xe(u.v);var m=u.A,T=u.R;Array.isArray(T)||(T=[String(T)]),Yh(m.i,"t",T),u.C=0,m=u.j.J,u.h=new Mh,u.g=pf(u.j,m?p:null,!u.m),0<u.O&&(u.M=new lw(f(u.Y,u,u.g),u.O)),p=u.U,m=u.g,T=u.ca;var O="readystatechange";Array.isArray(O)||(O&&(Eh[0]=O.toString()),O=Eh);for(var N=0;N<O.length;N++){var U=_h(m,O[N],T||p.handleEvent,!1,p.h||p);if(!U)break;p.g[U.key]=U}p=u.H?_(u.H):{},u.m?(u.u||(u.u="POST"),p["Content-Type"]="application/x-www-form-urlencoded",u.g.ea(u.A,u.u,u.m,p)):(u.u="GET",u.g.ea(u.A,u.u,null,p)),zs(),dw(u.i,u.u,u.A,u.l,u.R,u.m)}Tn.prototype.ca=function(u){u=u.target;const p=this.M;p&&Ze(u)==3?p.j():this.Y(u)},Tn.prototype.Y=function(u){try{if(u==this.g)t:{const ee=Ze(this.g);var p=this.g.Ba();const Qi=this.g.Z();if(!(3>ee)&&(ee!=3||this.g&&(this.h.h||this.g.oa()||nf(this.g)))){this.J||ee!=4||p==7||(p==8||0>=Qi?zs(3):zs(2)),ac(this);var m=this.g.Z();this.X=m;e:if(Nh(this)){var T=nf(this.g);u="";var O=T.length,N=Ze(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ei(this),qs(this);var U="";break e}this.h.i=new o.TextDecoder}for(p=0;p<O;p++)this.h.h=!0,u+=this.h.i.decode(T[p],{stream:!(N&&p==O-1)});T.length=0,this.h.g+=u,this.C=0,U=this.h.g}else U=this.g.oa();if(this.o=m==200,hw(this.i,this.u,this.A,this.l,this.R,ee,m),this.o){if(this.T&&!this.K){e:{if(this.g){var _t,Kt=this.g;if((_t=Kt.g?Kt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!S(_t)){var ut=_t;break e}}ut=null}if(m=ut)Ki(this.i,this.l,m,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,oc(this,m);else{this.o=!1,this.s=3,ce(12),ei(this),qs(this);break t}}if(this.P){m=!0;let Re;for(;!this.J&&this.C<U.length;)if(Re=gw(this,U),Re==sc){ee==4&&(this.s=4,ce(14),m=!1),Ki(this.i,this.l,null,"[Incomplete Response]");break}else if(Re==Oh){this.s=4,ce(15),Ki(this.i,this.l,U,"[Invalid Chunk]"),m=!1;break}else Ki(this.i,this.l,Re,null),oc(this,Re);if(Nh(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ee!=4||U.length!=0||this.h.h||(this.s=1,ce(16),m=!1),this.o=this.o&&m,!m)Ki(this.i,this.l,U,"[Invalid Chunked Response]"),ei(this),qs(this);else if(0<U.length&&!this.W){this.W=!0;var te=this.j;te.g==this&&te.ba&&!te.M&&(te.j.info("Great, no buffering proxy detected. Bytes received: "+U.length),fc(te),te.M=!0,ce(11))}}else Ki(this.i,this.l,U,null),oc(this,U);ee==4&&ei(this),this.o&&!this.J&&(ee==4?uf(this.j,this):(this.o=!1,Ra(this)))}else Dw(this.g),m==400&&0<U.indexOf("Unknown SID")?(this.s=3,ce(12)):(this.s=0,ce(13)),ei(this),qs(this)}}}catch{}finally{}};function Nh(u){return u.g?u.u=="GET"&&u.L!=2&&u.j.Ca:!1}function gw(u,p){var m=u.C,T=p.indexOf(`
`,m);return T==-1?sc:(m=Number(p.substring(m,T)),isNaN(m)?Oh:(T+=1,T+m>p.length?sc:(p=p.slice(T,T+m),u.C=T+m,p)))}Tn.prototype.cancel=function(){this.J=!0,ei(this)};function Ra(u){u.S=Date.now()+u.I,Lh(u,u.I)}function Lh(u,p){if(u.B!=null)throw Error("WatchDog timer not null");u.B=$s(f(u.ba,u),p)}function ac(u){u.B&&(o.clearTimeout(u.B),u.B=null)}Tn.prototype.ba=function(){this.B=null;const u=Date.now();0<=u-this.S?(fw(this.i,this.A),this.L!=2&&(zs(),ce(17)),ei(this),this.s=2,qs(this)):Lh(this,this.S-u)};function qs(u){u.j.G==0||u.J||uf(u.j,u)}function ei(u){ac(u);var p=u.M;p&&typeof p.ma=="function"&&p.ma(),u.M=null,xh(u.U),u.g&&(p=u.g,u.g=null,p.abort(),p.ma())}function oc(u,p){try{var m=u.j;if(m.G!=0&&(m.g==u||lc(m.h,u))){if(!u.K&&lc(m.h,u)&&m.G==3){try{var T=m.Da.g.parse(p)}catch{T=null}if(Array.isArray(T)&&T.length==3){var O=T;if(O[0]==0){t:if(!m.u){if(m.g)if(m.g.F+3e3<u.F)Ba(m),La(m);else break t;hc(m),ce(18)}}else m.za=O[1],0<m.za-m.T&&37500>O[2]&&m.F&&m.v==0&&!m.C&&(m.C=$s(f(m.Za,m),6e3));if(1>=Uh(m.h)&&m.ca){try{m.ca()}catch{}m.ca=void 0}}else ii(m,11)}else if((u.K||m.g==u)&&Ba(m),!S(p))for(O=m.Da.g.parse(p),p=0;p<O.length;p++){let ut=O[p];if(m.T=ut[0],ut=ut[1],m.G==2)if(ut[0]=="c"){m.K=ut[1],m.ia=ut[2];const te=ut[3];te!=null&&(m.la=te,m.j.info("VER="+m.la));const ee=ut[4];ee!=null&&(m.Aa=ee,m.j.info("SVER="+m.Aa));const Qi=ut[5];Qi!=null&&typeof Qi=="number"&&0<Qi&&(T=1.5*Qi,m.L=T,m.j.info("backChannelRequestTimeoutMs_="+T)),T=m;const Re=u.g;if(Re){const ja=Re.g?Re.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ja){var N=T.h;N.g||ja.indexOf("spdy")==-1&&ja.indexOf("quic")==-1&&ja.indexOf("h2")==-1||(N.j=N.l,N.g=new Set,N.h&&(cc(N,N.h),N.h=null))}if(T.D){const pc=Re.g?Re.g.getResponseHeader("X-HTTP-Session-Id"):null;pc&&(T.ya=pc,vt(T.I,T.D,pc))}}m.G=3,m.l&&m.l.ua(),m.ba&&(m.R=Date.now()-u.F,m.j.info("Handshake RTT: "+m.R+"ms")),T=m;var U=u;if(T.qa=ff(T,T.J?T.ia:null,T.W),U.K){jh(T.h,U);var _t=U,Kt=T.L;Kt&&(_t.I=Kt),_t.B&&(ac(_t),Ra(_t)),T.g=U}else lf(T);0<m.i.length&&Fa(m)}else ut[0]!="stop"&&ut[0]!="close"||ii(m,7);else m.G==3&&(ut[0]=="stop"||ut[0]=="close"?ut[0]=="stop"?ii(m,7):dc(m):ut[0]!="noop"&&m.l&&m.l.ta(ut),m.v=0)}}zs(4)}catch{}}var mw=class{constructor(u,p){this.g=u,this.map=p}};function Fh(u){this.l=u||10,o.PerformanceNavigationTiming?(u=o.performance.getEntriesByType("navigation"),u=0<u.length&&(u[0].nextHopProtocol=="hq"||u[0].nextHopProtocol=="h2")):u=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=u?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Bh(u){return u.h?!0:u.g?u.g.size>=u.j:!1}function Uh(u){return u.h?1:u.g?u.g.size:0}function lc(u,p){return u.h?u.h==p:u.g?u.g.has(p):!1}function cc(u,p){u.g?u.g.add(p):u.h=p}function jh(u,p){u.h&&u.h==p?u.h=null:u.g&&u.g.has(p)&&u.g.delete(p)}Fh.prototype.cancel=function(){if(this.i=zh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const u of this.g.values())u.cancel();this.g.clear()}};function zh(u){if(u.h!=null)return u.i.concat(u.h.D);if(u.g!=null&&u.g.size!==0){let p=u.i;for(const m of u.g.values())p=p.concat(m.D);return p}return v(u.i)}function yw(u){if(u.V&&typeof u.V=="function")return u.V();if(typeof Map<"u"&&u instanceof Map||typeof Set<"u"&&u instanceof Set)return Array.from(u.values());if(typeof u=="string")return u.split("");if(l(u)){for(var p=[],m=u.length,T=0;T<m;T++)p.push(u[T]);return p}p=[],m=0;for(T in u)p[m++]=u[T];return p}function _w(u){if(u.na&&typeof u.na=="function")return u.na();if(!u.V||typeof u.V!="function"){if(typeof Map<"u"&&u instanceof Map)return Array.from(u.keys());if(!(typeof Set<"u"&&u instanceof Set)){if(l(u)||typeof u=="string"){var p=[];u=u.length;for(var m=0;m<u;m++)p.push(m);return p}p=[],m=0;for(const T in u)p[m++]=T;return p}}}function $h(u,p){if(u.forEach&&typeof u.forEach=="function")u.forEach(p,void 0);else if(l(u)||typeof u=="string")Array.prototype.forEach.call(u,p,void 0);else for(var m=_w(u),T=yw(u),O=T.length,N=0;N<O;N++)p.call(void 0,T[N],m&&m[N],u)}var Hh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function bw(u,p){if(u){u=u.split("&");for(var m=0;m<u.length;m++){var T=u[m].indexOf("="),O=null;if(0<=T){var N=u[m].substring(0,T);O=u[m].substring(T+1)}else N=u[m];p(N,O?decodeURIComponent(O.replace(/\+/g," ")):"")}}}function ni(u){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,u instanceof ni){this.h=u.h,Ca(this,u.j),this.o=u.o,this.g=u.g,Da(this,u.s),this.l=u.l;var p=u.i,m=new Gs;m.i=p.i,p.g&&(m.g=new Map(p.g),m.h=p.h),qh(this,m),this.m=u.m}else u&&(p=String(u).match(Hh))?(this.h=!1,Ca(this,p[1]||"",!0),this.o=Ws(p[2]||""),this.g=Ws(p[3]||"",!0),Da(this,p[4]),this.l=Ws(p[5]||"",!0),qh(this,p[6]||"",!0),this.m=Ws(p[7]||"")):(this.h=!1,this.i=new Gs(null,this.h))}ni.prototype.toString=function(){var u=[],p=this.j;p&&u.push(Ks(p,Wh,!0),":");var m=this.g;return(m||p=="file")&&(u.push("//"),(p=this.o)&&u.push(Ks(p,Wh,!0),"@"),u.push(encodeURIComponent(String(m)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.s,m!=null&&u.push(":",String(m))),(m=this.l)&&(this.g&&m.charAt(0)!="/"&&u.push("/"),u.push(Ks(m,m.charAt(0)=="/"?Iw:ww,!0))),(m=this.i.toString())&&u.push("?",m),(m=this.m)&&u.push("#",Ks(m,Ew)),u.join("")};function Xe(u){return new ni(u)}function Ca(u,p,m){u.j=m?Ws(p,!0):p,u.j&&(u.j=u.j.replace(/:$/,""))}function Da(u,p){if(p){if(p=Number(p),isNaN(p)||0>p)throw Error("Bad port number "+p);u.s=p}else u.s=null}function qh(u,p,m){p instanceof Gs?(u.i=p,xw(u.i,u.h)):(m||(p=Ks(p,Tw)),u.i=new Gs(p,u.h))}function vt(u,p,m){u.i.set(p,m)}function Ma(u){return vt(u,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),u}function Ws(u,p){return u?p?decodeURI(u.replace(/%25/g,"%2525")):decodeURIComponent(u):""}function Ks(u,p,m){return typeof u=="string"?(u=encodeURI(u).replace(p,vw),m&&(u=u.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u):null}function vw(u){return u=u.charCodeAt(0),"%"+(u>>4&15).toString(16)+(u&15).toString(16)}var Wh=/[#\/\?@]/g,ww=/[#\?:]/g,Iw=/[#\?]/g,Tw=/[#\?@]/g,Ew=/#/g;function Gs(u,p){this.h=this.g=null,this.i=u||null,this.j=!!p}function En(u){u.g||(u.g=new Map,u.h=0,u.i&&bw(u.i,function(p,m){u.add(decodeURIComponent(p.replace(/\+/g," ")),m)}))}n=Gs.prototype,n.add=function(u,p){En(this),this.i=null,u=Gi(this,u);var m=this.g.get(u);return m||this.g.set(u,m=[]),m.push(p),this.h+=1,this};function Kh(u,p){En(u),p=Gi(u,p),u.g.has(p)&&(u.i=null,u.h-=u.g.get(p).length,u.g.delete(p))}function Gh(u,p){return En(u),p=Gi(u,p),u.g.has(p)}n.forEach=function(u,p){En(this),this.g.forEach(function(m,T){m.forEach(function(O){u.call(p,O,T,this)},this)},this)},n.na=function(){En(this);const u=Array.from(this.g.values()),p=Array.from(this.g.keys()),m=[];for(let T=0;T<p.length;T++){const O=u[T];for(let N=0;N<O.length;N++)m.push(p[T])}return m},n.V=function(u){En(this);let p=[];if(typeof u=="string")Gh(this,u)&&(p=p.concat(this.g.get(Gi(this,u))));else{u=Array.from(this.g.values());for(let m=0;m<u.length;m++)p=p.concat(u[m])}return p},n.set=function(u,p){return En(this),this.i=null,u=Gi(this,u),Gh(this,u)&&(this.h-=this.g.get(u).length),this.g.set(u,[p]),this.h+=1,this},n.get=function(u,p){return u?(u=this.V(u),0<u.length?String(u[0]):p):p};function Yh(u,p,m){Kh(u,p),0<m.length&&(u.i=null,u.g.set(Gi(u,p),v(m)),u.h+=m.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const u=[],p=Array.from(this.g.keys());for(var m=0;m<p.length;m++){var T=p[m];const N=encodeURIComponent(String(T)),U=this.V(T);for(T=0;T<U.length;T++){var O=N;U[T]!==""&&(O+="="+encodeURIComponent(String(U[T]))),u.push(O)}}return this.i=u.join("&")};function Gi(u,p){return p=String(p),u.j&&(p=p.toLowerCase()),p}function xw(u,p){p&&!u.j&&(En(u),u.i=null,u.g.forEach(function(m,T){var O=T.toLowerCase();T!=O&&(Kh(this,T),Yh(this,O,m))},u)),u.j=p}function kw(u,p){const m=new Hs;if(o.Image){const T=new Image;T.onload=g(xn,m,"TestLoadImage: loaded",!0,p,T),T.onerror=g(xn,m,"TestLoadImage: error",!1,p,T),T.onabort=g(xn,m,"TestLoadImage: abort",!1,p,T),T.ontimeout=g(xn,m,"TestLoadImage: timeout",!1,p,T),o.setTimeout(function(){T.ontimeout&&T.ontimeout()},1e4),T.src=u}else p(!1)}function Aw(u,p){const m=new Hs,T=new AbortController,O=setTimeout(()=>{T.abort(),xn(m,"TestPingServer: timeout",!1,p)},1e4);fetch(u,{signal:T.signal}).then(N=>{clearTimeout(O),N.ok?xn(m,"TestPingServer: ok",!0,p):xn(m,"TestPingServer: server error",!1,p)}).catch(()=>{clearTimeout(O),xn(m,"TestPingServer: error",!1,p)})}function xn(u,p,m,T,O){try{O&&(O.onload=null,O.onerror=null,O.onabort=null,O.ontimeout=null),T(m)}catch{}}function Sw(){this.g=new uw}function Pw(u,p,m){const T=m||"";try{$h(u,function(O,N){let U=O;c(O)&&(U=Zl(O)),p.push(T+N+"="+encodeURIComponent(U))})}catch(O){throw p.push(T+"type="+encodeURIComponent("_badmap")),O}}function Oa(u){this.l=u.Ub||null,this.j=u.eb||!1}y(Oa,tc),Oa.prototype.g=function(){return new Va(this.l,this.j)},Oa.prototype.i=function(u){return function(){return u}}({});function Va(u,p){Zt.call(this),this.D=u,this.o=p,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}y(Va,Zt),n=Va.prototype,n.open=function(u,p){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=u,this.A=p,this.readyState=1,Qs(this)},n.send=function(u){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const p={headers:this.u,method:this.B,credentials:this.m,cache:void 0};u&&(p.body=u),(this.D||o).fetch(new Request(this.A,p)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ys(this)),this.readyState=0},n.Sa=function(u){if(this.g&&(this.l=u,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=u.headers,this.readyState=2,Qs(this)),this.g&&(this.readyState=3,Qs(this),this.g)))if(this.responseType==="arraybuffer")u.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in u){if(this.j=u.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Qh(this)}else u.text().then(this.Ra.bind(this),this.ga.bind(this))};function Qh(u){u.j.read().then(u.Pa.bind(u)).catch(u.ga.bind(u))}n.Pa=function(u){if(this.g){if(this.o&&u.value)this.response.push(u.value);else if(!this.o){var p=u.value?u.value:new Uint8Array(0);(p=this.v.decode(p,{stream:!u.done}))&&(this.response=this.responseText+=p)}u.done?Ys(this):Qs(this),this.readyState==3&&Qh(this)}},n.Ra=function(u){this.g&&(this.response=this.responseText=u,Ys(this))},n.Qa=function(u){this.g&&(this.response=u,Ys(this))},n.ga=function(){this.g&&Ys(this)};function Ys(u){u.readyState=4,u.l=null,u.j=null,u.v=null,Qs(u)}n.setRequestHeader=function(u,p){this.u.append(u,p)},n.getResponseHeader=function(u){return this.h&&this.h.get(u.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const u=[],p=this.h.entries();for(var m=p.next();!m.done;)m=m.value,u.push(m[0]+": "+m[1]),m=p.next();return u.join(`\r
`)};function Qs(u){u.onreadystatechange&&u.onreadystatechange.call(u)}Object.defineProperty(Va.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(u){this.m=u?"include":"same-origin"}});function Jh(u){let p="";return C(u,function(m,T){p+=T,p+=":",p+=m,p+=`\r
`}),p}function uc(u,p,m){t:{for(T in m){var T=!1;break t}T=!0}T||(m=Jh(m),typeof u=="string"?m!=null&&encodeURIComponent(String(m)):vt(u,p,m))}function Dt(u){Zt.call(this),this.headers=new Map,this.o=u||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}y(Dt,Zt);var Rw=/^https?$/i,Cw=["POST","PUT"];n=Dt.prototype,n.Ha=function(u){this.J=u},n.ea=function(u,p,m,T){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+u);p=p?p.toUpperCase():"GET",this.D=u,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ic.g(),this.v=this.o?kh(this.o):kh(ic),this.g.onreadystatechange=f(this.Ea,this);try{this.B=!0,this.g.open(p,String(u),!0),this.B=!1}catch(N){Xh(this,N);return}if(u=m||"",m=new Map(this.headers),T)if(Object.getPrototypeOf(T)===Object.prototype)for(var O in T)m.set(O,T[O]);else if(typeof T.keys=="function"&&typeof T.get=="function")for(const N of T.keys())m.set(N,T.get(N));else throw Error("Unknown input type for opt_headers: "+String(T));T=Array.from(m.keys()).find(N=>N.toLowerCase()=="content-type"),O=o.FormData&&u instanceof o.FormData,!(0<=Array.prototype.indexOf.call(Cw,p,void 0))||T||O||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[N,U]of m)this.g.setRequestHeader(N,U);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{ef(this),this.u=!0,this.g.send(u),this.u=!1}catch(N){Xh(this,N)}};function Xh(u,p){u.h=!1,u.g&&(u.j=!0,u.g.abort(),u.j=!1),u.l=p,u.m=5,Zh(u),Na(u)}function Zh(u){u.A||(u.A=!0,le(u,"complete"),le(u,"error"))}n.abort=function(u){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=u||7,le(this,"complete"),le(this,"abort"),Na(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Na(this,!0)),Dt.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?tf(this):this.bb())},n.bb=function(){tf(this)};function tf(u){if(u.h&&typeof a<"u"&&(!u.v[1]||Ze(u)!=4||u.Z()!=2)){if(u.u&&Ze(u)==4)Ih(u.Ea,0,u);else if(le(u,"readystatechange"),Ze(u)==4){u.h=!1;try{const U=u.Z();t:switch(U){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var p=!0;break t;default:p=!1}var m;if(!(m=p)){var T;if(T=U===0){var O=String(u.D).match(Hh)[1]||null;!O&&o.self&&o.self.location&&(O=o.self.location.protocol.slice(0,-1)),T=!Rw.test(O?O.toLowerCase():"")}m=T}if(m)le(u,"complete"),le(u,"success");else{u.m=6;try{var N=2<Ze(u)?u.g.statusText:""}catch{N=""}u.l=N+" ["+u.Z()+"]",Zh(u)}}finally{Na(u)}}}}function Na(u,p){if(u.g){ef(u);const m=u.g,T=u.v[0]?()=>{}:null;u.g=null,u.v=null,p||le(u,"ready");try{m.onreadystatechange=T}catch{}}}function ef(u){u.I&&(o.clearTimeout(u.I),u.I=null)}n.isActive=function(){return!!this.g};function Ze(u){return u.g?u.g.readyState:0}n.Z=function(){try{return 2<Ze(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(u){if(this.g){var p=this.g.responseText;return u&&p.indexOf(u)==0&&(p=p.substring(u.length)),cw(p)}};function nf(u){try{if(!u.g)return null;if("response"in u.g)return u.g.response;switch(u.H){case"":case"text":return u.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in u.g)return u.g.mozResponseArrayBuffer}return null}catch{return null}}function Dw(u){const p={};u=(u.g&&2<=Ze(u)&&u.g.getAllResponseHeaders()||"").split(`\r
`);for(let T=0;T<u.length;T++){if(S(u[T]))continue;var m=k(u[T]);const O=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const N=p[O]||[];p[O]=N,N.push(m)}I(p,function(T){return T.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Js(u,p,m){return m&&m.internalChannelParams&&m.internalChannelParams[u]||p}function sf(u){this.Aa=0,this.i=[],this.j=new Hs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Js("failFast",!1,u),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Js("baseRetryDelayMs",5e3,u),this.cb=Js("retryDelaySeedMs",1e4,u),this.Wa=Js("forwardChannelMaxRetries",2,u),this.wa=Js("forwardChannelRequestTimeoutMs",2e4,u),this.pa=u&&u.xmlHttpFactory||void 0,this.Xa=u&&u.Tb||void 0,this.Ca=u&&u.useFetchStreams||!1,this.L=void 0,this.J=u&&u.supportsCrossDomainXhr||!1,this.K="",this.h=new Fh(u&&u.concurrentRequestLimit),this.Da=new Sw,this.P=u&&u.fastHandshake||!1,this.O=u&&u.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=u&&u.Rb||!1,u&&u.xa&&this.j.xa(),u&&u.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&u&&u.detectBufferingProxy||!1,this.ja=void 0,u&&u.longPollingTimeout&&0<u.longPollingTimeout&&(this.ja=u.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=sf.prototype,n.la=8,n.G=1,n.connect=function(u,p,m,T){ce(0),this.W=u,this.H=p||{},m&&T!==void 0&&(this.H.OSID=m,this.H.OAID=T),this.F=this.X,this.I=ff(this,null,this.W),Fa(this)};function dc(u){if(rf(u),u.G==3){var p=u.U++,m=Xe(u.I);if(vt(m,"SID",u.K),vt(m,"RID",p),vt(m,"TYPE","terminate"),Xs(u,m),p=new Tn(u,u.j,p),p.L=2,p.v=Ma(Xe(m)),m=!1,o.navigator&&o.navigator.sendBeacon)try{m=o.navigator.sendBeacon(p.v.toString(),"")}catch{}!m&&o.Image&&(new Image().src=p.v,m=!0),m||(p.g=pf(p.j,null),p.g.ea(p.v)),p.F=Date.now(),Ra(p)}hf(u)}function La(u){u.g&&(fc(u),u.g.cancel(),u.g=null)}function rf(u){La(u),u.u&&(o.clearTimeout(u.u),u.u=null),Ba(u),u.h.cancel(),u.s&&(typeof u.s=="number"&&o.clearTimeout(u.s),u.s=null)}function Fa(u){if(!Bh(u.h)&&!u.s){u.s=!0;var p=u.Ga;Q||_e(),it||(Q(),it=!0),ft.add(p,u),u.B=0}}function Mw(u,p){return Uh(u.h)>=u.h.j-(u.s?1:0)?!1:u.s?(u.i=p.D.concat(u.i),!0):u.G==1||u.G==2||u.B>=(u.Va?0:u.Wa)?!1:(u.s=$s(f(u.Ga,u,p),df(u,u.B)),u.B++,!0)}n.Ga=function(u){if(this.s)if(this.s=null,this.G==1){if(!u){this.U=Math.floor(1e5*Math.random()),u=this.U++;const O=new Tn(this,this.j,u);let N=this.o;if(this.S&&(N?(N=_(N),E(N,this.S)):N=this.S),this.m!==null||this.O||(O.H=N,N=null),this.P)t:{for(var p=0,m=0;m<this.i.length;m++){e:{var T=this.i[m];if("__data__"in T.map&&(T=T.map.__data__,typeof T=="string")){T=T.length;break e}T=void 0}if(T===void 0)break;if(p+=T,4096<p){p=m;break t}if(p===4096||m===this.i.length-1){p=m+1;break t}}p=1e3}else p=1e3;p=of(this,O,p),m=Xe(this.I),vt(m,"RID",u),vt(m,"CVER",22),this.D&&vt(m,"X-HTTP-Session-Id",this.D),Xs(this,m),N&&(this.O?p="headers="+encodeURIComponent(String(Jh(N)))+"&"+p:this.m&&uc(m,this.m,N)),cc(this.h,O),this.Ua&&vt(m,"TYPE","init"),this.P?(vt(m,"$req",p),vt(m,"SID","null"),O.T=!0,rc(O,m,null)):rc(O,m,p),this.G=2}}else this.G==3&&(u?af(this,u):this.i.length==0||Bh(this.h)||af(this))};function af(u,p){var m;p?m=p.l:m=u.U++;const T=Xe(u.I);vt(T,"SID",u.K),vt(T,"RID",m),vt(T,"AID",u.T),Xs(u,T),u.m&&u.o&&uc(T,u.m,u.o),m=new Tn(u,u.j,m,u.B+1),u.m===null&&(m.H=u.o),p&&(u.i=p.D.concat(u.i)),p=of(u,m,1e3),m.I=Math.round(.5*u.wa)+Math.round(.5*u.wa*Math.random()),cc(u.h,m),rc(m,T,p)}function Xs(u,p){u.H&&C(u.H,function(m,T){vt(p,T,m)}),u.l&&$h({},function(m,T){vt(p,T,m)})}function of(u,p,m){m=Math.min(u.i.length,m);var T=u.l?f(u.l.Na,u.l,u):null;t:{var O=u.i;let N=-1;for(;;){const U=["count="+m];N==-1?0<m?(N=O[0].g,U.push("ofs="+N)):N=0:U.push("ofs="+N);let _t=!0;for(let Kt=0;Kt<m;Kt++){let ut=O[Kt].g;const te=O[Kt].map;if(ut-=N,0>ut)N=Math.max(0,O[Kt].g-100),_t=!1;else try{Pw(te,U,"req"+ut+"_")}catch{T&&T(te)}}if(_t){T=U.join("&");break t}}}return u=u.i.splice(0,m),p.D=u,T}function lf(u){if(!u.g&&!u.u){u.Y=1;var p=u.Fa;Q||_e(),it||(Q(),it=!0),ft.add(p,u),u.v=0}}function hc(u){return u.g||u.u||3<=u.v?!1:(u.Y++,u.u=$s(f(u.Fa,u),df(u,u.v)),u.v++,!0)}n.Fa=function(){if(this.u=null,cf(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var u=2*this.R;this.j.info("BP detection timer enabled: "+u),this.A=$s(f(this.ab,this),u)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ce(10),La(this),cf(this))};function fc(u){u.A!=null&&(o.clearTimeout(u.A),u.A=null)}function cf(u){u.g=new Tn(u,u.j,"rpc",u.Y),u.m===null&&(u.g.H=u.o),u.g.O=0;var p=Xe(u.qa);vt(p,"RID","rpc"),vt(p,"SID",u.K),vt(p,"AID",u.T),vt(p,"CI",u.F?"0":"1"),!u.F&&u.ja&&vt(p,"TO",u.ja),vt(p,"TYPE","xmlhttp"),Xs(u,p),u.m&&u.o&&uc(p,u.m,u.o),u.L&&(u.g.I=u.L);var m=u.g;u=u.ia,m.L=1,m.v=Ma(Xe(p)),m.m=null,m.P=!0,Vh(m,u)}n.Za=function(){this.C!=null&&(this.C=null,La(this),hc(this),ce(19))};function Ba(u){u.C!=null&&(o.clearTimeout(u.C),u.C=null)}function uf(u,p){var m=null;if(u.g==p){Ba(u),fc(u),u.g=null;var T=2}else if(lc(u.h,p))m=p.D,jh(u.h,p),T=1;else return;if(u.G!=0){if(p.o)if(T==1){m=p.m?p.m.length:0,p=Date.now()-p.F;var O=u.B;T=Aa(),le(T,new Ch(T,m)),Fa(u)}else lf(u);else if(O=p.s,O==3||O==0&&0<p.X||!(T==1&&Mw(u,p)||T==2&&hc(u)))switch(m&&0<m.length&&(p=u.h,p.i=p.i.concat(m)),O){case 1:ii(u,5);break;case 4:ii(u,10);break;case 3:ii(u,6);break;default:ii(u,2)}}}function df(u,p){let m=u.Ta+Math.floor(Math.random()*u.cb);return u.isActive()||(m*=2),m*p}function ii(u,p){if(u.j.info("Error code "+p),p==2){var m=f(u.fb,u),T=u.Xa;const O=!T;T=new ni(T||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Ca(T,"https"),Ma(T),O?kw(T.toString(),m):Aw(T.toString(),m)}else ce(2);u.G=0,u.l&&u.l.sa(p),hf(u),rf(u)}n.fb=function(u){u?(this.j.info("Successfully pinged google.com"),ce(2)):(this.j.info("Failed to ping google.com"),ce(1))};function hf(u){if(u.G=0,u.ka=[],u.l){const p=zh(u.h);(p.length!=0||u.i.length!=0)&&(w(u.ka,p),w(u.ka,u.i),u.h.i.length=0,v(u.i),u.i.length=0),u.l.ra()}}function ff(u,p,m){var T=m instanceof ni?Xe(m):new ni(m);if(T.g!="")p&&(T.g=p+"."+T.g),Da(T,T.s);else{var O=o.location;T=O.protocol,p=p?p+"."+O.hostname:O.hostname,O=+O.port;var N=new ni(null);T&&Ca(N,T),p&&(N.g=p),O&&Da(N,O),m&&(N.l=m),T=N}return m=u.D,p=u.ya,m&&p&&vt(T,m,p),vt(T,"VER",u.la),Xs(u,T),T}function pf(u,p,m){if(p&&!u.J)throw Error("Can't create secondary domain capable XhrIo object.");return p=u.Ca&&!u.pa?new Dt(new Oa({eb:m})):new Dt(u.pa),p.Ha(u.J),p}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function gf(){}n=gf.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Ua(){}Ua.prototype.g=function(u,p){return new be(u,p)};function be(u,p){Zt.call(this),this.g=new sf(p),this.l=u,this.h=p&&p.messageUrlParams||null,u=p&&p.messageHeaders||null,p&&p.clientProtocolHeaderRequired&&(u?u["X-Client-Protocol"]="webchannel":u={"X-Client-Protocol":"webchannel"}),this.g.o=u,u=p&&p.initMessageHeaders||null,p&&p.messageContentType&&(u?u["X-WebChannel-Content-Type"]=p.messageContentType:u={"X-WebChannel-Content-Type":p.messageContentType}),p&&p.va&&(u?u["X-WebChannel-Client-Profile"]=p.va:u={"X-WebChannel-Client-Profile":p.va}),this.g.S=u,(u=p&&p.Sb)&&!S(u)&&(this.g.m=u),this.v=p&&p.supportsCrossDomainXhr||!1,this.u=p&&p.sendRawJson||!1,(p=p&&p.httpSessionIdParam)&&!S(p)&&(this.g.D=p,u=this.h,u!==null&&p in u&&(u=this.h,p in u&&delete u[p])),this.j=new Yi(this)}y(be,Zt),be.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},be.prototype.close=function(){dc(this.g)},be.prototype.o=function(u){var p=this.g;if(typeof u=="string"){var m={};m.__data__=u,u=m}else this.u&&(m={},m.__data__=Zl(u),u=m);p.i.push(new mw(p.Ya++,u)),p.G==3&&Fa(p)},be.prototype.N=function(){this.g.l=null,delete this.j,dc(this.g),delete this.g,be.aa.N.call(this)};function mf(u){ec.call(this),u.__headers__&&(this.headers=u.__headers__,this.statusCode=u.__status__,delete u.__headers__,delete u.__status__);var p=u.__sm__;if(p){t:{for(const m in p){u=m;break t}u=void 0}(this.i=u)&&(u=this.i,p=p!==null&&u in p?p[u]:void 0),this.data=p}else this.data=u}y(mf,ec);function yf(){nc.call(this),this.status=1}y(yf,nc);function Yi(u){this.g=u}y(Yi,gf),Yi.prototype.ua=function(){le(this.g,"a")},Yi.prototype.ta=function(u){le(this.g,new mf(u))},Yi.prototype.sa=function(u){le(this.g,new yf)},Yi.prototype.ra=function(){le(this.g,"b")},Ua.prototype.createWebChannel=Ua.prototype.g,be.prototype.send=be.prototype.o,be.prototype.open=be.prototype.m,be.prototype.close=be.prototype.close,By=function(){return new Ua},Fy=function(){return Aa()},Ly=ti,nu={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Sa.NO_ERROR=0,Sa.TIMEOUT=8,Sa.HTTP_ERROR=6,po=Sa,Dh.COMPLETE="complete",Ny=Dh,Ah.EventType=js,js.OPEN="a",js.CLOSE="b",js.ERROR="c",js.MESSAGE="d",Zt.prototype.listen=Zt.prototype.K,dr=Ah,Dt.prototype.listenOnce=Dt.prototype.L,Dt.prototype.getLastError=Dt.prototype.Ka,Dt.prototype.getLastErrorCode=Dt.prototype.Ba,Dt.prototype.getStatus=Dt.prototype.Z,Dt.prototype.getResponseJson=Dt.prototype.Oa,Dt.prototype.getResponseText=Dt.prototype.oa,Dt.prototype.send=Dt.prototype.ea,Dt.prototype.setWithCredentials=Dt.prototype.Ha,Vy=Dt}).apply(typeof $a<"u"?$a:typeof self<"u"?self:typeof window<"u"?window:{});const Gf="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Gt.UNAUTHENTICATED=new Gt(null),Gt.GOOGLE_CREDENTIALS=new Gt("google-credentials-uid"),Gt.FIRST_PARTY=new Gt("first-party-uid"),Gt.MOCK_USER=new Gt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cs="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ei=new zu("@firebase/firestore");function is(){return Ei.logLevel}function F(n,...t){if(Ei.logLevel<=st.DEBUG){const e=t.map(td);Ei.debug(`Firestore (${Cs}): ${n}`,...e)}}function ue(n,...t){if(Ei.logLevel<=st.ERROR){const e=t.map(td);Ei.error(`Firestore (${Cs}): ${n}`,...e)}}function xi(n,...t){if(Ei.logLevel<=st.WARN){const e=t.map(td);Ei.warn(`Firestore (${Cs}): ${n}`,...e)}}function td(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(n="Unexpected state"){const t=`FIRESTORE (${Cs}) INTERNAL ASSERTION FAILED: `+n;throw ue(t),new Error(t)}function W(n,t){n||q()}function J(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class B extends Be{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uy{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class AE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(Gt.UNAUTHENTICATED))}shutdown(){}}class SE{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class PE{constructor(t){this.t=t,this.currentUser=Gt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){W(this.o===void 0);let i=this.i;const s=l=>this.i!==i?(i=this.i,e(l)):Promise.resolve();let r=new Me;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new Me,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const l=r;t.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},o=l=>{F("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>o(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?o(l):(F("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new Me)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(i=>this.i!==t?(F("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(W(typeof i.accessToken=="string"),new Uy(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return W(t===null||typeof t=="string"),new Gt(t)}}class RE{constructor(t,e,i){this.l=t,this.h=e,this.P=i,this.type="FirstParty",this.user=Gt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const t=this.T();return t&&this.I.set("Authorization",t),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class CE{constructor(t,e,i){this.l=t,this.h=e,this.P=i}getToken(){return Promise.resolve(new RE(this.l,this.h,this.P))}start(t,e){t.enqueueRetryable(()=>e(Gt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class DE{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ME{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,e){W(this.o===void 0);const i=r=>{r.error!=null&&F("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);const a=r.token!==this.R;return this.R=r.token,F("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(r.token):Promise.resolve()};this.o=r=>{t.enqueueRetryable(()=>i(r))};const s=r=>{F("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(r=>s(r)),setTimeout(()=>{if(!this.appCheck){const r=this.A.getImmediate({optional:!0});r?s(r):F("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(W(typeof e.token=="string"),this.R=e.token,new DE(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OE(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let i=0;i<n;i++)e[i]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jy{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let i="";for(;i.length<20;){const s=OE(40);for(let r=0;r<s.length;++r)i.length<20&&s[r]<e&&(i+=t.charAt(s[r]%t.length))}return i}}function tt(n,t){return n<t?-1:n>t?1:0}function _s(n,t,e){return n.length===t.length&&n.every((i,s)=>e(i,t[s]))}function zy(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new B(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new B(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new B(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new B(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return Rt.fromMillis(Date.now())}static fromDate(t){return Rt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),i=Math.floor(1e6*(t-1e3*e));return new Rt(e,i)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?tt(this.nanoseconds,t.nanoseconds):tt(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(t){this.timestamp=t}static fromTimestamp(t){return new K(t)}static min(){return new K(new Rt(0,0))}static max(){return new K(new Rt(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(t,e,i){e===void 0?e=0:e>t.length&&q(),i===void 0?i=t.length-e:i>t.length-e&&q(),this.segments=t,this.offset=e,this.len=i}get length(){return this.len}isEqual(t){return Nr.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Nr?t.forEach(i=>{e.push(i)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,i=this.limit();e<i;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const i=Math.min(t.length,e.length);for(let s=0;s<i;s++){const r=t.get(s),a=e.get(s);if(r<a)return-1;if(r>a)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class dt extends Nr{construct(t,e,i){return new dt(t,e,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const i of t){if(i.indexOf("//")>=0)throw new B(L.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);e.push(...i.split("/").filter(s=>s.length>0))}return new dt(e)}static emptyPath(){return new dt([])}}const VE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Pt extends Nr{construct(t,e,i){return new Pt(t,e,i)}static isValidIdentifier(t){return VE.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Pt.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Pt(["__name__"])}static fromServerFormat(t){const e=[];let i="",s=0;const r=()=>{if(i.length===0)throw new B(L.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(i),i=""};let a=!1;for(;s<t.length;){const o=t[s];if(o==="\\"){if(s+1===t.length)throw new B(L.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const l=t[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new B(L.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);i+=l,s+=2}else o==="`"?(a=!a,s++):o!=="."||a?(i+=o,s++):(r(),s++)}if(r(),a)throw new B(L.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Pt(e)}static emptyPath(){return new Pt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(t){this.path=t}static fromPath(t){return new z(dt.fromString(t))}static fromName(t){return new z(dt.fromString(t).popFirst(5))}static empty(){return new z(dt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&dt.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return dt.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new z(new dt(t.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(t,e,i,s){this.indexId=t,this.collectionGroup=e,this.fields=i,this.indexState=s}}function iu(n){return n.fields.find(t=>t.kind===2)}function ui(n){return n.fields.filter(t=>t.kind!==2)}jo.UNKNOWN_ID=-1;class go{constructor(t,e){this.fieldPath=t,this.kind=e}}class Lr{constructor(t,e){this.sequenceNumber=t,this.offset=e}static empty(){return new Lr(0,Te.min())}}function NE(n,t){const e=n.toTimestamp().seconds,i=n.toTimestamp().nanoseconds+1,s=K.fromTimestamp(i===1e9?new Rt(e+1,0):new Rt(e,i));return new Te(s,z.empty(),t)}function $y(n){return new Te(n.readTime,n.key,-1)}class Te{constructor(t,e,i){this.readTime=t,this.documentKey=e,this.largestBatchId=i}static min(){return new Te(K.min(),z.empty(),-1)}static max(){return new Te(K.max(),z.empty(),-1)}}function ed(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=z.comparator(n.documentKey,t.documentKey),e!==0?e:tt(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hy="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class qy{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zi(n){if(n.code!==L.FAILED_PRECONDITION||n.message!==Hy)throw n;F("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&q(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new V((i,s)=>{this.nextCallback=r=>{this.wrapSuccess(t,r).next(i,s)},this.catchCallback=r=>{this.wrapFailure(e,r).next(i,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof V?e:V.resolve(e)}catch(e){return V.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):V.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):V.reject(e)}static resolve(t){return new V((e,i)=>{e(t)})}static reject(t){return new V((e,i)=>{i(t)})}static waitFor(t){return new V((e,i)=>{let s=0,r=0,a=!1;t.forEach(o=>{++s,o.next(()=>{++r,a&&r===s&&e()},l=>i(l))}),a=!0,r===s&&e()})}static or(t){let e=V.resolve(!1);for(const i of t)e=e.next(s=>s?V.resolve(s):i());return e}static forEach(t,e){const i=[];return t.forEach((s,r)=>{i.push(e.call(this,s,r))}),this.waitFor(i)}static mapArray(t,e){return new V((i,s)=>{const r=t.length,a=new Array(r);let o=0;for(let l=0;l<r;l++){const c=l;e(t[c]).next(d=>{a[c]=d,++o,o===r&&i(a)},d=>s(d))}})}static doWhile(t,e){return new V((i,s)=>{const r=()=>{t()===!0?e().next(()=>{r()},s):i()};r()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ml{constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.V=new Me,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{e.error?this.V.reject(new Ir(t,e.error)):this.V.resolve()},this.transaction.onerror=i=>{const s=nd(i.target.error);this.V.reject(new Ir(t,s))}}static open(t,e,i,s){try{return new ml(e,t.transaction(s,i))}catch(r){throw new Ir(e,r)}}get m(){return this.V.promise}abort(t){t&&this.V.reject(t),this.aborted||(F("SimpleDb","Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const t=this.transaction;this.aborted||typeof t.commit!="function"||t.commit()}store(t){const e=this.transaction.objectStore(t);return new FE(e)}}class zn{constructor(t,e,i){this.name=t,this.version=e,this.p=i,zn.S(zt())===12.2&&ue("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(t){return F("SimpleDb","Removing database:",t),fi(window.indexedDB.deleteDatabase(t)).toPromise()}static D(){if(!ju())return!1;if(zn.v())return!0;const t=zt(),e=zn.S(t),i=0<e&&e<10,s=Wy(t),r=0<s&&s<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||i||r)}static v(){var t;return typeof process<"u"&&((t=process.__PRIVATE_env)===null||t===void 0?void 0:t.C)==="YES"}static F(t,e){return t.store(e)}static S(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),i=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(i)}async M(t){return this.db||(F("SimpleDb","Opening database:",this.name),this.db=await new Promise((e,i)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=r=>{const a=r.target.result;e(a)},s.onblocked=()=>{i(new Ir(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=r=>{const a=r.target.error;a.name==="VersionError"?i(new B(L.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?i(new B(L.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):i(new Ir(t,a))},s.onupgradeneeded=r=>{F("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',r.oldVersion);const a=r.target.result;this.p.O(a,s.transaction,r.oldVersion,this.version).next(()=>{F("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=e=>this.N(e)),this.db}L(t){this.N=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,i,s){const r=e==="readonly";let a=0;for(;;){++a;try{this.db=await this.M(t);const o=ml.open(this.db,t,r?"readonly":"readwrite",i),l=s(o).next(c=>(o.g(),c)).catch(c=>(o.abort(c),V.reject(c))).toPromise();return l.catch(()=>{}),await o.m,l}catch(o){const l=o,c=l.name!=="FirebaseError"&&a<3;if(F("SimpleDb","Transaction failed with error:",l.message,"Retrying:",c),this.close(),!c)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Wy(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}class LE{constructor(t){this.B=t,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(t){this.B=t}done(){this.k=!0}$(t){this.q=t}delete(){return fi(this.B.delete())}}class Ir extends B{constructor(t,e){super(L.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function Jn(n){return n.name==="IndexedDbTransactionError"}class FE{constructor(t){this.store=t}put(t,e){let i;return e!==void 0?(F("SimpleDb","PUT",this.store.name,t,e),i=this.store.put(e,t)):(F("SimpleDb","PUT",this.store.name,"<auto-key>",t),i=this.store.put(t)),fi(i)}add(t){return F("SimpleDb","ADD",this.store.name,t,t),fi(this.store.add(t))}get(t){return fi(this.store.get(t)).next(e=>(e===void 0&&(e=null),F("SimpleDb","GET",this.store.name,t,e),e))}delete(t){return F("SimpleDb","DELETE",this.store.name,t),fi(this.store.delete(t))}count(){return F("SimpleDb","COUNT",this.store.name),fi(this.store.count())}U(t,e){const i=this.options(t,e),s=i.index?this.store.index(i.index):this.store;if(typeof s.getAll=="function"){const r=s.getAll(i.range);return new V((a,o)=>{r.onerror=l=>{o(l.target.error)},r.onsuccess=l=>{a(l.target.result)}})}{const r=this.cursor(i),a=[];return this.W(r,(o,l)=>{a.push(l)}).next(()=>a)}}G(t,e){const i=this.store.getAll(t,e===null?void 0:e);return new V((s,r)=>{i.onerror=a=>{r(a.target.error)},i.onsuccess=a=>{s(a.target.result)}})}j(t,e){F("SimpleDb","DELETE ALL",this.store.name);const i=this.options(t,e);i.H=!1;const s=this.cursor(i);return this.W(s,(r,a,o)=>o.delete())}J(t,e){let i;e?i=t:(i={},e=t);const s=this.cursor(i);return this.W(s,e)}Y(t){const e=this.cursor({});return new V((i,s)=>{e.onerror=r=>{const a=nd(r.target.error);s(a)},e.onsuccess=r=>{const a=r.target.result;a?t(a.primaryKey,a.value).next(o=>{o?a.continue():i()}):i()}})}W(t,e){const i=[];return new V((s,r)=>{t.onerror=a=>{r(a.target.error)},t.onsuccess=a=>{const o=a.target.result;if(!o)return void s();const l=new LE(o),c=e(o.primaryKey,o.value,l);if(c instanceof V){const d=c.catch(h=>(l.done(),V.reject(h)));i.push(d)}l.isDone?s():l.K===null?o.continue():o.continue(l.K)}}).next(()=>V.waitFor(i))}options(t,e){let i;return t!==void 0&&(typeof t=="string"?i=t:e=t),{index:i,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const i=this.store.index(t.index);return t.H?i.openKeyCursor(t.range,e):i.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function fi(n){return new V((t,e)=>{n.onsuccess=i=>{const s=i.target.result;t(s)},n.onerror=i=>{const s=nd(i.target.error);e(s)}})}let Yf=!1;function nd(n){const t=zn.S(zt());if(t>=12.2&&t<13){const e="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(e)>=0){const i=new B("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Yf||(Yf=!0,setTimeout(()=>{throw i},0)),i}}return n}class BE{constructor(t,e){this.asyncQueue=t,this.Z=e,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(t){F("IndexBackfiller",`Scheduled in ${t}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",t,async()=>{this.task=null;try{F("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(e){Jn(e)?F("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",e):await zi(e)}await this.X(6e4)})}}class UE{constructor(t,e){this.localStore=t,this.persistence=e}async ee(t=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",e=>this.te(e,t))}te(t,e){const i=new Set;let s=e,r=!0;return V.doWhile(()=>r===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(t).next(a=>{if(a!==null&&!i.has(a))return F("IndexBackfiller",`Processing collection: ${a}`),this.ne(t,a,s).next(o=>{s-=o,i.add(a)});r=!1})).next(()=>e-s)}ne(t,e,i){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(t,e).next(s=>this.localStore.localDocuments.getNextDocuments(t,e,s,i).next(r=>{const a=r.changes;return this.localStore.indexManager.updateIndexEntries(t,a).next(()=>this.re(s,r)).next(o=>(F("IndexBackfiller",`Updating offset: ${o}`),this.localStore.indexManager.updateCollectionGroup(t,e,o))).next(()=>a.size)}))}re(t,e){let i=t;return e.changes.forEach((s,r)=>{const a=$y(r);ed(a,i)>0&&(i=a)}),new Te(i.readTime,i.documentKey,Math.max(e.batchId,t.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=i=>this.ie(i),this.se=i=>e.writeSequenceNumber(i))}ie(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.se&&this.se(t),t}}xe.oe=-1;function ua(n){return n==null}function Fr(n){return n===0&&1/n==-1/0}function jE(n){return typeof n=="number"&&Number.isInteger(n)&&!Fr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=Qf(t)),t=zE(n.get(e),t);return Qf(t)}function zE(n,t){let e=t;const i=n.length;for(let s=0;s<i;s++){const r=n.charAt(s);switch(r){case"\0":e+="";break;case"":e+="";break;default:e+=r}}return e}function Qf(n){return n+""}function $e(n){const t=n.length;if(W(t>=2),t===2)return W(n.charAt(0)===""&&n.charAt(1)===""),dt.emptyPath();const e=t-2,i=[];let s="";for(let r=0;r<t;){const a=n.indexOf("",r);switch((a<0||a>e)&&q(),n.charAt(a+1)){case"":const o=n.substring(r,a);let l;s.length===0?l=o:(s+=o,l=s,s=""),i.push(l);break;case"":s+=n.substring(r,a),s+="\0";break;case"":s+=n.substring(r,a+1);break;default:q()}r=a+2}return new dt(i)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jf=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mo(n,t){return[n,de(t)]}function Ky(n,t,e){return[n,de(t),e]}const $E={},HE=["prefixPath","collectionGroup","readTime","documentId"],qE=["prefixPath","collectionGroup","documentId"],WE=["collectionGroup","readTime","prefixPath","documentId"],KE=["canonicalId","targetId"],GE=["targetId","path"],YE=["path","targetId"],QE=["collectionId","parent"],JE=["indexId","uid"],XE=["uid","sequenceNumber"],ZE=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],tx=["indexId","uid","orderedDocumentKey"],ex=["userId","collectionPath","documentId"],nx=["userId","collectionPath","largestBatchId"],ix=["userId","collectionGroup","largestBatchId"],Gy=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],sx=[...Gy,"documentOverlays"],Yy=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],Qy=Yy,id=[...Qy,"indexConfiguration","indexState","indexEntries"],rx=id,ax=[...id,"globals"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su extends qy{constructor(t,e){super(),this._e=t,this.currentSequenceNumber=e}}function $t(n,t){const e=J(n);return zn.F(e._e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xf(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function $i(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Jy(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(t,e){this.comparator=t,this.root=e||Yt.EMPTY}insert(t,e){return new St(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Yt.BLACK,null,null))}remove(t){return new St(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Yt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const i=this.comparator(t,e.key);if(i===0)return e.value;i<0?e=e.left:i>0&&(e=e.right)}return null}indexOf(t){let e=0,i=this.root;for(;!i.isEmpty();){const s=this.comparator(t,i.key);if(s===0)return e+i.left.size;s<0?i=i.left:(e+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,i)=>(t(e,i),!1))}toString(){const t=[];return this.inorderTraversal((e,i)=>(t.push(`${e}:${i}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Ha(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Ha(this.root,t,this.comparator,!1)}getReverseIterator(){return new Ha(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Ha(this.root,t,this.comparator,!0)}}class Ha{constructor(t,e,i,s){this.isReverse=s,this.nodeStack=[];let r=1;for(;!t.isEmpty();)if(r=e?i(t.key,e):1,e&&s&&(r*=-1),r<0)t=this.isReverse?t.left:t.right;else{if(r===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Yt{constructor(t,e,i,s,r){this.key=t,this.value=e,this.color=i??Yt.RED,this.left=s??Yt.EMPTY,this.right=r??Yt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,i,s,r){return new Yt(t??this.key,e??this.value,i??this.color,s??this.left,r??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,i){let s=this;const r=i(t,s.key);return s=r<0?s.copy(null,null,null,s.left.insert(t,e,i),null):r===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,i)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Yt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let i,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return Yt.EMPTY;i=s.right.min(),s=s.copy(i.key,i.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Yt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Yt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw q();const t=this.left.check();if(t!==this.right.check())throw q();return t+(this.isRed()?0:1)}}Yt.EMPTY=null,Yt.RED=!0,Yt.BLACK=!1;Yt.EMPTY=new class{constructor(){this.size=0}get key(){throw q()}get value(){throw q()}get color(){throw q()}get left(){throw q()}get right(){throw q()}copy(t,e,i,s,r){return this}insert(t,e,i){return new Yt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(t){this.comparator=t,this.data=new St(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,i)=>(t(e),!1))}forEachInRange(t,e){const i=this.data.getIteratorFrom(t[0]);for(;i.hasNext();){const s=i.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let i;for(i=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();i.hasNext();)if(!t(i.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Zf(this.data.getIterator())}getIteratorFrom(t){return new Zf(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(i=>{e=e.add(i)}),e}isEqual(t){if(!(t instanceof mt)||this.size!==t.size)return!1;const e=this.data.getIterator(),i=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,r=i.getNext().key;if(this.comparator(s,r)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new mt(this.comparator);return e.data=t,e}}class Zf{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Ji(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(t){this.fields=t,t.sort(Pt.comparator)}static empty(){return new me([])}unionWith(t){let e=new mt(Pt.comparator);for(const i of this.fields)e=e.add(i);for(const i of t)e=e.add(i);return new me(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return _s(this.fields,t.fields,(e,i)=>e.isEqual(i))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xy extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new Xy("Invalid base64 string: "+r):r}}(t);return new Ft(e)}static fromUint8Array(t){const e=function(s){let r="";for(let a=0;a<s.length;++a)r+=String.fromCharCode(s[a]);return r}(t);return new Ft(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const i=new Uint8Array(e.length);for(let s=0;s<e.length;s++)i[s]=e.charCodeAt(s);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return tt(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Ft.EMPTY_BYTE_STRING=new Ft("");const ox=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function bn(n){if(W(!!n),typeof n=="string"){let t=0;const e=ox.exec(n);if(W(!!e),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:t}}return{seconds:Tt(n.seconds),nanos:Tt(n.nanos)}}function Tt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function qn(n){return typeof n=="string"?Ft.fromBase64String(n):Ft.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sd(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="server_timestamp"}function rd(n){const t=n.mapValue.fields.__previous_value__;return sd(t)?rd(t):t}function Br(n){const t=bn(n.mapValue.fields.__local_write_time__.timestampValue);return new Rt(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lx{constructor(t,e,i,s,r,a,o,l,c){this.databaseId=t,this.appId=e,this.persistenceKey=i,this.host=s,this.ssl=r,this.forceLongPolling=a,this.autoDetectLongPolling=o,this.longPollingOptions=l,this.useFetchStreams=c}}class ki{constructor(t,e){this.projectId=t,this.database=e||"(default)"}static empty(){return new ki("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof ki&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},yo={nullValue:"NULL_VALUE"};function Ai(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?sd(n)?4:Zy(n)?9007199254740991:yl(n)?10:11:q()}function Ge(n,t){if(n===t)return!0;const e=Ai(n);if(e!==Ai(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Br(n).isEqual(Br(t));case 3:return function(s,r){if(typeof s.timestampValue=="string"&&typeof r.timestampValue=="string"&&s.timestampValue.length===r.timestampValue.length)return s.timestampValue===r.timestampValue;const a=bn(s.timestampValue),o=bn(r.timestampValue);return a.seconds===o.seconds&&a.nanos===o.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(s,r){return qn(s.bytesValue).isEqual(qn(r.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(s,r){return Tt(s.geoPointValue.latitude)===Tt(r.geoPointValue.latitude)&&Tt(s.geoPointValue.longitude)===Tt(r.geoPointValue.longitude)}(n,t);case 2:return function(s,r){if("integerValue"in s&&"integerValue"in r)return Tt(s.integerValue)===Tt(r.integerValue);if("doubleValue"in s&&"doubleValue"in r){const a=Tt(s.doubleValue),o=Tt(r.doubleValue);return a===o?Fr(a)===Fr(o):isNaN(a)&&isNaN(o)}return!1}(n,t);case 9:return _s(n.arrayValue.values||[],t.arrayValue.values||[],Ge);case 10:case 11:return function(s,r){const a=s.mapValue.fields||{},o=r.mapValue.fields||{};if(Xf(a)!==Xf(o))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(o[l]===void 0||!Ge(a[l],o[l])))return!1;return!0}(n,t);default:return q()}}function Ur(n,t){return(n.values||[]).find(e=>Ge(e,t))!==void 0}function Wn(n,t){if(n===t)return 0;const e=Ai(n),i=Ai(t);if(e!==i)return tt(e,i);switch(e){case 0:case 9007199254740991:return 0;case 1:return tt(n.booleanValue,t.booleanValue);case 2:return function(r,a){const o=Tt(r.integerValue||r.doubleValue),l=Tt(a.integerValue||a.doubleValue);return o<l?-1:o>l?1:o===l?0:isNaN(o)?isNaN(l)?0:-1:1}(n,t);case 3:return tp(n.timestampValue,t.timestampValue);case 4:return tp(Br(n),Br(t));case 5:return tt(n.stringValue,t.stringValue);case 6:return function(r,a){const o=qn(r),l=qn(a);return o.compareTo(l)}(n.bytesValue,t.bytesValue);case 7:return function(r,a){const o=r.split("/"),l=a.split("/");for(let c=0;c<o.length&&c<l.length;c++){const d=tt(o[c],l[c]);if(d!==0)return d}return tt(o.length,l.length)}(n.referenceValue,t.referenceValue);case 8:return function(r,a){const o=tt(Tt(r.latitude),Tt(a.latitude));return o!==0?o:tt(Tt(r.longitude),Tt(a.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return ep(n.arrayValue,t.arrayValue);case 10:return function(r,a){var o,l,c,d;const h=r.fields||{},f=a.fields||{},g=(o=h.value)===null||o===void 0?void 0:o.arrayValue,y=(l=f.value)===null||l===void 0?void 0:l.arrayValue,v=tt(((c=g==null?void 0:g.values)===null||c===void 0?void 0:c.length)||0,((d=y==null?void 0:y.values)===null||d===void 0?void 0:d.length)||0);return v!==0?v:ep(g,y)}(n.mapValue,t.mapValue);case 11:return function(r,a){if(r===Vn.mapValue&&a===Vn.mapValue)return 0;if(r===Vn.mapValue)return 1;if(a===Vn.mapValue)return-1;const o=r.fields||{},l=Object.keys(o),c=a.fields||{},d=Object.keys(c);l.sort(),d.sort();for(let h=0;h<l.length&&h<d.length;++h){const f=tt(l[h],d[h]);if(f!==0)return f;const g=Wn(o[l[h]],c[d[h]]);if(g!==0)return g}return tt(l.length,d.length)}(n.mapValue,t.mapValue);default:throw q()}}function tp(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return tt(n,t);const e=bn(n),i=bn(t),s=tt(e.seconds,i.seconds);return s!==0?s:tt(e.nanos,i.nanos)}function ep(n,t){const e=n.values||[],i=t.values||[];for(let s=0;s<e.length&&s<i.length;++s){const r=Wn(e[s],i[s]);if(r)return r}return tt(e.length,i.length)}function bs(n){return ru(n)}function ru(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const i=bn(e);return`time(${i.seconds},${i.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return qn(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return z.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let i="[",s=!0;for(const r of e.values||[])s?s=!1:i+=",",i+=ru(r);return i+"]"}(n.arrayValue):"mapValue"in n?function(e){const i=Object.keys(e.fields||{}).sort();let s="{",r=!0;for(const a of i)r?r=!1:s+=",",s+=`${a}:${ru(e.fields[a])}`;return s+"}"}(n.mapValue):q()}function jr(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function au(n){return!!n&&"integerValue"in n}function zr(n){return!!n&&"arrayValue"in n}function np(n){return!!n&&"nullValue"in n}function ip(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function _o(n){return!!n&&"mapValue"in n}function yl(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="__vector__"}function Tr(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return $i(n.mapValue.fields,(e,i)=>t.mapValue.fields[e]=Tr(i)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Tr(n.arrayValue.values[e]);return t}return Object.assign({},n)}function Zy(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const t_={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function cx(n){return"nullValue"in n?yo:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?jr(ki.empty(),z.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?yl(n)?t_:{mapValue:{}}:q()}function ux(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?jr(ki.empty(),z.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?t_:"mapValue"in n?yl(n)?{mapValue:{}}:Vn:q()}function sp(n,t){const e=Wn(n.value,t.value);return e!==0?e:n.inclusive&&!t.inclusive?-1:!n.inclusive&&t.inclusive?1:0}function rp(n,t){const e=Wn(n.value,t.value);return e!==0?e:n.inclusive&&!t.inclusive?1:!n.inclusive&&t.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(t){this.value=t}static empty(){return new Qt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let i=0;i<t.length-1;++i)if(e=(e.mapValue.fields||{})[t.get(i)],!_o(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Tr(e)}setAll(t){let e=Pt.emptyPath(),i={},s=[];t.forEach((a,o)=>{if(!e.isImmediateParentOf(o)){const l=this.getFieldsMap(e);this.applyChanges(l,i,s),i={},s=[],e=o.popLast()}a?i[o.lastSegment()]=Tr(a):s.push(o.lastSegment())});const r=this.getFieldsMap(e);this.applyChanges(r,i,s)}delete(t){const e=this.field(t.popLast());_o(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Ge(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let i=0;i<t.length;++i){let s=e.mapValue.fields[t.get(i)];_o(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(i)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,i){$i(e,(s,r)=>t[s]=r);for(const s of i)delete t[s]}clone(){return new Qt(Tr(this.value))}}function e_(n){const t=[];return $i(n.fields,(e,i)=>{const s=new Pt([e]);if(_o(i)){const r=e_(i.mapValue).fields;if(r.length===0)t.push(s);else for(const a of r)t.push(s.child(a))}else t.push(s)}),new me(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(t,e,i,s,r,a,o){this.key=t,this.documentType=e,this.version=i,this.readTime=s,this.createTime=r,this.data=a,this.documentState=o}static newInvalidDocument(t){return new Et(t,0,K.min(),K.min(),K.min(),Qt.empty(),0)}static newFoundDocument(t,e,i,s){return new Et(t,1,e,K.min(),i,s,0)}static newNoDocument(t,e){return new Et(t,2,e,K.min(),K.min(),Qt.empty(),0)}static newUnknownDocument(t,e){return new Et(t,3,e,K.min(),K.min(),Qt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(K.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Qt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Qt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=K.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Et&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Et(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(t,e){this.position=t,this.inclusive=e}}function ap(n,t,e){let i=0;for(let s=0;s<n.position.length;s++){const r=t[s],a=n.position[s];if(r.field.isKeyField()?i=z.comparator(z.fromName(a.referenceValue),e.key):i=Wn(a,e.data.field(r.field)),r.dir==="desc"&&(i*=-1),i!==0)break}return i}function op(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Ge(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $r{constructor(t,e="asc"){this.field=t,this.dir=e}}function dx(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{}class rt extends n_{constructor(t,e,i){super(),this.field=t,this.op=e,this.value=i}static create(t,e,i){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,i):new hx(t,e,i):e==="array-contains"?new gx(t,i):e==="in"?new l_(t,i):e==="not-in"?new mx(t,i):e==="array-contains-any"?new yx(t,i):new rt(t,e,i)}static createKeyFieldInFilter(t,e,i){return e==="in"?new fx(t,i):new px(t,i)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&this.matchesComparison(Wn(e,this.value)):e!==null&&Ai(this.value)===Ai(e)&&this.matchesComparison(Wn(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return q()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class gt extends n_{constructor(t,e){super(),this.filters=t,this.op=e,this.ae=null}static create(t,e){return new gt(t,e)}matches(t){return ws(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function ws(n){return n.op==="and"}function ou(n){return n.op==="or"}function ad(n){return i_(n)&&ws(n)}function i_(n){for(const t of n.filters)if(t instanceof gt)return!1;return!0}function lu(n){if(n instanceof rt)return n.field.canonicalString()+n.op.toString()+bs(n.value);if(ad(n))return n.filters.map(t=>lu(t)).join(",");{const t=n.filters.map(e=>lu(e)).join(",");return`${n.op}(${t})`}}function s_(n,t){return n instanceof rt?function(i,s){return s instanceof rt&&i.op===s.op&&i.field.isEqual(s.field)&&Ge(i.value,s.value)}(n,t):n instanceof gt?function(i,s){return s instanceof gt&&i.op===s.op&&i.filters.length===s.filters.length?i.filters.reduce((r,a,o)=>r&&s_(a,s.filters[o]),!0):!1}(n,t):void q()}function r_(n,t){const e=n.filters.concat(t);return gt.create(e,n.op)}function a_(n){return n instanceof rt?function(e){return`${e.field.canonicalString()} ${e.op} ${bs(e.value)}`}(n):n instanceof gt?function(e){return e.op.toString()+" {"+e.getFilters().map(a_).join(" ,")+"}"}(n):"Filter"}class hx extends rt{constructor(t,e,i){super(t,e,i),this.key=z.fromName(i.referenceValue)}matches(t){const e=z.comparator(t.key,this.key);return this.matchesComparison(e)}}class fx extends rt{constructor(t,e){super(t,"in",e),this.keys=o_("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class px extends rt{constructor(t,e){super(t,"not-in",e),this.keys=o_("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function o_(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(i=>z.fromName(i.referenceValue))}class gx extends rt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return zr(e)&&Ur(e.arrayValue,this.value)}}class l_ extends rt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Ur(this.value.arrayValue,e)}}class mx extends rt{constructor(t,e){super(t,"not-in",e)}matches(t){if(Ur(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&!Ur(this.value.arrayValue,e)}}class yx extends rt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!zr(e)||!e.arrayValue.values)&&e.arrayValue.values.some(i=>Ur(this.value.arrayValue,i))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _x{constructor(t,e=null,i=[],s=[],r=null,a=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=i,this.filters=s,this.limit=r,this.startAt=a,this.endAt=o,this.ue=null}}function cu(n,t=null,e=[],i=[],s=null,r=null,a=null){return new _x(n,t,e,i,s,r,a)}function Si(n){const t=J(n);if(t.ue===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(i=>lu(i)).join(","),e+="|ob:",e+=t.orderBy.map(i=>function(r){return r.field.canonicalString()+r.dir}(i)).join(","),ua(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(i=>bs(i)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(i=>bs(i)).join(",")),t.ue=e}return t.ue}function da(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!dx(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!s_(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!op(n.startAt,t.startAt)&&op(n.endAt,t.endAt)}function zo(n){return z.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function $o(n,t){return n.filters.filter(e=>e instanceof rt&&e.field.isEqual(t))}function lp(n,t,e){let i=yo,s=!0;for(const r of $o(n,t)){let a=yo,o=!0;switch(r.op){case"<":case"<=":a=cx(r.value);break;case"==":case"in":case">=":a=r.value;break;case">":a=r.value,o=!1;break;case"!=":case"not-in":a=yo}sp({value:i,inclusive:s},{value:a,inclusive:o})<0&&(i=a,s=o)}if(e!==null){for(let r=0;r<n.orderBy.length;++r)if(n.orderBy[r].field.isEqual(t)){const a=e.position[r];sp({value:i,inclusive:s},{value:a,inclusive:e.inclusive})<0&&(i=a,s=e.inclusive);break}}return{value:i,inclusive:s}}function cp(n,t,e){let i=Vn,s=!0;for(const r of $o(n,t)){let a=Vn,o=!0;switch(r.op){case">=":case">":a=ux(r.value),o=!1;break;case"==":case"in":case"<=":a=r.value;break;case"<":a=r.value,o=!1;break;case"!=":case"not-in":a=Vn}rp({value:i,inclusive:s},{value:a,inclusive:o})>0&&(i=a,s=o)}if(e!==null){for(let r=0;r<n.orderBy.length;++r)if(n.orderBy[r].field.isEqual(t)){const a=e.position[r];rp({value:i,inclusive:s},{value:a,inclusive:e.inclusive})>0&&(i=a,s=e.inclusive);break}}return{value:i,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(t,e=null,i=[],s=[],r=null,a="F",o=null,l=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=i,this.filters=s,this.limit=r,this.limitType=a,this.startAt=o,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function bx(n,t,e,i,s,r,a,o){return new Ds(n,t,e,i,s,r,a,o)}function ha(n){return new Ds(n)}function up(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function c_(n){return n.collectionGroup!==null}function Er(n){const t=J(n);if(t.ce===null){t.ce=[];const e=new Set;for(const r of t.explicitOrderBy)t.ce.push(r),e.add(r.field.canonicalString());const i=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let o=new mt(Pt.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(c=>{c.isInequality()&&(o=o.add(c.field))})}),o})(t).forEach(r=>{e.has(r.canonicalString())||r.isKeyField()||t.ce.push(new $r(r,i))}),e.has(Pt.keyField().canonicalString())||t.ce.push(new $r(Pt.keyField(),i))}return t.ce}function ke(n){const t=J(n);return t.le||(t.le=vx(t,Er(n))),t.le}function vx(n,t){if(n.limitType==="F")return cu(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(s=>{const r=s.dir==="desc"?"asc":"desc";return new $r(s.field,r)});const e=n.endAt?new vs(n.endAt.position,n.endAt.inclusive):null,i=n.startAt?new vs(n.startAt.position,n.startAt.inclusive):null;return cu(n.path,n.collectionGroup,t,n.filters,n.limit,e,i)}}function uu(n,t){const e=n.filters.concat([t]);return new Ds(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function Ho(n,t,e){return new Ds(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function _l(n,t){return da(ke(n),ke(t))&&n.limitType===t.limitType}function u_(n){return`${Si(ke(n))}|lt:${n.limitType}`}function ss(n){return`Query(target=${function(e){let i=e.path.canonicalString();return e.collectionGroup!==null&&(i+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(i+=`, filters: [${e.filters.map(s=>a_(s)).join(", ")}]`),ua(e.limit)||(i+=", limit: "+e.limit),e.orderBy.length>0&&(i+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(i+=", startAt: ",i+=e.startAt.inclusive?"b:":"a:",i+=e.startAt.position.map(s=>bs(s)).join(",")),e.endAt&&(i+=", endAt: ",i+=e.endAt.inclusive?"a:":"b:",i+=e.endAt.position.map(s=>bs(s)).join(",")),`Target(${i})`}(ke(n))}; limitType=${n.limitType})`}function fa(n,t){return t.isFoundDocument()&&function(i,s){const r=s.key.path;return i.collectionGroup!==null?s.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(r):z.isDocumentKey(i.path)?i.path.isEqual(r):i.path.isImmediateParentOf(r)}(n,t)&&function(i,s){for(const r of Er(i))if(!r.field.isKeyField()&&s.data.field(r.field)===null)return!1;return!0}(n,t)&&function(i,s){for(const r of i.filters)if(!r.matches(s))return!1;return!0}(n,t)&&function(i,s){return!(i.startAt&&!function(a,o,l){const c=ap(a,o,l);return a.inclusive?c<=0:c<0}(i.startAt,Er(i),s)||i.endAt&&!function(a,o,l){const c=ap(a,o,l);return a.inclusive?c>=0:c>0}(i.endAt,Er(i),s))}(n,t)}function wx(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function d_(n){return(t,e)=>{let i=!1;for(const s of Er(n)){const r=Ix(s,t,e);if(r!==0)return r;i=i||s.field.isKeyField()}return 0}}function Ix(n,t,e){const i=n.field.isKeyField()?z.comparator(t.key,e.key):function(r,a,o){const l=a.data.field(r),c=o.data.field(r);return l!==null&&c!==null?Wn(l,c):q()}(n.field,t,e);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return q()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),i=this.inner[e];if(i!==void 0){for(const[s,r]of i)if(this.equalsFn(s,t))return r}}has(t){return this.get(t)!==void 0}set(t,e){const i=this.mapKeyFn(t),s=this.inner[i];if(s===void 0)return this.inner[i]=[[t,e]],void this.innerSize++;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],t))return void(s[r]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),i=this.inner[e];if(i===void 0)return!1;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],t))return i.length===1?delete this.inner[e]:i.splice(s,1),this.innerSize--,!0;return!1}forEach(t){$i(this.inner,(e,i)=>{for(const[s,r]of i)t(s,r)})}isEmpty(){return Jy(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tx=new St(z.comparator);function Ie(){return Tx}const h_=new St(z.comparator);function hr(...n){let t=h_;for(const e of n)t=t.insert(e.key,e);return t}function f_(n){let t=h_;return n.forEach((e,i)=>t=t.insert(e,i.overlayedDocument)),t}function He(){return xr()}function p_(){return xr()}function xr(){return new Xn(n=>n.toString(),(n,t)=>n.isEqual(t))}const Ex=new St(z.comparator),xx=new mt(z.comparator);function et(...n){let t=xx;for(const e of n)t=t.add(e);return t}const kx=new mt(tt);function Ax(){return kx}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function od(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Fr(t)?"-0":t}}function g_(n){return{integerValue:""+n}}function Sx(n,t){return jE(t)?g_(t):od(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl{constructor(){this._=void 0}}function Px(n,t,e){return n instanceof Is?function(s,r){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return r&&sd(r)&&(r=rd(r)),r&&(a.fields.__previous_value__=r),{mapValue:a}}(e,t):n instanceof Ts?y_(n,t):n instanceof Es?__(n,t):function(s,r){const a=m_(s,r),o=dp(a)+dp(s.Pe);return au(a)&&au(s.Pe)?g_(o):od(s.serializer,o)}(n,t)}function Rx(n,t,e){return n instanceof Ts?y_(n,t):n instanceof Es?__(n,t):e}function m_(n,t){return n instanceof Hr?function(i){return au(i)||function(r){return!!r&&"doubleValue"in r}(i)}(t)?t:{integerValue:0}:null}class Is extends bl{}class Ts extends bl{constructor(t){super(),this.elements=t}}function y_(n,t){const e=b_(t);for(const i of n.elements)e.some(s=>Ge(s,i))||e.push(i);return{arrayValue:{values:e}}}class Es extends bl{constructor(t){super(),this.elements=t}}function __(n,t){let e=b_(t);for(const i of n.elements)e=e.filter(s=>!Ge(s,i));return{arrayValue:{values:e}}}class Hr extends bl{constructor(t,e){super(),this.serializer=t,this.Pe=e}}function dp(n){return Tt(n.integerValue||n.doubleValue)}function b_(n){return zr(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v_{constructor(t,e){this.field=t,this.transform=e}}function Cx(n,t){return n.field.isEqual(t.field)&&function(i,s){return i instanceof Ts&&s instanceof Ts||i instanceof Es&&s instanceof Es?_s(i.elements,s.elements,Ge):i instanceof Hr&&s instanceof Hr?Ge(i.Pe,s.Pe):i instanceof Is&&s instanceof Is}(n.transform,t.transform)}class Dx{constructor(t,e){this.version=t,this.transformResults=e}}class xt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new xt}static exists(t){return new xt(void 0,t)}static updateTime(t){return new xt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function bo(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class vl{}function w_(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new Os(n.key,xt.none()):new Ms(n.key,n.data,xt.none());{const e=n.data,i=Qt.empty();let s=new mt(Pt.comparator);for(let r of t.fields)if(!s.has(r)){let a=e.field(r);a===null&&r.length>1&&(r=r.popLast(),a=e.field(r)),a===null?i.delete(r):i.set(r,a),s=s.add(r)}return new wn(n.key,i,new me(s.toArray()),xt.none())}}function Mx(n,t,e){n instanceof Ms?function(s,r,a){const o=s.value.clone(),l=fp(s.fieldTransforms,r,a.transformResults);o.setAll(l),r.convertToFoundDocument(a.version,o).setHasCommittedMutations()}(n,t,e):n instanceof wn?function(s,r,a){if(!bo(s.precondition,r))return void r.convertToUnknownDocument(a.version);const o=fp(s.fieldTransforms,r,a.transformResults),l=r.data;l.setAll(I_(s)),l.setAll(o),r.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,t,e):function(s,r,a){r.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function kr(n,t,e,i){return n instanceof Ms?function(r,a,o,l){if(!bo(r.precondition,a))return o;const c=r.value.clone(),d=pp(r.fieldTransforms,l,a);return c.setAll(d),a.convertToFoundDocument(a.version,c).setHasLocalMutations(),null}(n,t,e,i):n instanceof wn?function(r,a,o,l){if(!bo(r.precondition,a))return o;const c=pp(r.fieldTransforms,l,a),d=a.data;return d.setAll(I_(r)),d.setAll(c),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),o===null?null:o.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(h=>h.field))}(n,t,e,i):function(r,a,o){return bo(r.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):o}(n,t,e)}function Ox(n,t){let e=null;for(const i of n.fieldTransforms){const s=t.data.field(i.field),r=m_(i.transform,s||null);r!=null&&(e===null&&(e=Qt.empty()),e.set(i.field,r))}return e||null}function hp(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(i,s){return i===void 0&&s===void 0||!(!i||!s)&&_s(i,s,(r,a)=>Cx(r,a))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class Ms extends vl{constructor(t,e,i,s=[]){super(),this.key=t,this.value=e,this.precondition=i,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class wn extends vl{constructor(t,e,i,s,r=[]){super(),this.key=t,this.data=e,this.fieldMask=i,this.precondition=s,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function I_(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const i=n.data.field(e);t.set(e,i)}}),t}function fp(n,t,e){const i=new Map;W(n.length===e.length);for(let s=0;s<e.length;s++){const r=n[s],a=r.transform,o=t.data.field(r.field);i.set(r.field,Rx(a,o,e[s]))}return i}function pp(n,t,e){const i=new Map;for(const s of n){const r=s.transform,a=e.data.field(s.field);i.set(s.field,Px(r,a,t))}return i}class Os extends vl{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ld extends vl{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cd{constructor(t,e,i,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=i,this.mutations=s}applyToRemoteDocument(t,e){const i=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const r=this.mutations[s];r.key.isEqual(t.key)&&Mx(r,t,i[s])}}applyToLocalView(t,e){for(const i of this.baseMutations)i.key.isEqual(t.key)&&(e=kr(i,t,e,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(t.key)&&(e=kr(i,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const i=p_();return this.mutations.forEach(s=>{const r=t.get(s.key),a=r.overlayedDocument;let o=this.applyToLocalView(a,r.mutatedFields);o=e.has(s.key)?null:o;const l=w_(a,o);l!==null&&i.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(K.min())}),i}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),et())}isEqual(t){return this.batchId===t.batchId&&_s(this.mutations,t.mutations,(e,i)=>hp(e,i))&&_s(this.baseMutations,t.baseMutations,(e,i)=>hp(e,i))}}class ud{constructor(t,e,i,s){this.batch=t,this.commitVersion=e,this.mutationResults=i,this.docVersions=s}static from(t,e,i){W(t.mutations.length===i.length);let s=function(){return Ex}();const r=t.mutations;for(let a=0;a<r.length;a++)s=s.insert(r[a].key,i[a].version);return new ud(t,e,i,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dd{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vx{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Nt,ot;function T_(n){switch(n){default:return q();case L.CANCELLED:case L.UNKNOWN:case L.DEADLINE_EXCEEDED:case L.RESOURCE_EXHAUSTED:case L.INTERNAL:case L.UNAVAILABLE:case L.UNAUTHENTICATED:return!1;case L.INVALID_ARGUMENT:case L.NOT_FOUND:case L.ALREADY_EXISTS:case L.PERMISSION_DENIED:case L.FAILED_PRECONDITION:case L.ABORTED:case L.OUT_OF_RANGE:case L.UNIMPLEMENTED:case L.DATA_LOSS:return!0}}function E_(n){if(n===void 0)return ue("GRPC error has no .code"),L.UNKNOWN;switch(n){case Nt.OK:return L.OK;case Nt.CANCELLED:return L.CANCELLED;case Nt.UNKNOWN:return L.UNKNOWN;case Nt.DEADLINE_EXCEEDED:return L.DEADLINE_EXCEEDED;case Nt.RESOURCE_EXHAUSTED:return L.RESOURCE_EXHAUSTED;case Nt.INTERNAL:return L.INTERNAL;case Nt.UNAVAILABLE:return L.UNAVAILABLE;case Nt.UNAUTHENTICATED:return L.UNAUTHENTICATED;case Nt.INVALID_ARGUMENT:return L.INVALID_ARGUMENT;case Nt.NOT_FOUND:return L.NOT_FOUND;case Nt.ALREADY_EXISTS:return L.ALREADY_EXISTS;case Nt.PERMISSION_DENIED:return L.PERMISSION_DENIED;case Nt.FAILED_PRECONDITION:return L.FAILED_PRECONDITION;case Nt.ABORTED:return L.ABORTED;case Nt.OUT_OF_RANGE:return L.OUT_OF_RANGE;case Nt.UNIMPLEMENTED:return L.UNIMPLEMENTED;case Nt.DATA_LOSS:return L.DATA_LOSS;default:return q()}}(ot=Nt||(Nt={}))[ot.OK=0]="OK",ot[ot.CANCELLED=1]="CANCELLED",ot[ot.UNKNOWN=2]="UNKNOWN",ot[ot.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ot[ot.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ot[ot.NOT_FOUND=5]="NOT_FOUND",ot[ot.ALREADY_EXISTS=6]="ALREADY_EXISTS",ot[ot.PERMISSION_DENIED=7]="PERMISSION_DENIED",ot[ot.UNAUTHENTICATED=16]="UNAUTHENTICATED",ot[ot.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ot[ot.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ot[ot.ABORTED=10]="ABORTED",ot[ot.OUT_OF_RANGE=11]="OUT_OF_RANGE",ot[ot.UNIMPLEMENTED=12]="UNIMPLEMENTED",ot[ot.INTERNAL=13]="INTERNAL",ot[ot.UNAVAILABLE=14]="UNAVAILABLE",ot[ot.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nx(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lx=new bi([4294967295,4294967295],0);function gp(n){const t=Nx().encode(n),e=new Oy;return e.update(t),new Uint8Array(e.digest())}function mp(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),i=t.getUint32(4,!0),s=t.getUint32(8,!0),r=t.getUint32(12,!0);return[new bi([e,i],0),new bi([s,r],0)]}class hd{constructor(t,e,i){if(this.bitmap=t,this.padding=e,this.hashCount=i,e<0||e>=8)throw new fr(`Invalid padding: ${e}`);if(i<0)throw new fr(`Invalid hash count: ${i}`);if(t.length>0&&this.hashCount===0)throw new fr(`Invalid hash count: ${i}`);if(t.length===0&&e!==0)throw new fr(`Invalid padding when bitmap length is 0: ${e}`);this.Ie=8*t.length-e,this.Te=bi.fromNumber(this.Ie)}Ee(t,e,i){let s=t.add(e.multiply(bi.fromNumber(i)));return s.compare(Lx)===1&&(s=new bi([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}mightContain(t){if(this.Ie===0)return!1;const e=gp(t),[i,s]=mp(e);for(let r=0;r<this.hashCount;r++){const a=this.Ee(i,s,r);if(!this.de(a))return!1}return!0}static create(t,e,i){const s=t%8==0?0:8-t%8,r=new Uint8Array(Math.ceil(t/8)),a=new hd(r,s,e);return i.forEach(o=>a.insert(o)),a}insert(t){if(this.Ie===0)return;const e=gp(t),[i,s]=mp(e);for(let r=0;r<this.hashCount;r++){const a=this.Ee(i,s,r);this.Ae(a)}}Ae(t){const e=Math.floor(t/8),i=t%8;this.bitmap[e]|=1<<i}}class fr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(t,e,i,s,r){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=i,this.documentUpdates=s,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(t,e,i){const s=new Map;return s.set(t,pa.createSynthesizedTargetChangeForCurrentChange(t,e,i)),new wl(K.min(),s,new St(tt),Ie(),et())}}class pa{constructor(t,e,i,s,r){this.resumeToken=t,this.current=e,this.addedDocuments=i,this.modifiedDocuments=s,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(t,e,i){return new pa(i,e,et(),et(),et())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo{constructor(t,e,i,s){this.Re=t,this.removedTargetIds=e,this.key=i,this.Ve=s}}class x_{constructor(t,e){this.targetId=t,this.me=e}}class k_{constructor(t,e,i=Ft.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=i,this.cause=s}}class yp{constructor(){this.fe=0,this.ge=bp(),this.pe=Ft.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(t){t.approximateByteSize()>0&&(this.we=!0,this.pe=t)}ve(){let t=et(),e=et(),i=et();return this.ge.forEach((s,r)=>{switch(r){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:i=i.add(s);break;default:q()}}),new pa(this.pe,this.ye,t,e,i)}Ce(){this.we=!1,this.ge=bp()}Fe(t,e){this.we=!0,this.ge=this.ge.insert(t,e)}Me(t){this.we=!0,this.ge=this.ge.remove(t)}xe(){this.fe+=1}Oe(){this.fe-=1,W(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Fx{constructor(t){this.Le=t,this.Be=new Map,this.ke=Ie(),this.qe=_p(),this.Qe=new St(tt)}Ke(t){for(const e of t.Re)t.Ve&&t.Ve.isFoundDocument()?this.$e(e,t.Ve):this.Ue(e,t.key,t.Ve);for(const e of t.removedTargetIds)this.Ue(e,t.key,t.Ve)}We(t){this.forEachTarget(t,e=>{const i=this.Ge(e);switch(t.state){case 0:this.ze(e)&&i.De(t.resumeToken);break;case 1:i.Oe(),i.Se||i.Ce(),i.De(t.resumeToken);break;case 2:i.Oe(),i.Se||this.removeTarget(e);break;case 3:this.ze(e)&&(i.Ne(),i.De(t.resumeToken));break;case 4:this.ze(e)&&(this.je(e),i.De(t.resumeToken));break;default:q()}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Be.forEach((i,s)=>{this.ze(s)&&e(s)})}He(t){const e=t.targetId,i=t.me.count,s=this.Je(e);if(s){const r=s.target;if(zo(r))if(i===0){const a=new z(r.path);this.Ue(e,a,Et.newNoDocument(a,K.min()))}else W(i===1);else{const a=this.Ye(e);if(a!==i){const o=this.Ze(t),l=o?this.Xe(o,t,a):1;if(l!==0){this.je(e);const c=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(e,c)}}}}}Ze(t){const e=t.me.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:i="",padding:s=0},hashCount:r=0}=e;let a,o;try{a=qn(i).toUint8Array()}catch(l){if(l instanceof Xy)return xi("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{o=new hd(a,s,r)}catch(l){return xi(l instanceof fr?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return o.Ie===0?null:o}Xe(t,e,i){return e.me.count===i-this.nt(t,e.targetId)?0:2}nt(t,e){const i=this.Le.getRemoteKeysForTarget(e);let s=0;return i.forEach(r=>{const a=this.Le.tt(),o=`projects/${a.projectId}/databases/${a.database}/documents/${r.path.canonicalString()}`;t.mightContain(o)||(this.Ue(e,r,null),s++)}),s}rt(t){const e=new Map;this.Be.forEach((r,a)=>{const o=this.Je(a);if(o){if(r.current&&zo(o.target)){const l=new z(o.target.path);this.ke.get(l)!==null||this.it(a,l)||this.Ue(a,l,Et.newNoDocument(l,t))}r.be&&(e.set(a,r.ve()),r.Ce())}});let i=et();this.qe.forEach((r,a)=>{let o=!0;a.forEachWhile(l=>{const c=this.Je(l);return!c||c.purpose==="TargetPurposeLimboResolution"||(o=!1,!1)}),o&&(i=i.add(r))}),this.ke.forEach((r,a)=>a.setReadTime(t));const s=new wl(t,e,this.Qe,this.ke,i);return this.ke=Ie(),this.qe=_p(),this.Qe=new St(tt),s}$e(t,e){if(!this.ze(t))return;const i=this.it(t,e.key)?2:0;this.Ge(t).Fe(e.key,i),this.ke=this.ke.insert(e.key,e),this.qe=this.qe.insert(e.key,this.st(e.key).add(t))}Ue(t,e,i){if(!this.ze(t))return;const s=this.Ge(t);this.it(t,e)?s.Fe(e,1):s.Me(e),this.qe=this.qe.insert(e,this.st(e).delete(t)),i&&(this.ke=this.ke.insert(e,i))}removeTarget(t){this.Be.delete(t)}Ye(t){const e=this.Ge(t).ve();return this.Le.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}xe(t){this.Ge(t).xe()}Ge(t){let e=this.Be.get(t);return e||(e=new yp,this.Be.set(t,e)),e}st(t){let e=this.qe.get(t);return e||(e=new mt(tt),this.qe=this.qe.insert(t,e)),e}ze(t){const e=this.Je(t)!==null;return e||F("WatchChangeAggregator","Detected inactive target",t),e}Je(t){const e=this.Be.get(t);return e&&e.Se?null:this.Le.ot(t)}je(t){this.Be.set(t,new yp),this.Le.getRemoteKeysForTarget(t).forEach(e=>{this.Ue(t,e,null)})}it(t,e){return this.Le.getRemoteKeysForTarget(t).has(e)}}function _p(){return new St(z.comparator)}function bp(){return new St(z.comparator)}const Bx={asc:"ASCENDING",desc:"DESCENDING"},Ux={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},jx={and:"AND",or:"OR"};class zx{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function du(n,t){return n.useProto3Json||ua(t)?t:{value:t}}function xs(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function A_(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function $x(n,t){return xs(n,t.toTimestamp())}function Wt(n){return W(!!n),K.fromTimestamp(function(e){const i=bn(e);return new Rt(i.seconds,i.nanos)}(n))}function fd(n,t){return hu(n,t).canonicalString()}function hu(n,t){const e=function(s){return new dt(["projects",s.projectId,"databases",s.database])}(n).child("documents");return t===void 0?e:e.child(t)}function S_(n){const t=dt.fromString(n);return W(L_(t)),t}function qr(n,t){return fd(n.databaseId,t.path)}function mn(n,t){const e=S_(t);if(e.get(1)!==n.databaseId.projectId)throw new B(L.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new B(L.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new z(C_(e))}function P_(n,t){return fd(n.databaseId,t)}function R_(n){const t=S_(n);return t.length===4?dt.emptyPath():C_(t)}function fu(n){return new dt(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function C_(n){return W(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function vp(n,t,e){return{name:qr(n,t),fields:e.value.mapValue.fields}}function Hx(n,t,e){const i=mn(n,t.name),s=Wt(t.updateTime),r=t.createTime?Wt(t.createTime):K.min(),a=new Qt({mapValue:{fields:t.fields}}),o=Et.newFoundDocument(i,s,r,a);return e&&o.setHasCommittedMutations(),e?o.setHasCommittedMutations():o}function qx(n,t){return"found"in t?function(i,s){W(!!s.found),s.found.name,s.found.updateTime;const r=mn(i,s.found.name),a=Wt(s.found.updateTime),o=s.found.createTime?Wt(s.found.createTime):K.min(),l=new Qt({mapValue:{fields:s.found.fields}});return Et.newFoundDocument(r,a,o,l)}(n,t):"missing"in t?function(i,s){W(!!s.missing),W(!!s.readTime);const r=mn(i,s.missing),a=Wt(s.readTime);return Et.newNoDocument(r,a)}(n,t):q()}function Wx(n,t){let e;if("targetChange"in t){t.targetChange;const i=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:q()}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],r=function(c,d){return c.useProto3Json?(W(d===void 0||typeof d=="string"),Ft.fromBase64String(d||"")):(W(d===void 0||d instanceof Buffer||d instanceof Uint8Array),Ft.fromUint8Array(d||new Uint8Array))}(n,t.targetChange.resumeToken),a=t.targetChange.cause,o=a&&function(c){const d=c.code===void 0?L.UNKNOWN:E_(c.code);return new B(d,c.message||"")}(a);e=new k_(i,s,r,o||null)}else if("documentChange"in t){t.documentChange;const i=t.documentChange;i.document,i.document.name,i.document.updateTime;const s=mn(n,i.document.name),r=Wt(i.document.updateTime),a=i.document.createTime?Wt(i.document.createTime):K.min(),o=new Qt({mapValue:{fields:i.document.fields}}),l=Et.newFoundDocument(s,r,a,o),c=i.targetIds||[],d=i.removedTargetIds||[];e=new vo(c,d,l.key,l)}else if("documentDelete"in t){t.documentDelete;const i=t.documentDelete;i.document;const s=mn(n,i.document),r=i.readTime?Wt(i.readTime):K.min(),a=Et.newNoDocument(s,r),o=i.removedTargetIds||[];e=new vo([],o,a.key,a)}else if("documentRemove"in t){t.documentRemove;const i=t.documentRemove;i.document;const s=mn(n,i.document),r=i.removedTargetIds||[];e=new vo([],r,s,null)}else{if(!("filter"in t))return q();{t.filter;const i=t.filter;i.targetId;const{count:s=0,unchangedNames:r}=i,a=new Vx(s,r),o=i.targetId;e=new x_(o,a)}}return e}function Wr(n,t){let e;if(t instanceof Ms)e={update:vp(n,t.key,t.value)};else if(t instanceof Os)e={delete:qr(n,t.key)};else if(t instanceof wn)e={update:vp(n,t.key,t.data),updateMask:Xx(t.fieldMask)};else{if(!(t instanceof ld))return q();e={verify:qr(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(i=>function(r,a){const o=a.transform;if(o instanceof Is)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof Ts)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof Es)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof Hr)return{fieldPath:a.field.canonicalString(),increment:o.Pe};throw q()}(0,i))),t.precondition.isNone||(e.currentDocument=function(s,r){return r.updateTime!==void 0?{updateTime:$x(s,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:q()}(n,t.precondition)),e}function pu(n,t){const e=t.currentDocument?function(r){return r.updateTime!==void 0?xt.updateTime(Wt(r.updateTime)):r.exists!==void 0?xt.exists(r.exists):xt.none()}(t.currentDocument):xt.none(),i=t.updateTransforms?t.updateTransforms.map(s=>function(a,o){let l=null;if("setToServerValue"in o)W(o.setToServerValue==="REQUEST_TIME"),l=new Is;else if("appendMissingElements"in o){const d=o.appendMissingElements.values||[];l=new Ts(d)}else if("removeAllFromArray"in o){const d=o.removeAllFromArray.values||[];l=new Es(d)}else"increment"in o?l=new Hr(a,o.increment):q();const c=Pt.fromServerFormat(o.fieldPath);return new v_(c,l)}(n,s)):[];if(t.update){t.update.name;const s=mn(n,t.update.name),r=new Qt({mapValue:{fields:t.update.fields}});if(t.updateMask){const a=function(l){const c=l.fieldPaths||[];return new me(c.map(d=>Pt.fromServerFormat(d)))}(t.updateMask);return new wn(s,r,a,e,i)}return new Ms(s,r,e,i)}if(t.delete){const s=mn(n,t.delete);return new Os(s,e)}if(t.verify){const s=mn(n,t.verify);return new ld(s,e)}return q()}function Kx(n,t){return n&&n.length>0?(W(t!==void 0),n.map(e=>function(s,r){let a=s.updateTime?Wt(s.updateTime):Wt(r);return a.isEqual(K.min())&&(a=Wt(r)),new Dx(a,s.transformResults||[])}(e,t))):[]}function D_(n,t){return{documents:[P_(n,t.path)]}}function M_(n,t){const e={structuredQuery:{}},i=t.path;let s;t.collectionGroup!==null?(s=i,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=i.popLast(),e.structuredQuery.from=[{collectionId:i.lastSegment()}]),e.parent=P_(n,s);const r=function(c){if(c.length!==0)return N_(gt.create(c,"and"))}(t.filters);r&&(e.structuredQuery.where=r);const a=function(c){if(c.length!==0)return c.map(d=>function(f){return{field:rs(f.field),direction:Yx(f.dir)}}(d))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const o=du(n,t.limit);return o!==null&&(e.structuredQuery.limit=o),t.startAt&&(e.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(t.endAt)),{_t:e,parent:s}}function O_(n){let t=R_(n.parent);const e=n.structuredQuery,i=e.from?e.from.length:0;let s=null;if(i>0){W(i===1);const d=e.from[0];d.allDescendants?s=d.collectionId:t=t.child(d.collectionId)}let r=[];e.where&&(r=function(h){const f=V_(h);return f instanceof gt&&ad(f)?f.getFilters():[f]}(e.where));let a=[];e.orderBy&&(a=function(h){return h.map(f=>function(y){return new $r(as(y.field),function(w){switch(w){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(y.direction))}(f))}(e.orderBy));let o=null;e.limit&&(o=function(h){let f;return f=typeof h=="object"?h.value:h,ua(f)?null:f}(e.limit));let l=null;e.startAt&&(l=function(h){const f=!!h.before,g=h.values||[];return new vs(g,f)}(e.startAt));let c=null;return e.endAt&&(c=function(h){const f=!h.before,g=h.values||[];return new vs(g,f)}(e.endAt)),bx(t,s,a,r,o,"F",l,c)}function Gx(n,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return q()}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function V_(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const i=as(e.unaryFilter.field);return rt.create(i,"==",{doubleValue:NaN});case"IS_NULL":const s=as(e.unaryFilter.field);return rt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=as(e.unaryFilter.field);return rt.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=as(e.unaryFilter.field);return rt.create(a,"!=",{nullValue:"NULL_VALUE"});default:return q()}}(n):n.fieldFilter!==void 0?function(e){return rt.create(as(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return q()}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return gt.create(e.compositeFilter.filters.map(i=>V_(i)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return q()}}(e.compositeFilter.op))}(n):q()}function Yx(n){return Bx[n]}function Qx(n){return Ux[n]}function Jx(n){return jx[n]}function rs(n){return{fieldPath:n.canonicalString()}}function as(n){return Pt.fromServerFormat(n.fieldPath)}function N_(n){return n instanceof rt?function(e){if(e.op==="=="){if(ip(e.value))return{unaryFilter:{field:rs(e.field),op:"IS_NAN"}};if(np(e.value))return{unaryFilter:{field:rs(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(ip(e.value))return{unaryFilter:{field:rs(e.field),op:"IS_NOT_NAN"}};if(np(e.value))return{unaryFilter:{field:rs(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:rs(e.field),op:Qx(e.op),value:e.value}}}(n):n instanceof gt?function(e){const i=e.getFilters().map(s=>N_(s));return i.length===1?i[0]:{compositeFilter:{op:Jx(e.op),filters:i}}}(n):q()}function Xx(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function L_(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(t,e,i,s,r=K.min(),a=K.min(),o=Ft.EMPTY_BYTE_STRING,l=null){this.target=t,this.targetId=e,this.purpose=i,this.sequenceNumber=s,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=o,this.expectedCount=l}withSequenceNumber(t){return new cn(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new cn(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new cn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new cn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(t){this.ct=t}}function Zx(n,t){let e;if(t.document)e=Hx(n.ct,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const i=z.fromSegments(t.noDocument.path),s=Ri(t.noDocument.readTime);e=Et.newNoDocument(i,s),t.hasCommittedMutations&&e.setHasCommittedMutations()}else{if(!t.unknownDocument)return q();{const i=z.fromSegments(t.unknownDocument.path),s=Ri(t.unknownDocument.version);e=Et.newUnknownDocument(i,s)}}return t.readTime&&e.setReadTime(function(s){const r=new Rt(s[0],s[1]);return K.fromTimestamp(r)}(t.readTime)),e}function wp(n,t){const e=t.key,i={prefixPath:e.getCollectionPath().popLast().toArray(),collectionGroup:e.collectionGroup,documentId:e.path.lastSegment(),readTime:qo(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())i.document=function(r,a){return{name:qr(r,a.key),fields:a.data.value.mapValue.fields,updateTime:xs(r,a.version.toTimestamp()),createTime:xs(r,a.createTime.toTimestamp())}}(n.ct,t);else if(t.isNoDocument())i.noDocument={path:e.path.toArray(),readTime:Pi(t.version)};else{if(!t.isUnknownDocument())return q();i.unknownDocument={path:e.path.toArray(),version:Pi(t.version)}}return i}function qo(n){const t=n.toTimestamp();return[t.seconds,t.nanoseconds]}function Pi(n){const t=n.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function Ri(n){const t=new Rt(n.seconds,n.nanoseconds);return K.fromTimestamp(t)}function pi(n,t){const e=(t.baseMutations||[]).map(r=>pu(n.ct,r));for(let r=0;r<t.mutations.length-1;++r){const a=t.mutations[r];if(r+1<t.mutations.length&&t.mutations[r+1].transform!==void 0){const o=t.mutations[r+1];a.updateTransforms=o.transform.fieldTransforms,t.mutations.splice(r+1,1),++r}}const i=t.mutations.map(r=>pu(n.ct,r)),s=Rt.fromMillis(t.localWriteTimeMs);return new cd(t.batchId,s,e,i)}function pr(n){const t=Ri(n.readTime),e=n.lastLimboFreeSnapshotVersion!==void 0?Ri(n.lastLimboFreeSnapshotVersion):K.min();let i;return i=function(r){return r.documents!==void 0}(n.query)?function(r){return W(r.documents.length===1),ke(ha(R_(r.documents[0])))}(n.query):function(r){return ke(O_(r))}(n.query),new cn(i,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,t,e,Ft.fromBase64String(n.resumeToken))}function B_(n,t){const e=Pi(t.snapshotVersion),i=Pi(t.lastLimboFreeSnapshotVersion);let s;s=zo(t.target)?D_(n.ct,t.target):M_(n.ct,t.target)._t;const r=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:Si(t.target),readTime:e,resumeToken:r,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:i,query:s}}function U_(n){const t=O_({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ho(t,t.limit,"L"):t}function Tc(n,t){return new dd(t.largestBatchId,pu(n.ct,t.overlayMutation))}function Ip(n,t){const e=t.path.lastSegment();return[n,de(t.path.popLast()),e]}function Tp(n,t,e,i){return{indexId:n,uid:t,sequenceNumber:e,readTime:Pi(i.readTime),documentKey:de(i.documentKey.path),largestBatchId:i.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tk{getBundleMetadata(t,e){return Ep(t).get(e).next(i=>{if(i)return function(r){return{id:r.bundleId,createTime:Ri(r.createTime),version:r.version}}(i)})}saveBundleMetadata(t,e){return Ep(t).put(function(s){return{bundleId:s.id,createTime:Pi(Wt(s.createTime)),version:s.version}}(e))}getNamedQuery(t,e){return xp(t).get(e).next(i=>{if(i)return function(r){return{name:r.name,query:U_(r.bundledQuery),readTime:Ri(r.readTime)}}(i)})}saveNamedQuery(t,e){return xp(t).put(function(s){return{name:s.name,readTime:Pi(Wt(s.readTime)),bundledQuery:s.bundledQuery}}(e))}}function Ep(n){return $t(n,"bundles")}function xp(n){return $t(n,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Il{constructor(t,e){this.serializer=t,this.userId=e}static lt(t,e){const i=e.uid||"";return new Il(t,i)}getOverlay(t,e){return Zs(t).get(Ip(this.userId,e)).next(i=>i?Tc(this.serializer,i):null)}getOverlays(t,e){const i=He();return V.forEach(e,s=>this.getOverlay(t,s).next(r=>{r!==null&&i.set(s,r)})).next(()=>i)}saveOverlays(t,e,i){const s=[];return i.forEach((r,a)=>{const o=new dd(e,a);s.push(this.ht(t,o))}),V.waitFor(s)}removeOverlaysForBatchId(t,e,i){const s=new Set;e.forEach(a=>s.add(de(a.getCollectionPath())));const r=[];return s.forEach(a=>{const o=IDBKeyRange.bound([this.userId,a,i],[this.userId,a,i+1],!1,!0);r.push(Zs(t).j("collectionPathOverlayIndex",o))}),V.waitFor(r)}getOverlaysForCollection(t,e,i){const s=He(),r=de(e),a=IDBKeyRange.bound([this.userId,r,i],[this.userId,r,Number.POSITIVE_INFINITY],!0);return Zs(t).U("collectionPathOverlayIndex",a).next(o=>{for(const l of o){const c=Tc(this.serializer,l);s.set(c.getKey(),c)}return s})}getOverlaysForCollectionGroup(t,e,i,s){const r=He();let a;const o=IDBKeyRange.bound([this.userId,e,i],[this.userId,e,Number.POSITIVE_INFINITY],!0);return Zs(t).J({index:"collectionGroupOverlayIndex",range:o},(l,c,d)=>{const h=Tc(this.serializer,c);r.size()<s||h.largestBatchId===a?(r.set(h.getKey(),h),a=h.largestBatchId):d.done()}).next(()=>r)}ht(t,e){return Zs(t).put(function(s,r,a){const[o,l,c]=Ip(r,a.mutation.key);return{userId:r,collectionPath:l,documentId:c,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:Wr(s.ct,a.mutation)}}(this.serializer,this.userId,e))}}function Zs(n){return $t(n,"documentOverlays")}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ek{Pt(t){return $t(t,"globals")}getSessionToken(t){return this.Pt(t).get("sessionToken").next(e=>{const i=e==null?void 0:e.value;return i?Ft.fromUint8Array(i):Ft.EMPTY_BYTE_STRING})}setSessionToken(t,e){return this.Pt(t).put({name:"sessionToken",value:e.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(){}It(t,e){this.Tt(t,e),e.Et()}Tt(t,e){if("nullValue"in t)this.dt(e,5);else if("booleanValue"in t)this.dt(e,10),e.At(t.booleanValue?1:0);else if("integerValue"in t)this.dt(e,15),e.At(Tt(t.integerValue));else if("doubleValue"in t){const i=Tt(t.doubleValue);isNaN(i)?this.dt(e,13):(this.dt(e,15),Fr(i)?e.At(0):e.At(i))}else if("timestampValue"in t){let i=t.timestampValue;this.dt(e,20),typeof i=="string"&&(i=bn(i)),e.Rt(`${i.seconds||""}`),e.At(i.nanos||0)}else if("stringValue"in t)this.Vt(t.stringValue,e),this.ft(e);else if("bytesValue"in t)this.dt(e,30),e.gt(qn(t.bytesValue)),this.ft(e);else if("referenceValue"in t)this.yt(t.referenceValue,e);else if("geoPointValue"in t){const i=t.geoPointValue;this.dt(e,45),e.At(i.latitude||0),e.At(i.longitude||0)}else"mapValue"in t?Zy(t)?this.dt(e,Number.MAX_SAFE_INTEGER):yl(t)?this.wt(t.mapValue,e):(this.St(t.mapValue,e),this.ft(e)):"arrayValue"in t?(this.bt(t.arrayValue,e),this.ft(e)):q()}Vt(t,e){this.dt(e,25),this.Dt(t,e)}Dt(t,e){e.Rt(t)}St(t,e){const i=t.fields||{};this.dt(e,55);for(const s of Object.keys(i))this.Vt(s,e),this.Tt(i[s],e)}wt(t,e){var i,s;const r=t.fields||{};this.dt(e,53);const a="value",o=((s=(i=r[a].arrayValue)===null||i===void 0?void 0:i.values)===null||s===void 0?void 0:s.length)||0;this.dt(e,15),e.At(Tt(o)),this.Vt(a,e),this.Tt(r[a],e)}bt(t,e){const i=t.values||[];this.dt(e,50);for(const s of i)this.Tt(s,e)}yt(t,e){this.dt(e,37),z.fromName(t).path.forEach(i=>{this.dt(e,60),this.Dt(i,e)})}dt(t,e){t.At(e)}ft(t){t.At(2)}}gi.vt=new gi;function nk(n){if(n===0)return 8;let t=0;return!(n>>4)&&(t+=4,n<<=4),!(n>>6)&&(t+=2,n<<=2),!(n>>7)&&(t+=1),t}function kp(n){const t=64-function(i){let s=0;for(let r=0;r<8;++r){const a=nk(255&i[r]);if(s+=a,a!==8)break}return s}(n);return Math.ceil(t/8)}class ik{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(t){const e=t[Symbol.iterator]();let i=e.next();for(;!i.done;)this.Ft(i.value),i=e.next();this.Mt()}xt(t){const e=t[Symbol.iterator]();let i=e.next();for(;!i.done;)this.Ot(i.value),i=e.next();this.Nt()}Lt(t){for(const e of t){const i=e.charCodeAt(0);if(i<128)this.Ft(i);else if(i<2048)this.Ft(960|i>>>6),this.Ft(128|63&i);else if(e<"\uD800"||"\uDBFF"<e)this.Ft(480|i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i);else{const s=e.codePointAt(0);this.Ft(240|s>>>18),this.Ft(128|63&s>>>12),this.Ft(128|63&s>>>6),this.Ft(128|63&s)}}this.Mt()}Bt(t){for(const e of t){const i=e.charCodeAt(0);if(i<128)this.Ot(i);else if(i<2048)this.Ot(960|i>>>6),this.Ot(128|63&i);else if(e<"\uD800"||"\uDBFF"<e)this.Ot(480|i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i);else{const s=e.codePointAt(0);this.Ot(240|s>>>18),this.Ot(128|63&s>>>12),this.Ot(128|63&s>>>6),this.Ot(128|63&s)}}this.Nt()}kt(t){const e=this.qt(t),i=kp(e);this.Qt(1+i),this.buffer[this.position++]=255&i;for(let s=e.length-i;s<e.length;++s)this.buffer[this.position++]=255&e[s]}Kt(t){const e=this.qt(t),i=kp(e);this.Qt(1+i),this.buffer[this.position++]=~(255&i);for(let s=e.length-i;s<e.length;++s)this.buffer[this.position++]=~(255&e[s])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(t){this.Qt(t.length),this.buffer.set(t,this.position),this.position+=t.length}zt(){return this.buffer.slice(0,this.position)}qt(t){const e=function(r){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,r,!1),new Uint8Array(a.buffer)}(t),i=(128&e[0])!=0;e[0]^=i?255:128;for(let s=1;s<e.length;++s)e[s]^=i?255:0;return e}Ft(t){const e=255&t;e===0?(this.Ut(0),this.Ut(255)):e===255?(this.Ut(255),this.Ut(0)):this.Ut(e)}Ot(t){const e=255&t;e===0?(this.Gt(0),this.Gt(255)):e===255?(this.Gt(255),this.Gt(0)):this.Gt(t)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(t){this.Qt(1),this.buffer[this.position++]=t}Gt(t){this.Qt(1),this.buffer[this.position++]=~t}Qt(t){const e=t+this.position;if(e<=this.buffer.length)return;let i=2*this.buffer.length;i<e&&(i=e);const s=new Uint8Array(i);s.set(this.buffer),this.buffer=s}}class sk{constructor(t){this.jt=t}gt(t){this.jt.Ct(t)}Rt(t){this.jt.Lt(t)}At(t){this.jt.kt(t)}Et(){this.jt.$t()}}class rk{constructor(t){this.jt=t}gt(t){this.jt.xt(t)}Rt(t){this.jt.Bt(t)}At(t){this.jt.Kt(t)}Et(){this.jt.Wt()}}class tr{constructor(){this.jt=new ik,this.Ht=new sk(this.jt),this.Jt=new rk(this.jt)}seed(t){this.jt.seed(t)}Yt(t){return t===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(t,e,i,s){this.indexId=t,this.documentKey=e,this.arrayValue=i,this.directionalValue=s}Zt(){const t=this.directionalValue.length,e=t===0||this.directionalValue[t-1]===255?t+1:t,i=new Uint8Array(e);return i.set(this.directionalValue,0),e!==t?i.set([0],this.directionalValue.length):++i[i.length-1],new mi(this.indexId,this.documentKey,this.arrayValue,i)}}function An(n,t){let e=n.indexId-t.indexId;return e!==0?e:(e=Ap(n.arrayValue,t.arrayValue),e!==0?e:(e=Ap(n.directionalValue,t.directionalValue),e!==0?e:z.comparator(n.documentKey,t.documentKey)))}function Ap(n,t){for(let e=0;e<n.length&&e<t.length;++e){const i=n[e]-t[e];if(i!==0)return i}return n.length-t.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sp{constructor(t){this.Xt=new mt((e,i)=>Pt.comparator(e.field,i.field)),this.collectionId=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment(),this.en=t.orderBy,this.tn=[];for(const e of t.filters){const i=e;i.isInequality()?this.Xt=this.Xt.add(i):this.tn.push(i)}}get nn(){return this.Xt.size>1}rn(t){if(W(t.collectionGroup===this.collectionId),this.nn)return!1;const e=iu(t);if(e!==void 0&&!this.sn(e))return!1;const i=ui(t);let s=new Set,r=0,a=0;for(;r<i.length&&this.sn(i[r]);++r)s=s.add(i[r].fieldPath.canonicalString());if(r===i.length)return!0;if(this.Xt.size>0){const o=this.Xt.getIterator().getNext();if(!s.has(o.field.canonicalString())){const l=i[r];if(!this.on(o,l)||!this._n(this.en[a++],l))return!1}++r}for(;r<i.length;++r){const o=i[r];if(a>=this.en.length||!this._n(this.en[a++],o))return!1}return!0}an(){if(this.nn)return null;let t=new mt(Pt.comparator);const e=[];for(const i of this.tn)if(!i.field.isKeyField())if(i.op==="array-contains"||i.op==="array-contains-any")e.push(new go(i.field,2));else{if(t.has(i.field))continue;t=t.add(i.field),e.push(new go(i.field,0))}for(const i of this.en)i.field.isKeyField()||t.has(i.field)||(t=t.add(i.field),e.push(new go(i.field,i.dir==="asc"?0:1)));return new jo(jo.UNKNOWN_ID,this.collectionId,e,Lr.empty())}sn(t){for(const e of this.tn)if(this.on(e,t))return!0;return!1}on(t,e){if(t===void 0||!t.field.isEqual(e.fieldPath))return!1;const i=t.op==="array-contains"||t.op==="array-contains-any";return e.kind===2===i}_n(t,e){return!!t.field.isEqual(e.fieldPath)&&(e.kind===0&&t.dir==="asc"||e.kind===1&&t.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j_(n){var t,e;if(W(n instanceof rt||n instanceof gt),n instanceof rt){if(n instanceof l_){const s=((e=(t=n.value.arrayValue)===null||t===void 0?void 0:t.values)===null||e===void 0?void 0:e.map(r=>rt.create(n.field,"==",r)))||[];return gt.create(s,"or")}return n}const i=n.filters.map(s=>j_(s));return gt.create(i,n.op)}function ak(n){if(n.getFilters().length===0)return[];const t=yu(j_(n));return W(z_(t)),gu(t)||mu(t)?[t]:t.getFilters()}function gu(n){return n instanceof rt}function mu(n){return n instanceof gt&&ad(n)}function z_(n){return gu(n)||mu(n)||function(e){if(e instanceof gt&&ou(e)){for(const i of e.getFilters())if(!gu(i)&&!mu(i))return!1;return!0}return!1}(n)}function yu(n){if(W(n instanceof rt||n instanceof gt),n instanceof rt)return n;if(n.filters.length===1)return yu(n.filters[0]);const t=n.filters.map(i=>yu(i));let e=gt.create(t,n.op);return e=Wo(e),z_(e)?e:(W(e instanceof gt),W(ws(e)),W(e.filters.length>1),e.filters.reduce((i,s)=>pd(i,s)))}function pd(n,t){let e;return W(n instanceof rt||n instanceof gt),W(t instanceof rt||t instanceof gt),e=n instanceof rt?t instanceof rt?function(s,r){return gt.create([s,r],"and")}(n,t):Pp(n,t):t instanceof rt?Pp(t,n):function(s,r){if(W(s.filters.length>0&&r.filters.length>0),ws(s)&&ws(r))return r_(s,r.getFilters());const a=ou(s)?s:r,o=ou(s)?r:s,l=a.filters.map(c=>pd(c,o));return gt.create(l,"or")}(n,t),Wo(e)}function Pp(n,t){if(ws(t))return r_(t,n.getFilters());{const e=t.filters.map(i=>pd(n,i));return gt.create(e,"or")}}function Wo(n){if(W(n instanceof rt||n instanceof gt),n instanceof rt)return n;const t=n.getFilters();if(t.length===1)return Wo(t[0]);if(i_(n))return n;const e=t.map(s=>Wo(s)),i=[];return e.forEach(s=>{s instanceof rt?i.push(s):s instanceof gt&&(s.op===n.op?i.push(...s.filters):i.push(s))}),i.length===1?i[0]:gt.create(i,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ok{constructor(){this.un=new gd}addToCollectionParentIndex(t,e){return this.un.add(e),V.resolve()}getCollectionParents(t,e){return V.resolve(this.un.getEntries(e))}addFieldIndex(t,e){return V.resolve()}deleteFieldIndex(t,e){return V.resolve()}deleteAllFieldIndexes(t){return V.resolve()}createTargetIndexes(t,e){return V.resolve()}getDocumentsMatchingTarget(t,e){return V.resolve(null)}getIndexType(t,e){return V.resolve(0)}getFieldIndexes(t,e){return V.resolve([])}getNextCollectionGroupToUpdate(t){return V.resolve(null)}getMinOffset(t,e){return V.resolve(Te.min())}getMinOffsetFromCollectionGroup(t,e){return V.resolve(Te.min())}updateCollectionGroup(t,e,i){return V.resolve()}updateIndexEntries(t,e){return V.resolve()}}class gd{constructor(){this.index={}}add(t){const e=t.lastSegment(),i=t.popLast(),s=this.index[e]||new mt(dt.comparator),r=!s.has(i);return this.index[e]=s.add(i),r}has(t){const e=t.lastSegment(),i=t.popLast(),s=this.index[e];return s&&s.has(i)}getEntries(t){return(this.index[t]||new mt(dt.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qa=new Uint8Array(0);class lk{constructor(t,e){this.databaseId=e,this.cn=new gd,this.ln=new Xn(i=>Si(i),(i,s)=>da(i,s)),this.uid=t.uid||""}addToCollectionParentIndex(t,e){if(!this.cn.has(e)){const i=e.lastSegment(),s=e.popLast();t.addOnCommittedListener(()=>{this.cn.add(e)});const r={collectionId:i,parent:de(s)};return Rp(t).put(r)}return V.resolve()}getCollectionParents(t,e){const i=[],s=IDBKeyRange.bound([e,""],[zy(e),""],!1,!0);return Rp(t).U(s).next(r=>{for(const a of r){if(a.collectionId!==e)break;i.push($e(a.parent))}return i})}addFieldIndex(t,e){const i=er(t),s=function(o){return{indexId:o.indexId,collectionGroup:o.collectionGroup,fields:o.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(e);delete s.indexId;const r=i.add(s);if(e.indexState){const a=Zi(t);return r.next(o=>{a.put(Tp(o,this.uid,e.indexState.sequenceNumber,e.indexState.offset))})}return r.next()}deleteFieldIndex(t,e){const i=er(t),s=Zi(t),r=Xi(t);return i.delete(e.indexId).next(()=>s.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0))).next(()=>r.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0)))}deleteAllFieldIndexes(t){const e=er(t),i=Xi(t),s=Zi(t);return e.j().next(()=>i.j()).next(()=>s.j())}createTargetIndexes(t,e){return V.forEach(this.hn(e),i=>this.getIndexType(t,i).next(s=>{if(s===0||s===1){const r=new Sp(i).an();if(r!=null)return this.addFieldIndex(t,r)}}))}getDocumentsMatchingTarget(t,e){const i=Xi(t);let s=!0;const r=new Map;return V.forEach(this.hn(e),a=>this.Pn(t,a).next(o=>{s&&(s=!!o),r.set(a,o)})).next(()=>{if(s){let a=et();const o=[];return V.forEach(r,(l,c)=>{F("IndexedDbIndexManager",`Using index ${function(P){return`id=${P.indexId}|cg=${P.collectionGroup}|f=${P.fields.map(D=>`${D.fieldPath}:${D.kind}`).join(",")}`}(l)} to execute ${Si(e)}`);const d=function(P,D){const M=iu(D);if(M===void 0)return null;for(const C of $o(P,M.fieldPath))switch(C.op){case"array-contains-any":return C.value.arrayValue.values||[];case"array-contains":return[C.value]}return null}(c,l),h=function(P,D){const M=new Map;for(const C of ui(D))for(const I of $o(P,C.fieldPath))switch(I.op){case"==":case"in":M.set(C.fieldPath.canonicalString(),I.value);break;case"not-in":case"!=":return M.set(C.fieldPath.canonicalString(),I.value),Array.from(M.values())}return null}(c,l),f=function(P,D){const M=[];let C=!0;for(const I of ui(D)){const _=I.kind===0?lp(P,I.fieldPath,P.startAt):cp(P,I.fieldPath,P.startAt);M.push(_.value),C&&(C=_.inclusive)}return new vs(M,C)}(c,l),g=function(P,D){const M=[];let C=!0;for(const I of ui(D)){const _=I.kind===0?cp(P,I.fieldPath,P.endAt):lp(P,I.fieldPath,P.endAt);M.push(_.value),C&&(C=_.inclusive)}return new vs(M,C)}(c,l),y=this.In(l,c,f),v=this.In(l,c,g),w=this.Tn(l,c,h),A=this.En(l.indexId,d,y,f.inclusive,v,g.inclusive,w);return V.forEach(A,S=>i.G(S,e.limit).next(P=>{P.forEach(D=>{const M=z.fromSegments(D.documentKey);a.has(M)||(a=a.add(M),o.push(M))})}))}).next(()=>o)}return V.resolve(null)})}hn(t){let e=this.ln.get(t);return e||(t.filters.length===0?e=[t]:e=ak(gt.create(t.filters,"and")).map(i=>cu(t.path,t.collectionGroup,t.orderBy,i.getFilters(),t.limit,t.startAt,t.endAt)),this.ln.set(t,e),e)}En(t,e,i,s,r,a,o){const l=(e!=null?e.length:1)*Math.max(i.length,r.length),c=l/(e!=null?e.length:1),d=[];for(let h=0;h<l;++h){const f=e?this.dn(e[h/c]):qa,g=this.An(t,f,i[h%c],s),y=this.Rn(t,f,r[h%c],a),v=o.map(w=>this.An(t,f,w,!0));d.push(...this.createRange(g,y,v))}return d}An(t,e,i,s){const r=new mi(t,z.empty(),e,i);return s?r:r.Zt()}Rn(t,e,i,s){const r=new mi(t,z.empty(),e,i);return s?r.Zt():r}Pn(t,e){const i=new Sp(e),s=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment();return this.getFieldIndexes(t,s).next(r=>{let a=null;for(const o of r)i.rn(o)&&(!a||o.fields.length>a.fields.length)&&(a=o);return a})}getIndexType(t,e){let i=2;const s=this.hn(e);return V.forEach(s,r=>this.Pn(t,r).next(a=>{a?i!==0&&a.fields.length<function(l){let c=new mt(Pt.comparator),d=!1;for(const h of l.filters)for(const f of h.getFlattenedFilters())f.field.isKeyField()||(f.op==="array-contains"||f.op==="array-contains-any"?d=!0:c=c.add(f.field));for(const h of l.orderBy)h.field.isKeyField()||(c=c.add(h.field));return c.size+(d?1:0)}(r)&&(i=1):i=0})).next(()=>function(a){return a.limit!==null}(e)&&s.length>1&&i===2?1:i)}Vn(t,e){const i=new tr;for(const s of ui(t)){const r=e.data.field(s.fieldPath);if(r==null)return null;const a=i.Yt(s.kind);gi.vt.It(r,a)}return i.zt()}dn(t){const e=new tr;return gi.vt.It(t,e.Yt(0)),e.zt()}mn(t,e){const i=new tr;return gi.vt.It(jr(this.databaseId,e),i.Yt(function(r){const a=ui(r);return a.length===0?0:a[a.length-1].kind}(t))),i.zt()}Tn(t,e,i){if(i===null)return[];let s=[];s.push(new tr);let r=0;for(const a of ui(t)){const o=i[r++];for(const l of s)if(this.fn(e,a.fieldPath)&&zr(o))s=this.gn(s,a,o);else{const c=l.Yt(a.kind);gi.vt.It(o,c)}}return this.pn(s)}In(t,e,i){return this.Tn(t,e,i.position)}pn(t){const e=[];for(let i=0;i<t.length;++i)e[i]=t[i].zt();return e}gn(t,e,i){const s=[...t],r=[];for(const a of i.arrayValue.values||[])for(const o of s){const l=new tr;l.seed(o.zt()),gi.vt.It(a,l.Yt(e.kind)),r.push(l)}return r}fn(t,e){return!!t.filters.find(i=>i instanceof rt&&i.field.isEqual(e)&&(i.op==="in"||i.op==="not-in"))}getFieldIndexes(t,e){const i=er(t),s=Zi(t);return(e?i.U("collectionGroupIndex",IDBKeyRange.bound(e,e)):i.U()).next(r=>{const a=[];return V.forEach(r,o=>s.get([o.indexId,this.uid]).next(l=>{a.push(function(d,h){const f=h?new Lr(h.sequenceNumber,new Te(Ri(h.readTime),new z($e(h.documentKey)),h.largestBatchId)):Lr.empty(),g=d.fields.map(([y,v])=>new go(Pt.fromServerFormat(y),v));return new jo(d.indexId,d.collectionGroup,g,f)}(o,l))})).next(()=>a)})}getNextCollectionGroupToUpdate(t){return this.getFieldIndexes(t).next(e=>e.length===0?null:(e.sort((i,s)=>{const r=i.indexState.sequenceNumber-s.indexState.sequenceNumber;return r!==0?r:tt(i.collectionGroup,s.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(t,e,i){const s=er(t),r=Zi(t);return this.yn(t).next(a=>s.U("collectionGroupIndex",IDBKeyRange.bound(e,e)).next(o=>V.forEach(o,l=>r.put(Tp(l.indexId,this.uid,a,i)))))}updateIndexEntries(t,e){const i=new Map;return V.forEach(e,(s,r)=>{const a=i.get(s.collectionGroup);return(a?V.resolve(a):this.getFieldIndexes(t,s.collectionGroup)).next(o=>(i.set(s.collectionGroup,o),V.forEach(o,l=>this.wn(t,s,l).next(c=>{const d=this.Sn(r,l);return c.isEqual(d)?V.resolve():this.bn(t,r,l,c,d)}))))})}Dn(t,e,i,s){return Xi(t).put({indexId:s.indexId,uid:this.uid,arrayValue:s.arrayValue,directionalValue:s.directionalValue,orderedDocumentKey:this.mn(i,e.key),documentKey:e.key.path.toArray()})}vn(t,e,i,s){return Xi(t).delete([s.indexId,this.uid,s.arrayValue,s.directionalValue,this.mn(i,e.key),e.key.path.toArray()])}wn(t,e,i){const s=Xi(t);let r=new mt(An);return s.J({index:"documentKeyIndex",range:IDBKeyRange.only([i.indexId,this.uid,this.mn(i,e)])},(a,o)=>{r=r.add(new mi(i.indexId,e,o.arrayValue,o.directionalValue))}).next(()=>r)}Sn(t,e){let i=new mt(An);const s=this.Vn(e,t);if(s==null)return i;const r=iu(e);if(r!=null){const a=t.data.field(r.fieldPath);if(zr(a))for(const o of a.arrayValue.values||[])i=i.add(new mi(e.indexId,t.key,this.dn(o),s))}else i=i.add(new mi(e.indexId,t.key,qa,s));return i}bn(t,e,i,s,r){F("IndexedDbIndexManager","Updating index entries for document '%s'",e.key);const a=[];return function(l,c,d,h,f){const g=l.getIterator(),y=c.getIterator();let v=Ji(g),w=Ji(y);for(;v||w;){let A=!1,S=!1;if(v&&w){const P=d(v,w);P<0?S=!0:P>0&&(A=!0)}else v!=null?S=!0:A=!0;A?(h(w),w=Ji(y)):S?(f(v),v=Ji(g)):(v=Ji(g),w=Ji(y))}}(s,r,An,o=>{a.push(this.Dn(t,e,i,o))},o=>{a.push(this.vn(t,e,i,o))}),V.waitFor(a)}yn(t){let e=1;return Zi(t).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(i,s,r)=>{r.done(),e=s.sequenceNumber+1}).next(()=>e)}createRange(t,e,i){i=i.sort((a,o)=>An(a,o)).filter((a,o,l)=>!o||An(a,l[o-1])!==0);const s=[];s.push(t);for(const a of i){const o=An(a,t),l=An(a,e);if(o===0)s[0]=t.Zt();else if(o>0&&l<0)s.push(a),s.push(a.Zt());else if(l>0)break}s.push(e);const r=[];for(let a=0;a<s.length;a+=2){if(this.Cn(s[a],s[a+1]))return[];const o=[s[a].indexId,this.uid,s[a].arrayValue,s[a].directionalValue,qa,[]],l=[s[a+1].indexId,this.uid,s[a+1].arrayValue,s[a+1].directionalValue,qa,[]];r.push(IDBKeyRange.bound(o,l))}return r}Cn(t,e){return An(t,e)>0}getMinOffsetFromCollectionGroup(t,e){return this.getFieldIndexes(t,e).next(Cp)}getMinOffset(t,e){return V.mapArray(this.hn(e),i=>this.Pn(t,i).next(s=>s||q())).next(Cp)}}function Rp(n){return $t(n,"collectionParents")}function Xi(n){return $t(n,"indexEntries")}function er(n){return $t(n,"indexConfiguration")}function Zi(n){return $t(n,"indexState")}function Cp(n){W(n.length!==0);let t=n[0].indexState.offset,e=t.largestBatchId;for(let i=1;i<n.length;i++){const s=n[i].indexState.offset;ed(s,t)<0&&(t=s),e<s.largestBatchId&&(e=s.largestBatchId)}return new Te(t.readTime,t.documentKey,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dp={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class pe{constructor(t,e,i){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=i}static withCacheSize(t){return new pe(t,pe.DEFAULT_COLLECTION_PERCENTILE,pe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $_(n,t,e){const i=n.store("mutations"),s=n.store("documentMutations"),r=[],a=IDBKeyRange.only(e.batchId);let o=0;const l=i.J({range:a},(d,h,f)=>(o++,f.delete()));r.push(l.next(()=>{W(o===1)}));const c=[];for(const d of e.mutations){const h=Ky(t,d.key.path,e.batchId);r.push(s.delete(h)),c.push(d.key)}return V.waitFor(r).next(()=>c)}function Ko(n){if(!n)return 0;let t;if(n.document)t=n.document;else if(n.unknownDocument)t=n.unknownDocument;else{if(!n.noDocument)throw q();t=n.noDocument}return JSON.stringify(t).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */pe.DEFAULT_COLLECTION_PERCENTILE=10,pe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,pe.DEFAULT=new pe(41943040,pe.DEFAULT_COLLECTION_PERCENTILE,pe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),pe.DISABLED=new pe(-1,0,0);class Tl{constructor(t,e,i,s){this.userId=t,this.serializer=e,this.indexManager=i,this.referenceDelegate=s,this.Fn={}}static lt(t,e,i,s){W(t.uid!=="");const r=t.isAuthenticated()?t.uid:"";return new Tl(r,e,i,s)}checkEmpty(t){let e=!0;const i=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Sn(t).J({index:"userMutationsIndex",range:i},(s,r,a)=>{e=!1,a.done()}).next(()=>e)}addMutationBatch(t,e,i,s){const r=os(t),a=Sn(t);return a.add({}).next(o=>{W(typeof o=="number");const l=new cd(o,e,i,s),c=function(g,y,v){const w=v.baseMutations.map(S=>Wr(g.ct,S)),A=v.mutations.map(S=>Wr(g.ct,S));return{userId:y,batchId:v.batchId,localWriteTimeMs:v.localWriteTime.toMillis(),baseMutations:w,mutations:A}}(this.serializer,this.userId,l),d=[];let h=new mt((f,g)=>tt(f.canonicalString(),g.canonicalString()));for(const f of s){const g=Ky(this.userId,f.key.path,o);h=h.add(f.key.path.popLast()),d.push(a.put(c)),d.push(r.put(g,$E))}return h.forEach(f=>{d.push(this.indexManager.addToCollectionParentIndex(t,f))}),t.addOnCommittedListener(()=>{this.Fn[o]=l.keys()}),V.waitFor(d).next(()=>l)})}lookupMutationBatch(t,e){return Sn(t).get(e).next(i=>i?(W(i.userId===this.userId),pi(this.serializer,i)):null)}Mn(t,e){return this.Fn[e]?V.resolve(this.Fn[e]):this.lookupMutationBatch(t,e).next(i=>{if(i){const s=i.keys();return this.Fn[e]=s,s}return null})}getNextMutationBatchAfterBatchId(t,e){const i=e+1,s=IDBKeyRange.lowerBound([this.userId,i]);let r=null;return Sn(t).J({index:"userMutationsIndex",range:s},(a,o,l)=>{o.userId===this.userId&&(W(o.batchId>=i),r=pi(this.serializer,o)),l.done()}).next(()=>r)}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let i=-1;return Sn(t).J({index:"userMutationsIndex",range:e,reverse:!0},(s,r,a)=>{i=r.batchId,a.done()}).next(()=>i)}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return Sn(t).U("userMutationsIndex",e).next(i=>i.map(s=>pi(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(t,e){const i=mo(this.userId,e.path),s=IDBKeyRange.lowerBound(i),r=[];return os(t).J({range:s},(a,o,l)=>{const[c,d,h]=a,f=$e(d);if(c===this.userId&&e.path.isEqual(f))return Sn(t).get(h).next(g=>{if(!g)throw q();W(g.userId===this.userId),r.push(pi(this.serializer,g))});l.done()}).next(()=>r)}getAllMutationBatchesAffectingDocumentKeys(t,e){let i=new mt(tt);const s=[];return e.forEach(r=>{const a=mo(this.userId,r.path),o=IDBKeyRange.lowerBound(a),l=os(t).J({range:o},(c,d,h)=>{const[f,g,y]=c,v=$e(g);f===this.userId&&r.path.isEqual(v)?i=i.add(y):h.done()});s.push(l)}),V.waitFor(s).next(()=>this.xn(t,i))}getAllMutationBatchesAffectingQuery(t,e){const i=e.path,s=i.length+1,r=mo(this.userId,i),a=IDBKeyRange.lowerBound(r);let o=new mt(tt);return os(t).J({range:a},(l,c,d)=>{const[h,f,g]=l,y=$e(f);h===this.userId&&i.isPrefixOf(y)?y.length===s&&(o=o.add(g)):d.done()}).next(()=>this.xn(t,o))}xn(t,e){const i=[],s=[];return e.forEach(r=>{s.push(Sn(t).get(r).next(a=>{if(a===null)throw q();W(a.userId===this.userId),i.push(pi(this.serializer,a))}))}),V.waitFor(s).next(()=>i)}removeMutationBatch(t,e){return $_(t._e,this.userId,e).next(i=>(t.addOnCommittedListener(()=>{this.On(e.batchId)}),V.forEach(i,s=>this.referenceDelegate.markPotentiallyOrphaned(t,s))))}On(t){delete this.Fn[t]}performConsistencyCheck(t){return this.checkEmpty(t).next(e=>{if(!e)return V.resolve();const i=IDBKeyRange.lowerBound(function(a){return[a]}(this.userId)),s=[];return os(t).J({range:i},(r,a,o)=>{if(r[0]===this.userId){const l=$e(r[1]);s.push(l)}else o.done()}).next(()=>{W(s.length===0)})})}containsKey(t,e){return H_(t,this.userId,e)}Nn(t){return q_(t).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function H_(n,t,e){const i=mo(t,e.path),s=i[1],r=IDBKeyRange.lowerBound(i);let a=!1;return os(n).J({range:r,H:!0},(o,l,c)=>{const[d,h,f]=o;d===t&&h===s&&(a=!0),c.done()}).next(()=>a)}function Sn(n){return $t(n,"mutations")}function os(n){return $t(n,"documentMutations")}function q_(n){return $t(n,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(t){this.Ln=t}next(){return this.Ln+=2,this.Ln}static Bn(){return new Ci(0)}static kn(){return new Ci(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ck{constructor(t,e){this.referenceDelegate=t,this.serializer=e}allocateTargetId(t){return this.qn(t).next(e=>{const i=new Ci(e.highestTargetId);return e.highestTargetId=i.next(),this.Qn(t,e).next(()=>e.highestTargetId)})}getLastRemoteSnapshotVersion(t){return this.qn(t).next(e=>K.fromTimestamp(new Rt(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(t){return this.qn(t).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(t,e,i){return this.qn(t).next(s=>(s.highestListenSequenceNumber=e,i&&(s.lastRemoteSnapshotVersion=i.toTimestamp()),e>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=e),this.Qn(t,s)))}addTargetData(t,e){return this.Kn(t,e).next(()=>this.qn(t).next(i=>(i.targetCount+=1,this.$n(e,i),this.Qn(t,i))))}updateTargetData(t,e){return this.Kn(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next(()=>ts(t).delete(e.targetId)).next(()=>this.qn(t)).next(i=>(W(i.targetCount>0),i.targetCount-=1,this.Qn(t,i)))}removeTargets(t,e,i){let s=0;const r=[];return ts(t).J((a,o)=>{const l=pr(o);l.sequenceNumber<=e&&i.get(l.targetId)===null&&(s++,r.push(this.removeTargetData(t,l)))}).next(()=>V.waitFor(r)).next(()=>s)}forEachTarget(t,e){return ts(t).J((i,s)=>{const r=pr(s);e(r)})}qn(t){return Mp(t).get("targetGlobalKey").next(e=>(W(e!==null),e))}Qn(t,e){return Mp(t).put("targetGlobalKey",e)}Kn(t,e){return ts(t).put(B_(this.serializer,e))}$n(t,e){let i=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,i=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,i=!0),i}getTargetCount(t){return this.qn(t).next(e=>e.targetCount)}getTargetData(t,e){const i=Si(e),s=IDBKeyRange.bound([i,Number.NEGATIVE_INFINITY],[i,Number.POSITIVE_INFINITY]);let r=null;return ts(t).J({range:s,index:"queryTargetsIndex"},(a,o,l)=>{const c=pr(o);da(e,c.target)&&(r=c,l.done())}).next(()=>r)}addMatchingKeys(t,e,i){const s=[],r=Mn(t);return e.forEach(a=>{const o=de(a.path);s.push(r.put({targetId:i,path:o})),s.push(this.referenceDelegate.addReference(t,i,a))}),V.waitFor(s)}removeMatchingKeys(t,e,i){const s=Mn(t);return V.forEach(e,r=>{const a=de(r.path);return V.waitFor([s.delete([i,a]),this.referenceDelegate.removeReference(t,i,r)])})}removeMatchingKeysForTargetId(t,e){const i=Mn(t),s=IDBKeyRange.bound([e],[e+1],!1,!0);return i.delete(s)}getMatchingKeysForTargetId(t,e){const i=IDBKeyRange.bound([e],[e+1],!1,!0),s=Mn(t);let r=et();return s.J({range:i,H:!0},(a,o,l)=>{const c=$e(a[1]),d=new z(c);r=r.add(d)}).next(()=>r)}containsKey(t,e){const i=de(e.path),s=IDBKeyRange.bound([i],[zy(i)],!1,!0);let r=0;return Mn(t).J({index:"documentTargetsIndex",H:!0,range:s},([a,o],l,c)=>{a!==0&&(r++,c.done())}).next(()=>r>0)}ot(t,e){return ts(t).get(e).next(i=>i?pr(i):null)}}function ts(n){return $t(n,"targets")}function Mp(n){return $t(n,"targetGlobal")}function Mn(n){return $t(n,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Op([n,t],[e,i]){const s=tt(n,e);return s===0?tt(t,i):s}class uk{constructor(t){this.Un=t,this.buffer=new mt(Op),this.Wn=0}Gn(){return++this.Wn}zn(t){const e=[t,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(e);else{const i=this.buffer.last();Op(e,i)<0&&(this.buffer=this.buffer.delete(i).add(e))}}get maxValue(){return this.buffer.last()[0]}}class dk{constructor(t,e,i){this.garbageCollector=t,this.asyncQueue=e,this.localStore=i,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(t){F("LruGarbageCollector",`Garbage collection scheduled in ${t}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Jn(e)?F("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",e):await zi(e)}await this.Hn(3e5)})}}class hk{constructor(t,e){this.Jn=t,this.params=e}calculateTargetCount(t,e){return this.Jn.Yn(t).next(i=>Math.floor(e/100*i))}nthSequenceNumber(t,e){if(e===0)return V.resolve(xe.oe);const i=new uk(e);return this.Jn.forEachTarget(t,s=>i.zn(s.sequenceNumber)).next(()=>this.Jn.Zn(t,s=>i.zn(s))).next(()=>i.maxValue)}removeTargets(t,e,i){return this.Jn.removeTargets(t,e,i)}removeOrphanedDocuments(t,e){return this.Jn.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(F("LruGarbageCollector","Garbage collection skipped; disabled"),V.resolve(Dp)):this.getCacheSize(t).next(i=>i<this.params.cacheSizeCollectionThreshold?(F("LruGarbageCollector",`Garbage collection skipped; Cache size ${i} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Dp):this.Xn(t,e))}getCacheSize(t){return this.Jn.getCacheSize(t)}Xn(t,e){let i,s,r,a,o,l,c;const d=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(h=>(h>this.params.maximumSequenceNumbersToCollect?(F("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${h}`),s=this.params.maximumSequenceNumbersToCollect):s=h,a=Date.now(),this.nthSequenceNumber(t,s))).next(h=>(i=h,o=Date.now(),this.removeTargets(t,i,e))).next(h=>(r=h,l=Date.now(),this.removeOrphanedDocuments(t,i))).next(h=>(c=Date.now(),is()<=st.DEBUG&&F("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-d}ms
	Determined least recently used ${s} in `+(o-a)+`ms
	Removed ${r} targets in `+(l-o)+`ms
	Removed ${h} documents in `+(c-l)+`ms
Total Duration: ${c-d}ms`),V.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:r,documentsRemoved:h})))}}function fk(n,t){return new hk(n,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pk{constructor(t,e){this.db=t,this.garbageCollector=fk(this,e)}Yn(t){const e=this.er(t);return this.db.getTargetCache().getTargetCount(t).next(i=>e.next(s=>i+s))}er(t){let e=0;return this.Zn(t,i=>{e++}).next(()=>e)}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}Zn(t,e){return this.tr(t,(i,s)=>e(s))}addReference(t,e,i){return Wa(t,i)}removeReference(t,e,i){return Wa(t,i)}removeTargets(t,e,i){return this.db.getTargetCache().removeTargets(t,e,i)}markPotentiallyOrphaned(t,e){return Wa(t,e)}nr(t,e){return function(s,r){let a=!1;return q_(s).Y(o=>H_(s,o,r).next(l=>(l&&(a=!0),V.resolve(!l)))).next(()=>a)}(t,e)}removeOrphanedDocuments(t,e){const i=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let r=0;return this.tr(t,(a,o)=>{if(o<=e){const l=this.nr(t,a).next(c=>{if(!c)return r++,i.getEntry(t,a).next(()=>(i.removeEntry(a,K.min()),Mn(t).delete(function(h){return[0,de(h.path)]}(a))))});s.push(l)}}).next(()=>V.waitFor(s)).next(()=>i.apply(t)).next(()=>r)}removeTarget(t,e){const i=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,i)}updateLimboDocument(t,e){return Wa(t,e)}tr(t,e){const i=Mn(t);let s,r=xe.oe;return i.J({index:"documentTargetsIndex"},([a,o],{path:l,sequenceNumber:c})=>{a===0?(r!==xe.oe&&e(new z($e(s)),r),r=c,s=l):r=xe.oe}).next(()=>{r!==xe.oe&&e(new z($e(s)),r)})}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function Wa(n,t){return Mn(n).put(function(i,s){return{targetId:0,path:de(i.path),sequenceNumber:s}}(t,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W_{constructor(){this.changes=new Xn(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Et.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const i=this.changes.get(e);return i!==void 0?V.resolve(i):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gk{constructor(t){this.serializer=t}setIndexManager(t){this.indexManager=t}addEntry(t,e,i){return si(t).put(i)}removeEntry(t,e,i){return si(t).delete(function(r,a){const o=r.path.toArray();return[o.slice(0,o.length-2),o[o.length-2],qo(a),o[o.length-1]]}(e,i))}updateMetadata(t,e){return this.getMetadata(t).next(i=>(i.byteSize+=e,this.rr(t,i)))}getEntry(t,e){let i=Et.newInvalidDocument(e);return si(t).J({index:"documentKeyIndex",range:IDBKeyRange.only(nr(e))},(s,r)=>{i=this.ir(e,r)}).next(()=>i)}sr(t,e){let i={size:0,document:Et.newInvalidDocument(e)};return si(t).J({index:"documentKeyIndex",range:IDBKeyRange.only(nr(e))},(s,r)=>{i={document:this.ir(e,r),size:Ko(r)}}).next(()=>i)}getEntries(t,e){let i=Ie();return this._r(t,e,(s,r)=>{const a=this.ir(s,r);i=i.insert(s,a)}).next(()=>i)}ar(t,e){let i=Ie(),s=new St(z.comparator);return this._r(t,e,(r,a)=>{const o=this.ir(r,a);i=i.insert(r,o),s=s.insert(r,Ko(a))}).next(()=>({documents:i,ur:s}))}_r(t,e,i){if(e.isEmpty())return V.resolve();let s=new mt(Lp);e.forEach(l=>s=s.add(l));const r=IDBKeyRange.bound(nr(s.first()),nr(s.last())),a=s.getIterator();let o=a.getNext();return si(t).J({index:"documentKeyIndex",range:r},(l,c,d)=>{const h=z.fromSegments([...c.prefixPath,c.collectionGroup,c.documentId]);for(;o&&Lp(o,h)<0;)i(o,null),o=a.getNext();o&&o.isEqual(h)&&(i(o,c),o=a.hasNext()?a.getNext():null),o?d.$(nr(o)):d.done()}).next(()=>{for(;o;)i(o,null),o=a.hasNext()?a.getNext():null})}getDocumentsMatchingQuery(t,e,i,s,r){const a=e.path,o=[a.popLast().toArray(),a.lastSegment(),qo(i.readTime),i.documentKey.path.isEmpty()?"":i.documentKey.path.lastSegment()],l=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return si(t).U(IDBKeyRange.bound(o,l,!0)).next(c=>{r==null||r.incrementDocumentReadCount(c.length);let d=Ie();for(const h of c){const f=this.ir(z.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);f.isFoundDocument()&&(fa(e,f)||s.has(f.key))&&(d=d.insert(f.key,f))}return d})}getAllFromCollectionGroup(t,e,i,s){let r=Ie();const a=Np(e,i),o=Np(e,Te.max());return si(t).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(a,o,!0)},(l,c,d)=>{const h=this.ir(z.fromSegments(c.prefixPath.concat(c.collectionGroup,c.documentId)),c);r=r.insert(h.key,h),r.size===s&&d.done()}).next(()=>r)}newChangeBuffer(t){return new mk(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next(e=>e.byteSize)}getMetadata(t){return Vp(t).get("remoteDocumentGlobalKey").next(e=>(W(!!e),e))}rr(t,e){return Vp(t).put("remoteDocumentGlobalKey",e)}ir(t,e){if(e){const i=Zx(this.serializer,e);if(!(i.isNoDocument()&&i.version.isEqual(K.min())))return i}return Et.newInvalidDocument(t)}}function K_(n){return new gk(n)}class mk extends W_{constructor(t,e){super(),this.cr=t,this.trackRemovals=e,this.lr=new Xn(i=>i.toString(),(i,s)=>i.isEqual(s))}applyChanges(t){const e=[];let i=0,s=new mt((r,a)=>tt(r.canonicalString(),a.canonicalString()));return this.changes.forEach((r,a)=>{const o=this.lr.get(r);if(e.push(this.cr.removeEntry(t,r,o.readTime)),a.isValidDocument()){const l=wp(this.cr.serializer,a);s=s.add(r.path.popLast());const c=Ko(l);i+=c-o.size,e.push(this.cr.addEntry(t,r,l))}else if(i-=o.size,this.trackRemovals){const l=wp(this.cr.serializer,a.convertToNoDocument(K.min()));e.push(this.cr.addEntry(t,r,l))}}),s.forEach(r=>{e.push(this.cr.indexManager.addToCollectionParentIndex(t,r))}),e.push(this.cr.updateMetadata(t,i)),V.waitFor(e)}getFromCache(t,e){return this.cr.sr(t,e).next(i=>(this.lr.set(e,{size:i.size,readTime:i.document.readTime}),i.document))}getAllFromCache(t,e){return this.cr.ar(t,e).next(({documents:i,ur:s})=>(s.forEach((r,a)=>{this.lr.set(r,{size:a,readTime:i.get(r).readTime})}),i))}}function Vp(n){return $t(n,"remoteDocumentGlobal")}function si(n){return $t(n,"remoteDocumentsV14")}function nr(n){const t=n.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function Np(n,t){const e=t.documentKey.path.toArray();return[n,qo(t.readTime),e.slice(0,e.length-2),e.length>0?e[e.length-1]:""]}function Lp(n,t){const e=n.path.toArray(),i=t.path.toArray();let s=0;for(let r=0;r<e.length-2&&r<i.length-2;++r)if(s=tt(e[r],i[r]),s)return s;return s=tt(e.length,i.length),s||(s=tt(e[e.length-2],i[i.length-2]),s||tt(e[e.length-1],i[i.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yk{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G_{constructor(t,e,i,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=i,this.indexManager=s}getDocument(t,e){let i=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(i=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(i!==null&&kr(i.mutation,s,me.empty(),Rt.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(i=>this.getLocalViewOfDocuments(t,i,et()).next(()=>i))}getLocalViewOfDocuments(t,e,i=et()){const s=He();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,i).next(r=>{let a=hr();return r.forEach((o,l)=>{a=a.insert(o,l.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const i=He();return this.populateOverlays(t,i,e).next(()=>this.computeViews(t,e,i,et()))}populateOverlays(t,e,i){const s=[];return i.forEach(r=>{e.has(r)||s.push(r)}),this.documentOverlayCache.getOverlays(t,s).next(r=>{r.forEach((a,o)=>{e.set(a,o)})})}computeViews(t,e,i,s){let r=Ie();const a=xr(),o=function(){return xr()}();return e.forEach((l,c)=>{const d=i.get(c.key);s.has(c.key)&&(d===void 0||d.mutation instanceof wn)?r=r.insert(c.key,c):d!==void 0?(a.set(c.key,d.mutation.getFieldMask()),kr(d.mutation,c,d.mutation.getFieldMask(),Rt.now())):a.set(c.key,me.empty())}),this.recalculateAndSaveOverlays(t,r).next(l=>(l.forEach((c,d)=>a.set(c,d)),e.forEach((c,d)=>{var h;return o.set(c,new yk(d,(h=a.get(c))!==null&&h!==void 0?h:null))}),o))}recalculateAndSaveOverlays(t,e){const i=xr();let s=new St((a,o)=>a-o),r=et();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const o of a)o.keys().forEach(l=>{const c=e.get(l);if(c===null)return;let d=i.get(l)||me.empty();d=o.applyToLocalView(c,d),i.set(l,d);const h=(s.get(o.batchId)||et()).add(l);s=s.insert(o.batchId,h)})}).next(()=>{const a=[],o=s.getReverseIterator();for(;o.hasNext();){const l=o.getNext(),c=l.key,d=l.value,h=p_();d.forEach(f=>{if(!r.has(f)){const g=w_(e.get(f),i.get(f));g!==null&&h.set(f,g),r=r.add(f)}}),a.push(this.documentOverlayCache.saveOverlays(t,c,h))}return V.waitFor(a)}).next(()=>i)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(i=>this.recalculateAndSaveOverlays(t,i))}getDocumentsMatchingQuery(t,e,i,s){return function(a){return z.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):c_(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,i,s):this.getDocumentsMatchingCollectionQuery(t,e,i,s)}getNextDocuments(t,e,i,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,i,s).next(r=>{const a=s-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,i.largestBatchId,s-r.size):V.resolve(He());let o=-1,l=r;return a.next(c=>V.forEach(c,(d,h)=>(o<h.largestBatchId&&(o=h.largestBatchId),r.get(d)?V.resolve():this.remoteDocumentCache.getEntry(t,d).next(f=>{l=l.insert(d,f)}))).next(()=>this.populateOverlays(t,c,r)).next(()=>this.computeViews(t,l,c,et())).next(d=>({batchId:o,changes:f_(d)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new z(e)).next(i=>{let s=hr();return i.isFoundDocument()&&(s=s.insert(i.key,i)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,i,s){const r=e.collectionGroup;let a=hr();return this.indexManager.getCollectionParents(t,r).next(o=>V.forEach(o,l=>{const c=function(h,f){return new Ds(f,null,h.explicitOrderBy.slice(),h.filters.slice(),h.limit,h.limitType,h.startAt,h.endAt)}(e,l.child(r));return this.getDocumentsMatchingCollectionQuery(t,c,i,s).next(d=>{d.forEach((h,f)=>{a=a.insert(h,f)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,i,s){let r;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,i.largestBatchId).next(a=>(r=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,i,r,s))).next(a=>{r.forEach((l,c)=>{const d=c.getKey();a.get(d)===null&&(a=a.insert(d,Et.newInvalidDocument(d)))});let o=hr();return a.forEach((l,c)=>{const d=r.get(l);d!==void 0&&kr(d.mutation,c,me.empty(),Rt.now()),fa(e,c)&&(o=o.insert(l,c))}),o})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _k{constructor(t){this.serializer=t,this.hr=new Map,this.Pr=new Map}getBundleMetadata(t,e){return V.resolve(this.hr.get(e))}saveBundleMetadata(t,e){return this.hr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:Wt(s.createTime)}}(e)),V.resolve()}getNamedQuery(t,e){return V.resolve(this.Pr.get(e))}saveNamedQuery(t,e){return this.Pr.set(e.name,function(s){return{name:s.name,query:U_(s.bundledQuery),readTime:Wt(s.readTime)}}(e)),V.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bk{constructor(){this.overlays=new St(z.comparator),this.Ir=new Map}getOverlay(t,e){return V.resolve(this.overlays.get(e))}getOverlays(t,e){const i=He();return V.forEach(e,s=>this.getOverlay(t,s).next(r=>{r!==null&&i.set(s,r)})).next(()=>i)}saveOverlays(t,e,i){return i.forEach((s,r)=>{this.ht(t,e,r)}),V.resolve()}removeOverlaysForBatchId(t,e,i){const s=this.Ir.get(i);return s!==void 0&&(s.forEach(r=>this.overlays=this.overlays.remove(r)),this.Ir.delete(i)),V.resolve()}getOverlaysForCollection(t,e,i){const s=He(),r=e.length+1,a=new z(e.child("")),o=this.overlays.getIteratorFrom(a);for(;o.hasNext();){const l=o.getNext().value,c=l.getKey();if(!e.isPrefixOf(c.path))break;c.path.length===r&&l.largestBatchId>i&&s.set(l.getKey(),l)}return V.resolve(s)}getOverlaysForCollectionGroup(t,e,i,s){let r=new St((c,d)=>c-d);const a=this.overlays.getIterator();for(;a.hasNext();){const c=a.getNext().value;if(c.getKey().getCollectionGroup()===e&&c.largestBatchId>i){let d=r.get(c.largestBatchId);d===null&&(d=He(),r=r.insert(c.largestBatchId,d)),d.set(c.getKey(),c)}}const o=He(),l=r.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((c,d)=>o.set(c,d)),!(o.size()>=s)););return V.resolve(o)}ht(t,e,i){const s=this.overlays.get(i.key);if(s!==null){const a=this.Ir.get(s.largestBatchId).delete(i.key);this.Ir.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(i.key,new dd(e,i));let r=this.Ir.get(e);r===void 0&&(r=et(),this.Ir.set(e,r)),this.Ir.set(e,r.add(i.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vk{constructor(){this.sessionToken=Ft.EMPTY_BYTE_STRING}getSessionToken(t){return V.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,V.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class md{constructor(){this.Tr=new mt(Ht.Er),this.dr=new mt(Ht.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(t,e){const i=new Ht(t,e);this.Tr=this.Tr.add(i),this.dr=this.dr.add(i)}Rr(t,e){t.forEach(i=>this.addReference(i,e))}removeReference(t,e){this.Vr(new Ht(t,e))}mr(t,e){t.forEach(i=>this.removeReference(i,e))}gr(t){const e=new z(new dt([])),i=new Ht(e,t),s=new Ht(e,t+1),r=[];return this.dr.forEachInRange([i,s],a=>{this.Vr(a),r.push(a.key)}),r}pr(){this.Tr.forEach(t=>this.Vr(t))}Vr(t){this.Tr=this.Tr.delete(t),this.dr=this.dr.delete(t)}yr(t){const e=new z(new dt([])),i=new Ht(e,t),s=new Ht(e,t+1);let r=et();return this.dr.forEachInRange([i,s],a=>{r=r.add(a.key)}),r}containsKey(t){const e=new Ht(t,0),i=this.Tr.firstAfterOrEqual(e);return i!==null&&t.isEqual(i.key)}}class Ht{constructor(t,e){this.key=t,this.wr=e}static Er(t,e){return z.comparator(t.key,e.key)||tt(t.wr,e.wr)}static Ar(t,e){return tt(t.wr,e.wr)||z.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wk{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Sr=1,this.br=new mt(Ht.Er)}checkEmpty(t){return V.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,i,s){const r=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new cd(r,e,i,s);this.mutationQueue.push(a);for(const o of s)this.br=this.br.add(new Ht(o.key,r)),this.indexManager.addToCollectionParentIndex(t,o.key.path.popLast());return V.resolve(a)}lookupMutationBatch(t,e){return V.resolve(this.Dr(e))}getNextMutationBatchAfterBatchId(t,e){const i=e+1,s=this.vr(i),r=s<0?0:s;return V.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return V.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(t){return V.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const i=new Ht(e,0),s=new Ht(e,Number.POSITIVE_INFINITY),r=[];return this.br.forEachInRange([i,s],a=>{const o=this.Dr(a.wr);r.push(o)}),V.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(t,e){let i=new mt(tt);return e.forEach(s=>{const r=new Ht(s,0),a=new Ht(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([r,a],o=>{i=i.add(o.wr)})}),V.resolve(this.Cr(i))}getAllMutationBatchesAffectingQuery(t,e){const i=e.path,s=i.length+1;let r=i;z.isDocumentKey(r)||(r=r.child(""));const a=new Ht(new z(r),0);let o=new mt(tt);return this.br.forEachWhile(l=>{const c=l.key.path;return!!i.isPrefixOf(c)&&(c.length===s&&(o=o.add(l.wr)),!0)},a),V.resolve(this.Cr(o))}Cr(t){const e=[];return t.forEach(i=>{const s=this.Dr(i);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){W(this.Fr(e.batchId,"removed")===0),this.mutationQueue.shift();let i=this.br;return V.forEach(e.mutations,s=>{const r=new Ht(s.key,e.batchId);return i=i.delete(r),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.br=i})}On(t){}containsKey(t,e){const i=new Ht(e,0),s=this.br.firstAfterOrEqual(i);return V.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,V.resolve()}Fr(t,e){return this.vr(t)}vr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Dr(t){const e=this.vr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ik{constructor(t){this.Mr=t,this.docs=function(){return new St(z.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const i=e.key,s=this.docs.get(i),r=s?s.size:0,a=this.Mr(e);return this.docs=this.docs.insert(i,{document:e.mutableCopy(),size:a}),this.size+=a-r,this.indexManager.addToCollectionParentIndex(t,i.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const i=this.docs.get(e);return V.resolve(i?i.document.mutableCopy():Et.newInvalidDocument(e))}getEntries(t,e){let i=Ie();return e.forEach(s=>{const r=this.docs.get(s);i=i.insert(s,r?r.document.mutableCopy():Et.newInvalidDocument(s))}),V.resolve(i)}getDocumentsMatchingQuery(t,e,i,s){let r=Ie();const a=e.path,o=new z(a.child("")),l=this.docs.getIteratorFrom(o);for(;l.hasNext();){const{key:c,value:{document:d}}=l.getNext();if(!a.isPrefixOf(c.path))break;c.path.length>a.length+1||ed($y(d),i)<=0||(s.has(d.key)||fa(e,d))&&(r=r.insert(d.key,d.mutableCopy()))}return V.resolve(r)}getAllFromCollectionGroup(t,e,i,s){q()}Or(t,e){return V.forEach(this.docs,i=>e(i))}newChangeBuffer(t){return new Tk(this)}getSize(t){return V.resolve(this.size)}}class Tk extends W_{constructor(t){super(),this.cr=t}applyChanges(t){const e=[];return this.changes.forEach((i,s)=>{s.isValidDocument()?e.push(this.cr.addEntry(t,s)):this.cr.removeEntry(i)}),V.waitFor(e)}getFromCache(t,e){return this.cr.getEntry(t,e)}getAllFromCache(t,e){return this.cr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ek{constructor(t){this.persistence=t,this.Nr=new Xn(e=>Si(e),da),this.lastRemoteSnapshotVersion=K.min(),this.highestTargetId=0,this.Lr=0,this.Br=new md,this.targetCount=0,this.kr=Ci.Bn()}forEachTarget(t,e){return this.Nr.forEach((i,s)=>e(s)),V.resolve()}getLastRemoteSnapshotVersion(t){return V.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return V.resolve(this.Lr)}allocateTargetId(t){return this.highestTargetId=this.kr.next(),V.resolve(this.highestTargetId)}setTargetsMetadata(t,e,i){return i&&(this.lastRemoteSnapshotVersion=i),e>this.Lr&&(this.Lr=e),V.resolve()}Kn(t){this.Nr.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.kr=new Ci(e),this.highestTargetId=e),t.sequenceNumber>this.Lr&&(this.Lr=t.sequenceNumber)}addTargetData(t,e){return this.Kn(e),this.targetCount+=1,V.resolve()}updateTargetData(t,e){return this.Kn(e),V.resolve()}removeTargetData(t,e){return this.Nr.delete(e.target),this.Br.gr(e.targetId),this.targetCount-=1,V.resolve()}removeTargets(t,e,i){let s=0;const r=[];return this.Nr.forEach((a,o)=>{o.sequenceNumber<=e&&i.get(o.targetId)===null&&(this.Nr.delete(a),r.push(this.removeMatchingKeysForTargetId(t,o.targetId)),s++)}),V.waitFor(r).next(()=>s)}getTargetCount(t){return V.resolve(this.targetCount)}getTargetData(t,e){const i=this.Nr.get(e)||null;return V.resolve(i)}addMatchingKeys(t,e,i){return this.Br.Rr(e,i),V.resolve()}removeMatchingKeys(t,e,i){this.Br.mr(e,i);const s=this.persistence.referenceDelegate,r=[];return s&&e.forEach(a=>{r.push(s.markPotentiallyOrphaned(t,a))}),V.waitFor(r)}removeMatchingKeysForTargetId(t,e){return this.Br.gr(e),V.resolve()}getMatchingKeysForTargetId(t,e){const i=this.Br.yr(e);return V.resolve(i)}containsKey(t,e){return V.resolve(this.Br.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y_{constructor(t,e){this.qr={},this.overlays={},this.Qr=new xe(0),this.Kr=!1,this.Kr=!0,this.$r=new vk,this.referenceDelegate=t(this),this.Ur=new Ek(this),this.indexManager=new ok,this.remoteDocumentCache=function(s){return new Ik(s)}(i=>this.referenceDelegate.Wr(i)),this.serializer=new F_(e),this.Gr=new _k(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new bk,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let i=this.qr[t.toKey()];return i||(i=new wk(e,this.referenceDelegate),this.qr[t.toKey()]=i),i}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(t,e,i){F("MemoryPersistence","Starting transaction:",t);const s=new xk(this.Qr.next());return this.referenceDelegate.zr(),i(s).next(r=>this.referenceDelegate.jr(s).next(()=>r)).toPromise().then(r=>(s.raiseOnCommittedEvent(),r))}Hr(t,e){return V.or(Object.values(this.qr).map(i=>()=>i.containsKey(t,e)))}}class xk extends qy{constructor(t){super(),this.currentSequenceNumber=t}}class El{constructor(t){this.persistence=t,this.Jr=new md,this.Yr=null}static Zr(t){return new El(t)}get Xr(){if(this.Yr)return this.Yr;throw q()}addReference(t,e,i){return this.Jr.addReference(i,e),this.Xr.delete(i.toString()),V.resolve()}removeReference(t,e,i){return this.Jr.removeReference(i,e),this.Xr.add(i.toString()),V.resolve()}markPotentiallyOrphaned(t,e){return this.Xr.add(e.toString()),V.resolve()}removeTarget(t,e){this.Jr.gr(e.targetId).forEach(s=>this.Xr.add(s.toString()));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(r=>this.Xr.add(r.toString()))}).next(()=>i.removeTargetData(t,e))}zr(){this.Yr=new Set}jr(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return V.forEach(this.Xr,i=>{const s=z.fromPath(i);return this.ei(t,s).next(r=>{r||e.removeEntry(s,K.min())})}).next(()=>(this.Yr=null,e.apply(t)))}updateLimboDocument(t,e){return this.ei(t,e).next(i=>{i?this.Xr.delete(e.toString()):this.Xr.add(e.toString())})}Wr(t){return 0}ei(t,e){return V.or([()=>V.resolve(this.Jr.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Hr(t,e)])}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kk{constructor(t){this.serializer=t}O(t,e,i,s){const r=new ml("createOrUpgrade",e);i<1&&s>=1&&(function(l){l.createObjectStore("owner")}(t),function(l){l.createObjectStore("mutationQueues",{keyPath:"userId"}),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Jf,{unique:!0}),l.createObjectStore("documentMutations")}(t),Fp(t),function(l){l.createObjectStore("remoteDocuments")}(t));let a=V.resolve();return i<3&&s>=3&&(i!==0&&(function(l){l.deleteObjectStore("targetDocuments"),l.deleteObjectStore("targets"),l.deleteObjectStore("targetGlobal")}(t),Fp(t)),a=a.next(()=>function(l){const c=l.store("targetGlobal"),d={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:K.min().toTimestamp(),targetCount:0};return c.put("targetGlobalKey",d)}(r))),i<4&&s>=4&&(i!==0&&(a=a.next(()=>function(l,c){return c.store("mutations").U().next(d=>{l.deleteObjectStore("mutations"),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Jf,{unique:!0});const h=c.store("mutations"),f=d.map(g=>h.put(g));return V.waitFor(f)})}(t,r))),a=a.next(()=>{(function(l){l.createObjectStore("clientMetadata",{keyPath:"clientId"})})(t)})),i<5&&s>=5&&(a=a.next(()=>this.ni(r))),i<6&&s>=6&&(a=a.next(()=>(function(l){l.createObjectStore("remoteDocumentGlobal")}(t),this.ri(r)))),i<7&&s>=7&&(a=a.next(()=>this.ii(r))),i<8&&s>=8&&(a=a.next(()=>this.si(t,r))),i<9&&s>=9&&(a=a.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(t)})),i<10&&s>=10&&(a=a.next(()=>this.oi(r))),i<11&&s>=11&&(a=a.next(()=>{(function(l){l.createObjectStore("bundles",{keyPath:"bundleId"})})(t),function(l){l.createObjectStore("namedQueries",{keyPath:"name"})}(t)})),i<12&&s>=12&&(a=a.next(()=>{(function(l){const c=l.createObjectStore("documentOverlays",{keyPath:ex});c.createIndex("collectionPathOverlayIndex",nx,{unique:!1}),c.createIndex("collectionGroupOverlayIndex",ix,{unique:!1})})(t)})),i<13&&s>=13&&(a=a.next(()=>function(l){const c=l.createObjectStore("remoteDocumentsV14",{keyPath:HE});c.createIndex("documentKeyIndex",qE),c.createIndex("collectionGroupIndex",WE)}(t)).next(()=>this._i(t,r)).next(()=>t.deleteObjectStore("remoteDocuments"))),i<14&&s>=14&&(a=a.next(()=>this.ai(t,r))),i<15&&s>=15&&(a=a.next(()=>function(l){l.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),l.createObjectStore("indexState",{keyPath:JE}).createIndex("sequenceNumberIndex",XE,{unique:!1}),l.createObjectStore("indexEntries",{keyPath:ZE}).createIndex("documentKeyIndex",tx,{unique:!1})}(t))),i<16&&s>=16&&(a=a.next(()=>{e.objectStore("indexState").clear()}).next(()=>{e.objectStore("indexEntries").clear()})),i<17&&s>=17&&(a=a.next(()=>{(function(l){l.createObjectStore("globals",{keyPath:"name"})})(t)})),a}ri(t){let e=0;return t.store("remoteDocuments").J((i,s)=>{e+=Ko(s)}).next(()=>{const i={byteSize:e};return t.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",i)})}ni(t){const e=t.store("mutationQueues"),i=t.store("mutations");return e.U().next(s=>V.forEach(s,r=>{const a=IDBKeyRange.bound([r.userId,-1],[r.userId,r.lastAcknowledgedBatchId]);return i.U("userMutationsIndex",a).next(o=>V.forEach(o,l=>{W(l.userId===r.userId);const c=pi(this.serializer,l);return $_(t,r.userId,c).next(()=>{})}))}))}ii(t){const e=t.store("targetDocuments"),i=t.store("remoteDocuments");return t.store("targetGlobal").get("targetGlobalKey").next(s=>{const r=[];return i.J((a,o)=>{const l=new dt(a),c=function(h){return[0,de(h)]}(l);r.push(e.get(c).next(d=>d?V.resolve():(h=>e.put({targetId:0,path:de(h),sequenceNumber:s.highestListenSequenceNumber}))(l)))}).next(()=>V.waitFor(r))})}si(t,e){t.createObjectStore("collectionParents",{keyPath:QE});const i=e.store("collectionParents"),s=new gd,r=a=>{if(s.add(a)){const o=a.lastSegment(),l=a.popLast();return i.put({collectionId:o,parent:de(l)})}};return e.store("remoteDocuments").J({H:!0},(a,o)=>{const l=new dt(a);return r(l.popLast())}).next(()=>e.store("documentMutations").J({H:!0},([a,o,l],c)=>{const d=$e(o);return r(d.popLast())}))}oi(t){const e=t.store("targets");return e.J((i,s)=>{const r=pr(s),a=B_(this.serializer,r);return e.put(a)})}_i(t,e){const i=e.store("remoteDocuments"),s=[];return i.J((r,a)=>{const o=e.store("remoteDocumentsV14"),l=function(h){return h.document?new z(dt.fromString(h.document.name).popFirst(5)):h.noDocument?z.fromSegments(h.noDocument.path):h.unknownDocument?z.fromSegments(h.unknownDocument.path):q()}(a).path.toArray(),c={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};s.push(o.put(c))}).next(()=>V.waitFor(s))}ai(t,e){const i=e.store("mutations"),s=K_(this.serializer),r=new Y_(El.Zr,this.serializer.ct);return i.U().next(a=>{const o=new Map;return a.forEach(l=>{var c;let d=(c=o.get(l.userId))!==null&&c!==void 0?c:et();pi(this.serializer,l).keys().forEach(h=>d=d.add(h)),o.set(l.userId,d)}),V.forEach(o,(l,c)=>{const d=new Gt(c),h=Il.lt(this.serializer,d),f=r.getIndexManager(d),g=Tl.lt(d,this.serializer,f,r.referenceDelegate);return new G_(s,g,h,f).recalculateAndSaveOverlaysForDocumentKeys(new su(e,xe.oe),l).next()})})}}function Fp(n){n.createObjectStore("targetDocuments",{keyPath:GE}).createIndex("documentTargetsIndex",YE,{unique:!0}),n.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",KE,{unique:!0}),n.createObjectStore("targetGlobal")}const Ec="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class yd{constructor(t,e,i,s,r,a,o,l,c,d,h=17){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=i,this.ui=r,this.window=a,this.document=o,this.ci=c,this.li=d,this.hi=h,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=f=>Promise.resolve(),!yd.D())throw new B(L.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new pk(this,s),this.Ai=e+"main",this.serializer=new F_(l),this.Ri=new zn(this.Ai,this.hi,new kk(this.serializer)),this.$r=new ek,this.Ur=new ck(this.referenceDelegate,this.serializer),this.remoteDocumentCache=K_(this.serializer),this.Gr=new tk,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,d===!1&&ue("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new B(L.FAILED_PRECONDITION,Ec);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",t=>this.Ur.getHighestSequenceNumber(t))}).then(t=>{this.Qr=new xe(t,this.ci)}).then(()=>{this.Kr=!0}).catch(t=>(this.Ri&&this.Ri.close(),Promise.reject(t)))}yi(t){return this.di=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.Ri.L(async e=>{e.newVersion===null&&await t()})}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.ui.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",t=>Ka(t).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.wi(t).next(e=>{e||(this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)))})}).next(()=>this.Si(t)).next(e=>this.isPrimary&&!e?this.bi(t).next(()=>!1):!!e&&this.Di(t).next(()=>!0))).catch(t=>{if(Jn(t))return F("IndexedDbPersistence","Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return F("IndexedDbPersistence","Releasing owner lease after error during lease refresh",t),!1}).then(t=>{this.isPrimary!==t&&this.ui.enqueueRetryable(()=>this.di(t)),this.isPrimary=t})}wi(t){return ir(t).get("owner").next(e=>V.resolve(this.vi(e)))}Ci(t){return Ka(t).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const i=$t(e,"clientMetadata");return i.U().next(s=>{const r=this.xi(s,18e5),a=s.filter(o=>r.indexOf(o)===-1);return V.forEach(a,o=>i.delete(o.clientId)).next(()=>a)})}).catch(()=>[]);if(this.Vi)for(const e of t)this.Vi.removeItem(this.Oi(e.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.Fi()).then(()=>this.pi()))}vi(t){return!!t&&t.ownerId===this.clientId}Si(t){return this.li?V.resolve(!0):ir(t).get("owner").next(e=>{if(e!==null&&this.Mi(e.leaseTimestampMs,5e3)&&!this.Ni(e.ownerId)){if(this.vi(e)&&this.networkEnabled)return!0;if(!this.vi(e)){if(!e.allowTabSynchronization)throw new B(L.FAILED_PRECONDITION,Ec);return!1}}return!(!this.networkEnabled||!this.inForeground)||Ka(t).U().next(i=>this.xi(i,5e3).find(s=>{if(this.clientId!==s.clientId){const r=!this.networkEnabled&&s.networkEnabled,a=!this.inForeground&&s.inForeground,o=this.networkEnabled===s.networkEnabled;if(r||a&&o)return!0}return!1})===void 0)}).next(e=>(this.isPrimary!==e&&F("IndexedDbPersistence",`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],t=>{const e=new su(t,xe.oe);return this.bi(e).next(()=>this.Ci(e))}),this.Ri.close(),this.qi()}xi(t,e){return t.filter(i=>this.Mi(i.updateTimeMs,e)&&!this.Ni(i.clientId))}Qi(){return this.runTransaction("getActiveClients","readonly",t=>Ka(t).U().next(e=>this.xi(e,18e5).map(i=>i.clientId)))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(t,e){return Tl.lt(t,this.serializer,e,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(t){return new lk(t,this.serializer.ct.databaseId)}getDocumentOverlayCache(t){return Il.lt(this.serializer,t)}getBundleCache(){return this.Gr}runTransaction(t,e,i){F("IndexedDbPersistence","Starting transaction:",t);const s=e==="readonly"?"readonly":"readwrite",r=function(l){return l===17?ax:l===16?rx:l===15?id:l===14?Qy:l===13?Yy:l===12?sx:l===11?Gy:void q()}(this.hi);let a;return this.Ri.runTransaction(t,s,r,o=>(a=new su(o,this.Qr?this.Qr.next():xe.oe),e==="readwrite-primary"?this.wi(a).next(l=>!!l||this.Si(a)).next(l=>{if(!l)throw ue(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)),new B(L.FAILED_PRECONDITION,Hy);return i(a)}).next(l=>this.Di(a).next(()=>l)):this.Ki(a).next(()=>i(a)))).then(o=>(a.raiseOnCommittedEvent(),o))}Ki(t){return ir(t).get("owner").next(e=>{if(e!==null&&this.Mi(e.leaseTimestampMs,5e3)&&!this.Ni(e.ownerId)&&!this.vi(e)&&!(this.li||this.allowTabSynchronization&&e.allowTabSynchronization))throw new B(L.FAILED_PRECONDITION,Ec)})}Di(t){const e={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return ir(t).put("owner",e)}static D(){return zn.D()}bi(t){const e=ir(t);return e.get("owner").next(i=>this.vi(i)?(F("IndexedDbPersistence","Releasing primary lease."),e.delete("owner")):V.resolve())}Mi(t,e){const i=Date.now();return!(t<i-e)&&(!(t>i)||(ue(`Detected an update time that is in the future: ${t} > ${i}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var t;typeof((t=this.window)===null||t===void 0?void 0:t.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const e=/(?:Version|Mobile)\/1[456]/;qm()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(t){var e;try{const i=((e=this.Vi)===null||e===void 0?void 0:e.getItem(this.Oi(t)))!==null;return F("IndexedDbPersistence",`Client '${t}' ${i?"is":"is not"} zombied in LocalStorage`),i}catch(i){return ue("IndexedDbPersistence","Failed to get zombied client id.",i),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(t){ue("Failed to set zombie client id.",t)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function ir(n){return $t(n,"owner")}function Ka(n){return $t(n,"clientMetadata")}function Ak(n,t){let e=n.projectId;return n.isDefaultDatabase||(e+="."+n.database),"firestore/"+t+"/"+e+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _d{constructor(t,e,i,s){this.targetId=t,this.fromCache=e,this.$i=i,this.Ui=s}static Wi(t,e){let i=et(),s=et();for(const r of e.docChanges)switch(r.type){case 0:i=i.add(r.doc.key);break;case 1:s=s.add(r.doc.key)}return new _d(t,e.fromCache,i,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sk{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q_{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return qm()?8:Wy(zt())>0?6:4}()}initialize(t,e){this.Ji=t,this.indexManager=e,this.Gi=!0}getDocumentsMatchingQuery(t,e,i,s){const r={result:null};return this.Yi(t,e).next(a=>{r.result=a}).next(()=>{if(!r.result)return this.Zi(t,e,s,i).next(a=>{r.result=a})}).next(()=>{if(r.result)return;const a=new Sk;return this.Xi(t,e,a).next(o=>{if(r.result=o,this.zi)return this.es(t,e,a,o.size)})}).next(()=>r.result)}es(t,e,i,s){return i.documentReadCount<this.ji?(is()<=st.DEBUG&&F("QueryEngine","SDK will not create cache indexes for query:",ss(e),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),V.resolve()):(is()<=st.DEBUG&&F("QueryEngine","Query:",ss(e),"scans",i.documentReadCount,"local documents and returns",s,"documents as results."),i.documentReadCount>this.Hi*s?(is()<=st.DEBUG&&F("QueryEngine","The SDK decides to create cache indexes for query:",ss(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,ke(e))):V.resolve())}Yi(t,e){if(up(e))return V.resolve(null);let i=ke(e);return this.indexManager.getIndexType(t,i).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=Ho(e,null,"F"),i=ke(e)),this.indexManager.getDocumentsMatchingTarget(t,i).next(r=>{const a=et(...r);return this.Ji.getDocuments(t,a).next(o=>this.indexManager.getMinOffset(t,i).next(l=>{const c=this.ts(e,o);return this.ns(e,c,a,l.readTime)?this.Yi(t,Ho(e,null,"F")):this.rs(t,c,e,l)}))})))}Zi(t,e,i,s){return up(e)||s.isEqual(K.min())?V.resolve(null):this.Ji.getDocuments(t,i).next(r=>{const a=this.ts(e,r);return this.ns(e,a,i,s)?V.resolve(null):(is()<=st.DEBUG&&F("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),ss(e)),this.rs(t,a,e,NE(s,-1)).next(o=>o))})}ts(t,e){let i=new mt(d_(t));return e.forEach((s,r)=>{fa(t,r)&&(i=i.add(r))}),i}ns(t,e,i,s){if(t.limit===null)return!1;if(i.size!==e.size)return!0;const r=t.limitType==="F"?e.last():e.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(s)>0)}Xi(t,e,i){return is()<=st.DEBUG&&F("QueryEngine","Using full collection scan to execute query:",ss(e)),this.Ji.getDocumentsMatchingQuery(t,e,Te.min(),i)}rs(t,e,i,s){return this.Ji.getDocumentsMatchingQuery(t,i,s).next(r=>(e.forEach(a=>{r=r.insert(a.key,a)}),r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pk{constructor(t,e,i,s){this.persistence=t,this.ss=e,this.serializer=s,this.os=new St(tt),this._s=new Xn(r=>Si(r),da),this.us=new Map,this.cs=t.getRemoteDocumentCache(),this.Ur=t.getTargetCache(),this.Gr=t.getBundleCache(),this.ls(i)}ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new G_(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.os))}}function J_(n,t,e,i){return new Pk(n,t,e,i)}async function X_(n,t){const e=J(n);return await e.persistence.runTransaction("Handle user change","readonly",i=>{let s;return e.mutationQueue.getAllMutationBatches(i).next(r=>(s=r,e.ls(t),e.mutationQueue.getAllMutationBatches(i))).next(r=>{const a=[],o=[];let l=et();for(const c of s){a.push(c.batchId);for(const d of c.mutations)l=l.add(d.key)}for(const c of r){o.push(c.batchId);for(const d of c.mutations)l=l.add(d.key)}return e.localDocuments.getDocuments(i,l).next(c=>({hs:c,removedBatchIds:a,addedBatchIds:o}))})})}function Rk(n,t){const e=J(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",i=>{const s=t.batch.keys(),r=e.cs.newChangeBuffer({trackRemovals:!0});return function(o,l,c,d){const h=c.batch,f=h.keys();let g=V.resolve();return f.forEach(y=>{g=g.next(()=>d.getEntry(l,y)).next(v=>{const w=c.docVersions.get(y);W(w!==null),v.version.compareTo(w)<0&&(h.applyToRemoteDocument(v,c),v.isValidDocument()&&(v.setReadTime(c.commitVersion),d.addEntry(v)))})}),g.next(()=>o.mutationQueue.removeMutationBatch(l,h))}(e,i,t,r).next(()=>r.apply(i)).next(()=>e.mutationQueue.performConsistencyCheck(i)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(i,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,function(o){let l=et();for(let c=0;c<o.mutationResults.length;++c)o.mutationResults[c].transformResults.length>0&&(l=l.add(o.batch.mutations[c].key));return l}(t))).next(()=>e.localDocuments.getDocuments(i,s))})}function Z_(n){const t=J(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Ur.getLastRemoteSnapshotVersion(e))}function Ck(n,t){const e=J(n),i=t.snapshotVersion;let s=e.os;return e.persistence.runTransaction("Apply remote event","readwrite-primary",r=>{const a=e.cs.newChangeBuffer({trackRemovals:!0});s=e.os;const o=[];t.targetChanges.forEach((d,h)=>{const f=s.get(h);if(!f)return;o.push(e.Ur.removeMatchingKeys(r,d.removedDocuments,h).next(()=>e.Ur.addMatchingKeys(r,d.addedDocuments,h)));let g=f.withSequenceNumber(r.currentSequenceNumber);t.targetMismatches.get(h)!==null?g=g.withResumeToken(Ft.EMPTY_BYTE_STRING,K.min()).withLastLimboFreeSnapshotVersion(K.min()):d.resumeToken.approximateByteSize()>0&&(g=g.withResumeToken(d.resumeToken,i)),s=s.insert(h,g),function(v,w,A){return v.resumeToken.approximateByteSize()===0||w.snapshotVersion.toMicroseconds()-v.snapshotVersion.toMicroseconds()>=3e8?!0:A.addedDocuments.size+A.modifiedDocuments.size+A.removedDocuments.size>0}(f,g,d)&&o.push(e.Ur.updateTargetData(r,g))});let l=Ie(),c=et();if(t.documentUpdates.forEach(d=>{t.resolvedLimboDocuments.has(d)&&o.push(e.persistence.referenceDelegate.updateLimboDocument(r,d))}),o.push(Dk(r,a,t.documentUpdates).next(d=>{l=d.Ps,c=d.Is})),!i.isEqual(K.min())){const d=e.Ur.getLastRemoteSnapshotVersion(r).next(h=>e.Ur.setTargetsMetadata(r,r.currentSequenceNumber,i));o.push(d)}return V.waitFor(o).next(()=>a.apply(r)).next(()=>e.localDocuments.getLocalViewOfDocuments(r,l,c)).next(()=>l)}).then(r=>(e.os=s,r))}function Dk(n,t,e){let i=et(),s=et();return e.forEach(r=>i=i.add(r)),t.getEntries(n,i).next(r=>{let a=Ie();return e.forEach((o,l)=>{const c=r.get(o);l.isFoundDocument()!==c.isFoundDocument()&&(s=s.add(o)),l.isNoDocument()&&l.version.isEqual(K.min())?(t.removeEntry(o,l.readTime),a=a.insert(o,l)):!c.isValidDocument()||l.version.compareTo(c.version)>0||l.version.compareTo(c.version)===0&&c.hasPendingWrites?(t.addEntry(l),a=a.insert(o,l)):F("LocalStore","Ignoring outdated watch update for ",o,". Current version:",c.version," Watch version:",l.version)}),{Ps:a,Is:s}})}function Mk(n,t){const e=J(n);return e.persistence.runTransaction("Get next mutation batch","readonly",i=>(t===void 0&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(i,t)))}function Ok(n,t){const e=J(n);return e.persistence.runTransaction("Allocate target","readwrite",i=>{let s;return e.Ur.getTargetData(i,t).next(r=>r?(s=r,V.resolve(s)):e.Ur.allocateTargetId(i).next(a=>(s=new cn(t,a,"TargetPurposeListen",i.currentSequenceNumber),e.Ur.addTargetData(i,s).next(()=>s))))}).then(i=>{const s=e.os.get(i.targetId);return(s===null||i.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.os=e.os.insert(i.targetId,i),e._s.set(t,i.targetId)),i})}async function _u(n,t,e){const i=J(n),s=i.os.get(t),r=e?"readwrite":"readwrite-primary";try{e||await i.persistence.runTransaction("Release target",r,a=>i.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Jn(a))throw a;F("LocalStore",`Failed to update sequence numbers for target ${t}: ${a}`)}i.os=i.os.remove(t),i._s.delete(s.target)}function Bp(n,t,e){const i=J(n);let s=K.min(),r=et();return i.persistence.runTransaction("Execute query","readwrite",a=>function(l,c,d){const h=J(l),f=h._s.get(d);return f!==void 0?V.resolve(h.os.get(f)):h.Ur.getTargetData(c,d)}(i,a,ke(t)).next(o=>{if(o)return s=o.lastLimboFreeSnapshotVersion,i.Ur.getMatchingKeysForTargetId(a,o.targetId).next(l=>{r=l})}).next(()=>i.ss.getDocumentsMatchingQuery(a,t,e?s:K.min(),e?r:et())).next(o=>(Vk(i,wx(t),o),{documents:o,Ts:r})))}function Vk(n,t,e){let i=n.us.get(t)||K.min();e.forEach((s,r)=>{r.readTime.compareTo(i)>0&&(i=r.readTime)}),n.us.set(t,i)}class Up{constructor(){this.activeTargetIds=Ax()}fs(t){this.activeTargetIds=this.activeTargetIds.add(t)}gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Vs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class tb{constructor(){this.so=new Up,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,i){}addLocalQueryTarget(t,e=!0){return e&&this.so.fs(t),this.oo[t]||"not-current"}updateQueryState(t,e,i){this.oo[t]=e}removeLocalQueryTarget(t){this.so.gs(t)}isLocalQueryTarget(t){return this.so.activeTargetIds.has(t)}clearQueryState(t){delete this.oo[t]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(t){return this.so.activeTargetIds.has(t)}start(){return this.so=new Up,Promise.resolve()}handleUserChange(t,e,i){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nk{_o(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(t){this.ho.push(t)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){F("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.ho)t(0)}lo(){F("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.ho)t(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ga=null;function xc(){return Ga===null?Ga=function(){return 268435456+Math.round(2147483648*Math.random())}():Ga++,"0x"+Ga.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lk={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fk{constructor(t){this.Io=t.Io,this.To=t.To}Eo(t){this.Ao=t}Ro(t){this.Vo=t}mo(t){this.fo=t}onMessage(t){this.po=t}close(){this.To()}send(t){this.Io(t)}yo(){this.Ao()}wo(){this.Vo()}So(t){this.fo(t)}bo(t){this.po(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ne="WebChannelConnection";class Bk extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const i=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Do=i+"://"+e.host,this.vo=`projects/${s}/databases/${r}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${r}`}get Fo(){return!1}Mo(e,i,s,r,a){const o=xc(),l=this.xo(e,i.toUriEncodedString());F("RestConnection",`Sending RPC '${e}' ${o}:`,l,s);const c={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(c,r,a),this.No(e,l,c,s).then(d=>(F("RestConnection",`Received RPC '${e}' ${o}: `,d),d),d=>{throw xi("RestConnection",`RPC '${e}' ${o} failed with error: `,d,"url: ",l,"request:",s),d})}Lo(e,i,s,r,a,o){return this.Mo(e,i,s,r,a)}Oo(e,i,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Cs}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),i&&i.headers.forEach((r,a)=>e[a]=r),s&&s.headers.forEach((r,a)=>e[a]=r)}xo(e,i){const s=Lk[e];return`${this.Do}/v1/${i}:${s}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}No(t,e,i,s){const r=xc();return new Promise((a,o)=>{const l=new Vy;l.setWithCredentials(!0),l.listenOnce(Ny.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case po.NO_ERROR:const d=l.getResponseJson();F(ne,`XHR for RPC '${t}' ${r} received:`,JSON.stringify(d)),a(d);break;case po.TIMEOUT:F(ne,`RPC '${t}' ${r} timed out`),o(new B(L.DEADLINE_EXCEEDED,"Request time out"));break;case po.HTTP_ERROR:const h=l.getStatus();if(F(ne,`RPC '${t}' ${r} failed with status:`,h,"response text:",l.getResponseText()),h>0){let f=l.getResponseJson();Array.isArray(f)&&(f=f[0]);const g=f==null?void 0:f.error;if(g&&g.status&&g.message){const y=function(w){const A=w.toLowerCase().replace(/_/g,"-");return Object.values(L).indexOf(A)>=0?A:L.UNKNOWN}(g.status);o(new B(y,g.message))}else o(new B(L.UNKNOWN,"Server responded with status "+l.getStatus()))}else o(new B(L.UNAVAILABLE,"Connection failed."));break;default:q()}}finally{F(ne,`RPC '${t}' ${r} completed.`)}});const c=JSON.stringify(s);F(ne,`RPC '${t}' ${r} sending request:`,s),l.send(e,"POST",c,i,15)})}Bo(t,e,i){const s=xc(),r=[this.Do,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=By(),o=Fy(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(l.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Oo(l.initMessageHeaders,e,i),l.encodeInitMessageHeaders=!0;const d=r.join("");F(ne,`Creating RPC '${t}' stream ${s}: ${d}`,l);const h=a.createWebChannel(d,l);let f=!1,g=!1;const y=new Fk({Io:w=>{g?F(ne,`Not sending because RPC '${t}' stream ${s} is closed:`,w):(f||(F(ne,`Opening RPC '${t}' stream ${s} transport.`),h.open(),f=!0),F(ne,`RPC '${t}' stream ${s} sending:`,w),h.send(w))},To:()=>h.close()}),v=(w,A,S)=>{w.listen(A,P=>{try{S(P)}catch(D){setTimeout(()=>{throw D},0)}})};return v(h,dr.EventType.OPEN,()=>{g||(F(ne,`RPC '${t}' stream ${s} transport opened.`),y.yo())}),v(h,dr.EventType.CLOSE,()=>{g||(g=!0,F(ne,`RPC '${t}' stream ${s} transport closed`),y.So())}),v(h,dr.EventType.ERROR,w=>{g||(g=!0,xi(ne,`RPC '${t}' stream ${s} transport errored:`,w),y.So(new B(L.UNAVAILABLE,"The operation could not be completed")))}),v(h,dr.EventType.MESSAGE,w=>{var A;if(!g){const S=w.data[0];W(!!S);const P=S,D=P.error||((A=P[0])===null||A===void 0?void 0:A.error);if(D){F(ne,`RPC '${t}' stream ${s} received error:`,D);const M=D.status;let C=function(b){const E=Nt[b];if(E!==void 0)return E_(E)}(M),I=D.message;C===void 0&&(C=L.INTERNAL,I="Unknown error status: "+M+" with message "+D.message),g=!0,y.So(new B(C,I)),h.close()}else F(ne,`RPC '${t}' stream ${s} received:`,S),y.bo(S)}}),v(o,Ly.STAT_EVENT,w=>{w.stat===nu.PROXY?F(ne,`RPC '${t}' stream ${s} detected buffering proxy`):w.stat===nu.NOPROXY&&F(ne,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{y.wo()},0),y}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uk(){return typeof window<"u"?window:null}function wo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xl(n){return new zx(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd{constructor(t,e,i=1e3,s=1.5,r=6e4){this.ui=t,this.timerId=e,this.ko=i,this.qo=s,this.Qo=r,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(t){this.cancel();const e=Math.floor(this.Ko+this.zo()),i=Math.max(0,Date.now()-this.Uo),s=Math.max(0,e-i);s>0&&F("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${e} ms, last attempt: ${i} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),t())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eb{constructor(t,e,i,s,r,a,o,l){this.ui=t,this.Ho=i,this.Jo=s,this.connection=r,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=o,this.listener=l,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new bd(t,e)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(t){this.u_(),this.stream.send(t)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(t,e){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,t!==4?this.t_.reset():e&&e.code===L.RESOURCE_EXHAUSTED?(ue(e.toString()),ue("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):e&&e.code===L.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.mo(e)}l_(){}auth(){this.state=1;const t=this.h_(this.Yo),e=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([i,s])=>{this.Yo===e&&this.P_(i,s)},i=>{t(()=>{const s=new B(L.UNKNOWN,"Fetching auth token failed: "+i.message);return this.I_(s)})})}P_(t,e){const i=this.h_(this.Yo);this.stream=this.T_(t,e),this.stream.Eo(()=>{i(()=>this.listener.Eo())}),this.stream.Ro(()=>{i(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{i(()=>this.I_(s))}),this.stream.onMessage(s=>{i(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(t){return F("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}h_(t){return e=>{this.ui.enqueueAndForget(()=>this.Yo===t?e():(F("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class jk extends eb{constructor(t,e,i,s,r,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,i,s,a),this.serializer=r}T_(t,e){return this.connection.Bo("Listen",t,e)}E_(t){return this.onNext(t)}onNext(t){this.t_.reset();const e=Wx(this.serializer,t),i=function(r){if(!("targetChange"in r))return K.min();const a=r.targetChange;return a.targetIds&&a.targetIds.length?K.min():a.readTime?Wt(a.readTime):K.min()}(t);return this.listener.d_(e,i)}A_(t){const e={};e.database=fu(this.serializer),e.addTarget=function(r,a){let o;const l=a.target;if(o=zo(l)?{documents:D_(r,l)}:{query:M_(r,l)._t},o.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){o.resumeToken=A_(r,a.resumeToken);const c=du(r,a.expectedCount);c!==null&&(o.expectedCount=c)}else if(a.snapshotVersion.compareTo(K.min())>0){o.readTime=xs(r,a.snapshotVersion.toTimestamp());const c=du(r,a.expectedCount);c!==null&&(o.expectedCount=c)}return o}(this.serializer,t);const i=Gx(this.serializer,t);i&&(e.labels=i),this.a_(e)}R_(t){const e={};e.database=fu(this.serializer),e.removeTarget=t,this.a_(e)}}class zk extends eb{constructor(t,e,i,s,r,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,i,s,a),this.serializer=r}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(t,e){return this.connection.Bo("Write",t,e)}E_(t){return W(!!t.streamToken),this.lastStreamToken=t.streamToken,W(!t.writeResults||t.writeResults.length===0),this.listener.f_()}onNext(t){W(!!t.streamToken),this.lastStreamToken=t.streamToken,this.t_.reset();const e=Kx(t.writeResults,t.commitTime),i=Wt(t.commitTime);return this.listener.g_(i,e)}p_(){const t={};t.database=fu(this.serializer),this.a_(t)}m_(t){const e={streamToken:this.lastStreamToken,writes:t.map(i=>Wr(this.serializer,i))};this.a_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $k extends class{}{constructor(t,e,i,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=i,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new B(L.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(t,e,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,a])=>this.connection.Mo(t,hu(e,i),s,r,a)).catch(r=>{throw r.name==="FirebaseError"?(r.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new B(L.UNKNOWN,r.toString())})}Lo(t,e,i,s,r){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,o])=>this.connection.Lo(t,hu(e,i),s,a,o,r)).catch(a=>{throw a.name==="FirebaseError"?(a.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new B(L.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class Hk{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(t){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.C_("Offline")))}set(t){this.x_(),this.S_=0,t==="Online"&&(this.D_=!1),this.C_(t)}C_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}F_(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(ue(e),this.D_=!1):F("OnlineStateTracker",e)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qk{constructor(t,e,i,s,r){this.localStore=t,this.datastore=e,this.asyncQueue=i,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=r,this.k_._o(a=>{i.enqueueAndForget(async()=>{Hi(this)&&(F("RemoteStore","Restarting streams for network reachability change."),await async function(l){const c=J(l);c.L_.add(4),await ga(c),c.q_.set("Unknown"),c.L_.delete(4),await kl(c)}(this))})}),this.q_=new Hk(i,s)}}async function kl(n){if(Hi(n))for(const t of n.B_)await t(!0)}async function ga(n){for(const t of n.B_)await t(!1)}function nb(n,t){const e=J(n);e.N_.has(t.targetId)||(e.N_.set(t.targetId,t),Td(e)?Id(e):Vs(e).r_()&&wd(e,t))}function vd(n,t){const e=J(n),i=Vs(e);e.N_.delete(t),i.r_()&&ib(e,t),e.N_.size===0&&(i.r_()?i.o_():Hi(e)&&e.q_.set("Unknown"))}function wd(n,t){if(n.Q_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(K.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Vs(n).A_(t)}function ib(n,t){n.Q_.xe(t),Vs(n).R_(t)}function Id(n){n.Q_=new Fx({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),ot:t=>n.N_.get(t)||null,tt:()=>n.datastore.serializer.databaseId}),Vs(n).start(),n.q_.v_()}function Td(n){return Hi(n)&&!Vs(n).n_()&&n.N_.size>0}function Hi(n){return J(n).L_.size===0}function sb(n){n.Q_=void 0}async function Wk(n){n.q_.set("Online")}async function Kk(n){n.N_.forEach((t,e)=>{wd(n,t)})}async function Gk(n,t){sb(n),Td(n)?(n.q_.M_(t),Id(n)):n.q_.set("Unknown")}async function Yk(n,t,e){if(n.q_.set("Online"),t instanceof k_&&t.state===2&&t.cause)try{await async function(s,r){const a=r.cause;for(const o of r.targetIds)s.N_.has(o)&&(await s.remoteSyncer.rejectListen(o,a),s.N_.delete(o),s.Q_.removeTarget(o))}(n,t)}catch(i){F("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),i),await Go(n,i)}else if(t instanceof vo?n.Q_.Ke(t):t instanceof x_?n.Q_.He(t):n.Q_.We(t),!e.isEqual(K.min()))try{const i=await Z_(n.localStore);e.compareTo(i)>=0&&await function(r,a){const o=r.Q_.rt(a);return o.targetChanges.forEach((l,c)=>{if(l.resumeToken.approximateByteSize()>0){const d=r.N_.get(c);d&&r.N_.set(c,d.withResumeToken(l.resumeToken,a))}}),o.targetMismatches.forEach((l,c)=>{const d=r.N_.get(l);if(!d)return;r.N_.set(l,d.withResumeToken(Ft.EMPTY_BYTE_STRING,d.snapshotVersion)),ib(r,l);const h=new cn(d.target,l,c,d.sequenceNumber);wd(r,h)}),r.remoteSyncer.applyRemoteEvent(o)}(n,e)}catch(i){F("RemoteStore","Failed to raise snapshot:",i),await Go(n,i)}}async function Go(n,t,e){if(!Jn(t))throw t;n.L_.add(1),await ga(n),n.q_.set("Offline"),e||(e=()=>Z_(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{F("RemoteStore","Retrying IndexedDB access"),await e(),n.L_.delete(1),await kl(n)})}function rb(n,t){return t().catch(e=>Go(n,e,t))}async function ma(n){const t=J(n),e=Kn(t);let i=t.O_.length>0?t.O_[t.O_.length-1].batchId:-1;for(;Qk(t);)try{const s=await Mk(t.localStore,i);if(s===null){t.O_.length===0&&e.o_();break}i=s.batchId,Jk(t,s)}catch(s){await Go(t,s)}ab(t)&&ob(t)}function Qk(n){return Hi(n)&&n.O_.length<10}function Jk(n,t){n.O_.push(t);const e=Kn(n);e.r_()&&e.V_&&e.m_(t.mutations)}function ab(n){return Hi(n)&&!Kn(n).n_()&&n.O_.length>0}function ob(n){Kn(n).start()}async function Xk(n){Kn(n).p_()}async function Zk(n){const t=Kn(n);for(const e of n.O_)t.m_(e.mutations)}async function tA(n,t,e){const i=n.O_.shift(),s=ud.from(i,t,e);await rb(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await ma(n)}async function eA(n,t){t&&Kn(n).V_&&await async function(i,s){if(function(a){return T_(a)&&a!==L.ABORTED}(s.code)){const r=i.O_.shift();Kn(i).s_(),await rb(i,()=>i.remoteSyncer.rejectFailedWrite(r.batchId,s)),await ma(i)}}(n,t),ab(n)&&ob(n)}async function zp(n,t){const e=J(n);e.asyncQueue.verifyOperationInProgress(),F("RemoteStore","RemoteStore received new credentials");const i=Hi(e);e.L_.add(3),await ga(e),i&&e.q_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.L_.delete(3),await kl(e)}async function nA(n,t){const e=J(n);t?(e.L_.delete(2),await kl(e)):t||(e.L_.add(2),await ga(e),e.q_.set("Unknown"))}function Vs(n){return n.K_||(n.K_=function(e,i,s){const r=J(e);return r.w_(),new jk(i,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(n.datastore,n.asyncQueue,{Eo:Wk.bind(null,n),Ro:Kk.bind(null,n),mo:Gk.bind(null,n),d_:Yk.bind(null,n)}),n.B_.push(async t=>{t?(n.K_.s_(),Td(n)?Id(n):n.q_.set("Unknown")):(await n.K_.stop(),sb(n))})),n.K_}function Kn(n){return n.U_||(n.U_=function(e,i,s){const r=J(e);return r.w_(),new zk(i,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:Xk.bind(null,n),mo:eA.bind(null,n),f_:Zk.bind(null,n),g_:tA.bind(null,n)}),n.B_.push(async t=>{t?(n.U_.s_(),await ma(n)):(await n.U_.stop(),n.O_.length>0&&(F("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ed{constructor(t,e,i,s,r){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=i,this.op=s,this.removalCallback=r,this.deferred=new Me,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,i,s,r){const a=Date.now()+i,o=new Ed(t,e,a,s,r);return o.start(i),o}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new B(L.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function xd(n,t){if(ue("AsyncQueue",`${t}: ${n}`),Jn(n))return new B(L.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fs{constructor(t){this.comparator=t?(e,i)=>t(e,i)||z.comparator(e.key,i.key):(e,i)=>z.comparator(e.key,i.key),this.keyedMap=hr(),this.sortedSet=new St(this.comparator)}static emptySet(t){return new fs(t.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,i)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof fs)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),i=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,r=i.getNext().key;if(!s.isEqual(r))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const i=new fs;return i.comparator=this.comparator,i.keyedMap=t,i.sortedSet=e,i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $p{constructor(){this.W_=new St(z.comparator)}track(t){const e=t.doc.key,i=this.W_.get(e);i?t.type!==0&&i.type===3?this.W_=this.W_.insert(e,t):t.type===3&&i.type!==1?this.W_=this.W_.insert(e,{type:i.type,doc:t.doc}):t.type===2&&i.type===2?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):t.type===2&&i.type===0?this.W_=this.W_.insert(e,{type:0,doc:t.doc}):t.type===1&&i.type===0?this.W_=this.W_.remove(e):t.type===1&&i.type===2?this.W_=this.W_.insert(e,{type:1,doc:i.doc}):t.type===0&&i.type===1?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):q():this.W_=this.W_.insert(e,t)}G_(){const t=[];return this.W_.inorderTraversal((e,i)=>{t.push(i)}),t}}class ks{constructor(t,e,i,s,r,a,o,l,c){this.query=t,this.docs=e,this.oldDocs=i,this.docChanges=s,this.mutatedKeys=r,this.fromCache=a,this.syncStateChanged=o,this.excludesMetadataChanges=l,this.hasCachedResults=c}static fromInitialDocuments(t,e,i,s,r){const a=[];return e.forEach(o=>{a.push({type:0,doc:o})}),new ks(t,e,fs.emptySet(e),a,i,s,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&_l(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,i=t.docChanges;if(e.length!==i.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==i[s].type||!e[s].doc.isEqual(i[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iA{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(t=>t.J_())}}class sA{constructor(){this.queries=Hp(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(e,i){const s=J(e),r=s.queries;s.queries=Hp(),r.forEach((a,o)=>{for(const l of o.j_)l.onError(i)})})(this,new B(L.ABORTED,"Firestore shutting down"))}}function Hp(){return new Xn(n=>u_(n),_l)}async function kd(n,t){const e=J(n);let i=3;const s=t.query;let r=e.queries.get(s);r?!r.H_()&&t.J_()&&(i=2):(r=new iA,i=t.J_()?0:1);try{switch(i){case 0:r.z_=await e.onListen(s,!0);break;case 1:r.z_=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const o=xd(a,`Initialization of query '${ss(t.query)}' failed`);return void t.onError(o)}e.queries.set(s,r),r.j_.push(t),t.Z_(e.onlineState),r.z_&&t.X_(r.z_)&&Sd(e)}async function Ad(n,t){const e=J(n),i=t.query;let s=3;const r=e.queries.get(i);if(r){const a=r.j_.indexOf(t);a>=0&&(r.j_.splice(a,1),r.j_.length===0?s=t.J_()?0:1:!r.H_()&&t.J_()&&(s=2))}switch(s){case 0:return e.queries.delete(i),e.onUnlisten(i,!0);case 1:return e.queries.delete(i),e.onUnlisten(i,!1);case 2:return e.onLastRemoteStoreUnlisten(i);default:return}}function rA(n,t){const e=J(n);let i=!1;for(const s of t){const r=s.query,a=e.queries.get(r);if(a){for(const o of a.j_)o.X_(s)&&(i=!0);a.z_=s}}i&&Sd(e)}function aA(n,t,e){const i=J(n),s=i.queries.get(t);if(s)for(const r of s.j_)r.onError(e);i.queries.delete(t)}function Sd(n){n.Y_.forEach(t=>{t.next()})}var bu,qp;(qp=bu||(bu={})).ea="default",qp.Cache="cache";class Pd{constructor(t,e,i){this.query=t,this.ta=e,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=i||{}}X_(t){if(!this.options.includeMetadataChanges){const i=[];for(const s of t.docChanges)s.type!==3&&i.push(s);t=new ks(t.query,t.docs,t.oldDocs,i,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.na?this.ia(t)&&(this.ta.next(t),e=!0):this.sa(t,this.onlineState)&&(this.oa(t),e=!0),this.ra=t,e}onError(t){this.ta.error(t)}Z_(t){this.onlineState=t;let e=!1;return this.ra&&!this.na&&this.sa(this.ra,t)&&(this.oa(this.ra),e=!0),e}sa(t,e){if(!t.fromCache||!this.J_())return!0;const i=e!=="Offline";return(!this.options._a||!i)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}ia(t){if(t.docChanges.length>0)return!0;const e=this.ra&&this.ra.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}oa(t){t=ks.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.na=!0,this.ta.next(t)}J_(){return this.options.source!==bu.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lb{constructor(t){this.key=t}}class cb{constructor(t){this.key=t}}class oA{constructor(t,e){this.query=t,this.Ta=e,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=et(),this.mutatedKeys=et(),this.Aa=d_(t),this.Ra=new fs(this.Aa)}get Va(){return this.Ta}ma(t,e){const i=e?e.fa:new $p,s=e?e.Ra:this.Ra;let r=e?e.mutatedKeys:this.mutatedKeys,a=s,o=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,c=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((d,h)=>{const f=s.get(d),g=fa(this.query,h)?h:null,y=!!f&&this.mutatedKeys.has(f.key),v=!!g&&(g.hasLocalMutations||this.mutatedKeys.has(g.key)&&g.hasCommittedMutations);let w=!1;f&&g?f.data.isEqual(g.data)?y!==v&&(i.track({type:3,doc:g}),w=!0):this.ga(f,g)||(i.track({type:2,doc:g}),w=!0,(l&&this.Aa(g,l)>0||c&&this.Aa(g,c)<0)&&(o=!0)):!f&&g?(i.track({type:0,doc:g}),w=!0):f&&!g&&(i.track({type:1,doc:f}),w=!0,(l||c)&&(o=!0)),w&&(g?(a=a.add(g),r=v?r.add(d):r.delete(d)):(a=a.delete(d),r=r.delete(d)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const d=this.query.limitType==="F"?a.last():a.first();a=a.delete(d.key),r=r.delete(d.key),i.track({type:1,doc:d})}return{Ra:a,fa:i,ns:o,mutatedKeys:r}}ga(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,i,s){const r=this.Ra;this.Ra=t.Ra,this.mutatedKeys=t.mutatedKeys;const a=t.fa.G_();a.sort((d,h)=>function(g,y){const v=w=>{switch(w){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return q()}};return v(g)-v(y)}(d.type,h.type)||this.Aa(d.doc,h.doc)),this.pa(i),s=s!=null&&s;const o=e&&!s?this.ya():[],l=this.da.size===0&&this.current&&!s?1:0,c=l!==this.Ea;return this.Ea=l,a.length!==0||c?{snapshot:new ks(this.query,t.Ra,r,a,t.mutatedKeys,l===0,c,!1,!!i&&i.resumeToken.approximateByteSize()>0),wa:o}:{wa:o}}Z_(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new $p,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(t){return!this.Ta.has(t)&&!!this.Ra.has(t)&&!this.Ra.get(t).hasLocalMutations}pa(t){t&&(t.addedDocuments.forEach(e=>this.Ta=this.Ta.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ta=this.Ta.delete(e)),this.current=t.current)}ya(){if(!this.current)return[];const t=this.da;this.da=et(),this.Ra.forEach(i=>{this.Sa(i.key)&&(this.da=this.da.add(i.key))});const e=[];return t.forEach(i=>{this.da.has(i)||e.push(new cb(i))}),this.da.forEach(i=>{t.has(i)||e.push(new lb(i))}),e}ba(t){this.Ta=t.Ts,this.da=et();const e=this.ma(t.documents);return this.applyChanges(e,!0)}Da(){return ks.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class lA{constructor(t,e,i){this.query=t,this.targetId=e,this.view=i}}class cA{constructor(t){this.key=t,this.va=!1}}class uA{constructor(t,e,i,s,r,a){this.localStore=t,this.remoteStore=e,this.eventManager=i,this.sharedClientState=s,this.currentUser=r,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new Xn(o=>u_(o),_l),this.Ma=new Map,this.xa=new Set,this.Oa=new St(z.comparator),this.Na=new Map,this.La=new md,this.Ba={},this.ka=new Map,this.qa=Ci.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function dA(n,t,e=!0){const i=gb(n);let s;const r=i.Fa.get(t);return r?(i.sharedClientState.addLocalQueryTarget(r.targetId),s=r.view.Da()):s=await ub(i,t,e,!0),s}async function hA(n,t){const e=gb(n);await ub(e,t,!0,!1)}async function ub(n,t,e,i){const s=await Ok(n.localStore,ke(t)),r=s.targetId,a=n.sharedClientState.addLocalQueryTarget(r,e);let o;return i&&(o=await fA(n,t,r,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&nb(n.remoteStore,s),o}async function fA(n,t,e,i,s){n.Ka=(h,f,g)=>async function(v,w,A,S){let P=w.view.ma(A);P.ns&&(P=await Bp(v.localStore,w.query,!1).then(({documents:I})=>w.view.ma(I,P)));const D=S&&S.targetChanges.get(w.targetId),M=S&&S.targetMismatches.get(w.targetId)!=null,C=w.view.applyChanges(P,v.isPrimaryClient,D,M);return Kp(v,w.targetId,C.wa),C.snapshot}(n,h,f,g);const r=await Bp(n.localStore,t,!0),a=new oA(t,r.Ts),o=a.ma(r.documents),l=pa.createSynthesizedTargetChangeForCurrentChange(e,i&&n.onlineState!=="Offline",s),c=a.applyChanges(o,n.isPrimaryClient,l);Kp(n,e,c.wa);const d=new lA(t,e,a);return n.Fa.set(t,d),n.Ma.has(e)?n.Ma.get(e).push(t):n.Ma.set(e,[t]),c.snapshot}async function pA(n,t,e){const i=J(n),s=i.Fa.get(t),r=i.Ma.get(s.targetId);if(r.length>1)return i.Ma.set(s.targetId,r.filter(a=>!_l(a,t))),void i.Fa.delete(t);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(s.targetId),i.sharedClientState.isActiveQueryTarget(s.targetId)||await _u(i.localStore,s.targetId,!1).then(()=>{i.sharedClientState.clearQueryState(s.targetId),e&&vd(i.remoteStore,s.targetId),vu(i,s.targetId)}).catch(zi)):(vu(i,s.targetId),await _u(i.localStore,s.targetId,!0))}async function gA(n,t){const e=J(n),i=e.Fa.get(t),s=e.Ma.get(i.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(i.targetId),vd(e.remoteStore,i.targetId))}async function mA(n,t,e){const i=mb(n);try{const s=await function(a,o){const l=J(a),c=Rt.now(),d=o.reduce((g,y)=>g.add(y.key),et());let h,f;return l.persistence.runTransaction("Locally write mutations","readwrite",g=>{let y=Ie(),v=et();return l.cs.getEntries(g,d).next(w=>{y=w,y.forEach((A,S)=>{S.isValidDocument()||(v=v.add(A))})}).next(()=>l.localDocuments.getOverlayedDocuments(g,y)).next(w=>{h=w;const A=[];for(const S of o){const P=Ox(S,h.get(S.key).overlayedDocument);P!=null&&A.push(new wn(S.key,P,e_(P.value.mapValue),xt.exists(!0)))}return l.mutationQueue.addMutationBatch(g,c,A,o)}).next(w=>{f=w;const A=w.applyToLocalDocumentSet(h,v);return l.documentOverlayCache.saveOverlays(g,w.batchId,A)})}).then(()=>({batchId:f.batchId,changes:f_(h)}))}(i.localStore,t);i.sharedClientState.addPendingMutation(s.batchId),function(a,o,l){let c=a.Ba[a.currentUser.toKey()];c||(c=new St(tt)),c=c.insert(o,l),a.Ba[a.currentUser.toKey()]=c}(i,s.batchId,e),await ya(i,s.changes),await ma(i.remoteStore)}catch(s){const r=xd(s,"Failed to persist write");e.reject(r)}}async function db(n,t){const e=J(n);try{const i=await Ck(e.localStore,t);t.targetChanges.forEach((s,r)=>{const a=e.Na.get(r);a&&(W(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.va=!0:s.modifiedDocuments.size>0?W(a.va):s.removedDocuments.size>0&&(W(a.va),a.va=!1))}),await ya(e,i,t)}catch(i){await zi(i)}}function Wp(n,t,e){const i=J(n);if(i.isPrimaryClient&&e===0||!i.isPrimaryClient&&e===1){const s=[];i.Fa.forEach((r,a)=>{const o=a.view.Z_(t);o.snapshot&&s.push(o.snapshot)}),function(a,o){const l=J(a);l.onlineState=o;let c=!1;l.queries.forEach((d,h)=>{for(const f of h.j_)f.Z_(o)&&(c=!0)}),c&&Sd(l)}(i.eventManager,t),s.length&&i.Ca.d_(s),i.onlineState=t,i.isPrimaryClient&&i.sharedClientState.setOnlineState(t)}}async function yA(n,t,e){const i=J(n);i.sharedClientState.updateQueryState(t,"rejected",e);const s=i.Na.get(t),r=s&&s.key;if(r){let a=new St(z.comparator);a=a.insert(r,Et.newNoDocument(r,K.min()));const o=et().add(r),l=new wl(K.min(),new Map,new St(tt),a,o);await db(i,l),i.Oa=i.Oa.remove(r),i.Na.delete(t),Rd(i)}else await _u(i.localStore,t,!1).then(()=>vu(i,t,e)).catch(zi)}async function _A(n,t){const e=J(n),i=t.batch.batchId;try{const s=await Rk(e.localStore,t);fb(e,i,null),hb(e,i),e.sharedClientState.updateMutationState(i,"acknowledged"),await ya(e,s)}catch(s){await zi(s)}}async function bA(n,t,e){const i=J(n);try{const s=await function(a,o){const l=J(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let d;return l.mutationQueue.lookupMutationBatch(c,o).next(h=>(W(h!==null),d=h.keys(),l.mutationQueue.removeMutationBatch(c,h))).next(()=>l.mutationQueue.performConsistencyCheck(c)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(c,d,o)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,d)).next(()=>l.localDocuments.getDocuments(c,d))})}(i.localStore,t);fb(i,t,e),hb(i,t),i.sharedClientState.updateMutationState(t,"rejected",e),await ya(i,s)}catch(s){await zi(s)}}function hb(n,t){(n.ka.get(t)||[]).forEach(e=>{e.resolve()}),n.ka.delete(t)}function fb(n,t,e){const i=J(n);let s=i.Ba[i.currentUser.toKey()];if(s){const r=s.get(t);r&&(e?r.reject(e):r.resolve(),s=s.remove(t)),i.Ba[i.currentUser.toKey()]=s}}function vu(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const i of n.Ma.get(t))n.Fa.delete(i),e&&n.Ca.$a(i,e);n.Ma.delete(t),n.isPrimaryClient&&n.La.gr(t).forEach(i=>{n.La.containsKey(i)||pb(n,i)})}function pb(n,t){n.xa.delete(t.path.canonicalString());const e=n.Oa.get(t);e!==null&&(vd(n.remoteStore,e),n.Oa=n.Oa.remove(t),n.Na.delete(e),Rd(n))}function Kp(n,t,e){for(const i of e)i instanceof lb?(n.La.addReference(i.key,t),vA(n,i)):i instanceof cb?(F("SyncEngine","Document no longer in limbo: "+i.key),n.La.removeReference(i.key,t),n.La.containsKey(i.key)||pb(n,i.key)):q()}function vA(n,t){const e=t.key,i=e.path.canonicalString();n.Oa.get(e)||n.xa.has(i)||(F("SyncEngine","New document in limbo: "+e),n.xa.add(i),Rd(n))}function Rd(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const t=n.xa.values().next().value;n.xa.delete(t);const e=new z(dt.fromString(t)),i=n.qa.next();n.Na.set(i,new cA(e)),n.Oa=n.Oa.insert(e,i),nb(n.remoteStore,new cn(ke(ha(e.path)),i,"TargetPurposeLimboResolution",xe.oe))}}async function ya(n,t,e){const i=J(n),s=[],r=[],a=[];i.Fa.isEmpty()||(i.Fa.forEach((o,l)=>{a.push(i.Ka(l,t,e).then(c=>{var d;if((c||e)&&i.isPrimaryClient){const h=c?!c.fromCache:(d=e==null?void 0:e.targetChanges.get(l.targetId))===null||d===void 0?void 0:d.current;i.sharedClientState.updateQueryState(l.targetId,h?"current":"not-current")}if(c){s.push(c);const h=_d.Wi(l.targetId,c);r.push(h)}}))}),await Promise.all(a),i.Ca.d_(s),await async function(l,c){const d=J(l);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",h=>V.forEach(c,f=>V.forEach(f.$i,g=>d.persistence.referenceDelegate.addReference(h,f.targetId,g)).next(()=>V.forEach(f.Ui,g=>d.persistence.referenceDelegate.removeReference(h,f.targetId,g)))))}catch(h){if(!Jn(h))throw h;F("LocalStore","Failed to update sequence numbers: "+h)}for(const h of c){const f=h.targetId;if(!h.fromCache){const g=d.os.get(f),y=g.snapshotVersion,v=g.withLastLimboFreeSnapshotVersion(y);d.os=d.os.insert(f,v)}}}(i.localStore,r))}async function wA(n,t){const e=J(n);if(!e.currentUser.isEqual(t)){F("SyncEngine","User change. New user:",t.toKey());const i=await X_(e.localStore,t);e.currentUser=t,function(r,a){r.ka.forEach(o=>{o.forEach(l=>{l.reject(new B(L.CANCELLED,a))})}),r.ka.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,i.removedBatchIds,i.addedBatchIds),await ya(e,i.hs)}}function IA(n,t){const e=J(n),i=e.Na.get(t);if(i&&i.va)return et().add(i.key);{let s=et();const r=e.Ma.get(t);if(!r)return s;for(const a of r){const o=e.Fa.get(a);s=s.unionWith(o.view.Va)}return s}}function gb(n){const t=J(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=db.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=IA.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=yA.bind(null,t),t.Ca.d_=rA.bind(null,t.eventManager),t.Ca.$a=aA.bind(null,t.eventManager),t}function mb(n){const t=J(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=_A.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=bA.bind(null,t),t}class Kr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=xl(t.databaseInfo.databaseId),this.sharedClientState=this.Wa(t),this.persistence=this.Ga(t),await this.persistence.start(),this.localStore=this.za(t),this.gcScheduler=this.ja(t,this.localStore),this.indexBackfillerScheduler=this.Ha(t,this.localStore)}ja(t,e){return null}Ha(t,e){return null}za(t){return J_(this.persistence,new Q_,t.initialUser,this.serializer)}Ga(t){return new Y_(El.Zr,this.serializer)}Wa(t){return new tb}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Kr.provider={build:()=>new Kr};class TA extends Kr{constructor(t,e,i){super(),this.Ja=t,this.cacheSizeBytes=e,this.forceOwnership=i,this.kind="persistent",this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await this.Ja.initialize(this,t),await mb(this.Ja.syncEngine),await ma(this.Ja.remoteStore),await this.persistence.yi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}za(t){return J_(this.persistence,new Q_,t.initialUser,this.serializer)}ja(t,e){const i=this.persistence.referenceDelegate.garbageCollector;return new dk(i,t.asyncQueue,e)}Ha(t,e){const i=new UE(e,this.persistence);return new BE(t.asyncQueue,i)}Ga(t){const e=Ak(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),i=this.cacheSizeBytes!==void 0?pe.withCacheSize(this.cacheSizeBytes):pe.DEFAULT;return new yd(this.synchronizeTabs,e,t.clientId,i,t.asyncQueue,Uk(),wo(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(t){return new tb}}class Yo{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>Wp(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=wA.bind(null,this.syncEngine),await nA(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new sA}()}createDatastore(t){const e=xl(t.databaseInfo.databaseId),i=function(r){return new Bk(r)}(t.databaseInfo);return function(r,a,o,l){return new $k(r,a,o,l)}(t.authCredentials,t.appCheckCredentials,i,e)}createRemoteStore(t){return function(i,s,r,a,o){return new qk(i,s,r,a,o)}(this.localStore,this.datastore,t.asyncQueue,e=>Wp(this.syncEngine,e,0),function(){return jp.D()?new jp:new Nk}())}createSyncEngine(t,e){return function(s,r,a,o,l,c,d){const h=new uA(s,r,a,o,l,c);return d&&(h.Qa=!0),h}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const r=J(s);F("RemoteStore","RemoteStore shutting down."),r.L_.add(5),await ga(r),r.k_.shutdown(),r.q_.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}Yo.provider={build:()=>new Yo};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ya(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ya(this.observer.error,t):ue("Uncaught Error in snapshot listener:",t.toString()))}Za(){this.muted=!0}Ya(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EA{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new B(L.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const e=await async function(s,r){const a=J(s),o={documents:r.map(h=>qr(a.serializer,h))},l=await a.Lo("BatchGetDocuments",a.serializer.databaseId,dt.emptyPath(),o,r.length),c=new Map;l.forEach(h=>{const f=qx(a.serializer,h);c.set(f.key.toString(),f)});const d=[];return r.forEach(h=>{const f=c.get(h.toString());W(!!f),d.push(f)}),d}(this.datastore,t);return e.forEach(i=>this.recordVersion(i)),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(i){this.lastTransactionError=i}this.writtenDocs.add(t.toString())}delete(t){this.write(new Os(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach(e=>{t.delete(e.key.toString())}),t.forEach((e,i)=>{const s=z.fromPath(i);this.mutations.push(new ld(s,this.precondition(s)))}),await async function(i,s){const r=J(i),a={writes:s.map(o=>Wr(r.serializer,o))};await r.Mo("Commit",r.serializer.databaseId,dt.emptyPath(),a)}(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw q();e=K.min()}const i=this.readVersions.get(t.key.toString());if(i){if(!e.isEqual(i))throw new B(L.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?e.isEqual(K.min())?xt.exists(!1):xt.updateTime(e):xt.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(K.min()))throw new B(L.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return xt.updateTime(e)}return xt.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xA{constructor(t,e,i,s,r){this.asyncQueue=t,this.datastore=e,this.options=i,this.updateFunction=s,this.deferred=r,this._u=i.maxAttempts,this.t_=new bd(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go(async()=>{const t=new EA(this.datastore),e=this.cu(t);e&&e.then(i=>{this.asyncQueue.enqueueAndForget(()=>t.commit().then(()=>{this.deferred.resolve(i)}).catch(s=>{this.lu(s)}))}).catch(i=>{this.lu(i)})})}cu(t){try{const e=this.updateFunction(t);return!ua(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}lu(t){this._u>0&&this.hu(t)?(this._u-=1,this.asyncQueue.enqueueAndForget(()=>(this.uu(),Promise.resolve()))):this.deferred.reject(t)}hu(t){if(t.name==="FirebaseError"){const e=t.code;return e==="aborted"||e==="failed-precondition"||e==="already-exists"||!T_(e)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kA{constructor(t,e,i,s,r){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=i,this.databaseInfo=s,this.user=Gt.UNAUTHENTICATED,this.clientId=jy.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(i,async a=>{F("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(i,a=>(F("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Me;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const i=xd(e,"Failed to shutdown persistence");t.reject(i)}}),t.promise}}async function kc(n,t){n.asyncQueue.verifyOperationInProgress(),F("FirestoreClient","Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let i=e.initialUser;n.setCredentialChangeListener(async s=>{i.isEqual(s)||(await X_(t.localStore,s),i=s)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function Gp(n,t){n.asyncQueue.verifyOperationInProgress();const e=await AA(n);F("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(i=>zp(t.remoteStore,i)),n.setAppCheckTokenChangeListener((i,s)=>zp(t.remoteStore,s)),n._onlineComponents=t}async function AA(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){F("FirestoreClient","Using user provided OfflineComponentProvider");try{await kc(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===L.FAILED_PRECONDITION||s.code===L.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;xi("Error using user provided cache. Falling back to memory cache: "+e),await kc(n,new Kr)}}else F("FirestoreClient","Using default OfflineComponentProvider"),await kc(n,new Kr);return n._offlineComponents}async function Dd(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(F("FirestoreClient","Using user provided OnlineComponentProvider"),await Gp(n,n._uninitializedComponentsProvider._online)):(F("FirestoreClient","Using default OnlineComponentProvider"),await Gp(n,new Yo))),n._onlineComponents}function SA(n){return Dd(n).then(t=>t.syncEngine)}function PA(n){return Dd(n).then(t=>t.datastore)}async function Qo(n){const t=await Dd(n),e=t.eventManager;return e.onListen=dA.bind(null,t.syncEngine),e.onUnlisten=pA.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=hA.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=gA.bind(null,t.syncEngine),e}function RA(n,t,e={}){const i=new Me;return n.asyncQueue.enqueueAndForget(async()=>function(r,a,o,l,c){const d=new Cd({next:f=>{d.Za(),a.enqueueAndForget(()=>Ad(r,h));const g=f.docs.has(o);!g&&f.fromCache?c.reject(new B(L.UNAVAILABLE,"Failed to get document because the client is offline.")):g&&f.fromCache&&l&&l.source==="server"?c.reject(new B(L.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(f)},error:f=>c.reject(f)}),h=new Pd(ha(o.path),d,{includeMetadataChanges:!0,_a:!0});return kd(r,h)}(await Qo(n),n.asyncQueue,t,e,i)),i.promise}function CA(n,t,e={}){const i=new Me;return n.asyncQueue.enqueueAndForget(async()=>function(r,a,o,l,c){const d=new Cd({next:f=>{d.Za(),a.enqueueAndForget(()=>Ad(r,h)),f.fromCache&&l.source==="server"?c.reject(new B(L.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(f)},error:f=>c.reject(f)}),h=new Pd(o,d,{includeMetadataChanges:!0,_a:!0});return kd(r,h)}(await Qo(n),n.asyncQueue,t,e,i)),i.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yb(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yp=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _b(n,t,e){if(!e)throw new B(L.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function DA(n,t,e,i){if(t===!0&&i===!0)throw new B(L.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Qp(n){if(!z.isDocumentKey(n))throw new B(L.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Jp(n){if(z.isDocumentKey(n))throw new B(L.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Al(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(i){return i.constructor?i.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":q()}function Jt(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new B(L.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Al(n);throw new B(L.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xp{constructor(t){var e,i;if(t.host===void 0){if(t.ssl!==void 0)throw new B(L.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(e=t.ssl)===null||e===void 0||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new B(L.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}DA("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=yb((i=t.experimentalLongPollingOptions)!==null&&i!==void 0?i:{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new B(L.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new B(L.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new B(L.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(i,s){return i.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Sl{constructor(t,e,i,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Xp({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new B(L.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new B(L.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Xp(t),t.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new AE;switch(i.type){case"firstParty":return new CE(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new B(L.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const i=Yp.get(e);i&&(F("ComponentProvider","Removing Datastore"),Yp.delete(e),i.terminate())}(this),Promise.resolve()}}function MA(n,t,e,i={}){var s;const r=(n=Jt(n,Sl))._getSettings(),a=`${t}:${e}`;if(r.host!=="firestore.googleapis.com"&&r.host!==a&&xi("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},r),{host:a,ssl:!1})),i.mockUserToken){let o,l;if(typeof i.mockUserToken=="string")o=i.mockUserToken,l=Gt.MOCK_USER;else{o=Hw(i.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const c=i.mockUserToken.sub||i.mockUserToken.user_id;if(!c)throw new B(L.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new Gt(c)}n._authCredentials=new SE(new Uy(o,l))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(t,e,i){this.converter=e,this._query=i,this.type="query",this.firestore=t}withConverter(t){return new In(this.firestore,t,this._query)}}class Xt{constructor(t,e,i){this.converter=e,this._key=i,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new $n(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Xt(this.firestore,t,this._key)}}class $n extends In{constructor(t,e,i){super(t,e,ha(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Xt(this.firestore,null,new z(t))}withConverter(t){return new $n(this.firestore,t,this._path)}}function lt(n,t,...e){if(n=yt(n),_b("collection","path",t),n instanceof Sl){const i=dt.fromString(t,...e);return Jp(i),new $n(n,null,i)}{if(!(n instanceof Xt||n instanceof $n))throw new B(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(dt.fromString(t,...e));return Jp(i),new $n(n.firestore,null,i)}}function ct(n,t,...e){if(n=yt(n),arguments.length===1&&(t=jy.newId()),_b("doc","path",t),n instanceof Sl){const i=dt.fromString(t,...e);return Qp(i),new Xt(n,null,new z(i))}{if(!(n instanceof Xt||n instanceof $n))throw new B(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(dt.fromString(t,...e));return Qp(i),new Xt(n.firestore,n instanceof $n?n.converter:null,new z(i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zp{constructor(t=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new bd(this,"async_queue_retry"),this.Vu=()=>{const i=wo();i&&F("AsyncQueue","Visibility state changed to "+i.visibilityState),this.t_.jo()},this.mu=t;const e=wo();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.fu(),this.gu(t)}enterRestrictedMode(t){if(!this.Iu){this.Iu=!0,this.Au=t||!1;const e=wo();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.Vu)}}enqueue(t){if(this.fu(),this.Iu)return new Promise(()=>{});const e=new Me;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Pu.push(t),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(t){if(!Jn(t))throw t;F("AsyncQueue","Operation failed with retryable error: "+t)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(t){const e=this.mu.then(()=>(this.du=!0,t().catch(i=>{this.Eu=i,this.du=!1;const s=function(a){let o=a.message||"";return a.stack&&(o=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),o}(i);throw ue("INTERNAL UNHANDLED ERROR: ",s),i}).then(i=>(this.du=!1,i))));return this.mu=e,e}enqueueAfterDelay(t,e,i){this.fu(),this.Ru.indexOf(t)>-1&&(e=0);const s=Ed.createAndSchedule(this,t,e,i,r=>this.yu(r));return this.Tu.push(s),s}fu(){this.Eu&&q()}verifyOperationInProgress(){}async wu(){let t;do t=this.mu,await t;while(t!==this.mu)}Su(t){for(const e of this.Tu)if(e.timerId===t)return!0;return!1}bu(t){return this.wu().then(()=>{this.Tu.sort((e,i)=>e.targetTimeMs-i.targetTimeMs);for(const e of this.Tu)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.wu()})}Du(t){this.Ru.push(t)}yu(t){const e=this.Tu.indexOf(t);this.Tu.splice(e,1)}}function tg(n){return function(e,i){if(typeof e!="object"||e===null)return!1;const s=e;for(const r of i)if(r in s&&typeof s[r]=="function")return!0;return!1}(n,["next","error","complete"])}class Se extends Sl{constructor(t,e,i,s){super(t,e,i,s),this.type="firestore",this._queue=new Zp,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Zp(t),this._firestoreClient=void 0,await t}}}function OA(n,t){const e=typeof n=="object"?n:hl(),i=typeof n=="string"?n:"(default)",s=Bi(e,"firestore").getImmediate({identifier:i});if(!s._initialized){const r=zm("firestore");r&&MA(s,...r)}return s}function Ns(n){if(n._terminated)throw new B(L.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||bb(n),n._firestoreClient}function bb(n){var t,e,i;const s=n._freezeSettings(),r=function(o,l,c,d){return new lx(o,l,c,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,yb(d.experimentalLongPollingOptions),d.useFetchStreams)}(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((e=s.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((i=s.localCache)===null||i===void 0)&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new kA(n._authCredentials,n._appCheckCredentials,n._queue,r,n._componentsProvider&&function(o){const l=o==null?void 0:o._online.build();return{_offline:o==null?void 0:o._offline.build(l),_online:l}}(n._componentsProvider))}function VA(n,t){xi("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();return NA(n,Yo.provider,{build:i=>new TA(i,e.cacheSizeBytes,void 0)}),Promise.resolve()}function NA(n,t,e){if((n=Jt(n,Se))._firestoreClient||n._terminated)throw new B(L.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new B(L.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:t,_offline:e},bb(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Di(Ft.fromBase64String(t))}catch(e){throw new B(L.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Di(Ft.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new B(L.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Pt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Md{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new B(L.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new B(L.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return tt(this._lat,t._lat)||tt(this._long,t._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Od{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(i,s){if(i.length!==s.length)return!1;for(let r=0;r<i.length;++r)if(i[r]!==s[r])return!1;return!0}(this._values,t._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LA=/^__.*__$/;class FA{constructor(t,e,i){this.data=t,this.fieldMask=e,this.fieldTransforms=i}toMutation(t,e){return this.fieldMask!==null?new wn(t,this.data,this.fieldMask,e,this.fieldTransforms):new Ms(t,this.data,e,this.fieldTransforms)}}class vb{constructor(t,e,i){this.data=t,this.fieldMask=e,this.fieldTransforms=i}toMutation(t,e){return new wn(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function wb(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw q()}}class Vd{constructor(t,e,i,s,r,a){this.settings=t,this.databaseId=e,this.serializer=i,this.ignoreUndefinedProperties=s,r===void 0&&this.vu(),this.fieldTransforms=r||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(t){return new Vd(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(t){var e;const i=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Fu({path:i,xu:!1});return s.Ou(t),s}Nu(t){var e;const i=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Fu({path:i,xu:!1});return s.vu(),s}Lu(t){return this.Fu({path:void 0,xu:!0})}Bu(t){return Jo(t,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}vu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Ou(this.path.get(t))}Ou(t){if(t.length===0)throw this.Bu("Document fields must not be empty");if(wb(this.Cu)&&LA.test(t))throw this.Bu('Document fields cannot begin and end with "__"')}}class BA{constructor(t,e,i){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=i||xl(t)}Qu(t,e,i,s=!1){return new Vd({Cu:t,methodName:e,qu:i,path:Pt.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Fs(n){const t=n._freezeSettings(),e=xl(n._databaseId);return new BA(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Rl(n,t,e,i,s,r={}){const a=n.Qu(r.merge||r.mergeFields?2:0,t,e,s);Bd("Data must be an object, but it was:",a,i);const o=Ib(i,a);let l,c;if(r.merge)l=new me(a.fieldMask),c=a.fieldTransforms;else if(r.mergeFields){const d=[];for(const h of r.mergeFields){const f=wu(t,h,e);if(!a.contains(f))throw new B(L.INVALID_ARGUMENT,`Field '${f}' is specified in your field mask but missing from your input data.`);Eb(d,f)||d.push(f)}l=new me(d),c=a.fieldTransforms.filter(h=>l.covers(h.field))}else l=null,c=a.fieldTransforms;return new FA(new Qt(o),l,c)}class Cl extends Pl{_toFieldTransform(t){if(t.Cu!==2)throw t.Cu===1?t.Bu(`${this._methodName}() can only appear at the top level of your update data`):t.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Cl}}class Nd extends Pl{_toFieldTransform(t){return new v_(t.path,new Is)}isEqual(t){return t instanceof Nd}}function Ld(n,t,e,i){const s=n.Qu(1,t,e);Bd("Data must be an object, but it was:",s,i);const r=[],a=Qt.empty();$i(i,(l,c)=>{const d=Ud(t,l,e);c=yt(c);const h=s.Nu(d);if(c instanceof Cl)r.push(d);else{const f=_a(c,h);f!=null&&(r.push(d),a.set(d,f))}});const o=new me(r);return new vb(a,o,s.fieldTransforms)}function Fd(n,t,e,i,s,r){const a=n.Qu(1,t,e),o=[wu(t,i,e)],l=[s];if(r.length%2!=0)throw new B(L.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let f=0;f<r.length;f+=2)o.push(wu(t,r[f])),l.push(r[f+1]);const c=[],d=Qt.empty();for(let f=o.length-1;f>=0;--f)if(!Eb(c,o[f])){const g=o[f];let y=l[f];y=yt(y);const v=a.Nu(g);if(y instanceof Cl)c.push(g);else{const w=_a(y,v);w!=null&&(c.push(g),d.set(g,w))}}const h=new me(c);return new vb(d,h,a.fieldTransforms)}function UA(n,t,e,i=!1){return _a(e,n.Qu(i?4:3,t))}function _a(n,t){if(Tb(n=yt(n)))return Bd("Unsupported field value:",t,n),Ib(n,t);if(n instanceof Pl)return function(i,s){if(!wb(s.Cu))throw s.Bu(`${i._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${i._methodName}() is not currently supported inside arrays`);const r=i._toFieldTransform(s);r&&s.fieldTransforms.push(r)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.xu&&t.Cu!==4)throw t.Bu("Nested arrays are not supported");return function(i,s){const r=[];let a=0;for(const o of i){let l=_a(o,s.Lu(a));l==null&&(l={nullValue:"NULL_VALUE"}),r.push(l),a++}return{arrayValue:{values:r}}}(n,t)}return function(i,s){if((i=yt(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return Sx(s.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const r=Rt.fromDate(i);return{timestampValue:xs(s.serializer,r)}}if(i instanceof Rt){const r=new Rt(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:xs(s.serializer,r)}}if(i instanceof Md)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof Di)return{bytesValue:A_(s.serializer,i._byteString)};if(i instanceof Xt){const r=s.databaseId,a=i.firestore._databaseId;if(!a.isEqual(r))throw s.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:fd(i.firestore._databaseId||s.databaseId,i._key.path)}}if(i instanceof Od)return function(a,o){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(l=>{if(typeof l!="number")throw o.Bu("VectorValues must only contain numeric values.");return od(o.serializer,l)})}}}}}}(i,s);throw s.Bu(`Unsupported field value: ${Al(i)}`)}(n,t)}function Ib(n,t){const e={};return Jy(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):$i(n,(i,s)=>{const r=_a(s,t.Mu(i));r!=null&&(e[i]=r)}),{mapValue:{fields:e}}}function Tb(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Rt||n instanceof Md||n instanceof Di||n instanceof Xt||n instanceof Pl||n instanceof Od)}function Bd(n,t,e){if(!Tb(e)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(e)){const i=Al(e);throw i==="an object"?t.Bu(n+" a custom object"):t.Bu(n+" "+i)}}function wu(n,t,e){if((t=yt(t))instanceof Ls)return t._internalPath;if(typeof t=="string")return Ud(n,t);throw Jo("Field path arguments must be of type string or ",n,!1,void 0,e)}const jA=new RegExp("[~\\*/\\[\\]]");function Ud(n,t,e){if(t.search(jA)>=0)throw Jo(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Ls(...t.split("."))._internalPath}catch{throw Jo(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Jo(n,t,e,i,s){const r=i&&!i.isEmpty(),a=s!==void 0;let o=`Function ${t}() called with invalid data`;e&&(o+=" (via `toFirestore()`)"),o+=". ";let l="";return(r||a)&&(l+=" (found",r&&(l+=` in field ${i}`),a&&(l+=` in document ${s}`),l+=")"),new B(L.INVALID_ARGUMENT,o+n+l)}function Eb(n,t){return n.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo{constructor(t,e,i,s,r){this._firestore=t,this._userDataWriter=e,this._key=i,this._document=s,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new Xt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new zA(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Dl("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class zA extends Xo{data(){return super.data()}}function Dl(n,t){return typeof t=="string"?Ud(n,t):t instanceof Ls?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xb(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new B(L.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class jd{}class zd extends jd{}function Lt(n,t,...e){let i=[];t instanceof jd&&i.push(t),i=i.concat(e),function(r){const a=r.filter(l=>l instanceof $d).length,o=r.filter(l=>l instanceof Ml).length;if(a>1||a>0&&o>0)throw new B(L.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(i);for(const s of i)n=s._apply(n);return n}class Ml extends zd{constructor(t,e,i){super(),this._field=t,this._op=e,this._value=i,this.type="where"}static _create(t,e,i){return new Ml(t,e,i)}_apply(t){const e=this._parse(t);return kb(t._query,e),new In(t.firestore,t.converter,uu(t._query,e))}_parse(t){const e=Fs(t.firestore);return function(r,a,o,l,c,d,h){let f;if(c.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new B(L.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){ng(h,d);const g=[];for(const y of h)g.push(eg(l,r,y));f={arrayValue:{values:g}}}else f=eg(l,r,h)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||ng(h,d),f=UA(o,a,h,d==="in"||d==="not-in");return rt.create(c,d,f)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function Oe(n,t,e){const i=t,s=Dl("where",n);return Ml._create(s,i,e)}class $d extends jd{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new $d(t,e)}_parse(t){const e=this._queryConstraints.map(i=>i._parse(t)).filter(i=>i.getFilters().length>0);return e.length===1?e[0]:gt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(s,r){let a=s;const o=r.getFlattenedFilters();for(const l of o)kb(a,l),a=uu(a,l)}(t._query,e),new In(t.firestore,t.converter,uu(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Hd extends zd{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new Hd(t,e)}_apply(t){const e=function(s,r,a){if(s.startAt!==null)throw new B(L.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new B(L.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new $r(r,a)}(t._query,this._field,this._direction);return new In(t.firestore,t.converter,function(s,r){const a=s.explicitOrderBy.concat([r]);return new Ds(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(t._query,e))}}function Ye(n,t="asc"){const e=t,i=Dl("orderBy",n);return Hd._create(i,e)}class qd extends zd{constructor(t,e,i){super(),this.type=t,this._limit=e,this._limitType=i}static _create(t,e,i){return new qd(t,e,i)}_apply(t){return new In(t.firestore,t.converter,Ho(t._query,this._limit,this._limitType))}}function $A(n){return qd._create("limit",n,"F")}function eg(n,t,e){if(typeof(e=yt(e))=="string"){if(e==="")throw new B(L.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!c_(t)&&e.indexOf("/")!==-1)throw new B(L.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const i=t.path.child(dt.fromString(e));if(!z.isDocumentKey(i))throw new B(L.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${i}' is not because it has an odd number of segments (${i.length}).`);return jr(n,new z(i))}if(e instanceof Xt)return jr(n,e._key);throw new B(L.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Al(e)}.`)}function ng(n,t){if(!Array.isArray(n)||n.length===0)throw new B(L.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function kb(n,t){const e=function(s,r){for(const a of s)for(const o of a.getFlattenedFilters())if(r.indexOf(o.op)>=0)return o.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new B(L.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new B(L.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class Ab{convertValue(t,e="none"){switch(Ai(t)){case 0:return null;case 1:return t.booleanValue;case 2:return Tt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(qn(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw q()}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const i={};return $i(t,(s,r)=>{i[s]=this.convertValue(r,e)}),i}convertVectorValue(t){var e,i,s;const r=(s=(i=(e=t.fields)===null||e===void 0?void 0:e.value.arrayValue)===null||i===void 0?void 0:i.values)===null||s===void 0?void 0:s.map(a=>Tt(a.doubleValue));return new Od(r)}convertGeoPoint(t){return new Md(Tt(t.latitude),Tt(t.longitude))}convertArray(t,e){return(t.values||[]).map(i=>this.convertValue(i,e))}convertServerTimestamp(t,e){switch(e){case"previous":const i=rd(t);return i==null?null:this.convertValue(i,e);case"estimate":return this.convertTimestamp(Br(t));default:return null}}convertTimestamp(t){const e=bn(t);return new Rt(e.seconds,e.nanos)}convertDocumentKey(t,e){const i=dt.fromString(t);W(L_(i));const s=new ki(i.get(1),i.get(3)),r=new z(i.popFirst(5));return s.isEqual(e)||ue(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ol(n,t,e){let i;return i=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,i}class HA extends Ab{constructor(t){super(),this.firestore=t}convertBytes(t){return new Di(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Xt(this.firestore,null,e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Wd extends Xo{constructor(t,e,i,s,r,a){super(t,e,i,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=r}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Io(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const i=this._document.data.field(Dl("DocumentSnapshot.get",t));if(i!==null)return this._userDataWriter.convertValue(i,e.serverTimestamps)}}}class Io extends Wd{data(t={}){return super.data(t)}}class Sb{constructor(t,e,i,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new cs(s.hasPendingWrites,s.fromCache),this.query=i}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(i=>{t.call(e,new Io(this._firestore,this._userDataWriter,i.key,i,new cs(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new B(L.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,r){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(o=>{const l=new Io(s._firestore,s._userDataWriter,o.doc.key,o.doc,new cs(s._snapshot.mutatedKeys.has(o.doc.key),s._snapshot.fromCache),s.query.converter);return o.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(o=>r||o.type!==3).map(o=>{const l=new Io(s._firestore,s._userDataWriter,o.doc.key,o.doc,new cs(s._snapshot.mutatedKeys.has(o.doc.key),s._snapshot.fromCache),s.query.converter);let c=-1,d=-1;return o.type!==0&&(c=a.indexOf(o.doc.key),a=a.delete(o.doc.key)),o.type!==1&&(a=a.add(o.doc),d=a.indexOf(o.doc.key)),{type:qA(o.type),doc:l,oldIndex:c,newIndex:d}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function qA(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return q()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ba(n){n=Jt(n,Xt);const t=Jt(n.firestore,Se);return RA(Ns(t),n._key).then(e=>Pb(t,n,e))}class Vl extends Ab{constructor(t){super(),this.firestore=t}convertBytes(t){return new Di(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Xt(this.firestore,null,e)}}function Ot(n){n=Jt(n,In);const t=Jt(n.firestore,Se),e=Ns(t),i=new Vl(t);return xb(n._query),CA(e,n._query).then(s=>new Sb(t,i,n,s))}function Ar(n,t,e){n=Jt(n,Xt);const i=Jt(n.firestore,Se),s=Ol(n.converter,t,e);return va(i,[Rl(Fs(i),"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,xt.none())])}function ps(n,t,e,...i){n=Jt(n,Xt);const s=Jt(n.firestore,Se),r=Fs(s);let a;return a=typeof(t=yt(t))=="string"||t instanceof Ls?Fd(r,"updateDoc",n._key,t,e,i):Ld(r,"updateDoc",n._key,t),va(s,[a.toMutation(n._key,xt.exists(!0))])}function un(n){return va(Jt(n.firestore,Se),[new Os(n._key,xt.none())])}function Bs(n,t){const e=Jt(n.firestore,Se),i=ct(n),s=Ol(n.converter,t);return va(e,[Rl(Fs(n.firestore),"addDoc",i._key,s,n.converter!==null,{}).toMutation(i._key,xt.exists(!1))]).then(()=>i)}function Gr(n,...t){var e,i,s;n=yt(n);let r={includeMetadataChanges:!1,source:"default"},a=0;typeof t[a]!="object"||tg(t[a])||(r=t[a],a++);const o={includeMetadataChanges:r.includeMetadataChanges,source:r.source};if(tg(t[a])){const h=t[a];t[a]=(e=h.next)===null||e===void 0?void 0:e.bind(h),t[a+1]=(i=h.error)===null||i===void 0?void 0:i.bind(h),t[a+2]=(s=h.complete)===null||s===void 0?void 0:s.bind(h)}let l,c,d;if(n instanceof Xt)c=Jt(n.firestore,Se),d=ha(n._key.path),l={next:h=>{t[a]&&t[a](Pb(c,n,h))},error:t[a+1],complete:t[a+2]};else{const h=Jt(n,In);c=Jt(h.firestore,Se),d=h._query;const f=new Vl(c);l={next:g=>{t[a]&&t[a](new Sb(c,f,h,g))},error:t[a+1],complete:t[a+2]},xb(n._query)}return function(f,g,y,v){const w=new Cd(v),A=new Pd(g,w,y);return f.asyncQueue.enqueueAndForget(async()=>kd(await Qo(f),A)),()=>{w.Za(),f.asyncQueue.enqueueAndForget(async()=>Ad(await Qo(f),A))}}(Ns(c),d,o,l)}function va(n,t){return function(i,s){const r=new Me;return i.asyncQueue.enqueueAndForget(async()=>mA(await SA(i),s,r)),r.promise}(Ns(n),t)}function Pb(n,t,e){const i=e.docs.get(t._key),s=new Vl(n);return new Wd(n,s,t._key,i,new cs(e.hasPendingWrites,e.fromCache),t.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WA={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KA{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=Fs(t)}set(t,e,i){this._verifyNotCommitted();const s=On(t,this._firestore),r=Ol(s.converter,e,i),a=Rl(this._dataReader,"WriteBatch.set",s._key,r,s.converter!==null,i);return this._mutations.push(a.toMutation(s._key,xt.none())),this}update(t,e,i,...s){this._verifyNotCommitted();const r=On(t,this._firestore);let a;return a=typeof(e=yt(e))=="string"||e instanceof Ls?Fd(this._dataReader,"WriteBatch.update",r._key,e,i,s):Ld(this._dataReader,"WriteBatch.update",r._key,e),this._mutations.push(a.toMutation(r._key,xt.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=On(t,this._firestore);return this._mutations=this._mutations.concat(new Os(e._key,xt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new B(L.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function On(n,t){if((n=yt(n)).firestore!==t)throw new B(L.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GA extends class{constructor(e,i){this._firestore=e,this._transaction=i,this._dataReader=Fs(e)}get(e){const i=On(e,this._firestore),s=new HA(this._firestore);return this._transaction.lookup([i._key]).then(r=>{if(!r||r.length!==1)return q();const a=r[0];if(a.isFoundDocument())return new Xo(this._firestore,s,a.key,a,i.converter);if(a.isNoDocument())return new Xo(this._firestore,s,i._key,null,i.converter);throw q()})}set(e,i,s){const r=On(e,this._firestore),a=Ol(r.converter,i,s),o=Rl(this._dataReader,"Transaction.set",r._key,a,r.converter!==null,s);return this._transaction.set(r._key,o),this}update(e,i,s,...r){const a=On(e,this._firestore);let o;return o=typeof(i=yt(i))=="string"||i instanceof Ls?Fd(this._dataReader,"Transaction.update",a._key,i,s,r):Ld(this._dataReader,"Transaction.update",a._key,i),this._transaction.update(a._key,o),this}delete(e){const i=On(e,this._firestore);return this._transaction.delete(i._key),this}}{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=On(t,this._firestore),i=new Vl(this._firestore);return super.get(t).then(s=>new Wd(this._firestore,i,e._key,s._document,new cs(!1,!1),e.converter))}}function Rb(n,t,e){n=Jt(n,Se);const i=Object.assign(Object.assign({},WA),e);return function(r){if(r.maxAttempts<1)throw new B(L.INVALID_ARGUMENT,"Max attempts must be at least 1")}(i),function(r,a,o){const l=new Me;return r.asyncQueue.enqueueAndForget(async()=>{const c=await PA(r);new xA(r.asyncQueue,c,o,a,l).au()}),l.promise}(Ns(n),s=>t(new GA(n,s)),i)}function Ut(){return new Nd("serverTimestamp")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cb(n){return Ns(n=Jt(n,Se)),new KA(n,t=>va(n,t))}(function(t,e=!0){(function(s){Cs=s})(Rs),Ne(new Ae("firestore",(i,{instanceIdentifier:s,options:r})=>{const a=i.getProvider("app").getImmediate(),o=new Se(new PE(i.getProvider("auth-internal")),new ME(i.getProvider("app-check-internal")),function(c,d){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new B(L.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ki(c.options.projectId,d)}(a,s),a);return r=Object.assign({useFetchStreams:e},r),o._setSettings(r),o},"PUBLIC").setMultipleInstances(!0)),ye(Gf,"4.7.3",t),ye(Gf,"4.7.3","esm2017")})();const Db="@firebase/installations",Kd="0.6.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mb=1e4,Ob=`w:${Kd}`,Vb="FIS_v2",YA="https://firebaseinstallations.googleapis.com/v1",QA=60*60*1e3,JA="installations",XA="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZA={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Mi=new Fi(JA,XA,ZA);function Nb(n){return n instanceof Be&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lb({projectId:n}){return`${YA}/projects/${n}/installations`}function Fb(n){return{token:n.token,requestStatus:2,expiresIn:eS(n.expiresIn),creationTime:Date.now()}}async function Bb(n,t){const i=(await t.json()).error;return Mi.create("request-failed",{requestName:n,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function Ub({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function tS(n,{refreshToken:t}){const e=Ub(n);return e.append("Authorization",nS(t)),e}async function jb(n){const t=await n();return t.status>=500&&t.status<600?n():t}function eS(n){return Number(n.replace("s","000"))}function nS(n){return`${Vb} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iS({appConfig:n,heartbeatServiceProvider:t},{fid:e}){const i=Lb(n),s=Ub(n),r=t.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const a={fid:e,authVersion:Vb,appId:n.appId,sdkVersion:Ob},o={method:"POST",headers:s,body:JSON.stringify(a)},l=await jb(()=>fetch(i,o));if(l.ok){const c=await l.json();return{fid:c.fid||e,registrationStatus:2,refreshToken:c.refreshToken,authToken:Fb(c.authToken)}}else throw await Bb("Create Installation",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zb(n){return new Promise(t=>{setTimeout(t,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sS(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rS=/^[cdef][\w-]{21}$/,Iu="";function aS(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const e=oS(n);return rS.test(e)?e:Iu}catch{return Iu}}function oS(n){return sS(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nl(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $b=new Map;function Hb(n,t){const e=Nl(n);qb(e,t),lS(e,t)}function qb(n,t){const e=$b.get(n);if(e)for(const i of e)i(t)}function lS(n,t){const e=cS();e&&e.postMessage({key:n,fid:t}),uS()}let yi=null;function cS(){return!yi&&"BroadcastChannel"in self&&(yi=new BroadcastChannel("[Firebase] FID Change"),yi.onmessage=n=>{qb(n.data.key,n.data.fid)}),yi}function uS(){$b.size===0&&yi&&(yi.close(),yi=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dS="firebase-installations-database",hS=1,Oi="firebase-installations-store";let Ac=null;function Gd(){return Ac||(Ac=dl(dS,hS,{upgrade:(n,t)=>{switch(t){case 0:n.createObjectStore(Oi)}}})),Ac}async function Zo(n,t){const e=Nl(n),s=(await Gd()).transaction(Oi,"readwrite"),r=s.objectStore(Oi),a=await r.get(e);return await r.put(t,e),await s.done,(!a||a.fid!==t.fid)&&Hb(n,t.fid),t}async function Wb(n){const t=Nl(n),i=(await Gd()).transaction(Oi,"readwrite");await i.objectStore(Oi).delete(t),await i.done}async function Ll(n,t){const e=Nl(n),s=(await Gd()).transaction(Oi,"readwrite"),r=s.objectStore(Oi),a=await r.get(e),o=t(a);return o===void 0?await r.delete(e):await r.put(o,e),await s.done,o&&(!a||a.fid!==o.fid)&&Hb(n,o.fid),o}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yd(n){let t;const e=await Ll(n.appConfig,i=>{const s=fS(i),r=pS(n,s);return t=r.registrationPromise,r.installationEntry});return e.fid===Iu?{installationEntry:await t}:{installationEntry:e,registrationPromise:t}}function fS(n){const t=n||{fid:aS(),registrationStatus:0};return Kb(t)}function pS(n,t){if(t.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Mi.create("app-offline"));return{installationEntry:t,registrationPromise:s}}const e={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},i=gS(n,e);return{installationEntry:e,registrationPromise:i}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:mS(n)}:{installationEntry:t}}async function gS(n,t){try{const e=await iS(n,t);return Zo(n.appConfig,e)}catch(e){throw Nb(e)&&e.customData.serverCode===409?await Wb(n.appConfig):await Zo(n.appConfig,{fid:t.fid,registrationStatus:0}),e}}async function mS(n){let t=await ig(n.appConfig);for(;t.registrationStatus===1;)await zb(100),t=await ig(n.appConfig);if(t.registrationStatus===0){const{installationEntry:e,registrationPromise:i}=await Yd(n);return i||e}return t}function ig(n){return Ll(n,t=>{if(!t)throw Mi.create("installation-not-found");return Kb(t)})}function Kb(n){return yS(n)?{fid:n.fid,registrationStatus:0}:n}function yS(n){return n.registrationStatus===1&&n.registrationTime+Mb<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _S({appConfig:n,heartbeatServiceProvider:t},e){const i=bS(n,e),s=tS(n,e),r=t.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const a={installation:{sdkVersion:Ob,appId:n.appId}},o={method:"POST",headers:s,body:JSON.stringify(a)},l=await jb(()=>fetch(i,o));if(l.ok){const c=await l.json();return Fb(c)}else throw await Bb("Generate Auth Token",l)}function bS(n,{fid:t}){return`${Lb(n)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qd(n,t=!1){let e;const i=await Ll(n.appConfig,r=>{if(!Gb(r))throw Mi.create("not-registered");const a=r.authToken;if(!t&&IS(a))return r;if(a.requestStatus===1)return e=vS(n,t),r;{if(!navigator.onLine)throw Mi.create("app-offline");const o=ES(r);return e=wS(n,o),o}});return e?await e:i.authToken}async function vS(n,t){let e=await sg(n.appConfig);for(;e.authToken.requestStatus===1;)await zb(100),e=await sg(n.appConfig);const i=e.authToken;return i.requestStatus===0?Qd(n,t):i}function sg(n){return Ll(n,t=>{if(!Gb(t))throw Mi.create("not-registered");const e=t.authToken;return xS(e)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t})}async function wS(n,t){try{const e=await _S(n,t),i=Object.assign(Object.assign({},t),{authToken:e});return await Zo(n.appConfig,i),e}catch(e){if(Nb(e)&&(e.customData.serverCode===401||e.customData.serverCode===404))await Wb(n.appConfig);else{const i=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await Zo(n.appConfig,i)}throw e}}function Gb(n){return n!==void 0&&n.registrationStatus===2}function IS(n){return n.requestStatus===2&&!TS(n)}function TS(n){const t=Date.now();return t<n.creationTime||n.creationTime+n.expiresIn<t+QA}function ES(n){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},n),{authToken:t})}function xS(n){return n.requestStatus===1&&n.requestTime+Mb<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kS(n){const t=n,{installationEntry:e,registrationPromise:i}=await Yd(t);return i?i.catch(console.error):Qd(t).catch(console.error),e.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AS(n,t=!1){const e=n;return await SS(e),(await Qd(e,t)).token}async function SS(n){const{registrationPromise:t}=await Yd(n);t&&await t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PS(n){if(!n||!n.options)throw Sc("App Configuration");if(!n.name)throw Sc("App Name");const t=["projectId","apiKey","appId"];for(const e of t)if(!n.options[e])throw Sc(e);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Sc(n){return Mi.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yb="installations",RS="installations-internal",CS=n=>{const t=n.getProvider("app").getImmediate(),e=PS(t),i=Bi(t,"heartbeat");return{app:t,appConfig:e,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},DS=n=>{const t=n.getProvider("app").getImmediate(),e=Bi(t,Yb).getImmediate();return{getId:()=>kS(e),getToken:s=>AS(e,s)}};function MS(){Ne(new Ae(Yb,CS,"PUBLIC")),Ne(new Ae(RS,DS,"PRIVATE"))}MS();ye(Db,Kd);ye(Db,Kd,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OS="/firebase-messaging-sw.js",VS="/firebase-cloud-messaging-push-scope",Qb="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",NS="https://fcmregistrations.googleapis.com/v1",Jb="google.c.a.c_id",LS="google.c.a.c_l",FS="google.c.a.ts",BS="google.c.a.e";var rg;(function(n){n[n.DATA_MESSAGE=1]="DATA_MESSAGE",n[n.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(rg||(rg={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var Yr;(function(n){n.PUSH_RECEIVED="push-received",n.NOTIFICATION_CLICKED="notification-clicked"})(Yr||(Yr={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sn(n){const t=new Uint8Array(n);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function US(n){const t="=".repeat((4-n.length%4)%4),e=(n+t).replace(/\-/g,"+").replace(/_/g,"/"),i=atob(e),s=new Uint8Array(i.length);for(let r=0;r<i.length;++r)s[r]=i.charCodeAt(r);return s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pc="fcm_token_details_db",jS=5,ag="fcm_token_object_Store";async function zS(n){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(Pc))return null;let t=null;return(await dl(Pc,jS,{upgrade:async(i,s,r,a)=>{var o;if(s<2||!i.objectStoreNames.contains(ag))return;const l=a.objectStore(ag),c=await l.index("fcmSenderId").get(n);if(await l.clear(),!!c){if(s===2){const d=c;if(!d.auth||!d.p256dh||!d.endpoint)return;t={token:d.fcmToken,createTime:(o=d.createTime)!==null&&o!==void 0?o:Date.now(),subscriptionOptions:{auth:d.auth,p256dh:d.p256dh,endpoint:d.endpoint,swScope:d.swScope,vapidKey:typeof d.vapidKey=="string"?d.vapidKey:sn(d.vapidKey)}}}else if(s===3){const d=c;t={token:d.fcmToken,createTime:d.createTime,subscriptionOptions:{auth:sn(d.auth),p256dh:sn(d.p256dh),endpoint:d.endpoint,swScope:d.swScope,vapidKey:sn(d.vapidKey)}}}else if(s===4){const d=c;t={token:d.fcmToken,createTime:d.createTime,subscriptionOptions:{auth:sn(d.auth),p256dh:sn(d.p256dh),endpoint:d.endpoint,swScope:d.swScope,vapidKey:sn(d.vapidKey)}}}}}})).close(),await _c(Pc),await _c("fcm_vapid_details_db"),await _c("undefined"),$S(t)?t:null}function $S(n){if(!n||!n.subscriptionOptions)return!1;const{subscriptionOptions:t}=n;return typeof n.createTime=="number"&&n.createTime>0&&typeof n.token=="string"&&n.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HS="firebase-messaging-database",qS=1,Qr="firebase-messaging-store";let Rc=null;function Xb(){return Rc||(Rc=dl(HS,qS,{upgrade:(n,t)=>{switch(t){case 0:n.createObjectStore(Qr)}}})),Rc}async function WS(n){const t=Zb(n),i=await(await Xb()).transaction(Qr).objectStore(Qr).get(t);if(i)return i;{const s=await zS(n.appConfig.senderId);if(s)return await Jd(n,s),s}}async function Jd(n,t){const e=Zb(n),s=(await Xb()).transaction(Qr,"readwrite");return await s.objectStore(Qr).put(t,e),await s.done,t}function Zb({appConfig:n}){return n.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KS={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},he=new Fi("messaging","Messaging",KS);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function GS(n,t){const e=await Zd(n),i=tv(t),s={method:"POST",headers:e,body:JSON.stringify(i)};let r;try{r=await(await fetch(Xd(n.appConfig),s)).json()}catch(a){throw he.create("token-subscribe-failed",{errorInfo:a==null?void 0:a.toString()})}if(r.error){const a=r.error.message;throw he.create("token-subscribe-failed",{errorInfo:a})}if(!r.token)throw he.create("token-subscribe-no-token");return r.token}async function YS(n,t){const e=await Zd(n),i=tv(t.subscriptionOptions),s={method:"PATCH",headers:e,body:JSON.stringify(i)};let r;try{r=await(await fetch(`${Xd(n.appConfig)}/${t.token}`,s)).json()}catch(a){throw he.create("token-update-failed",{errorInfo:a==null?void 0:a.toString()})}if(r.error){const a=r.error.message;throw he.create("token-update-failed",{errorInfo:a})}if(!r.token)throw he.create("token-update-no-token");return r.token}async function QS(n,t){const i={method:"DELETE",headers:await Zd(n)};try{const r=await(await fetch(`${Xd(n.appConfig)}/${t}`,i)).json();if(r.error){const a=r.error.message;throw he.create("token-unsubscribe-failed",{errorInfo:a})}}catch(s){throw he.create("token-unsubscribe-failed",{errorInfo:s==null?void 0:s.toString()})}}function Xd({projectId:n}){return`${NS}/projects/${n}/registrations`}async function Zd({appConfig:n,installations:t}){const e=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n.apiKey,"x-goog-firebase-installations-auth":`FIS ${e}`})}function tv({p256dh:n,auth:t,endpoint:e,vapidKey:i}){const s={web:{endpoint:e,auth:t,p256dh:n}};return i!==Qb&&(s.web.applicationPubKey=i),s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JS=7*24*60*60*1e3;async function XS(n){const t=await tP(n.swRegistration,n.vapidKey),e={vapidKey:n.vapidKey,swScope:n.swRegistration.scope,endpoint:t.endpoint,auth:sn(t.getKey("auth")),p256dh:sn(t.getKey("p256dh"))},i=await WS(n.firebaseDependencies);if(i){if(eP(i.subscriptionOptions,e))return Date.now()>=i.createTime+JS?ZS(n,{token:i.token,createTime:Date.now(),subscriptionOptions:e}):i.token;try{await QS(n.firebaseDependencies,i.token)}catch(s){console.warn(s)}return og(n.firebaseDependencies,e)}else return og(n.firebaseDependencies,e)}async function ZS(n,t){try{const e=await YS(n.firebaseDependencies,t),i=Object.assign(Object.assign({},t),{token:e,createTime:Date.now()});return await Jd(n.firebaseDependencies,i),e}catch(e){throw e}}async function og(n,t){const i={token:await GS(n,t),createTime:Date.now(),subscriptionOptions:t};return await Jd(n,i),i.token}async function tP(n,t){const e=await n.pushManager.getSubscription();return e||n.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:US(t)})}function eP(n,t){const e=t.vapidKey===n.vapidKey,i=t.endpoint===n.endpoint,s=t.auth===n.auth,r=t.p256dh===n.p256dh;return e&&i&&s&&r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lg(n){const t={from:n.from,collapseKey:n.collapse_key,messageId:n.fcmMessageId};return nP(t,n),iP(t,n),sP(t,n),t}function nP(n,t){if(!t.notification)return;n.notification={};const e=t.notification.title;e&&(n.notification.title=e);const i=t.notification.body;i&&(n.notification.body=i);const s=t.notification.image;s&&(n.notification.image=s);const r=t.notification.icon;r&&(n.notification.icon=r)}function iP(n,t){t.data&&(n.data=t.data)}function sP(n,t){var e,i,s,r,a;if(!t.fcmOptions&&!(!((e=t.notification)===null||e===void 0)&&e.click_action))return;n.fcmOptions={};const o=(s=(i=t.fcmOptions)===null||i===void 0?void 0:i.link)!==null&&s!==void 0?s:(r=t.notification)===null||r===void 0?void 0:r.click_action;o&&(n.fcmOptions.link=o);const l=(a=t.fcmOptions)===null||a===void 0?void 0:a.analytics_label;l&&(n.fcmOptions.analyticsLabel=l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rP(n){return typeof n=="object"&&!!n&&Jb in n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aP(n){if(!n||!n.options)throw Cc("App Configuration Object");if(!n.name)throw Cc("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:e}=n;for(const i of t)if(!e[i])throw Cc(i);return{appName:n.name,projectId:e.projectId,apiKey:e.apiKey,appId:e.appId,senderId:e.messagingSenderId}}function Cc(n){return he.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oP{constructor(t,e,i){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=aP(t);this.firebaseDependencies={app:t,appConfig:s,installations:e,analyticsProvider:i}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lP(n){try{n.swRegistration=await navigator.serviceWorker.register(OS,{scope:VS}),n.swRegistration.update().catch(()=>{})}catch(t){throw he.create("failed-service-worker-registration",{browserErrorMessage:t==null?void 0:t.message})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cP(n,t){if(!t&&!n.swRegistration&&await lP(n),!(!t&&n.swRegistration)){if(!(t instanceof ServiceWorkerRegistration))throw he.create("invalid-sw-registration");n.swRegistration=t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uP(n,t){t?n.vapidKey=t:n.vapidKey||(n.vapidKey=Qb)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dP(n,t){if(!navigator)throw he.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw he.create("permission-blocked");return await uP(n,t==null?void 0:t.vapidKey),await cP(n,t==null?void 0:t.serviceWorkerRegistration),XS(n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hP(n,t,e){const i=fP(t);(await n.firebaseDependencies.analyticsProvider.get()).logEvent(i,{message_id:e[Jb],message_name:e[LS],message_time:e[FS],message_device_time:Math.floor(Date.now()/1e3)})}function fP(n){switch(n){case Yr.NOTIFICATION_CLICKED:return"notification_open";case Yr.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pP(n,t){const e=t.data;if(!e.isFirebaseMessaging)return;n.onMessageHandler&&e.messageType===Yr.PUSH_RECEIVED&&(typeof n.onMessageHandler=="function"?n.onMessageHandler(lg(e)):n.onMessageHandler.next(lg(e)));const i=e.data;rP(i)&&i[BS]==="1"&&await hP(n,e.messageType,i)}const cg="@firebase/messaging",ug="0.12.12";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gP=n=>{const t=new oP(n.getProvider("app").getImmediate(),n.getProvider("installations-internal").getImmediate(),n.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",e=>pP(t,e)),t},mP=n=>{const t=n.getProvider("messaging").getImmediate();return{getToken:i=>dP(t,i)}};function yP(){Ne(new Ae("messaging",gP,"PUBLIC")),Ne(new Ae("messaging-internal",mP,"PRIVATE")),ye(cg,ug),ye(cg,ug,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _P(){try{await Wm()}catch{return!1}return typeof window<"u"&&ju()&&Jw()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bP(n=hl()){return _P().then(t=>{if(!t)throw he.create("unsupported-browser")},t=>{throw he.create("indexed-db-unsupported")}),Bi(yt(n),"messaging").getImmediate()}yP();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vP="type.googleapis.com/google.protobuf.Int64Value",wP="type.googleapis.com/google.protobuf.UInt64Value";function ev(n,t){const e={};for(const i in n)n.hasOwnProperty(i)&&(e[i]=t(n[i]));return e}function Tu(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(t=>Tu(t));if(typeof n=="function"||typeof n=="object")return ev(n,t=>Tu(t));throw new Error("Data cannot be encoded in JSON: "+n)}function tl(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case vP:case wP:{const t=Number(n.value);if(isNaN(t))throw new Error("Data cannot be decoded from JSON: "+n);return t}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(t=>tl(t)):typeof n=="function"||typeof n=="object"?ev(n,t=>tl(t)):n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const th="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dg={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class gs extends Be{constructor(t,e,i){super(`${th}/${t}`,e||""),this.details=i}}function IP(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function TP(n,t){let e=IP(n),i=e,s;try{const r=t&&t.error;if(r){const a=r.status;if(typeof a=="string"){if(!dg[a])return new gs("internal","internal");e=dg[a],i=a}const o=r.message;typeof o=="string"&&(i=o),s=r.details,s!==void 0&&(s=tl(s))}}catch{}return e==="ok"?null:new gs(e,i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EP{constructor(t,e,i){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=t.getImmediate({optional:!0}),this.messaging=e.getImmediate({optional:!0}),this.auth||t.get().then(s=>this.auth=s,()=>{}),this.messaging||e.get().then(s=>this.messaging=s,()=>{}),this.appCheck||i.get().then(s=>this.appCheck=s,()=>{})}async getAuthToken(){if(this.auth)try{const t=await this.auth.getToken();return t==null?void 0:t.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(t){if(this.appCheck){const e=t?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return e.error?null:e.token}return null}async getContext(t){const e=await this.getAuthToken(),i=await this.getMessagingToken(),s=await this.getAppCheckToken(t);return{authToken:e,messagingToken:i,appCheckToken:s}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eu="us-central1";function xP(n){let t=null;return{promise:new Promise((e,i)=>{t=setTimeout(()=>{i(new gs("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{t&&clearTimeout(t)}}}class kP{constructor(t,e,i,s,r=Eu,a){this.app=t,this.fetchImpl=a,this.emulatorOrigin=null,this.contextProvider=new EP(e,i,s),this.cancelAllRequests=new Promise(o=>{this.deleteService=()=>Promise.resolve(o())});try{const o=new URL(r);this.customDomain=o.origin+(o.pathname==="/"?"":o.pathname),this.region=Eu}catch{this.customDomain=null,this.region=r}}_delete(){return this.deleteService()}_url(t){const e=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${e}/${this.region}/${t}`:this.customDomain!==null?`${this.customDomain}/${t}`:`https://${this.region}-${e}.cloudfunctions.net/${t}`}}function AP(n,t,e){n.emulatorOrigin=`http://${t}:${e}`}function SP(n,t,e){return i=>RP(n,t,i,{})}async function PP(n,t,e,i){e["Content-Type"]="application/json";let s;try{s=await i(n,{method:"POST",body:JSON.stringify(t),headers:e})}catch{return{status:0,json:null}}let r=null;try{r=await s.json()}catch{}return{status:s.status,json:r}}function RP(n,t,e,i){const s=n._url(t);return CP(n,s,e,i)}async function CP(n,t,e,i){e=Tu(e);const s={data:e},r={},a=await n.contextProvider.getContext(i.limitedUseAppCheckTokens);a.authToken&&(r.Authorization="Bearer "+a.authToken),a.messagingToken&&(r["Firebase-Instance-ID-Token"]=a.messagingToken),a.appCheckToken!==null&&(r["X-Firebase-AppCheck"]=a.appCheckToken);const o=i.timeout||7e4,l=xP(o),c=await Promise.race([PP(t,s,r,n.fetchImpl),l.promise,n.cancelAllRequests]);if(l.cancel(),!c)throw new gs("cancelled","Firebase Functions instance was deleted.");const d=TP(c.status,c.json);if(d)throw d;if(!c.json)throw new gs("internal","Response is not valid JSON object.");let h=c.json.data;if(typeof h>"u"&&(h=c.json.result),typeof h>"u")throw new gs("internal","Response is missing data field.");return{data:tl(h)}}const hg="@firebase/functions",fg="0.11.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DP="auth-internal",MP="app-check-internal",OP="messaging-internal";function VP(n,t){const e=(i,{instanceIdentifier:s})=>{const r=i.getProvider("app").getImmediate(),a=i.getProvider(DP),o=i.getProvider(OP),l=i.getProvider(MP);return new kP(r,a,o,l,s,n)};Ne(new Ae(th,e,"PUBLIC").setMultipleInstances(!0)),ye(hg,fg,t),ye(hg,fg,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NP(n=hl(),t=Eu){const i=Bi(yt(n),th).getImmediate({identifier:t}),s=zm("functions");return s&&LP(i,...s),i}function LP(n,t,e){AP(yt(n),t,e)}function FP(n,t,e){return SP(yt(n),t)}VP(fetch.bind(self));const BP={apiKey:"dummy-key-for-now",authDomain:"ekasrt-local.firebaseapp.com",projectId:"ekasrt-local",storageBucket:"ekasrt-local.appspot.com",messagingSenderId:"1234567890",appId:"1:1234:web:abcd"},Fl=Hu(BP),Vi=My(Fl),H=OA(Fl);VA(H).catch(n=>{n.code=="failed-precondition"?console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time."):n.code=="unimplemented"&&console.warn("The current browser does not support all of the features required to enable persistence.")});let UP=null;try{UP=bP(Fl)}catch(n){console.warn("Firebase Messaging is not supported or permission is blocked in this browser.",n)}const jP=NP(Fl);async function nv(n){try{const t=await ba(ct(H,"users",n));if(t.exists())return t.data()}catch(t){console.error("Error fetching user profile:",t)}return null}async function zP(n,t,e=!1){let i=n;if(!n.includes("@")){const o=n.trim().toLowerCase(),l=await ba(ct(H,"usernames",o));if(!l.exists())throw new Error("Username tidak terdaftar.");i=l.data().email}const r=(await u0(Vi,i,t)).user,a=await nv(r.uid);if(a&&!a.is_active)throw await Iy(Vi),new Error("Akun Anda telah dinonaktifkan.");return e?localStorage.setItem("remember_me","true"):localStorage.removeItem("remember_me"),{user:r,profile:a}}async function $P(){await Iy(Vi),localStorage.removeItem("remember_me")}function HP(n){return g0(Vi,async t=>{if(t){const e=await nv(t.uid);n(t,e)}else n(null,null)})}async function qP(n,t){const e=Vi.currentUser;if(!e)throw new Error("Pengguna tidak terautentikasi.");const i=ji.credential(e.email,n);await l0(e,i),await d0(e,t)}async function wt(n,t){const e=Vi.currentUser;if(e)try{const i=await ba(ct(H,"users",e.uid)),s=i.exists()?i.data().username:"unknown";await Bs(lt(H,"activity_logs"),{user_id:e.uid,username:s,action:n,description:t,created_at:Ut()})}catch(i){console.error("Failed to log activity:",i)}}async function WP(n,t,e,i,s,r,a,o){const l=`${n}_${t}_${e}_${i}`,c=ct(H,"pembayaran_iuran",l),d=ct(lt(H,"transaksi")),h=Vi.currentUser,f=await ba(ct(H,"users",h.uid)),g=f.exists()?f.data():{nama_lengkap:"System"},y=["","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][e];await Rb(H,async v=>{if((await v.get(c)).exists())throw new Error("Iuran untuk bulan ini sudah dibayar.");v.set(d,{tanggal:Ut(),kategori_id:r,kategori_nama:a,jenis:"pemasukan",nominal:Number(s),keterangan:`Iuran ${a} - ${y} ${i} - ${o}`,warga_id_terkait:n,warga_nama_terkait:o,user_id_penginput:h.uid,user_nama_penginput:g.nama_lengkap,created_at:Ut()}),v.set(c,{warga_id:n,iuran_id:t,bulan:Number(e),tahun:Number(i),nominal:Number(s),transaksi_id:d.id,created_at:Ut()})}),await wt("pay",`Mencatat pembayaran iuran ${a} (${y} ${i}) warga ${o}`)}async function KP(n){const t=ct(H,"pembayaran_iuran",n);await Rb(H,async e=>{const i=await e.get(t);if(!i.exists())throw new Error("Data pembayaran tidak ditemukan.");const r=i.data().transaksi_id;if(e.delete(t),r){const a=ct(H,"transaksi",r);e.delete(a)}}),await wt("cancel",`Membatalkan pembayaran iuran untuk id pembayaran ${n}`)}async function eh(){const n=ct(H,"settings","rt_config"),t=await ba(n);return t.exists()?t.data():{nama_rt:"RT 01",alamat:"Jl. Merdeka No. 1",ketua:"Budi Santoso",no_rekening:"123-456-789",kontak:"081234567890",logo_url:""}}async function GP(n){const t=ct(H,"settings","rt_config");await Ar(t,{...n,updated_at:Ut()},{merge:!0}),await wt("update","Memperbarui pengaturan RT")}async function YP(n,t){const e=Cb(H);t.forEach(i=>{const s=ct(lt(H,n),i.id),r={...i};delete r.id,Object.keys(r).forEach(a=>{r[a]&&r[a].seconds&&(r[a]=new Date(r[a].seconds*1e3))}),e.set(s,r)}),await e.commit(),await wt("restore",`Melakukan restore collection ${n}`)}function QP(n,t){const e=t?t.nama_lengkap:"User",i=t?t.role.toUpperCase():"GUEST";return`
    <div style="display: flex; align-items: center; gap: 12px;">
      <button id="toggle-sidebar-mobile" class="btn btn-secondary" style="display: none; padding: 8px; border-radius: var(--radius-md);">
        <i class="ri-menu-2-line" style="font-size: 1.25rem;"></i>
      </button>
      <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--on-background);">${n}</h2>
    </div>
    
    <div style="display: flex; align-items: center; gap: 16px;">
      <!-- Theme Switcher -->
      <button id="theme-toggle-btn" class="theme-switch" title="Ganti Tema">
        <i class="ri-moon-line"></i>
      </button>
      
      <!-- Ganti Sandi Button -->
      <button id="btn-change-password-nav" class="theme-switch" title="Ganti Kata Sandi">
        <i class="ri-key-2-line"></i>
      </button>
      
      <!-- User profile summary -->
      <div style="display: flex; align-items: center; gap: 12px; border-left: 1px solid var(--surface-variant); padding-left: 16px;">
        <div style="text-align: right; display: block;">
          <p style="font-size: 0.9rem; font-weight: 600; color: var(--on-background);">${e}</p>
          <span style="font-size: 0.75rem; font-weight: 500; color: var(--primary);">${i}</span>
        </div>
        <div style="width: 36px; height: 36px; border-radius: var(--radius-full); background-color: var(--primary-container); color: var(--on-primary-container); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.95rem;">
          ${e.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  `}function JP(n,t){return`
    <div class="sidebar-brand">
      <i class="ri-wallet-3-fill" style="font-size: 2rem; color: var(--primary);"></i>
      <h1>e-kasRT</h1>
    </div>
    <ul class="sidebar-menu">
      ${[{route:"dashboard",label:"Dashboard",icon:"ri-dashboard-line",roles:["admin","bendahara","rt","warga"]},{route:"users",label:"User Management",icon:"ri-user-settings-line",roles:["admin"]},{route:"warga",label:"Data Warga",icon:"ri-group-line",roles:["admin","bendahara","rt"]},{route:"kategori",label:"Kategori Transaksi",icon:"ri-price-tag-3-line",roles:["admin","bendahara"]},{route:"transaksi",label:"Transaksi Kas",icon:"ri-exchange-funds-line",roles:["admin","bendahara","rt"]},{route:"iuran",label:"Master & Tarif Iuran",icon:"ri-wallet-3-line",roles:["admin","bendahara"]},{route:"monitoring",label:"Monitoring Iuran",icon:"ri-calendar-todo-line",roles:["admin","bendahara","rt"]},{route:"laporan",label:"Laporan Kas",icon:"ri-file-chart-line",roles:["admin","bendahara","rt"]},{route:"pengaturan",label:"Pengaturan RT",icon:"ri-settings-4-line",roles:["admin"]},{route:"backup",label:"Backup & Restore",icon:"ri-database-2-line",roles:["admin"]}].filter(r=>r.roles.includes(n)).map(r=>`
        <li>
          <a href="#/${r.route}" class="sidebar-link ${t===r.route?"active":""}">
            <i class="${r.icon}"></i>
            <span>${r.label}</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <div class="sidebar-footer">
      <button id="sidebar-logout" class="btn btn-secondary" style="width: 100%; border-radius: var(--radius-full); gap: 12px;">
        <i class="ri-logout-box-line"></i>
        <span>Keluar</span>
      </button>
    </div>
  `}function XP(n,t){return[{route:"dashboard",label:"Dashboard",icon:"ri-dashboard-line",roles:["admin","bendahara","rt","warga"]},{route:"warga",label:"Warga",icon:"ri-group-line",roles:["admin","bendahara","rt"]},{route:"transaksi",label:"Kas",icon:"ri-exchange-funds-line",roles:["admin","bendahara","rt"]},{route:"monitoring",label:"Iuran",icon:"ri-calendar-todo-line",roles:["admin","bendahara","rt"]},{route:"laporan",label:"Laporan",icon:"ri-file-chart-line",roles:["admin","bendahara","rt"]}].filter(r=>r.roles.includes(n)).slice(0,5).map(r=>`
    <a href="#/${r.route}" class="bottom-nav-link ${t===r.route?"active":""}">
      <i class="${r.icon}"></i>
      <span>${r.label}</span>
    </a>
  `).join("")}function ZP(){return`
    <div style="min-height: 100vh; width: 100%; display: flex; align-items: center; justify-content: center; background-color: var(--background); padding: 16px;">
      <div class="card" style="width: 100%; max-width: 420px; padding: 32px; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg);">
        
        <!-- Logo and Header -->
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="width: 60px; height: 60px; border-radius: var(--radius-lg); background-color: var(--primary-container); color: var(--primary); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <i class="ri-wallet-3-fill" style="font-size: 2rem;"></i>
          </div>
          <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--on-background);">Masuk Ke e-kasRT</h2>
          <p style="font-size: 0.85rem; color: var(--on-surface-variant); margin-top: 4px;">Sistem Informasi Kas & Iuran Warga</p>
        </div>

        <!-- Login Form -->
        <form id="login-form">
          <div class="form-group">
            <label class="form-label" for="login-username">Email atau Username</label>
            <input type="text" id="login-username" class="form-control" placeholder="Masukkan email atau username" required>
          </div>
          
          <div class="form-group" style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
              <label class="form-label" for="login-password">Kata Sandi</label>
              <a href="#" id="forgot-password-link" style="font-size: 0.8rem; color: var(--primary); text-decoration: none; font-weight: 500;">Lupa Sandi?</a>
            </div>
            <input type="password" id="login-password" class="form-control" placeholder="••••••••" required>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px;">
            <input type="checkbox" id="remember-me" style="width: 16px; height: 16px; accent-color: var(--primary);">
            <label for="remember-me" style="font-size: 0.85rem; color: var(--on-surface-variant); cursor: pointer; user-select: none;">Ingat Saya</label>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; border-radius: var(--radius-md);">
            <i class="ri-login-box-line"></i> Masuk
          </button>
        </form>

        <!-- Forgot Password Form (Hidden by default) -->
        <form id="forgot-form" style="display: none;">
          <div style="margin-bottom: 20px;">
            <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 8px;">Lupa Kata Sandi?</h3>
            <p style="font-size: 0.8rem; color: var(--on-surface-variant);">Masukkan email terdaftar Anda untuk mengajukan permohonan reset sandi menjadi <b>123456</b> kepada Administrator RT.</p>
          </div>

          <div class="form-group" style="margin-bottom: 20px;">
            <label class="form-label" for="forgot-email">Alamat Email</label>
            <input type="email" id="forgot-email" class="form-control" placeholder="name@domain.com" required>
          </div>

          <div style="display: flex; gap: 12px;">
            <button type="button" id="back-to-login" class="btn btn-secondary" style="flex: 1; border-radius: var(--radius-md);">Kembali</button>
            <button type="submit" class="btn btn-primary" style="flex: 1; border-radius: var(--radius-md);">Kirim</button>
          </div>
        </form>

      </div>
    </div>
  `}function tR(){const n=document.getElementById("login-form"),t=document.getElementById("forgot-form"),e=document.getElementById("forgot-password-link"),i=document.getElementById("back-to-login");e&&e.addEventListener("click",s=>{s.preventDefault(),n.style.display="none",t.style.display="block"}),i&&i.addEventListener("click",()=>{t.style.display="none",n.style.display="block"}),n&&n.addEventListener("submit",async s=>{s.preventDefault();const r=document.getElementById("login-username").value,a=document.getElementById("login-password").value,o=document.getElementById("remember-me").checked;Swal.fire({title:"Memproses...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{await zP(r,a,o),Swal.fire({icon:"success",title:"Berhasil Masuk",text:"Selamat datang kembali di e-kasRT!",timer:1500,showConfirmButton:!1}).then(()=>{window.location.hash="#/dashboard"})}catch(l){Swal.fire({icon:"error",title:"Gagal Masuk",text:l.message||"Email/username atau kata sandi salah."})}}),t&&t.addEventListener("submit",async s=>{s.preventDefault();const r=document.getElementById("forgot-email").value.trim().toLowerCase();Swal.fire({title:"Memproses pengajuan...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{await Bs(lt(H,"reset_password_requests"),{email:r,nama_lengkap:"Pengaju Reset",username:"guest",status:"pending",created_at:Ut()}),Swal.fire({icon:"success",title:"Pengajuan Terkirim",text:"Permintaan reset sandi telah diajukan ke Admin. Silakan hubungi RT untuk menyetujui reset sandi Anda menjadi 123456.",confirmButtonColor:"var(--primary)"}).then(()=>{t.style.display="none",n.style.display="block"})}catch(a){Swal.fire({icon:"error",title:"Gagal Mengajukan",text:a.message||"Terjadi kesalahan saat mengajukan reset sandi."})}})}function Bt(n){return n==null?"Rp 0":new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0,maximumFractionDigits:0}).format(n)}function el(n){if(!n)return"-";const t=n.toDate?n.toDate():new Date(n);return isNaN(t.getTime())?"-":new Intl.DateTimeFormat("id-ID",{day:"numeric",month:"long",year:"numeric"}).format(t)}function pg(n){if(!n)return"";const t=n.toDate?n.toDate():new Date(n);if(isNaN(t.getTime()))return"";const e=t.getFullYear(),i=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${e}-${i}-${s}`}/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function wa(n){return n+.5|0}const Nn=(n,t,e)=>Math.max(Math.min(n,e),t);function gr(n){return Nn(wa(n*2.55),0,255)}function Hn(n){return Nn(wa(n*255),0,255)}function rn(n){return Nn(wa(n/2.55)/100,0,1)}function gg(n){return Nn(wa(n*100),0,100)}const Ee={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},xu=[..."0123456789ABCDEF"],eR=n=>xu[n&15],nR=n=>xu[(n&240)>>4]+xu[n&15],Ya=n=>(n&240)>>4===(n&15),iR=n=>Ya(n.r)&&Ya(n.g)&&Ya(n.b)&&Ya(n.a);function sR(n){var t=n.length,e;return n[0]==="#"&&(t===4||t===5?e={r:255&Ee[n[1]]*17,g:255&Ee[n[2]]*17,b:255&Ee[n[3]]*17,a:t===5?Ee[n[4]]*17:255}:(t===7||t===9)&&(e={r:Ee[n[1]]<<4|Ee[n[2]],g:Ee[n[3]]<<4|Ee[n[4]],b:Ee[n[5]]<<4|Ee[n[6]],a:t===9?Ee[n[7]]<<4|Ee[n[8]]:255})),e}const rR=(n,t)=>n<255?t(n):"";function aR(n){var t=iR(n)?eR:nR;return n?"#"+t(n.r)+t(n.g)+t(n.b)+rR(n.a,t):void 0}const oR=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function iv(n,t,e){const i=t*Math.min(e,1-e),s=(r,a=(r+n/30)%12)=>e-i*Math.max(Math.min(a-3,9-a,1),-1);return[s(0),s(8),s(4)]}function lR(n,t,e){const i=(s,r=(s+n/60)%6)=>e-e*t*Math.max(Math.min(r,4-r,1),0);return[i(5),i(3),i(1)]}function cR(n,t,e){const i=iv(n,1,.5);let s;for(t+e>1&&(s=1/(t+e),t*=s,e*=s),s=0;s<3;s++)i[s]*=1-t-e,i[s]+=t;return i}function uR(n,t,e,i,s){return n===s?(t-e)/i+(t<e?6:0):t===s?(e-n)/i+2:(n-t)/i+4}function nh(n){const e=n.r/255,i=n.g/255,s=n.b/255,r=Math.max(e,i,s),a=Math.min(e,i,s),o=(r+a)/2;let l,c,d;return r!==a&&(d=r-a,c=o>.5?d/(2-r-a):d/(r+a),l=uR(e,i,s,d,r),l=l*60+.5),[l|0,c||0,o]}function ih(n,t,e,i){return(Array.isArray(t)?n(t[0],t[1],t[2]):n(t,e,i)).map(Hn)}function sh(n,t,e){return ih(iv,n,t,e)}function dR(n,t,e){return ih(cR,n,t,e)}function hR(n,t,e){return ih(lR,n,t,e)}function sv(n){return(n%360+360)%360}function fR(n){const t=oR.exec(n);let e=255,i;if(!t)return;t[5]!==i&&(e=t[6]?gr(+t[5]):Hn(+t[5]));const s=sv(+t[2]),r=+t[3]/100,a=+t[4]/100;return t[1]==="hwb"?i=dR(s,r,a):t[1]==="hsv"?i=hR(s,r,a):i=sh(s,r,a),{r:i[0],g:i[1],b:i[2],a:e}}function pR(n,t){var e=nh(n);e[0]=sv(e[0]+t),e=sh(e),n.r=e[0],n.g=e[1],n.b=e[2]}function gR(n){if(!n)return;const t=nh(n),e=t[0],i=gg(t[1]),s=gg(t[2]);return n.a<255?`hsla(${e}, ${i}%, ${s}%, ${rn(n.a)})`:`hsl(${e}, ${i}%, ${s}%)`}const mg={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},yg={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function mR(){const n={},t=Object.keys(yg),e=Object.keys(mg);let i,s,r,a,o;for(i=0;i<t.length;i++){for(a=o=t[i],s=0;s<e.length;s++)r=e[s],o=o.replace(r,mg[r]);r=parseInt(yg[a],16),n[o]=[r>>16&255,r>>8&255,r&255]}return n}let Qa;function yR(n){Qa||(Qa=mR(),Qa.transparent=[0,0,0,0]);const t=Qa[n.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const _R=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function bR(n){const t=_R.exec(n);let e=255,i,s,r;if(t){if(t[7]!==i){const a=+t[7];e=t[8]?gr(a):Nn(a*255,0,255)}return i=+t[1],s=+t[3],r=+t[5],i=255&(t[2]?gr(i):Nn(i,0,255)),s=255&(t[4]?gr(s):Nn(s,0,255)),r=255&(t[6]?gr(r):Nn(r,0,255)),{r:i,g:s,b:r,a:e}}}function vR(n){return n&&(n.a<255?`rgba(${n.r}, ${n.g}, ${n.b}, ${rn(n.a)})`:`rgb(${n.r}, ${n.g}, ${n.b})`)}const Dc=n=>n<=.0031308?n*12.92:Math.pow(n,1/2.4)*1.055-.055,es=n=>n<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4);function wR(n,t,e){const i=es(rn(n.r)),s=es(rn(n.g)),r=es(rn(n.b));return{r:Hn(Dc(i+e*(es(rn(t.r))-i))),g:Hn(Dc(s+e*(es(rn(t.g))-s))),b:Hn(Dc(r+e*(es(rn(t.b))-r))),a:n.a+e*(t.a-n.a)}}function Ja(n,t,e){if(n){let i=nh(n);i[t]=Math.max(0,Math.min(i[t]+i[t]*e,t===0?360:1)),i=sh(i),n.r=i[0],n.g=i[1],n.b=i[2]}}function rv(n,t){return n&&Object.assign(t||{},n)}function _g(n){var t={r:0,g:0,b:0,a:255};return Array.isArray(n)?n.length>=3&&(t={r:n[0],g:n[1],b:n[2],a:255},n.length>3&&(t.a=Hn(n[3]))):(t=rv(n,{r:0,g:0,b:0,a:1}),t.a=Hn(t.a)),t}function IR(n){return n.charAt(0)==="r"?bR(n):fR(n)}class Jr{constructor(t){if(t instanceof Jr)return t;const e=typeof t;let i;e==="object"?i=_g(t):e==="string"&&(i=sR(t)||yR(t)||IR(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=rv(this._rgb);return t&&(t.a=rn(t.a)),t}set rgb(t){this._rgb=_g(t)}rgbString(){return this._valid?vR(this._rgb):void 0}hexString(){return this._valid?aR(this._rgb):void 0}hslString(){return this._valid?gR(this._rgb):void 0}mix(t,e){if(t){const i=this.rgb,s=t.rgb;let r;const a=e===r?.5:e,o=2*a-1,l=i.a-s.a,c=((o*l===-1?o:(o+l)/(1+o*l))+1)/2;r=1-c,i.r=255&c*i.r+r*s.r+.5,i.g=255&c*i.g+r*s.g+.5,i.b=255&c*i.b+r*s.b+.5,i.a=a*i.a+(1-a)*s.a,this.rgb=i}return this}interpolate(t,e){return t&&(this._rgb=wR(this._rgb,t._rgb,e)),this}clone(){return new Jr(this.rgb)}alpha(t){return this._rgb.a=Hn(t),this}clearer(t){const e=this._rgb;return e.a*=1-t,this}greyscale(){const t=this._rgb,e=wa(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=e,this}opaquer(t){const e=this._rgb;return e.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return Ja(this._rgb,2,t),this}darken(t){return Ja(this._rgb,2,-t),this}saturate(t){return Ja(this._rgb,1,t),this}desaturate(t){return Ja(this._rgb,1,-t),this}rotate(t){return pR(this._rgb,t),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function tn(){}const TR=(()=>{let n=0;return()=>n++})();function nt(n){return n==null}function kt(n){if(Array.isArray&&Array.isArray(n))return!0;const t=Object.prototype.toString.call(n);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function at(n){return n!==null&&Object.prototype.toString.call(n)==="[object Object]"}function Mt(n){return(typeof n=="number"||n instanceof Number)&&isFinite(+n)}function we(n,t){return Mt(n)?n:t}function Z(n,t){return typeof n>"u"?t:n}const ER=(n,t)=>typeof n=="string"&&n.endsWith("%")?parseFloat(n)/100:+n/t,av=(n,t)=>typeof n=="string"&&n.endsWith("%")?parseFloat(n)/100*t:+n;function bt(n,t,e){if(n&&typeof n.call=="function")return n.apply(e,t)}function pt(n,t,e,i){let s,r,a;if(kt(n))for(r=n.length,s=0;s<r;s++)t.call(e,n[s],s);else if(at(n))for(a=Object.keys(n),r=a.length,s=0;s<r;s++)t.call(e,n[a[s]],a[s])}function nl(n,t){let e,i,s,r;if(!n||!t||n.length!==t.length)return!1;for(e=0,i=n.length;e<i;++e)if(s=n[e],r=t[e],s.datasetIndex!==r.datasetIndex||s.index!==r.index)return!1;return!0}function il(n){if(kt(n))return n.map(il);if(at(n)){const t=Object.create(null),e=Object.keys(n),i=e.length;let s=0;for(;s<i;++s)t[e[s]]=il(n[e[s]]);return t}return n}function ov(n){return["__proto__","prototype","constructor"].indexOf(n)===-1}function xR(n,t,e,i){if(!ov(n))return;const s=t[n],r=e[n];at(s)&&at(r)?Xr(s,r,i):t[n]=il(r)}function Xr(n,t,e){const i=kt(t)?t:[t],s=i.length;if(!at(n))return n;e=e||{};const r=e.merger||xR;let a;for(let o=0;o<s;++o){if(a=i[o],!at(a))continue;const l=Object.keys(a);for(let c=0,d=l.length;c<d;++c)r(l[c],n,a,e)}return n}function Sr(n,t){return Xr(n,t,{merger:kR})}function kR(n,t,e){if(!ov(n))return;const i=t[n],s=e[n];at(i)&&at(s)?Sr(i,s):Object.prototype.hasOwnProperty.call(t,n)||(t[n]=il(s))}const bg={"":n=>n,x:n=>n.x,y:n=>n.y};function AR(n){const t=n.split("."),e=[];let i="";for(const s of t)i+=s,i.endsWith("\\")?i=i.slice(0,-1)+".":(e.push(i),i="");return e}function SR(n){const t=AR(n);return e=>{for(const i of t){if(i==="")break;e=e&&e[i]}return e}}function Gn(n,t){return(bg[t]||(bg[t]=SR(t)))(n)}function rh(n){return n.charAt(0).toUpperCase()+n.slice(1)}const Zr=n=>typeof n<"u",Yn=n=>typeof n=="function",vg=(n,t)=>{if(n.size!==t.size)return!1;for(const e of n)if(!t.has(e))return!1;return!0};function PR(n){return n.type==="mouseup"||n.type==="click"||n.type==="contextmenu"}const ht=Math.PI,It=2*ht,RR=It+ht,sl=Number.POSITIVE_INFINITY,CR=ht/180,Vt=ht/2,ri=ht/4,wg=ht*2/3,Ln=Math.log10,Ke=Math.sign;function Pr(n,t,e){return Math.abs(n-t)<e}function Ig(n){const t=Math.round(n);n=Pr(n,t,n/1e3)?t:n;const e=Math.pow(10,Math.floor(Ln(n))),i=n/e;return(i<=1?1:i<=2?2:i<=5?5:10)*e}function DR(n){const t=[],e=Math.sqrt(n);let i;for(i=1;i<e;i++)n%i===0&&(t.push(i),t.push(n/i));return e===(e|0)&&t.push(e),t.sort((s,r)=>s-r).pop(),t}function MR(n){return typeof n=="symbol"||typeof n=="object"&&n!==null&&!(Symbol.toPrimitive in n||"toString"in n||"valueOf"in n)}function As(n){return!MR(n)&&!isNaN(parseFloat(n))&&isFinite(n)}function OR(n,t){const e=Math.round(n);return e-t<=n&&e+t>=n}function lv(n,t,e){let i,s,r;for(i=0,s=n.length;i<s;i++)r=n[i][e],isNaN(r)||(t.min=Math.min(t.min,r),t.max=Math.max(t.max,r))}function De(n){return n*(ht/180)}function ah(n){return n*(180/ht)}function Tg(n){if(!Mt(n))return;let t=1,e=0;for(;Math.round(n*t)/t!==n;)t*=10,e++;return e}function cv(n,t){const e=t.x-n.x,i=t.y-n.y,s=Math.sqrt(e*e+i*i);let r=Math.atan2(i,e);return r<-.5*ht&&(r+=It),{angle:r,distance:s}}function ku(n,t){return Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2))}function VR(n,t){return(n-t+RR)%It-ht}function se(n){return(n%It+It)%It}function ta(n,t,e,i){const s=se(n),r=se(t),a=se(e),o=se(r-s),l=se(a-s),c=se(s-r),d=se(s-a);return s===r||s===a||i&&r===a||o>l&&c<d}function qt(n,t,e){return Math.max(t,Math.min(e,n))}function NR(n){return qt(n,-32768,32767)}function dn(n,t,e,i=1e-6){return n>=Math.min(t,e)-i&&n<=Math.max(t,e)+i}function oh(n,t,e){e=e||(a=>n[a]<t);let i=n.length-1,s=0,r;for(;i-s>1;)r=s+i>>1,e(r)?s=r:i=r;return{lo:s,hi:i}}const hn=(n,t,e,i)=>oh(n,e,i?s=>{const r=n[s][t];return r<e||r===e&&n[s+1][t]===e}:s=>n[s][t]<e),LR=(n,t,e)=>oh(n,e,i=>n[i][t]>=e);function FR(n,t,e){let i=0,s=n.length;for(;i<s&&n[i]<t;)i++;for(;s>i&&n[s-1]>e;)s--;return i>0||s<n.length?n.slice(i,s):n}const uv=["push","pop","shift","splice","unshift"];function BR(n,t){if(n._chartjs){n._chartjs.listeners.push(t);return}Object.defineProperty(n,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),uv.forEach(e=>{const i="_onData"+rh(e),s=n[e];Object.defineProperty(n,e,{configurable:!0,enumerable:!1,value(...r){const a=s.apply(this,r);return n._chartjs.listeners.forEach(o=>{typeof o[i]=="function"&&o[i](...r)}),a}})})}function Eg(n,t){const e=n._chartjs;if(!e)return;const i=e.listeners,s=i.indexOf(t);s!==-1&&i.splice(s,1),!(i.length>0)&&(uv.forEach(r=>{delete n[r]}),delete n._chartjs)}function dv(n){const t=new Set(n);return t.size===n.length?n:Array.from(t)}const hv=function(){return typeof window>"u"?function(n){return n()}:window.requestAnimationFrame}();function fv(n,t){let e=[],i=!1;return function(...s){e=s,i||(i=!0,hv.call(window,()=>{i=!1,n.apply(t,e)}))}}function UR(n,t){let e;return function(...i){return t?(clearTimeout(e),e=setTimeout(n,t,i)):n.apply(this,i),t}}const lh=n=>n==="start"?"left":n==="end"?"right":"center",ie=(n,t,e)=>n==="start"?t:n==="end"?e:(t+e)/2,jR=(n,t,e,i)=>n===(i?"left":"right")?e:n==="center"?(t+e)/2:t;function pv(n,t,e){const i=t.length;let s=0,r=i;if(n._sorted){const{iScale:a,vScale:o,_parsed:l}=n,c=n.dataset&&n.dataset.options?n.dataset.options.spanGaps:null,d=a.axis,{min:h,max:f,minDefined:g,maxDefined:y}=a.getUserBounds();if(g){if(s=Math.min(hn(l,d,h).lo,e?i:hn(t,d,a.getPixelForValue(h)).lo),c){const v=l.slice(0,s+1).reverse().findIndex(w=>!nt(w[o.axis]));s-=Math.max(0,v)}s=qt(s,0,i-1)}if(y){let v=Math.max(hn(l,a.axis,f,!0).hi+1,e?0:hn(t,d,a.getPixelForValue(f),!0).hi+1);if(c){const w=l.slice(v-1).findIndex(A=>!nt(A[o.axis]));v+=Math.max(0,w)}r=qt(v,s,i)-s}else r=i-s}return{start:s,count:r}}function gv(n){const{xScale:t,yScale:e,_scaleRanges:i}=n,s={xmin:t.min,xmax:t.max,ymin:e.min,ymax:e.max};if(!i)return n._scaleRanges=s,!0;const r=i.xmin!==t.min||i.xmax!==t.max||i.ymin!==e.min||i.ymax!==e.max;return Object.assign(i,s),r}const Xa=n=>n===0||n===1,xg=(n,t,e)=>-(Math.pow(2,10*(n-=1))*Math.sin((n-t)*It/e)),kg=(n,t,e)=>Math.pow(2,-10*n)*Math.sin((n-t)*It/e)+1,Rr={linear:n=>n,easeInQuad:n=>n*n,easeOutQuad:n=>-n*(n-2),easeInOutQuad:n=>(n/=.5)<1?.5*n*n:-.5*(--n*(n-2)-1),easeInCubic:n=>n*n*n,easeOutCubic:n=>(n-=1)*n*n+1,easeInOutCubic:n=>(n/=.5)<1?.5*n*n*n:.5*((n-=2)*n*n+2),easeInQuart:n=>n*n*n*n,easeOutQuart:n=>-((n-=1)*n*n*n-1),easeInOutQuart:n=>(n/=.5)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2),easeInQuint:n=>n*n*n*n*n,easeOutQuint:n=>(n-=1)*n*n*n*n+1,easeInOutQuint:n=>(n/=.5)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2),easeInSine:n=>-Math.cos(n*Vt)+1,easeOutSine:n=>Math.sin(n*Vt),easeInOutSine:n=>-.5*(Math.cos(ht*n)-1),easeInExpo:n=>n===0?0:Math.pow(2,10*(n-1)),easeOutExpo:n=>n===1?1:-Math.pow(2,-10*n)+1,easeInOutExpo:n=>Xa(n)?n:n<.5?.5*Math.pow(2,10*(n*2-1)):.5*(-Math.pow(2,-10*(n*2-1))+2),easeInCirc:n=>n>=1?n:-(Math.sqrt(1-n*n)-1),easeOutCirc:n=>Math.sqrt(1-(n-=1)*n),easeInOutCirc:n=>(n/=.5)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1),easeInElastic:n=>Xa(n)?n:xg(n,.075,.3),easeOutElastic:n=>Xa(n)?n:kg(n,.075,.3),easeInOutElastic(n){return Xa(n)?n:n<.5?.5*xg(n*2,.1125,.45):.5+.5*kg(n*2-1,.1125,.45)},easeInBack(n){return n*n*((1.70158+1)*n-1.70158)},easeOutBack(n){return(n-=1)*n*((1.70158+1)*n+1.70158)+1},easeInOutBack(n){let t=1.70158;return(n/=.5)<1?.5*(n*n*(((t*=1.525)+1)*n-t)):.5*((n-=2)*n*(((t*=1.525)+1)*n+t)+2)},easeInBounce:n=>1-Rr.easeOutBounce(1-n),easeOutBounce(n){return n<1/2.75?7.5625*n*n:n<2/2.75?7.5625*(n-=1.5/2.75)*n+.75:n<2.5/2.75?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375},easeInOutBounce:n=>n<.5?Rr.easeInBounce(n*2)*.5:Rr.easeOutBounce(n*2-1)*.5+.5};function ch(n){if(n&&typeof n=="object"){const t=n.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function Ag(n){return ch(n)?n:new Jr(n)}function Mc(n){return ch(n)?n:new Jr(n).saturate(.5).darken(.1).hexString()}const zR=["x","y","borderWidth","radius","tension"],$R=["color","borderColor","backgroundColor"];function HR(n){n.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),n.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),n.set("animations",{colors:{type:"color",properties:$R},numbers:{type:"number",properties:zR}}),n.describe("animations",{_fallback:"animation"}),n.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function qR(n){n.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const Sg=new Map;function WR(n,t){t=t||{};const e=n+JSON.stringify(t);let i=Sg.get(e);return i||(i=new Intl.NumberFormat(n,t),Sg.set(e,i)),i}function Ia(n,t,e){return WR(t,e).format(n)}const mv={values(n){return kt(n)?n:""+n},numeric(n,t,e){if(n===0)return"0";const i=this.chart.options.locale;let s,r=n;if(e.length>1){const c=Math.max(Math.abs(e[0].value),Math.abs(e[e.length-1].value));(c<1e-4||c>1e15)&&(s="scientific"),r=KR(n,e)}const a=Ln(Math.abs(r)),o=isNaN(a)?1:Math.max(Math.min(-1*Math.floor(a),20),0),l={notation:s,minimumFractionDigits:o,maximumFractionDigits:o};return Object.assign(l,this.options.ticks.format),Ia(n,i,l)},logarithmic(n,t,e){if(n===0)return"0";const i=e[t].significand||n/Math.pow(10,Math.floor(Ln(n)));return[1,2,3,5,10,15].includes(i)||t>.8*e.length?mv.numeric.call(this,n,t,e):""}};function KR(n,t){let e=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(e)>=1&&n!==Math.floor(n)&&(e=n-Math.floor(n)),e}var Bl={formatters:mv};function GR(n){n.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,e)=>e.lineWidth,tickColor:(t,e)=>e.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Bl.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),n.route("scale.ticks","color","","color"),n.route("scale.grid","color","","borderColor"),n.route("scale.border","color","","borderColor"),n.route("scale.title","color","","color"),n.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),n.describe("scales",{_fallback:"scale"}),n.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const Ni=Object.create(null),Au=Object.create(null);function Cr(n,t){if(!t)return n;const e=t.split(".");for(let i=0,s=e.length;i<s;++i){const r=e[i];n=n[r]||(n[r]=Object.create(null))}return n}function Oc(n,t,e){return typeof t=="string"?Xr(Cr(n,t),e):Xr(Cr(n,""),t)}class YR{constructor(t,e){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,s)=>Mc(s.backgroundColor),this.hoverBorderColor=(i,s)=>Mc(s.borderColor),this.hoverColor=(i,s)=>Mc(s.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(e)}set(t,e){return Oc(this,t,e)}get(t){return Cr(this,t)}describe(t,e){return Oc(Au,t,e)}override(t,e){return Oc(Ni,t,e)}route(t,e,i,s){const r=Cr(this,t),a=Cr(this,i),o="_"+e;Object.defineProperties(r,{[o]:{value:r[e],writable:!0},[e]:{enumerable:!0,get(){const l=this[o],c=a[s];return at(l)?Object.assign({},c,l):Z(l,c)},set(l){this[o]=l}}})}apply(t){t.forEach(e=>e(this))}}var At=new YR({_scriptable:n=>!n.startsWith("on"),_indexable:n=>n!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[HR,qR,GR]);function QR(n){return!n||nt(n.size)||nt(n.family)?null:(n.style?n.style+" ":"")+(n.weight?n.weight+" ":"")+n.size+"px "+n.family}function rl(n,t,e,i,s){let r=t[s];return r||(r=t[s]=n.measureText(s).width,e.push(s)),r>i&&(i=r),i}function JR(n,t,e,i){i=i||{};let s=i.data=i.data||{},r=i.garbageCollect=i.garbageCollect||[];i.font!==t&&(s=i.data={},r=i.garbageCollect=[],i.font=t),n.save(),n.font=t;let a=0;const o=e.length;let l,c,d,h,f;for(l=0;l<o;l++)if(h=e[l],h!=null&&!kt(h))a=rl(n,s,r,a,h);else if(kt(h))for(c=0,d=h.length;c<d;c++)f=h[c],f!=null&&!kt(f)&&(a=rl(n,s,r,a,f));n.restore();const g=r.length/2;if(g>e.length){for(l=0;l<g;l++)delete s[r[l]];r.splice(0,g)}return a}function ai(n,t,e){const i=n.currentDevicePixelRatio,s=e!==0?Math.max(e/2,.5):0;return Math.round((t-s)*i)/i+s}function Pg(n,t){!t&&!n||(t=t||n.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,n.width,n.height),t.restore())}function Su(n,t,e,i){yv(n,t,e,i,null)}function yv(n,t,e,i,s){let r,a,o,l,c,d,h,f;const g=t.pointStyle,y=t.rotation,v=t.radius;let w=(y||0)*CR;if(g&&typeof g=="object"&&(r=g.toString(),r==="[object HTMLImageElement]"||r==="[object HTMLCanvasElement]")){n.save(),n.translate(e,i),n.rotate(w),n.drawImage(g,-g.width/2,-g.height/2,g.width,g.height),n.restore();return}if(!(isNaN(v)||v<=0)){switch(n.beginPath(),g){default:s?n.ellipse(e,i,s/2,v,0,0,It):n.arc(e,i,v,0,It),n.closePath();break;case"triangle":d=s?s/2:v,n.moveTo(e+Math.sin(w)*d,i-Math.cos(w)*v),w+=wg,n.lineTo(e+Math.sin(w)*d,i-Math.cos(w)*v),w+=wg,n.lineTo(e+Math.sin(w)*d,i-Math.cos(w)*v),n.closePath();break;case"rectRounded":c=v*.516,l=v-c,a=Math.cos(w+ri)*l,h=Math.cos(w+ri)*(s?s/2-c:l),o=Math.sin(w+ri)*l,f=Math.sin(w+ri)*(s?s/2-c:l),n.arc(e-h,i-o,c,w-ht,w-Vt),n.arc(e+f,i-a,c,w-Vt,w),n.arc(e+h,i+o,c,w,w+Vt),n.arc(e-f,i+a,c,w+Vt,w+ht),n.closePath();break;case"rect":if(!y){l=Math.SQRT1_2*v,d=s?s/2:l,n.rect(e-d,i-l,2*d,2*l);break}w+=ri;case"rectRot":h=Math.cos(w)*(s?s/2:v),a=Math.cos(w)*v,o=Math.sin(w)*v,f=Math.sin(w)*(s?s/2:v),n.moveTo(e-h,i-o),n.lineTo(e+f,i-a),n.lineTo(e+h,i+o),n.lineTo(e-f,i+a),n.closePath();break;case"crossRot":w+=ri;case"cross":h=Math.cos(w)*(s?s/2:v),a=Math.cos(w)*v,o=Math.sin(w)*v,f=Math.sin(w)*(s?s/2:v),n.moveTo(e-h,i-o),n.lineTo(e+h,i+o),n.moveTo(e+f,i-a),n.lineTo(e-f,i+a);break;case"star":h=Math.cos(w)*(s?s/2:v),a=Math.cos(w)*v,o=Math.sin(w)*v,f=Math.sin(w)*(s?s/2:v),n.moveTo(e-h,i-o),n.lineTo(e+h,i+o),n.moveTo(e+f,i-a),n.lineTo(e-f,i+a),w+=ri,h=Math.cos(w)*(s?s/2:v),a=Math.cos(w)*v,o=Math.sin(w)*v,f=Math.sin(w)*(s?s/2:v),n.moveTo(e-h,i-o),n.lineTo(e+h,i+o),n.moveTo(e+f,i-a),n.lineTo(e-f,i+a);break;case"line":a=s?s/2:Math.cos(w)*v,o=Math.sin(w)*v,n.moveTo(e-a,i-o),n.lineTo(e+a,i+o);break;case"dash":n.moveTo(e,i),n.lineTo(e+Math.cos(w)*(s?s/2:v),i+Math.sin(w)*v);break;case!1:n.closePath();break}n.fill(),t.borderWidth>0&&n.stroke()}}function fn(n,t,e){return e=e||.5,!t||n&&n.x>t.left-e&&n.x<t.right+e&&n.y>t.top-e&&n.y<t.bottom+e}function Ul(n,t){n.save(),n.beginPath(),n.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),n.clip()}function jl(n){n.restore()}function XR(n,t,e,i,s){if(!t)return n.lineTo(e.x,e.y);if(s==="middle"){const r=(t.x+e.x)/2;n.lineTo(r,t.y),n.lineTo(r,e.y)}else s==="after"!=!!i?n.lineTo(t.x,e.y):n.lineTo(e.x,t.y);n.lineTo(e.x,e.y)}function ZR(n,t,e,i){if(!t)return n.lineTo(e.x,e.y);n.bezierCurveTo(i?t.cp1x:t.cp2x,i?t.cp1y:t.cp2y,i?e.cp2x:e.cp1x,i?e.cp2y:e.cp1y,e.x,e.y)}function tC(n,t){t.translation&&n.translate(t.translation[0],t.translation[1]),nt(t.rotation)||n.rotate(t.rotation),t.color&&(n.fillStyle=t.color),t.textAlign&&(n.textAlign=t.textAlign),t.textBaseline&&(n.textBaseline=t.textBaseline)}function eC(n,t,e,i,s){if(s.strikethrough||s.underline){const r=n.measureText(i),a=t-r.actualBoundingBoxLeft,o=t+r.actualBoundingBoxRight,l=e-r.actualBoundingBoxAscent,c=e+r.actualBoundingBoxDescent,d=s.strikethrough?(l+c)/2:c;n.strokeStyle=n.fillStyle,n.beginPath(),n.lineWidth=s.decorationWidth||2,n.moveTo(a,d),n.lineTo(o,d),n.stroke()}}function nC(n,t){const e=n.fillStyle;n.fillStyle=t.color,n.fillRect(t.left,t.top,t.width,t.height),n.fillStyle=e}function Li(n,t,e,i,s,r={}){const a=kt(t)?t:[t],o=r.strokeWidth>0&&r.strokeColor!=="";let l,c;for(n.save(),n.font=s.string,tC(n,r),l=0;l<a.length;++l)c=a[l],r.backdrop&&nC(n,r.backdrop),o&&(r.strokeColor&&(n.strokeStyle=r.strokeColor),nt(r.strokeWidth)||(n.lineWidth=r.strokeWidth),n.strokeText(c,e,i,r.maxWidth)),n.fillText(c,e,i,r.maxWidth),eC(n,e,i,c,r),i+=Number(s.lineHeight);n.restore()}function ea(n,t){const{x:e,y:i,w:s,h:r,radius:a}=t;n.arc(e+a.topLeft,i+a.topLeft,a.topLeft,1.5*ht,ht,!0),n.lineTo(e,i+r-a.bottomLeft),n.arc(e+a.bottomLeft,i+r-a.bottomLeft,a.bottomLeft,ht,Vt,!0),n.lineTo(e+s-a.bottomRight,i+r),n.arc(e+s-a.bottomRight,i+r-a.bottomRight,a.bottomRight,Vt,0,!0),n.lineTo(e+s,i+a.topRight),n.arc(e+s-a.topRight,i+a.topRight,a.topRight,0,-Vt,!0),n.lineTo(e+a.topLeft,i)}const iC=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,sC=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function rC(n,t){const e=(""+n).match(iC);if(!e||e[1]==="normal")return t*1.2;switch(n=+e[2],e[3]){case"px":return n;case"%":n/=100;break}return t*n}const aC=n=>+n||0;function uh(n,t){const e={},i=at(t),s=i?Object.keys(t):t,r=at(n)?i?a=>Z(n[a],n[t[a]]):a=>n[a]:()=>n;for(const a of s)e[a]=aC(r(a));return e}function _v(n){return uh(n,{top:"y",right:"x",bottom:"y",left:"x"})}function vi(n){return uh(n,["topLeft","topRight","bottomLeft","bottomRight"])}function ae(n){const t=_v(n);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function jt(n,t){n=n||{},t=t||At.font;let e=Z(n.size,t.size);typeof e=="string"&&(e=parseInt(e,10));let i=Z(n.style,t.style);i&&!(""+i).match(sC)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);const s={family:Z(n.family,t.family),lineHeight:rC(Z(n.lineHeight,t.lineHeight),e),size:e,style:i,weight:Z(n.weight,t.weight),string:""};return s.string=QR(s),s}function mr(n,t,e,i){let s,r,a;for(s=0,r=n.length;s<r;++s)if(a=n[s],a!==void 0&&a!==void 0)return a}function oC(n,t,e){const{min:i,max:s}=n,r=av(t,(s-i)/2),a=(o,l)=>e&&o===0?0:o+l;return{min:a(i,-Math.abs(r)),max:a(s,r)}}function Zn(n,t){return Object.assign(Object.create(n),t)}function dh(n,t=[""],e,i,s=()=>n[0]){const r=e||n;typeof i>"u"&&(i=Iv("_fallback",n));const a={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:n,_rootScopes:r,_fallback:i,_getTarget:s,override:o=>dh([o,...n],t,r,i)};return new Proxy(a,{deleteProperty(o,l){return delete o[l],delete o._keys,delete n[0][l],!0},get(o,l){return vv(o,l,()=>gC(l,t,n,o))},getOwnPropertyDescriptor(o,l){return Reflect.getOwnPropertyDescriptor(o._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(n[0])},has(o,l){return Cg(o).includes(l)},ownKeys(o){return Cg(o)},set(o,l,c){const d=o._storage||(o._storage=s());return o[l]=d[l]=c,delete o._keys,!0}})}function Ss(n,t,e,i){const s={_cacheable:!1,_proxy:n,_context:t,_subProxy:e,_stack:new Set,_descriptors:bv(n,i),setContext:r=>Ss(n,r,e,i),override:r=>Ss(n.override(r),t,e,i)};return new Proxy(s,{deleteProperty(r,a){return delete r[a],delete n[a],!0},get(r,a,o){return vv(r,a,()=>cC(r,a,o))},getOwnPropertyDescriptor(r,a){return r._descriptors.allKeys?Reflect.has(n,a)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(n,a)},getPrototypeOf(){return Reflect.getPrototypeOf(n)},has(r,a){return Reflect.has(n,a)},ownKeys(){return Reflect.ownKeys(n)},set(r,a,o){return n[a]=o,delete r[a],!0}})}function bv(n,t={scriptable:!0,indexable:!0}){const{_scriptable:e=t.scriptable,_indexable:i=t.indexable,_allKeys:s=t.allKeys}=n;return{allKeys:s,scriptable:e,indexable:i,isScriptable:Yn(e)?e:()=>e,isIndexable:Yn(i)?i:()=>i}}const lC=(n,t)=>n?n+rh(t):t,hh=(n,t)=>at(t)&&n!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function vv(n,t,e){if(Object.prototype.hasOwnProperty.call(n,t)||t==="constructor")return n[t];const i=e();return n[t]=i,i}function cC(n,t,e){const{_proxy:i,_context:s,_subProxy:r,_descriptors:a}=n;let o=i[t];return Yn(o)&&a.isScriptable(t)&&(o=uC(t,o,n,e)),kt(o)&&o.length&&(o=dC(t,o,n,a.isIndexable)),hh(t,o)&&(o=Ss(o,s,r&&r[t],a)),o}function uC(n,t,e,i){const{_proxy:s,_context:r,_subProxy:a,_stack:o}=e;if(o.has(n))throw new Error("Recursion detected: "+Array.from(o).join("->")+"->"+n);o.add(n);let l=t(r,a||i);return o.delete(n),hh(n,l)&&(l=fh(s._scopes,s,n,l)),l}function dC(n,t,e,i){const{_proxy:s,_context:r,_subProxy:a,_descriptors:o}=e;if(typeof r.index<"u"&&i(n))return t[r.index%t.length];if(at(t[0])){const l=t,c=s._scopes.filter(d=>d!==l);t=[];for(const d of l){const h=fh(c,s,n,d);t.push(Ss(h,r,a&&a[n],o))}}return t}function wv(n,t,e){return Yn(n)?n(t,e):n}const hC=(n,t)=>n===!0?t:typeof n=="string"?Gn(t,n):void 0;function fC(n,t,e,i,s){for(const r of t){const a=hC(e,r);if(a){n.add(a);const o=wv(a._fallback,e,s);if(typeof o<"u"&&o!==e&&o!==i)return o}else if(a===!1&&typeof i<"u"&&e!==i)return null}return!1}function fh(n,t,e,i){const s=t._rootScopes,r=wv(t._fallback,e,i),a=[...n,...s],o=new Set;o.add(i);let l=Rg(o,a,e,r||e,i);return l===null||typeof r<"u"&&r!==e&&(l=Rg(o,a,r,l,i),l===null)?!1:dh(Array.from(o),[""],s,r,()=>pC(t,e,i))}function Rg(n,t,e,i,s){for(;e;)e=fC(n,t,e,i,s);return e}function pC(n,t,e){const i=n._getTarget();t in i||(i[t]={});const s=i[t];return kt(s)&&at(e)?e:s||{}}function gC(n,t,e,i){let s;for(const r of t)if(s=Iv(lC(r,n),e),typeof s<"u")return hh(n,s)?fh(e,i,n,s):s}function Iv(n,t){for(const e of t){if(!e)continue;const i=e[n];if(typeof i<"u")return i}}function Cg(n){let t=n._keys;return t||(t=n._keys=mC(n._scopes)),t}function mC(n){const t=new Set;for(const e of n)for(const i of Object.keys(e).filter(s=>!s.startsWith("_")))t.add(i);return Array.from(t)}function Tv(n,t,e,i){const{iScale:s}=n,{key:r="r"}=this._parsing,a=new Array(i);let o,l,c,d;for(o=0,l=i;o<l;++o)c=o+e,d=t[c],a[o]={r:s.parse(Gn(d,r),c)};return a}const yC=Number.EPSILON||1e-14,Ps=(n,t)=>t<n.length&&!n[t].skip&&n[t],Ev=n=>n==="x"?"y":"x";function _C(n,t,e,i){const s=n.skip?t:n,r=t,a=e.skip?t:e,o=ku(r,s),l=ku(a,r);let c=o/(o+l),d=l/(o+l);c=isNaN(c)?0:c,d=isNaN(d)?0:d;const h=i*c,f=i*d;return{previous:{x:r.x-h*(a.x-s.x),y:r.y-h*(a.y-s.y)},next:{x:r.x+f*(a.x-s.x),y:r.y+f*(a.y-s.y)}}}function bC(n,t,e){const i=n.length;let s,r,a,o,l,c=Ps(n,0);for(let d=0;d<i-1;++d)if(l=c,c=Ps(n,d+1),!(!l||!c)){if(Pr(t[d],0,yC)){e[d]=e[d+1]=0;continue}s=e[d]/t[d],r=e[d+1]/t[d],o=Math.pow(s,2)+Math.pow(r,2),!(o<=9)&&(a=3/Math.sqrt(o),e[d]=s*a*t[d],e[d+1]=r*a*t[d])}}function vC(n,t,e="x"){const i=Ev(e),s=n.length;let r,a,o,l=Ps(n,0);for(let c=0;c<s;++c){if(a=o,o=l,l=Ps(n,c+1),!o)continue;const d=o[e],h=o[i];a&&(r=(d-a[e])/3,o[`cp1${e}`]=d-r,o[`cp1${i}`]=h-r*t[c]),l&&(r=(l[e]-d)/3,o[`cp2${e}`]=d+r,o[`cp2${i}`]=h+r*t[c])}}function wC(n,t="x"){const e=Ev(t),i=n.length,s=Array(i).fill(0),r=Array(i);let a,o,l,c=Ps(n,0);for(a=0;a<i;++a)if(o=l,l=c,c=Ps(n,a+1),!!l){if(c){const d=c[t]-l[t];s[a]=d!==0?(c[e]-l[e])/d:0}r[a]=o?c?Ke(s[a-1])!==Ke(s[a])?0:(s[a-1]+s[a])/2:s[a-1]:s[a]}bC(n,s,r),vC(n,r,t)}function Za(n,t,e){return Math.max(Math.min(n,e),t)}function IC(n,t){let e,i,s,r,a,o=fn(n[0],t);for(e=0,i=n.length;e<i;++e)a=r,r=o,o=e<i-1&&fn(n[e+1],t),r&&(s=n[e],a&&(s.cp1x=Za(s.cp1x,t.left,t.right),s.cp1y=Za(s.cp1y,t.top,t.bottom)),o&&(s.cp2x=Za(s.cp2x,t.left,t.right),s.cp2y=Za(s.cp2y,t.top,t.bottom)))}function TC(n,t,e,i,s){let r,a,o,l;if(t.spanGaps&&(n=n.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")wC(n,s);else{let c=i?n[n.length-1]:n[0];for(r=0,a=n.length;r<a;++r)o=n[r],l=_C(c,o,n[Math.min(r+1,a-(i?0:1))%a],t.tension),o.cp1x=l.previous.x,o.cp1y=l.previous.y,o.cp2x=l.next.x,o.cp2y=l.next.y,c=o}t.capBezierPoints&&IC(n,e)}function ph(){return typeof window<"u"&&typeof document<"u"}function gh(n){let t=n.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function al(n,t,e){let i;return typeof n=="string"?(i=parseInt(n,10),n.indexOf("%")!==-1&&(i=i/100*t.parentNode[e])):i=n,i}const zl=n=>n.ownerDocument.defaultView.getComputedStyle(n,null);function EC(n,t){return zl(n).getPropertyValue(t)}const xC=["top","right","bottom","left"];function wi(n,t,e){const i={};e=e?"-"+e:"";for(let s=0;s<4;s++){const r=xC[s];i[r]=parseFloat(n[t+"-"+r+e])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}const kC=(n,t,e)=>(n>0||t>0)&&(!e||!e.shadowRoot);function AC(n,t){const e=n.touches,i=e&&e.length?e[0]:n,{offsetX:s,offsetY:r}=i;let a=!1,o,l;if(kC(s,r,n.target))o=s,l=r;else{const c=t.getBoundingClientRect();o=i.clientX-c.left,l=i.clientY-c.top,a=!0}return{x:o,y:l,box:a}}function di(n,t){if("native"in n)return n;const{canvas:e,currentDevicePixelRatio:i}=t,s=zl(e),r=s.boxSizing==="border-box",a=wi(s,"padding"),o=wi(s,"border","width"),{x:l,y:c,box:d}=AC(n,e),h=a.left+(d&&o.left),f=a.top+(d&&o.top);let{width:g,height:y}=t;return r&&(g-=a.width+o.width,y-=a.height+o.height),{x:Math.round((l-h)/g*e.width/i),y:Math.round((c-f)/y*e.height/i)}}function SC(n,t,e){let i,s;if(t===void 0||e===void 0){const r=n&&gh(n);if(!r)t=n.clientWidth,e=n.clientHeight;else{const a=r.getBoundingClientRect(),o=zl(r),l=wi(o,"border","width"),c=wi(o,"padding");t=a.width-c.width-l.width,e=a.height-c.height-l.height,i=al(o.maxWidth,r,"clientWidth"),s=al(o.maxHeight,r,"clientHeight")}}return{width:t,height:e,maxWidth:i||sl,maxHeight:s||sl}}const Fn=n=>Math.round(n*10)/10;function PC(n,t,e,i){const s=zl(n),r=wi(s,"margin"),a=al(s.maxWidth,n,"clientWidth")||sl,o=al(s.maxHeight,n,"clientHeight")||sl,l=SC(n,t,e);let{width:c,height:d}=l;if(s.boxSizing==="content-box"){const f=wi(s,"border","width"),g=wi(s,"padding");c-=g.width+f.width,d-=g.height+f.height}return c=Math.max(0,c-r.width),d=Math.max(0,i?c/i:d-r.height),c=Fn(Math.min(c,a,l.maxWidth)),d=Fn(Math.min(d,o,l.maxHeight)),c&&!d&&(d=Fn(c/2)),(t!==void 0||e!==void 0)&&i&&l.height&&d>l.height&&(d=l.height,c=Fn(Math.floor(d*i))),{width:c,height:d}}function Dg(n,t,e){const i=t||1,s=Fn(n.height*i),r=Fn(n.width*i);n.height=Fn(n.height),n.width=Fn(n.width);const a=n.canvas;return a.style&&(e||!a.style.height&&!a.style.width)&&(a.style.height=`${n.height}px`,a.style.width=`${n.width}px`),n.currentDevicePixelRatio!==i||a.height!==s||a.width!==r?(n.currentDevicePixelRatio=i,a.height=s,a.width=r,n.ctx.setTransform(i,0,0,i,0,0),!0):!1}const RC=function(){let n=!1;try{const t={get passive(){return n=!0,!1}};ph()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return n}();function Mg(n,t){const e=EC(n,t),i=e&&e.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}function hi(n,t,e,i){return{x:n.x+e*(t.x-n.x),y:n.y+e*(t.y-n.y)}}function CC(n,t,e,i){return{x:n.x+e*(t.x-n.x),y:i==="middle"?e<.5?n.y:t.y:i==="after"?e<1?n.y:t.y:e>0?t.y:n.y}}function DC(n,t,e,i){const s={x:n.cp2x,y:n.cp2y},r={x:t.cp1x,y:t.cp1y},a=hi(n,s,e),o=hi(s,r,e),l=hi(r,t,e),c=hi(a,o,e),d=hi(o,l,e);return hi(c,d,e)}const MC=function(n,t){return{x(e){return n+n+t-e},setWidth(e){t=e},textAlign(e){return e==="center"?e:e==="right"?"left":"right"},xPlus(e,i){return e-i},leftForLtr(e,i){return e-i}}},OC=function(){return{x(n){return n},setWidth(n){},textAlign(n){return n},xPlus(n,t){return n+t},leftForLtr(n,t){return n}}};function ms(n,t,e){return n?MC(t,e):OC()}function xv(n,t){let e,i;(t==="ltr"||t==="rtl")&&(e=n.canvas.style,i=[e.getPropertyValue("direction"),e.getPropertyPriority("direction")],e.setProperty("direction",t,"important"),n.prevTextDirection=i)}function kv(n,t){t!==void 0&&(delete n.prevTextDirection,n.canvas.style.setProperty("direction",t[0],t[1]))}function Av(n){return n==="angle"?{between:ta,compare:VR,normalize:se}:{between:dn,compare:(t,e)=>t-e,normalize:t=>t}}function Og({start:n,end:t,count:e,loop:i,style:s}){return{start:n%e,end:t%e,loop:i&&(t-n+1)%e===0,style:s}}function VC(n,t,e){const{property:i,start:s,end:r}=e,{between:a,normalize:o}=Av(i),l=t.length;let{start:c,end:d,loop:h}=n,f,g;if(h){for(c+=l,d+=l,f=0,g=l;f<g&&a(o(t[c%l][i]),s,r);++f)c--,d--;c%=l,d%=l}return d<c&&(d+=l),{start:c,end:d,loop:h,style:n.style}}function Sv(n,t,e){if(!e)return[n];const{property:i,start:s,end:r}=e,a=t.length,{compare:o,between:l,normalize:c}=Av(i),{start:d,end:h,loop:f,style:g}=VC(n,t,e),y=[];let v=!1,w=null,A,S,P;const D=()=>l(s,P,A)&&o(s,P)!==0,M=()=>o(r,A)===0||l(r,P,A),C=()=>v||D(),I=()=>!v||M();for(let _=d,b=d;_<=h;++_)S=t[_%a],!S.skip&&(A=c(S[i]),A!==P&&(v=l(A,s,r),w===null&&C()&&(w=o(A,s)===0?_:b),w!==null&&I()&&(y.push(Og({start:w,end:_,loop:f,count:a,style:g})),w=null),b=_,P=A));return w!==null&&y.push(Og({start:w,end:h,loop:f,count:a,style:g})),y}function Pv(n,t){const e=[],i=n.segments;for(let s=0;s<i.length;s++){const r=Sv(i[s],n.points,t);r.length&&e.push(...r)}return e}function NC(n,t,e,i){let s=0,r=t-1;if(e&&!i)for(;s<t&&!n[s].skip;)s++;for(;s<t&&n[s].skip;)s++;for(s%=t,e&&(r+=s);r>s&&n[r%t].skip;)r--;return r%=t,{start:s,end:r}}function LC(n,t,e,i){const s=n.length,r=[];let a=t,o=n[t],l;for(l=t+1;l<=e;++l){const c=n[l%s];c.skip||c.stop?o.skip||(i=!1,r.push({start:t%s,end:(l-1)%s,loop:i}),t=a=c.stop?l:null):(a=l,o.skip&&(t=l)),o=c}return a!==null&&r.push({start:t%s,end:a%s,loop:i}),r}function FC(n,t){const e=n.points,i=n.options.spanGaps,s=e.length;if(!s)return[];const r=!!n._loop,{start:a,end:o}=NC(e,s,r,i);if(i===!0)return Vg(n,[{start:a,end:o,loop:r}],e,t);const l=o<a?o+s:o,c=!!n._fullLoop&&a===0&&o===s-1;return Vg(n,LC(e,a,l,c),e,t)}function Vg(n,t,e,i){return!i||!i.setContext||!e?t:BC(n,t,e,i)}function BC(n,t,e,i){const s=n._chart.getContext(),r=Ng(n.options),{_datasetIndex:a,options:{spanGaps:o}}=n,l=e.length,c=[];let d=r,h=t[0].start,f=h;function g(y,v,w,A){const S=o?-1:1;if(y!==v){for(y+=l;e[y%l].skip;)y-=S;for(;e[v%l].skip;)v+=S;y%l!==v%l&&(c.push({start:y%l,end:v%l,loop:w,style:A}),d=A,h=v%l)}}for(const y of t){h=o?h:y.start;let v=e[h%l],w;for(f=h+1;f<=y.end;f++){const A=e[f%l];w=Ng(i.setContext(Zn(s,{type:"segment",p0:v,p1:A,p0DataIndex:(f-1)%l,p1DataIndex:f%l,datasetIndex:a}))),UC(w,d)&&g(h,f-1,y.loop,d),v=A,d=w}h<f-1&&g(h,f-1,y.loop,d)}return c}function Ng(n){return{backgroundColor:n.backgroundColor,borderCapStyle:n.borderCapStyle,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderJoinStyle:n.borderJoinStyle,borderWidth:n.borderWidth,borderColor:n.borderColor}}function UC(n,t){if(!t)return!1;const e=[],i=function(s,r){return ch(r)?(e.includes(r)||e.push(r),e.indexOf(r)):r};return JSON.stringify(n,i)!==JSON.stringify(t,i)}function to(n,t,e){return n.options.clip?n[e]:t[e]}function jC(n,t){const{xScale:e,yScale:i}=n;return e&&i?{left:to(e,t,"left"),right:to(e,t,"right"),top:to(i,t,"top"),bottom:to(i,t,"bottom")}:t}function Rv(n,t){const e=t._clip;if(e.disabled)return!1;const i=jC(t,n.chartArea);return{left:e.left===!1?0:i.left-(e.left===!0?0:e.left),right:e.right===!1?n.width:i.right+(e.right===!0?0:e.right),top:e.top===!1?0:i.top-(e.top===!0?0:e.top),bottom:e.bottom===!1?n.height:i.bottom+(e.bottom===!0?0:e.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class zC{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,e,i,s){const r=e.listeners[s],a=e.duration;r.forEach(o=>o({chart:t,initial:e.initial,numSteps:a,currentStep:Math.min(i-e.start,a)}))}_refresh(){this._request||(this._running=!0,this._request=hv.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let e=0;this._charts.forEach((i,s)=>{if(!i.running||!i.items.length)return;const r=i.items;let a=r.length-1,o=!1,l;for(;a>=0;--a)l=r[a],l._active?(l._total>i.duration&&(i.duration=l._total),l.tick(t),o=!0):(r[a]=r[r.length-1],r.pop());o&&(s.draw(),this._notify(s,i,t,"progress")),r.length||(i.running=!1,this._notify(s,i,t,"complete"),i.initial=!1),e+=r.length}),this._lastDate=t,e===0&&(this._running=!1)}_getAnims(t){const e=this._charts;let i=e.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},e.set(t,i)),i}listen(t,e,i){this._getAnims(t).listeners[e].push(i)}add(t,e){!e||!e.length||this._getAnims(t).items.push(...e)}has(t){return this._getAnims(t).items.length>0}start(t){const e=this._charts.get(t);e&&(e.running=!0,e.start=Date.now(),e.duration=e.items.reduce((i,s)=>Math.max(i,s._duration),0),this._refresh())}running(t){if(!this._running)return!1;const e=this._charts.get(t);return!(!e||!e.running||!e.items.length)}stop(t){const e=this._charts.get(t);if(!e||!e.items.length)return;const i=e.items;let s=i.length-1;for(;s>=0;--s)i[s].cancel();e.items=[],this._notify(t,e,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var en=new zC;const Lg="transparent",$C={boolean(n,t,e){return e>.5?t:n},color(n,t,e){const i=Ag(n||Lg),s=i.valid&&Ag(t||Lg);return s&&s.valid?s.mix(i,e).hexString():t},number(n,t,e){return n+(t-n)*e}};class HC{constructor(t,e,i,s){const r=e[i];s=mr([t.to,s,r,t.from]);const a=mr([t.from,r,s]);this._active=!0,this._fn=t.fn||$C[t.type||typeof a],this._easing=Rr[t.easing]||Rr.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=e,this._prop=i,this._from=a,this._to=s,this._promises=void 0}active(){return this._active}update(t,e,i){if(this._active){this._notify(!1);const s=this._target[this._prop],r=i-this._start,a=this._duration-r;this._start=i,this._duration=Math.floor(Math.max(a,t.duration)),this._total+=r,this._loop=!!t.loop,this._to=mr([t.to,e,s,t.from]),this._from=mr([t.from,s,e])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const e=t-this._start,i=this._duration,s=this._prop,r=this._from,a=this._loop,o=this._to;let l;if(this._active=r!==o&&(a||e<i),!this._active){this._target[s]=o,this._notify(!0);return}if(e<0){this._target[s]=r;return}l=e/i%2,l=a&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[s]=this._fn(r,o,l)}wait(){const t=this._promises||(this._promises=[]);return new Promise((e,i)=>{t.push({res:e,rej:i})})}_notify(t){const e=t?"res":"rej",i=this._promises||[];for(let s=0;s<i.length;s++)i[s][e]()}}class Cv{constructor(t,e){this._chart=t,this._properties=new Map,this.configure(e)}configure(t){if(!at(t))return;const e=Object.keys(At.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach(s=>{const r=t[s];if(!at(r))return;const a={};for(const o of e)a[o]=r[o];(kt(r.properties)&&r.properties||[s]).forEach(o=>{(o===s||!i.has(o))&&i.set(o,a)})})}_animateOptions(t,e){const i=e.options,s=WC(t,i);if(!s)return[];const r=this._createAnimations(s,i);return i.$shared&&qC(t.options.$animations,i).then(()=>{t.options=i},()=>{}),r}_createAnimations(t,e){const i=this._properties,s=[],r=t.$animations||(t.$animations={}),a=Object.keys(e),o=Date.now();let l;for(l=a.length-1;l>=0;--l){const c=a[l];if(c.charAt(0)==="$")continue;if(c==="options"){s.push(...this._animateOptions(t,e));continue}const d=e[c];let h=r[c];const f=i.get(c);if(h)if(f&&h.active()){h.update(f,d,o);continue}else h.cancel();if(!f||!f.duration){t[c]=d;continue}r[c]=h=new HC(f,t,c,d),s.push(h)}return s}update(t,e){if(this._properties.size===0){Object.assign(t,e);return}const i=this._createAnimations(t,e);if(i.length)return en.add(this._chart,i),!0}}function qC(n,t){const e=[],i=Object.keys(t);for(let s=0;s<i.length;s++){const r=n[i[s]];r&&r.active()&&e.push(r.wait())}return Promise.all(e)}function WC(n,t){if(!t)return;let e=n.options;if(!e){n.options=t;return}return e.$shared&&(n.options=e=Object.assign({},e,{$shared:!1,$animations:{}})),e}function Fg(n,t){const e=n&&n.options||{},i=e.reverse,s=e.min===void 0?t:0,r=e.max===void 0?t:0;return{start:i?r:s,end:i?s:r}}function KC(n,t,e){if(e===!1)return!1;const i=Fg(n,e),s=Fg(t,e);return{top:s.end,right:i.end,bottom:s.start,left:i.start}}function GC(n){let t,e,i,s;return at(n)?(t=n.top,e=n.right,i=n.bottom,s=n.left):t=e=i=s=n,{top:t,right:e,bottom:i,left:s,disabled:n===!1}}function Dv(n,t){const e=[],i=n._getSortedDatasetMetas(t);let s,r;for(s=0,r=i.length;s<r;++s)e.push(i[s].index);return e}function Bg(n,t,e,i={}){const s=n.keys,r=i.mode==="single";let a,o,l,c;if(t===null)return;let d=!1;for(a=0,o=s.length;a<o;++a){if(l=+s[a],l===e){if(d=!0,i.all)continue;break}c=n.values[l],Mt(c)&&(r||t===0||Ke(t)===Ke(c))&&(t+=c)}return!d&&!i.all?0:t}function YC(n,t){const{iScale:e,vScale:i}=t,s=e.axis==="x"?"x":"y",r=i.axis==="x"?"x":"y",a=Object.keys(n),o=new Array(a.length);let l,c,d;for(l=0,c=a.length;l<c;++l)d=a[l],o[l]={[s]:d,[r]:n[d]};return o}function Vc(n,t){const e=n&&n.options.stacked;return e||e===void 0&&t.stack!==void 0}function QC(n,t,e){return`${n.id}.${t.id}.${e.stack||e.type}`}function JC(n){const{min:t,max:e,minDefined:i,maxDefined:s}=n.getUserBounds();return{min:i?t:Number.NEGATIVE_INFINITY,max:s?e:Number.POSITIVE_INFINITY}}function XC(n,t,e){const i=n[t]||(n[t]={});return i[e]||(i[e]={})}function Ug(n,t,e,i){for(const s of t.getMatchingVisibleMetas(i).reverse()){const r=n[s.index];if(e&&r>0||!e&&r<0)return s.index}return null}function jg(n,t){const{chart:e,_cachedMeta:i}=n,s=e._stacks||(e._stacks={}),{iScale:r,vScale:a,index:o}=i,l=r.axis,c=a.axis,d=QC(r,a,i),h=t.length;let f;for(let g=0;g<h;++g){const y=t[g],{[l]:v,[c]:w}=y,A=y._stacks||(y._stacks={});f=A[c]=XC(s,d,v),f[o]=w,f._top=Ug(f,a,!0,i.type),f._bottom=Ug(f,a,!1,i.type);const S=f._visualValues||(f._visualValues={});S[o]=w}}function Nc(n,t){const e=n.scales;return Object.keys(e).filter(i=>e[i].axis===t).shift()}function ZC(n,t){return Zn(n,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function tD(n,t,e){return Zn(n,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:e,index:t,mode:"default",type:"data"})}function sr(n,t){const e=n.controller.index,i=n.vScale&&n.vScale.axis;if(i){t=t||n._parsed;for(const s of t){const r=s._stacks;if(!r||r[i]===void 0||r[i][e]===void 0)return;delete r[i][e],r[i]._visualValues!==void 0&&r[i]._visualValues[e]!==void 0&&delete r[i]._visualValues[e]}}}const Lc=n=>n==="reset"||n==="none",zg=(n,t)=>t?n:Object.assign({},n),eD=(n,t,e)=>n&&!t.hidden&&t._stacked&&{keys:Dv(e,!0),values:null};class Ve{constructor(t,e){this.chart=t,this._ctx=t.ctx,this.index=e,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=Vc(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&sr(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,e=this._cachedMeta,i=this.getDataset(),s=(h,f,g,y)=>h==="x"?f:h==="r"?y:g,r=e.xAxisID=Z(i.xAxisID,Nc(t,"x")),a=e.yAxisID=Z(i.yAxisID,Nc(t,"y")),o=e.rAxisID=Z(i.rAxisID,Nc(t,"r")),l=e.indexAxis,c=e.iAxisID=s(l,r,a,o),d=e.vAxisID=s(l,a,r,o);e.xScale=this.getScaleForId(r),e.yScale=this.getScaleForId(a),e.rScale=this.getScaleForId(o),e.iScale=this.getScaleForId(c),e.vScale=this.getScaleForId(d)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const e=this._cachedMeta;return t===e.iScale?e.vScale:e.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&Eg(this._data,this),t._stacked&&sr(t)}_dataCheck(){const t=this.getDataset(),e=t.data||(t.data=[]),i=this._data;if(at(e)){const s=this._cachedMeta;this._data=YC(e,s)}else if(i!==e){if(i){Eg(i,this);const s=this._cachedMeta;sr(s),s._parsed=[]}e&&Object.isExtensible(e)&&BR(e,this),this._syncList=[],this._data=e}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const e=this._cachedMeta,i=this.getDataset();let s=!1;this._dataCheck();const r=e._stacked;e._stacked=Vc(e.vScale,e),e.stack!==i.stack&&(s=!0,sr(e),e.stack=i.stack),this._resyncElements(t),(s||r!==e._stacked)&&(jg(this,e._parsed),e._stacked=Vc(e.vScale,e))}configure(){const t=this.chart.config,e=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),e,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,e){const{_cachedMeta:i,_data:s}=this,{iScale:r,_stacked:a}=i,o=r.axis;let l=t===0&&e===s.length?!0:i._sorted,c=t>0&&i._parsed[t-1],d,h,f;if(this._parsing===!1)i._parsed=s,i._sorted=!0,f=s;else{kt(s[t])?f=this.parseArrayData(i,s,t,e):at(s[t])?f=this.parseObjectData(i,s,t,e):f=this.parsePrimitiveData(i,s,t,e);const g=()=>h[o]===null||c&&h[o]<c[o];for(d=0;d<e;++d)i._parsed[d+t]=h=f[d],l&&(g()&&(l=!1),c=h);i._sorted=l}a&&jg(this,f)}parsePrimitiveData(t,e,i,s){const{iScale:r,vScale:a}=t,o=r.axis,l=a.axis,c=r.getLabels(),d=r===a,h=new Array(s);let f,g,y;for(f=0,g=s;f<g;++f)y=f+i,h[f]={[o]:d||r.parse(c[y],y),[l]:a.parse(e[y],y)};return h}parseArrayData(t,e,i,s){const{xScale:r,yScale:a}=t,o=new Array(s);let l,c,d,h;for(l=0,c=s;l<c;++l)d=l+i,h=e[d],o[l]={x:r.parse(h[0],d),y:a.parse(h[1],d)};return o}parseObjectData(t,e,i,s){const{xScale:r,yScale:a}=t,{xAxisKey:o="x",yAxisKey:l="y"}=this._parsing,c=new Array(s);let d,h,f,g;for(d=0,h=s;d<h;++d)f=d+i,g=e[f],c[d]={x:r.parse(Gn(g,o),f),y:a.parse(Gn(g,l),f)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,e,i){const s=this.chart,r=this._cachedMeta,a=e[t.axis],o={keys:Dv(s,!0),values:e._stacks[t.axis]._visualValues};return Bg(o,a,r.index,{mode:i})}updateRangeFromParsed(t,e,i,s){const r=i[e.axis];let a=r===null?NaN:r;const o=s&&i._stacks[e.axis];s&&o&&(s.values=o,a=Bg(s,r,this._cachedMeta.index)),t.min=Math.min(t.min,a),t.max=Math.max(t.max,a)}getMinMax(t,e){const i=this._cachedMeta,s=i._parsed,r=i._sorted&&t===i.iScale,a=s.length,o=this._getOtherScale(t),l=eD(e,i,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:d,max:h}=JC(o);let f,g;function y(){g=s[f];const v=g[o.axis];return!Mt(g[t.axis])||d>v||h<v}for(f=0;f<a&&!(!y()&&(this.updateRangeFromParsed(c,t,g,l),r));++f);if(r){for(f=a-1;f>=0;--f)if(!y()){this.updateRangeFromParsed(c,t,g,l);break}}return c}getAllParsedValues(t){const e=this._cachedMeta._parsed,i=[];let s,r,a;for(s=0,r=e.length;s<r;++s)a=e[s][t.axis],Mt(a)&&i.push(a);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const e=this._cachedMeta,i=e.iScale,s=e.vScale,r=this.getParsed(t);return{label:i?""+i.getLabelForValue(r[i.axis]):"",value:s?""+s.getLabelForValue(r[s.axis]):""}}_update(t){const e=this._cachedMeta;this.update(t||"default"),e._clip=GC(Z(this.options.clip,KC(e.xScale,e.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,e=this.chart,i=this._cachedMeta,s=i.data||[],r=e.chartArea,a=[],o=this._drawStart||0,l=this._drawCount||s.length-o,c=this.options.drawActiveElementsOnTop;let d;for(i.dataset&&i.dataset.draw(t,r,o,l),d=o;d<o+l;++d){const h=s[d];h.hidden||(h.active&&c?a.push(h):h.draw(t,r))}for(d=0;d<a.length;++d)a[d].draw(t,r)}getStyle(t,e){const i=e?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,e,i){const s=this.getDataset();let r;if(t>=0&&t<this._cachedMeta.data.length){const a=this._cachedMeta.data[t];r=a.$context||(a.$context=tD(this.getContext(),t,a)),r.parsed=this.getParsed(t),r.raw=s.data[t],r.index=r.dataIndex=t}else r=this.$context||(this.$context=ZC(this.chart.getContext(),this.index)),r.dataset=s,r.index=r.datasetIndex=this.index;return r.active=!!e,r.mode=i,r}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,e){return this._resolveElementOptions(this.dataElementType.id,e,t)}_resolveElementOptions(t,e="default",i){const s=e==="active",r=this._cachedDataOpts,a=t+"-"+e,o=r[a],l=this.enableOptionSharing&&Zr(i);if(o)return zg(o,l);const c=this.chart.config,d=c.datasetElementScopeKeys(this._type,t),h=s?[`${t}Hover`,"hover",t,""]:[t,""],f=c.getOptionScopes(this.getDataset(),d),g=Object.keys(At.elements[t]),y=()=>this.getContext(i,s,e),v=c.resolveNamedOptions(f,g,y,h);return v.$shared&&(v.$shared=l,r[a]=Object.freeze(zg(v,l))),v}_resolveAnimations(t,e,i){const s=this.chart,r=this._cachedDataOpts,a=`animation-${e}`,o=r[a];if(o)return o;let l;if(s.options.animation!==!1){const d=this.chart.config,h=d.datasetAnimationScopeKeys(this._type,e),f=d.getOptionScopes(this.getDataset(),h);l=d.createResolver(f,this.getContext(t,i,e))}const c=new Cv(s,l&&l.animations);return l&&l._cacheable&&(r[a]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,e){return!e||Lc(t)||this.chart._animationsDisabled}_getSharedOptions(t,e){const i=this.resolveDataElementOptions(t,e),s=this._sharedOptions,r=this.getSharedOptions(i),a=this.includeOptions(e,r)||r!==s;return this.updateSharedOptions(r,e,i),{sharedOptions:r,includeOptions:a}}updateElement(t,e,i,s){Lc(s)?Object.assign(t,i):this._resolveAnimations(e,s).update(t,i)}updateSharedOptions(t,e,i){t&&!Lc(e)&&this._resolveAnimations(void 0,e).update(t,i)}_setStyle(t,e,i,s){t.active=s;const r=this.getStyle(e,s);this._resolveAnimations(e,i,s).update(t,{options:!s&&this.getSharedOptions(r)||r})}removeHoverStyle(t,e,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,e,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const e=this._data,i=this._cachedMeta.data;for(const[o,l,c]of this._syncList)this[o](l,c);this._syncList=[];const s=i.length,r=e.length,a=Math.min(r,s);a&&this.parse(0,a),r>s?this._insertElements(s,r-s,t):r<s&&this._removeElements(r,s-r)}_insertElements(t,e,i=!0){const s=this._cachedMeta,r=s.data,a=t+e;let o;const l=c=>{for(c.length+=e,o=c.length-1;o>=a;o--)c[o]=c[o-e]};for(l(r),o=t;o<a;++o)r[o]=new this.dataElementType;this._parsing&&l(s._parsed),this.parse(t,e),i&&this.updateElements(r,t,e,"reset")}updateElements(t,e,i,s){}_removeElements(t,e){const i=this._cachedMeta;if(this._parsing){const s=i._parsed.splice(t,e);i._stacked&&sr(i,s)}i.data.splice(t,e)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[e,i,s]=t;this[e](i,s)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,e){e&&this._sync(["_removeElements",t,e]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}j(Ve,"defaults",{}),j(Ve,"datasetElementType",null),j(Ve,"dataElementType",null);function nD(n,t){if(!n._cache.$bar){const e=n.getMatchingVisibleMetas(t);let i=[];for(let s=0,r=e.length;s<r;s++)i=i.concat(e[s].controller.getAllParsedValues(n));n._cache.$bar=dv(i.sort((s,r)=>s-r))}return n._cache.$bar}function iD(n){const t=n.iScale,e=nD(t,n.type);let i=t._length,s,r,a,o;const l=()=>{a===32767||a===-32768||(Zr(o)&&(i=Math.min(i,Math.abs(a-o)||i)),o=a)};for(s=0,r=e.length;s<r;++s)a=t.getPixelForValue(e[s]),l();for(o=void 0,s=0,r=t.ticks.length;s<r;++s)a=t.getPixelForTick(s),l();return i}function sD(n,t,e,i){const s=e.barThickness;let r,a;return nt(s)?(r=t.min*e.categoryPercentage,a=e.barPercentage):(r=s*i,a=1),{chunk:r/i,ratio:a,start:t.pixels[n]-r/2}}function rD(n,t,e,i){const s=t.pixels,r=s[n];let a=n>0?s[n-1]:null,o=n<s.length-1?s[n+1]:null;const l=e.categoryPercentage;a===null&&(a=r-(o===null?t.end-t.start:o-r)),o===null&&(o=r+r-a);const c=r-(r-Math.min(a,o))/2*l;return{chunk:Math.abs(o-a)/2*l/i,ratio:e.barPercentage,start:c}}function aD(n,t,e,i){const s=e.parse(n[0],i),r=e.parse(n[1],i),a=Math.min(s,r),o=Math.max(s,r);let l=a,c=o;Math.abs(a)>Math.abs(o)&&(l=o,c=a),t[e.axis]=c,t._custom={barStart:l,barEnd:c,start:s,end:r,min:a,max:o}}function Mv(n,t,e,i){return kt(n)?aD(n,t,e,i):t[e.axis]=e.parse(n,i),t}function $g(n,t,e,i){const s=n.iScale,r=n.vScale,a=s.getLabels(),o=s===r,l=[];let c,d,h,f;for(c=e,d=e+i;c<d;++c)f=t[c],h={},h[s.axis]=o||s.parse(a[c],c),l.push(Mv(f,h,r,c));return l}function Fc(n){return n&&n.barStart!==void 0&&n.barEnd!==void 0}function oD(n,t,e){return n!==0?Ke(n):(t.isHorizontal()?1:-1)*(t.min>=e?1:-1)}function lD(n){let t,e,i,s,r;return n.horizontal?(t=n.base>n.x,e="left",i="right"):(t=n.base<n.y,e="bottom",i="top"),t?(s="end",r="start"):(s="start",r="end"),{start:e,end:i,reverse:t,top:s,bottom:r}}function cD(n,t,e,i){let s=t.borderSkipped;const r={};if(!s){n.borderSkipped=r;return}if(s===!0){n.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:a,end:o,reverse:l,top:c,bottom:d}=lD(n);s==="middle"&&e&&(n.enableBorderRadius=!0,(e._top||0)===i?s=c:(e._bottom||0)===i?s=d:(r[Hg(d,a,o,l)]=!0,s=c)),r[Hg(s,a,o,l)]=!0,n.borderSkipped=r}function Hg(n,t,e,i){return i?(n=uD(n,t,e),n=qg(n,e,t)):n=qg(n,t,e),n}function uD(n,t,e){return n===t?e:n===e?t:n}function qg(n,t,e){return n==="start"?t:n==="end"?e:n}function dD(n,{inflateAmount:t},e){n.inflateAmount=t==="auto"?e===1?.33:0:t}class To extends Ve{parsePrimitiveData(t,e,i,s){return $g(t,e,i,s)}parseArrayData(t,e,i,s){return $g(t,e,i,s)}parseObjectData(t,e,i,s){const{iScale:r,vScale:a}=t,{xAxisKey:o="x",yAxisKey:l="y"}=this._parsing,c=r.axis==="x"?o:l,d=a.axis==="x"?o:l,h=[];let f,g,y,v;for(f=i,g=i+s;f<g;++f)v=e[f],y={},y[r.axis]=r.parse(Gn(v,c),f),h.push(Mv(Gn(v,d),y,a,f));return h}updateRangeFromParsed(t,e,i,s){super.updateRangeFromParsed(t,e,i,s);const r=i._custom;r&&e===this._cachedMeta.vScale&&(t.min=Math.min(t.min,r.min),t.max=Math.max(t.max,r.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const e=this._cachedMeta,{iScale:i,vScale:s}=e,r=this.getParsed(t),a=r._custom,o=Fc(a)?"["+a.start+", "+a.end+"]":""+s.getLabelForValue(r[s.axis]);return{label:""+i.getLabelForValue(r[i.axis]),value:o}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const e=this._cachedMeta;this.updateElements(e.data,0,e.data.length,t)}updateElements(t,e,i,s){const r=s==="reset",{index:a,_cachedMeta:{vScale:o}}=this,l=o.getBasePixel(),c=o.isHorizontal(),d=this._getRuler(),{sharedOptions:h,includeOptions:f}=this._getSharedOptions(e,s);for(let g=e;g<e+i;g++){const y=this.getParsed(g),v=r||nt(y[o.axis])?{base:l,head:l}:this._calculateBarValuePixels(g),w=this._calculateBarIndexPixels(g,d),A=(y._stacks||{})[o.axis],S={horizontal:c,base:v.base,enableBorderRadius:!A||Fc(y._custom)||a===A._top||a===A._bottom,x:c?v.head:w.center,y:c?w.center:v.head,height:c?w.size:Math.abs(v.size),width:c?Math.abs(v.size):w.size};f&&(S.options=h||this.resolveDataElementOptions(g,t[g].active?"active":s));const P=S.options||t[g].options;cD(S,P,A,a),dD(S,P,d.ratio),this.updateElement(t[g],g,S,s)}}_getStacks(t,e){const{iScale:i}=this._cachedMeta,s=i.getMatchingVisibleMetas(this._type).filter(d=>d.controller.options.grouped),r=i.options.stacked,a=[],o=this._cachedMeta.controller.getParsed(e),l=o&&o[i.axis],c=d=>{const h=d._parsed.find(g=>g[i.axis]===l),f=h&&h[d.vScale.axis];if(nt(f)||isNaN(f))return!0};for(const d of s)if(!(e!==void 0&&c(d))&&((r===!1||a.indexOf(d.stack)===-1||r===void 0&&d.stack===void 0)&&a.push(d.stack),d.index===t))break;return a.length||a.push(void 0),a}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,e=this.chart.options.indexAxis;return Object.keys(t).filter(i=>t[i].axis===e).shift()}_getAxis(){const t={},e=this.getFirstScaleIdForIndexAxis();for(const i of this.chart.data.datasets)t[Z(this.chart.options.indexAxis==="x"?i.xAxisID:i.yAxisID,e)]=!0;return Object.keys(t)}_getStackIndex(t,e,i){const s=this._getStacks(t,i),r=e!==void 0?s.indexOf(e):-1;return r===-1?s.length-1:r}_getRuler(){const t=this.options,e=this._cachedMeta,i=e.iScale,s=[];let r,a;for(r=0,a=e.data.length;r<a;++r)s.push(i.getPixelForValue(this.getParsed(r)[i.axis],r));const o=t.barThickness;return{min:o||iD(e),pixels:s,start:i._startPixel,end:i._endPixel,stackCount:this._getStackCount(),scale:i,grouped:t.grouped,ratio:o?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:e,_stacked:i,index:s},options:{base:r,minBarLength:a}}=this,o=r||0,l=this.getParsed(t),c=l._custom,d=Fc(c);let h=l[e.axis],f=0,g=i?this.applyStack(e,l,i):h,y,v;g!==h&&(f=g-h,g=h),d&&(h=c.barStart,g=c.barEnd-c.barStart,h!==0&&Ke(h)!==Ke(c.barEnd)&&(f=0),f+=h);const w=!nt(r)&&!d?r:f;let A=e.getPixelForValue(w);if(this.chart.getDataVisibility(t)?y=e.getPixelForValue(f+g):y=A,v=y-A,Math.abs(v)<a){v=oD(v,e,o)*a,h===o&&(A-=v/2);const S=e.getPixelForDecimal(0),P=e.getPixelForDecimal(1),D=Math.min(S,P),M=Math.max(S,P);A=Math.max(Math.min(A,M),D),y=A+v,i&&!d&&(l._stacks[e.axis]._visualValues[s]=e.getValueForPixel(y)-e.getValueForPixel(A))}if(A===e.getPixelForValue(o)){const S=Ke(v)*e.getLineWidthForValue(o)/2;A+=S,v-=S}return{size:v,base:A,head:y,center:y+v/2}}_calculateBarIndexPixels(t,e){const i=e.scale,s=this.options,r=s.skipNull,a=Z(s.maxBarThickness,1/0);let o,l;const c=this._getAxisCount();if(e.grouped){const d=r?this._getStackCount(t):e.stackCount,h=s.barThickness==="flex"?rD(t,e,s,d*c):sD(t,e,s,d*c),f=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,g=this._getAxis().indexOf(Z(f,this.getFirstScaleIdForIndexAxis())),y=this._getStackIndex(this.index,this._cachedMeta.stack,r?t:void 0)+g;o=h.start+h.chunk*y+h.chunk/2,l=Math.min(a,h.chunk*h.ratio)}else o=i.getPixelForValue(this.getParsed(t)[i.axis],t),l=Math.min(a,e.min*e.ratio);return{base:o-l/2,head:o+l/2,center:o,size:l}}draw(){const t=this._cachedMeta,e=t.vScale,i=t.data,s=i.length;let r=0;for(;r<s;++r)this.getParsed(r)[e.axis]!==null&&!i[r].hidden&&i[r].draw(this._ctx)}}j(To,"id","bar"),j(To,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),j(To,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});class Eo extends Ve{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,e,i,s){const r=super.parsePrimitiveData(t,e,i,s);for(let a=0;a<r.length;a++)r[a]._custom=this.resolveDataElementOptions(a+i).radius;return r}parseArrayData(t,e,i,s){const r=super.parseArrayData(t,e,i,s);for(let a=0;a<r.length;a++){const o=e[i+a];r[a]._custom=Z(o[2],this.resolveDataElementOptions(a+i).radius)}return r}parseObjectData(t,e,i,s){const r=super.parseObjectData(t,e,i,s);for(let a=0;a<r.length;a++){const o=e[i+a];r[a]._custom=Z(o&&o.r&&+o.r,this.resolveDataElementOptions(a+i).radius)}return r}getMaxOverflow(){const t=this._cachedMeta.data;let e=0;for(let i=t.length-1;i>=0;--i)e=Math.max(e,t[i].size(this.resolveDataElementOptions(i))/2);return e>0&&e}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:r}=e,a=this.getParsed(t),o=s.getLabelForValue(a.x),l=r.getLabelForValue(a.y),c=a._custom;return{label:i[t]||"",value:"("+o+", "+l+(c?", "+c:"")+")"}}update(t){const e=this._cachedMeta.data;this.updateElements(e,0,e.length,t)}updateElements(t,e,i,s){const r=s==="reset",{iScale:a,vScale:o}=this._cachedMeta,{sharedOptions:l,includeOptions:c}=this._getSharedOptions(e,s),d=a.axis,h=o.axis;for(let f=e;f<e+i;f++){const g=t[f],y=!r&&this.getParsed(f),v={},w=v[d]=r?a.getPixelForDecimal(.5):a.getPixelForValue(y[d]),A=v[h]=r?o.getBasePixel():o.getPixelForValue(y[h]);v.skip=isNaN(w)||isNaN(A),c&&(v.options=l||this.resolveDataElementOptions(f,g.active?"active":s),r&&(v.options.radius=0)),this.updateElement(g,f,v,s)}}resolveDataElementOptions(t,e){const i=this.getParsed(t);let s=super.resolveDataElementOptions(t,e);s.$shared&&(s=Object.assign({},s,{$shared:!1}));const r=s.radius;return e!=="active"&&(s.radius=0),s.radius+=Z(i&&i._custom,r),s}}j(Eo,"id","bubble"),j(Eo,"defaults",{datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}}),j(Eo,"overrides",{scales:{x:{type:"linear"},y:{type:"linear"}}});function hD(n,t,e){let i=1,s=1,r=0,a=0;if(t<It){const o=n,l=o+t,c=Math.cos(o),d=Math.sin(o),h=Math.cos(l),f=Math.sin(l),g=(P,D,M)=>ta(P,o,l,!0)?1:Math.max(D,D*e,M,M*e),y=(P,D,M)=>ta(P,o,l,!0)?-1:Math.min(D,D*e,M,M*e),v=g(0,c,h),w=g(Vt,d,f),A=y(ht,c,h),S=y(ht+Vt,d,f);i=(v-A)/2,s=(w-S)/2,r=-(v+A)/2,a=-(w+S)/2}return{ratioX:i,ratioY:s,offsetX:r,offsetY:a}}class _i extends Ve{constructor(t,e){super(t,e),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,e){const i=this.getDataset().data,s=this._cachedMeta;if(this._parsing===!1)s._parsed=i;else{let r=l=>+i[l];if(at(i[t])){const{key:l="value"}=this._parsing;r=c=>+Gn(i[c],l)}let a,o;for(a=t,o=t+e;a<o;++a)s._parsed[a]=r(a)}}_getRotation(){return De(this.options.rotation-90)}_getCircumference(){return De(this.options.circumference)}_getRotationExtents(){let t=It,e=-It;for(let i=0;i<this.chart.data.datasets.length;++i)if(this.chart.isDatasetVisible(i)&&this.chart.getDatasetMeta(i).type===this._type){const s=this.chart.getDatasetMeta(i).controller,r=s._getRotation(),a=s._getCircumference();t=Math.min(t,r),e=Math.max(e,r+a)}return{rotation:t,circumference:e-t}}update(t){const e=this.chart,{chartArea:i}=e,s=this._cachedMeta,r=s.data,a=this.getMaxBorderWidth()+this.getMaxOffset(r)+this.options.spacing,o=Math.max((Math.min(i.width,i.height)-a)/2,0),l=Math.min(ER(this.options.cutout,o),1),c=this._getRingWeight(this.index),{circumference:d,rotation:h}=this._getRotationExtents(),{ratioX:f,ratioY:g,offsetX:y,offsetY:v}=hD(h,d,l),w=(i.width-a)/f,A=(i.height-a)/g,S=Math.max(Math.min(w,A)/2,0),P=av(this.options.radius,S),D=Math.max(P*l,0),M=(P-D)/this._getVisibleDatasetWeightTotal();this.offsetX=y*P,this.offsetY=v*P,s.total=this.calculateTotal(),this.outerRadius=P-M*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-M*c,0),this.updateElements(r,0,r.length,t)}_circumference(t,e){const i=this.options,s=this._cachedMeta,r=this._getCircumference();return e&&i.animation.animateRotate||!this.chart.getDataVisibility(t)||s._parsed[t]===null||s.data[t].hidden?0:this.calculateCircumference(s._parsed[t]*r/It)}updateElements(t,e,i,s){const r=s==="reset",a=this.chart,o=a.chartArea,c=a.options.animation,d=(o.left+o.right)/2,h=(o.top+o.bottom)/2,f=r&&c.animateScale,g=f?0:this.innerRadius,y=f?0:this.outerRadius,{sharedOptions:v,includeOptions:w}=this._getSharedOptions(e,s);let A=this._getRotation(),S;for(S=0;S<e;++S)A+=this._circumference(S,r);for(S=e;S<e+i;++S){const P=this._circumference(S,r),D=t[S],M={x:d+this.offsetX,y:h+this.offsetY,startAngle:A,endAngle:A+P,circumference:P,outerRadius:y,innerRadius:g};w&&(M.options=v||this.resolveDataElementOptions(S,D.active?"active":s)),A+=P,this.updateElement(D,S,M,s)}}calculateTotal(){const t=this._cachedMeta,e=t.data;let i=0,s;for(s=0;s<e.length;s++){const r=t._parsed[s];r!==null&&!isNaN(r)&&this.chart.getDataVisibility(s)&&!e[s].hidden&&(i+=Math.abs(r))}return i}calculateCircumference(t){const e=this._cachedMeta.total;return e>0&&!isNaN(t)?It*(Math.abs(t)/e):0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,s=i.data.labels||[],r=Ia(e._parsed[t],i.options.locale);return{label:s[t]||"",value:r}}getMaxBorderWidth(t){let e=0;const i=this.chart;let s,r,a,o,l;if(!t){for(s=0,r=i.data.datasets.length;s<r;++s)if(i.isDatasetVisible(s)){a=i.getDatasetMeta(s),t=a.data,o=a.controller;break}}if(!t)return 0;for(s=0,r=t.length;s<r;++s)l=o.resolveDataElementOptions(s),l.borderAlign!=="inner"&&(e=Math.max(e,l.borderWidth||0,l.hoverBorderWidth||0));return e}getMaxOffset(t){let e=0;for(let i=0,s=t.length;i<s;++i){const r=this.resolveDataElementOptions(i);e=Math.max(e,r.offset||0,r.hoverOffset||0)}return e}_getRingWeightOffset(t){let e=0;for(let i=0;i<t;++i)this.chart.isDatasetVisible(i)&&(e+=this._getRingWeight(i));return e}_getRingWeight(t){return Math.max(Z(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}j(_i,"id","doughnut"),j(_i,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),j(_i,"descriptors",{_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")}),j(_i,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data,{labels:{pointStyle:i,textAlign:s,color:r,useBorderRadius:a,borderRadius:o}}=t.legend.options;return e.labels.length&&e.datasets.length?e.labels.map((l,c)=>{const h=t.getDatasetMeta(0).controller.getStyle(c);return{text:l,fillStyle:h.backgroundColor,fontColor:r,hidden:!t.getDataVisibility(c),lineDash:h.borderDash,lineDashOffset:h.borderDashOffset,lineJoin:h.borderJoinStyle,lineWidth:h.borderWidth,strokeStyle:h.borderColor,textAlign:s,pointStyle:i,borderRadius:a&&(o||h.borderRadius),index:c}}):[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}}});class xo extends Ve{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const e=this._cachedMeta,{dataset:i,data:s=[],_dataset:r}=e,a=this.chart._animationsDisabled;let{start:o,count:l}=pv(e,s,a);this._drawStart=o,this._drawCount=l,gv(e)&&(o=0,l=s.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!r._decimated,i.points=s;const c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(i,void 0,{animated:!a,options:c},t),this.updateElements(s,o,l,t)}updateElements(t,e,i,s){const r=s==="reset",{iScale:a,vScale:o,_stacked:l,_dataset:c}=this._cachedMeta,{sharedOptions:d,includeOptions:h}=this._getSharedOptions(e,s),f=a.axis,g=o.axis,{spanGaps:y,segment:v}=this.options,w=As(y)?y:Number.POSITIVE_INFINITY,A=this.chart._animationsDisabled||r||s==="none",S=e+i,P=t.length;let D=e>0&&this.getParsed(e-1);for(let M=0;M<P;++M){const C=t[M],I=A?C:{};if(M<e||M>=S){I.skip=!0;continue}const _=this.getParsed(M),b=nt(_[g]),E=I[f]=a.getPixelForValue(_[f],M),k=I[g]=r||b?o.getBasePixel():o.getPixelForValue(l?this.applyStack(o,_,l):_[g],M);I.skip=isNaN(E)||isNaN(k)||b,I.stop=M>0&&Math.abs(_[f]-D[f])>w,v&&(I.parsed=_,I.raw=c.data[M]),h&&(I.options=d||this.resolveDataElementOptions(M,C.active?"active":s)),A||this.updateElement(C,M,I,s),D=_}}getMaxOverflow(){const t=this._cachedMeta,e=t.dataset,i=e.options&&e.options.borderWidth||0,s=t.data||[];if(!s.length)return i;const r=s[0].size(this.resolveDataElementOptions(0)),a=s[s.length-1].size(this.resolveDataElementOptions(s.length-1));return Math.max(i,r,a)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}j(xo,"id","line"),j(xo,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),j(xo,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});class Dr extends Ve{constructor(t,e){super(t,e),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,s=i.data.labels||[],r=Ia(e._parsed[t].r,i.options.locale);return{label:s[t]||"",value:r}}parseObjectData(t,e,i,s){return Tv.bind(this)(t,e,i,s)}update(t){const e=this._cachedMeta.data;this._updateRadius(),this.updateElements(e,0,e.length,t)}getMinMax(){const t=this._cachedMeta,e={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((i,s)=>{const r=this.getParsed(s).r;!isNaN(r)&&this.chart.getDataVisibility(s)&&(r<e.min&&(e.min=r),r>e.max&&(e.max=r))}),e}_updateRadius(){const t=this.chart,e=t.chartArea,i=t.options,s=Math.min(e.right-e.left,e.bottom-e.top),r=Math.max(s/2,0),a=Math.max(i.cutoutPercentage?r/100*i.cutoutPercentage:1,0),o=(r-a)/t.getVisibleDatasetCount();this.outerRadius=r-o*this.index,this.innerRadius=this.outerRadius-o}updateElements(t,e,i,s){const r=s==="reset",a=this.chart,l=a.options.animation,c=this._cachedMeta.rScale,d=c.xCenter,h=c.yCenter,f=c.getIndexAngle(0)-.5*ht;let g=f,y;const v=360/this.countVisibleElements();for(y=0;y<e;++y)g+=this._computeAngle(y,s,v);for(y=e;y<e+i;y++){const w=t[y];let A=g,S=g+this._computeAngle(y,s,v),P=a.getDataVisibility(y)?c.getDistanceFromCenterForValue(this.getParsed(y).r):0;g=S,r&&(l.animateScale&&(P=0),l.animateRotate&&(A=S=f));const D={x:d,y:h,innerRadius:0,outerRadius:P,startAngle:A,endAngle:S,options:this.resolveDataElementOptions(y,w.active?"active":s)};this.updateElement(w,y,D,s)}}countVisibleElements(){const t=this._cachedMeta;let e=0;return t.data.forEach((i,s)=>{!isNaN(this.getParsed(s).r)&&this.chart.getDataVisibility(s)&&e++}),e}_computeAngle(t,e,i){return this.chart.getDataVisibility(t)?De(this.resolveDataElementOptions(t,e).angle||i):0}}j(Dr,"id","polarArea"),j(Dr,"defaults",{dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0}),j(Dr,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:i,color:s}}=t.legend.options;return e.labels.map((r,a)=>{const l=t.getDatasetMeta(0).controller.getStyle(a);return{text:r,fillStyle:l.backgroundColor,strokeStyle:l.borderColor,fontColor:s,lineWidth:l.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(a),index:a}})}return[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}});class Pu extends _i{}j(Pu,"id","pie"),j(Pu,"defaults",{cutout:0,rotation:0,circumference:360,radius:"100%"});class ko extends Ve{getLabelAndValue(t){const e=this._cachedMeta.vScale,i=this.getParsed(t);return{label:e.getLabels()[t],value:""+e.getLabelForValue(i[e.axis])}}parseObjectData(t,e,i,s){return Tv.bind(this)(t,e,i,s)}update(t){const e=this._cachedMeta,i=e.dataset,s=e.data||[],r=e.iScale.getLabels();if(i.points=s,t!=="resize"){const a=this.resolveDatasetElementOptions(t);this.options.showLine||(a.borderWidth=0);const o={_loop:!0,_fullLoop:r.length===s.length,options:a};this.updateElement(i,void 0,o,t)}this.updateElements(s,0,s.length,t)}updateElements(t,e,i,s){const r=this._cachedMeta.rScale,a=s==="reset";for(let o=e;o<e+i;o++){const l=t[o],c=this.resolveDataElementOptions(o,l.active?"active":s),d=r.getPointPositionForValue(o,this.getParsed(o).r),h=a?r.xCenter:d.x,f=a?r.yCenter:d.y,g={x:h,y:f,angle:d.angle,skip:isNaN(h)||isNaN(f),options:c};this.updateElement(l,o,g,s)}}}j(ko,"id","radar"),j(ko,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),j(ko,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});class Ao extends Ve{getLabelAndValue(t){const e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:r}=e,a=this.getParsed(t),o=s.getLabelForValue(a.x),l=r.getLabelForValue(a.y);return{label:i[t]||"",value:"("+o+", "+l+")"}}update(t){const e=this._cachedMeta,{data:i=[]}=e,s=this.chart._animationsDisabled;let{start:r,count:a}=pv(e,i,s);if(this._drawStart=r,this._drawCount=a,gv(e)&&(r=0,a=i.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:o,_dataset:l}=e;o._chart=this.chart,o._datasetIndex=this.index,o._decimated=!!l._decimated,o.points=i;const c=this.resolveDatasetElementOptions(t);c.segment=this.options.segment,this.updateElement(o,void 0,{animated:!s,options:c},t)}else this.datasetElementType&&(delete e.dataset,this.datasetElementType=!1);this.updateElements(i,r,a,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,e,i,s){const r=s==="reset",{iScale:a,vScale:o,_stacked:l,_dataset:c}=this._cachedMeta,d=this.resolveDataElementOptions(e,s),h=this.getSharedOptions(d),f=this.includeOptions(s,h),g=a.axis,y=o.axis,{spanGaps:v,segment:w}=this.options,A=As(v)?v:Number.POSITIVE_INFINITY,S=this.chart._animationsDisabled||r||s==="none";let P=e>0&&this.getParsed(e-1);for(let D=e;D<e+i;++D){const M=t[D],C=this.getParsed(D),I=S?M:{},_=nt(C[y]),b=I[g]=a.getPixelForValue(C[g],D),E=I[y]=r||_?o.getBasePixel():o.getPixelForValue(l?this.applyStack(o,C,l):C[y],D);I.skip=isNaN(b)||isNaN(E)||_,I.stop=D>0&&Math.abs(C[g]-P[g])>A,w&&(I.parsed=C,I.raw=c.data[D]),f&&(I.options=h||this.resolveDataElementOptions(D,M.active?"active":s)),S||this.updateElement(M,D,I,s),P=C}this.updateSharedOptions(h,s,d)}getMaxOverflow(){const t=this._cachedMeta,e=t.data||[];if(!this.options.showLine){let o=0;for(let l=e.length-1;l>=0;--l)o=Math.max(o,e[l].size(this.resolveDataElementOptions(l))/2);return o>0&&o}const i=t.dataset,s=i.options&&i.options.borderWidth||0;if(!e.length)return s;const r=e[0].size(this.resolveDataElementOptions(0)),a=e[e.length-1].size(this.resolveDataElementOptions(e.length-1));return Math.max(s,r,a)/2}}j(Ao,"id","scatter"),j(Ao,"defaults",{datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1}),j(Ao,"overrides",{interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}});var fD=Object.freeze({__proto__:null,BarController:To,BubbleController:Eo,DoughnutController:_i,LineController:xo,PieController:Pu,PolarAreaController:Dr,RadarController:ko,ScatterController:Ao});function oi(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class mh{constructor(t){j(this,"options");this.options=t||{}}static override(t){Object.assign(mh.prototype,t)}init(){}formats(){return oi()}parse(){return oi()}format(){return oi()}add(){return oi()}diff(){return oi()}startOf(){return oi()}endOf(){return oi()}}var pD={_date:mh};function gD(n,t,e,i){const{controller:s,data:r,_sorted:a}=n,o=s._cachedMeta.iScale,l=n.dataset&&n.dataset.options?n.dataset.options.spanGaps:null;if(o&&t===o.axis&&t!=="r"&&a&&r.length){const c=o._reversePixels?LR:hn;if(i){if(s._sharedOptions){const d=r[0],h=typeof d.getRange=="function"&&d.getRange(t);if(h){const f=c(r,t,e-h),g=c(r,t,e+h);return{lo:f.lo,hi:g.hi}}}}else{const d=c(r,t,e);if(l){const{vScale:h}=s._cachedMeta,{_parsed:f}=n,g=f.slice(0,d.lo+1).reverse().findIndex(v=>!nt(v[h.axis]));d.lo-=Math.max(0,g);const y=f.slice(d.hi).findIndex(v=>!nt(v[h.axis]));d.hi+=Math.max(0,y)}return d}}return{lo:0,hi:r.length-1}}function $l(n,t,e,i,s){const r=n.getSortedVisibleDatasetMetas(),a=e[t];for(let o=0,l=r.length;o<l;++o){const{index:c,data:d}=r[o],{lo:h,hi:f}=gD(r[o],t,a,s);for(let g=h;g<=f;++g){const y=d[g];y.skip||i(y,c,g)}}}function mD(n){const t=n.indexOf("x")!==-1,e=n.indexOf("y")!==-1;return function(i,s){const r=t?Math.abs(i.x-s.x):0,a=e?Math.abs(i.y-s.y):0;return Math.sqrt(Math.pow(r,2)+Math.pow(a,2))}}function Bc(n,t,e,i,s){const r=[];return!s&&!n.isPointInArea(t)||$l(n,e,t,function(o,l,c){!s&&!fn(o,n.chartArea,0)||o.inRange(t.x,t.y,i)&&r.push({element:o,datasetIndex:l,index:c})},!0),r}function yD(n,t,e,i){let s=[];function r(a,o,l){const{startAngle:c,endAngle:d}=a.getProps(["startAngle","endAngle"],i),{angle:h}=cv(a,{x:t.x,y:t.y});ta(h,c,d)&&s.push({element:a,datasetIndex:o,index:l})}return $l(n,e,t,r),s}function _D(n,t,e,i,s,r){let a=[];const o=mD(e);let l=Number.POSITIVE_INFINITY;function c(d,h,f){const g=d.inRange(t.x,t.y,s);if(i&&!g)return;const y=d.getCenterPoint(s);if(!(!!r||n.isPointInArea(y))&&!g)return;const w=o(t,y);w<l?(a=[{element:d,datasetIndex:h,index:f}],l=w):w===l&&a.push({element:d,datasetIndex:h,index:f})}return $l(n,e,t,c),a}function Uc(n,t,e,i,s,r){return!r&&!n.isPointInArea(t)?[]:e==="r"&&!i?yD(n,t,e,s):_D(n,t,e,i,s,r)}function Wg(n,t,e,i,s){const r=[],a=e==="x"?"inXRange":"inYRange";let o=!1;return $l(n,e,t,(l,c,d)=>{l[a]&&l[a](t[e],s)&&(r.push({element:l,datasetIndex:c,index:d}),o=o||l.inRange(t.x,t.y,s))}),i&&!o?[]:r}var bD={modes:{index(n,t,e,i){const s=di(t,n),r=e.axis||"x",a=e.includeInvisible||!1,o=e.intersect?Bc(n,s,r,i,a):Uc(n,s,r,!1,i,a),l=[];return o.length?(n.getSortedVisibleDatasetMetas().forEach(c=>{const d=o[0].index,h=c.data[d];h&&!h.skip&&l.push({element:h,datasetIndex:c.index,index:d})}),l):[]},dataset(n,t,e,i){const s=di(t,n),r=e.axis||"xy",a=e.includeInvisible||!1;let o=e.intersect?Bc(n,s,r,i,a):Uc(n,s,r,!1,i,a);if(o.length>0){const l=o[0].datasetIndex,c=n.getDatasetMeta(l).data;o=[];for(let d=0;d<c.length;++d)o.push({element:c[d],datasetIndex:l,index:d})}return o},point(n,t,e,i){const s=di(t,n),r=e.axis||"xy",a=e.includeInvisible||!1;return Bc(n,s,r,i,a)},nearest(n,t,e,i){const s=di(t,n),r=e.axis||"xy",a=e.includeInvisible||!1;return Uc(n,s,r,e.intersect,i,a)},x(n,t,e,i){const s=di(t,n);return Wg(n,s,"x",e.intersect,i)},y(n,t,e,i){const s=di(t,n);return Wg(n,s,"y",e.intersect,i)}}};const Ov=["left","top","right","bottom"];function rr(n,t){return n.filter(e=>e.pos===t)}function Kg(n,t){return n.filter(e=>Ov.indexOf(e.pos)===-1&&e.box.axis===t)}function ar(n,t){return n.sort((e,i)=>{const s=t?i:e,r=t?e:i;return s.weight===r.weight?s.index-r.index:s.weight-r.weight})}function vD(n){const t=[];let e,i,s,r,a,o;for(e=0,i=(n||[]).length;e<i;++e)s=n[e],{position:r,options:{stack:a,stackWeight:o=1}}=s,t.push({index:e,box:s,pos:r,horizontal:s.isHorizontal(),weight:s.weight,stack:a&&r+a,stackWeight:o});return t}function wD(n){const t={};for(const e of n){const{stack:i,pos:s,stackWeight:r}=e;if(!i||!Ov.includes(s))continue;const a=t[i]||(t[i]={count:0,placed:0,weight:0,size:0});a.count++,a.weight+=r}return t}function ID(n,t){const e=wD(n),{vBoxMaxWidth:i,hBoxMaxHeight:s}=t;let r,a,o;for(r=0,a=n.length;r<a;++r){o=n[r];const{fullSize:l}=o.box,c=e[o.stack],d=c&&o.stackWeight/c.weight;o.horizontal?(o.width=d?d*i:l&&t.availableWidth,o.height=s):(o.width=i,o.height=d?d*s:l&&t.availableHeight)}return e}function TD(n){const t=vD(n),e=ar(t.filter(c=>c.box.fullSize),!0),i=ar(rr(t,"left"),!0),s=ar(rr(t,"right")),r=ar(rr(t,"top"),!0),a=ar(rr(t,"bottom")),o=Kg(t,"x"),l=Kg(t,"y");return{fullSize:e,leftAndTop:i.concat(r),rightAndBottom:s.concat(l).concat(a).concat(o),chartArea:rr(t,"chartArea"),vertical:i.concat(s).concat(l),horizontal:r.concat(a).concat(o)}}function Gg(n,t,e,i){return Math.max(n[e],t[e])+Math.max(n[i],t[i])}function Vv(n,t){n.top=Math.max(n.top,t.top),n.left=Math.max(n.left,t.left),n.bottom=Math.max(n.bottom,t.bottom),n.right=Math.max(n.right,t.right)}function ED(n,t,e,i){const{pos:s,box:r}=e,a=n.maxPadding;if(!at(s)){e.size&&(n[s]-=e.size);const h=i[e.stack]||{size:0,count:1};h.size=Math.max(h.size,e.horizontal?r.height:r.width),e.size=h.size/h.count,n[s]+=e.size}r.getPadding&&Vv(a,r.getPadding());const o=Math.max(0,t.outerWidth-Gg(a,n,"left","right")),l=Math.max(0,t.outerHeight-Gg(a,n,"top","bottom")),c=o!==n.w,d=l!==n.h;return n.w=o,n.h=l,e.horizontal?{same:c,other:d}:{same:d,other:c}}function xD(n){const t=n.maxPadding;function e(i){const s=Math.max(t[i]-n[i],0);return n[i]+=s,s}n.y+=e("top"),n.x+=e("left"),e("right"),e("bottom")}function kD(n,t){const e=t.maxPadding;function i(s){const r={left:0,top:0,right:0,bottom:0};return s.forEach(a=>{r[a]=Math.max(t[a],e[a])}),r}return i(n?["left","right"]:["top","bottom"])}function yr(n,t,e,i){const s=[];let r,a,o,l,c,d;for(r=0,a=n.length,c=0;r<a;++r){o=n[r],l=o.box,l.update(o.width||t.w,o.height||t.h,kD(o.horizontal,t));const{same:h,other:f}=ED(t,e,o,i);c|=h&&s.length,d=d||f,l.fullSize||s.push(o)}return c&&yr(s,t,e,i)||d}function eo(n,t,e,i,s){n.top=e,n.left=t,n.right=t+i,n.bottom=e+s,n.width=i,n.height=s}function Yg(n,t,e,i){const s=e.padding;let{x:r,y:a}=t;for(const o of n){const l=o.box,c=i[o.stack]||{placed:0,weight:1},d=o.stackWeight/c.weight||1;if(o.horizontal){const h=t.w*d,f=c.size||l.height;Zr(c.start)&&(a=c.start),l.fullSize?eo(l,s.left,a,e.outerWidth-s.right-s.left,f):eo(l,t.left+c.placed,a,h,f),c.start=a,c.placed+=h,a=l.bottom}else{const h=t.h*d,f=c.size||l.width;Zr(c.start)&&(r=c.start),l.fullSize?eo(l,r,s.top,f,e.outerHeight-s.bottom-s.top):eo(l,r,t.top+c.placed,f,h),c.start=r,c.placed+=h,r=l.right}}t.x=r,t.y=a}var re={addBox(n,t){n.boxes||(n.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(e){t.draw(e)}}]},n.boxes.push(t)},removeBox(n,t){const e=n.boxes?n.boxes.indexOf(t):-1;e!==-1&&n.boxes.splice(e,1)},configure(n,t,e){t.fullSize=e.fullSize,t.position=e.position,t.weight=e.weight},update(n,t,e,i){if(!n)return;const s=ae(n.options.layout.padding),r=Math.max(t-s.width,0),a=Math.max(e-s.height,0),o=TD(n.boxes),l=o.vertical,c=o.horizontal;pt(n.boxes,v=>{typeof v.beforeLayout=="function"&&v.beforeLayout()});const d=l.reduce((v,w)=>w.box.options&&w.box.options.display===!1?v:v+1,0)||1,h=Object.freeze({outerWidth:t,outerHeight:e,padding:s,availableWidth:r,availableHeight:a,vBoxMaxWidth:r/2/d,hBoxMaxHeight:a/2}),f=Object.assign({},s);Vv(f,ae(i));const g=Object.assign({maxPadding:f,w:r,h:a,x:s.left,y:s.top},s),y=ID(l.concat(c),h);yr(o.fullSize,g,h,y),yr(l,g,h,y),yr(c,g,h,y)&&yr(l,g,h,y),xD(g),Yg(o.leftAndTop,g,h,y),g.x+=g.w,g.y+=g.h,Yg(o.rightAndBottom,g,h,y),n.chartArea={left:g.left,top:g.top,right:g.left+g.w,bottom:g.top+g.h,height:g.h,width:g.w},pt(o.chartArea,v=>{const w=v.box;Object.assign(w,n.chartArea),w.update(g.w,g.h,{left:0,top:0,right:0,bottom:0})})}};class Nv{acquireContext(t,e){}releaseContext(t){return!1}addEventListener(t,e,i){}removeEventListener(t,e,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,e,i,s){return e=Math.max(0,e||t.width),i=i||t.height,{width:e,height:Math.max(0,s?Math.floor(e/s):i)}}isAttached(t){return!0}updateConfig(t){}}class AD extends Nv{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const So="$chartjs",SD={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Qg=n=>n===null||n==="";function PD(n,t){const e=n.style,i=n.getAttribute("height"),s=n.getAttribute("width");if(n[So]={initial:{height:i,width:s,style:{display:e.display,height:e.height,width:e.width}}},e.display=e.display||"block",e.boxSizing=e.boxSizing||"border-box",Qg(s)){const r=Mg(n,"width");r!==void 0&&(n.width=r)}if(Qg(i))if(n.style.height==="")n.height=n.width/(t||2);else{const r=Mg(n,"height");r!==void 0&&(n.height=r)}return n}const Lv=RC?{passive:!0}:!1;function RD(n,t,e){n&&n.addEventListener(t,e,Lv)}function CD(n,t,e){n&&n.canvas&&n.canvas.removeEventListener(t,e,Lv)}function DD(n,t){const e=SD[n.type]||n.type,{x:i,y:s}=di(n,t);return{type:e,chart:t,native:n,x:i!==void 0?i:null,y:s!==void 0?s:null}}function ol(n,t){for(const e of n)if(e===t||e.contains(t))return!0}function MD(n,t,e){const i=n.canvas,s=new MutationObserver(r=>{let a=!1;for(const o of r)a=a||ol(o.addedNodes,i),a=a&&!ol(o.removedNodes,i);a&&e()});return s.observe(document,{childList:!0,subtree:!0}),s}function OD(n,t,e){const i=n.canvas,s=new MutationObserver(r=>{let a=!1;for(const o of r)a=a||ol(o.removedNodes,i),a=a&&!ol(o.addedNodes,i);a&&e()});return s.observe(document,{childList:!0,subtree:!0}),s}const na=new Map;let Jg=0;function Fv(){const n=window.devicePixelRatio;n!==Jg&&(Jg=n,na.forEach((t,e)=>{e.currentDevicePixelRatio!==n&&t()}))}function VD(n,t){na.size||window.addEventListener("resize",Fv),na.set(n,t)}function ND(n){na.delete(n),na.size||window.removeEventListener("resize",Fv)}function LD(n,t,e){const i=n.canvas,s=i&&gh(i);if(!s)return;const r=fv((o,l)=>{const c=s.clientWidth;e(o,l),c<s.clientWidth&&e()},window),a=new ResizeObserver(o=>{const l=o[0],c=l.contentRect.width,d=l.contentRect.height;c===0&&d===0||r(c,d)});return a.observe(s),VD(n,r),a}function jc(n,t,e){e&&e.disconnect(),t==="resize"&&ND(n)}function FD(n,t,e){const i=n.canvas,s=fv(r=>{n.ctx!==null&&e(DD(r,n))},n);return RD(i,t,s),s}class BD extends Nv{acquireContext(t,e){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(PD(t,e),i):null}releaseContext(t){const e=t.canvas;if(!e[So])return!1;const i=e[So].initial;["height","width"].forEach(r=>{const a=i[r];nt(a)?e.removeAttribute(r):e.setAttribute(r,a)});const s=i.style||{};return Object.keys(s).forEach(r=>{e.style[r]=s[r]}),e.width=e.width,delete e[So],!0}addEventListener(t,e,i){this.removeEventListener(t,e);const s=t.$proxies||(t.$proxies={}),a={attach:MD,detach:OD,resize:LD}[e]||FD;s[e]=a(t,e,i)}removeEventListener(t,e){const i=t.$proxies||(t.$proxies={}),s=i[e];if(!s)return;({attach:jc,detach:jc,resize:jc}[e]||CD)(t,e,s),i[e]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,e,i,s){return PC(t,e,i,s)}isAttached(t){const e=t&&gh(t);return!!(e&&e.isConnected)}}function UD(n){return!ph()||typeof OffscreenCanvas<"u"&&n instanceof OffscreenCanvas?AD:BD}class Fe{constructor(){j(this,"x");j(this,"y");j(this,"active",!1);j(this,"options");j(this,"$animations")}tooltipPosition(t){const{x:e,y:i}=this.getProps(["x","y"],t);return{x:e,y:i}}hasValue(){return As(this.x)&&As(this.y)}getProps(t,e){const i=this.$animations;if(!e||!i)return this;const s={};return t.forEach(r=>{s[r]=i[r]&&i[r].active()?i[r]._to:this[r]}),s}}j(Fe,"defaults",{}),j(Fe,"defaultRoutes");function jD(n,t){const e=n.options.ticks,i=zD(n),s=Math.min(e.maxTicksLimit||i,i),r=e.major.enabled?HD(t):[],a=r.length,o=r[0],l=r[a-1],c=[];if(a>s)return qD(t,c,r,a/s),c;const d=$D(r,t,s);if(a>0){let h,f;const g=a>1?Math.round((l-o)/(a-1)):null;for(no(t,c,d,nt(g)?0:o-g,o),h=0,f=a-1;h<f;h++)no(t,c,d,r[h],r[h+1]);return no(t,c,d,l,nt(g)?t.length:l+g),c}return no(t,c,d),c}function zD(n){const t=n.options.offset,e=n._tickSize(),i=n._length/e+(t?0:1),s=n._maxLength/e;return Math.floor(Math.min(i,s))}function $D(n,t,e){const i=WD(n),s=t.length/e;if(!i)return Math.max(s,1);const r=DR(i);for(let a=0,o=r.length-1;a<o;a++){const l=r[a];if(l>s)return l}return Math.max(s,1)}function HD(n){const t=[];let e,i;for(e=0,i=n.length;e<i;e++)n[e].major&&t.push(e);return t}function qD(n,t,e,i){let s=0,r=e[0],a;for(i=Math.ceil(i),a=0;a<n.length;a++)a===r&&(t.push(n[a]),s++,r=e[s*i])}function no(n,t,e,i,s){const r=Z(i,0),a=Math.min(Z(s,n.length),n.length);let o=0,l,c,d;for(e=Math.ceil(e),s&&(l=s-i,e=l/Math.floor(l/e)),d=r;d<0;)o++,d=Math.round(r+o*e);for(c=Math.max(r,0);c<a;c++)c===d&&(t.push(n[c]),o++,d=Math.round(r+o*e))}function WD(n){const t=n.length;let e,i;if(t<2)return!1;for(i=n[0],e=1;e<t;++e)if(n[e]-n[e-1]!==i)return!1;return i}const KD=n=>n==="left"?"right":n==="right"?"left":n,Xg=(n,t,e)=>t==="top"||t==="left"?n[t]+e:n[t]-e,Zg=(n,t)=>Math.min(t||n,n);function tm(n,t){const e=[],i=n.length/t,s=n.length;let r=0;for(;r<s;r+=i)e.push(n[Math.floor(r)]);return e}function GD(n,t,e){const i=n.ticks.length,s=Math.min(t,i-1),r=n._startPixel,a=n._endPixel,o=1e-6;let l=n.getPixelForTick(s),c;if(!(e&&(i===1?c=Math.max(l-r,a-l):t===0?c=(n.getPixelForTick(1)-l)/2:c=(l-n.getPixelForTick(s-1))/2,l+=s<t?c:-c,l<r-o||l>a+o)))return l}function YD(n,t){pt(n,e=>{const i=e.gc,s=i.length/2;let r;if(s>t){for(r=0;r<s;++r)delete e.data[i[r]];i.splice(0,s)}})}function or(n){return n.drawTicks?n.tickLength:0}function em(n,t){if(!n.display)return 0;const e=jt(n.font,t),i=ae(n.padding);return(kt(n.text)?n.text.length:1)*e.lineHeight+i.height}function QD(n,t){return Zn(n,{scale:t,type:"scale"})}function JD(n,t,e){return Zn(n,{tick:e,index:t,type:"tick"})}function XD(n,t,e){let i=lh(n);return(e&&t!=="right"||!e&&t==="right")&&(i=KD(i)),i}function ZD(n,t,e,i){const{top:s,left:r,bottom:a,right:o,chart:l}=n,{chartArea:c,scales:d}=l;let h=0,f,g,y;const v=a-s,w=o-r;if(n.isHorizontal()){if(g=ie(i,r,o),at(e)){const A=Object.keys(e)[0],S=e[A];y=d[A].getPixelForValue(S)+v-t}else e==="center"?y=(c.bottom+c.top)/2+v-t:y=Xg(n,e,t);f=o-r}else{if(at(e)){const A=Object.keys(e)[0],S=e[A];g=d[A].getPixelForValue(S)-w+t}else e==="center"?g=(c.left+c.right)/2-w+t:g=Xg(n,e,t);y=ie(i,a,s),h=e==="left"?-Vt:Vt}return{titleX:g,titleY:y,maxWidth:f,rotation:h}}class qi extends Fe{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,e){return t}getUserBounds(){let{_userMin:t,_userMax:e,_suggestedMin:i,_suggestedMax:s}=this;return t=we(t,Number.POSITIVE_INFINITY),e=we(e,Number.NEGATIVE_INFINITY),i=we(i,Number.POSITIVE_INFINITY),s=we(s,Number.NEGATIVE_INFINITY),{min:we(t,i),max:we(e,s),minDefined:Mt(t),maxDefined:Mt(e)}}getMinMax(t){let{min:e,max:i,minDefined:s,maxDefined:r}=this.getUserBounds(),a;if(s&&r)return{min:e,max:i};const o=this.getMatchingVisibleMetas();for(let l=0,c=o.length;l<c;++l)a=o[l].controller.getMinMax(this,t),s||(e=Math.min(e,a.min)),r||(i=Math.max(i,a.max));return e=r&&e>i?i:e,i=s&&e>i?e:i,{min:we(e,we(i,e)),max:we(i,we(e,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){bt(this.options.beforeUpdate,[this])}update(t,e,i){const{beginAtZero:s,grace:r,ticks:a}=this.options,o=a.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=oC(this,r,s),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const l=o<this.ticks.length;this._convertTicksToLabels(l?tm(this.ticks,o):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),a.display&&(a.autoSkip||a.source==="auto")&&(this.ticks=jD(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,e,i;this.isHorizontal()?(e=this.left,i=this.right):(e=this.top,i=this.bottom,t=!t),this._startPixel=e,this._endPixel=i,this._reversePixels=t,this._length=i-e,this._alignToPixels=this.options.alignToPixels}afterUpdate(){bt(this.options.afterUpdate,[this])}beforeSetDimensions(){bt(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){bt(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),bt(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){bt(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const e=this.options.ticks;let i,s,r;for(i=0,s=t.length;i<s;i++)r=t[i],r.label=bt(e.callback,[r.value,i,t],this)}afterTickToLabelConversion(){bt(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){bt(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,e=t.ticks,i=Zg(this.ticks.length,t.ticks.maxTicksLimit),s=e.minRotation||0,r=e.maxRotation;let a=s,o,l,c;if(!this._isVisible()||!e.display||s>=r||i<=1||!this.isHorizontal()){this.labelRotation=s;return}const d=this._getLabelSizes(),h=d.widest.width,f=d.highest.height,g=qt(this.chart.width-h,0,this.maxWidth);o=t.offset?this.maxWidth/i:g/(i-1),h+6>o&&(o=g/(i-(t.offset?.5:1)),l=this.maxHeight-or(t.grid)-e.padding-em(t.title,this.chart.options.font),c=Math.sqrt(h*h+f*f),a=ah(Math.min(Math.asin(qt((d.highest.height+6)/o,-1,1)),Math.asin(qt(l/c,-1,1))-Math.asin(qt(f/c,-1,1)))),a=Math.max(s,Math.min(r,a))),this.labelRotation=a}afterCalculateLabelRotation(){bt(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){bt(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:e,options:{ticks:i,title:s,grid:r}}=this,a=this._isVisible(),o=this.isHorizontal();if(a){const l=em(s,e.options.font);if(o?(t.width=this.maxWidth,t.height=or(r)+l):(t.height=this.maxHeight,t.width=or(r)+l),i.display&&this.ticks.length){const{first:c,last:d,widest:h,highest:f}=this._getLabelSizes(),g=i.padding*2,y=De(this.labelRotation),v=Math.cos(y),w=Math.sin(y);if(o){const A=i.mirror?0:w*h.width+v*f.height;t.height=Math.min(this.maxHeight,t.height+A+g)}else{const A=i.mirror?0:v*h.width+w*f.height;t.width=Math.min(this.maxWidth,t.width+A+g)}this._calculatePadding(c,d,w,v)}}this._handleMargins(),o?(this.width=this._length=e.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=e.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,e,i,s){const{ticks:{align:r,padding:a},position:o}=this.options,l=this.labelRotation!==0,c=o!=="top"&&this.axis==="x";if(this.isHorizontal()){const d=this.getPixelForTick(0)-this.left,h=this.right-this.getPixelForTick(this.ticks.length-1);let f=0,g=0;l?c?(f=s*t.width,g=i*e.height):(f=i*t.height,g=s*e.width):r==="start"?g=e.width:r==="end"?f=t.width:r!=="inner"&&(f=t.width/2,g=e.width/2),this.paddingLeft=Math.max((f-d+a)*this.width/(this.width-d),0),this.paddingRight=Math.max((g-h+a)*this.width/(this.width-h),0)}else{let d=e.height/2,h=t.height/2;r==="start"?(d=0,h=t.height):r==="end"&&(d=e.height,h=0),this.paddingTop=d+a,this.paddingBottom=h+a}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){bt(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:e}=this.options;return e==="top"||e==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let e,i;for(e=0,i=t.length;e<i;e++)nt(t[e].label)&&(t.splice(e,1),i--,e--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const e=this.options.ticks.sampleSize;let i=this.ticks;e<i.length&&(i=tm(i,e)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,e,i){const{ctx:s,_longestTextCache:r}=this,a=[],o=[],l=Math.floor(e/Zg(e,i));let c=0,d=0,h,f,g,y,v,w,A,S,P,D,M;for(h=0;h<e;h+=l){if(y=t[h].label,v=this._resolveTickFontOptions(h),s.font=w=v.string,A=r[w]=r[w]||{data:{},gc:[]},S=v.lineHeight,P=D=0,!nt(y)&&!kt(y))P=rl(s,A.data,A.gc,P,y),D=S;else if(kt(y))for(f=0,g=y.length;f<g;++f)M=y[f],!nt(M)&&!kt(M)&&(P=rl(s,A.data,A.gc,P,M),D+=S);a.push(P),o.push(D),c=Math.max(P,c),d=Math.max(D,d)}YD(r,e);const C=a.indexOf(c),I=o.indexOf(d),_=b=>({width:a[b]||0,height:o[b]||0});return{first:_(0),last:_(e-1),widest:_(C),highest:_(I),widths:a,heights:o}}getLabelForValue(t){return t}getPixelForValue(t,e){return NaN}getValueForPixel(t){}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const e=this._startPixel+t*this._length;return NR(this._alignToPixels?ai(this.chart,e,0):e)}getDecimalForPixel(t){const e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:e}=this;return t<0&&e<0?e:t>0&&e>0?t:0}getContext(t){const e=this.ticks||[];if(t>=0&&t<e.length){const i=e[t];return i.$context||(i.$context=JD(this.getContext(),t,i))}return this.$context||(this.$context=QD(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,e=De(this.labelRotation),i=Math.abs(Math.cos(e)),s=Math.abs(Math.sin(e)),r=this._getLabelSizes(),a=t.autoSkipPadding||0,o=r?r.widest.width+a:0,l=r?r.highest.height+a:0;return this.isHorizontal()?l*i>o*s?o/i:l/s:l*s<o*i?l/i:o/s}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const e=this.axis,i=this.chart,s=this.options,{grid:r,position:a,border:o}=s,l=r.offset,c=this.isHorizontal(),h=this.ticks.length+(l?1:0),f=or(r),g=[],y=o.setContext(this.getContext()),v=y.display?y.width:0,w=v/2,A=function(X){return ai(i,X,v)};let S,P,D,M,C,I,_,b,E,k,R,x;if(a==="top")S=A(this.bottom),I=this.bottom-f,b=S-w,k=A(t.top)+w,x=t.bottom;else if(a==="bottom")S=A(this.top),k=t.top,x=A(t.bottom)-w,I=S+w,b=this.top+f;else if(a==="left")S=A(this.right),C=this.right-f,_=S-w,E=A(t.left)+w,R=t.right;else if(a==="right")S=A(this.left),E=t.left,R=A(t.right)-w,C=S+w,_=this.left+f;else if(e==="x"){if(a==="center")S=A((t.top+t.bottom)/2+.5);else if(at(a)){const X=Object.keys(a)[0],Q=a[X];S=A(this.chart.scales[X].getPixelForValue(Q))}k=t.top,x=t.bottom,I=S+w,b=I+f}else if(e==="y"){if(a==="center")S=A((t.left+t.right)/2);else if(at(a)){const X=Object.keys(a)[0],Q=a[X];S=A(this.chart.scales[X].getPixelForValue(Q))}C=S-w,_=C-f,E=t.left,R=t.right}const $=Z(s.ticks.maxTicksLimit,h),G=Math.max(1,Math.ceil(h/$));for(P=0;P<h;P+=G){const X=this.getContext(P),Q=r.setContext(X),it=o.setContext(X),ft=Q.lineWidth,_e=Q.color,Wi=it.dash||[],oe=it.dashOffset,Ct=Q.tickWidth,Qe=Q.tickColor,Pe=Q.tickBorderDash||[],Je=Q.tickBorderDashOffset;D=GD(this,P,l),D!==void 0&&(M=ai(i,D,ft),c?C=_=E=R=M:I=b=k=x=M,g.push({tx1:C,ty1:I,tx2:_,ty2:b,x1:E,y1:k,x2:R,y2:x,width:ft,color:_e,borderDash:Wi,borderDashOffset:oe,tickWidth:Ct,tickColor:Qe,tickBorderDash:Pe,tickBorderDashOffset:Je}))}return this._ticksLength=h,this._borderValue=S,g}_computeLabelItems(t){const e=this.axis,i=this.options,{position:s,ticks:r}=i,a=this.isHorizontal(),o=this.ticks,{align:l,crossAlign:c,padding:d,mirror:h}=r,f=or(i.grid),g=f+d,y=h?-d:g,v=-De(this.labelRotation),w=[];let A,S,P,D,M,C,I,_,b,E,k,R,x="middle";if(s==="top")C=this.bottom-y,I=this._getXAxisLabelAlignment();else if(s==="bottom")C=this.top+y,I=this._getXAxisLabelAlignment();else if(s==="left"){const G=this._getYAxisLabelAlignment(f);I=G.textAlign,M=G.x}else if(s==="right"){const G=this._getYAxisLabelAlignment(f);I=G.textAlign,M=G.x}else if(e==="x"){if(s==="center")C=(t.top+t.bottom)/2+g;else if(at(s)){const G=Object.keys(s)[0],X=s[G];C=this.chart.scales[G].getPixelForValue(X)+g}I=this._getXAxisLabelAlignment()}else if(e==="y"){if(s==="center")M=(t.left+t.right)/2-g;else if(at(s)){const G=Object.keys(s)[0],X=s[G];M=this.chart.scales[G].getPixelForValue(X)}I=this._getYAxisLabelAlignment(f).textAlign}e==="y"&&(l==="start"?x="top":l==="end"&&(x="bottom"));const $=this._getLabelSizes();for(A=0,S=o.length;A<S;++A){P=o[A],D=P.label;const G=r.setContext(this.getContext(A));_=this.getPixelForTick(A)+r.labelOffset,b=this._resolveTickFontOptions(A),E=b.lineHeight,k=kt(D)?D.length:1;const X=k/2,Q=G.color,it=G.textStrokeColor,ft=G.textStrokeWidth;let _e=I;a?(M=_,I==="inner"&&(A===S-1?_e=this.options.reverse?"left":"right":A===0?_e=this.options.reverse?"right":"left":_e="center"),s==="top"?c==="near"||v!==0?R=-k*E+E/2:c==="center"?R=-$.highest.height/2-X*E+E:R=-$.highest.height+E/2:c==="near"||v!==0?R=E/2:c==="center"?R=$.highest.height/2-X*E:R=$.highest.height-k*E,h&&(R*=-1),v!==0&&!G.showLabelBackdrop&&(M+=E/2*Math.sin(v))):(C=_,R=(1-k)*E/2);let Wi;if(G.showLabelBackdrop){const oe=ae(G.backdropPadding),Ct=$.heights[A],Qe=$.widths[A];let Pe=R-oe.top,Je=0-oe.left;switch(x){case"middle":Pe-=Ct/2;break;case"bottom":Pe-=Ct;break}switch(I){case"center":Je-=Qe/2;break;case"right":Je-=Qe;break;case"inner":A===S-1?Je-=Qe:A>0&&(Je-=Qe/2);break}Wi={left:Je,top:Pe,width:Qe+oe.width,height:Ct+oe.height,color:G.backdropColor}}w.push({label:D,font:b,textOffset:R,options:{rotation:v,color:Q,strokeColor:it,strokeWidth:ft,textAlign:_e,textBaseline:x,translation:[M,C],backdrop:Wi}})}return w}_getXAxisLabelAlignment(){const{position:t,ticks:e}=this.options;if(-De(this.labelRotation))return t==="top"?"left":"right";let s="center";return e.align==="start"?s="left":e.align==="end"?s="right":e.align==="inner"&&(s="inner"),s}_getYAxisLabelAlignment(t){const{position:e,ticks:{crossAlign:i,mirror:s,padding:r}}=this.options,a=this._getLabelSizes(),o=t+r,l=a.widest.width;let c,d;return e==="left"?s?(d=this.right+r,i==="near"?c="left":i==="center"?(c="center",d+=l/2):(c="right",d+=l)):(d=this.right-o,i==="near"?c="right":i==="center"?(c="center",d-=l/2):(c="left",d=this.left)):e==="right"?s?(d=this.left+r,i==="near"?c="right":i==="center"?(c="center",d-=l/2):(c="left",d-=l)):(d=this.left+o,i==="near"?c="left":i==="center"?(c="center",d+=l/2):(c="right",d=this.right)):c="right",{textAlign:c,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,e=this.options.position;if(e==="left"||e==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(e==="top"||e==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:e},left:i,top:s,width:r,height:a}=this;e&&(t.save(),t.fillStyle=e,t.fillRect(i,s,r,a),t.restore())}getLineWidthForValue(t){const e=this.options.grid;if(!this._isVisible()||!e.display)return 0;const s=this.ticks.findIndex(r=>r.value===t);return s>=0?e.setContext(this.getContext(s)).lineWidth:0}drawGrid(t){const e=this.options.grid,i=this.ctx,s=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let r,a;const o=(l,c,d)=>{!d.width||!d.color||(i.save(),i.lineWidth=d.width,i.strokeStyle=d.color,i.setLineDash(d.borderDash||[]),i.lineDashOffset=d.borderDashOffset,i.beginPath(),i.moveTo(l.x,l.y),i.lineTo(c.x,c.y),i.stroke(),i.restore())};if(e.display)for(r=0,a=s.length;r<a;++r){const l=s[r];e.drawOnChartArea&&o({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),e.drawTicks&&o({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:e,options:{border:i,grid:s}}=this,r=i.setContext(this.getContext()),a=i.display?r.width:0;if(!a)return;const o=s.setContext(this.getContext(0)).lineWidth,l=this._borderValue;let c,d,h,f;this.isHorizontal()?(c=ai(t,this.left,a)-a/2,d=ai(t,this.right,o)+o/2,h=f=l):(h=ai(t,this.top,a)-a/2,f=ai(t,this.bottom,o)+o/2,c=d=l),e.save(),e.lineWidth=r.width,e.strokeStyle=r.color,e.beginPath(),e.moveTo(c,h),e.lineTo(d,f),e.stroke(),e.restore()}drawLabels(t){if(!this.options.ticks.display)return;const i=this.ctx,s=this._computeLabelArea();s&&Ul(i,s);const r=this.getLabelItems(t);for(const a of r){const o=a.options,l=a.font,c=a.label,d=a.textOffset;Li(i,c,0,d,l,o)}s&&jl(i)}drawTitle(){const{ctx:t,options:{position:e,title:i,reverse:s}}=this;if(!i.display)return;const r=jt(i.font),a=ae(i.padding),o=i.align;let l=r.lineHeight/2;e==="bottom"||e==="center"||at(e)?(l+=a.bottom,kt(i.text)&&(l+=r.lineHeight*(i.text.length-1))):l+=a.top;const{titleX:c,titleY:d,maxWidth:h,rotation:f}=ZD(this,l,e,o);Li(t,i.text,0,0,r,{color:i.color,maxWidth:h,rotation:f,textAlign:XD(o,e,s),textBaseline:"middle",translation:[c,d]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,e=t.ticks&&t.ticks.z||0,i=Z(t.grid&&t.grid.z,-1),s=Z(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==qi.prototype.draw?[{z:e,draw:r=>{this.draw(r)}}]:[{z:i,draw:r=>{this.drawBackground(),this.drawGrid(r),this.drawTitle()}},{z:s,draw:()=>{this.drawBorder()}},{z:e,draw:r=>{this.drawLabels(r)}}]}getMatchingVisibleMetas(t){const e=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",s=[];let r,a;for(r=0,a=e.length;r<a;++r){const o=e[r];o[i]===this.id&&(!t||o.type===t)&&s.push(o)}return s}_resolveTickFontOptions(t){const e=this.options.ticks.setContext(this.getContext(t));return jt(e.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class io{constructor(t,e,i){this.type=t,this.scope=e,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const e=Object.getPrototypeOf(t);let i;nM(e)&&(i=this.register(e));const s=this.items,r=t.id,a=this.scope+"."+r;if(!r)throw new Error("class does not have id: "+t);return r in s||(s[r]=t,tM(t,a,i),this.override&&At.override(t.id,t.overrides)),a}get(t){return this.items[t]}unregister(t){const e=this.items,i=t.id,s=this.scope;i in e&&delete e[i],s&&i in At[s]&&(delete At[s][i],this.override&&delete Ni[i])}}function tM(n,t,e){const i=Xr(Object.create(null),[e?At.get(e):{},At.get(t),n.defaults]);At.set(t,i),n.defaultRoutes&&eM(t,n.defaultRoutes),n.descriptors&&At.describe(t,n.descriptors)}function eM(n,t){Object.keys(t).forEach(e=>{const i=e.split("."),s=i.pop(),r=[n].concat(i).join("."),a=t[e].split("."),o=a.pop(),l=a.join(".");At.route(r,s,l,o)})}function nM(n){return"id"in n&&"defaults"in n}class iM{constructor(){this.controllers=new io(Ve,"datasets",!0),this.elements=new io(Fe,"elements"),this.plugins=new io(Object,"plugins"),this.scales=new io(qi,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,e,i){[...e].forEach(s=>{const r=i||this._getRegistryForType(s);i||r.isForType(s)||r===this.plugins&&s.id?this._exec(t,r,s):pt(s,a=>{const o=i||this._getRegistryForType(a);this._exec(t,o,a)})})}_exec(t,e,i){const s=rh(t);bt(i["before"+s],[],i),e[t](i),bt(i["after"+s],[],i)}_getRegistryForType(t){for(let e=0;e<this._typedRegistries.length;e++){const i=this._typedRegistries[e];if(i.isForType(t))return i}return this.plugins}_get(t,e,i){const s=e.get(t);if(s===void 0)throw new Error('"'+t+'" is not a registered '+i+".");return s}}var je=new iM;class sM{constructor(){this._init=void 0}notify(t,e,i,s){if(e==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const r=s?this._descriptors(t).filter(s):this._descriptors(t),a=this._notify(r,t,e,i);return e==="afterDestroy"&&(this._notify(r,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),a}_notify(t,e,i,s){s=s||{};for(const r of t){const a=r.plugin,o=a[i],l=[e,s,r.options];if(bt(o,l,a)===!1&&s.cancelable)return!1}return!0}invalidate(){nt(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const e=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),e}_createDescriptors(t,e){const i=t&&t.config,s=Z(i.options&&i.options.plugins,{}),r=rM(i);return s===!1&&!e?[]:oM(t,r,s,e)}_notifyStateChanges(t){const e=this._oldCache||[],i=this._cache,s=(r,a)=>r.filter(o=>!a.some(l=>o.plugin.id===l.plugin.id));this._notify(s(e,i),t,"stop"),this._notify(s(i,e),t,"start")}}function rM(n){const t={},e=[],i=Object.keys(je.plugins.items);for(let r=0;r<i.length;r++)e.push(je.getPlugin(i[r]));const s=n.plugins||[];for(let r=0;r<s.length;r++){const a=s[r];e.indexOf(a)===-1&&(e.push(a),t[a.id]=!0)}return{plugins:e,localIds:t}}function aM(n,t){return!t&&n===!1?null:n===!0?{}:n}function oM(n,{plugins:t,localIds:e},i,s){const r=[],a=n.getContext();for(const o of t){const l=o.id,c=aM(i[l],s);c!==null&&r.push({plugin:o,options:lM(n.config,{plugin:o,local:e[l]},c,a)})}return r}function lM(n,{plugin:t,local:e},i,s){const r=n.pluginScopeKeys(t),a=n.getOptionScopes(i,r);return e&&t.defaults&&a.push(t.defaults),n.createResolver(a,s,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function Ru(n,t){const e=At.datasets[n]||{};return((t.datasets||{})[n]||{}).indexAxis||t.indexAxis||e.indexAxis||"x"}function cM(n,t){let e=n;return n==="_index_"?e=t:n==="_value_"&&(e=t==="x"?"y":"x"),e}function uM(n,t){return n===t?"_index_":"_value_"}function nm(n){if(n==="x"||n==="y"||n==="r")return n}function dM(n){if(n==="top"||n==="bottom")return"x";if(n==="left"||n==="right")return"y"}function Cu(n,...t){if(nm(n))return n;for(const e of t){const i=e.axis||dM(e.position)||n.length>1&&nm(n[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${n}' axis. Please provide 'axis' or 'position' option.`)}function im(n,t,e){if(e[t+"AxisID"]===n)return{axis:t}}function hM(n,t){if(t.data&&t.data.datasets){const e=t.data.datasets.filter(i=>i.xAxisID===n||i.yAxisID===n);if(e.length)return im(n,"x",e[0])||im(n,"y",e[0])}return{}}function fM(n,t){const e=Ni[n.type]||{scales:{}},i=t.scales||{},s=Ru(n.type,t),r=Object.create(null);return Object.keys(i).forEach(a=>{const o=i[a];if(!at(o))return console.error(`Invalid scale configuration for scale: ${a}`);if(o._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${a}`);const l=Cu(a,o,hM(a,n),At.scales[o.type]),c=uM(l,s),d=e.scales||{};r[a]=Sr(Object.create(null),[{axis:l},o,d[l],d[c]])}),n.data.datasets.forEach(a=>{const o=a.type||n.type,l=a.indexAxis||Ru(o,t),d=(Ni[o]||{}).scales||{};Object.keys(d).forEach(h=>{const f=cM(h,l),g=a[f+"AxisID"]||f;r[g]=r[g]||Object.create(null),Sr(r[g],[{axis:f},i[g],d[h]])})}),Object.keys(r).forEach(a=>{const o=r[a];Sr(o,[At.scales[o.type],At.scale])}),r}function Bv(n){const t=n.options||(n.options={});t.plugins=Z(t.plugins,{}),t.scales=fM(n,t)}function Uv(n){return n=n||{},n.datasets=n.datasets||[],n.labels=n.labels||[],n}function pM(n){return n=n||{},n.data=Uv(n.data),Bv(n),n}const sm=new Map,jv=new Set;function so(n,t){let e=sm.get(n);return e||(e=t(),sm.set(n,e),jv.add(e)),e}const lr=(n,t,e)=>{const i=Gn(t,e);i!==void 0&&n.add(i)};class gM{constructor(t){this._config=pM(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=Uv(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),Bv(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return so(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,e){return so(`${t}.transition.${e}`,()=>[[`datasets.${t}.transitions.${e}`,`transitions.${e}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,e){return so(`${t}-${e}`,()=>[[`datasets.${t}.elements.${e}`,`datasets.${t}`,`elements.${e}`,""]])}pluginScopeKeys(t){const e=t.id,i=this.type;return so(`${i}-plugin-${e}`,()=>[[`plugins.${e}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,e){const i=this._scopeCache;let s=i.get(t);return(!s||e)&&(s=new Map,i.set(t,s)),s}getOptionScopes(t,e,i){const{options:s,type:r}=this,a=this._cachedScopes(t,i),o=a.get(e);if(o)return o;const l=new Set;e.forEach(d=>{t&&(l.add(t),d.forEach(h=>lr(l,t,h))),d.forEach(h=>lr(l,s,h)),d.forEach(h=>lr(l,Ni[r]||{},h)),d.forEach(h=>lr(l,At,h)),d.forEach(h=>lr(l,Au,h))});const c=Array.from(l);return c.length===0&&c.push(Object.create(null)),jv.has(e)&&a.set(e,c),c}chartOptionScopes(){const{options:t,type:e}=this;return[t,Ni[e]||{},At.datasets[e]||{},{type:e},At,Au]}resolveNamedOptions(t,e,i,s=[""]){const r={$shared:!0},{resolver:a,subPrefixes:o}=rm(this._resolverCache,t,s);let l=a;if(yM(a,e)){r.$shared=!1,i=Yn(i)?i():i;const c=this.createResolver(t,i,o);l=Ss(a,i,c)}for(const c of e)r[c]=l[c];return r}createResolver(t,e,i=[""],s){const{resolver:r}=rm(this._resolverCache,t,i);return at(e)?Ss(r,e,void 0,s):r}}function rm(n,t,e){let i=n.get(t);i||(i=new Map,n.set(t,i));const s=e.join();let r=i.get(s);return r||(r={resolver:dh(t,e),subPrefixes:e.filter(o=>!o.toLowerCase().includes("hover"))},i.set(s,r)),r}const mM=n=>at(n)&&Object.getOwnPropertyNames(n).some(t=>Yn(n[t]));function yM(n,t){const{isScriptable:e,isIndexable:i}=bv(n);for(const s of t){const r=e(s),a=i(s),o=(a||r)&&n[s];if(r&&(Yn(o)||mM(o))||a&&kt(o))return!0}return!1}var _M="4.5.1";const bM=["top","bottom","left","right","chartArea"];function am(n,t){return n==="top"||n==="bottom"||bM.indexOf(n)===-1&&t==="x"}function om(n,t){return function(e,i){return e[n]===i[n]?e[t]-i[t]:e[n]-i[n]}}function lm(n){const t=n.chart,e=t.options.animation;t.notifyPlugins("afterRender"),bt(e&&e.onComplete,[n],t)}function vM(n){const t=n.chart,e=t.options.animation;bt(e&&e.onProgress,[n],t)}function zv(n){return ph()&&typeof n=="string"?n=document.getElementById(n):n&&n.length&&(n=n[0]),n&&n.canvas&&(n=n.canvas),n}const Po={},cm=n=>{const t=zv(n);return Object.values(Po).filter(e=>e.canvas===t).pop()};function wM(n,t,e){const i=Object.keys(n);for(const s of i){const r=+s;if(r>=t){const a=n[s];delete n[s],(e>0||r>t)&&(n[r+e]=a)}}}function IM(n,t,e,i){return!e||n.type==="mouseout"?null:i?t:n}class Ce{static register(...t){je.add(...t),um()}static unregister(...t){je.remove(...t),um()}constructor(t,e){const i=this.config=new gM(e),s=zv(t),r=cm(s);if(r)throw new Error("Canvas is already in use. Chart with ID '"+r.id+"' must be destroyed before the canvas with ID '"+r.canvas.id+"' can be reused.");const a=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||UD(s)),this.platform.updateConfig(i);const o=this.platform.acquireContext(s,a.aspectRatio),l=o&&o.canvas,c=l&&l.height,d=l&&l.width;if(this.id=TR(),this.ctx=o,this.canvas=l,this.width=d,this.height=c,this._options=a,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new sM,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=UR(h=>this.update(h),a.resizeDelay||0),this._dataChanges=[],Po[this.id]=this,!o||!l){console.error("Failed to create chart: can't acquire context from the given item");return}en.listen(this,"complete",lm),en.listen(this,"progress",vM),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:e},width:i,height:s,_aspectRatio:r}=this;return nt(t)?e&&r?r:s?i/s:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return je}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():Dg(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Pg(this.canvas,this.ctx),this}stop(){return en.stop(this),this}resize(t,e){en.running(this)?this._resizeBeforeDraw={width:t,height:e}:this._resize(t,e)}_resize(t,e){const i=this.options,s=this.canvas,r=i.maintainAspectRatio&&this.aspectRatio,a=this.platform.getMaximumSize(s,t,e,r),o=i.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=a.width,this.height=a.height,this._aspectRatio=this.aspectRatio,Dg(this,o,!0)&&(this.notifyPlugins("resize",{size:a}),bt(i.onResize,[this,a],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){const e=this.options.scales||{};pt(e,(i,s)=>{i.id=s})}buildOrUpdateScales(){const t=this.options,e=t.scales,i=this.scales,s=Object.keys(i).reduce((a,o)=>(a[o]=!1,a),{});let r=[];e&&(r=r.concat(Object.keys(e).map(a=>{const o=e[a],l=Cu(a,o),c=l==="r",d=l==="x";return{options:o,dposition:c?"chartArea":d?"bottom":"left",dtype:c?"radialLinear":d?"category":"linear"}}))),pt(r,a=>{const o=a.options,l=o.id,c=Cu(l,o),d=Z(o.type,a.dtype);(o.position===void 0||am(o.position,c)!==am(a.dposition))&&(o.position=a.dposition),s[l]=!0;let h=null;if(l in i&&i[l].type===d)h=i[l];else{const f=je.getScale(d);h=new f({id:l,type:d,ctx:this.ctx,chart:this}),i[h.id]=h}h.init(o,t)}),pt(s,(a,o)=>{a||delete i[o]}),pt(i,a=>{re.configure(this,a,a.options),re.addBox(this,a)})}_updateMetasets(){const t=this._metasets,e=this.data.datasets.length,i=t.length;if(t.sort((s,r)=>s.index-r.index),i>e){for(let s=e;s<i;++s)this._destroyDatasetMeta(s);t.splice(e,i-e)}this._sortedMetasets=t.slice(0).sort(om("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:e}}=this;t.length>e.length&&delete this._stacks,t.forEach((i,s)=>{e.filter(r=>r===i._dataset).length===0&&this._destroyDatasetMeta(s)})}buildOrUpdateControllers(){const t=[],e=this.data.datasets;let i,s;for(this._removeUnreferencedMetasets(),i=0,s=e.length;i<s;i++){const r=e[i];let a=this.getDatasetMeta(i);const o=r.type||this.config.type;if(a.type&&a.type!==o&&(this._destroyDatasetMeta(i),a=this.getDatasetMeta(i)),a.type=o,a.indexAxis=r.indexAxis||Ru(o,this.options),a.order=r.order||0,a.index=i,a.label=""+r.label,a.visible=this.isDatasetVisible(i),a.controller)a.controller.updateIndex(i),a.controller.linkScales();else{const l=je.getController(o),{datasetElementType:c,dataElementType:d}=At.datasets[o];Object.assign(l,{dataElementType:je.getElement(d),datasetElementType:c&&je.getElement(c)}),a.controller=new l(this,i),t.push(a.controller)}}return this._updateMetasets(),t}_resetElements(){pt(this.data.datasets,(t,e)=>{this.getDatasetMeta(e).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const e=this.config;e.update();const i=this._options=e.createResolver(e.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const r=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let a=0;for(let c=0,d=this.data.datasets.length;c<d;c++){const{controller:h}=this.getDatasetMeta(c),f=!s&&r.indexOf(h)===-1;h.buildOrUpdateElements(f),a=Math.max(+h.getMaxOverflow(),a)}a=this._minPadding=i.layout.autoPadding?a:0,this._updateLayout(a),s||pt(r,c=>{c.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(om("z","_idx"));const{_active:o,_lastEvent:l}=this;l?this._eventHandler(l,!0):o.length&&this._updateHoverStyles(o,o,!0),this.render()}_updateScales(){pt(this.scales,t=>{re.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,e=new Set(Object.keys(this._listeners)),i=new Set(t.events);(!vg(e,i)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,e=this._getUniformDataChanges()||[];for(const{method:i,start:s,count:r}of e){const a=i==="_removeElements"?-r:r;wM(t,s,a)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const e=this.data.datasets.length,i=r=>new Set(t.filter(a=>a[0]===r).map((a,o)=>o+","+a.splice(1).join(","))),s=i(0);for(let r=1;r<e;r++)if(!vg(s,i(r)))return;return Array.from(s).map(r=>r.split(",")).map(r=>({method:r[1],start:+r[2],count:+r[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;re.update(this,this.width,this.height,t);const e=this.chartArea,i=e.width<=0||e.height<=0;this._layers=[],pt(this.boxes,s=>{i&&s.position==="chartArea"||(s.configure&&s.configure(),this._layers.push(...s._layers()))},this),this._layers.forEach((s,r)=>{s._idx=r}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let e=0,i=this.data.datasets.length;e<i;++e)this.getDatasetMeta(e).controller.configure();for(let e=0,i=this.data.datasets.length;e<i;++e)this._updateDataset(e,Yn(t)?t({datasetIndex:e}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,e){const i=this.getDatasetMeta(t),s={meta:i,index:t,mode:e,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",s)!==!1&&(i.controller._update(e),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(en.has(this)?this.attached&&!en.running(this)&&en.start(this):(this.draw(),lm({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:i,height:s}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,s)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const e=this._layers;for(t=0;t<e.length&&e[t].z<=0;++t)e[t].draw(this.chartArea);for(this._drawDatasets();t<e.length;++t)e[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const e=this._sortedMetasets,i=[];let s,r;for(s=0,r=e.length;s<r;++s){const a=e[s];(!t||a.visible)&&i.push(a)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let e=t.length-1;e>=0;--e)this._drawDataset(t[e]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const e=this.ctx,i={meta:t,index:t.index,cancelable:!0},s=Rv(this,t);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(s&&Ul(e,s),t.controller.draw(),s&&jl(e),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(t){return fn(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,e,i,s){const r=bD.modes[e];return typeof r=="function"?r(this,t,i,s):[]}getDatasetMeta(t){const e=this.data.datasets[t],i=this._metasets;let s=i.filter(r=>r&&r._dataset===e).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e&&e.order||0,index:t,_dataset:e,_parsed:[],_sorted:!1},i.push(s)),s}getContext(){return this.$context||(this.$context=Zn(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const e=this.data.datasets[t];if(!e)return!1;const i=this.getDatasetMeta(t);return typeof i.hidden=="boolean"?!i.hidden:!e.hidden}setDatasetVisibility(t,e){const i=this.getDatasetMeta(t);i.hidden=!e}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,e,i){const s=i?"show":"hide",r=this.getDatasetMeta(t),a=r.controller._resolveAnimations(void 0,s);Zr(e)?(r.data[e].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),a.update(r,{visible:i}),this.update(o=>o.datasetIndex===t?s:void 0))}hide(t,e){this._updateVisibility(t,e,!1)}show(t,e){this._updateVisibility(t,e,!0)}_destroyDatasetMeta(t){const e=this._metasets[t];e&&e.controller&&e.controller._destroy(),delete this._metasets[t]}_stop(){let t,e;for(this.stop(),en.remove(this),t=0,e=this.data.datasets.length;t<e;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:e}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),Pg(t,e),this.platform.releaseContext(e),this.canvas=null,this.ctx=null),delete Po[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,e=this.platform,i=(r,a)=>{e.addEventListener(this,r,a),t[r]=a},s=(r,a,o)=>{r.offsetX=a,r.offsetY=o,this._eventHandler(r)};pt(this.options.events,r=>i(r,s))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,e=this.platform,i=(l,c)=>{e.addEventListener(this,l,c),t[l]=c},s=(l,c)=>{t[l]&&(e.removeEventListener(this,l,c),delete t[l])},r=(l,c)=>{this.canvas&&this.resize(l,c)};let a;const o=()=>{s("attach",o),this.attached=!0,this.resize(),i("resize",r),i("detach",a)};a=()=>{this.attached=!1,s("resize",r),this._stop(),this._resize(0,0),i("attach",o)},e.isAttached(this.canvas)?o():a()}unbindEvents(){pt(this._listeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._listeners={},pt(this._responsiveListeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,e,i){const s=i?"set":"remove";let r,a,o,l;for(e==="dataset"&&(r=this.getDatasetMeta(t[0].datasetIndex),r.controller["_"+s+"DatasetHoverStyle"]()),o=0,l=t.length;o<l;++o){a=t[o];const c=a&&this.getDatasetMeta(a.datasetIndex).controller;c&&c[s+"HoverStyle"](a.element,a.datasetIndex,a.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const e=this._active||[],i=t.map(({datasetIndex:r,index:a})=>{const o=this.getDatasetMeta(r);if(!o)throw new Error("No dataset found at index "+r);return{datasetIndex:r,element:o.data[a],index:a}});!nl(i,e)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,e))}notifyPlugins(t,e,i){return this._plugins.notify(this,t,e,i)}isPluginEnabled(t){return this._plugins._cache.filter(e=>e.plugin.id===t).length===1}_updateHoverStyles(t,e,i){const s=this.options.hover,r=(l,c)=>l.filter(d=>!c.some(h=>d.datasetIndex===h.datasetIndex&&d.index===h.index)),a=r(e,t),o=i?t:r(t,e);a.length&&this.updateHoverStyle(a,s.mode,!1),o.length&&s.mode&&this.updateHoverStyle(o,s.mode,!0)}_eventHandler(t,e){const i={event:t,replay:e,cancelable:!0,inChartArea:this.isPointInArea(t)},s=a=>(a.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",i,s)===!1)return;const r=this._handleEvent(t,e,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,s),(r||i.changed)&&this.render(),this}_handleEvent(t,e,i){const{_active:s=[],options:r}=this,a=e,o=this._getActiveElements(t,s,i,a),l=PR(t),c=IM(t,this._lastEvent,i,l);i&&(this._lastEvent=null,bt(r.onHover,[t,o,this],this),l&&bt(r.onClick,[t,o,this],this));const d=!nl(o,s);return(d||e)&&(this._active=o,this._updateHoverStyles(o,s,e)),this._lastEvent=c,d}_getActiveElements(t,e,i,s){if(t.type==="mouseout")return[];if(!i)return e;const r=this.options.hover;return this.getElementsAtEventForMode(t,r.mode,r,s)}}j(Ce,"defaults",At),j(Ce,"instances",Po),j(Ce,"overrides",Ni),j(Ce,"registry",je),j(Ce,"version",_M),j(Ce,"getChart",cm);function um(){return pt(Ce.instances,n=>n._plugins.invalidate())}function TM(n,t,e){const{startAngle:i,x:s,y:r,outerRadius:a,innerRadius:o,options:l}=t,{borderWidth:c,borderJoinStyle:d}=l,h=Math.min(c/a,se(i-e));if(n.beginPath(),n.arc(s,r,a-c/2,i+h/2,e-h/2),o>0){const f=Math.min(c/o,se(i-e));n.arc(s,r,o+c/2,e-f/2,i+f/2,!0)}else{const f=Math.min(c/2,a*se(i-e));if(d==="round")n.arc(s,r,f,e-ht/2,i+ht/2,!0);else if(d==="bevel"){const g=2*f*f,y=-g*Math.cos(e+ht/2)+s,v=-g*Math.sin(e+ht/2)+r,w=g*Math.cos(i+ht/2)+s,A=g*Math.sin(i+ht/2)+r;n.lineTo(y,v),n.lineTo(w,A)}}n.closePath(),n.moveTo(0,0),n.rect(0,0,n.canvas.width,n.canvas.height),n.clip("evenodd")}function EM(n,t,e){const{startAngle:i,pixelMargin:s,x:r,y:a,outerRadius:o,innerRadius:l}=t;let c=s/o;n.beginPath(),n.arc(r,a,o,i-c,e+c),l>s?(c=s/l,n.arc(r,a,l,e+c,i-c,!0)):n.arc(r,a,s,e+Vt,i-Vt),n.closePath(),n.clip()}function xM(n){return uh(n,["outerStart","outerEnd","innerStart","innerEnd"])}function kM(n,t,e,i){const s=xM(n.options.borderRadius),r=(e-t)/2,a=Math.min(r,i*t/2),o=l=>{const c=(e-Math.min(r,l))*i/2;return qt(l,0,Math.min(r,c))};return{outerStart:o(s.outerStart),outerEnd:o(s.outerEnd),innerStart:qt(s.innerStart,0,a),innerEnd:qt(s.innerEnd,0,a)}}function ns(n,t,e,i){return{x:e+n*Math.cos(t),y:i+n*Math.sin(t)}}function ll(n,t,e,i,s,r){const{x:a,y:o,startAngle:l,pixelMargin:c,innerRadius:d}=t,h=Math.max(t.outerRadius+i+e-c,0),f=d>0?d+i+e+c:0;let g=0;const y=s-l;if(i){const G=d>0?d-i:0,X=h>0?h-i:0,Q=(G+X)/2,it=Q!==0?y*Q/(Q+i):y;g=(y-it)/2}const v=Math.max(.001,y*h-e/ht)/h,w=(y-v)/2,A=l+w+g,S=s-w-g,{outerStart:P,outerEnd:D,innerStart:M,innerEnd:C}=kM(t,f,h,S-A),I=h-P,_=h-D,b=A+P/I,E=S-D/_,k=f+M,R=f+C,x=A+M/k,$=S-C/R;if(n.beginPath(),r){const G=(b+E)/2;if(n.arc(a,o,h,b,G),n.arc(a,o,h,G,E),D>0){const ft=ns(_,E,a,o);n.arc(ft.x,ft.y,D,E,S+Vt)}const X=ns(R,S,a,o);if(n.lineTo(X.x,X.y),C>0){const ft=ns(R,$,a,o);n.arc(ft.x,ft.y,C,S+Vt,$+Math.PI)}const Q=(S-C/f+(A+M/f))/2;if(n.arc(a,o,f,S-C/f,Q,!0),n.arc(a,o,f,Q,A+M/f,!0),M>0){const ft=ns(k,x,a,o);n.arc(ft.x,ft.y,M,x+Math.PI,A-Vt)}const it=ns(I,A,a,o);if(n.lineTo(it.x,it.y),P>0){const ft=ns(I,b,a,o);n.arc(ft.x,ft.y,P,A-Vt,b)}}else{n.moveTo(a,o);const G=Math.cos(b)*h+a,X=Math.sin(b)*h+o;n.lineTo(G,X);const Q=Math.cos(E)*h+a,it=Math.sin(E)*h+o;n.lineTo(Q,it)}n.closePath()}function AM(n,t,e,i,s){const{fullCircles:r,startAngle:a,circumference:o}=t;let l=t.endAngle;if(r){ll(n,t,e,i,l,s);for(let c=0;c<r;++c)n.fill();isNaN(o)||(l=a+(o%It||It))}return ll(n,t,e,i,l,s),n.fill(),l}function SM(n,t,e,i,s){const{fullCircles:r,startAngle:a,circumference:o,options:l}=t,{borderWidth:c,borderJoinStyle:d,borderDash:h,borderDashOffset:f,borderRadius:g}=l,y=l.borderAlign==="inner";if(!c)return;n.setLineDash(h||[]),n.lineDashOffset=f,y?(n.lineWidth=c*2,n.lineJoin=d||"round"):(n.lineWidth=c,n.lineJoin=d||"bevel");let v=t.endAngle;if(r){ll(n,t,e,i,v,s);for(let w=0;w<r;++w)n.stroke();isNaN(o)||(v=a+(o%It||It))}y&&EM(n,t,v),l.selfJoin&&v-a>=ht&&g===0&&d!=="miter"&&TM(n,t,v),r||(ll(n,t,e,i,v,s),n.stroke())}class _r extends Fe{constructor(e){super();j(this,"circumference");j(this,"endAngle");j(this,"fullCircles");j(this,"innerRadius");j(this,"outerRadius");j(this,"pixelMargin");j(this,"startAngle");this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,e&&Object.assign(this,e)}inRange(e,i,s){const r=this.getProps(["x","y"],s),{angle:a,distance:o}=cv(r,{x:e,y:i}),{startAngle:l,endAngle:c,innerRadius:d,outerRadius:h,circumference:f}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],s),g=(this.options.spacing+this.options.borderWidth)/2,y=Z(f,c-l),v=ta(a,l,c)&&l!==c,w=y>=It||v,A=dn(o,d+g,h+g);return w&&A}getCenterPoint(e){const{x:i,y:s,startAngle:r,endAngle:a,innerRadius:o,outerRadius:l}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],e),{offset:c,spacing:d}=this.options,h=(r+a)/2,f=(o+l+d+c)/2;return{x:i+Math.cos(h)*f,y:s+Math.sin(h)*f}}tooltipPosition(e){return this.getCenterPoint(e)}draw(e){const{options:i,circumference:s}=this,r=(i.offset||0)/4,a=(i.spacing||0)/2,o=i.circular;if(this.pixelMargin=i.borderAlign==="inner"?.33:0,this.fullCircles=s>It?Math.floor(s/It):0,s===0||this.innerRadius<0||this.outerRadius<0)return;e.save();const l=(this.startAngle+this.endAngle)/2;e.translate(Math.cos(l)*r,Math.sin(l)*r);const c=1-Math.sin(Math.min(ht,s||0)),d=r*c;e.fillStyle=i.backgroundColor,e.strokeStyle=i.borderColor,AM(e,this,d,a,o),SM(e,this,d,a,o),e.restore()}}j(_r,"id","arc"),j(_r,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1}),j(_r,"defaultRoutes",{backgroundColor:"backgroundColor"}),j(_r,"descriptors",{_scriptable:!0,_indexable:e=>e!=="borderDash"});function $v(n,t,e=t){n.lineCap=Z(e.borderCapStyle,t.borderCapStyle),n.setLineDash(Z(e.borderDash,t.borderDash)),n.lineDashOffset=Z(e.borderDashOffset,t.borderDashOffset),n.lineJoin=Z(e.borderJoinStyle,t.borderJoinStyle),n.lineWidth=Z(e.borderWidth,t.borderWidth),n.strokeStyle=Z(e.borderColor,t.borderColor)}function PM(n,t,e){n.lineTo(e.x,e.y)}function RM(n){return n.stepped?XR:n.tension||n.cubicInterpolationMode==="monotone"?ZR:PM}function Hv(n,t,e={}){const i=n.length,{start:s=0,end:r=i-1}=e,{start:a,end:o}=t,l=Math.max(s,a),c=Math.min(r,o),d=s<a&&r<a||s>o&&r>o;return{count:i,start:l,loop:t.loop,ilen:c<l&&!d?i+c-l:c-l}}function CM(n,t,e,i){const{points:s,options:r}=t,{count:a,start:o,loop:l,ilen:c}=Hv(s,e,i),d=RM(r);let{move:h=!0,reverse:f}=i||{},g,y,v;for(g=0;g<=c;++g)y=s[(o+(f?c-g:g))%a],!y.skip&&(h?(n.moveTo(y.x,y.y),h=!1):d(n,v,y,f,r.stepped),v=y);return l&&(y=s[(o+(f?c:0))%a],d(n,v,y,f,r.stepped)),!!l}function DM(n,t,e,i){const s=t.points,{count:r,start:a,ilen:o}=Hv(s,e,i),{move:l=!0,reverse:c}=i||{};let d=0,h=0,f,g,y,v,w,A;const S=D=>(a+(c?o-D:D))%r,P=()=>{v!==w&&(n.lineTo(d,w),n.lineTo(d,v),n.lineTo(d,A))};for(l&&(g=s[S(0)],n.moveTo(g.x,g.y)),f=0;f<=o;++f){if(g=s[S(f)],g.skip)continue;const D=g.x,M=g.y,C=D|0;C===y?(M<v?v=M:M>w&&(w=M),d=(h*d+D)/++h):(P(),n.lineTo(D,M),y=C,h=0,v=w=M),A=M}P()}function Du(n){const t=n.options,e=t.borderDash&&t.borderDash.length;return!n._decimated&&!n._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!e?DM:CM}function MM(n){return n.stepped?CC:n.tension||n.cubicInterpolationMode==="monotone"?DC:hi}function OM(n,t,e,i){let s=t._path;s||(s=t._path=new Path2D,t.path(s,e,i)&&s.closePath()),$v(n,t.options),n.stroke(s)}function VM(n,t,e,i){const{segments:s,options:r}=t,a=Du(t);for(const o of s)$v(n,r,o.style),n.beginPath(),a(n,t,o,{start:e,end:e+i-1})&&n.closePath(),n.stroke()}const NM=typeof Path2D=="function";function LM(n,t,e,i){NM&&!t.options.segment?OM(n,t,e,i):VM(n,t,e,i)}class Bn extends Fe{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,e){const i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){const s=i.spanGaps?this._loop:this._fullLoop;TC(this._points,i,t,s,e),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=FC(this,this.options.segment))}first(){const t=this.segments,e=this.points;return t.length&&e[t[0].start]}last(){const t=this.segments,e=this.points,i=t.length;return i&&e[t[i-1].end]}interpolate(t,e){const i=this.options,s=t[e],r=this.points,a=Pv(this,{property:e,start:s,end:s});if(!a.length)return;const o=[],l=MM(i);let c,d;for(c=0,d=a.length;c<d;++c){const{start:h,end:f}=a[c],g=r[h],y=r[f];if(g===y){o.push(g);continue}const v=Math.abs((s-g[e])/(y[e]-g[e])),w=l(g,y,v,i.stepped);w[e]=t[e],o.push(w)}return o.length===1?o[0]:o}pathSegment(t,e,i){return Du(this)(t,this,e,i)}path(t,e,i){const s=this.segments,r=Du(this);let a=this._loop;e=e||0,i=i||this.points.length-e;for(const o of s)a&=r(t,this,o,{start:e,end:e+i-1});return!!a}draw(t,e,i,s){const r=this.options||{};(this.points||[]).length&&r.borderWidth&&(t.save(),LM(t,this,i,s),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}j(Bn,"id","line"),j(Bn,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),j(Bn,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),j(Bn,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function dm(n,t,e,i){const s=n.options,{[e]:r}=n.getProps([e],i);return Math.abs(t-r)<s.radius+s.hitRadius}class Ro extends Fe{constructor(e){super();j(this,"parsed");j(this,"skip");j(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,e&&Object.assign(this,e)}inRange(e,i,s){const r=this.options,{x:a,y:o}=this.getProps(["x","y"],s);return Math.pow(e-a,2)+Math.pow(i-o,2)<Math.pow(r.hitRadius+r.radius,2)}inXRange(e,i){return dm(this,e,"x",i)}inYRange(e,i){return dm(this,e,"y",i)}getCenterPoint(e){const{x:i,y:s}=this.getProps(["x","y"],e);return{x:i,y:s}}size(e){e=e||this.options||{};let i=e.radius||0;i=Math.max(i,i&&e.hoverRadius||0);const s=i&&e.borderWidth||0;return(i+s)*2}draw(e,i){const s=this.options;this.skip||s.radius<.1||!fn(this,i,this.size(s)/2)||(e.strokeStyle=s.borderColor,e.lineWidth=s.borderWidth,e.fillStyle=s.backgroundColor,Su(e,s,this.x,this.y))}getRange(){const e=this.options||{};return e.radius+e.hitRadius}}j(Ro,"id","point"),j(Ro,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),j(Ro,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function qv(n,t){const{x:e,y:i,base:s,width:r,height:a}=n.getProps(["x","y","base","width","height"],t);let o,l,c,d,h;return n.horizontal?(h=a/2,o=Math.min(e,s),l=Math.max(e,s),c=i-h,d=i+h):(h=r/2,o=e-h,l=e+h,c=Math.min(i,s),d=Math.max(i,s)),{left:o,top:c,right:l,bottom:d}}function Un(n,t,e,i){return n?0:qt(t,e,i)}function FM(n,t,e){const i=n.options.borderWidth,s=n.borderSkipped,r=_v(i);return{t:Un(s.top,r.top,0,e),r:Un(s.right,r.right,0,t),b:Un(s.bottom,r.bottom,0,e),l:Un(s.left,r.left,0,t)}}function BM(n,t,e){const{enableBorderRadius:i}=n.getProps(["enableBorderRadius"]),s=n.options.borderRadius,r=vi(s),a=Math.min(t,e),o=n.borderSkipped,l=i||at(s);return{topLeft:Un(!l||o.top||o.left,r.topLeft,0,a),topRight:Un(!l||o.top||o.right,r.topRight,0,a),bottomLeft:Un(!l||o.bottom||o.left,r.bottomLeft,0,a),bottomRight:Un(!l||o.bottom||o.right,r.bottomRight,0,a)}}function UM(n){const t=qv(n),e=t.right-t.left,i=t.bottom-t.top,s=FM(n,e/2,i/2),r=BM(n,e/2,i/2);return{outer:{x:t.left,y:t.top,w:e,h:i,radius:r},inner:{x:t.left+s.l,y:t.top+s.t,w:e-s.l-s.r,h:i-s.t-s.b,radius:{topLeft:Math.max(0,r.topLeft-Math.max(s.t,s.l)),topRight:Math.max(0,r.topRight-Math.max(s.t,s.r)),bottomLeft:Math.max(0,r.bottomLeft-Math.max(s.b,s.l)),bottomRight:Math.max(0,r.bottomRight-Math.max(s.b,s.r))}}}}function zc(n,t,e,i){const s=t===null,r=e===null,o=n&&!(s&&r)&&qv(n,i);return o&&(s||dn(t,o.left,o.right))&&(r||dn(e,o.top,o.bottom))}function jM(n){return n.topLeft||n.topRight||n.bottomLeft||n.bottomRight}function zM(n,t){n.rect(t.x,t.y,t.w,t.h)}function $c(n,t,e={}){const i=n.x!==e.x?-t:0,s=n.y!==e.y?-t:0,r=(n.x+n.w!==e.x+e.w?t:0)-i,a=(n.y+n.h!==e.y+e.h?t:0)-s;return{x:n.x+i,y:n.y+s,w:n.w+r,h:n.h+a,radius:n.radius}}class Co extends Fe{constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:e,options:{borderColor:i,backgroundColor:s}}=this,{inner:r,outer:a}=UM(this),o=jM(a.radius)?ea:zM;t.save(),(a.w!==r.w||a.h!==r.h)&&(t.beginPath(),o(t,$c(a,e,r)),t.clip(),o(t,$c(r,-e,a)),t.fillStyle=i,t.fill("evenodd")),t.beginPath(),o(t,$c(r,e)),t.fillStyle=s,t.fill(),t.restore()}inRange(t,e,i){return zc(this,t,e,i)}inXRange(t,e){return zc(this,t,null,e)}inYRange(t,e){return zc(this,null,t,e)}getCenterPoint(t){const{x:e,y:i,base:s,horizontal:r}=this.getProps(["x","y","base","horizontal"],t);return{x:r?(e+s)/2:e,y:r?i:(i+s)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}j(Co,"id","bar"),j(Co,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),j(Co,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});var $M=Object.freeze({__proto__:null,ArcElement:_r,BarElement:Co,LineElement:Bn,PointElement:Ro});const Mu=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],hm=Mu.map(n=>n.replace("rgb(","rgba(").replace(")",", 0.5)"));function Wv(n){return Mu[n%Mu.length]}function Kv(n){return hm[n%hm.length]}function HM(n,t){return n.borderColor=Wv(t),n.backgroundColor=Kv(t),++t}function qM(n,t){return n.backgroundColor=n.data.map(()=>Wv(t++)),t}function WM(n,t){return n.backgroundColor=n.data.map(()=>Kv(t++)),t}function KM(n){let t=0;return(e,i)=>{const s=n.getDatasetMeta(i).controller;s instanceof _i?t=qM(e,t):s instanceof Dr?t=WM(e,t):s&&(t=HM(e,t))}}function fm(n){let t;for(t in n)if(n[t].borderColor||n[t].backgroundColor)return!0;return!1}function GM(n){return n&&(n.borderColor||n.backgroundColor)}function YM(){return At.borderColor!=="rgba(0,0,0,0.1)"||At.backgroundColor!=="rgba(0,0,0,0.1)"}var QM={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(n,t,e){if(!e.enabled)return;const{data:{datasets:i},options:s}=n.config,{elements:r}=s,a=fm(i)||GM(s)||r&&fm(r)||YM();if(!e.forceOverride&&a)return;const o=KM(n);i.forEach(o)}};function JM(n,t,e,i,s){const r=s.samples||i;if(r>=e)return n.slice(t,t+e);const a=[],o=(e-2)/(r-2);let l=0;const c=t+e-1;let d=t,h,f,g,y,v;for(a[l++]=n[d],h=0;h<r-2;h++){let w=0,A=0,S;const P=Math.floor((h+1)*o)+1+t,D=Math.min(Math.floor((h+2)*o)+1,e)+t,M=D-P;for(S=P;S<D;S++)w+=n[S].x,A+=n[S].y;w/=M,A/=M;const C=Math.floor(h*o)+1+t,I=Math.min(Math.floor((h+1)*o)+1,e)+t,{x:_,y:b}=n[d];for(g=y=-1,S=C;S<I;S++)y=.5*Math.abs((_-w)*(n[S].y-b)-(_-n[S].x)*(A-b)),y>g&&(g=y,f=n[S],v=S);a[l++]=f,d=v}return a[l++]=n[c],a}function XM(n,t,e,i){let s=0,r=0,a,o,l,c,d,h,f,g,y,v;const w=[],A=t+e-1,S=n[t].x,D=n[A].x-S;for(a=t;a<t+e;++a){o=n[a],l=(o.x-S)/D*i,c=o.y;const M=l|0;if(M===d)c<y?(y=c,h=a):c>v&&(v=c,f=a),s=(r*s+o.x)/++r;else{const C=a-1;if(!nt(h)&&!nt(f)){const I=Math.min(h,f),_=Math.max(h,f);I!==g&&I!==C&&w.push({...n[I],x:s}),_!==g&&_!==C&&w.push({...n[_],x:s})}a>0&&C!==g&&w.push(n[C]),w.push(o),d=M,r=0,y=v=c,h=f=g=a}}return w}function Gv(n){if(n._decimated){const t=n._data;delete n._decimated,delete n._data,Object.defineProperty(n,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function pm(n){n.data.datasets.forEach(t=>{Gv(t)})}function ZM(n,t){const e=t.length;let i=0,s;const{iScale:r}=n,{min:a,max:o,minDefined:l,maxDefined:c}=r.getUserBounds();return l&&(i=qt(hn(t,r.axis,a).lo,0,e-1)),c?s=qt(hn(t,r.axis,o).hi+1,i,e)-i:s=e-i,{start:i,count:s}}var t1={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(n,t,e)=>{if(!e.enabled){pm(n);return}const i=n.width;n.data.datasets.forEach((s,r)=>{const{_data:a,indexAxis:o}=s,l=n.getDatasetMeta(r),c=a||s.data;if(mr([o,n.options.indexAxis])==="y"||!l.controller.supportsDecimation)return;const d=n.scales[l.xAxisID];if(d.type!=="linear"&&d.type!=="time"||n.options.parsing)return;let{start:h,count:f}=ZM(l,c);const g=e.threshold||4*i;if(f<=g){Gv(s);return}nt(a)&&(s._data=c,delete s.data,Object.defineProperty(s,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(v){this._data=v}}));let y;switch(e.algorithm){case"lttb":y=JM(c,h,f,i,e);break;case"min-max":y=XM(c,h,f,i);break;default:throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`)}s._decimated=y})},destroy(n){pm(n)}};function e1(n,t,e){const i=n.segments,s=n.points,r=t.points,a=[];for(const o of i){let{start:l,end:c}=o;c=Hl(l,c,s);const d=Ou(e,s[l],s[c],o.loop);if(!t.segments){a.push({source:o,target:d,start:s[l],end:s[c]});continue}const h=Pv(t,d);for(const f of h){const g=Ou(e,r[f.start],r[f.end],f.loop),y=Sv(o,s,g);for(const v of y)a.push({source:v,target:f,start:{[e]:gm(d,g,"start",Math.max)},end:{[e]:gm(d,g,"end",Math.min)}})}}return a}function Ou(n,t,e,i){if(i)return;let s=t[n],r=e[n];return n==="angle"&&(s=se(s),r=se(r)),{property:n,start:s,end:r}}function n1(n,t){const{x:e=null,y:i=null}=n||{},s=t.points,r=[];return t.segments.forEach(({start:a,end:o})=>{o=Hl(a,o,s);const l=s[a],c=s[o];i!==null?(r.push({x:l.x,y:i}),r.push({x:c.x,y:i})):e!==null&&(r.push({x:e,y:l.y}),r.push({x:e,y:c.y}))}),r}function Hl(n,t,e){for(;t>n;t--){const i=e[t];if(!isNaN(i.x)&&!isNaN(i.y))break}return t}function gm(n,t,e,i){return n&&t?i(n[e],t[e]):n?n[e]:t?t[e]:0}function Yv(n,t){let e=[],i=!1;return kt(n)?(i=!0,e=n):e=n1(n,t),e.length?new Bn({points:e,options:{tension:0},_loop:i,_fullLoop:i}):null}function mm(n){return n&&n.fill!==!1}function i1(n,t,e){let s=n[t].fill;const r=[t];let a;if(!e)return s;for(;s!==!1&&r.indexOf(s)===-1;){if(!Mt(s))return s;if(a=n[s],!a)return!1;if(a.visible)return s;r.push(s),s=a.fill}return!1}function s1(n,t,e){const i=l1(n);if(at(i))return isNaN(i.value)?!1:i;let s=parseFloat(i);return Mt(s)&&Math.floor(s)===s?r1(i[0],t,s,e):["origin","start","end","stack","shape"].indexOf(i)>=0&&i}function r1(n,t,e,i){return(n==="-"||n==="+")&&(e=t+e),e===t||e<0||e>=i?!1:e}function a1(n,t){let e=null;return n==="start"?e=t.bottom:n==="end"?e=t.top:at(n)?e=t.getPixelForValue(n.value):t.getBasePixel&&(e=t.getBasePixel()),e}function o1(n,t,e){let i;return n==="start"?i=e:n==="end"?i=t.options.reverse?t.min:t.max:at(n)?i=n.value:i=t.getBaseValue(),i}function l1(n){const t=n.options,e=t.fill;let i=Z(e&&e.target,e);return i===void 0&&(i=!!t.backgroundColor),i===!1||i===null?!1:i===!0?"origin":i}function c1(n){const{scale:t,index:e,line:i}=n,s=[],r=i.segments,a=i.points,o=u1(t,e);o.push(Yv({x:null,y:t.bottom},i));for(let l=0;l<r.length;l++){const c=r[l];for(let d=c.start;d<=c.end;d++)d1(s,a[d],o)}return new Bn({points:s,options:{}})}function u1(n,t){const e=[],i=n.getMatchingVisibleMetas("line");for(let s=0;s<i.length;s++){const r=i[s];if(r.index===t)break;r.hidden||e.unshift(r.dataset)}return e}function d1(n,t,e){const i=[];for(let s=0;s<e.length;s++){const r=e[s],{first:a,last:o,point:l}=h1(r,t,"x");if(!(!l||a&&o)){if(a)i.unshift(l);else if(n.push(l),!o)break}}n.push(...i)}function h1(n,t,e){const i=n.interpolate(t,e);if(!i)return{};const s=i[e],r=n.segments,a=n.points;let o=!1,l=!1;for(let c=0;c<r.length;c++){const d=r[c],h=a[d.start][e],f=a[d.end][e];if(dn(s,h,f)){o=s===h,l=s===f;break}}return{first:o,last:l,point:i}}class Qv{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,e,i){const{x:s,y:r,radius:a}=this;return e=e||{start:0,end:It},t.arc(s,r,a,e.end,e.start,!0),!i.bounds}interpolate(t){const{x:e,y:i,radius:s}=this,r=t.angle;return{x:e+Math.cos(r)*s,y:i+Math.sin(r)*s,angle:r}}}function f1(n){const{chart:t,fill:e,line:i}=n;if(Mt(e))return p1(t,e);if(e==="stack")return c1(n);if(e==="shape")return!0;const s=g1(n);return s instanceof Qv?s:Yv(s,i)}function p1(n,t){const e=n.getDatasetMeta(t);return e&&n.isDatasetVisible(t)?e.dataset:null}function g1(n){return(n.scale||{}).getPointPositionForValue?y1(n):m1(n)}function m1(n){const{scale:t={},fill:e}=n,i=a1(e,t);if(Mt(i)){const s=t.isHorizontal();return{x:s?i:null,y:s?null:i}}return null}function y1(n){const{scale:t,fill:e}=n,i=t.options,s=t.getLabels().length,r=i.reverse?t.max:t.min,a=o1(e,t,r),o=[];if(i.grid.circular){const l=t.getPointPositionForValue(0,r);return new Qv({x:l.x,y:l.y,radius:t.getDistanceFromCenterForValue(a)})}for(let l=0;l<s;++l)o.push(t.getPointPositionForValue(l,a));return o}function Hc(n,t,e){const i=f1(t),{chart:s,index:r,line:a,scale:o,axis:l}=t,c=a.options,d=c.fill,h=c.backgroundColor,{above:f=h,below:g=h}=d||{},y=s.getDatasetMeta(r),v=Rv(s,y);i&&a.points.length&&(Ul(n,e),_1(n,{line:a,target:i,above:f,below:g,area:e,scale:o,axis:l,clip:v}),jl(n))}function _1(n,t){const{line:e,target:i,above:s,below:r,area:a,scale:o,clip:l}=t,c=e._loop?"angle":t.axis;n.save();let d=r;r!==s&&(c==="x"?(ym(n,i,a.top),qc(n,{line:e,target:i,color:s,scale:o,property:c,clip:l}),n.restore(),n.save(),ym(n,i,a.bottom)):c==="y"&&(_m(n,i,a.left),qc(n,{line:e,target:i,color:r,scale:o,property:c,clip:l}),n.restore(),n.save(),_m(n,i,a.right),d=s)),qc(n,{line:e,target:i,color:d,scale:o,property:c,clip:l}),n.restore()}function ym(n,t,e){const{segments:i,points:s}=t;let r=!0,a=!1;n.beginPath();for(const o of i){const{start:l,end:c}=o,d=s[l],h=s[Hl(l,c,s)];r?(n.moveTo(d.x,d.y),r=!1):(n.lineTo(d.x,e),n.lineTo(d.x,d.y)),a=!!t.pathSegment(n,o,{move:a}),a?n.closePath():n.lineTo(h.x,e)}n.lineTo(t.first().x,e),n.closePath(),n.clip()}function _m(n,t,e){const{segments:i,points:s}=t;let r=!0,a=!1;n.beginPath();for(const o of i){const{start:l,end:c}=o,d=s[l],h=s[Hl(l,c,s)];r?(n.moveTo(d.x,d.y),r=!1):(n.lineTo(e,d.y),n.lineTo(d.x,d.y)),a=!!t.pathSegment(n,o,{move:a}),a?n.closePath():n.lineTo(e,h.y)}n.lineTo(e,t.first().y),n.closePath(),n.clip()}function qc(n,t){const{line:e,target:i,property:s,color:r,scale:a,clip:o}=t,l=e1(e,i,s);for(const{source:c,target:d,start:h,end:f}of l){const{style:{backgroundColor:g=r}={}}=c,y=i!==!0;n.save(),n.fillStyle=g,b1(n,a,o,y&&Ou(s,h,f)),n.beginPath();const v=!!e.pathSegment(n,c);let w;if(y){v?n.closePath():bm(n,i,f,s);const A=!!i.pathSegment(n,d,{move:v,reverse:!0});w=v&&A,w||bm(n,i,h,s)}n.closePath(),n.fill(w?"evenodd":"nonzero"),n.restore()}}function b1(n,t,e,i){const s=t.chart.chartArea,{property:r,start:a,end:o}=i||{};if(r==="x"||r==="y"){let l,c,d,h;r==="x"?(l=a,c=s.top,d=o,h=s.bottom):(l=s.left,c=a,d=s.right,h=o),n.beginPath(),e&&(l=Math.max(l,e.left),d=Math.min(d,e.right),c=Math.max(c,e.top),h=Math.min(h,e.bottom)),n.rect(l,c,d-l,h-c),n.clip()}}function bm(n,t,e,i){const s=t.interpolate(e,i);s&&n.lineTo(s.x,s.y)}var v1={id:"filler",afterDatasetsUpdate(n,t,e){const i=(n.data.datasets||[]).length,s=[];let r,a,o,l;for(a=0;a<i;++a)r=n.getDatasetMeta(a),o=r.dataset,l=null,o&&o.options&&o instanceof Bn&&(l={visible:n.isDatasetVisible(a),index:a,fill:s1(o,a,i),chart:n,axis:r.controller.options.indexAxis,scale:r.vScale,line:o}),r.$filler=l,s.push(l);for(a=0;a<i;++a)l=s[a],!(!l||l.fill===!1)&&(l.fill=i1(s,a,e.propagate))},beforeDraw(n,t,e){const i=e.drawTime==="beforeDraw",s=n.getSortedVisibleDatasetMetas(),r=n.chartArea;for(let a=s.length-1;a>=0;--a){const o=s[a].$filler;o&&(o.line.updateControlPoints(r,o.axis),i&&o.fill&&Hc(n.ctx,o,r))}},beforeDatasetsDraw(n,t,e){if(e.drawTime!=="beforeDatasetsDraw")return;const i=n.getSortedVisibleDatasetMetas();for(let s=i.length-1;s>=0;--s){const r=i[s].$filler;mm(r)&&Hc(n.ctx,r,n.chartArea)}},beforeDatasetDraw(n,t,e){const i=t.meta.$filler;!mm(i)||e.drawTime!=="beforeDatasetDraw"||Hc(n.ctx,i,n.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const vm=(n,t)=>{let{boxHeight:e=t,boxWidth:i=t}=n;return n.usePointStyle&&(e=Math.min(e,t),i=n.pointStyleWidth||Math.min(i,t)),{boxWidth:i,boxHeight:e,itemHeight:Math.max(t,e)}},w1=(n,t)=>n!==null&&t!==null&&n.datasetIndex===t.datasetIndex&&n.index===t.index;class wm extends Fe{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e,i){this.maxWidth=t,this.maxHeight=e,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let e=bt(t.generateLabels,[this.chart],this)||[];t.filter&&(e=e.filter(i=>t.filter(i,this.chart.data))),t.sort&&(e=e.sort((i,s)=>t.sort(i,s,this.chart.data))),this.options.reverse&&e.reverse(),this.legendItems=e}fit(){const{options:t,ctx:e}=this;if(!t.display){this.width=this.height=0;return}const i=t.labels,s=jt(i.font),r=s.size,a=this._computeTitleHeight(),{boxWidth:o,itemHeight:l}=vm(i,r);let c,d;e.font=s.string,this.isHorizontal()?(c=this.maxWidth,d=this._fitRows(a,r,o,l)+10):(d=this.maxHeight,c=this._fitCols(a,s,o,l)+10),this.width=Math.min(c,t.maxWidth||this.maxWidth),this.height=Math.min(d,t.maxHeight||this.maxHeight)}_fitRows(t,e,i,s){const{ctx:r,maxWidth:a,options:{labels:{padding:o}}}=this,l=this.legendHitBoxes=[],c=this.lineWidths=[0],d=s+o;let h=t;r.textAlign="left",r.textBaseline="middle";let f=-1,g=-d;return this.legendItems.forEach((y,v)=>{const w=i+e/2+r.measureText(y.text).width;(v===0||c[c.length-1]+w+2*o>a)&&(h+=d,c[c.length-(v>0?0:1)]=0,g+=d,f++),l[v]={left:0,top:g,row:f,width:w,height:s},c[c.length-1]+=w+o}),h}_fitCols(t,e,i,s){const{ctx:r,maxHeight:a,options:{labels:{padding:o}}}=this,l=this.legendHitBoxes=[],c=this.columnSizes=[],d=a-t;let h=o,f=0,g=0,y=0,v=0;return this.legendItems.forEach((w,A)=>{const{itemWidth:S,itemHeight:P}=I1(i,e,r,w,s);A>0&&g+P+2*o>d&&(h+=f+o,c.push({width:f,height:g}),y+=f+o,v++,f=g=0),l[A]={left:y,top:g,col:v,width:S,height:P},f=Math.max(f,S),g+=P+o}),h+=f,c.push({width:f,height:g}),h}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:e,options:{align:i,labels:{padding:s},rtl:r}}=this,a=ms(r,this.left,this.width);if(this.isHorizontal()){let o=0,l=ie(i,this.left+s,this.right-this.lineWidths[o]);for(const c of e)o!==c.row&&(o=c.row,l=ie(i,this.left+s,this.right-this.lineWidths[o])),c.top+=this.top+t+s,c.left=a.leftForLtr(a.x(l),c.width),l+=c.width+s}else{let o=0,l=ie(i,this.top+t+s,this.bottom-this.columnSizes[o].height);for(const c of e)c.col!==o&&(o=c.col,l=ie(i,this.top+t+s,this.bottom-this.columnSizes[o].height)),c.top=l,c.left+=this.left+s,c.left=a.leftForLtr(a.x(c.left),c.width),l+=c.height+s}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Ul(t,this),this._draw(),jl(t)}}_draw(){const{options:t,columnSizes:e,lineWidths:i,ctx:s}=this,{align:r,labels:a}=t,o=At.color,l=ms(t.rtl,this.left,this.width),c=jt(a.font),{padding:d}=a,h=c.size,f=h/2;let g;this.drawTitle(),s.textAlign=l.textAlign("left"),s.textBaseline="middle",s.lineWidth=.5,s.font=c.string;const{boxWidth:y,boxHeight:v,itemHeight:w}=vm(a,h),A=function(C,I,_){if(isNaN(y)||y<=0||isNaN(v)||v<0)return;s.save();const b=Z(_.lineWidth,1);if(s.fillStyle=Z(_.fillStyle,o),s.lineCap=Z(_.lineCap,"butt"),s.lineDashOffset=Z(_.lineDashOffset,0),s.lineJoin=Z(_.lineJoin,"miter"),s.lineWidth=b,s.strokeStyle=Z(_.strokeStyle,o),s.setLineDash(Z(_.lineDash,[])),a.usePointStyle){const E={radius:v*Math.SQRT2/2,pointStyle:_.pointStyle,rotation:_.rotation,borderWidth:b},k=l.xPlus(C,y/2),R=I+f;yv(s,E,k,R,a.pointStyleWidth&&y)}else{const E=I+Math.max((h-v)/2,0),k=l.leftForLtr(C,y),R=vi(_.borderRadius);s.beginPath(),Object.values(R).some(x=>x!==0)?ea(s,{x:k,y:E,w:y,h:v,radius:R}):s.rect(k,E,y,v),s.fill(),b!==0&&s.stroke()}s.restore()},S=function(C,I,_){Li(s,_.text,C,I+w/2,c,{strikethrough:_.hidden,textAlign:l.textAlign(_.textAlign)})},P=this.isHorizontal(),D=this._computeTitleHeight();P?g={x:ie(r,this.left+d,this.right-i[0]),y:this.top+d+D,line:0}:g={x:this.left+d,y:ie(r,this.top+D+d,this.bottom-e[0].height),line:0},xv(this.ctx,t.textDirection);const M=w+d;this.legendItems.forEach((C,I)=>{s.strokeStyle=C.fontColor,s.fillStyle=C.fontColor;const _=s.measureText(C.text).width,b=l.textAlign(C.textAlign||(C.textAlign=a.textAlign)),E=y+f+_;let k=g.x,R=g.y;l.setWidth(this.width),P?I>0&&k+E+d>this.right&&(R=g.y+=M,g.line++,k=g.x=ie(r,this.left+d,this.right-i[g.line])):I>0&&R+M>this.bottom&&(k=g.x=k+e[g.line].width+d,g.line++,R=g.y=ie(r,this.top+D+d,this.bottom-e[g.line].height));const x=l.x(k);if(A(x,R,C),k=jR(b,k+y+f,P?k+E:this.right,t.rtl),S(l.x(k),R,C),P)g.x+=E+d;else if(typeof C.text!="string"){const $=c.lineHeight;g.y+=Jv(C,$)+d}else g.y+=M}),kv(this.ctx,t.textDirection)}drawTitle(){const t=this.options,e=t.title,i=jt(e.font),s=ae(e.padding);if(!e.display)return;const r=ms(t.rtl,this.left,this.width),a=this.ctx,o=e.position,l=i.size/2,c=s.top+l;let d,h=this.left,f=this.width;if(this.isHorizontal())f=Math.max(...this.lineWidths),d=this.top+c,h=ie(t.align,h,this.right-f);else{const y=this.columnSizes.reduce((v,w)=>Math.max(v,w.height),0);d=c+ie(t.align,this.top,this.bottom-y-t.labels.padding-this._computeTitleHeight())}const g=ie(o,h,h+f);a.textAlign=r.textAlign(lh(o)),a.textBaseline="middle",a.strokeStyle=e.color,a.fillStyle=e.color,a.font=i.string,Li(a,e.text,g,d,i)}_computeTitleHeight(){const t=this.options.title,e=jt(t.font),i=ae(t.padding);return t.display?e.lineHeight+i.height:0}_getLegendItemAt(t,e){let i,s,r;if(dn(t,this.left,this.right)&&dn(e,this.top,this.bottom)){for(r=this.legendHitBoxes,i=0;i<r.length;++i)if(s=r[i],dn(t,s.left,s.left+s.width)&&dn(e,s.top,s.top+s.height))return this.legendItems[i]}return null}handleEvent(t){const e=this.options;if(!x1(t.type,e))return;const i=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const s=this._hoveredItem,r=w1(s,i);s&&!r&&bt(e.onLeave,[t,s,this],this),this._hoveredItem=i,i&&!r&&bt(e.onHover,[t,i,this],this)}else i&&bt(e.onClick,[t,i,this],this)}}function I1(n,t,e,i,s){const r=T1(i,n,t,e),a=E1(s,i,t.lineHeight);return{itemWidth:r,itemHeight:a}}function T1(n,t,e,i){let s=n.text;return s&&typeof s!="string"&&(s=s.reduce((r,a)=>r.length>a.length?r:a)),t+e.size/2+i.measureText(s).width}function E1(n,t,e){let i=n;return typeof t.text!="string"&&(i=Jv(t,e)),i}function Jv(n,t){const e=n.text?n.text.length:0;return t*e}function x1(n,t){return!!((n==="mousemove"||n==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(n==="click"||n==="mouseup"))}var k1={id:"legend",_element:wm,start(n,t,e){const i=n.legend=new wm({ctx:n.ctx,options:e,chart:n});re.configure(n,i,e),re.addBox(n,i)},stop(n){re.removeBox(n,n.legend),delete n.legend},beforeUpdate(n,t,e){const i=n.legend;re.configure(n,i,e),i.options=e},afterUpdate(n){const t=n.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(n,t){t.replay||n.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(n,t,e){const i=t.datasetIndex,s=e.chart;s.isDatasetVisible(i)?(s.hide(i),t.hidden=!0):(s.show(i),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:n=>n.chart.options.color,boxWidth:40,padding:10,generateLabels(n){const t=n.data.datasets,{labels:{usePointStyle:e,pointStyle:i,textAlign:s,color:r,useBorderRadius:a,borderRadius:o}}=n.legend.options;return n._getSortedDatasetMetas().map(l=>{const c=l.controller.getStyle(e?0:void 0),d=ae(c.borderWidth);return{text:t[l.index].label,fillStyle:c.backgroundColor,fontColor:r,hidden:!l.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(d.width+d.height)/4,strokeStyle:c.borderColor,pointStyle:i||c.pointStyle,rotation:c.rotation,textAlign:s||c.textAlign,borderRadius:a&&(o||c.borderRadius),datasetIndex:l.index}},this)}},title:{color:n=>n.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:n=>!n.startsWith("on"),labels:{_scriptable:n=>!["generateLabels","filter","sort"].includes(n)}}};class yh extends Fe{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e){const i=this.options;if(this.left=0,this.top=0,!i.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=e;const s=kt(i.text)?i.text.length:1;this._padding=ae(i.padding);const r=s*jt(i.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=r:this.width=r}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:e,left:i,bottom:s,right:r,options:a}=this,o=a.align;let l=0,c,d,h;return this.isHorizontal()?(d=ie(o,i,r),h=e+t,c=r-i):(a.position==="left"?(d=i+t,h=ie(o,s,e),l=ht*-.5):(d=r-t,h=ie(o,e,s),l=ht*.5),c=s-e),{titleX:d,titleY:h,maxWidth:c,rotation:l}}draw(){const t=this.ctx,e=this.options;if(!e.display)return;const i=jt(e.font),r=i.lineHeight/2+this._padding.top,{titleX:a,titleY:o,maxWidth:l,rotation:c}=this._drawArgs(r);Li(t,e.text,0,0,i,{color:e.color,maxWidth:l,rotation:c,textAlign:lh(e.align),textBaseline:"middle",translation:[a,o]})}}function A1(n,t){const e=new yh({ctx:n.ctx,options:t,chart:n});re.configure(n,e,t),re.addBox(n,e),n.titleBlock=e}var S1={id:"title",_element:yh,start(n,t,e){A1(n,e)},stop(n){const t=n.titleBlock;re.removeBox(n,t),delete n.titleBlock},beforeUpdate(n,t,e){const i=n.titleBlock;re.configure(n,i,e),i.options=e},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const ro=new WeakMap;var P1={id:"subtitle",start(n,t,e){const i=new yh({ctx:n.ctx,options:e,chart:n});re.configure(n,i,e),re.addBox(n,i),ro.set(n,i)},stop(n){re.removeBox(n,ro.get(n)),ro.delete(n)},beforeUpdate(n,t,e){const i=ro.get(n);re.configure(n,i,e),i.options=e},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const br={average(n){if(!n.length)return!1;let t,e,i=new Set,s=0,r=0;for(t=0,e=n.length;t<e;++t){const o=n[t].element;if(o&&o.hasValue()){const l=o.tooltipPosition();i.add(l.x),s+=l.y,++r}}return r===0||i.size===0?!1:{x:[...i].reduce((o,l)=>o+l)/i.size,y:s/r}},nearest(n,t){if(!n.length)return!1;let e=t.x,i=t.y,s=Number.POSITIVE_INFINITY,r,a,o;for(r=0,a=n.length;r<a;++r){const l=n[r].element;if(l&&l.hasValue()){const c=l.getCenterPoint(),d=ku(t,c);d<s&&(s=d,o=l)}}if(o){const l=o.tooltipPosition();e=l.x,i=l.y}return{x:e,y:i}}};function Ue(n,t){return t&&(kt(t)?Array.prototype.push.apply(n,t):n.push(t)),n}function nn(n){return(typeof n=="string"||n instanceof String)&&n.indexOf(`
`)>-1?n.split(`
`):n}function R1(n,t){const{element:e,datasetIndex:i,index:s}=t,r=n.getDatasetMeta(i).controller,{label:a,value:o}=r.getLabelAndValue(s);return{chart:n,label:a,parsed:r.getParsed(s),raw:n.data.datasets[i].data[s],formattedValue:o,dataset:r.getDataset(),dataIndex:s,datasetIndex:i,element:e}}function Im(n,t){const e=n.chart.ctx,{body:i,footer:s,title:r}=n,{boxWidth:a,boxHeight:o}=t,l=jt(t.bodyFont),c=jt(t.titleFont),d=jt(t.footerFont),h=r.length,f=s.length,g=i.length,y=ae(t.padding);let v=y.height,w=0,A=i.reduce((D,M)=>D+M.before.length+M.lines.length+M.after.length,0);if(A+=n.beforeBody.length+n.afterBody.length,h&&(v+=h*c.lineHeight+(h-1)*t.titleSpacing+t.titleMarginBottom),A){const D=t.displayColors?Math.max(o,l.lineHeight):l.lineHeight;v+=g*D+(A-g)*l.lineHeight+(A-1)*t.bodySpacing}f&&(v+=t.footerMarginTop+f*d.lineHeight+(f-1)*t.footerSpacing);let S=0;const P=function(D){w=Math.max(w,e.measureText(D).width+S)};return e.save(),e.font=c.string,pt(n.title,P),e.font=l.string,pt(n.beforeBody.concat(n.afterBody),P),S=t.displayColors?a+2+t.boxPadding:0,pt(i,D=>{pt(D.before,P),pt(D.lines,P),pt(D.after,P)}),S=0,e.font=d.string,pt(n.footer,P),e.restore(),w+=y.width,{width:w,height:v}}function C1(n,t){const{y:e,height:i}=t;return e<i/2?"top":e>n.height-i/2?"bottom":"center"}function D1(n,t,e,i){const{x:s,width:r}=i,a=e.caretSize+e.caretPadding;if(n==="left"&&s+r+a>t.width||n==="right"&&s-r-a<0)return!0}function M1(n,t,e,i){const{x:s,width:r}=e,{width:a,chartArea:{left:o,right:l}}=n;let c="center";return i==="center"?c=s<=(o+l)/2?"left":"right":s<=r/2?c="left":s>=a-r/2&&(c="right"),D1(c,n,t,e)&&(c="center"),c}function Tm(n,t,e){const i=e.yAlign||t.yAlign||C1(n,e);return{xAlign:e.xAlign||t.xAlign||M1(n,t,e,i),yAlign:i}}function O1(n,t){let{x:e,width:i}=n;return t==="right"?e-=i:t==="center"&&(e-=i/2),e}function V1(n,t,e){let{y:i,height:s}=n;return t==="top"?i+=e:t==="bottom"?i-=s+e:i-=s/2,i}function Em(n,t,e,i){const{caretSize:s,caretPadding:r,cornerRadius:a}=n,{xAlign:o,yAlign:l}=e,c=s+r,{topLeft:d,topRight:h,bottomLeft:f,bottomRight:g}=vi(a);let y=O1(t,o);const v=V1(t,l,c);return l==="center"?o==="left"?y+=c:o==="right"&&(y-=c):o==="left"?y-=Math.max(d,f)+s:o==="right"&&(y+=Math.max(h,g)+s),{x:qt(y,0,i.width-t.width),y:qt(v,0,i.height-t.height)}}function ao(n,t,e){const i=ae(e.padding);return t==="center"?n.x+n.width/2:t==="right"?n.x+n.width-i.right:n.x+i.left}function xm(n){return Ue([],nn(n))}function N1(n,t,e){return Zn(n,{tooltip:t,tooltipItems:e,type:"tooltip"})}function km(n,t){const e=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return e?n.override(e):n}const Xv={beforeTitle:tn,title(n){if(n.length>0){const t=n[0],e=t.chart.data.labels,i=e?e.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(i>0&&t.dataIndex<i)return e[t.dataIndex]}return""},afterTitle:tn,beforeBody:tn,beforeLabel:tn,label(n){if(this&&this.options&&this.options.mode==="dataset")return n.label+": "+n.formattedValue||n.formattedValue;let t=n.dataset.label||"";t&&(t+=": ");const e=n.formattedValue;return nt(e)||(t+=e),t},labelColor(n){const e=n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);return{borderColor:e.borderColor,backgroundColor:e.backgroundColor,borderWidth:e.borderWidth,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(n){const e=n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);return{pointStyle:e.pointStyle,rotation:e.rotation}},afterLabel:tn,afterBody:tn,beforeFooter:tn,footer:tn,afterFooter:tn};function fe(n,t,e,i){const s=n[t].call(e,i);return typeof s>"u"?Xv[t].call(e,i):s}class Vu extends Fe{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const e=this.chart,i=this.options.setContext(this.getContext()),s=i.enabled&&e.options.animation&&i.animations,r=new Cv(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(r)),r}getContext(){return this.$context||(this.$context=N1(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,e){const{callbacks:i}=e,s=fe(i,"beforeTitle",this,t),r=fe(i,"title",this,t),a=fe(i,"afterTitle",this,t);let o=[];return o=Ue(o,nn(s)),o=Ue(o,nn(r)),o=Ue(o,nn(a)),o}getBeforeBody(t,e){return xm(fe(e.callbacks,"beforeBody",this,t))}getBody(t,e){const{callbacks:i}=e,s=[];return pt(t,r=>{const a={before:[],lines:[],after:[]},o=km(i,r);Ue(a.before,nn(fe(o,"beforeLabel",this,r))),Ue(a.lines,fe(o,"label",this,r)),Ue(a.after,nn(fe(o,"afterLabel",this,r))),s.push(a)}),s}getAfterBody(t,e){return xm(fe(e.callbacks,"afterBody",this,t))}getFooter(t,e){const{callbacks:i}=e,s=fe(i,"beforeFooter",this,t),r=fe(i,"footer",this,t),a=fe(i,"afterFooter",this,t);let o=[];return o=Ue(o,nn(s)),o=Ue(o,nn(r)),o=Ue(o,nn(a)),o}_createItems(t){const e=this._active,i=this.chart.data,s=[],r=[],a=[];let o=[],l,c;for(l=0,c=e.length;l<c;++l)o.push(R1(this.chart,e[l]));return t.filter&&(o=o.filter((d,h,f)=>t.filter(d,h,f,i))),t.itemSort&&(o=o.sort((d,h)=>t.itemSort(d,h,i))),pt(o,d=>{const h=km(t.callbacks,d);s.push(fe(h,"labelColor",this,d)),r.push(fe(h,"labelPointStyle",this,d)),a.push(fe(h,"labelTextColor",this,d))}),this.labelColors=s,this.labelPointStyles=r,this.labelTextColors=a,this.dataPoints=o,o}update(t,e){const i=this.options.setContext(this.getContext()),s=this._active;let r,a=[];if(!s.length)this.opacity!==0&&(r={opacity:0});else{const o=br[i.position].call(this,s,this._eventPosition);a=this._createItems(i),this.title=this.getTitle(a,i),this.beforeBody=this.getBeforeBody(a,i),this.body=this.getBody(a,i),this.afterBody=this.getAfterBody(a,i),this.footer=this.getFooter(a,i);const l=this._size=Im(this,i),c=Object.assign({},o,l),d=Tm(this.chart,i,c),h=Em(i,c,d,this.chart);this.xAlign=d.xAlign,this.yAlign=d.yAlign,r={opacity:1,x:h.x,y:h.y,width:l.width,height:l.height,caretX:o.x,caretY:o.y}}this._tooltipItems=a,this.$context=void 0,r&&this._resolveAnimations().update(this,r),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:e})}drawCaret(t,e,i,s){const r=this.getCaretPosition(t,i,s);e.lineTo(r.x1,r.y1),e.lineTo(r.x2,r.y2),e.lineTo(r.x3,r.y3)}getCaretPosition(t,e,i){const{xAlign:s,yAlign:r}=this,{caretSize:a,cornerRadius:o}=i,{topLeft:l,topRight:c,bottomLeft:d,bottomRight:h}=vi(o),{x:f,y:g}=t,{width:y,height:v}=e;let w,A,S,P,D,M;return r==="center"?(D=g+v/2,s==="left"?(w=f,A=w-a,P=D+a,M=D-a):(w=f+y,A=w+a,P=D-a,M=D+a),S=w):(s==="left"?A=f+Math.max(l,d)+a:s==="right"?A=f+y-Math.max(c,h)-a:A=this.caretX,r==="top"?(P=g,D=P-a,w=A-a,S=A+a):(P=g+v,D=P+a,w=A+a,S=A-a),M=P),{x1:w,x2:A,x3:S,y1:P,y2:D,y3:M}}drawTitle(t,e,i){const s=this.title,r=s.length;let a,o,l;if(r){const c=ms(i.rtl,this.x,this.width);for(t.x=ao(this,i.titleAlign,i),e.textAlign=c.textAlign(i.titleAlign),e.textBaseline="middle",a=jt(i.titleFont),o=i.titleSpacing,e.fillStyle=i.titleColor,e.font=a.string,l=0;l<r;++l)e.fillText(s[l],c.x(t.x),t.y+a.lineHeight/2),t.y+=a.lineHeight+o,l+1===r&&(t.y+=i.titleMarginBottom-o)}}_drawColorBox(t,e,i,s,r){const a=this.labelColors[i],o=this.labelPointStyles[i],{boxHeight:l,boxWidth:c}=r,d=jt(r.bodyFont),h=ao(this,"left",r),f=s.x(h),g=l<d.lineHeight?(d.lineHeight-l)/2:0,y=e.y+g;if(r.usePointStyle){const v={radius:Math.min(c,l)/2,pointStyle:o.pointStyle,rotation:o.rotation,borderWidth:1},w=s.leftForLtr(f,c)+c/2,A=y+l/2;t.strokeStyle=r.multiKeyBackground,t.fillStyle=r.multiKeyBackground,Su(t,v,w,A),t.strokeStyle=a.borderColor,t.fillStyle=a.backgroundColor,Su(t,v,w,A)}else{t.lineWidth=at(a.borderWidth)?Math.max(...Object.values(a.borderWidth)):a.borderWidth||1,t.strokeStyle=a.borderColor,t.setLineDash(a.borderDash||[]),t.lineDashOffset=a.borderDashOffset||0;const v=s.leftForLtr(f,c),w=s.leftForLtr(s.xPlus(f,1),c-2),A=vi(a.borderRadius);Object.values(A).some(S=>S!==0)?(t.beginPath(),t.fillStyle=r.multiKeyBackground,ea(t,{x:v,y,w:c,h:l,radius:A}),t.fill(),t.stroke(),t.fillStyle=a.backgroundColor,t.beginPath(),ea(t,{x:w,y:y+1,w:c-2,h:l-2,radius:A}),t.fill()):(t.fillStyle=r.multiKeyBackground,t.fillRect(v,y,c,l),t.strokeRect(v,y,c,l),t.fillStyle=a.backgroundColor,t.fillRect(w,y+1,c-2,l-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,e,i){const{body:s}=this,{bodySpacing:r,bodyAlign:a,displayColors:o,boxHeight:l,boxWidth:c,boxPadding:d}=i,h=jt(i.bodyFont);let f=h.lineHeight,g=0;const y=ms(i.rtl,this.x,this.width),v=function(_){e.fillText(_,y.x(t.x+g),t.y+f/2),t.y+=f+r},w=y.textAlign(a);let A,S,P,D,M,C,I;for(e.textAlign=a,e.textBaseline="middle",e.font=h.string,t.x=ao(this,w,i),e.fillStyle=i.bodyColor,pt(this.beforeBody,v),g=o&&w!=="right"?a==="center"?c/2+d:c+2+d:0,D=0,C=s.length;D<C;++D){for(A=s[D],S=this.labelTextColors[D],e.fillStyle=S,pt(A.before,v),P=A.lines,o&&P.length&&(this._drawColorBox(e,t,D,y,i),f=Math.max(h.lineHeight,l)),M=0,I=P.length;M<I;++M)v(P[M]),f=h.lineHeight;pt(A.after,v)}g=0,f=h.lineHeight,pt(this.afterBody,v),t.y-=r}drawFooter(t,e,i){const s=this.footer,r=s.length;let a,o;if(r){const l=ms(i.rtl,this.x,this.width);for(t.x=ao(this,i.footerAlign,i),t.y+=i.footerMarginTop,e.textAlign=l.textAlign(i.footerAlign),e.textBaseline="middle",a=jt(i.footerFont),e.fillStyle=i.footerColor,e.font=a.string,o=0;o<r;++o)e.fillText(s[o],l.x(t.x),t.y+a.lineHeight/2),t.y+=a.lineHeight+i.footerSpacing}}drawBackground(t,e,i,s){const{xAlign:r,yAlign:a}=this,{x:o,y:l}=t,{width:c,height:d}=i,{topLeft:h,topRight:f,bottomLeft:g,bottomRight:y}=vi(s.cornerRadius);e.fillStyle=s.backgroundColor,e.strokeStyle=s.borderColor,e.lineWidth=s.borderWidth,e.beginPath(),e.moveTo(o+h,l),a==="top"&&this.drawCaret(t,e,i,s),e.lineTo(o+c-f,l),e.quadraticCurveTo(o+c,l,o+c,l+f),a==="center"&&r==="right"&&this.drawCaret(t,e,i,s),e.lineTo(o+c,l+d-y),e.quadraticCurveTo(o+c,l+d,o+c-y,l+d),a==="bottom"&&this.drawCaret(t,e,i,s),e.lineTo(o+g,l+d),e.quadraticCurveTo(o,l+d,o,l+d-g),a==="center"&&r==="left"&&this.drawCaret(t,e,i,s),e.lineTo(o,l+h),e.quadraticCurveTo(o,l,o+h,l),e.closePath(),e.fill(),s.borderWidth>0&&e.stroke()}_updateAnimationTarget(t){const e=this.chart,i=this.$animations,s=i&&i.x,r=i&&i.y;if(s||r){const a=br[t.position].call(this,this._active,this._eventPosition);if(!a)return;const o=this._size=Im(this,t),l=Object.assign({},a,this._size),c=Tm(e,t,l),d=Em(t,l,c,e);(s._to!==d.x||r._to!==d.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=o.width,this.height=o.height,this.caretX=a.x,this.caretY=a.y,this._resolveAnimations().update(this,d))}}_willRender(){return!!this.opacity}draw(t){const e=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(e);const s={width:this.width,height:this.height},r={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const a=ae(e.padding),o=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;e.enabled&&o&&(t.save(),t.globalAlpha=i,this.drawBackground(r,t,s,e),xv(t,e.textDirection),r.y+=a.top,this.drawTitle(r,t,e),this.drawBody(r,t,e),this.drawFooter(r,t,e),kv(t,e.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,e){const i=this._active,s=t.map(({datasetIndex:o,index:l})=>{const c=this.chart.getDatasetMeta(o);if(!c)throw new Error("Cannot find a dataset at index "+o);return{datasetIndex:o,element:c.data[l],index:l}}),r=!nl(i,s),a=this._positionChanged(s,e);(r||a)&&(this._active=s,this._eventPosition=e,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,e,i=!0){if(e&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const s=this.options,r=this._active||[],a=this._getActiveElements(t,r,e,i),o=this._positionChanged(a,t),l=e||!nl(a,r)||o;return l&&(this._active=a,(s.enabled||s.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,e))),l}_getActiveElements(t,e,i,s){const r=this.options;if(t.type==="mouseout")return[];if(!s)return e.filter(o=>this.chart.data.datasets[o.datasetIndex]&&this.chart.getDatasetMeta(o.datasetIndex).controller.getParsed(o.index)!==void 0);const a=this.chart.getElementsAtEventForMode(t,r.mode,r,i);return r.reverse&&a.reverse(),a}_positionChanged(t,e){const{caretX:i,caretY:s,options:r}=this,a=br[r.position].call(this,t,e);return a!==!1&&(i!==a.x||s!==a.y)}}j(Vu,"positioners",br);var L1={id:"tooltip",_element:Vu,positioners:br,afterInit(n,t,e){e&&(n.tooltip=new Vu({chart:n,options:e}))},beforeUpdate(n,t,e){n.tooltip&&n.tooltip.initialize(e)},reset(n,t,e){n.tooltip&&n.tooltip.initialize(e)},afterDraw(n){const t=n.tooltip;if(t&&t._willRender()){const e={tooltip:t};if(n.notifyPlugins("beforeTooltipDraw",{...e,cancelable:!0})===!1)return;t.draw(n.ctx),n.notifyPlugins("afterTooltipDraw",e)}},afterEvent(n,t){if(n.tooltip){const e=t.replay;n.tooltip.handleEvent(t.event,e,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(n,t)=>t.bodyFont.size,boxWidth:(n,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:Xv},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:n=>n!=="filter"&&n!=="itemSort"&&n!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},F1=Object.freeze({__proto__:null,Colors:QM,Decimation:t1,Filler:v1,Legend:k1,SubTitle:P1,Title:S1,Tooltip:L1});const B1=(n,t,e,i)=>(typeof t=="string"?(e=n.push(t)-1,i.unshift({index:e,label:t})):isNaN(t)&&(e=null),e);function U1(n,t,e,i){const s=n.indexOf(t);if(s===-1)return B1(n,t,e,i);const r=n.lastIndexOf(t);return s!==r?e:s}const j1=(n,t)=>n===null?null:qt(Math.round(n),0,t);function Am(n){const t=this.getLabels();return n>=0&&n<t.length?t[n]:n}class Nu extends qi{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const e=this._addedLabels;if(e.length){const i=this.getLabels();for(const{index:s,label:r}of e)i[s]===r&&i.splice(s,1);this._addedLabels=[]}super.init(t)}parse(t,e){if(nt(t))return null;const i=this.getLabels();return e=isFinite(e)&&i[e]===t?e:U1(i,t,Z(e,t),this._addedLabels),j1(e,i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let{min:i,max:s}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(i=0),e||(s=this.getLabels().length-1)),this.min=i,this.max=s}buildTicks(){const t=this.min,e=this.max,i=this.options.offset,s=[];let r=this.getLabels();r=t===0&&e===r.length-1?r:r.slice(t,e+1),this._valueRange=Math.max(r.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let a=t;a<=e;a++)s.push({value:a});return s}getLabelForValue(t){return Am.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}j(Nu,"id","category"),j(Nu,"defaults",{ticks:{callback:Am}});function z1(n,t){const e=[],{bounds:s,step:r,min:a,max:o,precision:l,count:c,maxTicks:d,maxDigits:h,includeBounds:f}=n,g=r||1,y=d-1,{min:v,max:w}=t,A=!nt(a),S=!nt(o),P=!nt(c),D=(w-v)/(h+1);let M=Ig((w-v)/y/g)*g,C,I,_,b;if(M<1e-14&&!A&&!S)return[{value:v},{value:w}];b=Math.ceil(w/M)-Math.floor(v/M),b>y&&(M=Ig(b*M/y/g)*g),nt(l)||(C=Math.pow(10,l),M=Math.ceil(M*C)/C),s==="ticks"?(I=Math.floor(v/M)*M,_=Math.ceil(w/M)*M):(I=v,_=w),A&&S&&r&&OR((o-a)/r,M/1e3)?(b=Math.round(Math.min((o-a)/M,d)),M=(o-a)/b,I=a,_=o):P?(I=A?a:I,_=S?o:_,b=c-1,M=(_-I)/b):(b=(_-I)/M,Pr(b,Math.round(b),M/1e3)?b=Math.round(b):b=Math.ceil(b));const E=Math.max(Tg(M),Tg(I));C=Math.pow(10,nt(l)?E:l),I=Math.round(I*C)/C,_=Math.round(_*C)/C;let k=0;for(A&&(f&&I!==a?(e.push({value:a}),I<a&&k++,Pr(Math.round((I+k*M)*C)/C,a,Sm(a,D,n))&&k++):I<a&&k++);k<b;++k){const R=Math.round((I+k*M)*C)/C;if(S&&R>o)break;e.push({value:R})}return S&&f&&_!==o?e.length&&Pr(e[e.length-1].value,o,Sm(o,D,n))?e[e.length-1].value=o:e.push({value:o}):(!S||_===o)&&e.push({value:_}),e}function Sm(n,t,{horizontal:e,minRotation:i}){const s=De(i),r=(e?Math.sin(s):Math.cos(s))||.001,a=.75*t*(""+n).length;return Math.min(t/r,a)}class cl extends qi{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,e){return nt(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:e,maxDefined:i}=this.getUserBounds();let{min:s,max:r}=this;const a=l=>s=e?s:l,o=l=>r=i?r:l;if(t){const l=Ke(s),c=Ke(r);l<0&&c<0?o(0):l>0&&c>0&&a(0)}if(s===r){let l=r===0?1:Math.abs(r*.05);o(r+l),t||a(s-l)}this.min=s,this.max=r}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:e,stepSize:i}=t,s;return i?(s=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,s>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${s} ticks. Limiting to 1000.`),s=1e3)):(s=this.computeTickLimit(),e=e||11),e&&(s=Math.min(e,s)),s}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,e=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const s={maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:e.precision,step:e.stepSize,count:e.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:e.minRotation||0,includeBounds:e.includeBounds!==!1},r=this._range||this,a=z1(s,r);return t.bounds==="ticks"&&lv(a,this,"value"),t.reverse?(a.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),a}configure(){const t=this.ticks;let e=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const s=(i-e)/Math.max(t.length-1,1)/2;e-=s,i+=s}this._startValue=e,this._endValue=i,this._valueRange=i-e}getLabelForValue(t){return Ia(t,this.chart.options.locale,this.options.ticks.format)}}class Lu extends cl{determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=Mt(t)?t:0,this.max=Mt(e)?e:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),e=t?this.width:this.height,i=De(this.options.ticks.minRotation),s=(t?Math.sin(i):Math.cos(i))||.001,r=this._resolveTickFontOptions(0);return Math.ceil(e/Math.min(40,r.lineHeight/s))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}j(Lu,"id","linear"),j(Lu,"defaults",{ticks:{callback:Bl.formatters.numeric}});const ia=n=>Math.floor(Ln(n)),li=(n,t)=>Math.pow(10,ia(n)+t);function Pm(n){return n/Math.pow(10,ia(n))===1}function Rm(n,t,e){const i=Math.pow(10,e),s=Math.floor(n/i);return Math.ceil(t/i)-s}function $1(n,t){const e=t-n;let i=ia(e);for(;Rm(n,t,i)>10;)i++;for(;Rm(n,t,i)<10;)i--;return Math.min(i,ia(n))}function H1(n,{min:t,max:e}){t=we(n.min,t);const i=[],s=ia(t);let r=$1(t,e),a=r<0?Math.pow(10,Math.abs(r)):1;const o=Math.pow(10,r),l=s>r?Math.pow(10,s):0,c=Math.round((t-l)*a)/a,d=Math.floor((t-l)/o/10)*o*10;let h=Math.floor((c-d)/Math.pow(10,r)),f=we(n.min,Math.round((l+d+h*Math.pow(10,r))*a)/a);for(;f<e;)i.push({value:f,major:Pm(f),significand:h}),h>=10?h=h<15?15:20:h++,h>=20&&(r++,h=2,a=r>=0?1:a),f=Math.round((l+d+h*Math.pow(10,r))*a)/a;const g=we(n.max,f);return i.push({value:g,major:Pm(g),significand:h}),i}class Fu extends qi{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,e){const i=cl.prototype.parse.apply(this,[t,e]);if(i===0){this._zero=!0;return}return Mt(i)&&i>0?i:null}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=Mt(t)?Math.max(0,t):null,this.max=Mt(e)?Math.max(0,e):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!Mt(this._userMin)&&(this.min=t===li(this.min,0)?li(this.min,-1):li(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let i=this.min,s=this.max;const r=o=>i=t?i:o,a=o=>s=e?s:o;i===s&&(i<=0?(r(1),a(10)):(r(li(i,-1)),a(li(s,1)))),i<=0&&r(li(s,-1)),s<=0&&a(li(i,1)),this.min=i,this.max=s}buildTicks(){const t=this.options,e={min:this._userMin,max:this._userMax},i=H1(e,this);return t.bounds==="ticks"&&lv(i,this,"value"),t.reverse?(i.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),i}getLabelForValue(t){return t===void 0?"0":Ia(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=Ln(t),this._valueRange=Ln(this.max)-Ln(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(Ln(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const e=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+e*this._valueRange)}}j(Fu,"id","logarithmic"),j(Fu,"defaults",{ticks:{callback:Bl.formatters.logarithmic,major:{enabled:!0}}});function Bu(n){const t=n.ticks;if(t.display&&n.display){const e=ae(t.backdropPadding);return Z(t.font&&t.font.size,At.font.size)+e.height}return 0}function q1(n,t,e){return e=kt(e)?e:[e],{w:JR(n,t.string,e),h:e.length*t.lineHeight}}function Cm(n,t,e,i,s){return n===i||n===s?{start:t-e/2,end:t+e/2}:n<i||n>s?{start:t-e,end:t}:{start:t,end:t+e}}function W1(n){const t={l:n.left+n._padding.left,r:n.right-n._padding.right,t:n.top+n._padding.top,b:n.bottom-n._padding.bottom},e=Object.assign({},t),i=[],s=[],r=n._pointLabels.length,a=n.options.pointLabels,o=a.centerPointLabels?ht/r:0;for(let l=0;l<r;l++){const c=a.setContext(n.getPointLabelContext(l));s[l]=c.padding;const d=n.getPointPosition(l,n.drawingArea+s[l],o),h=jt(c.font),f=q1(n.ctx,h,n._pointLabels[l]);i[l]=f;const g=se(n.getIndexAngle(l)+o),y=Math.round(ah(g)),v=Cm(y,d.x,f.w,0,180),w=Cm(y,d.y,f.h,90,270);K1(e,t,g,v,w)}n.setCenterPoint(t.l-e.l,e.r-t.r,t.t-e.t,e.b-t.b),n._pointLabelItems=Q1(n,i,s)}function K1(n,t,e,i,s){const r=Math.abs(Math.sin(e)),a=Math.abs(Math.cos(e));let o=0,l=0;i.start<t.l?(o=(t.l-i.start)/r,n.l=Math.min(n.l,t.l-o)):i.end>t.r&&(o=(i.end-t.r)/r,n.r=Math.max(n.r,t.r+o)),s.start<t.t?(l=(t.t-s.start)/a,n.t=Math.min(n.t,t.t-l)):s.end>t.b&&(l=(s.end-t.b)/a,n.b=Math.max(n.b,t.b+l))}function G1(n,t,e){const i=n.drawingArea,{extra:s,additionalAngle:r,padding:a,size:o}=e,l=n.getPointPosition(t,i+s+a,r),c=Math.round(ah(se(l.angle+Vt))),d=Z1(l.y,o.h,c),h=J1(c),f=X1(l.x,o.w,h);return{visible:!0,x:l.x,y:d,textAlign:h,left:f,top:d,right:f+o.w,bottom:d+o.h}}function Y1(n,t){if(!t)return!0;const{left:e,top:i,right:s,bottom:r}=n;return!(fn({x:e,y:i},t)||fn({x:e,y:r},t)||fn({x:s,y:i},t)||fn({x:s,y:r},t))}function Q1(n,t,e){const i=[],s=n._pointLabels.length,r=n.options,{centerPointLabels:a,display:o}=r.pointLabels,l={extra:Bu(r)/2,additionalAngle:a?ht/s:0};let c;for(let d=0;d<s;d++){l.padding=e[d],l.size=t[d];const h=G1(n,d,l);i.push(h),o==="auto"&&(h.visible=Y1(h,c),h.visible&&(c=h))}return i}function J1(n){return n===0||n===180?"center":n<180?"left":"right"}function X1(n,t,e){return e==="right"?n-=t:e==="center"&&(n-=t/2),n}function Z1(n,t,e){return e===90||e===270?n-=t/2:(e>270||e<90)&&(n-=t),n}function tO(n,t,e){const{left:i,top:s,right:r,bottom:a}=e,{backdropColor:o}=t;if(!nt(o)){const l=vi(t.borderRadius),c=ae(t.backdropPadding);n.fillStyle=o;const d=i-c.left,h=s-c.top,f=r-i+c.width,g=a-s+c.height;Object.values(l).some(y=>y!==0)?(n.beginPath(),ea(n,{x:d,y:h,w:f,h:g,radius:l}),n.fill()):n.fillRect(d,h,f,g)}}function eO(n,t){const{ctx:e,options:{pointLabels:i}}=n;for(let s=t-1;s>=0;s--){const r=n._pointLabelItems[s];if(!r.visible)continue;const a=i.setContext(n.getPointLabelContext(s));tO(e,a,r);const o=jt(a.font),{x:l,y:c,textAlign:d}=r;Li(e,n._pointLabels[s],l,c+o.lineHeight/2,o,{color:a.color,textAlign:d,textBaseline:"middle"})}}function Zv(n,t,e,i){const{ctx:s}=n;if(e)s.arc(n.xCenter,n.yCenter,t,0,It);else{let r=n.getPointPosition(0,t);s.moveTo(r.x,r.y);for(let a=1;a<i;a++)r=n.getPointPosition(a,t),s.lineTo(r.x,r.y)}}function nO(n,t,e,i,s){const r=n.ctx,a=t.circular,{color:o,lineWidth:l}=t;!a&&!i||!o||!l||e<0||(r.save(),r.strokeStyle=o,r.lineWidth=l,r.setLineDash(s.dash||[]),r.lineDashOffset=s.dashOffset,r.beginPath(),Zv(n,e,a,i),r.closePath(),r.stroke(),r.restore())}function iO(n,t,e){return Zn(n,{label:e,index:t,type:"pointLabel"})}class vr extends cl{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=ae(Bu(this.options)/2),e=this.width=this.maxWidth-t.width,i=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+e/2+t.left),this.yCenter=Math.floor(this.top+i/2+t.top),this.drawingArea=Math.floor(Math.min(e,i)/2)}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!1);this.min=Mt(t)&&!isNaN(t)?t:0,this.max=Mt(e)&&!isNaN(e)?e:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/Bu(this.options))}generateTickLabels(t){cl.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((e,i)=>{const s=bt(this.options.pointLabels.callback,[e,i],this);return s||s===0?s:""}).filter((e,i)=>this.chart.getDataVisibility(i))}fit(){const t=this.options;t.display&&t.pointLabels.display?W1(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,e,i,s){this.xCenter+=Math.floor((t-e)/2),this.yCenter+=Math.floor((i-s)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,e,i,s))}getIndexAngle(t){const e=It/(this._pointLabels.length||1),i=this.options.startAngle||0;return se(t*e+De(i))}getDistanceFromCenterForValue(t){if(nt(t))return NaN;const e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e}getValueForDistanceFromCenter(t){if(nt(t))return NaN;const e=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-e:this.min+e}getPointLabelContext(t){const e=this._pointLabels||[];if(t>=0&&t<e.length){const i=e[t];return iO(this.getContext(),t,i)}}getPointPosition(t,e,i=0){const s=this.getIndexAngle(t)-Vt+i;return{x:Math.cos(s)*e+this.xCenter,y:Math.sin(s)*e+this.yCenter,angle:s}}getPointPositionForValue(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:e,top:i,right:s,bottom:r}=this._pointLabelItems[t];return{left:e,top:i,right:s,bottom:r}}drawBackground(){const{backgroundColor:t,grid:{circular:e}}=this.options;if(t){const i=this.ctx;i.save(),i.beginPath(),Zv(this,this.getDistanceFromCenterForValue(this._endValue),e,this._pointLabels.length),i.closePath(),i.fillStyle=t,i.fill(),i.restore()}}drawGrid(){const t=this.ctx,e=this.options,{angleLines:i,grid:s,border:r}=e,a=this._pointLabels.length;let o,l,c;if(e.pointLabels.display&&eO(this,a),s.display&&this.ticks.forEach((d,h)=>{if(h!==0||h===0&&this.min<0){l=this.getDistanceFromCenterForValue(d.value);const f=this.getContext(h),g=s.setContext(f),y=r.setContext(f);nO(this,g,l,a,y)}}),i.display){for(t.save(),o=a-1;o>=0;o--){const d=i.setContext(this.getPointLabelContext(o)),{color:h,lineWidth:f}=d;!f||!h||(t.lineWidth=f,t.strokeStyle=h,t.setLineDash(d.borderDash),t.lineDashOffset=d.borderDashOffset,l=this.getDistanceFromCenterForValue(e.reverse?this.min:this.max),c=this.getPointPosition(o,l),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(c.x,c.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,e=this.options,i=e.ticks;if(!i.display)return;const s=this.getIndexAngle(0);let r,a;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(s),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((o,l)=>{if(l===0&&this.min>=0&&!e.reverse)return;const c=i.setContext(this.getContext(l)),d=jt(c.font);if(r=this.getDistanceFromCenterForValue(this.ticks[l].value),c.showLabelBackdrop){t.font=d.string,a=t.measureText(o.label).width,t.fillStyle=c.backdropColor;const h=ae(c.backdropPadding);t.fillRect(-a/2-h.left,-r-d.size/2-h.top,a+h.width,d.size+h.height)}Li(t,o.label,0,-r,d,{color:c.color,strokeColor:c.textStrokeColor,strokeWidth:c.textStrokeWidth})}),t.restore()}drawTitle(){}}j(vr,"id","radialLinear"),j(vr,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:Bl.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}}),j(vr,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),j(vr,"descriptors",{angleLines:{_fallback:"grid"}});const ql={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},ge=Object.keys(ql);function Dm(n,t){return n-t}function Mm(n,t){if(nt(t))return null;const e=n._adapter,{parser:i,round:s,isoWeekday:r}=n._parseOpts;let a=t;return typeof i=="function"&&(a=i(a)),Mt(a)||(a=typeof i=="string"?e.parse(a,i):e.parse(a)),a===null?null:(s&&(a=s==="week"&&(As(r)||r===!0)?e.startOf(a,"isoWeek",r):e.startOf(a,s)),+a)}function Om(n,t,e,i){const s=ge.length;for(let r=ge.indexOf(n);r<s-1;++r){const a=ql[ge[r]],o=a.steps?a.steps:Number.MAX_SAFE_INTEGER;if(a.common&&Math.ceil((e-t)/(o*a.size))<=i)return ge[r]}return ge[s-1]}function sO(n,t,e,i,s){for(let r=ge.length-1;r>=ge.indexOf(e);r--){const a=ge[r];if(ql[a].common&&n._adapter.diff(s,i,a)>=t-1)return a}return ge[e?ge.indexOf(e):0]}function rO(n){for(let t=ge.indexOf(n)+1,e=ge.length;t<e;++t)if(ql[ge[t]].common)return ge[t]}function Vm(n,t,e){if(!e)n[t]=!0;else if(e.length){const{lo:i,hi:s}=oh(e,t),r=e[i]>=t?e[i]:e[s];n[r]=!0}}function aO(n,t,e,i){const s=n._adapter,r=+s.startOf(t[0].value,i),a=t[t.length-1].value;let o,l;for(o=r;o<=a;o=+s.add(o,1,i))l=e[o],l>=0&&(t[l].major=!0);return t}function Nm(n,t,e){const i=[],s={},r=t.length;let a,o;for(a=0;a<r;++a)o=t[a],s[o]=a,i.push({value:o,major:!1});return r===0||!e?i:aO(n,i,s,e)}class sa extends qi{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,e={}){const i=t.time||(t.time={}),s=this._adapter=new pD._date(t.adapters.date);s.init(e),Sr(i.displayFormats,s.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=e.normalized}parse(t,e){return t===void 0?null:Mm(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,e=this._adapter,i=t.time.unit||"day";let{min:s,max:r,minDefined:a,maxDefined:o}=this.getUserBounds();function l(c){!a&&!isNaN(c.min)&&(s=Math.min(s,c.min)),!o&&!isNaN(c.max)&&(r=Math.max(r,c.max))}(!a||!o)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),s=Mt(s)&&!isNaN(s)?s:+e.startOf(Date.now(),i),r=Mt(r)&&!isNaN(r)?r:+e.endOf(Date.now(),i)+1,this.min=Math.min(s,r-1),this.max=Math.max(s+1,r)}_getLabelBounds(){const t=this.getLabelTimestamps();let e=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(e=t[0],i=t[t.length-1]),{min:e,max:i}}buildTicks(){const t=this.options,e=t.time,i=t.ticks,s=i.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&s.length&&(this.min=this._userMin||s[0],this.max=this._userMax||s[s.length-1]);const r=this.min,a=this.max,o=FR(s,r,a);return this._unit=e.unit||(i.autoSkip?Om(e.minUnit,this.min,this.max,this._getLabelCapacity(r)):sO(this,o.length,e.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:rO(this._unit),this.initOffsets(s),t.reverse&&o.reverse(),Nm(this,o,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let e=0,i=0,s,r;this.options.offset&&t.length&&(s=this.getDecimalForValue(t[0]),t.length===1?e=1-s:e=(this.getDecimalForValue(t[1])-s)/2,r=this.getDecimalForValue(t[t.length-1]),t.length===1?i=r:i=(r-this.getDecimalForValue(t[t.length-2]))/2);const a=t.length<3?.5:.25;e=qt(e,0,a),i=qt(i,0,a),this._offsets={start:e,end:i,factor:1/(e+1+i)}}_generate(){const t=this._adapter,e=this.min,i=this.max,s=this.options,r=s.time,a=r.unit||Om(r.minUnit,e,i,this._getLabelCapacity(e)),o=Z(s.ticks.stepSize,1),l=a==="week"?r.isoWeekday:!1,c=As(l)||l===!0,d={};let h=e,f,g;if(c&&(h=+t.startOf(h,"isoWeek",l)),h=+t.startOf(h,c?"day":a),t.diff(i,e,a)>1e5*o)throw new Error(e+" and "+i+" are too far apart with stepSize of "+o+" "+a);const y=s.ticks.source==="data"&&this.getDataTimestamps();for(f=h,g=0;f<i;f=+t.add(f,o,a),g++)Vm(d,f,y);return(f===i||s.bounds==="ticks"||g===1)&&Vm(d,f,y),Object.keys(d).sort(Dm).map(v=>+v)}getLabelForValue(t){const e=this._adapter,i=this.options.time;return i.tooltipFormat?e.format(t,i.tooltipFormat):e.format(t,i.displayFormats.datetime)}format(t,e){const s=this.options.time.displayFormats,r=this._unit,a=e||s[r];return this._adapter.format(t,a)}_tickFormatFunction(t,e,i,s){const r=this.options,a=r.ticks.callback;if(a)return bt(a,[t,e,i],this);const o=r.time.displayFormats,l=this._unit,c=this._majorUnit,d=l&&o[l],h=c&&o[c],f=i[e],g=c&&h&&f&&f.major;return this._adapter.format(t,s||(g?h:d))}generateTickLabels(t){let e,i,s;for(e=0,i=t.length;e<i;++e)s=t[e],s.label=this._tickFormatFunction(s.value,e,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const e=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((e.start+i)*e.factor)}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const e=this.options.ticks,i=this.ctx.measureText(t).width,s=De(this.isHorizontal()?e.maxRotation:e.minRotation),r=Math.cos(s),a=Math.sin(s),o=this._resolveTickFontOptions(0).size;return{w:i*r+o*a,h:i*a+o*r}}_getLabelCapacity(t){const e=this.options.time,i=e.displayFormats,s=i[e.unit]||i.millisecond,r=this._tickFormatFunction(t,0,Nm(this,[t],this._majorUnit),s),a=this._getLabelSize(r),o=Math.floor(this.isHorizontal()?this.width/a.w:this.height/a.h)-1;return o>0?o:1}getDataTimestamps(){let t=this._cache.data||[],e,i;if(t.length)return t;const s=this.getMatchingVisibleMetas();if(this._normalized&&s.length)return this._cache.data=s[0].controller.getAllParsedValues(this);for(e=0,i=s.length;e<i;++e)t=t.concat(s[e].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let e,i;if(t.length)return t;const s=this.getLabels();for(e=0,i=s.length;e<i;++e)t.push(Mm(this,s[e]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return dv(t.sort(Dm))}}j(sa,"id","time"),j(sa,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function oo(n,t,e){let i=0,s=n.length-1,r,a,o,l;e?(t>=n[i].pos&&t<=n[s].pos&&({lo:i,hi:s}=hn(n,"pos",t)),{pos:r,time:o}=n[i],{pos:a,time:l}=n[s]):(t>=n[i].time&&t<=n[s].time&&({lo:i,hi:s}=hn(n,"time",t)),{time:r,pos:o}=n[i],{time:a,pos:l}=n[s]);const c=a-r;return c?o+(l-o)*(t-r)/c:o}class Uu extends sa{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),e=this._table=this.buildLookupTable(t);this._minPos=oo(e,this.min),this._tableRange=oo(e,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:e,max:i}=this,s=[],r=[];let a,o,l,c,d;for(a=0,o=t.length;a<o;++a)c=t[a],c>=e&&c<=i&&s.push(c);if(s.length<2)return[{time:e,pos:0},{time:i,pos:1}];for(a=0,o=s.length;a<o;++a)d=s[a+1],l=s[a-1],c=s[a],Math.round((d+l)/2)!==c&&r.push({time:c,pos:a/(o-1)});return r}_generate(){const t=this.min,e=this.max;let i=super.getDataTimestamps();return(!i.includes(t)||!i.length)&&i.splice(0,0,t),(!i.includes(e)||i.length===1)&&i.push(e),i.sort((s,r)=>s-r)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const e=this.getDataTimestamps(),i=this.getLabelTimestamps();return e.length&&i.length?t=this.normalize(e.concat(i)):t=e.length?e:i,t=this._cache.all=t,t}getDecimalForValue(t){return(oo(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return oo(this._table,i*this._tableRange+this._minPos,!0)}}j(Uu,"id","timeseries"),j(Uu,"defaults",sa.defaults);var oO=Object.freeze({__proto__:null,CategoryScale:Nu,LinearScale:Lu,LogarithmicScale:Fu,RadialLinearScale:vr,TimeScale:sa,TimeSeriesScale:Uu});const tw=[fD,$M,F1,oO];Ce.register(...tw);let Mr=null,Wc=null;function lO(n){return n.role==="warga"?uO(n):cO(n)}function cO(n){return`
    <!-- Top Summary Cards -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; width: 100%;">
      <div class="card" style="display: flex; align-items: center; gap: 16px; border-left: 5px solid var(--primary);">
        <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background-color: var(--primary-container); color: var(--primary); display: flex; align-items: center; justify-content: center;">
          <i class="ri-wallet-3-line" style="font-size: 1.5rem;"></i>
        </div>
        <div>
          <p style="font-size: 0.8rem; color: var(--on-surface-variant); font-weight: 500;">Saldo Kas RT</p>
          <h3 id="dash-saldo" style="font-size: 1.3rem; font-weight: 700; margin-top: 4px;">Rp 0</h3>
        </div>
      </div>
      
      <div class="card" style="display: flex; align-items: center; gap: 16px; border-left: 5px solid var(--success);">
        <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background-color: rgba(34, 197, 94, 0.15); color: var(--success); display: flex; align-items: center; justify-content: center;">
          <i class="ri-arrow-left-down-line" style="font-size: 1.5rem;"></i>
        </div>
        <div>
          <p style="font-size: 0.8rem; color: var(--on-surface-variant); font-weight: 500;">Pemasukan</p>
          <h3 id="dash-pemasukan" style="font-size: 1.3rem; font-weight: 700; margin-top: 4px;">Rp 0</h3>
        </div>
      </div>

      <div class="card" style="display: flex; align-items: center; gap: 16px; border-left: 5px solid var(--error);">
        <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background-color: rgba(239, 68, 68, 0.15); color: var(--error); display: flex; align-items: center; justify-content: center;">
          <i class="ri-arrow-right-up-line" style="font-size: 1.5rem;"></i>
        </div>
        <div>
          <p style="font-size: 0.8rem; color: var(--on-surface-variant); font-weight: 500;">Pengeluaran</p>
          <h3 id="dash-pengeluaran" style="font-size: 1.3rem; font-weight: 700; margin-top: 4px;">Rp 0</h3>
        </div>
      </div>

      <div class="card" style="display: flex; align-items: center; gap: 16px; border-left: 5px solid var(--warning);">
        <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background-color: rgba(245, 158, 11, 0.15); color: var(--warning); display: flex; align-items: center; justify-content: center;">
          <i class="ri-group-line" style="font-size: 1.5rem;"></i>
        </div>
        <div>
          <p style="font-size: 0.8rem; color: var(--on-surface-variant); font-weight: 500;">Jumlah Warga</p>
          <h3 id="dash-warga" style="font-size: 1.3rem; font-weight: 700; margin-top: 4px;">0 Orang</h3>
        </div>
      </div>
    </div>

    <!-- Quick Shortcuts -->
    ${n.role==="rt"?"":`
    <div class="card" style="padding: 16px;">
      <p style="font-size: 0.85rem; font-weight: 600; color: var(--on-surface-variant); margin-bottom: 12px;">Pintasan Cepat</p>
      <div style="display: flex; flex-wrap: wrap; gap: 12px;">
        <a href="#/transaksi" class="btn btn-secondary" style="border-radius: var(--radius-md); font-size: 0.8rem; padding: 8px 16px;">
          <i class="ri-add-line"></i> Catat Transaksi
        </a>
        <a href="#/monitoring" class="btn btn-secondary" style="border-radius: var(--radius-md); font-size: 0.8rem; padding: 8px 16px;">
          <i class="ri-calendar-check-line"></i> Bayar Iuran
        </a>
        <a href="#/warga" class="btn btn-secondary" style="border-radius: var(--radius-md); font-size: 0.8rem; padding: 8px 16px;">
          <i class="ri-user-add-line"></i> Tambah Warga
        </a>
        <a href="#/laporan" class="btn btn-secondary" style="border-radius: var(--radius-md); font-size: 0.8rem; padding: 8px 16px;">
          <i class="ri-file-chart-line"></i> Cetak Laporan
        </a>
      </div>
    </div>
    `}

    <!-- Chart & Recent Activities Row -->
    <div class="grid-2col-2-1">
      <!-- Chart Card -->
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h4 class="card-title" style="margin-bottom: 0;">Grafik Kas Bulanan</h4>
          <span id="chart-year-label" style="font-size: 0.85rem; font-weight: 600; color: var(--primary);">Tahun ${new Date().getFullYear()}</span>
        </div>
        <div style="position: relative; height: 300px; width: 100%;">
          <canvas id="cashflowChart"></canvas>
        </div>
      </div>

      <!-- Recent Transactions / Activities -->
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- Last Transactions -->
        <div class="card" style="flex: 1; display: flex; flex-direction: column;">
          <h4 class="card-title">Transaksi Terakhir</h4>
          <div id="dash-recent-transactions" style="display: flex; flex-direction: column; gap: 12px; flex: 1; overflow-y: auto; max-height: 280px;">
            <p style="color: var(--on-surface-variant); font-size: 0.85rem; text-align: center;">Memuat transaksi...</p>
          </div>
        </div>
      </div>
    </div>
  `}function uO(n){return!n||!n.warga_id?`
      <div class="card" style="width: 100%; text-align: center; padding: 48px 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
        <div style="width: 64px; height: 64px; border-radius: var(--radius-full); background-color: rgba(245, 158, 11, 0.15); color: var(--warning); display: flex; align-items: center; justify-content: center;">
          <i class="ri-error-warning-line" style="font-size: 2.5rem;"></i>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--on-background);">Akun Belum Dihubungkan</h3>
        <p style="color: var(--on-surface-variant); font-size: 0.9rem; max-width: 420px; line-height: 1.5; margin: 0;">
          Akun login Anda belum ditautkan dengan data profil warga oleh Administrator. Silakan hubungi RT untuk menghubungkan data Anda agar tagihan iuran dapat muncul di sini.
        </p>
      </div>
    `:`
    <div class="warga-grid">
      <!-- Profile Card -->
      <div class="card" style="display: flex; flex-direction: column; gap: 16px;">
        <div style="text-align: center; border-bottom: 1px solid var(--surface-variant); padding-bottom: 20px;">
          <div style="width: 80px; height: 80px; border-radius: var(--radius-full); background-color: var(--primary-container); color: var(--primary); display: inline-flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold; margin-bottom: 12px;">
            ${n.nama_lengkap.charAt(0).toUpperCase()}
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 700;">${n.nama_lengkap}</h3>
          <p style="font-size: 0.75rem; color: var(--primary); font-weight: 600; text-transform: uppercase; margin-top: 4px;">WARGA RT</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.85rem;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--on-surface-variant);">Nomor Kamar</span>
            <span id="warga-no-kamar" style="font-weight: 600;">-</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--on-surface-variant);">Status Tinggal</span>
            <span id="warga-status-tinggal" style="font-weight: 600; text-transform: capitalize;">-</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--on-surface-variant);">Alamat</span>
            <span id="warga-alamat" style="font-weight: 600; text-align: right; max-width: 150px;">-</span>
          </div>
        </div>
      </div>

      <!-- Financial & Bills summary -->
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- Summary cards -->
        <div class="warga-summary-grid">
          <div class="card" style="border-left: 5px solid var(--error); padding: 16px 20px;">
            <p style="font-size: 0.8rem; color: var(--on-surface-variant);">Tagihan Bulan Ini</p>
            <h3 id="warga-bills-active" style="font-size: 1.25rem; font-weight: 700; margin-top: 4px; color: var(--error);">Rp 0</h3>
          </div>
          <div class="card" style="border-left: 5px solid var(--success); padding: 16px 20px;">
            <p style="font-size: 0.8rem; color: var(--on-surface-variant);">Total Pembayaran Anda</p>
            <h3 id="warga-bills-paid" style="font-size: 1.25rem; font-weight: 700; margin-top: 4px; color: var(--success);">Rp 0</h3>
          </div>
        </div>

        <!-- Active Bills Detail -->
        <div class="card">
          <h4 class="card-title">Daftar Tagihan Iuran Aktif</h4>
          <div id="warga-active-bills" style="display: flex; flex-direction: column; gap: 10px; max-height: 260px; overflow-y: auto;">
            <p style="color: var(--on-surface-variant); font-size: 0.85rem; text-align: center;">Memuat tagihan...</p>
          </div>
        </div>

        <!-- Payments Progress / History -->
        <div class="card" style="flex: 1;">
          <h4 class="card-title">Riwayat Pembayaran Anda</h4>
          <div id="warga-recent-payments" style="display: flex; flex-direction: column; gap: 12px; max-height: 240px; overflow-y: auto;">
            <p style="color: var(--on-surface-variant); font-size: 0.85rem; text-align: center;">Memuat riwayat pembayaran...</p>
          </div>
        </div>
      </div>
    </div>
  `}function dO(n){Mr&&(Mr(),Mr=null),n.role==="warga"?fO(n):hO()}function hO(){const n=new Date().getFullYear();let t=0;const e=lt(H,"warga"),i=Lt(e,Oe("status","==","aktif")),s=Gr(i,l=>{t=l.size;const c=document.getElementById("dash-warga");c&&(c.innerText=`${t} Warga`)}),r=lt(H,"transaksi"),a=Lt(r,Ye("tanggal","desc")),o=Gr(a,l=>{let c=0,d=0;const h=Array(12).fill(0),f=Array(12).fill(0),g=[];l.forEach(P=>{const D=P.data(),M=Number(D.nominal),C=D.jenis==="pemasukan";if(C?c+=M:d+=M,D.tanggal){const I=D.tanggal.toDate?D.tanggal.toDate():new Date(D.tanggal);if(I.getFullYear()===n){const _=I.getMonth();C?h[_]+=M:f[_]+=M}}g.length<5&&g.push({id:P.id,...D})});const y=c-d,v=document.getElementById("dash-saldo"),w=document.getElementById("dash-pemasukan"),A=document.getElementById("dash-pengeluaran");v&&(v.innerText=Bt(y)),w&&(w.innerText=Bt(c)),A&&(A.innerText=Bt(d));const S=document.getElementById("dash-recent-transactions");S&&(g.length===0?S.innerHTML='<p style="color: var(--on-surface-variant); font-size: 0.85rem; text-align: center; margin-top: 16px;">Belum ada transaksi.</p>':S.innerHTML=g.map(P=>`
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-radius: var(--radius-md); background-color: var(--background);">
            <div style="display: flex; align-items: center; gap: 12px; min-width: 0;">
              <div style="width: 32px; height: 32px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; background-color: ${P.jenis==="pemasukan"?"rgba(34, 197, 94, 0.15)":"rgba(239, 68, 68, 0.15)"}; color: ${P.jenis==="pemasukan"?"var(--success)":"var(--error)"};">
                <i class="${P.jenis==="pemasukan"?"ri-arrow-left-down-line":"ri-arrow-right-up-line"}"></i>
              </div>
              <div style="min-width: 0;">
                <p style="font-size: 0.85rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${P.keterangan||P.kategori_nama}</p>
                <span style="font-size: 0.7rem; color: var(--on-surface-variant);">${el(P.tanggal)}</span>
              </div>
            </div>
            <p style="font-size: 0.85rem; font-weight: 700; color: ${P.jenis==="pemasukan"?"var(--success)":"var(--error)"}; white-space: nowrap;">
              ${P.jenis==="pemasukan"?"+":"-"}${Bt(P.nominal)}
            </p>
          </div>
        `).join("")),pO(h,f)});Mr=()=>{s(),o()}}function fO(n){if(!n||!n.warga_id)return;function t(o){return o?typeof o.toDate=="function"?o.toDate().getTime():o.seconds?o.seconds*1e3:new Date(o).getTime()||0:0}const e=ct(H,"warga",n.warga_id),i=Gr(e,o=>{try{if(o.exists()){const l=o.data(),c=document.getElementById("warga-no-kamar"),d=document.getElementById("warga-status-tinggal"),h=document.getElementById("warga-alamat");c&&(c.innerText=l.no_kamar||"-"),d&&(d.innerText=l.status_tinggal||"-"),h&&(h.innerText=l.alamat||"-")}else console.warn("Warga document does not exist for ID:",n.warga_id)}catch(l){console.error("Error rendering warga details:",l)}},o=>{console.error("onSnapshot warga profile error:",o)}),s=lt(H,"pembayaran_iuran"),r=Lt(s,Oe("warga_id","==",n.warga_id)),a=Gr(r,async o=>{try{let l=0;const c=[];o.forEach(x=>{const $=x.data();l+=Number($.nominal),c.push($)}),c.sort((x,$)=>t($.created_at)-t(x.created_at));const d=document.getElementById("warga-bills-paid");d&&(d.innerText=Bt(l));const h=lt(H,"iuran"),f=Lt(h,Oe("is_aktif","==",!0)),g=await Ot(f),y=lt(H,"iuran_warga"),v=Lt(y,Oe("warga_id","==",n.warga_id)),w=await Ot(v),A={};w.forEach(x=>{const $=x.data();A[$.iuran_id]=$.nominal});const S=[];g.forEach(x=>{const $=x.data();S.push({id:x.id,nama:$.nama,nominal:A[x.id]!==void 0?A[x.id]:$.nominal||0,hari_jatuh_tempo:$.hari_jatuh_tempo||1,created_at:$.created_at})});const P=new Date,D=P.getMonth()+1,M=P.getFullYear(),C=P.getDate(),I=["","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],_=[];let b=0;S.forEach(x=>{let $=1,G=M;if(x.created_at){const it=typeof x.created_at.toDate=="function"?x.created_at.toDate():new Date(x.created_at.seconds?x.created_at.seconds*1e3:x.created_at),ft=it.getFullYear();ft<M&&(G=ft,$=it.getMonth()+1)}let X=G,Q=$;for(;X<M||X===M&&Q<=D;)(X<M||X===M&&Q<D||X===M&&Q===D&&C>=x.hari_jatuh_tempo)&&(c.some(_e=>_e.iuran_id===x.id&&_e.bulan===Q&&_e.tahun===X)||(b+=x.nominal,_.push({nama:x.nama,nominal:x.nominal,bulan:Q,tahun:X,hasPaid:!1}))),Q++,Q>12&&(Q=1,X++)}),_.sort((x,$)=>$.tahun*100+$.bulan-(x.tahun*100+x.bulan));const E=document.getElementById("warga-bills-active");E&&(E.innerText=Bt(b));const k=document.getElementById("warga-active-bills");k&&(_.length===0?k.innerHTML='<p style="color: var(--success); font-size: 0.85rem; text-align: center; margin-top: 16px;"><i class="ri-check-double-line"></i> Semua tagihan sudah lunas. Tidak ada tunggakan.</p>':k.innerHTML=_.map(x=>`
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; border-radius: var(--radius-md); background-color: var(--background); border-left: 4px solid var(--error);">
              <div>
                <p style="font-size: 0.85rem; font-weight: 600;">${x.nama}</p>
                <span style="font-size: 0.75rem; color: var(--on-surface-variant);">${I[x.bulan]} ${x.tahun}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <p style="font-size: 0.85rem; font-weight: 700; color: var(--on-background);">${Bt(x.nominal)}</p>
                <span style="padding: 3px 10px; border-radius: var(--radius-full); font-size: 0.7rem; font-weight: bold; background-color: rgba(239, 68, 68, 0.15); color: var(--error);">
                  Belum Bayar
                </span>
              </div>
            </div>
          `).join(""));const R=document.getElementById("warga-recent-payments");if(R)if(c.length===0)R.innerHTML='<p style="color: var(--on-surface-variant); font-size: 0.85rem; text-align: center; margin-top: 16px;">Belum ada riwayat pembayaran.</p>';else{const x={};g.forEach($=>{x[$.id]=$.data().nama}),R.innerHTML=c.map($=>`
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-radius: var(--radius-md); background-color: var(--background);">
              <div>
                <p style="font-size: 0.85rem; font-weight: 600;">${x[$.iuran_id]||"Iuran"}</p>
                <span style="font-size: 0.75rem; color: var(--on-surface-variant);">${I[$.bulan]} ${$.tahun}</span>
              </div>
              <p style="font-size: 0.85rem; font-weight: 700; color: var(--success);">${Bt($.nominal)}</p>
            </div>
          `).join("")}}catch(l){console.error("Warga dashboard payments processing error:",l);const c=document.getElementById("warga-recent-payments");c&&(c.innerHTML=`<p style="color: var(--error); font-size: 0.85rem; text-align: center; margin-top: 16px;">Gagal memproses data: ${l.message}</p>`)}},o=>{console.error("onSnapshot payments error:",o);const l=document.getElementById("warga-recent-payments");l&&(l.innerHTML=`<p style="color: var(--error); font-size: 0.85rem; text-align: center; margin-top: 16px;">Error database: ${o.message}</p>`)});Mr=()=>{i(),a()}}function pO(n,t){const e=document.getElementById("cashflowChart");e&&(Wc&&Wc.destroy(),Wc=new Ce(e,{type:"bar",data:{labels:["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"],datasets:[{label:"Pemasukan",data:n,backgroundColor:"#22c55e",borderRadius:4},{label:"Pengeluaran",data:t,backgroundColor:"#ef4444",borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,ticks:{callback:function(i){return"Rp "+i.toLocaleString("id-ID")}}}},plugins:{legend:{position:"bottom"}}}}))}const gO={apiKey:"dummy-key-for-now",authDomain:"ekasrt-local.firebaseapp.com",projectId:"ekasrt-local",storageBucket:"ekasrt-local.appspot.com",messagingSenderId:"1234567890",appId:"1:1234:web:abcd"};let ew;try{const n=Hu(gO,"UserCreatorApp");ew=My(n)}catch{}function mO(){return`
    <div class="card" style="width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
        <h3 class="card-title" style="margin-bottom: 0;">Pengguna Sistem</h3>
        <button id="btn-add-user" class="btn btn-primary">
          <i class="ri-user-add-line"></i> Tambah Pengguna
        </button>
      </div>

      <!-- Filters & Search -->
      <div style="display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
        <div class="form-group" style="flex: 1; min-width: 200px; margin-bottom: 0;">
          <input type="text" id="search-users" class="form-control" placeholder="Cari nama atau username...">
        </div>
        <div class="form-group" style="width: 150px; margin-bottom: 0;">
          <select id="filter-role" class="form-control">
            <option value="">Semua Role</option>
            <option value="admin">Admin</option>
            <option value="bendahara">Bendahara</option>
            <option value="rt">Ketua RT</option>
            <option value="warga">Warga</option>
          </select>
        </div>
      </div>

      <!-- Table View -->
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Nama Lengkap</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th style="text-align: right;">Aksi</th>
            </tr>
          </thead>
          <tbody id="users-table-body">
            <tr>
              <td colspan="6" style="text-align: center; color: var(--on-surface-variant);">Memuat data pengguna...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Password Reset Requests Card -->
    <div class="card" style="width: 100%; margin-top: 24px;">
      <h3 class="card-title" style="margin-bottom: 20px;"><i class="ri-key-line" style="color: var(--primary);"></i> Pengajuan Reset Password</h3>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Tanggal Pengajuan</th>
              <th>Status</th>
              <th style="text-align: right;">Aksi</th>
            </tr>
          </thead>
          <tbody id="reset-requests-table-body">
            <tr>
              <td colspan="5" style="text-align: center; color: var(--on-surface-variant);">Memuat data pengajuan...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit User Modal -->
    <div id="user-modal" class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="modal-user-title" style="font-weight: 700;">Tambah Pengguna</h3>
          <button id="modal-user-close" class="btn btn-secondary" style="padding: 6px 12px; border-radius: var(--radius-full);">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <form id="user-form">
          <input type="hidden" id="user-id">
          <div class="modal-body" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group">
              <label class="form-label" for="user-nama">Nama Lengkap</label>
              <input type="text" id="user-nama" class="form-control" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="user-username">Username</label>
              <input type="text" id="user-username" class="form-control" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="user-email">Email</label>
              <input type="email" id="user-email" class="form-control" required>
            </div>
            <div class="form-group" id="pass-field-group">
              <label class="form-label" for="user-password">Kata Sandi</label>
              <input type="password" id="user-password" class="form-control" minlength="6">
            </div>
            <div class="form-group">
              <label class="form-label" for="user-role">Role</label>
              <select id="user-role" class="form-control" required>
                <option value="admin">Admin</option>
                <option value="bendahara">Bendahara</option>
                <option value="rt">Ketua RT</option>
                <option value="warga">Warga</option>
              </select>
            </div>
            <!-- Warga Link Dropdown -->
            <div class="form-group" id="warga-link-group" style="display: none;">
              <label class="form-label" for="user-warga-id">Hubungkan dengan Data Warga <span style="font-weight: normal; font-size: 0.75rem; color: var(--on-surface-variant);">(Opsional)</span></label>
              <select id="user-warga-id" class="form-control">
                <option value="">Pilih Warga...</option>
              </select>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" id="user-active" checked style="width: 16px; height: 16px;">
              <label for="user-active" class="form-label" style="margin-bottom: 0; cursor: pointer;">Akun Aktif</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" id="btn-cancel-user" class="btn btn-secondary">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  `}async function yO(){const n=document.getElementById("users-table-body"),t=document.getElementById("btn-add-user"),e=document.getElementById("user-modal"),i=document.getElementById("modal-user-close"),s=document.getElementById("btn-cancel-user"),r=document.getElementById("user-form"),a=document.getElementById("user-role"),o=document.getElementById("warga-link-group"),l=document.getElementById("user-warga-id"),c=document.getElementById("search-users"),d=document.getElementById("filter-role");let h=[];a.addEventListener("change",()=>{a.value==="warga"?o.style.display="block":o.style.display="none"});async function f(){try{const _=lt(H,"warga"),b=await Ot(Lt(_,Oe("status","==","aktif"))),E=[];b.forEach(R=>{E.push({id:R.id,...R.data()})}),E.sort((R,x)=>(R.nama||"").localeCompare(x.nama||""));let k='<option value="">Pilih Warga...</option>';E.forEach(R=>{k+=`<option value="${R.id}">${R.nama}</option>`}),l.innerHTML=k}catch(_){console.error("Error loading warga options:",_)}}f();async function g(){n.innerHTML='<tr><td colspan="6" style="text-align: center;">Memuat data...</td></tr>';try{const _=Lt(lt(H,"users"),Ye("nama_lengkap")),b=await Ot(_);h=[],b.forEach(E=>{h.push({id:E.id,...E.data()})}),y()}catch(_){console.error(_),n.innerHTML='<tr><td colspan="6" style="text-align: center; color: var(--error);">Gagal memuat data pengguna.</td></tr>'}}function y(){const _=c.value.toLowerCase().trim(),b=d.value,E=h.filter(k=>{const R=k.nama_lengkap.toLowerCase().includes(_)||k.username.toLowerCase().includes(_),x=b===""||k.role===b;return R&&x});if(E.length===0){n.innerHTML='<tr><td colspan="6" style="text-align: center; color: var(--on-surface-variant);">Tidak ada data pengguna ditemukan.</td></tr>';return}n.innerHTML=E.map(k=>`
      <tr>
        <td style="font-weight: 600;">${k.nama_lengkap}</td>
        <td>${k.username}</td>
        <td>${k.email}</td>
        <td><span style="font-size: 0.8rem; font-weight: bold; text-transform: uppercase;">${k.role}</span></td>
        <td>
          <span style="padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: bold; background-color: ${k.is_active?"rgba(34, 197, 94, 0.15)":"rgba(239, 68, 68, 0.15)"}; color: ${k.is_active?"var(--success)":"var(--error)"};">
            ${k.is_active?"Aktif":"Nonaktif"}
          </span>
        </td>
        <td style="text-align: right; display: flex; gap: 8px; justify-content: flex-end;">
          <button class="btn btn-secondary edit-user-btn" data-id="${k.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
            <i class="ri-edit-line"></i> Edit
          </button>
          <button class="btn btn-danger delete-user-btn" data-id="${k.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
            <i class="ri-delete-bin-line"></i> Hapus
          </button>
        </td>
      </tr>
    `).join(""),document.querySelectorAll(".edit-user-btn").forEach(k=>{k.addEventListener("click",()=>w(k.dataset.id))}),document.querySelectorAll(".delete-user-btn").forEach(k=>{k.addEventListener("click",()=>A(k.dataset.id))})}c.addEventListener("input",y),d.addEventListener("change",y),t.addEventListener("click",()=>{document.getElementById("modal-user-title").innerText="Tambah Pengguna",document.getElementById("user-id").value="",document.getElementById("user-nama").value="",document.getElementById("user-username").value="",document.getElementById("user-email").value="",document.getElementById("user-password").value="",document.getElementById("user-password").required=!0,document.getElementById("pass-field-group").style.display="block",document.getElementById("user-role").value="warga",o.style.display="block",l.value="",document.getElementById("user-active").checked=!0,e.classList.add("show")});const v=()=>e.classList.remove("show");i.addEventListener("click",v),s.addEventListener("click",v);function w(_){const b=h.find(E=>E.id===_);b&&(document.getElementById("modal-user-title").innerText="Edit Pengguna",document.getElementById("user-id").value=b.id,document.getElementById("user-nama").value=b.nama_lengkap,document.getElementById("user-username").value=b.username,document.getElementById("user-email").value=b.email,document.getElementById("user-password").value="",document.getElementById("user-password").required=!1,document.getElementById("pass-field-group").style.display="none",document.getElementById("user-role").value=b.role,b.role==="warga"?(o.style.display="block",l.value=b.warga_id||""):o.style.display="none",document.getElementById("user-active").checked=b.is_active!==!1,e.classList.add("show"))}async function A(_){const b=h.find(k=>k.id===_);if(!b)return;if((await Swal.fire({title:"Hapus Pengguna?",text:`Anda akan menghapus data pengguna ${b.nama_lengkap}. Aksi ini tidak dapat dibatalkan!`,icon:"warning",showCancelButton:!0,confirmButtonColor:"var(--error)",cancelButtonColor:"var(--secondary)",confirmButtonText:"Ya, Hapus!",cancelButtonText:"Batal"})).isConfirmed)try{await un(ct(H,"users",_)),b.username&&await un(ct(H,"usernames",b.username.toLowerCase())),await wt("delete",`Menghapus user login ${b.nama_lengkap}`),Swal.fire("Terhapus!","Pengguna telah berhasil dihapus.","success"),g()}catch{Swal.fire("Gagal!","Gagal menghapus pengguna.","error")}}r.addEventListener("submit",async _=>{_.preventDefault();const b=document.getElementById("user-id").value,E=document.getElementById("user-nama").value.trim(),k=document.getElementById("user-username").value.trim().toLowerCase(),R=document.getElementById("user-email").value.trim(),x=document.getElementById("user-role").value,$=document.getElementById("user-active").checked,G=document.getElementById("user-password").value,X=x==="warga"?l.value:null;Swal.fire({title:"Menyimpan...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{if(b){const Q=ct(H,"users",b),it=h.find(ft=>ft.id===b);it&&it.username&&it.username!==k&&await un(ct(H,"usernames",it.username.toLowerCase())),await ps(Q,{nama_lengkap:E,username:k,email:R,role:x,warga_id:X,is_active:$,updated_at:Ut()}),await Ar(ct(H,"usernames",k),{email:R}),await wt("update",`Memperbarui profile pengguna ${E}`)}else{if(!G)throw new Error("Password wajib untuk pengguna baru.");const it=(await c0(ew,R,G)).user.uid;await Ar(ct(H,"users",it),{username:k,email:R,nama_lengkap:E,role:x,warga_id:X,is_active:$,created_at:Ut(),updated_at:Ut()}),await Ar(ct(H,"usernames",k),{email:R}),await wt("create",`Membuat pengguna baru ${E} dengan role ${x}`)}Swal.fire("Berhasil!","Data pengguna disimpan.","success"),v(),g()}catch(Q){console.error(Q),Swal.fire("Gagal!",Q.message||"Terjadi kesalahan saat menyimpan.","error")}});const S=document.getElementById("reset-requests-table-body");async function P(){S.innerHTML='<tr><td colspan="5" style="text-align: center;">Memuat data...</td></tr>';try{const _=await Ot(Lt(lt(H,"reset_password_requests"),Ye("created_at","desc"))),b=[];_.forEach(E=>{b.push({id:E.id,...E.data()})}),D(b)}catch(_){console.error(_),S.innerHTML='<tr><td colspan="5" style="text-align: center; color: var(--error);">Gagal memuat pengajuan reset.</td></tr>'}}function D(_){if(_.length===0){S.innerHTML='<tr><td colspan="5" style="text-align: center; color: var(--on-surface-variant);">Tidak ada pengajuan reset password.</td></tr>';return}S.innerHTML=_.map(b=>{const E=h.find($=>$.email===b.email),k=E?E.nama_lengkap:"Email Tidak Terdaftar (Bukan Warga)",R=E?`(${E.username})`:"",x=b.created_at?new Date(b.created_at.seconds*1e3).toLocaleString("id-ID"):"-";return`
        <tr>
          <td style="font-weight: 600; color: ${E?"var(--on-background)":"var(--error)"};">
            ${k} ${R}
          </td>
          <td>${b.email}</td>
          <td>${x}</td>
          <td>
            <span style="padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: bold; background-color: ${b.status==="approved"?"rgba(34, 197, 94, 0.15)":b.status==="rejected"?"rgba(239, 68, 68, 0.15)":"rgba(245, 158, 11, 0.15)"}; color: ${b.status==="approved"?"var(--success)":b.status==="rejected"?"var(--error)":"var(--warning)"};">
              ${b.status==="approved"?"Disetujui":b.status==="rejected"?"Ditolak":"Pending"}
            </span>
          </td>
          <td style="text-align: right;">
            <div style="display: flex; gap: 8px; justify-content: flex-end; align-items: center;">
              ${b.status==="pending"?`
                <button class="btn btn-primary approve-reset-btn" data-id="${b.id}" data-email="${b.email}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
                  <i class="ri-check-line"></i> Setujui (123456)
                </button>
                <button class="btn btn-danger reject-reset-btn" data-id="${b.id}" data-email="${b.email}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
                  <i class="ri-close-line"></i> Tolak
                </button>
              `:""}
              <button class="btn btn-secondary delete-reset-btn" data-id="${b.id}" data-email="${b.email}" title="Hapus Pengajuan" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem; background-color: var(--surface-variant); color: var(--on-surface-variant);">
                <i class="ri-delete-bin-line"></i> Hapus
              </button>
            </div>
          </td>
        </tr>
      `}).join(""),document.querySelectorAll(".approve-reset-btn").forEach(b=>{b.addEventListener("click",()=>M(b.dataset.id,b.dataset.email))}),document.querySelectorAll(".reject-reset-btn").forEach(b=>{b.addEventListener("click",()=>C(b.dataset.id,b.dataset.email))}),document.querySelectorAll(".delete-reset-btn").forEach(b=>{b.addEventListener("click",()=>I(b.dataset.id,b.dataset.email))})}async function M(_,b){if((await Swal.fire({title:"Setujui Reset Password?",text:`Apakah Anda yakin ingin mereset password akun ${b} menjadi 123456?`,icon:"question",showCancelButton:!0,confirmButtonColor:"var(--primary)"})).isConfirmed){Swal.fire({title:"Memproses reset password...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{await FP(jP,"resetUserPasswordToDefault")({email:b}),await ps(ct(H,"reset_password_requests",_),{status:"approved"}),await wt("update",`Mereset password user ${b} menjadi 123456`),Swal.fire("Berhasil","Password berhasil di-reset menjadi 123456.","success"),P()}catch(k){console.error(k),Swal.fire("Gagal",k.message||"Gagal mereset sandi. Pastikan Cloud Functions terdeploy atau ganti password melalui Firebase Console.","error")}}}async function C(_,b){if((await Swal.fire({title:"Tolak Reset Password?",text:`Apakah Anda yakin ingin menolak pengajuan reset password untuk akun ${b}?`,icon:"warning",showCancelButton:!0,confirmButtonColor:"var(--error)",confirmButtonText:"Ya, Tolak",cancelButtonText:"Batal"})).isConfirmed){Swal.fire({title:"Memproses...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{await ps(ct(H,"reset_password_requests",_),{status:"rejected"}),await wt("update",`Menolak permintaan reset password user ${b}`),Swal.fire("Selesai","Pengajuan reset password telah ditolak.","success"),P()}catch(k){console.error(k),Swal.fire("Gagal","Gagal menolak pengajuan reset.","error")}}}async function I(_,b){if((await Swal.fire({title:"Hapus Pengajuan?",text:`Apakah Anda yakin ingin menghapus data pengajuan reset password untuk akun ${b}?`,icon:"warning",showCancelButton:!0,confirmButtonColor:"var(--error)",confirmButtonText:"Ya, Hapus",cancelButtonText:"Batal"})).isConfirmed){Swal.fire({title:"Memproses...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{await un(ct(H,"reset_password_requests",_)),await wt("delete",`Menghapus dokumen riwayat pengajuan reset password user ${b}`),Swal.fire("Berhasil","Pengajuan reset password telah dihapus.","success"),P()}catch(k){console.error(k),Swal.fire("Gagal","Gagal menghapus pengajuan.","error")}}}g(),P()}function _O(n){const t=n.role==="admin";return`
    <div class="card" style="width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
        <h3 class="card-title" style="margin-bottom: 0;">Data Warga</h3>
        
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <!-- Export / Import Buttons -->
          <button id="btn-export-excel" class="btn btn-secondary" style="padding: 8px 16px; border-radius: var(--radius-md); font-size: 0.85rem;">
            <i class="ri-file-excel-2-line"></i> Export Excel
          </button>
          <button id="btn-print-warga" class="btn btn-secondary" style="padding: 8px 16px; border-radius: var(--radius-md); font-size: 0.85rem;">
            <i class="ri-printer-line"></i> Cetak / PDF
          </button>
          
          ${t?`
            <button id="btn-import-excel" class="btn btn-secondary" style="padding: 8px 16px; border-radius: var(--radius-md); font-size: 0.85rem;">
              <i class="ri-upload-2-line"></i> Import Excel
            </button>
            <button id="btn-add-warga" class="btn btn-primary" style="padding: 8px 16px; border-radius: var(--radius-md); font-size: 0.85rem;">
              <i class="ri-user-add-line"></i> Tambah Warga
            </button>
          `:""}
        </div>
      </div>

      <!-- Filters & Search -->
      <div style="display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
        <div class="form-group" style="flex: 1; min-width: 200px; margin-bottom: 0;">
          <input type="text" id="search-warga" class="form-control" placeholder="Cari NIK, nama, atau alamat...">
        </div>
        <div class="form-group" style="width: 160px; margin-bottom: 0;">
          <select id="filter-status-tinggal" class="form-control">
            <option value="">Semua Tinggal</option>
            <option value="tetap">Tetap</option>
            <option value="kontrak">Kontrak</option>
            <option value="kos">Kos</option>
          </select>
        </div>
        <div class="form-group" style="width: 150px; margin-bottom: 0;">
          <select id="filter-status" class="form-control">
            <option value="">Semua Status</option>
            <option value="aktif">Aktif</option>
            <option value="tidak aktif">Tidak Aktif</option>
          </select>
        </div>
      </div>

      <!-- Table View -->
      <div class="table-responsive" id="print-area">
        <table class="table">
          <thead>
            <tr>
              <th>NIK</th>
              <th>Nama</th>
              <th>Status Tinggal</th>
              <th>No Kamar</th>
              <th>No HP</th>
              <th>Status</th>
              ${t?'<th style="text-align: right;" class="no-print">Aksi</th>':""}
            </tr>
          </thead>
          <tbody id="warga-table-body">
            <tr>
              <td colspan="${t?7:6}" style="text-align: center; color: var(--on-surface-variant);">Memuat data warga...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Hidden Input File for Excel Import -->
    <input type="file" id="import-excel-file" accept=".xlsx, .xls" style="display: none;">

    <!-- Add/Edit Warga Modal -->
    ${t?`
    <div id="warga-modal" class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="modal-warga-title" style="font-weight: 700;">Tambah Warga</h3>
          <button id="modal-warga-close" class="btn btn-secondary" style="padding: 6px 12px; border-radius: var(--radius-full);">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <form id="warga-form">
          <input type="hidden" id="warga-id">
          <div class="modal-body" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group">
              <label class="form-label" for="warga-nik">NIK (16 Digit) <span style="font-weight: normal; font-size: 0.75rem; color: var(--on-surface-variant);">(Opsional)</span></label>
              <input type="text" id="warga-nik" class="form-control" maxlength="16">
            </div>
            <div class="form-group">
              <label class="form-label" for="warga-nama">Nama Lengkap</label>
              <input type="text" id="warga-nama" class="form-control" required placeholder="Contoh: Sugeng Rahayu">
            </div>
            <div class="form-group">
              <label class="form-label" for="warga-no-telp">Nomor HP <span style="font-weight: normal; font-size: 0.75rem; color: var(--on-surface-variant);">(Opsional)</span></label>
              <input type="text" id="warga-no-telp" class="form-control" placeholder="Contoh: 0812...">
            </div>
            <div class="form-group">
              <label class="form-label" for="warga-alamat">Alamat Lengkap <span style="font-weight: normal; font-size: 0.75rem; color: var(--on-surface-variant);">(Opsional)</span></label>
              <textarea id="warga-alamat" class="form-control" rows="2" placeholder="Alamat rumah asal/detail tinggal"></textarea>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label" for="warga-status-tinggal">Status Tinggal <span style="font-weight: normal; font-size: 0.75rem; color: var(--on-surface-variant);">(Opsional)</span></label>
                <select id="warga-status-tinggal" class="form-control">
                  <option value="">Pilih...</option>
                  <option value="tetap">Tetap</option>
                  <option value="kontrak">Kontrak</option>
                  <option value="kos">Kos</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="warga-no-kamar">Nomor Kamar <span style="font-weight: normal; font-size: 0.75rem; color: var(--on-surface-variant);">(Opsional)</span></label>
                <input type="text" id="warga-no-kamar" class="form-control" placeholder="Contoh: A-10">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="warga-keterangan">Keterangan Tinggal <span style="font-weight: normal; font-size: 0.75rem; color: var(--on-surface-variant);">(Opsional)</span></label>
              <input type="text" id="warga-keterangan" class="form-control">
            </div>
            <div class="form-group">
              <label class="form-label" for="warga-status">Status Keaktifan</label>
              <select id="warga-status" class="form-control" required>
                <option value="aktif">Aktif</option>
                <option value="tidak aktif">Tidak Aktif</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" id="btn-cancel-warga" class="btn btn-secondary">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
    `:""}
  `}async function bO(n){const t=n.role==="admin",e=document.getElementById("warga-table-body"),i=document.getElementById("search-warga"),s=document.getElementById("filter-status-tinggal"),r=document.getElementById("filter-status");let a=[],o,l;async function c(){e.innerHTML=`<tr><td colspan="${t?7:6}" style="text-align: center;">Memuat data...</td></tr>`;try{const h=Lt(lt(H,"warga"),Ye("nama")),f=await Ot(h);a=[],f.forEach(g=>{a.push({id:g.id,...g.data()})}),d()}catch(h){console.error(h),e.innerHTML=`<tr><td colspan="${t?7:6}" style="text-align: center; color: var(--error);">Gagal memuat data warga.</td></tr>`}}function d(){const h=i.value.toLowerCase().trim(),f=s.value,g=r.value,y=a.filter(v=>{const w=v.nama.toLowerCase().includes(h)||v.nik.includes(h)||v.alamat&&v.alamat.toLowerCase().includes(h),A=f===""||v.status_tinggal===f,S=g===""||v.status===g;return w&&A&&S});if(y.length===0){e.innerHTML=`<tr><td colspan="${t?7:6}" style="text-align: center; color: var(--on-surface-variant);">Tidak ada data warga ditemukan.</td></tr>`;return}e.innerHTML=y.map(v=>`
      <tr>
        <td>${v.nik}</td>
        <td style="font-weight: 600;">${v.nama}</td>
        <td><span style="text-transform: capitalize;">${v.status_tinggal}</span></td>
        <td>${v.no_kamar||"-"}</td>
        <td>${v.no_telp||"-"}</td>
        <td>
          <span style="padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: bold; background-color: ${v.status==="aktif"?"rgba(34, 197, 94, 0.15)":"rgba(239, 68, 68, 0.15)"}; color: ${v.status==="aktif"?"var(--success)":"var(--error)"};">
            ${v.status==="aktif"?"Aktif":"Nonaktif"}
          </span>
        </td>
        ${t?`
        <td style="text-align: right;" class="no-print">
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <button class="btn btn-secondary edit-warga-btn" data-id="${v.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
              <i class="ri-edit-line"></i> Edit
            </button>
            <button class="btn btn-danger delete-warga-btn" data-id="${v.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
              <i class="ri-delete-bin-line"></i> Hapus
            </button>
          </div>
        </td>
        `:""}
      </tr>
    `).join(""),t&&(document.querySelectorAll(".edit-warga-btn").forEach(v=>{v.addEventListener("click",()=>o(v.dataset.id))}),document.querySelectorAll(".delete-warga-btn").forEach(v=>{v.addEventListener("click",()=>l(v.dataset.id))}))}if(i.addEventListener("input",d),s.addEventListener("change",d),r.addEventListener("change",d),document.getElementById("btn-print-warga").addEventListener("click",()=>{const h=document.createElement("style");h.innerHTML=`
      @media print {
        body * { visibility: hidden; }
        #print-area, #print-area * { visibility: visible; }
        #print-area { position: absolute; left: 0; top: 0; width: 100%; }
        .no-print { display: none !important; }
      }
    `,document.head.appendChild(h),window.print(),document.head.removeChild(h)}),document.getElementById("btn-export-excel").addEventListener("click",()=>{if(a.length===0){Swal.fire("Info","Tidak ada data warga untuk diekspor.","info");return}const h=a.map(y=>({NIK:y.nik,Nama:y.nama,"Status Tinggal":y.status_tinggal,"No Kamar":y.no_kamar||"","No HP":y.no_telp||"",Alamat:y.alamat||"",Status:y.status})),f=XLSX.utils.json_to_sheet(h),g=XLSX.utils.book_new();XLSX.utils.book_append_sheet(g,f,"Data Warga"),XLSX.writeFile(g,"Data_Warga_eKasRT.xlsx")}),t){const h=document.getElementById("warga-modal"),f=document.getElementById("warga-form"),g=document.getElementById("btn-add-warga"),y=document.getElementById("btn-import-excel"),v=document.getElementById("import-excel-file");g.addEventListener("click",()=>{document.getElementById("modal-warga-title").innerText="Tambah Warga",document.getElementById("warga-id").value="",document.getElementById("warga-nik").value="",document.getElementById("warga-nama").value="",document.getElementById("warga-no-telp").value="",document.getElementById("warga-alamat").value="",document.getElementById("warga-status-tinggal").value="tetap",document.getElementById("warga-no-kamar").value="",document.getElementById("warga-keterangan").value="",document.getElementById("warga-status").value="aktif",h.classList.add("show")});const w=()=>h.classList.remove("show");document.getElementById("modal-warga-close").addEventListener("click",w),document.getElementById("btn-cancel-warga").addEventListener("click",w),o=function(A){const S=a.find(P=>P.id===A);S&&(document.getElementById("modal-warga-title").innerText="Edit Warga",document.getElementById("warga-id").value=S.id,document.getElementById("warga-nik").value=S.nik,document.getElementById("warga-nama").value=S.nama,document.getElementById("warga-no-telp").value=S.no_telp||"",document.getElementById("warga-alamat").value=S.alamat||"",document.getElementById("warga-status-tinggal").value=S.status_tinggal||"tetap",document.getElementById("warga-no-kamar").value=S.no_kamar||"",document.getElementById("warga-keterangan").value=S.keterangan_tinggal||"",document.getElementById("warga-status").value=S.status||"aktif",h.classList.add("show"))},l=async function(A){const S=a.find(D=>D.id===A);if(!S)return;if((await Swal.fire({title:"Hapus Data Warga?",text:`Apakah Anda yakin ingin menghapus data ${S.nama}?`,icon:"warning",showCancelButton:!0,confirmButtonColor:"var(--error)",cancelButtonColor:"var(--secondary)",confirmButtonText:"Ya, Hapus!",cancelButtonText:"Batal"})).isConfirmed){Swal.fire({title:"Memproses...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{await un(ct(H,"warga",A)),await wt("delete",`Menghapus data warga ${S.nama}`),Swal.fire("Terhapus!","Data warga telah dihapus.","success"),c()}catch(D){console.error("Error deleting citizen:",D),Swal.fire("Gagal!","Gagal menghapus data warga. Detail: "+(D.message||D),"error")}}},f.addEventListener("submit",async A=>{A.preventDefault();const S=document.getElementById("warga-id").value,P=document.getElementById("warga-nik").value.trim(),D=document.getElementById("warga-nama").value.trim(),M=document.getElementById("warga-no-telp").value.trim(),C=document.getElementById("warga-alamat").value.trim(),I=document.getElementById("warga-status-tinggal").value,_=document.getElementById("warga-no-kamar").value.trim(),b=document.getElementById("warga-keterangan").value.trim(),E=document.getElementById("warga-status").value;if(P&&(P.length!==16||isNaN(P))){Swal.fire("Peringatan","NIK harus 16 digit angka.","warning");return}Swal.fire({title:"Menyimpan...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{if(S){const k=ct(H,"warga",S);await ps(k,{nik:P,nama:D,no_telp:M,alamat:C,status_tinggal:I,no_kamar:_,keterangan_tinggal:b,status:E,updated_at:Ut()}),await wt("update",`Memperbarui data warga ${D}`)}else{if(P&&a.some(R=>R.nik===P))throw new Error("NIK sudah terdaftar sebelumnya.");await Bs(lt(H,"warga"),{nik:P,nama:D,no_telp:M,alamat:C,status_tinggal:I,no_kamar:_,keterangan_tinggal:b,status:E,created_at:Ut(),updated_at:Ut()}),await wt("create",`Menambahkan data warga baru ${D}`)}Swal.fire("Berhasil!","Data warga telah disimpan.","success"),w(),c()}catch(k){Swal.fire("Gagal!",k.message||"Gagal menyimpan data.","error")}}),y.addEventListener("click",()=>{v.click()}),v.addEventListener("change",A=>{const S=A.target.files[0];if(!S)return;const P=new FileReader;P.onload=async D=>{try{const M=new Uint8Array(D.target.result),C=XLSX.read(M,{type:"array"}),I=C.SheetNames[0],_=C.Sheets[I],b=XLSX.utils.sheet_to_json(_);if(b.length===0){Swal.fire("Info","Berkas Excel kosong atau tidak cocok format.","warning");return}Swal.fire({title:"Memproses Import...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});const E=Cb(H);let k=0;b.forEach(R=>{const x=String(R.NIK||"").trim(),$=String(R.Nama||"").trim();if(x&&$){const G=ct(lt(H,"warga"));E.set(G,{nik:x,nama:$,no_telp:String(R["No HP"]||"").trim(),alamat:String(R.Alamat||"").trim(),status_tinggal:String(R["Status Tinggal"]||"tetap").toLowerCase(),no_kamar:String(R["No Kamar"]||"").trim(),status:String(R.Status||"aktif").toLowerCase(),created_at:Ut(),updated_at:Ut()}),k++}}),await E.commit(),await wt("create",`Mengimpor ${k} data warga dari berkas Excel`),Swal.fire("Sukses",`Berhasil mengimpor ${k} data warga.`,"success"),c()}catch(M){console.error(M),Swal.fire("Gagal","Gagal membaca atau memproses berkas Excel.","error")}v.value=""},P.readAsArrayBuffer(S)})}c()}function vO(){return`
    <div class="grid-2col-1-2">
      <!-- Form Input -->
      <div class="card" style="height: fit-content;">
        <h4 class="card-title" id="form-kategori-title">Tambah Kategori</h4>
        <form id="kategori-form">
          <input type="hidden" id="kategori-id">
          <div class="form-group">
            <label class="form-label" for="kategori-nama">Nama Kategori</label>
            <input type="text" id="kategori-nama" class="form-control" placeholder="Contoh: Iuran Sampah" required>
          </div>
          <div class="form-group" style="margin-bottom: 24px;">
            <label class="form-label" for="kategori-jenis">Jenis Transaksi</label>
            <select id="kategori-jenis" class="form-control" required>
              <option value="pemasukan">Pemasukan</option>
              <option value="pengeluaran">Pengeluaran</option>
            </select>
          </div>
          <div style="display: flex; gap: 12px;">
            <button type="button" id="btn-reset-kategori" class="btn btn-secondary" style="flex: 1; display: none;">Batal</button>
            <button type="submit" class="btn btn-primary" style="flex: 2;">Simpan</button>
          </div>
        </form>
      </div>

      <!-- Categories Table List -->
      <div class="card">
        <h4 class="card-title">Daftar Kategori</h4>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Nama Kategori</th>
                <th>Jenis</th>
                <th style="text-align: right;">Aksi</th>
              </tr>
            </thead>
            <tbody id="kategori-table-body">
              <tr>
                <td colspan="3" style="text-align: center; color: var(--on-surface-variant);">Memuat data kategori...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}async function wO(){const n=document.getElementById("kategori-table-body"),t=document.getElementById("kategori-form"),e=document.getElementById("kategori-id"),i=document.getElementById("kategori-nama"),s=document.getElementById("kategori-jenis"),r=document.getElementById("btn-reset-kategori"),a=document.getElementById("form-kategori-title");let o=[];async function l(){n.innerHTML='<tr><td colspan="3" style="text-align: center;">Memuat data...</td></tr>';try{const g=Lt(lt(H,"kategori_transaksi"),Ye("nama")),y=await Ot(g);o=[],y.forEach(v=>{o.push({id:v.id,...v.data()})}),c()}catch(g){console.error(g),n.innerHTML='<tr><td colspan="3" style="text-align: center; color: var(--error);">Gagal memuat kategori.</td></tr>'}}function c(){if(o.length===0){n.innerHTML='<tr><td colspan="3" style="text-align: center; color: var(--on-surface-variant);">Belum ada kategori terdaftar.</td></tr>';return}n.innerHTML=o.map(g=>`
      <tr>
        <td style="font-weight: 600;">${g.nama}</td>
        <td>
          <span style="padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: bold; background-color: ${g.jenis==="pemasukan"?"rgba(34, 197, 94, 0.15)":"rgba(239, 68, 68, 0.15)"}; color: ${g.jenis==="pemasukan"?"var(--success)":"var(--error)"}; text-transform: capitalize;">
            ${g.jenis}
          </span>
        </td>
        <td style="text-align: right;">
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <button class="btn btn-secondary edit-kategori-btn" data-id="${g.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
              <i class="ri-edit-line"></i>
            </button>
            <button class="btn btn-danger delete-kategori-btn" data-id="${g.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join(""),document.querySelectorAll(".edit-kategori-btn").forEach(g=>{g.addEventListener("click",()=>d(g.dataset.id))}),document.querySelectorAll(".delete-kategori-btn").forEach(g=>{g.addEventListener("click",()=>f(g.dataset.id))})}function d(g){const y=o.find(v=>v.id===g);y&&(a.innerText="Edit Kategori",e.value=y.id,i.value=y.nama,s.value=y.jenis,r.style.display="inline-flex")}function h(){a.innerText="Tambah Kategori",e.value="",i.value="",s.value="pemasukan",r.style.display="none"}r.addEventListener("click",h);async function f(g){const y=o.find(w=>w.id===g);if(!y)return;if((await Swal.fire({title:"Hapus Kategori?",text:`Apakah Anda yakin ingin menghapus kategori "${y.nama}"?`,icon:"warning",showCancelButton:!0,confirmButtonColor:"var(--error)",cancelButtonColor:"var(--secondary)",confirmButtonText:"Ya, Hapus!",cancelButtonText:"Batal"})).isConfirmed)try{await un(ct(H,"kategori_transaksi",g)),await wt("delete",`Menghapus kategori transaksi ${y.nama}`),Swal.fire("Terhapus!","Kategori telah dihapus.","success"),l()}catch{Swal.fire("Gagal!","Gagal menghapus kategori.","error")}}t.addEventListener("submit",async g=>{g.preventDefault();const y=e.value,v=i.value.trim(),w=s.value;Swal.fire({title:"Menyimpan...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{y?(await ps(ct(H,"kategori_transaksi",y),{nama:v,jenis:w}),await wt("update",`Memperbarui kategori transaksi ${v}`)):(await Bs(lt(H,"kategori_transaksi"),{nama:v,jenis:w,created_at:Ut()}),await wt("create",`Menambahkan kategori transaksi baru ${v}`)),Swal.fire("Berhasil!","Kategori transaksi disimpan.","success"),h(),l()}catch{Swal.fire("Gagal!","Terjadi kesalahan saat menyimpan.","error")}}),l()}function IO(n){const t=["admin","bendahara"].includes(n.role);return`
    <div class="${t?"grid-2col-1-2":""}" style="width: 100%; gap: 24px; ${t?"":"display: block;"}">
      <!-- Left Column: Add Transaction (Admin & Bendahara only) -->
      ${t?`
      <div class="card" style="height: fit-content;">
        <h4 class="card-title">Catat Transaksi Kas</h4>
        <form id="transaksi-form">
          <div class="form-group">
            <label class="form-label" for="tx-tanggal">Tanggal Transaksi</label>
            <input type="date" id="tx-tanggal" class="form-control" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="tx-jenis">Jenis Kas</label>
            <select id="tx-jenis" class="form-control" required>
              <option value="pemasukan">Pemasukan (Masuk)</option>
              <option value="pengeluaran">Pengeluaran (Keluar)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="tx-kategori">Kategori</label>
            <select id="tx-kategori" class="form-control" required>
              <option value="">Pilih Kategori...</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="tx-nominal">Nominal (Rp)</label>
            <input type="number" id="tx-nominal" class="form-control" min="0" required placeholder="Contoh: 150000">
          </div>
          <div class="form-group">
            <label class="form-label" for="tx-keterangan">Keterangan</label>
            <input type="text" id="tx-keterangan" class="form-control" placeholder="Tulis rincian transaksi...">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Simpan Transaksi</button>
        </form>
      </div>
      `:""}

      <!-- Right Column: Transactions List History -->
      <div class="card">
        <h4 class="card-title">Riwayat Transaksi Kas</h4>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Keterangan / Kategori</th>
                <th>Jenis</th>
                <th>Nominal</th>
                ${t?'<th style="text-align: right;">Aksi</th>':""}
              </tr>
            </thead>
            <tbody id="transaksi-table-body">
              <tr>
                <td colspan="${t?5:4}" style="text-align: center;">Memuat transaksi...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}async function TO(n){const t=document.getElementById("transaksi-table-body"),e=["admin","bendahara"].includes(n.role);let i=[],s=[];async function r(){if(!e)return;const d=await Ot(Lt(lt(H,"kategori_transaksi"),Ye("nama")));s=[],d.forEach(h=>{s.push({id:h.id,...h.data()})}),a()}function a(){const d=document.getElementById("tx-jenis").value,h=document.getElementById("tx-kategori");if(!h)return;const f=s.filter(y=>y.jenis===d);let g='<option value="">Pilih Kategori...</option>';f.forEach(y=>{g+=`<option value="${y.id}">${y.nama}</option>`}),h.innerHTML=g}async function o(){t.innerHTML=`<tr><td colspan="${e?6:5}" style="text-align: center;">Memuat transaksi...</td></tr>`;try{const d=await Ot(Lt(lt(H,"transaksi"),Ye("tanggal","desc")));i=[],d.forEach(h=>{i.push({id:h.id,...h.data()})}),l()}catch(d){console.error(d),t.innerHTML=`<tr><td colspan="${e?6:5}" style="text-align: center; color: var(--error);">Gagal memuat transaksi.</td></tr>`}}function l(){if(i.length===0){t.innerHTML=`<tr><td colspan="${e?6:5}" style="text-align: center; color: var(--on-surface-variant);">Belum ada transaksi dicatat.</td></tr>`;return}t.innerHTML=i.map(d=>`
      <tr>
        <td>${el(d.tanggal)}</td>
        <td>
          <p style="font-weight: 600; margin: 0;">${d.keterangan||"-"}</p>
          <span style="font-size: 0.75rem; color: var(--on-surface-variant); font-weight: 500;">Kategori: ${d.kategori_nama}</span>
        </td>
        <td>
          <span style="padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: bold; background-color: ${d.jenis==="pemasukan"?"rgba(34, 197, 94, 0.15)":"rgba(239, 68, 68, 0.15)"}; color: ${d.jenis==="pemasukan"?"var(--success)":"var(--error)"}; text-transform: capitalize;">
            ${d.jenis}
          </span>
        </td>
        <td style="font-weight: 700; color: ${d.jenis==="pemasukan"?"var(--success)":"var(--error)"};">
          ${d.jenis==="pemasukan"?"+":"-"}${Bt(d.nominal)}
        </td>
        ${e?`
          <td style="text-align: right;">
            <button class="btn btn-danger delete-tx-btn" data-id="${d.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
              <i class="ri-delete-bin-line"></i>
            </button>
          </td>
        `:""}
      </tr>
    `).join(""),e&&document.querySelectorAll(".delete-tx-btn").forEach(d=>{d.addEventListener("click",()=>c(d.dataset.id))})}async function c(d){const h=i.find(g=>g.id===d);if(!h)return;if((await Swal.fire({title:"Hapus Transaksi?",text:`Apakah Anda yakin ingin menghapus transaksi "${h.keterangan||h.kategori_nama}"? Ini akan mengurangi saldo kas.`,icon:"warning",showCancelButton:!0,confirmButtonColor:"var(--error)"})).isConfirmed)try{await un(ct(H,"transaksi",d)),await wt("delete",`Menghapus transaksi kas: ${h.keterangan||h.kategori_nama}`),Swal.fire("Terhapus","Transaksi kas berhasil dihapus.","success"),o()}catch{Swal.fire("Gagal","Gagal menghapus transaksi.","error")}}if(e){const d=document.getElementById("transaksi-form"),h=document.getElementById("tx-tanggal"),f=document.getElementById("tx-jenis");h.value=pg(new Date),f.addEventListener("change",a),d.addEventListener("submit",async g=>{var D;g.preventDefault();const y=new Date(h.value),v=f.value,w=document.getElementById("tx-kategori").value,A=Number(document.getElementById("tx-nominal").value),S=document.getElementById("tx-keterangan").value.trim();if(A<0){Swal.fire("Peringatan","Nominal transaksi tidak boleh minus atau kurang dari 0.","warning");return}const P=((D=s.find(M=>M.id===w))==null?void 0:D.nama)||"";Swal.fire({title:"Menyimpan Transaksi...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{await Bs(lt(H,"transaksi"),{tanggal:y,kategori_id:w,kategori_nama:P,jenis:v,nominal:A,keterangan:S,user_id_penginput:n.uid||"",user_nama_penginput:n.nama_lengkap||"System",created_at:Ut()}),await wt("create",`Mencatat transaksi kas baru: ${S||P} (${v})`),Swal.fire("Sukses","Transaksi kas berhasil disimpan.","success"),d.reset(),h.value=pg(new Date),a(),o()}catch(M){console.error(M),Swal.fire("Gagal","Gagal menyimpan transaksi.","error")}})}await r(),await o()}function EO(){return`
    <div class="grid-2col-1-1">
      <!-- Left side: Master Dues Settings -->
      <div class="card" style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 class="card-title" style="margin-bottom: 0;">Master Iuran Bulanan</h4>
          <button id="btn-add-iuran" class="btn btn-primary" style="padding: 8px 16px; border-radius: var(--radius-md); font-size: 0.8rem;">
            <i class="ri-add-line"></i> Tambah
          </button>
        </div>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Nama Iuran</th>
                <th>Tempo</th>
                <th>Status</th>
                <th style="text-align: right;">Aksi</th>
              </tr>
            </thead>
            <tbody id="iuran-table-body">
              <tr>
                <td colspan="4" style="text-align: center;">Memuat data iuran...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right side: Custom Rates (Tarif Warga) -->
      <div class="card" style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 class="card-title" style="margin-bottom: 0;">Tarif Iuran Warga</h4>
          <button id="btn-add-tarif" class="btn btn-primary" style="padding: 8px 16px; border-radius: var(--radius-md); font-size: 0.8rem;">
            <i class="ri-add-line"></i> Atur Tarif
          </button>
        </div>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Nama Warga</th>
                <th>Iuran</th>
                <th>Nominal</th>
                <th style="text-align: right;">Aksi</th>
              </tr>
            </thead>
            <tbody id="tarif-table-body">
              <tr>
                <td colspan="4" style="text-align: center;">Memuat data tarif warga...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Master Iuran Modal -->
    <div id="iuran-modal" class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="modal-iuran-title" style="font-weight: 700;">Tambah Iuran</h3>
          <button id="modal-iuran-close" class="btn btn-secondary" style="padding: 6px 12px; border-radius: var(--radius-full);">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <form id="iuran-form">
          <input type="hidden" id="iuran-id">
          <div class="modal-body" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group">
              <label class="form-label" for="iuran-nama">Nama Iuran</label>
              <input type="text" id="iuran-nama" class="form-control" required placeholder="Contoh: Iuran Kebersihan">
            </div>
            <div class="form-group">
              <label class="form-label" for="iuran-kategori">Hubungkan ke Kategori Pemasukan</label>
              <select id="iuran-kategori" class="form-control" required>
                <option value="">Pilih Kategori...</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="iuran-jatuh-tempo">Hari Jatuh Tempo Bulanan</label>
              <input type="number" id="iuran-jatuh-tempo" class="form-control" min="1" max="31" value="10" required>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" id="iuran-aktif" checked style="width: 16px; height: 16px;">
              <label for="iuran-aktif" class="form-label" style="margin-bottom: 0; cursor: pointer;">Status Aktif</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" id="btn-cancel-iuran" class="btn btn-secondary">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Tarif Kustom Modal -->
    <div id="tarif-modal" class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="modal-tarif-title" style="font-weight: 700;">Atur Tarif Iuran Warga</h3>
          <button id="modal-tarif-close" class="btn btn-secondary" style="padding: 6px 12px; border-radius: var(--radius-full);">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <form id="tarif-form">
          <div class="modal-body" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group">
              <label class="form-label" for="tarif-warga-id">Nama Warga (Aktif)</label>
              <select id="tarif-warga-id" class="form-control" required>
                <option value="">Pilih Warga...</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="tarif-iuran-id">Jenis Iuran</label>
              <select id="tarif-iuran-id" class="form-control" required>
                <option value="">Pilih Iuran...</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="tarif-nominal">Nominal Iuran (Rp)</label>
              <input type="number" id="tarif-nominal" class="form-control" min="0" required placeholder="Contoh: 50000">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" id="btn-cancel-tarif" class="btn btn-secondary">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  `}async function xO(){const n=document.getElementById("iuran-table-body"),t=document.getElementById("tarif-table-body"),e=document.getElementById("iuran-modal"),i=document.getElementById("iuran-form"),s=document.getElementById("btn-add-iuran"),r=document.getElementById("tarif-modal"),a=document.getElementById("tarif-form"),o=document.getElementById("btn-add-tarif");let l=[],c=[],d=[],h=[];async function f(){const C=Lt(lt(H,"kategori_transaksi"),Oe("jenis","==","pemasukan")),I=await Ot(C);h=[];let _='<option value="">Pilih Kategori...</option>';I.forEach(b=>{h.push({id:b.id,...b.data()}),_+=`<option value="${b.id}">${b.data().nama}</option>`}),document.getElementById("iuran-kategori").innerHTML=_}async function g(){try{const C=Lt(lt(H,"warga"),Oe("status","==","aktif")),I=await Ot(C);d=[],I.forEach(b=>{d.push({id:b.id,...b.data()})}),d.sort((b,E)=>(b.nama||"").localeCompare(E.nama||""));let _='<option value="">Pilih Warga...</option>';d.forEach(b=>{_+=`<option value="${b.id}">${b.nama}</option>`}),document.getElementById("tarif-warga-id").innerHTML=_}catch(C){console.error("Error loading warga options:",C)}}async function y(){n.innerHTML='<tr><td colspan="4" style="text-align: center;">Memuat data...</td></tr>';try{const C=await Ot(lt(H,"iuran"));l=[];let I='<option value="">Pilih Iuran...</option>';C.forEach(_=>{const b={id:_.id,..._.data()};l.push(b),b.is_aktif&&(I+=`<option value="${b.id}">${b.nama}</option>`)}),document.getElementById("tarif-iuran-id").innerHTML=I,v()}catch(C){console.error(C),n.innerHTML='<tr><td colspan="4" style="text-align: center; color: var(--error);">Gagal memuat iuran.</td></tr>'}}function v(){if(l.length===0){n.innerHTML='<tr><td colspan="4" style="text-align: center; color: var(--on-surface-variant);">Belum ada iuran terdaftar.</td></tr>';return}n.innerHTML=l.map(C=>`
      <tr>
        <td style="font-weight: 600;">${C.nama}</td>
        <td>Tgl ${C.hari_jatuh_tempo}</td>
        <td>
          <span style="padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: bold; background-color: ${C.is_aktif?"rgba(34, 197, 94, 0.15)":"rgba(239, 68, 68, 0.15)"}; color: ${C.is_aktif?"var(--success)":"var(--error)"};">
            ${C.is_aktif?"Aktif":"Nonaktif"}
          </span>
        </td>
        <td style="text-align: right;">
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <button class="btn btn-secondary toggle-iuran-btn" data-id="${C.id}" title="Toggle Aktif/Nonaktif" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
              <i class="ri-refresh-line"></i>
            </button>
            <button class="btn btn-danger delete-iuran-btn" data-id="${C.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join(""),document.querySelectorAll(".toggle-iuran-btn").forEach(C=>{C.addEventListener("click",()=>S(C.dataset.id))}),document.querySelectorAll(".delete-iuran-btn").forEach(C=>{C.addEventListener("click",()=>P(C.dataset.id))})}async function w(){t.innerHTML='<tr><td colspan="4" style="text-align: center;">Memuat data...</td></tr>';try{const C=await Ot(lt(H,"iuran_warga"));c=[],C.forEach(I=>{c.push({id:I.id,...I.data()})}),A()}catch(C){console.error(C),t.innerHTML='<tr><td colspan="4" style="text-align: center; color: var(--error);">Gagal memuat tarif warga.</td></tr>'}}function A(){if(c.length===0){t.innerHTML='<tr><td colspan="4" style="text-align: center; color: var(--on-surface-variant);">Belum ada tarif kustom diatur.</td></tr>';return}t.innerHTML=c.map(C=>{const I=d.find(b=>b.id===C.warga_id)||{nama:"Tidak Diketahui"},_=l.find(b=>b.id===C.iuran_id)||{nama:"Tidak Diketahui"};return`
        <tr>
          <td style="font-weight: 600;">${I.nama}</td>
          <td>${_.nama}</td>
          <td style="font-weight: 600; color: var(--primary);">${Bt(C.nominal)}</td>
          <td style="text-align: right;">
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
              <button class="btn btn-secondary edit-tarif-btn" data-id="${C.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
                <i class="ri-edit-line"></i> Edit
              </button>
              <button class="btn btn-danger delete-tarif-btn" data-id="${C.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
                <i class="ri-delete-bin-line"></i> Hapus
              </button>
            </div>
          </td>
        </tr>
      `}).join(""),document.querySelectorAll(".edit-tarif-btn").forEach(C=>{C.addEventListener("click",()=>M(C.dataset.id))}),document.querySelectorAll(".delete-tarif-btn").forEach(C=>{C.addEventListener("click",()=>D(C.dataset.id))})}async function S(C){const I=l.find(_=>_.id===C);if(I)try{await ps(ct(H,"iuran",C),{is_aktif:!I.is_aktif}),await wt("update",`Mengubah status keaktifan iuran ${I.nama}`),y()}catch{Swal.fire("Gagal","Gagal mengubah status iuran.","error")}}async function P(C){const I=l.find(b=>b.id===C);if(!I)return;if((await Swal.fire({title:"Hapus Iuran?",text:`Apakah Anda yakin ingin menghapus iuran "${I.nama}"? Ini akan menghapus data history terkait.`,icon:"warning",showCancelButton:!0,confirmButtonColor:"var(--error)",cancelButtonColor:"var(--secondary)",confirmButtonText:"Ya, Hapus!"})).isConfirmed)try{await un(ct(H,"iuran",C)),await wt("delete",`Menghapus master iuran ${I.nama}`),Swal.fire("Berhasil","Iuran telah terhapus.","success"),y()}catch{Swal.fire("Gagal","Gagal menghapus iuran.","error")}}i.addEventListener("submit",async C=>{C.preventDefault();const I=document.getElementById("iuran-nama").value.trim(),_=document.getElementById("iuran-kategori").value,b=Number(document.getElementById("iuran-jatuh-tempo").value),E=document.getElementById("iuran-aktif").checked;Swal.fire({title:"Menyimpan...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{await Bs(lt(H,"iuran"),{nama:I,kategori_id:_,hari_jatuh_tempo:b,is_aktif:E,created_at:Ut()}),await wt("create",`Membuat master iuran baru ${I}`),Swal.fire("Sukses","Master iuran berhasil ditambahkan.","success"),e.classList.remove("show"),y()}catch{Swal.fire("Gagal","Gagal menambahkan iuran.","error")}}),a.addEventListener("submit",async C=>{C.preventDefault();const I=document.getElementById("tarif-warga-id").value,_=document.getElementById("tarif-iuran-id").value,b=Number(document.getElementById("tarif-nominal").value);if(b<0){Swal.fire("Peringatan","Nominal tarif tidak boleh minus atau kurang dari 0.","warning");return}Swal.fire({title:"Menyimpan...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{const E=`${I}_${_}`;await Ar(ct(H,"iuran_warga",E),{warga_id:I,iuran_id:_,nominal:b,created_at:Ut(),updated_at:Ut()});const k=d.find(x=>x.id===I)||{nama:""},R=l.find(x=>x.id===_)||{nama:""};await wt("create",`Mengatur tarif kustom ${R.nama} warga ${k.nama} menjadi ${Bt(b)}`),Swal.fire("Sukses","Tarif warga berhasil diatur.","success"),r.classList.remove("remove"),r.classList.remove("show"),w()}catch{Swal.fire("Gagal","Gagal menyimpan tarif warga.","error")}});async function D(C){if((await Swal.fire({title:"Hapus Tarif?",text:"Apakah Anda yakin ingin menghapus tarif kustom warga ini?",icon:"warning",showCancelButton:!0,confirmButtonText:"Ya, Hapus!"})).isConfirmed)try{await un(ct(H,"iuran_warga",C)),await wt("delete",`Menghapus tarif kustom iuran untuk id ${C}`),Swal.fire("Terhapus","Tarif kustom telah dihapus.","success"),w()}catch{Swal.fire("Gagal","Gagal menghapus tarif.","error")}}function M(C){const I=c.find(_=>_.id===C);I&&(document.getElementById("modal-tarif-title").innerText="Edit Tarif Iuran Warga",document.getElementById("tarif-warga-id").value=I.warga_id,document.getElementById("tarif-warga-id").disabled=!0,document.getElementById("tarif-iuran-id").value=I.iuran_id,document.getElementById("tarif-iuran-id").disabled=!0,document.getElementById("tarif-nominal").value=I.nominal,r.classList.add("show"))}s.addEventListener("click",()=>{i.reset(),document.getElementById("iuran-id").value="",e.classList.add("show")}),document.getElementById("modal-iuran-close").addEventListener("click",()=>e.classList.remove("show")),document.getElementById("btn-cancel-iuran").addEventListener("click",()=>e.classList.remove("show")),o.addEventListener("click",()=>{a.reset(),document.getElementById("modal-tarif-title").innerText="Atur Tarif Iuran Warga",document.getElementById("tarif-warga-id").disabled=!1,document.getElementById("tarif-iuran-id").disabled=!1,r.classList.add("show")}),document.getElementById("modal-tarif-close").addEventListener("click",()=>r.classList.remove("show")),document.getElementById("btn-cancel-tarif").addEventListener("click",()=>r.classList.remove("show")),await f(),await g(),await y(),await w()}let lo=null;function kO(n){return["admin","bendahara"].includes(n.role),`
    <div class="card" style="width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
        <h3 class="card-title" style="margin-bottom: 0;">Monitoring Iuran Bulanan</h3>
        
        <!-- Filter Year and Dues Type -->
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <div class="form-group" style="width: 220px; margin-bottom: 0;">
            <select id="mon-iuran-id" class="form-control">
              <option value="">Pilih Jenis Iuran...</option>
            </select>
          </div>
          <div class="form-group" style="width: 120px; margin-bottom: 0;">
            <select id="mon-tahun" class="form-control">
              <!-- Dynamically populated -->
            </select>
          </div>
        </div>
      </div>

      <!-- Color Legend Info -->
      <div style="display: flex; gap: 16px; margin-bottom: 16px; flex-wrap: wrap; font-size: 0.8rem; font-weight: 500;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="status-badge status-paid"><i class="ri-check-line"></i></span>
          <span>Sudah Bayar</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="status-badge status-unpaid"><i class="ri-close-line"></i></span>
          <span>Belum Bayar</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="status-badge status-exempt"><i class="ri-subtract-line"></i></span>
          <span>Tidak Wajib (Tarif Belum Diatur)</span>
        </div>
      </div>

      <!-- 12-Month Matrix Grid Layout -->
      <div class="monitoring-grid-container">
        <!-- Names Column -->
        <div class="grid-names">
          <div class="grid-name-header">Nama Warga</div>
          <div id="grid-warga-names-list" class="grid-rows">
            <!-- Populated via Javascript -->
          </div>
        </div>
        
        <!-- Scrollable Months Grid -->
        <div class="grid-scroll-area">
          <div class="grid-months-header">
            <div class="grid-month-header-cell">Jan</div>
            <div class="grid-month-header-cell">Feb</div>
            <div class="grid-month-header-cell">Mar</div>
            <div class="grid-month-header-cell">Apr</div>
            <div class="grid-month-header-cell">Mei</div>
            <div class="grid-month-header-cell">Jun</div>
            <div class="grid-month-header-cell">Jul</div>
            <div class="grid-month-header-cell">Ags</div>
            <div class="grid-month-header-cell">Sep</div>
            <div class="grid-month-header-cell">Okt</div>
            <div class="grid-month-header-cell">Nov</div>
            <div class="grid-month-header-cell">Des</div>
          </div>
          <div id="grid-months-cells-rows" class="grid-rows">
            <!-- Populated via Javascript -->
          </div>
        </div>
      </div>
    </div>

    <!-- Matrix Cell Action Modal -->
    <div id="mon-action-modal" class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h3 style="font-weight: 700;">Detail Pembayaran</h3>
          <button id="modal-mon-close" class="btn btn-secondary" style="padding: 6px 12px; border-radius: var(--radius-full);">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <div class="modal-body" style="display: flex; flex-direction: column; gap: 16px; font-size: 0.9rem;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--on-surface-variant);">Warga</span>
            <strong id="mon-modal-warga-name">-</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--on-surface-variant);">Jenis Iuran</span>
            <strong id="mon-modal-iuran-name">-</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--on-surface-variant);">Periode</span>
            <strong id="mon-modal-period">-</strong>
          </div>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--surface-variant); padding-bottom: 12px;">
            <span style="color: var(--on-surface-variant);">Nominal Tarif</span>
            <strong id="mon-modal-nominal" style="color: var(--primary); font-size: 1.05rem;">-</strong>
          </div>
          
          <!-- Payment Info Status -->
          <div id="mon-modal-status-info" style="display: none;">
            <div style="display: flex; justify-content: space-between; margin-top: 8px;">
              <span style="color: var(--on-surface-variant);">Status</span>
              <span style="color: var(--success); font-weight: bold;"><i class="ri-checkbox-circle-fill"></i> Sudah Dibayar</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 8px;">
              <span style="color: var(--on-surface-variant);">Tanggal Bayar</span>
              <span id="mon-modal-pay-date" style="font-weight: 500;">-</span>
            </div>
          </div>
        </div>
        <div class="modal-footer" id="mon-modal-footer-actions">
          <!-- Dynamically populated action buttons -->
        </div>
      </div>
    </div>
  `}async function AO(n){const t=document.getElementById("mon-iuran-id"),e=document.getElementById("mon-tahun"),i=document.getElementById("grid-warga-names-list"),s=document.getElementById("grid-months-cells-rows"),r=document.getElementById("mon-action-modal"),a=document.getElementById("modal-mon-close"),o=["admin","bendahara"].includes(n.role);let l=[],c=[],d={},h="",f=new Date().getFullYear();a.addEventListener("click",()=>r.classList.remove("show"));async function g(){const A=await Ot(Lt(lt(H,"iuran"),Ye("nama")));c=[];let S='<option value="">Pilih Jenis Iuran...</option>';A.forEach(E=>{const k=E.data();c.push({id:E.id,...k}),k.is_aktif&&(S+=`<option value="${E.id}">${k.nama}</option>`)}),t.innerHTML=S;const P=c.find(E=>E.is_aktif);P&&(t.value=P.id,h=P.id);const D=await Ot(Lt(lt(H,"warga"),Oe("status","==","aktif")));l=[],D.forEach(E=>{l.push({id:E.id,...E.data()})}),l.sort((E,k)=>(E.nama||"").localeCompare(k.nama||""));const M=await Ot(lt(H,"iuran_warga"));d={},M.forEach(E=>{const k=E.data();d[`${k.warga_id}_${k.iuran_id}`]=k.nominal});const C=await Ot(lt(H,"pembayaran_iuran")),I=new Set;I.add(new Date().getFullYear()),C.forEach(E=>{const k=E.data();k.tahun&&I.add(Number(k.tahun))});const _=Array.from(I).sort((E,k)=>k-E);let b="";_.forEach(E=>{b+=`<option value="${E}" ${E===f?"selected":""}>${E}</option>`}),e.innerHTML=b,y()}function y(){if(lo&&(lo(),lo=null),!h){i.innerHTML="",s.innerHTML="";return}const A=lt(H,"pembayaran_iuran"),S=Lt(A,Oe("iuran_id","==",h),Oe("tahun","==",Number(f)));lo=Gr(S,P=>{const D={};P.forEach(M=>{const C=M.data();D[`${C.warga_id}_${C.bulan}`]={id:M.id,...C}}),v(D)},P=>{console.error("Realtime payments error:",P)})}function v(A){i.innerHTML=l.map(P=>`
      <div class="grid-name-cell" title="${P.nama}">${P.nama}</div>
    `).join("");let S="";l.forEach(P=>{let D='<div class="grid-row">';const M=d[`${P.id}_${h}`],C=M!==void 0;for(let I=1;I<=12;I++){const _=A[`${P.id}_${I}`],b=!!_;let E="status-exempt",k="ri-subtract-line";b?(E="status-paid",k="ri-check-line"):C&&(E="status-unpaid",k="ri-close-line"),D+=`
          <div class="grid-cell select-cell-btn" 
               data-warga-id="${P.id}" 
               data-warga-nama="${P.nama}"
               data-bulan="${I}" 
               data-paid="${b}"
               data-payment-id="${b?_.id:""}"
               data-pay-date="${b&&_.created_at?new Date(_.created_at.seconds*1e3).toLocaleDateString("id-ID"):""}"
               data-rate-nominal="${C?M:"0"}">
            <span class="status-badge ${E}">
              <i class="${k}"></i>
            </span>
          </div>
        `}D+="</div>",S+=D}),s.innerHTML=S,document.querySelectorAll(".select-cell-btn").forEach(P=>{P.addEventListener("click",()=>w(P))})}function w(A){var Q;const S=A.dataset.wargaId,P=A.dataset.wargaNama,D=Number(A.dataset.bulan),M=A.dataset.paid==="true",C=A.dataset.paymentId,I=A.dataset.payDate,_=Number(A.dataset.rateNominal),b=["","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],E=((Q=c.find(it=>it.id===h))==null?void 0:Q.nama)||"Iuran";document.getElementById("mon-modal-warga-name").innerText=P,document.getElementById("mon-modal-iuran-name").innerText=E,document.getElementById("mon-modal-period").innerText=`${b[D]} ${f}`;const k=document.getElementById("mon-modal-nominal"),R=document.getElementById("mon-modal-status-info"),x=document.getElementById("mon-modal-pay-date"),$=document.getElementById("mon-modal-footer-actions");_>0?k.innerText=Bt(_):k.innerText="Belum Diatur (Bukan Wajib Iuran)",M?(R.style.display="block",x.innerText=I,o?$.innerHTML=`
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('mon-action-modal').classList.remove('show')">Batal</button>
          <button type="button" id="btn-cancel-pay" class="btn btn-danger">
            <i class="ri-delete-bin-line"></i> Batalkan Pembayaran
          </button>
        `:$.innerHTML=`
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('mon-action-modal').classList.remove('show')" style="width: 100%;">Tutup</button>
        `):(R.style.display="none",_===0?$.innerHTML=`
          <p style="font-size: 0.8rem; color: var(--error); font-weight: 500; text-align: center; width: 100%;">
            Tarif warga belum diatur. Silakan atur tarif kustom di menu "Master & Tarif Iuran" terlebih dahulu.
          </p>
        `:o?$.innerHTML=`
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('mon-action-modal').classList.remove('show')">Batal</button>
          <button type="button" id="btn-submit-pay" class="btn btn-primary">
            <i class="ri-wallet-3-line"></i> Bayar Sekarang
          </button>
        `:$.innerHTML=`
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('mon-action-modal').classList.remove('show')" style="width: 100%;">Tutup</button>
        `),r.classList.add("show");const G=document.getElementById("btn-cancel-pay");G&&G.addEventListener("click",async()=>{if(r.classList.remove("show"),(await Swal.fire({title:"Batalkan Pembayaran?",text:`Pembayaran iuran ${P} akan dibatalkan, dan transaksi kas terkait akan dihapus.`,icon:"warning",showCancelButton:!0,confirmButtonColor:"var(--error)"})).isConfirmed){Swal.fire({title:"Membatalkan...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{await KP(C),Swal.fire("Berhasil","Pembayaran telah dibatalkan & kas di-rollback.","success")}catch(ft){Swal.fire("Gagal",ft.message||"Gagal membatalkan pembayaran.","error")}}});const X=document.getElementById("btn-submit-pay");X&&X.addEventListener("click",async()=>{r.classList.remove("show"),Swal.fire({title:"Mencatat Pembayaran...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{const it=c.find(ft=>ft.id===h);await WP(S,h,D,f,_,it.kategori_id,it.nama,P),Swal.fire("Sukses",`Pembayaran iuran ${P} telah dicatat.`,"success")}catch(it){Swal.fire("Gagal",it.message||"Gagal mencatat pembayaran.","error")}})}t.addEventListener("change",A=>{h=A.target.value,y()}),e.addEventListener("change",A=>{f=A.target.value,y()}),await g()}Ce.register(...tw);function SO(){return`
    <div class="card" style="width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
        <h3 class="card-title" style="margin-bottom: 0;">Laporan Kas Keuangan</h3>
        
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button id="btn-export-laporan-excel" class="btn btn-secondary" style="padding: 8px 16px; border-radius: var(--radius-md); font-size: 0.85rem;">
            <i class="ri-file-excel-2-line"></i> Unduh Excel
          </button>
          <button id="btn-print-laporan" class="btn btn-secondary" style="padding: 8px 16px; border-radius: var(--radius-md); font-size: 0.85rem;">
            <i class="ri-printer-line"></i> Cetak PDF
          </button>
        </div>
      </div>

      <!-- Filters Form -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 24px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="lap-bulan">Bulan</label>
          <select id="lap-bulan" class="form-control">
            <option value="">Semua Bulan</option>
            <option value="1">Januari</option>
            <option value="2">Februari</option>
            <option value="3">Maret</option>
            <option value="4">April</option>
            <option value="5">Mei</option>
            <option value="6">Juni</option>
            <option value="7">Juli</option>
            <option value="8">Agustus</option>
            <option value="9">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">Desember</option>
          </select>
        </div>
        
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="lap-tahun">Tahun</label>
          <select id="lap-tahun" class="form-control">
            <!-- Dynamically populated -->
          </select>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="lap-jenis">Jenis</label>
          <select id="lap-jenis" class="form-control">
            <option value="">Semua Jenis</option>
            <option value="pemasukan">Pemasukan (Masuk)</option>
            <option value="pengeluaran">Pengeluaran (Keluar)</option>
          </select>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="lap-kategori">Kategori</label>
          <select id="lap-kategori" class="form-control">
            <option value="">Semua Kategori</option>
          </select>
        </div>
      </div>

      <!-- Summary Info Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
        <div style="padding: 16px; border-radius: var(--radius-md); background-color: var(--secondary-container); text-align: center;">
          <p style="font-size: 0.75rem; color: var(--on-surface-variant); font-weight: 600;">Pemasukan Terpilih</p>
          <h4 id="lap-sum-income" style="font-size: 1.15rem; font-weight: 700; color: var(--success); margin-top: 4px;">Rp 0</h4>
        </div>
        <div style="padding: 16px; border-radius: var(--radius-md); background-color: var(--secondary-container); text-align: center;">
          <p style="font-size: 0.75rem; color: var(--on-surface-variant); font-weight: 600;">Pengeluaran Terpilih</p>
          <h4 id="lap-sum-expense" style="font-size: 1.15rem; font-weight: 700; color: var(--error); margin-top: 4px;">Rp 0</h4>
        </div>
        <div style="padding: 16px; border-radius: var(--radius-md); background-color: var(--secondary-container); text-align: center;">
          <p style="font-size: 0.75rem; color: var(--on-surface-variant); font-weight: 600;">Saldo Periode</p>
          <h4 id="lap-sum-balance" style="font-size: 1.15rem; font-weight: 700; color: var(--primary); margin-top: 4px;">Rp 0</h4>
        </div>
      </div>

      <!-- Report Print/Display Table -->
      <div class="table-responsive" id="report-print-area">
        <!-- Document Print Header (Only visible during print) -->
        <div class="print-header-only" style="display: none; text-align: center; margin-bottom: 24px; border-bottom: 2px solid #000; padding-bottom: 12px;">
          <h2 style="margin: 0; font-size: 1.6rem; font-weight: 700;">LAPORAN KEUANGAN KAS RT</h2>
          <p id="print-subheader" style="margin: 4px 0 0 0; font-size: 0.9rem; color: #555;"></p>
        </div>

        <!-- Chart Visualization (Visible in both screen and PDF) -->
        <div id="report-chart-card" class="card" style="margin-bottom: 24px; padding: 20px; border: 1px solid var(--surface-variant); width: 100%;">
          <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--on-surface); margin-bottom: 16px; font-family: 'Poppins', sans-serif;">Grafik Perbandingan Arus Kas</h4>
          <div style="position: relative; height: 260px; width: 100%;">
            <canvas id="reportChart"></canvas>
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Kategori</th>
              <th>Keterangan</th>
              <th>Warga Terkait</th>
              <th>Jenis</th>
              <th style="text-align: right;">Nominal</th>
            </tr>
          </thead>
          <tbody id="laporan-table-body">
            <tr>
              <td colspan="6" style="text-align: center; color: var(--on-surface-variant);">Memuat laporan kas...</td>
            </tr>
          </tbody>
        </table>

        <!-- Document Print Signatures (Only visible during print) -->
        <div class="print-footer-only" id="print-signatures-block" style="display: none; margin-top: 48px; justify-content: space-between; font-size: 0.95rem; font-family: 'Poppins', sans-serif;">
          <div style="text-align: center; width: 220px; display: flex; flex-direction: column; align-items: center;">
            <p style="margin: 0;">Mengetahui,</p>
            <p style="font-weight: 700; margin: 4px 0 0 0;">Ketua RT</p>
            <div style="height: 64px;"></div>
            <p style="text-decoration: underline; font-weight: 700; margin: 0;" id="print-signature-rt">-</p>
          </div>
          <div style="text-align: center; width: 220px; display: flex; flex-direction: column; align-items: center;">
            <p style="margin: 0;">&nbsp;</p>
            <p style="font-weight: 700; margin: 4px 0 0 0;">Bendahara RT</p>
            <div style="height: 64px;"></div>
            <p style="text-decoration: underline; font-weight: 700; margin: 0;" id="print-signature-bendahara">-</p>
          </div>
        </div>
      </div>
    </div>
  `}async function PO(){const n=document.getElementById("laporan-table-body"),t=document.getElementById("lap-bulan"),e=document.getElementById("lap-tahun"),i=document.getElementById("lap-jenis"),s=document.getElementById("lap-kategori");let r=[],a=[];async function o(){const f=await Ot(Lt(lt(H,"kategori_transaksi"),Ye("nama")));a=[];let g='<option value="">Semua Kategori</option>';f.forEach(y=>{a.push({id:y.id,...y.data()}),g+=`<option value="${y.id}">${y.data().nama}</option>`}),s.innerHTML=g}async function l(){n.innerHTML='<tr><td colspan="6" style="text-align: center;">Memuat transaksi...</td></tr>';try{const f=await Ot(Lt(lt(H,"transaksi"),Ye("tanggal","asc")));r=[];const g=new Set;g.add(new Date().getFullYear()),f.forEach(A=>{const S=A.data();if(r.push({id:A.id,...S}),S.tanggal){const P=S.tanggal.toDate?S.tanggal.toDate():new Date(S.tanggal);g.add(P.getFullYear())}});const y=Array.from(g).sort((A,S)=>S-A);let v='<option value="">Semua Tahun</option>';const w=new Date().getFullYear();y.forEach(A=>{v+=`<option value="${A}" ${A===w?"selected":""}>${A}</option>`}),e.innerHTML=v,c()}catch(f){console.error(f),n.innerHTML='<tr><td colspan="6" style="text-align: center; color: var(--error);">Gagal memuat data laporan keuangan.</td></tr>'}}function c(){const f=t.value!==""?Number(t.value):null,g=e.value!==""?Number(e.value):null,y=i.value,v=s.value,w=r.filter(P=>{if(!P.tanggal)return!1;const D=P.tanggal.toDate?P.tanggal.toDate():new Date(P.tanggal),M=f===null||D.getMonth()+1===f,C=g===null||D.getFullYear()===g,I=y===""||P.jenis===y,_=v===""||P.kategori_id===v;return M&&C&&I&&_});let A=0,S=0;if(w.forEach(P=>{P.jenis==="pemasukan"?A+=Number(P.nominal):S+=Number(P.nominal)}),document.getElementById("lap-sum-income").innerText=Bt(A),document.getElementById("lap-sum-expense").innerText=Bt(S),document.getElementById("lap-sum-balance").innerText=Bt(A-S),w.length===0){n.innerHTML='<tr><td colspan="6" style="text-align: center; color: var(--on-surface-variant);">Tidak ada data kas ditemukan untuk filter terpilih.</td></tr>';return}n.innerHTML=w.map(P=>`
      <tr>
        <td>${el(P.tanggal)}</td>
        <td style="font-weight: 600;">${P.kategori_nama}</td>
        <td>${P.keterangan||"-"}</td>
        <td>${P.warga_nama_terkait||"-"}</td>
        <td>
          <span style="font-size: 0.8rem; font-weight: bold; text-transform: uppercase; color: ${P.jenis==="pemasukan"?"var(--success)":"var(--error)"};">
            ${P.jenis}
          </span>
        </td>
        <td style="text-align: right; font-weight: 700; color: ${P.jenis==="pemasukan"?"var(--success)":"var(--error)"};">
          ${Bt(P.nominal)}
        </td>
      </tr>
    `).join("")+`
      <tr style="background-color: var(--secondary-container); font-weight: bold;">
        <td colspan="5" style="text-align: right; font-size: 0.95rem;">TOTAL PEMASUKAN:</td>
        <td style="text-align: right; color: var(--success); font-size: 0.95rem;">${Bt(A)}</td>
      </tr>
      <tr style="background-color: var(--secondary-container); font-weight: bold;">
        <td colspan="5" style="text-align: right; font-size: 0.95rem;">TOTAL PENGELUARAN:</td>
        <td style="text-align: right; color: var(--error); font-size: 0.95rem;">${Bt(S)}</td>
      </tr>
      <tr style="background-color: var(--primary-container); color: var(--on-primary-container); font-weight: 700;">
        <td colspan="5" style="text-align: right; font-size: 1rem;">SALDO AKHIR PERIODE:</td>
        <td style="text-align: right; font-size: 1rem;">${Bt(A-S)}</td>
      </tr>
    `,h(w,g,f)}t.addEventListener("change",c),e.addEventListener("change",c),i.addEventListener("change",c),s.addEventListener("change",c),document.getElementById("btn-print-laporan").addEventListener("click",async()=>{Swal.fire({title:"Menyiapkan PDF...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{const f=await eh(),g=f.ketua||"Ketua RT";document.getElementById("print-signature-rt").innerText=g;let y="Bendahara RT";try{const S=lt(H,"users"),P=Lt(S,Oe("role","==","bendahara"),$A(1)),D=await Ot(P);D.empty||(y=D.docs[0].data().nama_lengkap)}catch(S){console.warn("Failed to fetch bendahara user name:",S)}document.getElementById("print-signature-bendahara").innerText=y;const v=t.value!==""?t.options[t.selectedIndex].text:"Semua Bulan",w=e.value!==""?e.value:"Semua Tahun";document.getElementById("print-subheader").innerText=`Periode: ${v} ${w} (${f.nama_rt||"RT"})`,Swal.close();const A=document.createElement("style");A.innerHTML=`
        @media print {
          /* 1. Reset body and backgrounds for printing */
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            font-family: 'Poppins', 'Segoe UI', Arial, sans-serif !important;
          }
          
          /* 2. Hide UI control elements completely */
          .sidebar, 
          .topbar, 
          .bottom-nav, 
          .theme-switch, 
          .card-title,
          .form-group, 
          #btn-export-laporan-excel, 
          #btn-print-laporan,
          button,
          .btn,
          header {
            display: none !important;
          }

          /* 3. Make main report containers span full page width */
          .app-container {
            display: block !important;
            min-height: auto !important;
          }

          .main-content {
            margin: 0 !important;
            padding: 0 !important;
            display: block !important;
          }

          .card {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            background: transparent !important;
          }

          /* 4. Table printing styles */
          .table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin-top: 24px !important;
            color: #000000 !important;
          }
          .table th, .table td {
            border: 1px solid #000000 !important;
            padding: 8px 10px !important;
            font-size: 0.8rem !important;
            color: #000000 !important;
          }
          .table th {
            background-color: #f1f5f9 !important;
            font-weight: 700 !important;
          }

          /* 5. Show print-only elements */
          .print-header-only {
            display: block !important;
            margin-bottom: 24px !important;
          }
          .print-footer-only {
            display: flex !important;
            margin-top: 40px !important;
          }
        }
      `,document.head.appendChild(A),window.print(),document.head.removeChild(A)}catch(f){Swal.fire("Gagal","Gagal memproses cetak PDF: "+f.message,"error")}}),document.getElementById("btn-export-laporan-excel").addEventListener("click",()=>{const f=t.value!==""?Number(t.value):null,g=e.value!==""?Number(e.value):null,y=i.value,v=s.value,w=r.filter(R=>{if(!R.tanggal)return!1;const x=R.tanggal.toDate?R.tanggal.toDate():new Date(R.tanggal),$=f===null||x.getMonth()+1===f,G=g===null||x.getFullYear()===g,X=y===""||R.jenis===y,Q=v===""||R.kategori_id===v;return $&&G&&X&&Q});if(w.length===0){Swal.fire("Info","Tidak ada data untuk diekspor.","info");return}let A=0,S=0;const P=w.map(R=>{const x=Number(R.nominal);return R.jenis==="pemasukan"?A+=x:S+=x,{Tanggal:el(R.tanggal),Kategori:R.kategori_nama,Keterangan:R.keterangan||"","Warga Terkait":R.warga_nama_terkait||"",Jenis:R.jenis.toUpperCase(),"Nominal (Rp)":x}});P.push({}),P.push({Tanggal:"TOTAL PEMASUKAN","Nominal (Rp)":A}),P.push({Tanggal:"TOTAL PENGELUARAN","Nominal (Rp)":S}),P.push({Tanggal:"SALDO AKHIR PERIODE","Nominal (Rp)":A-S});const D=[],M=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],C=g||new Date().getFullYear();let I=0,_=0;for(let R=0;R<12;R++){let x=0,$=0;r.forEach(G=>{if(!G.tanggal)return;const X=G.tanggal.toDate?G.tanggal.toDate():new Date(G.tanggal);X.getFullYear()===C&&X.getMonth()===R&&(G.jenis==="pemasukan"?x+=Number(G.nominal):$+=Number(G.nominal))}),I+=x,_+=$,D.push({Bulan:M[R],"Pemasukan (Rp)":x,"Pengeluaran (Rp)":$,"Saldo (Rp)":x-$})}D.push({}),D.push({Bulan:"TOTAL TAHUNAN","Pemasukan (Rp)":I,"Pengeluaran (Rp)":_,"Saldo (Rp)":I-_});const b=XLSX.utils.book_new(),E=XLSX.utils.json_to_sheet(D);E["!cols"]=[{wch:18},{wch:18},{wch:18},{wch:18}],XLSX.utils.book_append_sheet(b,E,"Ringkasan Bulanan");const k=XLSX.utils.json_to_sheet(P);k["!cols"]=[{wch:15},{wch:20},{wch:30},{wch:25},{wch:15},{wch:20}],XLSX.utils.book_append_sheet(b,k,"Detail Transaksi"),XLSX.writeFile(b,`Laporan_Kas_RT_${C}.xlsx`)});let d=null;function h(f,g,y){const v=document.getElementById("reportChart");if(!v)return;d&&d.destroy();let w=[],A=[],S=[];if(y===null)w=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"],A=Array(12).fill(0),S=Array(12).fill(0),f.forEach(P=>{if(!P.tanggal)return;const M=(P.tanggal.toDate?P.tanggal.toDate():new Date(P.tanggal)).getMonth();P.jenis==="pemasukan"?A[M]+=Number(P.nominal):S[M]+=Number(P.nominal)});else{w=[["","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][y]];let D=0,M=0;f.forEach(C=>{C.jenis==="pemasukan"?D+=Number(C.nominal):M+=Number(C.nominal)}),A=[D],S=[M]}d=new Ce(v,{type:"bar",data:{labels:w,datasets:[{label:"Pemasukan",data:A,backgroundColor:"#22c55e",borderRadius:6},{label:"Pengeluaran",data:S,backgroundColor:"#ef4444",borderRadius:6}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{font:{family:"Poppins",size:11}}}},scales:{y:{beginAtZero:!0,ticks:{font:{family:"Poppins",size:10}}},x:{ticks:{font:{family:"Poppins",size:10}}}}}})}await o(),await l()}function RO(){return`
    <div style="max-width: 600px; margin: 0 auto; width: 100%;">
      <div class="card">
        <h3 class="card-title" style="margin-bottom: 24px; border-bottom: 1px solid var(--surface-variant); padding-bottom: 12px;">Pengaturan Profil RT</h3>
        
        <form id="settings-form">
          <div class="form-group">
            <label class="form-label" for="set-nama-rt">Nama RT</label>
            <input type="text" id="set-nama-rt" class="form-control" required placeholder="Contoh: RT 03 / RW 02">
          </div>

          <div class="form-group">
            <label class="form-label" for="set-ketua">Nama Ketua RT</label>
            <input type="text" id="set-ketua" class="form-control" required placeholder="Nama lengkap Ketua RT">
          </div>

          <div class="form-group">
            <label class="form-label" for="set-alamat">Alamat / Wilayah RT</label>
            <textarea id="set-alamat" class="form-control" rows="3" required placeholder="Detail alamat wilayah RT"></textarea>
          </div>

          <div class="grid-2col-1-1" style="gap: 16px;">
            <div class="form-group">
              <label class="form-label" for="set-rekening">Nomor Rekening Kas</label>
              <input type="text" id="set-rekening" class="form-control" placeholder="Contoh: Bank Mandiri 12345xxx">
            </div>
            <div class="form-group">
              <label class="form-label" for="set-kontak">Kontak Pengurus (HP)</label>
              <input type="text" id="set-kontak" class="form-control" placeholder="Nomor WA/Telepon">
            </div>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 24px; border-radius: var(--radius-md);">
            <i class="ri-save-line"></i> Simpan Pengaturan
          </button>
        </form>
      </div>
    </div>
  `}async function CO(){const n=document.getElementById("settings-form");async function t(){Swal.fire({title:"Memuat...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{const e=await eh();document.getElementById("set-nama-rt").value=e.nama_rt||"",document.getElementById("set-ketua").value=e.ketua||"",document.getElementById("set-alamat").value=e.alamat||"",document.getElementById("set-rekening").value=e.no_rekening||"",document.getElementById("set-kontak").value=e.kontak||"",Swal.close()}catch(e){console.error(e),Swal.fire("Gagal","Gagal memuat pengaturan profil RT.","error")}}n.addEventListener("submit",async e=>{e.preventDefault();const i=document.getElementById("set-nama-rt").value.trim(),s=document.getElementById("set-ketua").value.trim(),r=document.getElementById("set-alamat").value.trim(),a=document.getElementById("set-rekening").value.trim(),o=document.getElementById("set-kontak").value.trim();Swal.fire({title:"Menyimpan...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{await GP({nama_rt:i,ketua:s,alamat:r,no_rekening:a,kontak:o}),Swal.fire("Berhasil","Pengaturan profil RT berhasil diperbarui.","success"),t()}catch(l){console.error(l),Swal.fire("Gagal","Terjadi kesalahan saat menyimpan pengaturan.","error")}}),await t()}function DO(){return`
    <div style="max-width: 600px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 24px;">
      <!-- Export Backup Card -->
      <div class="card">
        <h4 class="card-title"><i class="ri-download-cloud-line" style="color: var(--primary);"></i> Ekspor Cadangan Data (Backup)</h4>
        <p style="font-size: 0.85rem; color: var(--on-surface-variant); margin-bottom: 20px; line-height: 1.5;">
          Ekspor seluruh data dari Firestore database (User, Warga, Kategori, Transaksi, Iuran, Pembayaran, dsb) menjadi satu berkas cadangan dengan format JSON. Simpan berkas ini di tempat yang aman.
        </p>
        <button id="btn-export-json" class="btn btn-primary" style="width: 100%; border-radius: var(--radius-md);">
          <i class="ri-file-download-line"></i> Unduh File Backup (.json)
        </button>
      </div>

      <!-- Import Restore Card -->
      <div class="card">
        <h4 class="card-title" style="color: var(--error);"><i class="ri-upload-cloud-line"></i> Pulihkan Data Cadangan (Restore)</h4>
        <p style="font-size: 0.85rem; color: var(--on-surface-variant); margin-bottom: 20px; line-height: 1.5;">
          Unggah berkas cadangan JSON yang telah diexport sebelumnya untuk menimpa/memulihkan data di database. 
          <strong style="color: var(--error);">Perhatian: Data yang ada akan ditimpa!</strong>
        </p>
        
        <div class="form-group" style="margin-bottom: 24px;">
          <input type="file" id="restore-json-input" class="form-control" accept=".json">
        </div>
        
        <button id="btn-restore-json" class="btn btn-danger" style="width: 100%; border-radius: var(--radius-md);">
          <i class="ri-history-line"></i> Jalankan Pemulihan Data
        </button>
      </div>
    </div>
  `}function MO(){const n=document.getElementById("btn-export-json"),t=document.getElementById("btn-restore-json"),e=document.getElementById("restore-json-input");n.addEventListener("click",async()=>{Swal.fire({title:"Mengekspor data...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{const i=["users","warga","kategori_transaksi","transaksi","iuran","iuran_warga","pembayaran_iuran","settings"],s={};for(const c of i){const d=await Ot(lt(H,c));s[c]=[],d.forEach(h=>{const f=h.data();Object.keys(f).forEach(g=>{f[g]&&f[g].seconds&&(f[g]={seconds:f[g].seconds})}),s[c].push({id:h.id,...f})})}const r=JSON.stringify(s,null,2),a=new Blob([r],{type:"application/json"}),o=URL.createObjectURL(a),l=document.createElement("a");l.href=o,l.download=`backup_ekasrt_${Date.now()}.json`,document.body.appendChild(l),l.click(),document.body.removeChild(l),await wt("backup","Melakukan export backup database menjadi JSON"),Swal.fire("Berhasil","Berkas cadangan data berhasil diunduh.","success")}catch(i){console.error(i),Swal.fire("Gagal","Gagal melakukan ekspor data.","error")}}),t.addEventListener("click",async()=>{const i=e.files[0];if(!i){Swal.fire("Peringatan","Pilih berkas JSON cadangan terlebih dahulu.","warning");return}if(!(await Swal.fire({title:"Pulihkan Data?",text:"Aksi ini akan menimpa koleksi data aktif dengan data dari berkas cadangan JSON Anda!",icon:"warning",showCancelButton:!0,confirmButtonColor:"var(--error)",confirmButtonText:"Ya, Pulihkan!"})).isConfirmed)return;Swal.fire({title:"Memproses Pemulihan...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});const r=new FileReader;r.onload=async a=>{try{const o=JSON.parse(a.target.result),l=Object.keys(o);for(const c of l){const d=o[c];Array.isArray(d)&&await YP(c,d)}Swal.fire("Selesai","Pemulihan database kas berhasil dijalankan.","success"),e.value=""}catch(o){console.error(o),Swal.fire("Gagal","Gagal memproses berkas JSON atau restore database.","error")}},r.readAsText(i)})}const OO={login:{render:ZP,init:tR,title:"Masuk",requireAuth:!1},dashboard:{render:lO,init:dO,title:"Dashboard",requireAuth:!0,roles:["admin","bendahara","rt","warga"]},users:{render:mO,init:yO,title:"User Management",requireAuth:!0,roles:["admin"]},warga:{render:_O,init:bO,title:"Data Warga",requireAuth:!0,roles:["admin","bendahara","rt"]},kategori:{render:vO,init:wO,title:"Kategori Transaksi",requireAuth:!0,roles:["admin","bendahara"]},transaksi:{render:IO,init:TO,title:"Transaksi Kas Keuangan",requireAuth:!0,roles:["admin","bendahara","rt"]},iuran:{render:EO,init:xO,title:"Pengaturan Master & Tarif Iuran",requireAuth:!0,roles:["admin","bendahara"]},monitoring:{render:kO,init:AO,title:"Monitoring Iuran Warga",requireAuth:!0,roles:["admin","bendahara","rt"]},laporan:{render:SO,init:PO,title:"Laporan Keuangan Kas",requireAuth:!0,roles:["admin","bendahara","rt"]},pengaturan:{render:RO,init:CO,title:"Pengaturan Profil RT",requireAuth:!0,roles:["admin"]},backup:{render:DO,init:MO,title:"Cadangan & Pemulihan Database",requireAuth:!0,roles:["admin"]}};let Do=null,ve=null,Lm=null;async function nw(){const n=document.getElementById("app");if(!n)return;let t=window.location.hash.substring(2);t||(t="dashboard");const e=OO[t];if(!e){window.location.hash="#/dashboard";return}if(e.requireAuth&&!Do){window.location.hash="#/login";return}if(t==="login"&&Do){window.location.hash="#/dashboard";return}if(e.requireAuth&&e.roles&&!e.roles.includes(ve==null?void 0:ve.role)){Swal.fire("Akses Ditolak","Anda tidak memiliki wewenang untuk melihat menu ini.","warning"),window.location.hash="#/dashboard";return}Do&&!Lm&&(Lm=await eh());const i=document.getElementById("app-bottom-nav");if(i&&(e.requireAuth?i.innerHTML=XP(ve==null?void 0:ve.role,t):i.innerHTML=""),!e.requireAuth)n.innerHTML=e.render();else{n.innerHTML=`
      <!-- Mobile Sidebar Backdrop Overlay -->
      <div class="sidebar-backdrop" id="sidebar-backdrop"></div>

      <!-- Desktop Sidebar -->
      <aside class="sidebar" id="app-sidebar">
        ${JP(ve==null?void 0:ve.role,t)}
      </aside>

      <!-- Main Layout Structure -->
      <div style="flex: 1; display: flex; flex-direction: column; min-width: 0;">
        <header class="topbar">
          ${QP(e.title,ve)}
        </header>
        <main class="main-content">
          ${e.render(ve)}
        </main>
      </div>
    `;const s=document.getElementById("toggle-sidebar-mobile"),r=document.getElementById("app-sidebar"),a=document.getElementById("sidebar-backdrop");if(s&&r&&a){s.style.display="block";const c=()=>{r.classList.toggle("show"),a.classList.toggle("show")},d=()=>{r.classList.remove("show"),a.classList.remove("show")};s.addEventListener("click",c),a.addEventListener("click",d),r.querySelectorAll(".sidebar-link").forEach(h=>{h.addEventListener("click",d)})}const o=document.getElementById("sidebar-logout");o&&o.addEventListener("click",async()=>{(await Swal.fire({title:"Keluar Aplikasi?",text:"Anda akan mengakhiri sesi masuk aktif Anda.",icon:"question",showCancelButton:!0,confirmButtonColor:"var(--primary)"})).isConfirmed&&(await $P(),window.location.hash="#/login")});const l=document.getElementById("btn-change-password-nav");l&&l.addEventListener("click",()=>{Swal.fire({title:"Ganti Kata Sandi",html:`
            <input type="password" id="swal-current-password" class="swal2-input" placeholder="Kata sandi saat ini" style="font-family: inherit; font-size: 0.95rem;">
            <input type="password" id="swal-new-password" class="swal2-input" placeholder="Kata sandi baru (min. 6 karakter)" style="font-family: inherit; font-size: 0.95rem;">
            <input type="password" id="swal-confirm-password" class="swal2-input" placeholder="Konfirmasi kata sandi baru" style="font-family: inherit; font-size: 0.95rem;">
          `,focusConfirm:!1,showCancelButton:!0,confirmButtonText:"Simpan",confirmButtonColor:"var(--primary)",cancelButtonText:"Batal",preConfirm:()=>{const c=document.getElementById("swal-current-password").value,d=document.getElementById("swal-new-password").value,h=document.getElementById("swal-confirm-password").value;return c?!d||d.length<6?(Swal.showValidationMessage("Kata sandi baru minimal 6 karakter!"),!1):d===c?(Swal.showValidationMessage("Kata sandi baru tidak boleh sama dengan sandi lama!"),!1):d!==h?(Swal.showValidationMessage("Konfirmasi kata sandi tidak cocok!"),!1):{current:c,pass:d}:(Swal.showValidationMessage("Kata sandi saat ini wajib diisi!"),!1)}}).then(async c=>{if(c.isConfirmed){Swal.fire({title:"Memproses...",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}});try{await qP(c.value.current,c.value.pass),Swal.fire("Berhasil!","Kata sandi Anda telah berhasil diubah.","success")}catch(d){console.error(d);let h="Gagal mengubah kata sandi.";d.code==="auth/wrong-password"||d.code==="auth/invalid-credential"?h="Kata sandi saat ini salah!":d.message&&(h=d.message),Swal.fire("Gagal!",h,"error")}}})})}VO(),e.init&&e.init(ve)}function VO(){const n=document.getElementById("theme-toggle-btn");if(!n)return;let t=localStorage.getItem("theme");t||(t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.setAttribute("data-theme",t),n.innerHTML=`<i class="${t==="dark"?"ri-sun-line":"ri-moon-line"}"></i>`,n.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",e),localStorage.setItem("theme",e),n.innerHTML=`<i class="${e==="dark"?"ri-sun-line":"ri-moon-line"}"></i>`})}window.addEventListener("hashchange",nw);HP((n,t)=>{Do=n,ve=t,nw()});"serviceWorker"in navigator&&window.location.hostname!=="localhost"&&window.location.hostname!=="127.0.0.1"&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js").then(n=>console.log("Service Worker registered successfully!",n.scope)).catch(n=>console.log("Service Worker registration failed:",n))});
