import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { asyncLoadBooks } from "../../store/book.slice";
import { Grid } from "./components/Grid";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.book.books);
  useEffect(() => {
    dispatch(asyncLoadBooks());
  }, []);

  return (
    <div>
      <Grid books={data} />
    </div>
  );
};
