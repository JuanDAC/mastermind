import { Schema } from '../schema.js';
import styles from './room_load.css';

export class RoomLoad extends Schema {

  initComponent() {
    this.$section = this.shadowDOM.querySelectorAll('section[room]');
  }

  template() {
    return `
      <div class="spinner"></div>
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
      {key: 'colors', value: 0},
    ];
  }

  addEvents() {
    this.guiStore.register(({actionType, innerHeight, innerWidth}) => {
      if (actionType === 'window-resize') {
        this.style.setProperty('--room-load_spinner--size', `${Math.min(innerHeight / 5, innerWidth / 5)}px`);
      }
    });
  }
}
