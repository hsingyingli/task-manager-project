import userModel from '../models/user.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default async function auth(req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await userModel.findOne({_id: decode._id});
    if (!user) {
      throw new Error()
    }
    req.user = user 
    req.token = token
    next();
  } catch (error) {
    res.status(401).send({error: 'please authenticate. ew'})
  }
}
