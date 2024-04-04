import { DataTypes } from "sequelize";
import sequelize from "../../database";
import { UuidAdapter } from "../../config";
import { Product } from "../interfaces/products.interface";

const UserModel = sequelize.define("users", {
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

const CustomerModel = sequelize.define("customers", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UuidAdapter.v4(),
  },
  name: { allowNull: false, type: DataTypes.STRING },
  lastName: { allowNull: false, type: DataTypes.STRING },
  phone: { allowNull: true, type: DataTypes.STRING },
  userId: {
    allowNull: false,
    type: DataTypes.UUID,
    unique: true,
    references: { model: "users", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
});

const CategoryModel = sequelize.define("categories", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UuidAdapter.v4(),
  },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
});

const ProductModel = sequelize.define("products", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UuidAdapter.v4(),
  },
  name: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  categoryId: {
    allowNull: false,
    type: DataTypes.UUID,
    references: { model: "categories", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
});

// Customer < One to One > User
CustomerModel.belongsTo(UserModel, { as: "user" });
UserModel.hasOne(CustomerModel, { as: "customer", foreignKey: "userId" });

// Category < One to Many > Products
CategoryModel.hasMany(ProductModel, {
  as: "products",
  foreignKey: "categoryId",
});
ProductModel.belongsTo(CategoryModel, { as: "category" });

export { UserModel, CustomerModel, CategoryModel, ProductModel };
