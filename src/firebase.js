import * as firebase from 'firebase';
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyB-3i4IPg-57_5xjdgv1Ywgk9KkRFWaG-o",
    authDomain: "sh-frontend-8f893.firebaseapp.com",
    databaseURL: "https://sh-frontend-8f893.firebaseio.com",
    projectId: "sh-frontend-8f893",
    storageBucket: "sh-frontend-8f893.appspot.com",
    messagingSenderId: "1077547719861",
    appId: "1:1077547719861:web:3a71e5d618ef3d6f9632fc",
    measurementId: "G-TXEQFGMR4H"
};

firebase.initializeApp(firebaseConfig);
export default firebase;