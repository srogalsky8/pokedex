import React from 'react';
import GoogleMapReact from 'google-map-react';

// dummy data
const locations = [
  "32.734778,-117.152630",
  "32.734196,-117.139709",
  "32.833744,-117.067149",
  "32.819219,-117.029244",
  "32.907707,-116.797917"
];

const fetchLocations = (id) => {
  return Promise.resolve(locations);
  // browser does auto preflight because of custom header
  // api isn't supporting OPTIONS
  // return fetch('https://api.craft-demo.net/pokemon/' + id, {
  //   headers: {
  //     'x-api-key': 'HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l'
  //   }
  // }).then(response => {
  //   return response.json();
  // })
}

const getLocations = (id) => {
  // if not store.get(id)
  return fetchLocations(id).then(locations => {
    return formatLocations(locations);
  });
}

const formatLocations = (locations) => {
  return locations.map(element => {
    let coordinates = element.split(',');
    return {
      lat: parseFloat(coordinates[0]),
      lng: parseFloat(coordinates[1])
    }
  })
}

// map pin component
const Marker = ({ pokemon }) => {
  return (
    <img src={pokemon.sprites.front_default} width={50} alt={pokemon.name}/>
  );
}

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: null
    }
    getLocations(props.pokemon.id).then(locations => {
      this.setState({locations: locations})
    })
  }
  positionMap = (api) => {
    const bounds = new api.maps.LatLngBounds();
    for(let i in this.state.locations) {
      bounds.extend(new api.maps.LatLng(
        this.state.locations[i].lat,
        this.state.locations[i].lng
      ));
    }
    api.map.fitBounds(bounds)
  }
  render() {
    if(this.state.locations) {
      return (
        <div className="Map">
          <div style={{ height: '30em', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyAEJ3rGsi9pShMUPjS9_CNALgEX5l_l3iA' }}
              defaultCenter={{lat: 32.7157, lng: -117.1611}} // default San Diego
              defaultZoom={11}
              yesIWantToUseGoogleMapApiInternals={true}
              onGoogleApiLoaded={(maps, map) => this.positionMap(maps, map)}
            >
            {this.getMarkers}
              {this.state.locations.map((element, idx) => {
                return <Marker lat={element.lat} lng={element.lng} key={idx} pokemon={this.props.pokemon}></Marker>
              })}
            </GoogleMapReact>
          </div>
        </div>
      );
    } else return <div></div>;
  }
}

export default Map;
