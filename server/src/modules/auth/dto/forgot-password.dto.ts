import { Length, IsNotEmpty, IsString, MaxLength, IsJWT } from 'class-validator'

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
    @IsJWT({ message: "Invalid verification token" })
    @MaxLength(312)
    verification_token: string
}