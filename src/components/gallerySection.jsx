import React, { useEffect, useRef, useState } from 'react'
import { TbArrowBackUp, TbCircleArrowLeft, TbCircleArrowRight, TbView360Arrow } from 'react-icons/tb'

const GallerySection = ({ SetState, handleCloseSection }) => {
  const [currentPage, setCurrentPage] = useState(0); // 0 for FirstPage, 1 for SecondPage


  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment page index
  };

  const handleBack = () => {
    setCurrentPage((prevPage) => prevPage - 1); // Decrement page index
  };


  return (
    <div>
      {currentPage === 0 && <FirstPage handleNext={handleNext} handleCloseSection={handleCloseSection} />}
      {currentPage === 1 && <SecondPage SetState={SetState} handleBack={handleBack} handleNext={handleNext} handleCloseSection={handleCloseSection} />}
    </div>
  );
};

const FirstPage = ({ handleNext, handleCloseSection }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [mailIndex, setMailIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef(null);
  const [blink, setBlink] = useState(false);
  const [isFullTextDisplayed, setIsFullTextDisplayed] = useState(false);
  const mails = [
    { text: `Hai ini ada beberapa foto kamu dan kita, jangan lupa di klik ya buat liat backstorynya` },
  ];

  const stopTypewriterEffect = () => {
    if (!isFullTextDisplayed) {
      // If the full text is not displayed yet, show it
      clearInterval(intervalRef.current);
      setDisplayText(mails[mailIndex].text);
      setIsFullTextDisplayed(true); // Update state to indicate full text is displayed
    } else {
      // If full text is already displayed, show the answer page
      handleNext()
    }
  };
  const handleTypeWriterEffect = (valueMailIndex) => {
    clearInterval(intervalRef.current); // Clear any existing interval
    setMailIndex(valueMailIndex);
    setDisplayText('');
    setIsFullTextDisplayed(false); // Reset the full text display flag
    let currentIndex = 0;

    const typeWriterEffect = () => {
      if (currentIndex < mails[valueMailIndex].text.length) {
        setDisplayText(mails[valueMailIndex].text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalRef.current);
        setIsFullTextDisplayed(true); // Update state to indicate full text is displayed
      }
    };

    intervalRef.current = setInterval(typeWriterEffect, 30);
  };

  useEffect(() => {
    setIsRendered(true);
    handleTypeWriterEffect(0);



    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 500);
    }, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleBlink = () => {
    setInterval(() => {
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 500);
    }, 2000);
  };



  return (
    <div className='absolute w-full min-h-screen bg-[rgba(238,99,160)] z-30 flex justify-center items-center backdrop-blur-sm'>
      <button className='absolute top-14 left-14 hidden md:block' onClick={() => handleCloseSection()}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>
      <div className='absolute w-[700px] h-[500px] flex flex-col items-center justify-center top-40 left-40 -z-10 bounce-flip1'>
        <img src='img/blankface.png' alt='' className='w-full h-full absolute z-20 left-0 top-20 ' />
        <div className='relative h-[150px] flex items-center gap-60 md:gap-[140px] translate-y-[170px] left-0 z-20 '>
          <img src={`${blink ? 'img/blink_eye.png' : 'img/eye.webp'}`} className={`w-14 md:w-[5vw] md:h-auto ${blink ? 'h-5' : 'h-14'}`} />
          <img src={`${blink ? 'img/blink_eye.png' : 'img/eye.webp'}`} className={`w-14 md:w-[5vw] md:h-auto ${blink ? 'h-5' : 'h-14'}`} />
        </div>
        <div className='relative left-0 translate-y-40 z-20 '>
          <img src='img/love.webp' className='w-20 md:w-[6.5vw] aspect-square breathe ' />
        </div>
        <div className='relative flex gap-[100px] md:gap-40 left-0 translate-y-[30px] z-20 '>
          <img src='img/left_mustache.png' className='w-32 h-16 md:w-[9vw] md:h-auto breathe ' />
          <img src='img/right_mustache.png' className='w-32 h-16 md:w-[9vw] md:h-auto breathe ' />
        </div>
        <div className='relative flex gap-96 translate-y-16 left-0 z-20 '>
          <img src='img/cute_mouth.png' className='w-20 md:w-[8vw] h-7 md:h-auto' />
        </div>
      </div>
      <div className='absolute w-[710px] h-20 bg-black rounded-[100%] blur-2xl -z-20 left-40 bottom-24'></div>
      <button onClick={stopTypewriterEffect} className='absolute z-20 md:scale-150 translate-x-96 -translate-y-20 font-[Fredoka]'>
        <img src='img/mail_box.webp' alt='' className='w-[480px]' />
        <div className='absolute top-[8px] left-24'>
          <span className='font-bold text-white text-xl'>FOR </span>
          <span className='font-bold text-[#F64C96] text-xl'>NANA</span>
        </div>
        <span className='absolute w-[450px] top-20 left-7 text-3xl pr-7 font-bold text-center'>{displayText}</span>
      </button>
    </div>
  );
};

const SecondPage = ({ SetState, handleCloseSection }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [mailIndex, setMailIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef(null);
  const [blink, setBlink] = useState(false);
  const [isFullTextDisplayed, setIsFullTextDisplayed] = useState(false);
  const mails = [
    {
      'title': '',
      'text': `Hai ini ada beberapa foto kamu dan kita, jangan lupa di klik ya buat liat backstorynya`,
      'image': '',
      'date': ''

    },
    {
      'title': "D'LUIT",
      'text': `"Another dinner. 1 rice isn't enough hehe"`,
      'image': 'img/gallery/photo/image1.png',
      'date': '12 FEB 2024'
    },
    {
      'title': 'ACTA BRASSERIE',
      'text': `"Ini dinner pertama kita, bareng temen temen. Kamu masih tirus dikit, Your smile.. gorgeous, i cant explain it. I love.. I love everything of yours."`,
      'image': 'img/gallery/photo/image2.png',
      'date': '7 JAN 2024'

    },
    {
      'title': 'THEATRE PHOTOSHOOT',
      'text': `"This photo was took at GI. My favorite photo, sayangnya aku gaada ditempat :3"`,
      'image': 'img/gallery/photo/image3.png',
      'date': '16 JUNI 2024'

    },
    {
      'title': "KHANZA'S HOUSE",
      'text': `"Ini kayaknya dirumah khanza deh, gatau kenapa di save. Kamu cantik disitu hehe`,
      'image': 'img/gallery/photo/image4.png',
      'date': '26 FEB 2024'
    },
  ];

  const stopTypewriterEffect = () => {
    if (!isFullTextDisplayed) {
      // If the full text is not displayed yet, show it
      clearInterval(intervalRef.current);
      setDisplayText(mails[mailIndex].text);
      setIsFullTextDisplayed(true); // Update state to indicate full text is displayed
    } else {
      // If full text is already displayed, show the answer page

    }
  };
  const handleTypeWriterEffect = (valueMailIndex) => {
    clearInterval(intervalRef.current); // Clear any existing interval
    setMailIndex(valueMailIndex);
    setDisplayText('');
    setIsFullTextDisplayed(false); // Reset the full text display flag
    let currentIndex = 0;

    const typeWriterEffect = () => {
      if (currentIndex < mails[valueMailIndex].text.length) {
        setDisplayText(mails[valueMailIndex].text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalRef.current);
        setIsFullTextDisplayed(true); // Update state to indicate full text is displayed
      }
    };

    intervalRef.current = setInterval(typeWriterEffect, 30);
  };

  useEffect(() => {
    setIsRendered(true);
    handleTypeWriterEffect(0);



    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 500);
    }, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    if (mailIndex > 0) {
      handleTypeWriterEffect(mailIndex);
    }

    return () => clearInterval(intervalRef.current);
  }, [mailIndex]); // Only run the effect when mailIndex changes


  const handleMailIndex = (index) => {
    setMailIndex(index);
    setDisplayText(''); // Clear current display text
    setIsFullTextDisplayed(false); // Reset the full text display flag

    // Restart the typewriter effect with the initial text if returning to main view
    if (index === 0) {
      handleTypeWriterEffect(0);
    }
  };
  useEffect(() => {
    // Check if mailIndex is set to 0, indicating a return to the main view
    if (mailIndex === 0) {
      handleTypeWriterEffect(0); // Restart the typewriter effect
    }
  }, [mailIndex]); // Dependency on mailIndex to trigger the effect when it changes  

  if (mailIndex > 0) {
    return (
      <div className='absolute bg-[rgba(238,99,160)] flex justify-center items-center w-full min-h-screen z-30 gap-10'>
        <button className='absolute top-14 left-14 hidden md:block' onClick={() => handleMailIndex(0)}>
          <TbArrowBackUp className='text-white w-10 h-10' />
        </button>
        <div className='w-[600px] h-full flex items-center rounded-2xl overflow-hidden'>
          <img src={mails[mailIndex]?.image} alt="" />
        </div>
        <div className='absolute -z-10 -translate-y-32 left-10 -rotate-[30deg]'>
          <img src="img/normalface.png" alt="" className='w-[350px] breathe' />
        </div>
        <div className='absolute -z-10 -translate-y-60 right-20 rotate-[30deg]'>
          <img src="img/normalface.png" alt="" className='w-[350px] breathe' />
        </div>
        <button
          className='text-white p-2 rounded w-[650px] flex'
        >
          <div className='absolute -z-10 translate-x-3 -translate-y-3'>
            <img src="img/gallery_box_1.webp" alt="" className='w-[650px]' />
          </div>
          <div className='flex items-center justify-center'>
            <img src="img/gallery_box_2.webp" alt="" className='w-[650px]' />
            <span className={`${isRendered ? '' : ''}absolute -translate-y-32 font-bold text-6xl text-[#EE63A0] font-[introhead]`}>{mails[mailIndex]?.title}</span>
            <span className='absolute w-[500px] font-[Fredoka] text-3xl text-black font-semibold'>{displayText}</span>
            <span className='absolute translate-y-32 translate-x-40 font-bold text-5xl text-[#EE63A0] font-[introhead]'>{mails[mailIndex]?.date}</span>
          </div>


        </button>
      </div>
    )
  }


  return (
    <div className='absolute w-full min-h-screen bg-[rgba(238,99,160)] z-30 flex justify-center items-center backdrop-blur-sm'>
      <button className='absolute top-14 left-14 hidden md:block' onClick={() => handleCloseSection()}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>
      <img src="img/wave2.png" alt="" className='absolute -z-10 -top-[42rem] -left-[38rem]' />
      <img src="img/wave3.png" alt="" className='absolute -z-10 -bottom-[40rem] -right-[60rem]' />
      <div className='w-full h-full flex justify-center gap-10'>
        <button onClick={stopTypewriterEffect} className=' font-[Fredoka]'>
          <img src="img/splash2.png" alt="" className='absolute -z-10 -translate-x-40 -translate-y-60 scale-[.72]' />
          <div className='breathe'>
            <img src="img/cloud.png" alt="" className='absolute w-40 translate-x-[22rem] -translate-y-10 -scale-x-100' />
            <img src="img/cloud.png" alt="" className='absolute w-40 -translate-x-10 translate-y-52' />
          </div>
          <div className='absolute translate-x-5 translate-y-5 '>
            <img src="img/heartgroup.png" alt="" className=' w-40 breathe' />
          </div>
          <div src='' alt='' className='w-[30rem] h-64 bg-[#F6A8CA] rounded-3xl p-4 flex items-center' >
            <span className='w-[450px] absolute z-10 text-white text-3xl font-bold text-center'>{displayText}</span>
            <span className='w-[450px] absolute translate-x-1 translate-y-1 text-[#FC3A87] text-3xl font-bold text-center'>{displayText}</span>
          </div>
        </button>
        <div className='grid grid-cols-2 gap-y-10 gap-x-14 justify-center items-center'>
          <img src="img/splash.png" alt="" className='absolute -z-20 -top-14 -translate-x-32 w-[950px]' />
          {/* Gallery Bellow */}
          <button className='bg-black w-96 h-96 rounded-3xl overflow-hidden' onClick={() => handleMailIndex(1)}>
            <div className='absolute -translate-y-4 -translate-x-10 z-20'>
              <img src="img/heart1.png" alt="" className='w-20 breathe' />
            </div>
            <img src={mails[1]?.image} alt="" className='-z-10' />
          </button>
          <button className='bg-black w-96 h-96 rounded-3xl overflow-hidden' onClick={() => handleMailIndex(2)}>
            <div className='absolute translate-y-60 translate-x-80'>
              <img src="img/flower2.png" alt="" className='w-32 breathe' />
            </div>
            <img src={mails[2]?.image} alt="" className='-z-10' />
          </button>
          <button className='bg-black w-96 h-96 rounded-3xl overflow-hidden' onClick={() => handleMailIndex(3)}>
            <div className='absolute translate-y-80 -translate-x-10'>
              <img src="img/sparkle.png" alt="" className='w-24 breathe' />
            </div>
            <img src={mails[3]?.image} alt="" className='-z-10' />
          </button>
          <button className='bg-black w-96 h-96 rounded-3xl overflow-hidden' onClick={() => handleMailIndex(4)}>
            <div className='absolute translate-y-72 translate-x-80'>
              <img src="img/flower.png" alt="" className='w-24 breathe' />
            </div>
            <img src={mails[4]?.image} alt="" className='-z-10' />
          </button>
          {/* End Gallery */}
        </div>
      </div>
    </div>
  )
}

export default GallerySection