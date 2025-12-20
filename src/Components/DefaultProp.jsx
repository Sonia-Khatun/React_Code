import React, { useEffect, useState } from 'react'
import DefaultPChild from './DefaultPChild'

export default function DefaultProp() {
    
//  const [obj, setobj] = useState({
//     name : "Abc",
//     age : 30,
//     address : "Kolkata"
//  });
//   let name;
//   let age;
//   let city = "Kolkata";
   const [isLoggedIn, setisLoggedIn] = useState(false);

   useEffect(()=>{
    alert("Hello")
   },[])
  return (
    <>
    <h4>{isLoggedIn ? "Welcome to the page": "Please Log in"}</h4>
    {/* <DefaultPChild newName={name} val={age} city={city}/> */}
    </>
    
  )
}
