import { Routes, Route } from "react-router-dom";
import { React, Suspense, lazy } from "react";
import "./style.scss";
import { ReactComponent as RollingLoader } from "./static/rolling.svg";
import "react-toastify/dist/ReactToastify.css";
import ReactGA from "react-ga4";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));

const App = () => {
    ReactGA.initialize('G-22B25JWC59');
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home" });
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense
              fallback={
                <div className="loader-container">
                  <div className="loader-container-inner">
                    <RollingLoader />
                  </div>
                </div>
              }
            >
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <Suspense
              fallback={
                <div className="loader-container">
                  <div className="loader-container-inner">
                    <RollingLoader />
                  </div>
                </div>
              }
            >
              <Leaderboard />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
