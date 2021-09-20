/**
 * Check
 * @module app/components/game_objects/check
 */

/** Abstracts imports . */
import { Schema } from '../schema.js';
/** Style imports . */
import styles from './check.css';
/** Files imports . */
import sendCode from '../../assets/audio/send_code.wav';

/**
 * Class representing a Check.
 * @extends SchemaInterface
 */
export class Check extends Schema {
  /**
   * Create a Check.
   */
  constructor () {
    super();
    this.numberGeems = 0;
    this.colors = [];
    this.sendCodeAudio = new Audio(sendCode);
  }

  /**
   * Logic of component after rendering
   */
  initComponent () {
    let debounce = true;
    this.addEventListener('click', () => {
      if (debounce) {
        this.classList.add('loading');
        this.sendCodeAudio.play();
        debounce = false;
        setTimeout(() => {
          this.guiStore.dispatch({ actionType: 'check-code' });
          this.classList.remove('loading');
          debounce = true;
        }, 500);
      }
    });
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
        this.style.setProperty('--selector-colors--count-geems', 2);
        this.style.setProperty('--selector-colors--height', `${height}px`);
        this.style.setProperty('--selector-colors--width', `${width}px`);
        this.style.setProperty('--selector-colors--size', `${minSize}px`);
      }
    }];
  }

  /**
   * Action that give the volume of the audio effects
   * @return { [store, windowsResizeCallback] } The array containing the store and the action.
   */
  actionChangeVolumeSound () {
    return ['guiStore', ({ actionType, volume }) => {
      if (actionType === 'efects-volume') {
        this.sendCodeAudio.volume = volume;
      }
    }];
  }
}
