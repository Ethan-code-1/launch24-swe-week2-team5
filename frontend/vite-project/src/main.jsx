import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Discover } from './roots/Discover.jsx'
import  Home  from './roots/Home.jsx'
import { Forum } from './roots/Forum.jsx'
import { Login } from './roots/Login.jsx'
import { Profile } from './roots/Profile.jsx'
import { TopArtists } from './roots/TopArtists.jsx'
import { TopSongs } from './roots/TopSongs.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forum',
    element: <Forum  />,
  },
  {
    path: '/discover',
    element: <Discover  />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/top-artists',
    element: <TopArtists />,
  },
  {
    path: '/top-songs',
    element: <TopSongs />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
