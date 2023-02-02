import { useEffect, useState } from "react"
import axios from 'axios'
import Loader from "./Loader"
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
        email:
        <input type='email' onChange={(e) => setInputaEmail(e.target.value)} /><br />
        password:
        <input type='password' onChange={(e) => setInputaPassword(e.target.value)} /><br />
        Confirm password:
        <input type='password' onChange={(e) => setconfirmPassword(e.target.value)} /><br />
        {!passMtchStatus ? <p style={{ "color": "red" }}>Password Notmatched</p> : <></>}
        {!passwordLengthStatus ? <p style={{ "color": "red" }}>length shouldbe 8</p> : <></>}
        <button type="submit">SING UP</button>
      </form>
      
      {susecssMess ? <h4 style={{color: "green"}}>{susecssMess}</h4> : <></>}
      {axiosErr ? <h4 style={{color: "red"}}>{axiosErr}</h4> :<></>}
      {loader?<Loader/>:<></>}
      {/* <img></img> */}
    </div>
  )
}
export default Register;