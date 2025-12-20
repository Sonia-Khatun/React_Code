import React from 'react'

export default function DefaultPChild({newName ="Guest", val = 18, city}) {
  return (
    <>
    
    <h3>{newName}</h3>
    <h3>{val}</h3>
    <h3>{city}</h3>
    </>
    
  )
}

