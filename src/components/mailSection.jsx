import React, { useEffect, useRef, useState } from 'react'
import { TbArrowBackUp } from 'react-icons/tb';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { Navigation } from 'swiper/modules';

const MailSection = ({ handleCloseSection, clickSoundEffect }) => {
  const [isRendered, setIsRendered] = useState(false);


  useEffect(() => {
    setIsRendered(true);
  }, []);


  return (
    <div className='absolute z-50 w-screen min-h-screen flex items-center justify-center'>
      <button className='absolute top-14 left-14 z-50' onClick={() => handleCloseSection(handleCloseSection)}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>

      <div className='absolute top-0 left-0 w-screen min-h-screen backdrop-blur-xl'></div>
      <img src="img/music/wave-top-left.png" alt="" className='absolute scale-150 md:scale-100 -top-20 -left-40  md:-top-[50vw] md:-left-60 unselectable' />
      <img src="img/music/wave-bottom-right.png" alt="" className='absolute scale-[2] md:scale-100 -bottom-20 -right-40 md:-bottom-[50vw] md:-right-60 unselectable' />
      <div className='absolute top-0 left-0 w-screen min-h-screen bg-black bg-opacity-70'></div>
      x x
      <BookResponsive clickSoundEffect={clickSoundEffect} />

    </div>
  )
}

const BookResponsive = ({ clickSoundEffect }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRefMobile = useRef(null);
  const [activeIndexMobile, setActiveIndexMobile] = useState(0);

  return (
    <>
      <div className="hidden relative w-full min-h-screen md:flex items-center justify-center text-white overflow-visible">
        <button
          className="absolute -translate-x-28 bottom-20 z-10 text-7xl text-white rounded-full active:opacity-70"
          onClick={() => { swiperRef.current?.slidePrev(); clickSoundEffect(); }}
        >
          {'<'}
        </button>

        <Swiper
          spaceBetween={200}
          slidesPerView={1.2}
          centeredSlides={true} // Center the active slide
          modules={[Navigation]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className='items-center justify-center'
          style={{ display: 'flex' }}
        >
          {[...Array(6)].map((_, index) => (
            <SwiperSlide
              key={index}
              className={`h-full w-fit justify-center items-center overflow-visible duration-300 ${index === activeIndex ? 'z-20' : ''}`}
              style={{ display: 'flex' }}
            >
              <img
                src={`./img/mail/buku/desktop/halaman (${index + 1}).png`}
                alt=""
                className={`w-full h-full ${(index !== 3 && index !== 5) && 'translate-y-20'} duration-300`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="absolute  translate-x-28 bottom-20 z-10 text-7xl text-white rounded-full active:opacity-70"
          onClick={() => { swiperRef.current?.slideNext(); clickSoundEffect(); }}
        >
          {'>'}
        </button>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden relative w-full min-h-screen items-center justify-center text-white overflow-visible">
        <button
          className="absolute  -translate-x-14 bottom-32 z-10 text-7xl text-white rounded-full active:opacity-70"
          onClick={() => { swiperRefMobile.current?.slidePrev(); clickSoundEffect(); }}
        >
          {'<'}
        </button>

        <Swiper
          spaceBetween={200}
          slidesPerView={1.6}
          centeredSlides={true} // Center the active slide
          modules={[Navigation]}
          onSlideChange={(swiper) => setActiveIndexMobile(swiper.activeIndex)}
          onSwiper={(swiper) => {
            swiperRefMobile.current = swiper;
          }}
          className='items-center justify-center min-h-screen'
          style={{ display: 'flex' }}
        >
          {[...Array(6)].map((_, index) => (
            <SwiperSlide
              key={index}
              className={`h-full w-fit justify-center items-center overflow-visible transition-transform duration-300 ${index === activeIndexMobile ? 'z-20' : ''}`}
              style={{ display: 'flex' }}
            >
              <img
                src={`./img/mail/buku/mobile/halaman (${index + 1}).png`}
                alt=""
                className={`w-full h-full ${(index === 1 || index === 4) && '-translate-y-12'} ${index === activeIndexMobile ? 'scale-[2]' : 'scale-100 opacity-70'} duration-300`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="absolute translate-x-14 bottom-32 z-10 text-7xl text-white rounded-full active:opacity-70"
          onClick={() => { swiperRefMobile.current?.slideNext(); clickSoundEffect(); }}
        >
          {'>'}
        </button>
      </div>
    </>
  );
};

export default MailSection