import React, { useState } from "react";
import { MDBFileInput } from "mdbreact";
import { useSelector } from 'react-redux';
import firebase from '../firebase';
import SpinnerPage from "./Spinner";

const db = firebase.firestore();
function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

const id = randomString(20)
console.log(id)


function InputPage(props) {
    const [loading, setLoading] = useState(false)
    const [dogId, setDogId] = useState('');
    const profile = useSelector(state => state.profile);


    function imgUpload(files) {

        setLoading(true);

        console.log(typeof files[0]);
        // FileList { 0: File, length: 1 }
        // 0: File { name: "bentley.PNG", lastModified: 1594648700779, lastModifiedDate: Mon Jul 13 2020 09: 58: 20 GMT - 0400(Eastern Daylight Time), webkitRelativePath: "", size: 1179597, … }
        // length: 1


        let fileObj = files[0];
        // const newObj = Object.assign(fileObj, { 'name': fileObj.name.toLowerCase() })

        // fileObj['name'] = fileObj.name.toLowerCase();
        // console.log(newObj);
        // fileObj.name = fileObj.name.toLowerCase();

        // Create a reference with an initial file path and name
        let storage = firebase.storage();
        // var pathReference = storage.ref('images/stars.jpg');

        // Create a reference from a Google Cloud Storage URI
        // var gsReference = storage.refFromURL('gs://sh-frontend-8f893.appspot.com/gerrit.gif')

        // let imgFileName = files[0].name.toLowerCase()
        let imgFileName = files[0].name
        let fileType = imgFileName.substr(imgFileName.lastIndexOf('.') + 1);

        // Create a reference from an HTTPS URL
        // Note that in the URL, characters are URL escaped!
        // var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');


        // Create a root reference
        let storageRef = firebase.storage().ref();
        let imgId = id;
        let imgRef = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/' + imgId + "." + fileType + "?alt=media"

        // Create a reference to 'mountains.jpg'
        let ref = storageRef.child(imgId + "." + fileType);


        // the function could also take snapshot as an input
        ref.put(fileObj).then(function (imgRef) {
            imgRef = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/' + imgId + "." + fileType + "?alt=media"
            props.onUpload(imgRef);
            console.log('Uploaded a blob or file!');
            setLoading(false);
        });

        // delete the old reference

    }

    return (
        <>
            <MDBFileInput {...props} type='file' getValue={imgUpload} />
            {loading && <SpinnerPage />}
        </>
    );

}

export default InputPage;