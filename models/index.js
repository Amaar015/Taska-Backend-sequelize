import sequelize from "../connections/conn.js";
import userModel from "./User.js";
import taskModel from "./Task.js";

// Define relationships
userModel.hasMany(taskModel, {
  foreignKey: "assignedToId",
  as: "assignedTasks",
});
userModel.hasMany(taskModel, {
  foreignKey: "assignedById",
  as: "createdTasks",
});

taskModel.belongsTo(userModel, {
  foreignKey: "assignedToId",
  as: "assignedTo",
});
taskModel.belongsTo(userModel, {
  foreignKey: "assignedById",
  as: "assignedBy",
});

const syncDB = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Database sync failed:", error);
  }
};

syncDB();

export { User, Task };
