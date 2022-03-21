import express from "express";
import { createTask, getTask, deleteTask, updateTask, getOneTask } from "../controller/task.js"; 
import auth from "../middlewares/auth.js";

const router = express.Router();

//create task 
router.post('/', auth, createTask)

// get all task info 
router.get('/', auth, getTask)

// get spec task info 
router.get('/:id', auth, getOneTask)

// delete task
router.delete('/:id', auth, deleteTask)

// update task
router.patch('/:id', auth, updateTask)


export default router;
