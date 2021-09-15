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
    this.mapComponentAttributes();
    this.render();
    this.initComponent();
    this.addEvents();
  }

  render() {
    this.shadowDOM.innerHTML = `
      ${this.templateCss()}
      ${this.template()}
    `;
  }

  mapComponentAttributes() {}

  templateCss() {}

  template() {}

  initComponent() {}

  addEvents() {}
}
