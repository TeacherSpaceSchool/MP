(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{12:function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r});var a="SET_MINI_DIALOG",r="SHOW_MINI_DIALOG"},15:function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r}),n.d(t,"c",function(){return c});var a="GET_DATA",r="GET_IDS",c="SET_SELECTED"},22:function(e,t,n){"use strict";n.d(t,"b",function(){return h});var a=n(0),r=n.n(a),c=(n(45),n(13)),o=n(8),u=n(25),i=n(4),l=Object(a.lazy)(function(){return n.e(5).then(n.bind(null,77))}),s=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(6)]).then(n.bind(null,81))}),d=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(1),n.e(13),n.e(7)]).then(n.bind(null,78))}),p=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(1),n.e(14),n.e(3),n.e(8)]).then(n.bind(null,79))}),f=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(9)]).then(n.bind(null,80))}),h=r.a.createRef(),b=r.a.memo(function(e){var t=e.userActions.checkAuthenticated;return Object(a.useEffect)(function(){console.log("check_authenticated"),t()},[]),r.a.createElement("div",{ref:h,className:"App"},r.a.createElement(a.Suspense,{fallback:null},r.a.createElement(s,{history:e.history,location:e.location})),r.a.createElement(a.Suspense,{fallback:null},r.a.createElement(d,{history:e.history})),r.a.createElement("div",{className:"App-body"},r.a.createElement(i.c,null,r.a.createElement(i.a,{path:"/",exact:!0,component:y(l,e.history,e.location)}),r.a.createElement(i.a,{path:"/integration",component:y(f,e.history,e.location)}))),r.a.createElement(a.Suspense,{fallback:null},r.a.createElement(p,null)))});function y(e,t,n){return function(c){return r.a.createElement(a.Suspense,{fallback:r.a.createElement("div",null,"Loading...")},r.a.createElement(e,Object.assign({},c,{history:t,location:n})))}}t.a=Object(i.e)(Object(c.b)(function(e){return{user:e.user}},function(e){return{userActions:Object(o.b)(u,e)}})(b))},25:function(e,t,n){"use strict";n.r(t),n.d(t,"signin",function(){return s}),n.d(t,"checkAuthenticated",function(){return d}),n.d(t,"logout",function(){return p});var a=n(9),r=n.n(a),c=n(14),o=n(5),u=n(12),i=n(24),l=n.n(i);function s(e){return function(){var t=Object(c.a)(r.a.mark(function t(n){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,l.a.post("/users/signin?email="+e.email+"&password="+e.password);case 3:return a=t.sent,localStorage.userMissPolinAdmin=a.data,t.next=7,n({type:o.a});case 7:return t.next=9,n({type:u.b,payload:!1});case 9:t.next=16;break;case 11:return t.prev=11,t.t0=t.catch(0),t.next=15,n({type:o.b,payload:!0});case 15:console.error(t.t0);case 16:case"end":return t.stop()}},t,this,[[0,11]])}));return function(e){return t.apply(this,arguments)}}()}function d(){return function(){var e=Object(c.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:try{localStorage.userMissPolinAdmin?t({type:o.a}):t({type:o.c})}catch(n){t({type:o.c})}case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}function p(){return function(){var e=Object(c.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:localStorage.removeItem("userMissPolinAdmin"),t({type:o.c});case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}},27:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a="SHOW_DRAWER"},37:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(23),o=n.n(c),u=(n(43),n(22));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=n(13),l=n(8),s=n(1),d=n(5),p={authenticated:!1,error:!1};var f=n(12),h={title:"",child:null,show:!1};var b=n(27),y={drawer:!1};var m=n(15),v={count:0,page:0,data:[],data1:[],row:[],search:"",name:"",sort:"",selected:-1,ids:{}};var E=Object(l.c)({mini_dialog:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case f.b:return Object(s.a)({},e,{show:t.payload});case f.a:return Object(s.a)({},e,{title:t.payload.title,child:t.payload.child});default:return e}},user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case d.a:return Object(s.a)({},e,{authenticated:!0,error:!1});case d.c:return Object(s.a)({},e,{authenticated:!1,error:!1});case d.b:return Object(s.a)({},e,{error:t.payload});default:return e}},table:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case m.b:return console.log(t.payload),Object(s.a)({},e,{ids:t.payload});case m.c:return Object(s.a)({},e,{selected:t.payload});case m.a:return console.log(t.payload.data1),Object(s.a)({},e,{count:t.payload.count,page:t.payload.page,data:t.payload.data,data1:t.payload.data1,row:t.payload.row,search:t.payload.search,name:t.payload.name,sort:t.payload.sort});default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b.a:return Object(s.a)({},e,{drawer:t.payload});default:return e}}}),w=n(36);var O=n(19);n.d(t,"store",function(){return j});var g,j=Object(l.d)(E,g,Object(l.a)(w.a));o.a.hydrate(r.a.createElement(O.a,null,r.a.createElement(i.a,{store:j},r.a.createElement(u.a,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},38:function(e,t,n){e.exports=n(37)},43:function(e,t,n){},45:function(e,t,n){},5:function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n.d(t,"c",function(){return r}),n.d(t,"b",function(){return c});var a="AUTHENTICATED",r="UNAUTHENTICATED",c="ERROR_AUTHENTICATED"}},[[38,15,11]]]);
//# sourceMappingURL=main.b9f52664.chunk.js.map