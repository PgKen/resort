import React, { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import RoomConfig from "./RoomConfig";
import Table from "./Table";

let g_id = 0;
let y_id = 0;

const thmonth = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

const thyear = ["2020", "2021", "2022"];

function Maincontent() {
  const users = useSelector((state) => state.users.userList);
  const [ShowIconSetting, setShowIconSetting] = useState(false);

  const [SelectMonth, setSelectMonth] = useState(parseInt(moment().format("MM"))-1);
  const [LoadMonth, setLoadMonth] = useState(false);

  const [SelectYear, setSelectYear] = useState(2021);

  function settingMenu() {
    console.log("test ");
    if (ShowIconSetting) {
      setShowIconSetting(false);
    } else {
      setShowIconSetting(true);
    }
  }

  function clkRoom() {
    setLoadMonth(false);

    // document.getElementById('main-container').style.width = "100%";
    // document.getElementById('main-menu').style.flex = "0.5";
  }
  function clkConfig() {
    setLoadMonth(false);

    // document.getElementById('main-container').style.width = "1350px";
    // document.getElementById('main-menu').style.flex = "1";
  }

  function fnselectMonth(e) {
    if (!LoadMonth) {
      setLoadMonth(true);
    } else {
      setLoadMonth(false);
    }
    console.log("select mounth");
    let id = e.target.value;
    g_id = id;
    console.log("id =" + id);
    setSelectMonth(id);
  }

  function fnselectYear(e) {
    if (!LoadMonth) {
      setLoadMonth(true);
    } else {
      setLoadMonth(false);
    }
    console.log("select year");
    let id = e.target.value;
    y_id = id;
    console.log("id =" + id);
    setSelectYear(id);
  }

  function setTrueMenu() {
    setLoadMonth(false);
  }

  return (
    <Router>
      <div className="main-container" id="main-container">
        <div className="head-menu">
          <span onClick={settingMenu}>
            <i
              className="fas fa-cog"
              style={{
                fontSize: "50px",
                color: "darkblue",
                //border: "2px solid blue",
                backgroundColor: "#acacc3",
                padding: "4px",
              }}
            />
          </span>
          {/* <label className="labelHead">เดือน</label> */}
          <select
            onChange={fnselectMonth}
            value={SelectMonth}
            style={{ flex: 0.5 }}
          >
            <option>--โปรดเลือกเดือน--</option>
            {thmonth.map((item, index) => {
              return (
                <option key={index} value={index}>
                  {item}
                </option>
              );
            })}
          </select>
          <select
            onChange={fnselectYear}
            value={SelectYear}
            style={{ flex: 0.5 }}
          >
            <option>--โปรดเลือกปี--</option>
            {thyear.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <span>เดือน&nbsp;&nbsp;{thmonth[SelectMonth]}&nbsp;&nbsp;ปี&nbsp;&nbsp;{SelectYear}</span>
        </div>
        {/*<div className="head-board">
          <div>X</div>
          <div>Y</div>
          <div>Z</div>
        </div> */}
        <div className="font-page">
          {ShowIconSetting ? (
            <ul className="main-menu" id="main-menu">
              <li onClick={setTrueMenu}>
                <Link to="/">Home</Link>
              </li>
              <li onClick={clkConfig}>
                <Link to="/room">Room Config</Link>
              </li>
              <li onClick={clkRoom}>
                <Link to="/table">Table</Link>
              </li>
              <li>
                <Link to="/room">Logout</Link>
              </li>
            </ul>
          ) : null}
          <div className="article">
            {LoadMonth ? (
              <Table cm={SelectMonth} cy={SelectYear} />
            ) : (
              <Switch>
                <Route exact path="/">
                  <Table cm={SelectMonth} cy={SelectYear} />
                </Route>
                <Route path="/room">
                  <RoomConfig />
                </Route>
                <Route path="/table">
                  <Table cm={SelectMonth} cy={SelectYear} />
                </Route>
              </Switch>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Maincontent;
