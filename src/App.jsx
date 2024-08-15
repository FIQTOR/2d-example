import { useEffect, useRef, useState } from "react";
import "./App.css";
import MailSection from "./components/mailSection";
import GallerySection from "./components/gallerySection";
import MusicSection from "./components/musicSection";
import GiftSection from "./components/giftSection";

function App() {
  const [showMenu, setShowMenu] = useState(false);
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


  // if (isMobileView) {
  //   return (
  //     <div className="w-full min-h-screen flex justify-center items-center font-semibold text-xl text-center">
  //       Please rotate your phone to landscape
  //     </div>
  //   );
  // }

  return (
    <div className="flex bg-[rgba(238,99,160)] w-full min-h-screen justify-center absolute left-0 top-0 overflow-hidden">
      {showMenu && <Menu />}


      <button
        onClick={handleShy}
        className={`${shyDuration !== 0 && "shake"
          } w-full min-h-screen flex justify-center items-center relative z-10`}
      >
        <div className="absolute -top-[10vw] -left-[10vw] rotate-[80deg] w-[30vw] h-[20vw] bg-[rgba(230,118,167)] rounded-[90%]"></div>
        <div className="absolute -bottom-[10vw] -right-[10vw] rotate-[25deg] w-[30vw] h-[20vw] bg-[rgba(230,118,167)] rounded-[90%]"></div>
        <div className="absolute bottom-32 -left-20 -rotate-45 w-40 h-20 bg-[rgba(221,71,137)] rounded-[90%]"></div>
        <div className="absolute top-32 -right-24 rotate-45 w-40 h-20 bg-[rgba(221,71,137)] rounded-[90%]"></div>

        <div className="absolute top-0 left-0 w-full flex justify-center -translate-y-20">
          <div className="absolute w-40 -translate-y-5 -translate-x-20">
            <img
              src="img/hair.webp"
              data-delay="0.2"
              className="absolute w-40 hair"
            />
          </div>
          <div className="absolute w-40 ">
            <img
              src="img/hair.webp"
              data-delay="0.4"
              className="absolute w-40 hair"
            />
          </div>
          <div className="absolute w-40 -translate-y-5 translate-x-20">
            <img
              src="img/hair.webp"
              data-delay="0.6"
              className="absolute w-40 hair"
            />
          </div>
        </div>
        <div className="absolute flex gap-40 md:gap-72 mb-36 md:mb-[20vw]">
          <img
            src={`${shyDuration !== 0
              ? "img/cute_eye_kiri.png"
              : blink
                ? "img/blink_eye.png"
                : "img/eye.webp"
              }`}
            className={`w-14 md:w-[7vw] md:h-auto ${blink ? 'h-5' : 'h-14'} ${shyDuration !== 0 && "rotate-12"
              }`}
          />
          <img
            src={`${shyDuration !== 0
              ? "img/cute_eye_kanan.png"
              : blink
                ? "img/blink_eye.png"
                : "img/eye.webp"
              }`}
            className={`w-14 md:w-[7vw] md:h-auto ${blink ? 'h-5' : 'h-14'} ${shyDuration !== 0 && "-rotate-12"
              }`}
          />
        </div>
        <div className="absolute flex gap-[100px] md:gap-72">
          <img src="img/left_mustache.png" className="w-32 h-16 md:w-[20vw] md:h-auto" />
          <img src="img/right_mustache.png" className="w-32 h-16 md:w-[20vw] md:h-auto" />
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
        <div className="absolute flex gap-96 mt-36 md:mt-[20vw]">
          <img
            src={`${shyDuration !== 0 ? "img/cute_mouth.png" : "img/mouth.png"
              }`}
            className="w-20 md:w-[8vw] h-7 md:h-auto"
          />
        </div>
      </button>
      <div
        className={`${shyDuration !== 0 && "shake"
          } absolute w-full min-h-screen flex justify-center items-center`}
      >
        <button
          className="active:opacity-90 z-20 translate-y-4"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img src="img/love.webp" className="w-20 md:w-[8vw] aspect-square" />
        </button>
      </div>
    </div>
  );
}

export default App;

const Menu = () => {
  const [isRendered, setIsRendered] = useState(false);
  const [mailSection, setMailSection] = useState(false);
  const [gallerySection, setGallerySection] = useState(false);
  const [musicSection, setMusicSection] = useState(false);
  const [giftSection, setGiftSection] = useState(false);

  useEffect(() => {
    // Trigger the translation after the component mounts
    setIsRendered(true);
  }, []);

  function handleOpenSection(setState) {
    if (setMailSection !== setState)
      setMailSection(false);
    if (setGallerySection !== setState)
      setGallerySection(false);
    if (setMailSection !== setState)
      setMusicSection(false);
    if (setGiftSection !== setState)
      setGiftSection(false);

    setState(true);
  }

  function handleCloseSection() {
    setMailSection(false);
    setGallerySection(false);
    setMusicSection(false);
    setGiftSection(false);
  }

  if (mailSection) {
    return <MailSection handleCloseSection={handleCloseSection} />;
  }
  if (gallerySection) {
    return <GallerySection handleCloseSection={handleCloseSection} />;
  }
  if (musicSection) {
    return <MusicSection handleCloseSection={handleCloseSection} />;
  }
  if (giftSection) {
    return <GiftSection handleCloseSection={handleCloseSection} />;
  }

  return (
    <div className="absolute w-full min-h-screen left-0 top-0 bg-black bg-opacity-70 flex justify-center items-center z-20 backdrop-blur-sm">
      <button
        onClick={() => handleOpenSection(setMailSection)}
        className={`${isRendered ? "translate-x-32 md:translate-x-44" : "translate-x-0"
          } absolute flex justify-center items-center w-40 h-40 active:opacity-90 duration-300`}
      >
        <img src="img/mail.png" className="w-14 z-20 translate-x-1" />
        <img src="img/menu_button.webp" className="absolute w-32" />
      </button>
      <button
        onClick={() => handleOpenSection(setMusicSection)}
        className={`${isRendered ? "-translate-x-32 md:-translate-x-44" : "translate-x-0"
          } absolute flex justify-center items-center w-40 h-40 active:opacity-90 duration-300`}
      >
        <img src="img/music.png" className="w-10 z-20 translate-x-1" />
        <img src="img/menu_button.webp" className="absolute w-32" />
      </button>
      <button
        onClick={() => handleOpenSection(setGiftSection)}
        className={`${isRendered ? "translate-y-28 md:translate-y-36" : "translate-y-0"
          } absolute flex justify-center items-center w-40 h-40 active:opacity-90 duration-300`}
      >
        <img src="img/gift.png" className="w-14 z-20 translate-x-1" />
        <img src="img/menu_button.webp" className="absolute w-32" />
      </button>
      <button
        onClick={() => handleOpenSection(setGallerySection)}
        className={`${isRendered ? "-translate-y-28 md:-translate-y-36" : "translate-y-0"
          } absolute flex justify-center items-center w-40 h-40 active:opacity-90 duration-300`}
      >
        <img src="img/camera.png" className="w-16 z-20 translate-x-1" />
        <img src="img/menu_button.webp" className="absolute w-32" />
      </button>
    </div>
  );
};
