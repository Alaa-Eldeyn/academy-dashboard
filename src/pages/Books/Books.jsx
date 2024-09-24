import { Link } from "react-router-dom";
import PaginatedItems from "../../components/PaginatedItems";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { deleteBook, getAllBooks } from "../../utils/books";

function Books() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchAllBooks = async () => {
      let res = await getAllBooks();
      setBooks(res.data);
      console.log(res.data);
    };
    fetchAllBooks();
  }, []);
  const handleDeleteBook = async (id) => {
    const res = await deleteBook(id);
    if (res.isSuccess) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };
  return (
    <div className="px-6">
      <div className=" flex flex-wrap flex-col sm:flex-row items-center justify-between gap-8 w-auto mb-6">
        <div className="bg-white flex w-full sm:max-w-md p-1 rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Search By Book Title here"
            className="rounded-full w-full outline-none bg-white border-none pl-4 text-sm"
          />
          <button
            type="button"
            className="bg-gray-400 hover:bg-gray-500 transition-all text-white text-sm rounded-full px-5 py-2.5"
          >
            Search
          </button>
        </div>
        <div className="flex justify-center items-center gap-5">
          <Link
            to="/books/add-book"
            className="border border-gray-400 text-gray-400 hover:text-gray-600 text-sm px-4 py-3 flex items-center gap-2 rounded-xl w-full sm:w-auto"
          >
            <Icon icon="octicon:plus-circle-16" />
            Add a Book
          </Link>
          <Icon icon="ion:filter" className="text-3xl" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 rounded-lg">
          <thead className="bg-white  whitespace-nowrap">
            <tr>
              <td className="p-3 w-8">
                <label
                  htmlFor="checkbox1"
                  className="text-black text-sm"
                ></label>
                <input
                  id="checkbox1"
                  type="checkbox"
                  className="w-4 h-4 text-center focus:ring-1 focus:ring-offset-slate-200 focus:ring-offset-4 focus:ring-[#007bff]"
                />
              </td>
              {[
                "#ID",
                "Book Cover",
                "Book Title",
                "Publisher",
                "Date",
                "Action",
              ].map((item, index) => (
                <th key={index} className="text-center px-4 py-2">
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-center whitespace-nowrap divide-y divide-gray-200">
            {books.map((book, index) => (
              <tr key={index}>
                <td className="pl-4 w-8">
                  <label
                    htmlFor="checkbox1"
                    className="text-black text-sm"
                  ></label>
                  <input
                    id="checkbox1"
                    type="checkbox"
                    className="w-4 h-4 mr-3 focus:ring-1 focus:ring-offset-slate-200 focus:ring-offset-4 focus:ring-[#007bff]"
                  />
                </td>
                <td className="pl-4 w-8">{index + 1}</td>
                <td className="p-4 text-sm ">
                  <img
                    src={book?.thumbnailURL}
                    alt=""
                    className="w-6 h-6 rounded mx-auto"
                  />
                </td>
                <td className="p-4 text-sm">{book?.title}</td>
                <td className="px-6 py-3">Hisham Mousa</td>
                <td className="px-6 py-3">21 Sep 2024</td>
                <td className="py-3 flex items-center gap-2 justify-center">
                  <button
                    onClick={() => handleDeleteBook(book?.id)}
                    className="bg-gray-200 px-2 justify-center py-1 rounded-md flex items-center gap-1"
                  >
                    <Icon icon="fluent:delete-12-regular" />
                    Delete
                  </button>
                  <Link
                    to={`/books/${book?.id}`}
                    className="bg-gray-200 px-2 justify-center py-1 rounded-md flex items-center gap-1"
                  >
                    <Icon icon="ph:eye" />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination and Delete Button */}
        <div className="flex flex-wrap flex-col sm:flex-row items-center justify-between mt-4 w-full">
          <PaginatedItems items={books} itemsPerPage={1} />
          <button className="bg-slate-200 p-2 rounded-lg flex items-center gap-1 mt-4 sm:mt-0">
            <Icon icon="fluent:delete-12-regular" />
            Delete Selected Items
          </button>
        </div>
      </div>
    </div>
  );
}

export default Books;
