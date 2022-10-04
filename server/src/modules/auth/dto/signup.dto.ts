import { Length, IsOptional, IsEmail, IsNotEmpty, IsEnum, IsString, IsArray, ArrayNotEmpty, ArrayMinSize, ArrayMaxSize } from 'class-validator'
import { GenderEnum, PreferedLanguagesEnum } from '@prisma/client'

export class SignupDto {

    @IsString()
    @Length(3, 24)
    full_name: string

    @IsString()
    @Length(3, 16)
    username: string

    @IsNotEmpty()
    @IsEnum(GenderEnum)
    gender: GenderEnum

    @IsEmail()
    @Length(3, 32)
    email: string

    @IsString()
    @Length(6, 32)
    password: string

    @IsOptional()
    @IsString()
    @Length(3, 52)
    bio?: string

    @ArrayNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(8)
    @IsString({ each: true })
    @Length(2, 16, { each: true })
    interests: string[]

    @IsNotEmpty()
    @IsArray()
    @IsEnum(PreferedLanguagesEnum, { each: true })
    prefered_langs: PreferedLanguagesEnum[]
}