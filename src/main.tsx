import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TodoList from './components/TodoList.tsx';
import Perfil from './components/perfil.tsx';
import MainLayout from './components/MainLayout.tsx';
import Form from './components/Form.tsx';
import CreateTask from './modals/CreateTask.tsx';
import TaskContainer from './components/TaskContainer.tsx'; // I
import ErrorPage from './components/ErrorPage.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
     errorElement: <ErrorPage />,
    children: [
      {
        path: "perfil/:contactId",
        element: <Perfil />,
      },
      {
        path: "task/createtask",
        element: <CreateTask />,
      },
      {
        path: "tasks",
        element: <TaskContainer />, 
      }
    ],
  },
  {
    path: 'login',
    element: <Form />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);