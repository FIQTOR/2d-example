import { useEffect, useState } from "react";
import GallerySection from "./gallerySection";
import GiftSection from "./giftSection";
import MailSection from "./mailSection";
import MusicSection from "./musicSection";

const MenuSection = ({ handleMenu, clickSoundEffect, typewritingSoundEffect }) => {
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
    clickSoundEffect();
    typewritingSoundEffect(false)
    setMailSection(false);
    setGallerySection(false);
    setMusicSection(false);
    setGiftSection(false);
  }

  if (mailSection) {
    return <MailSection handleCloseSection={handleCloseSection} clickSoundEffect={clickSoundEffect} />;
  }
  if (gallerySection) {
    return <GallerySection handleCloseSection={handleCloseSection} clickSoundEffect={clickSoundEffect} typewritingSoundEffect={typewritingSoundEffect} />;
  }
  if (musicSection) {
    return <MusicSection handleCloseSection={handleCloseSection} />;
  }
  if (giftSection) {
    return <GiftSection handleCloseSection={handleCloseSection} clickSoundEffect={clickSoundEffect} typewritingSoundEffect={typewritingSoundEffect} />;
  }

  return (
    <div className="absolute w-full min-h-screen left-0 top-0 bg-black bg-opacity-70 flex justify-center items-center z-20 backdrop-blur-2xl">
      <button
        onClick={() => { handleOpenSection(setMailSection); clickSoundEffect(); }}
        className={`${isRendered ? "translate-x-32 md:translate-x-60" : "translate-x-0"
          } absolute flex justify-center items-center w-32 h-32 md:w-64 md:h-64 active:opacity-90 duration-300`}
      >
        <img src="img/mail1.png" className="absolute w-32 md:w-64" />

      </button>
      <button
        onClick={() => { handleOpenSection(setMusicSection); clickSoundEffect(); }}
        className={`${isRendered ? "-translate-x-32 md:-translate-x-60" : "translate-x-0"
          } absolute flex justify-center items-center w-32 h-32 md:w-64 md:h-64 active:opacity-90 duration-300`}
      >
        <img src="img/music1.png" className="absolute w-32 md:w-64" />
      </button>
      <button
        onClick={() => { handleOpenSection(setGiftSection); clickSoundEffect(); }}
        className={`${isRendered ? "translate-y-28 md:translate-y-52" : "translate-y-0"
          } absolute flex justify-center items-center w-32 h-32 md:w-64 md:h-64 active:opacity-90 duration-300`}
      >
        <img src="img/gift1.png" className="absolute w-32 md:w-64" />

      </button>
      <button
        onClick={() => { handleOpenSection(setGallerySection); clickSoundEffect(); }}
        className={`${isRendered ? "-translate-y-28 md:-translate-y-60" : "translate-y-0"
          } absolute flex justify-center items-center w-32 h-32 md:w-64 md:h-64 active:opacity-90 duration-300`}
      >
        <img src="img/camera1.png" className="absolute w-32 md:w-64" />
      </button>
      <div className={`absolute z-20 flex justify-center items-center`}>
        <button
          className="active:opacity-90 z-10 md:translate-y-[25px]"
          onClick={handleMenu}
        >
          <img src="img/love.webp" className="w-20 md:w-[14vw] aspect-square" />
        </button>
      </div>
    </div>
  );
};

export default MenuSection