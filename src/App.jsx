import { useEffect, useRef, useState } from "react";
import "./App.css";
import MenuSection from "./components/MenuSection";
import OpeningSection from "./components/OpeningSection";
import clickSound from './sound/click.mp3'
import TypewritingSound from './sound/typewriter.mp3'

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [openingSection, setOpeningSection] = useState(true);
  const [shyDuration, setShyDuration] = useState(0);
  const shyIntervalRef = useRef(null);
  const [blink, setBlink] = useState(false);

  // Sound
  const typewritingAudio = new Audio(TypewritingSound);
  const clickAudio = new Audio(clickSound);

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

  function clickSoundEffect() {
    clickAudio.currentTime = 0; // Reset waktu ke awal
    clickAudio.play();
  }
  function pauseAudio(audio) {
    return new Promise((resolve) => {
      console.log('Attempting to pause audio');
      audio.pause();
      audio.onpause = () => {
        resolve();
      };
      // Check if audio is already paused (for debugging)
      if (audio.paused) {
        resolve();
      }
    });
  }

  async function typewritingSoundEffect(play) {

    if (play === true) {
      if (typewritingAudio.paused) {
        // Jika audio dalam keadaan pause, maka mulai audio
        typewritingAudio.currentTime = 0;
        typewritingAudio.loop = true;
        typewritingAudio.play();
      } else {
        // Jika audio sudah bermain, reset ke awal dan lanjutkan
        typewritingAudio.currentTime = 0;
        typewritingAudio.loop = false;
      }
    } else {
      await pauseAudio(typewritingAudio);
      typewritingAudio.loop = false;
    }
  }

  const handleBlink = () => {
    setInterval(() => {
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 500);
    }, 4000);
  };

  const handleShy = () => {


    setShyDuration(1); // Reset duration to 2 seconds

    const handle = () => {
      setShyDuration((prevDuration) => {
        if (prevDuration > 0) {
          return prevDuration - 1;
        } else {
          clearInterval(shyIntervalRef.current);
          shyIntervalRef.current = null;
          return 0;
        }
      });
    };

    // Clear any existing interval before starting a new one
    if (shyIntervalRef.current !== null) {
      clearInterval(shyIntervalRef.current);
      shyIntervalRef.current = null;
    }

    // Start a new interval
    shyIntervalRef.current = setInterval(handle, 1000);
  };

  const handleMenu = () => {
    clickSoundEffect()
    setShowMenu(!showMenu);
  }
  if (openingSection) {
    return <OpeningSection SetState={setOpeningSection} clickSoundEffect={clickSoundEffect} typewritingSoundEffect={typewritingSoundEffect} />;
  }


  return (
    <div className="flex bg-[rgba(238,99,160)] w-full min-h-screen justify-center absolute left-0 top-0 overflow-hidden">
      {showMenu && <MenuSection handleMenu={handleMenu} clickSoundEffect={clickSoundEffect} typewritingSoundEffect={typewritingSoundEffect} />}

      <img src="img/music/wave-top-left.png" alt="" className='absolute md:hidden -top-32 -left-32 scale-150 md:scale-100 md:-top-[800px] md:-left-60 unselectable' />
      <img src="img/music/wave-bottom-right.png" alt="" className='absolute md:hidden -bottom-32 -right-32 scale-150 md:scale-100 md:-bottom-[800px] md:-right-60 unselectable' />

      <button
        onClick={handleShy}
        className={`${shyDuration !== 0 && "shake"} w-[1600px] min-h-screen flex justify-center items-center z-[15]`}
      >
        <img src="img/muka.png" alt="" className="absolute hidden lg:block w-full min-w-[600px]" />
        <img src="img/blankface.png" alt="" className="absolute lg:hidden w-full min-w-[600px]" />
        <div className="absolute hidden top-0 left-0 w-full lg:flex justify-center -translate-y-10">
          <div className="absolute w-40 -translate-y-5 -translate-x-24">
            <img src="img/hair.webp" data-delay="0.2" className="absolute scale-125 w-40 hair" />
          </div>
          <div className="absolute w-40">
            <img src="img/hair.webp" data-delay="0.4" className="absolute scale-125 w-40 hair" />
          </div>
          <div className="absolute w-40 -translate-y-5 translate-x-24">
            <img src="img/hair.webp" data-delay="0.6" className="absolute scale-125 w-40 hair" />
          </div>
        </div>
        <div className="absolute flex gap-36 md:gap-[20vw] mb-32 md:mb-[25vw]">
          <img
            src={`${shyDuration !== 0 ? "img/cute_eye_kiri.png" : blink ? "img/blink_eye.png" : "img/eye.webp"}`}
            className={`w-20 md:w-[10vw] md:h-auto ${blink ? 'h-5' : 'h-20'} ${shyDuration !== 0 && "rotate-12"}`}
          />
          <img
            src={`${shyDuration !== 0 ? "img/cute_eye_kanan.png" : blink ? "img/blink_eye.png" : "img/eye.webp"}`}
            className={`w-20 md:w-[10vw] md:h-auto ${blink ? 'h-5' : 'h-20  '} ${shyDuration !== 0 && "-rotate-12"}`}
          />
        </div>
        <div className="absolute flex gap-[100px] translate-y-7 md:gap-72">
          <img src="img/left_mustache.png" className="w-32 h-16 md:w-[20vw] md:h-auto breathe" />
          <img src="img/right_mustache.png" className="w-32 h-16 md:w-[20vw] md:h-auto breathe" />
        </div>
        <div className="absolute flex gap-[200px] md:gap-96 lg:mb-20">
          {shyDuration === 0 ? (
            <>
              <div className="hidden lg:block w-12 md:w-24 h-7 md:h-14 bg-white bg-opacity-50 rounded-full -translate-x-5 md:-translate-x-7 blur-md"></div>
              <div className="hidden lg:block w-12 md:w-24 h-7 md:h-14 bg-white bg-opacity-50 rounded-full translate-x-5 md:translate-x-7 blur-md"></div>
            </>
          ) : (
            <>
              <img src="img/left_shy_blush.webp" className="w-20 md:w-40" />
              <img src="img/right_shy_blush.webp" className="w-20 md:w-40" />
            </>
          )}
        </div>
        <div className="absolute flex gap-96 mt-60 md:mt-[30vw]">
          <img
            src={`${shyDuration !== 0 ? "img/cute_mouth.png" : "img/mouth.png"}`}
            className="w-28 md:w-[20vw] h-12 md:h-auto"
          />
        </div>
      </button>
      <div className={`${shyDuration !== 0 && "shake"} absolute z-20 min-h-screen flex justify-center items-center`}>
        <button
          className={`${showMenu ? "hidden" : ""} active:opacity-90 z-10 translate-y-7 `}
          onClick={handleMenu}
        >
          <img src="img/love.webp" className="w-20 md:w-[14vw] aspect-square breathe" />
        </button>
      </div>
    </div>
  );
}

export default App;
