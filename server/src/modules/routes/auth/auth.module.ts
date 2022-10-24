import { Module } from "@nestjs/common";
import { JwtStrategy } from "./strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule { }