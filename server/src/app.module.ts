import { Module } from '@nestjs/common'
// configs
import { ConfigsModuleOptions } from './configs/module-options'
// modules
import { ConfigModule } from '@nestjs/config'
import { MailModule, AuthModule, PrismaModule, UserModule, JwtModule, GroupModule } from './modules'

@Module({
  imports: [
    // config module - access environment variables globally.
    ConfigModule.forRoot(ConfigsModuleOptions),
    // mailer module - allows sending mails globally.
    MailModule,
    // prisma module - access to main database globally.
    PrismaModule,
    // jwt module - access normal & custom jwt-methods globally.
    JwtModule,
    // route modules:
    AuthModule,
    UserModule,
    GroupModule
  ]
})
export class AppModule { }