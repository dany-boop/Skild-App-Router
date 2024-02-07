/* eslint-disable @next/next/no-img-element */
'use client';
import { FC } from 'react';
import LoginForm from '@/components/modular/login/forms';
import ThemeToggler from '@/components/integrated/ThemeToggler';
import { usePathname, useRouter } from 'next/navigation';

const ContainerLogin: FC = () => {
  const pathname = usePathname();

  // Define a style object based on the pathname
  const backgroundStyle: React.CSSProperties = {};

  if (pathname.includes('trades')) {
    backgroundStyle.backgroundImage =
      'url("/assets/images/Sign in Tradespersons.png")';
    backgroundStyle.backgroundSize = 'cover';
  } else if (pathname.includes('business')) {
    backgroundStyle.backgroundImage = 'url("/assets/images/Rectangle 209.png")';
    backgroundStyle.backgroundSize = 'cover';
  } else {
    backgroundStyle.backgroundColor = 'lightgray';
  }

  return (
    <>
      <section className="vh-100" style={backgroundStyle}>
        <div
          className="position-absolute"
          style={{ top: '1rem', left: '1rem' }}
        >
          <ThemeToggler />
        </div>
        <div className="container">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="/assets/images/logo.png"
                className="w-300 my-5 ms-5"
                alt="Sample image"
              />
            </div>

            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-2 px-4 py-4 bg-body-secondary rounded-5 ">
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContainerLogin;
