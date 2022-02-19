import React, { useState, useContext } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import {TodoContext} from '../context/TodoContext';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const {taskList, completeTask, isLoading} = useContext(TodoContext);

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };

  // const updateTodo = (todoId, newValue) => {
  //   if (!newValue.text || /^\s*$/.test(newValue.text)) {
  //     return;
  //   }

  //   setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  // };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const updateTodo = id => {
    completeTask(id);
  };

  return (
    <>
      <h1>Do and Earn</h1>
      <TodoForm onSubmit={addTodo} />
      {isLoading ? <div>Loading</div> : ''}
      <Todo
        todos={taskList}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;