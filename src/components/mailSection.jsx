import React, { useEffect, useRef, useState } from 'react'
import { TbArrowBackUp, TbArrowRight } from 'react-icons/tb';
import HTMLFlipBook from 'react-pageflip'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { Navigation } from 'swiper/modules';

const MailSection = ({ handleCloseSection }) => {
  const [isRendered, setIsRendered] = useState(false);


  useEffect(() => {
    setIsRendered(true);
  }, []);


  return (
    <div className='absolute z-50 w-screen min-h-screen flex items-center justify-center'>
      <button className='absolute top-14 left-14 z-50' onClick={() => handleCloseSection(handleCloseSection)}>
        <TbArrowBackUp className='text-white w-10 h-10' />
      </button>

      <div className='absolute top-0 left-0 w-screen min-h-screen bg-black bg-opacity-70 backdrop-blur-2xl'></div>
      <BookResponsive>
        {/* 1 */}
        <div className='relative overflow-hidden bg-green-800 rounded-l-xl'>
          <div className='absolute w-[200%] top-0 left-0 h-full flex items-center'>
            <img src="./img/mail/buku/halaman1.png" alt="" className='w-full h-full' />
          </div>
        </div>
        <div className='relative overflow-hidden bg-green-800 rounded-r-xl'>
          <div className='absolute w-[200%] top-0 -left-full h-full flex items-center'>
            <img src="./img/mail/buku/halaman1.png" alt="" className='w-full bg-right h-full' />
          </div>
        </div>
        {/* 2 */}
        <div className='relative overflow-hidden bg-blue-900 rounded-l-xl'>
          <div className='absolute w-[200%] top-0 left-0 h-full flex items-center'>
            <img src="./img/mail/buku/halaman2.png" alt="" className='w-full h-full' />
          </div>
        </div>
        <div className='relative overflow-hidden bg-blue-900 rounded-r-xl'>
          <div className='absolute w-[200%] top-0 -left-full h-full flex items-center'>
            <img src="./img/mail/buku/halaman2.png" alt="" className='w-full bg-right h-full' />
          </div>
        </div>
        {/* 3 */}
        <div className='relative overflow-hidden bg-blue-950 rounded-l-xl'>
          <div className='absolute w-[200%] top-0 left-0 h-full flex items-center'>
            <img src="./img/mail/buku/halaman3.png" alt="" className='w-full h-full' />
          </div>
        </div>
        <div className='relative overflow-hidden bg-blue-950 rounded-r-xl'>
          <div className='absolute w-[200%] top-0 -left-full h-full flex items-center'>
            <img src="./img/mail/buku/halaman3.png" alt="" className='w-full bg-right h-full' />
          </div>
        </div>
        {/* 4 */}
        <div className='relative overflow-hidden bg-yellow-900 rounded-l-xl'>
          <div className='absolute w-[200%] top-0 left-0 h-full flex items-center'>
            <img src="./img/mail/buku/halaman4.png" alt="" className='w-full h-full' />
          </div>
        </div>
        <div className='relative overflow-hidden bg-yellow-900 rounded-r-xl'>
          <div className='absolute w-[200%] top-0 -left-full h-full flex items-center'>
            <img src="./img/mail/buku/halaman4.png" alt="" className='w-full bg-right h-full' />
          </div>
        </div>
        {/* 5 */}
        <div className='relative overflow-hidden bg-pink-300 rounded-l-xl'>
          <div className='absolute w-[200%] top-0 left-0 h-full flex items-center'>
            <img src="./img/mail/buku/halaman5.png" alt="" className='w-full h-full' />
          </div>
        </div>
        <div className='relative overflow-hidden bg-pink-300 rounded-r-xl'>
          <div className='absolute w-[200%] top-0 -left-full h-full flex items-center'>
            <img src="./img/mail/buku/halaman5.png" alt="" className='w-full bg-right h-full' />
          </div>
        </div>
        {/* 6 */}
        <div className='relative overflow-hidden bg-cyan-700 rounded-l-xl'>
          <div className='absolute w-[200%] top-0 left-0 h-full flex items-center'>
            <img src="./img/mail/buku/halaman6.png" alt="" className='w-full h-full' />
          </div>
        </div>
        <div className='relative overflow-hidden bg-cyan-700 rounded-r-xl'>
          <div className='absolute w-[200%] top-0 -left-full h-full flex items-center'>
            <img src="./img/mail/buku/halaman6.png" alt="" className='w-full bg-right h-full' />
          </div>
        </div>
      </BookResponsive>

    </div>
  )
}

const BookResponsive = ({ children }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRefMobile = useRef(null);
  const [activeIndexMobile, setActiveIndexMobile] = useState(0);

  return (
    <>
      <div className="hidden relative w-full min-h-screen md:flex items-center justify-center text-white overflow-visible">
        <button
          className="absolute left-4 z-10 text-7xl text-white rounded-full active:opacity-70"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          {'<'}
        </button>

        <Swiper
          spaceBetween={200}
          slidesPerView={3}
          centeredSlides={true} // Center the active slide
          modules={[Navigation]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className='items-center justify-center min-h-screen'
          style={{ display: 'flex' }}
        >
          {[...Array(6)].map((_, index) => (
            <SwiperSlide
              key={index}
              className={`h-full w-fit justify-center items-center overflow-visible transition-transform duration-300 ${index === activeIndex ? 'z-20' : ''}`}
              style={{ display: 'flex' }}
            >
              <img
                src={`./img/mail/buku/halaman${index + 1}.png`}
                alt=""
                className={`w-full h-full ${index === activeIndex ? 'scale-[2]' : 'scale-100 opacity-70'} duration-300`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="absolute right-4 z-10 text-7xl text-white rounded-full active:opacity-70"
          onClick={() => swiperRef.current?.slideNext()}
        >
          {'>'}
        </button>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden relative w-full min-h-screen items-center justify-center text-white overflow-visible">
        <button
          className="absolute left-4 z-10 text-7xl text-white rounded-full active:opacity-70"
          onClick={() => swiperRefMobile.current?.slidePrev()}
        >
          {'<'}
        </button>

        <Swiper
          spaceBetween={200}
          slidesPerView={1.7}
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
              {index}{activeIndexMobile}
              <img
                src={`./img/mail/buku/halaman${index + 1}.png`}
                alt=""
                className={`w-full h-full ${index === activeIndexMobile ? 'scale-[2]' : 'scale-100 opacity-70'} duration-300`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="absolute right-4 z-10 text-7xl text-white rounded-full active:opacity-70"
          onClick={() => swiperRefMobile.current?.slideNext()}
        >
          {'>'}
        </button>
      </div>
    </>
  );
};

export default MailSection