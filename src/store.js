/** Class representing a point. */
export class Store {
  /**
   * Create a store.
   * @param { string } name - The name of the store instance.
   */
  constructor (name = 'store') {
    this.nameStore = `mastermind-${name}`;
    this.registered = [];
  }

  /**
   * Actions recoder.
   * @param { actionCallback } action - The action to register.
   * @return { number } The id value of the action that was adding.
   */
  register (action) {
    const id = (new Date()).getTime();
    this.registered.push({ id, action });
    return id;
  }

  /**
   * Unregister an action.
   * @param { number } id - The name of the storage.
   */
  unregister (id) {
    this.registered = this.registered.filter(({ id: itemId }) => id !== itemId);
  }

  /**
   * Shoot an action.
   * @param { Object } payload - The object that contain the actionType
   *                             of the storage.
   * @param { boolean } save - The bolean optional to save data on localstorage
   *
   */
  dispatch (payload, save) {
    if (save) {
      const payloads = [this.nameStore, localStorage.getItem, JSON.parse]
        .reduce((value, funct) => funct(value)) || {};
      payloads[payload.actionType] = payload;
      localStorage.setItem(this.nameStore, JSON.stringify(payloads));
    }
    this.registered.forEach(({ id, action }) => action(payload, id));
  }

  /**
   * Trigger saved actions in local storage.
   */
  reload () {
    const payloads = [this.nameStore, localStorage.getItem, JSON.parse, Object.values]
      .reduce((value, funct) => funct(value)) || [];
    console.log(payloads);
    payloads.forEach((payload) => this.dispatch(payload));
  }
}

/** instance Store of GUI. */
export const guiStore = new Store('guiStore');

/** instance Store of Game State. */
export const gameStateStore = new Store('gameStateStore');

/** instance Store of Assets Store. */
export const gameAssetsStore = new Store('gameAssetsStore');
