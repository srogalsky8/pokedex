import React from 'react';
import Map from './Map';
import Info from './InfoPane';

// retrieves pokemon from the API
let fetchPokemon = (name) => {
  return fetch('https://pokeapi.co/api/v2/pokemon/' + name).then(response => {
    return response.json();
  })
}

// retrieves pokemon from the store
let getPokemon = (name) => {
  // TODO: check store, and if not in store then fetch and dispatch
  return fetchPokemon(name);
}

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: null,
      locations: null
    }
    getPokemon(props.match.params.name).then((pokemon) => {
      this.setState({pokemon: pokemon})
    })
  }
  getInfoPane = () => {
    if(this.state.pokemon) {
      return <Info pokemon={this.state.pokemon}></Info>
    }
  }
  getContentPane = () => {
    if(this.state.pokemon) {
      return (
        <div>
          <Map pokemon={this.state.pokemon}></Map>
          <div style={{marginTop: '2em'}}>
            Abilities:
            {this.state.pokemon.abilities.map((value, idx) => {
              return <div key={idx}>{value.ability.name}</div>
            })}
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="Details" style={{marginTop: "10em"}}>
        <div className="container">
          <div className="details-container">
          <div className="info-pane">
            {this.getInfoPane()}
          </div>
          <div className="content-pane">
            {this.getContentPane()}
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
