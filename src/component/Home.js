import React, { useEffect, useState } from 'react'
import Blog from "./Blog";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Loader from './Loader';

// import useHistory from 'react-router-dom'
const Home=()=>{
    const navgate = useNavigate()
    const [data , setData]=useState([])
    const [loader, setLoader] = useState(false);
    // const history = useHistory();

    useEffect(()=>{
        if(!localStorage.getItem('logToken')){
            navgate('/')
        }
    },[])
    useEffect(()=>{
        async function datafunction () {
            setLoader(true)
            try {
                const config = {
                    headers: {
                        authorization : localStorage.getItem('logToken')                      
                    }
                }
                const res = await axios.get ('https://dec-k5lr.onrender.com/blog',config)
                    setData(res.data.blog) 
                    console.log(res.data.blog)       
            } catch (error) {
                console.log(error)
            }
            setLoader(false)
        }
        datafunction()
    },[])

    function LogOut (){
        // history.push('/login')
        localStorage.removeItem('logToken')
        navgate('/') //
    }
   
    return (
        <div className='Home-container'>
            <h3>Home</h3>
            <nav>
                <p style={{Display:"inline-block"}}>Logo</p>
                <button onClick={()=>{navgate('../create')}}>create</button>
                <button onClick={LogOut}>LogOut</button>
            </nav>
            <div className="Blog" >
    
                {data.map((item)=>{
                        return (
                        <Blog data={item}/>
                        )
                    })} 

            </div>
            {/* <Loader/> */}
            {loader?<Loader/>:<></>}    
      </div>
    )
}

export default Home ;