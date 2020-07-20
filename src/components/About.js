import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBAvatar,
  MDBMask,
  MDBIcon,
  MDBView,
  MDBBtn,
} from 'mdbreact';
import './About.css';
import Kush from './images/kush.gif';
import Jon from './images/jon.gif';
import Logan from './images/logan.gif';
import Gerrit from './images/gerrit.gif';
import Dogs from './images/sh-dogplay.gif'
import FooterPage from './Footer';
import { Link } from 'react-router-dom'

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: '',
      photoIndex: 0,
      isOpen: false
    };
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  render() {

    return (
      <div id='about'>
        <header style={{ marginBottom: '80px' }}>
        </header>

        <section id='home'>
          <MDBView
            src={Dogs}
            fixed
            style={{ backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              minHeight: '70vh' }}
          >
            <MDBMask
              overlay='stylish-light'
              className='rgba-white-light d-flex justify-content-center align-items-center'
            >
              <MDBContainer className='h-100 d-flex justify-content-center align-items-center'>
                <MDBRow>
                  <MDBCol md='12' className='mt-5 mx-auto text-center'>
                    <h1 className='display-3 white-text mb-5'>
                      ABOUT{' '}
                      <a className='white-text font-weight-bold' href='!#'>
                        US
                      </a>
                    </h1>
                    <MDBBtn color='light-blue' size='lg' href='/contact'>
                      <Link to='/contact' className='white-text'>Contact</Link>
                    </MDBBtn>
                    <MDBBtn color='indigo' size='lg' href='/'>
                      <Link to='/' className='white-text font-weight-bold'>
                      Sign Up!
                      </Link>
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBMask>
          </MDBView>
        </section>
        <MDBContainer>
          <section id='team'>
            <h2 className='text-center my-5 h1'>Our Amazing Team</h2>
            <p className='text-center mb-5 w-responsive mx-auto'>
              The Social Hound team is a group comprised of passionate and creative Full-Stack developers based in the Atlanta metro area.
            </p>
            <MDBRow className='mb-lg-4 text-center text-md-left'>
              <MDBCol lg='6' md='12' className='mb-4'>
                <MDBCol md='6' className='float-left'>
                  <MDBAvatar
                    tag='img'
                    className='mx-auto z-depth-1'
                    src={Kush}
                    alt='First sample avatar image'
                  />
                </MDBCol>
                <MDBCol md='6' className='float-right'>
                  <h4>
                    <strong>Robert Kushner</strong>
                  </h4>
                  <h6 className='font-weight-bold grey-text mb-4'>
                    Software Engineer, Design
                  </h6>
                  <p className='grey-text'>
                    Serial entrepreneur and dog enthusiast.
                  </p>
                  <a href='https://github.com/thekushkode' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='linkedin'
                      className='p-2 m-2 fa-lg fb-ic'
                    />
                  </a>
                  <a href='https://github.com/thekushkode' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='github'
                      className='p-2 m-2 fa-lg git-ic'
                    />
                  </a>
                  <a href='!#' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='twitter'
                      className='p-2 m-2 fa-lg tw-ic'
                    />
                  </a>
                </MDBCol>
              </MDBCol>
              <MDBCol lg='6' md='12' className='mb-4'>
                <MDBCol md='6' className='float-left'>
                  <MDBAvatar
                    tag='img'
                    className='mx-auto z-depth-1'
                    src={Jon}
                    alt='First sample avatar image'
                  />
                </MDBCol>
                <MDBCol md='6' className='float-right'>
                  <h4>
                    <strong>Jonathan Cox</strong>
                  </h4>
                  <h6 className='font-weight-bold grey-text mb-4'>
                    Full-Stack Developer
                  </h6>
                  <p className='grey-text'>
                    Coffee Enthusiast and Full-Stack guru.
                  </p>
                  <a href='https://www.linkedin.com/in/jonathancox11/' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='linkedin'
                      className='p-2 m-2 fa-lg li-ic'
                    />
                  </a>
                  <a href='https://github.com/jonathancox1' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='github'
                      className='p-2 m-2 fa-lg git-ic'
                    />
                  </a>
                  <a href='https://github.com/jonathancox1' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='twitter'
                      className='p-2 m-2 fa-lg tw-ic'
                    />
                  </a>
                </MDBCol>
              </MDBCol>
            </MDBRow>

            <MDBRow className='mb-lg-4 text-center text-md-left'>
              <MDBCol lg='6' md='12' className='mb-4'>
                <MDBCol md='6' className='float-left'>
                  <MDBAvatar
                    tag='img'
                    className='mx-auto z-depth-1'
                    src={Gerrit}
                    alt='First sample avatar image'
                  />
                </MDBCol>
                <MDBCol md='6' className='float-right'>
                  <h4>
                    <strong>Gerrit Van Leeuwen</strong>
                  </h4>
                  <h6 className='font-weight-bold grey-text mb-4'>
                    Full-Stack Developer
                  </h6>
                  <p className='grey-text'>
                    Builder of back-ends, lover of rooftops.
                  </p>
                  <a href='https://www.linkedin.com/in/grrtvnlw/' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='linkedin'
                      className='p-2 m-2 fa-lg li-ic'
                    />
                  </a>
                  <a href='https://github.com/grrtvnlw' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='github'
                      className='p-2 m-2 fa-lg git-ic'
                    />
                  </a>
                  <a href='https://twitter.com/grrtvnlw' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='twitter'
                      className='p-2 m-2 fa-lg tw-ic'
                    />
                  </a>
                </MDBCol>
              </MDBCol>
              <MDBCol lg='6' md='12' className='mb-4'>
                <MDBCol md='6' className='float-left'>
                  <MDBAvatar
                    tag='img'
                    className='mx-auto z-depth-1'
                    src={Logan}
                    alt='First sample avatar image'
                  />
                </MDBCol>
                <MDBCol md='6' className='float-right'>
                  <h4>
                    <strong>Logan Blackstad</strong>
                  </h4>
                  <h6 className='font-weight-bold grey-text mb-4'>
                    Full-Stack Developer
                  </h6>
                  <p className='grey-text'>
                    Dog and Music Lover. Tinker-er.
                  </p>
                  <a href='https://www.linkedin.com/in/loganblackstad/' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='linkedin'
                      className='p-2 m-2 fa-lg tw-ic'
                    />
                  </a>
                  <a href='https://github.com/loganblackstad' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='github'
                      className='p-2 m-2 fa-lg li-ic'
                    />
                  </a>
                  <a href='https://github.com/loganblackstad' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='twitter'
                      className='p-2 m-2 fa-lg email-ic'
                    />
                  </a>
                </MDBCol>
              </MDBCol>
            </MDBRow>
          </section>

          <hr className='my-5' />

          <section id='products' className='text-center'>
            <h1 className='text-center my-5 h1'>We Enhance The Dog Experience</h1>
            <p className='text-center mb-5 w-responsive mx-auto lead grey-text'>
              Dogs are without question "Man's Best Friend". That's why at SocialHound, dogs come first!
            </p>
            <MDBRow>
              <div className='col-md-4 mb-4'>
                <MDBIcon icon='spa pink-text' size='4x' />
                <h4 className='font-weight-bold my-4'>Wellness</h4>
                <p className='grey-text'>
                  An intentional health and wellness plan can help your dog live his/her longest and healthiest life. SocialHound makes it easier to plan for grooming, wellness-checks, and socialization in an effort to prevent major health and lifestyle complications.
                </p>
              </div>
              <div className='col-md-4 mb-4'>
                <MDBIcon icon='desktop cyan-text' size='4x' />
                <h4 className='font-weight-bold my-4'>Connectedness</h4>
                <p className='grey-text'>
                  A social pup is a happy pup! SocialHound encourages the promotion of positive dog and human demeanor. We encourage best practices for public interaction and make it as easy as possible to make pup-connections.
                </p>
              </div>
              <div className='col-md-4 mb-4'>
                <MDBIcon icon='brain indigo-text' size='4x' />
                <h4 className='font-weight-bold my-4'>Development</h4>
                <p className='grey-text'>
                  SocialHound is dedicated to your dog's social development. As a part of this commitment, the team at SocialHound is devoted to creating content that is most helpful to creating connections and promoting healthy activities for your pup.
                </p>
              </div>
            </MDBRow>
          </section>

        </MDBContainer>
        <footer>
          <FooterPage />
        </footer>
      </div>
    );
  }
}

export default About;
