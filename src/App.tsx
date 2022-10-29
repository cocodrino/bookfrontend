import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./shared.components/layout";
import { HomePage } from "./pages/home/HomePage";
import { BookDetailPage } from "./pages/book.detail.page/BookDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:bookId" element={<BookDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
