import taskModel from "../models/Task.js";
import userModel from "../models/User.js";

export const createTask = async (req, res) => {
  try {
    const { title, assignedToId, assignedById, description, priority, statu } =
      req.body;

    if (!title || !assignedToId || !assignedById) {
      return res.status(400).json({
        message: "Title, assignedToId, and assignedById are required",
        success: false,
      });
    }

    const assignedToUser = await userModel.findByPk(assignedToId);
    const assignedByUser = await userModel.findByPk(assignedById);

    if (!assignedToUser || !assignedByUser) {
      return res.status(400).json({
        message: "Assigned user(s) not found",
        success: false,
      });
    }

    const existingTask = await taskModel.findOne({
      where: {
        title,
        assignedToId,
        assignedById,
        description,
        priority,
        statu,
      },
    });

    if (existingTask) {
      return res.status(400).json({
        message: "Task already exists with the same details",
        success: false,
      });
    }

    // Create the new task
    const newTask = await taskModel.create({
      title,
      assignedToId,
      assignedById,
      description,
      priority,
      statu,
    });

    return res.status(200).json({
      message: "Task created successfully",
      success: true,
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      success: false,
      error: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const [updatedRows] = await taskModel.update(updateData, {
      where: { id },
    });

    if (!updatedRows) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
      });
    }

    const updatedTask = await taskModel.findOne({ where: { id } });

    return res.status(200).json({
      message: "Task updated successfully",
      success: true,
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
      success: false,
      error: error.message,
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const { assignedById } = req.query;

    const tasks = await taskModel.findAll({
      where: { assignedById },
      include: [
        { model: userModel, as: "assignedBy", attributes: ["name"] },
        { model: userModel, as: "assignedTo", attributes: ["name"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!tasks.length) {
      return res.status(400).json({
        message: "No tasks found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All tasks found",
      success: true,
      task: tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      success: false,
      error,
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    const task = await taskModel.findOne({
      where: { id },
      include: [
        { model: userModel, as: "assignedBy", attributes: ["name"] },
        { model: userModel, as: "assignedTo", attributes: ["name"] },
      ],
    });
    console.log(task);
    if (!task) {
      return res.status(400).json({
        message: "Task not exists",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Task found",
      success: true,
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong!",
      success: false,
      error,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    let { id } = req.query;

    const deletedTask = await taskModel.destroy({ where: { id } });

    if (deletedTask) {
      return res.status(200).json({
        message: "Task deleted successfully",
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Task not found",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      success: false,
      error,
    });
  }
};
