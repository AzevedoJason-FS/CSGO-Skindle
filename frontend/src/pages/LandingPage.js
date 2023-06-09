import { React, useEffect, useState } from "react";
import Modal from 'react-modal';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import Logo from "../static/logo.png";
import { config } from '../constants'

const LandingPage = () => {
  /* eslint-disable no-unused-vars,react/no-unknown-property */
  Modal.setAppElement('.app');
  const [items, setItems] = useState();
  const [index, setIndex] = useState(() => Math.floor(Math.random() * 53));
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cookies, setCookie] = useCookies(["high_score"]);
  const [wobble, setWobble] = useState(0);
  const [hidden, setHide] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
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

  const url = config.url.API_URL

  useEffect(() => {
    axios.get(url).then((response) => {
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
    if (
      answer === "" ||
      answer !== items[index].name.toLowerCase().replace(/[^\w ]/g, "")
    ) {
      setHide(1);
      setAnswer("");
      setScore(0);
      setIsOpen(true);
    }
    if (answer === items[index].name.toLowerCase().replace(/[^\w ]/g, "")) {
      hide(form);
      // setScore(score + 1);
      setScore((prev) => prev + 1);
      setWobble(1);
      show(itemName);
    }
    if (score > cookies.high_score) {
      setCookie("high_score", highScore === score, { path: "/", expires: d });
    }
  };

  function closeModal() {
    setIsOpen(false);
    setHide(0);
    submitHandler();
  }

  return (
    <>
      {items && items.length > 0 ? (
        <div id="container" key={items[index]._id}>
          <ToastContainer />
          <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        contentLabel="Example Modal"
      >
        <h2 id="modal_title">Thats the Incorrect Item 😔</h2>
        <p>Correct Item Was: <b>{items[index].name}</b></p>
        <img id="modal_image" src={items[index].img_url} alt="profile img" />
        <button id="modal_button" onClick={closeModal}>close</button>
      </Modal>
          <img id="logo" src={Logo} />
          <div className="score_box">
            <div className="score_detail">
              <p>Score:</p>
              <p id="score">{score}</p>
              <p id="float" onAnimationEnd={() => setWobble(0)} wobble={wobble}>
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
          <div id="form" hidden={hidden}>
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

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    zIndex:'7',
    right: 'auto',
    borderRadius: '10px',
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    bottom: 'auto',
    border:'',
    backgroundColor: 'rgb(66 71 79)',
    boxShadow: 'rgb(3 3 3 / 10%) 0px 10px 30px, #1b1b1b 0px -4px inset, #1b1b1b 0px 2px inset',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


export default LandingPage;
