import auth from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

async function googleAuth() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth,provider);
  const user = result.user;
  return user;
}

export default googleAuth;
