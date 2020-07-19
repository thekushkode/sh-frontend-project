import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import firebase from '../../firebase';



export default function ConfirmDate({ content }) {
    const user = useSelector(state => state.user)


    const db = firebase.firestore();
    const [confirmedDate, setConfirmed] = React.useState(true)

    useEffect(() => {
        let userID = user.uid
        db.collection('PlayDates').doc(content.playDate)
            .get().then((doc) => {
                if (doc.data()) {
                    if (doc.data().userID === false) {
                        setConfirmed(false)
                    }
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
                [user.uid]: true,
            })
        setConfirmed(true)

    }
    return (
        <div>
            {!confirmedDate && <button className='aqua-gradient btn-rounded'onClick={() => confirmDate()}>Confirm Date</button>}
        </div>
    )
}
