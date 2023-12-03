import { Role } from 'src/decorator/role.decorator';

export interface TokenObject {
  access_token: string;
  user: {
    username: string;
    email: string;
    sub: string;
    id: string;
    role: Role;
  };
}
