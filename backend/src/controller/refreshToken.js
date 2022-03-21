import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';
import 'dotenv/config';

export async function refresh(req, res) {
  try {
    if (!req.cookies?.jwt) {
      throw new Error();
    }
    const refreshToken = req.cookies.jwt;

    // find user
    const user = await userModel.findOne({'tokens.token': refreshToken});
    if (!user) {
      throw new Error();
    }
    // verify jwt
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, decode) => {
      // if refreshToken has expired, delete refresh token in database
      if (error || decode._id != user._id) {
        user.tokens = user.tokens.filter((token) => {
          return token.token !== refreshToken;
        });
        await user.save();
        res.clearCookie('jwt');
        return res.status(401).send({error: 'please auth'});
      }
      // generate new access token
      const accessToken = jwt.sign(
        {_id: user._id.toString()},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '30s'},
      );
      res.send({accessToken});
    });
  } catch (error) {
    res.clearCookie('jwt');
    res.status(401).send({error: 'please auth'});
  }
}
