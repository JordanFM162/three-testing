import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.PointLight( 0xffffff, 1000, 0, 2);
light.position.set( 0, 0, 0 );
// scene.add( light );

const ambientLight = new THREE.AmbientLight("rgb(180, 236, 119)", 0.5);
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
    // let currentCase = 0;

    if ((rotationAngle <= lightSection || rotationAngle > (2 * Math.PI) - 0.01)) { // needs to change back at end
        // pivot1.getObjectByName(sphere4.name).remove(light);
        pivot1.getObjectByName(sphere4.name).material = standardMesh;
        pivot.getObjectByName(sphere1.name).add(light);
        pivot.getObjectByName(sphere1.name).material = litStandardMesh;
        // currentCase = 1;
    } else if (rotationAngle <= lightSection * 2) {
        // pivot.getObjectByName(sphere1.name).remove(light);
        pivot.getObjectByName(sphere1.name).material = standardMesh;
        pivot1.getObjectByName(sphere1.name).add(light);
        pivot1.getObjectByName(sphere1.name).material = litStandardMesh;
        // currentCase = 2;
    } else if (rotationAngle <= lightSection * 3) {
        // pivot1.getObjectByName(sphere1.name).remove(light);
        pivot1.getObjectByName(sphere1.name).material = standardMesh;
        pivot.getObjectByName(sphere2.name).add(light);
        pivot.getObjectByName(sphere2.name).material = litStandardMesh;
        // currentCase = 3;
    } else if (rotationAngle <= lightSection * 4) {
        // pivot.getObjectByName(sphere2.name).remove(light);
        pivot.getObjectByName(sphere2.name).material = standardMesh;
        pivot1.getObjectByName(sphere2.name).add(light);
        pivot1.getObjectByName(sphere2.name).material = litStandardMesh;
        // currentCase = 4;
    } else if (rotationAngle <= lightSection * 5) {
        // pivot1.getObjectByName(sphere2.name).remove(light);
        pivot1.getObjectByName(sphere2.name).material = standardMesh;
        pivot.getObjectByName(sphere3.name).add(light);
        pivot.getObjectByName(sphere3.name).material = litStandardMesh;
        // currentCase = 5;
    } else if (rotationAngle <= lightSection * 6) {
        // pivot.getObjectByName(sphere3.name).remove(light);
        pivot.getObjectByName(sphere3.name).material = standardMesh;
        pivot1.getObjectByName(sphere3.name).add(light);
        pivot1.getObjectByName(sphere3.name).material = litStandardMesh;
        // currentCase = 6;
    } else if (rotationAngle <= lightSection * 7) {
        // pivot1.getObjectByName(sphere3.name).remove(light);
        pivot1.getObjectByName(sphere3.name).material = standardMesh;
        pivot.getObjectByName(sphere4.name).add(light);
        pivot.getObjectByName(sphere4.name).material = litStandardMesh;
        // currentCase = 7;
    } else if (rotationAngle <= lightSection * 8) {
        // pivot.getObjectByName(sphere4.name).remove(light);
        pivot.getObjectByName(sphere4.name).material = standardMesh;
        pivot1.getObjectByName(sphere4.name).add(light);
        pivot1.getObjectByName(sphere4.name).material = litStandardMesh;
        // currentCase = 8;
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
    // const progress = Math.min(frameCount / animationDuration, 1);
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

// // mouse hover effects
// const raycaster = new THREE.Raycaster();
// const mouseVector = new THREE.Vector2();
// let isHovered = false;

// document.addEventListener('mousemove', (event) => {
//   mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

//   raycaster.setFromCamera(mouseVector, camera);

//   const intersects = raycaster.intersectObject(light.parent);
  
//   if (intersects.length > 0) {
//     if (!isHovered) {
//       // Mouse has entered the object
//       isHovered = true;
//       console.log("Mouse entered object:", intersects[0].object);
//     //   console.log("triggered");
//     //   hoverEffect();
//     }
//   } else {
//     if (isHovered) {
//       // Mouse has left the object
//       isHovered = false;
//       console.log("Mouse left object");
//     //   console.log("triggered");
//     }
//   }
// });

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

// // Generate initial scene
// renderer.render( scene, camera );

// // Start the animation
// animationStep = 1;
// const totalLoops = 1;
// animateRotation();

// hoverEffect();



/* Gsap animated */
import { gsap } from "gsap";

var tl = gsap.timeline();
var t2 = gsap.timeline();
let gsapSceneColor = new THREE.Color( 0x1A424F )
const gsapScene = new THREE.Scene();
// gsapScene.background({color: gsapSceneColor});
gsapScene.background = gsapSceneColor;
// console.log(gsapScene.background);

const lightableStandardMesh = new THREE.MeshStandardMaterial( {color: 0xB4EC77, emissive: 0xB4EC77, emissiveIntensity: 0} );
const gsapSphere1 = new THREE.Mesh(geometry, lightableStandardMesh.clone());
const gsapSphere2 = new THREE.Mesh(geometry, lightableStandardMesh.clone());
const gsapSphere3 = new THREE.Mesh(geometry, lightableStandardMesh.clone());
const gsapSphere4 = new THREE.Mesh(geometry, lightableStandardMesh.clone());
const gsapSphere5 = new THREE.Mesh(geometry, lightableStandardMesh.clone());
const gsapSphere6 = new THREE.Mesh(geometry, lightableStandardMesh.clone());
const gsapSphere7 = new THREE.Mesh(geometry, lightableStandardMesh.clone());
const gsapSphere8 = new THREE.Mesh(geometry, lightableStandardMesh.clone());
const gsapSphere9 = new THREE.Mesh(geometry, lightableStandardMesh.clone());
const gsapSphere10 = new THREE.Mesh(geometry, lightableStandardMesh.clone());
const gsapSphere11 = new THREE.Mesh(geometry, lightableStandardMesh.clone());
const gsapSphere12 = new THREE.Mesh(geometry, lightableStandardMesh.clone());
const gsapSphere13 = new THREE.Mesh(geometry, lightableStandardMesh.clone());
gsapSphere13.material.emissiveIntensity = 1;
gsapSphere13.add(light);

var distanceFromCenter = 20;

// gsapSphere1.position.set(Math.sin((Math.PI * 2) * (0/8)) * distanceFromCenter, Math.cos((Math.PI * 2) * (0/8)) * distanceFromCenter, 0)
// gsapSphere2.position.set(Math.sin((Math.PI * 2) * (1/8)) * distanceFromCenter, Math.cos((Math.PI * 2) * (1/8)) * distanceFromCenter, 0)
// gsapSphere3.position.set(Math.sin((Math.PI * 2) * (2/8)) * distanceFromCenter, Math.cos((Math.PI * 2) * (2/8)) * distanceFromCenter, 0)
// gsapSphere4.position.set(Math.sin((Math.PI * 2) * (3/8)) * distanceFromCenter, Math.cos((Math.PI * 2) * (3/8)) * distanceFromCenter, 0)
// gsapSphere5.position.set(Math.sin((Math.PI * 2) * (4/8)) * distanceFromCenter, Math.cos((Math.PI * 2) * (4/8)) * distanceFromCenter, 0)
// gsapSphere6.position.set(Math.sin((Math.PI * 2) * (5/8)) * distanceFromCenter, Math.cos((Math.PI * 2) * (5/8)) * distanceFromCenter, 0)
// gsapSphere7.position.set(Math.sin((Math.PI * 2) * (6/8)) * distanceFromCenter, Math.cos((Math.PI * 2) * (6/8)) * distanceFromCenter, 0)
// gsapSphere8.position.set(Math.sin((Math.PI * 2) * (7/8)) * distanceFromCenter, Math.cos((Math.PI * 2) * (7/8)) * distanceFromCenter, 0)

gsapSphere1.position.set(setXFromCenter(13, 0, distanceFromCenter), setYFromCenter(13, 0, distanceFromCenter), 0)

var gsapPivot = new THREE.Object3D();
let gsapSphereArray = [gsapSphere1, gsapSphere2, gsapSphere3, gsapSphere4, gsapSphere5, gsapSphere6, gsapSphere7, gsapSphere8, gsapSphere9, gsapSphere10, gsapSphere11, gsapSphere12, gsapSphere13];
let totalSphereNumber = gsapSphereArray.length;
gsapSphereArray.forEach((gsapSphere, i) => {
    gsapSphere.position.set(setXFromCenter(13, i, distanceFromCenter), setYFromCenter(13, i, distanceFromCenter), 0);
    gsapPivot.add(gsapSphere);
});

// gsapPivot.add( gsapSphere1, gsapSphere2, gsapSphere3, gsapSphere4, gsapSphere5, gsapSphere6, gsapSphere7, gsapSphere8 );

gsapScene.add(gsapPivot);

/* accidentally rotated wrong way */
/*
    tl
        // spheres zoom out
        .from(gsapPivot.position, {duration: 3, z: 40})
        // spheres move from x position to the circle position
        .from(gsapSphere1.position, {duration: 1, x: 15, y: 15})
        .from(gsapSphere7.position, {duration: 1, x: -15, y: 15}, "<")
        .from(gsapSphere6.position, {duration: 1, x: -15, y: -15}, "<")
        .from(gsapSphere4.position, {duration: 1, x: 15, y: -15}, "<")
        .from(gsapSphere2.position, {duration: 1, y: 50}, "<")
        .from(gsapSphere3.position, {duration: 1, y: 50}, "<")
        .from(gsapSphere5.position, {duration: 1, y: -50}, "<")
        .from(gsapSphere8.position, {duration: 1, x: 0, y: 0}, "<")
        // spheres rotate once
        // .to(gsapPivot.rotation, {duration: 10, z: (Math.PI * 2), ease: "none", onUpdate: function() {
        //     gsapSphereArray.forEach((gsapSphere, i) => {
        //         if (
        //             gsapPivot.rotation.z <= Math.PI * 2 / gsapSphereArray.length * (i + 1) &&
        //             gsapPivot.rotation.z >= Math.PI * 2 / gsapSphereArray.length * (i)
        //             ) {
        //             let testLightMoved = light.parent;
        //             gsapSphere.add(light);

        //             if (testLightMoved !== light.parent) {
        //                 light.intensity = 0;
        //                 gsap.to(light, {duration: 10 / 8 / 2, intensity: 1000, ease: "none"})
        //             };

        //             if (light.intensity === 1000 && i !== gsapSphereArray.length - 1) {
        //                 gsap.to(light, {duration: 10 / 8 / 2, intensity: 0, ease: "none"})
        //             };

        //             gsap.to(gsapSphere.material, {duration: 10 / 8 / 2, emissiveIntensity: 1, ease: "none", onComplete: function(){
        //                 if (i !== gsapSphereArray.length - 1) {
        //                     gsap.to(gsapSphere.material, {duration: 10 / 8 / 2, emissiveIntensity: 0, ease: "none"})
        //                 }
        //             }});

        //             if (i === 0) {
        //                 gsap.to(gsapSphereArray[gsapSphereArray.length - 1].material, {duration: 10 / 8 / 2, emissiveIntensity: 0, ease: "none"});
        //             }
        //         };
        //         // gsap.to(gsapSphere.position, {duration: 5, x: Math.sin((Math.PI * 2) * (i/8)) * distanceFromCenter, y: Math.cos((Math.PI * 2) * (i/8)) * distanceFromCenter, repeat: 1, yoyo: true})
        //     })
        // }});
        .to(gsapPivot.rotation, {duration: 10, z: (Math.PI * 2), ease: "none", onStart: function() {
            gsapSphereArray.forEach((gsapSphere, i) => {
                // dim effects
                t2.to(light, {duration: 10 / 8 / 2, intensity: 0, ease: "none"});
                if (i === 0) {
                    t2.to(gsapSphereArray[gsapSphereArray.length - 1].material, {duration: 10 / 8 / 2, emissiveIntensity: 0, ease: "none"}, "<");
                } else {
                    t2.to(gsapSphereArray[i-1].material, {duration: 10 / 8 / 2, emissiveIntensity: 0, ease: "none"}, "<");
                }
                //brighten effects
                t2.to(light, {duration: 10 / 8 / 2, intensity: 1000, ease: "none", onStart: function() {gsapSphere.add(light)}});
                if (i === gsapSphereArray.length - 1) {
                    t2.to(gsapSphereArray[gsapSphereArray.length - 1].material, {duration: 10 / 8 / 2, emissiveIntensity: 1, ease: "none"}, "<");
                } else {
                    t2.to(gsapSphere.material, {duration: 10 / 8 / 2, emissiveIntensity: 1, ease: "none"}, "<");
                }
            })
        }});

    // second rotation where it spins out
    tl.to(gsapPivot.rotation, {duration: 10, z: (Math.PI * 2) * 2, ease: "none"});
    gsapSphereArray.forEach((gsapSphere, i) => {
        tl.to(gsapSphere.position, {duration: 10, x: setXFromCenter(8, i+1, 80 - i*10), y: setYFromCenter(8, i+1, 80 - i*10)}, "<")
    })

    // third rotation where it spins in with less spheres
    let gsapSphereArraySmaller = gsapSphereArray.slice(0, 5);
    let gsapSphereArrayRemainder = gsapSphereArray.slice(5);
    tl.to(gsapPivot.rotation, {duration: 10, z: (Math.PI * 2) * 3, ease: "none"});
    gsapSphereArraySmaller.forEach((gsapSphere, i) => {
        tl.to(gsapSphere.position, {duration: 10, x: setXFromCenter(5, i+1, 10), y: setYFromCenter(5, i+1, 10)}, "<")
    })
    gsapSphereArrayRemainder.forEach((gsapSphere, i) => {
        tl.to(gsapSphere.position, {duration: 10, x: setXFromCenter(8, i+6, 100), y: setYFromCenter(8, i+6, 100)}, "<")
    })
*/

tl
    // spheres zoom out
    .from(gsapPivot.position, {duration: 3, z: 40})
    // spheres move from x position to the circle position
    .from(gsapSphere1.position, {duration: 1, x: 15, y: 15})
    .from(gsapSphere7.position, {duration: 1, x: -15, y: 15}, "<")
    .from(gsapSphere6.position, {duration: 1, x: -15, y: -15}, "<")
    .from(gsapSphere4.position, {duration: 1, x: 15, y: -15}, "<")
    .from(gsapSphere2.position, {duration: 1, y: 50}, "<")
    .from(gsapSphere3.position, {duration: 1, y: 50}, "<")
    .from(gsapSphere5.position, {duration: 1, y: -50}, "<")
    .from(gsapSphere8.position, {duration: 1, x: 0, y: 0}, "<")
    .from(gsapSphere9.position, {duration: 1, x: 50, y: -50}, "<")
    .from(gsapSphere10.position, {duration: 1, x: 50, y: -50}, "<")
    .from(gsapSphere11.position, {duration: 1, x: 50, y: -50}, "<")
    .from(gsapSphere12.position, {duration: 1, x: 50, y: -50}, "<")
    .from(gsapSphere13.position, {duration: 1, x: 50, y: -50}, "<")
    // spheres rotate once
    .to(gsapPivot.rotation, {duration: 10, z: -(Math.PI * 2), ease: "none", onStart: function() {
        gsapSphereArray.forEach((gsapSphere, i) => {
            // dim effects
            t2.to(light, {duration: 10 / totalSphereNumber / 2, intensity: 0, ease: "none"});
            t2.to(gsapSphereArray[gsapSphereArray.length - i - 1].material, {duration: 10 / totalSphereNumber / 2, emissiveIntensity: 0, ease: "none"}, "<");
            //brighten effects
            if (i === gsapSphereArray.length - 1) {
                t2.to(light, {duration: 10 / totalSphereNumber / 2, intensity: 1000, ease: "none", onStart: function() {gsapSphereArray[gsapSphereArray.length - 1].add(light)}});
            } else {
                t2.to(light, {duration: 10 / totalSphereNumber / 2, intensity: 1000, ease: "none", onStart: function() {gsapSphereArray[gsapSphereArray.length - i - 2].add(light)}});
            }
            if (i === gsapSphereArray.length - 1) {
                t2.to(gsapSphereArray[gsapSphereArray.length - 1].material, {duration: 10 / totalSphereNumber / 2, emissiveIntensity: 1, ease: "none"}, "<");
            } else {
                t2.to(gsapSphereArray[gsapSphereArray.length - i - 2].material, {duration: 10 / totalSphereNumber / 2, emissiveIntensity: 1, ease: "none"}, "<");
            }
        })
    }});

// second rotation where it spins out
tl.to(gsapPivot.rotation, {duration: 10, x: -0.5, y: 0.5, z: -(Math.PI * 2) * 2, ease: "none", onStart: function() {
    gsapSphereArray.forEach((gsapSphere, i) => {
        // dim effects
        t2.to(light, {duration: 10 / totalSphereNumber / 2, intensity: 0, ease: "none"});
        t2.to(gsapSphereArray[gsapSphereArray.length - i - 1].material, {duration: 10 / 8 / 2, emissiveIntensity: 0, ease: "none"}, "<");
        //brighten effects
        if (i === gsapSphereArray.length - 1) {
            t2.to(light, {duration: 10 / totalSphereNumber / 2, intensity: 1000, ease: "none", onStart: function() {gsapSphereArray[gsapSphereArray.length - 1].add(light)}});
        } else {
            t2.to(light, {duration: 10 / totalSphereNumber / 2, intensity: 1000, ease: "none", onStart: function() {gsapSphereArray[gsapSphereArray.length - i - 2].add(light)}});
        }
        if (i === gsapSphereArray.length - 1) {
            t2.to(gsapSphereArray[gsapSphereArray.length - 1].material, {duration: 10 / totalSphereNumber / 2, emissiveIntensity: 1, ease: "none"}, "<");
        } else {
            t2.to(gsapSphereArray[gsapSphereArray.length - i - 2].material, {duration: 10 / totalSphereNumber / 2, emissiveIntensity: 1, ease: "none"}, "<");
        }
    })
}});
gsapSphereArray.forEach((gsapSphere, i) => {
    tl.to(gsapSphere.position, {duration: 10, x: setXFromCenter(13, i+1, 130 - i*10), y: setYFromCenter(13, i+1, 130 - i*10)}, "<")
})

// third rotation where it spins in with less spheres
let gsapSphereArraySmaller = gsapSphereArray.slice(totalSphereNumber-6);
let gsapSphereArrayRemainder = gsapSphereArray.slice(0, totalSphereNumber-6);
tl.to(gsapPivot.rotation, {duration: 10, z: -(Math.PI * 2) * 3, ease: "none", onStart: function() {
    gsapSphereArraySmaller.forEach((gsapSphere, i) => {
        // dim effects
        t2.to(light, {duration: 10 / 6 / 2, intensity: 0, ease: "none"});
        t2.to(gsapSphereArraySmaller[gsapSphereArraySmaller.length - i - 1].material, {duration: 10 / 6 / 2, emissiveIntensity: 0, ease: "none"}, "<");
        //brighten effects
        if (i === gsapSphereArraySmaller.length - 1) {
            t2.to(light, {duration: 10 / 6 / 2, intensity: 1000, ease: "none", onStart: function() {gsapSphereArraySmaller[gsapSphereArraySmaller.length - 1].add(light)}});
        } else {
            t2.to(light, {duration: 10 / 6 / 2, intensity: 1000, ease: "none", onStart: function() {gsapSphereArraySmaller[gsapSphereArraySmaller.length - i - 2].add(light)}});
        }
        if (i === gsapSphereArraySmaller.length - 1) {
            t2.to(gsapSphereArraySmaller[gsapSphereArraySmaller.length - 1].material, {duration: 10 / 6 / 2, emissiveIntensity: 1, ease: "none"}, "<");
        } else {
            t2.to(gsapSphereArraySmaller[gsapSphereArraySmaller.length - i - 2].material, {duration: 10 / 6 / 2, emissiveIntensity: 1, ease: "none"}, "<");
        }
    })
}});
gsapSphereArraySmaller.forEach((gsapSphere, i) => {
    tl.to(gsapSphere.position, {duration: 10, x: setXFromCenter(6, i+1, 10), y: setYFromCenter(6, i+1, 10)}, "<")
})
gsapSphereArrayRemainder.forEach((gsapSphere, i) => {
    tl.to(gsapSphere.position, {duration: 10, x: setXFromCenter(13, i+1, 2000), y: setYFromCenter(13, i+1, 1000)}, "<")
})

// Spheres leave circle formation
tl.to(gsapPivot.rotation, {duration: 5, z: -(Math.PI * 2) * 3 - 0.5});
tl.to(gsapSphere13.position, {duration: 5, x: 15}, "<");
tl.to(gsapSphere12.position, {duration: 5, x: -5, y: 3, z: 10}, "<");
tl.to(gsapSphere11.position, {duration: 5, x: -10}, "<");
tl.to(gsapSphere10.position, {duration: 5, x: 3, y: -10}, "<");
tl.to(gsapSphere9.position, {duration: 5, x: 18, y: -8, z: 0}, "<");
tl.to(gsapSphere8.position, {duration: 5, x: 18, y: 8, z: 0}, "<");

// Spheres surround lit sphere
tl.to(gsapPivot.rotation, {duration: 2, x: 0, y: 0, z: -(Math.PI * 2) * 3});
tl.to(gsapSphere13.position, {duration: 2, x: 0, y: 0, z: 5}, "<");
gsapSphereArraySmaller.slice(0, 5).forEach((gsapSphere, i) => {
    tl.to(gsapSphere.position, {duration: 2, x: setXFromCenter(5, i+1, 15), y: setYFromCenter(5, i+1, 15), z: 0}, "<")
})

// Spheres split appart
tl.to(gsapSphere13.position, {duration: 1, x: 0, y: 100, z: 5});
gsapSphereArraySmaller.slice(0, 5).forEach((gsapSphere, i) => {
    tl.to(gsapSphere.position, {duration: 1, x: setXFromCenter(5, i+1, 100), y: setYFromCenter(5, i+1, 100), z: 0}, "<")
})

function setXFromCenter(totalSpheres, sphereNumber, distance) {
    return Math.sin((Math.PI * 2) * (sphereNumber/totalSpheres)) * distance;
}
function setYFromCenter(totalSpheres, sphereNumber, distance) {
    return Math.cos((Math.PI * 2) * (sphereNumber/totalSpheres)) * distance;
}

// distanceFromCenter = 10;
// gsapSphereArray.forEach((gsapSphere, i) => {
//     gsap.to(gsapSphere.position, {duration: 5, x: Math.sin((Math.PI * 2) * (i/8)) * distanceFromCenter, y: Math.cos((Math.PI * 2) * (i/8)) * distanceFromCenter, repeat: 1, yoyo: true})
// })
// tl.to(gsapSphere1.position, {duration: 1, x: 0})
// tl.to(gsapSphere2.position, {duration: 1, x: 0}, "-=1")
// tl.to(gsapPivot.rotation, {duration: 1, z: 0}, "-=1")

// mouse hover effects
// const gsapRaycaster = new THREE.Raycaster();
// const gsapMouseVector = new THREE.Vector2();
// let gsapIsHovered = false;

// const gsapSphere2 = new THREE.Mesh(geometry, litStandardMesh);
// gsapScene.add( gsapSphere2 );
// gsapScene.add(light);
gsapScene.add(ambientLight);
// gsapSphere2.position = new THREE.Vector2(); 

// document.addEventListener('mousemove', (event) => {
//   gsapMouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
//   gsapMouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
//   gsapSphere2.position.x = (event.clientX / window.innerWidth) * 2 - 1;
//   gsapSphere2.position.y = -(event.clientY / window.innerHeight) * 2 + 1;
// //   console.log("x: ", gsapMouseVector.x, "y: ", gsapMouseVector.y);

//   gsapRaycaster.setFromCamera(gsapMouseVector, camera);
//   console.log("gsapRaycaseter:", gsapRaycaster);

//   const intersects = gsapRaycaster.intersectObject(light.parent);
  
//   if (intersects.length > 0) {
//     if (!gsapIsHovered) {
//       // Mouse has entered the object
//       gsapIsHovered = true;
//       console.log("Mouse entered object:", intersects[0].object);
//     //   console.log("triggered");
//     //   hoverEffect();
//     }
//   } else {
//     if (gsapIsHovered) {
//       // Mouse has left the object
//       gsapIsHovered = false;
//       console.log("Mouse left object");
//     //   console.log("triggered");
//     }
//   }
// });

// Handle mouse movements
const mouseLight = new THREE.PointLight( 0xffffff, 1000, 0, 2);
mouseLight.position.set( 1000, 1000, 10 );
gsapScene.add(mouseLight);
const gsapPlane = new THREE.Mesh( new THREE.PlaneGeometry( window.innerWidth, window.innerHeight ), new THREE.MeshBasicMaterial( {color: 0xffff00, transparent: true, opacity: 0} ) );
gsapPlane.position.z = 10;
// light.position.z = 10;
gsapScene.add( gsapPlane );
window.addEventListener('mousemove', (event) => {
// Convert mouse coordinates to normalized device coordinates (-1 to 1)
const mouse = new THREE.Vector2();
mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

// Update the sphere's position based on mouse coordinates
const raycaster = new THREE.Raycaster();
raycaster.setFromCamera(mouse, camera);

const intersection = raycaster.intersectObject(gsapPlane);
if (intersection.length > 0) {
    const position = intersection[0].point;
    mouseLight.position.copy(position);
    // console.log(mouseLight.position);
}
});

//   // Handle mouse movements
//   window.addEventListener('mousemove', (event) => {
//     // Convert mouse coordinates to normalized device coordinates (-1 to 1)
//     const mouse = new THREE.Vector2();
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     // Set the distance from the camera to the sphere
//     const distance = 50;

//     // Set the target position in world space
//     const target = new THREE.Vector3(mouse.x, mouse.y, -distance);

//     // Convert the target position to world space
//     target.unproject(camera);

//     // Set the x and y components of the sphere's position based on the target position
//     gsapSphere2.position.x = target.x;
//     gsapSphere2.position.y = target.y;
//     console.log(gsapSphere2.position);
//   });


// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render( gsapScene, camera );
});


// Render loop
const gsapAnimate = () => {
  requestAnimationFrame(gsapAnimate);

  // Render the scene
  renderer.render(gsapScene, camera);
};

renderer.render( gsapScene, camera );
gsapAnimate();




/* Downloaded example */

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