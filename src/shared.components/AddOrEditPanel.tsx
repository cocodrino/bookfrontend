import { SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addorEditPanelSlice } from "../store/add_or_edit_panel.slice";
import { Author } from "../shared_types/author";
import { Book } from "../shared_types/book";
import useOnClickOutside from "../utils/clickOutside";

const AddOrEditPanel = () => {
  const panelState = useAppSelector((state) => state.panel);
  const dispatch = useAppDispatch();
  const panelRef = useRef(null);

  const [author, setAuthor] = useState<Author | undefined>();
  const [book, setBook] = useState<Book | undefined>();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (panelState.selectedBook) setBook(panelState.selectedBook);
    if (panelState.selectedAuthor) setAuthor(panelState.selectedAuthor);
  }, [panelState.selectedAuthor, panelState.selectedBook]);

  const editOrNew: "edit" | "new" = useMemo(() => {
    return panelState.selectedBook || panelState.selectedAuthor
      ? "edit"
      : "new";
  }, [panelState]);

  const resetPanel = () => {
    dispatch(addorEditPanelSlice.actions.clearPanelData());
  };

  useOnClickOutside(panelRef, () => resetPanel());

  return (
    <>
      {panelState.panelOption !== "none" && (
        <div
          style={{ position: "relative", top: -40 }}
          className="bg-slate-900 text-slate-300 px-5 py-5 pb-10 border border-y-1 border-slate-600"
          ref={panelRef}
        >
          <form onSubmit={onSubmit}>
            <span className="text-2xl">
              {editOrNew === "new" ? "Add New" : "Edit"}{" "}
              {panelState.panelOption === "book" ? "Book" : "Author"}
            </span>
            <div className="grid grid-cols-3 divide-x divide-solid divide-slate-600">
              {panelState.panelOption === "book" && (
                <div className="pl-3">
                  <div className="text-xl mt-2 mb-3">Book details</div>
                  <div className="mb-3">
                    <label className="mr-4" htmlFor="bookName">
                      Book Name
                    </label>
                    <input
                      className="text-slate-800"
                      value={book?.title}
                      onChange={(e) => {
                        setBook((b) => {
                          if (b)
                            return {
                              ...b,
                              title: e.target.value,
                            };
                        });
                      }}
                      type="text"
                      name="bookName"
                    />
                  </div>
                  <div>
                    <label className="mr-4" htmlFor="bookISBN">
                      Book ISBN
                    </label>
                    <input
                      value={book?.isbn}
                      onChange={(e) => {
                        setBook((b) => {
                          if (b)
                            return {
                              ...b,
                              isbn: e.target.value,
                            };
                        });
                      }}
                      className="ml-2 text-slate-800"
                      type="text"
                      name="bookISBN"
                    />
                  </div>
                </div>
              )}

              <div className="pl-3">
                <div className="text-xl mt-2 mb-3">Author details</div>
                <div className="mb-3">
                  <label className="mr-4" htmlFor="authorFirstName">
                    Author Name
                  </label>
                  <input
                    value={author?.firstname}
                    onChange={(e) => {
                      setAuthor((a) => {
                        if (a)
                          return {
                            ...a,
                            firstname: e.target.value,
                          };
                      });
                    }}
                    type="text"
                    className="ml-7 text-slate-800"
                    name="authorFirstName"
                  />
                </div>

                <div>
                  <label className="mr-4" htmlFor="authorLastName">
                    Author Lastname
                  </label>
                  <input
                    className="text-slate-800"
                    value={author?.lastname}
                    onChange={(e) => {
                      setAuthor((a) => {
                        if (a)
                          return {
                            ...a,
                            lastname: e.target.value,
                          };
                      });
                    }}
                    type="text"
                    name="bookISBN"
                  />
                </div>
              </div>

              <div className="pl-10 flex items-center">
                <button className="text-lg py-3 px-4 bg-amber-400 hover:cursor-pointer text-slate-800">
                  Save
                </button>
                <button
                  onClick={resetPanel}
                  className="ml-3 text-lg py-3 px-4 bg-slate-300 hover:cursor-pointer text-slate-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddOrEditPanel;
