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
  RedisModule,
  UserModule
} from './modules'

@Module({
  imports: [
    // global modules:
    ConfigModule.forRoot(ConfigsModuleOptions),     // -- access environment-variables globally.
    PrismaModule,                                   // -- access main database globally.
    RedisModule,                                    // -- access redis sub-databases via different clients globally.
    JwtModule,                                      // -- access normal & custom jwt-methods globally.
    NotificationModule,                             // -- global notifications service (mail, notifications, etc).
    // route modules:
    AuthModule,
    UserModule,
    GroupModule,
    ArticleModule,
    CommentModule,
  ]
})
export class AppModule { }