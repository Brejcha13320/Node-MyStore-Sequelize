import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../../database";
import { UuidAdapter } from "../../config";

const UserModel = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4,
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
    defaultValue: UUIDV4,
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
    defaultValue: UUIDV4,
  },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
});

const ProductModel = sequelize.define("products", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4,
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

const OrderModel = sequelize.define("orders", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  customerId: {
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: "customers",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if ((this.getDataValue("items") as any[]).length > 0) {
        return (this.getDataValue("items") as any[]).reduce((total, item) => {
          return total + item.price * item.ordersProducts.amount;
        }, 0);
      }
      return 0;
    },
  },
});

const OrderProductModel = sequelize.define("ordersProducts", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  amount: { allowNull: false, type: DataTypes.INTEGER },
  orderId: {
    field: "orderId",
    allowNull: false,
    type: DataTypes.UUID,
    references: { model: "orders", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  productId: {
    field: "productId",
    allowNull: false,
    type: DataTypes.UUID,
    references: { model: "products", key: "id" },
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

// Order < One to Many > Customer
CustomerModel.hasMany(OrderModel, { as: "orders", foreignKey: "customerId" });
OrderModel.belongsTo(CustomerModel, { as: "customer" });

// Order < Many to Many > Product
OrderModel.belongsToMany(ProductModel, {
  as: "items",
  through: "ordersProducts",
});
ProductModel.belongsToMany(OrderModel, {
  as: "items",
  through: "ordersProducts",
});

export {
  UserModel,
  CustomerModel,
  CategoryModel,
  ProductModel,
  OrderModel,
  OrderProductModel,
};
