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
    const [todos, setTodos] = useState({task: '', reward: '', completed: false, approved: false});
    const [isLoading, setIsLoading] = useState(false);
    const [taskList, setTaskList] = useState([]);

    const handleChangeTodo = (e, name) => {
        console.log(e.target.value,name);
        setTodos((prevState) => ({...prevState, [name]: e.target.value}));
    }

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

    const viewTasks = async () => {
        try {
            const todoContract = getEthereumContract();
            const tasks= await todoContract._viewTasks();
            setTaskList(tasks);
        } catch (error) {
            console.log(error);
        }
    }

    const createTodo = async () => {
        try {
            if (!ethereum) return alert('Please install Metamask');

            const { task, completed, approved, reward} = todos;
            const todoContract = getEthereumContract();

           // await ethereum.request({ method: 'eth_createTask', params: [task, completed, approved, reward] });
            const parseReward = ethers.utils.parseEther(reward);
            const tx = await todoContract._createTask(task, completed, approved, parseReward._hex);

            setIsLoading(true);
            console.log(tx.hash);
            await tx.wait();
            setIsLoading(false);
            console.log('suc',tx.hash);

            const tasks= await todoContract._viewTasks();
            setTaskList(tasks);

        } catch (error) {
            console.log(error);

            throw new Error('No ethereum');
        }
    }

    const completeTask = async (taskId) => {
        try {
            if (!ethereum) return alert('Please install Metamask');
            const todoContract = getEthereumContract();

            const tx = await todoContract._updateApproveTask(1,{ gasLimit: 300000 });
            setIsLoading(true);
            console.log(tx.hash);
            await tx.wait();
            setIsLoading(false);
            console.log('suc',tx.hash);

            const tasks= await todoContract._viewTasks();
            setTaskList(tasks);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TodoContext.Provider value={{connectWallet, currentAccount, todos, setTodos, handleChangeTodo, createTodo, taskList,viewTasks, completeTask}}>
            {children}
        </TodoContext.Provider>
    )
}


