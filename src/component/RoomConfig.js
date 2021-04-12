import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Addroom from "./Addroom";
import Config from './Config'

const RoomConfig = () => {
  return (
    <Router>
      <div className="config-room">
        <div className="menu-config-room">
          <Link to="/addroom">Add Room</Link>
          <Link to="/config">Room Config</Link>
        </div>
        <div className="article-config-room">
          <Switch>
            <Route path="/addroom">
              <Addroom />
            </Route>
            <Route path="/config">
              <Config />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default RoomConfig;
