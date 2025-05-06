import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/features/userSlice";
import { getAllEmployees } from "../redux/features/employeeSlice";
import EmployeeTable from "../components/EmployeeTable";

const initialState = {
  fullName: "",
  age: "",
  gender: "",
  role: "employee",
  email: "",
  password: "",
};

const Employee = () => {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector((state) => state.employee);

  console.log(employees, loading, error);

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    setFormData(initialState);
  };

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  return (
    <div>
      <div className="bg-white shadow p-4 rounded-md">
        <h1 className="text-xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Team Member Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-4 items-center "
        >
          <div>
            <label className="block font-medium text-blue-900">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-1 border border-gray-500 outline-none rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-blue-900">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-1 border border-gray-500 outline-none rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-blue-900">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-1 border border-gray-500 outline-none rounded-md"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-blue-900">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-1 border border-gray-500 outline-none rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-blue-900">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-1 border border-gray-500 outline-none rounded-md"
              required
            />
          </div>

          <div className="flex mt-auto">
            <button
              type="submit"
              className="w-full bg-blue-100 text-blue-800 cursor-pointer px-2 py-1 rounded-md flex items-center justify-center gap-2 hover:bg-blue-200 transition"
            >
              <Icon icon="akar-icons:circle-check" width="18" height="18" />
              <span>Submit</span>
            </button>
          </div>
        </form>
      </div>

      <EmployeeTable employees={employees} />
    </div>
  );
};

export default Employee;
