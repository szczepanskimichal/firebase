import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import React from "react";

export const Login = () => {
  const navigate = useNavigate();
  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };

  return (
    <div>
      <p>Sign In With Google To Continue</p>
      <button onClick={signIn}>Sign In With Google</button>
    </div>
  );
};
