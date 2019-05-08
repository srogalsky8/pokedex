import React from 'react';

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
      return <div key={idx}>{element.name}</div>
    })
  }
  render() {
    return (
      <div className="Home">
        {this.getCards()}
      </div>
    );
  }
}

export default Home;
