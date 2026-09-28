export interface AuthUser {
  username: string;
  email: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
