import { Schema } from '../schema.js';
import styles from './selector-colors.css';

export class SelectorColors extends Schema {

  initComponent() {
    this.$section = this.shadowDOM.querySelectorAll('section[room]');
    this.style.setProperty('--selector-colors--count-geems', 5);
  }

  template() {
    this.typeRoom = this.getAttribute('type');
    return `
      <nav class="colors" selector>
        <div class="geems">
        </div>
        <div class="geems"></div>
        <div class="geems"></div>
        <div class="geems"></div>
        <div class="geems"></div>
      </nav>
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
      { key: 'type', value: 'load' },
    ];
  }

  actionWindowsResize () {
    return ['guiStore', ({actionType, innerHeight, innerWidth}) => {
      if (actionType === 'window-resize') {
        this.style.setProperty('--selector-colors--height', `${innerHeight}px`);
        this.style.setProperty('--selector-colors--width', `${innerWidth}px`);
        this.style.setProperty('--selector-colors--size', `${Math.min(innerWidth, innerHeight)}px`);
      }
    }];
  }
}

