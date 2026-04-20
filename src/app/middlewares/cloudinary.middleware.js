// import jwt from "jsonwebtoken";
// import { errorResponse } from "@/lib/response";

// export const verifyAuth = (req) => {
//   try {
//     const token = req.headers.get("authorization")?.split(" ")[1];

//     if (!token) throw new Error("Unauthorized");

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return decoded;

//   } catch {
//     return errorResponse("Unauthorized", 401);
//   }
// };
