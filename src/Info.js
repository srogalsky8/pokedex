import React from 'react';

class Info extends React.Component {
  constructor(props) {
    super(props);
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
        <p>In bag: </p>
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

export default Info;
