import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export const firebaseConfig = {
  apiKey: "AIzaSyCl512gU4yx2Tb4-e0scq-_gw_3owzXJxk",
  authDomain: "echopal.firebaseapp.com",
  projectId: "echopal",
  storageBucket: "echopal.appspot.com",
  messagingSenderId: "581263441505",
  appId: "1:581263441505:web:708c1d8ba133ffdd373420"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export function authenticateUser(){
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    localStorage.setItem('user' , JSON.stringify(user))

    const additionalUserInfo = result.additionalUserInfo;

      if (additionalUserInfo.isNewUser) {
        console.log("Welcome, new user!");
        // Perform actions for new users
      } else {
        console.log("Welcome back!");
        // Perform actions for returning users
      }




    
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  })
  .finally(()=>{
    location.reload()
  })
}
