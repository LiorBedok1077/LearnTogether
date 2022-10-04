import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class UpdateGroupDto {

    @IsOptional()
    @IsString()
    @Length(5, 24)
    title?: string

    @IsOptional()
    @IsString()
    @Length(3, 32)
    description?: string

    @IsOptional()
    @ArrayMaxSize(9)
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    @Length(36, 36, { each: true, message: "Invalid members list" })
    members?: string[]

    @IsOptional()
    @ArrayMinSize(1)
    @ArrayMaxSize(5)
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    @Length(2, 12, { each: true })
    tags?: string[]

    // thumbnail: file
}