import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
export default function Profile() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState();
  const [profilePreview, setProfilePreview] = useState('/defaultProfile.jpg');
  const [sendAvatarImage, setSendAvatarImage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/user');
      setUsername(response.data.username);
      setProfile(response.data.avatar);
    };

    fetchData();
  }, [profile]);

  const handleFile = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfilePreview(reader.result);
      }
    };

    setSendAvatarImage(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', sendAvatarImage);
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setErrorMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  const handleLogout = async () => {
    const response = await axios.post('/api/auth/logout');
    if (response.status == 200) {
      router.push('/login');
    }

    return;
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full gap-8 bg-black rounded-xl text-white">
      <div className="flex flex-col text-2xl gap-4">
        <div className="flex justify-center items-center gap-4 mx-auto bg-[#111418] w-full  py-2 rounded-full">
          <h1 className="text-3xl min-w-[200px]">Profile: {username}</h1>
          <div className="w-[100px]">
            {profile ? (
              <Image
                width={60}
                height={60}
                src={profile}
                alt=""
                className="rounded-full"
              />
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="bg-[#111418] px-8 py-4 rounded-xl flex justify-center items-center flex-col gap-6">
          <h4 className="text-center border-b pb-1">Set your profile image</h4>
          <div className="flex justify-center items-center gap-6">
            <picture>
              <Image
                width={60}
                height={60}
                src={profilePreview}
                alt=""
                className="rounded-full"
              />
            </picture>
            <input type="file" name="avatar" onChange={(e) => handleFile(e)} />
          </div>
          <button
            className="bg-slate-800 rounded-full px-4 py-2 hover:scale-105 transition-all"
            type="submit"
            onClick={(e) => handleUpload(e)}
          >
            Upload Image
          </button>
          {errorMessage}
        </div>

        <Link
          href="/"
          className="bg-[#111418] rounded-full px-4 py-2 hover:scale-105 transition-all text-center"
        >
          Go Home
        </Link>
        <button
          className="bg-[#111418] rounded-full px-4 py-2 hover:scale-105 transition-all"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
