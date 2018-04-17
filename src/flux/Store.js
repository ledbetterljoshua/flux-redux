export class Store {
  constructor(dispatcher) {
    this.__listeners = []
    this.__state = this.getInitialState()
    dispatcher.register(this.__onDispatch.bind(this))
  }
  __onDispatch() {
    throw new Error("subclasses must override the __onDispatch of a Flux store")
  }
  getInitialState() {
    throw new Error("subclasses must override the getInitialState of a Flux store")
  }
  addListener(listener) {
    this.__listeners.push(listener)
  }
  __emitChange() {
    this.__listeners.forEach(listener => listener(this.__state))
  }
}