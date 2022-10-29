import { SyntheticEvent } from "react";

const AddPanel = () => {
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-slate-900 text-slate-300 px-5 py-5 pb-10 border border-y-1 border-slate-600">
      <form onSubmit={onSubmit}>
        <span className="text-2xl">Add New Book</span>
        <div className="grid grid-cols-3 divide-x divide-solid divide-slate-600">
          <div className="pl-3">
            <div className="text-xl mt-2 mb-3">Book details</div>
            <div className="mb-3">
              <label className="mr-4" htmlFor="bookName">
                Book Name
              </label>
              <input type="text" name="bookName" />
            </div>
            <div>
              <label className="mr-4" htmlFor="bookISBN">Book ISBN</label>
              <input type="text" name="bookISBN" />
            </div>
          </div>

          <div className="pl-3">
            <div className="text-xl mt-2 mb-3">Author details</div>
            <div className="mb-3">
              <label className="mr-4" htmlFor="authorFirstName">Author Name</label>
              <input type="text" name="authorFirstName" />
            </div>

            <div>
              <label className="mr-4" htmlFor="authorLastName">Author Lastname</label>
              <input type="text" name="bookISBN" />
            </div>
          </div>

          <div className="pl-10 flex items-center">
            <button className="text-lg py-3 px-4 bg-amber-400 hover:cursor-pointer text-slate-800">
              Save Book
            </button>
            <button className="ml-3 text-lg py-3 px-4 bg-slate-300 hover:cursor-pointer text-slate-800">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPanel;
