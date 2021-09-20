/**
 * Gem
 * @module app/components/game_objects/gem
 */

/** Abstracts imports . */
import { Schema } from '../schema.js';
/** Style imports . */
import styles from './gems.css';
/** Files imports . */
import chooseGem from '../../assets/audio/choose_gem.wav';
/** Data imports . */
import { COLORS } from '../../data/statics.js';

/**
 * Class representing a Store.
 * @extends Schema
 */
export class Gem extends Schema {

  /**
   * Create a Gem.
   */
  constructor () {
    super();
    this.numberColors = 0;
    this.colors = [];
    this.chooseGemAudio = new Audio(chooseGem);
  }

  /**
   * Logic of component after rendering
   */
  initComponent () {
    /**
     * TODO register this method like a action when load elements
     */
    setTimeout(() => {
      [...this.shadowDOM.querySelectorAll('.select-color')].forEach((element, _, siblings) => {
        element.addEventListener('click', () => {
          this.classList.add('bubble');
          setTimeout(() => {
            this.classList.remove('bubble');
          }, 600);
          this.chooseGemAudio.play();
          const elementCSS = getComputedStyle(element);
          const color = elementCSS.getPropertyValue('--background-color');
          siblings.forEach(sibling =>
            sibling.parentElement && sibling.parentElement.classList.remove('active')
          );
          element.parentElement && element.parentElement.classList.add('active');
          this.setAttribute('select', COLORS.indexOf(color));
        });
      });
    }, 1000);
  }

  /**
   * Defines the component HTML elements
   * @return { string } The styles of element with wrapper.
   */
  template () {
    const colorsIterator = Array(this.numberColors + 1).fill('');
    const colorsElements = colorsIterator.reduce((colors) => `
      ${colors}
      <div class="wrapper-select-color">
        <div class="select-color"></div>
      </div>
    `);
    return colorsElements;
  }

  /**
   * Defines the component styles
   * @return { string } The styles of element with wrapper.
   */
  templateCss () {
    let variablesColors = '';
    (this.colors || []).forEach((color, index, { length }) => {
      variablesColors += `
        :host(:hover) .wrapper-select-color:nth-child(${index + 2}) {
          transform: rotatez(${index * (360 / length)}deg);
        }
        .wrapper-select-color:nth-child(${index + 2}) > .select-color {
          --background-color: ${color};
          background-color: var(--background-color);
        }
      `;
    });

    return `
      <style>
        ${styles.toString()}
        ${variablesColors}
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
        const minSize = Math.max(
          Math.min(width, height),
          3000 / (this.numberGeems || 4)
        );
        this.style.setProperty('--selector-colors--height', `${height}px`);
        this.style.setProperty('--selector-colors--width', `${width}px`);
        this.style.setProperty('--selector-colors--size', `${minSize}px`);
      }
    }];
  }

  /**
   * Action that give the volume of the audio effects
   * @return { [store, ChangeVolumeSoundCallback] } The array containing the store and the action.
   */
  actionChangeVolumeSound () {
    return ['guiStore', ({ actionType, volume }) => {
      if (actionType === 'efects-volume') {
        this.chooseGemAudio.volume = volume;
      }
    }];
  }

  /**
   * Action that receives number of gems and set cumstom properties of css after to render.
   * @return { [store, NumberGemsCallback] } The array containing the store and the action.
   */
  actionInitNumberGems () {
    return ['guiStore', ({ actionType, numberColors }) => {
      if (actionType === 'number-color' && this.numberGeems !== numberColors) {
        this.style.setProperty('--selector-colors--count-geems', numberColors);
        this.numberColors = numberColors;
        console.log(numberColors);
        this.render();
      }
    }];
  }

  /**
   * Action that receives an array of colors after to render.
   * @return { [store, setColorsCallback ] } The array containing the store and the action.
   */
  actionInitSetColors () {
    return ['guiStore', ({ actionType, colors }) => {
      if (actionType === 'set-colors') {
        this.colors = colors;
        console.log(colors);
        this.render();
      }
    }];
  }
}
