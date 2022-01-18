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
exports.tokenValidate = exports.decodeJwt = exports.generateJwt = void 0;
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
const index_1 = require("./index");
const User_1 = require("../models/User");
const Session_1 = require("../models/Session");
const errors_1 = require("./errors");
const generateJwt = (data) => {
    const access = jwt.sign(data, config_1.default.auth.jwt.access.secret, { expiresIn: config_1.default.auth.jwt.access.lifetime, });
    const refresh = jwt.sign(data, config_1.default.auth.jwt.refresh.secret, { expiresIn: config_1.default.auth.jwt.refresh.lifetime, });
    return { access, refresh, };
};
exports.generateJwt = generateJwt;
const decodeJwt = (token, secret) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield jwt.verify(token, secret);
    }
    catch (e) {
        const code = e.name === 'TokenExpiredError' ? errors_1.Errors.TokenExpired : errors_1.Errors.TokenInvalid;
        const msg = e.name === 'TokenExpiredError' ? 'Token expired' : 'Token invalid';
        throw (0, index_1.error)(code, msg, {});
    }
});
exports.decodeJwt = decodeJwt;
function tokenValidate(tokenType) {
    return function (r, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, exports.decodeJwt)(token, config_1.default.auth.jwt[tokenType].secret);
            const { user, } = yield Session_1.Session.findByPk(data.id, {
                include: [{ model: User_1.User, }],
            });
            if (user) {
                return { isValid: true, credentials: user, artifacts: { token, type: tokenType, }, };
            }
            throw (0, index_1.error)(errors_1.Errors.SessionNotFound, 'User not found', {});
        });
    };
}
exports.tokenValidate = tokenValidate;
//# sourceMappingURL=auth.js.map