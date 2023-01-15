export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'});
  let listeners = [];

  return {
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners = listeners.filter((l) => l !== fn);
        },
      }
    },
    dispatch(action) {
      listeners.forEach( (listener)=> {
        state = rootReducer(state, action);
        listener(state);
      });
    },
    getState() {
      return JSON.parse(JSON.stringify(state));
    },
  }
}

// Extra Task - Переписать на класс
