import React, { useState } from "react";
import "./clientForm.css";
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

  const handleSubmit = (e) => {
  e.preventDefault();


  if (editingIndex === null) {
    // New Client
    setclients([...clients, formData]);
  } else {
    // Edit client
    const updatedClients = clients.map((client, index) => {
      if (index === editingIndex) {
        return formData;   
      }
      return client;
    });
    setclients(updatedClients);
    setEditingIndex(null);
  }



  setformData({
    clientID: "",
    clientName: "",
    clientAge: "",
    clientAddress: "",
  });
};

 
  const handleRemove =(indexToRemove) => {
    const updatedClient = clients.filter((_, index) => {
      return index !== indexToRemove;
    });
    setclients(updatedClient)
  }
   const handleEdit = (index) => {
   setformData(clients[index]);   
   setEditingIndex(index);  
  } 

  return (
    <>
      <div className="C-form">
        <h3 className="client-header">Client Details</h3>

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

