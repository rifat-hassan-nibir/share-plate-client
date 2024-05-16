/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../Firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   Create User with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //  Login User with email and password
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   Google Login
  const googleProvider = new GoogleAuthProvider(auth);
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   Sign Out User
  const logOutUser = () => {
    setUser(null);
    signOut(auth);
  };

  //   Observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };

      setUser(currentUser);
      setLoading(false);

      // if user exists then issue a token
      if (currentUser) {
        axios.post(`${import.meta.env.VITE_API_URL}/jwt`, loggedUser, { withCredentials: true }).then((data) => {
          // console.log("token response", data.data);
        });
      } else {
        axios.post(`${import.meta.env.VITE_API_URL}/logout`, loggedUser, { withCredentials: true }).then((data) => console.log("success"));
      }
    });

    return () => {
      return unSubscribe();
    };
  }, [user?.email]);

  const authInfo = { user, setUser, loading, createUser, loginUser, logOutUser, googleLogin };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
