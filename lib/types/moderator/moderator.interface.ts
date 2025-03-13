import { ServiceAccountTypeEnum } from "../enums";

export interface IAnalytic {
    available_task: number;
    pending_task: number;
    completed_task: number;
}

export type IModeratorSocials = {
    twitter?: string,
    reddit?: string,
    tiktok?: string,
    instagram?: string,
    telegram?: string,
    thread?: string,
    discord?: string,
    youtube?: string,
}

export interface IModeratorAccount {
    _id?: string;
    account_type: ServiceAccountTypeEnum;
    subscription_date: number;
    user_id: string;
    updated_at?: Date;
    created_at?: Date;
    subscription_status: 'Active' | 'Expired';
    is_verified?: boolean;
    work_timeout: number;
    analytics: IAnalytic;
    handles: IModeratorSocials;
}

export interface IMultipleModeratorAccount {
    moderator_accounts: IModeratorAccount[],
    total_moderator_accounts: number,
    has_next: boolean
}