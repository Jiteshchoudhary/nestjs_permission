import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    firstName: string

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    lastName: string

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    profilePic: string

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    countryCode: string

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    password: string

    @ApiProperty({ required: true })
    @IsNumber()
    @IsNotEmpty()
    roleId: number
}


export class LoginDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    password: string
}