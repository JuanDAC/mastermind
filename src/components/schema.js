/** Interfeces imports . */
import { SchemaInterface } from './interface_schema.js';

/**
 * application entry point.
 */

/** Style imports . */
import { gameStateStore, guiStore, gameAssetsStore } from '../store.js';

/**
 * Class representing a schema of custom elements.
 * @extends SchemaInterface
 */
export class Schema extends SchemaInterface {
  /**
   * Instance a schema.
   */
  constructor () {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
    this.guiStore = guiStore;
    this.gameStateStore = gameStateStore;
    this.gameAssetsStore = gameAssetsStore;
    this.registerActionsToStore('actionInit');
  }

  /**
   * Delete element when removed from DOM.
   */
  disconnectedCallback () {
    this.remove();
  }

  /**
   * Starts the component logic when it's added to the DOM.
   */
  connectedCallback () {
    this.setMapComponentAttributes();
    this.render();
    this.initComponent();
    this.registerActionsToStore('action');
  }

  /**
   * Render the CSS styles and HTML elements of the component.
   */
  render () {
    this.shadowDOM.innerHTML = `
      ${this.templateCss() || ''}
      ${this.template() || ''}
    `;
  }

  /**
   * Set default component attributes.
   */
  setMapComponentAttributes () {
    (this.mapComponentAttributes() || []).forEach(({ key, value }) => {
      if (this.getAttribute(key) === null) {
        this.setAttribute(String(key), String(value));
      }
    });
  }

  /**
   * Registers the action type methods.
   * @param { string } prefix - The prefix of methos to register in store.
   */
  registerActionsToStore (prefix) {
    const methods = [this, Object.getPrototypeOf, Object.getOwnPropertyNames]
      .reduce((value, funct) => funct(value)) || [];

    for (const method of methods) {
      if (method.startsWith(prefix)) {
        const [store, action] = this[method].call(this);
        this[store].register(action.bind(this));
      }
    }
  }
}
