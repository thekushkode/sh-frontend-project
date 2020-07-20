import React, { useEffect, useState } from 'react';
import { MDBRow, MDBCol, MDBJumbotron } from "mdbreact";
// import { useDispatch, useSelector } from 'react-redux'
import firebase from '../firebase';
import moment from 'moment';
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
          <MDBCol className='overflow-auto' style={{ height: '1100px' }}>
            {playDate.length != 0 && playDate.map((item, index) => {
              return (
                <MDBJumbotron>
                  <div>
                    <header className='p-3'>
                      <h3>
                        {item.playDate.userNames.map((user, index) => {
                          return (
                            <span>{user} {index < (item.playDate.userNames.length - 1) ? 'and ' : null} </span>
                          )
                        })}
                    have a playdate scheduled for
                    </h3>
                      <h4 className='p-2'>
                        <span>🎉</span><span> {moment(item.playDate.date).format('LLL')} </span><span>🎊</span>
                      </h4>
                    </header>
                    {item.playDate.confirmed && <h5 className='p-3'>You have both confirmed the playdate. Have fun!</h5>}
                    <footer className='p-3'>Event created on {moment(item.playDate.createdAt).format('LLLL')}</footer>
                  </div>
                </MDBJumbotron>
              )
            })}
          </MDBCol>
        </MDBRow>
      </main>
    </div>
  )
}