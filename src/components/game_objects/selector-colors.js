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
/** Data imports . */
import { API, COLORS } from '../../data/statics.js';

/**
 * Class representing a SelectorColors.
 * @extends Schema
 */
export class SelectorColors extends Schema {
  constructor () {
    super();
    this.numberGeems = 4;
  }

  /**
   * Logic of component after rendering
   */
  initComponent () {
    this.$code = this.shadowDOM.querySelector('nav[selector]');

    (async () => {
      try {
        const { length } = COLORS;
        const { numberGeems } = this;
        const response = await fetch(`${ API }/start?rows=${ numberGeems }&mode=1&max_colors=${ length }&rounds=10&player_name=user`)
          .then((response) => response.json());
        const {game_id: gameId, key, use_colors} = response;
        this.guiStore.dispatch({
          actionType: 'set-ids', gameId, key
        });
        this.guiStore.dispatch({
          actionType: 'set-colors',
          colors: COLORS.filter((_, index) => use_colors.includes(index))
        });
        this.guiStore.dispatch({
          actionType: 'number-color',
          numberColors: this.numberGeems
        });
      } catch(error) {
        console.erorr(error);
      }
    })();
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
          const  [...this.$code.children].map($element => $element.getAttribute('select'));
          (async () => {
            try {
              const { length } = COLORS;
              const { numberGeems } = this;
              const response = await fetch(`${ API }/check?rows=${ numberGeems }&mode=1&max_colors=${ length }&rounds=10&player_name=user`)
                .then((response) => response.json());
              const {game_id: gameId, key, use_colors} = response;
              this.guiStore.dispatch({
                actionType: 'set-ids', gameId, key
              });
              this.guiStore.dispatch({
                actionType: 'set-colors',
                colors: COLORS.filter((_, index) => use_colors.includes(index))
              });
              this.guiStore.dispatch({
                actionType: 'number-color',
                numberColors: this.numberGeems
              });
            } catch(error) {
              console.erorr(error);
            }
          })();
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
