(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{125:function(e,t,a){"use strict";a.r(t),a.d(t,"showDrawer",function(){return i});var n=a(21);function i(e){return{type:n.a,payload:e}}},144:function(e,t,a){e.exports=a.p+"static/media/logo.6380e3d6.png"},317:function(e,t,a){"use strict";var n=a(69);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i.default}});var i=n(a(318))},318:function(e,t,a){"use strict";var n=a(69);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.styles=void 0;var i=n(a(70)),o=n(a(74)),r=n(a(71)),l=n(a(0)),c=(n(a(5)),n(a(72))),s=n(a(73)),u=a(82),d=n(a(106)),p=function(e){var t="light"===e.palette.type?e.palette.grey[100]:e.palette.grey[900];return{root:{display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",zIndex:e.zIndex.appBar,flexShrink:0},positionFixed:{position:"fixed",top:0,left:"auto",right:0},positionAbsolute:{position:"absolute",top:0,left:"auto",right:0},positionSticky:{position:"sticky",top:0,left:"auto",right:0},positionStatic:{position:"static"},positionRelative:{position:"relative"},colorDefault:{backgroundColor:t,color:e.palette.getContrastText(t)},colorPrimary:{backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText},colorSecondary:{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText}}};function m(e){var t,a=e.children,n=e.classes,s=e.className,p=e.color,m=e.position,f=(0,r.default)(e,["children","classes","className","color","position"]),g=(0,c.default)(n.root,n["position".concat((0,u.capitalize)(m))],(t={},(0,o.default)(t,n["color".concat((0,u.capitalize)(p))],"inherit"!==p),(0,o.default)(t,"mui-fixed","fixed"===m),t),s);return l.default.createElement(d.default,(0,i.default)({square:!0,component:"header",elevation:4,className:g},f),a)}t.styles=p,m.propTypes={},m.defaultProps={color:"primary",position:"fixed"};var f=(0,s.default)(p,{name:"MuiAppBar"})(m);t.default=f},322:function(e,t,a){"use strict";var n=a(80);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a(0)),o=(0,n(a(88)).default)(i.default.createElement(i.default.Fragment,null,i.default.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),i.default.createElement("path",{fill:"none",d:"M0 0h24v24H0z"})),"Add");t.default=o},68:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(83),r=a(317),l=a.n(r),c=a(145),s=a.n(c),u=a(94),d=a.n(u),p=a(86),m=a.n(p),f=a(9),g=a(4),b=a(18),h=a(125),v=a(124),y=a(87),w=a(85),E=a.n(w),x=i.a.memo(function(e){var t=Object(n.useState)(""),a=Object(y.a)(t,2),o=a[0],r=a[1],l=Object(n.useState)(""),c=Object(y.a)(l,2),s=c[0],u=c[1],d=e.user.error,p=e.mini_dialogActions.showMiniDialog,f=e.userActions,g=f.signin,b=f.logout,h=e.classes;return i.a.createElement("div",null,i.a.createElement(E.a,{id:"standard-search",label:"\u041b\u043e\u0433\u0438\u043d",type:"login",className:h.textField,margin:"normal",value:o,onChange:function(e){r(e.target.value)}}),i.a.createElement("br",null),i.a.createElement(E.a,{id:"standard-search",label:"\u041f\u0430\u0440\u043e\u043b\u044c",type:"password",className:h.textField,margin:"normal",value:s,onChange:function(e){u(e.target.value)}}),i.a.createElement("br",null),d?i.a.createElement("div",{className:h.error_message},"\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 \u043b\u043e\u0433\u0438\u043d \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c"):null,i.a.createElement("div",null,i.a.createElement(m.a,{variant:"contained",color:"primary",onClick:function(){g({email:o,password:s})},className:h.button},"\u0412\u043e\u0439\u0442\u0438"),i.a.createElement(m.a,{variant:"contained",color:"secondary",onClick:function(){p(!1),b()},className:h.button},"\u041e\u0442\u043c\u0435\u043d\u0430")))});var j=Object(o.withStyles)(function(e){return{button:{margin:e.spacing.unit},textField:{marginLeft:e.spacing.unit,marginRight:e.spacing.unit,width:200},error_message:{marginTop:e.spacing.unit,marginBottom:e.spacing.unit,marginLeft:e.spacing.unit,marginRight:e.spacing.unit,color:"red",fontWeight:"bold"}}})(Object(f.b)(function(e){return{mini_dialog:e.mini_dialog,user:e.user}},function(e){return{mini_dialogActions:Object(g.b)(v,e),userActions:Object(g.b)(b,e)}})(x)),O=a(144),k=a.n(O),A=a(322),_=a.n(A),C=a(123),N=a.n(C);t.default=Object(f.b)(function(e){return{table:e.table,app:e.app,user:e.user}},function(e){return{mini_dialogActions:Object(g.b)(v,e),appActions:Object(g.b)(h,e),userActions:Object(g.b)(b,e)}})(Object(o.withStyles)({appBar:{zIndex:1201,background:"#202124"},root:{flexGrow:1},grow:{flexGrow:1},menuButton:{width:45,height:45,marginLeft:10,marginRight:20}})(function(e){var t=e.user.authenticated,a=e.classes,n=e.userActions.logout,o=e.table.name,r=e.app.drawer,c=e.appActions.showDrawer,u=e.mini_dialogActions,p=u.setMiniDialog,f=u.showMiniDialog,g=u.showAddMiniDialog;return i.a.createElement("div",null,i.a.createElement("div",{className:a.root},i.a.createElement(l.a,{position:"fixed",className:a.appBar},i.a.createElement(s.a,null,i.a.createElement("img",{src:k.a,className:a.menuButton,onClick:function(){c(!r)}}),i.a.createElement(d.a,{variant:"h6",color:"inherit",className:a.grow,onClick:g},"ArchiAdmin"),t?i.a.createElement("div",null,""!=o?i.a.createElement(N.a,{color:"inherit",onClick:g,style:{marginRight:"20px"}},i.a.createElement(_.a,null)):null,i.a.createElement(m.a,{variant:"outlined",color:"inherit",onClick:n},"\u0412\u044b\u0439\u0442\u0438")):i.a.createElement(m.a,{variant:"outlined",color:"inherit",onClick:function(){p("\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u044f",i.a.createElement(j,null)),f(!0)}},"\u0412\u043e\u0439\u0442\u0438")))))}))}}]);
//# sourceMappingURL=4.6d32c98e.chunk.js.map