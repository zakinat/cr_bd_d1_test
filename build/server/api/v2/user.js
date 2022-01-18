"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAvatar = exports.getAvatar = exports.getUser = void 0;
const User_1 = require("../../models/User");
const UserAvatar_1 = require("../../models/UserAvatar");
const utils_1 = require("../../utils");
function getUser(r) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.output)({ firstName: 'John', });
    });
}
exports.getUser = getUser;
const getAvatar = (r) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findByPk(r.auth.credentials.id, {
            include: {
                model: UserAvatar_1.UserAvatar,
                as: 'avatar',
            },
        });
        const avatarAsBase64 = `data:image/png;base64${user.avatar.image.toString('base64')}`;
        return (0, utils_1.output)({ data: avatarAsBase64, userId: user.id, });
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.getAvatar = getAvatar;
const addAvatar = (r) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = r.auth.credentials;
        const { avatarImage, } = r.payload;
        const previousAvatar = yield UserAvatar_1.UserAvatar.findOne({ where: { userId: user.id, }, });
        if (previousAvatar) {
            yield previousAvatar.destroy();
        }
        yield (0, utils_1.saveImage)(user.id, avatarImage);
        return (0, utils_1.output)({ message: 'Your avatar has been added!', });
    }
    catch (err) {
        if (err.message == 'This file type is now allowed') {
            return (0, utils_1.error)(400000, 'This file type is now allowed', null);
        }
        console.log(err);
        throw err;
    }
});
exports.addAvatar = addAvatar;
//# sourceMappingURL=user.js.map