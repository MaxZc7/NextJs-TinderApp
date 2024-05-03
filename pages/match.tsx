import Header from '@/components/Header';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

export default function Match() {
  const [matchUsername, setMatchUsername] = useState();
  const [matchImage, setMatchImage] = useState();
  const [matchId, setMatchId] = useState();
  const [finishVotes, setFinishVotes] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios('/api/match');

        setMatchUsername(response.data.matchUsername);
        setMatchImage(response.data.matchImage);
        setMatchId(response.data.matchId);
        setFinishVotes(response.data.finishVotes);
      } catch (e) {
        console.error(`Error fetching Data ${e}`);
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    };
    if (!isMounted.current) {
      fetchData();
      isMounted.current = true;
    }
  }, []);

  const handleLeft = async () => {
    try {
      const response = await axios.post('/api/rejection', { matchId });

      if (response.status === 200) {
        const response = await axios('/api/match');
        setMatchUsername(response.data.matchUsername);
        setMatchImage(response.data.matchImage);
        setMatchId(response.data.matchId);
        setFinishVotes(response.data.finishVotes);
      }
    } catch (e) {
      console.error(`Error fetching Data ${e}`);
    }
  };
  const handleRight = async () => {
    try {
      const response = await axios.post('/api/like', { matchId });

      if (response.status === 200) {
        const response = await axios('/api/match');
        setMatchUsername(response.data.matchUsername);
        setMatchImage(response.data.matchImage);
        setMatchId(response.data.matchId);
        setFinishVotes(response.data.finishVotes);
      }
    } catch (e) {
      console.error(`Error fetching Data ${e}`);
    }
  };

  return (
    <article className="bg-slate-800">
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
      {/* loader */}
      <Header />
      <div className="h-screen w-full flex flex-col justify-center items-center gap-4">
        <h2 className="text-3xl text-white">
          <strong>{matchUsername}</strong>
        </h2>
        <picture>
          <img src={matchImage} alt="MatchImage" className="rounded-xl" />
        </picture>
        <div className="flex gap-6">
          {finishVotes ? (
            <Link
              className="text-white text-2xl border-b border-blue-400 hover:text-blue-400"
              href="/mymatchs"
            >
              Chek your Matchs
            </Link>
          ) : (
            <>
              <button
                onClick={() => handleLeft()}
                className="rounded-full arrowGradient p-4 px-5 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  height="40px"
                  width="40px"
                  version="1.1"
                  id="Capa_1"
                  viewBox="0 0 460.775 460.775"
                >
                  <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
                </svg>
              </button>
              <button
                onClick={() => handleRight()}
                className="rounded-full arrowGradient  p-4 px-5  "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  height="40px"
                  width="40px"
                  version="1.1"
                  id="Capa_1"
                  viewBox="0 0 471.701 471.701"
                >
                  <g>
                    <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3   s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4   c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3   C444.801,187.101,434.001,213.101,414.401,232.701z" />
                  </g>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
