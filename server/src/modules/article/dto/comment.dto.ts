import { Length } from "class-validator";

export class CommentDto {

    @Length(3, 64)
    data: string
}