import React from 'react';

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

let fetchLocations = (id) => {
  return fetch('https://api.craft-demo.net/pokemon/' + id, {
    headers: {
      'x-api-key': 'HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l'
    }
  }).then(response => {
    console.log(response.text());
    return response.json();
  })
//   return fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, cors, *same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//         "Content-Type": "application/json",
//         // "Content-Type": "application/x-www-form-urlencoded",
//     },
//     redirect: "follow", // manual, *follow, error
//     referrer: "no-referrer", // no-referrer, *client
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
// })
}

let getLocations = (id) => {
  // if not store.get(id)
  return fetchLocations(id);
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
      return pokemon;
    }).then(pokemon => {
      return getLocations(pokemon.id);
    }).then(locations => {
      this.setState({locations: locations})
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
      return;
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
            Content
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
