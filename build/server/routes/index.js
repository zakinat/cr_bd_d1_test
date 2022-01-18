"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hellouserRoutes = void 0;
const v1_1 = require("./v1");
const v2_1 = require("./v2");
const index_1 = require("./v3/index");
exports.hellouserRoutes = index_1.default;
exports.default = [...v1_1.default, ...v2_1.default];
//# sourceMappingURL=index.js.map