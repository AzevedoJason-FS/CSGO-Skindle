import { React, useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import Logo from "../static/logo.png";
import Template from "../static/slot-template.png";
import { ReactComponent as Rolling } from "../static/rolling.svg";
import { config } from "../constants";
import Nav from "../components/Nav";

const LandingPage = () => {
  /* eslint-disable no-unused-vars,react/no-unknown-property */
  Modal.setAppElement(".app");
  const [items, setItems] = useState();
  const [index, setIndex] = useState(() => Math.floor(Math.random() * 53));
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [cookies, setCookie] = useCookies(["high_score"]);
  const [wobble, setWobble] = useState(0);
  const [hidden, setHide] = useState(0);
  const [changeModal, setChangeModal] = useState(false);
  const [hiddenBtn, setHideBtn] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  let itemName = document.getElementById("item_name");

  let d = new Date();
  d.setTime(d.getTime() + 10000 * 900 * 20000);

  const show = (el) => {
    el.style.display = "block";
  };

  const url = config.url.API_URL;
  const urlPost = config.url.API_URL_USER_LEADERBOARD;

  useEffect(() => {
    axios.get(url).then((response) => {
      setItems(response.data);
    });
  }, []);

  const submitHandler = () => {
    setHideBtn(1);
    setHide(0);
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

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
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
      if (score > cookies.high_score || !cookies.high_score) {
        setCookie("high_score", score, { path: "/", expires: d });
      }
    }
    if (answer === items[index].name.toLowerCase().replace(/[^\w ]/g, "")) {
      setHide(1);
      setScore((prev) => prev + 1);
      setWobble(1);
      setHideBtn(0);
      show(itemName);
    }
  };

  const onSubmitScore = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      high_score: cookies.high_score,
    };
    axios.post(urlPost, data).then((response) => {
      return toast.success(response.data, {
        autoClose: 4000,
        theme: "colored",
      });
    });
    closeModal()
  };

  const closeModal = () => {
    setIsOpen(false);
    setHide(0);
    submitHandler();
  };

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
            {changeModal ? (
              <>
                <h2 id="modal_title">Submit High Score</h2>
                <input
                  id="input_modal"
                  placeholder="Display Name"
                  onChange={onChangeName}
                  autoComplete="off"
                ></input>
                <button id="submit" onClick={(e) => onSubmitScore(e)}>
                  Submit Score
                </button>
                <p id="modal_back" onClick={() => setChangeModal(false)}>Back</p>
              </>
            ) : (
              <>
                <h2 id="modal_title">Thats the Incorrect Item 😔</h2>
                <p>
                  Correct Item Was: <b>{items[index].name}</b>
                </p>
                <img
                  id="modal_image"
                  src={items[index].img_url}
                  alt="profile img"
                />
                <button id="modal_button" onClick={closeModal}>
                  close
                </button>
                <p id="submit_score_p" onClick={() => setChangeModal(true)}>
                  Submit High Score to Leaderboard
                </p>
              </>
            )}
          </Modal>
          <Nav />
          <div className="main">
            <div className="top_bar">
              <img id="logo" src={Logo} alt="CS:Skindle Logo" />
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
                  {cookies.high_score && <p id="score">{cookies.high_score}</p>}
                </div>
              </div>
            </div>
            <div className="slot">
              <img id="slot_template" src={Template} alt="Item Image" />
              <div className="boxes">
                <div className="box">
                  <img id="image" src={items[index].img_url} alt="Item Image" />
                  <img id="image" src={items[index].img_url} alt="Item Image" />
                  <img id="image" src={items[index].img_url} alt="Item Image" />
                </div>
              </div>
            </div>
            <p id="item_name" style={{ display: "none" }}>
              ✅ {items[index].name}
            </p>
            <div id="form" hidden={hidden}>
              <input
                id="input"
                placeholder="Guess the Item Skin"
                onChange={onChange}
                autoComplete="off"
              ></input>
              <button id="submit" onClick={(e) => onSubmit(e)}>
                Submit
              </button>
            </div>
            <div className="buttons">
              <button id="spinner" hidden={hiddenBtn} onClick={submitHandler}>
                Randomize
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rolling">
          <Rolling />
          <h2 id="loading">Loading..</h2>
        </div>
      )}
    </>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    zIndex: "7",
    right: "auto",
    padding: "20px",
    overflow: "hidden",
    minWidth: "400px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bottom: "auto",
    border: "",
    backgroundColor: "rgb(66 71 79)",
    boxShadow:
      "rgb(3 3 3 / 10%) 0px 10px 30px, rgb(46 46 46) 0px -4px inset, rgb(46 46 46) 0px 2px inset",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default LandingPage;
