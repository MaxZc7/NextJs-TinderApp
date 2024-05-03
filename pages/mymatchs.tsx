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
    };

    fetchData();
  }, []);

  return (
    <>
      <article className=" w-full min-h-[100vh] absolute bg-neutral-800 text-white">
        <Header />

        <section className="my-32">
          {message ? (
            <span className="w-full m-auto flex justify-center items-center my-10 text-4xl font-medium">
              {message}
            </span>
          ) : null}
          <div className="grid grid-cols-3 mx-20 gap-10 h-full place-content-center text-center">
            <div className="flex flex-col gap-2 ">
              <h4>No Likes</h4>
              <UserCards
                likedUsersData={undefined}
                matchUsersData={undefined}
                noLikedUsersData={noLikedUsersData}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h4>Matchs</h4>
              <UserCards
                likedUsersData={undefined}
                matchUsersData={matchUsersData}
                noLikedUsersData={undefined}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h4>Likes</h4>
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
