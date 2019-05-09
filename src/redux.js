import { combineReducers, createStore } from 'redux';

// actions.js
export const setPokemonList = list => ({
  type: 'SET_POKEMON_LIST',
  payload: list
})

export const setBag = bag => ({
  type: 'SET_BAG',
  payload: bag
})

export const pokemonList = (state = [], action) => {
  switch (action.type) {
    case 'SET_POKEMON_LIST':
      return action.payload;
    default:
      return state;
  }
}

export const bag = (state = null, action) => {
  switch(action.type) {
    case 'SET_BAG':
      return action.payload;
    default:
      return state;
  }
}

// TODO: add a 'detailedList' to store detailed pokemon info
// TODO: add a 'locationsList' to store pokemon locations

export const reducers = combineReducers({
  pokemonList,
  bag
});

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState);
  return store;
}

export const store = configureStore();
