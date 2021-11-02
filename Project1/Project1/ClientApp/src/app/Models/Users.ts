export class AspNetUser {
  Id: string;
  UserName: string;
  NormalizedUserName: string;
  Email: string;
  NormalizedEmail: string;
  EmailConfirmed: boolean;
  PasswordHash: string;
  SecurityStamp: string;
  ConcurrencyStamp: string;
  PhoneNumber: string;
  PhoneNumberConfirmed: boolean;
  TwoFactorEnabled: boolean;
  LockoutEnd: number;
  LockoutEnabled: boolean;
  AccessFailedCount: number;
}
