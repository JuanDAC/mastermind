/**
 * room
 * @module app/components/game_objects/room
 */

/** Abstracts imports . */
import { Schema } from '../schema.js';
/** Style imports . */
import styles from './room.css';
/** Files imports . */
import { ingameOne } from '../../assets/audio/ingame_one.mp3';
import { ingameTwo } from '../../assets/audio/ingame_two.mp3';
/** Data imports . */

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
      //this.ingameAudios[0].play();

      break;
    default:
    }
  }

  /**
   * Action that receives image and add in elements checkeds
   * @return { [store, imageCheckCodeCallback] } The array containing the store and the action.
   */
  actionImageCheckCode () {
    return ['guiStore', ({ actionType, imageCheckCode, width, color_match, position_match, no_match, combination}) => {
      if (actionType === 'image-check-code' && this.typeRoom === 'game') {
        const $img = document.createElement('img');
        $img.setAttribute('src', imageCheckCode);
        $img.setAttribute('width', `${width}px`);
        $img.addEventListener('dragstart', event => event.preventDefault());
        this.$checkeds.insertAdjacentElement('afterbegin', $img);
        const $hit = document.createElement('game-hit');
        $hit.setAttribute('black', no_match);
        $hit.setAttribute('red', position_match);
        $hit.setAttribute('white', color_match);
        $hit.setAttribute('width', width);
        this.$hits.insertAdjacentElement('afterbegin', $hit);
        if (combination) {
          const $element = document.createElement('img');
          if (position_match === 4) {
            $element.setAttribute('src', 'https://acegif.com/wp-content/gif/confetti-40.gif');
            this.guiStore.dispatch({
              actionType: 'show-modal',
              title: 'You Win',
              $element
            });
          } else {
            $element.setAttribute('src', 'https://acegif.com/wp-content/gifs/sad-cat-67.gif');
            this.guiStore.dispatch({
              actionType: 'show-modal',
              title: 'You lose',
              $element
            });
          }
        }
      }
    }];
  }

  /**
   * Defines the component HTML elements
   * @return { string } The styles of element with wrapper.
   */
  template() {
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
      <h1>mastermind</h1>
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
