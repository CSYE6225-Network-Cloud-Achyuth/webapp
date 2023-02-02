import { hashSync, compare } from "bcrypt";

class PasswordHash {
  static toHash = async (password) => {
    const hash = hashSync(password, 10);
    return hash;
  };

  static comparePassword = async (userProvidedPassword, hashedPassword) => {
    const match = await compare(userProvidedPassword, hashedPassword);
    return match;
  };
}

export default PasswordHash;
