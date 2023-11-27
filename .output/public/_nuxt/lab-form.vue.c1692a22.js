import{n as k,r as p,q as x,o as B,s as C,w as u,b as n,u as o,v as _,d as $,B as A}from"./entry.a8ea04dc.js";import{u as z}from"./auth.cb07611c.js";import{L as I}from"./validation.977342dc.js";import{a as v,V as N}from"./VRow.be53b986.js";import{V as h}from"./VTextField.7b7381e2.js";import{V as S}from"./VBtn.fb6611c3.js";import{V as T}from"./VForm.fdb6c9e3.js";const D=k({__name:"lab-form",props:{lab_id:String},async setup(b){let i,f;const{lab_id:c}=b,d=z(),t=p(),r=p(),s=p({});async function y(){s.value={};const e={name:t.value,student_capacity:parseInt(r.value,10)};try{return await I.validate(e),!0}catch(a){return s.value[a.path]=a.message,!1}}async function V(){const e={name:t.value,student_capacity:parseInt(r.value,10)};return await $fetch("/api/labs/create",{method:"post",body:e,headers:{Authorization:`Bearer ${d.token}`}})}async function w(e){let a;return a={name:t.value,student_capacity:parseInt(r.value||"0",10)},await $fetch("/api/labs/update",{method:"post",body:a,headers:{Authorization:`Bearer ${d.token}`},params:{lab_id:e}})}async function g(){await y()&&(c?await w(c):await V(),A("/dashboard/labs"))}if(c){const e=([i,f]=x(()=>$fetch("/api/labs/view",{method:"get",headers:{Authorization:`Bearer ${d.token}`},params:{lab_id:c}})),i=await i,f(),i);t.value=e.name,r.value=e.student_capacity}return(e,a)=>(B(),C(T,{class:"px-3"},{default:u(()=>[n(N,null,{default:u(()=>[n(v,null,{default:u(()=>{var l;return[n(h,{variant:"outlined",modelValue:o(t),"onUpdate:modelValue":a[0]||(a[0]=m=>_(t)?t.value=m:null),clearable:"",label:"Nome","error-messages":(l=o(s))!=null&&l.name?[o(s).name]:""},null,8,["modelValue","error-messages"])]}),_:1}),n(v,null,{default:u(()=>{var l;return[n(h,{variant:"outlined",modelValue:o(r),"onUpdate:modelValue":a[1]||(a[1]=m=>_(r)?r.value=m:null),clearable:"",label:"Capacidade","error-messages":(l=o(s))!=null&&l.student_capacity?[o(s).student_capacity]:""},null,8,["modelValue","error-messages"])]}),_:1})]),_:1}),n(S,{color:"primary",onClick:g},{default:u(()=>[$(" Salvar ")]),_:1})]),_:1}))}});export{D as _};
