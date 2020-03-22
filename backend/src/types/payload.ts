import { User } from './user';

export type Payload = User & {
  jti: string,
  exp: number,
  nbf: number,
  iat: number,
  iss: string,
  aud: string,
  sub: string,
  typ: string,
  azp: string,
  nonce: string,
  auth_time: number,
  session_state: string,
  acr: string
}
