import React, { useState } from 'react'
import Child from './Child'
export default function Home() {
    // let num = 123;
    // let name = "Abc";
    // const [name, updateName] = useState("Abc");
    // function changeName(){
    //   updateName("Bca");
    // }

    // const [count, UpdateCount] = useState(0);
    // function changeCount(){
    //   UpdateCount (count + 1);
    // }
    // const [name, setName] = useState("");

    // function newName(data){
    //   setName(data)
    // }
    
    const [count, setcount] = useState(0);
    function changeCount(){
      setcount(count + 1);
    }

    return (

    <>
    {/* <Child data = {{num, name}} /> */}
    {/* <h3>Name: {name}</h3>
    <button onClick={changeName}>Change Name</button> */}
    {/* <h3>Count : {count}</h3>
    <button onClick={changeCount}>Click Me</button> */}
    {/* <div>Name from Child: {name}</div>
    <Child sendName={newName} /> */}
    <Child />
    <button>Update Value</button>
    </>
  )
}
