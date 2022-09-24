import { Length, IsOptional, IsString, IsEnum, IsEmail, IsArray, ArrayMaxSize, ArrayMinSize } from 'class-validator'
import { GenderEnum, PreferedLanguagesEnum } from '../../../../interfaces/db-models'


export class UpdateUserDto {

    @IsOptional()
    @IsString()
    @Length(3, 24)
    full_name?: string

    @IsOptional()
    @IsString()
    @Length(3, 16)
    username?: string

    @IsOptional()
    @IsEnum(GenderEnum)
    gender?: GenderEnum

    @IsOptional()
    @IsEmail()
    @Length(3, 32)
    email?: string

    @IsOptional()
    @IsString()
    @Length(6, 32)
    password?: string

    @IsOptional()
    @IsString()
    @Length(3, 52)
    bio?: string

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(8)
    @IsString({ each: true })
    @Length(2, 16, { each: true })
    interests?: string[]

    @IsOptional()
    @IsArray()
    @IsEnum(PreferedLanguagesEnum, { each: true })
    prefered_langs?: PreferedLanguagesEnum[]
}