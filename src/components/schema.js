import { guiStore, gameState } from '../store.js';

export class Schema extends HTMLElement {

  constructor() {
    super();
    this.shadowDOM = this.attachShadow({mode: 'open'});
    this.guiStore = guiStore;
    this.gameState = gameState;
  }

  disconnectedCallback() {
    this.remove();
  }

  connectedCallback() {
    this.setMapComponentAttributes();
    this.render();
    this.initComponent();
    this.registerActionsToStore();
  }

  render() {
    this.shadowDOM.innerHTML = `
      ${this.templateCss()}
      ${this.template()}
    `;
  }

  setMapComponentAttributes() {
    (this.mapComponentAttributes() || []).forEach(({ key, value }) => {
      if (this.getAttribute(key) === null) {
        this.setAttribute(String(key), String(value));
      }
    });
  }

  registerActionsToStore() {
    const methods = [this, Object.getPrototypeOf, Object.getOwnPropertyNames]
      .reduce((value, funct) => funct(value));
    for (const method of methods) {
      if (method.startsWith('action')) {
        const [store, action] = this[method]();
        this[store].register(action);
      }
    }
  }

  mapComponentAttributes() {}

  templateCss() {}

  template() {}

  initComponent() {}

  addEvents() {}
}
