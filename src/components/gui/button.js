import { Schema } from '../schema.js';
import styles from './game_canvas.css';

export class GameCanvas extends Schema {

  initComponent() {
  }

  template() {
    return `
      <slot></slot>
    `;
  }

  templateCss() {
    return `
      <style>
        ${styles.toString()}
      </style>
    `;
  }

  mapComponentAttributes() {
    return [
      {key: 'type', value: 'middle'},
    ];
  }

  addEvents() {
    this.guiStore.register(({actionType, innerHeight}) => {
      if (actionType === 'window-resize') {
        this.style.setProperty('--game-canvas--height', `${innerHeight}px`);
      }
    });
  }
}
