import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"; // "@/components/ui/table"

import Pagination from "../components/ui/table-pagination";

import { employeesGrid, employeesData } from "../data/dummy";
import { GrLocationPin } from "react-icons/gr";

const Employees = () => {
  // Data

  const [data, setData] = useState([]);
  useEffect(() => {
    // Fetch data from the API and set it in the state
    // setData(responseData);
    setData(employeesData);
    // setData("");
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sorting
  const [sorting, setSorting] = useState({
    column: null,
    order: null,
  });

  const handleHeaderClick = (clickedColumn) => {
    setSorting((prevSorting) => {
      if (prevSorting.column === clickedColumn) {
        // Toggle between ascending and descending order if same column is clicked
        return {
          column: clickedColumn,
          order:
            prevSorting.order === null
              ? "desc"
              : prevSorting.order === "desc"
              ? "asc"
              : "desc",
        };
      } else {
        // Set new column and default to ascending order
        return {
          column: clickedColumn,
          order: "asc",
        };
      }
    });
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sorting.column];
    const bValue = b[sorting.column];

    if (sorting.column === "EmployeeID") {
      // Compare numeric values
      return sorting.order === "desc" ? aValue - bValue : bValue - aValue;
    } else if (typeof aValue === "string" && typeof bValue === "string") {
      // Compare string values
      return sorting.order === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      // Fallback to maintaining the existing order if values can't be compared
      return 0;
    }
  });

  // Filtering

  const [filter, setFilter] = useState("");

  const handleFilter = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1);
  };

  const filteredData = sortedData.filter((order) => {
    return Object.values(order).some((value) =>
      value.toString().toLowerCase().includes(filter.toLowerCase())
    );
  });

  // Pagination

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mt-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={"Page"} title="Employees" />
      {!data ? (
        <>
          <span className="block text-center text-gray-400 font-bold text-xl w-fit justify-center mx-auto">
            No data to display
          </span>
        </>
      ) : (
        <>
          <div className="relative w-fit">
            <input
              type="text"
              onChange={handleFilter}
              value={filter}
              placeholder="Search..."
              className="px-4 py-2 pr-7 border rounded-md mb-4"
            />
            {filter.length >= 1 && (
              <button
                type="button"
                onClick={() => setFilter("")}
                className="absolute right-[0.6rem] top-1.5 text-gray-400 font-black text-xl"
              >
                x
              </button>
            )}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                {employeesGrid.map((item, index) => (
                  <TableHead
                    key={index}
                    onClick={() => handleHeaderClick(item.field)}
                    className={`${
                      item.headerText === "Image"
                        ? "hover:cursor-default pointer-events-none"
                        : "hover:cursor-pointer pointer-events-auto"
                    } w-[${item.width}px] text-center ${
                      item.field === sorting.column
                        ? "font-bold"
                        : "font-medium"
                    }`}
                  >
                    {item.headerText}
                    {sorting.column === item.field && (
                      <span
                        className={`ml-1 ${
                          sorting.order === "asc"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {sorting.order === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((employee, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-slate-300 text-center items-center"
                >
                  <TableCell>
                    <div className="flex">
                      <img
                        src={employee.EmployeeImage}
                        alt={employee.Name}
                        className="w-12 h-12 object-contain rounded-full"
                      />
                      {employee.Name}
                    </div>
                  </TableCell>
                  <TableCell>{employee.Title}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <GrLocationPin />
                      {employee.Country}
                    </div>
                  </TableCell>
                  <TableCell>{employee.HireDate}</TableCell>
                  <TableCell>{employee.ReportsTo}</TableCell>
                  <TableCell>{employee.EmployeeID}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={nextPage}
            onPrev={prevPage}
            onPageClick={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Employees;
