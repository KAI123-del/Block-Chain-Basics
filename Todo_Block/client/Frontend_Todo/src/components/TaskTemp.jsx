import React from 'react'

function TaskTemp(props) {


    // const checkClickHandler=()=>{
    // //     if(props.dataRecieved.length>0){
    // //         const updateStatus=async()=>{
    // //             const TaskContract= props.EthereumContract();
    // //             const updateHash= await TaskContract.toggleStatus();
    // //             await updateHash;
    // //         }
    // //     }
    // // }


    return (
        <React.Fragment>
            <div className='flex justify-center mt-1 items-center'>
                <div className='w-3/4  grid grid-cols-6  gap-x-2  text-lg  text-white'>
                    <div className='col-span-1 glass  flex items-center justify-center'><input className='w-8 h-8 ' checked={props.status} type="checkbox"/></div>
                    <div className='col-span-4 glass py-2 flex items-center justify-center'><p>{props.content}</p></div>
                    <div className=' flex items-center justify-center'>
                        <button className='col-span-1 py-2 hover:bg-gray-700 transition duration-300 w-full glass'>Delete Task</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default TaskTemp;