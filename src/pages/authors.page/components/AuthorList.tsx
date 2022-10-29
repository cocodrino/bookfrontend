import { Author } from "../../../shared_types/author";
import { useAppDispatch } from "../../../store/hooks";
import { asyncDeleteAuthor } from "../../../store/author.slice";
import { addorEditPanelSlice } from "../../../store/add_or_edit_panel.slice";

interface AuthorListProps {
  authors?: Author[];
}

export const AuthorList = (props: AuthorListProps) => {
  const dispatch = useAppDispatch();
  const onDelete = (id?: number) => {
    dispatch(asyncDeleteAuthor(id));
  };

  const onEdit = (author: Author) => {
    dispatch(
      addorEditPanelSlice.actions.togglePanel({
        selectedAuthor: author,
        panelOption: "author",
      })
    );
  };

  return (
    <ol className="w-3/6 divide-y divide-dashed">
      {props?.authors?.map((author) => (
        <li
          role="author_row"
          className="flex flex-row py-3 hover:bg-slate-200"
          key={`li-${author.firstname}-${author.lastname}`}
        >
          <div className="grow flex items-center ml-5">
            {author.firstname} {author.lastname}
          </div>

          <div>
            <div className="pl-10 flex items-center w-60">
              <button
                onClick={() => onEdit(author)}
                role="author_edit"
                className="text-lg py-3 px-4 bg-amber-400 hover:cursor-pointer text-slate-800"
              >
                Edit
              </button>
              <button
                role="author_delete"
                className="ml-3 text-lg py-3 px-4 bg-slate-300 hover:cursor-pointer text-slate-800"
                onClick={() => onDelete(author.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};
