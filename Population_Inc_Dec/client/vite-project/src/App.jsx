import React, { useEffect, useState } from 'react';
import Action from './Components/Action';
import Details from './Components/Details';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from './utlis/constants.js';

const { ethereum } = window;
const createEthereumContract = () => {

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner()
  const PopulationContract = new ethers.Contract(contractAddress, contractABI, signer)

  return PopulationContract;
}




function App() {
  const [country, setCountry] = useState('');
  const [incrementedValue, setIncrementedValue] = useState(null);
  const [IncResponse, setIncResponse] = useState()
  const [decrementedValue, setDecrementedValue] = useState(null);

  const countryChangeHandler = (oldCountry) => {
    setCountry(oldCountry);
  }




  // =============== setting user Input for increment and sending that value to the contract function 'increment'======//

  const incrementHandler = (incVal) => {
    setIncrementedValue(incVal);

  }

  const parseIncVal = async () => {
    try {
      const PopulationInc = createEthereumContract();
      const PopInc = ethers.BigNumber.from(incrementedValue)
      const PopulationHash = await PopulationInc.increment(country, PopInc)
      console.log(`${PopulationHash}`)
      setIncResponse(`${PopulationHash}`)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    parseIncVal();
  }, [incrementedValue])


  // =================== setting user Input for decrement and sending that value to the contract function 'decrement'======//

  const decrementHandler = async (decVal) => {
    setDecrementedValue(decVal);
  }

  const parseDecVal = async () => {
    try {
      const PopulationContract = createEthereumContract();
      const parsedPopDec = ethers.BigNumber.from(decrementedValue)
      const popDec = await PopulationContract.decrement(country, parsedPopDec)
      console.log(`Loading-${popDec}`);
      setIncResponse(`${popDec}`)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    parseDecVal();
  },[decrementedValue])






  return (
    <div className="">
      <Details Count={country} Inc={IncResponse} Dec={IncResponse}/>
      <Action increment={incrementHandler} decrement={decrementHandler} onCountryChange={countryChangeHandler} />


    </div>
  )
}

export default App
