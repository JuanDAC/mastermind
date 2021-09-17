import { Schema } from '../schema.js';
import styles from './selector-colors.css';

export class SelectorColors extends Schema {

  constructor() {
    super();
    this.numberGeems = 7;
  }

  initComponent() {

    this.$section = this.shadowDOM.querySelectorAll('section[room]');

    console.log(this.numberGeems);
    this.guiStore.dispatch({
      actionType: 'set-colors',
      colors: [
        '#B544DB',
        '#DB4F8F',
        '#DBCE5A',
        '#2EDB32',
        '#2EDB32',
        '#2EDB32',
        '#5A39DB'
      ].splice(0, this.numberGeems)
    });
    this.guiStore.dispatch({
      actionType: 'number-color',
      numberColors: this.numberGeems
    });
  }

  template() {
    const gemsIterator = Array(this.numberGeems + 1).fill('');
    const gemsElements = gemsIterator.reduce((gems) => `${gems}<game-gem></game-gem>`);
    return `
      <nav class="colors" selector>
        ${gemsElements}
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
    return ['guiStore', ({actionType, height, width}) => {
      if (actionType === 'window-resize') {
        this.style.setProperty('--selector-colors--height', `${height}px`);
        this.style.setProperty('--selector-colors--width', `${width}px`);
        this.style.setProperty('--selector-colors--size', `${Math.min(height, width)}px`);
      }
    }];
  }

  actionCheckCode() {
    return ['guiStore', ({actionType}) => {
      if (actionType === 'check-code') {
        this.render();
      }
    }];
  }

  actionNumberGems () {
    return ['guiStore', ({actionType, numberColors}) => {
      if (actionType === 'number-color' && this.numberGeems !== numberColors) {
        this.numberGeems = numberColors;
        this.render();
      }
    }];
  }
}

