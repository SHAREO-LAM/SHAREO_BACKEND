export interface JwtPayload {
  sub: string;
  email: string;
  login: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}
