import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import * as dat from 'dat.gui'

// force page to start on top
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

// Debug
const gui = new dat.GUI()
const parameters = {}
parameters.topColor = '#0000ff'
parameters.bottomColor = '#ff0000'
parameters.directLightColor = '#ffffff'
parameters.sceneBackground = '#000000'
parameters.modelX = 0
parameters.modelY = 1.2
parameters.modelZ = 1
parameters.cameraNear = 0.01

const scene = new THREE.Scene()
scene.background = new THREE.Color(parameters.sceneBackground)


/**
 * Sizes
 */
 const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>
{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
})

/**
 * Update all materials
 */
 const updateAllMaterials = () =>
 {
     scene.traverse((child) =>
     {
         if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
         {
             child.material.envMapIntensity = 5
             child.material.needsUpdate = true

             // tell to render even if model part is not fitting the camera
             child.frustumCulled = false

             child.castShadow = true
             child.receiveShadow = true
         }
     })
 }

let model
// create model group to combine different transformations on scroll
const modelGroup = new THREE.Group()

const gltfLoader = new GLTFLoader()
gltfLoader.load(
  './assets/model.glb',
  (gltf) =>
  {
      model = gltf.scene
      model.scale.set(2, 2, 2)
      model.position.y = -2.6
      modelGroup.add(model)
      scene.add(modelGroup)

      updateAllMaterials()
  }
)


const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.01, 1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 1

gui.add(parameters, 'cameraNear').min(-10).max(10).step(0.001).onChange((num) => {
  camera.near = num
})
gui.add(parameters, 'modelX').min(-10).max(10).step(0.01).onChange((x) => {
  model.position.x = x
})
gui.add(parameters, 'modelY').min(-10).max(10).step(0.01).onChange((y) => {
  model.position.y = y
})
gui.add(parameters, 'modelZ').min(-10).max(10).step(0.01).onChange((z) => {
  model.position.z = z
})

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Controls
const controls = new OrbitControls(camera, document.querySelector('#bg'))
controls.enableDamping = true

/**
 * Lights
 */
const directLight = new THREE.DirectionalLight(parameters.directLightColor, 5)
directLight.position.y = 2
const hemisphereLight = new THREE.HemisphereLight( parameters.topColor, parameters.bottomColor, 2 );
scene.add( hemisphereLight, directLight );

gui.addColor(parameters, 'directLightColor').onChange((color)=> {
  directLight.color = new THREE.Color(color)
})
gui.addColor(parameters, 'topColor').onChange((color)=> {
  hemisphereLight.color = new THREE.Color(color)
})
gui.addColor(parameters, 'bottomColor').onChange((color)=> {
  hemisphereLight.groundColor = new THREE.Color(color)
})
gui.addColor(parameters, 'sceneBackground').onChange((color)=> {
  scene.background = new THREE.Color(color)
})

/**
 * Helpers
 */
 const directLightHelper = new THREE.DirectionalLightHelper( directLight, 1, new THREE.Color('#0000ff') );
 const gridHelper = new THREE.GridHelper( 100, 100 );
 scene.add( gridHelper, directLightHelper );

 function moveCamera() {
  let startZrotation = false
  const t = document.body.getBoundingClientRect().top;
  let range = t * -0.0005
  console.log(range)

  if (range < 1.4) {
     model.rotation.y = -range;
     // lift litle bit on y axis
     model.position.y = range * 0.5 -2.6
  }
  if (range > 0.5) {
    modelGroup.rotation.z = -(range-0.5)
  }
  
  model.position.z = t * 0.001
  // camera.position.z = t * -0.01;
  // camera.position.x = t * -0.0002;
  // camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

/**
 * Animate
 */
 const clock = new THREE.Clock()

 const tick = () =>
 {
     const elapsedTime = clock.getElapsedTime()
 
     // Update controls
     controls.update()
 
     // Render
     renderer.render(scene, camera)
 
     // Call tick again on the next frame
     window.requestAnimationFrame(tick)
 }
 
 tick()