import React, { useEffect, useRef, useState } from 'react'
import { TbArrowBackUp } from 'react-icons/tb'

const GallerySection = ({ SetState, handleCloseSection, clickSoundEffect, typewritingSoundEffect }) => {
  const [currentPage, setCurrentPage] = useState(0); // 0 for FirstPage, 1 for SecondPage


  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment page index
    clickSoundEffect();
  };

  const handleBack = () => {
    setCurrentPage((prevPage) => prevPage - 1); // Decrement page index
    clickSoundEffect();
  };


  return (
    <div>
      {currentPage === 0 && <FirstPage handleNext={handleNext} handleCloseSection={handleCloseSection} typewritingSoundEffect={typewritingSoundEffect} />}
      {currentPage === 1 && <SecondPage SetState={SetState} handleBack={handleBack} handleNext={handleNext} handleCloseSection={handleCloseSection} clickSoundEffect={clickSoundEffect} typewritingSoundEffect={typewritingSoundEffect} />}
    </div>
  );
};

const FirstPage = ({ handleNext, handleCloseSection, typewritingSoundEffect }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [mailIndex, setMailIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef(null);
  const [blink, setBlink] = useState(false);
  const [isFullTextDisplayed, setIsFullTextDisplayed] = useState(false);
  const mails = [
    { text: `Hai ini ada beberapa foto kamu dan kita, jangan lupa di klik ya buat liat backstorynya` },
  ];

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

  const stopTypewriterEffect = () => {
    typewritingSoundEffect(false)
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
    typewritingSoundEffect(true)
    let currentIndex = 0;

    const typeWriterEffect = () => {
      if (currentIndex < mails[valueMailIndex].text.length) {
        setDisplayText(mails[valueMailIndex].text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalRef.current);
        setIsFullTextDisplayed(true); // Update state to indicate full text is displayed
        typewritingSoundEffect(false)
      }
    };

    intervalRef.current = setInterval(typeWriterEffect, 60);
  };

  return (
    <div className='absolute w-full min-h-screen bg-[rgba(238,99,160)] z-30 flex justify-center items-center backdrop-blur-sm'>
      <button className='absolute top-4 md:top-14 left-4 md:left-14 block' onClick={() => handleCloseSection()}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>
      <img src="img/gallery/wave-top-left.png" alt="" className='absolute w-full -top-32 md:-top-[650px] -left-20 md:-left-[600px] unselectable -z-10 scale-[2.0] md:scale-100' />
      <img src="img/music/wave-bottom-right.png" alt="" className='absolute  -bottom-32 md:-bottom-[800px] -right-40 md:-right-60 unselectable -z-10 scale-[2.0] md:scale-100' />

      <div className='absolute w-60 h-44 md:w-[600px] md:h-[450px] flex flex-col items-center justify-center mb-80 md:mb-0 md:bottom-7 left-0 md:left-40 z-30 bounce-flip1'>
        <img src="img/blankface.png" alt="" className='w-full h-full absolute z-20 left-0 top-0 ' />
        <div className="h-[150px] absolute flex items-center gap-14 md:gap-[140px] z-20 -translate-y-5 md:-translate-y-14">
          <img
            src={`${blink ? "img/blink_eye.png" : "img/eye.webp"}`}
            className={`w-7 md:w-20 md:h-auto ${blink ? 'h-2' : 'h-7'} `}
          />
          <img
            src={blink ? "img/blink_eye.png" : "img/eye.webp"}
            className={`w-7 md:w-20 md:h-auto ${blink ? 'h-2' : 'h-7'}`}
          />
        </div>
        <div className='relative left-0 z-20 translate-y-5 md:translate-y-10'>
          <img src="img/love.webp" className="w-10 md:w-24 aspect-square breathe " />
        </div>
        <div className="absolute flex gap-[50px] md:gap-40 z-20 translate-y-5 md:translate-y-10">
          <img src="img/left_mustache.png" className="w-16 h-10 md:w-36 md:h-auto breathe " />
          <img src="img/right_mustache.png" className="w-16 h-10 md:w-36 md:h-auto breathe " />
        </div>
        <div className="absolute flex gap-96 z-20 translate-y-14 md:translate-y-32">
          <img
            src="img/mouth.png"
            className="w-16 md:w-28 h-auto"
          />
        </div>
      </div>
      <div className='absolute -left-20 mb-60 md:mb-0 md:left-28 md:-bottom-0 md:translate-y-0 md:w-[700px] w-96 h-20 bg-black rounded-[100%] blur-2xl translate-y-7'>
      </div>

      <button onClick={stopTypewriterEffect} className='absolute w-fit px-7 h-fit md:right-32 md:-translate-y-32 z-40 flex items-center'>
        <img src="img/mail_box.webp" alt="" className='w-full md:w-[40vw]' />
        <div className='absolute top-[1vw] md:top-[0.5vw] left-[25%] sm:text-base md:text-xl lg:text-3xl mobile-stroke-text md:stroke-text font-introrust'>
          <span className='font-bold text-white pr-2'>HAI</span>
          <span className='font-bold text-[#f6498c]'>NANA</span>
        </div>
        <span className='absolute left-[10%] text-xl md:text-2xl lg:text-4xl pr-[10%] font-bold text-center font-fredoka text-[#702c2b]'>{displayText}</span>
        <img src="./img/music/star.png" alt="" className='absolute -top-7 left-0 lg:-left-[1vw] w-20 lg:w-[5vw] h-20 lg:h-[5vw] animate-star' />
        <img src="./img/music/star.png" alt="" className='absolute -bottom-7 right-0 lg:-eight-[1vw] w-20 lg:w-[5vw] h-20 lg:h-[5vw] animate-star' />
      </button>
    </div>
  );
};

const SecondPage = ({ SetState, handleCloseSection, typewritingSoundEffect, clickSoundEffect }) => {
  const [isRendered, setIsRendered] = useState([true, true, true, true]); // Initialize an array for 4 items
  const [renderIndex, setRenderIndex] = useState(0)
  const [mailIndex, setMailIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef(null);
  const [blink, setBlink] = useState(false);
  const [isFullTextDisplayed, setIsFullTextDisplayed] = useState(false);
  const mails = [
    {
      'title': '',
      'text': `Halo, ini beberapa foto yang aku kagumi hehe. Mereka pemenangnya!`,
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
    typewritingSoundEffect(false)
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
    typewritingSoundEffect(true)
    let currentIndex = 0;

    const typeWriterEffect = () => {
      if (currentIndex < mails[valueMailIndex].text.length) {
        setDisplayText(mails[valueMailIndex].text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalRef.current);
        setIsFullTextDisplayed(true); // Update state to indicate full text is displayed
        typewritingSoundEffect(false)
      }
    };

    intervalRef.current = setInterval(typeWriterEffect, 60);
  };

  useEffect(() => {
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
    typewritingSoundEffect(false)

    // Restart the typewriter effect with the initial text if returning to main view
    if (index === 0) {
      // setIsRendered(false)
      handleTypeWriterEffect(0);
    } else {
      clickSoundEffect()
    }
  };

  const handleRenderIndex = (index) => {
    setRenderIndex(index);
    console.log(index)
    if (index >= 0 && index < 4) {
      const newRenderedState = [...isRendered];
      newRenderedState[index] = false;
      setIsRendered(newRenderedState);
    }
  };

  useEffect(() => {
    // Check if mailIndex is set to 0, indicating a return to the main view
    if (mailIndex === 0) {
      setIsRendered([true, true, true, true])
      handleTypeWriterEffect(0); // Restart the typewriter effect
    }
  }, [mailIndex]); // Dependency on mailIndex to trigger the effect when it changes  



  if (mailIndex > 0) {
    return <>
      <ShowPhoto mail={mails[mailIndex]} mailIndex={mailIndex} handleMailIndex={handleMailIndex} handleRenderIndex={handleRenderIndex} typewritingSoundEffect={typewritingSoundEffect} />
    </>
  }


  return (
    <div className='absolute w-full min-h-screen bg-[rgba(238,99,160)] z-30 flex justify-center items-center backdrop-blur-sm'>
      <button className='absolute top-4 md:top-14 left-4 md:left-14 ' onClick={() => handleCloseSection()}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>
      <img src="img/wave2.png" alt="" className='absolute -z-10 -md:top-[42rem] md:-left-[38rem]' />
      <img src="img/wave3.png" alt="" className='absolute -z-10 -bottom-[40rem] -right-[60rem]' />
      <img src="img/gallery/wave-top-left.png" alt="" className='absolute w-full -top-32 md:-top-[650px] -left-20 md:-left-[600px] unselectable -z-10 scale-[2.0] md:scale-100' />
      <img src="img/music/wave-bottom-right.png" alt="" className='absolute  -bottom-32 md:-bottom-[800px] -right-40 md:-right-60 unselectable -z-10 scale-[2.0] md:scale-100' />

      <div className='w-full h-full flex flex-col md:flex-row justify-center items-center gap-8 md:gap-10'>
        <button onClick={stopTypewriterEffect} className='font-fredoka text-[#702c2b]'>
          <img src="img/splash2.png" alt="" className='absolute -z-10 translate-x-0 md:-translate-x-40 -translate-y-28 md:-translate-y-60 scale-[.65] md:scale-[.72]' />
          <div className='breathe'>
            <img src="img/cloud.png" alt="" className='absolute w-20 md:w-40 translate-x-52 md:translate-x-[22rem] -translate-y-5 md:-translate-y-10 -scale-x-100' />
            <img src="img/cloud.png" alt="" className='absolute w-20 md:w-40 -translate-x-5 md:-translate-x-10 translate-y-28 md:translate-y-52' />
          </div>
          <div className='absolute translate-x-5 translate-y-3 md:translate-y-5 '>
            <img src="img/heartgroup.png" alt="" className='w-20 md:w-40 breathe' />
          </div>
          <div src='' alt='' className='w-[17rem] md:w-[30rem] h-40 md:h-64 bg-[#F6A8CA] rounded-3xl p-2 md:p-4 flex items-center' >
            <span className='w-[250px] md:w-[450px] absolute z-10 text-white text-xl md:text-3xl font-bold'>{displayText}</span>
            <span className='w-[250px] md:w-[450px] absolute translate-x-1 translate-y-1 text-[#FC3A87] text-xl md:text-3xl font-bold text-center'>{displayText}</span>
          </div>
        </button>
        <div className='grid grid-cols-2 gap-y-4 md:gap-y-10 gap-x-4 md:gap-x-14 justify-center items-center scale-100 md:scale-75 max-w-3xl'>
          <img src="img/splash.png" alt="" className='absolute -z-20 top-40 md:-top-14 -translate-x-32 w-[950px]' />
          {/* Gallery Bellow */}
          <button className={`${isRendered[0] ? 'scale-100' : 'scale-150'} relative w-40 h-40 md:w-full md:h-auto duration-300`} onClick={() => handleMailIndex(1)}>
            <div className='absolute -translate-y-4 -translate-x-5 md:-translate-x-10 z-20'>
              <img src="img/heart1.png" alt="" className='w-10 md:w-20 breathe' />
            </div>
            <div className={`${isRendered[0] ? 'translate-x-0 scale-100' : 'translate-x-16 md:-translate-x-[40rem] -translate-y-20 md:translate-y-40 scale-[2.0]'}w-full h-full rounded-xl md:rounded-3xl overflow-hidden duration-300`}>
              <img src={mails[1]?.image} alt="" className='-z-10' />
            </div>
          </button>
          <button className={`${isRendered[1] ? 'scale-100' : 'scale-150'} relative w-40 h-40 md:w-full md:h-auto duration-300`} onClick={() => handleMailIndex(2)}>
            <div className='absolute md:translate-y-0 md:translate-x-0 bottom-0 -right-6 md:-right-16 z-20'>
              <img src="img/flower2.png" alt="" className='w-12 md:w-32 breathe' />
            </div>
            <div className={`${isRendered[1] ? 'translate-x-0 scale-100' : '-translate-x-16 md:-translate-x-[40rem] -translate-y-20 md:translate-y-40 scale-[2.0]'}w-full h-full rounded-xl md:rounded-3xl overflow-hidden duration-300`}>
              <img src={mails[2]?.image} alt="" className='-z-10' />
            </div>
          </button>
          <button className={`${isRendered[2] ? 'scale-100' : 'scale-150'} relative  w-40 h-40 md:w-full md:h-auto duration-300`} onClick={() => handleMailIndex(3)}>
            <div className='absolute -bottom-6 -left-6 md:-bottom-12 md:-left-12 z-20'>
              <img src="img/sparkle.png" alt="" className='w-12 md:w-24 breathe' />
            </div>
            <div className={`${isRendered[2] ? 'translate-x-0 scale-100' : 'translate-x-16 md:-translate-x-[40rem] -translate-y-40 scale-[2.0]'}w-full h-full rounded-xl md:rounded-3xl overflow-hidden duration-300`}>
              <img src={mails[3]?.image} alt="" className='-z-10' />
            </div>
          </button>
          <button className={`${isRendered[3] ? 'scale-100' : 'scale-150'} relative  w-40 h-40 md:w-full md:h-auto duration-300`} onClick={() => handleMailIndex(4)}>
            <div className='absolute bottom-0 -right-6 md:-right-12 z-20'>
              <img src="img/flower.png" alt="" className='w-12 md:w-24 breathe' />
            </div>
            <div className={`${isRendered[3] ? 'translate-x-0 scale-100' : '-translate-x-16 md:-translate-x-[40rem] -translate-y-40 scale-[2.0]'}w-full h-full rounded-xl md:rounded-3xl overflow-hidden duration-300`}>
              <img src={mails[4]?.image} alt="" className='-z-10' />
            </div>
          </button>
          {/* End Gallery */}
        </div>
      </div>
    </div>
  )
}

const ShowPhoto = ({ mail, handleMailIndex, handleRenderIndex, mailIndex, typewritingSoundEffect }) => {
  const [isRendered, setIsRendered] = useState(false)
  const [displayText_, setDisplayText_] = useState('');
  const [isFullTextDisplayed, setIsFullTextDisplayed] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setIsRendered(true)
    handleTypeWriterEffect();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, []); // Re-run effect if `mail` changes

  const handleTypeWriterEffect = () => {
    clearInterval(intervalRef.current); // Clear any existing interval
    setDisplayText_('');
    setIsFullTextDisplayed(false)
    typewritingSoundEffect(true)
    let currentIndex = 0;

    const typeWriterEffect = () => {
      if (currentIndex < (mail?.text || '').length) {
        setDisplayText_(mail.text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalRef.current);
        setIsFullTextDisplayed(true)
        typewritingSoundEffect(false)
      }
    };

    intervalRef.current = setInterval(typeWriterEffect, 60);
  };

  if (!mail) {
    return null; // Early return if mail is undefined
  }

  return (
    <div className='absolute bg-[rgba(238,99,160)] flex flex-col md:flex-row justify-center items-center w-full min-h-screen z-30 gap-10'>
      <button className='absolute top-4 md:top-14 left-4 md:left-14' onClick={() => { handleMailIndex(0); handleRenderIndex(mailIndex - 1); }}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>
      <img src="img/gallery/wave-top-left.png" alt="" className='absolute w-full -top-32 md:-top-[650px] -left-20 md:-left-[600px] unselectable -z-20 scale-[2.0] md:scale-100' />
      <img src="img/music/wave-bottom-right.png" alt="" className='absolute  -bottom-32 md:-bottom-[800px] -right-40 md:-right-60 unselectable -z-20 scale-[2.0] md:scale-100' />
      <div className={`w-[300px] md:w-[600px] h-full flex items-center rounded-2xl overflow-hidden duration-300 ${isRendered ? 'scale-100 translate-y-0' : 'scale-50 translate-x-0 translate-y-40 md:translate-y-0 md:translate-x-96'}`}>
        <img src={mail?.image} alt="" />
      </div>
      <div className={`${isRendered ? 'translate-x-40 md:translate-x-0 translate-y-12 visible' : '-translate-y-20 translate-x-20 md:translate-x-40 invisible'} absolute -z-20  md:-translate-y-32 left-10 rotate-[160deg] md:-rotate-[30deg] duration-500 delay-200`}>
        <img src="img/normalface.png" alt="" className='w-[180px] md:w-[350px] breathe' />
      </div>
      <div className={`${isRendered ? '-translate-y-[270px] md:-translate-y-60 translate-x-0 visible' : 'translate-y-0 md:-translate-x-80 invisible'} absolute duration-700 delay-300 -z-20 md:right-20 rotate-0 md:rotate-[30deg]`}>
        <img src="img/normalface.png" alt="" className='w-[150px] md:w-[350px] breathe' />
      </div>
      <div className={`${isRendered ? 'translate-x-0 translate-y-0 md:translate-y-0 visible' : 'translate-x-0 -translate-y-40 md:translate-y-0 md:-translate-x-80 invisible'}  -z-10 duration-300 delay-200 text-white rounded w-[250px] md:w-[650px] flex relative`}>
        <div className='absolute -z-10 translate-x-3 -translate-y-3'>
          <img src="img/gallery_box_1.webp" alt="" className='w-[250px] md:w-[650px]' />
        </div>
        <div className='flex items-center justify-center'>
          <img src="img/gallery_box_2.webp" alt="" className='w-[250px] md:w-[650px]' />
          <span className='absolute -translate-y-12 md:-translate-y-32 font-bold text-lg md:text-5xl font-introrust text-[#EE63A0] text-center'>{mail?.title}</span>
          <span className='absolute -translate-y-[50px] md:-translate-y-[130px] -translate-x-[2px] md:-translate-x-1 font-introrust font-bold text-lg md:text-5xl text-[#EE63A0] text-transparent mobile-black-splice-text md:black-splice-text text-center'>{mail?.title}</span>
          <span className='absolute w-[200px] md:w-[500px] font-fredoka text-[#702c2b] text-sm md:text-3xl font-semibold text-left'>{displayText_}</span>
          <span className='absolute translate-x-10 translate-y-[50px] md:translate-y-32  md:translate-x-40 font-bold text-md md:text-5xl text-[#EE63A0] font-introrust'>{mail?.date}</span>
          <span className='absolute translate-x-[38px] translate-y-12 md:translate-y-32 md:translate-x-[156px] font-bold text-md md:text-5xl text-[#EE63A0] font-introrust text-transparent mobile-black-splice-text md:black-splice-text'>{mail?.date}</span>
        </div>
      </div>
    </div>
  );
};

export default GallerySection