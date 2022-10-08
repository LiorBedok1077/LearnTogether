import { Module } from '@nestjs/common'
// configs
import { ConfigsModuleOptions } from './configs/module-options'
// modules
import { ConfigModule } from '@nestjs/config'
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