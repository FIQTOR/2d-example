import React, { useEffect, useRef, useState } from 'react'
import { TbArrowBackUp, TbPlayerPlayFilled, TbVolume, TbVolume2 } from 'react-icons/tb'
import { MusicConfig, MusicPhotoConfig } from '../common/music';

const MusicSection = ({ handleCloseSection, BGM }) => {
  const [showPlayingSection, setShowPlayingSection] = useState(false);
  const [musicTexts, setMusicTexts] = useState([]);
  const [musicImgSrc, setMusicImgSrc] = useState('empty');
  const [musicTitle, setMusicTitle] = useState('empty');
  const [musicSource, setMusicSource] = useState('empty');
  const [musicStart, setMusicStart] = useState(0);
  const [musicEnd, setMusicEnd] = useState(0);

  const musics = MusicConfig
  const photos = MusicPhotoConfig

  const handleShowPlayingSection = (imgSrc, title, musicSrc, texts, mStart, mEnd) => {
    BGM(false)
    setShowPlayingSection(true);
    setMusicImgSrc(imgSrc)
    setMusicTitle(title)
    setMusicSource(musicSrc)
    setMusicTexts(texts)
    setMusicStart(mStart)
    setMusicEnd(mEnd)
  }

  const handleClose = () => {
    setShowPlayingSection(false)
    BGM(true)
  }

  return (
    <div className='absolute w-full min-h-screen bg-[rgba(238,99,160)] z-50'>
      {!showPlayingSection &&
        <button className='absolute top-7 left-7 md:top-14 md:left-14 z-50' onClick={() => handleCloseSection(handleCloseSection)}>
          <TbArrowBackUp className='text-white w-10 h-10' />
        </button>
      }
      <img src="img/music/wave-top-left.png" alt="" className='absolute scale-150 md:scale-100 -top-20 -left-40  md:-top-[50vw] md:-left-60 unselectable' />
      <img src="img/music/wave-bottom-right.png" alt="" className='absolute scale-[2] md:scale-100 -bottom-20 -right-40 md:-bottom-[50vw] md:-right-60 unselectable' />
      <div className='absolute top-0 left-0 w-full h-screen bg-black bg-opacity-20'></div>

      <div className='absolute w-full min-h-screen flex justify-center items-center z-10'>
        <div className='flex flex-wrap justify-center md:grid md:grid-cols-3 gap-7 md:gap-14 translate-y-32 md:translate-y-14'>
          {/* Album */}
          {musics.map((music, index) => (
            <div key={index} className='w-40 md:w-72 h-20 md:h-28 bg-[#ce4177] rounded-md music-album p-2 flex gap-2'>
              <img src={music.imgSrc} alt="" className='h-full aspect-square' />
              <div className='flex flex-col text-[8px] md:text-sm font-bold w-full'>
                <span>{music.title}</span>
                <span className='text-white'>{music.vocalist}</span>
                <div className='h-full flex items-end w-full justify-center'>
                  <button className='bg-black p-2 rounded-full' onClick={() => handleShowPlayingSection(music.imgSrc, `${music.vocalist} - ${music.title}`, `${music.musicSrc}`, `${music.texts}`, music.musicStart, music.musicEnd)}>
                    <TbPlayerPlayFilled className='w-3 h-3 text-[#ce4177]' />
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>

        <div className='absolute grid grid-cols-2 scale-[0.9] md:scale-100 w-72 -translate-y-48 music-photo'>
          <img src={photos[0]} alt="" />
          <img src={photos[1]} alt="" />
          <img src={photos[2]} alt="" />
          <img src={photos[3]} alt="" />
        </div>

        <img src="./img/music/musiceffect.png" alt="" className='absolute scale-50 md:scale-100 translate-x-32 md:top-24 md:right-[12vw] w-36 love' />
        <img src="./img/music/star.png" alt="" className='absolute scale-50 mr-40 mb-7 md:mb-0 md:mr-0  md:translate-y-0 md:translate-x-0 md:top-14 md:right-72 w-20 h-20 animate-star' />
        <div className='absolute -translate-x-20 -translate-y-14 md:translate-x-0 md:translate-y-0 md:top-28 md:right-80 md:rotate-12 text-center text-4xl'>
          <span className='absolute font-bold w-max  text-center font-chewy text-[#fc7397]'>PLAYLIST FOR <br /> YOU!!!</span>
          <span className='absolute left-[1px] w-max font-bold font-chewy text-transparent splice-text'>PLAYLIST FOR <br /> YOU!!!</span>
        </div>


        <img src="./img/music/flower.png" alt="" className='absolute bottom-4 md:bottom-32 right-4 md:left-14 w-20 ribbon-shake delay-3' />
        <img src="./img/music/3star.png" alt="" className='absolute bottom-20 right-40 md:left-80 w-20 ribbon-shake' />
        <div className='absolute bottom-36 md:bottom-28 right-52 md:right-auto md:left-28 rotate-12 md:-rotate-12 text-center scale-75 md:scale-100 text-4xl'>
          <span className='absolute font-bold w-max  text-center font-chewy text-[#fc7397]'>IT REMINDS ME TO <br /> YOU</span>
          <span className='absolute top-0 left-[1px] w-max font-bold font-chewy text-transparent splice-text'>IT REMINDS ME TO <br /> YOU</span>
        </div>

        <img src="img/happyface.png" alt="" className='absolute w-32 md:w-96 bottom-4 left-4 md:top-20 md:right-[60vw] md:left-auto   aanimate-rotate' />
      </div>

      <div className='absolute scale-50 md:scale-75 w-64 h-48 flex flex-col items-center justify-center -top-4 md:top-auto md:bottom-7 rotate-12 -right-0 md:right-[5vw] z-10'>
        <img src="img/blankface.png" alt="" className='w-full h-full absolute z-20 left-0 top-0 ' />
        <div className="h-[150px] absolute flex items-center gap-7 z-20 -translate-y-7">
          <img src="img/music/loveeye.png" alt="" className='w-10 h-10 animate-zoom-in-out' />
          <img src="img/music/loveeye.png" alt="" className='w-10 h-10 animate-zoom-in-out' />
        </div>
        <div className='relative left-0 z-20 translate-y-5'>
          <img src="img/love.webp" className="w-10 aspect-square breathe " />
        </div>
        <div className="absolute flex gap-10 z-20 translate-y-5">
          <img src="img/left_mustache.png" className="w-20 h-10 breathe " />
          <img src="img/right_mustache.png" className="w-20 h-10 breathe " />
        </div>
        <div className="absolute z-20 translate-y-14">
          <img
            src="img/mouth.png"
            className="w-16 h-auto"
          />
        </div>
      </div>

      <div className='absolute w-full min-h-screen bg-black bg-opacity-40'></div>
      {showPlayingSection && <MusicPlayingSection imgSrc={musicImgSrc} title={musicTitle} texts={musicTexts} musicSrc={musicSource} musicStart={musicStart} musicEnd={musicEnd} handleClose={handleClose} />}
    </div>
  )
}

const MusicPlayingSection = ({ imgSrc, title, texts, musicSrc, musicStart, musicEnd, handleClose }) => {

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isScalingUp, setIsScalingUp] = useState(true);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  const textArr = texts.split(',');

  const START_TIME = musicStart;
  const END_TIME = musicEnd;
  const totalDuration = END_TIME - START_TIME;
  const textCount = textArr.length;
  const interval = totalDuration / textCount;

  useEffect(() => {
    const audio = audioRef.current;

    audio.currentTime = START_TIME;
    audio.play();

    const intervalId = setInterval(() => {
      setIsScalingUp(false); // Start scaling down the current text
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textCount);
        setIsScalingUp(true); // Start scaling up the next text
      }, 500); // Adjust to match the duration of the scaling down animation
    }, interval * 1000); // Convert interval to milliseconds

    const handleTimeUpdate = () => {
      if (audio.currentTime >= END_TIME) {
        handleClose(); // Call handleClose when song ends
        audio.pause(); // Pause the audio
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      clearInterval(intervalId);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [interval, textCount, START_TIME, END_TIME]);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const scaleClass = isScalingUp ? 'scale-up' : 'scale-down';

  return (
    <div className='absolute top-0 left-0 w-screen h-screen z-20 flex justify-center items-center'>
      <div className='absolute top-0 left-0 w-full h-screen bg-[#ce4177]'></div>
      <button className='absolute top-4 md:top-14 left-4 md:left-14 z-50' onClick={() => handleClose()}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>

      <img src="img/music/wave-top-left.png" alt="" className='absolute scale-150 md:scale-100 -top-20 -left-40  md:-top-[50vw] md:-left-60 unselectable' />
      <img src="img/music/wave-bottom-right.png" alt="" className='absolute scale-[2] md:scale-100 -bottom-20 -right-40 md:-bottom-[50vw] md:-right-60 unselectable' />
      <div className='absolute top-0 left-0 w-full h-screen bg-black bg-opacity-20'></div>

      <div className='w-screen h-screen flex flex-col md:grid md:grid-cols-2 z-10'>
        <div className='w-full h-screen flex flex-col items-center justify-center'>
          <div className='w-80 scale-75 md:scale-100 flex flex-col gap-40 md:gap-0'>
            <img src={imgSrc} alt="" className='rounded-xl scale-75 md:scale-100 md:translate-y-0 -translate-y-52' />
            <div>
              <span className='font-josefinssans text-white text-xl'>{title}</span>

              {/* Volume Control Slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={handleVolumeChange}
                className="volume-slider   w-full mt-2"
              />
              <div className='w-full flex justify-between'>
                <TbVolume2 className='text-white w-5 h-5' />
                <TbVolume className='text-white w-5 h-5' /></div>
            </div>
          </div>
        </div>

        <div className='w-full absolute md:relative h-screen scale-50 md:scale-100 flex flex-col items-center justify-center'>
          <div className='absolute w-96 h-96 rounded-full bg-[#cc7489] blur-3xl -z-10'></div>
          <span className={`font-chewy text-6xl text-white w-96 text-center ${scaleClass}`}>
            {textArr[currentTextIndex]}
          </span>
        </div>
      </div>

      <audio ref={audioRef} src={musicSrc} autoPlay></audio>

      {/* decoration */}
      <img src="./img/music/musiceffect.png" alt="" className='absolute scale-50 md:scale-100 left-0 md:left-auto -translate-y-16 md:top-24 w-36 love z-10' />
      <img src="./img/music/musiceffect.png" alt="" className='absolute scale-50 md:scale-100 delay-2 bottom-7 right-2 md:right-7 w-36 love z-10' />

      <img src="img/happyface.png" alt="" className='absolute w-32 mt-44 md:mt-0 md:w-80 top-20 md:top-0 left-4 md:left-auto md:mr-24 animate-rotate delay-2s' />

      <img src="img/happyface.png" alt="" className='absolute w-32 md:w-80 bottom-4 right-4 animate-rotate' />
      <style jsx>{`
  .volume-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    background: #333; /* Gelap background */
    border-radius: 5px;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .volume-slider::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: #333; /* Background track */
    border-radius: 5px;
  }

  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    transform: translateY(-3px);
    background: #fff; /* Warna slider handle sama dengan fill */
    border-radius: 50%;
    cursor: pointer;
  }

  .volume-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    transform: translateY(-3px);
    background: #fff; /* Warna slider handle sama dengan fill */
    border-radius: 50%;
    cursor: pointer;
  }

  .volume-slider::-moz-range-track {
    width: 100%;
    height: 8px;
    background: #333;
    border-radius: 5px;
  }

  .volume-slider::-ms-thumb {
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
  }

  .volume-slider::-ms-track {
    width: 100%;
    height: 8px;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  .volume-slider::-ms-fill-lower {
    background: #fff; /* Warna fill */
    border-radius: 5px;
  }

  .volume-slider::-ms-fill-upper {
    background: #333;
    border-radius: 5px;
  }

  .volume-slider::-webkit-slider-runnable-track {
    background: linear-gradient(to right, #fff 0%, #fff ${(volume * 100)}%, #333 ${(volume * 100)}%, #333 100%);
  }

  .volume-slider:hover {
    opacity: 1;
  }
`}</style>
    </div>
  );
};
export default MusicSection