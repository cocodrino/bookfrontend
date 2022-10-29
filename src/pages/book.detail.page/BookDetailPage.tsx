import { useParams } from "react-router-dom";

export const BookDetailPage = () => {
  const { bookId } = useParams();
  return (
    <div>
      vista detalle {bookId}
      <div className="grid grid-cols-2 h-screen mx-5">
        <div className="flex justify-center ">
          <img src="https://via.placeholder.com/400x400.png" alt="book-image" />
        </div>
        <div>
          <p className="text-3xl">Description</p>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          <div className="pl-10 flex items-center justify-center mt-20">
            <button className="text-lg py-3 px-4 bg-amber-400 hover:cursor-pointer text-slate-800">
              Edit Book
            </button>
            <button className="ml-3 text-lg py-3 px-4 bg-red-600 hover:cursor-pointer text-slate-100">
              Delete Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
