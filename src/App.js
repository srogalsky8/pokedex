import React from 'react';
import Home from './Home'
import Details from './Details'
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/pokemon/:name" component={Details} />
        </div>
      </Router>
    );
  }
}

export default App;
