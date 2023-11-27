import{B as c,_ as V,o as h,c as _,b as o,w as a,d as n,t as g,F as y,a as p}from"./entry.a8ea04dc.js";import{u as w}from"./auth.cb07611c.js";import{U as x}from"./validation.977342dc.js";import{V as d,a as u}from"./VRow.be53b986.js";import{V as m}from"./VTextField.7b7381e2.js";import{V as b,a as U}from"./VSnackbar.fda5ed2c.js";import{V as v}from"./VBtn.fb6611c3.js";import{V as k}from"./VForm.fdb6c9e3.js";const B={props:["id"],setup({id:l=null}){return{auth:w(),id:l}},data(){return{full_name:"",username:"",password:"",type:"",errors:{},default_types:["Admin","Professor"],created:null}},methods:{async validate(l){this.errors={};try{return await x.validate(l),!0}catch(s){return console.log(s),this.errors[s.path]=s.message,console.log(s.path,s.message),!1}},async add(){if(this.created)return;const l={full_name:this.full_name,username:this.username,password:this.password,type:this.type};if(this.id&&(l.id=this.id),await this.validate(l))try{this.created=await $fetch("/api/users",{method:"post",body:l,headers:{Authorization:`Bearer ${this.auth.token}`}}),c("/dashboard/users")}catch(i){console.error(i)}}},async mounted(){if(this.id){const{username:l,full_name:s,role:i}=await $fetch("/api/users?id="+this.id);this.username=l,this.full_name=s,this.type=i===0?"Admin":"Professor"}}},E=p("p",{class:"text-caption"}," Perfil ",-1),F=p("p",{class:"text-caption"}," Usuário de acesso ",-1);function S(l,s,i,A,e,f){return h(),_(y,null,[o(k,{class:"px-6"},{default:a(()=>[E,o(d,null,{default:a(()=>[o(u,{cols:"12",sm:"12",md:"6",lg:"6"},{default:a(()=>{var r;return[o(m,{variant:"outlined",modelValue:e.full_name,"onUpdate:modelValue":s[0]||(s[0]=t=>e.full_name=t),label:"Nome completo","error-messages":(r=e.errors)!=null&&r.full_name?[e.errors.full_name]:"",clearable:""},null,8,["modelValue","error-messages"])]}),_:1}),o(u,{cols:"12",sm:"12",md:"6",lg:"6"},{default:a(()=>{var r;return[o(m,{variant:"outlined",modelValue:e.username,"onUpdate:modelValue":s[1]||(s[1]=t=>e.username=t),label:"Usuário para login","error-messages":(r=e.errors)!=null&&r.username?[e.errors.username]:"",clearable:""},null,8,["modelValue","error-messages"])]}),_:1})]),_:1}),F,o(d,null,{default:a(()=>[o(u,{cols:"12",sm:"12",md:"6",lg:"6"},{default:a(()=>{var r;return[o(m,{variant:"outlined",modelValue:e.password,"onUpdate:modelValue":s[2]||(s[2]=t=>e.password=t),label:"Senha","error-messages":(r=e.errors)!=null&&r.password?[e.errors.password]:"",clearable:""},null,8,["modelValue","error-messages"])]}),_:1}),o(u,{cols:"12",sm:"12",md:"6",lg:"6"},{default:a(()=>{var r;return[o(b,{label:"Tipo de usuário",modelValue:e.type,"onUpdate:modelValue":s[3]||(s[3]=t=>e.type=t),items:e.default_types,variant:"outlined","error-messages":(r=e.errors)!=null&&r.type?[e.errors.type]:""},null,8,["modelValue","items","error-messages"])]}),_:1})]),_:1}),o(v,{color:"primary",onClick:f.add},{default:a(()=>[n(" Prosseguir ")]),_:1},8,["onClick"])]),_:1}),o(U,{modelValue:e.created,"onUpdate:modelValue":s[4]||(s[4]=r=>e.created=r),"multi-line":""},{default:a(()=>{var r;return[n(" O usuário "+g((r=e.created)==null?void 0:r.full)+" acaba de ser adicionado ",1)]}),_:1},8,["modelValue"])],64)}const j=V(B,[["render",S]]);export{j as U};
