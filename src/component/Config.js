import React, { useEffect, useState } from "react";
import axios from "axios";

// const webbase = "http://localhost:3777";
const webbase = "http://taladsrimuang.com:3777";


const Addroom = () => {
  // const [Price, setPrice] = useState(null);
  // const [Type, setType] = useState(null);
  // const [Name, setName] = useState(null);

  const [Listroom, setListroom] = useState([]);
  const [Isloading, setIsloading] = useState(true);

  // function chnPrice(e) {
  //   let val = e.target.value;
  //   if (isNaN(val)) {
  //     alert("Please input a number");
  //     return false;
  //   } else {
  //     setPrice(val);
  //   }
  // }

  // function inputName(e) {
  //   let val = e.target.value;
  //   setName(val);
  // }

  // function selectType(e) {
  //   let val = e.target.value;
  //   console.log("selectType = " + val);
  //   setType(val);
  // }

  // function submitFrom(e) {
  //   e.preventDefault();
  //   console.log("submit");
  //   axios
  //     .post(webbase + "/addroom", {
  //       type: Type,
  //       name: Name,
  //       price: Price,
  //     })
  //     .then(function (resp) {
  //       console.log(resp);
  //       setPrice(0);
  //       setType("");
  //       setName("");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  function loadData() {
    console.log("load Data");
    axios
      .get(webbase + "/listRoom")
      .then((resp) => {
        console.log(resp.data);
        setListroom(resp.data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="box-list-room">
      <div className="list-room-head">
        <div style={{flex:0.5}}>Order</div>
        <div>Type</div>
        <div>Name</div>
        <div>Price</div>
      </div>
      {Isloading
        ? null
        : Listroom.map((item, index) => {
            return (
              <div className="list-room" key={index}>
                <div style={{flex:0.5}}>{index + 1}</div>
                <div>{item.type}</div>
                <div style={{textAlign:"left"}}>{item.name}</div>
                <div>{item.price}</div>
              </div>
            );
          })}
    </div>
  );
};

export default Addroom;
