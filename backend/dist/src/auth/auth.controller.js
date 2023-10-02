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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const zod_pipe_1 = require("../../pipes/zod.pipe");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const auth_service_1 = require("./auth.service");
const login_user_dto_1 = require("../user/dto/login-user.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    createUser(newUser) {
        console.log("Trying to create a user");
        return this.authService.createUser(newUser);
    }
    login(user) {
        return this.authService.login(user);
    }
    update(user) {
        return this.authService.login(user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, common_1.UsePipes)(new zod_pipe_1.ZodValidationPipe([create_user_dto_1.createUserSchema])),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UsePipes)(new zod_pipe_1.ZodValidationPipe([login_user_dto_1.loginUserSchemaByMail, login_user_dto_1.loginUserSchemaByUsername])),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('update'),
    (0, common_1.UsePipes)(new zod_pipe_1.ZodValidationPipe([login_user_dto_1.loginUserSchemaByMail, login_user_dto_1.loginUserSchemaByUsername])),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "update", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map