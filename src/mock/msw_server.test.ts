import { Axios } from "../utils/Axios";

describe("server must work correctly and return fake data", () => {
  it("returns ok when url is prueba.com", async () => {
    const req = await Axios.get("", {
      params: { idAuthor: 1 },
    });

    expect(req.status).toEqual(200);
    expect(req?.data?.length).toEqual(5);
  });
});
