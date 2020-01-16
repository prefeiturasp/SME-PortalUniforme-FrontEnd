import { readerFile } from "helpers/utils";

describe("test readerFile", () => {
  it("converte file to base64", async () => {
    const file = new File(["dummy content"], "example.png", {
      type: "image/png"
    });

    await readerFile(file).then(v => {
      expect(v.planta).toContain("png");
    });
  });
});
