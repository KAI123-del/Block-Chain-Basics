import React,{useState} from 'react'

function Action(props) {
    const [incrementValue,setIncrementValue]=useState('');
    const [decrementValue,setDecrementValue]=useState('');
    
    
    const incrementChangeHandler=(e)=>{
         setIncrementValue(e.target.value);
         

    }
    const decrementChangeHandler=(e)=>{
         setDecrementValue(e.target.value);
         

    }
    
    const incrementHandler=()=>{
        
        props.increment(incrementValue);
        setIncrementValue('')
  
    }
    const decrementHandler=()=>{

        props.decrement(decrementValue)
        setDecrementValue('')
        
    }
    const dropdownChangeHandler = (e) => {
        props.onCountryChange(e.target.value);
        
      };
    
    return (
        <React.Fragment>
            <div className='grid grid-cols-6   gap-x-4 mt-16 px-12'>
                <div className='col-span-2 bg-gray-800 flex items-center justify-center rounded-lg'>
                    <div className='py-12'>
                        <p className='mb-3 text-center text-lg font-semibold text-white'>Select a Country</p>
                        <select  onChange={dropdownChangeHandler} className="  border dark bg-white rounded px-10 py-1 outline-none text-gray-700" >
                            <option className="py-1">India</option>
                            <option className="py-1">Ukraine</option>
                            <option className="py-1">Russia</option>
                        </select>
                    </div>
                </div>


                <div className='col-span-2 py-12 bg-gray-800 flex justify-center rounded-lg items-center'>
                    <div className=''>
                        <p className='mb-3 text-center text-lg font-semibold text-white'>Increment Population</p>
                        <div className='flex justify-center items-center space-x-4'>
                            <input value={incrementValue} className='outline-none border rounded px-4 py-2 text-gray-600 placeholder:text-center' placeholder='type a number' onChange={incrementChangeHandler} />
                            <button type="submit" onClick={incrementHandler} className='px-4 py-2  rounded-full text-white bg-transparent border border-gray-600 hover:border-gray-500 hover:bg-gray-300 transition duration-500 hover:text-gray-800 '>Increment</button>
                        </div>
                    </div>

                </div>

                <div className='col-span-2 py-12 bg-gray-800 flex justify-center rounded-lg items-center'>
                    <div className=''>
                        <p className='mb-3 text-center text-lg font-semibold text-white'>Decrement Population</p>
                        <div className='flex justify-center items-center space-x-4'>
                            <input value={decrementValue} onChange={decrementChangeHandler} className='outline-none border rounded px-4 py-2 text-gray-600 placeholder:text-center' placeholder='type a number' />
                            <button onClick={decrementHandler} className='px-4 py-2  rounded-full text-white bg-transparent border border-gray-600 hover:border-gray-500 hover:bg-gray-300 transition duration-500 hover:text-gray-800 '>Decrement</button>
                        </div>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default Action