import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../../libs/types/enums/common.enum';
import { PropertyInput } from '../../libs/dto/property/property.input';
import { MemberService } from '../member/member.service';
import { Property } from '../../libs/dto/property/property';

@Injectable()
export class PropertyService {
    constructor(@InjectModel('Property') private readonly propertyModel: Model<Property>,
     private memberService: MemberService
    ) {}
 public async createProperty(input: PropertyInput): Promise<Property> {

      try {
                const result = await this.propertyModel.create(input);  
                await this.memberService
                .memberStatsEditor
                  ({  
                    _id: result.memberId,
                     targetKey: "memeberProperties",
                     modifier: 1
                    });
                return result;   
            } catch (err) {
                console.log('Error, Service.model:', err.message);
                throw new BadRequestException(Message.CREATE_FAILED);
            }

 }
    
}