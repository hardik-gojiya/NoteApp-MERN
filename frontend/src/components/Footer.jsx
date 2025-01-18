import React from 'react'

function Footer() {
  return (
    <div>
      <div className="bg-gray-800 text-white  justify-center p-4 fixed bottom-0  w-full z-50 flex">
      &copy; {new Date().getFullYear()} All Right Reserved, Zipper Notes
    </div>
    </div>
  )
}

export default Footer
