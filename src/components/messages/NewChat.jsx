import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../../firebase';


export default function NewChat() {
    const db = firebase.firestore();
    const user = useSelector(state => state.user)


    useEffect(() => {
        if (user) {
            db.collection("Messages").doc()
                .set({
                    members: [user.id, 'someoneElse'],
                    messages: [
                        {
                            sender: 'Social Hound',
                            timeStamp: Date.now(),
                            message: 'Default New Message Started'
                        }
                    ]
                })
                .then(res => console.log(res))
        }

    }, [user])


    return (
        <div>

        </div>
    )
}
