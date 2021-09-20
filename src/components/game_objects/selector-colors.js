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
    const { length } = COLORS;
    const { numberGeems } = this;

    (async () => {
      try {
        const response = await fetch(`${ API }/start?rows=${ numberGeems }&mode=1&max_colors=${ length }&rounds=10&player_name=user`)
          .then((response) => response.json());
        const {game_id: gameId, key, use_colors} = response;
        this.key = key;
        this.gameId = gameId;
        this.guiStore.dispatch({
          actionType: 'set-colors',
          colors: COLORS.filter((_, index) => use_colors.includes(index))
        });
        this.guiStore.dispatch({
          actionType: 'number-color',
          numberColors: numberGeems
        });
      } catch(error) {
        /* mode ofline */
        const indexes = Array(length).fill().map((_, index) => index);

        /* set array colors to use */
        const use_colors = [];
        Array(numberGeems).fill().forEach(() => {
          const index = Math.floor(Math.random() * indexes.length);
          use_colors.push(indexes.splice(index, 1).pop());
        });

        /* set array if code private */
        this.__code = [];
        Array(numberGeems).fill().forEach(() => {
          const index = Math.floor(Math.random() * use_colors.length);
          this.__code.push(use_colors.slice(index, index + 1).pop());
        });

        this.guiStore.dispatch({
          actionType: 'set-colors',
          colors: COLORS.filter((_, index) => use_colors.includes(index))
        });

        this.guiStore.dispatch({
          actionType: 'number-color',
          numberColors: numberGeems
        });
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
          let imageCheckCode = false;
          const { width } = this.$code.getBoundingClientRect();
          const move = [...(this.$code.children || [])].map($element => $element.getAttribute('select')).join(',');
          const { key, gameId } = this;
          console.log(move);
          toPng(this.$code)
            .then(image => {
              /* save screenshot in variable */
              imageCheckCode = image;
              /* send the fetch */
              if (!key) {
                throw new Error('Not key');
              }
              return fetch(`${ API }/check?move=${ move }&key=${ key }&game_id=${ gameId }`);
            })
            /* transform responce in json */
            .then((response) => response.json())
            /* dispatch 'image-check-code' whith data to storage */
            .then((data) => this.guiStore.dispatch({ actionType: 'image-check-code', imageCheckCode, width, ...data }))
            .catch(() => {
              if (!imageCheckCode) {
                return;
              }
              console.log('ofline');
              /* mode ofline */
              let currentMove = move.split(',').map(character => parseInt(character));
              const currentKey = this.__code.slice();
              /* get positions and color */
              currentMove.forEach((value, index) => {
                if (currentMove[index] === currentKey[index]) {
                  currentMove[index] = currentKey[index] = 'r';
                }
              });
              /* get only color */
              currentMove.forEach((value, index) => {
                if (typeof value === 'number' && currentKey.includes(value)) {
                  currentMove[index] = currentKey[currentKey.indexOf(value)] = 'c';
                }
              });
              /* get no color no position */
              currentMove.forEach((value, index) => {
                if (typeof value === 'number' && !currentKey.includes(value)) {
                  currentMove[index] = 'n';
                }
              });
              
              /* parse data */
              const data = {
                color_match: [0, ...currentMove].reduce((acum, value) => acum + Number(value === 'c')),
                position_match: [0, ...currentMove].reduce((acum, value) => acum + Number(value === 'r')),
                no_match: [0, ...currentMove].reduce((acum, value) => acum + Number(value === 'n')),
              };
              /* dispatch 'image-check-code' whith data to storage */
              this.guiStore.dispatch({ actionType: 'image-check-code', imageCheckCode, width, ...data });
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
