import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodObject } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}

export class ZodListValidationPipe implements PipeTransform {
  constructor(private schemas: ZodObject<any>[],
	private changeValue: (value: unknown) => unknown = (value) => value) {}
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
    return this.changeValue(value);
  }
}
