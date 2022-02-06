import React, {useContext} from 'react'
import { TodoContext } from '../context/TodoContext';

export default function Header() {
    const { connectWallet, currentAccount } = useContext(TodoContext)

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">  
                <button class="badge badge-dark" onClick={connectWallet}>{!currentAccount ? 'Connect Wallet' : currentAccount}</button>
            </nav>
        </div>
    )
}