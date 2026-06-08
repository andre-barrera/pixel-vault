"use client";

import { signUp } from "@/services/authService";
import { useState } from "react";

export default function SignupPage(){

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    async function handleSignUp(e: any) {
        e.preventDefault();
        const { data, error } = await signUp(
            email,
            password
            );

            console.log("Signup data:", data);
            console.log("Signup error:", error);

            if (error) {
            alert(error.message);
            return;
            }

alert("Signup successful!");

        alert(
            "Check your email for verification"
        );       
    }

    return (
        <main className="max-w-md mx-auto p-6">
            <h1 className="text-3xl mb-6">
                Sign Up
            </h1>

            <form
                onSubmit={handleSignUp}
                className="space-y-4">

                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className="w-full p-3 border rounded"
                />
                
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    className="w-full p-3 border rounded"

                />

                <button
                    type="submit"
                    className="w-full bg-black text-white p-3 rounded"
                >
                    Create Account
                </button>
                
            </form>
        </main>
    );
}