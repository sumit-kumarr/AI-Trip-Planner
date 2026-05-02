import { SignIn } from "@clerk/react";
import React from "react";

const SignInPage = () => {
  return (
    <div className="flex justify-center my-10 items-center">
      <SignIn></SignIn>
    </div>
  );
};

export default SignInPage;
