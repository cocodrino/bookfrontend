import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Book, GetBookResponse } from "../../shared_types/book";
import { Axios } from "../../utils/Axios";
import { useAppDispatch } from "../../store/hooks";
import { asyncDeleteBook } from "../../store/book.slice";
import {
  AddOrEditPanelParams,
  addorEditPanelSlice,
} from "../../store/add_or_edit_panel.slice";
import { BookDetailContent } from "./BookDetailContent";

export const BookDetailPage = () => {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState<Book | undefined>();
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loadBook = (id: number) => {
    setError(false);
    Axios.get(`/book/${id}`)
      .then((response: GetBookResponse) => {
        setBookDetails(response.data.book);
      })
      .catch((e) => {
        setError(true);
      });
  };

  useEffect(() => {
    if (bookId) loadBook(+bookId);
  }, [bookId]);

  const onDelete = () => {
    if (bookDetails && bookDetails.id)
      dispatch(asyncDeleteBook(bookDetails.id, navigate));
  };

  const onEditBook = () => {
    const params: AddOrEditPanelParams = {
      selectedBook: bookDetails,
      panelOption: "book",
    };
    dispatch(addorEditPanelSlice.actions.togglePanel(params));
  };

  if (error) {
    return (
      <div className="flex items-center justify-center text-3xl">
        Book not found
      </div>
    );
  }

  return (
    <>
      <BookDetailContent
        book={bookDetails}
        onDelete={onDelete}
        onEditBook={onEditBook}
      />
    </>
  );
};
