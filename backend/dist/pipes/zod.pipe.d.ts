import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ZodObject } from 'zod';
export declare class ZodValidationPipe implements PipeTransform {
    private schemas;
    private changeValue?;
    constructor(schemas: ZodObject<any>[], changeValue?: ((value: any) => any) | undefined);
    transform(value: unknown, metadata: ArgumentMetadata): any;
}
