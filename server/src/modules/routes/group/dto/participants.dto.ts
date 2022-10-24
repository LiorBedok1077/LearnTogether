import { IsEnum, IsNotEmpty, Length, ValidateIf } from "class-validator"
import { UUID_LENGTH } from "../../../../common/constants"
import { listActionsEnum } from "../../../../common/interfaces/dto"

export class UpdateParticipantsDto {

    @IsNotEmpty()
    @IsEnum(listActionsEnum)
    action: listActionsEnum

    @Length(UUID_LENGTH, UUID_LENGTH)
    group_id: string

    @Length(UUID_LENGTH, UUID_LENGTH)
    user_id: string

    @ValidateIf(o => o.action !== listActionsEnum.remove)
    roles?: string
}