import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateGroupDto {

    @IsNotEmpty()
    @IsString()
    @Length(5, 24)
    title: string

    @IsNotEmpty()
    @IsString()
    @Length(3, 32)
    description: string

    @ArrayMaxSize(9)
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    @Length(36, 36, { each: true, message: "Invalid members list" })
    members: string[]

    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(5)
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    @Length(2, 12, { each: true })
    tags: string[]

    // thumbnail: file
}