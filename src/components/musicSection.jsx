import React, { useEffect, useRef, useState } from 'react'
import { TbArrowBackUp, TbPlayerPlay, TbPlayerPlayFilled } from 'react-icons/tb'

const MusicSection = ({ handleCloseSection }) => {

  const [blink, setBlink] = useState(false);

  const [showPlayingSection, setShowPlayingSection] = useState(false);
  const [musicText, setMusicText] = useState('empty');
  const [musicTitle, setMusicTitle] = useState('empty');
  const [musicSource, setMusicSource] = useState('empty');
  const [musicStart, setMusicStart] = useState(0);
  const [musicEnd, setMusicEnd] = useState(0);

  const musics = [
    {
      'vocalist': 'Keshi',
      'title': 'UNDERSTAND',
      'musicSrc': 'music/Bernadya - Untungnya, Hidup Harus Tetap Berjalan.mp3',
      'text': 'Tough days ive been trough',
      'musicStart': 40,
      'musicEnd': 60,
    },
    {
      'vocalist': 'Bernadya',
      'title': 'Untungnya bumi masih berputar',
      'musicSrc': 'music/Bernadya - Untungnya, Hidup Harus Tetap Berjalan.mp3',
      'text': 'luckily i survived',
      'musicStart': 40,
      'musicEnd': 60,
    },
    {
      'vocalist': 'All gatie',
      'title': 'Its You',
      'musicSrc': 'music/Bernadya - Untungnya, Hidup Harus Tetap Berjalan.mp3',
      'text': '"hal hal baik yang datangnya belakangan" is when i met you',
      'musicStart': 40,
      'musicEnd': 60,
    },
  ]

  useEffect(() => {
    // Delay the scroll to ensure it works on all devices
    setTimeout(() => {
      handleBlink();
    }, 0);
  }, [])

  const handleBlink = () => {
    setInterval(() => {
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 500);
    }, 2000);
  };

  const handleShowPlayingSection = (title, musicSrc, text, mStart, mEnd) => {
    setShowPlayingSection(true);
    setMusicTitle(title)
    setMusicSource(musicSrc)
    setMusicText(text)
    setMusicStart(mStart)
    setMusicEnd(mEnd)
  }

  return (
    <div className='absolute w-full min-h-screen bg-[rgba(238,99,160)] z-50'>
      <button className='absolute top-14 left-14 z-50' onClick={() => handleCloseSection(handleCloseSection)}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>
      <img src="img/music/wave-top-left.png" alt="" className='absolute -top-[800px] -left-60 unselectable' />
      <img src="img/music/wave-bottom-right.png" alt="" className='absolute -bottom-[800px] -right-60 unselectable' />

      <div className='absolute w-full min-h-screen flex justify-center items-center z-10'>
        {/* Album */}
        <div className='grid grid-cols-3 gap-14 translate-y-14  '>
          <div className='w-72 h-28 bg-[#ce4177] rounded-md music-album p-2 flex gap-2'>
            <img src="./img/music/album/album1.png" alt="" className='h-full aspect-square' />
            <div className='flex flex-col text-sm font-bold w-full'>
              <span className='font-light'>{musics[0].title}</span>
              <span className='text-white'>{musics[0].vocalist}</span>
              <div className='h-full flex items-end w-full justify-center'>
                <button className='bg-black p-2 rounded-full' onClick={() => handleShowPlayingSection(`${musics[0].vocalist} - ${musics[0].title}`, `${musics[0].musicSrc}`, `${musics[0].text}`, musics[0].musicStart, musics[0].musicEnd)}>
                  <TbPlayerPlayFilled className='w-3 h-3 text-[#ce4177]' />
                </button>
              </div>
            </div>
          </div>

          <div className='w-72 h-28 bg-[#ce4177] rounded-md music-album p-2 flex gap-2'>
            <img src="./img/music/album/album2.png" alt="" className='h-full aspect-square' />
            <div className='flex flex-col text-sm font-bold w-full'>
              <span className='font-light'>{musics[1].title}</span>
              <span className='text-white'>{musics[1].vocalist}</span>
              <div className='h-full flex items-end w-full justify-center'>
                <button className='bg-black p-2 rounded-full' onClick={() => handleShowPlayingSection(`${musics[1].vocalist} - ${musics[1].title}`, `${musics[1].musicSrc}`, `${musics[1].text}`, musics[1].musicStart, musics[1].musicEnd)}>
                  <TbPlayerPlayFilled className='w-3 h-3 text-[#ce4177]' />
                </button>
              </div>
            </div>
          </div>

          <div className='w-72 h-28 bg-[#ce4177] rounded-md music-album p-2 flex gap-2'>
            <img src="./img/music/album/album2.png" alt="" className='h-full aspect-square' />
            <div className='flex flex-col text-sm font-bold w-full'>
              <span className='font-light'>{musics[2].title}</span>
              <span className='text-white'>{musics[2].vocalist}</span>
              <div className='h-full flex items-end w-full justify-center'>
                <button className='bg-black p-2 rounded-full' onClick={() => handleShowPlayingSection(`${musics[2].vocalist} - ${musics[2].title}`, `${musics[2].musicSrc}`, `${musics[2].text}`, musics[2].musicStart, musics[2].musicEnd)}>
                  <TbPlayerPlayFilled className='w-3 h-3 text-[#ce4177]' />
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className='absolute grid grid-cols-2 w-72 -translate-y-48 music-photo'>
          <img src="./img/music/photo/image1.png" alt="" />
          <img src="./img/music/photo/image2.png" alt="" />
          <img src="./img/music/photo/image3.png" alt="" />
          <img src="./img/music/photo/image4.png" alt="" />
        </div>

        <img src="./img/music/musiceffect.png" alt="" className='absolute top-24 right-7 w-36 love' />
        <img src="./img/music/star.png" alt="" className='absolute top-14 right-72 w-28 h-28/' />
        <img src="./img/music/3star.png" alt="" className='absolute bottom-24 left-80 w-20 ribbon-shake' />
        <div className='absolute top-28 right-28 rotate-12 text-center text-4xl'>
          <span className='absolute font-bold w-max  text-center font-chewy text-[#fc7397]'>PLAYLIST FOR <br /> YOU!!!</span>
          <span className='absolute -top-1 left-[1px] w-max font-bold font-chewy text-transparent splice-text'>PLAYLIST FOR <br /> YOU!!!</span>
        </div>


        <img src="./img/music/flower.png" alt="" className='absolute bottom-32 left-14 w-20 ribbon-shake delay-3' />
        <img src="./img/music/3star.png" alt="" className='absolute bottom-24 left-80 w-20 ribbon-shake' />
        <div className='absolute bottom-28 left-28 -rotate-12 text-center text-4xl'>
          <span className='absolute font-bold w-max  text-center font-chewy text-[#fc7397]'>IT REMINDS ME TO <br /> YOU</span>
          <span className='absolute top-0 left-[1px] w-max font-bold font-chewy text-transparent splice-text'>IT REMINDS ME TO <br /> YOU</span>
        </div>

        <img src="img/happyface.png" alt="" className='absolute w-96 top-20 left-52 animate-rotate' />
      </div>

      <div className='absolute scale-75 w-64 h-48 flex flex-col items-center justify-center bottom-7 rotate-12 right-32 z-10'>
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
      {showPlayingSection && <MusicPlayingSection title={musicTitle} text={musicText} musicSrc={musicSource} musicStart={musicStart} musicEnd={musicEnd} handleClose={setShowPlayingSection} />}
    </div>
  )
}

const MusicPlayingSection = ({ title, text, musicSrc, musicStart, musicEnd, handleClose }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isShrinking, setIsShrinking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const START_TIME = musicStart; // Start time in seconds
  const END_TIME = musicEnd;   // End time in seconds

  useEffect(() => {
    setIsRendered(true);

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio.currentTime >= END_TIME) {
        setIsShrinking(true);
        audio.pause();
      } else {
        setCurrentTime(audio.currentTime);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);

    // Start the audio at the specified start time
    audio.currentTime = START_TIME;

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (isShrinking) {
      const timeoutId = setTimeout(() => {
        handleClose();
      }, 3000); // Match the duration of the shrinking animation

      return () => clearTimeout(timeoutId);
    }
  }, [isShrinking, handleClose]);

  const handleSliderChange = (e) => {
    const newTime = (e.target.value / 100) * (END_TIME - START_TIME) + START_TIME;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handlePlay = () => {
    audioRef.current.play();
  };

  return (
    <div className='absolute top-0 left-0 w-screen h-screen z-20 flex justify-center items-center'>
      <div className='absolute top-0 left-0 w-full h-screen bg-black bg-opacity-70 backdrop-blur-xl'></div>

      <div className={`w-96 h-80 relative z-10 flex items-center  justify-center ${isRendered && !isShrinking ? 'scale-100' : 'scale-0'} duration-[3s]`}>
        <img src="./img/music/box.png" alt="" className='w-full bg-cover -z-10' />
        <span className='absolute -translate-y-4 text-white text-3xl text-center max-w-56 font-chewy'>{text}</span>
        <span className='absolute top-[285px] text-lg max-w-80 leading-5 left-4 font-josefinssans'>{title}</span>
      </div>

      <audio ref={audioRef} src={musicSrc} autoPlay onPlay={handlePlay}></audio>

      {/* decoration */}
      <img src="./img/music/musiceffect.png" alt="" className='absolute top-24 left-80 w-36 love' />
      <img src="./img/music/musiceffect.png" alt="" className='absolute delay-2 top-48 right-80 w-36 love' />

      <img src="img/happyface.png" alt="" className='absolute w-96 top-64 left-40 animate-rotate delay-2s' />
      <img src="img/happyface.png" alt="" className='absolute w-96 top-72 left-56 animate-rotate' />

      <img src="img/happyface.png" alt="" className='absolute w-96 top-80 right-64 animate-rotate delay-2s' />
      <img src="img/happyface.png" alt="" className='absolute w-96 top-96 right-80 animate-rotate' />

      {/* Slider */}
      <input
        type="range"
        min="0"
        max="100"
        value={((currentTime - START_TIME) / (END_TIME - START_TIME)) * 100}
        onChange={handleSliderChange}
        className="absolute bottom-10 w-64"
      />
    </div>
  );
};

export default MusicSection