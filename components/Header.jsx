import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Header() {
  const [username, setUsername] = useState('/defaultProfile.jpg');
  const [avatarImage, setAvatarImage] = useState('/defaultProfile.jpg');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/user');
      setUsername(response.data.username);
      setAvatarImage(response.data.avatar);
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-between px-10 w-full   text-white absolute bg-gradient-to-b  from-black  to-transparent">
      <div className="min-w-[250px]">
        <a
          href="/
      "
        >
          <img src="/logoTinder.webp" alt="logo" />
        </a>
      </div>

      <nav className="flex gap-6">
        <ul className="flex justify-center items-center gap-8  text-2xl  ">
          <li>
            <Link
              href="/mymatchs"
              className="hover:text-red-500 hover:border-b border-red-500"
            >
              My Matchs
            </Link>
          </li>
          <li>
            <Link
              href="/informacion"
              className="hover:text-red-500 hover:border-b border-red-500"
            >
              Informacion
            </Link>
          </li>
          <li>
            <Link
              href="/match"
              className="hover:text-red-500 hover:border-b border-red-500"
            >
              Match
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="hover:text-red-500 hover:border-b border-red-500"
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      <div className="my-auto min-w-[250px]">
        {username ? (
          <div className="flex justify-center items-center gap-4">
            <Image
              width={50}
              height={50}
              src={avatarImage}
              alt=""
              className="rounded-full"
            />
            <div className="flex flex-col justify-center items-center gap-4">
              <h1 className="text-3xl">{username}</h1>
            </div>
          </div>
        ) : (
          <div className="flex  gap-2">
            {' '}
            <Link
              href="/login"
              className="rounded-full px-4 py-2 bg-white text-black hover:text-white hover:bg-black transition-all"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-full px-4 py-2 bg-white text-black hover:text-white hover:bg-black transition-all"
            >
              Sign Up
            </Link>{' '}
          </div>
        )}
      </div>
    </div>
  );
}
