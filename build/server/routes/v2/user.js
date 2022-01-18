"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const user_1 = require("../../api/v2/user");
const config_1 = require("../../config/config");
const schemes_1 = require("../../schemes");
exports.default = [
    {
        method: 'GET',
        path: '/v2/user',
        handler: user_1.getUser,
        options: {
            id: 'v2.user.get',
            tags: ['api', 'v2', 'user'],
            response: {
                schema: (0, schemes_1.outputOkSchema)(Joi.object({
                    firstName: Joi.string().example('John'),
                })),
            },
        },
    },
    {
        method: 'GET',
        path: '/v2/user/avatar',
        handler: user_1.getAvatar,
        options: {
            id: 'v2.user.avatar.get',
            description: `Use this method to receive user's avatar as base64 string.`,
            tags: ['api', 'v2', 'user'],
            response: {
                schema: (0, schemes_1.outputOkSchema)(Joi.object({
                    avatar: Joi.string().example('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA...'),
                    userId: Joi.string().example('b8a94812-2b43-4ee3-80ee-1238c7874678'),
                })),
            },
        },
    },
    {
        method: 'POST',
        path: '/v2/user/avatar',
        handler: user_1.addAvatar,
        options: {
            id: 'v2.user.avatar.addf',
            auth: false,
            description: `Use this method to upload user's profile picture (avatar).`,
            notes: `You have to pass image using **Formdata**. Allowed extensions ${config_1.default.files.allowedExtensions}`,
            tags: ['api', 'v2', 'user'],
            payload: {
                maxBytes: 1024 * 1024 * 2,
                output: 'data',
                allow: 'multipart/form-data',
                multipart: true,
                parse: true,
            },
            validate: {
                payload: Joi.object({
                    avatarImage: Joi.any()
                        .meta({ swaggerType: 'file', })
                        .optional()
                        .allow('')
                        .description('image file'),
                }),
                failAction: (req, h, err) => (err.isJoi
                    ? h.response(err.details[0]).takeover().code(400)
                    : h.response(err).takeover()),
            },
            response: {
                schema: (0, schemes_1.outputOkSchema)(Joi.object({
                    message: Joi.string().example('Your avatar has been added!'),
                })),
            },
        },
    }
];
//# sourceMappingURL=user.js.map