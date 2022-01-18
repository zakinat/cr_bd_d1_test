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
exports.HelloUsersEntity = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let HelloUsersEntity = class HelloUsersEntity extends _1.SharedProp {
    constructor(notebookID) {
        super();
        this.notebookID = notebookID;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], HelloUsersEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'notebookID', nullable: false }),
    __metadata("design:type", String)
], HelloUsersEntity.prototype, "notebookID", void 0);
HelloUsersEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' }),
    __metadata("design:paramtypes", [String])
], HelloUsersEntity);
exports.HelloUsersEntity = HelloUsersEntity;
//# sourceMappingURL=hellousers.entity.js.map