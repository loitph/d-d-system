import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StorageProvider } from './contexts/Storage.context.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Auth/Login/Login.jsx'
import Register from './components/Auth/Register/Register.jsx'
import { AuthProvider } from './contexts/Auth.context.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: null,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      // {
      //   path: '',
      //   element: (
      //     <PrivateRoute>
      //       DetailPage

      //     </PrivateRoute>
      //   )
      // }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
]);

createRoot(document.getElementById('root')).render(
  // <StorageProvider>
    // <App />
  // </StorageProvider>

  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  // <StrictMode>
  // </StrictMode>,
)
