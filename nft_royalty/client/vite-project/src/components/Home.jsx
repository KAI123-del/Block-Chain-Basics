import React from 'react';
import {NavLink} from 'react-router-dom';

function Home() {
    return (
        <React.Fragment>
            <div className=' px-6 pt-3 pb-4 border-b-2   shadow-xl '>
                <p className='text-6xl tracking-wide mb-4 text-amber-600   font-gotham'>Old School MarketPlace</p>
                <div className='flex text-lg font-semibold   w-1/2 justify-center items-center space-x-24'>
                    <p className=''>
                        <NavLink to={"/"} className="text-amber-600">Home</NavLink>
                    </p>
                    <p className='text-amber-600'>Sell Assets</p>
                    <p className='text-amber-600'>My Assets</p>
                    <p className='text-amber-600'>Creator Dashboard</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home