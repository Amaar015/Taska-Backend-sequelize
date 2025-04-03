import { DataTypes } from "sequelize";
import sequelize from "../connections/conn.js";

const userModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 20],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    avatar: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("Admin", "User"),
      defaultValue: "User",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default userModel;
