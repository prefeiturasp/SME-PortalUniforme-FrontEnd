import {
  required,
  email,
  prefeituraEmail,
  numericInteger,
  alphaNumeric,
  phoneNumber
} from "helpers/fieldValidators";

describe("test Validators", () => {
  it("required is valid", () => {
    expect(required("teste")).toBeUndefined();
  });
  it("required is not valid", () => {
    expect(required(undefined)).toBe("Campo obrigatório");
  });

  it("email is valid", () => {
    expect(email("teste@admin.com")).toBeUndefined();
  });
  it("email is not valid", () => {
    expect(email("nao-email-valido")).toBe("Email inválido");
  });

  it("prefeituraEmail is valid", () => {
    expect(prefeituraEmail("teste@prefeitura.sp.gov.br")).toBeUndefined();
  });
  it("prefeituraEmail is not valid", () => {
    expect(prefeituraEmail("teste@admin.com")).toBe(
      "Somente emails da prefeitura de São Paulo"
    );
  });

  it("numericInteger is valid", () => {
    expect(numericInteger("12345")).toBeUndefined();
  });
  it("numericInteger is not valid", () => {
    expect(numericInteger("naovalido")).toBe("Somente números");
  });

  it("alphaNumeric is valid", () => {
    expect(alphaNumeric("12345ABCD")).toBeUndefined();
  });
  it("alphaNumeric is not valid", () => {
    expect(alphaNumeric("n@o-v!l|do")).toBe("Only alphanumeric characters");
  });

  it("phoneNumber is valid", () => {
    expect(phoneNumber("1112349876")).toBeUndefined();
  });
  it("phoneNumber is not valid", () => {
    expect(phoneNumber("12345678")).toBe(
      "Invalid phone number, must be 10 digits"
    );
  });
});
