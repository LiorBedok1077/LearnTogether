import { Module } from '@nestjs/common'
// configs
import { AppModuleOptions_asyncMailer, AppModuleOptions_configs } from './configs/app-module'
// modules
import { ConfigModule } from '@nestjs/config'
import { MailerModule } from '@nestjs-modules/mailer'
import { AuthModule, PrismaModule, UserModule } from './modules'

@Module({
  imports: [
    // config module - access environment variables globally.
    ConfigModule.forRoot(AppModuleOptions_configs),
    // mailer module - allows sending mails globally.
    MailerModule.forRootAsync(AppModuleOptions_asyncMailer),
    // prisma module - access to the database globally.
    PrismaModule,
    AuthModule,
    UserModule
  ]
})
export class AppModule { }
