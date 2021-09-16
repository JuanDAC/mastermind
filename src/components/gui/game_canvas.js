import { Schema } from '../schema.js';
import styles from './game_canvas.css';

export class GameCanvas extends Schema {

  initComponent() {
    this.$canvas = this.shadowDOM.querySelector('main[canvas]');
    this.$rooms = this.shadowDOM.querySelectorAll('slot[room]');
    console.log('GameCanvas');
    console.log(this);
  }

  template() {
    const roomsIterator = ['rooms', this.getAttribute.bind(this), parseInt, Array]
      .reduce((value, funct) => funct(value)).fill();

    const slots = roomsIterator.map((_, number) => `<slot room name="room-${number + 1}"></slot>`).join('');

    return `
      <main canvas>
        ${slots}
      </main>
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
      {key: 'rooms', value: 0},
    ];
  }

  actionWindowResize() {
    return ['guiStore', ({actionType, innerHeight}) => {
      if (actionType === 'window-resize') {
        this.style.setProperty('--game-canvas--height', `${innerHeight}px`);
      }
    }];
  }
}






