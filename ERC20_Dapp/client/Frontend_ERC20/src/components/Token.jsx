import React, { useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import Loader from './Loader';




function Token(props) {
    const [newLoad,setNewLoad]=useState(false);
    const [amount,setAmount]=useState('');
    const [address,setAddress]=useState('');
    const [addFrom,setAddFrom]=useState('');
    const [addTo,setAddTo]=useState('');
    const [diffAmountTrans,setDiffAmountTrans]=useState('');


//  ==============states for same account transfer==============//

    const addressChangeHandler =(e)=>{
       setAddress(e.target.value);
    }

    const amountChangeHandler=(e)=>{
        setAmount(e.target.value);
    }

    
    

    const submitHandler=(e)=>{
       e.preventDefault();
       const sameAccountData={
           addressTo:address,
           amount:amount
       }

       props.same(sameAccountData);
    }

// ==================states for transfering from different account===========//

  const addFromHandler=(e)=>{
   setAddFrom(e.target.value);
  }

  const DiffAddHandler=(e)=>{
   setAddTo(e.target.value)
  }

  const DiffAmountHandler=(e)=>{
    setDiffAmountTrans(e.target.value)
  }

  const DiffSubmitHandler=(e)=>{
      e.preventDefault();
      const DiffAccountData={
          addressFrom:addFrom,
          addressTo:addTo,
          amount:diffAmountTrans
      }

      props.different(DiffAccountData);

  }
   
    
    return (
        <React.Fragment>
            

                {/* ====================Transfer from connected account ================= */}

                <div className='grid grid-cols-6 mt-24'>
                <div className='relative flex col-span-3 justify-center items-center    '>
                <h1 className='absolute top-16 mt-3  text-white font-gotham text-2xl'>Send Using your Account</h1>
                    <div className=' mt-20 rounded-lg w-3/5  glass shadow-2xl'>
                        
                        <div className="mesher relative  rounded-t-lg pt-44   px-4 pb-2 text-white text-2xl  font-semibold">
                            <h1 className='absolute top-6 text-4xl  border-2 rounded-full p-2'><FaEthereum /></h1>
                            <span className='font-gotham '>ETHERIUM</span></div>

                        <div className='opacity-50 w-full  rounded-b-lg glass px-2 py-1 '>
                            <form>
                                <input onChange={addressChangeHandler} placeholder="Address To" name="addressTo" type="text" className="mt-1 w-full rounded-sm p-3 outline-none input  placeholder:text-white text-white border-none text-sm " />
                                <input onChange={amountChangeHandler} placeholder="Amount (ETH)" name="amount" type="number" className="my-1 w-full input p-3 outline-none   placeholder:text-white text-white border-none text-sm " step="0.0001" />
                                
                                <div className='border-b-2 mt-1'></div>
                                {
                                    props.Load ? (<Loader />) : (<div className='flex justify-center items-center p-2'>
                                        <button onClick={submitHandler} className='px-8 border py-2 rounded-full hover:bg-gray-200 font-semibold transition duration-300 hover:text-gray-600 bg-gray-600 text-white'>
                                            Send Now
                                        </button>
                                    </div>)
                                }


                            </form>


                        </div>
                    </div>
                </div>
                



                {/* =============Transfer using different account================= */}
                

                <div className=' flex relative col-span-3 justify-center items-center  '>

                <h1 className='absolute top-12  text-white font-gotham text-2xl'>Send Using Different Account</h1>
                    <div className=' mt-20 rounded-lg w-3/5  glass shadow-2xl'>
                    
                        <div className="mesher relative  rounded-t-lg pt-44   px-4 pb-2 text-white text-2xl  font-semibold">
                            <h1 className='absolute top-6 text-4xl border-2 rounded-full p-2'><FaEthereum /></h1>
                            <span className='font-gotham '>ETHERIUM</span></div>

                        <div className='opacity-50 rounded-b-lg  px-2 py-1 '>
                            <form>
                                <input onChange={addFromHandler} placeholder="Address From" name="addressFrom" type="text" className="my-1 w-full  p-3 outline-none input  placeholder:text-white text-white border-none text-sm " />
                                <input onChange={DiffAddHandler} placeholder="Address To" name="addressTo" type="text" className="my-1 w-full  p-3 outline-none input  placeholder:text-white text-white border-none text-sm " />
                                <input onChange={DiffAmountHandler} placeholder="Amount (ETH)" name="amount" type="number" className="my-1 w-full  p-3 outline-none input  placeholder:text-white text-white border-none text-sm " step="0.0001" />
                                
                                
                                <div className='border-b-2 mt-1'></div>
                                {
                                    props.Loading ? (<Loader />) : (<div className='flex justify-center items-center p-2'>
                                        <button onClick={DiffSubmitHandler}  className='px-8 border py-2 rounded-full hover:bg-gray-200 font-semibold transition duration-300 hover:text-gray-600 bg-gray-600 text-white'>
                                            Send Now
                                        </button>
                                    </div>)
                                }


                            </form>


                        </div>
                    </div>
                </div>
                </div>
                
            
        </React.Fragment>
    )
}

export default Token