import { Axios } from "../utils/Axios";

describe("server must work correctly and return fake data", () => {
  it("returns ok when url is prueba.com", async () => {
    const req = await Axios.get("/books");

    expect(req.status).toEqual(200);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(req?.data?.books?.length).toEqual(15);
  });

  it("can delete a book", async () => {
    const req = await Axios.delete("/book/3");

    expect(req.status).toEqual(200);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(req?.data.book.authorId).toEqual(1);
  });
});
