import userModel from '../models/user.js';

export async function createUser(req, res) {
  const user = new userModel(req.body);

  try {
    const {accessToken, refreshToken} = await user.generateAuthToken();
    res.cookie('jwt', refreshToken, {httpOnly:true, sameSite: 'None', secure:true, maxAge: 24*60*60*60*1000})
    res.status(201).send({user, accessToken});

  } catch (error) {
    res.status(400).send({error});
  }
}

export async function getUser(req, res) {
  res.send(req.user);
}

export async function deleteUser(req, res) {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    console.log(error)
    res.status(500).send({error: 'try later'});
  }
}

export async function updateUser(req, res) {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    res.status(400).send({error: 'Not a validate operation'});
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(500).send({error});
  }
}

export async function loginUser(req, res) {
  try {
    const user = await userModel.findByCredentials(
      req.body.email,
      req.body.password,
    );
    const {accessToken, refreshToken} = await user.generateAuthToken();
    res.cookie('jwt', refreshToken, {httpOnly:true, sameSite: 'None', secure:true, maxAge: 24*60*60*60*1000})
    res.send({user, accessToken});
  } catch (error) {
    res.status(400).send();
  }
}

export async function logoutUser(req, res) {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send({message: 'logout'})
    } catch (error) {
        res.status(500).send({error})
    }
}

export async function logoutAllUser(req, res) {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send({message: 'logout all user'})
    } catch (error) {
        res.status(500).send({error})
    }
}
