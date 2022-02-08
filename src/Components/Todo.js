import React, { useState, useContext, useEffect } from 'react';
import TodoForm from './TodoForm';
// import { RiCloseCircleLine } from 'react-icons/ri';
// import { TiEdit } from 'react-icons/ti';
import {TodoContext} from '../context/TodoContext';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const {taskList, viewTasks} = useContext(TodoContext);
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

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return taskList.map((todo, index) => (
    console.log(todo),
    <div
      className={todo[1] ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => removeTodo(todo.id)}>
        {todo.task} 
      </div>
      <div>
        {todo.approved ? 'Approved' : 'Pending'}
      </div>
      <div >
          
        <button
          onClick={() => completeTodo(todo.id)}
          className='badge badge-success delete-icon'
        >Completed</button>
        <button
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='badge badge-info edit-icon'
        >Approved</button>
      </div>
    </div>
  ));
};

export default Todo;