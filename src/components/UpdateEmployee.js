import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "./api";

const UpdateEmployee = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadEmployee = async () => {
      const response = await getEmployeeById(id);
      setFormData(response.data);
    };
    loadEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(id, formData);
      alert("Employee updated successfully!");
      navigate("/employees");
    } catch (error) {
      alert("Error updating employee.");
    }
  };

  return (
    <div className="container">
      <h2>Update Employee</h2>
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
        <button type="submit" className="btn btn-success mt-3">
          Save
        </button>
        <button
          onClick={() => navigate("/employees")}
          className="btn btn-danger mt-3 mx-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;