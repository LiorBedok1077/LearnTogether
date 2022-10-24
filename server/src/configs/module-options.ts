import { resolve } from "path"
// configs
import { ENV_VARS, FILENAMES, REDIS_DB_INDEX } from "../common/constants"
// types (services options)
import { ConfigModuleOptions, ConfigService } from '@nestjs/config'
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface'
// adapters
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

// config module options
export const ConfigsModuleOptions: ConfigModuleOptions = {
    envFilePath: FILENAMES.env.test,
    isGlobal: true
}

// mailer module async options
export const MailerModuleAsyncOptions: MailerAsyncOptions = {
    useFactory: async (config: ConfigService) => ({
        transport: {
            host: config.get(ENV_VARS.MAIL_HOST),
            secure: false,
            auth: {
                user: config.get(ENV_VARS.MAIL_USER),
                pass: config.get(ENV_VARS.MAIL_PASS)
            }
        },
        defaults: {
            from: `"no-replay" <${config.get(ENV_VARS.MAIL_FROM)}>`
        },
        template: {
            dir: resolve(__dirname, '..', 'common/templates'),
            adapter: new HandlebarsAdapter(),
            options: { strict: true }
        },
    }),
    inject: [ConfigService]
}

/**
 * Redis client default configs. (currently insecure in development)
 * @param config the (injected) config-service.
 * @param db the redis-db-index (0-15).
 * @returns a config-object for a redis-client.
 */
export const RedisConfigOptions = (config: ConfigService, db: REDIS_DB_INDEX) => ({
    host: config.get(ENV_VARS.CACHE_REDIS_HOST),
    port: config.get(ENV_VARS.CACHE_REDIS_PORT),
    // username: config.get(ENV_VARS.CACHE_REDIS_USERNAME),
    // password: config.get(ENV_VARS.CACHE_REDIS_PASSWORD),
    db
})