export class Store {

  constructor() {
    this.registered = [];
  }

  register(callback) {
    const id = (new Date()).getTime();
    this.registered.push({id, callback});
    return id;
  }

  unregister(id) {
    this.registered = this.registered.filter(({id: itemId}) => id !== itemId);
  }

  dispatch(payload) {
    this.registered.forEach(({id, callback}) => callback(payload, id));
  }
}

export const guiStore = new Store();
export const gameState = new Store();
