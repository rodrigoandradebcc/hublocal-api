import * as crypto from 'crypto';
import base64Url from 'base64url';

const header: { alg: string; typ: string } = {
  alg: 'HS256',
  typ: 'JWT',
};

const payload = {
  username: 'Rod',
  name: 'Rodrigo Andrade',
  exp: new Date().getTime(),
};

const headerEncoded = base64Url.encode(JSON.stringify(header));
const payloadEncoded = base64Url.encode(JSON.stringify(payload));

const key = 'hublocal123456';

const signature = crypto
  .createHmac('sha256', key)
  .update(`${headerEncoded}.${payloadEncoded}`)
  .digest();

console.log(
  `${headerEncoded}.${payloadEncoded}.${base64Url.encode(signature)}`,
);
