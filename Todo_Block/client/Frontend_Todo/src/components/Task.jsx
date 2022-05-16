import React from 'react';



function Task() {
    return (
        <React.Fragment>
            <div className='flex justify-center mt-16 items-center'>
                <div className='w-3/4  grid grid-cols-6  gap-x-2  text-lg  text-white'>
                    <div className='col-span-1 glass py-2 flex items-center justify-center'><p>Status</p></div>
                    <div className='col-span-4 glass flex items-center justify-center'><p>Task</p></div>
                    <div className='col-span-1 glass flex items-center justify-center'>
                        <p>Delete Task</p>
                    </div>
                </div>
            </div>
            
           
        </React.Fragment>
    )
}

export default Task