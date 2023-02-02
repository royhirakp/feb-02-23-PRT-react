import React, { useEffect, useState } from 'react'
// import Blog from "../Blog";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Loader from '../Loader';
import './Home.css'

// import useHistory from 'react-router-dom'
    // const history = useHistory();
const Home=()=>{
    const navgate = useNavigate()
    const [toDo, setToDo]=useState([])
    const [history, setHistory] = useState([])
    const [loader, setLoader] = useState(false);
    const [second, setSeconds]= useState(0)
    const [munit, setmunit]= useState(0)
    const [timerStatus, setTimerStatus] = useState(false)
    const [timerid,setTimerid] = useState(0)
    //*********************************** */
    const config = {
        headers: {
            authorization : localStorage.getItem('logToken')                      
        }
    }
let time;
useEffect(()=>{
    let setint = null;
    if(timerStatus){
        setint =setInterval(() => {
            setSeconds(prev=> prev+1)
        }, 1000);
        setTimerid(setint)
    }else{
        clearInterval(setint)
    }
    return ()=>{
        if(second !==0){
            clearInterval(setint)
        }
        
    }
},[timerStatus])
//**************************** */
async function  startFunction(id){    // FUNCTION FRO START BUTTON 
    console.log(id)
    setTimerStatus(true)

    const config = {
        headers: {
            authorization : localStorage.getItem('logToken')                      
        }
    }
    try {
        const StartUpdata = await axios.put(`https://dec-k5lr.onrender.com/todo/start/${id}`, config)
        console.log(StartUpdata)
    } catch (error) {
        console.log(error)
    }
}
//**************************************** */ FUNCTION FOR PAUSE
async function pauseFunction(id){    // FUNCTION FRO START BUTTON 
    console.log(id)
    setTimerStatus(true)

    try {
        const StartUpdata = await axios.get (`https://dec-k5lr.onrender.com/todo/pause/${id}`,config)
        console.log(StartUpdata)
    } catch (error) {
        console.log(error)
    }
}
//***************************************** */ FUNCTION FRO END BUTTON 
async function  endFunction(id){    // FUNCTION FRO START BUTTON 
    console.log(id)
    setTimerStatus(true)

    try {
        const StartUpdata = await axios.get (`https://dec-k5lr.onrender.com/todo/end/${id}`,config)
        console.log(StartUpdata)
    } catch (error) {
        console.log(error)
    }
}
//*************************************** */
    useEffect(()=>{
        if(!localStorage.getItem('logToken')){
            navgate('/')
        }
    },[])
    //****************************************** */
    useEffect(()=>{
        async function datafunction () {
            setLoader(true)
            try {
               
                const res = await axios.get ('https://dec-k5lr.onrender.com/todo',config)
                    setToDo(res.data.TodoData)  
                    console.log(res.data.TodoData)   
                    const history = await axios.get('https://dec-k5lr.onrender.com/history', config)    
                // console.log(history.data.History,'history')
                setHistory(history.data.History)
            } catch (error) {
                console.log(error)
            }
            setLoader(false)
        }
        datafunction()
    },[])
//****************************************** */
    function LogOut (){
        // history.push('/login')
        localStorage.removeItem('logToken')
        navgate('/') //
    }
 //**************************
 //******************************** */ */  
    return (
        <div className='mailContainer'>
            <header className='header'>
                 <h3>user: <b style={{'color':"red"}}>{localStorage.getItem('userID') }</b></h3>
            </header>
            <div className="section">
        <div className="history">
            <h1>Todo List</h1>
            <h2>HISTORY</h2>
            <div className='historyList'>
                <button onClick={()=>{setTimerStatus(true)}}></button>
                <h1>{munit <10 ?"0"+munit:munit}:{second <10 ?"0"+second: second}</h1>
                <table>
                <thead>
                    <tr style={{"color":"red"}}>
                            <th>Acitivity</th>
                           
                            <th>Time Taken</th>
            
                        </tr>
                </thead>    
                <tbody>   
                {
                    history.map((item,i)=>{
                        return (
                            <tr key={i*0.002555}>
                                <td>{item.Acivity}</td>
                                <td>{item.Time}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            </div>
            <button onClick={LogOut}>LogOut</button>
        </div>
        <div className="todolist">
        <button onClick={()=>{navgate('../create')}}>Add new Acitivty</button>
            <table>
            <thead>
                <tr style={{"color":"red"}}>
                    <th>Acitivity</th>
                    <th>Status</th>
                    <th>Time Taken</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {toDo.map((item,i)=>{
                    return (
                        <tr key={i*.056}>
                            <td>{item.Acivity}</td>
                            <td>{item.Status}</td>
                            <td>{item.TimeTaken}</td>
                            <td>
                               {item.Action ==="start"?<button onClick={()=>startFunction(`${item._id}`)}>Start</button>:(<></>)}
                                {item.Action === 'started'?<><button>Pause</button><button>End</button></>:<></>}
                                {item.Action ==="Paused" ?<><button onClick={startFunction} >Start</button><button>End</button></>:<></> }
                                {item.Action === 'Complited'? <></>:<></>}
                                {/* <button>Pause</button>
                                <button>End</button> */}
                            </td>

                        </tr>
                    )
                })}
            </tbody>
            </table>
        </div>
      </div>

            {/* <nav>
                <p style={{Display:"inline-block"}}>Logo</p>
                
            </nav> */}
            {/* <div className="Blog" >
    
                {data.map((item)=>{
                        return (
                        <Blog data={item}/>
                        )
                    })} 

            </div> */}
            {/* <Loader/> */}
            {loader?<Loader/>:<></>}    
      </div>
    )
}

export default Home ;