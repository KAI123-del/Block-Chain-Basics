import React from 'react'

function Header() {
  return (
   <React.Fragment>
       <div className='flex justify-center items-center '>
           <div className='mt-12 mesher bg-clip-text text-transparent font-gotham border-r-4 border-b-4 border-gray-400   rounded-bl-xl rounded-tr-xl pl-4 pb-6 pr-6'><span className='text-6xl'>ERC-20</span> <span className='text-9xl ml-6'>Dapp</span></div>
       </div>
   </React.Fragment>
  )
}

export default Header