/**
 * SelectorColors
 * @module app/components/game_objects/selectorColors
 */

/** Abstracts imports . */
import { Schema } from '../schema.js';
/** Style imports . */
import styles from './selector-colors.css';
/** Libraries imports . */
import { toPng } from 'html-to-image';

/**
 * Class representing a SelectorColors.
 * @extends Schema
 */
export class SelectorColors extends Schema {
  constructor () {
    super();
    this.numberGeems = 5;
  }

  /**
   * Logic of component after rendering
   */
  initComponent () {
    this.$code = this.shadowDOM.querySelector('nav[selector]');

    this.guiStore.dispatch({
      actionType: 'set-colors',
      colors: [
        '#B544DB',
        '#DB4F8F',
        '#DBCE5A',
        '#2EDB32',
        '#5A39DB'
      ].splice(0, this.numberGeems)
    });
    this.guiStore.dispatch({
      actionType: 'number-color',
      numberColors: this.numberGeems
    });
  }

  /**
   * Defines the component HTML elements
   * @return { string } The styles of element with wrapper.
   */
  template () {
    const gemsIterator = Array(this.numberGeems + 1).fill('');
    const gemsElements = gemsIterator.reduce((gems) => `${gems}<game-gem></game-gem>`);
    return `
      <nav class="colors" selector data-html2canvas-ignore="true">
        ${gemsElements}
      </nav>
    `;
  }

  /**
   * Defines the component styles
   * @return { string } The styles of element with wrapper.
   */
  templateCss () {
    return `
      <style>
        ${styles.toString()}
      </style>
    `;
  }

  /**
   * Maps the array of attributes.
   * @return { [ { Key, value } ] } The object that denied an atribute.
   */
  mapComponentAttributes () {
    return [
      { key: 'type', value: 'load' }
    ];
  }

  /**
   * Action that receives dimensions with cumstom properties of css
   * @return { [store, windowsResizeCallback] } The array containing the store and the action.
   */
  actionWindowsResize () {
    return ['guiStore', ({ actionType, height, width }) => {
      if (actionType === 'window-resize') {
        this.style.setProperty('--selector-colors--height', `${height}px`);
        this.style.setProperty('--selector-colors--width', `${width}px`);
        this.style.setProperty('--selector-colors--size', `${Math.min(height, width)}px`);
      }
    }];
  }

  /**
   * Action that create a screeshot of element and send to actions 'image-check-code'
   * @return { [store, checkCodeCallback] } The array containing the store and the action.
   */
  actionCheckCode () {
    return ['guiStore', ({ actionType }) => {
      if (actionType === 'check-code') {
        if (this.$code) {
          const { width } = this.$code.getBoundingClientRect();
          toPng(this.$code).then(imageCheckCode => {
            this.guiStore.dispatch({ actionType: 'image-check-code', imageCheckCode, width });
          });
        }
      }
    }];
  }

  /**
   * Action that receives number of gems
   * @return { [store, windowsResizeCallback] } The array containing the store and the action.
   */
  actionNumberGems () {
    return ['guiStore', ({ actionType, numberColors }) => {
      if (actionType === 'number-color' && this.numberGeems !== numberColors) {
        this.numberGeems = numberColors;
        this.render();
      }
    }];
  }
}
