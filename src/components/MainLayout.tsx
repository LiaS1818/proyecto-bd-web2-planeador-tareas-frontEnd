import React from 'react';
import { Outlet } from 'react-router-dom';
import TodoList from './TodoList';

const MainLayout = () => {
  return (
    <div id="main">
      <TodoList />
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
