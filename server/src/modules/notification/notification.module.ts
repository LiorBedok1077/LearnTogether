import { Module, Global } from '@nestjs/common'
// configs
import { MailerModuleAsyncOptions } from '../../configs/module-options'
// mailer-module (will be used inside notification-module)
import { MailerModule } from '@nestjs-modules/mailer'
// services
import { NotificationService } from './notification.service'

@Global()
@Module({
    imports: [MailerModule.forRootAsync(MailerModuleAsyncOptions)],
    providers: [NotificationService],
    exports: [NotificationService]
})
export class NotificationModule { }