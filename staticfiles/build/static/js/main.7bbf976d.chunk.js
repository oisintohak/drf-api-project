(this.webpackJsonpeventually=this.webpackJsonpeventually||[]).push([[0],{60:function(e,t,n){},90:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(26),c=n.n(a),s=(n(60),n(7)),o=n(16),u=n(19),i=n(29),l=n(12),j=n(20),d=n(11),b=n.n(d);b.a.defaults.headers.post["Content-Type"]="multipart/form-data",b.a.defaults.withCredentials=!0;var p=b.a.create(),h=b.a.create(),O=n(6),x=n(53),m=function(e){var t=Object(x.a)(null===e||void 0===e?void 0:e.refresh_token).exp;localStorage.setItem("refreshTokenTimestamp",t)},v=function(){localStorage.removeItem("refreshTokenTimestamp")},f=n(2),g=Object(r.createContext)(),w=Object(r.createContext)(),k=function(){return Object(r.useContext)(w)},y=function(e){var t=e.children,n=Object(r.useState)(null),a=Object(j.a)(n,2),c=a[0],u=a[1],i=Object(O.f)(),l=function(){var e=Object(o.a)(Object(s.a)().mark((function e(){var t,n;return Object(s.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.get("auth/user/");case 3:t=e.sent,n=t.data,u(n),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){l()}),[]),Object(r.useMemo)((function(){p.interceptors.request.use(function(){var e=Object(o.a)(Object(s.a)().mark((function e(t){return Object(s.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem("refreshTokenTimestamp")){e.next=11;break}return e.prev=1,e.next=4,b.a.post("auth/token/refresh/");case 4:e.next=11;break;case 6:return e.prev=6,e.t0=e.catch(1),u((function(e){return e&&i.push("/login"),null})),v(),e.abrupt("return",t);case 11:return e.abrupt("return",t);case 12:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(t){return e.apply(this,arguments)}}(),(function(e){return Promise.reject(e)})),h.interceptors.response.use((function(e){return e}),function(){var e=Object(o.a)(Object(s.a)().mark((function e(t){var n;return Object(s.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(401!==(null===(n=t.response)||void 0===n?void 0:n.status)){e.next=11;break}return e.prev=1,e.next=4,b.a.post("auth/token/refresh/");case 4:e.next=10;break;case 6:e.prev=6,e.t0=e.catch(1),u((function(e){return e&&i.push("/login"),null})),v();case 10:return e.abrupt("return",b()(t.config));case 11:return e.abrupt("return",Promise.reject(t));case 12:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(t){return e.apply(this,arguments)}}())}),[i]),Object(f.jsx)(g.Provider,{value:c,children:Object(f.jsx)(w.Provider,{value:u,children:t})})};var C=function(){var e=Object(r.useContext)(g),t=k(),n=function(){var e=Object(o.a)(Object(s.a)().mark((function e(){return Object(s.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.post("auth/logout/");case 3:t(null),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}();return Object(f.jsx)(i.a,{children:Object(f.jsxs)(u.a,{children:[Object(f.jsx)(l.c,{to:"/",children:Object(f.jsx)(i.a.Brand,{children:"Eventually"})}),Object(f.jsx)(i.a.Toggle,{}),Object(f.jsx)(i.a.Collapse,{className:"justify-content-end",children:e?Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)(i.a.Text,{children:["Welcome, ",e.username]}),Object(f.jsx)(l.c,{to:"/",onClick:n,className:"mx-2",children:"Logout"})]}):Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(l.c,{to:"/login",className:"mx-2",children:"Login"}),Object(f.jsx)(l.c,{to:"/register",className:"mx-2",children:"Register"})]})})]})})},N=n(27),S=n(28),I=n(8),T=n(33),P=n(55),L=n(23),F=n(31),G=n(18),_=function(e){var t=Object(O.f)();Object(r.useEffect)((function(){var n=function(){var n=Object(o.a)(Object(s.a)().mark((function n(){return Object(s.a)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,b.a.post("auth/token/refresh/");case 3:"loggedIn"===e&&t.push("/"),n.next=9;break;case 6:n.prev=6,n.t0=n.catch(0),"loggedOut"===e&&t.push("/");case 9:case"end":return n.stop()}}),n,null,[[0,6]])})));return function(){return n.apply(this,arguments)}}();n()}),[t,e])},B=function(){var e,t,n,a;_("loggedIn");var c=Object(r.useState)({username:"",password1:"",password2:""}),i=Object(j.a)(c,2),d=i[0],p=i[1],h=d.username,x=d.password1,m=d.password2,v=Object(r.useState)({}),g=Object(j.a)(v,2),w=g[0],k=g[1],y=Object(O.f)(),C=function(e){p(Object(S.a)(Object(S.a)({},d),{},Object(N.a)({},e.target.name,e.target.value)))},B=function(){var e=Object(o.a)(Object(s.a)().mark((function e(t){var n;return Object(s.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,b.a.post("auth/registration/",d);case 4:y.push("/signin"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),k(null===(n=e.t0.response)||void 0===n?void 0:n.data);case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}();return Object(f.jsxs)(F.a,{children:[Object(f.jsxs)(L.a,{className:"my-auto py-2 p-md-2",md:6,children:[Object(f.jsx)(u.a,{className:"p-4",children:Object(f.jsxs)(I.a,{onSubmit:B,children:[Object(f.jsxs)(I.a.Group,{controlId:"username",children:[Object(f.jsx)(I.a.Label,{className:"d-none",children:"username"}),Object(f.jsx)(I.a.Control,{type:"text",placeholder:"Username",name:"username",value:h,onChange:C})]}),null===(e=w.username)||void 0===e?void 0:e.map((function(e,t){return Object(f.jsx)(G.a,{variant:"warning",children:e},t)})),Object(f.jsxs)(I.a.Group,{controlId:"password1",children:[Object(f.jsx)(I.a.Label,{className:"d-none",children:"Password"}),Object(f.jsx)(I.a.Control,{type:"password",placeholder:"Password",name:"password1",value:x,onChange:C})]}),null===(t=w.password1)||void 0===t?void 0:t.map((function(e,t){return Object(f.jsx)(G.a,{variant:"warning",children:e},t)})),Object(f.jsxs)(I.a.Group,{controlId:"password2",children:[Object(f.jsx)(I.a.Label,{className:"d-none",children:"Confirm password"}),Object(f.jsx)(I.a.Control,{type:"password",placeholder:"Confirm password",name:"password2",value:m,onChange:C})]}),null===(n=w.password2)||void 0===n?void 0:n.map((function(e,t){return Object(f.jsx)(G.a,{variant:"warning",children:e},t)})),Object(f.jsx)(T.a,{type:"submit",children:"Sign up"}),null===(a=w.non_field_errors)||void 0===a?void 0:a.map((function(e,t){return Object(f.jsx)(G.a,{variant:"warning",className:"mt-3",children:e},t)}))]})}),Object(f.jsx)(u.a,{className:"mt-3",children:Object(f.jsxs)(l.b,{to:"/signin",children:["Already have an account? ",Object(f.jsx)("span",{children:"Sign in"})]})})]}),Object(f.jsx)(L.a,{md:6,className:"my-auto d-none d-md-block p-2",children:Object(f.jsx)(P.a,{src:"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"})})]})};var D=function(){var e,t,n;_("loggedIn");var a=k(),c=Object(r.useState)({username:"",password:""}),i=Object(j.a)(c,2),d=i[0],p=i[1],h=d.username,x=d.password,v=Object(r.useState)({}),g=Object(j.a)(v,2),w=g[0],y=g[1],C=Object(O.f)(),P=function(){var e=Object(o.a)(Object(s.a)().mark((function e(t){var n,r,c;return Object(s.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,b.a.post("auth/login/",d);case 4:n=e.sent,r=n.data,a(r.user),m(r),C.goBack(),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),y(null===(c=e.t0.response)||void 0===c?void 0:c.data);case 14:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}(),B=function(e){p(Object(S.a)(Object(S.a)({},d),{},Object(N.a)({},e.target.name,e.target.value)))};return Object(f.jsx)(F.a,{children:Object(f.jsxs)(L.a,{className:"my-auto p-0 p-md-2",md:6,children:[Object(f.jsx)(u.a,{children:Object(f.jsxs)(I.a,{onSubmit:P,children:[Object(f.jsxs)(I.a.Group,{controlId:"username",children:[Object(f.jsx)(I.a.Label,{className:"d-none",children:"Username"}),Object(f.jsx)(I.a.Control,{type:"text",placeholder:"Username",name:"username",value:h,onChange:B})]}),null===(e=w.username)||void 0===e?void 0:e.map((function(e,t){return Object(f.jsx)(G.a,{variant:"warning",children:e},t)})),Object(f.jsxs)(I.a.Group,{controlId:"password",children:[Object(f.jsx)(I.a.Label,{className:"d-none",children:"Password"}),Object(f.jsx)(I.a.Control,{type:"password",placeholder:"Password",name:"password",value:x,onChange:B})]}),null===(t=w.password)||void 0===t?void 0:t.map((function(e,t){return Object(f.jsx)(G.a,{variant:"warning",children:e},t)})),Object(f.jsx)(T.a,{type:"submit",children:"Sign in"}),null===(n=w.non_field_errors)||void 0===n?void 0:n.map((function(e,t){return Object(f.jsx)(G.a,{variant:"warning",className:"mt-3",children:e},t)}))]})}),Object(f.jsx)(u.a,{children:Object(f.jsxs)(l.b,{to:"/register",children:["Don't have an account? ",Object(f.jsx)("span",{children:"Sign up now!"})]})})]})})};var E=function(){return Object(f.jsxs)("div",{children:[Object(f.jsx)(C,{}),Object(f.jsxs)(O.c,{children:[Object(f.jsx)(O.a,{exact:!0,path:"/",render:function(){return Object(f.jsx)(f.Fragment,{children:Object(f.jsx)("h1",{children:"home"})})}}),Object(f.jsx)(O.a,{exact:!0,path:"/login",render:function(){return Object(f.jsx)(D,{})}}),Object(f.jsx)(O.a,{exact:!0,path:"/register",render:function(){return Object(f.jsx)(B,{})}})]})]})},U=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,93)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))};c.a.render(Object(f.jsx)(l.a,{children:Object(f.jsx)(y,{children:Object(f.jsx)(E,{})})}),document.getElementById("root")),U()}},[[90,1,2]]]);
//# sourceMappingURL=main.7bbf976d.chunk.js.map