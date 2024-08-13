import React, { useEffect, useRef, useState } from 'react'
import { TbArrowBackUp, TbView360Arrow } from 'react-icons/tb'

const GallerySection = ({ handleCloseSection }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [mailIndex, setMailIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef(null);
  const [mails, setMails] = useState([
    {
      'upper': 'PARK TIME SQUARE',
      'text': `"This photo was taken when you were smiling. Maybe if other people saw how happy you were at that moment, they would surely be jealous. I like that, I want to make everyone jealous of our relationship."`,
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
    setFliped(!fliped)
    if (!fliped) {
      handleTypeWriterEffect(0);
    }
    setAngle((prev) => (prev + 180) % 360);

  }

  return (

    <div className='absolute w-full min-h-screen bg-black bg-opacity-70 z-30 flex justify-center items-center backdrop-blur-sm'>
      <button className='absolute top-14 left-14' onClick={() => handleCloseSection(handleCloseSection)}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>

      <button
        onClick={() => handleCloseSection(handleCloseSection)}
        className={`${isRendered ? "top-7" : "top-[50%]"
          } -z-20 absolute flex justify-center items-center w-40 h-40 active:opacity-90 duration-300`}
      >
        <img src="img/camera.png" className="w-16 z-20 translate-x-1" />
        <img src="img/menu_button.webp" className="absolute w-32" />
      </button>
      <div
        ref={cardRef} className={`absolute w-full min-h-screen flex justify-center items-center duration-300  ${fliped ? 'flip' : ''} -z-10`}>
        <div className='absolute w-max translate-x-2 -translate-y-2' style={{
          zIndex: zIndexFront
        }}>
          <img src="img/gallery_box_1.webp" alt="" className='w-80 bg-cover left-0 top-0 -z-10' />
          <div className='absolute top-3 left-8' style={{
            zIndex: (zIndexFront > zIndexBack) ? 10 : -10
          }}>
            <img src="img/girlfriend.png" alt="" className='w-64 bg-cover' />
          </div>
          <div className='absolute w-24 -translate-y-10 translate-x-56' style={{
            zIndex: (zIndexFront > zIndexBack) ? 10 : -10
          }}>
            <img src="img/ribbon.webp" alt="" className='w-32 ribbon-shake' />
          </div>
        </div>
        <div className='absolute w-max flip' style={{
          zIndex: zIndexBack
        }}>
          <img src="img/gallery_box_2.webp" alt="" className='w-80 bg-cover left-0 top-0 -z-10' />
          <div className='w-full h-full max-h-40 flex flex-col absolute px-7 top-8 gap-2'>
            <span className='text-sm font-bold italic text-center w-full'>{mails[mailIndex].upper}</span>
            <span className='text-xs font-semibold'>{displayText}</span>
            <span className='text-sm absolute left-0 bottom-0 w-full text-right pr-14 font-semibold italic'>{mails[mailIndex].lower}</span>
          </div>
        </div>
        <img src="img/slash.webp" alt="" className='absolute w-96 h-[50px] z-50 translate-y-36' />
      </div>

      <button className="absolute bottom-14" onClick={() => handleFlip()}>
        <TbView360Arrow className='w-20 h-20 text-[rgb(243,215,212)]' />
      </button>
    </div>
  )
}

export default GallerySection