/**
 * application entry point.
 */

/** Style imports . */
import styles from './app.css';

/** Store imports . */
import { guiStore } from './store.js';

/** Components GUI imports . */
import { GameCanvas } from './components/gui/game_canvas.js';
import { Room } from './components/gui/room.js';

/** Components game objects imports . */
import { Check } from './components/game_objects/check.js';
import { SelectorColors } from './components/game_objects/selector-colors.js';
import { Gem } from './components/game_objects/gems.js';
import { Hit } from './components/game_objects/hit.js';

/**
 * Fire the 'window-resize' action when the resize window event occurs
 */
window.addEventListener('resize ', () => {
  const { width, height } = window.document.body.getBoundingClientRect();
  guiStore.dispatch({ width, height, actionType: 'window-resize' });
});

/**
 * Fire the 'window-resize' 'efects-volume' actions when the load window event occurs
 */
window.addEventListener('load', () => {
  const { width, height } = window.document.body.getBoundingClientRect();
  guiStore.dispatch({ width, height, actionType: 'window-resize' });
  guiStore.dispatch({ volume: 2 / 10, actionType: 'efects-volume'});
});

/** Add styles in head label. */
const globalStyles =  document.createElement('style');
globalStyles.innerHTML = styles.toString();
document.head.appendChild(globalStyles);

/** Define custom elements. */
window.customElements.define('game-canvas', GameCanvas);
window.customElements.define('game-room', Room);
window.customElements.define('game-selector-colors', SelectorColors);
window.customElements.define('game-gem', Gem);
window.customElements.define('game-check', Check);
window.customElements.define('game-hit', Hit);
