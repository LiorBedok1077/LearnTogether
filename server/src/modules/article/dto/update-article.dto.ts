import { ArrayMaxSize, ArrayMinSize, IsOptional, Length } from "class-validator"

export class UpdateArticleDto {

    @IsOptional()
    @Length(5, 64)
    title: string

    @IsOptional()
    @Length(12, 256)
    content: string

    @IsOptional()
    @ArrayMinSize(1)
    @ArrayMaxSize(8)
    @Length(3, 12, { each: true })
    tags: string[]

    // file: File
}