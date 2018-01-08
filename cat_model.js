import mongoose from 'mongoose';

const catSchema = mongoose.Schema({
  name: String,
  age: Number,
  type: String
});

export default mongoose.model('Cat', catSchema);
