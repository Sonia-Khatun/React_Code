import React from 'react'
import { Route, Routes, Navigate} from 'react-router-dom'
import Home from './Components/Home';
import Count from './Components/Count';
import DefaultProp from './Components/DefaultProp';
import ControlledIn from './Components/ControlledIn';
import EventComp from './Components/EventComp';
import ClientForm from './Components/RegistrantionPage/ClientForm';
import UseEffects from './Components/UseEffects'
import UseRef from './Components/UseRef';
import USecallBack from './Components/USecallBack';
import Register from './Components/RegistrantionPage/Register';


export default function App() {

  const routes = [
    {
      path: "/",
      element: <Navigate to="/register" />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/clientform",
      element: <ClientForm />
    }
    
  ]

  return (
   
      <Routes>
        {routes.map ((route, index) => (
          <Route
          key={index}
          path={route.path}
          element={route.element}
          />

        ))}
      </Routes>
      
    
  )
}

