"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchemaByUsername = exports.loginUserSchemaByMail = void 0;
const zod_1 = require("zod");
exports.loginUserSchemaByMail = zod_1.z
    .object({
    email: zod_1.z.string().email().min(5),
    password: zod_1.z.string().min(4),
})
    .required();
exports.loginUserSchemaByUsername = zod_1.z
    .object({
    username: zod_1.z.string().min(5),
    password: zod_1.z.string().min(4),
})
    .required();
//# sourceMappingURL=login-user.dto.js.map