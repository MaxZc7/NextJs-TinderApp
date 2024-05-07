import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Link from 'next/link';

function Informacion() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  return (
    <article className=" h-screen w-full">
      <main className="absolute bg-[rgba(0,0,0,0.9)] w-full h-screen">
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
        <div className="">
          <Header />
          <article className="pt-32 flex flex-col justify-center gap-10 items-center  max-w-[1300px] m-auto text-white">
            <h4 className="text-4xl font-bold border-b-2">
              Bienvenido a nuestra Aplicación
            </h4>
            <div className="flex flex-col gap-4  justify-center  items-center text-center">
              <p className="font-semibold text-2xl border-b">
                Acerca de Nosotros
              </p>
              <span className="font-medium opacity-85  text-lg shadow-2xl">
                Somos un equipo apasionado que ha creado esta aplicación para
                conectar a personas de una manera divertida y significativa.
                Nuestro objetivo es proporcionar una plataforma moderna y segura
                para que las personas puedan conocerse y conectar en línea.
              </span>
            </div>
            <div className="flex flex-col gap-4  justify-center  items-center text-center">
              <p className="font-semibold text-2xl border-b">Cómo Funciona</p>
              <div className="flex justify-center items-center flex-col gap-2">
                <span className="font-medium opacity-85  text-lg shadow-2xl">
                  1. Crea tu Perfil: Completa tu perfil con información
                  interesante sobre ti y sube algunas fotos atractivas.
                </span>
                <span className="font-medium opacity-85  text-lg shadow-2xl">
                  2. Descubre Perfiles: Explora perfiles de otras personas en
                  función de tus preferencias.
                </span>
                <span className="font-medium opacity-85  text-lg shadow-2xl">
                  3. Haz Match: Desliza a la derecha si te gusta alguien o a la
                  izquierda si prefieres pasar.
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4  justify-center  items-center text-center">
              <p className="font-semibold text-2xl border-b">
                Privacidad y Seguridad
              </p>
              <span className="font-medium opacity-85  text-lg shadow-2xl">
                Nos tomamos muy en serio la privacidad y seguridad de nuestros
                usuarios. Utilizamos tecnologías avanzadas para proteger tu
                información personal y proporcionar un entorno seguro para tus
                interacciones.
              </span>
            </div>
            <div className="flex flex-col gap-4  justify-center  items-center text-center">
              <p className="font-semibold text-2xl border-b">Contáctanos</p>
              <span className="font-medium opacity-85  text-lg shadow-2xl">
                Si tienes alguna pregunta, sugerencia o necesitas asistencia, no
                dudes en contactarnos en email@email.com ¡Estamos aquí para
                ayudarte!
              </span>
            </div>
          </article>
        </div>
      </main>
    </article>
  );
}

export default Informacion;
