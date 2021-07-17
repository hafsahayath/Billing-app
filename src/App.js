import React, { useEffect } from "react"; 
import { useDispatch } from "react-redux";
import Routings from "./components/Routings";
import { setLoggedIn } from './actions/authActions'

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    if(localStorage.hasOwnProperty('token')){
      dispatch(setLoggedIn())
    }
  },[])

  return (
    <div>
        <Routings />
    </div>
  );
}

export default App;