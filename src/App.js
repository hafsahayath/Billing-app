import React, { useEffect } from "react"; 
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2/src/sweetalert2.js'
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