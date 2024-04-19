import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Header() {
  const [username, setUsername] = useState('');
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
    <div className="flex justify-between px-10 w-full p-6">
      <div>{/* image Here */}</div>

      <nav className="flex gap-6">
        <ul className="flex justify-center items-center gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">about</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </nav>

      <div>
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
          <div>
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
