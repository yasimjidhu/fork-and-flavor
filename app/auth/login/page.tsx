'use client';
import Image from "next/image";
import React, { useState } from "react";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (res?.error) {
      setError(res?.error);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-300 rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center primary">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-yellow-600 rounded hover:bg-yellow-700 focus:outline-none"
          >
            Login
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 text-white bg-black rounded hover:bg-gray-900 focus:outline-none flex items-center justify-center gap-2"
            onClick={() => signIn("google", { callbackUrl: '/' })}
          >
            <Image
              src="/google.png"
              alt="Google logo"
              width={20}
              height={20}
            />
            Login With Google
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/auth/register" className="text-yellow-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
