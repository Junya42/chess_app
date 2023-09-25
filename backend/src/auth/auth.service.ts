import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {JwtService} from '@nestjs/jwt';
@Injectable()
export class AuthService {
	constructor ( private prisma : PrismaClient, private jwt : JwtService) {}
	create ()
	{}
}
