import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utlis/constants.js'

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner()
    const TransactionsContract = new ethers.Contract(contractAddress, contractABI, signer)

    return TransactionsContract;
}

export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState(" ")
    const [formData, setFormData] = useState({ addressTo: "", amount: "", message: "" })
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(0)
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const checkIfWalletIsConnected = async () => {
        if (!ethereum) return alert("please install metamask")
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length > 0) {
            setConnectedAccount(accounts[0])
        } else {
            console.log("No accounts Found")
        }

    }
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask")
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setConnectedAccount(accounts[0])
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object.")
        }
    }

    const sendTransaction = async () => {
        try {
            if (ethereum) {
                const { addressTo, amount, message } = formData;
                const transactionsContract = createEthereumContract();
                const parsedAmount = ethers.utils.parseEther(amount);
                await ethereum.request(
                    {
                        method: 'eth_sendTransaction',
                        params: [{
                            from: connectedAccount,
                            to: addressTo,
                            gas: '0x5208',
                            value: parsedAmount._hex,
                        }]
                    }
                )
                const transactionHash = await transactionsContract.AddToBlockChain(addressTo, parsedAmount, message);

                setIsLoading(true);

                console.log(`Loading-${transactionHash.hash}`);

                await transactionHash.wait();

                setIsLoading(false);

                console.log(`Success-${transactionHash.hash}`);

                const transactionCount = await transactionsContract.getTransactionCount();

                setTransactionCount(transactionCount.toNumber());

                window.location.reload();

            } 
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [transactionCount])
    return (
        <TransactionContext.Provider value={{ connectWallet, isLoading, connectedAccount, formData, handleChange, sendTransaction, transactionCount }}>
            {children}
        </TransactionContext.Provider>
    )
}