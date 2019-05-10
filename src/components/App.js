import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { setBag } from '../redux';

import Home from './Home'
import Details from './Details'

const readCookie = (name) => {
  let result = document.cookie.match(new RegExp(name + '=([^;]+)'));
  result && (result = JSON.parse(result[1]));
  return result;
}

const persistedBag = readCookie('bag');

class App extends React.Component {
  constructor(props) {
    super(props);
    props.setBag(persistedBag ? persistedBag : {});
  }
  render() {
    console.log(process.env);
    return (
        <Router
        basename="/pokedex"
        >
          <div className="App">
            <Route exact path="/" component={Home} />
            <Route path="/pokemon/:name" component={Details} />
          </div>
        </Router>
    );
  }
}

let mapDispatchToProps = {
  setBag
};

export default connect(null, mapDispatchToProps)(App);
