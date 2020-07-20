import React, { useState } from "react";
import { MDBFileInput } from "mdbreact";
import { useSelector } from 'react-redux';
import firebase from '../firebase';
import SpinnerPage from "./Spinner";
import { useHistory } from "react-router-dom";

const db = firebase.firestore();

function InputPage(props) {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    // const [dogId, setDogId] = useState('');
    const profile = useSelector(state => state.profile);


    function imgUpload(files) {

        setLoading(true);

<<<<<<< HEAD
=======
        // FileList { 0: File, length: 1 }
        // 0: File { name: "bentley.PNG", lastModified: 1594648700779, lastModifiedDate: Mon Jul 13 2020 09: 58: 20 GMT - 0400(Eastern Daylight Time), webkitRelativePath: "", size: 1179597, … }
        // length: 1


>>>>>>> master
        let fileObj = files[0];
        
        // Create a reference with an initial file path and name
        let storage = firebase.storage();

        // Create a reference from a Google Cloud Storage URI
        if (files[0] == undefined) {
            history.push(`/profile/${profile.id}`)
        }
        let imgFileName = files[0].name
        let fileType = imgFileName.substr(imgFileName.lastIndexOf('.') + 1);

        // Create a reference from an HTTPS URL
        // Note that in the URL, characters are URL escaped!

        // Create a root reference
        let storageRef = firebase.storage().ref();
        let imgId = props.id;
        let imgRef = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/' + imgId + "." + fileType + "?alt=media"

        // Create a reference to 'mountains.jpg'
        let ref = storageRef.child(imgId + "." + fileType);

        // the function could also take snapshot as an input
        ref.put(fileObj).then(function (imgRef) {
            imgRef = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/' + imgId + "." + fileType + "?alt=media"
            props.onUpload(imgRef);
<<<<<<< HEAD
=======
            // console.log('Uploaded a blob or file!');
>>>>>>> master
            setLoading(false);
        });
    }

    return (
        <>
            <MDBFileInput multiple {...props} type='file' getValue={imgUpload} />
            {loading && <SpinnerPage />}
        </>
    );
}

export default InputPage;