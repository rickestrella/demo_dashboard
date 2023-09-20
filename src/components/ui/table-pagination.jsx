import { useStateContext } from "../../contexts/ContextProvider";
import React, { useEffect } from "react";

const Pagination = ({ currentPage, totalPages, onNext, onPrev, onPageClick }) => {
  const { currentColor } = useStateContext();

  useEffect(() => {
    
  }, [currentColor])

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className={`${currentPage === 1 ? "border-sky-300 text-sky-300" : "border-sky-500 text-sky-500 hover:text-white hover:bg-sky-500 hover:bg-opacity-90"} px-4 py-2 mr-2 border-1 transition-all rounded`}
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageClick(index + 1)}
          className={`px-3 py-1 mx-1 border ${
            currentPage === index + 1 ? `bg-[` + currentColor + `] text-white rounded hover:bg-opacity-80` : `border-1 border-[`+ currentColor + `] text-[`+ currentColor +`] hover:text-white hover:bg-[`+ currentColor + `] hover:bg-opacity-90 transition-all rounded`
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`${currentPage === totalPages ? `border-[`+ currentColor +`] text-[`+ currentColor +`]` : `border-[`+ currentColor + `] text-[` + currentColor + `] hover:text-white hover:bg-[` + currentColor + `] hover:bg-opacity-90`} px-4 py-2 ml-2  border-1 transition-all rounded`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
