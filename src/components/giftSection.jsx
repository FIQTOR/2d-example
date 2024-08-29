import React, { useEffect, useRef, useState } from 'react';
import { TbArrowBackUp, TbCircleArrowLeft, TbCircleArrowRight } from 'react-icons/tb';

const GiftSection = ({ SetState, handleCloseSection }) => {
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
      {currentPage === 1 && <SecondPage SetState={SetState} handleBack={handleBack} handleNext={handleNext} />}
      {currentPage === 2 && <QuestionPage SetState={SetState} handleBack={handleBack} handleNext={handleNext} handleCloseSection={handleCloseSection} />}
    </div>
  );
};

const FirstPage = ({ handleNext, handleCloseSection }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [mailIndex, setMailIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef(null);
  const [blink, setBlink] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [correctAll, setCorrectAll] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const mails = [
    { text: `Hai, buka ini terakhir yaa` },
  ];

  const stopTypewriterEffect = () => {
    clearInterval(intervalRef.current);
    setDisplayText(mails[mailIndex].text);
  };

  const handleTypeWriterEffect = (valueMailIndex) => {
    clearInterval(intervalRef.current); // Clear any existing interval
    setMailIndex(valueMailIndex);
    setDisplayText('');
    let currentIndex = 0;

    const typeWriterEffect = () => {
      if (currentIndex <= mails[valueMailIndex].text.length) {
        setDisplayText(mails[valueMailIndex].text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalRef.current);
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
      <button onClick={stopTypewriterEffect} className='absolute z-20 md:scale-150 translate-x-96 -translate-y-20 font-fredoka text-[#702c2b]'>
        <img src='img/mail_box.webp' alt='' className='w-[480px]' />
        <div className='absolute top-[8px] left-24'>
          <span className='font-bold text-white text-xl'>FOR </span>
          <span className='font-bold text-[#F64C96] text-xl'>NANA</span>
        </div>
        <span className='absolute w-[450px] top-20 left-7 text-3xl pr-7 font-bold text-center'>{displayText}</span>
      </button>

      {mailIndex < mails.length && (
        <div className='absolute w-full px-14 translate-x-96 translate-y-44 md:translate-y-48 justify-center flex flex-col md:flex-row gap-2 md:gap-7 font-fredoka text-[#702c2b] font-bold'>
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

const SecondPage = ({ SetState, handleBack, handleNext }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [mailIndex, setMailIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef(null);
  const [blink, setBlink] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [correctAll, setCorrectAll] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isFullTextDisplayed, setIsFullTextDisplayed] = useState(false);


  const mails = [
    { text: `Sebelum kamu dapet hadiah ada beberapa pertanyaan nih yang harus kamu jawab!` },
  ];

  const stopTypewriterEffect = () => {
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
    let currentIndex = 0;

    const typeWriterEffect = () => {
      if (currentIndex <= mails[valueMailIndex].text.length) {
        setDisplayText(mails[valueMailIndex].text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalRef.current);
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
      <button className='absolute top-14 left-14 hidden md:block' onClick={() => handleBack()}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>
      <div className='absolute w-[420px] h-[330px] flex flex-col items-center justify-center -top-10 left-80 -rotate-12 -z-10 '>
        <img src='img/blankface.png' alt='' className='w-full h-full absolute z-20 left-0 top-20 ' />
        <div className='relative h-[150px] flex items-center gap-60 md:gap-[80px] translate-y-[120px] left-0 z-20 '>
          <img src={`${blink ? 'img/blink_eye.png' : 'img/eye.webp'}`} className={`w-14 md:w-[4vw] md:h-auto ${blink ? 'h-5' : 'h-14'}`} />
          <img src={`${blink ? 'img/blink_eye.png' : 'img/eye.webp'}`} className={`w-14 md:w-[4vw] md:h-auto ${blink ? 'h-5' : 'h-14'}`} />
        </div>
        <div className='relative left-0 translate-y-24 z-20 '>
          <img src='img/love.webp' className='w-20 md:w-[4.5vw] aspect-square breathe ' />
        </div>
        <div className='relative flex gap-[100px] md:gap-24 left-0 translate-y-[10px] z-20 '>
          <img src='img/left_mustache.png' className='w-32 h-16 md:w-[6vw] md:h-auto breathe ' />
          <img src='img/right_mustache.png' className='w-32 h-16 md:w-[6vw] md:h-auto breathe ' />
        </div>
        <div className='relative flex gap-96 translate-y-6 left-0 z-20 '>
          <img src='img/mouth.png' className='w-20 md:w-[6vw] h-7 md:h-auto' />
        </div>
      </div>
      <div className='absolute w-[420px] h-[330px] flex flex-col items-center justify-center top-96 right-48 rotate-[30deg] -z-10 '>
        <img src='img/blankface.png' alt='' className='w-full h-full absolute z-20 left-0 top-20 ' />
        <div className='relative h-[150px] flex items-center gap-60 md:gap-[80px] translate-y-[120px] left-0 z-20 '>
          <img src={`${blink ? 'img/blink_eye.png' : 'img/eye.webp'}`} className={`w-14 md:w-[4vw] md:h-auto ${blink ? 'h-5' : 'h-14'}`} />
          <img src={`${blink ? 'img/blink_eye.png' : 'img/eye.webp'}`} className={`w-14 md:w-[4vw] md:h-auto ${blink ? 'h-5' : 'h-14'}`} />
        </div>
        <div className='relative left-0 translate-y-24 z-20 '>
          <img src='img/love.webp' className='w-20 md:w-[4.5vw] aspect-square breathe ' />
        </div>
        <div className='relative flex gap-[100px] md:gap-24 left-0 translate-y-[10px] z-20 '>
          <img src='img/left_mustache.png' className='w-32 h-16 md:w-[6vw] md:h-auto breathe ' />
          <img src='img/right_mustache.png' className='w-32 h-16 md:w-[6vw] md:h-auto breathe ' />
        </div>
        <div className='relative flex gap-96 translate-y-6 left-0 z-20 '>
          <img src='img/mouth.png' className='w-20 md:w-[6vw] h-7 md:h-auto' />
        </div>
      </div>
      <button onClick={stopTypewriterEffect} className='absolute z-20 md:scale-150 font-fredoka text-[#702c2b]'>
        <img src='img/mail_box.webp' alt='' className='w-[480px]' />
        <div className='absolute top-[8px] left-24 '>
          <span className='font-bold text-white text-xl '>FOR </span>
          <span className='font-bold text-[#F64C96] text-xl'>NANA</span>
        </div>
        <span className='w-[450px] absolute top-20 left-7 text-3xl pr-7 font-bold text-center'>{displayText}</span>
      </button>
    </div>
  );
};
const QuestionPage = ({ SetState, handleBack, handleNext, handleCloseSection }) => {
  const [mailIndex, setMailIndex] = useState(0); // Track the current mail index
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef(null);
  const [blink, setBlink] = useState(false);
  const [showCorrectMark, setShowCorrectMark] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [correctAll, setCorrectAll] = useState(false);
  const [showAnswerPage, setShowAnswerPage] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isFullTextDisplayed, setIsFullTextDisplayed] = useState(false);
  const mails = [
    { text: `TANGGAL JADIAN KITA?` },
    { text: `Makanan Favorit kita?` },
    { text: `First date place?` },
    { text: `Selamat Kamu Berhasil, sekarang hadiahnya boleh kamu ambil` },
  ];

  const stopTypewriterEffect = () => {
    if (!isFullTextDisplayed) {
      // If the full text is not displayed yet, show it
      clearInterval(intervalRef.current);
      setDisplayText(mails[mailIndex].text);
      setIsFullTextDisplayed(true); // Update state to indicate full text is displayed
    } else {
      // If full text is already displayed, show the answer page
      setShowAnswerPage(true);
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
    handleTypeWriterEffect(0); // Start typewriter effect with the first message
    setIsRendered(true);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 500);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleAnswer = (questionIndex, answer) => {
    const correctAnswers = ['29 Nov 2023', 'Sushi', 'Geisha'];
    if (correctAnswers[questionIndex] === answer) {
      setShowCorrectMark(true); // Show the correct answer mark
      setShowWrong(false); // Hide the wrong answer message

      setTimeout(() => {
        if (questionIndex === mails.length - 1) {
          setCorrectAll(true); // User has answered all questions correctly
        } else {
          setShowAnswerPage(false); // Hide the answer page
          handleTypeWriterEffect(mailIndex + 1); // Move to the next mail index
        }
        setShowCorrectMark(false); // Hide the correct answer mark after 1 second
      }, 1000); // Delay of 1 second
    } else {
      setShowWrong(true); // Show wrong answer message
    }
  };

  if (correctAll) {
    return (
      <div className='absolute w-full min-h-screen bg-black bg-opacity-70 z-30 flex justify-center items-center backdrop-blur-sm'>
        <button className='absolute top-14 left-14 z-50' onClick={() => handleBack()}>
          <TbArrowBackUp className='text-white w-10 h-10' />
        </button>

        <button
          onClick={() => setShowVideo(true)}
          className={`${isRendered ? 'scale-[8] visible' : 'translate-x-0'} absolute flex justify-center items-center w-40 h-40 active:opacity-90 duration-1000 ribbon-shake`}
        >
          <img src='img/gift.png' className='w-14 z-20 translate-x-1' />
        </button>
        <div className={` ${showVideo ? '' : 'hidden'} w-[90%] z-20 md:w-[70%]`}>
          <video src='video/2796268-uhd_3840_2160_25fps.mp4' controls autoPlay></video>
        </div>
      </div>
    );
  }

  return (
    <div className='absolute w-full min-h-screen bg-[rgba(238,99,160)] z-30 flex justify-center items-center backdrop-blur-sm'>
      <button className='absolute top-14 left-14 hidden md:block' onClick={handleCloseSection}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>
      <button
        onClick={() => handleCloseSection(handleCloseSection)}
        className={`${isRendered ? "-translate-y-48 md:translate-y-0 md:translate-x-0 " : ""
          } invisible absolute flex justify-center items-center w-40 h-40 active:opacity-90 duration-300`}
      >
        <img src="img/gift.png" className="w-14 z-10 translate-x-1" />
      </button>


      {!showAnswerPage && (
        <div className='flex justify-center items-center'>
          <div className='relative  w-[480px] h-[380px] flex flex-col items-center justify-center -top-80 left-0 -z-10 bounce-flip1'>
            <img src='img/blankface.png' alt='' className='w-full h-full absolute z-20 left-0 top-20 ' />
            <div className='relative h-[120px] flex items-center gap-60 md:gap-0 translate-y-[130px] left-0 z-20 '>
              <img src={`img/star.png`} className={`w-14 md:w-[12vw] md:h-auto -mr-6 breathe  ${blink ? 'h-5' : 'h-14'}`} />
              <img src={`img/star.png`} className={`w-14 md:w-[12vw] md:h-auto -ml-6 breathe ${blink ? 'h-5' : 'h-14'}`} />
            </div>
            <div className='relative left-0 translate-y-[130px] z-20 '>
              <img src='img/love.webp' className='w-20 md:w-[5vw] aspect-square breathe ' />
            </div>
            <div className='relative flex gap-[100px] md:gap-40 left-0 translate-y-[30px] z-20 '>
              <img src='img/left_mustache.png' className='w-32 h-16 md:w-[6vw] md:h-auto breathe ' />
              <img src='img/right_mustache.png' className='w-32 h-16 md:w-[6vw] md:h-auto breathe ' />
            </div>
            <div className='relative flex gap-96 translate-y-16 left-0 z-20 '>
              <img src='img/cute_mouth.png' className='w-20 md:w-[5vw] h-7 md:h-auto' />
            </div>
          </div>
          <button onClick={stopTypewriterEffect} className='absolute z-20 md:scale-150 translate-y-24 font-fredoka text-[#702c2b]'>
            <img src='img/mail_box.webp' alt='' className='w-[480px]' />
            <div className='absolute top-[8px] left-24'>
              <span className='font-bold text-white text-xl'>FOR </span>
              <span className='font-bold text-[#F64C96] text-xl'>NANA</span>
            </div>
            <span className='absolute w-[450px] top-24 left-6 text-3xl pr-7 font-bold text-center'>{displayText}</span>
          </button>
        </div>
      )}

      {showAnswerPage && (
        <div className='flex justify-center items-center'>
          <div className='relative w-[500px] h-[400px] flex flex-col items-center justify-center -top-40 left-0 -z-10 bounce-flip1'>
            <img src='img/blankface.png' alt='' className='w-full h-full absolute z-20 left-0 top-20 ' />
            <div className='relative h-[120px] flex items-center gap-60 md:gap-[100px] translate-y-[150px] left-0 z-20 '>
              <img src={`${blink ? 'img/blink_eye.png' : 'img/eye.webp'}`} className={`w-14 md:w-[4vw] md:h-auto ${blink ? 'h-5' : 'h-14'}`} />
              <img src={`${blink ? 'img/blink_eye.png' : 'img/eye.webp'}`} className={`w-14 md:w-[4vw] md:h-auto ${blink ? 'h-5' : 'h-14'}`} />
            </div>
            <div className='relative left-0 translate-y-[130px] z-20 '>
              <img src='img/love.webp' className='w-20 md:w-[5vw] aspect-square breathe ' />
            </div>
            <div className='relative flex gap-[100px] md:gap-40 left-0 translate-y-[30px] z-20 '>
              <img src='img/left_mustache.png' className='w-32 h-16 md:w-[6vw] md:h-auto breathe ' />
              <img src='img/right_mustache.png' className='w-32 h-16 md:w-[6vw] md:h-auto breathe ' />
            </div>
            <div className='relative flex gap-96 translate-y-16 left-0 z-20 '>
              <img src='img/mouth.png' className='w-20 md:w-[5vw] h-7 md:h-auto' />
            </div>
          </div>
          <div className='absolute w-[550px] h-20 bg-black rounded-[100%] blur-2xl -z-20 translate-y-28'></div>
          {mailIndex < mails.length && (
            <div className='absolute w-fill px-14  justify-center grid  md:grid-cols-2 gap-2 md:gap-7 md:gap-x-20 translate-y-40 font-fredoka text-[#702c2b] font-bold'>
              {mailIndex === 0 && (
                <>
                  {showCorrectMark &&
                    (
                      <span className='absolute -translate-y-10'>
                        <img src="img/checklist.png" alt="" className='w-40 h-auto' />
                      </span>
                    )
                  }
                  <button onClick={() => handleAnswer(0, '29 Nov 2023')} className='w-full md:w-96 py-6 text-3xl bg-[rgb(243,215,212)] border-[5px] border-[rgba(112,44,43)] rounded-[3rem] active:opacity-70'>
                    29 Nov 2023
                  </button>
                  <button onClick={() => setShowWrong(true)} className='w-full md:w-96 py-6 text-3xl border-[5px] border-[rgba(112,44,43)] bg-[rgb(243,215,212)] rounded-[3rem] active:opacity-70'>
                    20 Sept 2023
                  </button>
                  <button onClick={() => setShowWrong(true)} className='w-full md:w-96 py-6 text-3xl border-[5px] border-[rgba(112,44,43)] bg-[rgb(243,215,212)] rounded-[3rem] active:opacity-70'>
                    19 Nov 2023
                  </button>
                  <button onClick={() => setShowWrong(true)} className='w-full md:w-96 py-6 text-3xl border-[5px] border-[rgba(112,44,43)] bg-[rgb(243,215,212)] rounded-[3rem] active:opacity-70'>
                    5 Dec 2023
                  </button>
                </>
              )}
              {mailIndex === 1 && (
                <>
                  {showCorrectMark &&
                    (
                      <span className='absolute -translate-y-10 translate-x-[820px]'>
                        <img src="img/checklist.png" alt="" className='w-40 h-auto' />
                      </span>
                    )
                  }
                  <button onClick={() => setShowWrong(true)} className='w-full md:w-96 py-6 text-3xl bg-[rgb(243,215,212)] border-[5px] border-[rgba(112,44,43)] rounded-[3rem] active:opacity-70'>
                    Seafood
                  </button>
                  <button onClick={() => handleAnswer(1, 'Sushi')} className='w-full md:w-96 py-6 text-3xl border-[5px] border-[rgba(112,44,43)] bg-[rgb(243,215,212)] rounded-[3rem] active:opacity-70'>
                    Sushi
                  </button>
                  <button onClick={() => setShowWrong(true)} className='w-full md:w-96 py-6 text-3xl border-[5px] border-[rgba(112,44,43)] bg-[rgb(243,215,212)] rounded-[3rem] active:opacity-70'>
                    Western
                  </button>
                  <button onClick={() => setShowWrong(true)} className='w-full md:w-96 py-6 text-3xl border-[5px] border-[rgba(112,44,43)] bg-[rgb(243,215,212)] rounded-[3rem] active:opacity-70'>
                    Pizza
                  </button>
                </>
              )}
              {mailIndex === 2 && (
                <>
                  {showCorrectMark &&
                    (
                      <span className='absolute translate-y-20'>
                        <img src="img/checklist.png" alt="" className='w-40 h-auto' />
                      </span>
                    )
                  }
                  <button onClick={() => setShowWrong(true)} className='w-full md:w-96 py-6 text-3xl bg-[rgb(243,215,212)] border-[5px] border-[rgba(112,44,43)] rounded-[3rem] active:opacity-70'>
                    Kemvil
                  </button>
                  <button onClick={() => setShowWrong(true)} className='w-full md:w-96 py-6 text-3xl border-[5px] border-[rgba(112,44,43)] bg-[rgb(243,215,212)] rounded-[3rem] active:opacity-70'>
                    Campus
                  </button>
                  <button onClick={() => handleAnswer(2, 'Geisha')} className='w-full md:w-96 py-6 text-3xl border-[5px] border-[rgba(112,44,43)] bg-[rgb(243,215,212)] rounded-[3rem] active:opacity-70'>
                    Geisha
                  </button>
                  <button onClick={() => setShowWrong(true)} className='w-full md:w-96 py-6 text-3xl border-[5px] border-[rgba(112,44,43)] bg-[rgb(243,215,212)] rounded-[3rem] active:opacity-70'>
                    Mcd
                  </button>

                </>
              )}
              {mailIndex === 3 && (
                <>
                  <button onClick={handleCloseSection} className='w-full md:w-96 py-6 text-3xl bg-[rgb(243,215,212)] border-[5px] border-[rgba(112,44,43)] rounded-[3rem] active:opacity-70'>
                    Nanti
                  </button>
                  <button onClick={setCorrectAll} className='w-full md:w-96 py-6 text-3xl border-[5px] border-[rgba(112,44,43)] bg-[rgb(243,215,212)] rounded-[3rem] active:opacity-70'>
                    Terima
                  </button>
                </>
              )}

              {showWrong && (
                <div className='absolute bg-red-500 w-64 py-6 text-xl border-[5px] border-[rgba(112,44,43)] rounded-[3rem] translate-y-60'>
                  <span className='text-white font-bold'>❌ Salah! Coba lagi</span>
                </div>
              )}
            </div>

          )}
        </div>
      )}
    </div>
  );
};

export default GiftSection;
