/**
 * game_canvas
 * @module app/components/game_objects/game_canvas
 */

/** Abstracts imports . */
import { Schema } from '../schema.js';
/** Style imports . */
import styles from './game_canvas.css';

/**
 * Class representing a GameCanvas.
 * @extends Schema
 */
export class GameCanvas extends Schema {

  /**
   * Logic of component after rendering
   */
  initComponent () {
    this.$canvas = this.shadowDOM.querySelector('main[canvas]');
    this.$rooms = this.shadowDOM.querySelectorAll('slot[room]');
  }

  /**
   * Defines the component HTML elements
   * @return { string } The styles of element with wrapper.
   */
  template () {
    const roomsIterator = ['rooms', this.getAttribute.bind(this), parseInt, Array]
      .reduce((value, funct) => funct(value)).fill();

    const slots = roomsIterator.map((_, number) => `<slot room name="room-${number + 1}"></slot>`).join('');

    return `
      <main canvas>
        ${slots}
      </main>
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
      { key: 'rooms', value: 0 }
    ];
  }

  /**
   * Action that receives dimensions with cumstom properties of css
   * @return { [store, windowsResizeCallback] } The array containing the store and the action.
   */
  actionWindowResize () {
    return ['guiStore', ({ actionType, height }) => {
      if (actionType === 'window-resize') {
        this.style.setProperty('--game-canvas--height', `${height}px`);
      }
    }];
  }
}
