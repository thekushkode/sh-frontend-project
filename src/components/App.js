import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Chat from './Chat';
import PExtended from './extended';
import About from './About';
import GMap from './GoOutside';
import ContactPage from './Contact';
import SocialPage2 from './feed2';
import DayCare from './FindDaycare';
import Furends from './FindFurends';
import Friend from './Friend';
import firebase from '../firebase';
import { useDispatch } from 'react-redux';
import { setUser, unSetUser, setProfile } from '../redux/actions';
import EditProfile from './EditProfile';
import { TestMap } from './TestMap';
import Terms from './Terms';
import Privacy from './Privacy';
import Login from './Login';
import VetMap from './VetMap';
import MessagesPage from './messages/MessagesPage'
import NavbarPage from './Nav';
import NotLogged from './NotLogged';
import ReactGA from 'react-ga';




function App() {
  let db = firebase.firestore();
  const dispatch = useDispatch();
  let currUser;

  ReactGA.initialize('UA-172377344-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
  ReactGA.pageview('/');
  ReactGA.pageview('/messages');
  ReactGA.pageview('/profile');
  ReactGA.pageview('/about');
  ReactGA.pageview('/editprofile');
  ReactGA.pageview('/outside');
  ReactGA.pageview('/furends');
  ReactGA.pageview('/vets');
  ReactGA.pageview('/petcare');
  ReactGA.pageview('/feed2');
  ReactGA.pageview('/login');
  ReactGA.pageview('/terms');
  ReactGA.pageview('/privacy');

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        currUser = user;
        // dispatch(setUser(user))
        let userID;

        let userData = {}
        let userProfile = {}
        db.collection("Users")
          .where("email", "==", user.email).limit(1).get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              userData = { data: doc.data(), id: doc.id }
              userID = doc.id;
            })
          }).then(res => {
            db.collection("Dogs")
              .where("ownerId", "==", userID).get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  userProfile = { data: doc.data(), id: doc.id }
                })
              }).then(res => {
                dispatch(setProfile(userProfile));
                dispatch(setUser(userData));
              })
          })



      } else {
        console.log('else app.js')
        dispatch(unSetUser());
      }
    });
  })


  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {currUser ? <NavbarPage /> : <NotLogged />}


        </header>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/messages' component={Chat} />
          <Route exact path='/profile' component={PExtended} />
          <Route exact path='/about' component={About} />
          <Route exact path='/outside' component={GMap} />
          <Route exact path='/furends' component={Furends} />
          <Route exact path='/petcare' component={DayCare} />
          <Route exact path='/contact' component={ContactPage} />
          <Route exact path='/feed2' component={SocialPage2} />
          <Route exact path='/editprofile' component={EditProfile} />
          <Route exact path='/test' component={TestMap} />
          <Route exact path='/terms' component={Terms} />
          <Route exact path='/privacy' component={Privacy} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/vets' component={VetMap} />
          <Route exact path='/messagestest' component={MessagesPage} />
          <Route path='/search/' component={Friend} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
