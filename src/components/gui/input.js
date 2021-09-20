import { Schema } from '../schema.js';
import styles from './game_canvas.css';

export class GameCanvas extends Schema {
  initComponent () {
    this.$canvas = this.shadowDOM.querySelector('.canvas');
  }

  template () {
    return `
      <main class="canvas">
        ${this.attributes.text.value}
      </main>
    `;
  }

  templateCss () {
    return `
      <style>
        ${styles.toString()}
      </style>
    `;
  }

  mapComponentAttributes () {
    const attributesMapping = [
      'text'
    ];
    attributesMapping.forEach(key => {
      if (!this.attributes[key]) {
        this.attributes[key] = { value: '' };
      }
    });
  }

  addEvents () {
    this.guiStore.register(({ actionType, innerHeight, innerWidth }) => {
      if (actionType === 'window-resize') {
        this.windowHeight = innerHeight;
        this.windowWidth = innerWidth;
        this.style.setProperty('--game-canvas--height', `${this.windowHeight}px`);
      }
    });
  }
}
