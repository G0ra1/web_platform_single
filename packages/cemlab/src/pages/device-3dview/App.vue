<script lang="ts" setup>
import { NwIcon } from "@platform/main";
import { nextTick, ref, reactive } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NSpace,
  NInput,
  NSelect,
  NInputGroup,
  useDialog,
  NButton,
  NModal,
  NProgress
} from "naive-ui";
import * as THREE from "three"
import type { Material } from "three"

import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { Rhino3dmLoader } from 'three/addons/loaders/3DMLoader.js';
import { TDSLoader } from 'three/addons/loaders/TDSLoader.js';
// 
let camera: THREE.PerspectiveCamera, // 相机
scene: THREE.Scene,  // 场景
renderer: THREE.WebGLRenderer,
stats,
hemiLight,  // 半球形光源
dirLight: THREE.DirectionalLight  // 平行光源
;

// 模型相关
let modObj: any // 模型

// 加载器
const fbxLoader = new FBXLoader();
const rhino3dmLoader = new Rhino3dmLoader();
const tdsLoader = new TDSLoader();



// 鼠标记录点
const mouse = new THREE.Vector2( 1, 1 );
// 射线投射器，用于计算相机到鼠标的射线投影
const raycaster = new THREE.Raycaster();
// 用于fbx内置动画的驱动
const clock = new THREE.Clock();
// 目标
const cameraLookAt = new THREE.Vector3(0, 70, 0)
// 视图容器
const viewerEl = ref<any>()
// loading浮动
const modalVisible = ref<boolean>(true)
const modalPresent = ref<number>(0)

// 控制
const options = reactive<{
  viewMode: 'outside' | 'inside'
}>({
  viewMode: 'outside'
})

const init = () => {
  // 创建透视相机
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
  // 设定相机位置
  camera.position.set( 265, 225, 170 );
  // 设定相机指向位置
  camera.lookAt( cameraLookAt.x, cameraLookAt.y, cameraLookAt.z );
  // 创建场景
  scene = new THREE.Scene();
  // 设置背景色
	scene.background = new THREE.Color( 0xffffff );
  // 创建半球形光源
  hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff );
  hemiLight.intensity = 1.3;
  hemiLight.position.set( 0, 125, 0 );
  scene.add( hemiLight );
  // 创建平行光源
  dirLight = new THREE.DirectionalLight( 0xffffff );
  dirLight.intensity = .2;
  dirLight.position.set( camera.position.x, camera.position.y, camera.position.z  );
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 10;
  dirLight.shadow.camera.bottom = - 10;
  dirLight.shadow.camera.left = - 10;
  dirLight.shadow.camera.right = 10;
  console.log('dirLight=', dirLight)
  scene.add( dirLight );

  //
  // 地面
  const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 10, 10 ), new THREE.MeshPhongMaterial( { color: 0x333333, depthWrite: false } ) );
  mesh.rotation.x = - Math.PI / 2;
  mesh.receiveShadow = true;
  // scene.add( mesh );
  // 网格
  const grid = new THREE.GridHelper( 200, 20, 0x000000, 0x000000 );
  // console.log('grid.material', grid.material);

  (grid.material as Material).opacity = 0.2;
  (grid.material as Material).transparent = true;
  scene.add( grid );
  loadMod();
  
  
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  viewerEl.value.appendChild( renderer.domElement );

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.target.set( cameraLookAt.x, cameraLookAt.y, cameraLookAt.z );
  controls.update();

  window.addEventListener( 'resize', function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  });

  document.addEventListener( 'mousemove', function ( event: any ) {

  event.preventDefault();

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  });
  // stats
  stats = new Stats();
  // container.appendChild( stats.dom );
}

// 加载模型
const loadMod = () => {
  // rhino3dmLoader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@7.11.1/' );
  // rhino3dmLoader.load( '/web-cemlab/models/3dm/Rhino_Logo.3dm', function ( object: any ) {
  //   console.log('----3dm----', object);
  //     scene.add( object );
  // tdsLoader.load( '/web-cemlab/models/3ds/device1.3ds', function ( object: any ) {

  // // object.traverse( function ( child ) {

  // //   if ( child.isMesh ) {

  // //     child.material.specular.setScalar( 0.1 );
  // //     child.material.normalMap = normal;

  // //   }

  // // } );

  // scene.add( object );

  // } );

  // // });
  // return 
  // '/web-cemlab/models/fbx/SampleKit.fbx'
  // 临时用贴图映射
  const materialMap: any = {
    "机体": "机体1",
    "十字把": "十字把",
    "面板露丝": "面板螺丝",
    "内部": "内部",
    "管路": "管道",
    "把手光泽金属": "把手",
    "材质.005": "前后门",
    "标签2.001": "IMG_3310-1",
    "材质.002": "IMG_3310-1",
    "表1.001": "IMG_3310-1",
  }
  fbxLoader.load( '/web-cemlab/models/device1/index.fbx', function ( object: any ) {
    modalVisible.value = false
    console.log('--------', object);
    modObj = object
    object.position.set(10, 54, -19)
    // var jiti = new THREE.TextureLoader().load('/web-cemlab/models/device1/机体1.png');
    // object.children[0].material.map = jiti
    // object.traverse(function (item: any) {

    //   if(item instanceof THREE.Mesh){
        
    //     // console.log('====Mesh=material==', item.material)
    //     // if (materialMap[item.material.name]) {
    //     //   item.material.map = new THREE.TextureLoader().load(`/web-cemlab/models/device1/${materialMap[item.material.name]}.jpg`);
    //     // } else {
    //     //   // item.material.map = new THREE.TextureLoader().load(`/web-cemlab/models/device1/机体1.jpg`);
    //     // }
    //   } else if (item instanceof THREE.PointLight) {
    //     item.visible = false
    //   }
        
    // });

    


    // object.children.forEach((d: any) => {
    //   if (d.isLight) {
    //     d.visible = false
    //   }
      
    // })
    // object.children[0].visible = false
    // object.children[1].visible = false
    // object.children[2].visible = false
    // object.children[3].visible = false
    // object.children[4].visible = false
    // object.children[5].visible = false
    // // object.children[6].visible = false
    // object.children[7].visible = false // 前门
    // object.children[8].visible = false // 把手
    // object.children[9].visible = false
    // object.children[11].visible = false
    // object.children[12].visible = false
    // object.children[14].visible = false
    // object.children[15].visible = false
    // object.children[0].material.opacity = 1
    // object.children[0].material.transparent = true
    // object.children[0].material.color.b = 0
      // object.children[4].position.set(1.4, 0, 1.2)

      // modSkin = object.children[4].children[8]
      // console.log('====modSkin====', modSkin)
      // // modSkin.material= new THREE.MeshBasicMaterial( { wireframe: true, color: 0x00ff00 } ); // 结构材质
      // modSkin.material = object.children[1].children[0].material
      // modSkin.material.opacity = 1
      // modSkin.material.transparent = true
      // modSkin.material.color.b = 0
      
      // object.children = [object.children[4]]
      // object.scale.multiplyScalar(1);  

      scene.add( object );

    }, (xhr: any) => {
      modalPresent.value = Math.floor(xhr.loaded / xhr.total * 100)
      
      // // jindu_text.innerText = _onProgress + '%';

      // // jindu.style.width = _onProgress + '%'

      // if (_onProgress == 100) {

      //     // jindu_text_con.style.display = 'none'

      // }

    } )
}

// 动画帧
const runAnimate = () => {
  requestAnimationFrame(runAnimate);
  // 设置外壳透明度
  setOption()
  
  dirLight.position.set( camera.position.x, camera.position.y, camera.position.z  );
  // 渲染
  renderer.render( scene, camera );
}

// 
const setOption = () => {
  if (!modObj) {
    return;
  }
  if (options.viewMode === 'inside') {
    modObj.children[4].visible = false // 背板隐藏
    modObj.children[1].visible = false // 把手
    modObj.children[3].visible = false // 柜门
  } else {
    modObj.children[4].visible = true // 背板隐藏
    modObj.children[1].visible = true // 把手
    modObj.children[3].visible = true // 柜门
  }
}


nextTick().then(() => {
  // console.log('-=-=', viewerEl.value.appendChild)
  init()
  runAnimate()
})
// console.log(THREE, Stats, OrbitControls, FBXLoader)
</script>
<template>
  <div class="wrapper">
    <div ref="viewerEl"></div>
    <div class="layer-r">
      <div class="control-mod"
      @click="() => {
            options.viewMode = options.viewMode === 'outside' ? 'inside' : 'outside'
          }"
      >
          <nw-icon :name="options.viewMode === 'outside' ? 'icon-n-y-cube1' : 'icon-n-y-cube2'" :size="24"/>
          <div class="text">{{ options.viewMode === 'outside' ? '外部' : '内部' }}</div>
      </div>
    </div>

  </div>
  <n-modal v-model:show="modalVisible">
  <div class="loading-modal">
    <div class="header">
      加载模型中 ({{ modalPresent }}%)
    </div>
    <div class="content" >
      <n-progress
        type="line"
        :show-indicator="false"
        :height="24"
        :border-radius="4"
        :percentage="modalPresent"
        processing
      />
    </div>
  </div>
  </n-modal>
  <!-- 这里需要loading -->
</template>
<style lang="less">
.wrapper {
  position: relative;
  .layer-r {
    position: absolute;
    right: 0px;
    top: 0px;
    >.control-mod {
      display: flex;
      align-items: center;
      width: 60px;
      padding: 5px;
      cursor: pointer;
      >.text {
        padding-left: 5px;
      }
    }
  }
}
.loading-modal {
  width: 300px;
  background: #fff;
  padding: 10px;
  >.header {
    padding-bottom: 5px;
  }
  >.content {
    display: flex;
    align-items: center;
  }
}

</style>