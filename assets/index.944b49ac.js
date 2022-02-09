import{P as j,U as z,S as H,F as I,L as O,M as r,D as k,R as X,a as q,G as N,b as Q,C as M,c as Y,s as F,d as K,e as V,f as S,g as Z,h as D,i as $,j as J,W as ee,k as te,l as se,m as G,n as oe,E as ie,o as ae,p as ne,q as re,O as le,r as R,A as de,t as C,u as ue,v as ce,w as T,x as fe,y as he,z as pe,B as ge}from"./vendor.977a9e5b.js";const me=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const v of o.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&c(v)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}};me();const U={uniforms:{tDiffuse:{value:null},tDisp:{value:null},byp:{value:0},amount:{value:0},angle:{value:0},seed:{value:0},seed_x:{value:0},seed_y:{value:0},distortion_x:{value:0},distortion_y:{value:0},col_s:{value:0}},vertexShader:`

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
		}`};class ve extends j{constructor(e=64){super();U===void 0&&console.error("THREE.GlitchPass relies on DigitalGlitch");const a=U;this.uniforms=z.clone(a.uniforms),this.uniforms.tDisp.value=this.generateHeightmap(e),this.material=new H({uniforms:this.uniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.fsQuad=new I(this.material),this.goWild=!1,this.curF=0,this.generateTrigger()}render(e,a,c){e.capabilities.isWebGL2===!1&&(this.uniforms.tDisp.value.format=O),this.uniforms.tDiffuse.value=c.texture,this.uniforms.seed.value=Math.random(),this.uniforms.byp.value=0,this.curF%this.randX==0||this.goWild==!0?(this.uniforms.amount.value=Math.random()/30,this.uniforms.angle.value=r.randFloat(-Math.PI,Math.PI),this.uniforms.seed_x.value=r.randFloat(-.1,.1),this.uniforms.seed_y.value=r.randFloat(-.1,.1),this.uniforms.distortion_x.value=r.randFloat(0,.1),this.uniforms.distortion_y.value=r.randFloat(0,.1),this.curF=0,this.generateTrigger(),this.curF++):this.curF%this.randX<this.randX/5?(this.uniforms.amount.value=Math.random()/90,this.uniforms.angle.value=r.randFloat(-Math.PI,Math.PI),this.uniforms.distortion_x.value=r.randFloat(0,.1),this.uniforms.distortion_y.value=r.randFloat(0,.1),this.uniforms.seed_x.value=r.randFloat(-.1,.1),this.uniforms.seed_y.value=r.randFloat(-.1,.1),this.curF++):this.goWild==!1&&(this.curF+=.6,this.uniforms.byp.value=5),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(a),this.clear&&e.clear(),this.fsQuad.render(e))}generateTrigger(){this.randX=r.randInt(120,240)}generateHeightmap(e){const a=new Float32Array(e*e),c=e*e;for(let o=0;o<c;o++){const v=r.randFloat(0,1);a[o]=v}const s=new k(a,e,e,X,q);return s.needsUpdate=!0,s}}window.onbeforeunload=function(){window.scrollTo(0,0)};const p={};p.x=0;p.y=0;window.addEventListener("mousemove",t=>{p.x=t.clientX/n.width-.5,p.y=t.clientY/n.height-.5});new N;const l={};l.topColor="#0000ff";l.bottomColor="#ff0000";l.directLightColor="#ff0000";l.sceneBackground="#a20000";l.modelX=0;l.modelY=1.2;l.modelZ=1;l.cameraNear=.01;l.sphereOpacity=0;const u=new Q;u.background=new M(l.sceneBackground);const n={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{n.width=window.innerWidth,n.height=window.innerHeight,d.aspect=n.width/n.height,d.updateProjectionMatrix(),i.setSize(n.width,n.height)});const we=new Y,W=we.load(["./posx.jpg","./negx.jpg","./posy.jpg","./negy.jpg","./posz.jpg","./negz.jpg"]);W.encoding=F;u.environment=W;const ye=()=>{u.traverse(t=>{t instanceof S&&t.material instanceof fe&&(t.material.needsUpdate=!0,t.frustumCulled=!1,t.castShadow=!0,t.receiveShadow=!0,t.material.needsUpdate=!0,t.material.envMapIntensity=3)})},A=new K({color:new M("#000000"),transparent:!0,opacity:l.sphereOpacity,side:V}),xe=new S(new Z(100,32,32),A);u.add(xe);let w;const _=new D,f=new D,be=new $;be.load("./model.glb",t=>{w=t.scene,w.scale.set(2,2,2),f.add(w),f.position.y=-2.6,_.add(f),u.add(_),ye()});const d=new J(65,n.width/n.height,.01,1e3);d.position.x=0;d.position.y=0;d.position.z=1;const i=new ee({canvas:document.querySelector("#bg"),antialias:!0});i.shadowMap.enabled=!0;i.shadowMap.type=te;i.physicallyCorrectLights=!0;i.outputEncoding=F;i.toneMapping=se;i.toneMappingExposure=1.5;let L=null;i.getPixelRatio()===1&&i.capabilities.isWebGL2?(L=he,console.log("Using WebGLMultisampleRenderTarget")):(L=pe,console.log("Using WebGLRenderTarget"));const Me=new L(800,600,{minFilter:G,magFilter:G,format:oe,encoding:F}),h=new ie(i,Me);h.setPixelRatio(Math.min(window.devicePixelRatio,2));h.setSize(n.width,n.height);const Fe=new ae(u,d);h.addPass(Fe);const P=new ve;P.goWild=!1;P.enabled=!0;h.addPass(P);const b=new ne(re);b.uniforms.amount.value=.003;b.uniforms.angle.value=3.5;b.enabled=!0;h.addPass(b);if(i.getPixelRatio()===1&&!i.capabilities.isWebGL2){const t=new SMAAPass;h.addPass(t),console.log("Using SMAA")}i.setSize(n.width,n.height);i.setPixelRatio(Math.min(window.devicePixelRatio,2));const B=new le(d,document.querySelector("#bg"));B.enableDamping=!0;const y=new R(16711680,100,10,3);y.position.set(0,-3,.5);y.castShadow=!0;y.shadow.normalBias=.05;const x=new R(16777215,5);x.position.set(-1,5,1);x.castShadow=!0;x.shadow.normalBias=.1;u.add(x);const _e=new de(16777215,.5);u.add(_e);const g=new C("#0000ff",14,20);g.position.set(2,-2,3);const m=new C("#ff0000",14,20);m.position.set(1,-2,3);f.add(m,g,y);new ue(y,1,new M("#0000ff"));new ce(100,100);new T(g,.2);new T(m,.2);function Le(){let e=document.body.getBoundingClientRect().top*-5e-4;e<1.4&&(f.rotation.y=-e,f.position.y=e*.5-2.6),f.position.z=-e*1.2,A.opacity=e*.5,x.intensity=e*20,e>.5&&e<2&&(_.rotation.z=-(e-.5)),e>2&&e<2.5&&(f.rotation.y=+(e-2-1.4))}document.body.onscroll=Le;const Pe=new ge,E=()=>{const t=Pe.getElapsedTime();w&&(w.position.y+=Math.sin(t)*.001);const e=t*.5;g.position.x=Math.cos(e)*5,g.position.z=Math.abs(Math.sin(e))*4-2,g.position.y=Math.sin(e*2)+Math.sin(t*2);const a=t*.32;m.position.x=Math.cos(a)*5,m.position.z=Math.abs(Math.sin(a)*4),m.position.y=Math.sin(a*3)+Math.sin(t*2.5);const c=p.x*.05,s=-p.y*.05;d.position.x=c,d.position.y=s,B.update(),i.render(u,d),h.render(),window.requestAnimationFrame(E)};E();
