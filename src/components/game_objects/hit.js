/**
 * Hit
 * @module app/components/game_objects/hit
 */

/** Abstracts imports . */
import { Schema } from '../schema.js';
/** Style imports . */
import styles from './hit.css';

/**
 * Class representing a Check.
 * @extends SchemaInterface
 */
export class Hit extends Schema {

  /**
   * Defines the component HTML elements
   * @return { string } The styles of element with wrapper.
   */
  template () {
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

  /**
   * Defines the component styles
   * @return { string } The styles of element with wrapper.
   */
  templateCss () {
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

  /**
   * Maps the array of attributes.
   * @return { [ { Key, value } ] } The object that denied an atribute.
   */
  mapComponentAttributes () {
    return [
      { key: 'black', value: 0 },
      { key: 'red', value: 0 },
      { key: 'white', value: 0 },
      { key: 'width', value: 20 }
    ];
  }
}
