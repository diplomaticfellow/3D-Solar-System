# Interactive Solar System 

A small, interactive solar system demo using Three.js.  
It shows a rotating Sun and planets, an Earth with day/cloud textures and a Moon, an instanced asteroid belt, and a large milky-way background. The project includes a polished loading overlay, basic GUI controls (dat.GUI), click-to-focus, and smooth camera fly-to/lock behavior.

This repo currently contains a single-file demo: `index.html` that loads JPG textures (planet maps, clouds, moon, sun, milky-way). You can run it quickly as a static page, or migrate it into a Next.js + React Three Fiber app — instructions below.

## Features
- Eight planets (AU distance converted to scale it relatively)
- Asteroid belt 
- Custom orbit controls with multiplicative zoom, pan, fly-to and lock
- dat.GUI controls for lighting, timeScale, asteroid generation and camera presets
- Loading overlay with progress bar and asset-counting

## Preview
[Preview](/assets/view.png)
