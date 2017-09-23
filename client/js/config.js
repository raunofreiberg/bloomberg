import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDsk-FXfneWR0NOeUgqFm2lTa_ZTI3pT2A",
    authDomain: "bloomfield-8c27e.firebaseapp.com",
    databaseURL: "https://bloomfield-8c27e.firebaseio.com",
    projectId: "bloomfield-8c27e",
    storageBucket: "",
    messagingSenderId: "467037768950",
};
firebase.initializeApp(config);

export default firebase;