import { Global, Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { MailService } from './mail.service'
// configs
import { MailerModuleAsyncOptions } from '../../configs/module-options'

@Global()
@Module({
    imports: [MailerModule.forRootAsync(MailerModuleAsyncOptions)],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule { }