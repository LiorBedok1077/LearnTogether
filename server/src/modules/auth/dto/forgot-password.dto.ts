import { Length, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class ForgotPasswordDto {

    @IsNotEmpty()
    @IsString()
    @Length(3, 32)
    username_or_email: string
}

export class ChangeForgottenPasswordDto {

    @IsNotEmpty()
    @IsString()
    @Length(6, 32)
    new_password: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(232)
    verification_token: string
}