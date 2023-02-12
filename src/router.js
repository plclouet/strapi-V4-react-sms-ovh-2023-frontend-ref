import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LoginForm from './components/LoginForm/LoginForm';
import HomePage from './pages/HomePage/HomePage';
import ListPage from './pages/ListPage/ListPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/listpage',
        element: <ListPage />,
      },
      {
        path: '/login',
        element: <LoginForm />
      }
    ],
  },
]);