import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./shared.components/layout";
import { HomePage } from "./pages/home/HomePage";
import { BookDetailPage } from "./pages/book.detail.page/BookDetailPage";
import AddOrEditPanel from "./shared.components/AddOrEditPanel";
import { AuthorPage } from "./pages/authors.page/AuthorPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AddOrEditPanel />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/authors" element={<AuthorPage />} />
          <Route path="/book/:bookId" element={<BookDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
