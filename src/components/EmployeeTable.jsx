import { useState } from "react";
import { Icon } from "@iconify/react";

const EmployeeTable = ({ employees }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = employees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-white shadow-lg p-4 rounded-xl my-6 w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white capitalize">
            <tr>
              <th className="px-6 py-3 text-left font-bold">S No</th>
              <th className="px-6 py-3 text-left font-bold">Name</th>
              <th className="px-6 py-3 text-left font-bold">Age</th>
              <th className="px-6 py-3 text-left font-bold">Email</th>
              <th className="px-6 py-3 text-left font-bold">Gender</th>
              <th className="px-6 py-3 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((emp, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-purple-50"}
                >
                  <td className="px-6 py-3 border-t font-medium">
                    {idx < 10 ? `0${idx + 1}` : idx + 1}
                  </td>
                  <td className="px-6 py-3 border-t capitalize font-medium">
                    {emp.fullName}
                  </td>
                  <td className="px-6 py-3 border-t font-medium">{emp.age}</td>
                  <td className="px-6 py-3 border-t font-medium">
                    {emp.email}
                  </td>
                  <td className="px-6 py-3 border-t capitalize font-medium">
                    {emp.gender}
                  </td>
                  <td className="px-6 py-3 border-t capitalize font-medium flex justify-center">
                    <button className="inline-flex items-center gap-1 cursor-pointer bg-red-50 text-red-600 border border-red-300 px-3 py-1.5 rounded-md hover:bg-red-100 hover:text-red-700 transition-colors duration-200">
                      <Icon
                        icon="solar:trash-bin-minimalistic-broken"
                        width="20"
                        height="20"
                      />
                      <span className="text-sm font-medium">Delete</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-gray-500 border-t"
                >
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm cursor-pointer ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-100"
          }`}
        >
          <Icon icon="mdi:chevron-left" />
          Prev
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm cursor-pointer ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-100"
          }`}
        >
          Next
          <Icon icon="mdi:chevron-right" />
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;
