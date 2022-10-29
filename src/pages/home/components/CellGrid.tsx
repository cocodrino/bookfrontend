import { Book } from "../../../shared_types/book";
import { useNavigate } from "react-router-dom";

interface CellGridProps {
  book: Book;
}

export const CellGrid = (props: CellGridProps) => {
  const navigate = useNavigate();
  const redirectToDetailBook = (bookId: number) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div
      onClick={() => {
        if (props.book.id) redirectToDetailBook(props.book.id);
      }}
      className="
    p-1 bg-slate-50 flex flex-col items-center hover:underline subpixel-antialiased 
    pt-5 pb-5 hover:cursor-pointer"
    >
      <img src="https://via.placeholder.com/150x150.png" alt="book-image" />
      <span className="mt-3 text-base text-slate-700 px-5">
        {props?.book?.title}
      </span>
      <span className="text-sm text-slate-400">
        by:{" "}
        <span className="text-slate-600">
          {props.book?.author?.firstname.slice(0, 1)}{" "}
          {props.book?.author?.lastname}
        </span>
      </span>
    </div>
  );
};
