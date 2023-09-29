"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodListValidationPipe = exports.ZodValidationPipe = void 0;
const common_1 = require("@nestjs/common");
class ZodValidationPipe {
    constructor(schema) {
        this.schema = schema;
    }
    transform(value, metadata) {
        try {
            this.schema.parse(value);
        }
        catch (error) {
            throw new common_1.BadRequestException('Validation failed');
        }
        return value;
    }
}
exports.ZodValidationPipe = ZodValidationPipe;
class ZodListValidationPipe {
    constructor(schemas) {
        this.schemas = schemas;
    }
    transform(value, metadata) {
        let isValid = false;
        for (const schema of this.schemas) {
            try {
                schema.parse(value);
                isValid = true;
                break;
            }
            catch (e) { }
        }
        if (!isValid) {
            throw new common_1.BadRequestException('Validation failed');
        }
        return value;
    }
}
exports.ZodListValidationPipe = ZodListValidationPipe;
//# sourceMappingURL=zod.pipe.js.map