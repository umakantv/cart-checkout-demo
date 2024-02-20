const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
    
    const headers = req.headers;

    req.auth = { id: 1 };
    next();

    // console.log({headers})

    // if (!headers.authorization) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }

    // const [type, token] = headers.authorization.split(" ");

    // if (type !== "Bearer") {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }

    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     req.auth = decoded;
    // } catch(err) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }
}

module.exports = auth;