import { Book } from "../../../shared_types/book";
import { CellGrid } from "./CellGrid";

interface GridProps {
  books: Book[];
}

export const Grid = (props: GridProps) => {
  return (
    <div className="mx-10 mt-4 grid grid-cols-8 gap-2">
      {props.books.map((b, i) => (
        <CellGrid key={`cg-${i}`} book={b} />
      ))}
    </div>
  );
};
