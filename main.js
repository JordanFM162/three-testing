import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 }, );
// const material = new THREE.MeshPhongMaterial( {
//     color: 0xffffff,
//     flatShading: true,
//     vertexColors: true,
//     shininess: 0
// } );
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( {color: 0x00ff00}, );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// const sphere = new THREE.Mesh(
//     new THREE.CapsuleGeometry(2, 0, 25, 25),
//     new THREE.MeshDepthMaterial( {color : 0x00ff00})
// );

// const pointLight = new THREE.PointLight( 0xff0000 , 100, 0, 2);
// pointLight.position.set( 10, 10, 10 );
// scene.add( pointLight );

const light = new THREE.PointLight( 0xffffff, 1000, 0, 2);
light.position.set( 0, 0, 0 );
// scene.add( light );

const ambientLight = new THREE.AmbientLight("rgb(255, 255, 255)", 0.5);
scene.add(ambientLight);

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
scene.add( pointLightHelper );

const standardMesh = new THREE.MeshStandardMaterial( {color: 0x00aa00} );
const litStandardMesh = new THREE.MeshStandardMaterial( {color: 0x00aa00, emissive: 0x00aa00} );
const geometry = new THREE.SphereGeometry( 5, 32, 16 ); 
const sphere1 = new THREE.Mesh(geometry, litStandardMesh);
sphere1.name = "sphere1";
// scene.add( sphere1 );
const sphere2 = new THREE.Mesh( geometry, standardMesh );
sphere2.name = "sphere2";
// scene.add( sphere2 );
const sphere3 = new THREE.Mesh( geometry, standardMesh );
sphere3.name = "sphere3";
// scene.add( sphere3 );
const sphere4 = new THREE.Mesh( geometry, standardMesh );
sphere4.name = "sphere4";
// scene.add( sphere4 );

// const sphere5 = new THREE.Mesh( geometry, material );
// scene.add( sphere5 );
// const sphere6 = new THREE.Mesh( geometry, material );
// scene.add( sphere6 );

var pivot = new THREE.Object3D();
pivot.position.set( 0, 0, 0);
pivot.add( sphere1 );
pivot.add( sphere2 );
pivot.add( sphere3 );
pivot.add( sphere4 );

sphere1.position.x = 0;
sphere1.position.y = 20;

sphere2.position.x = 20;
sphere2.position.y = 0;

sphere3.position.x = 0;
sphere3.position.y = -20;

sphere4.position.x = -20;
sphere4.position.y = 0;

var pivot1 = pivot.clone();
pivot1.rotation.z = -0.8;
pivot1.getObjectByName(sphere1.name).material = standardMesh
pivot.add(pivot1);

sphere1.add( light );
scene.add( pivot );
// scene.add( pivot1 );

// console.log(pivot);
// console.log(pivot1);

// sphere5.position.x = 40;
// sphere5.position.y = 40;

// sphere6.position.x = 40;
// sphere6.position.y = 40;

// camera.position.z = 50;
camera.position.set( 0, 0, 50);

// function animate() {
// 	requestAnimationFrame( animate );
//     // sphere.rotation.x += 0.01;
//     // sphere.rotation.y += 0.01;
//     pivot.rotation.z += 0.01;
//     // camera.rotation.z += 0.01;
//     // camera.translateX(0.1);
// 	renderer.render( scene, camera );
// }
// animate();

let frameCount = 0;
let animationStep = 0;
let sphereNumber = 8;

function moveLight(rotationAngle) {
    let lightSection = (2 * Math.PI) / sphereNumber;
    let currentCase = 0;

    if (currentCase != 1 && (rotationAngle <= lightSection || rotationAngle > (2 * Math.PI) - 0.01)) { // needs to change back at end
        // pivot1.getObjectByName(sphere4.name).remove(light);
        pivot1.getObjectByName(sphere4.name).material = standardMesh;
        pivot.getObjectByName(sphere1.name).add(light);
        pivot.getObjectByName(sphere1.name).material = litStandardMesh;
        currentCase = 1;
    } else if (currentCase != 2 && rotationAngle <= lightSection * 2) {
        // pivot.getObjectByName(sphere1.name).remove(light);
        pivot.getObjectByName(sphere1.name).material = standardMesh;
        pivot1.getObjectByName(sphere1.name).add(light);
        pivot1.getObjectByName(sphere1.name).material = litStandardMesh;
        currentCase = 2;
    } else if (currentCase != 3 && rotationAngle <= lightSection * 3) {
        // pivot1.getObjectByName(sphere1.name).remove(light);
        pivot1.getObjectByName(sphere1.name).material = standardMesh;
        pivot.getObjectByName(sphere2.name).add(light);
        pivot.getObjectByName(sphere2.name).material = litStandardMesh;
        currentCase = 3;
    } else if (currentCase != 4 && rotationAngle <= lightSection * 4) {
        // pivot.getObjectByName(sphere2.name).remove(light);
        pivot.getObjectByName(sphere2.name).material = standardMesh;
        pivot1.getObjectByName(sphere2.name).add(light);
        pivot1.getObjectByName(sphere2.name).material = litStandardMesh;
        currentCase = 4;
    } else if (currentCase != 5 && rotationAngle <= lightSection * 5) {
        // pivot1.getObjectByName(sphere2.name).remove(light);
        pivot1.getObjectByName(sphere2.name).material = standardMesh;
        pivot.getObjectByName(sphere3.name).add(light);
        pivot.getObjectByName(sphere3.name).material = litStandardMesh;
        currentCase = 5;
    } else if (currentCase != 6 && rotationAngle <= lightSection * 6) {
        // pivot.getObjectByName(sphere3.name).remove(light);
        pivot.getObjectByName(sphere3.name).material = standardMesh;
        pivot1.getObjectByName(sphere3.name).add(light);
        pivot1.getObjectByName(sphere3.name).material = litStandardMesh;
        currentCase = 6;
    } else if (currentCase != 7 && rotationAngle <= lightSection * 7) {
        // pivot1.getObjectByName(sphere3.name).remove(light);
        pivot1.getObjectByName(sphere3.name).material = standardMesh;
        pivot.getObjectByName(sphere4.name).add(light);
        pivot.getObjectByName(sphere4.name).material = litStandardMesh;
        currentCase = 7;
    } else if (currentCase != 8 && rotationAngle <= lightSection * 8) {
        // pivot.getObjectByName(sphere4.name).remove(light);
        pivot.getObjectByName(sphere4.name).material = standardMesh;
        pivot1.getObjectByName(sphere4.name).add(light);
        pivot1.getObjectByName(sphere4.name).material = litStandardMesh;
        currentCase = 8;
    }
}

function calculateRotationSpeed(numberOfRotations, framesPerSecond, frameCount) {
    const rotationSpeed = (2 * Math.PI) / framesPerSecond / 5 * numberOfRotations; // Rotate 360 degrees over the duration
    const rotationAngle = rotationSpeed * frameCount;
    pivot.rotation.z = rotationAngle;
    moveLight(rotationAngle);
    return (rotationSpeed * frameCount);
}

function animateRotation() {
    const framesPerSecond = 60; // Adjust as needed
    const animationDuration = 5 * framesPerSecond; // in seconds
    const progress = Math.min(frameCount / animationDuration, 1);
    const numberOfRotations = 1;
    frameCount++;

    if (animationStep <= totalLoops * 3 - 1) {
        pivot.rotation.z = calculateRotationSpeed(numberOfRotations, framesPerSecond, frameCount);
    
        renderer.render( scene, camera );
    }

    if (frameCount < animationDuration) {
    // Continue the animation until the specified frame count is reached
    requestAnimationFrame(animateRotation);
    } else {
        frameCount = 0;
        console.log("animationStep: ", animationStep);

        if (animationStep <= totalLoops * 3 - 1) {
            animationStep += 1;
            requestAnimationFrame(animateRotateZoom);
        } else {
            console.log("complete animation");
        }
    }
}

function animateRotateZoom() {
    const framesPerSecond = 60; // Adjust as needed
    const animationDuration = 5 * framesPerSecond; // in seconds
    const progress = Math.min(frameCount / animationDuration, 1);
    const numberOfRotations = 1;
    frameCount++;

    pivot.rotation.z = calculateRotationSpeed(numberOfRotations, framesPerSecond, frameCount);

    pivot.position.z += 0.2 * frameCount/60;

    renderer.render( scene, camera );

    if (frameCount < animationDuration) {
    // Continue the animation until the specified frame count is reached
    requestAnimationFrame(animateRotateZoom);
    } else {
        frameCount = 0;
        console.log(animationStep);
        animationStep += 1;
        requestAnimationFrame(animateRotateShrink);
    }
}

function animateRotateShrink() {
    const framesPerSecond = 60; // Adjust as needed
    const animationDuration = 5 * framesPerSecond; // in seconds
    const progress = Math.min(frameCount / animationDuration, 1);
    const numberOfRotations = 1;
    frameCount++;

    pivot.rotation.z = calculateRotationSpeed(numberOfRotations, framesPerSecond, frameCount);

    pivot.position.z -= 0.2 * (animationDuration - frameCount) / 60;

    renderer.render( scene, camera );

    if (frameCount < animationDuration) {
    // Continue the animation until the specified frame count is reached
    requestAnimationFrame(animateRotateShrink);
    } else {
        frameCount = 0;
        console.log(animationStep);
        animationStep += 1;
        requestAnimationFrame(animateRotation);
    }
}

// // Add event listeners for mouseover and mouseout directly on the sphere
// console.log("mouseover target: ", pivot.getObjectByName(sphere1.name));
// pivot.getObjectByName(sphere1.name).addEventListener('mouseover', () => {
//     console.log("triggered");
// });

// Generate initial scene
renderer.render( scene, camera );

// Start the animation
animationStep = 1;
const totalLoops = 1;
animateRotation();

// mouse hover effects
const raycaster = new THREE.Raycaster();
const mouseVector = new THREE.Vector2();
let isHovered = false;

document.addEventListener('mousemove', (event) => {
  mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouseVector, camera);

  const intersects = raycaster.intersectObject(light.parent);
  
  if (intersects.length > 0) {
    if (!isHovered) {
      // Mouse has entered the object
      isHovered = true;
      console.log("Mouse entered object:", intersects[0].object);
    //   console.log("triggered");
    //   hoverEffect();
    }
  } else {
    if (isHovered) {
      // Mouse has left the object
      isHovered = false;
      console.log("Mouse left object");
    //   console.log("triggered");
    }
  }
});

let lowering = false
function hoverEffect() {
    if (isHovered) {
        // pivot.rotation.z += 0.02;
        if (light.intensity <= 100) {
            lowering = false;
        } else if (light.intensity >= 1000) {
            lowering = true
        }
        if (lowering == true) {
            light.intensity -= 20;
            // console.log("lowering light intensity: ", light.intensity);
            // light.parent.material.emissiveIntensity -= 0.1;
            light.parent.material.emissiveIntensity = Math.max(light.parent.material.emissiveIntensity - 0.01, 0.5);
        } else if (lowering == false) {
            light.intensity += 20;
            // console.log("raising light intensity: ", light.intensity);
            // light.parent.material.emissiveIntensity += 0.1;
            light.parent.material.emissiveIntensity = Math.min(light.parent.material.emissiveIntensity + 0.01, 1);
        }
        renderer.render( scene, camera );
        // requestAnimationFrame(hoverEffect);
    } else if  (light.intensity < 1000) {
        light.intensity += 20;
        // console.log("raising light intensity: ", light.intensity);
        light.parent.material.emissiveIntensity = Math.min(light.parent.material.emissiveIntensity + 0.01, 1);
        renderer.render( scene, camera );
        // requestAnimationFrame(hoverEffect);
    }

    requestAnimationFrame(hoverEffect);
}

hoverEffect();








// import * as THREE from 'three';

// let container;

// let camera, scene, renderer;

// let mouseX = 0, mouseY = 0;

// let windowHalfX = window.innerWidth / 2;
// let windowHalfY = window.innerHeight / 2;

// init();
// animate();

// function init() {

//     container = document.getElementById( 'container' );

//     camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 10000 );
//     camera.position.z = 1800;

//     scene = new THREE.Scene();
//     scene.background = new THREE.Color( 0xffffff );

//     const light = new THREE.DirectionalLight( 0xffffff, 3 );
//     light.position.set( 0, 0, 1 );
//     scene.add( light );

//     // shadow

//     const canvas = document.createElement( 'canvas' );
//     canvas.width = 128;
//     canvas.height = 128;

//     const context = canvas.getContext( '2d' );
//     const gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );


//     const shadowTexture = new THREE.CanvasTexture( canvas );

//     const shadowMaterial = new THREE.MeshBasicMaterial( { map: shadowTexture } );
//     const shadowGeo = new THREE.PlaneGeometry( 300, 300, 1, 1 );

//     let shadowMesh;

//     shadowMesh = new THREE.Mesh( shadowGeo, shadowMaterial );
//     shadowMesh.position.y = - 250;
//     shadowMesh.rotation.x = - Math.PI / 2;
//     scene.add( shadowMesh );

//     shadowMesh = new THREE.Mesh( shadowGeo, shadowMaterial );
//     shadowMesh.position.y = - 250;
//     shadowMesh.position.x = - 400;
//     shadowMesh.rotation.x = - Math.PI / 2;
//     scene.add( shadowMesh );

//     shadowMesh = new THREE.Mesh( shadowGeo, shadowMaterial );
//     shadowMesh.position.y = - 250;
//     shadowMesh.position.x = 400;
//     shadowMesh.rotation.x = - Math.PI / 2;
//     scene.add( shadowMesh );

//     const radius = 200;

//     const geometry1 = new THREE.IcosahedronGeometry( radius, 1 );

//     const count = geometry1.attributes.position.count;
//     geometry1.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( count * 3 ), 3 ) );

//     const geometry2 = geometry1.clone();
//     const geometry3 = geometry1.clone();

//     const color = new THREE.Color();
//     const positions1 = geometry1.attributes.position;
//     const positions2 = geometry2.attributes.position;
//     const positions3 = geometry3.attributes.position;
//     const colors1 = geometry1.attributes.color;
//     const colors2 = geometry2.attributes.color;
//     const colors3 = geometry3.attributes.color;

//     for ( let i = 0; i < count; i ++ ) {

//         color.setHSL( ( positions1.getY( i ) / radius + 1 ) / 2, 1.0, 0.5, THREE.SRGBColorSpace );
//         colors1.setXYZ( i, color.r, color.g, color.b );

//         color.setHSL( 0, ( positions2.getY( i ) / radius + 1 ) / 2, 0.5, THREE.SRGBColorSpace );
//         colors2.setXYZ( i, color.r, color.g, color.b );

//         color.setRGB( 1, 0.8 - ( positions3.getY( i ) / radius + 1 ) / 2, 0, THREE.SRGBColorSpace );
//         colors3.setXYZ( i, color.r, color.g, color.b );

//     }

//     const material = new THREE.MeshPhongMaterial( {
//         color: 0xffffff,
//         flatShading: true,
//         vertexColors: true,
//         shininess: 0
//     } );

//     const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } );

//     let mesh = new THREE.Mesh( geometry1, material );
//     let wireframe = new THREE.Mesh( geometry1, wireframeMaterial );
//     mesh.add( wireframe );
//     mesh.position.x = - 400;
//     mesh.rotation.x = - 1.87;
//     scene.add( mesh );

//     mesh = new THREE.Mesh( geometry2, material );
//     wireframe = new THREE.Mesh( geometry2, wireframeMaterial );
//     mesh.add( wireframe );
//     mesh.position.x = 400;
//     scene.add( mesh );

//     mesh = new THREE.Mesh( geometry3, material );
//     wireframe = new THREE.Mesh( geometry3, wireframeMaterial );
//     mesh.add( wireframe );
//     scene.add( mesh );

//     renderer = new THREE.WebGLRenderer( { antialias: true } );
//     renderer.setPixelRatio( window.devicePixelRatio );
//     renderer.setSize( window.innerWidth, window.innerHeight );
//     container.appendChild( renderer.domElement );


//     document.addEventListener( 'mousemove', onDocumentMouseMove );

//     //

//     window.addEventListener( 'resize', onWindowResize );

// }

// function onWindowResize() {

//     windowHalfX = window.innerWidth / 2;
//     windowHalfY = window.innerHeight / 2;

//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     renderer.setSize( window.innerWidth, window.innerHeight );

// }

// function onDocumentMouseMove( event ) {

//     mouseX = ( event.clientX - windowHalfX );
//     mouseY = ( event.clientY - windowHalfY );

// }

// //

// function animate() {

//     requestAnimationFrame( animate );

//     render();

// }

// function render() {

//     camera.position.x += ( mouseX - camera.position.x ) * 0.05;
//     camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

//     camera.lookAt( scene.position );

//     renderer.render( scene, camera );

// }