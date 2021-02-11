import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyBhqDPOazxeR8fCms6aOgTzrV5lXNPr2Zg",
  authDomain: "agile-anime-engineers.firebaseapp.com",
  projectId: "agile-anime-engineers",
  storageBucket: "agile-anime-engineers.appspot.com",
  messagingSenderId: "857833405577",
  appId: "1:857833405577:web:be002205106a606a355a58",
  measurementId: "G-G0TEP948DT"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const functions = firebase.functions();
