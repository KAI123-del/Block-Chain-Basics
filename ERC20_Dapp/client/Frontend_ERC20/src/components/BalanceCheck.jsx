import React, { useState, useEffect } from 'react';
import Balance from './dropdowns/Balance';
import Allow from './dropdowns/Allow';
import Approve from './dropdowns/Approve';
import Supply from './dropdowns/Supply';
import Mint from './dropdowns/Mint';
import Burn from './dropdowns/Burn';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utlis/constants.js';


const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner()
  const ERC20_Contract = new ethers.Contract(contractAddress, contractABI, signer)

  return ERC20_Contract;
}

function BalanceCheck() {
  const [Bal, setBal] = useState(false);
  const [sup, setSup] = useState(false);
  const [allow, setAllow] = useState(false);
  const [approve, setApprove] = useState(false);
  const [mint, setMint] = useState(false);
  const [burn, setBurn] = useState(false);

  const [RecievedBal, setRecievedBal] = useState(' ');
  const [Supp, setSupp] = useState('');

  // =======================Below are all required Handlers ===============//

  const BalHandler = () => {
    setBal(true);
  }

  const SupHandler = () => {
    setSup(true);
  }

  const AllHandler = () => {
    setAllow(true);
  }

  const AppHandler = () => {
    setApprove(true);
  }

  const MintHandler = () => {
    setMint(true);
  }

  const BurnHandler = () => {
    setBurn(true);
  }

  const CancelHandler = () => {
    setBal(false);
    setSup(false);
    setAllow(false);
    setBurn(false);
    setMint(false);
    setApprove(false);

  }

  //  =========================Total supply Check===============================//

  const TotalSupplyCheck = async () => {
    if (ethereum) {
      if (sup===true) {
        const transactionsContract = createEthereumContract();
        const totalSupply = await transactionsContract.totalSupply();
        const TokenSup= await totalSupply.toString();
        setSupp(TokenSup);
        console.log(TokenSup);
      }
    }
  }

  useEffect(()=>{
    TotalSupplyCheck()
  },[sup])

  //========================== check balance ================================//



  const CheckTheBalance = async () => {
    if (ethereum) {
      const transactionsContract = createEthereumContract();

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const balanceHash = await transactionsContract.balanceOf(accounts[0]);
      const parsedBal = await balanceHash.toString();
      console.log(parsedBal);
      setRecievedBal(parsedBal);


    }
  }

  useEffect(() => {
    CheckTheBalance();
  }, [Bal])







  return (
    <React.Fragment>
      <div className='h-24'>
        <div className='mt-20  flex  justify-center items-center   '>
          <button onClick={BalHandler} className='w-48 h-12 button border  text-white hover:-translate-y-1 hover:-translate-x-1 hover:text-rose-500 transition duration-300 font-gotham tracking-wide rounded-tl-full'>Check Balance </button>
          <button onClick={SupHandler} className='w-48 h-12 button border hover:-translate-y-1 hover:text-amber-500 transition duration-300 font-gotham tracking-wide text-white '>View Total Supply</button>
          <button onClick={MintHandler} className='w-48 hover:-translate-y-1 hover:translate-x-1 hover:text-lime-500 transition duration-300 h-12 button border font-gotham tracking-wide text-white rounded-tr-full'>Mint OSC coins</button>
        </div>
        <div className='  flex  justify-center items-center   '>
          <button onClick={BurnHandler} className='w-48 hover:translate-y-1 hover:-translate-x-1 hover:text-sky-500 transition duration-300 h-12 button border font-gotham tracking-wide text-white rounded-bl-full'>Burn OSC coins</button>
          <button onClick={AllHandler} className='w-48 hover:translate-y-1 hover:text-purple-500 transition duration-300 h-12 button border font-gotham tracking-wide text-white '>Check Allowance</button>
          <button onClick={AppHandler} className='w-48 hover:translate-y-1 hover:translate-x-1 hover:text-emerald-500 transition duration-300 h-12 button border font-gotham tracking-wide text-white rounded-br-full'>Ask Approval</button>
        </div>

      </div>
      {
        Bal && <Balance remove={CancelHandler} accBal={RecievedBal} />
      }
      {
        allow && <Allow remove={CancelHandler} />
      }
      {
        sup && <Supply remove={CancelHandler} Sup={Supp} />
      }
      {
        approve && <Approve remove={CancelHandler} />
      }
      {
        mint && <Mint remove={CancelHandler} />
      }
      {
        burn && <Burn remove={CancelHandler} />
      }
    </React.Fragment>
  )
}

export default BalanceCheck;