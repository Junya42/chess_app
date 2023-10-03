import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserRepository
{
    constructor (private prismaService : PrismaService) {}
    create (params: { data: Prisma.UserCreateInput }) : Promise<User>
    {
        const data = params.data
        return this.prismaService.user.create({data})
    }

    getUsers(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
        select?: Prisma.UserSelect;
    }) : Promise<User[]>
    {
        const { skip, take, cursor, where, orderBy, select } = params;
        return this.prismaService.user.findMany({ skip, take, cursor, where, orderBy, select });
    }

    updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }) : Promise<User>
    {
        const {where, data} = params
        return this.prismaService.user.update({where, data})
    }

    delete(params: {
        where: Prisma.UserWhereUniqueInput;
    }): Promise<User>
    {
        const {where} = params
        return this.prismaService.user.delete({ where })
    }
}