import { rest } from "msw";
import { API_URL } from "../utils/Axios";
import { Author } from "../shared_types/author";

export const authorListAnswer = {
  authors: [
    {
      id: 1,
      firstname: "George R",
      lastname: "R Martin",
    },
    {
      id: 2,
      firstname: "George",
      lastname: "Orwell",
    },
    {
      id: 3,
      firstname: "Aaron",
      lastname: "Blabe",
    },
    {
      id: 4,
      firstname: "Justin",
      lastname: "Reynolds",
    },
    {
      id: 5,
      firstname: "Nadia",
      lastname: "Shammas",
    },
    {
      id: 6,
      firstname: "Serena",
      lastname: "Blasco",
    },
    {
      id: 7,
      firstname: "Mick",
      lastname: "Herron",
    },
    {
      id: 8,
      firstname: "Adam",
      lastname: "Makoss",
    },
    {
      id: 9,
      firstname: "Gus",
      lastname: "Khawaja",
    },
    {
      id: 10,
      firstname: "Occupy",
      lastname: "Theweb",
    },
    {
      id: 11,
      firstname: "Jhon",
      lastname: "Culkin",
    },
    {
      id: 12,
      firstname: "Jon",
      lastname: "Bodner",
    },
    {
      id: 13,
      firstname: "Stuart",
      lastname: "Gibbs",
    },
  ],
};

const getAuthorsHandler = rest.get(
  `${API_URL}/authors`,
  async (req, res, ctx) => {
    console.info("call mock getAuthorHandler");
    return res(ctx.status(200), ctx.json(authorListAnswer));
  }
);

const postAuthorHandler = rest.post(
  `${API_URL}/author`,
  async (req, res, ctx) => {
    //const newPoke = JSON.parse(req.body);
    const newAuthor: Author = await req.json();

    const resp = {
      author: {
        ...newAuthor,
        id: 23049,
      },
    };

    return res(ctx.status(201), ctx.json(resp));
  }
);

const updateAuthorHandler = rest.put(
  `${API_URL}/author/:id`,
  async (req, res, ctx) => {
    //const newPoke = JSON.parse(req.body);
    const author: Author = await req.json();
    return res(
      ctx.status(200),
      ctx.json({
        author: {
          id: 17,
          ...author,
        },
      })
    );
  }
);

const deletePokemonHandler = rest.delete(
  `${API_URL}/author/:id`,
  async (req, res, ctx) => {
    const author: Author = await req.json();
    const id = req.params["id"];
    return res(
      ctx.status(200),
      ctx.json({
        author: {
          id,
          ...author,
        },
      })
    );
  }
);

export const authorHandlers = [
  getAuthorsHandler,
  postAuthorHandler,
  updateAuthorHandler,
  deletePokemonHandler,
];
