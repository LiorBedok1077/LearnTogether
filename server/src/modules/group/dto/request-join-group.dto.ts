import { IsJWT, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class RequestJoinGroupDto {

    @IsNotEmpty()
    @IsString()
    @IsJWT({ message: "Invalid verification token" })
    @MaxLength(312)
    verification_token: string
}