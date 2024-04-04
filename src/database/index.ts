import { Sequelize } from "sequelize";
import { envs } from "../config";

const mysqlUrl: string = envs.MYSQL_URL || "";
const sequelize = new Sequelize(mysqlUrl);

sequelize.sync();

export default sequelize;
