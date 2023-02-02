import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom";
import Loader from "../Loader"
import './Register.css'
const Register = (props) => {
  const [inputEmail, setInputaEmail] = useState('');
  const [inputPassword, setInputaPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [passMtchStatus, setPassMtchStatus] = useState(true);
  const [passwordLengthStatus, setpasswordLengthStatus] = useState(true);
  const [axiosErr, setAxiosErr] = useState('');
  const [susecssMess, setSuccessMsg ]= useState ('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {  // useEffect for password and confurm pass word 
    if (inputPassword.length > 7) {
      if (inputPassword !== confirmPassword && confirmPassword.length > 3) setPassMtchStatus(false)
      else setPassMtchStatus(true)
      setpasswordLengthStatus(true)
    } else if (inputPassword.length < 7 && inputPassword !== "") {
      setpasswordLengthStatus(false)
    }
  }, [inputPassword, confirmPassword])

  async function onsunmitFun(e) {
    e.preventDefault()
   
    if (inputPassword === confirmPassword && inputPassword.length > 7) {
      setLoader(true)
      console.log('password matched')
        try {
          const body = {
            email: inputEmail,
            password: inputPassword
          } 
          const resp = await axios.post('https://dec-k5lr.onrender.com/user/register', body)  
          console.log(resp)    
          setSuccessMsg(resp.data.status)
          setAxiosErr('')
        } catch (error) {
          setAxiosErr(error.response.data.status)
          setSuccessMsg('')
        }   
    }
    setLoader(false)
  }
  return (
    <div className='Reagister-container'>

      <h3>SING UP</h3>
      <form onSubmit={onsunmitFun}>
        
        <input type='email'
        placeholder="Email"
        onChange={(e) => setInputaEmail(e.target.value)} /><br />
     <br />
        <input type='password'
        placeholder="Password"
        onChange={(e) => setInputaPassword(e.target.value)} /><br />
      <br />
        <input type='password'
        placeholder="confirm password"
        onChange={(e) => setconfirmPassword(e.target.value)} /><br />
        {!passMtchStatus ? <p style={{ "color": "red" }}>Password Notmatched</p> : <></>}
        {!passwordLengthStatus ? <p style={{ "color": "red" }}>length shouldbe 8</p> : <></>}
        <br />
        <button type="submit">Register</button>
        <br />
        <Link to="/">SingIn</Link>
      </form>
      
      {susecssMess ? <h4 style={{color: "green"}}>{susecssMess}</h4> : <></>}
      {axiosErr ? <h4 style={{color: "red"}}>{axiosErr}</h4> :<></>}
      {loader?<Loader/>:<></>}
      {/* <img></img> */}
    </div>
  )
}
export default Register;