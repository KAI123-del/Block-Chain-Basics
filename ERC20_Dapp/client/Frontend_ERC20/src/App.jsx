import React, { useState,useEffect } from 'react';
import Header from './components/Header';
import Token from './components/Token';
import BalanceCheck from './components/BalanceCheck';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from './utlis/constants.js';




const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner()
  const ERC20_Contract = new ethers.Contract(contractAddress, contractABI, signer)

  return ERC20_Contract;
}


function App() {

  const [connectedAccount,setConnectedAccount]=useState(' ');
  const [isLoading,setIsLoading]=useState(false);
  const [formData,setFormData]=useState({ addressTo: "", amount: ""});
  const [diffForm,setDiffForm]=useState({addressFrom:"",addressTo:"",amount:""});
  const[Load,setLoad]=useState(false);
  const [bal,setBal]=useState(null)



// ====================Send Transactions from connected account ==============================//

const ConnectedAccountTransferHandler=(sameData)=>{
  setFormData(sameData);
}
const sendTransaction = async () => {
  try {
      if (ethereum) {
         if(formData.addressTo.length>2){
          const { addressTo, amount } = formData;
          const transactionsContract = createEthereumContract();
          
          await ethereum.request(
              {
                  method: 'eth_sendTransaction',
                  params: [{
                      from: connectedAccount,
                      to: addressTo,
                      gas: '0x5208',
                      
                  }]
              }
          )
          const transactionHash = await transactionsContract.transfer(addressTo, amount);

          setIsLoading(true);
          console.log(`Loading-${transactionHash.hash}`);
          await transactionHash.wait();
          setIsLoading(false);
          console.log(`Success-${transactionHash.hash}`);

      } 
         }
  } catch (error) {
      console.log(error)
      
  }
}


useEffect(()=>{
  sendTransaction();
},[formData]);



// =====================Transfer using different accounts===========================//

const DifferentAccountSubmitHandler=(diffData)=>{
  setDiffForm(diffData);
}

const sendTransactionFromDiffAccount = async () => {
  try {
      if (ethereum) {
          if(diffForm.addressFrom.length>2){
            const {addressFrom, addressTo, amount } = diffForm;
          const transactionsContract = createEthereumContract();
          
          await ethereum.request(
              {
                  method: 'eth_sendTransaction',
                  params: [{
                      from: addressFrom,
                      to: addressTo,
                      gas: '0x5208',
                      
                  }]
              }
          )
          const transactionHash = await transactionsContract.transferFrom(addressFrom,addressTo, amount);

          setLoad(true);
          console.log(`Loading-${transactionHash.hash}`);
          await transactionHash.wait();
          setLoad(false);
          console.log(`Success-${transactionHash.hash}`);

      } 
          }
  } catch (error) {
      console.log(error)
      throw new Error("No ethereum object");
  }
}

useEffect(()=>{
  sendTransactionFromDiffAccount();
},[diffForm])



//  =====================on first load , if metamask not install give alert otherwise connect to account=========//


  const ConnectWallet =async ()=>{
    if(!ethereum) return alert("please install metamask")
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    setConnectedAccount(accounts[0]);
    console.log(accounts)
     
  }

  useEffect(()=>{
    ConnectWallet()
  },[])









  return (
    <div className="home min-h-screen pb-20">
      <Header />
      <Token Load={isLoading} Loading={Load} same={ConnectedAccountTransferHandler} different={DifferentAccountSubmitHandler}/>
      <BalanceCheck />


    </div>
  )
}

export default App
