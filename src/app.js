import styles from './app.css';
import { GameCanvas } from './components/gui/game_canvas.js';


const globalStyles =  document.createElement('style');
globalStyles.innerHTML = styles.toString();
document.head.appendChild(globalStyles);


window.customElements.define('game-canvas', GameCanvas);
