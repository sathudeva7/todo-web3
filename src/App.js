import React from 'react';
import './App.css';
import TodoList from './Components/TodoList';
import Header from './Components/Header';

function App() {
  return (
    <div className='todo-app'>
      <Header />
      <TodoList />
    </div>
  );
}

export default App;