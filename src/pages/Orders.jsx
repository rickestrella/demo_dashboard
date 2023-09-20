import React, { useState } from "react";
import Header from "../components/Header";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"; // "@/components/ui/table"

import Pagination from "../components/ui/table-pagination";

import { ordersGrid, ordersData } from "../data/dummy";

const Orders = () => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [sorting, setSorting] = useState({
    column: null,
    order: null,
  });

  const handleHeaderClick = (clickedColumn) => {
    if (clickedColumn !== "Image") {
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
    }
  };

  const sortedData = [...ordersData].sort((a, b) => {
    const aValue = a[sorting.column];
    const bValue = b[sorting.column];

    if (sorting.column === "TotalAmount" || sorting.column === "OrderID") {
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

  // Pagination

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

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
      <Header category={"Page"} title="Orders" />
      <Table>
        {/* <TableCaption>List of all the orders</TableCaption> */}
        <TableHeader>
          <TableRow>
            {ordersGrid.map((item, index) => (
              <TableHead
                key={index}
                onClick={() => handleHeaderClick(item.field)}
                className={`${
                  item.headerText === "Image"
                    ? "hover:cursor-default pointer-events-none"
                    : "hover:cursor-pointer pointer-events-auto"
                } w-[${item.width}px] text-center ${item.field === sorting.column ? "font-bold" : "font-medium"}`}
              >
                {item.headerText}
                {sorting.column === item.field && (
                  <span
                    className={`ml-1 ${
                      sorting.order === "asc" ? "text-green-500" : "text-red-500"
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
          {currentItems.map((order, index) => (
            <TableRow key={index} className="hover:bg-slate-300 text-center">
              <TableCell className="w-32">
                <img
                  src={order.ProductImage}
                  alt={order.OrderItems}
                  className="w-20 h-20 object-contain rounded-3xl"
                />
              </TableCell>
              <TableCell>{order.OrderItems}</TableCell>
              <TableCell>{order.CustomerName}</TableCell>
              <TableCell>$ {order.TotalAmount}</TableCell>
              <TableCell
                className={`flex w-[5.25rem] justify-center h-5 items-center mx-auto !mt-11 md:mt-6 rounded-full ${
                  order.Status === "pending"
                    ? "bg-orange-500"
                    : order.Status === "active"
                    ? "bg-green-500"
                    : order.Status === "complete"
                    ? "bg-yellow-500"
                    : order.Status === "canceled"
                    ? "bg-red-600"
                    : "bg-gray-500"
                } text-white capitalize`}
              >
                {order.Status}
              </TableCell>
              <TableCell>{order.OrderID}</TableCell>
              <TableCell>{order.Location}</TableCell>
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
    </div>
  );
};

export default Orders;
