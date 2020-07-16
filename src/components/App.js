import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import { setUser, unSetUser, setProfile, clearProfile, authStart, loggedIn, loggedOut } from '../redux/actions';
import { UNINITIALIZED, AUTHENTICATING, LOGGED_IN, LOGGED_OUT } from "../redux/reducers/auth";
import EditProfile from './EditProfile';
import Terms from './Terms';
import Privacy from './Privacy';
import Login from './Login';
import VetMap from './VetMap';
import MessagesPage from './messages/MessagesPage'
import NavbarPage from './Nav';
import NotLogged from './NotLogged';
import ReactGA from 'react-ga';
import NewChat from './messages/NewChat';
import DogProfile from './DogProfile'
import ThankYou from './ThankYou';
import SpinnerPage from './Spinner';
import Notification from './Notification';
import UserProfile from './PublicProfile';
import LoadingPage from './LoadingPage';
import NewProfile from './NewProfile';
import AddNewDog from './AddNewDog';
import PublicFeed from './PublicFeed';

function App() {
  let db = firebase.firestore();
  const dispatch = useDispatch();

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
    dispatch(authStart())
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // currUser = user;
        dispatch(setUser(user))
        let userID;

        let userData = {}
        let userProfile = {}
        // let userProfile = []
        db.collection("Users")
          .where("email", "==", user.email).limit(1).get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              userData = { data: doc.data(), id: doc.id }
              userID = doc.id;
            })
          }).then(res => {
            db.collection("Dogs")
              .where("ownerId", "==", user.uid).get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  userProfile = { data: doc.data(), id: doc.id }
                  // let dog = { data: doc.data(), id: doc.id }
                  // userProfile.append(dog)
                })
              }).then(res => {
                dispatch(setProfile(userProfile));
                // dispatch(setUser(userData));
                dispatch(loggedIn());
              })
          })
      } else {
        console.log('else app.js')
        dispatch(unSetUser());
        dispatch(clearProfile());
        dispatch(loggedOut());
      }
    });
  }, [])

  const authState = useSelector(state => state.auth);

  switch (authState) {
    case LOGGED_OUT:
      return (
        <Router>
          <div className="App">
            <header className="App-header">
              <NotLogged />
            </header>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/outside' component={GMap} />
              <Route exact path='/petcare' component={DayCare} />
              <Route exact path='/vets' component={VetMap} />
              <Route exact path='/contact' component={ContactPage} />
              <Route exact path='/terms' component={Terms} />
              <Route exact path='/privacy' component={Privacy} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/thankyou' component={ThankYou} />
              <Route exact path='/spin' component={SpinnerPage} />
              <Route exact path='/notify' component={Notification} />
              <Route exact path='/load' component={LoadingPage} />
              {/* <Route><Redirect to="/" /></Route> */}
            </Switch>
          </div>
        </Router>
      )
    case LOGGED_IN:
      return (
        <Router>
          <div className="App">
            <header className="App-header">
              <NavbarPage />
            </header>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/messages' component={Chat} />
              <Route exact path='/about' component={About} />
              <Route exact path='/outside' component={GMap} />
              <Route exact path='/furends' component={Furends} />
              <Route exact path='/petcare' component={DayCare} />
              <Route exact path='/vets' component={VetMap} />
              <Route exact path='/contact' component={ContactPage} />
              <Route exact path='/feed' component={PublicFeed} />
              <Route exact path='/editprofile/:dogId' component={EditProfile} />
              <Route exact path='/newprofile' component={NewProfile} />
              <Route exact path='/terms' component={Terms} />
              <Route exact path='/privacy' component={Privacy} />
              <Route exact path='/login'><Redirect to="/feed"/></Route>
              <Route exact path='/thankyou' component={ThankYou} />
              <Route exact path='/messagestest' component={MessagesPage} />
              <Route exact path='/profile/:dogId' component={DogProfile} />
              <Route exact path='/add' component={AddNewDog} />
              <Route path='/user/:dogId' component={UserProfile} />
              <Route path='/newchat/' component={NewChat} />
              <Route><Redirect to="/newprofile" /></Route>
            </Switch>
          </div>
        </Router>
      )
    case UNINITIALIZED:
    case AUTHENTICATING:
    default:
      return <div className='text-center'><LoadingPage /></div>
    //       return <Route exact path='/spin' component={SpinnerPage} />
  }
}

export default App;