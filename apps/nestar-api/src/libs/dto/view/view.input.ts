import { Field, InputType } from "@nestjs/graphql";
import {IsNotEmpty} from "class-validator";
import { ViewGroup } from "../../types/enums/view.enum";
import { ObjectId } from "mongoose";



@InputType()
    // SIGN UP uchun Validation
export class ViewInput {

    @IsNotEmpty()
    @Field(()=> String)
    memberId: ObjectId;

    @IsNotEmpty()
    @Field(()=> String)
    viewRefId: ObjectId;

    @IsNotEmpty()
    @Field(()=> ViewGroup)
    viewGroup: ViewGroup;

    
}