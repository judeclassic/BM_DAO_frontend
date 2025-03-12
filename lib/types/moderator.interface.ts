import { ISubSciptionStatus, ServiceAccountTypeEnum } from "./enums";
import { IAnalytic } from "./raider/raider.interface";

export interface IModeratorService {
  _id?: string;
  accountType: ServiceAccountTypeEnum;
  userId: string;
  updatedAt?: Date;
  createdAt?: Date;
  subscriptionStatus: ISubSciptionStatus;
  isVerified?: boolean;
  work_timeout: number;
  analytics: IAnalytic;
}