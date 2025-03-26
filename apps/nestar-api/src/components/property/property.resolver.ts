import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { PropertyInput } from '../../libs/dto/property/property.input';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/types/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';

@Resolver()
export class PropertyResolver {
     constructor(private readonly  propertyService: PropertyService) {}
    

       @Roles(MemberType.USER, MemberType.AGENT)
       @UseGuards(RolesGuard)
     @Mutation(()=> String)
     public async createProperty(
        @Args('input') input:PropertyInput,
        @AuthMember("_id") memberId: ObjectId,
        // property input emas property edi lekin ishlatolmadim
    ): Promise<PropertyInput> {
        console.log('Mutation: createProperty ');
        input.memberId = memberId;

        return await this.propertyService.createProperty(input);
     }
}
