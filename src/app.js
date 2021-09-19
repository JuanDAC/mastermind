/**
 * representing a shirt.
 */

import styles from './app.css';
import { guiStore } from './store.js';
import { GameCanvas } from './components/gui/game_canvas.js';
import { Room } from './components/gui/room.js';
import { Check } from './components/gui/check.js';
import { SelectorColors } from './components/game_objects/selector-colors.js';
import { Gem } from './components/game_objects/gems.js';
import { Hit } from './components/game_objects/hit.js';

window.onresize = () => {
  const {width, height} = window.document.body.getBoundingClientRect();
  guiStore.dispatch({ width, height, actionType: 'window-resize' });
};

window.onload = () => {
  const {width, height} = window.document.body.getBoundingClientRect();
  guiStore.dispatch({ width, height, actionType: 'window-resize' });
  guiStore.dispatch({ actionType: 'efects-volume', volume: 1 / 10});
  //  guiStore.reload();
};

const globalStyles =  document.createElement('style');
globalStyles.innerHTML = styles.toString();
document.head.appendChild(globalStyles);

window.customElements.define('game-canvas', GameCanvas);
window.customElements.define('game-room', Room);
window.customElements.define('game-selector-colors', SelectorColors);
window.customElements.define('game-gem', Gem);
window.customElements.define('game-check', Check);
window.customElements.define('game-hit', Hit);



