import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link,Redirect } from "react-router-dom";
// const todoList = useSelector((state) => state.todos.todoList);



const Menu = () => {
  
const todoList = useSelector((state) => state.users.userList);
  console.log(todoList);

  return (
    <div>
      Menu
    </div>
  )
};

export default Menu;
