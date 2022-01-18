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
exports.saveImage = exports.getFileExt = exports.handleValidationError = exports.responseHandler = exports.totpValidate = exports.error = exports.output = exports.getRealIp = exports.getUUID = void 0;
const uuid_1 = require("uuid");
const boom_1 = require("@hapi/boom");
const FileType = require("file-type");
const speakeasy = require("speakeasy");
const config_1 = require("../config/config");
function getUUID() {
    return (0, uuid_1.v4)();
}
exports.getUUID = getUUID;
function getRealIp(request) {
    return request.headers['cf-connecting-ip']
        ? request.headers['cf-connecting-ip']
        : request.info.remoteAddress;
}
exports.getRealIp = getRealIp;
function output(res) {
    return {
        ok: true,
        result: res,
    };
}
exports.output = output;
function error(code, msg, data) {
    return new boom_1.Boom(msg, {
        data: {
            code,
            data,
            api: true,
        },
        statusCode: Math.floor(code / 1000),
    });
}
exports.error = error;
function totpValidate(totp, secret) {
    return speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token: Number(totp),
    });
}
exports.totpValidate = totpValidate;
function responseHandler(r, h) {
    if (r.response.isBoom && r.response.data === null) {
        r.response = h
            .response({
            ok: false,
            code: Math.floor(r.response.output.statusCode * 1000),
            data: {},
            msg: r.response.message,
        })
            .code(r.response.output.statusCode);
        return h.continue;
    }
    if (r.response.isBoom && r.response.data.api) {
        r.response = h
            .response({
            ok: false,
            code: r.response.data.code,
            data: r.response.data.data,
            msg: r.response.output.payload.message,
        })
            .code(Math.floor(r.response.data.code / 1000));
        return h.continue;
    }
    if (r.response.isBoom && !r.response.data.api) {
        r.response = h
            .response({
            ok: false,
            code: Math.floor(r.response.output.statusCode * 1000),
            data: r.response.data,
            msg: r.response.message,
        })
            .code(r.response.output.statusCode);
        return h.continue;
    }
    return h.continue;
}
exports.responseHandler = responseHandler;
function handleValidationError(r, h, err) {
    return __awaiter(this, void 0, void 0, function* () {
        return error(400000, 'Validation error', err.details.map((e) => ({ field: e.context.key, reason: e.type.replace('any.', ''), })));
    });
}
exports.handleValidationError = handleValidationError;
const getFileExt = (file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Buffer.isBuffer(file)) {
        throw error(400000, 'This file type is now allowed', null);
    }
    const fileExt = yield FileType.fromBuffer(file);
    if (!fileExt || !fileExt.ext.match(config_1.default.files.allowedExtensions)) {
        throw error(400000, 'This file type is now allowed', null);
    }
    return { data: file, fileExt: fileExt.ext, };
});
exports.getFileExt = getFileExt;
const saveImage = (userId, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileWithExt = yield (0, exports.getFileExt)(file);
        console.log(fileWithExt.fileExt);
    }
    catch (err) {
        throw err;
    }
});
exports.saveImage = saveImage;
//# sourceMappingURL=index.js.map