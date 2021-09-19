import { Schema } from '../schema.js';
import styles from './check.css';
import sendCode from '../../assets/audio/send_code.wav';

export class Check extends Schema {

  constructor() {
    super();
    this.numberGeems = 0;
    this.colors = [];
    this.sendCodeAudio = new Audio(sendCode);
  }

  initComponent() {
    let bubble = true;
    this.addEventListener('click', () => {
      if (bubble) {
        this.classList.add('loading');
        this.sendCodeAudio.play();
        bubble = false;
        setTimeout(() => {
          this.guiStore.dispatch({actionType: 'check-code'});
          this.classList.remove('loading');
          bubble = true;
        }, 500);
      }
    });
  }

  template() {
    return `
    `;
  }

  templateCss() {
    return `
      <style>
        ${styles.toString()}
      </style>
    `;
  }

  actionWindowsResize () {
    return ['guiStore', ({actionType, height, width}) => {
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

  actionChangeVolumeSound() {
    return ['guiStore', ({actionType, volume}) => {
      if (actionType === 'efects-volume') {
        this.sendCodeAudio.volume = volume;
      }
    }];
  }

}
