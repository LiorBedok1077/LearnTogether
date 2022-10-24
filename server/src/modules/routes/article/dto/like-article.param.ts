import { IsEnum, IsNotEmpty } from "class-validator"
import { likeOrDislikeEnum } from "../../../../common/interfaces/dto"

export class LikeArticleParam {

    @IsNotEmpty()
    @IsEnum(likeOrDislikeEnum)
    like: likeOrDislikeEnum
}