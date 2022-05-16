import React, { useState, useContext } from 'react';
import { FaEthereum } from 'react-icons/fa';
import Loader from './Loader';
import { TransactionContext } from "../context/TransactionContext";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-1 w-full rounded-sm p-3 outline-none bg-gray-800  placeholder:text-white text-white border-none text-sm "
  />
);

function Welcome() {
  const { connectWallet, connectedAccount, formData, handleChange, sendTransaction, isLoading } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, message } = formData;
    e.preventDefault()
    if (!addressTo || !amount || !message) return (console.log("go away"));
    sendTransaction();
  }



  return (
    <div className='flex  justify-center items-center'>

      {
        !connectedAccount && (
          <div className='pt-12 pb-8 px-8 mt-24 bg-gray-600 shadow-xl rounded-xl'>
            <div className='flex justify-center items-center text-xl text-white font-semibold '>
              <p>Click The Button Below To Connect To Your Wallet</p>
            </div>
            <div className='flex justify-center items-center mt-6'>
              <button onClick={connectWallet} type="button" className='px-10 py-3 bg-gray-700  rounded-full text-blue-100 border hover:bg-gray-400 hover:text-gray-600 text-lg tracking-wide shadow  font-semibold hover:shadow-xl transition duration-300 ' >Connect</button>
            </div>
          </div>
        )
      }
      <div className='w-1/2 flex  justify-center items-center  '>
        <div className='w-3/5 mt-20 rounded-lg   bg-gray-800 shadow-2xl'>
          <div className="mesherGlow relative  rounded-t-lg pt-44   px-8 pb-4 text-white text-2xl tracking-widest font-semibold">
            <h1 className='absolute top-10 text-4xl border-2 rounded-full p-2'><FaEthereum /></h1>
            ETHERIUM</div>

          <div className='opacity-50 rounded-lg bg-gray-700 px-2 py-1 '>
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
            <div className='border-b-2 mt-1'></div>
            {
              isLoading ? (<Loader />) : (<div className='flex justify-center items-center p-2'>
                <button onClick={handleSubmit} className='px-8 border py-2 rounded-full hover:bg-gray-200 font-semibold transition duration-300 hover:text-gray-600 bg-gray-600 text-white'>
                  Send Now
                </button>
              </div>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome;