import React from 'react';
import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'

// TODO: lazy load certain amount, and fetch more on infinite scroll trigger
// the more scalable solution
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
      showBagOnly: false,
      numCardsLoaded: 20
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
    return filteredPokemon.slice(0, this.state.numCardsLoaded);
  }
  getCards = () => {
    return this.getFilteredPokemon().map((element, idx) => {
      let id = idx+1;
      return (
        <div className="card-container text-center" key={id}>
          <Link className="card" to={"/pokemon/" + id}>
            <img className="card-img" alt={element.name} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png"} />
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
            <button className={"btn " + this.state.showBagOnly ? "" : "active"} onClick={() => this.setState({showBagOnly: false})}>All</button>
            <button className={"btn " + this.state.showBagOnly ? "active" : ""} onClick={() => this.setState({showBagOnly: true})}>Bag</button>
          </div>
        </div>
        <div className="list-search text-center">
          <input type="text" value={this.state.search} onChange={this.doSearch} placeholder={"Search"} />
        </div>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={this.state.numCardsLoaded < this.state.pokemon.length}
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

export default Home;
