const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },

  description: {
    type: String,
    require: true,
  },

  tags: {
    type: String,
    enum: ["urgent", "important"],
    required: true,
  },
});

const TASK = mongoose.model("Task", taskSchema);
module.exports = TASK;
