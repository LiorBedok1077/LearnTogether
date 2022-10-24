import { Length, IsNotEmpty, IsString } from 'class-validator'

export class ChangePasswordDto {

    @IsNotEmpty()
    @IsString()
    @Length(6, 32)
    old_password: string

    @IsNotEmpty()
    @IsString()
    @Length(6, 32)
    new_password: string
}