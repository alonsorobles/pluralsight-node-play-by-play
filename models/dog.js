import mongoose from 'mongoose';

const dogSchema = mongoose.Schema({
  name: String,
  age: Number,
  type: String
});

export default mongoose.model('Dog', dogSchema);
