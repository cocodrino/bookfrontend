import { rest } from "msw";
import { API_URL } from "../utils/Axios";
import { Book } from "../shared_types/book";


export const bookListAnswer = {
  books: [
    {
      id: 2,
      title: "Vientos de Invierno",
      isbn: "1072345",
      authorId: 1,
      author: {
        firstname: "George R",
        lastname: "R Martin",
      },
    },
    {
      id: 3,
      title: "Fuego y Sangre 2",
      isbn: "1072345",
      authorId: 1,
      author: {
        firstname: "George R",
        lastname: "R Martin",
      },
    },
    {
      id: 4,
      title: "1984",
      isbn: "1072345234",
      authorId: 2,
      author: {
        firstname: "George",
        lastname: "Orwell",
      },
    },
    {
      id: 5,
      title: "The Bad Guys in the Others?",
      isbn: "1338820532",
      authorId: 3,
      author: {
        firstname: "Aaron",
        lastname: "Blabe",
      },
    },
    {
      id: 6,
      title: "Miles Morales: Stranger Tides",
      isbn: "1338826395",
      authorId: 4,
      author: {
        firstname: "Justin",
        lastname: "Reynolds",
      },
    },
    {
      id: 7,
      title: "Ms. Marvel: Stretched Thin",
      isbn: "13387225812",
      authorId: 5,
      author: {
        firstname: "Nadia",
        lastname: "Shammas",
      },
    },
    {
      id: 8,
      title: "Enola Holmes: The Graphic Novels",
      isbn: "152487132",
      authorId: 6,
      author: {
        firstname: "Serena",
        lastname: "Blasco",
      },
    },
    {
      id: 9,
      title: "Slow Horses (Deluxe Edition)",
      isbn: "78-1641292979",
      authorId: 7,
      author: {
        firstname: "Mick",
        lastname: "Herron",
      },
    },
    {
      id: 10,
      title: "Devotion",
      isbn: "0804176604",
      authorId: 8,
      author: {
        firstname: "Adam",
        lastname: "Makoss",
      },
    },
    {
      id: 11,
      title: "A Higher Call",
      isbn: "0425255735",
      authorId: 8,
      author: {
        firstname: "Adam",
        lastname: "Makoss",
      },
    },
    {
      id: 12,
      title: "Kali Linux Penetration Testing",
      isbn: "0425255735zxc",
      authorId: 9,
      author: {
        firstname: "Gus",
        lastname: "Khawaja",
      },
    },
    {
      id: 13,
      title: "Linux Basics for Hackers",
      isbn: "1593278551",
      authorId: 10,
      author: {
        firstname: "Occupy",
        lastname: "Theweb",
      },
    },
    {
      id: 14,
      title: "AWS Cookbook: Recipes",
      isbn: "1492092606",
      authorId: 11,
      author: {
        firstname: "Jhon",
        lastname: "Culkin",
      },
    },
    {
      id: 15,
      title: "Learning Go",
      isbn: "978-1492077213",
      authorId: 12,
      author: {
        firstname: "Jon",
        lastname: "Bodner",
      },
    },
    {
      id: 16,
      title: "Spy School the Graphic Novel",
      isbn: "1534455426",
      authorId: 13,
      author: {
        firstname: "Stuart",
        lastname: "Gibbs",
      },
    },
  ],
};

const getBooksHandler = rest.get(`${API_URL}/books`, async (req, res, ctx) => {
  console.info("call mock getBookHandler");
  return res(ctx.status(200), ctx.json(bookListAnswer));
});

const postBookHandler = rest.post(`${API_URL}/book`, async (req, res, ctx) => {
  //const newPoke = JSON.parse(req.body);
  const newBook: Book = await req.json();

  const resp = {
    book: {
      id: 17,
      title: newBook.title,
      isbn: newBook.isbn,
      authorId: 13,
    },
  };

  return res(ctx.status(201), ctx.json(resp));
});

const updateBookHandler = rest.put(
  `${API_URL}/book/:id`,
  async (req, res, ctx) => {
    //const newPoke = JSON.parse(req.body);
    const book: Book = await req.json();
    return res(
      ctx.status(200),
      ctx.json({
        book: {
          id: book.id,
          title: book.title,
          isbn: book.isbn,
          authorId: 13,
        },
      })
    );
  }
);

const deleteBookHandler = rest.delete(
  `${API_URL}/book/:id`,
  async (req, res, ctx) => {
    console.log("calling book delete");
    const id = req.params["id"];
    const response = bookListAnswer.books.find((b) => {
      return b.id === +id;
    });
    return res(
      ctx.status(200),
      ctx.json({
        book: response,
      })
    );
  }
);

export const bookHandlers = [
  getBooksHandler,
  postBookHandler,
  updateBookHandler,
  deleteBookHandler,
];
