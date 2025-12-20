import React from 'react'

export default function EventComp() {
  const buttonClicked = (val) => {
   console.log("Button Clicked", val);
   }
  return (
    <>
    <button onClick={buttonClicked}>Click Me</button>
    </>
  )
} 
