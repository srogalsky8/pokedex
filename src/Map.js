import React from 'react';
import GoogleMapReact from 'google-map-react';

let locations = [
  "32.734778,-117.152630",
  "32.734196,-117.139709",
  "32.833744,-117.067149",
  "32.819219,-117.029244",
  "32.907707,-116.797917"
];

let fetchLocations = (id) => {
  return Promise.resolve(locations);
  return fetch('https://api.craft-demo.net/pokemon/' + id, {
    headers: {
      'x-api-key': 'HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l'
    }
  }).then(response => {
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
  return fetchLocations(id).then(locations => {
    return formatLocations(locations);
  });
}

// TODO: get center, zoom level
let formatLocations = (locations) => {
  return locations.map(element => {
    let coordinates = element.split(',');
    return {
      lat: parseFloat(coordinates[0]),
      lng: parseFloat(coordinates[1])
    }
  })
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
              defaultCenter={{lat: 32.7157, lng: -117.1611}} // default SD
              defaultZoom={11}
              onGoogleApiLoaded={(maps, map) => this.positionMap(maps, map)}
            >
              {this.state.locations.map((element, idx) => {
                return <div lat={element.lat} lng={element.lng} key={idx}>
                  <img src={this.props.pokemon.sprites.front_default} width={50} alt={this.props.pokemon.name}/>
                </div>
              })}
            </GoogleMapReact>
          </div>
        </div>
      );
    } else return <div></div>;
  }
}

export default Map;
