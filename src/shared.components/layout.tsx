// eslint-disable-next-line react/prop-types
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { AddOrEditPanelOption } from "../shared_types/add_or_edit";
import { useAppDispatch } from "../store/hooks";
import { addorEditPanelSlice } from "../store/add_or_edit_panel.slice";

// eslint-disable-next-line react/prop-types
export const Layout: React.FC<any> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const addType: AddOrEditPanelOption = useMemo(() => {
    return location.pathname.includes("author") ? "author" : "book";
  }, [location]);

  const navigateTo = (path: string) => {
    navigate(path);
  };

  const togglePanel = () => {
    dispatch(addorEditPanelSlice.actions.togglePanel({ panelOption: addType }));
  };

  return (
    <div className="App w-full h-screen bg-slate-100">
      <div className="w-full bg-slate-900 h-20 flex items-center justify-between px-4">
        <div
          className="hover:cursor-pointer"
          onClick={() => {
            navigateTo("/");
          }}
        >
          <span className="text-2xl text-slate-300 ml-3">ZAREGO</span>
          <span className="text-lg text-slate-500 ml-1">Book Store</span>
        </div>
        <div>
          <button
            onClick={togglePanel}
            className="text-lg py-3 px-4 bg-amber-400 hover:cursor-pointer"
          >
            {addType === "book" ? "Add New Book" : "Add new Author"}
          </button>
        </div>
      </div>
      <main>
        <div className="ml-10 mt-3 flex flex-row">
          <p
            className="hover:cursor-pointer hover:underline text-slate-600"
            onClick={() => {
              navigateTo("/");
            }}
          >
            Show Books
          </p>
          <p
            className="hover:cursor-pointer hover:underline text-slate-600 ml-2"
            onClick={() => {
              navigateTo("/authors");
            }}
          >
            Show Authors
          </p>
        </div>
        {children}
      </main>
    </div>
  );
};
