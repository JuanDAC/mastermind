import { guiStore } from './store.js';

import styles from './app.css';
import { GameCanvas } from './components/gui/game_canvas.js';

window.onresize = () => {
  const { innerHeight, innerWidth } = window;
  const actionType = 'window-resize';
  guiStore.dispatch({ innerHeight, innerWidth, actionType });
};

window.onload = () => {
  const { innerHeight, innerWidth } = window;
  guiStore.dispatch({ innerHeight, innerWidth, actionType: 'window-resize' });
};

const globalStyles =  document.createElement('style');
globalStyles.innerHTML = styles.toString();
document.head.appendChild(globalStyles);

window.customElements.define('game-canvas', GameCanvas);
