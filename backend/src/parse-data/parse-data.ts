import { Injectable } from '@nestjs/common';

@Injectable()
export class ParseData {
	passwordHashingBeforeUsage(value: unknown) {
		if (typeof value === 'object' && value !== null && 'password' in value)
			value = 
	}
}
