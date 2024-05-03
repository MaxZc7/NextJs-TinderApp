import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import Link from 'next/link';
function Index() {
  const [isToken, setIsToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios('/api/user');

        setIsToken(response.data.isToken);
      } catch (e) {
        console.error(`Error fetching Data ${e}`);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    };

    fetchData();
  }, []);

  return (
    <article className="backgroundImage h-screen w-full">
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

      <main className="absolute bg-[rgba(0,0,0,0.5)] w-full h-screen">
        <div className="">
          <Header />
          <div className="grid w-full h-screen place-content-center  ">
            <h1 className="font-bold text-white text-9xl ">
              Deslizá a la derecha
            </h1>
            <div className="m-auto mt-4">
              <button className="buttonGradient rounded-full text-xl ">
                {isToken ? (
                  <Link href="/match">Go Match</Link>
                ) : (
                  <Link href="/signup">Crear cuenta</Link>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </article>
  );
}

export default Index;
