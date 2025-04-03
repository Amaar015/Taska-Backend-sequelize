import { DataTypes } from "sequelize";
import sequelize from "../connections/conn.js";
import userModel from "./User.js";

const taskModel = sequelize.define(
  "task",
  {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW(),
    },
    priority: {
      type: DataTypes.ENUM("Low", "Normal", "Hight"),
      allowNull: false,
    },
    statu: {
      type: DataTypes.ENUM("Active", "Pending", "Close"),
      allowNull: false,
    },
    assignedToId: {
      type: DataTypes.INTEGER, // Change to INTEGER type
      allowNull: false,
    },
    assignedById: {
      type: DataTypes.INTEGER, // Change to INTEGER type
      allowNull: false,
    },
  },
  { timestamps: true }
);

taskModel.belongsTo(userModel, {
  as: "assignedTo",
  foreignKey: "assignedToId",
});
taskModel.belongsTo(userModel, {
  as: "assignedBy",
  foreignKey: "assignedById",
});

export default taskModel;
