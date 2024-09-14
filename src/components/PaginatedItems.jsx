import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './paginated.css'; // Importing the CSS file

export default function PaginatedItems({ items = [], itemsPerPage }) {
  const [itemOffset, setItemOffset] = useState(0);

  // Calculate the end offset
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  // Safely slice items array (ensure it exists)
  const currentItems = items.slice(itemOffset, endOffset);
  
  // Calculate the total page count
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Handle page change
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="pagination-container">
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        containerClassName="pagination" // Custom CSS class for pagination
        pageLinkClassName="page-link" // Class for page links
        previousLinkClassName="page-link" // Class for previous link
        nextLinkClassName="page-link" // Class for next link
        activeClassName="active" // Class for active page
        disabledClassName="disabled" // Class for disabled buttons
      />
    </div>
  );
}

// Items component
function Items({ currentItems }) {
  return (
    <div className="items-container">
      {currentItems &&
        currentItems.map((item, index) => (
          <div key={index} className="item-box">

          </div>
        ))}
    </div>
  );
}

