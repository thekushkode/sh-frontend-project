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
  MDBCardBody,
  MDBInput,
} from 'mdbreact';
import Lightbox from 'react-image-lightbox';
import './About.css';
import Kush from './images/kush.gif';
import Jon from './images/jon.gif';
import Logan from './images/logan.gif';
import Gerrit from './images/gerrit.gif';
import Dogs from './images/sh-dogplay.gif'
import FooterPage from './Footer';

const images = [
  'https://mdbootstrap.com/img/Photos/Horizontal/People/12-col/img%20(132).jpg',
  'https://mdbootstrap.com/img/Photos/Horizontal/Work/12-col/img%20(40).jpg',
  'https://mdbootstrap.com/img/Photos/Horizontal/Work/12-col/img%20(14).jpg'
];

const smallImages = [
  'https://mdbootstrap.com/img/Photos/Horizontal/People/4-col/img%20(132).jpg',
  'https://mdbootstrap.com/img/Photos/Horizontal/Work/12-col/img%20(40).jpg',
  'https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20(14).jpg'
];

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
    const { photoIndex, isOpen } = this.state;

    return (
      <div id='about'>
        <header style={{ marginBottom: '80px' }}>
        </header>

        <section id='home'>
          <MDBView
            src={Dogs}
            fixed
            style={{ height: '70vh' }}
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
                      Contact
                    </MDBBtn>
                    <MDBBtn color='indigo' size='lg' href='/'>
                      Sign{' '}
                      <a href='!#' className='white-text font-weight-bold'>
                        UP
                      </a>
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
              The Social Hound team is a group of determined Full-Stack bootcamp coders based in the Atlanta metro area.
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
                  <a href='https://github.com/thekushkode'>
                    <MDBIcon
                      fab
                      icon='instagram'
                      className='p-2 m-2 fa-lg fb-ic'
                    />
                  </a>
                  <a href='!#'>
                    <MDBIcon
                      fab
                      icon='twitter'
                      className='p-2 m-2 fa-lg tw-ic'
                    />
                  </a>
                  <a href='https://github.com/thekushkode'>
                    <MDBIcon
                      fab
                      icon='github'
                      className='p-2 m-2 fa-lg git-ic'
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
                  <a href='https://www.linkedin.com/in/jonathancox11/'>
                    <MDBIcon
                      fab
                      icon='linkedin'
                      className='p-2 m-2 fa-lg li-ic'
                    />
                  </a>
                  {/* <a href='!#'>
                    <MDBIcon
                      fab
                      icon='twitter'
                      className='p-2 m-2 fa-lg yt-ic'
                    />
                  </a> */}
                  <a href='https://github.com/jonathancox1'>
                    <MDBIcon
                      fab
                      icon='github'
                      className='p-2 m-2 fa-lg git-ic'
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
                    Atlanta-based software engineer specializing in full-stack web development.
                  </p>
                  <a href='https://www.linkedin.com/in/grrtvnlw/'>
                    <MDBIcon
                      fab
                      icon='linkedin'
                      className='p-2 m-2 fa-lg li-ic'
                    />
                  </a>
                  <a href='https://github.com/grrtvnlw'>
                    <MDBIcon
                      fab
                      icon='github'
                      className='p-2 m-2 fa-lg git-ic'
                    />
                  </a>
                  <a href='https://twitter.com/grrtvnlw'>
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
                  <a href='https://www.linkedin.com/in/loganblackstad/'>
                    <MDBIcon
                      fab
                      icon='linkedin'
                      className='p-2 m-2 fa-lg li-ic'
                    />
                  </a>
                  {/* <a href='!#'>
                    <MDBIcon
                      fab
                      icon='twitter'
                      className='p-2 m-2 fa-lg li-ic'
                    />
                  </a> */}
                  <a href='https://github.com/loganblackstad'>
                    <MDBIcon
                      fab
                      icon='github'
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
            <MDBRow>
              <div className='col-md-4 mb-4'>
                <MDBIcon icon='area-chart pink-text' size='4x' />
                <h4 className='font-weight-bold my-4'>Wellness</h4>
                <p className='grey-text'>
                  An intentional health and wellness plan can help your dog live his/her longest and healthiest. SocialHound makes it easier to plan for grooming, wellness-checks, and socialization in an effort to prevent major health and lifestyle complications.
                </p>
              </div>
              <div className='col-md-4 mb-4'>
                <MDBIcon icon='pencil cyan-text' size='4x' />
                <h4 className='font-weight-bold my-4'>Connectedness</h4>
                <p className='grey-text'>
                  A social pup is a happy pup! Social Hound encourages the promotion of positive dog and human demeanor. We encourage best practices for public interaction and make it as easy as possible to make pup-connections.
                </p>
              </div>
              <div className='col-md-4 mb-4'>
                <MDBIcon icon='laptop indigo-text' size='4x' />
                <h4 className='font-weight-bold my-4'>Development</h4>
                <p className='grey-text'>
                  Social Hound is dedicated to your dog's social development. As a part of this commitment,the developers of Social Hound are devoted to creating and serving content that is most helpful to creating connections and promoting healthy choices for your pet.
                </p>
              </div>
            </MDBRow>
          </section>

          <hr className='my-5' />

          <section id='work'>
            <h1 className='text-center my-5 h1'>Our work</h1>
            <p className='text-center mb-5 w-responsive mx-auto'>
              Social Hound was born out of love for our Pups. Our love for them is what drives the love for our work.
            </p>

            <div className='mdb-lightbox'>
              <MDBRow>
                <MDBCol md='4'>
                  <figure>
                    <img
                      src={smallImages[0]}
                      alt='The pretty one talks'
                      className='img-fluid'
                      onClick={() =>
                        this.setState({ photoIndex: 0, isOpen: true })
                      }
                    />
                  </figure>
                </MDBCol>
                <MDBCol md='4'>
                  <figure>
                    <img
                      src={smallImages[1]}
                      alt='Our office looks like school'
                      className='img-fluid'
                      onClick={() =>
                        this.setState({ photoIndex: 1, isOpen: true })
                      }
                    />
                  </figure>
                </MDBCol>
                <MDBCol md='4'>
                  <figure>
                    <img
                      src={smallImages[2]}
                      alt='Best gear does not equal best devs'
                      className='img-fluid'
                      onClick={() =>
                        this.setState({ photoIndex: 2, isOpen: true })
                      }
                    />
                  </figure>
                </MDBCol>
              </MDBRow>
            </div>
            {isOpen && (
              <Lightbox
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={
                  images[(photoIndex + images.length - 1) % images.length]
                }
                imageTitle={photoIndex + 1 + '/' + images.length}
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + images.length - 1) % images.length
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % images.length
                  })
                }
              />
            )}
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
