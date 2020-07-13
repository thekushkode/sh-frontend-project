import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import SingleMessage from './SingleMessage'
import firebase from '../../firebase';
import '../Chat.css';
import { css } from 'glamor';




export default function Post() {
    const posts = useSelector(state => state.posts)
    const user = useSelector(state => state.user)
    console.log(posts)
    console.log(user)
    // return (
    //     <div>
    //         <ul>
    //             {messages.data && messages.data.messages.map((item) => {
    //                 let styles;
    //                 if (item.sender === 'Social Hound') {
    //                     styles = ['around', '', 'text-black', 'rgb(3, 252, 173)']
    //                 }
    //                 else if (item.sender === user.data.displayName) {
    //                     // styles = ['end', 'aqua-gradient', 'text-white', 'rgb(240, 240, 240)']
    //                     styles = ['end', '', 'text-white', 'rgb(0,153,255)']
    //                 } else {
    //                     // styles = ['start', 'tempting-azure-gradient lighten-3', 'text-black']
    //                     styles = ['start', '', 'text-black', 'rgb(240, 240, 240)']
    //                 }
    //                 return (
    //                     <SingleMessage formatting={styles} content={item} />
    //                 )
    //             })}
    //         </ul>
    //     </div>
    // )
}