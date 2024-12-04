import React, { useState, useEffect } from "react";
import '../styles/RoleManagement.css'; 

const RoleManagement = () => {
  const [roles, setRoles] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call to fetch roles
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch("/api/roles"); 
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  // Handle add role action
  const handleAddRole = () => {
    const newRole = {
      id: roles.length + 1, // Example role ID generation
      name: "New Role",
    };
    setRoles([...roles, newRole]);  // Add new role to the list
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={handleAddRole}>Add Role</button>
      <div>
        {roles?.length > 0 ? (
          roles.map((role) => (
            <div key={role.id}>
              {/* Safe check for undefined role */}
              <p>{role?.name || "No name available"}</p>
            </div>
          ))
        ) : (
          <p>No roles available</p> // Fallback message if no roles
        )}
      </div>
    </div>
  );
};

export default RoleManagement;
