import auth from "./firebase";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";

function facebookAuth() {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      return user;
    })
    .catch((error) => {
        console.error(error);
    });
}

export default facebookAuth;
