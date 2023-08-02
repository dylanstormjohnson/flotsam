import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION;



export const authMiddleware = ({req}) => {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;

}
export const signToken = (payload) => {
    return jwt.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

}

//export {authMiddleware, signToken}
