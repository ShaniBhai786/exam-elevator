import bcrypt from "bcrypt"
const hashPassword = async (password) => {
    const salt = 10;
    return await bcrypt.hash(password, salt)
}

export {hashPassword}