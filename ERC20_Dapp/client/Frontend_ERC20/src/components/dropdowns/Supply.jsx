import React from 'react'

function Supply(props) {
  return (
    <React.Fragment>
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
   

    <div onClick={props.remove} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

   
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

   
    <div className="inline-block  align-bottom bg-white rounded-lg px-4  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
      
        
        <div className="text-center">
          <p className='font-semibold'>Total Supply Of OSC Coins  :<span  className='text-lg ml-3 font-bold'>{props.Sup}</span> </p>
          
        </div>
       
        
     
      
    </div>
  </div>
</div>

    </React.Fragment>
  )
}

export default Supply