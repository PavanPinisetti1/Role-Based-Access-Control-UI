export const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor' },
  ];
  
  export const mockRoles = [
    { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'] },
    { id: 2, name: 'Editor', permissions: ['read', 'write'] },
  ];
  
  export const fetchUsers = () => new Promise(resolve => resolve(mockUsers));
  export const fetchRoles = () => new Promise(resolve => resolve(mockRoles));
  