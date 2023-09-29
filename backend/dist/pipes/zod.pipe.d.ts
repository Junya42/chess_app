import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ZodObject } from 'zod';
export declare class ZodValidationPipe implements PipeTransform {
    private schema;
    constructor(schema: ZodObject<any>);
    transform(value: unknown, metadata: ArgumentMetadata): unknown;
}
export declare class ZodListValidationPipe implements PipeTransform {
    private schemas;
    constructor(schemas: ZodObject<any>[]);
    transform(value: unknown, metadata: ArgumentMetadata): unknown;
}
