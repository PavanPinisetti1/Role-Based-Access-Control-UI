import React, { useState, useEffect } from 'react';
import '../styles/Roles.css';

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [newRole, setNewRole] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [editRoleId, setEditRoleId] = useState(null);
    const [editRoleName, setEditRoleName] = useState('');

    // Load roles from localStorage on page load
    useEffect(() => {
        const storedRoles = JSON.parse(localStorage.getItem('roles'));
        if (storedRoles) {
            setRoles(storedRoles);
        }
    }, []);

    // Save roles to localStorage whenever the roles state changes
    useEffect(() => {
        localStorage.setItem('roles', JSON.stringify(roles));
    }, [roles]);

    const handleAddRole = () => {
        if (newRole.trim() === '') {
            alert('Role name cannot be empty');
            return;
        }

        const newRoleObj = {
            id: roles.length + 1,
            name: newRole
        };

        setRoles([...roles, newRoleObj]);
        setNewRole('');
        setIsAdding(false);
    };

    const handleEditRole = (roleId) => {
        const roleToEdit = roles.find((role) => role.id === roleId);
        setEditRoleId(roleId);
        setEditRoleName(roleToEdit.name);
    };

    const handleSaveEdit = () => {
        if (editRoleName.trim() === '') {
            alert('Role name cannot be empty');
            return;
        }

        const updatedRoles = roles.map((role) =>
            role.id === editRoleId ? { ...role, name: editRoleName } : role
        );
        setRoles(updatedRoles);
        setEditRoleId(null);
        setEditRoleName('');
    };

    const handleDeleteRole = (roleId) => {
        const updatedRoles = roles.filter((role) => role.id !== roleId);
        setRoles(updatedRoles);
    };
    

    return (
        <div className="roles-container">
            <h1 className="roles-header">Roles Management</h1>

            {isAdding ? (
                <div className="add-role-container">
                    <input
                        type="text"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="role-input"
                        placeholder="Enter new role"
                    />
                    <button className="add-role-button" onClick={handleAddRole}>
                        Add Role
                    </button>
                    <button
                        className="cancel-role-button"
                        onClick={() => setIsAdding(false)}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <button className="add-role-button" onClick={() => setIsAdding(true)}>
                    Add Role
                </button>
            )}

            {/* Editing a role */}
            {editRoleId && (
                <div className="edit-role-container">
                    <input
                        type="text"
                        value={editRoleName}
                        onChange={(e) => setEditRoleName(e.target.value)}
                        className="role-input"
                        placeholder="Edit role name"
                    />
                    <button className="save-role-button" onClick={handleSaveEdit}>
                        Save Changes
                    </button>
                    <button
                        className="cancel-role-button"
                        onClick={() => setEditRoleId(null)}
                    >
                        Cancel Edit
                    </button>
                </div>
            )}

            <ul className="roles-list">
                {roles.map((role) => (
                    <li key={role.id} className="role-item">
                        <span className="role-name">{role.name}</span>
                        <div className="role-actions">
                            <button
                                className="role-button"
                                onClick={() => handleEditRole(role.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="role-button"
                                onClick={() => handleDeleteRole(role.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Roles;
