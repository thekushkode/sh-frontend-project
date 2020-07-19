import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBAvatar
} from 'mdbreact';

import './Chat.css';

const DMChat = () => {
  return (
    <div id='chat'>
      <header style={{ marginBottom: '100px' }}>
      </header>
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol lg='4'>
            <MDBInput type='text' icon='search' label='Search Message' />
            <MDBListGroup>
              <a href='#!'>
                <MDBListGroupItem hover active>
                  <MDBAvatar
                    src='https://mdbootstrap.com/img/Photos/Avatars/adach.jpg'
                    alt='User mugshot'
                    tag='img'
                    className='float-left mr-3'
                  />
                  <div className='d-flex justify-content-between mb-1 '>
                    <span className='mb-1'>
                      <strong>Dawid Adach</strong>
                    </span>
                    <small>13 July</small>
                  </div>
                  <p className='text-truncate'>
                    <strong>You: </strong> Donec id elit non mi porta gravida at
                    eget metus. Maecenas sed diam eget risus varius blandit.
                  </p>
                </MDBListGroupItem>
              </a>
              <a href='#!'>
                <MDBListGroupItem hover>
                  <MDBAvatar
                    src='https://secure.gravatar.com/avatar/8c051fd54e4c811e02bbc78d50549280?s=150&amp;d=mm&amp;r=g'
                    alt='User mugshot'
                    tag='img'
                    className='float-left mr-3'
                  />
                  <div className='d-flex justify-content-between mb-1 '>
                    <span className='mb-1'>
                      <strong>Michal Szymanski</strong>
                    </span>
                    <small>14 July</small>
                  </div>
                  <p className='text-truncate'>
                    <MDBBadge color='red'>MDB Team</MDBBadge>{' '}
                    <strong>Michal: </strong> Donec id elit non mi porta gravida
                    at eget metus. Maecenas sed diam eget risus varius blandit.
                  </p>
                </MDBListGroupItem>
              </a>
              <a href='#!'>
                <MDBListGroupItem hover>
                  <MDBAvatar
                    src='https://mdbootstrap.com/img/Photos/Avatars/kuba.jpg'
                    alt='User mugshot'
                    tag='img'
                    className='float-left mr-3'
                  />
                  <div className='d-flex justify-content-between mb-1 '>
                    <span className='mb-1'>
                      <strong>Kuba Strebeyko</strong>
                    </span>
                    <small>15 July</small>
                  </div>
                  <p className='text-truncate'>
                    <strong>Kuba: </strong> Donec id elit non mi porta gravida
                    at eget metus. Maecenas sed diam eget risus varius blandit.
                  </p>
                </MDBListGroupItem>
              </a>
              <a href='#!'>
                <MDBListGroupItem hover>
                  <MDBAvatar
                    src='https://mdbootstrap.com/img/Photos/Avatars/mikolaj.jpg'
                    alt='User mugshot'
                    tag='img'
                    className='float-left mr-3'
                  />
                  <div className='d-flex justify-content-between mb-1 '>
                    <span className='mb-1'>
                      <strong>Mikołaj Smoleński</strong>
                    </span>
                    <small>16 July</small>
                  </div>
                  <p className='text-truncate'>
                    <strong>You: </strong> Donec id elit non mi porta gravida at
                    eget metus. Maecenas sed diam eget risus varius blandit.
                  </p>
                </MDBListGroupItem>
              </a>
              <a href='#!'>
                <MDBListGroupItem hover>
                  <MDBAvatar
                    src='https://mdbootstrap.com/img/Photos/Avatars/laura.jpg'
                    alt='User mugshot'
                    tag='img'
                    className='float-left mr-3'
                  />

                  <div className='d-flex justify-content-between mb-1 '>
                    <span className='mb-1'>
                      <strong>Laura Choromanska</strong>
                    </span>
                    <small>16 July</small>
                  </div>
                  <p className='text-truncate'>
                    <strong>Laura: </strong> Donec id elit non mi porta gravida
                    at eget metus. Maecenas sed diam eget risus varius blandit.
                  </p>
                </MDBListGroupItem>
              </a>
              <a href='#!'>
                <MDBListGroupItem hover>
                  <MDBAvatar
                    src='https://mdbootstrap.com/img/Photos/Avatars/bartek.jpg'
                    alt='User mugshot'
                    tag='img'
                    className='float-left mr-3'
                  />
                  <div className='d-flex justify-content-between mb-1 '>
                    <span className='mb-1'>
                      <strong>Bartłomiej Malanowski</strong>
                    </span>
                    <small>16 July</small>
                  </div>
                  <p className='text-truncate'>
                    <strong>Barłomiej: </strong> Donec id elit non mi porta
                    gravida at eget metus. Maecenas sed diam eget risus varius
                    blandit.
                  </p>
                </MDBListGroupItem>
              </a>
              <a href='#!'>
                <MDBListGroupItem hover>
                  <MDBAvatar
                    src='https://mdbootstrap.com/img/Photos/Avatars/filip.jpg'
                    alt='User mugshot'
                    tag='img'
                    className='float-left mr-3'
                  />

                  <div className='d-flex justify-content-between mb-1 '>
                    <span className='mb-1'>
                      <strong>Filip Kapusta</strong>
                    </span>
                    <small>16 July</small>
                  </div>
                  <p className='text-truncate'>
                    <strong>You: </strong> Donec id elit non mi porta gravida at
                    eget metus. Maecenas sed diam eget risus varius blandit.
                  </p>
                </MDBListGroupItem>
              </a>
            </MDBListGroup>
          </MDBCol>

          <MDBCol lg='8' className='mt-lg-0 mt-5'>
            <div className='border border-dark p-4 white'>
              <div className='text-center'>
                <small>16 July, 23:54</small>
              </div>
              <div className='d-flex justify-content-end'>
                <p className='primary-color rounded p-3 text-white w-75 '>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Molestiae modi exercitationem dignissimos repellat, voluptas
                  iure quod aliquid voluptatem perspiciatis quidem sit eos, cum
                  fugit voluptatibus quos laboriosam sed tenetur voluptate!
                </p>
              </div>

              <div className='text-center'>
                <small>16 July, 23:55</small>
              </div>
              <div className='d-flex justify-content-start media'>
                <MDBAvatar
                  src='https://mdbootstrap.com/img/Photos/Avatars/adach.jpg'
                  alt='User mugshot'
                  tag='img'
                  className='float-left mr-3'
                />

                <p className='grey lighten-3 rounded p-3 w-75'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Molestiae modi exercitationem dignissimos repellat, voluptas
                  iure quod aliquid voluptatem perspiciatis quidem sit eos, cum
                  fugit voluptatibus quos laboriosam sed tenetur voluptate!
                </p>
              </div>

              <div className='text-center'>
                <small>16 July, 23:56</small>
              </div>
              <div className='d-flex justify-content-start media'>
                <MDBAvatar
                  src='https://mdbootstrap.com/img/Photos/Avatars/adach.jpg'
                  alt='User mugshot'
                  tag='img'
                  className='float-left mr-3'
                />
                <p className='grey lighten-3 rounded p-3 w-75'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Molestiae modi exercitationem dignissimos repellat, voluptas
                  iure quod aliquid voluptatem perspiciatis quidem sit eos, cum
                  fugit voluptatibus quos laboriosam sed tenetur voluptate!
                </p>
              </div>

              <div className='text-center'>
                <small>16 July, 23:54</small>
              </div>
              <div className='d-flex justify-content-end'>
                <p className='primary-color rounded p-3 text-white w-75 '>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Molestiae modi exercitationem dignissimos repellat, voluptas
                  iure quod aliquid voluptatem perspiciatis quidem sit eos, cum
                  fugit voluptatibus quos laboriosam sed tenetur voluptate!
                </p>
              </div>

              <div className='row'>
                <div className='col-md-12'>
                  <div className='d-flex flex-row'>
                    <MDBInput
                      type='textarea'
                      containerClass='chat-message-type'
                      label='Type your message'
                      rows='3'
                    />
                    <div className='mt-5'>
                      <a
                        className='btn btn-primary btn-lg waves-effect waves-light'
                        href='#!'
                      >
                        Send
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default DMChat;
