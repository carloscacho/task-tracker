(function(){"use strict";var n={2978:function(n,t,e){var i=e(9242),o=e(3396),a=e(7139);const s={class:"column is-one-quarter"},r={class:"column is-three-quarter content"},c={class:"taskList"},l=(0,o.Uk)(' "Não há nenhuma tarefa finalizada" ');function u(n,t,e,i,u,d){const m=(0,o.up)("SideBar"),f=(0,o.up)("FormTask"),h=(0,o.up)("TaskItem"),p=(0,o.up)("card-text");return(0,o.wg)(),(0,o.iD)("main",{class:(0,a.C_)(["columns is-gapless is-multiline",{dark:n.isDarkMode}])},[(0,o._)("div",s,[(0,o.Wm)(m,{onOnChangeMode:n.changeMode},null,8,["onOnChangeMode"])]),(0,o._)("div",r,[(0,o.Wm)(f,{onOnSalveTask:n.saveTask},null,8,["onOnSalveTask"]),(0,o._)("div",c,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(n.listTask,((n,t)=>((0,o.wg)(),(0,o.j4)(h,{key:t,item:n},null,8,["item"])))),128)),n.isEmptyList?((0,o.wg)(),(0,o.j4)(p,{key:0},{default:(0,o.w5)((()=>[l])),_:1})):(0,o.kq)("",!0)])])],2)}var d=e(6949);const m=n=>((0,o.dD)("data-v-5430486b"),n=n(),(0,o.Cn)(),n),f=m((()=>(0,o._)("h1",null,[(0,o._)("img",{src:d,alt:"logo do site"})],-1)));function h(n,t,e,i,s,r){return(0,o.wg)(),(0,o.iD)("header",null,[f,(0,o._)("i",{onClick:t[0]||(t[0]=(...t)=>n.changeModeLight&&n.changeModeLight(...t)),class:"fa-solid fa-sun"}),(0,o._)("i",{onClick:t[1]||(t[1]=(...t)=>n.changeMode&&n.changeMode(...t)),class:(0,a.C_)(n.buttonIcon)},null,2),(0,o._)("i",{onClick:t[2]||(t[2]=(...t)=>n.changeModeDark&&n.changeModeDark(...t)),class:"fa-solid fa-moon"})])}var p=(0,o.aZ)({name:"SideBar",emits:["onChangeMode"],data(){return{isDarkMode:!1}},computed:{buttonIcon(){return this.isDarkMode?"fa-solid fa-toggle-on":"fa-solid fa-toggle-off"}},methods:{changeMode(){this.isDarkMode=!this.isDarkMode,this.$emit("onChangeMode",this.isDarkMode)},changeModeDark(){this.isDarkMode=!0,this.$emit("onChangeMode",this.isDarkMode)},changeModeLight(){this.isDarkMode=!1,this.$emit("onChangeMode",this.isDarkMode)}}}),v=e(89);const g=(0,v.Z)(p,[["render",h],["__scopeId","data-v-5430486b"]]);var k=g;const b={class:"box formtime"},w={class:"columns"},M={class:"column is-8",role:"form","aria-label":"Formulário para criação de uma nova tarefa"},T={class:"column"};function _(n,t,e,a,s,r){const c=(0,o.up)("TimerMachine");return(0,o.wg)(),(0,o.iD)("div",b,[(0,o._)("div",w,[(0,o._)("div",M,[(0,o.wy)((0,o._)("input",{type:"text",class:"input",placeholder:"Qual tarefa você deseja iniciar?","onUpdate:modelValue":t[0]||(t[0]=t=>n.description=t)},null,512),[[i.nr,n.description]])]),(0,o._)("div",T,[(0,o.Wm)(c,{onOnTimerEnd:n.finishTask},null,8,["onOnTimerEnd"])])])])}const S={class:"is-flex is-align-items-center is-justify-content-space-between"};function D(n,t,e,i,a,s){const r=(0,o.up)("StopwatchView"),c=(0,o.up)("timer-button");return(0,o.wg)(),(0,o.iD)("div",S,[(0,o.Wm)(r,{timerInSeconds:n.timerInSeconds},null,8,["timerInSeconds"]),(0,o.Wm)(c,{"icon-button":"fas fa-play",onAction:n.iniciar,"disable-button":n.timerRunner,title:"iniciar"},null,8,["onAction","disable-button"]),(0,o.Wm)(c,{"icon-button":"fas fa-stop",onAction:n.finalizar,"disable-button":!n.timerRunner,title:"parar"},null,8,["onAction","disable-button"])])}const I={class:"display"};function y(n,t,e,i,s,r){return(0,o.wg)(),(0,o.iD)("section",null,[(0,o._)("strong",I,(0,a.zw)(n.timer),1)])}var O=(0,o.aZ)({name:"StopwatchView",props:{timerInSeconds:{type:Number,default:0}},computed:{timer(){return new Date(1e3*this.timerInSeconds).toISOString().substring(11,19)}}});const C=(0,v.Z)(O,[["render",y]]);var Z=C;const x=["disabled"],j={class:"icon"};function B(n,t,e,i,s,r){return(0,o.wg)(),(0,o.iD)("button",{class:"button",onClick:t[0]||(t[0]=(...t)=>n.action&&n.action(...t)),disabled:n.disableButton},[(0,o._)("span",j,[(0,o._)("i",{class:(0,a.C_)(n.iconButton)},null,2)]),(0,o._)("span",null,(0,a.zw)(n.title),1)],8,x)}var R=(0,o.aZ)({name:"TimerButton",emits:["action"],methods:{action(){this.$emit("action")}},props:{disableButton:{type:Boolean,default:!1},title:{type:String},iconButton:{type:String,default:""}}});const W=(0,v.Z)(R,[["render",B]]);var z=W,E=(0,o.aZ)({name:"TimerMachine",emits:["onTimerEnd"],components:{StopwatchView:Z,TimerButton:z},data(){return{timerInSeconds:0,timerRef:0,timerRunner:!1}},methods:{iniciar(){this.timerRef=setInterval((()=>{this.timerInSeconds+=1}),1e3),this.timerRunner=!0,console.log("iniciando")},finalizar(){this.timerRunner=!1,console.log("finalizando"),clearInterval(this.timerRef),this.$emit("onTimerEnd",this.timerInSeconds),this.timerInSeconds=0}}});const $=(0,v.Z)(E,[["render",D]]);var L=$,V=(0,o.aZ)({name:"FormTask",emits:["onSalveTask"],components:{TimerMachine:L},data(){return{description:""}},methods:{finishTask(n){this.$emit("onSalveTask",{timerInSeconds:n,description:this.description}),this.description=""}}});const A=(0,v.Z)(V,[["render",_]]);var F=A;const q={class:"box has-text-weight-bold"},N={class:"columns"},P={class:"column is-7"},U={class:"column"};function H(n,t,e,i,s,r){const c=(0,o.up)("StopwatchView");return(0,o.wg)(),(0,o.iD)("div",q,[(0,o._)("div",N,[(0,o._)("div",P,(0,a.zw)(n.item.description||"Tarefa sem descrição"),1),(0,o._)("div",U,[(0,o.Wm)(c,{timerInSeconds:n.item.timerInSeconds},null,8,["timerInSeconds"])])])])}var K=(0,o.aZ)({name:"TaskItem",components:{StopwatchView:Z},props:{item:{type:Object}}});const Q=(0,v.Z)(K,[["render",H],["__scopeId","data-v-0a4a9d43"]]);var Y=Q;const G={class:"card"},J={class:"card-content"};function X(n,t,e,i,a,s){return(0,o.wg)(),(0,o.iD)("div",G,[(0,o._)("div",J,[(0,o.WI)(n.$slots,"default")])])}var nn=(0,o.aZ)({name:"CardText"});const tn=(0,v.Z)(nn,[["render",X]]);var en=tn,on=(0,o.aZ)({name:"App",components:{SideBar:k,FormTask:F,TaskItem:Y,CardText:en},data(){return{listTask:[],isDarkMode:!1}},computed:{isEmptyList(){return 0===this.listTask.length}},methods:{saveTask(n){this.listTask.push(n)},changeMode(n){this.isDarkMode=n}}});const an=(0,v.Z)(on,[["render",u]]);var sn=an;(0,i.ri)(sn).mount("#app")},6949:function(n,t,e){n.exports=e.p+"img/logo.7fc38a27.png"}},t={};function e(i){var o=t[i];if(void 0!==o)return o.exports;var a=t[i]={exports:{}};return n[i](a,a.exports,e),a.exports}e.m=n,function(){var n=[];e.O=function(t,i,o,a){if(!i){var s=1/0;for(u=0;u<n.length;u++){i=n[u][0],o=n[u][1],a=n[u][2];for(var r=!0,c=0;c<i.length;c++)(!1&a||s>=a)&&Object.keys(e.O).every((function(n){return e.O[n](i[c])}))?i.splice(c--,1):(r=!1,a<s&&(s=a));if(r){n.splice(u--,1);var l=o();void 0!==l&&(t=l)}}return t}a=a||0;for(var u=n.length;u>0&&n[u-1][2]>a;u--)n[u]=n[u-1];n[u]=[i,o,a]}}(),function(){e.n=function(n){var t=n&&n.__esModule?function(){return n["default"]}:function(){return n};return e.d(t,{a:t}),t}}(),function(){e.d=function(n,t){for(var i in t)e.o(t,i)&&!e.o(n,i)&&Object.defineProperty(n,i,{enumerable:!0,get:t[i]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"===typeof window)return window}}()}(),function(){e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)}}(),function(){e.p="/"}(),function(){var n={143:0};e.O.j=function(t){return 0===n[t]};var t=function(t,i){var o,a,s=i[0],r=i[1],c=i[2],l=0;if(s.some((function(t){return 0!==n[t]}))){for(o in r)e.o(r,o)&&(e.m[o]=r[o]);if(c)var u=c(e)}for(t&&t(i);l<s.length;l++)a=s[l],e.o(n,a)&&n[a]&&n[a][0](),n[a]=0;return e.O(u)},i=self["webpackChunktask_tracker"]=self["webpackChunktask_tracker"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=e.O(void 0,[998],(function(){return e(2978)}));i=e.O(i)})();
//# sourceMappingURL=app.3b0203d7.js.map