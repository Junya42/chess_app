"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const config = () => ({
    jwt: {
        jwtKey: process.env.JWT_KEY || 'OUBLIE PAS LA CLEF POUR JWT',
    },
});
exports.config = config;
//# sourceMappingURL=config.js.map