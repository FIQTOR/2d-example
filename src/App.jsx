import { useEffect, useRef, useState } from "react";
import "./App.css";
import MenuSection from "./components/MenuSection";
import OpeningSection from "./components/OpeningSection";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [openingSection, setOpeningSection] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 400);
  const [shyDuration, setShyDuration] = useState(0);
  const shyIntervalRef = useRef(null);
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

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 400);
    };

    // Add the load event listener
    window.addEventListener("load", handleLoad);
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  if (openingSection) {
    return <OpeningSection SetState={setOpeningSection} />;
  }

  return (
    <div className="flex bg-[rgba(238,99,160)] w-full min-h-screen justify-center absolute left-0 top-0 overflow-hidden">
      {showMenu && <MenuSection showMenu={showMenu} setShowMenu={setShowMenu} />}

      <button
        onClick={handleShy}
        className={`${shyDuration !== 0 && "shake"} w-full min-h-screen flex justify-center items-center relative z-[15]`}
      >
        <img src="img/muka.png" alt="" className="absolute w-[1900px]" />
        <div className="absolute top-0 left-0 w-full flex justify-center -translate-y-10">
          <div className="absolute w-40 -translate-y-5 -translate-x-20">
            <img src="img/hair.webp" data-delay="0.2" className="absolute w-40 hair" />
          </div>
          <div className="absolute w-40">
            <img src="img/hair.webp" data-delay="0.4" className="absolute w-40 hair" />
          </div>
          <div className="absolute w-40 -translate-y-5 translate-x-20">
            <img src="img/hair.webp" data-delay="0.6" className="absolute w-40 hair" />
          </div>
        </div>
        <div className="absolute flex gap-40 md:gap-72 mb-36 md:mb-[25vw]">
          <img
            src={`${shyDuration !== 0 ? "img/cute_eye_kiri.png" : blink ? "img/blink_eye.png" : "img/eye.webp"}`}
            className={`w-14 md:w-[10vw] md:h-auto ${blink ? 'h-5' : 'h-14'} ${shyDuration !== 0 && "rotate-12"}`}
          />
          <img
            src={`${shyDuration !== 0 ? "img/cute_eye_kanan.png" : blink ? "img/blink_eye.png" : "img/eye.webp"}`}
            className={`w-14 md:w-[10vw] md:h-auto ${blink ? 'h-5' : 'h-14'} ${shyDuration !== 0 && "-rotate-12"}`}
          />
        </div>
        <div className="absolute flex gap-[100px] md:gap-72">
          <img src="img/left_mustache.png" className="w-32 h-16 md:w-[20vw] md:h-auto breathe" />
          <img src="img/right_mustache.png" className="w-32 h-16 md:w-[20vw] md:h-auto breathe" />
        </div>
        <div className="absolute flex gap-[130px] md:gap-96 mb-14 md:mb-20">
          {shyDuration === 0 ? (
            <>
              <div className="w-12 md:w-24 h-7 md:h-14 bg-white bg-opacity-50 rounded-full -translate-x-5 md:-translate-x-7 blur-md"></div>
              <div className="w-12 md:w-24 h-7 md:h-14 bg-white bg-opacity-50 rounded-full translate-x-5 md:translate-x-7 blur-md"></div>
            </>
          ) : (
            <>
              <img src="img/left_shy_blush.webp" className="w-20 md:w-40" />
              <img src="img/right_shy_blush.webp" className="w-20 md:w-40" />
            </>
          )}
        </div>
        <div className="absolute flex gap-96 mt-36 md:mt-[30vw]">
          <img
            src={`${shyDuration !== 0 ? "img/cute_mouth.png" : "img/mouth.png"}`}
            className="w-20 md:w-[20vw] h-7 md:h-auto"
          />
        </div>
      </button>
      <div className={`${shyDuration !== 0 && "shake"} absolute z-20 min-h-screen flex justify-center items-center`}>
        <button
          className={`${showMenu ? "hidden" : ""} active:opacity-90 z-10 translate-y-4 `}
          onClick={() => setShowMenu(!showMenu)}
        >
          <img src="img/love.webp" className="w-20 md:w-[14vw] aspect-square breathe" />
        </button>
      </div>
    </div>
  );
}

export default App;
