export class Store {

  constructor(name = 'store') {
    this.nameStore = `mastermind-${name}`;
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

  dispatch(payload, save) {
    if (save) {
      const payloads = [this.nameStore, localStorage.getItem, JSON.parse]
        .reduce((value, funct) => funct(value)) || {};
      payloads[payload.actionType] = payload;
      localStorage.setItem(this.nameStore, JSON.stringify(payloads));
    }
    this.registered.forEach(({id, callback}) => callback(payload, id));
  }

  reload() {
    const payloads = [this.nameStore, localStorage.getItem, JSON.parse, Object.values]
      .reduce((value, funct) => funct(value)) || [];
    console.log(payloads);
    payloads.forEach((payload) => this.dispatch(payload));
  }
}

export const guiStore = new Store('guiStore');
export const gameStateStore = new Store('gameStateStore');
export const gameAssetsStore = new Store('gameAssetsStore');


