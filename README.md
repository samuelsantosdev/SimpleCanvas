# SimpleCanvas

A lightweight HTML5 Canvas 2D framework built to make game and graphics development approachable — no dependencies, no build step, pure JavaScript.

**Live demo:** https://samuelsantosdev.github.io/SimpleCanvas/

![Snake game](https://github.com/samuelsantosdev/SimpleCanvas/blob/master/img/gamesnake.png "Snake game")

---

## Architecture & Techniques

### Prototype Extension
`HTMLElement.prototype.SimpleCanvas` is attached directly to the native DOM element, allowing a clean and idiomatic API:
```js
document.getElementById('myCanvas').SimpleCanvas().Initialize({}, callback);
```
This keeps the entry point minimal and ties the framework lifecycle directly to the canvas element.

### Singleton Engine
The `Engine` object is a global singleton that holds all runtime state — loaded maps, entities, controllers, libraries, and the render queue. This guarantees a single source of truth for the game loop and prevents conflicts between subsystems.

### JSON-driven Autoloading
Framework modules are declared in `js/config/autoload.json` rather than hardcoded:
```json
{
  "Controller": ["Game"],
  "Library": ["EventElementHandle"]
}
```
At startup, `simplecanvas.js` reads this config and dynamically fetches only the required JS files via HTTP, keeping the initial payload small and the architecture extensible without touching core files.

### Dynamic Runtime Module Loading
Entities, maps, and controllers can be loaded on-demand during gameplay via `Engine.LoadEntities()`, `Engine.LoadMaps()`, and `Engine.LoadControllers()`. Each method fetches the JS file, injects it into the page, and registers the module into the Engine's registry — enabling lazy loading without a bundler.

### MVC-Inspired Separation
The codebase follows a clear separation of concerns:

| Layer | Path | Responsibility |
|---|---|---|
| Core | `js/core/Engine.js` | Game loop, render queue, module registry |
| Controller | `js/controller/` | Game rules and input handling |
| Entity | `js/entity/` | Game objects (e.g. `SnakeBody`, `Stage`) |
| Library | `js/library/` | Reusable tools (canvas rendering, events, maps) |

### Render Queue with Display Control
All drawable objects are registered in `Engine.ObjectsRender`, an ordered map. Each frame the engine iterates the queue and renders only objects with `Display: true`. Objects can be shown or hidden at runtime via `Engine.ShowObjectRender(id)` / `Engine.HideObjectRender(id)` without removing them from memory.

### Shape Composition via `Object.assign`
Each shape constructor (Square, Circle, Text) merges its specific properties with shared `ContextShape` defaults using `Object.assign`. This avoids deep inheritance chains and keeps shape creation flat and readable.

### Color Transition & Animation System
The framework includes a built-in animation API supporting:
- Smooth color transitions (RGBA interpolation via `Engine.Helper.ToRgba`)
- Positional animations to multiple coordinates with configurable duration
- Animations triggered at render time, decoupled from game logic

### Event Abstraction
`EventElementHandle` abstracts keyboard and pointer input away from game controllers, so controllers only declare what events they care about rather than managing raw DOM listeners.

### Automated Deployment via GitHub Actions
The repository uses a GitHub Actions workflow (`.github/workflows/static.yml`) to automatically deploy to GitHub Pages on every push to `master` — zero-config CI/CD for a static project.

---

## Getting Started

1. Clone the repository
2. Open `index.html` in a browser (or serve it with any static file server)
3. No build step or package installation required

---

## Changelog

| Version | Changes |
|---|---|
| 0.3 | Modernized UI, fixed CDN issues |
| 0.2 | New singleton Engine, color transition effects, multi-coordinate animations |
| 0.1 | Initial release — shape rendering, game loop, Snake example |

---

## License

MIT © [Samuel Santos](mailto:samuelsantosdev@gmail.com)
