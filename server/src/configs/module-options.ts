import { resolve } from "path"
// configs
import { ENV_VARS, ROOT_ENV_FILE } from "./constants"
// types (services options)
import { ConfigModuleOptions, ConfigService } from '@nestjs/config'
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface'
// adapters
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

// config module options
export const ConfigsModuleOptions: ConfigModuleOptions = {
    envFilePath: ROOT_ENV_FILE.test,
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
            dir: resolve(__dirname, '..', 'templates'),
            adapter: new HandlebarsAdapter(),
            options: { strict: true }
        },
    }),
    inject: [ConfigService]
}