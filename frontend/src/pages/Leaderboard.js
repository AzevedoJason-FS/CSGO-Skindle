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
    });
  }, []);

  const topUsers = (i) => {
    switch (i) {
      case 0:
      case 1:
      case 2:
        return "user_div_top";
      default:
        return "user_div";
    }
  };

  const topUserBadge = (i) => {
    switch (i) {
      case 0:
        return (
          <div className="quiz-medal">
            <div className="quiz-medal__circle quiz-medal__circle--gold">
              <span>1</span>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="quiz-medal">
            <div className="quiz-medal__circle quiz-medal__circle--silver">
              <span>2</span>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="quiz-medal">
            <div className="quiz-medal__circle quiz-medal__circle--bronze">
              <span>3</span>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {users && users.length > 0 ? (
        <div id="container">
          <Nav />
          <div className="main_leaderboard">
            <div className="leaderboard_box">
              <p id="leaderboard_title">Leaderboard</p>
            </div>
            <div className="leaderboard">
              <div className="top3">
                {users &&
                  users.slice(0, 3).map((user, i) => {
                    return (
                      <div className={topUsers(i)} key={i}>
                        {topUserBadge(i)}
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
      ) : (
        <div id="container">
          <Nav />
          <div className="main_leaderboard">
            <div className="leaderboard_box">
              <p id="leaderboard_title">Leaderboard</p>
            </div>
            <div className="leaderboard_empty">
                <h2 id="loading">Be the first on the leaderboard!</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Leaderboard;
