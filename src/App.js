import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Navbar from './components/Navbar';

function App() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const addRole = (role) => {
    setRoles([...roles, role]);
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard userCount={users.length} roleCount={roles.length} />}
        />
        <Route
          path="/users"
          element={<Users users={users} addUser={addUser} />}
        />
        <Route
          path="/roles"
          element={<Roles roles={roles} addRole={addRole} />}
        />
      </Routes>
    </div>
  );
}

export default App;
