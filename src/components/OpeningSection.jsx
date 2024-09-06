import React, { useEffect, useRef, useState } from 'react'
import OpeningTextConfig from '../common/opening';
import MainConfig from '../common/main';

const OpeningSection = ({ SetState, BGM, clickSoundEffect, typewritingSoundEffect }) => {
  const [showFirstPage, setShowFirstPage] = useState(true);
  const [showSecondPage, setShowSecondPage] = useState(false);

  const handleStart = () => {
    clickSoundEffect()
    BGM(true)
    typewritingSoundEffect(true)
    setShowFirstPage(false);
    setShowSecondPage(true);
  };



  return (
    <div className='absolute bg-[rgba(238,99,160)] w-full h-screen z-40'>
      <FirstPage handleStart={handleStart} isVisible={showFirstPage} />
      {showSecondPage && <SecondPage SetState={SetState} isVisible={showSecondPage} typewritingSoundEffect={typewritingSoundEffect} />}
    </div>
  )
}

const FirstPage = ({ handleStart, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className='w-full min-h-screen relative overflow-hidden flex items-center justify-center'>
      <div className='absolute w-full bottom-52 md:bottom-0 flex justify-center items-center gap-20'>
        {/* character decoration */}
        <div className='absolute scale-50 translate-x-32 md:scale-100 md:relative md:translate-x-0 md:translate-y-0 flex flex-col items-center'>
          <img src="img/starface.png" alt="" className='w-[350px] breathe bounce-flip delay-1 z-10' />
          <div className='absolute bottom-0 w-80 h-20 bg-black rounded-[100%] blur-2xl'>
          </div>
        </div>
        <div className='absolute scale-50 translate-x-24 translate-y-32 md:scale-100 md:relative md:translate-x-0 md:translate-y-0 flex flex-col items-center'>
          <img src="img/normalface.png" alt="" className='w-[350px] breathe bounce-flip delay-3 z-10' />
          <div className='absolute bottom-0 w-80 h-20 bg-black rounded-[100%] blur-2xl'>
          </div>
        </div>
        <div className='absolute scale-50 -translate-x-24 md:scale-100 md:relative md:translate-x-0 md:translate-y-0 flex flex-col items-center'>
          <img src="img/cuteface.png" alt="" className='w-[350px] breathe bounce-flip delay-2' />
          <div className='absolute bottom-0 w-80 h-20 bg-black rounded-[100%] blur-2xl -z-10'>
          </div>
        </div>
        <div className='absolute scale-50 -translate-x-20 translate-y-32 md:scale-100 md:relative md:translate-x-0 md:translate-y-0 flex flex-col items-center'>
          <img src="img/happyface.png" alt="" className='w-[350px] breathe bounce-flip delay-4' />
          <div className='absolute bottom-0 w-80 h-20 bg-black rounded-[100%] blur-2xl -z-10'>
          </div>
        </div>

      </div>
      <img src="img/wave.png" alt="" className='absolute scale-[2] md:scale-100 -top-[30vw] md:-left-60 unselectable' />
      <img src="img/cloud.png" alt="" className='absolute w-28 md:w-52 md:translate-x-60 -translate-y-72 cloud1' />
      <img src="img/cloud.png" alt="" className='absolute w-28 md:w-52 -translate-x-32 md:-translate-x-60 -translate-y-60 cloud2' />
      <img src="img/cloud.png" alt="" className='absolute w-28 md:w-52 translate-x-32 md:translate-x-[700px] -translate-y-80 cloud3' />

      {/* love decoration */}
      <span className='absolute z-10 scale-[0.25] md:scale-75 -translate-x-32 translate-y-20 md:-translate-x-[550px] md:-translate-y-24 -rotate-[10deg] love'>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <path d="M0 0 C5.60428056 4.20321042 10.9295058 8.72063943 12 16 C13.04309822 29.0387277 6.05191099 40.72624863 -2.0625 50.375 C-10.18785433 59.76092072 -18.83710367 68.51919683 -28.5625 76.25 C-29.14620361 76.71615723 -29.72990723 77.18231445 -30.33129883 77.66259766 C-36.12965399 82.13641248 -36.12965399 82.13641248 -39 82 C-41.20355843 80.49423508 -43.03974504 79.0306673 -45 77.25 C-45.56960449 76.74919922 -46.13920898 76.24839844 -46.72607422 75.73242188 C-48.49637656 74.16817352 -50.24913601 72.58594899 -52 71 C-53.04410013 70.06751717 -54.08836377 69.13521737 -55.1328125 68.203125 C-58.12910625 65.51078197 -61.06629601 62.76043825 -64 60 C-64.95003906 59.12730469 -65.90007812 58.25460938 -66.87890625 57.35546875 C-75.57142031 49.09818488 -84.7713809 38.46683348 -86.37109375 26.140625 C-86.56283862 17.79408351 -84.96754569 11.44734191 -79.3203125 5.1171875 C-74.88421432 1.03597717 -70.76171857 -0.68134016 -64.75 -1.375 C-57.07254915 -0.60725491 -50.4113891 2.46562478 -45 8 C-42.86547708 10.92144381 -40.89367349 13.91774421 -39 17 C-38.5153125 16.27554687 -38.030625 15.55109375 -37.53125 14.8046875 C-29.11984077 2.67284726 -15.25056972 -9.44872255 0 0 Z " fill="#ffff" transform="translate(87,14)" />
        </svg>
      </span>
      <span className='absolute sc z-10 scale-[0.25] md:scale-75 -translate-x-44 translate-y-40 md:-translate-x-[700px] rotate-[50deg] love'>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <path d="M0 0 C5.60428056 4.20321042 10.9295058 8.72063943 12 16 C13.04309822 29.0387277 6.05191099 40.72624863 -2.0625 50.375 C-10.18785433 59.76092072 -18.83710367 68.51919683 -28.5625 76.25 C-29.14620361 76.71615723 -29.72990723 77.18231445 -30.33129883 77.66259766 C-36.12965399 82.13641248 -36.12965399 82.13641248 -39 82 C-41.20355843 80.49423508 -43.03974504 79.0306673 -45 77.25 C-45.56960449 76.74919922 -46.13920898 76.24839844 -46.72607422 75.73242188 C-48.49637656 74.16817352 -50.24913601 72.58594899 -52 71 C-53.04410013 70.06751717 -54.08836377 69.13521737 -55.1328125 68.203125 C-58.12910625 65.51078197 -61.06629601 62.76043825 -64 60 C-64.95003906 59.12730469 -65.90007812 58.25460938 -66.87890625 57.35546875 C-75.57142031 49.09818488 -84.7713809 38.46683348 -86.37109375 26.140625 C-86.56283862 17.79408351 -84.96754569 11.44734191 -79.3203125 5.1171875 C-74.88421432 1.03597717 -70.76171857 -0.68134016 -64.75 -1.375 C-57.07254915 -0.60725491 -50.4113891 2.46562478 -45 8 C-42.86547708 10.92144381 -40.89367349 13.91774421 -39 17 C-38.5153125 16.27554687 -38.030625 15.55109375 -37.53125 14.8046875 C-29.11984077 2.67284726 -15.25056972 -9.44872255 0 0 Z " fill="#FF0063" transform="translate(87,14)" />
        </svg>
      </span>
      <span className='absolute z-10 scale-[0.25] md:scale-75 -translate-x-20 translate-y-7 md:-translate-x-[700px] md:-translate-y-60 rotate-[20deg] love'>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <path d="M0 0 C5.60428056 4.20321042 10.9295058 8.72063943 12 16 C13.04309822 29.0387277 6.05191099 40.72624863 -2.0625 50.375 C-10.18785433 59.76092072 -18.83710367 68.51919683 -28.5625 76.25 C-29.14620361 76.71615723 -29.72990723 77.18231445 -30.33129883 77.66259766 C-36.12965399 82.13641248 -36.12965399 82.13641248 -39 82 C-41.20355843 80.49423508 -43.03974504 79.0306673 -45 77.25 C-45.56960449 76.74919922 -46.13920898 76.24839844 -46.72607422 75.73242188 C-48.49637656 74.16817352 -50.24913601 72.58594899 -52 71 C-53.04410013 70.06751717 -54.08836377 69.13521737 -55.1328125 68.203125 C-58.12910625 65.51078197 -61.06629601 62.76043825 -64 60 C-64.95003906 59.12730469 -65.90007812 58.25460938 -66.87890625 57.35546875 C-75.57142031 49.09818488 -84.7713809 38.46683348 -86.37109375 26.140625 C-86.56283862 17.79408351 -84.96754569 11.44734191 -79.3203125 5.1171875 C-74.88421432 1.03597717 -70.76171857 -0.68134016 -64.75 -1.375 C-57.07254915 -0.60725491 -50.4113891 2.46562478 -45 8 C-42.86547708 10.92144381 -40.89367349 13.91774421 -39 17 C-38.5153125 16.27554687 -38.030625 15.55109375 -37.53125 14.8046875 C-29.11984077 2.67284726 -15.25056972 -9.44872255 0 0 Z " fill="#F14888" transform="translate(87,14)" />
        </svg>
      </span>
      <span className='absolute z-10 scale-[0.25] md:scale-75 translate-x-44 md:-translate-x-[450px] md:-translate-y-80 rotate-[20deg] love'>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <path d="M0 0 C5.60428056 4.20321042 10.9295058 8.72063943 12 16 C13.04309822 29.0387277 6.05191099 40.72624863 -2.0625 50.375 C-10.18785433 59.76092072 -18.83710367 68.51919683 -28.5625 76.25 C-29.14620361 76.71615723 -29.72990723 77.18231445 -30.33129883 77.66259766 C-36.12965399 82.13641248 -36.12965399 82.13641248 -39 82 C-41.20355843 80.49423508 -43.03974504 79.0306673 -45 77.25 C-45.56960449 76.74919922 -46.13920898 76.24839844 -46.72607422 75.73242188 C-48.49637656 74.16817352 -50.24913601 72.58594899 -52 71 C-53.04410013 70.06751717 -54.08836377 69.13521737 -55.1328125 68.203125 C-58.12910625 65.51078197 -61.06629601 62.76043825 -64 60 C-64.95003906 59.12730469 -65.90007812 58.25460938 -66.87890625 57.35546875 C-75.57142031 49.09818488 -84.7713809 38.46683348 -86.37109375 26.140625 C-86.56283862 17.79408351 -84.96754569 11.44734191 -79.3203125 5.1171875 C-74.88421432 1.03597717 -70.76171857 -0.68134016 -64.75 -1.375 C-57.07254915 -0.60725491 -50.4113891 2.46562478 -45 8 C-42.86547708 10.92144381 -40.89367349 13.91774421 -39 17 C-38.5153125 16.27554687 -38.030625 15.55109375 -37.53125 14.8046875 C-29.11984077 2.67284726 -15.25056972 -9.44872255 0 0 Z " fill="#F9D2FD" transform="translate(87,14)" />
        </svg>
      </span>
      <span className='absolute z-10 scale-[0.25] md:scale-75 translate-x-28 translate-y-7 md:translate-x-[450px] md:-translate-y-52 -rotate-[10deg] love'>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <path d="M0 0 C5.60428056 4.20321042 10.9295058 8.72063943 12 16 C13.04309822 29.0387277 6.05191099 40.72624863 -2.0625 50.375 C-10.18785433 59.76092072 -18.83710367 68.51919683 -28.5625 76.25 C-29.14620361 76.71615723 -29.72990723 77.18231445 -30.33129883 77.66259766 C-36.12965399 82.13641248 -36.12965399 82.13641248 -39 82 C-41.20355843 80.49423508 -43.03974504 79.0306673 -45 77.25 C-45.56960449 76.74919922 -46.13920898 76.24839844 -46.72607422 75.73242188 C-48.49637656 74.16817352 -50.24913601 72.58594899 -52 71 C-53.04410013 70.06751717 -54.08836377 69.13521737 -55.1328125 68.203125 C-58.12910625 65.51078197 -61.06629601 62.76043825 -64 60 C-64.95003906 59.12730469 -65.90007812 58.25460938 -66.87890625 57.35546875 C-75.57142031 49.09818488 -84.7713809 38.46683348 -86.37109375 26.140625 C-86.56283862 17.79408351 -84.96754569 11.44734191 -79.3203125 5.1171875 C-74.88421432 1.03597717 -70.76171857 -0.68134016 -64.75 -1.375 C-57.07254915 -0.60725491 -50.4113891 2.46562478 -45 8 C-42.86547708 10.92144381 -40.89367349 13.91774421 -39 17 C-38.5153125 16.27554687 -38.030625 15.55109375 -37.53125 14.8046875 C-29.11984077 2.67284726 -15.25056972 -9.44872255 0 0 Z " fill="#F8D207" transform="translate(87,14)" />
        </svg>
      </span>
      <span className='absolute z-10 scale-[0.25] md:scale-75 hidden md:block md:translate-x-[700px] md:-translate-y-[300px] rotate-[20deg] love'>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <path d="M0 0 C5.60428056 4.20321042 10.9295058 8.72063943 12 16 C13.04309822 29.0387277 6.05191099 40.72624863 -2.0625 50.375 C-10.18785433 59.76092072 -18.83710367 68.51919683 -28.5625 76.25 C-29.14620361 76.71615723 -29.72990723 77.18231445 -30.33129883 77.66259766 C-36.12965399 82.13641248 -36.12965399 82.13641248 -39 82 C-41.20355843 80.49423508 -43.03974504 79.0306673 -45 77.25 C-45.56960449 76.74919922 -46.13920898 76.24839844 -46.72607422 75.73242188 C-48.49637656 74.16817352 -50.24913601 72.58594899 -52 71 C-53.04410013 70.06751717 -54.08836377 69.13521737 -55.1328125 68.203125 C-58.12910625 65.51078197 -61.06629601 62.76043825 -64 60 C-64.95003906 59.12730469 -65.90007812 58.25460938 -66.87890625 57.35546875 C-75.57142031 49.09818488 -84.7713809 38.46683348 -86.37109375 26.140625 C-86.56283862 17.79408351 -84.96754569 11.44734191 -79.3203125 5.1171875 C-74.88421432 1.03597717 -70.76171857 -0.68134016 -64.75 -1.375 C-57.07254915 -0.60725491 -50.4113891 2.46562478 -45 8 C-42.86547708 10.92144381 -40.89367349 13.91774421 -39 17 C-38.5153125 16.27554687 -38.030625 15.55109375 -37.53125 14.8046875 C-29.11984077 2.67284726 -15.25056972 -9.44872255 0 0 Z " fill="#F9D2FD" transform="translate(87,14)" />
        </svg>
      </span>
      <span className='absolute z-10 scale-[0.25] md:scale-75 translate-x-32 translate-y-20 md:translate-x-[550px] md:-translate-y-24 rotate-[10deg] love'>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <path d="M0 0 C5.60428056 4.20321042 10.9295058 8.72063943 12 16 C13.04309822 29.0387277 6.05191099 40.72624863 -2.0625 50.375 C-10.18785433 59.76092072 -18.83710367 68.51919683 -28.5625 76.25 C-29.14620361 76.71615723 -29.72990723 77.18231445 -30.33129883 77.66259766 C-36.12965399 82.13641248 -36.12965399 82.13641248 -39 82 C-41.20355843 80.49423508 -43.03974504 79.0306673 -45 77.25 C-45.56960449 76.74919922 -46.13920898 76.24839844 -46.72607422 75.73242188 C-48.49637656 74.16817352 -50.24913601 72.58594899 -52 71 C-53.04410013 70.06751717 -54.08836377 69.13521737 -55.1328125 68.203125 C-58.12910625 65.51078197 -61.06629601 62.76043825 -64 60 C-64.95003906 59.12730469 -65.90007812 58.25460938 -66.87890625 57.35546875 C-75.57142031 49.09818488 -84.7713809 38.46683348 -86.37109375 26.140625 C-86.56283862 17.79408351 -84.96754569 11.44734191 -79.3203125 5.1171875 C-74.88421432 1.03597717 -70.76171857 -0.68134016 -64.75 -1.375 C-57.07254915 -0.60725491 -50.4113891 2.46562478 -45 8 C-42.86547708 10.92144381 -40.89367349 13.91774421 -39 17 C-38.5153125 16.27554687 -38.030625 15.55109375 -37.53125 14.8046875 C-29.11984077 2.67284726 -15.25056972 -9.44872255 0 0 Z " fill="#9BCDD2" transform="translate(87,14)" />
        </svg>
      </span>
      <span className='absolute z-10 scale-[0.25] md:scale-75 translate-x-40 translate-y-32 md:translate-x-[400px] md:translate-y-20 -rotate-[20deg] love'>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <path d="M0 0 C5.60428056 4.20321042 10.9295058 8.72063943 12 16 C13.04309822 29.0387277 6.05191099 40.72624863 -2.0625 50.375 C-10.18785433 59.76092072 -18.83710367 68.51919683 -28.5625 76.25 C-29.14620361 76.71615723 -29.72990723 77.18231445 -30.33129883 77.66259766 C-36.12965399 82.13641248 -36.12965399 82.13641248 -39 82 C-41.20355843 80.49423508 -43.03974504 79.0306673 -45 77.25 C-45.56960449 76.74919922 -46.13920898 76.24839844 -46.72607422 75.73242188 C-48.49637656 74.16817352 -50.24913601 72.58594899 -52 71 C-53.04410013 70.06751717 -54.08836377 69.13521737 -55.1328125 68.203125 C-58.12910625 65.51078197 -61.06629601 62.76043825 -64 60 C-64.95003906 59.12730469 -65.90007812 58.25460938 -66.87890625 57.35546875 C-75.57142031 49.09818488 -84.7713809 38.46683348 -86.37109375 26.140625 C-86.56283862 17.79408351 -84.96754569 11.44734191 -79.3203125 5.1171875 C-74.88421432 1.03597717 -70.76171857 -0.68134016 -64.75 -1.375 C-57.07254915 -0.60725491 -50.4113891 2.46562478 -45 8 C-42.86547708 10.92144381 -40.89367349 13.91774421 -39 17 C-38.5153125 16.27554687 -38.030625 15.55109375 -37.53125 14.8046875 C-29.11984077 2.67284726 -15.25056972 -9.44872255 0 0 Z " fill="#F64C96" transform="translate(87,14)" />
        </svg>
      </span>
      <button onClick={handleStart} className='z-20'>
        <img src="img/opening/start_button.png" alt="Start Button" className='w-36 md:w-60' />
      </button>
    </div>
  )
}

const SecondPage = ({ SetState, isVisible, typewritingSoundEffect }) => {
  const [mailIndex, setMailIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef(null);
  const [face, setFace] = useState(false);
  const mails = OpeningTextConfig

  useEffect(() => {
    handleTypeWriterEffect(0);

    return () => clearInterval(intervalRef.current);

  }, []);

  const stopTypewriterEffect = () => {
    clearInterval(intervalRef.current);
    setDisplayText(mails[mailIndex]);
    typewritingSoundEffect(false)
  };

  const handleTypeWriterEffect = (valueMailIndex) => {
    clearInterval(intervalRef.current); // Clear any existing interval
    setMailIndex(valueMailIndex);
    setDisplayText('');
    typewritingSoundEffect(true)
    let currentIndex = 0; // Start at 0 to include the first character

    const typeWriterEffect = () => {
      if (currentIndex <= mails[valueMailIndex].length) {
        setDisplayText(mails[valueMailIndex].slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalRef.current); // Clear interval when done
        typewritingSoundEffect(false)
      }
    };

    // Start the interval
    intervalRef.current = setInterval(typeWriterEffect, 60);
  };

  const handleSkip = () => {
    if (displayText !== mails[mailIndex]) {
      stopTypewriterEffect();
      typewritingSoundEffect(false)
    } else {
      if (mailIndex < mails.length - 1) {
        handleTypeWriterEffect(mailIndex + 1);
        typewritingSoundEffect(true)
      } else {
        SetState(false);
      }
      // Toggle the face state
      setFace((prevFace) => !prevFace);
    }

  };
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      // Use the window.history object directly for scroll restoration
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      // Delay the scroll to ensure it works on all devices
      setTimeout(() => {
        window.scrollTo(0, 1);
        handleBlink();
      }, 0);
    };


    // Add the load event listener
    window.addEventListener("load", handleLoad);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const handleBlink = () => {
    setInterval(() => {
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 500);
    }, 2000);
  };



  if (!isVisible) return null;

  return (
    <div className='w-full min-h-screen flex items-center justify-center relative overflow-hidden'>
      <img src="img/music/wave-top-left.png" alt="" className='absolute scale-150 md:scale-100 -top-20 -left-40  md:-top-[50vw] md:-left-60 unselectable' />
      <img src="img/music/wave-bottom-right.png" alt="" className='absolute scale-[2] md:scale-100 -bottom-20 -right-40 md:-bottom-[50vw] md:-right-60 unselectable' />

      <div className='absolute w-60 h-44 md:w-[600px] md:h-[450px] flex flex-col items-center justify-center mb-80 md:mb-0 md:bottom-7 left-0 md:left-40 z-30 bounce-flip1'>
        <img src="img/blankface.png" alt="" className='w-full h-full absolute z-20 left-0 top-0 ' />
        <>
          {face ?
            (
              <div className="h-[150px] absolute flex items-center gap-14 md:gap-[140px] z-20 -translate-y-5 md:-translate-y-14">
                <img
                  src={`${blink ? "img/blink_eye.png" : "img/eye.webp"}`}
                  className={`w-7 md:w-20 md:h-auto ${blink ? 'h-2' : 'h-7'} `}
                />
                <img
                  src={blink ? "img/blink_eye.png" : "img/eye.webp"}
                  className={`w-7 md:w-20 md:h-auto ${blink ? 'h-2' : 'h-7'}`}
                />
              </div>
            )
            :
            (
              <div className="absolute h-[300px] flex items-center gap-0 z-20 -translate-y-7 md:-translate-y-14">
                <img
                  src="img/star.png"
                  className={`w-20 md:w-44 md:h-auto breathe`}
                />
                <img
                  src="img/star.png"
                  className={`w-20 md:w-44 md:h-auto breathe`}
                />
              </div>
            )
          }
        </>
        <div className='relative left-0 z-20 translate-y-5 md:translate-y-10'>
          <img src="img/love.webp" className="w-10 md:w-24 aspect-square breathe " />
        </div>
        <div className="absolute flex gap-[50px] md:gap-40 z-20 translate-y-5 md:translate-y-10">
          <img src="img/left_mustache.png" className="w-16 h-10 md:w-36 md:h-auto breathe " />
          <img src="img/right_mustache.png" className="w-16 h-10 md:w-36 md:h-auto breathe " />
        </div>
        <div className="absolute flex gap-96 z-20 translate-y-14 md:translate-y-32">
          {face ?
            (
              <img
                src="img/mouth.png"
                className="w-16 md:w-28 h-auto"
              />
            )
            :
            (
              <img
                src="img/cute_mouth.png"
                className="w-12 md:w-28 h-auto"
              />
            )
          }
        </div>
      </div>
      <div className='absolute -left-20 mb-60 md:mb-0 md:left-28 md:-bottom-0 md:translate-y-0 md:w-[700px] w-96 h-20 bg-black rounded-[100%] blur-2xl translate-y-7'>
      </div>
      <button onClick={handleSkip} className='absolute w-fit px-7 h-fit md:right-32 md:-translate-y-32 z-40 flex items-center'>
        <img src="img/mail_box.webp" alt="" className='w-full md:w-[600px]' />
        <div className='absolute top-[1vw] md:top-2 left-[25%] sm:text-base md:text-xl lg:text-3xl mobile-stroke-text md:stroke-text font-introrust'>
          <span className='font-bold text-white pr-2'>HAI</span>
          <span className='font-bold text-[#f6498c]'>{MainConfig.aliasname}</span>
        </div>
        <span className='absolute left-[10%] text-xl md:text-2xl lg:text-4xl pr-[10%] font-bold text-center font-fredoka text-[#702c2b]'>{displayText}</span>
        <img src="./img/music/star.png" alt="" className='absolute -top-7 -left-2 w-20 lg:w-20 h-20 lg:h-auto animate-star' />
        <img src="./img/music/star.png" alt="" className='absolute -bottom-7 -right-2 w-20 lg:w-20 h-20 lg:h-auto animate-star' />
      </button>
    </div>
  );
};

export default OpeningSection