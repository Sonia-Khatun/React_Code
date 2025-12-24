import React, { useEffect, useState } from 'react'

export default function Timer() {
  const [count, setfirst] = useState(0)
  
  useEffect(() => {
    console.log(count)
  }, [count])
  

  return (
    <>
    <div>useEffects</div>
    <h3>count : {count}</h3>
    <button onClick={() =>{setfirst(count + 1)}}>click Me </button>
    </>
    

  )
}
