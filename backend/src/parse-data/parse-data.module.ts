import { Module } from '@nestjs/common';
import { ParseData } from './parse-data';

@Module({
  providers: [ParseData]
})
export class ParseDataModule {}
