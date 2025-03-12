import { ServiceAccountTypeEnum } from "../enums";

export interface IAnalytic {
    available_task: number;
    pending_task: number;
    completed_task: number;
}

export type IRaiderSocials = {
    twitter?: string,
    reddit?: string,
    tiktok?: string,
    instagram?: string,
    telegram?: string,
    thread?: string,
    discord?: string,
    youtube?: string,
}

export interface IRaiderAccount {
    _id?: string;
    account_type: ServiceAccountTypeEnum;
    subscription_date: number;
    user_id: string;
    updated_at?: Date;
    created_at?: Date;
    is_verified?: boolean;
    work_timeout: number;
    analytics: IAnalytic;
    handles: IRaiderSocials;
}

export interface IMultipleRaiderAccount {
    raider_accounts: IRaiderAccount[],
    total_raider_accounts: number,
    has_next: boolean
}