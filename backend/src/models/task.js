import mongoose from 'mongoose';

const taskScheme = mongoose.Schema({
  description: {
    type: String,
    require: true,
    trim: true,
  },
  progress: {
    type: Number,
    default: 0,
    vaildate(value) {
      if (value<0 || value > 100) {
        throw new Error('prgress must greater than zero and less then one hundred')
      }
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'users',
  },
}, {
  timestamps: true
});

const taskModel = mongoose.model('tasks', taskScheme, 'tasks');
export default taskModel;
