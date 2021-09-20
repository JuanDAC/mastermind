/**
 * game_canvas
 * @module app/components/game_objects/game_canvas
 */

/** Abstracts imports . */
import { Schema } from '../schema.js';
/** Style imports . */
import styles from './room.css';
/** Files imports . */
import { ingameOne } from '../../assets/audio/ingame_one.mp3';
import { ingameTwo } from '../../assets/audio/ingame_two.mp3';

/**
 * Class representing a Room.
 * @extends Schema
 */
export class Room extends Schema {

  /**
   * Logic of component after rendering
   */
  constructor () {
    super();
    this.ingameAudios = [new Audio(ingameOne), new Audio(ingameTwo)];
  }

  /**
   * Logic of component after rendering
   */
  initComponent () {
    this.$checkeds = this.shadowDOM.querySelector('#checked');
    this.$hits = this.shadowDOM.querySelector('#hit');

    this.typeRoom = this.getAttribute('type');

    switch (this.typeRoom) {
    case 'load':
      break;
    case 'home':
      break;
    case 'selector-avatar':
      break;
    case 'map':
      break;
    case 'game':
      this.$hits.addEventListener('scroll', () => {
        const { scrollLeft } = this.$hits;
        this.$checkeds.scrollLeft = scrollLeft;
      });

      this.$checkeds.addEventListener('scroll', () => {
        const { scrollLeft } = this.$checkeds;
        this.$hits.scrollLeft = scrollLeft;
      });

      // TODO change audio game
      this.ingameAudios[0].play();

      break;
    default:
    }
  }

  /**
   * Action that receives image and add in elements checkeds
   * @return { [store, imageCheckCodeCallback] } The array containing the store and the action.
   */
  actionImageCheckCode () {
    return ['guiStore', ({ actionType, imageCheckCode, width }) => {
      if (actionType === 'image-check-code' && this.typeRoom === 'game') {
        const $img = document.createElement('img');
        $img.setAttribute('src', imageCheckCode);
        $img.setAttribute('width', `${width}px`);
        $img.addEventListener('dragstart', event => event.preventDefault());
        this.$checkeds.insertAdjacentElement('afterbegin', $img);
        const $hit = document.createElement('game-hit');
        $hit.setAttribute('width', width);
        this.$hits.insertAdjacentElement('afterbegin', $hit);
      }
    }];
  }

  /**
   * Defines the component HTML elements
   * @return { string } The styles of element with wrapper.
   */
  template () {
    this.typeRoom = this.getAttribute('type');
    switch (this.typeRoom) {
    case 'load':
      return `
      <div class="spinner"></div>
    `;
    case 'home':
      return `
      <slot></slot>
    `;
    case 'selector-avatar':
      return `
      <slot></slot>
    `;
    case 'map':
      return `
      <slot></slot>
    `;
    case 'game':
      return `
      <game-selector-colors></game-selector-colors>
      <div class="cell interaction" id="insert" >
        <game-check></game-check>
      </div>
      <div class="cell chekc" id="checked" ></div>
      <div class="cell hits" id="hit" ></div>
    `;
    default:
      return `
      <h1>Attribute ${this.typeRoom} not exist<h1>
    `;
    }
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
      { key: 'type', value: 'load' },
      { key: 'float-botoms', value: true }
    ];
  }

  /**
   * Action that receives dimensions with cumstom properties of css
   * @return { [store, windowsResizeCallback] } The array containing the store and the action.
   */
  actionWindowsResize () {
    return ['guiStore', ({ actionType, height, width }) => {
      if (actionType === 'window-resize') {
        this.style.setProperty('--room--height', `${height}px`);
        this.style.setProperty('--room--width', `${width}px`);
      }
    }];
  }
}
