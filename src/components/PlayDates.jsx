import React, { useEffect, useState } from 'react';
import { MDBCard, MDBRow, MDBCol, MDBJumbotron, MDBIcon, MDBBtn } from "mdbreact";
// import { useDispatch, useSelector } from 'react-redux'
import firebase from '../firebase';
import moment from 'moment';
import Dogs from './images/dogplay.2.gif';
moment().format();

export default function PlayDates(props) {

  const db = firebase.firestore();
  // const dispatch = useDispatch();
  const [playDate, setPlayDate] = useState([])

  useEffect(() => {
    db.collection('PlayDates').where('members', 'array-contains', props.id)
      .onSnapshot((querySnapshot) => {
        let playDateArray = []
        querySnapshot.forEach(function (doc) {
          playDateArray.push({ id: doc.id, playDate: doc.data() })
        })
        setPlayDate(playDateArray)
      })
  }, [])


  return (
    <div style={{ maxWidth: '1500px', margin: '0 auto' }}>
      <main>
        <MDBRow>
          <MDBCol md='12' className='overflow-auto mb-4' style={{ height: '1100px' }}>
            {playDate.length !== 0 && playDate.map((item, index) => {
              return (

                <MDBCard className="card-image mb-2" style={{
                  backgroundImage:
                    "url(./images/sh-dogplay.gif)"
                }}>
                  <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4 rounded">
                    <div>
                      <h4 className="white-text">
                        <MDBIcon icon="glass-cheers" />
                        <strong> Let's Play!</strong>
                      </h4>
                      <h3 className="py-3 font-weight-bold">
                        <strong>{item.playDate.userNames.map((user, index) => {
                          return (
                            <span>{user} {index < (item.playDate.userNames.length - 1) ? 'and ' : null} </span>
                          )
                        })}
                    have a playdate scheduled for</strong>
                      </h3>
                      <h4 className="pb-3">
                        <span> {moment(item.playDate.date).format('LL')} </span>
                      </h4>
                      {item.playDate.confirmed && <h5 className='p-3'>You have both confirmed the playdate. Have fun!</h5>}
                      <MDBBtn color="secondary" rounded size="md">
                        <MDBIcon far icon="calendar-alt" className="left" /> Event created on {moment(item.playDate.createdAt).format('LLLL')}
                      </MDBBtn>
                    </div>
                  </div>
                </MDBCard>

                // <MDBJumbotron>
                //   <div>
                //     <header className='p-3'>
                //       <h3>
                //         {item.playDate.userNames.map((user, index) => {
                //           return (
                //             <span>{user} {index < (item.playDate.userNames.length - 1) ? 'and ' : null} </span>
                //           )
                //         })}
                //     have a playdate scheduled for
                //     </h3>
                //       <h4 className='p-2'>
                //         <MDBIcon fab icon='glass-cheers' /><span> {moment(item.playDate.date).format('LL')} </span>
                //       </h4>
                //     </header>
                //     {item.playDate.confirmed && <h5 className='p-3'>You have both confirmed the playdate. Have fun!</h5>}
                //     <footer className='p-3'>Event created on {moment(item.playDate.createdAt).format('LLLL')}</footer>
                //   </div>
                // </MDBJumbotron>
              )
            })}
          </MDBCol>
        </MDBRow>
      </main>
    </div>
  )
}