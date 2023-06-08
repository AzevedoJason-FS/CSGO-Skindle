import { React, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import Logo from "../static/logo.png";

const LandingPage = () => {
  /* eslint-disable no-unused-vars,react/no-unknown-property */
  const [items, setItems] = useState();
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cookies, setCookie] = useCookies(["high_score"]);
  const [wobble, setWobble] = useState(0);
  let form = document.getElementById("form");
  let itemName = document.getElementById("item_name");

  let d = new Date();
  d.setTime(d.getTime() + 10000 * 900 * 20000);

  const hide = (el) => {
    el.style.display = "none";
  };

  const show = (el) => {
    el.style.display = "block";
  };

  useEffect(() => {
    axios.get("/api/items").then((response) => {
      setItems(response.data);
      console.log(response.data);
    });
    setHighScore(score);
  }, [score]);

  const submitHandler = () => {
    if (index <= items.length - 1) {
      setIndex(Math.floor(Math.random() * items.length));
    } else {
      toast.error("No Items :(", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
        theme: "colored",
      });
    }
  };

  const onChange = (e) => {
    const b = e.target.value;
    const input = b.toLowerCase();
    setAnswer(input);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (answer === "" || answer !== items[index].name.toLowerCase()) {
      hide(form);
      setAnswer("");
      setScore(0);
      setTimeout(() => {
        submitHandler();
      }, 1000);
    }
    if (answer === items[index].name.toLowerCase()) {
      hide(form);
      setScore(score + 1);
      setWobble(1)
      show(itemName);
    }
    if (score > cookies.high_score) {
      setCookie("high_score", highScore + 1, { path: "/", expires: d });
    }
  };

  return (
    <>
      {items && items.length > 0 ? (
        <div id="container" key={items[index]._id}>
          <ToastContainer />
          <img id="logo" src={Logo} />
          <div className="score_box">
            <div className="score_detail">
              <p>Score:</p>
              <p id="score">{score}</p>
              <p
                id="float"
                onAnimationEnd={() => setWobble(0)}
                wobble={wobble}
              >
                +1
              </p>
            </div>
            <div className="score_detail">
              <p>High Score:</p>
              <p id="score">{cookies.high_score}</p>
            </div>
          </div>
          <div className="slot">
            <div className="boxes">
              <div className="box">
                <img id="image" src={items[index].img_url} alt="profile img" />
                <img id="image" src={items[index].img_url} alt="profile img" />
                <img id="image" src={items[index].img_url} alt="profile img" />
              </div>
            </div>
            <p id="item_name" style={{ display: "none" }}>
              ✅ {items[index].name}
            </p>
          </div>
          <div id="form" style={{ display: "block" }}>
            <input
              id="input"
              placeholder="Guess the Item Skin"
              onChange={onChange}
              autoComplete="false"
            ></input>
            <button id="submit" onClick={(e) => onSubmit(e)}>
              Submit
            </button>
          </div>
          <div className="buttons">
            <button id="spinner" onClick={submitHandler}>
              Randomize
            </button>
            <p>Jason Azevedo @CS:GO Skindle Project</p>
          </div>
        </div>
      ) : (
        <p>None</p>
      )}
    </>
  );
};

export default LandingPage;
