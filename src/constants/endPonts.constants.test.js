describe("test endPonts.constants", () => {
  it("set Enveroment", () => {
    process.env.NODE_ENV = "production";

    const endPont = require("constants/endPonts.constants");
    expect(endPont.API_URL).toBe("API_URL_REPLACE_ME");
  });
});
