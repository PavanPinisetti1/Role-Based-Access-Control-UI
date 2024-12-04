import React, { useState } from 'react';
import './styles/PermissionManagement.css';

const PermissionManagement = () => {
    // Initial data for roles and permissions
    const initialRoles = [
        { id: 1, name: 'Admin', permissions: ['view', 'edit', 'delete'] },
        { id: 2, name: 'Editor', permissions: ['view', 'edit'] },
        { id: 3, name: 'Viewer', permissions: ['view'] }
    ];

    const allPermissions = ['view', 'edit', 'delete', 'publish', 'archive'];

    const [roles, setRoles] = useState(initialRoles);

    // Handle permission change
    const handlePermissionChange = (roleId, permission) => {
        setRoles((prevRoles) =>
            prevRoles.map((role) =>
                role.id === roleId
                    ? {
                          ...role,
                          permissions: role.permissions.includes(permission)
                              ? role.permissions.filter((perm) => perm !== permission)
                              : [...role.permissions, permission],
                      }
                    : role
            )
        );
    };

    return (
        <div className="permission-management">
            <h2>Manage Permissions for Roles</h2>

            {roles.length > 0 ? (
                roles.map((role) => (
                    <div key={role.id} className="role-permission">
                        <h3>{role.name}</h3>
                        <div className="permissions-list">
                            {allPermissions.map((permission) => (
                                <div key={permission} className="permission-item">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={role.permissions.includes(permission)}
                                            onChange={() => handlePermissionChange(role.id, permission)}
                                        />
                                        {permission}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>No roles available</p>
            )}
        </div>
    );
};

export default PermissionManagement;