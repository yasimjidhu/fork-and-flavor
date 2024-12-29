'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await signIn('credentials', {
      email,
      password,
      username,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      // Redirect to home or login page after successful registration
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-300 rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="p-2 mt-1 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="enter  username"
              required
              className="p-2 mt-1 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="p-2 mt-1 border rounded"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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
            Register With Google
          </button>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-yellow-600 rounded hover:bg-yellow-700 focus:outline-none"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
