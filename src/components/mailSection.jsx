import React, { useEffect, useState } from 'react'
import { TbArrowBackUp } from 'react-icons/tb';
import HTMLFlipBook from 'react-pageflip'

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

const BookResponsive = ({ children }) => (
  <>
    <div className='hidden md:flex w-full justify-center'>
      <HTMLFlipBook width={400} height={300} showCover={false}>
        {children}
      </HTMLFlipBook>
    </div>
    <div className=' w-full h-[75vw] flex justify-center absolute md:hidden'>
      <HTMLFlipBook width={150} height={112.5} usePortrait={false} showCover={false}>
        {children}
      </HTMLFlipBook>
    </div>
  </>
)

export default MailSection