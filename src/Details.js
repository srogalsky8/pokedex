import React from 'react';
import Map from './Map';

// retrieves pokemon from the API
let fetchPokemon = (name) => {
  return fetch('https://pokeapi.co/api/v2/pokemon/' + name).then(response => {
    return response.json();
  })
}

// retrieves pokemon from the store
let getPokemon = (name) => {
  // if not store.get(name)
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
      return (
        <div>
          <div className="info-img-container">
            <div className="info-img-box">
              <img className="info-img" src={this.state.pokemon.sprites.front_default} alt={this.state.pokemon.name}/>
            </div>
            <div className="card-label text-center">{this.state.pokemon.name}</div>
          </div>
          <p>Height: {this.state.pokemon.height}</p>
          <p>Weight: {this.state.pokemon.weight}</p>
          <p>In bag: </p>
          <p>
            {this.state.pokemon.types.map(type => {
              return <span className="label">{type.type.name}</span>
            })}
          </p>
          <p>
          Bacon ipsum dolor amet alcatra brisket chuck jerky bresaola. Capicola ball tip landjaeger pig burgdoggen. Kielbasa short loin kevin salami landjaeger leberkas cow. Meatball jowl ball tip brisket shankle porchetta, filet mignon rump.
          </p>
          <div>
            <ul>
            {this.state.pokemon.stats.map(stat => {
              return <li>{stat.stat.name}: {stat.base_stat}</li>
            })}
            </ul>
          </div>
        </div>
      );
    }
  }
  getContentPane = () => {
    if(this.state.pokemon) {
      return <Map pokemon={this.state.pokemon}></Map>;
    }
  }
  render() {
    return (
      <div className="Details" style={{marginTop: "10em"}}>
        <div className="container details-container">
          <div className="info-pane">
            {this.getInfoPane()}
          </div>
          <div className="content-pane">
            {this.getContentPane()}
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
