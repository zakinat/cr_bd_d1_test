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
exports.hellouserRoutes = void 0;
const Joi = require("joi");
const schemes_1 = require("../../schemes");
const hellousers_entity_1 = require("../../db/entities/hellousers.entity");
const utils_1 = require("../../utils");
const hellouserRoutes = (con) => {
    const userRepo = con.getRepository(hellousers_entity_1.HelloUsersEntity);
    return [
        {
            method: 'GET',
            path: '/v3/hellouser',
            handler: (request, h, err) => __awaiter(void 0, void 0, void 0, function* () {
                const notebookID = request.server.info.id.split(':')[0];
                console.log(notebookID);
                try {
                    const oldUser = yield userRepo.findOne({ notebookID });
                    if (oldUser)
                        return (0, utils_1.output)({ hellouser: `hello! your ID is: ${oldUser.id}`, });
                    const user = new hellousers_entity_1.HelloUsersEntity(notebookID);
                    const data = yield userRepo.save(user);
                    return (0, utils_1.output)({ hellouser: `hello! your ID is: ${data.id}`, });
                }
                catch (error) {
                    console.log(error);
                }
            }),
            options: {
                id: 'v3.hellouser.get',
                tags: ['api', 'v3', 'hellouser'],
                auth: false,
                response: {
                    schema: (0, schemes_1.outputOkSchema)(Joi.object({
                        hellouser: Joi.string().example('hello John'),
                    })),
                },
            },
        },
    ];
};
exports.hellouserRoutes = hellouserRoutes;
//# sourceMappingURL=hellouser.js.map