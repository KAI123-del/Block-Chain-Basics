import React from 'react'

function Header(props) {
  return (
      <React.Fragment>
      <div className=''>
        <button onClick={props.checkAccount} className='px-4 p-2 bg-gradient-to-r text-gray-700 font-semibold shadow-lg hover:shadow-xl hover:bg-purple-500 hover:text-white transition duration-300 bg-gray-300 rounded-full mt-3 ml-4'>Connect Account</button>
      </div>
      <div className=' flex justify-center items-center  pt-20'>
        
        <p className='text-7xl font-serif text-white font-extrabold'>Task Manager Dapp</p>
       
      </div>
      </React.Fragment>
  )
}

export default Header;
