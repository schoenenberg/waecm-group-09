import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { Injectable } from '@nestjs/common';
import { Payload } from "../../types/payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        jwksUri:
          'https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/protocol/openid-connect/certs',
      }),
      issuer: 'https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm',
    });
  }

  async validate(payload: Payload) {
    console.log("payload", payload);
    return payload;
  }
}
