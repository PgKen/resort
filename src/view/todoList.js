import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//import TodoItem from '../components/TodoItem';

//Get todoList from todoReducer
// const TodoListView = useSelector(state => state.todos.todoList);

const TodoList = () => {
  const todoList = useSelector((state) => state.todos.todoList);
  console.log(todoList);

  return <div>{/* <TodoListView/> */}</div>;
};

export default TodoList;
