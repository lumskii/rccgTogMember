import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyAqh32-P2REbjQFAeWqyhmoXeJXVQRDIqY",
  authDomain: "rccgtog-member.firebaseapp.com",
  databaseURL: "https://rccgtog-member-default-rtdb.firebaseio.com",
  projectId: "rccgtog-member",
  storageBucket: "rccgtog-member.appspot.com",
  messagingSenderId: "813075051221",
  appId: "1:813075051221:web:ce8091f267ab45cc2f285c"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.database();

export { auth, db };