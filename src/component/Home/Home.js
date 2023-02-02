import React, { useEffect, useState } from 'react'
// import Blog from "../Blog";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Loader from '../Loader';
import './Home.css'

// import useHistory from 'react-router-dom'
// const history = useHistory();
const Home = () => {
    const navgate = useNavigate()
    const [toDo, setToDo] = useState([])
    const [history, setHistory] = useState([])
    const [loader, setLoader] = useState(false);
    const [second, setSeconds] = useState(0)
    const [munit, setmunit] = useState(0)
    const [timerStatus, setTimerStatus] = useState(false)
    const [timerid, setTimerid] = useState(0)
    const [actionbutonTogle, setactionbutonTogle] = useState(0)
    const [todoStatus, setTodoStatus] = useState('')
    const [workstatus, setworkstatus] = useState(true)
    const [startbuttonPopup,setStartbuttonPopup] = useState(false)
    //*********************************** */
    const config = {
        headers: {
            authorization: localStorage.getItem('logToken')
        }
    }
    //************************************************* */
    // let time;
    // useEffect(() => {
    //     let setint = null;
    //     if (timerStatus) {
    //         setint = setInterval(() => {
    //             // setSeconds(prev => prev + 1)
    //             setSeconds(second+1)
    //             console.log('setinterval', '>>>,', second)
    //             if(second === 59){
    //                 console.log('second = 59')
    //                 setmunit(munit+1)
    //                 setSeconds(0)
    //             }
    //         }, 1000);
    //         setTimerid(setint)
    //     } else {
    //         clearInterval(setint)
    //     }
    //     return () => {
    //         if (second !== 0) {
    //             clearInterval(setint)
    //         }
    //     }
    // }, [timerStatus])
    //**************************** */
    async function startFunction(id) {    // FUNCTION FRO START BUTTON 
        console.log(id)
        console.log(localStorage.getItem('logToken'))
        // console.log(actionbutonTogle,'from start function')
        setLoader(true)
        setTimerStatus(true)  // for start the timer
        try {
            if(workstatus){
                setworkstatus(false)
                const response = await axios({
                    method: 'put',
                    url: `https://dec-k5lr.onrender.com/todo/start/${id}`,
                    headers: {
                      'Content-Type': 'application/json',
                      'authorization': `${localStorage.getItem('logToken')}`
                    },
                  });
            }else{
                setStartbuttonPopup(true)
            }
            const res = await axios.get('https://dec-k5lr.onrender.com/todo', config)
                setToDo(res.data.TodoData)
        } catch (error) {
            console.log(error)
        }
        setLoader(false)
    }
    //**************************************** */ FUNCTION FOR PAUSE
    async function pauseFunction(id) {    // FUNCTION FRO START BUTTON 
        console.log('pauseFunction')
        console.log(id)
        setTimerStatus(true)
        setLoader(true)

        try {
            // const StartUpdata = await axios.get(`https://dec-k5lr.onrender.com/todo/pause/${id}`, config)
            // console.log(StartUpdata)
            const response = await axios({
                method: 'put',
                url: `https://dec-k5lr.onrender.com/todo/pause/${id}`,
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': `${localStorage.getItem('logToken')}`
                },
              });
              console.log(response)
              const res = await axios.get('https://dec-k5lr.onrender.com/todo', config)
                setToDo(res.data.TodoData)
        } catch (error) {
            console.log(error)
        }
        setLoader(false)
    }
    //***************************************** */ FUNCTION FRO END BUTTON 
    async function endFunction(id, Acivity) {    // FUNCTION FRO START BUTTON 
        console.log('endFunction')
        console.log(id)
        setTimerStatus(true)
        setLoader(true)
        const response = await axios({
            method: 'put',
            url: `https://dec-k5lr.onrender.com/todo/end/${id}`,
            headers: {
              'Content-Type': 'application/json',
              'authorization': `${localStorage.getItem('logToken')}`
            },
            data: {
                time: parseInt(second)+munit*60
            }
          });
        //   console.log(response)
        //HISTORY API CALL
        const body = {
            Acivity : ""
        }
        // console.log(body,'body')
            const Historyres = await axios.post(`https://dec-k5lr.onrender.com/history/${Acivity}/${parseInt(second)+munit*60}`,body,config)
            console.log(Historyres)

            //todo refesh
          const res = await axios.get('https://dec-k5lr.onrender.com/todo', config)
            setToDo(res.data.TodoData)
            //history refresh
            const history = await axios.get('https://dec-k5lr.onrender.com/history', config)
            setHistory(history.data.History)

        try {
            // const StartUpdata = await axios.get(`https://dec-k5lr.onrender.com/todo/end/${id}`, config)
            // console.log(StartUpdata)
        } catch (error) {
            console.log(error)
        }
        setLoader(false)
    }
    //*************************************** */
    useEffect(() => {                                  
        if (!localStorage.getItem('logToken')) {
            navgate('/')
        }
    }, [])
    //****************************************** */
    useEffect(() => {
        async function datafunction() {
            // console.log(actionbutonTogle,'from data function')
            setLoader(true)
            try {

                const res = await axios.get('https://dec-k5lr.onrender.com/todo', config)
                setToDo(res.data.TodoData)
                // console.log(res.data.TodoData)
                const history = await axios.get('https://dec-k5lr.onrender.com/history', config)
                console.log(history.data.History,'history')
                setHistory(history.data.History)
            } catch (error) {
                console.log(error)
            }
            setLoader(false)
        }
        datafunction()
    }, [])
    //****************************************** */
    function LogOut() {
        // history.push('/login')
        localStorage.removeItem('logToken')
        navgate('/') //
    }
    //**************************
    //******************************** */ */  
    return (
        <div className='mailContainer'>
            <header className='header'>
                <h3>user: <b style={{ 'color': "red" }}>{localStorage.getItem('userID')}</b></h3>
            </header>
            <div className="section">
                
                <div className="history">
                <button onClick={() => { setTimerStatus(true) }}></button>
                        <h1>{munit < 10 ? "0" + munit : munit}:{second < 10 ? "0" + second : second}</h1>
                    <h1>Todo List</h1>
                    <h2>HISTORY</h2>
                    <div className='historyList'>
                        <table>
                            <thead>
                                <tr style={{ "color": "red" }}>
                                    <th>Acitivity</th>
                                    <th>Time Taken</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    history.map((item, i) => {
                                        return (
                                            <tr key={i * 0.002555}>
                                                <td><b>{item.Acivity}</b></td>
                                                <td><b>{item.Time}</b></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <button
                    style={{"margin": "1px 1px 10px 32px"}}
                    onClick={LogOut}>LogOut</button>
                </div>
                <div className="todolist">
                    <button  className='AcvityButton' onClick={() => { navgate('../create') }}>Add new Acitivty</button>
                    <table>
                        <thead>
                            <tr style={{ "color": "red" }}>
                                <th>Acitivity</th>
                                <th>Status</th>
                                <th>Time Taken</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {toDo.map((item, i) => {                                
                                return (
                                    <tr key={i * .056}>
                                        <td><b>{item.Acivity}</b> </td>
                                        <td><b>
                                            {item.Action === 'start' ? 'Painding':""}
                                            {(item.Action === 'Paused' ? 'Ongoing':"")==="Ongoing" ? "Ongoing":(item.Action === 'started' ? 'Ongoing':"")}
                                            {/* {item.Action === 'started' ? 'Ongoing':""} */}
                                            {item.Action === 'Complited' ? 'Complited':""}
                                        </b></td>
                                        <td><b>{item.TimeTaken}</b></td>
                                        <td><b>
                                            {item.Action === "start" ? <button onClick={() => startFunction(`${item._id}`)}>Start</button> : (<></>)}
                                            
                                            {item.Action === 'started' ? (<>
                                            <button
                                            onClick={() => pauseFunction(`${item._id}`)}
                                            >Pause</button>
                                            <button                                            
                                            onClick={() => endFunction(`${item._id}`,`${item.Acivity}`)}
                                            >End</button></>) : <></>}

                                            {item.Action === "Paused" ? (<>
                                            <button onClick={() => startFunction(`${item._id}`)} 
                                            >Start</button>
                                            <button
                                            onClick={() => endFunction(`${item._id}`,`${item.Acivity}`)}
                                            >End</button></>) : <></>}

                                            {item.Action === 'Complited' ? <></> : <></>}
                                            </b></td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {startbuttonPopup ? (<> 
                    <div className='popup'>
                        <h3>Popup</h3>
                        <h2>Finish the onGoing task first or pause the opning task</h2>
                    </div>
                    
                    
                    
                    
                    </>):<></>}
                </div>
            </div>
            {loader ? <Loader /> : <></>}
        </div>
    )
}

export default Home;