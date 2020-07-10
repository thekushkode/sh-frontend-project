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




function App() {
  let db = firebase.firestore();
  const dispatch = useDispatch();
  let currUser;

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
          <Route path='/messages' component={Chat} />
          <Route path='/profile' component={PExtended} />
          <Route path='/about' component={About} />
          <Route path='/outside' component={GMap} />
          <Route path='/furends' component={Furends} />
          <Route path='/petcare' component={DayCare} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/feed2' component={SocialPage2} />
          <Route path='/editprofile' component={EditProfile} />
          <Route path='/test' component={TestMap} />
          <Route path='/terms' component={Terms} />
          <Route path='/privacy' component={Privacy} />
          <Route path='/login' component={Login} />
          <Route path='/vets' component={VetMap} />
          <Route path='/messagestest' component={MessagesPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
