import React, { useEffect, useRef, useState } from 'react'
import { TbArrowBackUp, TbCircleArrowLeft, TbCircleArrowRight, TbView360Arrow } from 'react-icons/tb'

const GallerySection = ({ handleCloseSection }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [mailIndex, setMailIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef(null);
  const [mails, setMails] = useState([
    {
      'image': 'img/girlfriend.png',
      'upper': 'PARK TIME SQUARE',
      'text': `"This photo was taken when you were smiling. Maybe if other people saw how happy you were at that moment, they would surely be jealous. I like that, I want to make everyone jealous of our relationship."`,
      'lower': '08/AUG/2024'
    },
    {
      'image': `img/girlfriend.png`,
      'upper': 'PARK TIME SQUARE',
      'text': `"TEXT2, This photo was taken when you were smiling. Maybe if other people saw how happy you were at that moment, they would surely be jealous. I like that, I want to make everyone jealous of our relationship."`,
      'lower': '08/AUG/2024'
    },
  ]
  )
  const [angle, setAngle] = useState(0);

  const [fliped, setFliped] = useState(false)
  const cardRef = useRef(null);
  const [zIndexFront, setZIndexFront] = useState(2);
  const [zIndexBack, setZIndexBack] = useState(1);



  useEffect(() => {

    setIsRendered(true);


    let animationFrameId;

    const checkRotation = () => {
      const currentAngle = Math.abs(angle % 360);

      if (currentAngle > 90 && currentAngle <= 270) {
        setZIndexBack(2);
        setZIndexFront(1);
      } else {
        setZIndexBack(1);
        setZIndexFront(2);
      }

      // Continue the loop while the card is rotating
      if (cardRef.current) {
        animationFrameId = requestAnimationFrame(checkRotation);
      }
    };

    // Start monitoring the rotation when the component mounts
    checkRotation();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [angle])

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
    let currentIndex = 0;

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
  };

  const handleFlip = () => {
    console.log(fliped)
    if (fliped) {
      if (displayText == mails[mailIndex].text) {
        setFliped((val) => !val)
        setAngle((prev) => (prev + 180) % 360);
      } else {
        stopTypewriterEffect()
      }
    } else {
      handleTypeWriterEffect(mailIndex);
      setFliped((val) => !val)
      setAngle((prev) => (prev + 180) % 360);
    }
  }

  const handleChangeGallery = (val) => {
    console.log(val);
    setMailIndex(val);
    setFliped(false);
    setAngle(0);
  }

  return (

    <div className='absolute w-full min-h-screen bg-black bg-opacity-70 z-30 flex justify-center items-center backdrop-blur-sm'>
      <button className='absolute top-14 left-14 hidden md:block' onClick={() => handleCloseSection(handleCloseSection)}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>

      <button
        onClick={() => handleCloseSection(handleCloseSection)}
        className={`${isRendered ? "-translate-y-48 md:translate-y-0 md:-translate-x-96" : ""
          } z-20 absolute flex justify-center items-center w-40 h-40 md:scale-150 active:opacity-90 duration-300`}
      >
        <img src="img/camera.png" className="w-16 z-20 translate-x-1" />
        <img src="img/menu_button.webp" className="absolute w-32" />
      </button>
      <div
        ref={cardRef} className={`absolute w-full min-h-screen flex justify-center items-center duration-300  ${fliped ? 'flip' : ''} -z-10`}>
        <button onClick={() => handleFlip()} className='absolute w-max translate-x-2 -translate-y-2 md:scale-150' style={{
          zIndex: zIndexFront
        }}>
          <img src="img/gallery_box_1.webp" alt="" className='w-80 bg-cover left-0 top-0 -z-10' />
          <div className='absolute top-3 left-8' style={{
            zIndex: (zIndexFront > zIndexBack) ? 10 : -10
          }}>
            <img src={mails[mailIndex]?.image} alt="" className={`${isRendered ? 'scale-100' : 'scale-50'} w-64 bg-cover duration-300`} />
          </div>
          <div className='absolute w-24 -translate-y-10 translate-x-56' style={{
            zIndex: (zIndexFront > zIndexBack) ? 10 : -10
          }}>
            <img src="img/ribbon.webp" alt="" className='w-32 ribbon-shake' />
          </div>
        </button>
        <button onClick={() => handleFlip()} className='absolute w-max md:scale-150' style={{
          zIndex: zIndexBack
        }}>
          <img src="img/gallery_box_2.webp" alt="" className='w-80 bg-cover left-0 top-0 -z-10' />
          <div className='w-full h-full max-h-40 flex flex-col absolute px-7 top-8 gap-2 flip'>
            <span className='text-xl font-bold italic text-center w-full text-[rgb(238,99,158)] title-stroke'>{mails[mailIndex]?.upper}</span>
            <span className='text-xs font-semibold text-left'>{displayText}</span>
            <span className='text-xl absolute left-0 bottom-0 w-full text-right text-[rgb(238,99,158)] pr-14 font-semibold title-stroke'>{mails[mailIndex]?.lower}</span>
          </div>
        </button>
        <img src="img/slash.webp" alt="" className='absolute w-96 h-[50px] z-50 translate-y-36 md:translate-y-52 md:scale-150' />
      </div>
      <div className='absolute translate-y-44 md:translate-y-0 md:translate-x-96 md:scale-150 text-[rgb(243,215,212)]'>
        {mailIndex > 0 &&
          <button onClick={() => handleChangeGallery((mailIndex - 1))} className='active:opacity-80'>
            <TbCircleArrowLeft className='w-16 h-16' />
          </button>}
        {mailIndex < (mails.length - 1) &&
          <button onClick={() => handleChangeGallery((mailIndex + 1))} className='active:opacity-80'>
            <TbCircleArrowRight className='w-16 h-16' />
          </button>
        }
      </div>
    </div>
  )
}

export default GallerySection