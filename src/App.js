import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import PExtended from './components/extended';
import About from './components/About';
import GMap from './components/GoogleMap';
import ContactPage from './components/Contact';

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
          <Route path='/map' component={GMap} />
          <Route path='/contact' component={ContactPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
