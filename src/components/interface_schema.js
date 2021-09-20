
/**
 * Interface for classes that represent a Web Component.
 * @extends HTMLElement
 * @interface
 */
export class SchemaInterface extends HTMLElement {
  /**
   * Delete element when removed from DOM.
   */
  disconnectedCallback () {
    throw new Error('Not implemented');
  }

  /**
   * Starts the component logic when it's added to the DOM.
   */
  connectedCallback () {
    throw new Error('Not implemented');
  }

  /**
   * Render the CSS styles and HTML elements of the component.
   */
  render () {
    throw new Error('Not implemented');
  }

  /**
   * Set default component attributes.
   */
  setMapComponentAttributes () {
    throw new Error('Not implemented');
  }

  /**
   * Registers the action type methods.
   * @param { string } prefix - The prefix of methos to register in store.
   */
  registerActionsToStore () {
    throw new Error('Not implemented');
  }

  /**
   * Maps the array of attributes.
   */
  mapComponentAttributes () {}

  /**
   * Defines the component styles
   */
  templateCss () {}

  /**
   * Defines the component HTML elements
   */
  template () {}

  /**
   * Defines asyncrousnoly the component HTML elements
   */
  async templateAsync () {}
  /**
   * Logic of component after rendering
   */
  initComponent () {}
}
