import bcrypt from "bcrypt"
const hashPassword = async (password) => {
    const salt = 10;
    return await bcrypt.hash(password, salt)
} 
const comparePassword = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed);
};
export { hashPassword, comparePassword }