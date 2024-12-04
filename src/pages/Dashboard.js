import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = ({ userCount, roleCount, permissionCount }) => {
  const [recentActivities, setRecentActivities] = useState([]);
  
  // Fetching recent activities
  useEffect(() => {
    axios.get('/api/activities/recent')
      .then(response => {
        setRecentActivities(response.data); // assuming the response is an array of activities
      })
      .catch(error => console.error("Error fetching recent activities:", error));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to the Admin Panel</h1>
        <p>Overview of your application’s status and activities.</p>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>{userCount}</p>
        </div>
        <div className="card">
          <h3>Total Roles</h3>
          <p>{roleCount}</p>
        </div>
        <div className="card">
          <h3>Total Permissions</h3>
          <p>{permissionCount}</p>
        </div>
      </div>

      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <ul>
          {recentActivities.length === 0 ? (
            <li>No recent activities found.</li>
          ) : (
            recentActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))
          )}
        </ul>
      </div>

      <div className="chart">
        <h3>User Growth</h3>
        <div className="chart-content">
          <p>Graphical representation of user growth (this can be a placeholder or actual chart)</p>
        </div>
      </div>

      <div className="quick-access">
        <h3>Quick Access</h3>
        <ul>
          <li><a href="/users">Manage Users</a></li>
          <li><a href="/roles">Manage Roles</a></li>
          <li><a href="/permissions">Manage Permissions</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
