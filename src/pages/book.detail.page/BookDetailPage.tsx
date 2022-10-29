import { useParams } from "react-router-dom";

export const BookDetailPage = () => {
  const { bookId } = useParams();
  return <div>vista detalle {bookId}</div>;
};
