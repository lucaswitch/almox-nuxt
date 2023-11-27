import{_ as m}from"./nuxt-link.c901a93f.js";import{u as h}from"./auth.cb07611c.js";import{_,c as r,b as s,w as a,F as l,a as t,o,d as u,y as f,t as n}from"./entry.a8ea04dc.js";import{V as p}from"./VTable.c658405d.js";import{V as d}from"./VBtn.fb6611c3.js";import"./tag.19ec8209.js";const x={setup(){return{auth:h()}},data(){return{items:[],total_count:0,page:1}},methods:{async refresh(){this.items=await $fetch("/api/users",{method:"get",headers:{Authorization:`Bearer ${this.auth.token}`}})}},async mounted(){await this.refresh()}},y=t("h6",{class:"text-h6"}," Usuários ",-1),V=t("thead",null,[t("tr",null,[t("th",{class:"text-left"}," Nome "),t("th",{class:"text-left"}," Usuário "),t("th",{class:"text-left"}," Permissões "),t("th",null," Ações ")])],-1);function b(k,A,B,N,i,$){const c=m;return o(),r(l,null,[y,s(c,{to:"/dashboard/users/add"},{default:a(()=>[s(d,{color:"primary"},{default:a(()=>[u(" Adicionar usuário ")]),_:1})]),_:1}),s(p,{class:"mt-2"},{default:a(()=>[V,t("tbody",null,[(o(!0),r(l,null,f(i.items,e=>(o(),r("tr",{key:e.name},[t("td",null,n(e.full_name),1),t("td",null,n(e.username),1),t("td",null,n(e.role===0?"Administrador":"Professor"),1),t("td",null,[s(d,{variant:"flat",compact:"",to:"/dashboard/users/"+e.id},{default:a(()=>[u(" Editar ")]),_:2},1032,["to"])])]))),128))])]),_:1})],64)}const T=_(x,[["render",b]]);export{T as default};
