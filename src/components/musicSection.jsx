import React, { useEffect, useRef, useState } from 'react'
import { TbArrowBackUp, TbCircleArrowLeft, TbCircleArrowRight, TbPlayerPauseFilled, TbPlayerPlay, TbPlayerPlayFilled, TbVolume, TbVolume2, TbX } from 'react-icons/tb'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { Navigation } from 'swiper/modules';

const MusicSection = ({ handleCloseSection }) => {
  const [isRendered, setIsRendered] = useState(false);
  const swiperRef = useRef(null);
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Audio State

  useEffect(() => {
    setIsRendered(true);

    if (swiperRef.current) {
      // swiperRef.current.slideTo(0.5, 0, false);
      swiperRef.current.params.navigation.nextEl = nextButtonRef.current;
      swiperRef.current.params.navigation.prevEl = prevButtonRef.current;

      // Reinitialize navigation
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [])


  const [musicIndex, setMusicIndex] = useState(null);
  const handleOpenSong = (musicIndex) => {
    setMusicIndex(musicIndex)
  }



  return (

    <div className='absolute w-full min-h-screen bg-black bg-opacity-70 z-30 flex justify-center items-center backdrop-blur-sm'>

      <button
        onClick={() => handleCloseSection()}
        className={`${isRendered ? "top-7" : ""
          } absolute flex justify-center items-center w-40 h-40 active:opacity-90 duration-300 z-20`}
      >
        <img src="img/music.png" className="w-10 z-20 translate-x-1" />
        <img src="img/menu_button.webp" className="absolute w-32" />
      </button>

      <div className="relative w-full min-h-screen flex justify-center text-white">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}

          modules={[Navigation]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          effect='navigation'
          className='flex items-center justify-center'
        >
          {Song(musicIndex, 0, 'music/2796268-uhd_3840_2160_25fps.mp4', handleOpenSong)}
          {Song(musicIndex, 1, 'music/2796268-uhd_3840_2160_25fps.mp4', handleOpenSong)}
          {Song(musicIndex, 2, 'music/2796268-uhd_3840_2160_25fps.mp4', handleOpenSong)}
          {Song(musicIndex, 3, 'music/2796268-uhd_3840_2160_25fps.mp4', handleOpenSong)}
          {Song(musicIndex, 4, 'music/2796268-uhd_3840_2160_25fps.mp4', handleOpenSong)}
          {Song(musicIndex, 5, 'music/2796268-uhd_3840_2160_25fps.mp4', handleOpenSong)}
        </Swiper>

        {musicIndex !== null && <button onClick={() => setMusicIndex(null)} className='z-50 absolute top-7 right-7'>
          <TbX className="w-7 h-7" />
        </button>}
      </div>
      <button
        ref={nextButtonRef}
        className={`${(musicIndex !== null || activeIndex >= (swiperRef.current?.slides.length - 1)) && 'hidden'} z-50 absolute right-4 md:right-14 text-white`}
      >
        <TbCircleArrowRight className='w-14 md:w-20 h-14 md:h-20' />
      </button>
      <button
        ref={prevButtonRef}
        className={`${(musicIndex !== null || activeIndex <= 0) && 'hidden'} z-50 absolute left-4 md:left-14 text-white`}
      >
        <TbCircleArrowLeft className='w-14 md:w-20 h-14 md:h-20' />
      </button>
      {
        musicIndex === null &&
        <>
          <button className='absolute top-14 left-14 z-50' onClick={() => handleCloseSection(handleCloseSection)}>
            <TbArrowBackUp className='text-white w-10 h-10 z-50' />
          </button>
        </>
      }
    </div >
  )
}
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const Song = (musicIndex, index, audioSource, handleOpenSong) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5); // Default volume to 50%
  const audioRef = useRef(null);

  const handlePlaySong = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true)
    } else {
      audio.pause();
      setIsPlaying(false)
    }
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <>
      <SwiperSlide key={index} className={`h-full w-fit justify-center items-center overflow-visible`} style={{
        display: 'flex'
      }}>
        <div className={`${musicIndex === index ? 'scale-150 md:scale-[2.5]' : `scale-100 md:scale-[2]`} w-[60%] bg-black bg-opacity-30 p-[5%] md:p-2 max-w-96 md:max-w-32 md:rounded-lg  rounded-3xl duration-1000 z-10`}>
          <img src="img/taylor_swift.png" alt="" className='w-full rounded-2xl md:rounded-md' />
          <div className='w-full flex flex-col gap-2 md:gap-px py-4 md:py-2 items-center'>
            <span className='font-bold text-xl mt-2 md:mt-0 md:text-xs'>Wide Awake</span>
            {musicIndex === null ?
              <button onClick={() => handleOpenSong(index)}>
                <TbPlayerPlayFilled className="md:w-5 w-14 md:h-5 h-14" />
              </button>
              :
              <>
                {musicIndex === index &&
                  <audio
                    ref={audioRef}
                    src="music/Katy Perry  Wide Awake.mp3"
                    autoPlay
                    onLoadedMetadata={handleLoadedMetadata}
                    onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
                  ></audio>
                }
                <div>
                  <input
                    type="range"
                    value={currentTime}
                    max={duration}
                    className="w-full h-1 rounded-lg appearance-none bg-white"
                    onChange={handleTimeChange}
                    style={{
                      background: `linear-gradient(to right, #fff ${(
                        (currentTime / duration) *
                        100
                      ).toFixed(2)}%, #535353 ${(
                        (currentTime / duration) *
                        100
                      ).toFixed(2)}%)`,
                    }}
                  />
                </div>
                <div className="w-full flex justify-between mt-2 md:mt-0">
                  <span className="text-[8px]">{formatTime(currentTime)}</span>
                  <button onClick={handlePlaySong}>
                    {isPlaying ?
                      <TbPlayerPauseFilled className="w-6 h-6 text-white" /> :
                      <TbPlayerPlayFilled className="w-6 h-6 text-white" />}
                  </button>
                  <span className="text-[8px]">-{formatTime(duration - currentTime)}</span>
                </div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <TbVolume2 />
                  <input
                    type="range"
                    value={volume}
                    min="0"
                    max="1"
                    step="0.01"
                    className="w-full h-1 rounded-lg appearance-none bg-white"
                    onChange={handleVolumeChange}
                    style={{
                      background: `linear-gradient(to right, #fff ${(
                        volume * 100
                      ).toFixed(2)}%, #535353 ${(volume * 100).toFixed(2)}%)`,
                    }}
                  />
                  <TbVolume />
                </div>
              </>
            }
          </div>
        </div>
      </SwiperSlide >
    </>
  )
}

export default MusicSection