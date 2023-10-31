export enum EUserRole {
  ADMIN = "ADMIN",
  TRADER = "TRADER",
  MONITOR = "MONITOR",
  MAINTAINER = "MAINTAINER",
  LIQUIDATOR = "LIQUIDATOR",
  USER = "USER",
}

export type UserRoleStrings = keyof typeof EUserRole;

export enum EUserStatus {
  TBA = "TBA",
  APPROVED = "APPROVED",
  BLOCKED = "BLOCKED",
}

export type UserStatusStrings = keyof typeof EUserStatus;

export interface IUser {
  uid?: string;
  name: string;
  nickname: string;
  email?: string;
  password?: string;
  connected?: boolean;
  publicKey?: any;
  avatar?: string;
  role?: EUserRole;
  status?: EUserStatus;
  online?: boolean;
  created?: Date;
  updated?: Date;
}

export interface INameChangeRequest {
  nickname: string;
  newName: string;
}

export interface IPasswordChangeRequest {
  name: string;
  newPassword: string;
}
