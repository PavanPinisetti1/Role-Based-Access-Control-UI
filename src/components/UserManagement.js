import React, { useState, useEffect } from "react";
import '../styles/UserManagement.css'; 
const UserManagement = () => {
  const [users, setUsers] = useState([]);  // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call to fetch users
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users"); // Replace with actual API endpoint
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Stops loading once data is fetched
    }
  };

  // Handle add user action
  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1, 
      name: "New User",
    };
    setUsers([...users, newUser]); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={handleAddUser}>Add User</button>
      <div>
        {users?.length > 0 ? (
          users.map((user) => (
            <div key={user.id}>
              {/* Safe check for undefined user */}
              <p>{user?.name || "No name available"}</p>
            </div>
          ))
        ) : (
          <p>No users available</p> 
        )}
      </div>
    </div>
  );
};

export default UserManagement;
