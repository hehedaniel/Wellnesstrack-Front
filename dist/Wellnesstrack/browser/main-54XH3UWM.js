import{a as Ut,b as zt}from"./chunk-6FDXM5TI.js";import{a as Ct}from"./chunk-IWA2BJ2K.js";import{a as Bt}from"./chunk-DQEOFA7G.js";import{a as Wt}from"./chunk-C5YLPQLY.js";import{a as $t}from"./chunk-FF7AL3BQ.js";import{a as ut,b as dt,c as ht,d as pt,e as gt,f as ft,g as _t,h as bt,i as vt,j as yt,k as Mt,m as jt}from"./chunk-ESKRAM2H.js";import{k as mt,m as Re}from"./chunk-N5MVP6Y3.js";import{$ as L,Ca as Z,Fa as Ot,Ga as Lt,Ia as Nt,N as wt,R as Et,S as Rt,U as Se,X as xt,b as et,c as tt,d as it,e as nt,fa as Tt,g as ot,ga as St,h as at,j as rt,k as st,l as lt,m as ct,p as It,v as kt,wa as Dt,x as At,ya as Ft,z as Pt}from"./chunk-AKJOV2U2.js";import{A as O,B as Te,D as ve,d as F,p as _e,x as xe,y as be}from"./chunk-WB557K7N.js";import{$b as Ke,Ab as Q,Bb as g,D as ne,Da as Pe,Db as he,E as H,Fa as S,Fb as pe,Ga as de,Ha as Ue,Hb as w,Hc as G,K as oe,Lb as c,M as ke,Ma as ze,Mb as l,Mc as K,Nb as _,Rb as Ge,Ub as ge,W as ae,Wb as f,X as Ae,Xb as X,Yb as E,Z as re,Zb as fe,_b as D,a as te,aa as je,ac as R,bc as x,cc as Ze,da as Be,db as d,dc as h,ea as se,eb as m,ec as qe,f as ie,fb as He,ga as A,gb as we,hb as Ve,i as Ce,ja as b,jb as Ye,ka as le,kc as Je,lb as Qe,lc as y,mb as P,mc as M,na as p,oa as v,ob as Xe,p as Ie,pa as ce,qa as me,sa as ue,sb as Ee,wb as I,xa as V,ya as Y,za as $e}from"./chunk-CPJRB4V3.js";import{a as ee,b as We,g as T,h as U,i as z}from"./chunk-73B72BQ3.js";var Ht=[{path:"home",loadComponent:()=>import("./chunk-WQBLOJSX.js").then(o=>o.HomeComponent)},{path:"comidas",loadComponent:()=>import("./chunk-NAJ6GLW6.js").then(o=>o.ComidasHomeComponent)},{path:"ejercicios",loadComponent:()=>import("./chunk-M6JI6PR2.js").then(o=>o.EjerciciosHomeComponent)},{path:"peso",loadComponent:()=>import("./chunk-CEO5GEZO.js").then(o=>o.PesosHomeComponent)},{path:"login",loadComponent:()=>import("./chunk-K6Y3OZ4J.js").then(o=>o.FormularioTabsComponent)},{path:"perfil",loadComponent:()=>import("./chunk-VFFNXFIB.js").then(o=>o.UsuarioPerfilComponent)},{path:"administrar-propuestas",loadComponent:()=>import("./chunk-TFDCUK5U.js").then(o=>o.AdministrarEjerciciosPropuestosComponent)},{path:"registro",redirectTo:"login",pathMatch:"full"},{path:"",redirectTo:"home",pathMatch:"full"},{path:"**",loadComponent:()=>import("./chunk-KCABNVKP.js").then(o=>o.PaginaErrorComponent)}];var Vt="auth",q=class{constructor(i){return i}},De=class{constructor(){return ht(Vt)}};var Fe=new A("angularfire2.auth-instances");function rn(o,i){let a=dt(Vt,o,i);return a&&new q(a)}function sn(o){return(i,a)=>{let e=i.runOutsideAngular(()=>o(a));return new q(e)}}var ln={provide:De,deps:[[new le,Fe]]},cn={provide:q,useFactory:rn,deps:[[new le,Fe],_t]};function Yt(o,...i){return mt("angularfire",ut.full,"auth"),ue([cn,ln,{provide:Fe,useFactory:sn(o),multi:!0,deps:[P,Pe,gt,bt,[new le,pt],...i]}])}var Qt=ft(Re,!0);var mn="@",un=(()=>{let i=class i{constructor(e,t,n,s,r){this.doc=e,this.delegate=t,this.zone=n,this.animationType=s,this.moduleImpl=r,this._rendererFactoryPromise=null,this.scheduler=b(Ve,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-ZKUBJ7TV.js")).catch(t=>{throw new je(5300,!1)}).then(({\u0275createEngine:t,\u0275AnimationRendererFactory:n})=>{this._engine=t(this.animationType,this.doc,this.scheduler);let s=new n(this.delegate,this._engine,this.zone);return this.delegate=s,s})}createRenderer(e,t){let n=this.delegate.createRenderer(e,t);if(n.\u0275type===0)return n;typeof n.throwOnSyntheticProps=="boolean"&&(n.throwOnSyntheticProps=!1);let s=new Oe(n);return t?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(r=>{let u=r.createRenderer(e,t);s.use(u)}).catch(r=>{s.use(n)}),s}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};i.\u0275fac=function(t){He()},i.\u0275prov=Be({token:i,factory:i.\u0275fac});let o=i;return o})(),Oe=class{constructor(i){this.delegate=i,this.replay=[],this.\u0275type=1}use(i){if(this.delegate=i,this.replay!==null){for(let a of this.replay)a(i);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(i,a){return this.delegate.createElement(i,a)}createComment(i){return this.delegate.createComment(i)}createText(i){return this.delegate.createText(i)}get destroyNode(){return this.delegate.destroyNode}appendChild(i,a){this.delegate.appendChild(i,a)}insertBefore(i,a,e,t){this.delegate.insertBefore(i,a,e,t)}removeChild(i,a,e){this.delegate.removeChild(i,a,e)}selectRootElement(i,a){return this.delegate.selectRootElement(i,a)}parentNode(i){return this.delegate.parentNode(i)}nextSibling(i){return this.delegate.nextSibling(i)}setAttribute(i,a,e,t){this.delegate.setAttribute(i,a,e,t)}removeAttribute(i,a,e){this.delegate.removeAttribute(i,a,e)}addClass(i,a){this.delegate.addClass(i,a)}removeClass(i,a){this.delegate.removeClass(i,a)}setStyle(i,a,e,t){this.delegate.setStyle(i,a,e,t)}removeStyle(i,a,e){this.delegate.removeStyle(i,a,e)}setProperty(i,a,e){this.shouldReplay(a)&&this.replay.push(t=>t.setProperty(i,a,e)),this.delegate.setProperty(i,a,e)}setValue(i,a){this.delegate.setValue(i,a)}listen(i,a,e){return this.shouldReplay(a)&&this.replay.push(t=>t.listen(i,a,e)),this.delegate.listen(i,a,e)}shouldReplay(i){return this.replay!==null&&i.startsWith(mn)}};function Xt(o="animations"){return Qe("NgAsyncAnimations"),ue([{provide:Ye,useFactory:(i,a,e)=>new un(i,a,e,o),deps:[F,it,P]},{provide:ze,useValue:o==="noop"?"NoopAnimations":"BrowserAnimations"}])}var Gt={providers:[lt(Ht),et(tt()),vt(()=>yt({projectId:"trackit-health",appId:"1:977533599383:web:9b9515a0b6a5653924b3d2",storageBucket:"trackit-health.appspot.com",apiKey:"AIzaSyDRv7bI6YAUlVFD6iMgwgIf8jIQSPKeAaw",authDomain:"trackit-health.firebaseapp.com",messagingSenderId:"977533599383"})),Yt(()=>Qt()),Xt(),{provide:Mt,useValue:{projectId:"trackit-health",appId:"1:977533599383:web:9b9515a0b6a5653924b3d2",storageBucket:"trackit-health.appspot.com",apiKey:"AIzaSyDRv7bI6YAUlVFD6iMgwgIf8jIQSPKeAaw",authDomain:"trackit-health.firebaseapp.com",messagingSenderId:"977533599383"}},ot()]};var dn=["*",[["mat-toolbar-row"]]],hn=["*","mat-toolbar-row"],pn=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275dir=me({type:i,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"],standalone:!0});let o=i;return o})(),Kt=(()=>{let i=class i{constructor(e,t,n){this._elementRef=e,this._platform=t,this._document=n}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}};i.\u0275fac=function(t){return new(t||i)(m(S),m(kt),m(F))},i.\u0275cmp=v({type:i,selectors:[["mat-toolbar"]],contentQueries:function(t,n,s){if(t&1&&D(s,pn,5),t&2){let r;R(r=x())&&(n._toolbarRows=r)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(t,n){t&2&&(pe(n.color?"mat-"+n.color:""),he("mat-toolbar-multiple-rows",n._toolbarRows.length>0)("mat-toolbar-single-row",n._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],standalone:!0,features:[y],ngContentSelectors:hn,decls:2,vars:0,template:function(t,n){t&1&&(X(dn),E(0),E(1,1))},styles:[".mat-toolbar{background:var(--mat-toolbar-container-background-color);color:var(--mat-toolbar-container-text-color)}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font);font-size:var(--mat-toolbar-title-text-size);line-height:var(--mat-toolbar-title-text-line-height);font-weight:var(--mat-toolbar-title-text-weight);letter-spacing:var(--mat-toolbar-title-text-tracking);margin:0}.cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color:var(--mat-toolbar-container-text-color);--mdc-outlined-button-label-text-color:var(--mat-toolbar-container-text-color)}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height)}}"],encapsulation:2,changeDetection:0});let o=i;return o})();var Zt=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=ce({type:i}),i.\u0275inj=se({imports:[L,L]});let o=i;return o})();var Mn=["mat-menu-item",""],Cn=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],In=["mat-icon, [matMenuItemIcon]","*"];function kn(o,i){o&1&&($e(),c(0,"svg",2),_(1,"polygon",3),l())}var An=["*"];function Pn(o,i){if(o&1){let a=Ge();c(0,"div",0),ge("keydown",function(t){V(a);let n=f();return Y(n._handleKeydown(t))})("click",function(){V(a);let t=f();return Y(t.closed.emit("click"))})("@transformMenu.start",function(t){V(a);let n=f();return Y(n._onAnimationStart(t))})("@transformMenu.done",function(t){V(a);let n=f();return Y(n._onAnimationDone(t))}),c(1,"div",1),E(2),l()()}if(o&2){let a=f();pe(a._classList),g("id",a.panelId)("@transformMenu",a._panelAnimationState),Q("aria-label",a.ariaLabel||null)("aria-labelledby",a.ariaLabelledby||null)("aria-describedby",a.ariaDescribedby||null)}}var Le=new A("MAT_MENU_PANEL"),J=(()=>{let i=class i{constructor(e,t,n,s,r){this._elementRef=e,this._document=t,this._focusMonitor=n,this._parentMenu=s,this._changeDetectorRef=r,this.role="menuitem",this.disabled=!1,this.disableRipple=!1,this._hovered=new ie,this._focused=new ie,this._highlighted=!1,this._triggersSubmenu=!1,s?.addItem?.(this)}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),t=e.querySelectorAll("mat-icon, .material-icons");for(let n=0;n<t.length;n++)t[n].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef?.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef?.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}};i.\u0275fac=function(t){return new(t||i)(m(S),m(F),m(Se),m(Le,8),m(G))},i.\u0275cmp=v({type:i,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-mdc-focus-indicator"],hostVars:8,hostBindings:function(t,n){t&1&&ge("click",function(r){return n._checkDisabled(r)})("mouseenter",function(){return n._handleMouseEnter()}),t&2&&(Q("role",n.role)("tabindex",n._getTabIndex())("aria-disabled",n.disabled)("disabled",n.disabled||null),he("mat-mdc-menu-item-highlighted",n._highlighted)("mat-mdc-menu-item-submenu-trigger",n._triggersSubmenu))},inputs:{role:"role",disabled:[p.HasDecoratorInputTransform,"disabled","disabled",K],disableRipple:[p.HasDecoratorInputTransform,"disableRipple","disableRipple",K]},exportAs:["matMenuItem"],standalone:!0,features:[Ee,y],attrs:Mn,ngContentSelectors:In,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(t,n){t&1&&(X(Cn),E(0),c(1,"span",0),E(2,1),l(),_(3,"div",1),I(4,kn,2,0,":svg:svg",2)),t&2&&(d(3),g("matRippleDisabled",n.disableRipple||n.disabled)("matRippleTrigger",n._getHostElement()),d(),w(4,n._triggersSubmenu?4:-1))},dependencies:[Tt],encapsulation:2,changeDetection:0});let o=i;return o})();var wn=new A("MatMenuContent");var Me={transformMenu:xe("transformMenu",[Te("void",O({opacity:0,transform:"scale(0.8)"})),ve("void => enter",be("120ms cubic-bezier(0, 0, 0.2, 1)",O({opacity:1,transform:"scale(1)"}))),ve("* => void",be("100ms 25ms linear",O({opacity:0})))]),fadeInItems:xe("fadeInItems",[Te("showing",O({opacity:1})),ve("void => *",[O({opacity:0}),be("400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)")])])},Ea=Me.fadeInItems,Ra=Me.transformMenu,En=0,Rn=new A("mat-menu-default-options",{providedIn:"root",factory:xn});function xn(){return{overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"}}var N=(()=>{let i=class i{get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}set panelClass(e){let t=this._previousPanelClass,n=ee({},this._classList);t&&t.length&&t.split(" ").forEach(s=>{n[s]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(s=>{n[s]=!0}),this._elementRef.nativeElement.className=""),this._classList=n}get classList(){return this.panelClass}set classList(e){this.panelClass=e}constructor(e,t,n,s){this._elementRef=e,this._ngZone=t,this._changeDetectorRef=s,this._elevationPrefix="mat-elevation-z",this._baseElevation=8,this._directDescendantItems=new Ue,this._classList={},this._panelAnimationState="void",this._animationDone=new ie,this.closed=new de,this.close=this.closed,this.panelId=`mat-menu-panel-${En++}`,this.overlayPanelClass=n.overlayPanelClass||"",this._xPosition=n.xPosition,this._yPosition=n.yPosition,this.backdropClass=n.backdropClass,this.overlapTrigger=n.overlapTrigger,this.hasBackdrop=n.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new wt(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(ae(this._directDescendantItems),Ae(e=>ne(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState==="enter"&&t.activeItem?._hasFocus()){let n=e.toArray(),s=Math.max(0,Math.min(n.length-1,t.activeItemIndex||0));n[s]&&!n[s].disabled?t.setActiveItem(s):t.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusSubscription?.unsubscribe()}_hovered(){return this._directDescendantItems.changes.pipe(ae(this._directDescendantItems),Ae(t=>ne(...t.map(n=>n._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,n=this._keyManager;switch(t){case 27:Pt(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(t===38||t===40)&&n.setFocusOrigin("keyboard"),n.onKeydown(e);return}e.stopPropagation()}focusFirstItem(e="program"){this._firstItemFocusSubscription?.unsubscribe(),this._firstItemFocusSubscription=this._ngZone.onStable.pipe(oe(1)).subscribe(()=>{let t=null;if(this._directDescendantItems.length&&(t=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),!t||!t.contains(document.activeElement)){let n=this._keyManager;n.setFocusOrigin(e).setFirstItemActive(),!n.activeItem&&t&&t.focus()}})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){let t=Math.min(this._baseElevation+e,24),n=`${this._elevationPrefix}${t}`,s=Object.keys(this._classList).find(r=>r.startsWith(this._elevationPrefix));if(!s||s===this._previousElevation){let r=ee({},this._classList);this._previousElevation&&(r[this._previousElevation]=!1),r[n]=!0,this._previousElevation=n,this._classList=r}}setPositionClasses(e=this.xPosition,t=this.yPosition){this._classList=We(ee({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":t==="above","mat-menu-below":t==="below"}),this._changeDetectorRef?.markForCheck()}_startAnimation(){this._panelAnimationState="enter"}_resetAnimation(){this._panelAnimationState="void"}_onAnimationDone(e){this._animationDone.next(e),this._isAnimating=!1}_onAnimationStart(e){this._isAnimating=!0,e.toState==="enter"&&this._keyManager.activeItemIndex===0&&(e.element.scrollTop=0)}_updateDirectDescendants(){this._allItems.changes.pipe(ae(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}};i.\u0275fac=function(t){return new(t||i)(m(S),m(P),m(Rn),m(G))},i.\u0275cmp=v({type:i,selectors:[["mat-menu"]],contentQueries:function(t,n,s){if(t&1&&(D(s,wn,5),D(s,J,5),D(s,J,4)),t&2){let r;R(r=x())&&(n.lazyContent=r.first),R(r=x())&&(n._allItems=r),R(r=x())&&(n.items=r)}},viewQuery:function(t,n){if(t&1&&Ke(we,5),t&2){let s;R(s=x())&&(n.templateRef=s.first)}},hostVars:3,hostBindings:function(t,n){t&2&&Q("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[p.None,"aria-label","ariaLabel"],ariaLabelledby:[p.None,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[p.None,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[p.HasDecoratorInputTransform,"overlapTrigger","overlapTrigger",K],hasBackdrop:[p.HasDecoratorInputTransform,"hasBackdrop","hasBackdrop",e=>e==null?null:K(e)],panelClass:[p.None,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],standalone:!0,features:[Je([{provide:Le,useExisting:i}]),Ee,y],ngContentSelectors:An,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel","mat-mdc-elevation-specific",3,"keydown","click","id"],[1,"mat-mdc-menu-content"]],template:function(t,n){t&1&&(X(),I(0,Pn,3,7,"ng-template"))},styles:['mat-menu{display:none}.mat-mdc-menu-content{margin:0;padding:8px 0;list-style-type:none}.mat-mdc-menu-content:focus{outline:none}.mat-mdc-menu-content,.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;flex:1;white-space:normal;font-family:var(--mat-menu-item-label-text-font);line-height:var(--mat-menu-item-label-text-line-height);font-size:var(--mat-menu-item-label-text-size);letter-spacing:var(--mat-menu-item-label-text-tracking);font-weight:var(--mat-menu-item-label-text-weight)}.mat-mdc-menu-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;box-sizing:border-box;outline:0;border-radius:var(--mat-menu-container-shape);background-color:var(--mat-menu-container-color);will-change:transform,opacity}.mat-mdc-menu-panel.ng-animating{pointer-events:none}.cdk-high-contrast-active .mat-mdc-menu-panel{outline:solid 1px}.mat-divider{color:var(--mat-menu-divider-color);margin-bottom:var(--mat-menu-divider-bottom-spacing);margin-top:var(--mat-menu-divider-top-spacing)}.mat-mdc-menu-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:var(--mat-menu-item-leading-spacing);padding-right:var(--mat-menu-item-trailing-spacing);-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer;width:100%;text-align:left;box-sizing:border-box;color:inherit;font-size:inherit;background:none;text-decoration:none;margin:0;align-items:center;min-height:48px}.mat-mdc-menu-item:focus{outline:none}[dir=rtl] .mat-mdc-menu-item,.mat-mdc-menu-item[dir=rtl]{padding-left:var(--mat-menu-item-trailing-spacing);padding-right:var(--mat-menu-item-leading-spacing)}.mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon]){padding-left:var(--mat-menu-item-with-icon-leading-spacing);padding-right:var(--mat-menu-item-with-icon-trailing-spacing)}[dir=rtl] .mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon]),.mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon])[dir=rtl]{padding-left:var(--mat-menu-item-with-icon-trailing-spacing);padding-right:var(--mat-menu-item-with-icon-leading-spacing)}.mat-mdc-menu-item::-moz-focus-inner{border:0}.mat-mdc-menu-item,.mat-mdc-menu-item:visited,.mat-mdc-menu-item:link{color:var(--mat-menu-item-label-text-color)}.mat-mdc-menu-item .mat-icon-no-color,.mat-mdc-menu-item .mat-mdc-menu-submenu-icon{color:var(--mat-menu-item-icon-color)}.mat-mdc-menu-item[disabled]{cursor:default;opacity:.38}.mat-mdc-menu-item[disabled]::after{display:block;position:absolute;content:"";top:0;left:0;bottom:0;right:0}.mat-mdc-menu-item .mat-icon{flex-shrink:0;margin-right:var(--mat-menu-item-spacing);height:var(--mat-menu-item-icon-size);width:var(--mat-menu-item-icon-size)}[dir=rtl] .mat-mdc-menu-item{text-align:right}[dir=rtl] .mat-mdc-menu-item .mat-icon{margin-right:0;margin-left:var(--mat-menu-item-spacing)}.mat-mdc-menu-item:not([disabled]):hover{background-color:var(--mat-menu-item-hover-state-layer-color)}.mat-mdc-menu-item:not([disabled]).cdk-program-focused,.mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused,.mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted{background-color:var(--mat-menu-item-focus-state-layer-color)}.cdk-high-contrast-active .mat-mdc-menu-item{margin-top:1px}.mat-mdc-menu-submenu-icon{width:var(--mat-menu-item-icon-size);height:10px;fill:currentColor;padding-left:var(--mat-menu-item-spacing)}[dir=rtl] .mat-mdc-menu-submenu-icon{padding-right:var(--mat-menu-item-spacing);padding-left:0}[dir=rtl] .mat-mdc-menu-submenu-icon polygon{transform:scaleX(-1)}.cdk-high-contrast-active .mat-mdc-menu-submenu-icon{fill:CanvasText}.mat-mdc-menu-item .mat-mdc-menu-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}'],encapsulation:2,data:{animation:[Me.transformMenu,Me.fadeInItems]},changeDetection:0});let o=i;return o})(),ti=new A("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let o=b(Z);return()=>o.scrollStrategies.reposition()}});function Tn(o){return()=>o.scrollStrategies.reposition()}var Sn={provide:ti,deps:[Z],useFactory:Tn},qt=At({passive:!0});var ii=(()=>{let i=class i{get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){e!==this._menu&&(this._menu=e,this._menuCloseSubscription.unsubscribe(),e&&(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t==="click"||t==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t)})),this._menuItemInstance?._setTriggersSubmenu(this.triggersSubmenu()))}constructor(e,t,n,s,r,u,C,W,j){this._overlay=e,this._element=t,this._viewContainerRef=n,this._menuItemInstance=u,this._dir=C,this._focusMonitor=W,this._ngZone=j,this._overlayRef=null,this._menuOpen=!1,this._closingActionsSubscription=te.EMPTY,this._hoverSubscription=te.EMPTY,this._menuCloseSubscription=te.EMPTY,this._changeDetectorRef=b(G),this._handleTouchStart=B=>{Rt(B)||(this._openedBy="touch")},this._openedBy=void 0,this.restoreFocus=!0,this.menuOpened=new de,this.onMenuOpen=this.menuOpened,this.menuClosed=new de,this.onMenuClose=this.menuClosed,this._scrollStrategy=s,this._parentMaterialMenu=r instanceof N?r:void 0,t.nativeElement.addEventListener("touchstart",this._handleTouchStart,qt)}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null),this._element.nativeElement.removeEventListener("touchstart",this._handleTouchStart,qt),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._hoverSubscription.unsubscribe()}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this.menu)}toggleMenu(){return this._menuOpen?this.closeMenu():this.openMenu()}openMenu(){let e=this.menu;if(this._menuOpen||!e)return;let t=this._createOverlay(e),n=t.getConfig(),s=n.positionStrategy;this._setPosition(e,s),n.hasBackdrop=e.hasBackdrop==null?!this.triggersSubmenu():e.hasBackdrop,t.attach(this._getPortal(e)),e.lazyContent&&e.lazyContent.attach(this.menuData),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this.closeMenu()),this._initMenu(e),e instanceof N&&(e._startAnimation(),e._directDescendantItems.changes.pipe(re(e.close)).subscribe(()=>{s.withLockedPosition(!1).reapplyLastPosition(),s.withLockedPosition(!0)}))}closeMenu(){this.menu?.close.emit()}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t)}updatePosition(){this._overlayRef?.updatePosition()}_destroyMenu(e){if(!this._overlayRef||!this.menuOpen)return;let t=this.menu;this._closingActionsSubscription.unsubscribe(),this._overlayRef.detach(),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this.triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,t instanceof N?(t._resetAnimation(),t.lazyContent?t._animationDone.pipe(H(n=>n.toState==="void"),oe(1),re(t.lazyContent._attached)).subscribe({next:()=>t.lazyContent.detach(),complete:()=>this._setIsMenuOpen(!1)}):this._setIsMenuOpen(!1)):(this._setIsMenuOpen(!1),t?.lazyContent?.detach())}_initMenu(e){e.parentMenu=this.triggersSubmenu()?this._parentMaterialMenu:void 0,e.direction=this.dir,this._setMenuElevation(e),e.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0)}_setMenuElevation(e){if(e.setElevation){let t=0,n=e.parentMenu;for(;n;)t++,n=n.parentMenu;e.setElevation(t)}}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this.triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=this._overlay.create(t),this._overlayRef.keydownEvents().subscribe()}return this._overlayRef}_getOverlayConfig(e){return new Ft({positionStrategy:this._overlay.position().flexibleConnectedTo(this._element).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(n=>{let s=n.connectionPair.overlayX==="start"?"after":"before",r=n.connectionPair.overlayY==="top"?"below":"above";this._ngZone?this._ngZone.run(()=>e.setPositionClasses(s,r)):e.setPositionClasses(s,r)})}_setPosition(e,t){let[n,s]=e.xPosition==="before"?["end","start"]:["start","end"],[r,u]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[C,W]=[r,u],[j,B]=[n,s],$=0;if(this.triggersSubmenu()){if(B=n=e.xPosition==="before"?"start":"end",s=j=n==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let Ne=this._parentMaterialMenu.items.first;this._parentInnerPadding=Ne?Ne._getHostElement().offsetTop:0}$=r==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(C=r==="top"?"bottom":"top",W=u==="top"?"bottom":"top");t.withPositions([{originX:n,originY:C,overlayX:j,overlayY:r,offsetY:$},{originX:s,originY:C,overlayX:B,overlayY:r,offsetY:$},{originX:n,originY:W,overlayX:j,overlayY:u,offsetY:-$},{originX:s,originY:W,overlayX:B,overlayY:u,offsetY:-$}])}_menuClosingActions(){let e=this._overlayRef.backdropClick(),t=this._overlayRef.detachments(),n=this._parentMaterialMenu?this._parentMaterialMenu.closed:Ie(),s=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(H(r=>r!==this._menuItemInstance),H(()=>this._menuOpen)):Ie();return ne(e,n,s,t)}_handleMousedown(e){Et(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(t===39&&this.dir==="ltr"||t===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){!this.triggersSubmenu()||!this._parentMaterialMenu||(this._hoverSubscription=this._parentMaterialMenu._hovered().pipe(H(e=>e===this._menuItemInstance&&!e.disabled),ke(0,Ce)).subscribe(()=>{this._openedBy="mouse",this.menu instanceof N&&this.menu._isAnimating?this.menu._animationDone.pipe(oe(1),ke(0,Ce),re(this._parentMaterialMenu._hovered())).subscribe(()=>this.openMenu()):this.openMenu()}))}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new It(e.templateRef,this._viewContainerRef)),this._portal}};i.\u0275fac=function(t){return new(t||i)(m(Z),m(S),m(Xe),m(ti),m(Le,8),m(J,10),m(xt,8),m(Se),m(P))},i.\u0275dir=me({type:i,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(t,n){t&1&&ge("click",function(r){return n._handleClick(r)})("mousedown",function(r){return n._handleMousedown(r)})("keydown",function(r){return n._handleKeydown(r)}),t&2&&Q("aria-haspopup",n.menu?"menu":null)("aria-expanded",n.menuOpen)("aria-controls",n.menuOpen?n.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[p.None,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[p.None,"matMenuTriggerFor","menu"],menuData:[p.None,"matMenuTriggerData","menuData"],restoreFocus:[p.None,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],standalone:!0});let o=i;return o})(),ni=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=ce({type:i}),i.\u0275inj=se({providers:[Sn],imports:[_e,St,L,Ot,Dt,L]});let o=i;return o})();var k=()=>({exact:!0});function Fn(o,i){if(o&1&&(c(0,"button",8),h(1,"Administrar "),_(2,"span",10),l()),o&2){let a=f(2);d(2),fe("matBadge",a.nBadge)}}function On(o,i){if(o&1&&(c(0,"button",3)(1,"mat-icon"),h(2," menu"),l()(),c(3,"mat-menu",null,0)(5,"button",4),h(6,"Inicio"),l(),c(7,"button",5),h(8,"Comidas"),l(),c(9,"button",6),h(10,"Peso"),l(),c(11,"button",7),h(12,"Ejercicios"),l(),I(13,Fn,3,1,"button",8),l(),_(14,"img",9)),o&2){let a=Ze(4),e=f();g("matMenuTriggerFor",a),d(13),w(13,e.esAdmin?13:-1)}}function Ln(o,i){if(o&1&&(c(0,"h3",17),h(1," Administrar "),l()),o&2){let a=f(2);fe("matBadge",a.nBadge),g("routerLinkActiveOptions",M(2,k))}}function Nn(o,i){if(o&1&&(c(0,"span",11),_(1,"img",12),l(),c(2,"div",13)(3,"h3",14),h(4,"Comidas"),l(),c(5,"h3",15),h(6,"Peso"),l(),c(7,"h3",16),h(8,"Ejercicios"),l(),I(9,Ln,2,3,"h3",17),l()),o&2){let a=f();d(3),g("routerLinkActiveOptions",M(4,k)),d(2),g("routerLinkActiveOptions",M(5,k)),d(2),g("routerLinkActiveOptions",M(6,k)),d(2),w(9,a.esAdmin?9:-1)}}function Wn(o,i){if(o&1&&(c(0,"h3",17),h(1," Administrar "),l()),o&2){let a=f(2);fe("matBadge",a.nBadge),g("routerLinkActiveOptions",M(2,k))}}function jn(o,i){if(o&1&&(c(0,"span",11),_(1,"img",12),l(),c(2,"div",13)(3,"h3",14),h(4,"Comidas"),l(),c(5,"h3",15),h(6,"Peso"),l(),c(7,"h3",16),h(8,"Ejercicios"),l(),I(9,Wn,2,3,"h3",17),l(),c(10,"p",18),h(11),l()),o&2){let a=f();d(3),g("routerLinkActiveOptions",M(5,k)),d(2),g("routerLinkActiveOptions",M(6,k)),d(2),g("routerLinkActiveOptions",M(7,k)),d(2),w(9,a.esAdmin?9:-1),d(2),qe(a.nombre)}}var oi=(()=>{var i,a,e,t;let n=class n{constructor(){U(this,i,void 0);U(this,a,void 0);U(this,e,void 0);U(this,t,void 0);z(this,i,b(jt)),z(this,a,b(Ct)),z(this,e,b(Bt)),z(this,t,b(Wt)),this.esAdmin=!1,this.nombre="",this.idUsuario=localStorage.getItem("idUsuarioLogeado")??"",this.nBadge=0,this.tamanoPantalla="pantalla"}ngOnInit(){this.nombre=localStorage.getItem("nombreUsuario")??"",this.comprobarRol(),this.comprobarNumeroPropuestas(),this.tamanoPantallaSub=T(this,t).tamanoPantalla$.subscribe(r=>{this.tamanoPantalla=r,console.log(this.tamanoPantalla)})}comprobarRol(){T(this,i).getUsuarioAdmin(this.idUsuario).subscribe(r=>{this.esAdmin=r.respuesta})}comprobarNumeroPropuestas(){T(this,a).getRecetasAdministrar().subscribe(r=>{r.respuesta.filter(u=>u.id!==void 0).map(u=>{this.nBadge++})}),T(this,e).getEjerciciosAdministrar().subscribe(r=>{r.respuesta.filter(u=>u.id!==void 0).map(u=>{this.nBadge++})}),T(this,a).getAlimentosAdministrar().subscribe(r=>{r.respuesta.filter(u=>u.id!==void 0).map(u=>{this.nBadge++})})}};i=new WeakMap,a=new WeakMap,e=new WeakMap,t=new WeakMap,n.\u0275fac=function(u){return new(u||n)},n.\u0275cmp=v({type:n,selectors:[["app-toolbar"]],standalone:!0,features:[y],decls:5,vars:1,consts:[["menu","matMenu"],["color","primary",1,"toolbar"],["src","../../../assets/icons/PerfilIconBlack36.svg","routerLink","/login","alt","Icono de perfil","title","Perfil",1,"fakeButton"],["mat-button","",1,"btnMenu",3,"matMenuTriggerFor"],["mat-menu-item","","routerLink","/home"],["mat-menu-item","","routerLink","/comidas"],["mat-menu-item","","routerLink","/peso"],["mat-menu-item","","routerLink","/ejercicios"],["mat-menu-item","","routerLink","/administrar-propuestas"],["src","../../../assets/logo.svg","alt","Logo de la web","title","Men\xFA"],[3,"matBadge"],["routerLink","/home",1,"profile-icon"],["src","../../../assets/logo.svg","alt","Logo de la web","title","Inicio"],[1,"paginasToolbar"],["routerLink","/comidas","routerLinkActive","active-link",3,"routerLinkActiveOptions"],["routerLink","/peso","routerLinkActive","active-link",3,"routerLinkActiveOptions"],["routerLink","/ejercicios","routerLinkActive","active-link",3,"routerLinkActiveOptions"],["routerLink","/administrar-propuestas","routerLinkActive","active-link",3,"matBadge","routerLinkActiveOptions"],[1,"usuarioNombre"]],template:function(u,C){u&1&&(c(0,"mat-toolbar",1),I(1,On,15,2)(2,Nn,10,7)(3,jn,12,8),_(4,"img",2),l()),u&2&&(d(),w(1,C.tamanoPantalla==="pequena"?1:C.tamanoPantalla==="mediana"?2:3))},dependencies:[Zt,Kt,ct,rt,st,$t,zt,Ut,Nt,Lt,ni,N,J,ii],styles:[".toolbar[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;background-color:var(--PRIMARY_600);padding:0 10px}.toolbar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], span[_ngcontent-%COMP%]{cursor:pointer}.paginasToolbar[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:100%;gap:5%}.paginasToolbar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0 10px;font-size:28px;font-weight:700;color:var(--EXTRA_WHITE)}.profile-icon[_ngcontent-%COMP%]{margin-left:auto;display:flex;align-items:center}.usuarioNombre[_ngcontent-%COMP%]{margin-right:15px}@media (max-width: 768px){.paginasToolbar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:22px;margin:0 5px}.profile-icon[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:start}}@media (max-width: 576px){.toolbar[_ngcontent-%COMP%]{flex-direction:row;justify-content:space-between;padding-top:2px}.profile-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:32px;height:32px;padding-right:5px}.btnMenu[_ngcontent-%COMP%]{width:48px;height:48px}}"]});let o=n;return o})();var ai=(()=>{let i=class i{constructor(){this.title="WellnessTrack"}};i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=v({type:i,selectors:[["app-root"]],standalone:!0,features:[y],decls:2,vars:0,template:function(t,n){t&1&&_(0,"app-toolbar")(1,"router-outlet")},dependencies:[at,_e,oi]});let o=i;return o})();nt(ai,Gt).catch(o=>console.error(o));