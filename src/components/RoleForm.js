import React, { useState } from 'react';
import '../styles/RoleForm.css';

const RoleForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [permissions, setPermissions] = useState(initialData?.permissions || []);

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setPermissions((prevPermissions) =>
      checked
        ? [...prevPermissions, value]
        : prevPermissions.filter((perm) => perm !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, permissions });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Role Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <div>
        <label>
          <input
            type="checkbox"
            value="read"
            checked={permissions.includes('read')}
            onChange={handlePermissionChange}
          />
          Read
        </label>
        <label>
          <input
            type="checkbox"
            value="write"
            checked={permissions.includes('write')}
            onChange={handlePermissionChange}
          />
          Write
        </label>
        <label>
          <input
            type="checkbox"
            value="delete"
            checked={permissions.includes('delete')}
            onChange={handlePermissionChange}
          />
          Delete
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RoleForm;
