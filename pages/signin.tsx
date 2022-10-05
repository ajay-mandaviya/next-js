import React from "react";
import { AuthForm } from "../components";
const SignIn = () => {
  return <AuthForm mode="signin" />;
};

SignIn.authPage = true;
export default SignIn;
