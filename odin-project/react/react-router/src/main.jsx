import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Profile from './components/Profile'
import Spinach from './components/Spinach.jsx'
import Popeye from './components/Popeye.jsx'
import DefaultProfile from './components/DefaultProfile.jsx'
import ErrorPage from './components/ErrorPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/profile/:name',
    element: <Profile />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
