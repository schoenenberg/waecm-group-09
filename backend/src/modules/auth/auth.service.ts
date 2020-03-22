/*

!!! INFO: this code has no usage anymore, as I am using passport for authentication
!!! I'll let it here, as we could make use of it later
!!! DELETE this before submission if it remains unused

import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

@Injectable()
export class AuthService {
  async verifyToken(
    authHeader: string,
    jwksUri = 'https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/protocol/openid-connect/certs',
  ): Promise<boolean> {
    // Remove Bearer from string
    const idToken = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7, authHeader.length).trimLeft()
      : '';

    if (idToken === '') {
      return Promise.resolve(false);
    }

    const client = jwksClient({
      jwksUri: jwksUri,
    });

    const options = {
      issuer: 'https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm',
      audience: 'waecm',
    };

    const getKey = (header: any, callback: any) => {
      client.getSigningKey(header.kid, function(err, key) {
        if (err) throw new InternalServerErrorException(err);
        const signingKey = 'publicKey' in key ? key.publicKey : key.rsaPublicKey;
        callback(null, signingKey);
      });
    };

    const verificationResultPromise = new Promise((resolve, reject) => {
      jwt.verify(idToken, getKey, options, (error: any, payload: any) => {
        if (error) {
          //handle error
          reject(error);
        }
        //do something with payload
        resolve(payload);
      });
    });

    const res = await verificationResultPromise;

    console.log(res);

    return true;
  }

  async logout() {
    return null;
  }
}

 */
