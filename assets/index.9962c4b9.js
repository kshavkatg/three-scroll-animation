import{P as j,U as z,S as H,F as I,L as O,M as r,D as k,R as X,a as q,G as N,b as Q,C as M,c as Y,s as F,d as K,e as V,f as S,g as Z,h as D,i as $,j as J,W as ee,k as te,l as se,m as G,n as oe,E as ae,o as ie,p as ne,q as re,O as le,r as R,A as de,t as C,u as ue,v as ce,w as T,x as fe,y as he,z as pe,B as ge}from"./vendor.977a9e5b.js";const me=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const y of o.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&c(y)}).observe(document,{childList:!0,subtree:!0});function i(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(s){if(s.ep)return;s.ep=!0;const o=i(s);fetch(s.href,o)}};me();const U={uniforms:{tDiffuse:{value:null},tDisp:{value:null},byp:{value:0},amount:{value:0},angle:{value:0},seed:{value:0},seed_x:{value:0},seed_y:{value:0},distortion_x:{value:0},distortion_y:{value:0},col_s:{value:0}},vertexShader:`

		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		uniform int byp; //should we apply the glitch ?

		uniform sampler2D tDiffuse;
		uniform sampler2D tDisp;

		uniform float amount;
		uniform float angle;
		uniform float seed;
		uniform float seed_x;
		uniform float seed_y;
		uniform float distortion_x;
		uniform float distortion_y;
		uniform float col_s;

		varying vec2 vUv;


		float rand(vec2 co){
			return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
		}

		void main() {
			if(byp<1) {
				vec2 p = vUv;
				float xs = floor(gl_FragCoord.x / 0.5);
				float ys = floor(gl_FragCoord.y / 0.5);
				//based on staffantans glitch shader for unity https://github.com/staffantan/unityglitch
				float disp = texture2D(tDisp, p*seed*seed).r;
				if(p.y<distortion_x+col_s && p.y>distortion_x-col_s*seed) {
					if(seed_x>0.){
						p.y = 1. - (p.y + distortion_y);
					}
					else {
						p.y = distortion_y;
					}
				}
				if(p.x<distortion_y+col_s && p.x>distortion_y-col_s*seed) {
					if(seed_y>0.){
						p.x=distortion_x;
					}
					else {
						p.x = 1. - (p.x + distortion_x);
					}
				}
				p.x+=disp*seed_x*(seed/5.);
				p.y+=disp*seed_y*(seed/5.);
				//base from RGB shift shader
				vec2 offset = amount * vec2( cos(angle), sin(angle));
				vec4 cr = texture2D(tDiffuse, p + offset);
				vec4 cga = texture2D(tDiffuse, p);
				vec4 cb = texture2D(tDiffuse, p - offset);
				gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
				//add noise
				vec4 snow = 200.*amount*vec4(rand(vec2(xs * seed,ys * seed*50.))*0.2);
				gl_FragColor = gl_FragColor+ snow;
			}
			else {
				gl_FragColor=texture2D (tDiffuse, vUv);
			}
		}`};class we extends j{constructor(e=64){super();U===void 0&&console.error("THREE.GlitchPass relies on DigitalGlitch");const i=U;this.uniforms=z.clone(i.uniforms),this.uniforms.tDisp.value=this.generateHeightmap(e),this.material=new H({uniforms:this.uniforms,vertexShader:i.vertexShader,fragmentShader:i.fragmentShader}),this.fsQuad=new I(this.material),this.goWild=!1,this.curF=0,this.generateTrigger()}render(e,i,c){e.capabilities.isWebGL2===!1&&(this.uniforms.tDisp.value.format=O),this.uniforms.tDiffuse.value=c.texture,this.uniforms.seed.value=Math.random(),this.uniforms.byp.value=0,this.curF%this.randX==0||this.goWild==!0?(this.uniforms.amount.value=Math.random()/30,this.uniforms.angle.value=r.randFloat(-Math.PI,Math.PI),this.uniforms.seed_x.value=r.randFloat(-.1,.1),this.uniforms.seed_y.value=r.randFloat(-.1,.1),this.uniforms.distortion_x.value=r.randFloat(0,.1),this.uniforms.distortion_y.value=r.randFloat(0,.1),this.curF=0,this.generateTrigger(),this.curF++):this.curF%this.randX<this.randX/5?(this.uniforms.amount.value=Math.random()/90,this.uniforms.angle.value=r.randFloat(-Math.PI,Math.PI),this.uniforms.distortion_x.value=r.randFloat(0,.1),this.uniforms.distortion_y.value=r.randFloat(0,.1),this.uniforms.seed_x.value=r.randFloat(-.1,.1),this.uniforms.seed_y.value=r.randFloat(-.1,.1),this.curF++):this.goWild==!1&&(this.curF+=.6,this.uniforms.byp.value=5),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.clear&&e.clear(),this.fsQuad.render(e))}generateTrigger(){this.randX=r.randInt(120,240)}generateHeightmap(e){const i=new Float32Array(e*e),c=e*e;for(let o=0;o<c;o++){const y=r.randFloat(0,1);i[o]=y}const s=new k(i,e,e,X,q);return s.needsUpdate=!0,s}}window.onbeforeunload=function(){window.scrollTo(0,0)};const m={};m.x=0;m.y=0;window.addEventListener("mousemove",t=>{m.x=t.clientX/n.width-.5,m.y=t.clientY/n.height-.5});new N;const l={};l.topColor="#0000ff";l.bottomColor="#ff0000";l.directLightColor="#ff0000";l.sceneBackground="#a20000";l.modelX=0;l.modelY=1.2;l.modelZ=1;l.cameraNear=.01;l.sphereOpacity=0;const u=new Q;u.background=new M(l.sceneBackground);const n={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{n.width=window.innerWidth,n.height=window.innerHeight,d.aspect=n.width/n.height,d.updateProjectionMatrix(),a.setSize(n.width,n.height)});const ve=new Y,W=ve.load(["./posx.jpg","./negx.jpg","./posy.jpg","./negy.jpg","./posz.jpg","./negz.jpg"]);W.encoding=F;u.environment=W;const ye=()=>{u.traverse(t=>{t instanceof S&&t.material instanceof fe&&(t.material.needsUpdate=!0,t.frustumCulled=!1,t.material.needsUpdate=!0,t.material.envMapIntensity=3)})},A=new K({color:new M("#000000"),transparent:!0,opacity:l.sphereOpacity,side:V}),xe=new S(new Z(100,32,32),A);u.add(xe);let x;const _=new D,f=new D,be=new $;be.load("./model.glb",t=>{x=t.scene,x.scale.set(2,2,2),f.add(x),f.position.y=-2.6,_.add(f),u.add(_),ye()});const d=new J(65,n.width/n.height,.01,1e3);d.position.x=0;d.position.y=0;d.position.z=1;const a=new ee({canvas:document.querySelector("#bg"),antialias:!0});a.shadowMap.enabled=!0;a.shadowMap.type=te;a.physicallyCorrectLights=!0;a.outputEncoding=F;a.toneMapping=se;a.toneMappingExposure=1.5;let L=null;a.getPixelRatio()===1&&a.capabilities.isWebGL2?(L=he,console.log("Using WebGLMultisampleRenderTarget")):(L=pe,console.log("Using WebGLRenderTarget"));const Me=new L(800,600,{minFilter:G,magFilter:G,format:oe,encoding:F}),h=new ae(a,Me);h.setPixelRatio(Math.min(window.devicePixelRatio,2));h.setSize(n.width,n.height);const Fe=new ie(u,d);h.addPass(Fe);const P=new we;P.goWild=!1;P.enabled=!0;h.addPass(P);const b=new ne(re);b.uniforms.amount.value=.003;b.uniforms.angle.value=3.5;b.enabled=!0;h.addPass(b);if(a.getPixelRatio()===1&&!a.capabilities.isWebGL2){const t=new SMAAPass;h.addPass(t),console.log("Using SMAA")}a.setSize(n.width,n.height);a.setPixelRatio(Math.min(window.devicePixelRatio,2));const B=new le(d,document.querySelector("#bg"));B.enableDamping=!0;const p=new R(16711680,100,10,3);p.position.set(0,-3,.5);p.castShadow=!0;p.shadow.normalBias=.05;p.shadow.mapSize.set(256,256);p.shadow.camera.far=5;const g=new R(16777215,5);g.position.set(-1,5,1);g.castShadow=!0;g.shadow.normalBias=.1;g.shadow.mapSize.set(256,256);g.shadow.camera.far=7;u.add(g);const _e=new de(16777215,.5);u.add(_e);const w=new C("#0000ff",14,20);w.position.set(2,-2,3);const v=new C("#ff0000",14,20);v.position.set(1,-2,3);f.add(v,w,p);new ue(p,1,new M("#0000ff"));new ce(100,100);new T(w,.2);new T(v,.2);function Le(){let e=document.body.getBoundingClientRect().top*-5e-4;e<1.4&&(f.rotation.y=-e,f.position.y=e*.5-2.6),f.position.z=-e*1.2,A.opacity=e*.5,g.intensity=e*20,e>.5&&e<2&&(_.rotation.z=-(e-.5)),e>2&&e<2.5&&(f.rotation.y=+(e-2-1.4))}document.body.onscroll=Le;const Pe=new ge,E=()=>{const t=Pe.getElapsedTime();x&&(x.position.y+=Math.sin(t)*.001);const e=t*.5;w.position.x=Math.cos(e)*5,w.position.z=Math.abs(Math.sin(e))*4-2,w.position.y=Math.sin(e*2)+Math.sin(t*2);const i=t*.32;v.position.x=Math.cos(i)*5,v.position.z=Math.abs(Math.sin(i)*4),v.position.y=Math.sin(i*3)+Math.sin(t*2.5);const c=m.x*.05,s=-m.y*.05;d.position.x=c,d.position.y=s,B.update(),a.render(u,d),h.render(),window.requestAnimationFrame(E)};E();
