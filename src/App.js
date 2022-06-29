import React, { useEffect, lazy, Suspense } from "react";
import * as serviceWorker from "./serviceWorkerRegistration";

const Home = lazy(() => import("./containers/Home"));
const Login = lazy(() => import("./containers/Login"));

import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';
import { hot } from "react-hot-loader";


const App = () => {

  useEffect(() =>{
    screen.orientation.lock("portrait");
    var sw = serviceWorker.register();
    serviceWorker.checkUpdate(sw)

  }, [])

    return(
      <Router>
        <Suspense fallback={<div>loading ...</div>}>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/Home" element={<Home/>}/>
          </Routes>
        </Suspense>
      </Router>
    )
}

export default hot(module)((App))