import mongoose from 'mongoose';
import taskModel from './task.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const userSchema = new mongoose.Schema( {
    name: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      unique: true,
      minlength: 8,
      trum: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error("Password can't contain password");
        }
      },
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalidate');
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.virtual('tasks', {
  ref: 'tasks',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const accessToken = jwt.sign(
    {_id: user._id.toString()},
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '30s'},
  );
  const refreshToken = jwt.sign(
    {_id: user._id.toString()},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: '30d'},
  );
  user.tokens = user.tokens.concat({token:refreshToken});
  await user.save();
  return {accessToken, refreshToken};
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(
      user.password,
      parseInt(process.env.HASH_SALT),
    );
  }
  next();
});

userSchema.pre('remove', async function (next) {
  const user = this;
  await taskModel.deleteMany({owner: user._id});
  next();
});

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await userModel.findOne({email});

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

const userModel = mongoose.model('users', userSchema, 'users');

export default userModel;
