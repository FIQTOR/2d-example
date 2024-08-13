import React, { useEffect, useRef, useState } from 'react'
import { TbArrowBackUp, TbCircleArrowLeft, TbCircleArrowRight } from 'react-icons/tb';

const MailSection = ({ handleCloseSection }) => {

  const [isRendered, setIsRendered] = useState(false);
  const [mailIndex, setMailIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef(null);
  const [mails, setMails] = useState([
    {
      'upper': 'Dear. Swan',
      'text': `You remind me of the full moon, which looks ordinary but becomes amazing when you observe it for a long time. It turns darkness into light and gives direction. Honestly, only you can keep me company when I can't sleep.`,
      'lower': '-yourLove'
    },
    {
      'upper': 'Dear. Swet',
      'text': `You remind me of the full moon, which looks ordinary but amazing.`,
      'lower': '-yourLove'
    },
  ]
  )


  useEffect(() => {
    // Trigger the translation after the component mounts
    setIsRendered(true);
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setMailIndex(mailIndex);
    setDisplayText('');
    let currentIndex = -1;

    const typeWriterEffect = () => {
      if (currentIndex < mails[mailIndex].text.length) {
        setDisplayText((prev) => prev + mails[mailIndex].text[currentIndex]);
        currentIndex++;
      } else {
        return () => {
          clearInterval(intervalRef.current); // Clear interval when done
        }
      }
    };

    // Start the interval
    intervalRef.current = setInterval(typeWriterEffect, 30);

    return () => {
      clearInterval(intervalRef.current);
    }
  }, []);

  const handleTypeWriterEffect = (valueMailIndex) => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setMailIndex(valueMailIndex);
    setDisplayText('');
    let currentIndex = -1;

    const typeWriterEffect = () => {
      if (currentIndex < mails[valueMailIndex].text.length) {
        setDisplayText((prev) => prev + mails[valueMailIndex].text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalRef.current); // Clear interval when done
      }
    };

    // Start the interval
    intervalRef.current = setInterval(typeWriterEffect, 30);
  }

  return (
    <div className='absolute w-full min-h-screen bg-black bg-opacity-70 z-30 flex justify-center items-center backdrop-blur-sm'>
      <button className='absolute top-14 left-14' onClick={() => handleCloseSection(handleCloseSection)}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>

      <button
        onClick={() => handleCloseSection(handleCloseSection)}
        className={`${isRendered ? "top-7" : "top-[50%]"
          } absolute flex justify-center items-center w-40 h-40 active:opacity-90 duration-300`}
      >
        <img src="img/mail.png" className="w-14 z-20 translate-x-1" />
        <img src="img/menu_button.webp" className="absolute w-32" />
      </button>
      <div className='relative'>
        <img src="img/love_box.webp" alt="" className='w-96 bg-cover left-0 top-0 -z-10' />
        <div className='w-full h-full max-h-36 flex flex-col z-20 absolute px-14 top-20'>
          <span className='text-sm font-semibold italic'>{mails[mailIndex].upper}</span>
          <span className='text-xs font-semibold'>{displayText}</span>
          <span className='text-sm absolute left-0 bottom-0 w-full text-right pr-14 font-semibold italic'>{mails[mailIndex].lower}</span>
        </div>
      </div>
      <div className='absolute translate-y-48 text-[rgb(243,215,212)]'>
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
    </div>
  )
}

export default MailSection