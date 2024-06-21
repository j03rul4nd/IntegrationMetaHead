

// Importar THREE.js
import * as THREE from "three";

// Vertex Shader
const vertexShader = `
  uniform float time;
  varying vec2 vUv;

  void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(pos.x * 10.0 + time) * 0.1;
      pos.z += sin(pos.y * 10.0 + time) * 0.1;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment Shader
const fragmentShader = `
  uniform float time;
  varying vec2 vUv;

  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
      vec2 pos = vUv * 5.0;
      float n = noise(pos + time * 0.1);
      vec3 color = vec3(0.1, 0.2, 0.3) + n * vec3(0.2, 0.6, 1.0);
      gl_FragColor = vec4(color, 1.0);
  }
`;

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;

// Create the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background').appendChild(renderer.domElement);

// Create the plane geometry
const planeGeometry = new THREE.PlaneGeometry(2, 2);

// Create the shader material
const planeMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
      time: { value: 0.0 }
  },
  wireframe: false
});

// Create the plane mesh
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

// Animate the scene
function animate() {
  requestAnimationFrame(animate);
  planeMaterial.uniforms.time.value += 0.01;
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
