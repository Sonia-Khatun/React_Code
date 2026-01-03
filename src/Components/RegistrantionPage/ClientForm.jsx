import React, { useEffect, useState } from "react";
import "./clientForm.css"
import { useNavigate } from "react-router-dom"
import ClientChild from "./ClientChild";

export default function ClientForm() {
  const [formData, setformData] = useState({
    clientID: "",
    clientName: "",
    clientAge: "",   
    clientAddress: "",
  });
  const [clients, setclients] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();

  const handlechange = (e) => {
    // console.log(e.target.name, e.target.value);
  const {name, value} = e.target;
  
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    });

    let newError = { ...errors };
    
    

    if(name === "clientName"){
    const regex = /^[A-Za-z\s]*$/;
    if(!regex.test(value)){
      newError.clientName = "Name should contain Character"
    }else{
      delete newError.clientName 
    }
   } 
 
  
    if(name === "clientAge"){
     if(!value){
        delete newError.clientAge;
    }
    else if(!/^\d+$/.test(value)){
      newError.clientAge = "Age should contain digits Only"
    }
    else {
      delete newError.clientAge
    }
  }

  setErrors(newError);
};

 const loggedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
 const loggedUserName = loggedUser?.name

 const fetchTableData = async () =>{
   await fetch(`http://localhost:3000/clients?createdBy=${loggedUserName}`)
    .then(res => res.json())
    .then(data => setclients(data));

 }

 useEffect(() => {
   if (!loggedUserName) {
    navigate("/register");
    
    return;
  }

 fetchTableData();
   
}, [loggedUserName]);


  const handleSubmit = async (e) => {
  e.preventDefault();

    const clientData = {
    clientID : formData.clientID,
    clientName: formData.clientName,
    clientAge : formData.clientAge,
    clientAddress : formData.clientAddress,
    createdBy : loggedUser.name
  }

  try{

  const response = await fetch("http://localhost:3000/clients", {
      method: "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(clientData)

    });
    console.log(response);

    if(response?.status === 201){
      fetchTableData();
    }


    

   alert("Client Data saved Successfully")
   }catch(error){
   alert("Failed to save")
   }
   
   const savedClient = await response.json();
   setclients([...clients, savedClient])

   setformData({
    clientID: "",
    clientName: "",
    clientAge: "",
    clientAddress: "",
  });
};

  const handleLogout = () =>{
    sessionStorage.removeItem("loggedInUser");
    navigate("/register")
  }


  const handleRemove = async (id) =>{
    try{
      await fetch(`http://localhost:3000/clients/${id}`,{
      method: "Delete"
    });
    setclients(clients.filter(client => client.id !== id))
    } catch(error){
     alert("Failed to delete client");
    }
  };
  

   const handleEdit = (index) => {
   setformData(clients[index]);   
   setEditingIndex(index);  
  } 

  return (
    <>
      <div className="C-form">
        <div className="clientForm-header">
          <h3 className="client-header">Client Details</h3>
          <button onClick={handleLogout}
          className="header-btn">
          Logout
          </button>
        </div>
       
        <form
          className="client-form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="field"> 
          <div className="clientcell">
            <label>Client ID : </label>
            <input
              type="text"
              name="clientID"
              placeholder="Enter Your ID"
              required
              value={formData.clientID}
              onChange={handlechange}
            />
          </div>
          <div className="error-text">
           {errors.clientID ? errors.clientID : ""}
          </div>
          </div>
          <div className="field">
          <div className="clientcell">
            <label>Client Name : </label>
            <input
              type="text"
              name="clientName"
              placeholder="Enter Your Name"
              required
              value={formData.clientName}
              onChange={handlechange}
            />
          </div>
          <div className="error-text">
            {errors.clientName ? errors.clientName : ""}
          </div>
          </div>
          <div className="field"> 
          <div className="clientcell">
            <label>Client Age : </label>
            <input
              type="text"
              name="clientAge"
              placeholder="Enter your Age"
              required
              value={formData.clientAge}
              onChange={handlechange}
            />
          </div>
          <div className="error-text">
           {errors.clientAge ? errors.clientAge : ""}
          </div>
    
          </div>
          <div className="field"> 
          <div className="clientcell">
            <label htmlFor="">Client Address : </label>
            <input
              type="address"
              name="clientAddress"
              placeholder="Enter Your Address"
              required
              value={formData.clientAddress}
              onChange={handlechange}
            />
          </div>
          <div className="error-text">
           {errors.clientAddress ? errors.clientAddress : ""}
          </div>
          </div>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <ClientChild newClient={clients} removeClient={handleRemove} editClient ={handleEdit} />
    </>
  );
}

