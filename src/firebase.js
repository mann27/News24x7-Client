import firebase from "firebase";
import 'firebase/storage';


firebase.initializeApp({
    apiKey: "AIzaSyDQq_0DFJRlQinXZQtneysOSLfNF_-O5A4",
    authDomain: "news-sen3.firebaseapp.com",
    databaseURL: "https://news-sen3.firebaseio.com",
    projectId: "news-sen3",
    storageBucket: "news-sen3.appspot.com",
    messagingSenderId: "65514608615",
    appId: "1:65514608615:web:9407d1b4016b5eb3920f42",
    measurementId: "G-PGGF8J35EJ"
});

const storage = firebase.storage();


export { storage, firebase as default };