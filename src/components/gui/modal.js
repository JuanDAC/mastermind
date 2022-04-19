/**
 * modal
 * @module app/components/game_objects/modal
 */

/** Abstracts imports . */
import { Schema } from '../schema.js';
/** Style imports . */
import styles from './modal.css';


/**
 * Class representing a Room.
 * @extends Schema
 */
export class Modal extends Schema {

  /**
   * Logic of component after rendering
   */
  initComponent() {
    const typeModal = this.getAttribute('type');
    this.$button = this.shadowDOM.querySelector('.button');
    this.$button.addEventListener('click', () => location.reload());
    switch (typeModal) {
      case 'to-win':
      case 'lose':
      default:
    }
  }

  /**
   * Defines the component HTML elements.
   * @return { string } The HTML elements.
   */
  template() {
    const title = this.getAttribute('title');
    const button = this.getAttribute('button');
    const close = this.getAttribute('close');
    const content = this.getAttribute('content');

    return `
      <h3 class="title">${title}</h3>
      <div class="${close && 'close'}"></div>
      <main>${content}</main>
      <div class="button">${button}</div>
    `;
  }

  /**
   * Defines the component styles
   * @return { string } The styles of element with wrapper.
   */
  templateCss() {
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
  mapComponentAttributes() {
    return [
      { key: 'type', value: '' },
      { key: 'close', value: 'hidden' },
      { key: 'title', value: 'You Win' },
      { key: 'button', value: 'Play Again' }
    ];
  }

  /**
   * Action that receives dimensions with cumstom properties of css
   * @return { [store, windowsResizeCallback] } The array containing the store and the action.
   */
  actionWindowsResize() {
    return ['guiStore', ({ actionType, height, width }) => {
      if (actionType === 'window-resize') {
        this.style.setProperty('--modal--height', `${height * 0.9}px`);
        this.style.setProperty('--modal--width', `${width * 0.9}px`);
      }
    }];
  }

}
