import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setPokemonList } from './redux';

import InfiniteScroll from 'react-infinite-scroller';

// TODO: lazy load certain amount, and fetch more on infinite scroll trigger
// the more scalable solution
let fetchPokemonList = () => {
  return fetch('https://pokeapi.co/api/v2/pokemon/?limit=151').then(response => {
    return response.json()
  }).then(json => {
    return json.results.map((value, idx) => {
      value.id = idx+1;
      return value
    })
  })
}

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pokemon: [],
      search: '',
      showBagOnly: false,
      numCardsLoaded: 20
    };

    // fetch pokemonList if we haven't before
    if(props.pokemonList.length === 0) {
      fetchPokemonList().then(list => {
        props.setPokemonList(list);
      });
    }
  }
  getFilteredPokemon = () => {
    let filteredPokemon = this.props.pokemonList
    if(this.state.search) {
      filteredPokemon = filteredPokemon.filter(element => {
        return element.name.includes(this.state.search);
      })
    }
    if(this.state.showBagOnly) {
      filteredPokemon = filteredPokemon.filter(element => {
        return this.props.bag[element.id];
      })
    }
    return filteredPokemon.slice(0, this.state.numCardsLoaded);
  }
  getCards = () => {
    return this.getFilteredPokemon().map((element) => {
      return (
        <div className="card-container text-center" key={element.id}>
          <Link className="card" to={"/pokemon/" + element.name}>
            <img className="card-img" alt={element.name} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + element.id + ".png"} />
          </Link>
          <div className="card-label">{element.name}</div>
        </div>
      );
    })
  }
  doSearch = (event) => {
    // TODO: add typeahead
    this.setState({
      search: event.target.value,
      numCardsLoaded: 20
    });
  }
  loadMore = () => {
    this.setState({numCardsLoaded: this.state.numCardsLoaded + 20})
  }
  render() {
    return (
      <div className="Home container" style={{marginTop: "10em"}}>
        <div className="list-toggle text-center">
          <div className="btn-group">
            <button className={"btn " + (this.state.showBagOnly ? "" : "active")} onClick={() => this.setState({showBagOnly: false, numCardsLoaded: 20})}>All</button>
            <button className={"btn " + (this.state.showBagOnly ? "active" : "")} onClick={() => this.setState({showBagOnly: true, numCardsLoaded: 20})}>Bag</button>
          </div>
        </div>
        <div className="list-search text-center">
          <input type="text" value={this.state.search} onChange={this.doSearch} placeholder={"Search"} />
        </div>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={this.state.numCardsLoaded < this.props.pokemonList.length}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
        <div className="card-deck">
          {this.getCards()}
        </div>
        </InfiniteScroll>
      </div>
    );
  }
}

let mapDispatchToProps = {
  setPokemonList
};

let mapStateToProps = (state) => {
  return {
    pokemonList: state.pokemonList,
    bag: state.bag
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
