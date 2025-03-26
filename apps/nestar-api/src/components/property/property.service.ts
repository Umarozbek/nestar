import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../../libs/types/enums/common.enum';
import { PropertyInput } from '../../libs/dto/property/property.input';
import { MemberService } from '../member/member.service';

@Injectable()
export class PropertyService {
    constructor(@InjectModel('Property') private readonly propertyModel: Model<PropertyInput>,
     private memberService: MemberService
    ) {}
 // property input emas property edi lekin ishlatolmadim
 public async createProperty(input: PropertyInput): Promise<PropertyInput> {

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