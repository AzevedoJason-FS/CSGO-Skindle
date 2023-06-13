import { React, useState, useEffect } from "react";
import axios from "axios";
import { config } from "../constants";
import Nav from "../components/Nav";

const Leaderboard = () => {
  const [users, setUsers] = useState();

  const url = config.url.API_URL_LEADERBOARD;

  useEffect(() => {
    axios.get(url).then((response) => {
      setUsers(response.data);
      console.log(response.data);
    });
  }, []);

  const topUsers = (i) => {
    switch (i) {
      case 0:
        return "user_div_top1";
      case 1:
        return "user_div_top2";
      case 2:
        return "user_div_top3";
      default:
        return "user_div";
    }
  };

  return (
    <div id="container">
      <Nav />
      <div className="main">
        <h2 id="leaderboard_title">Leaderboard</h2>
        <div className="leaderboard">
          <div className="top3">
            {users &&
              users.slice(0, 3).map((user, i) => {
                return (
                  <div className={topUsers(i)} key={i}>
                    <p id="high_score_user">{user.name}</p>
                    <p id="top_high_score_number">{user.high_score}</p>
                  </div>
                );
              })}
          </div>
          <div className="remain_users">
            {users &&
              users.slice(3).map((user) => {
                return (
                  <div className="user_div" key={user._id}>
                    <p id="high_score_user">{user.name}</p>
                    <p id="high_score_number">{user.high_score}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
