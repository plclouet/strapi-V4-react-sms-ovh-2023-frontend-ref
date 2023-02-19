import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LoginForm from './components/LoginForm/LoginForm';
import HomePage from './pages/HomePage/HomePage';
import ListPage from './pages/ListPage/ListPage';
import ProfilPage from './pages/ProfilPage/ProfilPage';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { rootLoader } from './loaders/rootLoader';
import Signin from './pages/Signin/Signin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: rootLoader,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/listpage',
        element: (
          <ProtectedRoute>
            <ListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/profilpage',
        element: (
          <ProtectedRoute>
            <ProfilPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/signin',
        element: <Signin />
      },
    ],
  },
]);