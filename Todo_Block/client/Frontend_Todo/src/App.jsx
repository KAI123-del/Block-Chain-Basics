import React,{useEffect, useState} from 'react';
import Header from './components/Header';
import Todo from './components/Todo';
import Task from './components/Task';
import TaskTemp from './components/TaskTemp';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from './utlis/constants.js'


const { ethereum } = window;
const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner()
  const TodoListContract = new ethers.Contract(contractAddress, contractABI, signer);

  return TodoListContract;
}





function App() {
  const [RevTask,setRevTask]=useState(null)
 
  const [ConnectedAccount,setConnectedAccount]=useState(' ');
  const [taskRecieved,setTaskRecieved]=useState([]);
 
  const RecievedTaskHandler=(taskVal)=>{
    
     if(taskVal.length>0){
      setRevTask(taskVal)
     }
  }
  

  //================ check if the wallet is connected or not ================

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("please install metamask")
      const accounts = await ethereum.request({ method: 'eth_accounts' });
    

    if (accounts.length ) {
        setConnectedAccount(accounts[0])
    } else {
      alert ("please connect to your metamask account")
      console.log("No accounts Found")
    }
    } catch (error) {
      console.log(error)
    }

}  

useEffect(()=>{
  checkIfWalletIsConnected();
},[])

// ====================connect the wallet ==================================

  const ConnectWallet=async ()=>{
    try {
      if(!ethereum){alert("please add metamask extension and create an account")}else{alert("already connected")};

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setConnectedAccount(accounts[0])
      console.log(accounts)
    } catch (error) {
      throw new Error("no account found")
    }
  }

  
//  ============= create a task (only connected account will add)===============

  
    const AddToDo= async()=>{
      const TaskContract= createEthereumContract();
      const TodoHash= await TaskContract.createtask(RevTask);
      await TodoHash;
      console.log(TodoHash)
      const getTaskContract= createEthereumContract();
      const TaskHash= await getTaskContract.fetchMyTasks();
      await TaskHash;
      setTaskRecieved(TaskHash)
      console.log(TaskHash);

    }
  



  useEffect(()=>{
    AddToDo()
  },[RevTask])

  // useEffect(()=>{
  //   getTodo()
  // },[createDataRecieved])

  return (
    <div className="mesher min-h-screen">
      <Header checkAccount={ConnectWallet}/>
      <Todo InputData={RecievedTaskHandler} eth={ethereum}/>
      <Task/>
      {taskRecieved.length>0?(taskRecieved.map((task)=><TaskTemp  status={task.checked} content={task.content}/>)):<p></p>}
      
      
      
      
    </div>
  )
}

export default App;
