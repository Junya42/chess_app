import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodObject } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(
    private schemas: ZodObject<any>[],
    private changeValue?: (value: any) => any,
  ) {}
  transform(value: unknown, metadata: ArgumentMetadata) {
    let isValid = false;
    for (const schema of this.schemas) {
      try {
        schema.parse(value);
        isValid = true;
        break;
      } catch (e) {}
    }
    if (!isValid) {
      throw new BadRequestException('Validation failed');
    }
    if (this.changeValue) return this.changeValue(value);
    return value;
  }
}
