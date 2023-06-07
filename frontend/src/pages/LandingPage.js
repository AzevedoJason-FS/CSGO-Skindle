import { React, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const LandingPage = () => {
  /* eslint-disable no-unused-vars */
  const [items, setItems] = useState();
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  let form = document.getElementById('form');
  let itemName = document.getElementById('item_name');

  const hide = (el) => {
    el.style.display = 'none';
  }

  const show = (el) => {
    el.style.display = 'block';
  }

  useEffect(() => {
    axios.get("/api/items").then((response) => {
      setItems(response.data);
      console.log(response.data);
    });
  }, []);

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
    if (answer === "" || answer != items[index].name.toLowerCase()) {
      toast.error("Incorrect", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
        theme: "colored",
      });
    }
    if (answer === items[index].name.toLowerCase()) {
      hide(form)
      setScore(score + 1)
      show(itemName)
      toast.success("Correct!", {
        icon: "+1"
      });
    }
  };

  return (
    <>
      {items && items.length > 0 ? (
        <div id="container" key={items[index]._id}>
          <ToastContainer />
          <h2 id="title">CS:GO Skindle</h2>
          <p id="score">{score}</p>
          <div className="slot">
            <div className="boxes">
              <div className="box">
                <img id="image" src={items[index].img_url} alt="profile img" />
              </div>
              <p id="item_name" style={{display: 'none'}}>✅ {items[index].name}</p>
            </div>
          </div>
          <div id="form" style={{display: 'block'}}>
            <input
              id="input"
              placeholder="Guess the Item Skin"
              onChange={onChange}
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
