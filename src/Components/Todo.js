import React, { useState, useContext, useEffect } from 'react';
import TodoForm from './TodoForm';
// import { RiCloseCircleLine } from 'react-icons/ri';
// import { TiEdit } from 'react-icons/ti';
import {TodoContext} from '../context/TodoContext';
import {Input} from './TodoForm';
import TodoList from './TodoList';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const {taskList, viewTasks,addChild , newChild, viewChild, childId,setId, setChildId, isLoading, approveTask} = useContext(TodoContext);
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };
  
  useEffect(() => {
    viewTasks();
  },[])

  if (edit.value) {
    console.log(edit)
    //addChild(edit.value, edit.id);
    setId(edit.id);
    return (<div><Input placeholder="Child Address" name="childAddress" type="text" handleChange={addChild} />
     <button
          onClick={newChild}
          className='badge badge-info edit-icon'
        >Approved</button>
        </div>)
  }

  return taskList.map((todo, index) => (
    console.log(todo),
    <div
      className={todo[1] ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => removeTodo(todo.id)}>
       {index+1}. {todo.task} {parseInt(Number(todo.reward._hex),10)*(10**(-18))} ETH Reward
      </div>
      <div>
        {todo.approved ? 'Approved' : 'Pending'}
      </div>
      <div >
       
        {childId.id && childId.index == index ?<div>{childId.id}</div>:<button
          onClick={() => viewChild(index)}
          className='badge badge-success delete-icon'
        >View Child</button>}
        {!todo.completed ? <button
          onClick={() => updateTodo(index)}
          className='badge badge-success delete-icon'
        >Completed</button>:''}
        {!todo.approved ? <button
          onClick={() => approveTask(index)}
          className='badge badge-success delete-icon'
        >Approved</button>:''}
        {!todo.completed ? <button
          onClick={() => setEdit({ value: todo.task, id:index })}
          className='badge badge-info edit-icon'
        >Add Child</button>:''}
      </div>
    </div>
  ));
};

export default Todo;