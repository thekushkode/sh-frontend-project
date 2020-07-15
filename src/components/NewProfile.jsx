import React, { useState, useEffect } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFileInput,
  MDBContainer,
  MDBAvatar,
  MDBBtn,
  MDBSelect,
  MDBSelectOption,
  MDBSelectOptions,
  MDBSelectInput,
  Link
} from 'mdbreact';
import './EditProfile.css';
import Dog from './images/avatar.png';
import NavbarPage from './Nav';
import FooterPage from "./Footer";
import firebase from '../firebase';
import { useSelector } from 'react-redux';
import { setProfile } from '../redux/actions';
import { useHistory } from "react-router-dom";
import InputPage from './InputPage';
import UploadFile from './Upload';

const db = firebase.firestore();

function NewProfile(props) {

  const history = useHistory();
  //grabs redux state
  const user = useSelector(state => state.user);
  // const profile = useSelector(state => state.profile);
  const [dogId, setDogId] = useState('');
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [userState, setUserState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [temperament, setTemperament] = useState('');
  const [size, setSize] = useState('');
  const [spayNeut, setSpayNeut] = useState('');
  const [vaccines, setVaccines] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    // console.log(user);
    if (user && !dogId) {
      db.collection('Dogs').where('ownerId', '==', user.id).get()
        .then(doc => {
            let dog = null
            if (!dog) {
              setDogId(doc.id);
              dog = doc.data();
            }
            if (dog) {
              setDogName(dog.dogName);
              setBreed(dog.breed);
              setStreet(dog.street);
              setCity(dog.city);
              setUserState(dog.userState);
              setZipcode(dog.zipcode);
              setTemperament(dog.temperament);
              setSize(dog.size);
              setSpayNeut(dog.spayNeut);
              setVaccines(dog.vaccines);
              setBio(dog.bio);
              setAvatar(dog.avatar)
              setProfile(dog);
              console.log(dog.avatar);
              console.log(dog);
            }
        })
        // .then(querySnapshot => {
        //   // console.log(querySnapshot);
        //   let dog = null;
        //   querySnapshot.forEach(doc => {
        //     if (!dog) {
        //       setDogId(doc.id);
        //       dog = doc.data();
        //     }
        //     if (dog) {
        //       setDogName(dog.dogName);
        //       setBreed(dog.breed);
        //       setStreet(dog.street);
        //       setCity(dog.city);
        //       setUserState(dog.userState);
        //       setZipcode(dog.zipcode);
        //       setTemperament(dog.temperament);
        //       setSize(dog.size);
        //       setSpayNeut(dog.spayNeut);
        //       setVaccines(dog.vaccines);
        //       setBio(dog.bio);
        //       setAvatar(dog.avatar)
        //       setProfile(dog);
        //       console.log(dog.avatar);
        //       console.log(dog);
        //     }
        //   })
        // })
    }
  })

  const updateProfile = (e) => {
    if (!dogId) {
      // let user = firebase.auth().currentUser;
      db.collection('Dogs').add({
        dogName,
        breed,
        street,
        city,
        userState,
        zipcode,
        temperament,
        size,
        spayNeut,
        vaccines,
        avatar,
        bio,
        ownerId: user.id
      })
    } else {
      db.collection('Dogs').doc(dogId).set({
        dogName,
        breed,
        street,
        city,
        userState,
        zipcode,
        temperament,
        size,
        spayNeut,
        vaccines,
        avatar,
        bio
      }, { merge: true })
      console.log(avatar);
    }
    history.push(`/profile/${props.match.params.dogId}`);
  }

  return (
    <div>
      <header style={{ marginBottom: '120px' }}>
        <NavbarPage />
      </header>
      <div id='profile-v1' className='mb-5' style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <MDBContainer fluid className='mb-5'>
          <section className='section team-section mb-5'>
            <MDBRow center className='text-center'>
              <MDBCol md='8' className='mb-r'>
                <MDBCard cascade className='cascading-admin-card user-card'>
                  <div className='admin-up d-flex justify-content-start'>
                    <div className='data'>
                      <h5 className='font-weight-bold dark-grey-text mt-2 ml-2'>
                        {/* Dog's Profile -{' '} */}
                        <span className='text-muted'>Complete your profile</span>
                      </h5>
                    </div>
                  </div>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol md='6'>
                        <MDBInput type='text' name='dogname' value={dogName} label='Dogs Name' onChange={(e) => { if (!null) { { setDogName(e.target.value) } } }} />
                      </MDBCol>
                      <MDBCol md='6'>
                        <MDBInput type='text' name='breed' value={breed} label='Breed' onChange={(e) => { setBreed(e.target.value) }} />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md='12'>
                        <MDBInput type='text' name='street' value={street} label='Address' onChange={(e) => { e.target.value && setStreet(e.target.value) }} />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol lg='4' md='12'>
                        <MDBInput type='text' name='city' value={city} label='City' onChange={(e) => { setCity(e.target.value) }} />
                      </MDBCol>
                      <MDBCol lg='4' md='6'>
                        <MDBInput type='text' name='state' value={userState} label='State' onChange={(e) => { setUserState(e.target.value) }} />
                      </MDBCol>
                      <MDBCol lg='4' md='6'>
                        <MDBInput type='text' name='zipcode' value={zipcode} label='Postal code' onChange={(e) => { setZipcode(e.target.value) }} />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol lg='3' md='6'>
                        <MDBSelect label='Temperament' getValue={(e) => setTemperament(e[0])} value={temperament}>
                          <MDBSelectInput value={temperament} />
                          <MDBSelectOptions>
                            <MDBSelectOption name='Friendly' value='Friendly'>Friendly</MDBSelectOption>
                            <MDBSelectOption name='Aggressive' value='Aggressive'>Aggressive</MDBSelectOption>
                          </MDBSelectOptions>
                        </MDBSelect>
                      </MDBCol>
                      <MDBCol lg='3' md='6'>
                        <MDBSelect label='Size' getValue={(e) => setSize(e[0])} value={size}>
                          <MDBSelectInput value={size} />
                          <MDBSelectOptions>
                            <MDBSelectOption name='Small' value='Small'>Small</MDBSelectOption>
                            <MDBSelectOption name='Medium' value='Medium'>Medium</MDBSelectOption>
                            <MDBSelectOption name='Large' value='Large'>Large</MDBSelectOption>
                            <MDBSelectOption name='X-Large' value='X-Large'>X-Large</MDBSelectOption>
                          </MDBSelectOptions>
                        </MDBSelect>
                      </MDBCol>
                      <MDBCol lg='3' md='6'>
                        <MDBSelect label='Spayed or Neutered?' getValue={(e) => setSpayNeut(e[0])} value={spayNeut}>
                          <MDBSelectInput value={spayNeut} />
                          <MDBSelectOptions>
                            <MDBSelectOption name='True' value='True'>True</MDBSelectOption>
                            <MDBSelectOption name='False' value='False'>False</MDBSelectOption>
                          </MDBSelectOptions>
                        </MDBSelect>
                      </MDBCol>
                      <MDBCol lg='3' md='6'>
                        <MDBSelect label='Has Vaccines' getValue={(e) => setVaccines(e[0])} value={vaccines}>
                          <MDBSelectInput value={vaccines} />
                          <MDBSelectOptions>
                            <MDBSelectOption name='True' value='True'>True</MDBSelectOption>
                            <MDBSelectOption name='False' value='False'>False</MDBSelectOption>
                          </MDBSelectOptions>
                        </MDBSelect>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md='12' className='about-text'>
                        <h4 className='text-muted text-left my-4'>
                          <strong>Bio</strong>
                        </h4>
                        <MDBInput type='textarea' value={bio} label="Tell about your dog!" onChange={(e) => { setBio(e.target.value) }} />
                      </MDBCol>
                    </MDBRow>
                    {/* <MDBBtn color='info' rounded onClick={updateProfile}> */}
                      <Link style={{ textDecoration: 'none' }} to={`/profile/${dogId}`}><MDBBtn color='info' rounded onClick={updateProfile}>save</MDBBtn></Link>
                  {/* </MDBBtn> */}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md='4' className='mb-r'>
                <MDBCard className='profile-card'>
                  <MDBAvatar
                    tag='img'
                    alt='Default Dog Profile Image'
                    // src={(avatar ? URL.createObjectURL(avatar) : Dog)}
                    src={(avatar ? avatar : Dog)}
                    style={{ maxWidth: '300px', maxHeight: '300px', margin: '0 auto' }}
                    className='rounded-circle z-depth-1-half mb-4 mt-4'
                  />

                  <InputPage value={avatar} onUpload={(imgRef) => {
                    console.log('uploaded', imgRef)
                    setAvatar(imgRef)
                  }} />


                  {/* 
                  <MDBBtn className='aqua-gradient mb-3 mx-auto' size='sm' rounded>
                      Add Photo
                  </MDBBtn> 
                  <MDBCardBody className='pt-0 mt-0'>
                    <h3 className='mb-3 font-bold'>
                      <strong>Ike</strong>
                    </h3>
                    <h6 className='font-bold cyan-text mb-4'>Breed: Rottweiler</h6>
                    <p className='mt-4 text-muted'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip consequat.
                  </p>
                    <MDBBtn color='info' size='sm' rounded>
                      Follow
                  </MDBBtn>
                  </MDBCardBody>
                  */}
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </section>
        </MDBContainer>
      </div>
      <footer>
        <FooterPage />
      </footer>
    </div>
  );
}

export default NewProfile;
