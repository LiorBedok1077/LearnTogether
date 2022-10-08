import { Module } from '@nestjs/common'
// configs
import { ConfigsModuleOptions, MailerModuleAsyncOptions } from './configs/module-options'
// modules
import { ConfigModule } from '@nestjs/config'
import { MailerModule } from '@nestjs-modules/mailer'
import {
  ArticleModule,
  AuthModule,
  CommentModule,
  GroupModule,
  JwtModule,
  NotificationModule,
  PrismaModule,
  UserModule
} from './modules'

@Module({
  imports: [
    // global modules:
    ConfigModule.forRoot(ConfigsModuleOptions),           // -- config module - access environment variables globally.
    MailerModule.forRootAsync(MailerModuleAsyncOptions),  // -- mailer module - allows sending mails globally.
    PrismaModule,                                         // -- prisma module - access to main database globally.
    JwtModule,                                            // -- jwt module - access normal & custom jwt-methods globally.
    NotificationModule,                                   // -- notification module - push notifications.
    // route modules:
    AuthModule,
    UserModule,
    GroupModule,
    ArticleModule,
    CommentModule,
  ]
})
export class AppModule { }