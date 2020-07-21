import React, { useState, useEffect } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBContainer,
  MDBAvatar,
  MDBBtn,
  MDBSelect,
  MDBSelectOption,
  MDBSelectOptions,
  MDBSelectInput,
} from 'mdbreact';
import './EditProfile.css';
import NavbarPage from './Nav';
import FooterPage from "./Footer";
import firebase from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile } from '../redux/actions';
import { useHistory } from "react-router-dom";
import InputPage from './InputPage';

const db = firebase.firestore();
const defaultDogImg = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/default-avatar.png?alt=media';

function randomString(length) {
  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

let id = randomString(20)

function NewProfile(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  //grabs redux state
  const user = useSelector(state => state.user);
  // const profile = useSelector(state => state.profile);
  const [dogId, setDogId] = useState('');
  const [ownerName, setOwnerName] = useState('');
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
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [avatar, setAvatar] = useState(defaultDogImg);


  useEffect(() => {
    if (user.uid && !dogId) {
      db.collection('Dogs').where('ownerId', '==', user.uid).get()
        .then(querySnapshot => {
          let dog = null;
          querySnapshot.forEach(doc => {
            if (!dog) {
              setDogId(id);
              dog = doc.data();
            }
            if (dog) {
              let userProfile = { data: doc.data(), id: id }
              setDogName(dog.dogName);
              setOwnerName(dog.ownerName);
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
              setFacebook(dog.facebook ? dog.facebook : null)
              setInstagram(dog.instagram ? dog.instagram : null)
              dispatch(setProfile(userProfile));
            }
          })
        })
    }
  })

  const updateProfile = (e) => {
    e.preventDefault()
    if (!dogId) {
      db.collection('Dogs').doc(id).set({
        dogName,
        ownerName,
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
        facebook,
        instagram,
        ownerId: user.uid
      })
        .then((querySnapshot) => {
          let userProfile = { data: querySnapshot, id: id }
          dispatch(setProfile(userProfile));
          history.push(`/profile/${id}`);
        })
    }
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
              <MDBCol md='12' className='mb-r'>
                <MDBCard cascade className='cascading-admin-card user-card'>
                  <div className='admin-up d-flex justify-content-start'>
                    <div className='data'>
                      <h5 className='font-weight-bold dark-grey-text mt-2 ml-2'>
                        <span className='text-muted'>Complete your profile</span>
                      </h5>
                    </div>
                  </div>
                  <MDBCardBody>
                    <form onSubmit={updateProfile}>
                      <MDBRow>
                        <MDBCol md='4'>
                          <MDBInput type='text' name='ownername' value={ownerName} label='Owner Name' onChange={(e) => { if (!null) { setOwnerName(e.target.value) }}} required />
                        </MDBCol>
                        <MDBCol md='4'>
                          <MDBInput type='text' name='dogname' value={dogName} label='Dogs Name' onChange={(e) => { if (!null) { setDogName(e.target.value) }}} required />
                        </MDBCol>
                        <MDBCol md='4'>
                          <MDBInput type='text' name='breed' value={breed} label='Breed' onChange={(e) => { setBreed(e.target.value) }} required />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md='12'>
                          <MDBInput type='text' name='street' value={street} label='Address' onChange={(e) => { e.target.value && setStreet(e.target.value) }} />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol lg='4' md='12'>
                          <MDBInput type='text' name='city' value={city} label='City' onChange={(e) => { setCity(e.target.value) }} required />
                        </MDBCol>
                        <MDBCol lg='4' md='6'>
                          <MDBInput type='text' name='state' value={userState} label='State' onChange={(e) => { setUserState(e.target.value) }} required />
                        </MDBCol>
                        <MDBCol lg='4' md='6'>
                          <MDBInput type='text' name='zipcode' value={zipcode} label='Postal code' onChange={(e) => { setZipcode(e.target.value) }} required />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol lg='3' md='6'>
                          <MDBSelect label='Temperament' getValue={(e) => setTemperament(e[0])} value={temperament}>
                            <MDBSelectInput value={temperament} required />
                            <MDBSelectOptions>
                              <MDBSelectOption name='Friendly' value='Friendly'>Friendly</MDBSelectOption>
                              <MDBSelectOption name='Aggressive' value='Aggressive'>Aggressive</MDBSelectOption>
                            </MDBSelectOptions>
                          </MDBSelect>
                        </MDBCol>
                        <MDBCol lg='3' md='6'>
                          <MDBSelect label='Size' getValue={(e) => setSize(e[0])} value={size}>
                            <MDBSelectInput value={size} required />
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
                            <MDBSelectInput value={spayNeut} required />
                            <MDBSelectOptions>
                              <MDBSelectOption name='True' value='True'>True</MDBSelectOption>
                              <MDBSelectOption name='False' value='False'>False</MDBSelectOption>
                            </MDBSelectOptions>
                          </MDBSelect>
                        </MDBCol>
                        <MDBCol lg='3' md='6'>
                          <MDBSelect label='Has Vaccines' getValue={(e) => setVaccines(e[0])} value={vaccines}>
                            <MDBSelectInput value={vaccines} required />
                            <MDBSelectOptions>
                              <MDBSelectOption name='True' value='True'>True</MDBSelectOption>
                              <MDBSelectOption name='False' value='False'>False</MDBSelectOption>
                            </MDBSelectOptions>
                          </MDBSelect>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md='12' className='about-text'>
                          <h5 className='text-muted text-left my-4'>
                            <strong>Bio</strong>
                          </h5>
                          <MDBInput type='textarea' value={bio} label="Tell us about your dog!" onChange={(e) => { setBio(e.target.value) }} required />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md='12' className='about-text'>
                          <h5 className='text-muted text-left my-4'>
                            <strong>Connect:</strong> <small>Add social account URLs below!</small>
                          </h5>
                          <MDBRow className='mt-0 pt-0'>
                            <MDBCol md='6' className='mt-0 pt-0'>
                              <MDBInput type='text' value={instagram} label="Instagram Username (ex. yellowlab_official)" onChange={(e) => { setInstagram(e.target.value) }} />
                            </MDBCol>
                            <MDBCol md='6'>
                              <MDBInput type='text' value={facebook} label="Facebook URL" onChange={(e) => { setFacebook(e.target.value) }} />
                            </MDBCol>
                          </MDBRow>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md='12' className='mb-r'>
                          <MDBCard className='profile-card'>
                            <MDBAvatar
                              tag='img'
                              alt='Default Dog Profile Image'
                              // src={(avatar ? URL.createObjectURL(avatar) : Dog)}
                              src={(avatar ? avatar : defaultDogImg)}
                              style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'cover', margin: '0 auto' }}
                              className='rounded-circle z-depth-1-half mt-1'
                            />

                            <InputPage value={avatar} id={id} onUpload={(imgRef) => {
                              console.log('uploaded', imgRef)
                              setAvatar(imgRef)
                            }} />

                          </MDBCard>
                        </MDBCol>
                      </MDBRow>
                      <MDBBtn className='blue-gradient btn-rounded mt-1' type='submit' rounded >
                        Save
                    </MDBBtn>
                    </form>
                  </MDBCardBody>
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
