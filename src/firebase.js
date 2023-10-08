import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAqh32-P2REbjQFAeWqyhmoXeJXVQRDIqY",
  authDomain: "rccgtog-member.firebaseapp.com",
  projectId: "rccgtog-member",
  storageBucket: "rccgtog-member.appspot.com",
  messagingSenderId: "813075051221",
  appId: "1:813075051221:web:ce8091f267ab45cc2f285c"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();

export { auth };