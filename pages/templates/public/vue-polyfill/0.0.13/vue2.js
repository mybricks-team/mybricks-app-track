!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(require("react"),require("vue"),require("react-dom")):"function"==typeof define&&define.amd?define(["react","vue","react-dom"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).React,t.Vue,t.ReactDOM)}(this,(function(t,e,n){"use strict";function r(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var o,a=r(t),s=r(e),i=r(n);function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){h(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(t)}function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,O(r.key),r)}}function d(t,e,n){return e&&f(t.prototype,e),n&&f(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function h(t,e,n){return(e=O(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function v(){return v=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},v.apply(this,arguments)}function m(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&g(t,e)}function y(t){return y=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},y(t)}function g(t,e){return g=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},g(t,e)}function S(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},a=Object.keys(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}function b(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function $(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=y(t);if(e){var o=y(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(t,e){if(e&&("object"==typeof e||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return b(t)}(this,n)}}function _(t){return function(t){if(Array.isArray(t))return P(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return P(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return P(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function P(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function O(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,e||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==typeof e?e:String(e)}var R=(h(o={react:{}},"react",{componentWrap:"div",slotWrap:"div",componentWrapAttrs:{__use_react_component_wrap:"",style:{all:"unset"}},slotWrapAttrs:{__use_react_slot_wrap:"",style:{all:"unset"}}}),h(o,"vue",{componentWrapHOC:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return function(){var n=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).portals,r=void 0===n?[]:n;return a.default.createElement("div",e,t,r.map((function(t){var e=t.Portal,n=t.key;return a.default.createElement(e,{key:n})})))}},componentWrapAttrs:{"data-use-vue-component-wrap":"",style:{width:"100%",height:"100%"}},slotWrapAttrs:{"data-use-vue-slot-wrap":"",style:{all:"unset"}}}),o);function w(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{react:{},vue:{}},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:R,n=arguments.length>2?arguments[2]:void 0;t.vue||(t.vue={}),t.react||(t.react={});var r=[e,c(c({},t),{},{react:c(c(c({},e.react),t.react),{},{componentWrapAttrs:c(c({},e.react.componentWrapAttrs),t.react.componentWrapAttrs),slotWrapAttrs:c(c({},e.react.slotWrapAttrs),t.react.slotWrapAttrs)}),vue:c(c(c({},e.vue),t.vue),{},{componentWrapAttrs:c(c({},e.vue.componentWrapAttrs),t.vue.componentWrapAttrs),slotWrapAttrs:c(c({},e.vue.slotWrapAttrs),t.vue.slotWrapAttrs)})})];return n&&r.unshift({}),Object.assign.apply(this,r)}var C={},j=["ref"],E=["style"],I=["key","data-passed-props"],k=["data-passed-props","hashList"],T=["style"],W=["on","$slots","$scopedSlots","children"],A=parseInt(t.version),V=["getElementById","getElementsByClassName","getElementsByTagName","getElementsByTagNameNS","querySelector","querySelectorAll"],D={Document:{},Element:{}};function x(t){Object.keys(D).forEach((function(e){V.forEach((function(n){var r=window[e].prototype[n];D[e][n]=r,window[e].prototype[n]=function(){for(var e=arguments.length,o=new Array(e),a=0;a<e;a++)o[a]=arguments[a];var s=r.apply(this,o);return s&&s.constructor!==NodeList||s&&s.constructor===NodeList&&s.length>0?s:Element.prototype[n].apply(t,o)}}))}))}function N(){Object.keys(D).forEach((function(t){V.forEach((function(e){window[t].prototype[e]=D[t][e]}))}))}var M=function(t){m(n,t);var e=$(n);function n(t){return p(this,n),e.call(this,t)}return d(n,[{key:"render",value:function(){var t=this.props.component,e=this.props.passedProps;e.ref;var n=S(e,j);return a.default.createElement(t,n,this.props.children)}}]),n}(a.default.Component);function U(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.__esModule&&t.default&&(t=t.default),e.isSlots&&(t=t()),e=w(e,void 0,!0),{originReactComponent:t,data:function(){return{portals:[],portalKeyPool:[],maxPortalCount:0}},created:function(){this.cleanVnodeStyleClass(),this.$root.$options.router&&(C.router=this.$root.$options.router),this.$root.$options.router&&(C.store=this.$root.$options.store)},props:["dataPassedProps"],render:function(t){this.slotsInit();var n=e.react.componentWrapAttrs,r=n.style,o=S(n,T);return t(e.react.componentWrap,{ref:"react",attrs:o,style:r},this.portals.map((function(e){var n=e.Portal,r=e.key;return n(t,r)})))},methods:{pushVuePortal:function(t){var e=this.portalKeyPool.shift()||this.maxPortalCount++;this.portals.push({Portal:t,key:e})},removeVuePortal:function(t){var e,n=this.portals.find((function(n,r){if(n.Portal===t)return e=r,!0}));this.portalKeyPool.push(n.key),this.portals.splice(e,1)},slotsInit:function(t){var e=this;if(t){var n,r,o,a,s;if(null!==(n=t.componentOptions)&&void 0!==n&&null!==(n=n.Ctor)&&void 0!==n&&n.options&&(null===(r=t.componentOptions)||void 0===r||null===(r=r.Ctor)||void 0===r||!r.options.originReactComponent))return;null!==(o=t.data)&&void 0!==o&&o.scopedSlots&&Object.keys(null===(s=t.data)||void 0===s?void 0:s.scopedSlots).forEach((function(e){if("function"==typeof t.data.scopedSlots[e])try{t.data.scopedSlots[e]()}catch(t){}})),(t.children||(null===(a=t.componentOptions)||void 0===a?void 0:a.children)||[]).forEach((function(t){e.slotsInit(t)}))}else Object.keys(this.$slots).forEach((function(t){(e.$slots[t]||[]).forEach((function(t){e.slotsInit(t)}))})),Object.keys(this.$scopedSlots).forEach((function(t){try{e.$scopedSlots[t]()}catch(t){}}))},updateLastVnodeData:function(t){return this.lastVnodeData={style:c(c({},this.formatStyle(t.data.style)),this.formatStyle(t.data.staticStyle)),class:Array.from(new Set([].concat(_(this.formatClass(t.data.class)),_(this.formatClass(t.data.staticClass))))).join(" ")},Object.assign(t.data,{staticStyle:null,style:null,staticClass:null,class:null}),t},cleanVnodeStyleClass:function(){var t=this,e=this.$vnode;this.updateLastVnodeData(e),Object.defineProperty(this,"$vnode",{get:function(){return e},set:function(n){return n===e?e:e=t.updateLastVnodeData(n)}})},toCamelCase:function(t){return t.replace(/-(\w)/g,(function(t,e){return e.toUpperCase()}))},formatStyle:function(t){var e=this;if(!t)return{};if("string"==typeof t)return(t=t.trim()).split(/\s*;\s*/).reduce((function(t,n){return n?(2!==(n=n.split(/\s*:\s*/)).length||Object.assign(t,h({},e.toCamelCase(n[0]),n[1])),t):t}),{});if("object"===l(t)){var n={};return Object.keys(t).forEach((function(r){n[e.toCamelCase(r)]=t[r]})),n}return{}},formatClass:function(t){return t?t instanceof Array?t:"string"==typeof t?(t=t.trim()).split(/\s+/):"object"===l(t)?Object.keys(t).map((function(e){return t[e]?t[e]:""})):[]:[]},getScopeSlot:function(t,n,r){var o=this;function a(a){function s(){for(var r=arguments.length,s=new Array(r),i=0;i<r;i++)s[i]=arguments[i];if(t.reactFunction)return t.reactFunction.apply(this,s);if(e.defaultSlotsFormatter){var u=t.apply(this,s);return u.__top__=o,(u=e.defaultSlotsFormatter(u,o.vueInReactCall,n))instanceof Array||l(u).indexOf("string","number")>-1?u=_(u):"object"===l(u)&&(u=c({},u)),u}return $t(a(t.apply(this,s)),c(c({},e),{},{isSlots:!0,wrapInstance:o})).render()}return e.pureTransformer&&r?s.vueFunction=r:s.vueFunction=t,s}return a.__scopedSlot=!0,a},__syncUpdateProps:function(t){this.reactInstance&&this.reactInstance.setState(t)},mountReactComponent:function(r,o){var s,u=this,f=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},y=null!=this.$props.dataPassedProps?this.$props.dataPassedProps:{},g=y.on,P=y.$slots,O=y.$scopedSlots,R=y.children,w=S(y,W),C={},j=[],T=null===(s=this.$vnode.context)||void 0===s||null===(s=s.$vnode)||void 0===s||null===(s=s.componentOptions)||void 0===s||null===(s=s.Ctor)||void 0===s||null===(s=s.extendOptions)||void 0===s?void 0:s._scopeId;T&&(C[T]="",j.push(T));var V={},D={};if(!r||r&&null!=o&&o.slot){var x=c(c({},P),this.$slots);for(var N in x)V[N]=x[N],V[N].__slot=!0;var U=c(c({},O),this.$scopedSlots);for(var F in U){var L;V[F]?this.$scopedSlots[F]&&(this.$scopedSlots[F].__slot=!0):U[F].__slot?(V[F]=U[F](),V[F].__slot=!0):D[F]=this.getScopeSlot(U[F],j,null===(L=this.$vnode)||void 0===L||null===(L=L.data)||void 0===L||null===(L=L.scopedSlots)||void 0===L?void 0:L[F])}}var B,z=c(c(c(c({},w),c({},this.$attrs)),!r||r&&null!=o&&o.slot?{$slots:V,$scopedSlots:D,children:R}:{}),{},{on:c(c({},g),this.$listeners)});(!r||r&&null!=o&&o.slot)&&(B=c({},V),R=B.default,delete B.default),this.last=this.last||{},this.last.slot=this.last.slot||{},this.last.listeners=this.last.listeners||{},this.last.attrs=this.last.attrs||{};var q={slot:function(){u.last.slot=c(c(c({},R?{children:R}:{children:null}),B),D)},listeners:function(){u.last.listeners=z.on},attrs:function(){u.last.attrs=u.$attrs}};if(o&&Object.keys(o).forEach((function(t){return q[t]()})),r){var K=function(){u.reactInstance&&u.reactInstance.setState((function(t){return Object.keys(t).forEach((function(n){e.isSlots&&"children"===n||delete t[n]})),c(c(c(c({},u.cache),!e.isSlots&&u.last.slot),u.last.attrs),H)})),u.cache=null};this.microTaskUpdate&&(this.cache||this.$nextTick((function(){K(),u.microTaskUpdate=!1}))),this.macroTaskUpdate&&(clearTimeout(this.updateTimer),this.updateTimer=setTimeout((function(){clearTimeout(u.updateTimer),K(),u.macroTaskUpdate=!1})));var H={};Object.keys(this.last.listeners).forEach((function(t){H["on".concat(t.replace(/^(\w)/,(function(t,e){return e.toUpperCase()})))]=u.$listeners[t]})),this.cache=c(c({},this.cache||{}),c(c(c(c(c(c({},w),f),{"data-passed-props":z}),this.lastVnodeData.class?{className:this.lastVnodeData.class}:{}),c({},C)),{},{hashList:j,style:this.lastVnodeData.style})),this.macroTaskUpdate||this.microTaskUpdate||K()}else{q.slot(),q.listeners(),q.attrs();var Y=function(t,e,n){var r;return r=function(r){m(s,r);var o=$(s);function s(r){var a;return p(this,s),(a=o.call(this,r)).state=c(c({},r),e.isSlots?{children:t}:{}),a.setRef=a.setRef.bind(b(a)),a.vueInReactCall=a.vueInReactCall.bind(b(a)),a.vueWrapperRef=n,a}return d(s,[{key:"setRef",value:function(t){t&&(n.reactRef=t,Object.keys(t).forEach((function(e){n[e]||(n[e]=t[e])})),Promise.resolve().then((function(){Object.keys(t).forEach((function(e){n[e]||(n[e]=t[e])}))})),this.setRef.current=t,t.vueWrapperRef=n)}},{key:"createSlot",value:function(t){var n=e.react.slotWrapAttrs,r=n.style,o=S(n,E);return{inheritAttrs:!1,__fromReactSlot:!0,render:function(n){var a,s;if(t instanceof Function&&(t=t(this)),1===(null===(a=t)||void 0===a?void 0:a.length)&&null!==(s=t[0])&&void 0!==s&&s.data){var i=this.$attrs;i.key,i["data-passed-props"];var u=S(i,I);t[0].data.attrs=c(c({},u),t[0].data.attrs)}return n(e.react.slotWrap,{attrs:o,style:r},t)}}}},{key:"componentWillUnmount",value:function(){n.reactRef&&(n.reactRef.vueWrapperRef=null,n.reactRef=null)}},{key:"vueInReactCall",value:function(t){var r=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return(arguments.length>2?arguments[2]:void 0)&&t&&t[0]?t.map((function(t,a){var s;return $t(r.createSlot(t instanceof Function?t:[t]),c(c(c({},e),o),{},{isSlots:!0,wrapInstance:n})).render({key:(null==t||null===(s=t.data)||void 0===s?void 0:s.key)||a})})):$t(this.createSlot(t),c(c(c({},e),o),{},{isSlots:!0,wrapInstance:n})).render()}},{key:"render",value:function(){var r,o,i=this,u=this.state,p=u["data-passed-props"],f=u.hashList,d=S(u,k),h={},m={},y=function(t){if(!d.hasOwnProperty(t)||null==d[t])return 0;if(d[t].__slot){if(d[t].reactSlot)d[t]=d[t].reactSlot;else{var r=d[t];e.defaultSlotsFormatter?(d[t].__top__=i.vueWrapperRef,d[t]=e.defaultSlotsFormatter(d[t],i.vueInReactCall,f),d[t]instanceof Array?d[t]=_(d[t]):["string","number"].indexOf(l(d[t]))>-1?d[t]=[d[t]]:"object"===l(d[t])&&(d[t]=c({},d[t]))):d[t]=c({},$t(i.createSlot(d[t]),c(c({},e),{},{isSlots:!0,wrapInstance:n})).render()),d[t].vueSlot=r}return h[t]=d[t],0}d[t].__scopedSlot&&(d[t]=d[t](i.createSlot),m[t]=d[t])};for(var g in d)y(g);null!==(r=d.children)&&void 0!==r&&r.vueFunction||(o=d.children),h.default=o,p=c(c(c({},p),{$slots:h,$scopedSlots:m}),{},{children:o});var b={};if(b.ref=this.setRef,e.isSlots)return this.state.children||this.props.children;var $=d;e.defaultPropsFormatter&&($=e.defaultPropsFormatter(d,this.vueInReactCall,f));var P=c(c({},$),{"data-passed-props":p});return Object.getPrototypeOf(t)!==Function.prototype&&("object"!==l(t)||t.render)||s.catchVueRefs()?a.default.createElement(t,v({},P,{"data-passed-props":p},b),o||P.children):a.default.createElement(M,v({passedProps:P,component:t},b),o||P.children)}}],[{key:"catchVueRefs",value:function(){if(!n.$parent)return!1;for(var t in n.$parent.$refs)if(n.$parent.$refs[t]===n)return!0;return!1}}]),s}(a.default.Component),h(r,"displayName","useReact_".concat(t.displayName||t.name||"Component")),r}(t,e,this),G={};Object.keys(z.on).forEach((function(t){G["on".concat(t.replace(/^(\w)/,(function(t,e){return e.toUpperCase()})))]=z.on[t]}));var J=a.default.createElement(Y,v({},w,this.$attrs,G,{children:R},B,D,{"data-passed-props":z},this.lastVnodeData.class?{className:this.lastVnodeData.class}:{},C,{hashList:j,style:this.lastVnodeData.style,ref:function(t){return u.reactInstance=t}}));if(this.$redux&&this.$redux.store&&this.$redux.ReactReduxContext){var Q=this.$redux.ReactReduxContext;J=a.default.createElement(Q.Provider,{value:{store:this.$redux.store}},J)}var X=this.$refs.react,Z=e.wrapInstance;if(Z)(Z=e.wrapInstance).vueWrapperRef=this;else for(var tt=this.$parent;tt;){if(tt.parentReactWrapperRef){Z=tt.parentReactWrapperRef;break}if(tt.reactWrapperRef){Z=tt.reactWrapperRef;break}tt=tt.$parent}if(Z)return this.parentReactWrapperRef=Z,this.reactPortal=function(){return n.createPortal(J,X)},void Z.pushReactPortal(this.reactPortal);if(A>17)return void 0!==i.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED&&(i.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint=!0),this.__veauryReactApp__=i.default.createRoot(X),void this.__veauryReactApp__.render(J);i.default.render(J,X)}}},mounted:function(){clearTimeout(this.updateTimer),this.mountReactComponent()},beforeDestroy:function(){if(clearTimeout(this.updateTimer),this.reactPortal)return x(this.$refs.react),this.parentReactWrapperRef&&this.parentReactWrapperRef.removeReactPortal(this.reactPortal),void N();x(this.$refs.react),A>17?this.__veauryReactApp__.unmount():i.default.unmountComponentAtNode(this.$refs.react),N()},updated:function(){this.mountReactComponent(!0,{slot:!0})},inheritAttrs:!1,watch:{$attrs:{handler:function(){this.mountReactComponent(!0,{attrs:!0})},deep:!0},$listeners:{handler:function(){this.mountReactComponent(!0,{listeners:!0})},deep:!0},"$props.dataPassedProps":{handler:function(){this.mountReactComponent(!0,{passedProps:!0})},deep:!0}}}}var F=["style"],L={};function B(t){Object.assign(L.vueInstance.$data,c({},t))}function z(t){return z="function"==typeof Symbol&&"symbol"===l(Symbol.iterator)?function(t){return l(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":l(t)},z(t)}function q(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var K="undefined"!=typeof window;function H(t,e){return e.reduce((function(e,n){return t.hasOwnProperty(n)&&(e[n]=t[n]),e}),{})}var Y={},G={},J={},Q=s.default.extend({data:function(){return{transports:Y,targets:G,sources:J,trackInstances:K}},methods:{open:function(t){if(K){var e=t.to,n=t.from,r=t.passengers,o=t.order,a=void 0===o?1/0:o;if(e&&n&&r){var i,u={to:e,from:n,passengers:(i=r,Array.isArray(i)||"object"===z(i)?Object.freeze(i):i),order:a};-1===Object.keys(this.transports).indexOf(e)&&s.default.set(this.transports,e,[]);var c,l=this.$_getTransportIndex(u),p=this.transports[e].slice(0);-1===l?p.push(u):p[l]=u,this.transports[e]=(c=function(t,e){return t.order-e.order},p.map((function(t,e){return[e,t]})).sort((function(t,e){return c(t[1],e[1])||t[0]-e[0]})).map((function(t){return t[1]})))}}},close:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t.to,r=t.from;if(n&&(r||!1!==e)&&this.transports[n])if(e)this.transports[n]=[];else{var o=this.$_getTransportIndex(t);if(o>=0){var a=this.transports[n].slice(0);a.splice(o,1),this.transports[n]=a}}},registerTarget:function(t,e,n){K&&(this.trackInstances&&!n&&this.targets[t]&&console.warn("[portal-vue]: Target ".concat(t," already exists")),this.$set(this.targets,t,Object.freeze([e])))},unregisterTarget:function(t){this.$delete(this.targets,t)},registerSource:function(t,e,n){K&&(this.trackInstances&&!n&&this.sources[t]&&console.warn("[portal-vue]: source ".concat(t," already exists")),this.$set(this.sources,t,Object.freeze([e])))},unregisterSource:function(t){this.$delete(this.sources,t)},hasTarget:function(t){return!(!this.targets[t]||!this.targets[t][0])},hasSource:function(t){return!(!this.sources[t]||!this.sources[t][0])},hasContentFor:function(t){return!!this.transports[t]&&!!this.transports[t].length},$_getTransportIndex:function(t){var e=t.to,n=t.from;for(var r in this.transports[e])if(this.transports[e][r].from===n)return+r;return-1}}}),X=new Q(Y),Z=1,tt=s.default.extend({name:"portal",props:{disabled:{type:Boolean},name:{type:String,default:function(){return String(Z++)}},order:{type:Number,default:0},slim:{type:Boolean},slotProps:{type:Object,default:function(){return{}}},tag:{type:String,default:"DIV"},to:{type:String,default:function(){return String(Math.round(1e7*Math.random()))}}},created:function(){var t=this;this.$nextTick((function(){X.registerSource(t.name,t)}))},mounted:function(){this.disabled||this.sendUpdate()},updated:function(){this.disabled?this.clear():this.sendUpdate()},beforeDestroy:function(){X.unregisterSource(this.name),this.clear()},watch:{to:function(t,e){e&&e!==t&&this.clear(e),this.sendUpdate()}},methods:{clear:function(t){var e={from:this.name,to:t||this.to};X.close(e)},normalizeSlots:function(){return this.$scopedSlots.default?[this.$scopedSlots.default]:this.$slots.default},normalizeOwnChildren:function(t){return"function"==typeof t?t(this.slotProps):t},sendUpdate:function(){var t=this.normalizeSlots();if(t){var e={from:this.name,to:this.to,passengers:q(t),order:this.order};X.open(e)}else this.clear()}},render:function(t){var e=this.$slots.default||this.$scopedSlots.default||[],n=this.tag;return e&&this.disabled?e.length<=1&&this.slim?this.normalizeOwnChildren(e)[0]:t(n,[this.normalizeOwnChildren(e)]):this.slim?t():t(n,{class:{"v-portal":!0},style:{display:"none"},key:"v-portal-placeholder"})}}),et=s.default.extend({name:"portalTarget",props:{multiple:{type:Boolean,default:!1},name:{type:String,required:!0},slim:{type:Boolean,default:!1},slotProps:{type:Object,default:function(){return{}}},tag:{type:String,default:"div"},transition:{type:[String,Object,Function]}},data:function(){return{transports:X.transports,firstRender:!0}},created:function(){var t=this;this.$nextTick((function(){X.registerTarget(t.name,t)}))},watch:{ownTransports:function(){this.$emit("change",this.children().length>0)},name:function(t,e){X.unregisterTarget(e),X.registerTarget(t,this)}},mounted:function(){var t=this;this.transition&&this.$nextTick((function(){t.firstRender=!1}))},beforeDestroy:function(){X.unregisterTarget(this.name)},computed:{ownTransports:function(){var t=this.transports[this.name]||[];return this.multiple?t:0===t.length?[]:[t[t.length-1]]},passengers:function(){return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.reduce((function(t,n){var r=n.passengers[0],o="function"==typeof r?r(e):n.passengers;return t.concat(o)}),[])}(this.ownTransports,this.slotProps)}},methods:{children:function(){return 0!==this.passengers.length?this.passengers:this.$scopedSlots.default?this.$scopedSlots.default(this.slotProps):this.$slots.default||[]},noWrapper:function(){var t=this.slim&&!this.transition;return t&&this.children().length>1&&console.warn("[portal-vue]: PortalTarget with `slim` option received more than one child element."),t}},render:function(t){var e=this.noWrapper(),n=this.children(),r=this.transition||this.tag;return e?n[0]:this.slim&&!r?t():t(r,{props:{tag:this.transition&&this.tag?this.tag:void 0},class:{"vue-portal-target":!0}},n)}}),nt=0,rt=["disabled","name","order","slim","slotProps","tag","to"],ot=["multiple","transition"],at=s.default.extend({name:"MountingPortal",inheritAttrs:!1,props:{append:{type:[Boolean,String]},bail:{type:Boolean},mountTo:{type:String,required:!0},disabled:{type:Boolean},name:{type:String,default:function(){return"mounted_"+String(nt++)}},order:{type:Number,default:0},slim:{type:Boolean},slotProps:{type:Object,default:function(){return{}}},tag:{type:String,default:"DIV"},to:{type:String,default:function(){return String(Math.round(1e7*Math.random()))}},multiple:{type:Boolean,default:!1},targetSlim:{type:Boolean},targetSlotProps:{type:Object,default:function(){return{}}},targetTag:{type:String,default:"div"},transition:{type:[String,Object,Function]}},created:function(){if("undefined"!=typeof document){var t=document.querySelector(this.mountTo);if(t){var e=this.$props;if(X.targets[e.name])e.bail?console.warn("[portal-vue]: Target ".concat(e.name," is already mounted.\n        Aborting because 'bail: true' is set")):this.portalTarget=X.targets[e.name];else{var n=e.append;if(n){var r="string"==typeof n?n:"DIV",o=document.createElement(r);t.appendChild(o),t=o}var a=H(this.$props,ot);a.slim=this.targetSlim,a.tag=this.targetTag,a.slotProps=this.targetSlotProps,a.name=this.to,this.portalTarget=new et({el:t,parent:this.$parent||this,propsData:a})}}else console.error("[portal-vue]: Mount Point '".concat(this.mountTo,"' not found in document"))}},beforeDestroy:function(){var t=this.portalTarget;if(this.append){var e=t.$el;e.parentNode.removeChild(e)}t.$destroy()},render:function(t){if(!this.portalTarget)return console.warn("[portal-vue] Target wasn't mounted"),t();if(!this.$scopedSlots.manual){var e=H(this.$props,rt);return t(tt,{props:e,attrs:this.$attrs,on:this.$listeners,scopedSlots:this.$scopedSlots},this.$slots.default)}var n=this.$scopedSlots.manual({to:this.to});return Array.isArray(n)&&(n=n[0]),n||t()}}),st=new Set(["onClick","onContextMenu","onDoubleClick","onDrag","onDragEnd","onDragEnter","onDragExit","onDragLeave","onDragOver","onDragStart","onDrop","onMouseDown","onMouseEnter","onMouseLeave","onMouseMove","onMouseOut","onMouseOver","onMouseUp","onChange","onInput","onInvalid","onReset","onSubmit","onError","onLoad","onPointerDown","onPointerMove","onPointerUp","onPointerCancel","onGotPointerCapture","onLostPointerCapture","onPointerEnter","onPointerLeave","onPointerOver","onPointerOut","onSelect","onTouchCancel","onTouchEnd","onTouchMove","onTouchStart","onScroll","onWheel","onAbort","onCanPlay","onCanPlayThrough","onDurationChange","onEmptied","onEncrypted","onEnded","onError","onLoadedData","onLoadedMetadata","onLoadStart","onPause","onPlay","onPlaying","onProgress","onRateChange","onSeeked","onSeeking","onStalled","onSuspend","onTimeUpdate","onVolumeChange","onWaiting","onLoad","onError","onAnimationStart","onAnimationEnd","onAnimationIteration","onTransitionEnd","onToggle"]),it=["history","match","location"],ut=["$model"],ct=["$sync"],lt=["$slots","$scopedSlots","children","on"],pt=["component","on","$slots","$scopedSlots","children","class","style","data-passed-props"],ft=["className","classname"],dt=parseFloat(t.version)>=17?"UNSAFE_":"",ht="vuereact-combined-options";function vt(t){return"string"==typeof t?s.default.component(t):t}function mt(t){return"function"==typeof t?t.options:t}var yt,gt=function(t){m(n,t);var e=$(n);function n(t){var r;p(this,n),r=e.call(this,t);var o,a=t.history,i=t.match,u=t.location;return o={history:a,match:i,location:u},L.vueInstance?B(o):(L.vueInstance=new s.default({data:c({},o)}),s.default.prototype.$reactRouter=L.vueInstance.$data),r}return d(n,[{key:"".concat(dt,"componentWillReceiveProps"),value:function(t){B({history:t.history,match:t.match,location:t.location})}},{key:"render",value:function(){var t=this.props;t.history,t.match,t.location;var e=S(t,it);return a.default.createElement(bt,v({},e,{ref:this.props.forwardRef}))}}]),n}(a.default.Component),St=a.default.forwardRef((function(t,e){var n=w(t[ht]||{},void 0,!0);return L.withRouter?(St.RouterTargetComponent||(St.RouterTargetComponent=L.withRouter(gt)),a.default.createElement(St.RouterTargetComponent,v({},c(c({},t),{},h({},ht,n)),{forwardRef:e}))):a.default.createElement(bt,v({},c(c({},t),{},h({},ht,n)),{ref:e}))})),bt=function(t){m(r,t);var e=$(r);function r(t){var n;return p(this,r),(n=e.call(this,t)).state={portals:[]},n.portalKeyPool=[],n.maxPortalCount=0,n.currentVueComponent=vt(t.component),n.createVueInstance=n.createVueInstance.bind(b(n)),n.vueComponentContainer=n.createVueComponentContainer(),n}return d(r,[{key:"pushReactPortal",value:function(t){var e=this.state.portals,n=this.portalKeyPool.shift()||this.maxPortalCount++;e.push({Portal:t,key:n}),this.setState({portals:_(e)})}},{key:"removeReactPortal",value:function(t){var e,n=this.state.portals,r=n.find((function(n,r){if(n.Portal===t)return e=r,!0}));this.portalKeyPool.push(r.key),n.splice(e,1),this.vueRef&&this.setState({portals:_(n)})}},{key:"createVueComponentContainer",value:function(){var t=this,e={},n=this.props[ht];return n.isSlots?(Object.keys(this.props).forEach((function(n){st.has(n)&&"function"==typeof t.props[n]&&(e[n]=t.props[n])})),n.vue.slotWrapAttrs&&(e=c(c({},e),n.vue.slotWrapAttrs))):n.vue.componentWrapAttrs&&(e=c(c({},e),n.vue.componentWrapAttrs)),n.vue.componentWrapHOC(a.default.createElement("div",{ref:this.createVueInstance,key:null}),e)}},{key:"".concat(dt,"componentWillReceiveProps"),value:function(t){var e=this,n=t.component;t[ht];var r=t.children,o=t.$slots,a=S(t,["component",ht,"children","$slots"].map(O));if(n=vt(n),this.currentVueComponent!==n&&this.updateVueComponent(n),this.vueInstance){r=this.transferChildren(r),o=this.transferSlots(o),r&&(a.children=r),o&&(a.$slots=o);var s=this.doSync(this.doVModel(a));Object.keys(this.vueInstance.$data.reactProps).forEach((function(t){t in s||"data-passed-props"===t||e.vueInstance.$set(e.vueInstance.$data.reactProps,t,void 0)})),Object.keys(s).forEach((function(t){e.vueInstance.$set(e.vueInstance.$data.reactProps,t,s[t])}))}}},{key:"componentWillUnmount",value:function(){this.vuePortal?this.parentVueWrapperRef.removeVuePortal(this.vuePortal):this.vueInstance&&this.vueInstance.$destroy()}},{key:"doVModel",value:function(t){var e=t.$model,n=S(t,ut);if(void 0===e)return t;var r=c(c({},{prop:"value",event:"input"}),mt(this.currentVueComponent).model),o=h({},r.prop,e.value);if(n.on||(n.on={}),n.on[r.event]){var a=n.on[r.event];n.on[r.event]=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];a.apply(this,n),e.setter&&e.setter.apply(this,n)}}else n.on=c(c({},n.on),h({},r.event,e.setter||function(){}));return c(c({},n),o)}},{key:"doSync",value:function(t){var e=t.$sync,n=S(t,ct);if(void 0===e)return t;var r={},o=function(t){if(!e.hasOwnProperty(t)||!e[t]||null==e[t].value||null==e[t].setter)return 1;r[t]=e[t].value;var o="update:"+t;if(n.on||(n.on={}),n.on[o]){var a=n.on[o];n.on[o]=function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];a.apply(this,r),e[t].setter&&e[t].setter.apply(this,r)}}else n.on=c(c({},n.on),h({},o,e[t].setter||function(){}))};for(var a in e)o(a);return c(c({},n),r)}},{key:"transferSlots",value:function(t){if(t)return Object.keys(t).forEach((function(e){var n=t[e];t[e]=function(){return n}})),t}},{key:"transferChildren",value:function(t){if(t){var e=t;return t=function(){return e}}}},{key:"createVueInstance",value:function(t){var e=this,r=this,o=this.props,i=o.component,u=o["data-passed-props"],l=void 0===u?{}:u,p=o[ht],f=o.children,d=o.$slots,h=S(o,["component","data-passed-props",ht,"children","$slots"].map(O));f=this.transferChildren(f),d=this.transferSlots(d),f&&(h.children=f),d&&(h.$slots=d),i=vt(i);function v(t){this.vueInstance||(this.vueInstance=t)}v=v.bind(this);var m=c(c({},this.doSync(this.doVModel(h))),{},{"data-passed-props":l}),y=c(c({},C),{},{data:function(){return{reactProps:m}},created:function(){this.reactWrapperRef=r,v(this)},methods:{getNamespaceSlots:function(t,e){var n=this;this.getNamespaceSlots.__namespaceSlots||(this.getNamespaceSlots.__namespaceSlots={});var o=Object.assign({},e),a=function(e){if(!o.hasOwnProperty(e)||!o[e])return 1;var a,s,i,u;"function"==typeof o[e]&&(o[e]=o[e]()),o[e]=(a=o[e],s=e,a.vueSlot?a.vueSlot:(null!==(i=n.getNamespaceSlots.__namespaceSlots[e])&&void 0!==i&&null!==(i=i[0])&&void 0!==i&&null!==(i=i.child)&&void 0!==i&&i.reactInstance?(u=n.getNamespaceSlots.__namespaceSlots[e],n.$nextTick((function(){u[0].child.reactInstance.setState({children:a})}))):(u=[t(U((function(){return a}),c(c({},p),{},{isSlots:!0,wrapInstance:r})),{slot:s})],n.getNamespaceSlots.__namespaceSlots[e]=u),u.reactSlot=a,u))};for(var s in o)a(s);return o},getScopedSlots:function(t,e){var r=this;this.getScopedSlots.__scopeSlots||(this.getScopedSlots.__scopeSlots={});var o=c({},e),s=function(e){if(!o.hasOwnProperty(e))return 1;var s,i=o[e];o[e]=(s=i,function(){for(var e=arguments.length,o=new Array(e),i=0;i<e;i++)o[i]=arguments[i];return s.vueFunction?s.vueFunction.apply(r,o):(u=function(t,e,r){return t({render:function(t){var e=r.react.componentWrapAttrs,n=e.style,o=S(e,F);return t(r.react.componentWrap,{ref:"react",attrs:o,style:n})},methods:{findReactWrapperRef:function(){var t=r.wrapInstance;if(t)(t=r.wrapInstance).vueWrapperRef=this;else for(var e=this.$parent;e;){if(e.parentReactWrapperRef){t=e.parentReactWrapperRef;break}if(e.reactWrapperRef){t=e.reactWrapperRef;break}e=e.$parent}return t},mountReactComponent:function(){var t=this.$refs.react,r=a.default.createElement(e,null),o=this.findReactWrapperRef();if(o)return this.parentReactWrapperRef=o,this.reactPortal=function(){return n.createPortal(r,t)},void o.pushReactPortal(this.reactPortal)}},beforeDestroy:function(){this.reactPortal&&this.parentReactWrapperRef&&this.parentReactWrapperRef.removeReactPortal(this.reactPortal)},mounted:function(){this.mountReactComponent()},updated:function(){}})}(t,(function(){return s.apply(r,o)}),p),u);var u}),o[e].reactFunction=i};for(var i in o)s(i);return o},getChildren:function(t,e){var n,o;if(null!=e)return"function"==typeof e&&(e=e()),e.vueSlot?e.vueSlot:(null!==(n=this.getChildren.__vnode)&&void 0!==n&&null!==(n=n[0])&&void 0!==n&&null!==(n=n.child)&&void 0!==n&&n.reactInstance?(o=this.getChildren.__vnode,this.$nextTick((function(){o[0].child.reactInstance.setState({children:e})}))):(o=[t(U((function(){return e}),c(c({},p),{},{isSlots:!0,wrapInstance:r})))],this.getChildren.__vnode=o),o.reactSlot=e,o)}},mounted:function(){r.vueRef=this.$children[0],this.$children[0].reactWrapperRef=r},beforeDestroy:function(){r.vueRef=null,this.$children[0].reactWrapperRef=null},render:function(t){var n=this.$data.reactProps;n.component;var r=n.on,o=n.$slots,a=n.$scopedSlots;n.children;var s=n.class,i=void 0===s?"":s,u=n.style,l=void 0===u?"":u,p=n["data-passed-props"],f=p.$slots,d=p.$scopedSlots,h=p.children,v=p.on,m=S(p,lt),y=S(n,pt);!function(t,e){if(!t)return{};if(!e)return t;for(var n in t)t.hasOwnProperty(n)&&e[n]&&delete t[n]}(d,f);var g=this.getScopedSlots(t,c(c({},d),a)),b=this.getChildren(t,this.reactProps.children||h),$=this.getNamespaceSlots(t,c(c({},f),o));b&&($.default=b);var P=[b||[]].concat(_(Object.keys($).map((function(t){if("default"!==t)return $[t]})))),O=c(c({},v),r),R={};Object.keys(y).forEach((function(t){st.has(t)&&"function"==typeof y[t]&&(R[t.replace(/^on/,"").toLowerCase()]=y[t],delete y[t])}));var w=c(c(c({},m),y),{},{"data-passed-props":c(c(c({},m),y),{},{on:O,children:b,$slots:$,$scopedSlots:g})}),C=function(t){var n=[],r={},o=mt(e.currentVueComponent);o.mixins&&o.mixins.forEach((function(t){t.props&&(t.props instanceof Array?n=_(t.props):r=c({},t.props))}));var a=Object.assign({},t),s=o.props;if(s)if(s instanceof Array)[].concat(_(s),_(n)).forEach((function(t){delete a[t]}));else{var i=c(c({},s),r);for(var u in i)i.hasOwnProperty(u)&&delete a[u]}return a}(c({},w)),j=C.className,E=C.classname,I=S(C,ft);return t("use_vue_wrapper",{props:w,on:O,nativeOn:R,attrs:I,class:i||j||E||"",style:l,scopedSlots:c({},g)},P)},components:{use_vue_wrapper:i}});if(t){var g="__vue_wrapper_container_"+(Math.random()+"").substr(2);t.id=g;var b=p.wrapInstance;if(b)(b=p.wrapInstance).reactWrapperRef=r;else for(var $=(this._reactInternals||this._reactInternalFiber).return;$;){var P,R;if(null!==(P=$.stateNode)&&void 0!==P&&P.parentVueWrapperRef){b=$.stateNode.parentVueWrapperRef;break}if(null!==(R=$.stateNode)&&void 0!==R&&R.vueWrapperRef){b=$.stateNode.vueWrapperRef;break}$=$.return}if(b&&document.getElementById(g))return this.parentVueWrapperRef=b,this.vuePortal=function(t,n){return t(at,{props:{mountTo:"#"+g,slim:!0,targetSlim:!0},key:g},[t(Object.assign(y,{router:e._router}))])},void b.pushVuePortal(this.vuePortal);this.vueInstance=new s.default(c(c({},y),{},{el:t}))}}},{key:"updateVueComponent",value:function(t){this.currentVueComponent=t,this.vueInstance&&(t.__fromReactSlot?Object.assign(this.vueInstance.$options.components.use_vue_wrapper._Ctor[0].options,t):this.vueInstance.$options.components.use_vue_wrapper=t,this.vueInstance.$forceUpdate())}},{key:"render",value:function(){return a.default.createElement(this.vueComponentContainer,{portals:this.state.portals})}}]),r}(a.default.Component);function $t(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t||console.warn("Component must be passed in applyVueInReact!"),t.__esModule&&t.default&&(t=t.default),a.default.forwardRef((function(n,r){return a.default.createElement(St,v({},n,{component:t,ref:r},h({},ht,e)))}))}var _t=function(t){var e,n,r,o=t.slots,s=t.name,i=t.params,u=void 0===i?{}:i,l=null!=u&&u.m?c(c({},null!=u?u:{}),null!==(e=null==u?void 0:u.m)&&void 0!==e?e:{}):u;return a.default.createElement(a.default.Fragment,null,null===(n=o[s])||void 0===n||null===(r=n.render)||void 0===r?void 0:r.call(n,l))},Pt=function(e){return t.useMemo((function(){return new Proxy({},{has:function(t,n){return n in e},ownKeys:function(t){return Reflect.ownKeys(e)},get:function(t,n){return n===Symbol.toPrimitive?function(){return"{}"}:e[n]}})}),[e])};window.VUEHoc=function(t){var e=$t(t);return function(t){var n=t.data,r=t.outputs,o=t.inputs,s=t.slots,i=t.style,u=t.env,l=t._env,p=t.logger,f=t.title,d=t.id,h={},m={},y=function(t){Object.prototype.hasOwnProperty.call(s,t)&&(h[t]=function(e){return a.default.createElement(_t,{slots:s,name:t,params:e})},m[t]=s[t],m[t].size)};for(var g in s)y(g);var S=Pt(o),b={id:d,title:f,env:u,_env:l,logger:p,data:n,outputs:Pt(r),inputs:S,slots:m};return a.default.createElement(e,v({m:c({style:i},b)},b,{$scopedSlots:h}))}},null!==(yt=window)&&void 0!==yt&&yt.Vue&&(window.Vue.prototype.$eventBus=new window.Vue)}));
