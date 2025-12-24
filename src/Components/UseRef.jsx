import React, { useRef } from 'react'

export default function UseRef() {
   
  const name = useRef();
  const password = useRef();
  
  const submitHandler = (e) =>{
   e.preventDefault()
   console.log(name.current.value, password.current.value);

  }

  return (
    <>
    <div>UseRef</div>
    <form onSubmit={submitHandler}>
        <input type="text" id='text' ref={name}/>
        <br />
        <input type="password" id='password' ref={password} />
        <br />
        <button>click Me</button>
    </form>
    </>
   
  )
}
