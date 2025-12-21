import React from 'react'
import './clientForm.css'

export default function ClientChild(props) {
  const clientDet = props.newClient;
  const removeRow = props.removeClient;
  const editDet = props.editClient;
  return (
    <table border="1" cellPadding="10">
    <thead>
      <tr>
        <th>Client_ID</th>
        <th>Client_Name</th>
        <th>Client_Age</th>
        <th>Client_Address</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {clientDet.map((client, index)=>(
        <tr key={client.clientID}>

          <td>{client.clientID}</td>
          <td>{client.clientName}</td>
          <td>{client.clientAge}</td>
          <td>{client.clientAddress}</td>
          <td>
            <button className='btn'onClick={()=> editDet(index)}>Edit</button>
            <button className='btn' onClick={()=> removeRow(index)}>Remove</button>
          </td>
        </tr>
      ))}
    </tbody>
    </table>
    
  )
}
