import jwt from "jsonwebtoken"

const JWT_Secret = process.env.JWT_SECRET || "supersecretkey"

const generateAccessToken = (user) => {
    return jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        userRole: user.userRole,
        CNIC: user.CNIC,
        subscription: user.subscription,
    },
    JWT_Secret,
    {expiresIn: "1d"}
)
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            user: user._id
        },
        JWT_Secret,
        {expiresIn: "10d"}
    )
}

export { generateAccessToken, generateRefreshToken }