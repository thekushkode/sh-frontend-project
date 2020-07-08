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
import NavbarPage from './Nav';
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
          <NavbarPage />
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
              error amet numquam iure provident voluptate esse quasi, veritatis
              totam voluptas nostrum quisquam eum porro a pariatur accusamus
              veniam.
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
            <h1 className='text-center my-5 h1'>We create awesome products</h1>
            <p className='text-center mb-5 w-responsive mx-auto lead grey-text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
            <MDBRow>
              <div className='col-md-4 mb-4'>
                <MDBIcon icon='area-chart pink-text' size='4x' />
                <h4 className='font-weight-bold my-4'>Analytics</h4>
                <p className='grey-text'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reprehenderit maiores nam, aperiam minima assumenda deleniti
                  hic.
                </p>
              </div>
              <div className='col-md-4 mb-4'>
                <MDBIcon icon='pencil cyan-text' size='4x' />
                <h4 className='font-weight-bold my-4'>Design</h4>
                <p className='grey-text'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reprehenderit maiores nam, aperiam minima assumenda deleniti
                  hic.
                </p>
              </div>
              <div className='col-md-4 mb-4'>
                <MDBIcon icon='laptop indigo-text' size='4x' />
                <h4 className='font-weight-bold my-4'>Development</h4>
                <p className='grey-text'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reprehenderit maiores nam, aperiam minima assumenda deleniti
                  hic.
                </p>
              </div>
            </MDBRow>
          </section>

          <hr className='my-5' />

          <section id='work'>
            <h1 className='text-center my-5 h1'>Our work</h1>
            <p className='text-center mb-5 w-responsive mx-auto'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
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


          {/* <section id='contact'>
            <MDBRow>
              <MDBCol lg='8'>
                <MDBCardBody className='form'>
                  <h3 className='mt-4'>
                    <MDBIcon icon='envelope' className='pr-2' />
                    Write to us:
                  </h3>
                  <MDBRow>
                    <MDBCol md='6'>
                      <div className='md-form mb-0'>
                        <MDBInput
                          type='text'
                          id='form-contact-name'
                          label='Your name'
                        />
                      </div>
                    </MDBCol>
                    <MDBCol md='6'>
                      <div className='md-form mb-0'>
                        <MDBInput
                          type='text'
                          id='form-contact-email'
                          label='Your email'
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='6'>
                      <div className='md-form mb-0'>
                        <MDBInput
                          type='text'
                          id='form-contact-phone'
                          label='Your phone'
                        />
                      </div>
                    </MDBCol>
                    <MDBCol md='6'>
                      <div className='md-form mb-0'>
                        <MDBInput
                          type='text'
                          id='form-contact-company'
                          label='Your company'
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='12'>
                      <div className='md-form mb-0'>
                        <MDBInput
                          type='textarea'
                          id='form-contact-message'
                          label='Your message'
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCol>
              <MDBCol lg='4'>
                <MDBCardBody className='contact text-center h-100'>
                  <h3 className='my-4 pb-2'>Contact information</h3>
                  <ul className='text-lg-left list-unstyled ml-4'>
                    <li>
                      <p>
                        <MDBIcon icon='map-marker-alt' className='pr-2' />
                        New York, 94126 USA
                      </p>
                    </li>
                    <li>
                      <p>
                        <MDBIcon icon='phone' className='pr-2' />+ 01 234 567 89
                      </p>
                    </li>
                    <li>
                      <p>
                        <MDBIcon icon='envelope' className='pr-2' />
                        contact@example.com
                      </p>
                    </li>
                  </ul>
                  <hr className='hr-light my-4' />
                  <ul className='list-inline text-center list-unstyled'>
                    <li className='list-inline-item'>
                      <a href='#!' className='p-2 fa-lg w-ic'>
                        <MDBIcon fab icon='twitter' />
                      </a>
                    </li>
                    <li className='list-inline-item'>
                      <a href='#!' className='p-2 fa-lg w-ic'>
                        <MDBIcon fab icon='linkedin' />
                      </a>
                    </li>
                    <li className='list-inline-item'>
                      <a href='#!' className='p-2 fa-lg w-ic'>
                        <MDBIcon fab icon='instagram' />
                      </a>
                    </li>
                  </ul>
                  <MDBBtn rounded color='blue'>
                    Send
                  </MDBBtn>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </section> */}
        </MDBContainer>
        <footer>
          <FooterPage />
        </footer>
      </div>
    );
  }
}

export default About;
