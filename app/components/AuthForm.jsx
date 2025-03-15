"use client";

import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/navigation";

function AuthForm() {
  const [ isNewUser, setIsNewUser ] = useState(false);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ isSigningIn, setIsSigningIn ] = useState(false);
  const [ isSigningUp, setIsSigningUp ] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        });

    if(!error) {
        router.push("/photos");
    } else {
        console.log(error);
    }
  }; 

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (!error) {
      setIsSigningUp(true);
    }
    console.log(data, error);
  };

  let signInMessage = "Sign in";

  if (isSigningIn) {
    signInMessage = "Signing in...";
  } else if (isNewUser) {
    signInMessage = "Sign up";
  }

  const signUpMessage = (
    <p className="text-center">Email sent! check your inbox to verify your email</p>
  );

return (
    <form onSubmit={isNewUser ? handleSignUp : handleLogin}>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 my-2 border border-gray-300 rounded"
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 my-2 border border-gray-300 rounded"
        />
        <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mb-10 hover:bg-blue-600"
        >
            {signInMessage}
        </button>
        <p className="text-center">
            {isNewUser ? (
                <>
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setIsNewUser(false)}
                        className="text-blue-500 hover:underline hover:text-blue-700"
                    >
                        Sign in
                    </button>
                </>
            ) : (
                <>
                    Don't have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setIsNewUser(true)}
                        className="text-blue-500 hover:underline hover:text-blue-700"
                    >
                        Sign up
                    </button>
                </>
            )}
        </p>
        {isSigningUp && signUpMessage}
    </form>
);
}

export default AuthForm;
