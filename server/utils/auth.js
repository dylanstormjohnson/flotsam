const jwt =  require("jsonwebtoken");

module.exports = {
  authMiddleware: ({ req }) => {
    let token = req.body.token || req.query.token || req.headers.authorization;
  
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
  
    if (!token) {
      return req;
    }
  
    try {
      const { data } = jwt.verify(token, process.env.JWT_SECRET, {
        maxAge: process.env.JWT_EXPIRATION,
      });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }
  
    return req;
  },
  signToken: (payload) => {
    return jwt.sign({ data: payload }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }
}


//export {authMiddleware, signToken}
