import React,{useState} from "react";
import { useDispatch,useSelector } from "react-redux";

const Formlogin = () => {

  const dispatch = useDispatch();
  //todos:todoReducer
  // const query = useSelector((state) => state.todos.todoList);
  const query = useSelector((state) => state.users.userList);

  const [User, setUser] = useState(null)
  const [Password, setPassword] = useState(null)

  //console.log(dispatch);
  console.log(query);

  function submitLogin(e){
    e.preventDefault()
    dispatch({
      type : "LOGIN_TODO",
      payload : User,
      payloadPass : Password
    })
  }

  function onChanguser(e){
    let val = e.target.value;
    setUser(val)
  }

  function onChangpass(e){
    let val = e.target.value;
    setPassword(val)
  }

  return (
    <div className="App-backend">
      <form id="login-form" onSubmit={submitLogin}>
        <div className="headLogin">
          <label>Login</label>
        </div>
        <div>
          <label>User</label>
          <input type="text" onChange={onChanguser}/>
          <span></span>
        </div>
        <div>
          <label>Password</label>
          <input type="password" onChange={onChangpass} />
          <span></span>
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Formlogin;
