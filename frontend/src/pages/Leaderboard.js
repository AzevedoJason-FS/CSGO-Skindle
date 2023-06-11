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
    // if (score > cookies.high_score || !cookies.high_score) {
    //   setCookie("high_score", score, { path: "/", expires: d });
    // }
  }, []);

  return (
    <div id="container">
      <Nav />
      <div className="main">
        <h2>Leaderboard</h2>
        {users &&
          users.map((user) => {
            return (
              <div key={user.id}>
                <p>{user.name}</p>
                <p>{user.high_score}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Leaderboard;
