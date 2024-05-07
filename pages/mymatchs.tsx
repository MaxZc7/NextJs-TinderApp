import Header from '@/components/Header';
import UserCards from '@/components/UserCards';
import axios from 'axios';

import React, { useEffect, useState } from 'react';

function Mymatchs() {
  const [likedUsersData, setLikedUsersData] = useState();
  const [noLikedUsersData, setNoLikedUsersData] = useState();
  const [matchUsersData, setMatchUsersData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [message, setMessage] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/votes');
      setMatchUsersData(response.data.matchUsersData);
      setLikedUsersData(response.data.likedUsersData);
      setNoLikedUsersData(response.data.noLikedUsersData);
      setMessage(response.data.message);
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    };
    fetchData();
  }, []);

  return (
    <>
      <article className=" w-full min-h-[100vh] absolute bg-neutral-800 text-white">
        {/* Loader */}

        <div
          className={`absolute w-screen h-screen bgGradient z-10 transition-all ${
            isLoading ? 'opacity-100' : 'opacity-0 hidden'
          }`}
        >
          <div className="grid place-content-center h-full animate-jump animate-infinite animate-duration-[1500ms] ">
            <svg
              focusable="false"
              aria-hidden="true"
              role="presentation"
              viewBox="0 0 24 24"
              width="100px"
              height="100px"
            >
              <path
                d="M8.21 10.08c-.02 0-.04 0-.06-.02-.67-.9-.84-2.44-.89-3.03 0-.11-.13-.18-.23-.12C4.93 8.08 3 10.86 3 13.54 3 18.14 6.2 22 11.7 22c5.15 0 8.7-3.98 8.7-8.46 0-5.87-4.2-9.77-7.93-11.53a.13.13 0 0 0-.19.14c.48 3.16-.18 6.6-4.07 7.93z"
                fill="#fff"
                fillRule="nonzero"
              ></path>
            </svg>
          </div>
        </div>
        <Header />

        <section className="my-32">
          {message ? (
            <span className="w-full m-auto flex justify-center items-center my-10 text-4xl font-medium">
              {message}
            </span>
          ) : null}
          <div className="grid grid-cols-3 mx-20 gap-10 h-full place-content-center text-center">
            <div className="flex flex-col gap-2 ">
              <h4 className="font-bold text-4xl border-t border-b rounded-xl bg-slate-950 py-2 ">
                No Likes
              </h4>
              <UserCards
                likedUsersData={undefined}
                matchUsersData={undefined}
                noLikedUsersData={noLikedUsersData}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-4xl border-t border-b rounded-xl bg-slate-950 py-2 ">
                Matchs
              </h4>
              <UserCards
                likedUsersData={undefined}
                matchUsersData={matchUsersData}
                noLikedUsersData={undefined}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-4xl border-t border-b rounded-xl bg-slate-950 py-2 ">
                Likes
              </h4>
              <UserCards
                likedUsersData={likedUsersData}
                matchUsersData={undefined}
                noLikedUsersData={undefined}
              />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

export default Mymatchs;
