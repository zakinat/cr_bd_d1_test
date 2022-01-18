"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = void 0;
var Errors;
(function (Errors) {
    Errors[Errors["InvalidPayload"] = 400000] = "InvalidPayload";
    Errors[Errors["TokenExpired"] = 401001] = "TokenExpired";
    Errors[Errors["TokenInvalid"] = 401002] = "TokenInvalid";
    Errors[Errors["SessionNotFound"] = 401003] = "SessionNotFound";
    Errors[Errors["NotFound"] = 404000] = "NotFound";
})(Errors = exports.Errors || (exports.Errors = {}));
//# sourceMappingURL=errors.js.map