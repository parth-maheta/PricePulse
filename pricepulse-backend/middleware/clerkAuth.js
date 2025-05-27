const { verifyToken } = require("@clerk/clerk-sdk-node");

const clerkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No Authorization header");
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("No token found");
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token using Clerk SDK with explicit apiKey from env variable
    const verifiedToken = await verifyToken(token, {
      apiKey: process.env.CLERK_API_KEY,
    });

    // Clerk user ID is in 'sub' field of the verified token
    req.auth = { userId: verifiedToken.sub };
    next();
  } catch (err) {
    console.log("Clerk token verification error:", err.message);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = clerkAuth;
