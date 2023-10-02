"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidationPipe = void 0;
const common_1 = require("@nestjs/common");
class ZodValidationPipe {
    constructor(schemas, changeValue) {
        this.schemas = schemas;
        this.changeValue = changeValue;
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
        if (this.changeValue)
            return this.changeValue(value);
        return value;
    }
}
exports.ZodValidationPipe = ZodValidationPipe;
//# sourceMappingURL=zod.pipe.js.map