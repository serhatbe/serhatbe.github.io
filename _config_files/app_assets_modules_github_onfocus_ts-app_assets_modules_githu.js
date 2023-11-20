"use strict";(globalThis.webpackChunk=globalThis.webpackChunk||[]).push([["app_assets_modules_github_onfocus_ts-app_assets_modules_github_settings_actions-policy-form_t-86624a"],{254:(e,t,o)=>{o.d(t,{ZG:()=>a,q6:()=>l,w4:()=>c});var i=o(8439);let s=!1,r=new i.Z;function n(e){let t=e.target;if(t instanceof HTMLElement&&t.nodeType!==Node.DOCUMENT_NODE)for(let e of r.matches(t))e.data.call(null,t)}function a(e,t){s||(s=!0,document.addEventListener("focus",n,!0)),r.add(e,t),document.activeElement instanceof HTMLElement&&document.activeElement.matches(e)&&t(document.activeElement)}function c(e,t,o){function i(t){let s=t.currentTarget;s&&(s.removeEventListener(e,o),s.removeEventListener("blur",i))}a(t,function(t){t.addEventListener(e,o),t.addEventListener("blur",i)})}function l(e,t){function o(e){let{currentTarget:i}=e;i&&(i.removeEventListener("input",t),i.removeEventListener("blur",o))}a(e,function(e){e.addEventListener("input",t),e.addEventListener("blur",o)})}},97538:(e,t,o)=>{var i=o(76006);function s(e,t,o,i){var s,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(r<3?s(n):r>3?s(t,o,n):s(t,o))||n);return r>3&&n&&Object.defineProperty(t,o,n),n}let r=class ActionsPolicyFormElement extends HTMLElement{connectedCallback(){this.toggleSpecificOptions()}toggleSpecificOptions(){this.selectRadio.checked?this.specificOptions.hidden=!1:this.specificOptions.hidden=!0}};s([i.fA],r.prototype,"specificOptions",void 0),s([i.fA],r.prototype,"selectRadio",void 0),r=s([i.Ih],r)},67691:(e,t,o)=>{var i,s,r,n=o(76006),a=o(4412);function c(e,t,o,i){var s,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(r<3?s(n):r>3?s(t,o,n):s(t,o))||n);return r>3&&n&&Object.defineProperty(t,o,n),n}let l=class RunnerImageElement extends HTMLElement{async connectedCallback(){await a.x,this.selectRunnerPlatform(),this.customImageUriInput.onkeydown=e=>e.stopPropagation()}selectRunnerPlatform(){let e=this.getSelectedPlatform();this.updateImageTabContent(e),this.customImageUriInput.required="custom"===e;let t=this.getSelectedImageVersion(e);t&&(this.updateSelectedImageHint(t),this.customImageGenerationOptions&&this.updateCustomImageGenerationOptions(t),this.machineSpecsDropdown&&this.machineSpecsDropdown.updateOptionsVisibility(e,t),this.selectedImageSource.value=t.imageSource)}getSelectedPlatform(){let e=this.platforms.find(e=>e.checked);return e?e.value:"linux-x64"}getSelectedImageVersion(e){return 0===this.imageVersions.length?null:this.imageVersions.find(t=>t.imagePlatform===e&&t.checked)??this.imageVersions[0]}updateImageTabContent(e){let t=this.imageContents.map(e=>e.getAttribute("data-image-label"));for(let o=0;o<t.length;o++)this.imageContents[o].hidden=e!==t[o]}updateSelectedImageHint(e){for(let t of this.selectedImageHints)t.renderContent(e)}updateCustomImageGenerationOptions(e){let t=this.isBaseImage(e.imageId);this.customImageGenerationOptions.hidden=!t,t||(this.persistentOsDiskCheckbox.checked=!1)}isBaseImage(e){return"canonical:0001-com-ubuntu-server-focal:20_04-lts"===e||"microsoftwindowsserver:windowsserver:2022-datacenter"===e}updateMaxLimit(){let e=this.machineSpecsDropdown.getSelectedItem(),t=document.querySelector("input[name='maximum_runners']"),o=document.querySelector("span[id='max-gpu-runners-error']"),i=document.querySelector("span[id='max-runners-error']"),s=document.querySelector("span[id='min-runners-error']"),r=document.querySelector("div[id='max-group']"),n=document.querySelector(".js-submit-custom-hosted-runner-button");t&&(o.hidden=!0,i.hidden=!0,s.hidden=!0,n.disabled=!1,r.classList.remove("errored"),"gpu_optimized"===e.runnerType&&"false"===this.bypassMaxGpuRunners.value?(t.max="20",parseInt(t.value)>20&&(o.hidden=!1,n.disabled=!0,r.classList.add("errored"))):(t.max="1000",parseInt(t.value)>1e3&&(i.hidden=!1,n.disabled=!0,r.classList.add("errored"))))}};c([n.GO],l.prototype,"platforms",void 0),c([n.GO],l.prototype,"imageVersions",void 0),c([n.GO],l.prototype,"selectedImageHints",void 0),c([n.fA],l.prototype,"customImageUriInput",void 0),c([n.fA],l.prototype,"machineSpecsDropdown",void 0),c([n.fA],l.prototype,"selectedImageSource",void 0),c([n.fA],l.prototype,"customImageGenerationOptions",void 0),c([n.fA],l.prototype,"persistentOsDiskCheckbox",void 0),c([n.GO],l.prototype,"imageContents",void 0),c([n.fA],l.prototype,"bypassMaxGpuRunners",void 0),l=c([n.Ih],l);let d=class MachineSpecsDropdownElement extends HTMLElement{updateOptionsVisibility(e,t){for(let o of this.items)o.setVisibility(e,t);this.updateTabsVisibility();let o=this.getSelectedItem();if(!o||!o.visible){let e=this.getFirstVisibleItem();e?.selectItem(),o=e}o&&this.selectTabByType(o.runnerType)}getSelectedItem(){return this.items.find(e=>e.checked)}updateTabsVisibility(){let e=0;for(let t of this.tabs){let o=this.items.some(e=>e.runnerType===t.type&&e.visible);e+=o?1:0,t.setVisibility(o)}this.tabsHeader&&(this.tabsHeader.hidden=e<2)}selectTabByType(e){let t=this.tabs.find(t=>t.type===e);t?.selectTab()}getFirstVisibleItem(){return this.items.find(e=>e.visible)}};c([n.GO],d.prototype,"tabs",void 0),c([n.GO],d.prototype,"items",void 0),c([n.fA],d.prototype,"tabsHeader",void 0),d=c([n.Ih],d);let u=class MachineSpecsTabElement extends HTMLElement{selectTab(){this.clickArea.click()}setVisibility(e){this.hidden=!e}};c([n.fA],u.prototype,"clickArea",void 0),c([n.Lj],u.prototype,"type",void 0),u=c([n.Ih],u);let p=((i=class MachineSpecsItemElement extends HTMLElement{get checked(){return this.checkbox.checked}get visible(){return!this.hidden}selectItem(){this.checkbox.click()}setVisibility(e,t){this.hidden=!this.shouldBeVisible(e,t)}shouldBeVisible(e,t){return("win-x64"!==e&&"linux-x64"!==e||"gpu_optimized"!==this.runnerType||"Curated"!==t.imageSource)&&!(this.storageGb<t.sizeGb)}constructor(...e){super(...e),this.storageGb=0}}).attrPrefix="",i);c([n.fA],p.prototype,"checkbox",void 0),c([n.Lj],p.prototype,"storageGb",void 0),c([n.Lj],p.prototype,"runnerType",void 0),p=c([n.Ih],p);let m=((s=class RunnerImageVersionElement extends HTMLElement{get checked(){return this.checkbox.checked}constructor(...e){super(...e),this.sizeGb=0}}).attrPrefix="",s);c([n.fA],m.prototype,"checkbox",void 0),c([n.Lj],m.prototype,"sizeGb",void 0),c([n.Lj],m.prototype,"imagePlatform",void 0),c([n.Lj],m.prototype,"imageSource",void 0),c([n.Lj],m.prototype,"imageId",void 0),m=c([n.Ih],m);let h=class RunnerSelectedImageHint extends HTMLElement{renderContent(e){this.innerHTML=this.getContent(e)}getContent(e){let t="";if("Curated"===e.imageSource){let o=this.getCuratedImageInfoUrl(e);t+=`
        <p class='text-small color-fg-muted'>
          GitHub images are kept up to date and secure, containing all the tools you need to get started building and testing your applications. <a class="Link--inTextBlock" href='${o}'>Learn more about images.</a>
        </p>
      `,("ubuntu-latest"===e.imageId||"windows-latest"===e.imageId)&&(t+=`
          <p class="text-small color-fg-muted">
            "Latest" tag matches with standard GitHub-hosted runners latest tag for the images. <a class="Link--inTextBlock" href='https://github.com/actions/runner-images#label-scheme'>Learn more about latest tags. </a>
          </p>
        `)}else"Marketplace"===e.imageSource&&(t+=`
        <p class="text-small color-fg-muted">
          Partner images are created and managed by members of GitHub's Technology Partner Program. <a class="Link--inTextBlock" href="https://github.com/actions/partner-runner-images">Learn more about partner images.</a>
        </p>
      `);return t}getCuratedImageInfoUrl(e){return"codespaces-prebuild"===e.imageId?"https://github.com/github/codespaces":"https://github.com/actions/runner-images/releases"}};h=c([n.Ih],h);var g=o(15345);function f(e,t,o,i){var s,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(r<3?s(n):r>3?s(t,o,n):s(t,o))||n);return r>3&&n&&Object.defineProperty(t,o,n),n}let b=document.querySelector("input[name='maximum_runners']"),y=class RunnerScalingElement extends HTMLElement{disableSubmitButton(){let e=document.querySelector(".js-submit-custom-hosted-runner-button");e.disabled=!0}enableSubmitButton(){let e=document.querySelector(".js-submit-custom-hosted-runner-button");e.disabled=!1}validateMax(){if(this.resetMaxState(),!this.maxInput.value)return;let e=+this.maxInput.value,t=parseInt(b.max),o=parseInt(b.min);if(e<o){this.maxGroup.classList.add("errored"),this.maxTooLowErrorMessage.hidden=!1,(0,g.N)(this.maxNote),this.disableSubmitButton();return}if(e>t){this.maxGroup.classList.add("errored"),20===t?(this.maxGpuTooHighErrorMessage.hidden=!1,this.maxTooHighErrorMessage.hidden=!0):(this.maxGpuTooHighErrorMessage.hidden=!0,this.maxTooHighErrorMessage.hidden=!1),(0,g.N)(this.maxNote),this.disableSubmitButton();return}}resetMaxState(){this.maxTooHighErrorMessage.hidden=!0,this.maxTooLowErrorMessage.hidden=!0,this.maxGpuTooHighErrorMessage.hidden=!0,this.maxGroup.classList.remove("errored"),this.enableSubmitButton()}};function v(e,t,o,i){var s,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(r<3?s(n):r>3?s(t,o,n):s(t,o))||n);return r>3&&n&&Object.defineProperty(t,o,n),n}f([n.fA],y.prototype,"maxInput",void 0),f([n.fA],y.prototype,"maxGroup",void 0),f([n.fA],y.prototype,"maxTooLowErrorMessage",void 0),f([n.fA],y.prototype,"maxTooHighErrorMessage",void 0),f([n.fA],y.prototype,"maxGpuTooHighErrorMessage",void 0),f([n.fA],y.prototype,"maxNote",void 0),y=f([n.Ih],y);let x=((r=class PublicIpElement extends HTMLElement{connectedCallback(){this.isAllowed=this.hasAttribute("is-allowed")}checkboxChanged(){let e=this.checkbox.checked,t=this.isAllowed;t||e||(this.checkbox.setAttribute("disabled","disabled"),this.description.classList.remove("color-fg-muted"),this.labelSection.classList.add("color-fg-subtle"))}constructor(...e){super(...e),this.isAllowed=!1}}).attrPrefix="",r);v([n.fA],x.prototype,"checkbox",void 0),v([n.fA],x.prototype,"description",void 0),v([n.fA],x.prototype,"labelSection",void 0),v([n.Lj],x.prototype,"isAllowed",void 0),x=v([n.Ih],x)},84700:(e,t,o)=>{var i=o(76006),s=o(58700);function r(e,t,o,i){var s,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(r<3?s(n):r>3?s(t,o,n):s(t,o))||n);return r>3&&n&&Object.defineProperty(t,o,n),n}let n=class AdvancedSecurityNewReposElement extends HTMLElement{toggle(e){this.checkbox.checked?(this.status.hidden=!0,this.dialog.show(),e.stopPropagation()):(this.status.hidden=!1,(0,s.Bt)(this.form))}confirm(){this.status.hidden=!1,(0,s.Bt)(this.form),this.dialog.open=!1}close(){this.checkbox.checked=!1}};r([i.fA],n.prototype,"checkbox",void 0),r([i.fA],n.prototype,"status",void 0),r([i.fA],n.prototype,"dialog",void 0),r([i.fA],n.prototype,"form",void 0),n=r([i.Ih],n)},95253:(e,t,o)=>{let i;o.d(t,{YT:()=>p,qP:()=>m,yM:()=>h});var s=o(88149),r=o(86058),n=o(44544),a=o(71643);let{getItem:c}=(0,n.Z)("localStorage"),l="dimension_",d=["utm_source","utm_medium","utm_campaign","utm_term","utm_content","scid"];try{let e=(0,s.n)("octolytics");delete e.baseContext,i=new r.R(e)}catch(e){}function u(e){let t=(0,s.n)("octolytics").baseContext||{};if(t)for(let[e,o]of(delete t.app_id,delete t.event_url,delete t.host,Object.entries(t)))e.startsWith(l)&&(t[e.replace(l,"")]=o,delete t[e]);let o=document.querySelector("meta[name=visitor-payload]");if(o){let e=JSON.parse(atob(o.content));Object.assign(t,e)}let i=new URLSearchParams(window.location.search);for(let[e,o]of i)d.includes(e.toLowerCase())&&(t[e]=o);return t.staff=(0,a.B)().toString(),Object.assign(t,e)}function p(e){i?.sendPageView(u(e))}function m(e,t={}){let o=document.head?.querySelector('meta[name="current-catalog-service"]')?.content,s=o?{service:o}:{};for(let[e,o]of Object.entries(t))null!=o&&(s[e]=`${o}`);if(i){let t=e||"unknown";u(s),i.sendEvent(t,u(s))}}function h(e){return Object.fromEntries(Object.entries(e).map(([e,t])=>[e,JSON.stringify(t)]))}}}]);
//# sourceMappingURL=app_assets_modules_github_onfocus_ts-app_assets_modules_github_settings_actions-policy-form_t-86624a-2975697aafd0.js.map