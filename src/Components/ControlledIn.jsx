import React, { useState } from 'react'

export default function ControlledIn() {
    
 const [name, setName] = useState("");
  return (
    <>
    <input 
    type='text'
    value={name}
    onChange={(e) => setName(e.value)}
    />

    </>
  )
}
