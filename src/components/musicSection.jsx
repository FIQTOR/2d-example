import React, { useEffect, useRef, useState } from 'react'
import { TbArrowBackUp, TbPlayerPauseFilled, TbPlayerPlay, TbPlayerPlayFilled, TbVolume, TbVolume2, TbX } from 'react-icons/tb'

const MusicSection = ({ handleCloseSection }) => {
  const [isRendered, setIsRendered] = useState(false);

  // Audio State

  useEffect(() => {
    setIsRendered(true);
  }, [])


  const [musicIndex, setMusicIndex] = useState(null);
  const handleOpenSong = (musicIndex) => {
    setMusicIndex(musicIndex)
  }



  return (

    <div className='absolute w-full min-h-screen bg-black bg-opacity-70 z-30 flex justify-center items-center backdrop-blur-sm'>

      <button
        onClick={() => handleCloseSection(handleCloseSection)}
        className={`${isRendered ? "-translate-x-72" : "-translate-x-40"
          } absolute flex justify-center items-center w-40 h-40 active:opacity-90 duration-300 z-20`}
      >
        <img src="img/music.png" className="w-10 z-20 translate-x-1" />
        <img src="img/menu_button.webp" className="absolute w-32" />
      </button>

      <div className='gap-2 text-white'>
        {Song(musicIndex, 0, 'music/2796268-uhd_3840_2160_25fps.mp4', '-translate-y-24', '-translate-x-36', handleOpenSong)}
        {Song(musicIndex, 1, 'music/2796268-uhd_3840_2160_25fps.mp4', 'translate-y-24', '-translate-x-36', handleOpenSong)}
        {Song(musicIndex, 2, 'music/2796268-uhd_3840_2160_25fps.mp4', '-translate-y-24', 'translate-x-0', handleOpenSong)}
        {Song(musicIndex, 3, 'music/2796268-uhd_3840_2160_25fps.mp4', 'translate-y-24', 'translate-x-0', handleOpenSong)}
        {Song(musicIndex, 4, 'music/2796268-uhd_3840_2160_25fps.mp4', '-translate-y-24', 'translate-x-36', handleOpenSong)}
        {Song(musicIndex, 5, 'music/2796268-uhd_3840_2160_25fps.mp4', 'translate-y-24', 'translate-x-36', handleOpenSong)}

        {musicIndex !== null && <button onClick={() => setMusicIndex(null)} className='absolute top-7 right-7'>
          <TbX className="w-7 h-7" />
        </button>}
      </div>
      {musicIndex === null && <button className='absolute top-14 left-14' onClick={() => handleCloseSection(handleCloseSection)}>
        <TbArrowBackUp className='text-white w-10 h-10 z-50' />
      </button>}
    </div>
  )
}
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const Song = (musicIndex, index, audioSource, posX, posY, handleOpenSong) => {
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
      {(musicIndex === null || musicIndex === index) && <div className={`absolute w-full min-h-screen top-0 left-0 flex justify-center items-center`}>
        <div className={`${musicIndex === index ? 'scale-150' : `scale-100  ${posY} ${posX}`} w-40 bg-black bg-opacity-30 p-2 max-w-32 rounded-xl duration-1000 z-10`}>
          <img src="img/taylor_swift.png" alt="" className='w-full rounded-md' />
          <div className='w-full flex flex-col items-center'>
            <span className='font-bold text-xs mt-2'>Wide Awake</span>
            {musicIndex === null ?
              <button onClick={() => handleOpenSong(index)}>
                <TbPlayerPlayFilled className="w-5 h-5" />
              </button>
              : <>
                <audio
                  ref={audioRef}
                  src="music/Katy Perry  Wide Awake.mp3"
                  onLoadedMetadata={handleLoadedMetadata}
                  autoPlay
                  onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
                ></audio>
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
                <div className="w-full flex justify-between mt-2">
                  <span className="text-[8px]">{formatTime(currentTime)}</span>
                  <button onClick={handlePlaySong}>
                    {isPlaying ?
                      <TbPlayerPauseFilled className="w-6 h-6 text-white" /> :
                      <TbPlayerPlayFilled className="w-6 h-6 text-white" />}
                  </button>
                  <span className="text-[8px]">-{formatTime(duration - currentTime)}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
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
              </>}
          </div>
        </div>
      </div>}
    </>
  )
}

export default MusicSection