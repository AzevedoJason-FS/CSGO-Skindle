import { Routes, Route } from "react-router-dom";
import { React, Suspense, lazy } from "react";
import "./style.scss";
import { ReactComponent as RollingLoader } from "./static/rolling.svg";
import 'react-toastify/dist/ReactToastify.css';

const LandingPage = lazy(() => import('./pages/LandingPage'));

const App = () => {
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
      </Routes>
    </div>
  );
};

export default App;
