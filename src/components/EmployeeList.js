import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchEmployees, deleteEmployee, searchEmployees } from "./api";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({ department: "", position: "" });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await fetchEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        setEmployees(employees.filter((emp) => emp._id !== id));
      } catch (error) {
        console.error("Error deleting employee:", error.message);
      }
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await searchEmployees(filters);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error searching employees:", error.message);
    }
  };

  const handleReset = () => {
    setFilters({ department: "", position: "" });
    loadEmployees();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="container">
      <h2>Employees List</h2>
      <Link to="/add-employee" className="btn btn-primary mb-3">
        Add Employee
      </Link>
      <form onSubmit={handleSearch} className="mb-3">
        <div className="row g-3">
          <div className="col-md-5">
            <input
              type="text"
              name="department"
              className="form-control"
              placeholder="Search by Department"
              value={filters.department}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              name="position"
              className="form-control"
              placeholder="Search by Position"
              value={filters.position}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">
              Search
            </button>
          </div>
          <div className="col-md-2">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary w-100"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>
                <Link to={`/update-employee/${employee._id}`} className="btn btn-info">
                  Update
                </Link>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
                <Link to={`/view-employee/${employee._id}`} className="btn btn-secondary">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;