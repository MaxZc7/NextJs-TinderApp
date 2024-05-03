import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', {
        email,
        username,
        password,
      });
      if (response.data.error) {
        setErrorMessage(response.data.error);
        return;
      }
    } catch (err) {
      setErrorMessage('Ups sorry, something gone wrong, try again later');
    }
    router.push('/profile');
  };

  return (
    <div className="flex justify-center items-center h-screen w-full ">
      <div className="bg-[#111418] rounded-xl p-20">
        <form
          className="flex flex-col m-4  justify-items-center gap-4 text-black "
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1 className="text-center text-4xl font-bold text-white">Sign Up</h1>
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded-xl  placeholder:text-center"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            className="p-2 rounded-xl  placeholder:text-center"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded-xl  placeholder:text-center"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="submit"
            value="Submit"
            className="cursor-pointer bg-black px-4 py-2 rounded-xl text-white text-xl "
          />
        </form>
        <div className="flex justify-center items-center text-red-600 font-medium text-xl     rounded-2xl p-1">
          {errorMessage ? errorMessage : ''}
        </div>
        <div className="flex justify-center items-center hover:text-blue-300 rounded-2xl text-xl text-white p-1">
          <a href="login">Already Have an account?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
