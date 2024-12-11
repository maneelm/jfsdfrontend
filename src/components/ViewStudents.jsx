// ViewStudents.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import './ViewStudents.css';
import { FaSearch, FaUserGraduate } from 'react-icons/fa';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/students");
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching students data");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedStudents = React.useMemo(() => {
    if (!sortConfig.key) return students;

    return [...students].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [students, sortConfig]);

  const filteredStudents = sortedStudents.filter(student =>
    Object.values(student).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) return (
    <div className="loading-container">
      <div className="loader"></div>
      <p>Loading students...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="page-container">
      <div className="fixed-navbar">
           <AdminNavbar />
        </div>
      <div className="view-students-container">
        <div className="header-section">
          <div className="title-container">
            <FaUserGraduate className="title-icon" />
            <h2>Student Directory</h2>
          </div>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                {['ID', 'Name', 'Email', 'Password'].map(header => (
                  <th 
                    key={header.toLowerCase()} 
                    onClick={() => handleSort(header.toLowerCase())}
                    className={sortConfig.key === header.toLowerCase() ? `sorted-${sortConfig.direction}` : ''}
                  >
                    {header}
                    <span className="sort-indicator"></span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="table-footer">
          <p>Total Students: {filteredStudents.length}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewStudents;