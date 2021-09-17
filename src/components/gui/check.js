import { Schema } from '../schema.js';
import styles from './check.css';

export class Check extends Schema {

  constructor() {
    super();
    this.numberGeems = 0;
    this.colors = [];
  }

  initComponent() {
    this.addEventListener('click', () => this.guiStore.dispatch({actionType: 'check-code'}));
  }

  template() {
    return `
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
    return [];
  }

  actionWindowsResize () {
    return ['guiStore', ({actionType, height, width}) => {
      if (actionType === 'window-resize') {
        const minSize = Math.max(
          Math.min(width, height),
          3000 / (this.numberGeems || 4)
        );
        this.style.setProperty('--selector-colors--count-geems', 2);
        this.style.setProperty('--selector-colors--height', `${height}px`);
        this.style.setProperty('--selector-colors--width', `${width}px`);
        this.style.setProperty('--selector-colors--size', `${minSize}px`);
      }
    }];
  }

}







