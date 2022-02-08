import React, { useState, useEffect, useRef, useContext } from 'react';
import {TodoContext} from '../context/TodoContext';

const Input = ({placeholder, name, type, value, handleChange}) => (
    <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e,name)}
        className='todo-input'
    />
);

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const {currentAccount, connectWallet, todos, setTodos, handleChangeTodo, createTodo} = useContext(TodoContext);  


  useEffect(() => {
  //  inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const {task, reward} = todos;

    console.log(todos)

    
    if(!task || !reward) return;

    if (currentAccount) {
      console.log(currentAccount)
        createTodo();
    } else {
        alert('Please connect your wallet');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <Input placeholder="Add Task" name="task" type="text" handleChange={handleChangeTodo} />
          <Input placeholder="Reward" name="reward" type="number" handleChange={handleChangeTodo} />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;