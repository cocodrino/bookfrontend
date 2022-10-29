import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { asyncLoadAuthors } from "../../store/author.slice";
import { AuthorList } from "./components/AuthorList";

export const AuthorPage = () => {
  const data = useAppSelector((state) => state.author.authors);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(asyncLoadAuthors());
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-center items-center">
        <AuthorList authors={data} />
      </div>
    </div>
  );
};
