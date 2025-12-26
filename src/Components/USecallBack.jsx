import React, { useCallback, useState } from 'react'

export default function USecallBack() {
  const [count, setcount] = useState(0)
  const [name, setname] = useState("Abc")

  const increcount = ()=>{
    setcount(count +1)
  }

  const toggleName = ()=>{
    setname(name === "Abc" ? "Bca" : "Abc")
  }

  const handleclick = useCallback(()=>{
    console.log("Button clicked");
    console.log("current Name", name);
    console.log("Current count", count);
    
},[count, name]);

console.log(handleclick);

  return (
    <>
    <p>count : {count}</p>
    <p>Name : {name}</p>
    <button onClick={handleclick}>click Me</button><br /> <br />
    <button onClick={increcount}>Increment count</button>
    <button onClick={toggleName}>toggle Name</button>
    </>
  )
}
