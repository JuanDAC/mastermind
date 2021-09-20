import { Schema } from '../schema.js';
import styles from './room.css';

export class Room extends Schema {

  initComponent() {
    this.$section = this.shadowDOM.querySelectorAll('section[room]');
  }

  template() {
    this.typeRoom = this.getAttribute('type');
    switch (this.typeRoom) {
    case 'load':
      return `
        <div class="spinner"></div>
      `;
    case 'home':
      return `
        <slot></slot>
      `;
    case 'selector-avatar':
      return `
        <slot></slot>
      `;
    case 'map':
      return `
        <slot></slot>
      `;
    case 'game':
      return `
        <game-selector-colors></game-selector-colors>
        <div class="cell interaction" id="insert" ></div>
        <div class="cell chekc" id="check" ></div>
        <div class="cell hits" id="hit" ></div>
      `;
    default:
      return `
        <h1>Attribute ${this.typeRoom} not exist<h1>
      `;
    }
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
      { key: 'float-botoms', value: true },
    ];
  }

  actionWindowsResize () {
    return ['guiStore', ({actionType, innerHeight, innerWidth}) => {
      if (actionType === 'window-resize') {
        this.style.setProperty('--room--height', `${innerHeight}px`);
        this.style.setProperty('--room--width', `${innerWidth}px`);
      }
    }];
  }
}
