import React, { useState } from "react";
import { searchEmployees } from "./api";

const SearchEmployees = () => {
  const [searchParams, setSearchParams] = useState({
    department: "",
    position: "",
  });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
    console.log("Updated searchParams:", { ...searchParams, [name]: value }); // Debug log
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Search initiated with searchParams:", searchParams); // Debug log

    try {
      const response = await searchEmployees(searchParams);
      console.log("Search results from API:", response.data); // Debug log
      setResults(response.data);
    } catch (error) {
      console.error("Error during search:", error.response?.data || error.message);
      alert("Error occurred while searching. Please check the console for details.");
    }
  };

  return (
    <div>
      <h2>Search Employees</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={searchParams.department}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Position</label>
          <input
            type="text"
            name="position"
            value={searchParams.position}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <h3>Results:</h3>
      {results.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <ul>
          {results.map((employee) => (
            <li key={employee._id}>
              {employee.first_name} {employee.last_name} ({employee.position})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchEmployees;