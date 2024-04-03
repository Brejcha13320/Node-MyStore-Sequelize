import { DataTypes, UUID } from "sequelize";
import sequelize from "../../database";
import { UuidAdapter } from "../../config";

export const UserModel = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UuidAdapter.v4(),
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "customer",
  },
});
