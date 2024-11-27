import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "./api";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    department: "",
    salary: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure salary is a number
      const finalFormData = {
        ...formData,
        salary: Number(formData.salary),
      };
      await createEmployee(finalFormData);
      alert("Employee added successfully!");
      navigate("/employees");
    } catch (error) {
      console.error("Error adding employee:", error.response?.data || error.message);
      alert("Error adding employee. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            className="form-control"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            className="form-control"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Position</label>
          <input
            type="text"
            name="position"
            className="form-control"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            className="form-control"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            className="form-control"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Save
        </button>
        <button
          type="button"
          onClick={() => navigate("/employees")}
          className="btn btn-danger mt-3 mx-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
