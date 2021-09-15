import { Schema } from '../schema.js';
import styles from './game_canvas.css';

export class GameCanvas extends Schema {

  initComponent() {
    this.$text = this.shadowDOM.querySelector('.tag');
  }

  template() {
    return `
      <main class="">
        ${this.attributes.text.value}
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
    const attributesMapping = [
      'text',
    ];
    attributesMapping.forEach(key => {
      if (!this.attributes[key]) {
        this.attributes[key] = {value: ''};
      }
    });
  }
}
