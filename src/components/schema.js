import { gameStateStore, guiStore, gameAssetsStore } from '../store.js';

export class Schema extends HTMLElement {

  constructor() {
    super();
    this.shadowDOM = this.attachShadow({mode: 'open'});
    this.guiStore = guiStore;
    this.gameStateStore = gameStateStore;
    this.gameAssetsStore = gameAssetsStore;
    this.registerActionsToStore('actionInit');
  }

  disconnectedCallback() {
    this.remove();
  }

  connectedCallback() {
    this.setMapComponentAttributes();
    this.render();
    this.initComponent();
    this.registerActionsToStore('action');
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

  registerActionsToStore(prefix) {
    const methods = [this, Object.getPrototypeOf, Object.getOwnPropertyNames]
      .reduce((value, funct) => funct(value)) || [];

    for (const method of methods) {
      if (method.startsWith(prefix)) {
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
