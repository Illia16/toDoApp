import firebase from 'firebase/app';
import 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyCXCtlbMciyKpnBzkHo8uiR88eN9nsjviw",
    authDomain: "todoapp-674d3.firebaseapp.com",
    databaseURL: "https://todoapp-674d3.firebaseio.com",
    projectId: "todoapp-674d3",
    storageBucket: "todoapp-674d3.appspot.com",
    messagingSenderId: "21993319173",
    appId: "1:21993319173:web:11c8b51fb05535a927e56c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;