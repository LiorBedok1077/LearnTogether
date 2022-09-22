import { Module } from '@nestjs/common'
// configs
import { ROOT_ENV_FILE } from '../configs/constants'
// modules
import { ConfigModule } from '@nestjs/config'
import { AuthModule, PrismaModule } from './modules'

@Module({
  imports: [
    // config module - access environment variables globally.
    ConfigModule.forRoot({
      envFilePath: ROOT_ENV_FILE.test,
      isGlobal: true
    }),
    PrismaModule,
    AuthModule
  ]
})
export class AppModule { }
