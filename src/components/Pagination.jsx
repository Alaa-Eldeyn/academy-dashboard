import { Icon } from "@iconify/react/dist/iconify.js";

const Pagination = (props) => {
  const { page, setPage, info } = props;
  return (
    <div className="center gap-2 mt-2">
      Page
      <div className="center gap-2">
        <button
          onClick={() => {
            if (Number(page) <= 1) {
              return;
            } else {
              setPage(Number(page) - 1);
            }
          }}
          disabled={Number(page) === 1}
        >
          <Icon
            icon="icon-park-solid:left-one"
            className={`text-2xl text-primary cursor-pointer ${
              Number(page) === 1 ? "opacity-50 cursor-default" : ""
            }`}
          />
        </button>
        <div className="rounded-full text-white bg-primary p-1 w-7 h-7 center">
          {page}
        </div>
        <button
          onClick={() => {
            if (Number(page) === info?.totalPages) {
              return;
            } else {
              setPage(Number(page) + 1);
            }
          }}
          disabled={Number(page) === info?.totalPages}
        >
          <Icon
            icon="icon-park-solid:right-one"
            className={`text-2xl text-primary cursor-pointer ${
              !Number(page) === info?.totalPages
                ? "opacity-50 cursor-default"
                : ""
            }`}
          />
        </button>
      </div>
      <div>
        <select
          className="border-b border-primary bg-transparent p-1 outline-none text-sm cursor-pointer"
          value={page}
          onChange={(e) => setPage(e.target.value)}
        >
          {[...Array(info?.totalPages)].map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
