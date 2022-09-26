import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
// jwt
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from "./strategy";
// config
import { ENV_VARS } from "../../configs/constants";

@Module({
    imports: [JwtModule.register({ secret: process.env[ENV_VARS.JWT_SECRET] /* directly from process */ })],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule { }