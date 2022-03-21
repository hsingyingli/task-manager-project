import express from 'express';
import {
  createUser,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
  logoutUser,
  logoutAllUser,
} from './../controller/user.js';
import auth from '../middlewares/auth.js';

// all routes in here are starting with /users
const router = express.Router();
// create user
router.post('/', createUser);

// get user info
router.get('/me', auth, getUser);

// delete user
router.delete('/me', auth, deleteUser);

// update user
router.patch('/me', auth, updateUser);

// login
router.post('/login', loginUser);

// logout
router.post('/logout', auth, logoutUser);

//logout all token
router.post('/logoutAll', auth, logoutAllUser);

export default router;
