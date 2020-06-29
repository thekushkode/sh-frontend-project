import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Chat from './Chat';
import PExtended from './extended';
import About from './About';
import GMap from './GoOutside';
import ContactPage from './Contact';
import SocialPage2 from './feed2';
import DayCare from './FindDaycare';
import Furends from './FindFurends';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">

        </header>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/messages' component={Chat} />
          <Route path='/profile' component={PExtended} />
          <Route path='/about' component={About} />
          <Route path='/outside' component={GMap} />
          <Route path='/furends' component={Furends} />
          <Route path='/petcare' component={DayCare} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/feed2' component={SocialPage2} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
