import { Book } from "../../shared_types/book";

interface BookDetailContentProps {
  book?: Book;
  onEditBook: () => void;
  onDelete: () => void;
}

export const BookDetailContent = (props: BookDetailContentProps) => {
  return (
    <div>
      {props.book && (
        <div className="grid grid-cols-2 h-screen mx-5">
          <div className="flex justify-center mx-20">
            <img
              src="https://via.placeholder.com/300x300.png"
              alt="book-image"
            />
          </div>
          <div>
            <p className="text-4xl">{props.book?.title}</p>
            <p className="text-2xl">
              {props.book.author?.firstname} {props.book.author?.lastname}
            </p>
            <p className="text-xl mt-10">Description:</p>

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>

            <div className="pl-10 flex items-center justify-center mt-20">
              <button
                onClick={props.onEditBook}
                className="text-lg py-3 px-4 bg-amber-400 hover:cursor-pointer text-slate-800"
              >
                Edit Book
              </button>
              <button
                onClick={props.onDelete}
                className="ml-3 text-lg py-3 px-4 bg-red-600 hover:cursor-pointer text-slate-100"
              >
                Delete Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
