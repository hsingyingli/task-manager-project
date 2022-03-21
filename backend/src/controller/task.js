import taskModel from "../models/task.js";

export async function createTask(req, res) {
  const task = new taskModel({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save()
    res.status(201).send(task)
  } catch(error){
    res.status(400).send(error)
  }
}


// TODO
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
//
export async function getTask(req, res) {
  
  try {
    const tasks = await taskModel.find({owner: req.user._id})
    res.send(tasks)
  } catch(error) {
    res.status(500).send({error})
  }
}

export async function getOneTask(req, res) {
  const _id = req.params.id 
  
  try {
    const task = await taskModel.findOne({_id, owner: req.user._id})

    if(!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch(error){
    res.status(500).send(error)
  }

}

export async function deleteTask(req, res) {
  const _id = req.params.id 
  
  try {
    const task = await taskModel.findOneAndDelete({_id, owner: req.user._id})

    if(!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch(error){
    res.status(500).send(error)
  }

}

export async function updateTask(req, res) {
  const _id = req.params.id 

  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'progress']
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    res.status(400).send({error: 'Not a validate operation'});
  }

  try {
    const task = await taskModel.findOne({_id, owner: req.user._id})

    if(!task) {
      return res.status(404).send()
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send({error});
  }
}
