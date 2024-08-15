import React, { useEffect, useRef, useState } from 'react'
import { TbArrowBackUp, TbCircleArrowLeft, TbCircleArrowRight } from 'react-icons/tb'

const GiftSection = ({ handleCloseSection }) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {

    setIsRendered(true);
    handleTypeWriterEffect(0)
  }, [])

  const [mailIndex, setMailIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef(null);
  const [mails, setMails] = useState([
    {
      'text': `Hai, sebelum kamu dapet hadiah ada beberapa pertanyaan nih yang harus kamu jawab!!!`,
    },
    {
      'text': `TANGGAL JADIAN KITA?`,
    },
  ]
  )

  const stopTypewriterEffect = () => {
    clearInterval(intervalRef.current);
    setDisplayText(mails[mailIndex].text)
  }

  const handleTypeWriterEffect = (valueMailIndex) => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setMailIndex(valueMailIndex);
    setDisplayText('');
    let currentIndex = -1;


    const stopTypewriterEffect = () => {
      clearInterval(intervalRef.current);
      setDisplayText(mails[mailIndex].text)
    }

    const typeWriterEffect = () => {
      if (currentIndex < (mails[valueMailIndex].text.length - 1)) {
        setDisplayText((prev) => prev + mails[valueMailIndex].text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalRef.current); // Clear interval when done
      }
    };

    // Start the interval
    intervalRef.current = setInterval(typeWriterEffect, 30);
  };

  const [showWrong, setShowWrong] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const handleAnniversaryDate = (answer) => {
    if (answer === '1 MARET 2023') {
      setCorrect(true)
    } else {
      setShowWrong(true)
    }
  }

  if (correct) {
    return (
      <div className='absolute w-full min-h-screen bg-black bg-opacity-70 z-30 flex justify-center items-center backdrop-blur-sm'>
        <button className='absolute top-14 left-14 z-50' onClick={() => handleCloseSection(handleCloseSection)}>
          <TbArrowBackUp className='text-white w-10 h-10' />
        </button>

        <button
          onClick={() => setShowVideo(true)}
          className={`${isRendered ? "scale-[3]" : "-translate-x-60"
            } absolute flex justify-center items-center w-40 h-40 active:opacity-90 duration-1000 ribbon-shake`}
        >
          <img src="img/gift.png" className="w-14 z-20 translate-x-1" />
        </button>
        <div className={` ${showVideo ? '' : 'hidden'} w-[90%] z-20 md:w-[70%]`}>
          <video src="video/2796268-uhd_3840_2160_25fps.mp4" controls autoPlay></video>
        </div>

      </div>
    )
  }

  return (

    <div className='absolute w-full min-h-screen bg-black bg-opacity-70 z-30 flex justify-center items-center backdrop-blur-sm'>
      <button className='absolute top-14 left-14 hidden md:block' onClick={() => handleCloseSection(handleCloseSection)}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>

      <button
        onClick={() => handleCloseSection(handleCloseSection)}
        className={`${isRendered ? "-translate-y-48 md:translate-y-0 md:-translate-x-80" : ""
          } absolute flex justify-center items-center w-40 h-40 active:opacity-90 duration-300`}
      >
        <img src="img/gift.png" className="w-14 z-10 translate-x-1" />
        <img src="img/menu_button.webp" className="absolute w-32" />
      </button>

      <button onClick={stopTypewriterEffect} className='absolute z-20 md:scale-150'>
        <img src="img/mail_box.webp" alt="" className='w-80' />
        <div className='absolute top-[1.5px] left-20'>
          <span className='font-bold text-white'>FOR </span>
          <span className='font-bold text-[rgb(158,47,82)]'>'Mei Mei'</span>
        </div>
        <span className='absolute top-10 left-7 text-xs pr-7 font-bold text-left'>{displayText}</span>
      </button>

      {mailIndex === (mails.length - 1) &&
        <div className='absolute w-full px-14 translate-y-44 md:translate-y-40 justify-center flex flex-col md:flex-row gap-2 md:gap-7'>
          <button onClick={() => handleAnniversaryDate('07 MEI 2018')} className='w-full md:w-32 py-2 bg-[rgb(243,215,212)] border-2 border-[rgba(112,44,43)] rounded-2xl active:opacity-70
        '>
            07 MEI 2018
          </button>
          <button onClick={() => handleAnniversaryDate('3 JULI 2020')} className='w-full md:w-32 py-2 border-2 border-[rgba(112,44,43)] bg-[rgb(243,215,212)] rounded-2xl active:opacity-70
        '>
            3 JULI 2020
          </button>
          <button onClick={() => handleAnniversaryDate('1 MARET 2023')} className='w-full md:w-32 py-2 border-2 border-[rgba(112,44,43)] bg-[rgb(243,215,212)] rounded-2xl active:opacity-70'>
            1 MARET 2023
          </button>
        </div>
      }

      <div className='absolute translate-y-72 md:translate-y-0 md:translate-x-80 text-white'>
        {mailIndex > 0 &&
          <button onClick={() => handleTypeWriterEffect(mailIndex - 1)} className='active:opacity-80'>
            <TbCircleArrowLeft className='w-16 h-16' />
          </button>}
        {mailIndex < (mails.length - 1) &&
          <button onClick={() => handleTypeWriterEffect(mailIndex + 1)} className='active:opacity-80'>
            <TbCircleArrowRight className='w-16 h-16' />
          </button>
        }
      </div>

      {showWrong &&
        <div className='absolute top-0 left-0 w-full min-h-screen bg-[rgb(243,215,212)] flex
      justify-center items-center flex-col gap-4 z-20'>
          <span className='font-bold text-2xl max-w-52 text-center'>Masa Kamu Gainget Sih -_-</span>
          <button className='active:opacity-70 px-4 py-2 rounded-md bg-[rgb(251,205,200)]' onClick={() => setShowWrong(false)}>Coba Lagi</button>
        </div>
      }
    </div>
  )
}

export default GiftSection