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

  const [error, setError] = useState("")

  const handlechange = (e) => {
    // console.log(e.target.name, e.target.value);
    
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   // console.log(e.target);
  //   console.log("Form Submitted", formData);
  //   setclients([...clients, formData]);

  //     setformData({
  //     clientID: "",
  //     clientName: "",
  //     clientAge: "",
  //     clientAddress: "",
  //   });
  // };

  const handleEdit = (index) => {
  setformData(clients[index]);   
  setEditingIndex(index);        
};

const handleSubmit = (e) => {
  e.preventDefault();

 

  const regex = /^[A-Za-z\s]*$/;

  if(!regex.test(formData.clientName)){
    setError("Name should contain Character");
    return;
  }
  const reg = /[0-9]/;
  
  if(!reg.test(formData.clientAge)){
    setError("Age should contain digit");
    return;
  }

   const duplicateID = clients.find((client) => 
    client.clientID === formData.clientID
  )

  if(duplicateID){
    setError("ClientID already exist");
    return;
  }

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


  // const handleRemove = (indexToRemove) => {
  
  //   const updatedClient = [];

  //   for (let i = 0; i < clients.length; i++) {
  //     if (i !== indexToRemove) {
  //       updatedClient.push(clients[i]);
  //     }
  //   }
  //   setclients(updatedClient);
  // };
 
  const handleRemove =(indexToRemove) => {
    const updatedClient = clients.filter((_, index) => {
      return index !== indexToRemove;
    });
    setclients(updatedClient)
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
          <div className="clientcell">
            <label htmlFor="">Client Name : </label>
            <input
              type="text"
              name="clientName"
              placeholder="Enter Your Name"
              required
              value={formData.clientName}
              onChange={handlechange}
            />
          </div>
          <div className="clientcell">
            <label htmlFor="">Client Age : </label>
            <input
              type="text"
              name="clientAge"
              placeholder="Enter your Age"
              required
              value={formData.clientAge}
              onChange={handlechange}
            />
          </div>

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
          {error && <p style={{color: "red", fontWeight: 600}}>{error}</p>}
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <ClientChild newClient={clients} removeClient={handleRemove} editClient ={handleEdit} />
    </>
  );
}
