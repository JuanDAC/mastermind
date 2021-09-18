import { Schema } from '../schema.js';
import styles from './hit.css';

export class Hit extends Schema {

  initComponent() {}

  template() {
    const red = this.getAttribute('red');
    const black = this.getAttribute('black');
    const white = this.getAttribute('white');
    return `
      <div class="hit">
        ${red}
      </div>
      <div class="hit">
        ${black}
      </div>
      <div class="hit">
        ${white}
      </div>

    `;
  }

  templateCss() {
    const width = this.getAttribute('width');
    return `
      <style>
        ${styles.toString()}
        :host > .hit {
          width: ${parseInt(width * 0.6)}px;
          height: ${parseInt(width * 0.6) - 2}px;
        }
        :host {
          width: ${width}px;
        }
      </style>
    `;
  }

  mapComponentAttributes() {
    // TODO change random to 0
    return [
      { key: 'black', value: 0 },
      { key: 'red', value: 0 },
      { key: 'white', value: 0 },
      { key: 'width', value: 20 },
    ];
  }
}

