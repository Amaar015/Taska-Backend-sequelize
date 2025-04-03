import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    dueDate: {
      type: Date,
      required: [true, "dueDate is required"],
      default: Date.now(),
    },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Normal", "High"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Active", "Closed"],
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { Timestamp: true }
);

const taskModel = mongoose.model("task", taskSchema);

export default taskModel;
