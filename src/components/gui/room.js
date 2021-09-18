import { Schema } from '../schema.js';
import styles from './room.css';
import { ingameOne } from '../../assets/audio/ingame_one.mp3';
import { ingameTwo } from '../../assets/audio/ingame_two.mp3';

export class Room extends Schema {

  constructor() {
    super();
    this.ingameAudios = [new Audio(ingameOne), new Audio(ingameTwo)];
  }

  initComponent() {
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

  actionImageCheckCode () {
    return ['guiStore', ({actionType, imageCheckCode, width}) => {
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
      { key: 'float-botoms', value: true },
    ];
  }

  actionWindowsResize () {
    return ['guiStore', ({actionType, height, width}) => {
      if (actionType === 'window-resize') {
        this.style.setProperty('--room--height', `${height}px`);
        this.style.setProperty('--room--width', `${width}px`);
      }
    }];
  }
}
