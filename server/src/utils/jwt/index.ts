// Utils for shorthand jwt options
import { ConfigService } from "@nestjs/config";
import { JwtSignOptions } from "@nestjs/jwt";
import { ENV_VARS } from "../../configs/constants";

// token types
export type token_types = 'AUTH' | 'EMAIL'

/**
 * Function returns the proper options for signing jwt-tokens (shorthand).
 * @param config the config-service class to access environment variables
 * @returns the proper options for signing jwt-tokens.
 */
export const GetSignTokenOptions = (config: ConfigService, token_type: token_types): JwtSignOptions => {
    // token is for email-verification
    if (token_type === 'EMAIL') return ({
        expiresIn: '5m',
        secret: config.get(ENV_VARS.JWT_SECRET_EMAIL)
    })
    // token is for authorization (the default option)
    else /* (token_type === 'AUTH') */ return ({
        // expiresIn: '7d', // -- production
        expiresIn: '15m',
        secret: config.get(ENV_VARS.JWT_SECRET_AUTH)
    })
}