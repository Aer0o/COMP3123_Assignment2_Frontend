import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById } from "./api";

const ViewEmployee = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams(); // Extract employee ID from the route
  const navigate = useNavigate(); // Navigation function for the back button

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const response = await getEmployeeById(id);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error.response?.data || error.message);
        alert("Employee not found or an error occurred.");
      }
    };

    loadEmployee();
  }, [id]);

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2>View Employee</h2>
      <p>
        <strong>First Name:</strong> {employee.first_name}
      </p>
      <p>
        <strong>Last Name:</strong> {employee.last_name}
      </p>
      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Position:</strong> {employee.position}
      </p>
      <p>
        <strong>Department:</strong> {employee.department}
      </p>
      <p>
        <strong>Salary:</strong> ${employee.salary}
      </p>
      <button
        onClick={() => navigate("/employees")} // Navigate back to the Employee List
        className="btn btn-primary mt-3"
      >
        Back to Employees
      </button>
    </div>
  );
};

export default ViewEmployee;