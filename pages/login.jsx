import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/auth/login', {
      username,
      password,
    });
    if (response.data.error) {
      setErrorMessage(response.data.error);
      return;
    }
    router.push('/match');
  };

  return (
    <div className="flex justify-center items-center h-screen w-full text-white absolute bg-[rgba(2555,2555,2555,.2)]">
      <div className="bg-[#111418] rounded-xl p-20">
        <form
          className="flex flex-col m-4  justify-items-center gap-8  "
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1 className="text-center text-5xl font-bold ">Login</h1>
          <div className="flex flex-col gap-4 text-black">
            <input
              type="text"
              placeholder="Username"
              className="py-2 mx-6 px-2 min-w-[300px] text-left rounded-xl placeholder:text-center"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="py-2 mx-6 px-2 min-w-[300px] text-left rounded-xl placeholder:text-center"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <input
            type="submit"
            value="Submit"
            className="cursor-pointer bg-black px-4 py-2 rounded-xl text-white text-xl hover:scale-105 transition-all"
          />
        </form>
        <div className="flex justify-center items-center text-red-700 font-medium text-xl   rounded-2xl p-1">
          {errorMessage ? errorMessage : ''}
        </div>
        <div className="flex justify-center items-center hover:text-red-500 rounded-2xl text-xl   p-1">
          <Link href="/signup">Not Have an account?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
