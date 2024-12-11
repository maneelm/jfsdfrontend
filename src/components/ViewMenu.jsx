import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar'; // Import the AdminNavbar component
import './ViewMenu.css'; // Import the CSS for the ViewMenu

const ViewMenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/menu/all');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div>
      <AdminNavbar /> {/* Include the AdminNavbar component */}
      <div className="menu-container">
        <h2>Menu</h2>
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-card">
              <div className="menu-card-inner">
                <div className="menu-card-front">
                  <img src={`http://localhost:8080${item.pictureUrl}`} alt={item.itemName} className="menu-image" />
                  <div className="menu-details">
                    <h3>{item.itemName}</h3>
                    <p>{item.description}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="menu-card-back">
                  <h3>{item.itemName}</h3>
                  <p>{item.description}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Item ID: {item.id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewMenu;
