import{G as L,S as x,C as m,a as v,b as M,P as S,W as k,O as z,D as P,H as G,M as O,c as N,d as q}from"./vendor.fce49f10.js";const B=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))C(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const f of a.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&C(f)}).observe(document,{childList:!0,subtree:!0});function p(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerpolicy&&(a.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?a.credentials="include":t.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function C(t){if(t.ep)return;t.ep=!0;const a=p(t);fetch(t.href,a)}};B();window.onbeforeunload=function(){window.scrollTo(0,0)};const c={};c.x=0;c.y=0;window.addEventListener("mousemove",e=>{c.x=e.clientX/i.width-.5,c.y=e.clientY/i.height-.5,console.log(c)});const d=new L,o={};o.topColor="#0000ff";o.bottomColor="#ff0000";o.directLightColor="#ffffff";o.sceneBackground="#000000";o.modelX=0;o.modelY=1.2;o.modelZ=1;o.cameraNear=.01;const l=new x;l.background=new m(o.sceneBackground);const i={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{i.width=window.innerWidth,i.height=window.innerHeight,s.aspect=i.width/i.height,s.updateProjectionMatrix(),u.setSize(i.width,i.height)});const E=()=>{l.traverse(e=>{e instanceof O&&e.material instanceof N&&(e.material.envMapIntensity=5,e.material.needsUpdate=!0,e.frustumCulled=!1,e.castShadow=!0,e.receiveShadow=!0)})};let r;const g=new v,H=new M;H.load("./assets/model.glb",e=>{r=e.scene,r.scale.set(2,2,2),r.position.y=-2.6,g.add(r),l.add(g),E()});const s=new S(65,i.width/i.height,.01,1e3);s.position.x=0;s.position.y=0;s.position.z=1;d.add(o,"cameraNear").min(-10).max(10).step(.001).onChange(e=>{s.near=e});d.add(o,"modelX").min(-10).max(10).step(.01).onChange(e=>{r.position.x=e});d.add(o,"modelY").min(-10).max(10).step(.01).onChange(e=>{r.position.y=e});d.add(o,"modelZ").min(-10).max(10).step(.01).onChange(e=>{r.position.z=e});const u=new k({canvas:document.querySelector("#bg")});u.setSize(i.width,i.height);u.setPixelRatio(Math.min(window.devicePixelRatio,2));const y=new z(s,document.querySelector("#bg"));y.enableDamping=!0;const h=new P(o.directLightColor,5);h.position.y=2;const w=new G(o.topColor,o.bottomColor,2);l.add(w,h);d.addColor(o,"directLightColor").onChange(e=>{h.color=new m(e)});d.addColor(o,"topColor").onChange(e=>{w.color=new m(e)});d.addColor(o,"bottomColor").onChange(e=>{w.groundColor=new m(e)});d.addColor(o,"sceneBackground").onChange(e=>{l.background=new m(e)});function R(){const e=document.body.getBoundingClientRect().top;let n=e*-5e-4;console.log(n),n<1.4&&(r.rotation.y=-n,r.position.y=n*.5-2.6),n>.5&&(g.rotation.z=-(n-.5)),r.position.z=e*.001}document.body.onscroll=R;const T=new q,b=()=>{const e=T.getElapsedTime();r&&(r.position.y+=Math.sin(e)*.001);const n=c.x*.05,p=-c.y*.05;s.position.x=n,s.position.y=p,y.update(),u.render(l,s),window.requestAnimationFrame(b)};b();
