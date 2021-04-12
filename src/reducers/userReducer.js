import axios from "axios";
import React, { useEffect } from "react";

const webBase = "http://localhost:3777";

const initState = {
  userList: [
    {
      id: "",
      user: "",
      active:0
    },
  ],
};

let getData = [{
  active:0
}];

const userReducer = (state = initState, action) => {
  async function loadData() {
    await axios.get(webBase + "/cms").then((resp) => {
      console.log(resp.data);
      getData = resp.data;
    });
  }

  async function checkUser(user, password) {
    //console.log("check user");
    let val = [];
    await axios
      .post(webBase + "/chkUser", {
        user: user,
        password: password,
      })
      .then((resp) => {
        // console.log(resp.data);
        val = resp.data
      });
      return val

  }

  switch (action.type) {
    case "LOGIN_TODO":
      if (action.payload && action.payloadPass) {
        async function main() {
          let dataUser =  await checkUser(action.payload, action.payloadPass);
          // console.log("dataUser");
          console.log(dataUser);
         getData = dataUser
          
        }

        main();
      } else {
        getData = "not input";
      }
      return {
        state,
        userList: getData,
        // userList: [
        //   // ...state.userList,
        //   {
        //     id: "1",
        //     content: action.payload,
        //   },
        // ],
      };

    case "REMOVE_TODO":
      return {
        state,
        userList: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
