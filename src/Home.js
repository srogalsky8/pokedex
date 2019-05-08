import React from 'react';

// TODO: lazy load certain amount, load more on scroll
let fetchAllPokemon = () => {
  return fetch('https://pokeapi.co/api/v2/pokemon/?limit=151').then(response => {
    return response.json()
  }).then(json => {
    return json.results
  })
}

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pokemon: []
    };
    fetchAllPokemon().then(list => {
      this.setState({pokemon: list})
    });
  }
  getCards = () => {
    return this.state.pokemon.map((element, idx) => {
      return (
        <div className="card-container text-center">
          <div className="card" key={idx}>
            <img className="card-img" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (idx+1) + ".png"} />
          </div>
          <div className="card-label">{element.name}</div>
        </div>
      );
    })
  }
  render() {
    return (
      <div className="Home container">
        <div className="card-deck">
          {this.getCards()}
        </div>
      </div>
    );
  }
}

export default Home;
