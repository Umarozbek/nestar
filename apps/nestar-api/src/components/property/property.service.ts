import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Message } from '../../libs/types/enums/common.enum';
import { PropertyInput } from '../../libs/dto/property/property.input';
import { MemberService } from '../member/member.service';
import { Property } from '../../libs/dto/property/property';
import { StatisticModifier, T } from '../../libs/types/common';
import { ViewGroup } from '../../libs/types/enums/view.enum';
import { PropertyStatus } from '../../libs/types/enums/property.enum';
import { ViewService } from '../view/view.service';
import { PropertyUpdate } from './property.update';
import moment from 'moment';


@Injectable()
export class PropertyService {
    constructor(
        @InjectModel('Property') private readonly propertyModel: Model<Property>, 
        private memberService: MemberService,
        private  viewService: ViewService,
    ) {}


    /* CREATE PROPERTY */
    public async createProperty(input: PropertyInput): Promise<Property> {
        try {
            const result = await this.propertyModel.create(input);

            // Increase memberProperties
            await this.memberService.memberStatsEditor({ 
                _id: result.memberId, 
                targetKey: 'memberProperties', 
                modifier: 1,
            });

            return result;
        } catch (err) {
            console.log('Error, Service.model:', err.message);
            throw new BadRequestException(Message.CREATE_FAILED);
        }
    }


    /* GET PROPERTY */
    public async getProperty(memberId: ObjectId, propertyId: ObjectId): Promise<Property> {
        const search: T = {
            _id: propertyId,
            propertyStatus: PropertyStatus.ACTIVE,
        };
    
        const targetProperty: Property = await this.propertyModel.findOne(search).lean().exec();
        if (!targetProperty) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
    
        if (memberId) {
            const viewInput = { memberId: memberId, viewRefId: propertyId, viewGroup: ViewGroup.PROPERTY };
            const newView = await this.viewService.recordView(viewInput);
            if (newView) {
                await this.propertyStatsEditor({ _id: propertyId, targetkey: 'propertyViews', modifier: 1 });
                targetProperty.propertyViews++;
            }
        }
    
        targetProperty.memberData = await this.memberService.getMember(null, targetProperty.memberId);
        return targetProperty;
    }
    // meni yolim xato  memberData kelmaganda memberData: import("c:/Users/1/Desktop/nestar/apps/nestar-api/src/libs/dto/member/member").Member; dan import boldi undan tashqari member data degan type qoshildi propery model.ts faylida birinchilikda
    public async propertyStatsEditor(input: StatisticModifier): Promise<Property> {
        const { _id, targetkey, modifier } = input;
        return await this.propertyModel
            .findByIdAndUpdate(
                _id,
                { $inc: { [targetkey]: modifier } },
                { new: true },
            )
            .exec();
    }
    
    /* UPDATE PROPERTY */
    public async updateProperty(memberId: ObjectId, input: PropertyUpdate): Promise<Property> {
        let { propertyStatus, soldAt, deletedAt } = input;
        const search: T = {
            _id: input._id,
            memberId: memberId,
            propertyStatus: PropertyStatus.ACTIVE,
        };

        if (propertyStatus === PropertyStatus.SOLD) soldAt = moment().toDate();
        else if (propertyStatus === PropertyStatus.DELETE) deletedAt = moment().toDate();

        const result = await this.propertyModel
        .findOneAndUpdate(search, input, {
            new: true,
        })
        .exec();

        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

        if (soldAt || deletedAt) {
            await this.memberService.memberStatsEditor({
                _id: memberId,
                targetKey: 'memberProperties',
                modifier: -1,
            });
        }
        
        return result;
    }

    
    }