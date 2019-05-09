import React from 'react';
import { connect } from 'react-redux';
import { setBag } from '../redux';

const setCookie = (name, value) => {
  let cookie = name + '=' + JSON.stringify(value);
  document.cookie = cookie;
}

class Info extends React.Component {
  constructor(props) {
    super(props);
  }
  toggleBag = () => {
    let id = this.props.pokemon.id;
    let newBag = Object.assign({}, this.props.bag);
    if(newBag[id]) {
      delete newBag[id];
    } else {
      newBag[id] = true;
    }
    setCookie('bag', newBag);
    this.props.setBag(newBag);
  }
  render() {
    return (
      <div className="Info">
        <div className="info-img-container">
          <div className="info-img-box">
            <img className="info-img" src={this.props.pokemon.sprites.front_default} alt={this.props.pokemon.name}/>
          </div>
          <div className="card-label text-center">{this.props.pokemon.name}</div>
        </div>
        <p>Height: {this.props.pokemon.height}</p>
        <p>Weight: {this.props.pokemon.weight}</p>
        <p>In bag: <input
            name="inBag"
            type="checkbox"
            checked={this.props.bag[this.props.pokemon.id]}
            onChange={this.toggleBag} />
        </p>
        <p>
          {this.props.pokemon.types.map(type => {
            return <span className="label">{type.type.name}</span>
          })}
        </p>
        <p>
        Bacon ipsum dolor amet alcatra brisket chuck jerky bresaola. Capicola ball tip landjaeger pig burgdoggen. Kielbasa short loin kevin salami landjaeger leberkas cow. Meatball jowl ball tip brisket shankle porchetta, filet mignon rump.
        </p>
        <div>
          <ul>
          {this.props.pokemon.stats.map(stat => {
            return <li>{stat.stat.name}: {stat.base_stat}</li>
          })}
          </ul>
        </div>
      </div>
    );
  }
}


let mapStateToProps = (state) => {
  return {
    bag: state.bag
  };
}

let mapDispatchToProps = {
  setBag
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
