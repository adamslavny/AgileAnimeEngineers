import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

const LoginUI = (props: {signInCallback: () => boolean}) => {

  const { signInCallback } = props;


  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.

    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: signInCallback
    }
  };

  return (
    <div className= "login">
      <h1 className = "login-header">Welcome to Animex</h1>
      <h2 className = "login-msg">Real-time chats about your favorite shows</h2>
      <p className = "login-info"><b>Sign in to begin</b></p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>

    </div>
  );
};

export default LoginUI;

/*Image Credit- https://www.humaaans.com/*/
