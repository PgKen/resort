import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import axios from "axios";
// const todoList = useSelector((state) => state.todos.todoList);

import Moment from "react-moment";
import moment from "moment";

const date = moment("2021-12-03"); // Thursday Feb 2015
const dow = date.day();
console.log("dow = " + dow);

// let newDate = new Date();
// let date = newDate.getDate();
// let month = newDate.getMonth() + 1;
// let year = newDate.getFullYear();

// console.log("date = " + date);
// console.log("month = " + month);
// console.log("year = " + date);

// const webbase = "http://localhost:3777";
const webbase = "http://taladsrimuang.com:3777";

let pcm = 0;
let pcy = 2021;

const Table = (props) => {
  // window.location.reload();

  console.log("TEST Table Page");
  console.log(props.cm);

  if (props.cm == "undefined") {
    pcm = 0;
  } else {
    pcm = props.cm;
  }

  if (props.cm == "undefined") {
    pcy = 2021;
  } else {
    pcy = props.cy;
  }

  const todoList = useSelector((state) => state.users.userList);
  //console.log(todoList);

  const [SelectMonth, setSelectMonth] = useState(pcm);
  const [SelectYear, setSelectYear] = useState(pcy);

  const [MonthLeanth, setMonthLeanth] = useState([]);

  const [Listroom, setListroom] = useState([]);
  const [Isloading, setIsloading] = useState(true);

  const [Booking, setBooking] = useState([]);

  const [DetailDay, setDetailDay] = useState(null);
  const [DetailRoom, setDetailRoom] = useState(null);

  const [Datebooking, setDatebooking] = useState(null); // วันที่จอง
  const [Namebooking, setNamebooking] = useState(null); // ชื่อผู้จอง
  const [RoomId, setRoomId] = useState(null);

  const [StatusClick, setStatusClick] = useState(false);

  const [LoadDetail, setLoadDetail] = useState(false);
  const [DetailBooking, setDetailBooking] = useState([]);

  const [CurrentDetailId, setCurrentDetailId] = useState(null);

  function loadProp() {
    console.log("loadProp");
    console.log("prop = " + props.me);
    //setSelectMonth(props.me);
  }

  function loadDateTable() {
    // window.location.reload();

    //let selectMonth = SelectMonth
    console.log("loadDateTabel fn");
    console.log(props.cm);

    let dateOfmonth = 0;
    let loop = ["*"];

    function awatiData() {
      console.log("load Table");
      let dataNow = moment().format("DD-MM-YYYY"); // วันปัจจุบัน
      let YearNow = SelectYear;
      let MonthNow = SelectMonth;
      console.log("First Data Year = " + SelectYear);
      console.log("First Data Month = " + SelectMonth);
      // if(SelectMonth == 0 && SelectYear == 0){
      //   MonthNow = moment().format("MM"); // เดือนปัจจุบัน
      //   MonthNow = parseInt(MonthNow) +1
      //   YearNow = moment().format("YYYY"); // เดือนปัจจุบัน

      //   setSelectYear(YearNow)
      //   setSelectMonth(MonthNow)

      // }
      console.log("First Data Year = " + YearNow);
      console.log("First Data Month = " + MonthNow);
      // dateOfmonth = moment("10-02-2021").daysInMonth();
      dateOfmonth = moment([YearNow, MonthNow, 1]).daysInMonth();
      //setMonthLeanth(dateOfmonth);
    }

    async function main() {
      let a = await awatiData();
      let b = await pushData();
      let c = await sendData();
    }
    main();

    function pushData() {
      let nameDay = "";
      let x = "";
      // let startDate = moment().startOf('month');
      let month = moment().month(); // แก้
      let YearNow = SelectYear;
      let MonthNow = SelectMonth;


      console.log(MonthNow);
      console.log(YearNow);

      for (var i = 1; i <= dateOfmonth; i++) {
        nameDay = moment([YearNow, MonthNow, i]).format("ddd");
        console.log("nameDay = " + nameDay);
        loop.push({
          id: i,
          nameday: nameDay,
        });
      }
    }

    function sendData() {
      setMonthLeanth(loop);
    }
  }

  function loadDataRomm() {
    console.log("load Data Room");

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

  function loadDataBooking() {
    console.log("loadDataDooking");
    // let mm = moment().format("MM");

    // let mm1 = props.me
    let mm1 = 0;
    let YearNow = 0;
    console.log("SelectMonth = " + SelectMonth);
    console.log("SelectYear = " + SelectYear);
    // if(SelectMonth == 0 && SelectYear == 0){

    //   mm1 = moment().format("MM"); // เดือนปัจจุบัน
    //   mm1 = parseInt(mm1) - 1
    //   YearNow = moment().format("YYYY"); // เดือนปัจจุบัน

    //   setSelectYear(YearNow)
    //   setSelectMonth(mm1)

    // }else{
    mm1 = SelectMonth;
    YearNow = SelectYear;
    // }

    console.log("mm1 = " + mm1);
    console.log("YearNow = " + YearNow);
    axios
      .get(webbase + "/databooking/" + mm1 + "/" + YearNow)
      .then((resp) => {
        console.log("loadDataBooking");
        console.log(resp.data);
        setBooking(resp.data);
        console.log("loadDataBooking");
      })
      .catch((err) => console.log(err));
  }

  function fnOver(item, itemRoom, itemRoomId) {
    console.log("fnOver=" + item);
    console.log("itemRoom=" + itemRoom);
    console.log("itemRoomId=" + itemRoomId);
    if (StatusClick) {
    } else {
      setDetailDay(item);
      setDetailRoom(itemRoom);
      setRoomId(itemRoomId);
    }
  }

  const fnClick = (item, itemRoom, itemRoomId) => {
    console.log("fnOver=" + item);
    console.log("itemRoom=" + itemRoom);
    console.log("itemRoomId=" + itemRoomId);
    if (StatusClick) {
      setStatusClick(false);
    } else {
      setStatusClick(true);
    }
    console.log("click");
    setDetailDay(item);
    setDetailRoom(itemRoom);
    setRoomId(itemRoomId);
  };

  const chNamebooking = (e) => {
    let val = e.target.value;
    setNamebooking(val);
  };

  const submitBooking = (e) => {
    e.preventDefault();
    console.log("submit");
    // let yyNow = moment().format("YYYY"); // ปีปัจจุบัน
    //let yyNow = moment().format("YYYY"); // ปีปัจจุบัน
    // let mmNow = moment().format("MM"); // เดือน
    let mmNow = parseInt(SelectMonth); // เดือน
    mmNow = mmNow + 1;
    let yyNow = parseInt(SelectYear); // เดือน
    console.log("SelectMonth = " + SelectMonth);
    console.log("mmNow = " + mmNow);

    let dataBooking = yyNow + "-" + mmNow + "-" + DetailDay;
    console.log("dataBooking = " + dataBooking);

    axios
      .post(webbase + "/booking", {
        namebooking: Namebooking,
        datebooking: dataBooking,
        rootid: RoomId,
      })
      .then((resp) => {
        setNamebooking("");
        console.log(resp);
        //
        // loadDateTable();
        // loadDataRomm();
        loadDataBooking();
        setStatusClick(false);
      })
      .catch((err) => console.log(err));
  };

  function deteailBook(id) {
    setLoadDetail(true);
    console.log("function = deteailBook");
    axios
      .get(webbase + "/deteailBooking/" + id)
      .then((resp) => {
        console.log("---");
        console.log(resp.data);

        //setLoadDetail(false);
        //setLoadDetail(true)
        //setCurrentDetailId(resp.data[0].id)
        setDetailBooking(resp.data);
      })
      .catch((err) => console.log(err));
  }

  function deteailBookBlank() {
    // console.log("balk id = " + id);
    setLoadDetail(false);
    setDetailBooking([]);
  }

  // ยกเลิก
  const cancelLock = (id) => {
    console.log("cancle = " + id);

    axios
      .delete(webbase + "/delBooking/" + id)
      .then((resp) => {
        console.log(resp);
        loadDateTable();
        loadDataRomm();
        loadDataBooking();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadProp();
    loadDateTable();
    loadDataRomm();
    loadDataBooking();
  }, []);

  return (
    <>
      <div className="box-table">
        <div className="tableRoom">
          {MonthLeanth.map((itemH, indexH) => {
            let hh = "";
            {
              indexH == 0
                ? (hh = (
                    <div
                      className="headlistroom"
                      style={{
                        flex: "0",
                        width: "0",
                        height: "0",
                        borderStyle: "solid",
                        borderWidth: "0px 149px 40px 0px",
                        borderColor:
                          "transparent rgb(135 206 235) transparent transparent",
                      }}
                    ></div>
                  ))
                : (hh = (
                    <div
                      className="boxlistroom"
                      style={{
                        textAlign: "center",
                        backgroundColor: "skyblue",
                      }}
                    >
                      <div>{itemH.id}</div>

                      {itemH.nameday == "Sat" ? (
                        <div
                          style={{
                            backgroundColor: "#0d6efd",
                            width: "100%",
                            color: "white",
                          }}
                        >
                          {itemH.nameday}
                        </div>
                      ) : itemH.nameday == "Sun" ? (
                        <div
                          style={{
                            backgroundColor: "#dc3545",
                            width: "100%",
                            color: "white",
                          }}
                        >
                          {itemH.nameday}
                        </div>
                      ) : (
                        <div
                          style={{
                            backgroundColor: "#21a9e0",
                            width: "100%",
                            color: "white",
                          }}
                        >
                          {itemH.nameday}
                        </div>
                      )}
                    </div>
                  ));
            }
            return hh;
          })}
        </div>

        {Listroom.map((itemR, indexR) => {
          // {Listroom.map((itemx, indexX) => {
          //   return <div>{itemx}</div>;
          // })}
          let ex = 0;
          return (
            <div className="tableRoom" key={indexR}>
              {MonthLeanth.map((item, index) => {
                let xx = "";
                {
                  index == 0 // ช่องว่าง
                    ? (xx = (
                        <div
                          className="headlistroom"
                          style={{ flex: 0, flexBasis: 152 }}
                        >
                          {itemR.name}
                        </div>
                      ))
                    : (xx =
                        index == DetailDay && itemR.id == RoomId ? (
                          <div
                            className="boxlistroomActive"
                            onMouseOver={(e) => {
                              fnOver(index, itemR.name, itemR.id);
                            }}
                            onClick={(e) => {
                              fnClick(index, itemR.name, itemR.id);
                            }}
                          >
                            {Booking.length > 0 ? (
                              Booking[indexR][index - 1] != 0 ? (
                                <div
                                  className="boxlistrommLocked"
                                  onClick={(e) => {
                                    deteailBook(
                                      Booking[indexR][index - 1].idBooking
                                    );
                                  }}
                                >
                                  <span
                                    onClick={(e) => {
                                      deteailBook(
                                        Booking[indexR][index - 1].idBooking
                                      );
                                    }}
                                  >
                                    {Booking[indexR][index - 1].name}
                                  </span>
                                </div>
                              ) : (
                                // mouse over ว่าง
                                <div
                                  onClick={(e) => {
                                    deteailBookBlank();
                                  }}
                                >
                                  &nbsp;
                                </div>
                              )
                            ) : null}
                          </div>
                        ) : (
                          <div
                            className="boxlistroom"
                            onMouseOver={(e) => {
                              fnOver(index, itemR.name, itemR.id);
                            }}
                            onClick={(e) => {
                              fnClick(index, itemR.name, itemR.id);
                            }}
                          >
                            {Booking.length > 0 ? (
                              Booking[indexR][index - 1] != 0 ? (
                                <div
                                  className="boxlistrommLocked"
                                  onClick={(e) => {
                                    deteailBook(
                                      Booking[indexR][index - 1].idBooking
                                    );
                                  }}
                                >
                                  <span>{Booking[indexR][index - 1].name}</span>
                                </div>
                              ) : (
                                // แสดงในช่อง
                                <div
                                  onClick={(e) => {
                                    deteailBookBlank();
                                  }}
                                >
                                  &nbsp;
                                </div>
                              )
                            ) : null}
                          </div>
                        ));
                }
                return (
                  // <div className="tablelist" key={index}>
                  xx
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="box-book">
        <form onSubmit={submitBooking}>
          <div className="room-title" style={{ fontSize: 32 }}>
            วันที่&nbsp;{DetailDay}&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
            {DetailRoom}
          </div>
          <div className="table-book">
            <label>ชื่อผู้จอง</label>
            <input onChange={(e) => chNamebooking(e)} value={Namebooking} />
          </div>
          <div className="table-book">
            <button>บันทึก</button>
          </div>
        </form>
      </div>
      {DetailBooking.length > 0 && LoadDetail ? (
        <>
          <div className="DetailLocked">
            <div>date</div>
            <div>room</div>
            <div style={{ flex: 2 }}>name</div>
            <div></div>
          </div>
          {DetailBooking.map((item, indexB) => {
            return (
              <div className="DetailLockedList" key={indexB}>
                <div>{item.datebooking}</div>
                <div>{item.nameroom}</div>
                <div style={{ flex: 2 }}>{item.namebooking}</div>
                <div
                  onClick={(e) => {
                    if (window.confirm("ต้องการยกเลิกการจอง ?")) {
                      cancelLock(item.idBooking);
                    } else return false;
                  }}
                >
                  ยกเลิก
                </div>
              </div>
            );
          })}
        </>
      ) : null}
      <div className="boxLog">
        <div className="log">Log : {CurrentDetailId}</div>
        <div className="log">Log DetailDay : {DetailDay}</div>
        <div className="log">Log RoomId : {RoomId}</div>
        <div className="log">Log SelectMonth : {SelectMonth}</div>
        <div className="log">Log SelectYear : {SelectYear}</div>
      </div>
    </>
  );
};

export default Table;
