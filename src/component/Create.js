import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Loader from './Loader';
const Create=(props)=>{
    const [todo, setTodo] = useState('')
    const [todoStatus, setTodoStatus] = useState(false)
    const navgate = useNavigate()
    const [loader, setLoder] = useState(false)

    async function onSubmitf (e){
        e.preventDefault()  
        setLoder(true) 
        try {
            const body = {
                Acivity : todo
            }
            console.log(body,'body')
            const config = {
                headers: {
                    authorization : localStorage.getItem('logToken')                      
                }
            }
            if(todo !== ""){
                const res = await axios.post('https://dec-k5lr.onrender.com/todo',body,config)
                navgate('/home')
            }else{
                setTodoStatus(true)
            }
                // console.log(res)       
        } catch (error) {
            console.log(error)
        }
        setLoder(false)
        
    } 
    return (
        <div className='book-container'>
            <h5>New ToDo</h5>
            <form onSubmit={onSubmitf}>
                Todo:
                <br />
                <input type='text' 
                placeholder='type here...'
                onChange={(e)=>setTodo(e.target.value)}/> <br/>
                <br />
                <button type="submit" >SAVE ToDo</button>
            </form>    
            {todoStatus?(<h3 style={{"color":"green"}}>input fild cant be empty! Type your todo.</h3>):""}
            {loader ? <Loader /> : <></>}
      </div>
    )
}

export default Create ;