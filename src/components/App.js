import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Home from './Home';
import Chat from './Chat';
import About from './About';
import GMap from './GoOutside';
import ContactPage from './Contact';
import DayCare from './FindDaycare';
import Furends from './FindFurends';
import firebase from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, unSetUser, setProfile, clearProfile, authStart, loggedIn, loggedOut, loadInbox } from '../redux/actions';
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
import Konami from 'react-konami-code';
import { MDBContainer, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn } from "mdbreact";
import Adopt from './Adopt';
import Lost from './Lost';
import HashGallery from './HashGallery';

function App() {
  let db = firebase.firestore();
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const [modal, setModal] = useState(false);
  let history = useHistory();

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
        dispatch(setUser(user))

        let primaryDogProfile = {};
        let inbox = [];
        db.collection("Dogs")
          .where("ownerId", "==", user.uid).limit(1).get()
          .then(function (querySnapshot) {
            if (querySnapshot.empty) {
              history.push('/newprofile')
            } else {
              querySnapshot.forEach(function (doc) {
                primaryDogProfile = { data: doc.data(), id: doc.id }
                dispatch(setProfile(primaryDogProfile));
              })
            }
            dispatch(loggedIn());
          })
          db.collection("Messages")
          .where("members", "array-contains", user.uid).get()
          .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                inbox.push(doc.data())
                dispatch(loadInbox(inbox));
              })
            dispatch(loggedIn());
          })
      } else {
        dispatch(unSetUser());
        dispatch(clearProfile());
        dispatch(loggedOut());
      }
    });
  }, [])

  function easterEgg() {
    // alert('Hey, you typed the Konami Code!');
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(res => res.json())
      .then(res => {
        let url = res.message;
        setUrl(url)
        setModal(true)

      })
  }

  function toggle() {
    setModal(!modal)
  }

  const authState = useSelector(state => state.auth);

  switch (authState) {
    case LOGGED_OUT:
      return (
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
              <Route exact path='/adopt' component={Adopt} />
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
            <Konami action={easterEgg}>
              <MDBContainer>
                <MDBModal isOpen={modal} toggle={toggle}>
                  <MDBModalHeader className='text-white aqua-gradient' toggle={toggle}>Look- A Dog!</MDBModalHeader>
                  <MDBModalBody>
                    <img src={`${url}`} className='img-fluid' alt='random dog' />
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn className='btn-rounded purple-gradient' onClick={toggle}>Close</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>
              </MDBContainer>
            </Konami>
          </div>
      )
    case LOGGED_IN:
      return (
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
              <Route exact path='/adopt' component={Adopt} />
              <Route exact path='/contact' component={ContactPage} />
              <Route exact path='/feed' component={PublicFeed} />
              <Route exact path='/editprofile/:dogId' component={EditProfile} />
              <Route exact path='/newprofile' component={NewProfile} />
              <Route exact path='/terms' component={Terms} />
              <Route exact path='/privacy' component={Privacy} />
              <Route exact path= '/lost' component={Lost} />
              {/* <Route exact path='/login'><Redirect to="/feed" /></Route> */}
              <Route exact path='/thankyou' component={ThankYou} />
              {/* <Route exact path='/messagestest' component={MessagesPage} /> */}
              <Route exact path='/profile/:dogId' component={DogProfile} />
              <Route exact path='/add' component={AddNewDog} />
              <Route path='/user/:dogId' component={UserProfile} />
              <Route path='/newchat/' component={NewChat} />
              <Route path='/lost' component={Lost} />
              <Route path='/hashtags' component={HashGallery} />
              <Redirect to="/newprofile" />
            </Switch>
            <Konami action={easterEgg} style={{}}>
              <MDBContainer>
                <MDBModal isOpen={modal} toggle={toggle}>
                  <MDBModalHeader className='text-white aqua-gradient' toggle={toggle}>Look- A Dog!</MDBModalHeader>
                  <MDBModalBody>
                    <img src={`${url}`} className='img-fluid' alt='random dog' />
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn className='btn-rounded purple-gradient' onClick={toggle}>Close</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>
              </MDBContainer>
            </Konami>
          </div>
      )
    case UNINITIALIZED:
    case AUTHENTICATING:
    default:
      return <div className='text-center'><LoadingPage /></div>
  }
}

export default App;