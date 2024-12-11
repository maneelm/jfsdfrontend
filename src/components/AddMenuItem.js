import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar'; // Import the AdminNavbar component
import './AddMenuItem.css'; // Import the CSS for the AddMenuItem

const AddMenuItem = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/menu/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Menu item added successfully!');
      console.log('Menu item added:', response.data);
    } catch (error) {
      setMessage('Error adding menu item');
      console.error('Error adding menu item:', error);
    }
  };

  return (
    <div>
      <AdminNavbar /> {/* Include the AdminNavbar component */}
      <div className="add-menu-item-container">
        <h2>Add Menu Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <button type="submit">Add Menu Item</button>
        </form>
        {message && <p className={message.includes('successfully') ? 'success-message' : 'error-message'}>{message}</p>}
      </div>
    </div>
  );
};

export default AddMenuItem;
