import React from 'react'
import './Blog.css'
import ReadmoreLess from './ReadmoreLess'

const Blog=(props)=>{
    const{title,date, describtion} = props.data   
    // console.log(props.data.image.data.data) 

    const base64Str = btoa(
        String.fromCharCode(...new Uint8Array((props.data.image?.data.data)))
    )

    return (
        <div className='Blog-container'>
            <div>
                <img src={`data:image/png;base64,${base64Str}`} alt="shsh" />
            </div>
            <h2>blog</h2>
            <h3>title:{title}</h3>
                 <p>describtion:
            <ReadmoreLess>
            {describtion} 
            </ReadmoreLess>
            </p> 
         <p>Date: {date}</p>   
      </div>
    )
}

export default Blog;