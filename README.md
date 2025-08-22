# Interactive Solar System — WebGL Demo

A small, interactive solar system demo using Three.js.  
It shows a rotating Sun and planets, an Earth with day/cloud textures and a Moon, an instanced asteroid belt, and a large milky-way background. The project includes a polished loading overlay, basic GUI controls (dat.GUI), click-to-focus, and smooth camera fly-to/lock behavior.

This repo currently contains a single-file demo: `index.html` that loads JPG textures (planet maps, clouds, moon, sun, milky-way). You can run it quickly as a static page, or migrate it into a Next.js + React Three Fiber app — instructions below.

## Features
- Realistically scaled planets (AU distance conversion via `CONFIG.distanceScale`)
- Earth with day texture + clouds + atmosphere
- Moon orbiting Earth
- Sun mesh with emissive map and slow rotation (based on ~27 day solar rotation)
- Instanced asteroid belt (performance-optimized)
- Large milky-way sphere background (keeps camera visually inside)
- Custom orbit controls with multiplicative zoom, pan, fly-to and lock
- dat.GUI controls for lighting, timeScale, asteroid generation and camera presets
- Loading overlay with progress bar and asset-counting

## Which files matter
- `index.html` — the entire demo (single-file app)
- `assets/` — (not present initially) recommended folder to store all JPG textures:
  - `sun.jpg`, `milkyway.jpg`, `mercury.jpg`, `venus.jpg`, `daymap.jpg`, `clouds.jpg`, `mars.jpg`, `jupiter.jpg`, `saturn.jpg`, `saturn_ring.jpg`, `uranus.jpg`, `neptune.jpg`, `moon.jpg`

## Quick start — static / local (recommended)
1. Create an `assets` folder next to `index.html` and move all the JPG files into it.
2. From a terminal (Windows `cmd.exe`) start a tiny static server from the folder containing `index.html`:
```cmd
cd "c:\Users\danial jeelani\New folder"
python -m http.server 8000
```
3. Open the demo in your browser:
```
http://localhost:8000/index.html
```
4. If textures are missing, open DevTools → Network and check for 404s.

## Important: point the code at the `assets/` folder
The demo loads textures via `THREE.TextureLoader`. To load textures from the `assets` subfolder, add a small constant and prefix loads:

- Add this near the top of `index.html` (after `CONFIG`):
```javascript
const ASSET_PATH = 'assets/';
```

- The loader calls that must be prefixed by `ASSET_PATH` (these are already present in the code or can be updated):
  - `milkyway.jpg` → `ASSET_PATH + 'milkyway.jpg'`
  - `sun.jpg` → `ASSET_PATH + 'sun.jpg'`
  - Planet textures loaded via `data.texture`, `data.dayTexture`, `data.cloudsTexture`, `data.ringTexture` → `ASSET_PATH + data.texture`, etc.
  - `moon.jpg` → `ASSET_PATH + 'moon.jpg'`

Tip: the repo's `PLANETS` config keeps plain filenames (e.g. `'mercury.jpg'`). This makes it easy to centralize path prefixing with `ASSET_PATH` instead of editing many strings.

## Integrating into Next.js + React Three Fiber (optional)
If you prefer to migrate this demo into a Next.js + R3F app:

1. Create a Next.js app and install R3F:
```bash
npx create-next-app@latest my-solar
cd my-solar
npm install three @react-three/fiber @react-three/drei dat.gui
```

2. Copy images into Next.js `public/assets/` (so they become available at `/assets/...`).

3. For resource paths set:
```javascript
// when used inside Next.js / public
const ASSET_PATH = '/assets/';
```

4. Move logic from `index.html` into a React component (e.g., `src/components/SolarSystem.jsx`) using @react-three/fiber canvas. You can reuse geometries, materials, and the texture loader logic — but convert imperative animation loop into React hooks (`useFrame`) and create `instancedMesh` via R3F-friendly patterns.

5. Keep dat.GUI for quick debugging, or replace with a React-based UI for production.

## Common issues & troubleshooting
- 404s for texture files: ensure `assets/` is adjacent to `index.html` and that you served the folder over HTTP (not `file://`).
- Blank canvas / nothing renders: open DevTools Console for WebGL or JS errors; ensure `three.min.js` is loaded and your browser supports WebGL.
- Black milky-way or missing stars: confirm `milkyway.jpg` is in `assets/` and the loader path is correct.
- Large camera jumps or being "outside" the milky-way: use the GUI or `ASSET_PATH` / `CONFIG.distanceScale` to adjust scene scale; camera clamps are in code referencing `MILKYWAY_RADIUS`.

## Credits
Made by Danial Jeelani — https://github.com/diplomaticfellow

## License
You can put a license here (MIT is common) or remove this section to keep the project private.

---

If you want, I can:
- Write this `README.md` into your project.
- Apply the `ASSET_PATH` edits directly to `index.html` (I can paste the updated file or a minimal patch).
- Create a short Next.js + R3F starter component that reuses the textures and behavior from the demo.

Which of the above would you like me to do next?
