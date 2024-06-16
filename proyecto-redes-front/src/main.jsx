import React from 'react'
import ReactDOM from 'react-dom/client'
import FrontPage from './routes/frontpage/FrontPage.jsx'
import TestVelocidad from './routes/testVelocidad/TestVelocidad.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TestLatencias from './routes/testLatencias/TestLatencias.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage/>
  },
  {
    path: "/testVelocidad",
    element: <TestVelocidad/>
  },
  {
    path: "/testLatencias",
    element: <TestLatencias/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
