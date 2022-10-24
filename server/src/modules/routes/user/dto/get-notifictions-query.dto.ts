import { Transform } from 'class-transformer'
import { Min, IsOptional, IsNumber, IsEnum } from 'class-validator'
import { NotificationTypesEnum } from '../../../../common/interfaces/notification'

export class GetNotificationsQueryDto {

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    page: number

    @IsOptional()
    @IsEnum(NotificationTypesEnum)
    n_type?: NotificationTypesEnum
}