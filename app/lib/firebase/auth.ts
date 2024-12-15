import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged as _onAuthStateChanged,
  UserCredential,
} from "firebase/auth";
import type { User } from "firebase/auth"
import { auth } from "./clientApp";

export type firebaseUser = User

export function onAuthStateChanged(cb: any) {
  return _onAuthStateChanged(auth, cb);
}

export async function logIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("logIn", user);
    if (typeof window !== "undefined") {
      localStorage.setItem('accessToken', await user.getIdToken())
    }
    return user;
  } catch (error: any) {
      console.log("logIn", error)
      throw new Error("invalid_login");
  }
}

export async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    console.log("Signup", user);
    return user;
  } catch (error: any) {
    console.error("sign up", error)
    throw new Error("invalid_signup");
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error: any) {
    console.error("signout", error);
  }
}