import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCPera806NQnThRLv10pURrWa9GkrUKqYs",
    authDomain: "iaproject-29018.firebaseapp.com",
    projectId: "iaproject-29018",
    storageBucket: "iaproject-29018.appspot.com",
    messagingSenderId: "817053540910",
    appId: "1:817053540910:web:423251c3f6691e27fd75bf"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage,
    firebase
}