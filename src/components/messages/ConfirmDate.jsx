import React, { useEffect } from 'react'
import firebase from '../../firebase';



export default function ConfirmDate({ content }) {


    const db = firebase.firestore();
    const [confirmedDate, setConfirmed] = React.useState(false)

    useEffect(() => {
        db.collection('PlayDates').doc(content.playDate)
            .get().then((doc) => {
                if (doc.data()) {
                    setConfirmed(doc.data().confirmed)
                }
            }
            )
    }, [])


    function confirmDate() {
        // call DB and confirm date
        // this.props.content.playDate
        db.collection('PlayDates').doc(content.playDate)
            .update({
                confirmed: true,
            })
        setConfirmed(true)

    }
    return (
        <div>
            {!confirmedDate && <button onClick={() => confirmDate()}>Confirm Date</button>}
        </div>
    )
}
