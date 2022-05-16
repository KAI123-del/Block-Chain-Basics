import React, { useState,useEffect } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../../utlis/constants.js';



const { ethereum } = window;

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner()
    const ERC20_Contract = new ethers.Contract(contractAddress, contractABI, signer)

    return ERC20_Contract;
}

function Mint(props) {
    const [mint, setMint] = useState(false);
    const [mintVal, setMintVal] = useState(' ');
    const [revMint,setRevMint]=useState(' ');

    const mintHandler = () => {

        setMint(true);
    }

    const InChangeHandler = (e) => {
        setMintVal(e.target.value);
    }

    const MintFunction = async () => {

        if(mintVal.length>2){
            const transactionsContract = createEthereumContract();
            const MintToken = await transactionsContract.mint(mintVal);
            const ResMint = await MintToken;
            console.log(ResMint);
            setRevMint(ResMint);
        }

    }

    useEffect(()=>{
        MintFunction()
    },[mintVal])

    return (
        <React.Fragment>
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">


                    <div onClick={props.remove} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>


                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


                    <div className="inline-block  align-bottom bg-white rounded-lg px-4  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                        {
                            !mint && (<div>
                                <div className=" -translate-y-4 text-center sm:mt-5">
                                    <h3 className="text-xl leading-6 font-medium text-gray-900" id="modal-title">
                                        Mint OSC Coins
                                    </h3>

                                </div>
                                <input onChange={InChangeHandler} className="w-full border h-10 outline-none rounded-lg px-4 text-gray-600" placeholder="Enter the amount of OSC coins to be Minted" />

                                <div className=" sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    <button onClick={mintHandler} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                                        Confirm
                                    </button>
                                    <button onClick={props.remove} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white  text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                                        Cancel
                                    </button>
                                </div>
                            </div>)
                        }
                        {
                            mint && (<div>
                                <p>{revMint} OSC Coins are Successfull Minted!!!</p>
                            </div>)
                        }
                    </div>
                </div>
            </div>


        </React.Fragment>
    )
}

export default Mint