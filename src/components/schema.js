export class Schema extends HTMLElement {

  constructor() {
    super();
    this.shadowDOM = this.attachShadow({mode: 'open'});
  }

  disconnectedCallback() {
    this.remove();
  }

  connectedCallback() {
    this.mapComponentAttributes();
    this.render();
    this.initComponent();
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

}
