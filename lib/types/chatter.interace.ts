import { ServiceAccountTypeEnum, SubScriptionStatus } from "./enums";

export interface IAnalytic {
    availableTask: number;
    pendingTask: number;
    completedTask: number;
}

export interface IChatterSocialHandle {
    twitter?: string;
    reddit?: string;
    tiktok?: string;
    instagram?: string;
    telegram?: string;
    thread?: string;
    discord?: string;
    youtube?: string;
}

export interface IChatterService {
    _id?: string;
    accountType: ServiceAccountTypeEnum;
    userId: string;
    updatedAt?: Date;
    createdAt?: Date;
    subscriptionStatus: SubScriptionStatus;
    isVerified?: boolean;
    analytics: IAnalytic;
    handles: IChatterSocialHandle;
    work_timeout: number;
    currentClaimDay: Date;
    nextClaimDay: Date;
  }
  
  export interface IMultipleChatterUserServiceResponse {
    userServices: IChatterService[];
    totalUserServices: number;
    hasNextPage: boolean;
  }