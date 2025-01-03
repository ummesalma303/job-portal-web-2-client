import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";
import axios from "axios";
// import useAxiosSecure from '../../hooks/useAxiosSecure';
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  // const axiosInstance = useAxiosSecure()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const singInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const singInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("state captured -->", currentUser?.email);
      if (currentUser?.email) {
        const user = { email: currentUser.email };
        // axios.post('https://job-portal-server-for-recruiter-part3-omega.vercel.app/jwt',user,{withCredentials:true})
        axios
          .post(
            "https://job-portal-server-for-recruiter-part3-omega.vercel.app/jwt",
            user,
            { withCredentials: true }
          )
          .then((res) => {
            console.log("login token", res.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post(
            "https://job-portal-server-for-recruiter-part3-omega.vercel.app/logOut",
            {},
            { withCredentials: true }
          )
          .then((res) => {
            console.log("log Out token", res.data);

            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    singInUser,
    singInWithGoogle,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
