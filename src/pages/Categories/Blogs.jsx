const Blogs = () => {
  return (
    <>
      <div className="flex gap-5">
        <div className="bg-white p-5 rounded-lg">
          <h1 className="font-bold text-xl">Categories</h1>
          <p className="my-3">Add a new category</p>
          <form className="flex gap-3">
            <input type="text" placeholder="Category name" className="input" />
            <button className="px-8 py-2 text-white bg-[#E2508D]  rounded-lg cursor-pointer select-none soft">
              Add
            </button>
          </form>
        </div>
        <div className="bg-white p-5 rounded-lg">
          <h1 className="font-bold text-xl mb-3">Sub Courses</h1>
          <form className="flex gap-3 items-end">
            <div>
              <label htmlFor="cat" className="mb-3 block">
                Select a category
              </label>
              <select className="input min-w-56" id="cat">
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
              </select>
            </div>
            <div>
              <label htmlFor="subCat" className=" mb-3 block">
                Add a new sub category
              </label>
              <input
                type="text"
                placeholder="Sub category name"
                className="input"
                id="subCat"
              />
            </div>
            <button className="px-8 py-2 text-white bg-[#E2508D] rounded-lg cursor-pointer select-none soft h-12">
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Blogs;
