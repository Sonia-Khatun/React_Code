import './Count.css'
import React, { useEffect, useState } from 'react'
import CountChild from './CountChild'

export default function Count() {
 const [counts, setCounts] = useState(0);


  function updateCount() {
    setCounts(counts + 1);
  }
  function decreaseCount(){
    setCounts(counts - 1);
    } 
  
    useEffect(() => {
    document.title = `Count: ${counts}`;
  }, [counts]);
    return ( 

    <>
    
    <CountChild count={counts} />
    <button className='btn' onClick={updateCount}>Increase Value</button>
    <button className='btn' onClick={(decreaseCount)}>Decrease Value</button>
    </>
  )
}
