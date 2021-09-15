import { Schema } from '../schema.js';

export class GameCanvas extends Schema {

  initComponent() {
    this.$text = this.shadowDOM.querySelector('.tag');
  }

  template() {
    return `
      <div class="tag">
        ${this.attributes.text.value}
      </div>
    `;
  }

  templateCss() {
    return `
      <style>
        [...]
        [...]
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
