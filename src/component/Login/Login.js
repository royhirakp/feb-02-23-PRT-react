import axios from 'axios';
import React from 'react'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from '../Loader';
// import Coockie from 'js-coocki'
import './Login.css'

const Login = (props) => {
  const [inputEmail, setInputaEmail] = useState('')
  const [inputPassword, setInputaPassword] = useState('')
  const navgate = useNavigate()
  const [errorMessege, setErrorMessege] = useState('')
  const [loader, setLoder] = useState(false)
  // const [checkboxStatus, setCheckboxStatus] = useState(null)
  const [emailValidaion,setEmailValidation] = useState(false)
  const [passWValidaion,setPassWValidation] = useState(false)
 
  //email and password validation 
  useEffect(()=>{
    if(/[0-9]/.test(inputPassword) && /[~!@#$%^&*]/.test(inputPassword))  setPassWValidation(false)
    else if( inputPassword.length > 2)      setPassWValidation(true)
    else if(inputPassword.length === 0)      setPassWValidation(false)

    if(/[@]/.test(inputEmail) && /[.]/.test(inputEmail))   setEmailValidation(false)
    else if(inputEmail.length === 0) setEmailValidation(false)
    else  setEmailValidation(true)    
  },[inputEmail,inputPassword])

  //Onsubmit function 
  async function onsunmitFun(e) {
    e.preventDefault()
    console.log('onsubmit')
    // console.log(checkboxStatus)
    setLoder(true)
    try {
      const body = {
        email: inputEmail,
        password: inputPassword
      }
      let res = await axios.post('https://dec-k5lr.onrender.com/user/login', body)
      setErrorMessege('')
      console.log(res.data.token,'<<<<<token')
      localStorage.setItem('logToken', res.data.token) 
      localStorage.setItem('userID',inputEmail.split('@')[0])
      navgate('./home')
      // // coocki
      // document.cookie = 'SEmail'+inputEmail+";path=http://localhost:3000"
      // document.cookie = 'Spassword'+inputPassword+";path=http://localhost:3000"
    } catch (error) {
      setErrorMessege(error.response.data.status)
    }
    setLoder(false)
  }

  return (
    <div className='Login-container'>
      <h3>Membaer Login</h3>
      <br /><br />
      <form onSubmit={onsunmitFun}>
        <br />
        <input type='email'
        placeholder='Username'
        style={{border:emailValidaion?"red 4px solid":''}}
          onChange={(e) => setInputaEmail(e.target.value)}
        /><br/>
        {
          emailValidaion ? <p style={{color:"red"}}>not a valid email</p>: <></>
        }
      <br />
        <input type='password'
        placeholder='Password'
        // style={{border:passWValidaion ?"red 4px solid":""}}
          onChange={(e) => setInputaPassword(e.target.value)}
        /><br/>
        {
          // passWValidaion ? <p style={{color:"red"}}>not a valid password</p>: <></>
        }
        <br />
        <button type="submit">Login</button>
      </form>
      {/* <input type='checkbox'
        onClick={(e)=>{setCheckboxStatus(e.target.checked)}}
      /> Remember me? <br /> */}
      <Link to="#">Forgot Password?</Link>
      <br />
      <br />
      Need an accout? <Link to="/register">SingUp</Link>
      {errorMessege ? <h3 style={{ color: 'red' }}>{errorMessege}</h3> : ""}
      {loader ? <Loader /> : <></>}
    </div>
  )
}

export default Login;