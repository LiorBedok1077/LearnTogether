import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, Length } from "class-validator"

export class CreateArticleDto {

    @Length(5, 64)
    title: string

    @Length(12, 256)
    content: string

    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(8)
    @Length(3, 12, { each: true })
    tags: string[]

    // file: File
}