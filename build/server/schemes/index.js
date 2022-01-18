"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.outputPaginationSchema = exports.outputOkSchema = void 0;
const Joi = require("joi");
const outputOkSchema = (res) => Joi.object({
    ok: Joi.boolean().example(true),
    result: res,
});
exports.outputOkSchema = outputOkSchema;
function outputPaginationSchema(title, item) {
    return Joi.object({
        ok: Joi.boolean().example(true),
        result: Joi.object({
            count: Joi.number().integer().example(10),
            [title]: Joi.array().items(item),
        }),
    });
}
exports.outputPaginationSchema = outputPaginationSchema;
const user = Joi.object({
    name: Joi.string(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .required(),
});
exports.user = user;
//# sourceMappingURL=index.js.map