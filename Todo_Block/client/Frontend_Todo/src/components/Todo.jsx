import React,{useState} from 'react';


function Todo(props) {

  const [TaskVal,setTaskVal]=useState('');

  const changeHandler=(e)=>{
    if(e.target.value.length>0){
      setTaskVal(e.target.value)
    }
    
    

  }

 

  const SubmitHandler=()=>{
     
     if(!props.eth) return alert("please connect to meta mask account")
    
      if(TaskVal.length>0){
        props.InputData(TaskVal)
      }else{
        alert("Empty task cant be added")
      };
      setTaskVal('');
 
  }

  return (
   <React.Fragment>
        <div className='flex justify-center items-center'>
          <input type="text" className='w-3/6 rounded-full mt-8 h-12 text-center text-gray-200 outline-none placeholder:text-gray-200 text-lg placeholder:font-semibold glass hover:ring-1 hover:ring-rose-500' onChange={changeHandler} value={TaskVal} placeholder='Add a new task here...'/>
        </div>
        <div className='flex justify-center items-center'>
          <button onClick={SubmitHandler} className='mt-4 px-6 py-2 glass rounded-full text-white hover:bg-rose-500 transition duration-300 shadow-xl'>Add Task</button>
        </div>
   </React.Fragment>
  )
}

export default Todo