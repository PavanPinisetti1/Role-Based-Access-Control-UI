import React, { useState, useEffect } from "react";
import "../styles/Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // Save users to localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle adding a new user
  const handleAddUser = (e) => {
    e.preventDefault();
    if (user.name && user.email && user.role) {
      setUsers([...users, user]);
      setUser({ name: "", email: "", role: "" });
    }
  };

  // Handle editing an existing user
  const handleEditUser = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setUser(users[index]);
  };

  // Handle saving an edited user
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedUsers = [...users];
    updatedUsers[editIndex] = user;
    setUsers(updatedUsers);
    setEditMode(false);
    setUser({ name: "", email: "", role: "" });
  };

  // Handle deleting a user
  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div className="users-container">
      <h2 className="users-title">{editMode ? "Edit User" : "Add User"}</h2>
      <form
        onSubmit={editMode ? handleSaveEdit : handleAddUser}
        className="user-form"
      >
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter name"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Role</label>
          <input
            type="text"
            name="role"
            value={user.role}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter role"
          />
        </div>
        <button type="submit" className="submit-btn">
          {editMode ? "Save Changes" : "Add User"}
        </button>
      </form>

      <h3 className="users-list-title">Users List</h3>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEditUser(index)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteUser(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
