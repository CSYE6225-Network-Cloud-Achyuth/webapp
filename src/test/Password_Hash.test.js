import { describe, it, expect } from "vitest";
import PasswordHash from "../utils/Password_hash";

describe("Password Hash", () => {
  it("Hashing the password", async () => {
    const password = "password";

    const hashedPassword = await PasswordHash.toHash(password);

    expect(hashedPassword).not.toBe(password);
  });
});

describe("Password Hash and Compare", () => {
  it("Hashing it and comparing it", async () => {
    const password = "password";

    const hashedPassword = await PasswordHash.toHash(password);

    const matchedPassword = await PasswordHash.comparePassword(
      password,
      hashedPassword
    );

    expect(hashedPassword).not.toBe(matchedPassword);
  });
});

describe("Password Hash and Compare 2", () => {
  it("Hashing it and comparing it, it should fail cause I've given wrong password", async () => {
    const password = "password";

    const hashedPassword = await PasswordHash.toHash(password);

    const matchedPassword = await PasswordHash.comparePassword(
      password,
      "password123"
    );

    expect(hashedPassword).not.toBe(matchedPassword);
  });
});
