import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import firebase from '../../firebase';



export default function ConfirmDate({ content }) {
    const user = useSelector(state => state.user)


    const db = firebase.firestore();
    const [confirmedDate, setConfirmed] = React.useState('')

    useEffect(() => {
        let userID = user.uid
        if (userID) {
            db.collection('PlayDates').doc(content.playDate)
                .get().then((doc) => {
                    if (doc.data()) {
                        console.log(doc.data())
                        if (doc.data()[userID] === false) {
                            setConfirmed(false)
                        } else {
                            setConfirmed(true)
                        }
                    }
                }
                )
        }
    }, [])


    function confirmDate() {
        // call DB and confirm date
        // this.props.content.playDate
        db.collection('PlayDates').doc(content.playDate)
            .update({
                confirmed: true,
                [user.uid]: true,
            })
        setConfirmed(true)

    }
    return (
        <div>
            {confirmedDate === false && <button onClick={() => confirmDate()}>Confirm Date</button>}
        </div>
    )
}
