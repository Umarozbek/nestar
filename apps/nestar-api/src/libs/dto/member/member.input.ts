import { Field, InputType } from "@nestjs/graphql";
import {IsNotEmpty, IsOptional, Length} from "class-validator";
import { MemberAuthType, MemberType } from "../../types/enums/member.enum";



@InputType()
    // SIGN UP uchun Validation
export class MemberInput {
    @IsNotEmpty()
    @Length(3,12)
    @Field(()=> String)
    memberNick: string;

    @IsNotEmpty()
    @Length(5,12)
    @Field(()=> String)
    memberPassword: string;
    
    @IsNotEmpty()
    @Field(()=> String)
    memberPhone: String;
    

    @IsOptional()
    @Field(()=> MemberType, {nullable: true})
    memberType?: MemberType;

    @IsOptional()
    @Field(()=> MemberAuthType, {nullable: true})
    memberAuthType?:MemberAuthType;

}

/// LOGIN UCHUN VALIDATION

    @InputType()

    export class LoginInput {
        @IsNotEmpty()
        @Length(3,12)
        @Field(()=> String)
        memberNick: string;

        @IsNotEmpty()
        @Length(5,12)
        @Field(()=> String)
        memberPassword: string;
    }
