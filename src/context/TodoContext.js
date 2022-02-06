import React, {useEffect, useState} from "react";
import { ethers } from 'ethers';

import {contractAddress, contractABI} from '../utils/constants';

export const TodoContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
}

export const TodoProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('');

    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert('Please enable Metamask');

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            console.log(accounts,'accounts')
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log('no account')
            }

        } catch (error) {
            console.log(error)
            
            throw new Error('No ethereum');
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert('Please install Metamask');

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            window.localStorage.setItem('accounts', accounts[0]);
            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log(error);

            throw new Error('No ethereum');
        }
    }

    const sendTransaction = async (to, value) => {
        try {
            if (!ethereum) return alert('Please install Metamask');
        } catch (error) {
            console.log(error);

            throw new Error('No ethereum');
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TodoContext.Provider value={{connectWallet, currentAccount}}>
            {children}
        </TodoContext.Provider>
    )
}


