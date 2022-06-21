import React, { useEffect } from "react";
import * as serviceWorker from "./serviceWorkerRegistration";
import { hot } from "react-hot-loader";


const App = () => {

  useEffect(() =>{

    var sw = serviceWorker.register();
    serviceWorker.checkUpdate(sw)

  })

    return(
        <div>
          <h1>Hello-world ! i using React</h1>
          <div>test 25</div>
        </div>
    )
}

export default hot(module)((App))