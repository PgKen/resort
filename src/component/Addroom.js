import React, { useEffect, useState } from "react";
import axios from "axios";
import Config from "./Config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { trash-alt } from '@fortawesome/free-solid-svg-icons'
import "@fortawesome/fontawesome-free/js/all.js";

// const webbase = "http://localhost:3777";
const webbase = "http://taladsrimuang.com:3777";

const Addroom = () => {
  const [Price, setPrice] = useState(null);
  const [Type, setType] = useState(null);
  const [Name, setName] = useState(null);

  const [Listroom, setListroom] = useState([]);
  const [Isloading, setIsloading] = useState(true);

  function chnPrice(e) {
    let val = e.target.value;
    if (isNaN(val)) {
      alert("Please input a number");
      return false;
    } else {
      setPrice(val);
    }
  }

  function inputName(e) {
    let val = e.target.value;
    setName(val);
  }

  function selectType(e) {
    let val = e.target.value;
    console.log("selectType = " + val);
    setType(val);
  }

  function submitFrom(e) {
    e.preventDefault();
    console.log("submit");
    axios
      .post(webbase + "/addroom", {
        type: Type,
        name: Name,
        price: Price,
      })
      .then(function (resp) {
        console.log(resp);
        setPrice(0);
        setType("");
        setName("");
        loadData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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

  function fnDel(id) {
    console.log("del = "+id);
    axios.delete(webbase+'/delroom/'+id)
    .then(resp=>{
      console.log(resp);
      loadData()
    })
    .catch(err=>console.log(err))
  }

  function editRoom(id){
    console.log("edit = "+id);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="box-add-room">
        <form
          onSubmit={(e) => {
            submitFrom(e);
          }}
        >
          <div>
            <label>Room Type</label>
            <select
              onChange={(e) => {
                selectType(e);
              }}
            >
              <option value="0">--Select--</option>
              <option value="1">Type1</option>
              <option value="2">Type2</option>
            </select>
            <span className="comment-input"></span>
          </div>
          <div>
            <label>Name Room</label>
            <input
              onChange={(e) => {
                inputName(e);
              }}
              value={Name}
            />
            <span className="comment-input"></span>
          </div>
          <div>
            <label>Price</label>
            <input
              onChange={(e) => {
                chnPrice(e);
              }}
              value={Price}
            />
            <span className="comment-input"></span>
          </div>
          <div style={{ justifyContent: "center" }}>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="box-list-room">
        <div className="list-room-head">
          <div style={{ flex: 0.5 }}>Order</div>
          <div>Type</div>
          <div style={{ flex: 3 }}>Name</div>
          <div style={{ flex: 1 }}>Price</div>
          <div style={{ flex: 0.5 }}>Edit</div>
          <div style={{ flex: 0.5 }}>Del</div>
        </div>
        {Isloading
          ? null
          : Listroom.map((item, index) => {
              return (
                <div className="list-room" key={index}>
                  <div style={{ flex: 0.5 }}>{index + 1}</div>
                  <div>{item.type}</div>
                  <div style={{ textAlign: "left", flex: 3 }}>{item.name}</div>
                  <div style={{ flex: 1 }}>{item.price}</div>
                  
                  <div onClick={(e)=>{editRoom(item.id)}} style={{ flex: 0.5 }}>
                    <i
                      className="fas fa-edit"
                      style={{ color: "#ffc107" }}
                    ></i>
                  </div>
                  <div onClick={(e)=>{
                    if(window.confirm("ต้องการลบห้อง ข้อมูลการจองทั้งหมดจะถูกลบด้วย")){
                      fnDel(item.id)
                    }else {
                      return false
                    }
                  }} style={{ flex: 0.5 }}>
                    <i
                      className="fas fa-trash-alt"
                      style={{ color: "red" }}
                    ></i>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default Addroom;
