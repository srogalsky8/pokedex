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
      pokemon: [],
      search: '',
      showBagOnly: false
    };
    fetchAllPokemon().then(list => {
      this.setState({pokemon: list})
    });
  }
  getFilteredPokemon = () => {
    let filteredPokemon = this.state.pokemon
    if(this.state.search) {
      filteredPokemon = filteredPokemon.filter(element => {
        return element.name.includes(this.state.search);
      })
    }
    return filteredPokemon;
  }
  getCards = () => {
    return this.getFilteredPokemon().map((element, idx) => {
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
  doSearch = (event) => {
    // TODO: add typeahead
    this.setState({search: event.target.value});
  }
  render() {
    return (
      <div className="Home container">
        <div className="list-toggle text-center">
          <div className="btn-group">
            <button className={"btn " + this.state.showBagOnly ? "" : "active"} onClick={() => this.setState({showBagOnly: false})}>All</button>
            <button className={"btn " + this.state.showBagOnly ? "active" : ""} onClick={() => this.setState({showBagOnly: true})}>Bag</button>
          </div>
        </div>
        <div className="list-search text-center">
          <input type="text" value={this.state.search} onChange={this.doSearch} placeholder={"Search"} />
        </div>
        <div className="card-deck">
          {this.getCards()}
        </div>
      </div>
    );
  }
}

export default Home;
