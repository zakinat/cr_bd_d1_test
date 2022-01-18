"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { DB_HOST, DB_USER, DB_DB, DB_PAS, } = process.env;
const sequelize = new sequelize_1.Sequelize(DB_DB, DB_USER, DB_PAS, {
    dialect: 'postgres',
});
sequelize.sync();
exports.default = sequelize;
//# sourceMappingURL=index.js.map