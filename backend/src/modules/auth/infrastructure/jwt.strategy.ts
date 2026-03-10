import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppConfigService } from '@common/config/app-config.service';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });
  }

  validate(payload: JwtPayload) {
    // Payload contains the decoded JWT. We return the user object (or part of it)
    // which effectively validates the token signature and expiration.
    // The strictness of payload structure depends on what we sign.
    // Assuming { sub: userId, email: email, role: role }
    if (!payload.sub) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
