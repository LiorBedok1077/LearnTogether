import { Length, IsNotEmpty, IsString, IsBoolean } from 'class-validator'

export class SigninDto {

    @IsString()
    @Length(3, 16)
    username: string

    @IsString()
    @Length(6, 32)
    password: string

    @IsNotEmpty()
    @IsBoolean()
    remember_me: boolean
}