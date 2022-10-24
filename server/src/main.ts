import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ENV_VARS } from './common/constants'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)
  const port = config.get(ENV_VARS.SERVER_PORT)
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v'
  })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port);
}
bootstrap();