import React, { useEffect, useRef, useState } from 'react';
import { TbArrowBackUp } from 'react-icons/tb';
import MainConfig from '../common/main';
import { GiftConfig, VideoSource } from '../common/gift';

const GiftSection = ({ handleCloseSection, clickSoundEffect, typewritingSoundEffect }) => {
  const [currentPage, setCurrentPage] = useState(0); // 0 for FirstPage, 1 for SecondPage


  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment page index
    typewritingSoundEffect(false)
    clickSoundEffect();
  };

  const handleBack = () => {
    setCurrentPage((prevPage) => prevPage - 1); // Decrement page index
    typewritingSoundEffect(false)
    clickSoundEffect();
  };


  return (
    <>
      {currentPage === 0 && <FirstPage handleNext={handleNext} clickSoundEffect={clickSoundEffect} handleCloseSection={handleCloseSection} typewritingSoundEffect={typewritingSoundEffect} />}
      {currentPage === 1 && <SecondPage handleBack={handleBack} handleNext={handleNext} clickSoundEffect={clickSoundEffect} typewritingSoundEffect={typewritingSoundEffect} />}
      {currentPage === 2 && <QuestionPage handleBack={handleBack} handleNext={handleNext} handleCloseSection={handleCloseSection} clickSoundEffect={clickSoundEffect} typewritingSoundEffect={typewritingSoundEffect} />}
    </>
  );
};

const FirstPage = ({ handleNext, handleCloseSection, typewritingSoundEffect }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [mailIndex, setMailIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef(null);
  const [blink, setBlink] = useState(false);

  const mails = [
    { text: `Hai, buka ini terakhir yaa` },
  ];

  useEffect(() => {
    setIsRendered(true);
    handleTypeWriterEffect(0);

    const intervalId = setInterval(() => {
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 500);
    }, 2000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(intervalId);
    }
  }, []);

  const stopTypewriterEffect = () => {
    clearInterval(intervalRef.current);
    setDisplayText(mails[mailIndex].text);
    typewritingSoundEffect(false);
  };

  const handleTypeWriterEffect = (valueMailIndex) => {
    clearInterval(intervalRef.current); // Clear any existing interval
    setMailIndex(valueMailIndex);
    setDisplayText('');
    typewritingSoundEffect(true)
    let currentIndex = 0;

    const typeWriterEffect = () => {
      if (currentIndex <= mails[valueMailIndex].text.length) {
        setDisplayText(mails[valueMailIndex].text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalRef.current);
        typewritingSoundEffect(false)
      }
    };

    intervalRef.current = setInterval(typeWriterEffect, 60);
  };

  return (
    <div className='absolute w-full min-h-screen bg-[rgba(238,99,160)] z-30 flex justify-center items-center backdrop-blur-sm'>
      <button className='absolute top-14 left-14 ' onClick={() => handleCloseSection()}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>

      <img src="img/gallery/wave-top-left.png" alt="" className='absolute md:hidden w-full -top-32 md:-top-[650px] -left-20 md:-left-[600px] unselectable -z-10 scale-[2.0] md:scale-100' />
      <img src="img/music/wave-bottom-right.png" alt="" className='absolute md:hidden -bottom-32 md:-bottom-[800px] -right-40 md:-right-60 unselectable -z-10 scale-[2.0] md:scale-100' />

      <div className='absolute w-screen h-screen bg-black bg-opacity-50 -z-10'></div>

      <div className='absolute w-48 md:w-[600px] h-36 md:h-[450px] flex flex-col items-center justify-center mb-80 md:mb-0 md:top-auto md:bottom-20 md:left-40 -z-10 bounce-flip1'>
        <img src='img/blankface.png' alt='' className='w-full h-full absolute z-20 left-0 top-0' />
        <div className='absolute h-40 md:h-[120px] flex items-center gap-10 md:gap-24 -translate-y-4  md:-translate-y-16 z-30 '>
          <img src={`${blink ? 'img/blink_eye.png' : 'img/eye.webp'}`} className={`w-8 md:w-16 md:h-auto ${blink ? 'md:h-5' : 'md:h-14'}`} />
          <img src={`${blink ? 'img/blink_eye.png' : 'img/eye.webp'}`} className={`w-8 md:w-16 md:h-auto ${blink ? 'md:h-5' : 'md:h-14'}`} />
        </div>
        <div className='absolute translate-y-4 z-20 '>
          <img src='img/love.webp' className='w-8 md:w-24 aspect-square breathe ' />
        </div>
        <div className='absolute flex gap-10 md:gap-40 translate-y-4 z-20 '>
          <img src='img/left_mustache.png' className='w-14 h-7 md:w-40 md:h-20 breathe ' />
          <img src='img/right_mustache.png' className='w-14 h-7 md:w-40 md:h-20 breathe ' />
        </div>
        <div className='absolute flex gap-96 translate-y-12 md:translate-y-32 z-20 '>
          <img src='img/mouth.png' className='w-10 md:w-28 h-4 md:h-auto' />
        </div>
      </div>

      <div className='absolute mb-60 md:mb-0 md:left-28 md:bottom-4 md:translate-y-0 md:w-[700px] w-56 h-20 bg-black rounded-[100%] blur-2xl translate-y-7 -z-30'></div>

      <button onClick={stopTypewriterEffect} className='relative md:absolute z-20 md:scale-150 translate-x-0 md:translate-x-96 translate-y-0 md:-translate-y-20 font-fredoka text-[#702c2b]'>
        <img src='img/mail_box.webp' alt='' className='w-[350px] md:w-[480px]' />
        <div className='absolute top-[1vw] md:top-2 left-[25%] sm:text-base md:text-xl mobile-stroke-text md:stroke-text font-introrust'>
          <span className='font-bold text-white text-sm md:text-xl'>HAI </span>
          <span className='font-bold text-[#F64C96] text-sm md:text-xl'>{MainConfig.aliasname}</span>
        </div>
        <span className='absolute w-[300px] md:w-[450px] top-20 md:top-28 left-7 text-xl md:text-3xl pr-4 md:pr-7 font-bold text-center'>{displayText}</span>
      </button>

      {mailIndex < mails.length && (
        <div className='absolute w-full px-0 md:px-14 translate-x-0 md:translate-x-96 translate-y-44 md:translate-y-48 justify-center flex flex-row gap-2 md:gap-7 font-fredoka text-[#702c2b] font-bold scale-[80%]'>
          {/* Render buttons conditionally based on current mailIndex */}
          {mailIndex === 0 && (
            <>
              <button onClick={handleCloseSection} className='w-full md:w-96 h-14 py-8 border-[5px] border-[rgba(112,44,43)] bg-[rgb(243,215,212)] rounded-2xl flex items-center justify-center active:opacity-70 text-2xl'>
                Kembali
              </button>
              <button onClick={handleNext} className='w-full md:w-96 h-14 py-8 bg-[rgb(243,215,212)] border-[5px] border-[rgba(112,44,43)] rounded-2xl flex items-center justify-center active:opacity-70 text-2xl'>
                Lanjut
              </button>
            </>
          )}
        </div>
      )}

    </div>
  );
};

const SecondPage = ({ handleBack, handleNext, typewritingSoundEffect }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [mailIndex, setMailIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef(null);
  const [blink, setBlink] = useState(false);
  const [isFullTextDisplayed, setIsFullTextDisplayed] = useState(false);
  const mails = [
    { text: `Sebelum kamu dapet hadiah ada beberapa pertanyaan nih yang harus kamu jawab!` },
  ];

  useEffect(() => {
    setIsRendered(true);
    handleTypeWriterEffect(0);

    const intervalId = setInterval(() => {
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 500);
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const stopTypewriterEffect = () => {
    typewritingSoundEffect(false);
    if (!isFullTextDisplayed) {
      // If the full text is not displayed yet, show it
      clearInterval(intervalRef.current);
      setDisplayText(mails[mailIndex].text);
      setIsFullTextDisplayed(true); // Update state to indicate full text is displayed
    } else {
      // If full text is already displayed, show the answer page
      handleNext();
    }
  };
  const handleTypeWriterEffect = (valueMailIndex) => {
    clearInterval(intervalRef.current); // Clear any existing interval
    setMailIndex(valueMailIndex);
    setDisplayText('');
    typewritingSoundEffect(true)
    let currentIndex = 0;

    const typeWriterEffect = () => {
      if (currentIndex <= mails[valueMailIndex].text.length) {
        setDisplayText(mails[valueMailIndex].text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalRef.current);
        typewritingSoundEffect(false)
      }
    };

    intervalRef.current = setInterval(typeWriterEffect, 60);
  };


  return (
    <div className='absolute w-full min-h-screen bg-[rgba(238,99,160)] z-30 flex justify-center items-center backdrop-blur-sm'>
      <button className='absolute top-14 left-14 hidden md:block' onClick={() => handleBack()}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>
      <img src="img/gallery/wave-top-left.png" alt="" className='absolute md:hidden w-full -top-32 md:-top-[650px] -left-20 md:-left-[600px] unselectable -z-10 scale-[2.0] md:scale-100' />
      <img src="img/music/wave-bottom-right.png" alt="" className='absolute md:hidden -bottom-32 md:-bottom-[800px] -right-40 md:-right-60 unselectable -z-10 scale-[2.0] md:scale-100' />

      <div className='absolute w-screen h-screen bg-black bg-opacity-50 -z-10'></div>

      <div className='absolute w-48 md:w-[420px] h-36 md:h-[330px] flex flex-col items-center justify-center top-44 md:top-auto md:-translate-x-96 md:-translate-y-64 -left-10 md:left-auto -rotate-12 -z-10 '>
        <img src='img/blankface.png' alt='' className='w-full h-full absolute z-20 left-0 top-0' />
        <div className='absolute h-40 md:h-[120px] flex items-center gap-10 md:gap-24 -translate-y-4  md:-translate-y-12 z-30 '>
          <img src={`${blink ? 'img/blink_eye.png' : 'img/eye.webp'}`} className={`w-8 md:w-16 md:h-auto ${blink ? 'md:h-5' : 'md:h-14'}`} />
          <img src={`${blink ? 'img/blink_eye.png' : 'img/eye.webp'}`} className={`w-8 md:w-16 md:h-auto ${blink ? 'md:h-5' : 'md:h-14'}`} />
        </div>
        <div className='absolute translate-y-4 z-20 '>
          <img src='img/love.webp' className='w-8 md:w-16 aspect-square breathe ' />
        </div>
        <div className='absolute flex gap-10 md:gap-24 translate-y-4 z-20 '>
          <img src='img/left_mustache.png' className='w-14 h-7 md:w-32 md:h-14 breathe ' />
          <img src='img/right_mustache.png' className='w-14 h-7 md:w-32 md:h-14 breathe ' />
        </div>
        <div className='absolute flex gap-96 translate-y-12 md:translate-y-24 z-20 '>
          <img src='img/mouth.png' className='w-10 md:w-28 h-4 md:h-auto' />
        </div>
      </div>

      <div className='absolute w-48 md:w-[420px] h-36 md:h-[330px] flex flex-col items-center justify-center top-[450px] md:top-auto md:translate-y-32 md:translate-x-[500px] -right-10 md:right-auto rotate-[20deg] -z-10 '>
        <img src='img/blankface.png' alt='' className='w-full h-full absolute z-20 left-0 top-0' />
        <div className='absolute h-40 md:h-[120px] flex items-center gap-10 md:gap-24 -translate-y-4  md:-translate-y-12 z-30 '>
          <img src={`${blink ? 'img/blink_eye.png' : 'img/eye.webp'}`} className={`w-8 md:w-16 md:h-auto ${blink ? 'md:h-5' : 'md:h-14'}`} />
          <img src={`${blink ? 'img/blink_eye.png' : 'img/eye.webp'}`} className={`w-8 md:w-16 md:h-auto ${blink ? 'md:h-5' : 'md:h-14'}`} />
        </div>
        <div className='absolute translate-y-4 z-20 '>
          <img src='img/love.webp' className='w-8 md:w-16 aspect-square breathe ' />
        </div>
        <div className='absolute flex gap-10 md:gap-24 translate-y-4 z-20 '>
          <img src='img/left_mustache.png' className='w-14 h-7 md:w-32 md:h-14 breathe ' />
          <img src='img/right_mustache.png' className='w-14 h-7 md:w-32 md:h-14 breathe ' />
        </div>
        <div className='absolute flex gap-96 translate-y-12 md:translate-y-24 z-20 '>
          <img src='img/mouth.png' className='w-10 md:w-28 h-4 md:h-auto' />
        </div>
      </div>
      <button onClick={stopTypewriterEffect} className='relative md:absolute z-20 md:scale-150 translate-x-0 translate-y-0 font-fredoka text-[#702c2b]'>
        <img src='img/mail_box.webp' alt='' className='w-[350px] md:w-[480px]' />
        <div className='absolute top-[1vw] md:top-2 left-[25%] sm:text-base md:text-xl mobile-stroke-text md:stroke-text font-introrust'>
          <span className='font-bold text-white text-sm md:text-xl'>HAI </span>
          <span className='font-bold text-[#F64C96] text-sm md:text-xl'>{MainConfig.aliasname}</span>
        </div>
        <span className='absolute w-[300px] md:w-[450px] top-14 md:top-20 left-7 text-xl md:text-3xl pr-4 md:pr-7 font-bold text-center'>{displayText}</span>
      </button>
    </div>
  );
};
const QuestionPage = ({ handleBack, handleCloseSection, clickSoundEffect, typewritingSoundEffect }) => {
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef(null);
  const [blink, setBlink] = useState(false);
  const [showAnswerPage, setShowAnswerPage] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isFullTextDisplayed, setIsFullTextDisplayed] = useState(false);

  const [correctIndex, setCorrectIndex] = useState(0);
  const [showCorrectMark, setShowCorrectMark] = useState(false);
  const [showWrongMark, setShowWrongMark] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [showGift, setShowGift] = useState(false);

  const [questionIndex, setQuestionIndex] = useState(0)
  let questions = GiftConfig

  useEffect(() => {
    handleTypeWriterEffect(0); // Start typewriter effect with the first message
    setIsRendered(true);

    setTimeout(() => {
      window.scrollTo(0, 1);
      handleBlink();
    }, 0);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleAnswer = (index) => {
    if (isProcessing) return;

    const answer = questions[questionIndex].answers[index];

    // Check Answer
    if (answer.correct) {
      setCorrectIndex(index)
      setShowWrongMark(false)
      setIsProcessing(true);
      if (questionIndex < (questions.length - 1)) {
        setShowCorrectMark(true)
        setTimeout(() => {
          setShowCorrectMark(false)
          setShowAnswerPage(false)
          setQuestionIndex((questionIndex) => questionIndex + 1)
          handleTypeWriterEffect(questionIndex + 1)


          setIsProcessing(false)
        }, 1000);
      } else {
        setShowGift(true)
      }
    } else {
      if (questionIndex >= (questions.length - 1)) {
        handleCloseSection()
      }
      setShowWrongMark(true)
      setShowCorrectMark(false)
    }
  }

  const handleBlink = () => {
    setInterval(() => {
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 500);
    }, 4000);
  };

  const stopTypewriterEffect = () => {
    typewritingSoundEffect(false);
    if (!isFullTextDisplayed) {
      // If the full text is not displayed yet, show it
      clearInterval(intervalRef.current);
      setDisplayText(questions[questionIndex].question);
      setIsFullTextDisplayed(true); // Update state to indicate full text is displayed
    } else {
      // If full text is already displayed, show the answer page
      setShowAnswerPage(true);
    }
  };


  const handleTypeWriterEffect = (qIndex) => {
    clearInterval(intervalRef.current); // Clear any existing interval
    setQuestionIndex(qIndex);
    setDisplayText('');
    setIsFullTextDisplayed(false); // Reset the full text display flag
    typewritingSoundEffect(true)
    let currentIndex = 0;

    const typeWriterEffect = () => {
      if (currentIndex < questions[qIndex].question.length) {
        setDisplayText(questions[qIndex].question.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalRef.current);
        setIsFullTextDisplayed(true); // Update state to indicate full text is displayed
        typewritingSoundEffect(false)
      }
    };

    intervalRef.current = setInterval(typeWriterEffect, 60);
  };

  if (showGift) {
    return (
      <div className='absolute w-full min-h-screen bg-[#6c2e49] z-30 flex justify-center items-center backdrop-blur-sm'>
        <button className='absolute top-14 left-14 z-50' onClick={() => handleBack()}>
          <TbArrowBackUp className='text-white w-10 h-10' />
        </button>
        <img src="img/gallery/wave-top-left.png" alt="" className='absolute md:hidden w-full -top-32 md:-top-[650px] -left-20 md:-left-[600px] unselectable -z-10 scale-[2.0] md:scale-100' />
        <img src="img/music/wave-bottom-right.png" alt="" className='absolute md:hidden  -bottom-32 md:-bottom-[800px] -right-40 md:-right-60 unselectable -z-10 scale-[2.0] md:scale-100' />

        <div className='absolute w-screen h-screen bg-black bg-opacity-50 -z-10'></div>

        <button
          onClick={() => setShowVideo(true)}
          className={`${isRendered ? 'scale-[2] md:scale-[4] visible' : 'translate-x-0'} absolute flex justify-center items-center w-40 h-40 active:opacity-90 duration-1000 ribbon-shake`}
        >
          <img src='img/gift.png' className='w-14 z-20 translate-x-1' />
        </button>
        <div className={` ${showVideo ? '' : 'hidden'} w-[90%] z-20 md:w-[70%]`}>
          <video src={VideoSource} controls autoPlay></video>
        </div>
      </div>
    );
  }

  return (
    <div className='absolute w-full min-h-screen bg-[rgba(238,99,160)] z-30 flex justify-center items-center backdrop-blur-sm'>
      <button className='absolute top-14 left-14 block' onClick={handleCloseSection}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>
      <img src="img/gallery/wave-top-left.png" alt="" className='absolute md:hidden w-full -top-32 md:-top-[650px] -left-20 md:-left-[600px] unselectable -z-10 scale-[2.0] md:scale-100' />
      <img src="img/music/wave-bottom-right.png" alt="" className='absolute md:hidden  -bottom-32 md:-bottom-[800px] -right-40 md:-right-60 unselectable -z-10 scale-[2.0] md:scale-100' />

      <div className='absolute w-screen h-screen bg-black bg-opacity-50 -z-10'></div>

      <button
        onClick={() => handleCloseSection(handleCloseSection)}
        className={`${isRendered ? "-translate-y-48 md:translate-y-0 md:translate-x-0 " : ""
          } invisible absolute flex justify-center items-center w-40 h-40 active:opacity-90 duration-300`}
      >
        <img src="img/gift.png" className="w-14 z-10 translate-x-1" />
      </button>


      {!showAnswerPage && (
        <div className='flex flex-col justify-center items-center'>
          <div className='absolute w-48 md:w-[480px] h-36 md:h-[380px] flex flex-col items-center justify-center mb-72 md:top-auto md:mb-[500px] -z-10 bounce-flip1'>
            <img src='img/blankface.png' alt='' className='w-full h-full absolute z-20 left-0 top-0 ' />
            <div className='absolute h-40 md:h-[120px] flex items-center gap-0 md:gap-7 -translate-y-4  md:-translate-y-20 z-30 '>
              <img src={`img/star.png`} className={`w-20 md:w-40 -mr-2 md:-mr-6 md:h-auto`} />
              <img src={`img/star.png`} className={`w-20 md:w-40 -ml-2 md:-ml-6 md:h-auto`} />
            </div>
            <div className='absolute translate-y-4 z-20 '>
              <img src='img/love.webp' className='w-8 md:w-16 aspect-square breathe ' />
            </div>
            <div className='absolute flex gap-10 md:gap-24 translate-y-4 z-20 '>
              <img src='img/left_mustache.png' className='w-14 h-7 md:w-32 md:h-14 breathe ' />
              <img src='img/right_mustache.png' className='w-14 h-7 md:w-32 md:h-14 breathe ' />
            </div>
            <div className='absolute flex gap-96 translate-y-12 md:translate-y-24 z-20 '>
              <img src='img/cute_mouth.png' className='w-10 md:w-20 h-6 md:h-auto' />
            </div>
          </div>

          <button onClick={stopTypewriterEffect} className='relative md:absolute z-20 md:scale-150 translate-y-0 md:translate-y-32  font-fredoka text-[#702c2b]'>
            <img src='img/mail_box.webp' alt='' className='w-[350px] md:w-[480px]' />
            <div className='absolute top-[1vw] md:top-2 left-[25%] sm:text-base md:text-xl mobile-stroke-text md:stroke-text font-introrust'>
              <span className='font-bold text-white text-sm md:text-xl'>HAI </span>
              <span className='font-bold text-[#F64C96] text-sm md:text-xl'>{MainConfig.aliasname}</span>
            </div>
            <span className='absolute w-[300px] md:w-[450px] top-[10vw] h-32 flex justify-center items-center md:top-[75px] left-7 text-xl md:text-3xl pr-4 md:pr-7 font-bold text-center'>{displayText}</span>
          </button>
        </div>
      )}

      {showAnswerPage && (
        <div className='flex justify-center items-center'>
          <div className='relative w-48 md:w-[500px] h-36 md:h-[400px] flex flex-col items-center justify-center -top-20 md:-top-40 -z-10 bounce-flip1'>
            <img src='img/blankface.png' alt='' className='w-full h-full absolute z-20 left-0 top-0 ' />
            <div className='absolute h-40 md:h-[120px] flex items-center gap-10 md:gap-20 -translate-y-4  md:-translate-y-14 z-30 '>
              <img src={`${blink ? 'img/blink_eye.png' : 'img/eye.webp'}`} className={`w-8 md:w-16 md:h-auto ${blink ? 'md:h-5' : 'md:h-14'}`} />
              <img src={`${blink ? 'img/blink_eye.png' : 'img/eye.webp'}`} className={`w-8 md:w-16 md:h-auto ${blink ? 'md:h-5' : 'md:h-14'}`} />
            </div>
            <div className='absolute translate-y-4 md:translate-y-7  z-20 '>
              <img src='img/love.webp' className='w-8 md:w-16 aspect-square breathe ' />
            </div>
            <div className='absolute flex gap-10 md:gap-24 translate-y-4 z-20 '>
              <img src='img/left_mustache.png' className='w-14 h-7 md:w-32 md:h-14 breathe ' />
              <img src='img/right_mustache.png' className='w-14 h-7 md:w-32 md:h-14 breathe ' />
            </div>
            <div className='absolute flex gap-96 translate-y-12 md:translate-y-24 z-20 '>
              <img src='img/mouth.png' className='w-10 md:w-20 h-4 md:h-auto' />
            </div>
          </div>
          <div className='absolute w-52 md:w-[550px] h-10 md:h-20 bg-black rounded-[100%] blur-xl -z-20 md:translate-y-28'></div>
          <div className='absolute w-fill px-0 md:px-14  justify-center grid grid-cols-2 gap-2 md:gap-7 md:gap-x-20 translate-y-28 md:translate-y-40 font-fredoka text-[#702c2b] font-bold'>
            {showWrongMark && (
              <div className='absolute bg-red-500 w-64 py-4 md:py-6 text-xl border-[5px] border-[rgba(112,44,43)] rounded-[3rem]  translate-y-40 md:translate-y-60'>
                <span className='text-white font-bold text-center'>❌ Salah! Coba lagi</span>
              </div>
            )}
            {questions[questionIndex].answers.map((answer, index) => (
              <button onClick={() => { handleAnswer(index); clickSoundEffect(); }} className='relative w-40 md:w-96 px-2 md:px-0 py-4 md:py-6 text-lg md:text-3xl bg-[rgb(243,215,212)] border-[5px] border-[rgba(112,44,43)] rounded-[3rem] active:opacity-70'>
                {(showCorrectMark && correctIndex === index) &&
                  (
                    <span className='absolute -left-5 -top-4 md:-top-14'>
                      <img src="img/checklist.png" alt="" className='w-20 md:w-40 h-auto' />
                    </span>
                  )
                }
                {answer.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftSection;
