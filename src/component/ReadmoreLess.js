import React, { useState } from 'react'

const ReadmoreLess = ({children}) => {
    // let sub = children.substring(0,5)
    // console.log(sub)
    // let con = children
    // console.log(con.substring(1,5))
    // console.log(children)
    // let strrr= 'hdjdhdjdjddjddk'

    const [readMstatus, setReadMstatus] = useState(false)

  return (
    <div>
      {readMstatus? children: children.substring(0,5)}
      {children.length > 5 ?
      <button 
      onClick={()=>{setReadMstatus(!readMstatus)}} 
      style={{color:'red',border:'none',cursor:'pointer'}}
      >{!readMstatus ? 'read more...':'...read less'}
      </button>
      : null}
    </div>
  )
}

export default ReadmoreLess
