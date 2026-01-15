import React, { useState,useContext } from 'react';
import Logo from "../../assets/olx-logo.png"; 
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {auth}=useContext(FirebaseContext)
  const navigate=useNavigate()
  const handleLogin=async(e)=>{
    e.preventDefault()
    try{
      await signInWithEmailAndPassword(auth,email,password)
      alert("logged in")
      navigate('/')
    }catch(error){
      alert(error.message)
    }
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a href='/signup'>Signup</a>
      </div>
    </div>
  );
}

export default Login;
