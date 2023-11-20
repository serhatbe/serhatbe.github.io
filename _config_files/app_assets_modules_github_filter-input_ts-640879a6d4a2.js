"use strict";(globalThis.webpackChunk=globalThis.webpackChunk||[]).push([["app_assets_modules_github_filter-input_ts"],{72122:(e,t,i)=>{i.d(t,{a:()=>BaseFilterElement});var n=i(36162),r=i(4738),a=i(59753),s=i(47448),o=i(58700),l=i(76006),u=i(41311);function c(e,t,i,n){var r,a=arguments.length,s=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a<3?r(s):a>3?r(t,i,s):r(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s}let h=new Map;let BaseFilterElement=class BaseFilterElement extends HTMLElement{async cachedJSON(e){let t=await fetch(e,{headers:{"X-Requested-With":"XMLHttpRequest",Accept:"application/json"}});if(!t.ok){let e=Error(),i=t.statusText?` ${t.statusText}`:"";throw e.message=`HTTP ${t.status}${i}`,e}return t.json()}fetchQualifierSuggestions(){let e="data-suggestable-qualifiers",t=this.searchInput.getAttribute(e);if(null===t)throw Error(`
        ${e} is missing from ${this.searchInput.getAttribute("data-target")}.
        Either add it or override fetchQualifierSuggestions.
      `);return JSON.parse(t)}negatableQualifiers(){return JSON.parse(this.searchInput.getAttribute("data-negatable-qualifiers")||"[]")}removeNegationFromQualifierIfSupported(e){if(!e.startsWith("-"))return e;let[t,...i]=e.split(":"),n=t.substring(1);return this.negatableQualifiers().includes(n)&&(t=n),e.includes(":")&&(t+=":"),i?.length>0?`${t}${i.join(":")}`:t}fetchSuggestionsForQualifier(e){e=this.removeNegationFromQualifierIfSupported(e);let t=`data-suggestable-${e}`,i=`data-suggestable-${e}-path`;if(this.searchInput.hasAttribute(t))return JSON.parse(this.searchInput.getAttribute(t)||"[]");if(!this.searchInput.hasAttribute(i))return Promise.resolve([]);{let e=this.searchInput.getAttribute(i);if(!e)throw Error(`${i} not set`);return this.cachedJSON(e)}}hideFilterSuggestions(){(0,r.jK)(this.searchForm),this.autocompleteDropdown.hidden=!0,this.searchInput.setAttribute("aria-expanded","false"),this.searchInput.removeAttribute("aria-activedescendant")}updateFilterSuggestionResults(){let e,t;let i=this.searchInput.value,n=i.slice(0,this.searchInput.selectionEnd),a=(n.match(/(:"[^"]+"?|\S)+$/)||[""])[0].replace(/"/g,"");this.autocompleteDropdown.hidden=!1,this.searchInput.setAttribute("aria-expanded","true"),a.includes(":")?[e,...t]=a.split(":"):e=a,null!=t?this.renderValueSuggestions(e,t.join(":")):this.renderQualifierSuggestions(e),i.trim().length>0&&(!this.invalidSearchTerms()||this.showSubmissionOptionIfInvalidSearchTerms)&&!this.searchMatchesDefault()?(this.clearButton&&(this.clearButton.hidden=!1),(0,r.T_)(this.searchForm)):(this.clearButton&&(this.clearButton.hidden=!0),(0,r.QZ)(this.searchForm))}handleSelectedSuggestionResultEvent(e){let t=e.target;if(t.classList.contains("js-filter-input-support-url"))return;if(t.hasAttribute("data-search")){(0,o.Bt)(this.searchForm);return}let i=t.getAttribute("data-value")||"";":"!==i[i.length-1]&&(i+=" ");let n=this.searchInput.value.slice(0,this.searchInput.selectionEnd),r=n.match(/(\S+)$/)?.pop()||"",s=this.searchInput.value.slice(this.searchInput.selectionEnd),l=" "!==s[0]?" ":"";if(r&&(r.startsWith("-")&&!i.startsWith("-")&&(i=`-${i}`),r.includes(","))){let e=r.split(",");e.pop();let t=i.split(":").slice(1).join(":");e.push(t||""),i=e.join(",")}let u=n.replace(/\S+$/,"");this.searchInput.value=u+i+l+s,e.preventDefault(),this.searchInput.focus();let c=u.length+i.length;this.searchInput.setSelectionRange(c,c),(0,a.f)(this.searchInput,"input")}handleFormKeydownEvent(e){"Enter"!==e.detail.hotkey||this.autocompleteResults.querySelector(".js-filter-loading")||this.autocompleteResults.querySelector(".js-navigation-item.navigation-focus")||(0,o.Bt)(this.searchForm)}clear(){this.searchInput.value=this.getDefaultSearch(),0===this.getInitialValue().trim().length?this.updateFilterSuggestionResults():(0,o.Bt)(this.searchForm)}renderQualifierSuggestions(e){this.showAllQualifiersIfNoneMatch?this.renderMatchingOrAllQualifierSuggestions(e):this.renderMatchingQualifierSuggestions(e)}handleSuggestionNavigation(e){null!=e.target&&this.searchInput.setAttribute("aria-activedescendant",e.target.id)}renderMatchingOrAllQualifierSuggestions(e){let t=this.fetchQualifierSuggestions(),i=this.filterSuggestionsList(t,e,{fuzzy:this.fuzzyMatchQualifiers}).then(e=>0===e.length?t:e);this.renderSuggestionDropdown(i)}renderMatchingQualifierSuggestions(e){let t=this.filterSuggestionsList(this.fetchQualifierSuggestions(),e,{fuzzy:this.fuzzyMatchQualifiers});this.renderSuggestionDropdown(t)}renderValueSuggestions(e,t){let i=this.fetchMatchingSuggestions(e,t);this.renderSuggestionDropdown(i)}async fetchMatchingSuggestions(e,t){let i=this.fetchSuggestionsForQualifier(e),n=t.split(",").pop()||"",r=await this.filterSuggestionsList(i,n,{fuzzy:this.fuzzyMatchValues});return r.map(t=>({value:`${e}:${t.value}`,description:t.description}))}async filterSuggestionsList(e,t,{fuzzy:i}={fuzzy:!0}){let n=await e,r=t.trim().toLowerCase();return r&&0!==r.length?(r.startsWith("-")&&(r=r.slice(1)),n.filter(e=>i?e.value.toLowerCase().includes(r):e.value.toLowerCase().startsWith(r))):n}renderSuggestionDropdown(e){(0,n.sY)((0,n.dy)`
        <div role="listbox" aria-label="${this.suggestionsTitle}">
          ${this.renderSearchWarningIfRequired()}
          ${this.shouldRenderSubmissionOption()?this.renderSearchSuggestion():""}
          ${(0,u.C)(this.renderSuggestionList(e),this.renderLoadingItem())}
        </div>
      `,this.autocompleteResults),this.postDropdownRender()}renderSearchWarningIfRequired(){let e=this.invalidSearchTerms();if(!e||0===e.length)return"";let t=(0,n.dy)``,i=this.getFilterSupportURL();return i&&(t=(0,n.dy)`<a
        class="js-navigation-item js-navigation-open js-filter-input-support-url px-1"
        href="${i}"
        target="_blank"
      >
        Learn more about filters.
      </a>`),(0,n.dy)`
      <div class="color-bg-attention color-fg-muted ml-n2 mr-n2 mt-n1 py-1 px-2 js-search-warning-container">
        Sorry, we don't support the <span class="text-bold">${e}</span> filter yet. ${t}
      </div>
    `}getFilterSupportURL(){return this.searchInput.getAttribute("data-filter-support-url")}postDropdownRender(){}renderSearchSuggestion(){let e=this.searchInput.value.trim();return 0===e.length||/:\s|:$/g.test(e)&&!/(?:\w+:){2,}/g.test(e)?(0,n.dy)``:(0,n.dy)`
      <div
        id="${this.getComponentTagName()}-search-submit-option"
        class="border-bottom-0 rounded-2 py-1 px-2 mx-0 mb-1 js-navigation-item"
        data-action="navigation:focus:${this.getComponentTagName()}#handleSuggestionNavigation"
        data-search="true"
        role="option"
      >
        <span class="text-bold">${e}</span> - submit
      </div>
    `}invalidSearchTerms(){let e=this.fetchQualifierSuggestions().map(e=>e.value),t=new RegExp(/[^\s:]+:/),i=new RegExp(/"(?:\\"|.)*?"/),n=RegExp(`${t.source}(?:${i.source}|[^\\s]*)`),r=new RegExp(/[^\s]+/),a=RegExp(`${n.source}|${r.source}`,"g"),s=this.searchInput.value.match(a)||[],o=s.filter(t=>{t=this.removeNegationFromQualifierIfSupported(t);let i=t.indexOf(":");if(-1===i)return this.unqualifiedSearchTermsAlwaysValid?null:!e.some(e=>e.startsWith(t));{let n=t.substr(0,i+1);return!e.some(e=>e===n)}});return 0===o.length?null:o.join(" ")}searchMatchesDefault(){let e=this.searchInput.value.trim().split(" ").sort(),t=this.getDefaultSearch().trim().split(" ").sort();return e.length===t.length&&e.every((e,i)=>e===t[i])}getInitialValue(){return this.getDataAttributeOrThrow("data-initial-value")}getComponentTagName(){return this.tagName.toLowerCase()}getDefaultSearch(){return this.getDataAttributeOrThrow("data-default-value")}getDataAttributeOrThrow(e){let t=this.searchInput.getAttribute(e);if(null===t)throw Error(`${e} is missing from search input`);return t}renderSuggestionsTitle(){return(0,n.dy)`<p
      class="h6 width-full text-normal border-bottom color-bg-default color-fg-muted py-2 mb-2"
      aria-hidden="true"
    >
      ${this.suggestionsTitle}
    </p>`}async renderSuggestionList(e){let t=await e,i=t.map((e,t)=>(0,n.dy)`
        <div
          class="border-bottom-0 rounded-2 py-1 px-2 mx-0 mb-1 js-navigation-item"
          data-value="${e.value}"
          data-action="navigation:focus:${this.getComponentTagName()}#handleSuggestionNavigation"
          aria-label="${e.value} ${e.description}"
          id="${this.getComponentTagName()}-suggestion-${t}"
          role="option"
        >
          <span class="text-bold">${e.value}</span>${this.spaceBetweenValueAndDescription?" ":""}<span
            class="autocomplete-text-qualifier color-fg-muted"
            >&nbsp;${e.description}</span
          >
          ${e.isAlpha&&this.alphaTag} ${e.isBeta&&this.betaTag}
          ${e.isNew?this.newTag:""}
        </div>
      `);return i.length&&i.unshift(this.renderSuggestionsTitle()),i}renderLoadingItem(){return(0,n.dy)`
      ${this.renderSuggestionsTitle()}
      <span class="js-filter-loading">loading...</span>
    `}handleSearchBlur(){this.hideFilterSuggestions(),this.selectorOfElementToActivateOnBlur&&(0,r.QZ)(document.querySelector(this.selectorOfElementToActivateOnBlur))}inputKey(e){"Escape"===e.key&&this.handleSearchBlur()}shouldRenderSubmissionOption(){return this.showSubmissionOptionIfInvalidSearchTerms||!this.invalidSearchTerms()}static tagFn(e){return(0,n.dy)`<span class="lh-condensed px-1 rounded-2 border color-border-success">${e}</span>`}constructor(...e){super(...e),this.showAllQualifiersIfNoneMatch=!0,this.fuzzyMatchQualifiers=!1,this.fuzzyMatchValues=!0,this.showSubmissionOptionIfInvalidSearchTerms=!1,this.suggestionsTitle="Available filters",this.spaceBetweenValueAndDescription=!0,this.selectorOfElementToActivateOnBlur=null,this.unqualifiedSearchTermsAlwaysValid=!0,this.alphaTag=BaseFilterElement.tagFn("Alpha"),this.betaTag=BaseFilterElement.tagFn("Beta"),this.newTag=(0,n.dy)`<span class="Label ml-1 Label--accent color-bg-default float-right">New</span>`}};c([l.fA],BaseFilterElement.prototype,"autocompleteDropdown",void 0),c([l.fA],BaseFilterElement.prototype,"autocompleteResults",void 0),c([l.fA],BaseFilterElement.prototype,"clearButton",void 0),c([l.fA],BaseFilterElement.prototype,"searchForm",void 0),c([l.fA],BaseFilterElement.prototype,"searchInput",void 0),c([(0,s.Z)({cache:h})],BaseFilterElement.prototype,"cachedJSON",null)},4738:(e,t,i)=>{i.d(t,{QZ:()=>y,ZH:()=>j,jK:()=>S,T_:()=>I,Sw:()=>A,VF:()=>L,VH:()=>$});var n=i(56959),r=i(59753),a=i(98105),s=i(67044),o=i(76134),l=i(36071);function u(e,t){let i=e,n=e.ownerDocument;(i===n||i===n.defaultView||i===n.documentElement||i===n.body)&&(i=n);let r=n.defaultView.Document;if(i instanceof r){let e=null!=t.top?t.top:n.defaultView.pageYOffset,i=null!=t.left?t.left:n.defaultView.pageXOffset;n.defaultView.scrollTo(i,e);return}let a=n.defaultView.HTMLElement;if(!(i instanceof a))throw Error("invariant");i.scrollTop=t.top,null!=t.left&&(i.scrollLeft=t.left)}var c=i(97629);let h=navigator.userAgent.match(/Macintosh/),f=h?"metaKey":"ctrlKey",g=h?"Meta":"Control",d=!1,p={x:0,y:0};function m(e){e instanceof MouseEvent&&((p.x!==e.clientX||p.y!==e.clientY)&&(d=!1),p={x:e.clientX,y:e.clientY})}function v(e){if(d)return;let t=e.currentTarget,{target:i}=e;if(!(i instanceof Element)||!(t instanceof HTMLElement)||!t.closest(".js-active-navigation-container"))return;let n=i.closest(".js-navigation-item");n&&M(n,t)}(0,l.N7)(".js-navigation-container:not(.js-navigation-container-no-mouse)",{subscribe:e=>(0,n.qC)((0,n.RB)(e,"mouseover",m),(0,n.RB)(e,"mouseover",v))});let b=0;function E(e){if(e.target!==document.body&&e.target instanceof HTMLElement&&!e.target.classList.contains("js-navigation-enable"))return;d=!0;let t=D(),i=!1;if(t){let n=t.querySelector(".js-navigation-item.navigation-focus")||t;i=(0,r.f)(n,"navigation:keydown",{hotkey:(0,s.EL)(e),originalEvent:e,originalTarget:e.target})}i||e.preventDefault()}function w(e){let t=e.modifierKey||e.altKey||e.ctrlKey||e.metaKey,i=(0,r.f)(e.currentTarget,"navigation:open",{modifierKey:t,shiftKey:e.shiftKey});i||e.preventDefault()}function y(e){let t=D();e!==t&&(null!==t&&S(t),e?.classList.add("js-active-navigation-container"))}function S(e){e.classList.remove("js-active-navigation-container")}(0,l.N7)(".js-active-navigation-container",{add(){1==++b&&document.addEventListener("keydown",E)},remove(){0==--b&&document.removeEventListener("keydown",E)}}),(0,r.on)("navigation:keydown",".js-active-navigation-container",function(e){let t=e.currentTarget,i=e.detail.originalTarget.matches("input, textarea"),n=e.target;if((0,o.Zf)(e.detail.originalEvent)){if(n.classList.contains("js-navigation-item")){if(i){if(h)switch((0,s.EL)(e.detail.originalEvent)){case"Control+n":k(n,t);break;case"Control+p":C(n,t)}switch((0,s.EL)(e.detail.originalEvent)){case"ArrowUp":C(n,t);break;case"ArrowDown":k(n,t);break;case"Enter":case`${g}+Enter`:x(n,e.detail.originalEvent[f])}}else{if(h)switch((0,s.EL)(e.detail.originalEvent)){case"Control+n":k(n,t);break;case"Control+p":C(n,t);break;case"Alt+v":(function(e,t){let i,n;let r=F(t),s=r.indexOf(e),o=(0,a.VZ)(e);if(null!=o){for(;(i=r[s-1])&&(n=(0,a._C)(i,o))&&n.top>=0;)s--;if(i){let e=M(i,t);if(e)return;R(o,i)}}})(n,t);break;case"Control+v":(function(e,t){let i,n;let r=F(t),s=r.indexOf(e),o=(0,a.VZ)(e);if(null!=o){for(;(i=r[s+1])&&(n=(0,a._C)(i,o))&&n.bottom>=0;)s++;if(i){let e=M(i,t);if(e)return;R(o,i)}}})(n,t)}switch((0,s.EL)(e.detail.originalEvent)){case"j":case"J":k(n,t);break;case"k":case"K":C(n,t);break;case"o":case"Enter":case`${g}+Enter`:x(n,e.detail[f])}}}else{let n=F(t)[0];if(n){if(i)h&&"Control+n"===(0,s.EL)(e.detail.originalEvent)&&M(n,t),"ArrowDown"===(0,s.EL)(e.detail.originalEvent)&&M(n,t);else{if(h)switch((0,s.EL)(e.detail.originalEvent)){case"Control+n":case"Control+v":M(n,t)}"j"===(0,s.EL)(e.detail.originalEvent)&&M(n,t)}}}if(i){if(h)switch((0,s.EL)(e.detail.originalEvent)){case"Control+n":case"Control+p":e.preventDefault()}switch((0,s.EL)(e.detail.originalEvent)){case"ArrowUp":case"ArrowDown":case"Enter":e.preventDefault()}}else{if(h)switch((0,s.EL)(e.detail.originalEvent)){case"Control+n":case"Control+p":case"Control+v":case"Alt+v":e.preventDefault()}switch((0,s.EL)(e.detail.originalEvent)){case"j":case"k":case"o":case"Enter":case`${f}+Enter`:e.preventDefault()}}}}),(0,r.on)("click",".js-active-navigation-container .js-navigation-item",function(e){w(e)}),(0,r.on)("navigation:keyopen",".js-active-navigation-container .js-navigation-item",function(e){let t=e.currentTarget.classList.contains("js-navigation-open")?e.currentTarget:e.currentTarget.querySelector(".js-navigation-open");if(t instanceof HTMLAnchorElement){if(e.detail.modifierKey)window.open(t.href,"_blank"),window.focus();else{let e=t.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0}));e&&t.click()}e.preventDefault()}else w(e)});let T=[];function L(e){let t=D();t&&T.push(t),y(e)}function A(e){S(e),j(e);let t=T.pop();t&&y(t)}function I(e,t){let i=t||e,n=F(e)[0],r=i.closest(".js-navigation-item")||n;if(y(e),r instanceof HTMLElement){let t=M(r,e);if(t)return;let i=(0,a.VZ)(r);B(i,r)}}function j(e){let t=e.querySelectorAll(".js-navigation-item.navigation-focus");for(let e of t)e.classList.remove("navigation-focus")}function $(e,t){j(e),I(e,t)}function C(e,t){let i=F(t),n=i.indexOf(e),r=i[n-1];if(r){let e=M(r,t);if(e)return;let i=(0,a.VZ)(r);"page"===O(t)?R(i,r):B(i,r)}}function k(e,t){let i=F(t),n=i.indexOf(e),r=i[n+1];if(r){let e=M(r,t);if(e)return;let i=(0,a.VZ)(r);"page"===O(t)?R(i,r):B(i,r)}}function x(e,t=!1){(0,r.f)(e,"navigation:keyopen",{modifierKey:t})}function M(e,t){return!(0,r.f)(e,"navigation:focus")||(j(t),e.classList.add("navigation-focus"),!1)}function D(){return document.querySelector(".js-active-navigation-container")}function F(e){let t=[];for(let i of e.querySelectorAll(".js-navigation-item"))i instanceof HTMLElement&&(0,c.Z)(i)&&t.push(i);return t}function O(e){return e.getAttribute("data-navigation-scroll")||"item"}function R(e,t,i="smooth"){let n=(0,a._C)(t,e);n&&(n.bottom<=0?t.scrollIntoView({behavior:i,block:"start"}):n.top<=0&&t.scrollIntoView({behavior:i,block:"end"}))}function B(e,t){let i=(0,a.oE)(t,e),n=(0,a._C)(t,e);if(null!=i&&null!=n){if(n.bottom<=0&&document.body){let t=null!=e.offsetParent?e.scrollHeight:document.body.scrollHeight,r=t-(i.bottom+n.height);u(e,{top:r})}else n.top<=0&&u(e,{top:i.top})}}},97629:(e,t,i)=>{i.d(t,{Z:()=>n});function n(e){return!(e.offsetWidth<=0&&e.offsetHeight<=0)}},58700:(e,t,i)=>{i.d(t,{Bt:()=>a,DN:()=>o,KL:()=>c,Se:()=>s,qC:()=>h,sw:()=>l});var n=i(5582);function r(e,t,i){return e.dispatchEvent(new CustomEvent(t,{bubbles:!0,cancelable:i}))}function a(e,t){t&&(function(e,t){if(!(e instanceof HTMLFormElement))throw TypeError("The specified element is not of type HTMLFormElement.");if(!(t instanceof HTMLElement))throw TypeError("The specified element is not of type HTMLElement.");if("submit"!==t.type)throw TypeError("The specified element is not a submit button.");if(!e||e!==t.form)throw Error("The specified element is not owned by the form element.")}(e,t),(0,n.j)(t)),r(e,"submit",!0)&&e.submit()}function s(e,t){if("boolean"==typeof t){if(e instanceof HTMLInputElement)e.checked=t;else throw TypeError("only checkboxes can be set to boolean value")}else{if("checkbox"===e.type)throw TypeError("checkbox can't be set to string value");e.value=t}r(e,"change",!1)}function o(e,t){for(let i in t){let n=t[i],r=e.elements.namedItem(i);r instanceof HTMLInputElement?r.value=n:r instanceof HTMLTextAreaElement&&(r.value=n)}}function l(e){if(!(e instanceof HTMLElement))return!1;let t=e.nodeName.toLowerCase(),i=(e.getAttribute("type")||"").toLowerCase();return"select"===t||"textarea"===t||"input"===t&&"submit"!==i&&"reset"!==i||e.isContentEditable}function u(e){return new URLSearchParams(e)}function c(e,t){let i=new URLSearchParams(e.search),n=u(t);for(let[e,t]of n)i.append(e,t);return i.toString()}function h(e){return u(new FormData(e)).toString()}},5582:(e,t,i)=>{function n(e){let t=e.closest("form");if(!(t instanceof HTMLFormElement))return;let i=r(t);if(e.name){let n=e.matches("input[type=submit]")?"Submit":"",r=e.value||n;i||((i=document.createElement("input")).type="hidden",i.classList.add("js-submit-button-value"),t.prepend(i)),i.name=e.name,i.value=r}else i&&i.remove()}function r(e){let t=e.querySelector("input.js-submit-button-value");return t instanceof HTMLInputElement?t:null}i.d(t,{j:()=>n,u:()=>r})},67044:(e,t,i)=>{i.d(t,{D_:()=>n.D_,EL:()=>n.EL,N9:()=>n.N9,Tz:()=>n.Tz,k0:()=>n.k0});var n=i(11793)},76134:(e,t,i)=>{i.d(t,{Ty:()=>a,YE:()=>s,Zf:()=>l});var n=i(46426),r=i(67044);let a=()=>{let e=document.querySelector("meta[name=keyboard-shortcuts-preference]");return!e||"all"===e.content},s=e=>/Enter|Arrow|Escape|Meta|Control|Esc/.test(e)||e.includes("Alt")&&e.includes("Shift"),o=new Set(["button","checkbox","color","file","hidden","image","radio","range","reset","submit"]),l=e=>{let t=(0,r.EL)(e),i=function(e){if(!(e instanceof HTMLElement))return!1;let t=e.nodeName.toLowerCase(),i=e.getAttribute("type")?.toLowerCase()??"text",n="true"===e.ariaReadOnly||"true"===e.getAttribute("aria-readonly")||null!==e.getAttribute("readonly");return("select"===t||"textarea"===t||"input"===t&&!o.has(i)||e.isContentEditable)&&!n}(e.target)&&(0,n.c)("no_character_key_shortcuts_in_inputs"),l=a()&&!i;return s(t)||l}},56959:(e,t,i)=>{i.d(t,{RB:()=>n,qC:()=>r,w0:()=>Subscription});let Subscription=class Subscription{constructor(e){this.closed=!1,this.unsubscribe=()=>{e(),this.closed=!0}}};function n(e,t,i,n={capture:!1}){return e.addEventListener(t,i,n),new Subscription(()=>{e.removeEventListener(t,i,n)})}function r(...e){return new Subscription(()=>{for(let t of e)t.unsubscribe()})}}}]);
//# sourceMappingURL=app_assets_modules_github_filter-input_ts-36076c3bb09a.js.map