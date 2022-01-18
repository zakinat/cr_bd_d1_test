"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAvatar = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const utils_1 = require("../utils");
const User_1 = require("./User");
let UserAvatar = class UserAvatar extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.STRING, defaultValue: () => (0, utils_1.getUUID)(), }),
    __metadata("design:type", String)
], UserAvatar.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", Number)
], UserAvatar.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BLOB),
    __metadata("design:type", Buffer)
], UserAvatar.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User),
    __metadata("design:type", User_1.User)
], UserAvatar.prototype, "user", void 0);
UserAvatar = __decorate([
    (0, sequelize_typescript_1.Scopes)(() => ({
        defaultScope: {
            attributes: {
                exclude: ['password'],
            },
        },
        withPassword: {
            attributes: {
                include: ['password'],
            },
        },
    })),
    sequelize_typescript_1.Table
], UserAvatar);
exports.UserAvatar = UserAvatar;
//# sourceMappingURL=UserAvatar.js.map